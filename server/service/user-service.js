const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('../service/mail-service');
const tokenService = require('../service/token-service');
const UserDto = require('../dtos/user-dto');

const salt = 3;

class UserService {
    async registration(email, password) {
        const candidate = await UserModel.findOne({
            email,
        });
        if (candidate) {
            throw new Error(
                `Пользователь с почтовым адресом ${email} уже существует`,
            );
        }
        const hashPassword = await bcrypt.hash(password, salt);
        const activationLink = uuid.v4();

        const user = await UserModel.create({
            email,
            password: hashPassword,
            activationLink,
        });
        await mailService.sendActivationMail(email, activationLink);

        const userDto = new UserDto(user); // id, emeail, isActivated
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto,
        };
    }
}

module.exports = new UserService();

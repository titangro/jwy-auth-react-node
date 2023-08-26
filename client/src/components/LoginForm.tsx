import { useState } from 'react';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handleChangePassword = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setEmail(event.target.value);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Email"
                onChange={handleChangeEmail}
                value={email}
            />
            <input
                type="passsword"
                placeholder="Пароль"
                onChange={handleChangePassword}
                value={password}
            />
            <button type="submit">Логин</button>
            <button type="submit">Регистрация</button>
        </div>
    );
};

export default LoginForm;

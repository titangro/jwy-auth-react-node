import { useContext, useState } from 'react';
import { Context } from '..';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { store } = useContext(Context);

    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handleChangePassword = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setPassword(event.target.value);
    };

    const submitLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        store.login(email, password);
    };

    const submitRegistration = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        store.registration(email, password);
    };

    return (
        <form>
            <input
                type="text"
                placeholder="Email"
                onChange={handleChangeEmail}
                value={email}
            />
            <input
                type="password"
                placeholder="Пароль"
                onChange={handleChangePassword}
                value={password}
            />
            <button onClick={submitLogin} type="submit">
                Логин
            </button>
            <button onClick={submitRegistration} type="submit">
                Регистрация
            </button>
        </form>
    );
};

export default LoginForm;

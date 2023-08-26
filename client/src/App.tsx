import React, { useContext, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import { Context } from '.';
import { observer } from 'mobx-react-lite';

const App: React.FC = () => {
    const { store } = useContext(Context);
    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!store.isAuth) {
        return <LoginForm />;
    }

    const handleLogout = () => {
        store.logout();
    };

    return (
        <div>
            <h1>
                {store.isAuth
                    ? `Пользователь авторизован ${store.user.email}`
                    : 'АВТОРИЗУЙТЕСЬ'}
            </h1>
            <button onClick={handleLogout}>Выйти</button>
        </div>
    );
};

export default observer(App);

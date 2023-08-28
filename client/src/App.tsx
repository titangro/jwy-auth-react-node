import React, { useContext, useEffect, useState } from 'react';
import LoginForm from './components/LoginForm';
import { Context } from '.';
import { observer } from 'mobx-react-lite';
import { IUser } from './models/IUser';
import UserService from './services/UserService';

const App: React.FC = () => {
    const { store } = useContext(Context);
    const [users, setUsers] = useState<IUser[]>([]);
    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (store.isLoading) {
        return <div>Загрузка...</div>;
    }

    if (!store.isAuth) {
        return <LoginForm />;
    }

    const handleLogout = () => {
        store.logout();
    };

    const handleGetUsers = async () => {
        try {
            const response = await UserService.fetchUsers();
            setUsers(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>
                {store.isAuth
                    ? `Пользователь авторизован ${store.user.email}`
                    : 'АВТОРИЗУЙТЕСЬ'}
            </h1>
            <button onClick={handleLogout}>Выйти</button>
            <div>
                <button onClick={handleGetUsers}>
                    Получить список пользователей
                </button>
            </div>
            <div>
                <h2>Список пользователей: </h2>
                {users.length ? (
                    <ul>
                        {users.map((user, index) => (
                            <div key={user.id}>{user.email}</div>
                        ))}
                    </ul>
                ) : (
                    <div>пуст</div>
                )}
            </div>
        </div>
    );
};

export default observer(App);

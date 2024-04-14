import { IExtUser, IUsers } from '../../interfaces/interfaces';
import { createUserItem } from '../../view/user/createUser';

export function getUsers(event: MessageEvent) {
    const data: IUsers = JSON.parse(event.data);
    if (data.type === 'USER_INACTIVE' || data.type === 'USER_ACTIVE') {
        const currentUser = sessionStorage.getItem('name');
        const users = data.payload.users;
        const filteredUsers = users.filter((item) => item.login !== currentUser);
        const userList = document.body.querySelector('.user-list');
        if (userList) {
            filteredUsers.forEach((user) => {
                const userItem = createUserItem(user.login, user.isLogined);
                userList.append(userItem);
            });
        }
    }
}

export function changeUser(event: MessageEvent) {
    const data: IExtUser = JSON.parse(event.data);
    if (data.type === 'USER_EXTERNAL_LOGIN' || data.type === 'USER_EXTERNAL_LOGOUT') {
        const user = data.payload.user;
        const userList = document.body.querySelector('.user-list');
        if (userList) {
            const currentUsers = [...userList.querySelectorAll('.user-name')];
            const currentUser = currentUsers.find((item) => item.textContent === user.login);
            if (currentUser) {
                const span = currentUser.querySelector('span');
                if (user.isLogined) {
                    currentUser.classList.remove('user-name_inactive');
                    if (span) span.classList.remove('user-status_inactive');
                } else {
                    currentUser.classList.add('user-name_inactive');
                    if (span) span.classList.add('user-status_inactive');
                }
            } else {
                const userItem = createUserItem(user.login, user.isLogined);
                userList.append(userItem);
            }
        }
    }
}

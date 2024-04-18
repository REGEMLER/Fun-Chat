import { IExtUser, IUsers, user } from '../../interfaces/interfaces';
import { createUserItem } from '../../view/user/createUser';

export function getUsers(event: MessageEvent) {
    const data: IUsers = JSON.parse(event.data);
    if (data.type === 'USER_INACTIVE' || data.type === 'USER_ACTIVE') {
        const currentUser: string | null = sessionStorage.getItem('name');
        const users: user[] = data.payload.users;
        const filteredUsers = users.filter((item) => item.login !== currentUser);
        const userList: Element | null = document.body.querySelector('.user-list');
        if (userList) {
            filteredUsers.forEach((item) => {
                const userItem: HTMLElement = createUserItem(item.login, item.isLogined);
                userList.append(userItem);
            });
        }
    }
}

export function changeUser(event: MessageEvent) {
    const data: IExtUser = JSON.parse(event.data);
    if (data.type === 'USER_EXTERNAL_LOGIN' || data.type === 'USER_EXTERNAL_LOGOUT') {
        const changedUser = data.payload.user;
        const userList = document.body.querySelector('.user-list');
        if (userList) {
            const currentUsers: Element[] = [...userList.querySelectorAll('.user-name')];
            const currentUser: Element | undefined = currentUsers.find(
                (item) => item.textContent === changedUser.login
            );
            if (currentUser) {
                const span: HTMLSpanElement | null = currentUser.querySelector('span');
                if (changedUser.isLogined) {
                    currentUser.classList.remove('user-name_inactive');
                    if (span) span.classList.remove('user-status_inactive');
                } else {
                    currentUser.classList.add('user-name_inactive');
                    if (span) span.classList.add('user-status_inactive');
                }
            } else {
                const userItem: HTMLElement = createUserItem(changedUser.login, changedUser.isLogined);
                userList.append(userItem);
            }
        }
    }
}

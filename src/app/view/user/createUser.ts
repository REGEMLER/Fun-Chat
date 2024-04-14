import { setUserEvent } from '../../controller/main/setUser';

export function createUserItem(name: string, isLogined: boolean): HTMLElement {
    const user = document.createElement('div');
    user.classList.add('user-item');
    const userName = document.createElement('div');
    userName.classList.add('user-name');
    userName.textContent = name;
    const span = document.createElement('span');
    span.classList.add('user-status');
    const numberMessages = document.createElement('span');
    numberMessages.classList.add('user-messages');
    if (!isLogined) {
        userName.classList.add('user-name_inactive');
        span.classList.add('user-status_inactive');
    }
    userName.append(span, numberMessages);
    user.append(userName);
    user.addEventListener('click', setUserEvent);
    return user;
}

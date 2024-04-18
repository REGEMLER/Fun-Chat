import './user.css';
import { setUserEvent } from '../../controller/main/setUser';

export function createUserItem(name: string, isLogined: boolean): HTMLElement {
    const user: HTMLDivElement = document.createElement('div');
    user.classList.add('user-item');
    const userName: HTMLDivElement = document.createElement('div');
    userName.classList.add('user-name');
    userName.textContent = name;
    const span: HTMLSpanElement = document.createElement('span');
    span.classList.add('user-status');
    if (!isLogined) {
        userName.classList.add('user-name_inactive');
        span.classList.add('user-status_inactive');
    }
    userName.append(span);
    user.append(userName);
    user.addEventListener('click', setUserEvent);
    return user;
}

import { Iauth, IauthReq } from '../../interfaces/interfaces';
import { createMainPage } from '../../view/main/main';
import { socket } from '../../..';
import { createModal } from '../../view/modal/modal';

function checkLogin(event: MessageEvent) {
    const data: Iauth = JSON.parse(event.data);
    if (data.type === 'USER_LOGIN' || data.type === 'ERROR') {
        if (data.payload.error) {
            createModal(data.payload.error);
            sessionStorage.clear();
            return;
        }
        if (data.payload.user) {
            const isLogined = data.payload.user.isLogined;
            if (isLogined) {
                const name = document.getElementById('name') as HTMLInputElement;
                createMainPage(name.value);
            } else {
                createModal('Error! You are already logined');
            }
        }
    }
}

export function onLogin(event: SubmitEvent) {
    event.preventDefault();
    if (event.target instanceof HTMLFormElement) {
        const name = document.getElementById('name') as HTMLInputElement;
        const password = document.getElementById('password') as HTMLInputElement;
        sessionStorage.setItem('name', name.value);
        sessionStorage.setItem('password', password.value);
        const request: IauthReq = {
            id: Date.now.toString(),
            type: 'USER_LOGIN',
            payload: {
                user: {
                    login: `${name.value}`,
                    password: `${password.value}`,
                },
            },
        };
        socket.send(JSON.stringify(request));
        socket.addEventListener('message', checkLogin);
    }
}

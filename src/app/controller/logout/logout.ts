import { Iauth, IauthReq } from '../../interfaces/interfaces';
import { createLoginForm } from '../../view/login/login';
import { socket } from '../../..';

function checkLogout(event: MessageEvent) {
    const data: Iauth = JSON.parse(event.data);
    if (data.type === 'USER_LOGOUT' || data.type === 'ERROR') {
        if (data.payload.user) {
            const isLogined = data.payload.user.isLogined;
            if (!isLogined) {
                createLoginForm();
                sessionStorage.clear();
            } else {
                console.log('Error! You are already out!');
            }
        }
        if (data.payload.error) {
            console.log(data.payload.error);
        }
    }
}

export function onLogout() {
    const name = sessionStorage.getItem('name');
    const password = sessionStorage.getItem('password');
    const request: IauthReq = {
        id: Date.now.toString(),
        type: 'USER_LOGOUT',
        payload: {
            user: {
                login: `${name}`,
                password: `${password}`,
            },
        },
    };
    socket.send(JSON.stringify(request));
    socket.addEventListener('message', checkLogout);
}

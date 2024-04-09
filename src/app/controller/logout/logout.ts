import { Iauth, IauthReq } from '../../interfaces/interfaces';
import { createLoginForm } from '../../view/login/login';
import { createSocket } from '../socket/createSocket';

function checkLogout(event: MessageEvent) {
    const data: Iauth = JSON.parse(event.data);
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

export function onLogout() {
    const name = sessionStorage.getItem('name');
    const password = sessionStorage.getItem('password');
    const socket = createSocket();
    socket.addEventListener('open', () => {
        const msg: IauthReq = {
            id: `${name}`,
            type: 'USER_LOGOUT',
            payload: {
                user: {
                    login: `${name}`,
                    password: `${password}`,
                },
            },
        };
        socket.send(JSON.stringify(msg));
    });
    socket.addEventListener('message', checkLogout);
}

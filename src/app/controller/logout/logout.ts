import { createLoginForm } from '../../view/login/login';
import { createSocket, socketData } from '../socket/createSocket';

function checkLogout(event: MessageEvent) {
    const data: socketData = JSON.parse(event.data);
    const isLogined = data.payload.user.isLogined;
    if (!isLogined) {
        createLoginForm();
    } else {
        console.log('Error!');
    }
}

export function onLogout() {
    const name = sessionStorage.getItem('name');
    const password = sessionStorage.getItem('password');
    const socket = createSocket();
    socket.addEventListener('open', () => {
        const msg = {
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

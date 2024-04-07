import { createRoot } from './view/root/root';
import { createLoginForm } from './view/login/login';

export function launcher() {
    createRoot();
    createLoginForm();
    const socket = new WebSocket('ws://127.0.0.1:4000');
    socket.addEventListener('open', () => {
        console.log('Chat is started!');
        const msg = {
            id: 'string',
            type: 'USER_LOGIN',
            payload: {
                user: {
                    login: 'string',
                    password: 'string',
                },
            },
        };
        socket.send(JSON.stringify(msg));
    });
    socket.addEventListener('message', (e) => {
        console.log(e.data);
    });
}

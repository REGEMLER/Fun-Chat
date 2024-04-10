import { Iauth, IauthReq } from '../../interfaces/interfaces';
import { createMainPage } from '../../view/main/main';
import { changeUser } from '../main/getUsers';
import { createSocket } from '../socket/createSocket';

function checkLogin(event: MessageEvent) {
    const data: Iauth = JSON.parse(event.data);
    if (data.type === 'USER_LOGIN' || data.type === 'ERROR') {
        if (data.payload.user) {
            const isLogined = data.payload.user.isLogined;
            if (isLogined) {
                const name = document.getElementById('name') as HTMLInputElement;
                createMainPage(name.value);
            } else {
                console.log('Error! You are already logined');
            }
        }
        if (data.payload.error) {
            console.log(data.payload.error);
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
        const socket = createSocket();
        socket.addEventListener('open', () => {
            const msg: IauthReq = {
                id: `${name.value}`,
                type: 'USER_LOGIN',
                payload: {
                    user: {
                        login: `${name.value}`,
                        password: `${password.value}`,
                    },
                },
            };
            socket.send(JSON.stringify(msg));
        });
        socket.addEventListener('message', checkLogin);
        socket.addEventListener('message', changeUser);
    }
}

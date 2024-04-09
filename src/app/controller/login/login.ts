import { createMainPage } from '../../view/main/main';
import { createSocket, socketData } from '../socket/createSocket';
import { validateLetters, validateLength } from './validators';

function validate(fuild: HTMLInputElement, hint: Element, name: string, length: number) {
    let isValid = true;
    const currentHint = hint;
    currentHint.textContent = '';
    if (!validateLetters(fuild.value)) {
        const currentContent = currentHint.textContent;
        const errorMessage = 'You can use only English alphabet letters and numbers.';
        currentHint.textContent = `${currentContent} ${errorMessage}`;
        isValid = false;
    }
    if (!validateLength(fuild.value, length)) {
        const currentContent = currentHint.textContent;
        const errorMessage = `Minimum length of the ${name} should be ${length} characters.`;
        currentHint.textContent = `${currentContent} ${errorMessage}`;
        isValid = false;
    }
    return isValid;
}

function checkLogin(event: MessageEvent) {
    const data: socketData = JSON.parse(event.data);
    const isLogined = data.payload.user.isLogined;
    if (isLogined) {
        const name = document.getElementById('name') as HTMLInputElement;
        createMainPage(name.value);
    } else {
        console.log('Error!');
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
            const msg = {
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
    }
}

export function onInput(siblingFuild: 'password' | 'name') {
    return (e: Event) => {
        if (e.target instanceof HTMLInputElement) {
            const loginBTN = document.getElementById('login') as HTMLButtonElement;
            e.target.classList.remove('login_input-error');
            const element = document.getElementById(`${siblingFuild}`);
            if (element instanceof HTMLInputElement) {
                const hint1 = document.querySelector('.login_message1');
                const hint2 = document.querySelector('.login_message2');
                let isValidPassword: boolean | null = null;
                let isValidName: boolean | null = null;
                if (siblingFuild === 'name') {
                    if (hint2) isValidPassword = validate(e.target, hint2, 'password', 8);
                    if (!isValidPassword) e.target.classList.add('login_input-error');
                    if (hint1) isValidName = validate(element, hint1, 'name', 2);
                } else {
                    if (hint2) isValidPassword = validate(element, hint2, 'password', 8);
                    if (hint1) isValidName = validate(e.target, hint1, 'name', 2);
                    if (!isValidName) e.target.classList.add('login_input-error');
                }

                if (isValidPassword && isValidName) {
                    loginBTN.disabled = false;
                } else {
                    loginBTN.disabled = true;
                }
            }
        }
    };
}

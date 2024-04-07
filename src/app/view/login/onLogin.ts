import { createMainPage } from '../main/main';
import { validateLetters, validateLength } from './validators';

function validate(fuild: HTMLInputElement, hint: Element, name: string, length: number) {
    let isValid = true;
    const currentHint = hint;
    currentHint.textContent = '';
    if (!validateLetters(fuild.value)) {
        const currentContent = currentHint.textContent;
        const errorMessage = 'You can use only English alphabet letters and the hyphen symbol.';
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

export function onLogin(e: SubmitEvent) {
    e.preventDefault();
    if (e.target instanceof HTMLFormElement) {
        console.log(e.target);
        const name = document.getElementById('name') as HTMLInputElement;
        const pass = document.getElementById('password') as HTMLInputElement;
        createMainPage(name.value, pass.value);
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

import { validateLetters, validateLength } from './validators';

function validateInput(fuild: HTMLInputElement, hint: Element, name: string, length: number): boolean {
    let isValid: boolean = true;
    const currentHint: Element = hint;
    currentHint.textContent = '';
    if (!validateLetters(fuild.value)) {
        const currentContent: string = currentHint.textContent;
        const errorMessage: string = 'You can use only English alphabet letters and numbers.';
        currentHint.textContent = `${currentContent} ${errorMessage}`;
        isValid = false;
    }
    if (!validateLength(fuild.value, length)) {
        const currentContent: string = currentHint.textContent;
        const errorMessage: string = `Minimum length of the ${name} should be ${length} characters.`;
        currentHint.textContent = `${currentContent} ${errorMessage}`;
        isValid = false;
    }
    return isValid;
}

export function onInput(siblingFuild: 'password' | 'name') {
    return (e: Event) => {
        if (e.target instanceof HTMLInputElement) {
            const loginBTN: HTMLButtonElement = document.getElementById('login') as HTMLButtonElement;
            e.target.classList.remove('login_input-error');
            const element: HTMLElement | null = document.getElementById(`${siblingFuild}`);
            if (element instanceof HTMLInputElement) {
                const hint1: Element | null = document.querySelector('.login_message1');
                const hint2: Element | null = document.querySelector('.login_message2');
                let isValidPassword: boolean | null = null;
                let isValidName: boolean | null = null;
                if (siblingFuild === 'name') {
                    if (hint2) isValidPassword = validateInput(e.target, hint2, 'password', 8);
                    if (!isValidPassword) e.target.classList.add('login_input-error');
                    if (hint1) isValidName = validateInput(element, hint1, 'name', 2);
                } else {
                    if (hint2) isValidPassword = validateInput(element, hint2, 'password', 8);
                    if (hint1) isValidName = validateInput(e.target, hint1, 'name', 2);
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

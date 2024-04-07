import './login.css';
import { onInput, onLogin } from './onLogin';
import { createRoot } from '../root/root';
import { createAbout } from '../about/about';

export function createLoginForm() {
    const root: HTMLElement = createRoot();
    const inner: string = `
    <main class="login">
        <h1 class="login_title title">Authentication</h1>
        <form action="#" class="login_form">
            <div class="login_form__inner">
                <h2 class="login_form__title">LOGIN</h2>
                <div class="login_field">
                    <input autocomplete="off" id="name" class="login_input" type="text" placeholder="Your name" required>
                    <span class="login_message login_message1"></span>
                </div>
                <div class="login_field">
                    <input autocomplete="off" id="password" class="login_input" type="text" placeholder="Your password" required>
                    <span class="login_message login_message2"></span>
                </div>
            </div>
            <button id="login" class="login_btn btn" disabled>LOGIN</button>
            <div id="about" class="login_btn btn">About</div>
        </form>
    </main>`;
    root.innerHTML = inner;
    const form: HTMLFormElement | null = root.querySelector('.login_form') as HTMLFormElement;
    const login: HTMLElement | null = document.getElementById('name') as HTMLInputElement;
    const password: HTMLElement | null = document.getElementById('password') as HTMLInputElement;
    const aboutBtn: HTMLElement | null = document.getElementById('about') as HTMLButtonElement;
    form.addEventListener('submit', onLogin);
    login.addEventListener('input', onInput('password'));
    password.addEventListener('input', onInput('name'));
    aboutBtn.addEventListener('click', createAbout);
}

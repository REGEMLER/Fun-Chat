import './main.css';
import { createRoot } from '../root/root';
import { createLoginForm } from '../login/login';

export function createMainPage(name: string, pass: string) {
    const root: HTMLElement = createRoot();
    const inner: string = `
    <main class="main">
        <h1 class="main_title title">Fun chat ${name} ${pass}</h1>
        <div id="temp" class="about_btn btn">Go back</div>
    </main>`;
    root.innerHTML = inner;
    const backBtn: HTMLElement | null = document.getElementById('temp') as HTMLButtonElement;
    backBtn.addEventListener('click', createLoginForm);
}

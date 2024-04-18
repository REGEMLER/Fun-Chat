import './about.css';
import { createRoot } from '../root/root';
import { onAbout } from '../../controller/about/onAbout';

export function createAbout() {
    const root: HTMLElement = createRoot();
    const inner: string = `
    <main class="about">
        <h1 class="about_title title">Fun chat</h1>
        <p class="about_text">The application is designed to demonstrate the Fun Chat task as part of the RSSchool JS/FE course in 2024</p>
        <a class="about_link" href='https://github.com/REGEMLER'>Author Yar Night</a>
        <div id="back" class="about_btn btn">Go back</div>
    </main>`;
    root.innerHTML = inner;
    const backBtn: HTMLButtonElement = document.getElementById('back') as HTMLButtonElement;
    backBtn.addEventListener('click', onAbout);
}

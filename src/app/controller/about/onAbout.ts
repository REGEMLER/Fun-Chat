import { createLoginForm } from '../../view/login/login';
import { createMainPage } from '../../view/main/main';

export function onAbout() {
    const name: string | null = sessionStorage.getItem('name');
    if (name) {
        createMainPage(name);
    } else {
        createLoginForm();
    }
}

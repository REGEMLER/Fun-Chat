import { createLoginForm } from '../../view/login/login';
import { createMainPage } from '../../view/main/main';

export function onAbout() {
    const name = sessionStorage.getItem('name');
    if (name) {
        createMainPage(name);
    } else {
        createLoginForm();
    }
}

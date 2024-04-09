import { createRoot } from './view/root/root';
import { createLoginForm } from './view/login/login';

export function launcher() {
    createRoot();
    createLoginForm();
}

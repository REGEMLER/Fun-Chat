import './index.css';
import { launcher } from './app/app';
import { createModal } from './app/view/modal/modal';

export let socket = new WebSocket('ws://127.0.0.1:4000');

socket.addEventListener('open', () => {
    launcher();
});

socket.addEventListener('close', () => {
    createModal('A sudden disconnection from the server occurs!');
    socket = new WebSocket('ws://127.0.0.1:4000');
});

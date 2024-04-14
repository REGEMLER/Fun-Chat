import './index.css';
import { launcher } from './app/app';

export const socket = new WebSocket('ws://127.0.0.1:4000');

socket.addEventListener('open', () => {
    launcher();
});

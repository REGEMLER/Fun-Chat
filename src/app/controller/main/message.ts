import { IMessageReq, IMessageRes } from '../../interfaces/interfaces';
import { createSocket } from '../socket/createSocket';

export function sendMessage() {
    const textarea: HTMLTextAreaElement | null = document.querySelector('textarea');
    const chatName: Element | null = document.querySelector('.chat_name');
    if (textarea && chatName) {
        const text: string = textarea.value;
        const adress: string | null = chatName.textContent;
        if (adress === 'Nothing') return;
        const socket: WebSocket = createSocket();
        const messageRequest: IMessageReq = {
            id: String(Date.now()),
            type: 'MSG_SEND',
            payload: {
                message: {
                    to: String(adress),
                    text: text,
                },
            },
        };
        console.log(messageRequest);
        socket.addEventListener('open', () => {
            socket.send(JSON.stringify(messageRequest));
        });
        socket.addEventListener('message', (e) => {
            console.log(e.data);
        });
    }
}

function createMessage(sender: string, time: string, text: string, status: string): HTMLElement {
    const message = document.createElement('div');
    message.classList.add('message');
    const inner: string = `
        <div class="message_header">
            <div class="message_info">${sender}</div>
            <div class="message_info">${time}</div>
        </div>
        <div class="message_text">${text}</div>
        <div class="message_status">${status}</div>
    `;
    message.innerHTML = inner;
    return message;
}

export function getMessage(event: MessageEvent) {
    const data: IMessageRes = JSON.parse(event.data);
    if (data.type === 'MSG_SEND') {
        console.log(data);
        const fuild = document.querySelector('.chat_fuild');
        const message = createMessage(
            data.payload.message.from,
            data.payload.message.datetime.toString(),
            data.payload.message.text,
            String(data.payload.message.status.isDelivered)
        );
        fuild?.append(message);
    }
}

export function fetchHistory(event: MessageEvent) {
    const data: IMessageRes = JSON.parse(event.data);
    if (data.type === 'MSG_FROM_USER' || data.type === 'ERROR') {
        console.log(data.payload);
    }
}

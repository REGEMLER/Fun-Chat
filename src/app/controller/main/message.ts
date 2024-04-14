import { IMessageReq, IMessageRes, IHistoryRes } from '../../interfaces/interfaces';
import { socket } from '../../..';
import { createMessage } from '../../view/message/createMessage';

export function sendMessage() {
    const textarea: HTMLTextAreaElement | null = document.querySelector('textarea');
    const chatName: Element | null = document.querySelector('.chat_name');
    if (textarea && chatName) {
        const text: string = textarea.value;
        const adress: string | null = chatName.textContent;
        if (!adress) return;
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
        socket.send(JSON.stringify(messageRequest));
        socket.addEventListener('message', (e) => {
            console.log(e.data);
        });
    }
}

export function getMessage(event: MessageEvent) {
    const data: IMessageRes = JSON.parse(event.data);
    if (data.type === 'MSG_SEND') {
        console.log('MSG_FROM_USER');
        // const userMessages = document.querySelector('.user-messages');
        // userMessages?.textContent = 'One';
    }
}

export function fetchHistory(event: MessageEvent) {
    const data: IHistoryRes = JSON.parse(event.data);
    if (data.type === 'MSG_FROM_USER' || data.type === 'ERROR') {
        const messages = data.payload.messages;
        const fuild = document.querySelector('.chat_fuild') as HTMLDivElement;
        if (messages.length === 0) {
            fuild.textContent = 'Send your first message!';
            return;
        }
        messages.forEach((message) => {
            const messageItem = createMessage(
                message.from,
                message.datetime.toString(),
                message.text,
                String(message.status.isDelivered)
            );
            fuild.append(messageItem);
        });
    }
}

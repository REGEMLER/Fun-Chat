import { IMessageReq, IMessageRes, IHistoryRes, IHistoryReq } from '../../interfaces/interfaces';
import { socket } from '../../..';
import { createMessage } from '../../view/message/createMessage';
import { createModal } from '../../view/modal/modal';

export function sendMessage() {
    const textarea: HTMLTextAreaElement | null = document.querySelector('textarea');
    const chatName: Element | null = document.querySelector('.chat_name');
    if (textarea && chatName) {
        const text: string = textarea.value;
        const adress: string | null = chatName.textContent;
        if (!adress || !text) return;
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
        textarea.value = '';
    }
}

export function getMessage(event: MessageEvent) {
    const data: IMessageRes = JSON.parse(event.data);
    if (data.type === 'MSG_SEND') {
        const chatName = document.querySelector('.chat_name');
        const recipient = data.payload.message.to;
        const sender = data.payload.message.from;
        if (chatName) {
            const adress = chatName.textContent;
            if (adress === recipient) {
                const hisoryReq: IHistoryReq = {
                    id: Date.now.toString(),
                    type: 'MSG_FROM_USER',
                    payload: {
                        user: {
                            login: String(recipient),
                        },
                    },
                };
                socket.send(JSON.stringify(hisoryReq));
            } else if (adress === sender) {
                const hisoryReq: IHistoryReq = {
                    id: Date.now.toString(),
                    type: 'MSG_FROM_USER',
                    payload: {
                        user: {
                            login: String(sender),
                        },
                    },
                };
                socket.send(JSON.stringify(hisoryReq));
            } else {
                createModal('Your message has been delivered!');
            }
        }
    }
}

export function fetchHistory(event: MessageEvent) {
    const data: IHistoryRes = JSON.parse(event.data);
    if (data.type === 'MSG_FROM_USER') {
        const messages = data.payload.messages;
        const fuild = document.querySelector('.chat_fuild') as HTMLDivElement;
        if (messages.length === 0) {
            fuild.textContent = 'Send your first message!';
            return;
        }
        fuild.innerHTML = '';
        const currentUser = sessionStorage.getItem('name');
        const sortedMessages = messages.sort((a, b) => Number(a.datetime) - Number(b.datetime));
        sortedMessages.forEach((message) => {
            const date = new Date(message.datetime);
            const isDelivered = message.status.isDelivered;
            const isReaded = message.status.isReaded;
            const isEdited = message.status.isEdited;
            let edit = 'Not edited';
            if (isEdited) edit = 'Edited';
            let status = '';
            if (isDelivered) status = 'Delivered';
            if (isReaded) status = 'Read';
            const messageItem = createMessage(
                message.from,
                `${date.toLocaleDateString()} - ${date.getHours()}:${date.getMinutes()}`,
                message.text,
                status,
                edit
            );
            if (currentUser === message.from) {
                const messageStatusElement = messageItem.querySelector('.message_status');
                messageItem.classList.add('message_send');
                if (messageStatusElement) messageStatusElement.classList.remove('message_status_passive');
            }
            fuild.append(messageItem);
        });
    }
}

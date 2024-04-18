import { IMessageReq, IMessageRes, IHistoryRes, IHistoryReq, message } from '../../interfaces/interfaces';
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
        const chatName: Element | null = document.querySelector('.chat_name');
        const recipient: string = data.payload.message.to;
        const sender: string = data.payload.message.from;
        if (chatName) {
            const adress: string | null = chatName.textContent;
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
        const messages: message[] = data.payload.messages;
        const fuild: HTMLDivElement = document.querySelector('.chat_fuild') as HTMLDivElement;
        if (messages.length === 0) {
            fuild.textContent = 'Send your first message!';
            return;
        }
        fuild.innerHTML = '';
        const currentUser: string | null = sessionStorage.getItem('name');
        const sortedMessages: message[] = messages.sort((a, b) => Number(a.datetime) - Number(b.datetime));
        sortedMessages.forEach((item) => {
            const date = new Date(item.datetime);
            const isEdited = item.status.isEdited;
            const edit = isEdited ? 'Edited' : 'Not edited';
            const status = 'Delivered';
            const messageItem = createMessage(
                item.id,
                item.from,
                `${date.toLocaleDateString()} - ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`,
                item.text,
                status,
                edit
            );
            if (currentUser === item.from) {
                const messageStatusElement: Element | null = messageItem.querySelector('.message_status');
                messageItem.classList.add('message_send');
                if (messageStatusElement) messageStatusElement.classList.remove('message_status_passive');
                const messageBTNS: Element[] = [...messageItem.querySelectorAll('.message_info_btn')];
                messageBTNS.forEach((btn) => {
                    btn.classList.add('message_info_btn-active');
                });
            }
            fuild.append(messageItem);
        });
    }
}

import { IReadRes } from '../../interfaces/interfaces';

export function onRead(event: MessageEvent) {
    const data: IReadRes = JSON.parse(event.data);
    if (data.type === 'MSG_READ') {
        const allMessages: Element[] = [...document.querySelectorAll('.message')];
        if (data.payload.message.status.isReaded) {
            const readMessage: Element | undefined = allMessages.find((item) => {
                return item.id === data.payload.message.id;
            });
            if (readMessage) {
                const status = readMessage.querySelector('.message_status');
                if (status) status.textContent = 'Read';
            }
        }
    }
}

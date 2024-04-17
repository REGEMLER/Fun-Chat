import { socket } from '../../..';
import { IDeleteReq, IDeleteRes } from '../../interfaces/interfaces';

export function onDelete(event: Event) {
    const target = event.target;
    if (target instanceof HTMLDivElement) {
        const id = target.closest('.message')?.id;
        if (id) {
            const response: IDeleteReq = {
                id: Date.now.toString(),
                type: 'MSG_DELETE',
                payload: {
                    message: {
                        id: id,
                    },
                },
            };
            socket.send(JSON.stringify(response));
        }
    }
}

export function deleteMessage(event: MessageEvent) {
    const data: IDeleteRes = JSON.parse(event.data);
    if (data.type === 'MSG_DELETE') {
        const allMessages = [...document.querySelectorAll('.message')];
        if (data.payload.message.status.isDeleted) {
            const deletedMessage = allMessages.find((item) => {
                return item.id === data.payload.message.id;
            });
            if (deletedMessage) deletedMessage.remove();
        }
    }
}

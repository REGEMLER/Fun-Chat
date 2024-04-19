import { socket } from '../../..';
import { IEditReq, IEditRes } from '../../interfaces/interfaces';

function createEditFuild(message: Element) {
    const messageTextElement = message.querySelector('.message_text') as HTMLDivElement;
    const messageText = messageTextElement.textContent;
    const editMessageFuild = document.createElement('div');
    editMessageFuild.classList.add('edit_message_fuild');
    const fuildInner: string = `
        <input type="text" class="edit_area" value="${messageText}"/>
        <button class="edit_area_btn">Edit</button>
    `;
    editMessageFuild.innerHTML = fuildInner;
    const btn: HTMLButtonElement = editMessageFuild.querySelector('.edit_area_btn') as HTMLButtonElement;
    const input: HTMLInputElement = editMessageFuild.querySelector('.edit_area') as HTMLInputElement;
    btn.addEventListener('click', () => {
        const id: string | undefined = message.id;
        if (id) {
            const response: IEditReq = {
                id: Date.now.toString(),
                type: 'MSG_EDIT',
                payload: {
                    message: {
                        id: id,
                        text: input.value,
                    },
                },
            };
            socket.send(JSON.stringify(response));
        }
    });
    messageTextElement.replaceWith(editMessageFuild);
}

export function onEdit(event: Event) {
    const target: EventTarget | null = event.target;
    if (target instanceof HTMLDivElement) {
        const message: Element | null = target.closest('.message');
        if (message) {
            createEditFuild(message);
        }
    }
}

export function editMessage(event: MessageEvent) {
    const data: IEditRes = JSON.parse(event.data);
    if (data.type === 'MSG_EDIT') {
        const allMessages: Element[] = [...document.querySelectorAll('.message')];
        if (data.payload.message.status.isEdited) {
            const editedMessage: Element | undefined = allMessages.find((item) => {
                return item.id === data.payload.message.id;
            });
            if (editedMessage) {
                const messageFuild: Element | null = editedMessage.querySelector('.edit_message_fuild');
                const status = editedMessage.querySelector('.message_edited');
                if (status) status.textContent = 'Edited';
                if (messageFuild) {
                    const messageTextElement = document.createElement('div');
                    messageTextElement.classList.add('message_text');
                    messageTextElement.textContent = data.payload.message.text;
                    messageFuild.replaceWith(messageTextElement);
                } else {
                    const messageTextElement = editedMessage.querySelector('.message_text');
                    if (messageTextElement) messageTextElement.textContent = data.payload.message.text;
                }
            }
        }
    }
}

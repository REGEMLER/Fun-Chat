import { onDelete } from '../../controller/main/delete';
import { onEdit } from '../../controller/main/edit';
import './message.css';

export function createMessage(
    id: string,
    sender: string,
    time: string,
    text: string,
    status: string,
    edited: string
): HTMLElement {
    const message: HTMLDivElement = document.createElement('div');
    message.id = id;
    message.classList.add('message');
    const inner: string = `
        <div class="message_header">
            <div class="message_info">${sender}</div>
            <div class="message_info">${time}</div>
            <div class="message_info message_info_btn remove_btn">Remove</div>
            <div class="message_info message_info_btn edit_btn">Edit</div>
        </div>
        <div class="message_text">${text}</div>
        <div class="message_footer">
            <div class="message_status message_status_passive">${status}</div>
            <div class="message_edited">${edited}</div>
        </div>

    `;
    message.innerHTML = inner;
    const deleteBTN: HTMLDivElement = message.querySelector('.remove_btn') as HTMLDivElement;
    deleteBTN.addEventListener('click', onDelete);
    const EditBTN: HTMLDivElement = message.querySelector('.edit_btn') as HTMLDivElement;
    EditBTN.addEventListener('click', onEdit);
    return message;
}

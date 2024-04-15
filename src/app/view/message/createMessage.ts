import './message.css';

export function createMessage(sender: string, time: string, text: string, status: string, edited: string): HTMLElement {
    const message = document.createElement('div');
    message.classList.add('message');
    const inner: string = `
        <div class="message_header">
            <div class="message_info">${sender}</div>
            <div class="message_info">${time}</div>
            <div class="message_info message_info_btn">Remove</div>
            <div class="message_info message_info_btn">Edit</div>
        </div>
        <div class="message_text">${text}</div>
        <div class="message_footer">
            <div class="message_status message_status_passive">${status}</div>
            <div class="message_edited">${edited}</div>
        </div>

    `;
    message.innerHTML = inner;
    return message;
}

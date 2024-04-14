import './message.css';

export function createMessage(sender: string, time: string, text: string, status: string): HTMLElement {
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

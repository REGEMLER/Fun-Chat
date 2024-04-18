import './modal.css';

export function createModal(text: string): HTMLDivElement {
    const root: HTMLElement | null = document.getElementById('root');
    const modal: HTMLDivElement = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class="modal_inner">
        <P class="modal_text">${text}</P>
        <button class="modal_btn btn">Close</button>
        </div>
        `;
    if (root) {
        root.append(modal);
        document.body.style.overflowY = 'hidden';
    }
    const closeBtn: HTMLButtonElement = modal.querySelector('.modal_btn') as HTMLButtonElement;
    closeBtn.addEventListener('click', () => {
        document.body.style.overflowY = '';
        modal.remove();
    });
    return modal;
}

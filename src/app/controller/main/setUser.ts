import { socket } from '../../..';
import { IHistoryReq } from '../../interfaces/interfaces';

export function setUser(user: Element | null) {
    const nameFuild = document.querySelector('.chat_name');
    const statusFuild = document.querySelector('.chat_status');
    const chatFuild = document.querySelector('.chat_fuild');
    const textarea = document.querySelector('.textarea') as HTMLTextAreaElement;
    const chatBtn = document.querySelector('.chat_btn') as HTMLButtonElement;
    if (nameFuild && statusFuild && chatFuild && textarea && chatBtn) {
        statusFuild.textContent = '';
        nameFuild.textContent = '';
        chatFuild.textContent = '';
        if (user instanceof HTMLDivElement) {
            const span = user.querySelector('.user-status') as HTMLSpanElement;
            const isOffline = span.classList.contains('user-status_inactive');
            nameFuild.textContent = user.textContent;
            textarea.disabled = false;
            chatBtn.disabled = false;
            if (isOffline) {
                statusFuild.textContent = 'Offline';
                statusFuild.classList.add('chat_status_inactive');
                nameFuild.classList.add('chat_name_inactive');
            } else {
                statusFuild.textContent = 'Online';
                statusFuild.classList.remove('chat_status_inactive');
                nameFuild.classList.remove('chat_name_inactive');
            }
            const hisoryReq: IHistoryReq = {
                id: Date.now.toString(),
                type: 'MSG_FROM_USER',
                payload: {
                    user: {
                        login: String(user.textContent),
                    },
                },
            };
            socket.send(JSON.stringify(hisoryReq));
        } else {
            chatFuild.textContent = 'Select any user to start chating';
            textarea.disabled = true;
            chatBtn.disabled = true;
        }
    }
}

export function setUserEvent(event: Event) {
    if (event.target instanceof Element) {
        setUser(event.target);
    }
}

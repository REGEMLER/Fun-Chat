export function setUser(user: Element | null) {
    const nameFuild = document.querySelector('.chat_name');
    const statusFuild = document.querySelector('.chat_status');
    if (nameFuild && statusFuild) {
        if (user) {
            const span = user.querySelector('span') as HTMLSpanElement;
            const isOffline = span.classList.contains('user-status_inactive');
            nameFuild.textContent = user.textContent;
            if (isOffline) {
                statusFuild.textContent = 'Offline';
                statusFuild.classList.add('chat_status_inactive');
                nameFuild.classList.add('chat_name_inactive');
            } else {
                statusFuild.textContent = 'Online';
                statusFuild.classList.remove('chat_status_inactive');
                nameFuild.classList.remove('chat_name_inactive');
            }
        } else {
            statusFuild.textContent = 'Offline';
            nameFuild.textContent = 'Nothing';
            statusFuild.classList.add('chat_status_inactive');
            nameFuild.classList.add('chat_name_inactive');
        }
    }
}

export function setUserEvent(event: Event) {
    if (event.target instanceof Element) {
        setUser(event.target);
    }
}

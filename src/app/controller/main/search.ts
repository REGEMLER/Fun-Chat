export function search(event: Event) {
    const target = event.target;
    const allUsers = [...document.querySelectorAll('.user-item')];
    if (allUsers && target instanceof HTMLInputElement) {
        if (target.value === '') {
            allUsers.forEach((user) => {
                user.classList.remove('user-item_inactive');
            });
            return;
        }
        allUsers.forEach((user) => {
            if (user.textContent?.includes(target.value)) {
                user.classList.remove('user-item_inactive');
            } else {
                user.classList.add('user-item_inactive');
            }
        });
    }
}

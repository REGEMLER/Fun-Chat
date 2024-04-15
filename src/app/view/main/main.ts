import './main.css';
import { createRoot } from '../root/root';
import { onLogout } from '../../controller/logout/logout';
import { createAbout } from '../about/about';
import { socket } from '../../..';
import { getUsers, changeUser } from '../../controller/main/getUsers';
import { fetchHistory, getMessage, sendMessage } from '../../controller/main/message';

function createHeader(name: string): HTMLElement {
    const header = document.createElement('header');
    header.classList.add('header');
    const inner: string = `
        <h2 class="header_title">User: ${name}</h2>
        <h2 class="header_title">Fun chat</h2>
        <div class="header_btns">
            <button id="aboutMain" class="header_btn btn">About</button>
            <button id="logout" class="header_btn btn">Log out</button>
        </div>
    `;
    header.innerHTML = inner;
    const logoutBTN = header.querySelector('#logout') as HTMLButtonElement;
    const aboutBTN = header.querySelector('#aboutMain') as HTMLButtonElement;
    logoutBTN.addEventListener('click', onLogout);
    aboutBTN.addEventListener('click', createAbout);
    return header;
}

function createAside(): HTMLElement {
    const aside = document.createElement('aside');
    aside.classList.add('aside');
    const inner: string = `
        <input type="text" id="searchUser" placeholder="Search..."/>
        <div class="user-list"></div>
    `;
    aside.innerHTML = inner;
    return aside;
}

function createChat(): HTMLElement {
    const chat = document.createElement('section');
    chat.classList.add('chat');
    const inner: string = `
        <div class="chat-header">
            <p class="chat_name"></p>
            <p class="chat_status"></p>
        </div>
        <div class="chat_fuild">Select any user to start chating</div>
        <div class="chat-footer">
            <textarea class="textarea" disabled></textarea>
            <button class="chat_btn btn" disabled>Send</button>
        </div>
    `;
    chat.innerHTML = inner;
    const btn = chat.querySelector('.chat_btn') as HTMLButtonElement;
    const textarea = chat.querySelector('.textarea') as HTMLTextAreaElement;
    btn.addEventListener('click', sendMessage);
    textarea.addEventListener('keydown', (event: KeyboardEvent) => {
        if (event.code !== 'Enter') return;
        event.preventDefault();
        sendMessage();
    });
    return chat;
}

function createFooter(): HTMLElement {
    const footer = document.createElement('footer');
    footer.classList.add('footer');
    const inner: string = `
        <div class="footer_logo">
            <img src="https://avatars.githubusercontent.com/u/11501370?s=280&v=4" alt="logo"/>
        </div>
        <h2 class="footer_title">RSSchool</h2>
        <a href="https://github.com/REGEMLER" class="footer_link">Yar Night</a>
        <h2 class="footer_title">2024</h2>
    `;
    footer.innerHTML = inner;
    return footer;
}

export function createMainPage(name: string) {
    const activeUsers = {
        id: Date.now.toString(),
        type: 'USER_ACTIVE',
        payload: null,
    };
    const unactiveUsers = {
        id: Date.now.toString(),
        type: 'USER_INACTIVE',
        payload: null,
    };
    socket.send(JSON.stringify(activeUsers));
    socket.send(JSON.stringify(unactiveUsers));
    socket.addEventListener('message', getUsers);
    socket.addEventListener('message', changeUser);
    socket.addEventListener('message', fetchHistory);
    socket.addEventListener('message', getMessage);

    const root: HTMLElement = createRoot();
    const main = document.createElement('main');
    main.classList.add('main');
    const header = createHeader(name);
    const mainSection = document.createElement('section');
    mainSection.classList.add('main-section');
    const aside = createAside();
    const chat = createChat();
    mainSection.append(aside, chat);
    const footer = createFooter();
    main.append(header, mainSection, footer);
    root.innerHTML = '';
    root.append(main);
}

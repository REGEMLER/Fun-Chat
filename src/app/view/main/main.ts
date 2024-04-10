import './main.css';
import { createRoot } from '../root/root';
import { onLogout } from '../../controller/logout/logout';
import { createAbout } from '../about/about';
import { createSocket } from '../../controller/socket/createSocket';
import { getUsers } from '../../controller/main/getUsers';

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

function createMessage(text: string): HTMLElement {
    const message = document.createElement('div');
    message.classList.add('message');
    const inner: string = `
        <div class="message_header">
            <div class="message_info">You</div>
            <div class="message_info">08.04.2024, 20:17:47</div>
        </div>
        <div class="message_text">${text}</div>
        <div class="message_status">Sended</div>
    `;
    message.innerHTML = inner;
    return message;
}

function createChat(): HTMLElement {
    const chat = document.createElement('section');
    chat.classList.add('chat');
    const inner: string = `
        <div class="chat-header">
            <p class="chat_name">Pijama lama</p>
            <p class="chat_status">Online</p>
        </div>
        <div class="chat_fuild"></div>
        <div class="chat-footer">
            <textarea class="textarea"></textarea>
            <button class="chat_btn btn">Send</button>
        </div>
    `;
    chat.innerHTML = inner;
    return chat;
}

function createFooter(): HTMLElement {
    const footer = document.createElement('footer');
    footer.classList.add('footer');
    const inner: string = `
        <div class="footer_logo">
            <img src="https://rs.school/assets/rs-logo-uySws9h1.png" alt="logo"/>
        </div>
        <h2 class="footer_title">RSSchool</h2>
        <a href="https://github.com/REGEMLER" class="footer_link">Yar Night</a>
        <h2 class="footer_title">2024</h2>
    `;
    footer.innerHTML = inner;
    return footer;
}

export function createMainPage(name: string) {
    const socket = createSocket();
    socket.addEventListener('open', () => {
        const activeUsers = {
            id: name,
            type: 'USER_ACTIVE',
            payload: null,
        };
        const unactiveUsers = {
            id: name,
            type: 'USER_INACTIVE',
            payload: null,
        };
        socket.send(JSON.stringify(activeUsers));
        socket.send(JSON.stringify(unactiveUsers));
    });
    socket.addEventListener('message', getUsers);
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
    const msg1 = createMessage('U aotr grhr rglnfgh asghhd');
    const fuild = chat.querySelector('.chat_fuild');
    fuild?.append(msg1);
    const logoutBTN = document.getElementById('logout') as HTMLButtonElement;
    const aboutBTN = document.getElementById('aboutMain') as HTMLButtonElement;
    logoutBTN.addEventListener('click', onLogout);
    aboutBTN.addEventListener('click', createAbout);
}

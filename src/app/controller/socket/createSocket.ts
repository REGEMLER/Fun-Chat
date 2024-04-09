export function createSocket(): WebSocket {
    const socket = new WebSocket('ws://127.0.0.1:4000');
    return socket;
}

export interface socketData {
    id: string;
    type: string;
    payload: {
        user: {
            login: string;
            isLogined: boolean;
        };
    };
}

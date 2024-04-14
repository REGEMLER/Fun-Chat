export interface IauthReq {
    id: string;
    type: string;
    payload: {
        user: {
            login: string;
            password: string;
        };
    };
}

export interface Iauth {
    id: string;
    type: string;
    payload: {
        user?: {
            login: string;
            isLogined: boolean;
        };
        error?: string;
    };
}

export interface user {
    login: string;
    isLogined: boolean;
}

export interface IUsers {
    id: string;
    type: string;
    payload: {
        users: user[];
    };
}

export interface IExtUser {
    id: null;
    type: string;
    payload: {
        user: {
            login: string;
            isLogined: boolean;
        };
    };
}

export interface message {
    id: string;
    from: string;
    to: string;
    text: string;
    datetime: number;
    status: {
        isDelivered: boolean;
        isReaded: boolean;
        isEdited: boolean;
    };
}

export interface IMessageReq {
    id: string;
    type: string;
    payload: {
        message: {
            to: string;
            text: string;
        };
    };
}

export interface IMessageRes {
    id: string;
    type: string;
    payload: {
        message: message;
    };
}

export interface IHistoryReq {
    id: string;
    type: string;
    payload: {
        user: {
            login: string;
        };
    };
}

export interface IHistoryRes {
    id: string;
    type: string;
    payload: {
        messages: message[];
    };
}

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

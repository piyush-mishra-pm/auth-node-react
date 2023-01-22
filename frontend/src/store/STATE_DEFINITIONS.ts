export interface AUTH_STATE {
    isSignedIn: boolean | null | undefined;
    userId: String | null | undefined;
    jwt: string | null | undefined;
}

export interface STATE {
    auth: AUTH_STATE;
}
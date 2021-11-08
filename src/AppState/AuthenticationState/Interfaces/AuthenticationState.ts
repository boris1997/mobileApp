import { AuthState } from "../Enums/AuthState";

export interface IAuthenticationState {
    loggedIn: AuthState;
    serverAddress: string | undefined;
    username: string | undefined;
    password: string | undefined;
    showError: boolean;
    sessionid: string | undefined;
    token:string | undefined;
    isLoading: boolean;
    domain: string | undefined;
};

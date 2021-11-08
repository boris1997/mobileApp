import { IModulesMediator } from "../../AppMediator/Interfaces/IModulesMediator";
import { SuccessfulResponseData } from "../Data/Data";
import { IAuthenticationDAL } from "../Interfaces/IAuthenticationDAL";

export class RealAuthenticationDAL implements IAuthenticationDAL {
    password: string | undefined;
    username: string | undefined;
    serverAddress: string | undefined;
    protocol!: "http://" | "https://";
    navigation: any;
    errorMessage!: string;
    
    private mediator: IModulesMediator;

    constructor(mediator: IModulesMediator) {
        this.mediator = mediator;
        this.mediator._authenticationDAL = this;
    };

    tryLogin(): Promise<string | undefined> {
        throw new Error("Method not implemented.");
    };

    hasCurrentUser(): Promise<boolean> {
        throw new Error("Method not implemented.");
    };

    sendAuthenticationRequest(): Promise<SuccessfulResponseData | undefined> {
        throw new Error("Method not implemented.");
    };

    setCurrentUserData(response: SuccessfulResponseData): Promise<void> {
        throw new Error("Method not implemented.");
    };

    hasConneactionAndCredentials(): Promise<void> {
        throw new Error("Method not implemented.");
    };

    logOut(): Promise<void> {
        throw new Error("Method not implemented.");
    };


};
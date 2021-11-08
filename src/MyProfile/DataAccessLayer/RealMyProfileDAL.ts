import { IModulesMediator } from "../../AppMediator/Interfaces/IModulesMediator";
import { IMyProfileDAL } from "../Interfaces/IMyProfileDAL";
import { IProfileInfo } from "../Interfaces/IProfileInfo";
import { IUserSubstitutions } from "../Interfaces/IUsersubstitutions";

export class RealMyProfileDAL implements IMyProfileDAL {
    private mediator: IModulesMediator;

    constructor(mediator: IModulesMediator) {
        this.mediator = mediator;
        this.mediator._myProfileDAL = this;
    };

    getProfileInfo(): Promise<void> {
        throw new Error("Method not implemented.");
    };

    getUserSubstitutions(): Promise<IUserSubstitutions | undefined> {
        throw new Error("Method not implemented.");
    };

    changeUserPassword(actualPassword: string, newPassword: string): Promise<string> {
        throw new Error("Method not implemented.");
    };

    editAccountInfo(info: IProfileInfo): Promise<void> {
        throw new Error("Method not implemented.");
    };

};
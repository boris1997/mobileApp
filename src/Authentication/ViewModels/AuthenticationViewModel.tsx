import { SecureStore } from "../../SecureStore/SecureStore";
import { FormData, ProtocolsValues } from "../Data/Data";
import { IAuthenticationDAL } from "../Interfaces/IAuthenticationDAL";
export class AuthenticationViewModel {

    private AuthenticationDAL: IAuthenticationDAL;

    constructor(AuthenticationDAL: IAuthenticationDAL) {
        this.AuthenticationDAL = AuthenticationDAL;
    }

    async sendLoginData() {
        let trySend = await this.AuthenticationDAL.tryLogin();
        if (trySend != undefined) {
            return trySend;
        }
    }

    async getSavedUserData() {
        return await SecureStore.getSavedUsersData();
    }

    getErrorMessage() {
        return this.AuthenticationDAL.errorMessage;
    }

    setNavigation(navigation: any) {
        this.AuthenticationDAL.navigation = navigation;
    }

    tryLogin() {
        this.AuthenticationDAL.tryLogin()
    }

    async LoggedIn() {
        return await this.AuthenticationDAL.hasCurrentUser()
    }

    async logOut() {
        this.AuthenticationDAL.logOut();
    }

    async validateForm(data: FormData): Promise<string | undefined> {
        ProtocolsValues.forEach((item) => {
            if (data.serverAddress?.includes(item)) {
                data.serverAddress = data?.serverAddress.replace(item, "")
                data.serverAddress = data.serverAddress.endsWith("/") ? data.serverAddress.slice(0, -1) : data.serverAddress;
            }
        })

        let vaildateData: FormData = {
            username: data.username,
            password: data.password,
            serverAddress: data.serverAddress
        }
        
        let values = Object.values(vaildateData);
        for (let i = 0; i < values.length; i++) {
            if (!values[i]) {
                return this.AuthenticationDAL.errorMessage = "Данные не заполнены"
            }
        }
        this.AuthenticationDAL.user.username = data.username;
        this.AuthenticationDAL.user.domain = data.domain;
        this.AuthenticationDAL.user.password = data.password;
        this.AuthenticationDAL.user.serverAddress = data.serverAddress;
        return await this.sendLoginData();
    }

}

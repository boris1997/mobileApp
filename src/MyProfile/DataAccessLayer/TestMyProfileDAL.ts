import { IModulesMediator } from "../../AppMediator/Interfaces/IModulesMediator";
import { TargetPicker } from "../../AppState/ProfileState/Enums/TargetPicker";
import { IPickerList } from "../../AppState/ProfileState/Interfaces/IPickerList";
import { setModel, setPickerList } from "../../AppState/ProfileState/ProfileSlice";
import store from "../../AppState/Store";
import { Encryption } from "../../Encryption.ts/Encryption";
import ErrorHandler from "../../ErrorHandler/ErrorHandler";
import { RequestModule } from "../../RequestModule/RequestModule";
import { IProfileInfo } from "../Interfaces/IProfileInfo";
import { IUserSubstitutions } from "../Interfaces/IUsersubstitutions";
import { SecureStore } from "../../SecureStore/SecureStore";
import { IMyProfileDAL } from "../Interfaces/IMyProfileDAL";

export class TestMyProfileDAL implements IMyProfileDAL {
    mediator: IModulesMediator;
    constructor(mediator: IModulesMediator) {
        this.mediator = mediator;
        this.mediator._myProfileDAL = this;
    };

    /**
     * @getManagersPickerData
     * Set list of managers to state store
     * @param accountId user account id
     */
    private async getManagersPickerData(accountId: string): Promise<void> {
        try {
            const req = await RequestModule.send(`/mobile/Account/GetReferenceData`, 'POST', {
                filter: "",
                changes: {
                    widgetChanges: [],
                    complexObjectChanges: []
                },
                objectId: accountId,
                dataSourceId: "cmw.account.form.dsmanager"
            })
            const res = await req.json();
            const prop: IPickerList = {
                target: TargetPicker.supervisor,
                value: res
            };
            store.dispatch(setPickerList(prop))
        } catch (error) {
            const prop: IPickerList = {
                target: TargetPicker.supervisor,
                value: { totalCount: 0, options: [] }
            };
            store.dispatch(setPickerList(prop))
            ErrorHandler.handleError(TestMyProfileDAL.name, this.getManagersPickerData.name, error)
        }
    };

    async getProfileInfo(): Promise<void> {
        try {
            const UserAccount = await SecureStore.getCurrentUser();
            const ProfileInfoRequest = await RequestModule.send(`/mobile/Account/Get?id=${UserAccount.accountId}`, 'GET');
            const ProfileInfo: IProfileInfo = await ProfileInfoRequest?.json();
            store.dispatch(setModel(ProfileInfo))
            await this.getManagersPickerData(UserAccount.accountId)
        } catch (error) {
            ErrorHandler.handleError(TestMyProfileDAL.name.toString(), this.getProfileInfo.name.toString(), error)
            store.dispatch(setModel(undefined))
        };
    };

    async getUserSubstitutions(): Promise<IUserSubstitutions | undefined> {
        try {
            const UserAccount = await SecureStore.getCurrentUser();
            const UserSubstitutios = await RequestModule.send(`/mobile/Account/GetUserSubstitutions?id=${UserAccount.accountId}`, 'GET');
            const UserSubstitutiosResult: IUserSubstitutions = await UserSubstitutios?.json();
            return UserSubstitutiosResult;
        } catch (error) {
            ErrorHandler.handleError(TestMyProfileDAL.name.toString(), this.getUserSubstitutions.name.toString(), error)
            return undefined;
        };
    };

    async changeUserPassword(actualPassword: string, newPassword: string): Promise<string> {
        const success: string = 'pass reset successfull';
        const denied: string = 'pass changes denied';
        try {
            let publicKey = await RequestModule.getPublicKey();
            const actualEncryptedPassword = await Encryption.getEncryptedPassword(actualPassword, publicKey);
            const newEncryptedPassword = await Encryption.getEncryptedPassword(newPassword, publicKey);
            const accountId = await SecureStore.getCurrentUser();
            const postData = {

            };
            await RequestModule.send(`/mobile/Account/ResetUserPassword`, "POST", {
                AccountId: accountId.accountId,
                EncryptedPassword: actualEncryptedPassword,
                NewEncryptedPassword: newEncryptedPassword
            })
            return success
        } catch (error) {
            ErrorHandler.handleError(TestMyProfileDAL.name.toString(), this.changeUserPassword.name.toString(), error)
            return denied
        };
    };

    async editAccountInfo(info: IProfileInfo): Promise<void> {
        try {
            await RequestModule.send(`/mobile/Account/Edit`, 'POST', info);
        } catch (error) {
            ErrorHandler.handleError(TestMyProfileDAL.name.toString(), this.editAccountInfo.name.toString(), error)
        };
    };

};
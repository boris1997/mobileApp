import { setPassedObject } from '../AppState/MainScreenState/MainScreenSlice';
import store from '../AppState/Store';
import { IAuthenticationDAL } from '../Authentication/Interfaces/IAuthenticationDAL';
import { HubConnectionBuilder } from '../HubService/HubConnectionBulder';
import { IHubConnectionBuilder } from '../HubService/Interfaces/IHubconnectionBuilder';
import { IMainScreenDAL } from '../MainScreen/Interfaces/IMainScreenDAL';
import { IObjectProps } from '../MainScreen/Interfaces/IObjectProps';
import { IMyProfileDAL } from '../MyProfile/Interfaces/IMyProfileDAL';
import { INavigationDAL } from '../Navigation/DataAccessLayer/INavigationDAL';
import { Delegate } from '../SharedTypes/Delegate';
import { IMessagingHubMediator } from './Interfaces/IMessagingHubMediator';
import { IModulesMediator } from './Interfaces/IModulesMediator';

export class ModulesMediator implements IModulesMediator {
    private builder: IHubConnectionBuilder | undefined;
    private myProfileDAL!: IMyProfileDAL;
    private messagingHubMediator: IMessagingHubMediator;
    private mainScreenDAL!: IMainScreenDAL;
    private navigationDAL!: INavigationDAL;
    private authenticationDAL!: IAuthenticationDAL;
    private navigationProp: any;

    constructor(messagingHubMediator: IMessagingHubMediator) {
        this.messagingHubMediator = messagingHubMediator;
    };

    //#region get/set

    set _navigationProp(v: any) {
        this.navigationProp = v;
    };

    set _myProfileDAL(v: IMyProfileDAL) {
        this.myProfileDAL = v;
    };

    set _mainScreenDAL(v: IMainScreenDAL) {
        this.mainScreenDAL = v;
    };

    set _navigationDAL(v: INavigationDAL) {
        this.navigationDAL = v;
    };

    set _authenticationDAL(v: IAuthenticationDAL) {
        this.authenticationDAL = v;
    };

    //#endregion

    //#region SignalR hub handle

    public async initHubConnection() {
        if (this.builder == undefined) {
            this.builder = new HubConnectionBuilder(this.messagingHubMediator);
            try {
                await this.builder.createHubConnection();
            } catch (error) {
                //handle error
            };
        };
        this.builder.initHubConnection();
    };

    public closeConnection() {
        this.builder?.closeConnection();
        this.builder = undefined;
    };
    //#endregion

    public async notifyMainScreen(objData: IObjectProps): Promise<void> {
        store.dispatch(setPassedObject(objData));
        await this.mainScreenDAL.getObjectData(objData);
        await this.mainScreenDAL.getTemplateOptions(objData);
    };

    public async openNavigationDrawer(): Promise<void> {
        try {
            await this.navigationDAL.getNavigationRoot(null, '');
        } catch (error) {
            //handle error
        };
    };

    public async getProfileData(): Promise<void> {
        try {
            await this.myProfileDAL.getProfileInfo();
        } catch (error) {
            //handle error
        };
    };

    public navigateTo(route: string): void {
        this.navigationProp.navigate(route)
    };

};
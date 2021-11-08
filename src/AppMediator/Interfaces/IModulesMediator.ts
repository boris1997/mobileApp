import { IAuthenticationDAL } from "../../Authentication/Interfaces/IAuthenticationDAL";
import { IMainScreenDAL } from "../../MainScreen/Interfaces/IMainScreenDAL";
import { IObjectProps } from "../../MainScreen/Interfaces/IObjectProps";
import { IMyProfileDAL } from "../../MyProfile/Interfaces/IMyProfileDAL";
import { INavigationDAL } from "../../Navigation/DataAccessLayer/INavigationDAL";

export interface IModulesMediator {

    set _navigationProp(v: any)

    set _myProfileDAL (v: IMyProfileDAL);

    set _mainScreenDAL (v: IMainScreenDAL);

    set _navigationDAL (v: INavigationDAL);

    set _authenticationDAL(v: IAuthenticationDAL)

    /** 
     * @notifyMainScreen
     * 
    */
    notifyMainScreen(objData: IObjectProps): void;

    /** 
     * @initHubConnection
     * delegates the task of starting a connection to the hub to the HubConnectionBuilder instance, if it is created, otherwise it creates it
    */
    initHubConnection(): Promise<void>;

    /** 
     * @closeConnection
     * delegates the task of closing connection to the hub to the HubConnectionBuilder instance
    */
    closeConnection(): void;

    /** 
     * @openNavigationDrawer
     * Initialize request to server for reload navigation model
     * and open drawer left menu
    */
    openNavigationDrawer(): Promise<void>;

    getProfileData(): Promise<void>;

    navigateTo(route: string): void;

};
import { IMessagingHubMediator } from "../../AppMediator/Interfaces/IMessagingHubMediator";
import { IModulesMediator } from "../../AppMediator/Interfaces/IModulesMediator";
import { MessageStatus } from "../../AppState/MessagingHubState/Enums/MessageStatus";
import { IObjectProps } from "../../MainScreen/Interfaces/IObjectProps";
import { INotificationDAL } from "../Interfaces/INotificationDAL";

export class RealNotificationDAL implements INotificationDAL {
    private messagingHubMediator: IMessagingHubMediator;
    private modulesMediator: IModulesMediator;

    constructor(modulesMediator: IModulesMediator, messagingHubMediator: IMessagingHubMediator) {
        this.modulesMediator = modulesMediator;
        this.messagingHubMediator = messagingHubMediator;
    };
    
    notifyMainScreen(objData: IObjectProps): void {
        throw new Error("Method not implemented.");
    };

    loadNotification(convId: string): void {
        throw new Error("Method not implemented.");
    };

    changeMessagesStatus(groupId: string[], status: MessageStatus): void {
        throw new Error("Method not implemented.");
    };

    navigateTo(route: string): void {
        this.modulesMediator.navigateTo(route)
    };

};
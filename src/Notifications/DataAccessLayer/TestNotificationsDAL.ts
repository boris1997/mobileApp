import { INotificationDAL } from "../Interfaces/INotificationDAL";
import { IMessagingHubMediator } from "../../AppMediator/Interfaces/IMessagingHubMediator";
import { MessageStatus } from "../../AppState/MessagingHubState/Enums/MessageStatus";
import { IModulesMediator } from "../../AppMediator/Interfaces/IModulesMediator";
import { IObjectProps } from "../../MainScreen/Interfaces/IObjectProps";

export class TestNotificationDAL implements INotificationDAL {
  private messagingHubMediator: IMessagingHubMediator;
  private modulesMediator: IModulesMediator;

  constructor(modulesMediator: IModulesMediator, messagingHubMediator: IMessagingHubMediator) {
    this.modulesMediator = modulesMediator;
    this.messagingHubMediator = messagingHubMediator;
  };

  //TODO remove any
  loadNotification(convId: string): void {
    this.messagingHubMediator.getConversationMessages(convId);
  };

  changeMessagesStatus(groupId: string[], status: MessageStatus): void {
    this.messagingHubMediator.changeMessagesStatus(groupId, status);
  };

  navigateTo(route: string): void {
    this.modulesMediator.navigateTo(route);
  };

  notifyMainScreen(objData: IObjectProps): void {
    this.modulesMediator.notifyMainScreen(objData);
  };

};

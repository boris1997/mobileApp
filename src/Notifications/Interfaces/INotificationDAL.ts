import { MessageStatus } from "../../AppState/MessagingHubState/Enums/MessageStatus";
import { IObjectProps } from "../../MainScreen/Interfaces/IObjectProps";

export interface INotificationDAL {

  /**
   * запрашивает уведомления с бэкнеда
   */
  loadNotification(convId: string): void;

  /**
   * меняет статус нотификации
   */
  changeMessagesStatus(groupId: string[], status: MessageStatus): void;

  navigateTo(route: string): void;

  notifyMainScreen(objData: IObjectProps): void;

};

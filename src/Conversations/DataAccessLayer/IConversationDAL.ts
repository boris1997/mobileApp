import { MessageStatus } from "../../AppState/MessagingHubState/Enums/MessageStatus";
import { IFirstMessage } from "../../AppState/MessagingHubState/Interfaces/IFirstMessage";
import { MessageDetails } from "../../AppState/MessagingHubState/Interfaces/MessageDetails";

export interface IConversationDAL {

  getConversationDetails(convId: string): void;

  editMessage(editedMessage: MessageDetails): void;

  updateDraft(message: MessageDetails): void;

  sendMessage(message: MessageDetails): void;

  changeMessageStatus(messageIds: string[], status: MessageStatus): void;

  /** 
   * @getMessages
   * Принимает объект конкретного обсуждения и возвращает
   * список сообщений соответсвующий объекту
  */
  getMessages(convId: string): void;

  createFirstMessage(firstMessage: IFirstMessage): void;

};
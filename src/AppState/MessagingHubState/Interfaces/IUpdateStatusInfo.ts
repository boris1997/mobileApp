import { MessageStatus } from "../../../Conversations/ConversationViewModels/ConversationInterfaces";

export interface IUpdateStatusInfo {
    messagesId: string[];
    status: MessageStatus;
};
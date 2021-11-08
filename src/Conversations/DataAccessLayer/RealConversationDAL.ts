import { _Mediator, _MessagingHubMediator } from "../../../App";
import { IMessagingHubMediator } from "../../AppMediator/Interfaces/IMessagingHubMediator";
import { MessagingHubMediatorConnector } from "../../AppMediator/MessagingHubMediator";
import { MediatorConnector } from "../../AppMediator/ModulesMediator";
import { ConversationDetails } from "../../AppState/MessagingHubState/Interfaces/IConversationDetails";
import { IFirstMessage } from "../../AppState/MessagingHubState/Interfaces/IFirstMessage";
import { MessageDetails } from "../../AppState/MessagingHubState/Interfaces/MessageDetails";
import { IHubProxy } from "../../HubService/Interfaces/IHubProxy";
import { ConversationInfo, Message, UnreadMessagesInfo, MessageStatus } from "../ConversationViewModels/ConversationInterfaces";
import { IConversationDAL } from "./IConversationDAL";

export class RealConversationDAL implements IConversationDAL {
    mediator: IMessagingHubMediator;

    constructor(mediator: IMessagingHubMediator) {
        this.mediator = mediator;
    }
    getConversationDetails(convId: string): void {
        throw new Error("Method not implemented.");
    };

    editMessage(editedMessage: MessageDetails): void {
        throw new Error("Method not implemented.");
    };

    updateDraft(message: MessageDetails): void {
        throw new Error("Method not implemented.");
    };

    sendMessage(message: MessageDetails): void {
        throw new Error("Method not implemented.");
    };

    changeMessageStatus(messageIds: string[], status: MessageStatus): void {
        throw new Error("Method not implemented.");
    };

    getMessages(convId: string): void {
        throw new Error("Method not implemented.");
    };

    createFirstMessage(firstMessage: IFirstMessage): void {
        throw new Error("Method not implemented.");
    };

};
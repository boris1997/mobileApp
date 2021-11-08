import { IMessagingHubMediator } from "../../AppMediator/Interfaces/IMessagingHubMediator";
import { MessageStatus } from "../../AppState/MessagingHubState/Enums/MessageStatus";
import { IFirstMessage } from "../../AppState/MessagingHubState/Interfaces/IFirstMessage";
import { MessageDetails } from "../../AppState/MessagingHubState/Interfaces/MessageDetails";
import { IConversationDAL } from "./IConversationDAL";

export class TestConversationDAL implements IConversationDAL {
    private mediator: IMessagingHubMediator;

    constructor(mediator: IMessagingHubMediator) {
        this.mediator = mediator;
    };

    getConversationDetails(convId: string) {
        this.mediator.getConversationDetails(convId)
    };

    changeMessageStatus(messageIds: string[], status: MessageStatus): void {
        this.mediator.changeMessagesStatus(messageIds, status);
    };

    editMessage(editedMessage: MessageDetails): void {
        this.mediator.editMessage(editedMessage)
    };

    updateDraft(message: MessageDetails): void {
        this.mediator.updateDraft(message)
    };

    createFirstMessage(firstMessage: IFirstMessage): void {
        this.mediator.createFirstMessage(firstMessage.message, firstMessage.objId)
    };

    getMessages(convId: string) {
        this.mediator.getConversationMessages(convId)
    };

    sendMessage(message: MessageDetails): void {
        this.mediator.sendMessage(message)
    };

};
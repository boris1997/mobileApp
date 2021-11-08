import { ConversationDetails } from "../AppState/MessagingHubState/Interfaces/IConversationDetails";
import { MessageDetails } from "../AppState/MessagingHubState/Interfaces/MessageDetails";
import { ISubscription } from "../AppState/MessagingHubState/Interfaces/ISupscription";
import {
    setSubscriptions,
    setConversations,
    addMessageTo,
    setUnreadMessagesCount,
    onUnsubscribe,
    setConversationDetailsReceived,
    setReloadedMessages,
    changeConnectionStatus,
    resetMessagingHubState,
} from "../AppState/MessagingHubState/MessagingHubSlice";
import store from "../AppState/Store";
import { IHubProxy } from "../HubService/Interfaces/IHubProxy";
import { ConversationMessagesDetails } from "../AppState/MessagingHubState/Interfaces/ConversationMessagesDetails";
import { ConversationType } from "../AppState/MessagingHubState/Enums/ConversationType";
import { ConnectionStatus } from "../AppState/MessagingHubState/Enums/ConnectionStatus";
import { IMessagingHubMediator } from "./Interfaces/IMessagingHubMediator";
import { MessageStatus } from "../AppState/MessagingHubState/Enums/MessageStatus";

export class MessagingHubMediator implements IMessagingHubMediator {
    //#region properties
    hubProxy!: IHubProxy;
    //#endregion

    //#region invokations

    public subscribeToSystem(): void {
        this.hubProxy.invoke('SubscribeToSystem')
    };

    public getSystemConversation(): void {
        this.hubProxy.invoke('GetSystemConversation')
    };

    public editMessage(editedMessage: MessageDetails): void {
        this.hubProxy.invoke('EditMessage', editedMessage)
    };

    public updateDraft(message: MessageDetails): void {
        this.hubProxy.invoke('UpdateDraft', message)
    };

    public getObjectConversation(objId: string): void {
        this.hubProxy.invoke('GetObjectConversation', objId)
    };

    public changeMessagesStatus(ids: string[], read: MessageStatus): void {
        this.hubProxy.invoke("ChangeMessagesStatus", ids, read);
    };

    public getConversationDetails(convId: string) {
        this.hubProxy.invoke("GetConversationDetails", convId);
    };

    public getConversationMessages(convId: string) { //FIXME null 
        this.hubProxy.invoke("GetConversationMessages", convId);
    };

    public subscribeToObject(objId: string) {
        this.hubProxy.invoke("SubscribeToObject", objId);
    };

    public createFirstMessage(message: MessageDetails, objectId: string): void {
        this.hubProxy.invoke("CreateMessage", message, objectId);
    };

    public sendMessage(message: MessageDetails): void {
        this.hubProxy.invoke("CreateMessage", message);
    };
    //#endregion

    //#region app state store dispatching

    public onReconnectedEvent() {
        const conversations = store.getState().MessagingHub.conversations;
        conversations.forEach((conv) => {
            this.getConversationMessages(conv.id)
        });
    };

    public setSubscriptions(data: ISubscription) {
        store.dispatch(setSubscriptions(data));
    };

    public setConversations(data: ConversationDetails) {
        if (data == null || undefined) {
            console.log("ConversationDetails null or undefined");
        } else {
            store.dispatch(setConversations(data));
            this.requestSysyemNotifications(data)
        }
    };

    requestSysyemNotifications(data: ConversationDetails) {
        if (data.type == ConversationType.System) {
            this.getConversationMessages(data.id)
        }
    };

    public addMessageToConversation(data: MessageDetails) {
        store.dispatch(addMessageTo(data));
    };

    public setUnreadMessagesCount(data: ConversationDetails) {
        store.dispatch(setUnreadMessagesCount(data));
    };

    public onUnsubscribe(data: ISubscription) {
        store.dispatch(onUnsubscribe(data));
    };

    public setConversationDetailsReceived(data: ConversationDetails) {
        store.dispatch(setConversationDetailsReceived(data));
        this.getConversationMessages(data.id)
    };

    public setReloadedMessages(data: ConversationMessagesDetails) {
        store.dispatch(setReloadedMessages(data));
    };

    public changeConnectionStatus(data: ConnectionStatus): void {
        store.dispatch(changeConnectionStatus(data))
    };

    public resetMessagingHubState(): void {
        store.dispatch(resetMessagingHubState())
    };

    //#endregion

    //#region service methods
    public getProxy(hubProxy: IHubProxy): void {
        this.hubProxy = hubProxy
    };
    //#endregion
};
import { ConnectionStatus } from "../../AppState/MessagingHubState/Enums/ConnectionStatus";
import { MessageStatus } from "../../AppState/MessagingHubState/Enums/MessageStatus";
import { ConversationMessagesDetails } from "../../AppState/MessagingHubState/Interfaces/ConversationMessagesDetails";
import { ConversationDetails } from "../../AppState/MessagingHubState/Interfaces/IConversationDetails";
import { ISubscription } from "../../AppState/MessagingHubState/Interfaces/ISupscription";
import { MessageDetails } from "../../AppState/MessagingHubState/Interfaces/MessageDetails";
import { IHubProxy } from "../../HubService/Interfaces/IHubProxy";

export interface IMessagingHubMediator {
    hubProxy: IHubProxy;

     /**
     * @createFirstMessage
     * Create first message in conversation
     * @param message object typeof MessageDetails
     * @param objectId target object id
     */
    createFirstMessage(message: MessageDetails, objectId: string): void;

     /**
     * @updateDraft
     * Update draft message in server
     * @param message  object typeof MessageDetails
     */
    updateDraft(message: MessageDetails): void

    /**
     * @setConversations
     * Set conversation into state
     * @param data conversation data typeof ConversationDetails
     */
    setConversations(data: ConversationDetails): void;

    /**
     * @addMessageToConversation
     * Add message to concrete concrete conversation state
     * @param message object typeof MessageDetails
     */
    addMessageToConversation(message: MessageDetails): void;

    /**
     * @setUnreadMessagesCount
     * Set unread messages count into state
     * @param data typeof ConversationDetails
     */
    setUnreadMessagesCount(data: ConversationDetails): void;

    /**
     * @onUnsubscribe
     * Unsubscribe from targer subscription
     * @param data target subscription object typeof ISubscription
     */
    onUnsubscribe(data: ISubscription): void;

    /**
     * @setConversationDetailsReceived
     * Set updated conversation state into targer conversation object
     * @param data updated conversation object typeof ConversationDetails
     */
    setConversationDetailsReceived(data: ConversationDetails): void;

    /**
     * @setReloadedMessages
     * Set updated messages into target conversation attachments
     * @param data object typeof ConversationMessagesDetails contains id of targer conversations and array of updated messages
     */
    setReloadedMessages(data: ConversationMessagesDetails): void;

    /**
     * @getProxy
     * Method for setting proxy as class property
     * @param hubProxy object typeof IHubProxy
     */
    getProxy(hubProxy: IHubProxy): void;

     /**
     * @setSubscriptions
     * Add new subscription into state
     * @param data object typeof ISubscription
     */
    setSubscriptions(data: ISubscription): void;

     /**
     * @subscribeToObject
     * Subscribe to targen object
     * @param objId target object id
     */
    subscribeToObject(objId: string): void;

     /**
     * @getObjectConversation
     * Get target object conversation and set it into state
     * @param objId target object id
     */
    getObjectConversation(objId: string): void;

     /**
     * @getConversationDetails
     * Get more details for target conversation
     * @param convId target conversation id
     */
    getConversationDetails(convId: string): void;

     /**
     * @editMessage
     * Send edited message to server
     * @param editedMessage object of edited message typeof MessageDetails
     */
    editMessage(editedMessage: MessageDetails): void;

     /**
     * @subscribeToObject
     * Subscribe to target object
     * @param objId target object id
     */
    subscribeToObject(objId: string): void;

     /**
     * @getConversationMessages
     * Get messages for target conversation 
     * @param convId target conversation id
     */
    getConversationMessages(convId: string): void;

     /**
     * @sendMessage
     * Send message to the server
     * @param message object typeof MessageDetails
     */
    sendMessage(message: MessageDetails): void;

     /**
     * @changeMessagesStatus
     * Send updated status for target messages to the server
     * @param ids array of messages id
     * @param read updated status typeof MessageStatus enum
     */
    changeMessagesStatus(ids: string[], read: MessageStatus): void;

     /**
     * @requestSysyemNotifications
     * Get system notification messages for system conversation
     * @param data system conversation object typeof ConversationDetails
     */
    requestSysyemNotifications(data: ConversationDetails): void;

     /**
     * @changeConnectionStatus
     * change connection status
     * @param status object typeof ConnectionStatus enum
     */
    changeConnectionStatus(status: ConnectionStatus): void;

     /**
     * @resetMessagingHubState
     * Clear messaging hub state
     */
    resetMessagingHubState(): void;

     /**
     * @subscribeToSystem
     * Subsctibe to system conversation
     */
    subscribeToSystem(): void;

     /**
     * @getSystemConversation
     * Get system conversation 
     */
    getSystemConversation(): void;

     /**
     * @onReconnectedEvent
     * Method to be called when reconnecting process completed
     */
    onReconnectedEvent(): void;
};
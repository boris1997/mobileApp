import { ConversationDetails } from "../../AppState/MessagingHubState/Interfaces/IConversationDetails";
import { MessageDetails } from "../../AppState/MessagingHubState/Interfaces/MessageDetails";
import { IHubProxy } from "./IHubProxy";

export interface IHubConnectionBuilder {

    /** 
     * @initHubConnection
     * Try start connection with SignalR hub
    */
    initHubConnection(): Promise<void>;

    /** 
     * @createHubConnection
     * Create Connection and Proxy objects 
     * and save it
    */
    createHubConnection(): Promise<void>;

    /** 
     * @closeConnection
     * Close connection with SignalR hub 
     * and clear state of MessagingHub
    */
    closeConnection(): void;

};
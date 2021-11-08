import { ISubscription } from "../AppState/MessagingHubState/Interfaces/ISupscription";
import { IHubConnectionBuilder } from "./Interfaces/IHubconnectionBuilder";
import { IHubProxy } from "./Interfaces/IHubProxy";
import { MessageDetails } from "../AppState/MessagingHubState/Interfaces/MessageDetails";
import { ConversationMessagesDetails } from "../AppState/MessagingHubState/Interfaces/ConversationMessagesDetails";
import { ConversationDetails } from "../AppState/MessagingHubState/Interfaces/IConversationDetails";
import { ConnectionStatus } from "../AppState/MessagingHubState/Enums/ConnectionStatus";
import store from "../AppState/Store";
import { SecureStore } from "../SecureStore/SecureStore";
import signar from "react-native-signalr";
import ErrorHandler from "../ErrorHandler/ErrorHandler";
import { IMessagingHubMediator } from "../AppMediator/Interfaces/IMessagingHubMediator";

export class HubConnectionBuilder implements IHubConnectionBuilder {
    private connection!: any;
    private hubProxy!: IHubProxy;
    private messagingHubMediator: IMessagingHubMediator;

    constructor(messagingHubMediator: IMessagingHubMediator) {
        this.messagingHubMediator = messagingHubMediator;
    };

    public async createHubConnection() {
        try {
            const userData = await SecureStore.getCurrentUser();
            this.connection = signar.hubConnection(userData?.protocol + userData?.serverAddress, {
                headers: { sessionid: userData?.sessionId }
            });
            this.hubProxy = this.connection.createHubProxy('MobileMessagingHub');
            this.hubProxyBehavior();
            this.connectionLifecicleEvents();
        } catch (error) {
            ErrorHandler.handleError(HubConnectionBuilder.name, this.createHubConnection.name, error)
        };

    };

    private hubProxyBehavior() {
        this.hubProxy?.on("OnUnreadCountChanged", (data: ConversationDetails) => this.messagingHubMediator.setUnreadMessagesCount(data));

        this.hubProxy?.on('OnConversationReceived', (data: ConversationDetails) => this.messagingHubMediator.setConversations(data));

        this.hubProxy?.on('OnConversationDetailsReceived', (data: ConversationDetails) => this.messagingHubMediator.setConversationDetailsReceived(data));

        this.hubProxy?.on('OnSubscribe', (data: ISubscription) => this.messagingHubMediator.setSubscriptions(data));

        this.hubProxy?.on('OnUnsubscribe', (data: ISubscription) => this.messagingHubMediator.onUnsubscribe(data));

        this.hubProxy?.on('OnConversationMessagesReloaded', (data: ConversationMessagesDetails) => this.messagingHubMediator.setReloadedMessages(data));

        this.hubProxy?.on('OnMessageChanged', (data: MessageDetails) => this.messagingHubMediator.addMessageToConversation(data));

        //Connection lifecicle events

    };

    private connectionLifecicleEvents(): void {

        this.connection.disconnected(async () => {
            const connetionStatus = store.getState().MessagingHub.connectionStatus;
            if (connetionStatus === ConnectionStatus.disconnected) {
                try {
                    await this.initHubConnection();
                } catch (error) {
                    ErrorHandler.handleError(HubConnectionBuilder.name, this.connectionLifecicleEvents.name, error)
                }
            } else return;
        });

        this.connection.error((error: any) => {
            ErrorHandler.handleError(HubConnectionBuilder.name, this.connectionLifecicleEvents.name, error)
        });

        this.connection.reconnected(() => {
            this.messagingHubMediator.onReconnectedEvent();
        });
    };

    public closeConnection() {
        this.connection.stop();
        this.messagingHubMediator.changeConnectionStatus(ConnectionStatus.closed);
        console.log('connection closed')
    };

    public async initHubConnection(): Promise<void> {
        const connetionStatus = store.getState().MessagingHub.connectionStatus;
        if (connetionStatus === ConnectionStatus.closed || connetionStatus === ConnectionStatus.disconnected) {
            console.log('Try connect');
            try {
                await this.connection.start(['webSockets'])
                    .done(() => {
                        this.messagingHubMediator.changeConnectionStatus(ConnectionStatus.connected);
                        this.messagingHubMediator.getProxy(this.hubProxy)
                        this.messagingHubMediator.subscribeToSystem();
                        this.messagingHubMediator.getSystemConversation();
                        console.log(`SignalR connected by ${this.connection.transport.name}.`);
                    })
                    .fail((error: any = 'Cannot connect to the hub with this creditals') => {
                        console.error(error);
                        console.log('Try restart connection');
                        setTimeout(this.initHubConnection(), 5000);
                    })
            } catch (error) {

            };
        } else return;
    };
};
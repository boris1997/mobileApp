import { SavedCurrentData } from "../../../Authentication/Data/Data";
import { ConnectionStatus } from "../Enums/ConnectionStatus";
import { ConversationDetails } from "./IConversationDetails";
import { ISubscription } from "./ISupscription";
import { MessageDetails } from "./MessageDetails";

export interface IMessagingState {
    subscriptions: ISubscription[];
    conversations: ConversationDetails[];
    draftMessage: MessageDetails | undefined;
    connectionStatus: ConnectionStatus;
    objectId: string;
    //NOTE servise property
    transport: string;
 };
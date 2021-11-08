import { MessageDetails } from "../../AppState/MessagingHubState/Interfaces/MessageDetails";
import { SavedCurrentData } from "../../Authentication/Data/Data";

export interface IMessageItemView {
    message: MessageDetails;
    user: SavedCurrentData;
    editMessage(): void;
    archiveMessage(): void;
    replyMessage(): void;
};
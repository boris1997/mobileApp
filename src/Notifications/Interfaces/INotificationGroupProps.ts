import { MessageDetails } from "../../AppState/MessagingHubState/Interfaces/MessageDetails";
import { INotificationViewProps } from "./INotificationViewProps";

export interface INotificationGroupProps extends INotificationViewProps {
    messages: Array<MessageDetails>;
};
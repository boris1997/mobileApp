import { MessageDetails } from "../../AppState/MessagingHubState/Interfaces/MessageDetails";
import { INotificationViewProps } from "./INotificationViewProps";

export interface INotificationItemProps extends INotificationViewProps {
    message: MessageDetails;
};
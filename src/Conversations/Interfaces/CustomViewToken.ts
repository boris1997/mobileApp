import { ViewToken } from "react-native";
import { MessageDetails } from "../../AppState/MessagingHubState/Interfaces/MessageDetails";

export interface CustomViewToken extends ViewToken {
    item: MessageDetails;
    key: string;
    index: number | null;
    isViewable: boolean;
    section?: any;
};
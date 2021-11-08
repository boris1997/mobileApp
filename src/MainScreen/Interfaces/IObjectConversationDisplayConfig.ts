import { ConversationReferenceTypes } from "../Enums/ConversationReferenceTypes";

export interface IObjectConversationDisplayConfig {
    id: string;
    disableSidePanelConversations: boolean;
    disableWidgetConversations: boolean;
    hideArchivedMessages: boolean;
    prohibitedReferenceTypes: Array<ConversationReferenceTypes>;
};
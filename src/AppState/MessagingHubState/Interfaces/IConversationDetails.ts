import { ConversationType } from "../Enums/ConversationType";
import { MessageDetails } from "./MessageDetails";
import { IParticipantDetails } from "./IParticipantDetails";
import { IParticipant } from "./IParticipant";
import { IAttachmentReferenceDetails } from "./IAttachmentReferenceDetails";

export interface ConversationDetails {
    id: string;
    title: string;
    creator: IParticipant;
    creationDate: Date;
    lastWriteDate: Date;
    description: string;
    type: ConversationType;
    owner: IParticipant;
    linkedParticipant: IParticipant;
    participants: IParticipantDetails[];
    attachments: IAttachmentReferenceDetails[];
    unreadMessagesCount:number;
    messages: MessageDetails[];
};
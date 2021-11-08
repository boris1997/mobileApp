import { ReferenceType } from "../Enums/ReferenceType";
import { IAttachmentReferenceDetails } from "./IAttachmentReferenceDetails";
import { MessageDetails } from "./MessageDetails";

export interface IReference extends IAttachmentReferenceDetails{
    id: string;
    title: string;
    type: ReferenceType;
    mimeType: string;
    size: BigInt;
    contentId: string;
    downloadReference: string;
    referencedMessage: MessageDetails;
};

/* export interface IReplyReference extends IReference {
    referencedMessage?: MessageDetails;
};

export interface IAttachmentReference extends IReference {
    mimeType?: string;
    size?: number;
    contentId?: string;
    downloadReference?: string;
}; */
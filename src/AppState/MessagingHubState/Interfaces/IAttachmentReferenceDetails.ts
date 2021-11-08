import { ReferenceType } from "../Enums/ReferenceType";

export interface IAttachmentReferenceDetails {
    creationDate: Date;
    id: string;
    isBaseNotification: boolean;
    isInternal: boolean;
    mimeType: string;
    size: BigInt;
    contentId: string;
    downloadReference: string;
    title: string;
    type: ReferenceType;
};
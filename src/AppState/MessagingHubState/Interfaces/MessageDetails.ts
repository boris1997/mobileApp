import { IParticipantDetails } from "./IParticipantDetails";
import { IParentDetails } from "./IParentState";
import { IReference} from "./IReferenceDetails";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";


// type ReferenceType = IReference[] & IAttachmentReference[] & IReplyReference[]
export class MessageDetails {
    conversation!: string;
    creationDate!: Date;
    creator!: IParticipantDetails;
    id!: string;
    isArchived!: boolean;
    isDraft!: boolean;
    isEdited!: boolean;
    isJustCreated!: boolean;
    isRead!: boolean;
    lastWriteDate!: Date;
    parent!: IParentDetails;
    references!: IReference[];
    title!: string;
    type!: string;
    icon: IconDefinition | undefined;
};
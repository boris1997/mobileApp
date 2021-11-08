import { IObjectConversationDisplayConfig } from "./IObjectConversationDisplayConfig";

export interface ITempateInfo {
    id: string;
    alias: string;
    name: string;
    isDisabled: boolean;
    type: string //TODO enum;
    solution: string;
    creationDate: Date;
    creator: string;
    description: string;
    namePropertyUd: string;
    solutionName: string;
    recordTemplate: ITempateInfo;
    isReferenceData: boolean;
    isTransferable: boolean;
    keyProperty: string;
    conversationDisplayConfig: IObjectConversationDisplayConfig;
};
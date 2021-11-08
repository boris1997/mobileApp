import { ParticipantType } from "../Enums/ParticipantType";

export interface IParticipantDetails {
    color: string;
    fullName: string;
    id: string;
    type: ParticipantType;
};
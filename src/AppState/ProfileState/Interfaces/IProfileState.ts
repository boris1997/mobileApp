import { IProfileInfo } from "../../../MyProfile/Interfaces/IProfileInfo";
import { ISupervisorsList } from "./ISupervisorsList";

export interface IProfileState {
    model: IProfileInfo | undefined;
    supervisorsList: ISupervisorsList | undefined;
};
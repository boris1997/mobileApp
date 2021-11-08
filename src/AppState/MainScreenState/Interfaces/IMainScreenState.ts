import { SavedCurrentData } from "../../../Authentication/Data/Data";
import { IObject } from "../../../MainScreen/Interfaces/IObject";
import { IObjectProps } from "../../../MainScreen/Interfaces/IObjectProps";
import { ITempateInfo } from "../../../MainScreen/Interfaces/ITemplateInfo";

export interface IMainScreenState {
    header: string;
    previousHeader: string | undefined;
    objectModel: IObject | undefined;
    passedObject: IObjectProps | undefined;
    userData: SavedCurrentData | undefined;
    templateOptions: ITempateInfo | undefined;
};
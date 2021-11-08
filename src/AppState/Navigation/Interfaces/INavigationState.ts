import { IRoleWorkspaceModel } from "../../../Navigation/Interfaces/IRoleWorkspaceModel";
import { NavigationItemModel } from "../../../Navigation/Interfaces/NavigationItemModel";

export interface INavigationState {
    chekedItemId: string | undefined;
    model: Array<IRoleWorkspaceModel> | undefined;
    workspaceList: Array<IRoleWorkspaceModel> | undefined;
    filter: string[] | null;
    searchString: string;
};
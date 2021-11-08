import { NavigationItemModel } from "./NavigationItemModel";

export interface IRoleWorkspaceModel {
    key: string;
    id: string;
    name: string;
    solution: string;
    itemType: string;
    navigationItems: Array<NavigationItemModel>;
};
import { NavigationItemModel } from "../../../Navigation/Interfaces/NavigationItemModel";

export interface ISetChildrenProps {
    parentId: string;
    children: Dictionary<NavigationItemModel>
};
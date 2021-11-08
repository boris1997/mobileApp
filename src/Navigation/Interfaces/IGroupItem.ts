import { INavigationDAL } from "../DataAccessLayer/INavigationDAL";
import { NavigationItemConstructor } from "../NavigationViews/NavigationItemConstructor";
import { NavigationItemModel } from "./NavigationItemModel";

export interface IGroupItemProps {
    id: string;
    title: string;
    children: Array<NavigationItemModel>;
    getItems: () => void;
    getChildrenFor: () => NavigationItemModel[] | undefined
    dataAccessLayer: INavigationDAL;
    newItemClass: typeof NavigationItemConstructor;
};
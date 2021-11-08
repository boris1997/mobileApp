import { NavigationItemModel } from "./NavigationItemModel";

export interface IWorkspaceItemView {
    id: string;
    title: string;
    children: NavigationItemModel[];
    fetchChildren: () => void;
};
import React from "react";
import WorkspaceItemView from "./WorkspaceItemView";
import { IRoleWorkspaceModel } from "../Interfaces/IRoleWorkspaceModel";
import { INavigationDAL } from "../DataAccessLayer/INavigationDAL";

/** 
 * @NavigationItem
 * Класс, реализующий отрисовку навигационных элементов боковой навигации
*/
export class WorkspaceItemConstructor {
    private RoleWorkspaceItem: IRoleWorkspaceModel;
    private DAL: INavigationDAL;
    constructor(NavigationItem: IRoleWorkspaceModel, dataAccessLayer: INavigationDAL) {
        this.RoleWorkspaceItem = NavigationItem;
        this.DAL = dataAccessLayer;
    };

    onRender() {
        return <WorkspaceItemView
            id={this.RoleWorkspaceItem.id}
            title={this.RoleWorkspaceItem.name}
            children={this.RoleWorkspaceItem.navigationItems}
            fetchChildren={async () => await this.DAL.GetNextItems(this.RoleWorkspaceItem.id)}
            dataAccessLayer={this.DAL}
            key={this.RoleWorkspaceItem.id}
        />
    };

};
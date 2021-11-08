import { IModulesMediator } from "../../AppMediator/Interfaces/IModulesMediator";
import { setModel, setWorkspaceList } from "../../AppState/Navigation/NavigationSlice";
import store from "../../AppState/Store";
import ErrorHandler from "../../ErrorHandler/ErrorHandler";
import { RequestModule } from "../../RequestModule/RequestModule";
import { INavigationData } from "../Interfaces/INavigationData";
import { NavigationItemModel } from "../Interfaces/NavigationItemModel";
import { INavigationDAL } from "./INavigationDAL";

export class TestNavigationDAL implements INavigationDAL {
    private ChildrenMap: { [key: string]: NavigationItemModel[] | undefined } = {};
    private workspaceListTrigger: boolean = true;
    private mediator: IModulesMediator;

    constructor(mediator: IModulesMediator) {
        this.mediator = mediator;
        this.mediator._navigationDAL = this;
    };

    async getNavigationRoot(filter: string[] | null, searchString: string): Promise<void> {
        try {
            const navigationData = await RequestModule.send('/mobile/Navigation/GetRootNavigationItems', 'POST',
                {
                    type: "Portal",
                    searchString: searchString,
                    selectedWorkspaces: filter
                    // selectedWorkspaces: null - returns all workspaces
                    // selectedWorkspaces: [] - returns empty array of workspaces
                    // selectedWorkspaces: ["workspace.1", "workspace.2"] - returns requested workspaces
                })
            const navigationSchema: INavigationData = await navigationData?.json();
            store.dispatch(setModel(navigationSchema.workspaces))
            if (this.workspaceListTrigger == true) {
                store.dispatch(setWorkspaceList(navigationSchema.workspaces));
                this.workspaceListTrigger = false;
            } else return;
        } catch (error) {
            ErrorHandler.handleError(TestNavigationDAL.name.toString(), this.getNavigationRoot.name.toString(), error)
            store.dispatch(setModel(undefined))
        };
    };

    async GetNextItems(navigationItemId: string): Promise<void> {
        try {
            const nextItemsData = await RequestModule.send('/mobile/Navigation/GetNextItems', 'POST',
                {
                    type: "Portal",
                    navigationItemId
                })
            const childItems: Dictionary<NavigationItemModel> = await nextItemsData?.json()
            Object.assign(this.ChildrenMap, childItems)
        } catch (error) {
            ErrorHandler.handleError(TestNavigationDAL.name.toString(), this.GetNextItems.name.toString(), error)
        };
    };

    getChildrenFor(id: string): NavigationItemModel[] | undefined {
        return this.ChildrenMap[id]
    };

    public notifyMainScreen(data: any): void {
        this.mediator.notifyMainScreen(this, 'OK', data)
    };

};
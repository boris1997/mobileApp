import { IModulesMediator } from "../../AppMediator/Interfaces/IModulesMediator";
import { NavigationItemModel } from "../Interfaces/NavigationItemModel";
import { INavigationDAL } from "./INavigationDAL";

export class RealNavigationDAL implements INavigationDAL {
    private ChildrenMap: { [key: string]: NavigationItemModel[] | undefined } = {};
    private workspaceListTrigger: boolean = true;
    private mediator: IModulesMediator;

    constructor(mediator: IModulesMediator) {
        this.mediator = mediator;
        this.mediator._navigationDAL = this;
    };

    getNavigationRoot(filter: string[] | null, searchString: string): Promise<void> {
        throw new Error("Method not implemented.");
    };

    GetNextItems(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    };

    getChildrenFor(id: string): NavigationItemModel[] | undefined {
        throw new Error("Method not implemented.");
    };

    notifyMainScreen(data: any): void {
        throw new Error("Method not implemented.");
    };

};
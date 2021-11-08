import { SearchFilter } from "./SearchFilter";
import { ISearchDAL } from "../Interfaces/ISearchDAL";
import { IModulesMediator } from "../../AppMediator/Interfaces/IModulesMediator";
import { IObjectProps } from "../../MainScreen/Interfaces/IObjectProps";

export class RealSearchDAL implements ISearchDAL {
  private mediator: IModulesMediator;

  constructor(mediator: IModulesMediator) {
    this.mediator = mediator
  };
  
  notifyMainScreen(objData: IObjectProps): void {
    throw new Error("Method not implemented.");
  };

  search(filter: SearchFilter): Promise<void> {
    throw new Error("Method not implemented.");
  };

};
import { SearchFilter } from "./SearchFilter";
import { ISearchDAL } from "../Interfaces/ISearchDAL";
import { RequestModule } from "../../RequestModule/RequestModule";
import { ISearchData } from "../Interfaces/ISearchData";
import store from "../../AppState/Store";
import { setSearchModel } from "../../AppState/SearchState/SearchSlice";
import ErrorHandler from "../../ErrorHandler/ErrorHandler";
import { IModulesMediator } from "../../AppMediator/Interfaces/IModulesMediator";
import { IObjectProps } from "../../MainScreen/Interfaces/IObjectProps";

export class TestSearchDAL implements ISearchDAL {
  private mediator: IModulesMediator;

  constructor(mediator: IModulesMediator) {
    this.mediator = mediator;
  };

  async search(filter: SearchFilter): Promise<void> {
    try {
      const SearchData = await RequestModule.send(`/mobile/FullTextSearch/SearchItem`, 'POST', filter)
      const result: ISearchData = await SearchData?.json()
      store.dispatch(setSearchModel(result))
    } catch (error) {
      ErrorHandler.handleError(TestSearchDAL.name.toString(), this.search.name.toString(), error)
      store.dispatch(setSearchModel(undefined))
    }
  };

  public notifyMainScreen(objData: IObjectProps): void {
    this.mediator.notifyMainScreen(objData)
  };

};

import { ISearchData } from "../../../Search/Interfaces/ISearchData";
import { SearchFilter } from "../../../Search/DataAccessLayer/SearchFilter";

/** 
 * @ISearchState
 * Types notation for platform search module state branch
*/
export interface ISearchState {
    model: ISearchData | undefined;
};
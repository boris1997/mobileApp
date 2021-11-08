import { ISearchDAL } from "./ISearchDAL";
import { ITemplatesData } from "./ITemplatesData";

export interface ISearchData {
    searchKey: string;
    templates: ITemplatesData[];
    dataAccessLayer: ISearchDAL;
};
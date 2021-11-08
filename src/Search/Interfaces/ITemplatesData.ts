import { ISearchResult } from "./ISearchResult";
import { ISolution } from "./ISolution";

export interface ITemplatesData {
    id: string;
    name: string;
    alias: string;
    solution: ISolution
    objectMatches: ISearchResult[]
};
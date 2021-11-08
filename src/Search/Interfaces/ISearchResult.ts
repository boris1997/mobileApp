import { IPropertyMatches } from "./IPropertymatches";

export interface ISearchResult {
    objectId: string;
    displayName: string;
    creationDate: string;
    lastModified: string;
    propertyMatches: IPropertyMatches[];
};
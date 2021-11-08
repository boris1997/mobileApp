import { IPropertyMatches } from "./IPropertymatches";

/**
 * @ISearchResultView
 * Interface provides property and methods type definetion for passing it with props
 * @param objectName object name
 * @param tempName template name
 * @param property target property of search result for render
 * @method notify calls on press event 
 */
export interface ISearchResultView {
    objectName: string;
    tempName: string;
    property: IPropertyMatches;
    notify(): void
};
import React from "react";
import { toggleRightDrawer } from "../../AppState/DrawerControl/DrawerControlSlice";
import store from "../../AppState/Store";
import { IObjectProps } from "../../MainScreen/Interfaces/IObjectProps";
import { ISearchDAL } from "../Interfaces/ISearchDAL";
import { ITemplatesData } from "../Interfaces/ITemplatesData";
import SearchResultView from "./SearchResultView";

/**
 * @SearchResult 
 * class provides method for render result of platform search request
 * 
 * @param templates array of templates with search results
 * 
 * @param dataAccessLayer implementation of ISearchDAL passed with props
 */
export class SearchResult {
    templates: ITemplatesData[];
    dataAccessLayer: ISearchDAL;
    constructor(templates: ITemplatesData[], dataAccessLayer: ISearchDAL) {
        this.templates = templates;
        this.dataAccessLayer = dataAccessLayer;
    };

    /**
 * @render 
 * parse templates array and create views for each result
 * 
 * @returns JSX.Element[][][]
 */
    render(): JSX.Element[][][] {
        return this.templates?.map(temp =>
            temp.objectMatches.map(object =>
                object.propertyMatches.map(prop =>
                    <SearchResultView
                        key={prop.property.id}
                        property={prop}
                        tempName={temp.name}
                        objectName={object.displayName}
                        notify={() => {
                            const obj: IObjectProps = { ObjectId: object.objectId, ContainerId: temp.id };
                            this.dataAccessLayer.notifyMainScreen(obj)
                            store.dispatch(toggleRightDrawer(false));
                        }}
                    />

                )
            )
        )
    };
};
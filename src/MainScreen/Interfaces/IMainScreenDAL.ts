import { IMessagingHubMediator } from "../../AppMediator/Interfaces/IMessagingHubMediator";
import { IModulesMediator } from "../../AppMediator/Interfaces/IModulesMediator";
import { IHubProxy } from "../../HubService/Interfaces/IHubProxy";
import { IObjectProps } from "./IObjectProps";

/**
 * @IMainScreenDAL
 * A interface that provides methods signatures for implementation 
 * in concrete classes for work with object data in main page of the application 
*/
export interface IMainScreenDAL {

    /** 
     * @getObjectData
     * Get data for target object and write it to app state
     * 
     * @param obj contains target object id, container id and form id 
    */
    getObjectData(obj: IObjectProps): Promise<void>;

    /** 
     * @getTemplateOptions
     * Get data for target template and write it to app state
     * 
     * @param containerId target container id (id шаблона записи)
    */
    getTemplateOptions(obj: IObjectProps): Promise<void>;

    /** 
     * @subscribeToObject
     * invoke subscription functions for target object
     * 
     * @param objId target object id
    */
    subscribeToObject(obj: IObjectProps): void;

};
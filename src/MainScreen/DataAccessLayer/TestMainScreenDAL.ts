import { IMessagingHubMediator } from "../../AppMediator/Interfaces/IMessagingHubMediator";
import { IModulesMediator } from "../../AppMediator/Interfaces/IModulesMediator";
import { setHeader, setObjectModel, setTemplateOptions, setUserData } from "../../AppState/MainScreenState/MainScreenSlice";
import store from "../../AppState/Store";
import { RequestModule } from "../../RequestModule/RequestModule";
import { SecureStore } from "../../SecureStore/SecureStore";
import { IMainScreenDAL } from "../Interfaces/IMainScreenDAL";
import { IObject } from "../Interfaces/IObject";
import { IObjectProps } from "../Interfaces/IObjectProps";
import { ITempateInfo } from "../Interfaces/ITemplateInfo";

/** 
 * @TestMainScreenDAL
 * A class that provides methods for working with objects data on the main page of the application
 * 
 * @implements IMainScreenDAL
 * 
 * @constructor moduleMediator: IModulesMediator, messagingHubMediator: IMessagingHubMediator
*/
export class TestMainScreenDAL implements IMainScreenDAL {
    private moduleMediator!: IModulesMediator;
    private messagingHubMediator!: IMessagingHubMediator;

    constructor(moduleMediator: IModulesMediator, messagingHubMediator: IMessagingHubMediator) {
        this.moduleMediator = moduleMediator;
        this.messagingHubMediator = messagingHubMediator;
        this.moduleMediator._mainScreenDAL = this;
    };

    public async getObjectData(obj: IObjectProps): Promise<void> {
        try {
            const object = RequestModule.send(`/mobile/FormData/QueryForm`, 'POST', {
                ObjectId: obj.ObjectId,
                ContainerId: obj.ContainerId,
                formId: obj.formId
            })
            const userData = await SecureStore.getCurrentUser();

            const req = await object;
            const res: IObject = await req.json();
            store.dispatch(setUserData(userData))
            store.dispatch(setHeader(obj.ObjectId))
            store.dispatch(setObjectModel(res))
        } catch (error) {
            // ErrorHandler.handleError(TestMainScreenDAL.name, this.getObjectData.name, error)
            store.dispatch(setObjectModel(undefined))
        };

    };

    public async getTemplateOptions(obj: IObjectProps): Promise<void> {
        try {
            const templateOptions = await RequestModule.send(`/api/TemplatesApi/Get/${obj.ContainerId}`, 'GET');
            const res: ITempateInfo = await templateOptions.json();
            store.dispatch(setTemplateOptions(res))
        } catch (error) {

        };
    };

    public subscribeToObject(obj: IObjectProps): void {
        this.messagingHubMediator.subscribeToObject(obj.ObjectId);
        this.messagingHubMediator.getObjectConversation(obj.ObjectId);
    };

};
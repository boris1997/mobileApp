import { IModulesMediator } from "../../AppMediator/Interfaces/IModulesMediator";
import { IConversationDAL } from "../../Conversations/DataAccessLayer/IConversationDAL";
import { IMainScreenDAL } from "../../MainScreen/Interfaces/IMainScreenDAL";
import { IMyProfileDAL } from "../../MyProfile/Interfaces/IMyProfileDAL";
import { INavigationDAL } from "../DataAccessLayer/INavigationDAL";

export interface IMainDrawerProps {
    mediator: IModulesMediator;
    navigationDAL: INavigationDAL;
    mainScreenDAL: IMainScreenDAL;
    myProfileDAL: IMyProfileDAL;
    conversationDAL: IConversationDAL
};

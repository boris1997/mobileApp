import { IModulesMediator } from "../../AppMediator/Interfaces/IModulesMediator";
import { AuthenticationViewModel } from "../../Authentication/ViewModels/AuthenticationViewModel";
import { IConversationDAL } from "../../Conversations/DataAccessLayer/IConversationDAL";
import { IMainScreenDAL } from "../../MainScreen/Interfaces/IMainScreenDAL";
import { IMyProfileDAL } from "../../MyProfile/Interfaces/IMyProfileDAL";
import { INotificationDAL } from "../../Notifications/Interfaces/INotificationDAL";
import { ISearchDAL } from "../../Search/Interfaces/ISearchDAL";
import { INavigationDAL } from "../DataAccessLayer/INavigationDAL";

export interface IRootNavigatorProps {
    mediator: IModulesMediator;
    viewModel: AuthenticationViewModel;
    searchDAL: ISearchDAL;
    notificationDAL: INotificationDAL;
    navigationDAL: INavigationDAL;
    mainScreenDAL: IMainScreenDAL;
    myProfileDAL: IMyProfileDAL;
    conversationDAL: IConversationDAL;
};
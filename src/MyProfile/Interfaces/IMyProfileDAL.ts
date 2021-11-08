import { IProfileInfo } from "./IProfileInfo";
import { IUserSubstitutions } from "./IUsersubstitutions";

export interface IMyProfileDAL {

    /** 
    * @getProfileInfo
    * Get and set to store user profile data
   */
    getProfileInfo(): Promise<void>;

    /** 
    * @getUserSubstitutions
    * Возвращает информацию и замещениях пользователя
   */
    getUserSubstitutions(): Promise<IUserSubstitutions | undefined>

    /** 
     * @changeProfileInfo
     * Изменяет и сохраянет данные об аккаунте
    */
    changeUserPassword(actualPassword: string, newPassword: string): Promise<string>;


    /** 
    * @editAccountInfo
    * Post changed account info object to server
    * @param info typeof IProfileInfo, user account object
   */
    editAccountInfo(info: IProfileInfo): Promise<void>;

};
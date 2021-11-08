import { IModulesMediator } from "../../AppMediator/Interfaces/IModulesMediator";
import { FormData, Protocols, SuccessfulResponseData } from "../Data/Data";
export interface IAuthenticationDAL {
  /* domain: string | undefined;
  password: string | undefined;
  username: string | undefined;
  serverAddress: string | undefined; */

  user: FormData;

  protocol: Protocols;
  navigation: any;
  errorMessage: string;

  /**
   * Отправляет данные для входа, и возвращает ошибку при неудачной попытке
   */
  tryLogin(): Promise<string | undefined>;

  /**
   *  Проверяет, хранится ли токен на устройстве 
   */
  hasCurrentUser(): Promise<boolean>;

  /**
   * Отправляет запрос на аутентификацию
   */
  sendAuthenticationRequest(): Promise<SuccessfulResponseData | undefined>;

  /**
   * Сохраняет данные для входа
   */
  setCurrentUserData(response: SuccessfulResponseData): Promise<void>;

  /**
   * Проверяет наличие кредов на девайсе и коннекшен с сервером  
   */
  hasConneactionAndCredentials(): Promise<boolean>;

  logOut(): Promise<void>;
}

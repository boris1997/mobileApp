import { setIsLoading } from "../AppState/AuthenticationState/AuthenticationSlice";
import store from "../AppState/Store";
import { AuthenticationData } from "../Authentication/Data/Data";
import { Encryption } from "../Encryption.ts/Encryption";
import ErrorHandler from "../ErrorHandler/ErrorHandler";
import { SecureStore } from "../SecureStore/SecureStore";

export class RequestModule {
  /**
   * Отправляет неанонимный запрос к бэкенду
   * @param relativePath - путь по которому будет отправлен запрос
   * @param method - метод, которым бдет отправлен запрос (POST, GET и т.д.)
   * @param data - данные, которые нужно отправить, в случае если метод POST
   * @returns возвращает промис
   */

  public static async send(
    relativePath: string,
    method?: RequestType,
    data?: any
  ) {
    let formdata = data instanceof FormData; //NOTE: true  - отправляем файлы
    let response!: Response;
    try {
      let user = await SecureStore.getCurrentUser();
      response = await fetch(
        user.protocol + user.serverAddress + relativePath,
        {
          method: method,
          headers: {
            sessionid: user.sessionId,
            "request-token": user.token,
            "request-signature":
              method === "POST" || "DELETE"
                ? await Encryption.getRequestSignature(relativePath, data)
                : "",

            Accept: "*/*",
            "Content-Type": formdata
              ? "multipart/form-data"
              : "application/json",
          },
          body: formdata ? data : JSON.stringify(data),
        }
      );
      if (!response.ok) {
        RequestModule.GetResponseErrorText(response.status);
        //TODO тут глобальная обработка ошибок
      }
      return response;
    } catch (error) {
      //TODO и тут глобальная обработка ошибок
      ErrorHandler.handleError(RequestModule.name, this.send.name, error);
    }
    return response;
  }

  /**
   * Отправляет анонимный запрос.
   * Используется при логине в приложение.
   */
  public static async sendAnonymously(
    absolutePath: string,
    method?: RequestType,
    data?: AuthenticationData,
    timeout?: number
  ) {
    
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(absolutePath, {
      method: method,
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      signal: timeout != undefined ? controller.signal : undefined,
    });

    clearTimeout(id);
    return response;
  }

  public static async getPublicKey(relativePath?: string) {
    let path: string =
      relativePath ?? (await SecureStore.getCurrentUser()).serverAddress;
    //NOTE возможно, поменять метод на sendAnonymously
    const response = await RequestModule.sendAnonymously(
      `${path}/api/GetPublicKey?js&keyid=${Encryption.getNewGuid()}`,
      "POST",
      undefined,
      5000
    );
    if (!response.ok) {
      let error = RequestModule.GetResponseErrorText(response.status); //TODO глобальная обработка ошибок
      throw new Error(error);
    }
    const splitedString = (await response.text()).split("JSON.parse('")[1];
    const publicKey = JSON.parse(
      splitedString.substring(0, splitedString.length - 3)
    );
    return publicKey;
  }

  /**
   * принимает номер ошибки и возвращает ее текст
   * @param error - номер ошибки
   */
  public static GetResponseErrorText(error: number): string {
    store.dispatch(setIsLoading(false));
    switch (error) {
      case 401:
        return error.toString() + ":не авторизован";
      case 403:
        return error.toString() + ":доступ запрещен";
      case 503:
        return error.toString() + ":сервис недоступен";
      default:
        return "ошибка " + error.toString();
    }
  }
}

import * as Store from "expo-secure-store";
import { CURRENT_USER_SAVE_KEY, USERS_DATA_SAVE_KEY } from "../../Meta";
import {
  SavedCurrentData,
  SavedData,
  Protocols,
} from "../Authentication/Data/Data";
import { setAuthState } from "../AppState/AuthenticationState/AuthenticationSlice";
import store from "../AppState/Store";

export class SecureStore {
  /**
   * @returns возвращает текущего сохраненного пользователя
   */
  public static async getCurrentUser() {
    let result = await Store.getItemAsync(CURRENT_USER_SAVE_KEY);
    if (result) {
      return JSON.parse(result) as SavedCurrentData;
    }
    return new SavedCurrentData();
  }

  /**
   * удаляет данные текущего пользователя
   */
  public static async deleteCurrentUser() {
    store.dispatch(setAuthState({ token: undefined, sessionid: undefined }));
    await Store.deleteItemAsync(CURRENT_USER_SAVE_KEY);
  }

  /**
   * Сохраняет текущие данные пользователя
   * @param dataToSave - данные для сохранения
   */
  public static async setCurrentUser(dataToSave: SavedCurrentData) {
    if (dataToSave.serverAddress.includes(dataToSave.protocol)) {
      dataToSave.serverAddress.replace(dataToSave.protocol, "");
    }
    store.dispatch(
      setAuthState({ token: dataToSave.token, sessionid: dataToSave.sessionId })
    );
    await Store.setItemAsync(CURRENT_USER_SAVE_KEY, JSON.stringify(dataToSave));
  }

  public static async getSavedUsersData() {
    let result = await Store.getItemAsync(USERS_DATA_SAVE_KEY);
    if (result) {
      return JSON.parse(result) as SavedData[];
    }
    return [];
  }

  /**
   * Сохраняет данные пользователя для предзаполнения
   */
  public static async setSavedUsersData(
    userName: string,
    serverAddres: string,
    protocol: Protocols,
    sessionId: string,
    accountId: string,
    token: string,
    domain: string
  ) {
    const newData: SavedData = {
      serverAddres: serverAddres,
      userName: userName,
      protocol: protocol,
      sessionId: sessionId,
      accountId: accountId,
      token: token,
      domain: domain,
    };
    const savedData = await this.getSavedUsersData();
    const item = savedData.find((item) => {
      return (
        newData.accountId === item.accountId &&
        newData.serverAddres === item.serverAddres &&
        newData.userName === item.userName
      );
    });
    if (item === undefined) {
      savedData.push(newData);
      await Store.setItemAsync(USERS_DATA_SAVE_KEY, JSON.stringify(savedData));
    }
  }
}

import { AuthenticationData, Protocols, FormData } from "../Data/Data";
import { SuccessfulResponseData, SavedCurrentData } from "../Data/Data";
import { IAuthenticationDAL } from "../Interfaces/IAuthenticationDAL";
import { RequestModule } from "../../RequestModule/RequestModule";
import { Encryption } from "../../Encryption.ts/Encryption";
import { SecureStore } from "../../SecureStore/SecureStore";
import ErrorHandler from "../../ErrorHandler/ErrorHandler";
import store from "../../AppState/Store";
import {
  resetLoginPageState,
  setAuthState,
  setIsLoading,
  setLoggedIn,
  resetAuthState,
} from "../../AppState/AuthenticationState/AuthenticationSlice";
import { AuthState } from "../../AppState/AuthenticationState/Enums/AuthState";
import { IModulesMediator } from "../../AppMediator/Interfaces/IModulesMediator";

export class TestAuthenticationDAL implements IAuthenticationDAL {
  //#region get/set

  private _user: FormData;
  public get user(): FormData {
    return this._user;
  }
  public set user(v: FormData) {
    this._user = v;
  }

  private _protocol: Protocols = "https://";
  public get protocol(): Protocols {
    return this._protocol;
  }
  public set protocol(v: Protocols) {
    this._protocol = v;
  }

  private _errorMessage!: string;
  public get errorMessage(): string {
    return this._errorMessage;
  }
  public set errorMessage(v: string) {
    this._errorMessage = v;
  }

  //NOTE используется для перекидывания на главный экран
  private _navigation: any;
  public get navigation(): any {
    return this._navigation;
  }
  public set navigation(v: any) {
    this._navigation = v;
  }

  //#endregion

  private mediator: IModulesMediator;

  constructor(mediator: IModulesMediator) {
    this.mediator = mediator;
    this.mediator._authenticationDAL = this;
    this._user = new FormData();
  }

  public async sendAuthenticationRequest() {
    let isAuthenticated = await this.tryAuthenticate("https://");
    if (!isAuthenticated) {
      isAuthenticated = await this.tryAuthenticate("http://");
    }
    return isAuthenticated;
  }

  public async logOut() {
    await RequestModule.send("/mobile/Home/Logout");
    await SecureStore.deleteCurrentUser();
    this.mediator.closeConnection();
    store.dispatch(setLoggedIn(AuthState.undefined));
    store.dispatch(setAuthState({ token: undefined, sessionid: undefined }));
    this.mediator.navigateTo("Login");
  }

  public async tryLogin() {
    store.dispatch(setIsLoading(true));
    this.mediator._navigationProp = this.navigation;
    let hasConneactAndCreds = await this.hasConneactionAndCredentials();
    if (hasConneactAndCreds) {
      await this.login();
    } else {
      let response = await this.sendAuthenticationRequest();
      if (response && response.success) {
        await this.setCurrentUserData(response);
        await SecureStore.setSavedUsersData(
          this.user.username!,
          this.user.serverAddress!,
          this.protocol,
          response.data.id.id,
          response.data.accountId,
          response.data.token,
          this.user.domain!
        );
        await this.login();
      } else {
        store.dispatch(setIsLoading(false));
      }
    }
    return this.errorMessage;
  }

  public async hasConneactionAndCredentials() {
    const loggedIn = await this.hasCurrentUser();
    if (loggedIn) {
      //NOTE возможно, поменять метод пинга
      let ping = await RequestModule.send("/mobile/Home/Ping");
      if (ping.status == 200) {
        return true;
      }
    }
    return false;
  }

  public async setCurrentUserData(response: SuccessfulResponseData) {
    const dataToSave: SavedCurrentData = {
      token: response.data.token,
      sessionId: response.data.id.id,
      serverAddress: this.user.serverAddress!,
      username: this.user.username!,
      accountId: response.data.accountId,
      protocol: this.protocol,
      domain: this.user.domain!,
    };
    await SecureStore.setCurrentUser(dataToSave);
  }

  public async hasCurrentUser() {
    let data = await SecureStore.getCurrentUser();
    if (data?.token != undefined) {
      return true;
    }
    return false;
  }

  private async login() {
    let data = await SecureStore.getCurrentUser();
    this.mediator.navigateTo("MainDrawerNavigator");
    await this.mediator.initHubConnection();
    store.dispatch(resetLoginPageState());
    store.dispatch(
      setAuthState({ token: data.token, sessionid: data.sessionId })
    );
    store.dispatch(setLoggedIn(AuthState.logged));
    store.dispatch(setIsLoading(false));
  }

  private async getEncryptedPassword(protocol: Protocols) {
    let serverAddres = protocol + this.user.serverAddress;
    let publicKey = await RequestModule.getPublicKey(serverAddres);
    const response = await Encryption.getEncryptedPassword(
      this.user.password!,
      publicKey
    );
    return response;
  }

  private async tryAuthenticate(protocol: Protocols) {
    try {
      const authenticationData: AuthenticationData = {
        username: this.user.username,
        encryptedPassword: await this.getEncryptedPassword(protocol),
        domain: this.user.domain,
      };
      const res = await RequestModule.sendAnonymously(
        `${protocol}${this.user.serverAddress}/mobile/Home/Login`,
        "POST",
        authenticationData
      );
      //NOTE промис из fetch не будет пойман, если код ошибки 400-500, вместо response.ok будет false
      if (!res.ok) {
        this.logOut();
        this.errorMessage = RequestModule.GetResponseErrorText(res.status);
        return;
      }
      const responseJson = await res.json();
      if (responseJson.exceptionCode != undefined) {
        this.errorMessage = responseJson.exceptionCode;
        return;
      }
      this.protocol = protocol;
      return responseJson as SuccessfulResponseData;
    } catch (error) {
      //NOTE промис будет отклонен ТОЛЬКО при ошибках сети
      //TODO добавить валидацию формы
      this.errorMessage = "Проверьте подключение к сети";
      ErrorHandler.handleError(
        TestAuthenticationDAL.name,
        this.tryAuthenticate.name,
        error
      );
    }
  }
}

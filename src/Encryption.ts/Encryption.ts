import RSA from "../lib/RSACustom";
import jsSHA from "jssha";
import { SecureStore } from "../SecureStore/SecureStore";

export class Encryption {
  /**
   * Делает запрос на получение зашифрованного пароля и возвращает его
   * @param password - пароль для шифрования
   * @param relativePath - относительный путь. Если не указан, то будет взят путь из SecureStore
   */
  public static async getEncryptedPassword(
    password: string,
    publicKey: string
  ) {
    return this.encryptPassword(password, publicKey);
  }

  public static getNewGuid() {
    return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  private static encryptPassword(password: string, publicKey: any) {
    RSA.setMaxDigits(parseInt(publicKey.maxdigits, 10));
    const key = new RSA.RSAKeyPair(
      publicKey.exponent,
      publicKey.exponent,
      publicKey.modulus
    );
    return RSA.encryptedString(key, password);
  }

   /**
   * шифрует данные для отправки
   * @param path - путь, по которому отправятся данные
   * @param data - данные
   * @returns возвращает зашифрованные данные
   */
    public static async getRequestSignature(path: string, data: any) {
      let contentHash = "";
      if (data) {
        const dataShaObj = new jsSHA("SHA-1", "TEXT");
        dataShaObj.update(data);
        contentHash = dataShaObj.getHash("B64");
      }
      const shaObj = new jsSHA("SHA-1", "TEXT");
      const signatureStr = `Request_${path}_${
        (await SecureStore.getCurrentUser()).token
      }_${contentHash}`;
      shaObj.update(signatureStr);
      const signature = shaObj.getHash("B64");
      return signature;
    }
}

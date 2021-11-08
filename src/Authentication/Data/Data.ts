export class SuccessfulResponseData {
  data!: {
    accountId: string;
    id: {
      id: string;
    };
    token: string;
  };
  success!: boolean;
}

export class SavedCurrentData {
  token!: string;
  sessionId!: string;
  serverAddress!: string;
  username!: string;
  accountId!: string;
  protocol!: Protocols;
  domain!: string;
}

export class SavedData {
  serverAddres!: string;
  userName!: string;
  protocol!: Protocols;
  sessionId!: string;
  accountId!: string;
  token!: string;
  domain!: string;
}

export class FormData {
  username: string | undefined;
  password: string | undefined;
  serverAddress: string | undefined;
  domain?: string | undefined;
  // protocol!: Protocols;
}

export const ProtocolsValues = ["http://", "https://"] as const; //NOTE при добавлении новых протоколов, добавить их в этот массив
export type Protocols = typeof ProtocolsValues[number];

//export type Protocols="http://" | "https://"

export class AuthenticationData {
  username: string | undefined;
  encryptedPassword: string | undefined;
  domain: string | undefined;
}

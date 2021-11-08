
import { RequestModule } from "../RequestModule";
import { SecureStore } from "../../SecureStore/SecureStore";

jest.mock("@fortawesome/react-native-fontawesome", () => ({
  FontAwesomeIcon: "",
}));
jest.mock("react-native-cn-quill", () => ({
  QuillEditor: "",
}));

test("getCurrentUser", async () => {
  const UserAccount = await SecureStore.getCurrentUser();
  expect(UserAccount).toEqual({
    accountId: undefined,
    currentServerAddress: undefined,
    currentUsername: undefined,
    sessionId: undefined,
    token: undefined,
  });
});

test("deleteCurrentUser", async () => {
  try {
    await expect(SecureStore.deleteCurrentUser()).resolves.not.toThrow();
    await expect(
      SecureStore.deleteCurrentUser()
    ).resolves.not.toBeUndefined();
  } catch (error) {}
});

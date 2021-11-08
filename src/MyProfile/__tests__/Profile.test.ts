import { RequestModule } from "../../RequestModule/RequestModule"
import { SecureStore } from "../../SecureStore/SecureStore"


test('', async() => {
    const UserAccount = await SecureStore.getCurrentUser()
    expect(UserAccount.accountId).toEqual('account.1')
})
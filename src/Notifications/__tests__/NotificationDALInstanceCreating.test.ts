import { TestNotificationDAL } from "../DataAccessLayer/TestNotificationsDAL";

const TestDAL = new TestNotificationDAL();
test("NotificationDAL test implementation instance creating ", () => {
  expect(TestDAL).toEqual(new TestNotificationDAL());
  //expect(notificationVM).toEqual(new NotificationVM());
});



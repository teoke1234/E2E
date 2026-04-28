import { expect, test } from '@fixtures/fixtureMerge';
import { APP_URL } from '@constants/env';

test('@TC_001 Check go to app with multi role admin & userA', async ({ roleManager }) => {
  const admin = await roleManager.asRole('admin');
  await admin.goto(APP_URL);

  const userA = await roleManager.asRole('userA');
  await userA.goto(APP_URL);

});

test('@TC_002 Check go to app with guest role', async ({ roleManager }) => {
  const guest = await roleManager.asRole('guest');
  await guest.goto(APP_URL);
});

test('@TC_003 Open heartbeats page', async ({ roleManager }) => {
  const userA = await roleManager.asRole('userA');
  await userA.goto(APP_URL);
  await userA.dashboardPage.upperHeader.openSideBar();
  await userA.dashboardPage.sideMenu.clickSideMenuOption('Heartbeats');
  await userA.page.waitForURL('**/heartbeats');
  expect(userA.page.url()).toContain('/heartbeats');
});

test('@TC_004 API test', async ({ marketApi }) => {
  const response = await marketApi.getEod('AAPL');
  console.log('API RESPONSE:', response.data);

  
  const totalClose = response.data
    .filter((item : any) => item.close > 272)
    .map((item : any) => item.close)
    .reduce((sum : number, price : number) => sum + price, 0);
  console.log(totalClose);


  // expect.soft(response.data.length).toBeGreaterThan(0);
});

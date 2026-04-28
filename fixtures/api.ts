import { test as base, request, APIRequestContext } from '@playwright/test';
import { MarketstackClient } from '@services/marketstack.client';
import { API_URL, ACCESS_KEY } from '@constants/env';

type ApiFixtures = {
  apiContext: APIRequestContext;
  marketApi: MarketstackClient;
};

export const test = base.extend<ApiFixtures>({
  apiContext: async ({ }, use) => {
    const context = await request.newContext({
      baseURL: API_URL,
    });

    // const res = await context.get('eod?symbols=AAPL&limit=1&access_key=' + ACCESS_KEY);
    // console.log('DIRECT TEST STATUS:', await res.text());

    await use(context);
    await context.dispose();
  },

  marketApi: async ({ apiContext }, use) => {
    const client = new MarketstackClient(apiContext, ACCESS_KEY);
    await use(client);
  },
});
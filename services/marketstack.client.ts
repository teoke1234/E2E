import { APIRequestContext, expect } from '@playwright/test';

export class MarketstackClient {
  constructor(
    private request: APIRequestContext,
    private accessKey: string
  ) { }

  async getEod(symbol: string, limit = 20) {
    const res = await this.request.get('eod', {
      params: {
        access_key: this.accessKey,
        symbols: symbol,
        limit,
      },
    });

    expect(res.ok()).toBeTruthy();
    const body = await res.text();

    return JSON.parse(body);
  }

  async getTicker(symbol: string) {
    const res = await this.request.get(`tickers/${symbol}`, {
      params: {
        access_key: this.accessKey,
      },
    });

    expect(res.ok()).toBeTruthy();
    return res.json();
  }

  async getTickerEod(symbol: string) {
    const res = await this.request.get(`tickers/${symbol}/eod`, {
      params: {
        access_key: this.accessKey,
      },
    });

    expect(res.ok()).toBeTruthy();
    return res.json();
  }
}
export const CURRENT_ENV = process.env.TEST_ENV || 'prd';

export const BASE_URL = process.env.BASE_URL || 'https://www.checklyhq.com/';
export const APP_URL = process.env.APP_URL || 'https://app.checklyhq.com/';
export const API_URL = process.env.API_URL || 'https://api.marketstack.com/v2/';
export const ACCESS_KEY = process.env.ACCESS_KEY;
export const TIMEOUT = Number(process.env.TIMEOUT) || 30000;
export const RETRY_COUNT = Number(process.env.RETRY_COUNT) || 2;
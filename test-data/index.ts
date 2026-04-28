import { CURRENT_ENV } from '@constants/env';
import { loginCredential as stgLoginData } from './login-stg';
import { loginCredential as prodLoginData } from './login-prod';

const dataMap = {
  stg: stgLoginData,
  prd: prodLoginData,
};

export const credentials = dataMap[CURRENT_ENV] || prodLoginData;

import { CURRENT_ENV } from '@constants/env';
import { loginCredential as stgLoginData } from './login-stg';
import { loginCredential as prodLoginData } from './login-prod';

type Environment = 'stg' | 'prod';

const dataMap: Record<Environment, typeof stgLoginData> = {
  stg: stgLoginData,
  prod: prodLoginData,
};

export const credentials = dataMap[CURRENT_ENV as Environment] || prodLoginData;
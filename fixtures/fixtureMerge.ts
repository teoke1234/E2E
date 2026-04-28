import { mergeTests } from '@playwright/test';
import { test as loginAsRole } from './loginAsRole';
import { test as apiTest } from './api';

if (!loginAsRole || !apiTest) {
  throw new Error('One or more fixtures are undefined. Check imports.');
}

export const test = mergeTests(loginAsRole, apiTest);
export { expect } from '@playwright/test';
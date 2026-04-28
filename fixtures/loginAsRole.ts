import { test as base } from '@playwright/test';
import { RoleManager } from './RoleManager';

type RoleFixtures = {
  roleManager: RoleManager;

};

/**
* Custom test fixture that provides a `RoleManager` instance for managing user roles and sessions. 
 */
export const test = base.extend<RoleFixtures>({
  roleManager: async ({ browser }, use) => {
    const manager = new RoleManager(browser);
    await use(manager);
    await manager.cleanup();
  },

});

export { expect } from '@playwright/test';
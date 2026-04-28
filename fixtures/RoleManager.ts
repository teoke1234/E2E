import { Browser, Page } from '@playwright/test';
import { PageManager } from '@pages/1_PageManager';
import { RoleType } from '@constants/roles';
import path from 'path';

export class RoleManager {
  private roleMap = new Map<RoleType, PageManager>();
  constructor(private browser: Browser) { }

  /**
   * Return a cached `PageManager` for the requested role.
   * Creates a new browser context and page if no session exists.
   *
   * @param role - The user role to use for the session. Defaults to `guest`.
   * @returns A `PageManager` instance for the requested role.
   */
  async asRole(role: RoleType = "guest"): Promise<PageManager> {
    if (this.roleMap.has(role)) {
      return this.roleMap.get(role)!;
    }

    let contextOptions = {};
    if (role !== "guest") {
      const storageStatePath = path.join(process.cwd(), '.auth', `${role}.json`);
      contextOptions = { storageState: storageStatePath };
    }

    const context = await this.browser.newContext(contextOptions);
    const page = await context.newPage();
    const app = new PageManager(page);

    this.roleMap.set(role, app);
    return app;
  }

  /**
  * Closes all browser contexts and clears the role map.
 */
  async cleanup() {
    for (const app of Array.from(this.roleMap.values())) {
      await app.page.context().close();
    }
    this.roleMap.clear();
  }
}
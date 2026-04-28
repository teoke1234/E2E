import { expect, test as setup } from '@playwright/test';
import { credentials } from '@test-data/index';
import path from 'path';
import { PopupLoginPage } from '@pages/PopupLogin.page';


/**
 * Global setup to authenticate users for all roles and save their storage states.
 * This runs once before all tests, ensuring that each role has a valid session.
 * The storage states are saved in the `.auth` directory for later use in tests.
 */
for (const user of credentials) {
  setup(`Setup auth for ${user.role}`, async ({ page }) => {
    const popupLogin = new PopupLoginPage(page);
    await popupLogin.performLogin(user.email, user.password);
    expect(page.getByRole('link', { name: `${user.email} TEAM` })).toBeVisible();

    await page.context().storageState({
      path: path.join(__dirname, `../.auth/${user.role}.json`)
    });
    console.log(`✅ Storage state saved for ${user.role}`);

  });
}
import { Page, Locator } from '@playwright/test';

export class LandingPage {
  readonly page: Page;
  readonly loginLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginLink = page.getByRole('link', { name: 'Login', exact: true });
  }

  async openLoginPopup(): Promise<Page> {
    const [popup] = await Promise.all([
      this.page.waitForEvent('popup'),
      this.loginLink.click(),
    ]);
    return popup;
  }
}
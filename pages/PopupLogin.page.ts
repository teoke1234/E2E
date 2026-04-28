import { Page, Locator } from '@playwright/test';
import { APP_URL } from '@constants/env';

export class PopupLoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly loginBtn: Locator;
  readonly passwordInput: Locator;
  readonly continueBtn: Locator;

  constructor(page: Page) {
    this.page = page; 
    this.emailInput = page.getByRole('textbox', { name: 'Email address' });
    this.loginBtn = page.getByRole('button', { name: 'Log in' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.continueBtn = page.getByRole('button', { name: 'Continue' });
  }

  async performLogin(email: string, pass: string) {
    await this.page.goto(APP_URL);
    console.log(`Navigated to ${APP_URL} for login.`);

    await this.emailInput.fill(email);
    await this.loginBtn.click();
    
    await this.passwordInput.waitFor({ state: 'visible' });
    await this.passwordInput.fill(pass);  
    await this.continueBtn.click();
    
    await this.page.waitForLoadState('networkidle');
  }
}
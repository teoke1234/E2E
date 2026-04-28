import { Page } from '@playwright/test';
import { LandingPage } from './LandingPage.page';
import { PopupLoginPage } from './PopupLogin.page';
import { DashboardPage } from './DashBoard.page'; 
// import { DashboardPage } from './Dashboard.page'; // Add page to here

export class PageManager {
  readonly landingPage: LandingPage;
  readonly popupLogin: PopupLoginPage;
  readonly dashboardPage: DashboardPage;
  // readonly dashboardPage: DashboardPage;

  constructor(readonly page: Page) {
    this.landingPage = new LandingPage(page);
    this.popupLogin = new PopupLoginPage(page);
    this.dashboardPage = new DashboardPage(page);
    // this.dashboardPage = new DashboardPage(page);
  }


  async goto(url: string) {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }
}
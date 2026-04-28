import { Page, Locator } from '@playwright/test';
import { SideMenu } from './common/sideMenu';
import { UpperHeader } from './common/upperHeader';

export class DashboardPage {
  readonly page: Page;
  private emailDisplay: Locator;
  readonly upperHeader: UpperHeader;
  readonly sideMenu: SideMenu;

  constructor(page: Page) {
    this.page = page; 
    this.emailDisplay = page.getByTestId('user-email');
    this.upperHeader = new UpperHeader(page);
    this.sideMenu = new SideMenu(page);

  }



  
}
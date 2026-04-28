import { Page, Locator } from '@playwright/test';

type SideMenuOptions = 'Home' | 'Heartbeats' | 'Test sessions' | 'Events' | 'Reporting' 

export class SideMenu {
  readonly page: Page;
  private togglerSideBar: Locator;
  private closeSideBar: Locator;
  private sideMenuOption: (option: SideMenuOptions) => Locator;
  readonly detectSection : Locator;

  constructor(page: Page) {
    this.page = page; 
    this.togglerSideBar = page.getByRole('button', { name: 'Toggle sidebar' })
    this.closeSideBar = page.getByRole('button', { name: 'Close sidebar' })
    this.sideMenuOption = (option: SideMenuOptions) => page.getByRole('button', { name: option })
    this.detectSection = page.locator('div').filter({ hasText: /^Detect$/ })
  }

    async clickSideMenuOption(option: SideMenuOptions) {
        await this.sideMenuOption(option).click();
    }
}
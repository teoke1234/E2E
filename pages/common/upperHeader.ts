import { Page, Locator } from '@playwright/test';
import { SideMenu } from './sideMenu';

export class UpperHeader {
    readonly page: Page;
    private checklyLogo: Locator;
    private newBtn: Locator;
    private togglerSideBar: Locator;
    private sideMenu: SideMenu

    constructor(page: Page) {
        this.page = page;
        this.checklyLogo = page.getByRole('link').nth(1)
        this.newBtn = page.getByRole('button', { name: 'Create new entity' })
        this.togglerSideBar = page.getByRole('button', { name: 'Toggle sidebar' })
        this.sideMenu = new SideMenu(page);
    }

    async openSideBar() {
        if (!await this.sideMenu.detectSection.isVisible()) {
            await this.togglerSideBar.click();
            await this.sideMenu.detectSection.waitFor({ state: 'visible' });
        }
    }





}




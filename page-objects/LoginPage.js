import { expect } from '@playwright/test'
import { Navigation } from './Navigation.js'

export class LoginPage {
    constructor(page) {
        this.page = page

      
        this.gotoSignupButton = page.locator('[data-qa="go-to-signup-button"]')
    
    }

    
    moveToSignup = async () => {
        await this.gotoSignupButton.waitFor()
        await this.gotoSignupButton.click()
        await expect(this.page).toHaveURL(/\/signup/, {timeout: 3000})
    }
}
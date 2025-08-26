import { isDesktopVieport } from '../utils/isDesktopViewport.js'

export class Navigation {
    constructor(page) {
        this.page = page
  
    this.basketCounter = page.locator('[data-qa="header-basket-count"]')
    this.checkoutlink = page.getByRole('link', {name: 'Checkout'})
    this.mobileBurgerButton =page.locator('[data-qa="burger-button"]')
    }

    getBasketCount = async () => {
        await this.basketCounter.waitFor()
        const text = await this.basketCounter.innerText()
        return parseInt(text, 10)
    }

    //true if desktop
    // false if mobile ->reverse false ->!false === true

    goToCheckout = async () => {
        if (!isDesktopVieport(this.page)) {
            await this.mobileBurgerButton.waitFor()
            await this.mobileBurgerButton.click()
        }
            await this.checkoutlink.waitFor()
            await this.checkoutlink.click()
            await this.page.waitForURL("/basket")


    }

  
}
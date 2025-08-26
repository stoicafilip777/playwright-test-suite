import { expect } from '@playwright/test'

export class Checkout {
    constructor(page) {
        this.page = page

        this.basketCards = page.locator('[data-qa="basket-card"]')
        this.basketItemPrice = page.locator('[data-qa="basket-item-price"]')
        this.ItemPriceRemoveButton = page.locator('[data-qa="basket-card-remove-item"]')
        this.continueToCheckoutButton = page.locator('[data-qa="continue-to-checkout"]')
        
    }

    removeCheapestProduct = async () => {
        await this.basketCards.first().waitFor()
        const itemsBeforeRemoval = await this.basketCards.count()
        await this.basketItemPrice.first().waitFor()
        const allPriceText = await this.basketItemPrice.allInnerTexts()
        // [ '499$', '599$', '320$' ] -> [ 499, 599, 320 ]
        const justNumbers = allPriceText.map((element) => {
            const withoutDollarSign = element.replace('$', '')
            return parseInt(withoutDollarSign, 10)
           
        })
        const smallestPrice = Math.min(...justNumbers)
        const smallestPriceIDX = justNumbers.indexOf(smallestPrice)
        const specificRemoveButton = this.ItemPriceRemoveButton.nth(smallestPriceIDX)
        // Wait for the remove button to be visible 
        await specificRemoveButton.waitFor()
        // Click on the remove button   
        await specificRemoveButton.click()
        // Wait for the basket to be updated

        await expect(this.basketCards).toHaveCount(itemsBeforeRemoval - 1)
        // Wait for the basket to be updated
      
    }

    continueToCheckout = async () => {
        await this.continueToCheckoutButton.waitFor()
        await this.continueToCheckoutButton.click()
        await expect(this.page).toHaveURL(/\/login/, {timeout: 3000})
    }
 
    

}

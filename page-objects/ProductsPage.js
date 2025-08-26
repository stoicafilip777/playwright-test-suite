import { expect } from '@playwright/test'
import { Navigation } from './Navigation.js'
import { isDesktopVieport } from '../utils/isDesktopViewport.js'

export class ProductsPage {
    constructor(page) {
        this.page = page

        this.addButtons = page.locator('[data-qa="product-button"]')
        this.sortDropdown = page.locator('[data-qa="sort-dropdown"]')
        this.productTitle = page.locator('[data-qa="product-title"]')
      
    }

    visit = async () => {
        await this.page.goto('/')
    }
       

     addProductToBasket = async (index) => {
     const specificAddButton = this.addButtons.nth(index)
     await specificAddButton.waitFor()
     await expect(specificAddButton).toHaveText('Add to Basket')
     const navigation = new Navigation(this.page)
     // only desktop viewport
     let basketCountBeforeAdding
     if (isDesktopVieport(this.page)) {
      basketCountBeforeAdding = await navigation.getBasketCount()
    
     }
     await specificAddButton.click()
     await expect(specificAddButton).toHaveText('Remove from Basket')
      // only desktop viewport
        if (isDesktopVieport(this.page)) {
     const basketCountAfterAdding = await navigation.getBasketCount()
     expect(basketCountAfterAdding).toBeGreaterThan(basketCountBeforeAdding)
    }
}

    sortBycheapest = async () => {
        await this.sortDropdown.waitFor()
        await this.productTitle.first().waitFor()
        const productsTitleBeforeSorting = await this.productTitle.allInnerTexts()
        await this.sortDropdown.selectOption("price-asc")
        const productsTitleAfterSorting = await this.productTitle.allInnerTexts()
        expect(productsTitleBeforeSorting).not.toEqual(productsTitleAfterSorting)
      
    }
}

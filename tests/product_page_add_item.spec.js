import { expect, test } from '@playwright/test';
test.skip('product page add to basket', async ({ page }) => {
    await page.goto('/');

    const addToBasketButton = page.locator('[data-qa="product-button"]').first()
    const basketCounter = page.locator('[data-qa="header-basket-count"]')

    await addToBasketButton.waitFor()
    await expect(addToBasketButton).toHaveText('Add to Basket')
    await expect(basketCounter).toHaveText("0")

    await addToBasketButton.click()

    await expect(addToBasketButton).toHaveText('Remove from Basket')

    await expect(basketCounter).toHaveText("1")

    const checkoutlink = page.getByRole('link', {name: 'Checkout'})
    await checkoutlink.waitFor()
    await checkoutlink.click()
    await expect(page).toHaveURL(/.*\/basket/)


    
   await page.pause()

});
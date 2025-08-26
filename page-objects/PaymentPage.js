import { expect } from '@playwright/test'


export class PaymentPage {
    constructor(page) {
        this.page = page

        this.discountCode = page.frameLocator('[data-qa="active-discount-container"]')
                                .locator('[data-qa="discount-code"]')   
        this.discountInput = page.getByPlaceholder('Discount code')
        this.activateDiscountButton = page.locator('[data-qa="submit-discount-button"]')
        this.totalValue = page.locator('[data-qa="total-value"]')
        this.discountedValue = page.locator('[data-qa="total-with-discount-value"]')
        this.discountActiveMessage = page.locator('[data-qa="discount-active-message"]')
        this.creditCardOwnerInput = page.getByPlaceholder('Credit card owner')
        this.creditCardNumberInput = page.getByPlaceholder('Credit card number')
        this.creditCardValidUntilInput = page.getByPlaceholder('Valid until')
        this.creditCardCVCInput = page.getByPlaceholder('Credit card cvc')
        this.payButton = page.locator('[data-qa="pay-button"]')

                                
    }

    activateDiscount = async () => {
        
        await this.discountCode.waitFor()
        const code = await this.discountCode.innerText()
        await this.discountInput.waitFor()
        await this.discountInput.fill(code)
        await expect(this.discountInput).toHaveValue(code)
       


        this.activateDiscountButton.waitFor()
        this.activateDiscountButton.click()
        await this.discountActiveMessage.waitFor()


        await this.discountedValue.waitFor()
        const discountValueText = await this.discountedValue.innerText() // "345$"
        const discountValueOnlyStringNumber = discountValueText.replace("$", "")
        const discountValueNumber = parseInt(discountValueOnlyStringNumber, 10)

        await this.totalValue.waitFor()
        const totalValueText = await this.totalValue.innerText()
        const totalValueOnlyStringNumbers = totalValueText.replace("$", "")
        const totalValueNumber = parseInt(totalValueOnlyStringNumbers, 10)

        expect(discountValueNumber).toBeLessThan(totalValueNumber)

    }

    fillPaymentDetails = async (paymentDetails) => {
        await this.creditCardOwnerInput.waitFor()
        await this.creditCardOwnerInput.fill(paymentDetails.owner)
        await this.creditCardNumberInput.waitFor()
        await this.creditCardNumberInput.fill(paymentDetails.number)
        await this.creditCardValidUntilInput.waitFor()
        await this.creditCardValidUntilInput.fill(paymentDetails.validUntil)
        await this.creditCardCVCInput.waitFor()
        await this.creditCardCVCInput.fill(paymentDetails.cvc)

    }

    completePayment = async () => {
        await this.payButton.waitFor()
        await this.payButton.click()
        await expect(this.page).toHaveURL(/.*\/thank-you/, {timeout: 3000})
    }


}

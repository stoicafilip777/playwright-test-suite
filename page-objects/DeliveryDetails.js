import { expect } from '@playwright/test'
import { Navigation } from './Navigation.js'
export class DeliveryDetails {
    constructor(page) {
        this.page = page

        this.firstNameInput = page.getByPlaceholder('First name')
        this.lastNameInput = page.getByPlaceholder('Last name')
        this.streetInput = page.getByPlaceholder('Street')
        this.postcodeInput = page.getByPlaceholder('Post code')
        this.cityInput = page.getByPlaceholder('City')
        this.continueButton = page.locator('[data-qa="continue-to-payment-button"]')
        this.countryDropdown = page.locator('[data-qa="country-dropdown"]')
        this.saveButton = page.getByRole('button', { name: 'Save address for next time' })
        this.savedAddressContainer = page.locator('[data-qa="saved-address-container"]')
        this.savedAddressFirstName = page.locator('[data-qa="saved-address-firstName"]')
        this.savedAddressLastName = page.locator('[data-qa="saved-address-lastName"]')
        this.savedAddressStreet = page.locator('[data-qa="saved-address-street"]')
        this.savedAddressPostcode = page.locator('[data-qa="saved-address-postcode"]')
        this.savedAddressCity = page.locator('[data-qa="saved-address-city"]')
        this.savedAddressCountry = page.locator('[data-qa="saved-address-country"]')
        

    }

    fillDeliveryDetails = async (userAddress) => {
        await this.firstNameInput.waitFor()
        await this.firstNameInput.fill(userAddress.firstName)
        await this.lastNameInput.waitFor()
        await this.lastNameInput.fill(userAddress.lastName)
        await this.streetInput.waitFor()
        await this.streetInput.fill(userAddress.street)
        await this.cityInput.waitFor()
        await this.cityInput.fill(userAddress.city)
        await this.postcodeInput.waitFor()
        await this.postcodeInput.fill(userAddress.postcode)
        await this.countryDropdown.waitFor()
        await this.countryDropdown.selectOption(userAddress.country)
        

    }
    
       saveDetails = async () => {
        const AdressCountBeforeSaving = await this.savedAddressContainer.count()
        await this.saveButton.waitFor()
        await this.saveButton.click()
        await this.savedAddressContainer.waitFor()
        await expect(this.savedAddressContainer).toHaveCount(AdressCountBeforeSaving + 1)


        await this.savedAddressFirstName.first().waitFor()
        expect(await this.savedAddressFirstName.first().innerText()).toBe(await this.firstNameInput.inputValue())

        await this.savedAddressLastName.first().waitFor()
        expect(await this.savedAddressLastName.first().innerText()).toBe(await this.lastNameInput.inputValue())

        await this.savedAddressStreet.first().waitFor()
        expect(await this.savedAddressStreet.first().innerText()).toBe(await this.streetInput.inputValue())

        await this.savedAddressPostcode.first().waitFor()
        expect(await this.savedAddressPostcode.first().innerText()).toBe(await this.postcodeInput.inputValue())

        await this.savedAddressCity.first().waitFor()
        expect(await this.savedAddressCity.first().innerText()).toBe(await this.cityInput.inputValue())

        await this.savedAddressCountry.first().waitFor()
        expect(await this.savedAddressCountry.first().innerText()).toBe(await this.countryDropdown.inputValue())
        // Check if the saved address is displayed in the saved address container

    }

    continueToPayment = async () => {
        await this.continueButton.waitFor()
        await this.continueButton.click()
        await this.page.waitForURL(/\/payment/, { timeout: 3000 })

    }
}
    

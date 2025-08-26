export class RegisterPage {
    constructor(page) {
        this.page = page

       
        this.emailInput = page.getByPlaceholder('e-mail')
        this.passwordInput = page.getByRole('textbox', { name: 'Password'})
        this.registerSubmitButton = page.getByRole('button', { name: 'Register' })
    }

    signUpAsNewUser = async (email, password) => {
        await this.emailInput.waitFor()
        await this.emailInput.fill(email)
        await this.passwordInput.waitFor()
        await this.passwordInput.fill(password)
        await this.registerSubmitButton.waitFor()
        await this.registerSubmitButton.click()
        await this.page.waitForURL(/\/delivery-details/, { timeout: 3000 })
    

}

}
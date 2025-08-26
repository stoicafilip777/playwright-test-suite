import { test } from '@playwright/test'
import  { MyAccountPage } from '../page-objects/MyAccountPage.js'
import { getLoginToken } from '../api-calls/getLoginToken.js'
import { adminDetails} from '../data/userDetails.js'

test("My Account using cookie injection and mocking network request", async ({ page }) => {
    
    const loginToken = await getLoginToken(adminDetails.username, adminDetails.password)

    await page.route('**/api/user**', async (route, request) => {
        await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Internal Server Error - Mocking in Playwright'}),
        })
    })


    const myAccount = new  MyAccountPage(page)
// Navigate to the My Account page
    await myAccount.visit()
    await page.evaluate(([loginTokenInsideBrowserCode]) => { 
        document.cookie = "token=" + loginTokenInsideBrowserCode
    }, [loginToken])

    await myAccount.visit()
    await myAccount.waitDorPageheading()
    await myAccount.waitForErrorMessage()
  
  }) 
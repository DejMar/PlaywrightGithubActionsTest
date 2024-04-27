import { Expect, expect } from "@playwright/test"

export class Checkout {
    constructor(page){
        this.page = page
        this.basketCards = page.locator('[data-qa="basket-card"]')
        this.basketItemPrice = page.locator('[data-qa="basket-item-price"]')
        this.basketItemRemoveButton = page.locator('[data-qa="basket-card-remove-item"]')
        this.continueToCheckoutButton = page.locator('[data-qa="continue-to-checkout"]')
    }
    removeCheapestProduct = async () =>{
        const allPriceTexts = await this.basketItemPrice.allInnerTexts()
        const justNumbers = allPriceTexts.map((element) => {
            const withoutDollarSign = element.replace("$","")
            return parseInt(withoutDollarSign, 10)
        })
        const smallestPrice = Math.min(...justNumbers)
        const smallestPriceIdx = justNumbers.indexOf(smallestPrice)
        const specificRemoveButton = this.basketItemRemoveButton.nth(smallestPriceIdx)
        const itemsBeforeRemoval = await this.basketCards.count()
        
        await this.basketCards.first().waitFor()
        await this.basketItemPrice.first().waitFor()
        await specificRemoveButton.waitFor()
        await specificRemoveButton.click()
        await expect(this.basketCards).toHaveCount(itemsBeforeRemoval - 1)
    }
    continueToCheckut = async () => {
        await this.continueToCheckoutButton.waitFor()
        await this.continueToCheckoutButton.click()
        await this.page.waitForURL(/\/login/, {timeout: 3000})
    }
}
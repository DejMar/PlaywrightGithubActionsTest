import { expect } from "@playwright/test"
import { Navigation } from "./Navigation"

export class ProductsPage {
    constructor(page) {
        this.page = page
        this.addButton = page.locator('[data-qa="product-button"]')
        this.sortDropdown = page.locator('[data-qa="sort-dropdown"]')
        this.productTitle = page.locator('[data-qa="product-title"]')
    }
    visit = async () => {
        await this.page.goto("/")
        await this.page.setViewportSize({ width: 1920, height: 1080 })
    }

    addProductToBasket = async (index) => {
        const specificAddButton = this.addButton.nth(index)
        await specificAddButton.waitFor()
        await expect(specificAddButton).toHaveText("Add to Basket")
        const navigation = new Navigation(this.page)
        const basketCountBeforeAdding = await navigation.getBasketCount()
        await specificAddButton.click()
        await expect(specificAddButton).toHaveText("Remove from Basket")
        const basketCountAfterAdding = await navigation.getBasketCount()
        expect(basketCountAfterAdding).toBeGreaterThan(basketCountBeforeAdding)
    }

    sortByCheapest = async () => {
        await this.sortDropdown.waitFor()
        await this.productTitle.first().waitFor()
        const productTitleBeforeSorting = await this.productTitle.allInnerTexts()
        await this.sortDropdown.selectOption("price-asc")
        const productTitleAfterSorting = await this.productTitle.allInnerTexts()
        expect(productTitleAfterSorting).not.toEqual(productTitleBeforeSorting)
    }
}
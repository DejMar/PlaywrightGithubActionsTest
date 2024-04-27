import { test } from "@playwright/test"
import { ProductsPage } from "../page-objects/ProductsPage"
import { Navigation } from "../page-objects/Navigation"
import { Checkout } from "../page-objects/Checkout"
import { LoginPage } from "../page-objects/LoginPage"
import { RegisterPage } from "../page-objects/RegisterPage"
import { v4 as uuidv4 } from 'uuid'
import { DeliveryDetails } from "../page-objects/DeliveryDetails"
import { deliveryDetails as userAddress } from "./../data/deliveryDetails"
import { PaymentPage } from "../page-objects/PaymentPage"
import { paymentDetails } from "./../data/paymentDetails"

test.describe('First Step of tests', () => {
    let productsPage
    let navigation
    let checkout
    let login
    let registerPage
    let deliveryDetails
    let paymentPage


    test.beforeEach(async ({ page }) => {
        productsPage = new ProductsPage(page)
        navigation = new Navigation(page)
        checkout = new Checkout(page)
        login = new LoginPage(page)
        registerPage = new RegisterPage(page)
        deliveryDetails = new DeliveryDetails(page)
        paymentPage = new PaymentPage(page)
    })

    test("New User full end-to-end test journey", async ({ page }) => {
        await productsPage.visit()
        await productsPage.sortByCheapest()
        await productsPage.addProductToBasket(0)
        await productsPage.addProductToBasket(1)
        await productsPage.addProductToBasket(2)
        await navigation.goToCheckout()
        await checkout.removeCheapestProduct()
        await checkout.continueToCheckut()
        await login.moveToSignUp()
        const emailID = uuidv4()
        const email = emailID + "@gmail.com"
        const password = uuidv4()
        await registerPage.signUpAsNewUser(email, password)
        await deliveryDetails.fillDetails(userAddress)
        await deliveryDetails.saveDetails()
        await deliveryDetails.continueToPayment()
        await paymentPage.activateDiscount()
        await paymentPage.fillPaymentDetails(paymentDetails)
        await paymentPage.completePayment()
    })
})

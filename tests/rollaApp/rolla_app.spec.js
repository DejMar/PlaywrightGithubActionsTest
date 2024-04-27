import { test } from "@playwright/test"
const fs = require('fs').promises;
const os = require('os');

test.describe('Rolla App Test Cases', () => {
    test.skip("Get token test", async ({ }) => {
        // Set the endpoint URL
        const url = 'https://one.rolla.app/api/authenticate';

        // Define the form data
        const formData = new URLSearchParams();
        formData.append('email', 'exportstrava@gmail.com');
        formData.append('pass', 'TechTask243');

        // Send a POST request with form data using fetch
        const response = await fetch(url, {
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        //Extract token from the response
        const responseBody = await response.json()
        const token = responseBody.token
        const hasProfile = responseBody.hasProfile

        // Log the response status code
        console.log('Response Status Code:', response.status)
        console.log('Response Token:', token);
        console.log('Response hasProfile:', hasProfile);
    })
})


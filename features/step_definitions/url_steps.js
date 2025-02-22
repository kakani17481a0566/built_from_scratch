const { Given, When, Then } = require('@cucumber/cucumber');
const chai = require('chai');
const expect = chai.expect;
const locators = require('../../locators/alllocators.js'); // Adjusted path for better readability

// Open the URL
Given('I open the URL {string}', async function (url) {
    console.log(`Opening the URL: ${url}`);
    await browser.url(url);
    await browser.waitUntil(async () => {
        const state = await browser.execute(() => document.readyState);
        return state === 'complete';
    }, {
        timeout: 10000, // 10 seconds
        timeoutMsg: 'Page did not load within 10 seconds'
    });
});

// Wait for a specified number of seconds
When('I wait for {int} seconds', async function (seconds) {
    console.log(`Waiting for ${seconds} seconds...`);
    await browser.pause(seconds * 1000); // Convert seconds to milliseconds
    console.log(`Waited for ${seconds} seconds.`);
});

// Click the submit button using the locator
When('I click the submit button using the locator {string}', async function (locatorName) {
    const locator = locators[locatorName];
    if (!locator) {
        throw new Error(`Locator "${locatorName}" not found in the locators file.`);
    }

    console.log(`Clicking the submit button using the locator "${locatorName}" with selector "${locator}"...`);
    const button = await $(locator);
    await button.waitForDisplayed({ timeout: 5000 });
    await button.click();
    console.log('Submit button was successfully clicked.');
});



// Step to verify if an element contains specific text
Then('the element with locator {string} should contain the text {string}', async function (locatorName, expectedText) {
    console.log(`Verifying that the element with locator "${locatorName}" contains the text "${expectedText}"...`);

    // Retrieve the locator dynamically based on the locator name
    const locator = locators[locatorName];
    if (!locator) {
        throw new Error(`Locator "${locatorName}" not found in the locators file.`);
    }

    // Find the element and wait for it to be displayed
    const element = await $(locator);
    await element.waitForDisplayed({ timeout: 5000 });

    // Get the text of the element
    const actualText = await element.getText();

    // Assert that the actual text contains the expected text
    expect(actualText).to.include(expectedText, `Expected element to contain text "${expectedText}", but found "${actualText}"`);
    console.log(`Element with locator "${locatorName}" contains the expected text "${expectedText}".`);
});

// Step to verify if an element does NOT contain specific text
Then('the element with locator {string} should not contain the text {string}', async function (locatorName, unexpectedText) {
    console.log(`Verifying that the element with locator "${locatorName}" does not contain the text "${unexpectedText}"...`);

    // Retrieve the locator dynamically based on the locator name
    const locator = locators[locatorName];
    if (!locator) {
        throw new Error(`Locator "${locatorName}" not found in the locators file.`);
    }

    // Find the element and wait for it to be displayed
    const element = await $(locator);
    await element.waitForDisplayed({ timeout: 5000 });

    // Get the text of the element
    const actualText = await element.getText();

    // Assert that the actual text does NOT contain the unexpected text
    expect(actualText).to.not.include(unexpectedText, `Expected element not to contain text "${unexpectedText}", but found "${actualText}"`);
    console.log(`Element with locator "${locatorName}" does not contain the text "${unexpectedText}".`);
});


When('I enter {string} into the input field with locator {string}', async function (text, locatorName) {
    console.log(`Entering text "${text}" into the input field with locator "${locatorName}"...`);

    // Retrieve the locator dynamically based on the locator name
    const locator = locators[locatorName];
    if (!locator) {
        throw new Error(`Locator "${locatorName}" not found in the locators file.`);
    }

    // Find the input field and wait for it to be displayed
    const inputField = await $(locator);
    await inputField.waitForDisplayed({ timeout: 5000 });

    // Clear the input field (if necessary) and enter the text
    await inputField.clearValue(); // Clear any existing text
    await inputField.setValue(text);
    console.log(`Text "${text}" was successfully entered into the input field.`);
});

// Step to verify the value of an input field
Then('the input field with locator {string} should contain the text {string}', async function (locatorName, expectedText) {
    console.log(`Verifying that the input field with locator "${locatorName}" contains the text "${expectedText}"...`);

    // Retrieve the locator dynamically based on the locator name
    const locator = locators[locatorName];
    if (!locator) {
        throw new Error(`Locator "${locatorName}" not found in the locators file.`);
    }

    // Find the input field and wait for it to be displayed
    const inputField = await $(locator);
    await inputField.waitForDisplayed({ timeout: 5000 });

    // Get the value of the input field
    const actualValue = await inputField.getValue();

    // Assert that the actual value matches the expected text
    expect(actualValue).to.equal(expectedText, `Expected input field to contain text "${expectedText}", but found "${actualValue}"`);
    console.log(`Input field with locator "${locatorName}" contains the expected text "${expectedText}".`);
});


// Step to scroll until an element with a specific locator is found
When('I scroll until the element with locator {string} is visible', async function (locatorName) {
    console.log(`Scrolling until the element with locator "${locatorName}" is visible...`);

    // Retrieve the locator dynamically based on the locator name
    const locator = locators[locatorName];
    if (!locator) {
        throw new Error(`Locator "${locatorName}" not found in the locators file.`);
    }

    // Find the element
    const element = await $(locator);

    // Scroll until the element is displayed
    await element.scrollIntoView({ block: 'center', inline: 'center' });
    await element.waitForDisplayed({ timeout: 10000 }); // Wait up to 10 seconds for the element to be visible

    console.log(`Element with locator "${locatorName}" is now visible.`);
});

// Step to verify that the element is visible after scrolling
Then('the element with locator {string} should be visible', async function (locatorName) {
    console.log(`Verifying that the element with locator "${locatorName}" is visible...`);

    // Retrieve the locator dynamically based on the locator name
    const locator = locators[locatorName];
    if (!locator) {
        throw new Error(`Locator "${locatorName}" not found in the locators file.`);
    }

    // Find the element and wait for it to be displayed
    const element = await $(locator);
    await element.waitForDisplayed({ timeout: 5000 });

    // Assert that the element is displayed
    expect(await element.isDisplayed()).to.be.true;
    console.log(`Element with locator "${locatorName}" is visible.`);
});
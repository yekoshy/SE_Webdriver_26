const { assert } = require('chai');
const data = require("./testcases.json"); // Adjust path if necessary
const { chromePage, firefoxPage, edgePage, safariPage} = require("./browsers"); // Adjust path if necessary

// NOTE: the Page class used must open the browser. We use the browser-specific Page classes below.
[firefoxPage, chromePage, edgePage].forEach(PageClass => { 
  describe('7 Char Validator Data Driven Tests in ' + PageClass.name, function () {

    // Disable timeout for UI tests
    this.timeout(0);

    const page = new PageClass('https://testpages.eviltester.com/apps/7-char-val/');

  before(async function(){
    // Setup before all tests if needed
    await page.open();
  });

  beforeEach(async function(){
    //await page.open();
  });

  after(async function(){
    // Teardown after all tests if needed
    await page.close();
  });

  afterEach(async function(){
    //await page.close();
  });

  // Iterate through the JSON array to create dynamic test cases
  data.forEach(testData => {
    it(`${testData.title}`, async function() {
      try {
        let inputChars = testData.input;
        let expectedResult = testData.expected;

        // Execute the test steps using the POM
        await page.checkValue(inputChars);
        
        // Fetch the actual validation message from the UI
        let actualMessage = await page.getValidationMessage();
        
        // Since some expected values in the JSON contain extra descriptive text 
        // (e.g., "Invalid Value (or truncated...)"), we extract the core expected string.
        let coreExpected = expectedResult.includes("Invalid") ? "Invalid Value" : "Valid Value";

        // Assert that the actual message matches the core expected message
        assert.strictEqual(
            actualMessage, 
            coreExpected, 
            `Test Failed for input: "${inputChars}". Expected: ${coreExpected}, but got: ${actualMessage}`
        );

      } catch(e) {
        console.error(e);
        throw e; // Re-throw the error so Mocha correctly marks the test as failed
      }
    });
  });

});
})

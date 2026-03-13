Based on the application's requirements and its specific design (created by Alan Richardson / EvilTester), the **7 Char Val** app is a micro-application specifically built for testing practice. It contains deliberate bugs, obfuscated JavaScript, and is designed to be explored deeply.

### Understanding the UI & Rules
1. **Input Field:** An entry field (name=`characters`).
2. **Button:** A button to trigger validation (value=`Check Input`).
3. **Validation Message Field:** A non-editable field (name=`validation_message`) that outputs either `"Valid Value"` or `"Invalid Value"`.
4. **Rules:** Exactly 7 characters long. Allowed characters are `A-Z`, `a-z`, `0-9`, and `*`.

Here is a comprehensive set of test cases categorized by testing techniques:

### 1. Functional Testing - Positive (Valid Inputs)
These tests verify that the application accepts inputs that strictly meet all criteria.
* **TC01: All Uppercase Letters:** Enter exactly 7 uppercase letters (e.g., `ABCDEFG`), click "Check Input". *Expected: `validation_message` shows "Valid Value".*
* **TC02: All Lowercase Letters:** Enter exactly 7 lowercase letters (e.g., `abcdefg`), click "Check Input". *Expected: "Valid Value".*
* **TC03: All Numbers:** Enter exactly 7 numbers (e.g., `0123456`), click "Check Input". *Expected: "Valid Value".*
* **TC04: All Asterisks:** Enter exactly 7 asterisks (`*******`), click "Check Input". *Expected: "Valid Value".*
* **TC05: Mixed Valid Characters:** Enter a combination of all allowed character types (e.g., `aB3*X9z`), click "Check Input". *Expected: "Valid Value".*

### 2. Functional Testing - Negative (Length Constraints - BVA)
Using Boundary Value Analysis (BVA) to verify the application strictly enforces the 7-character limit.
* **TC06: Empty Input (Length 0):** Leave the input field empty, click "Check Input". *Expected: "Invalid Value".*
* **TC07: Minimum Length - 1 (Length 6):** Enter 6 valid characters (e.g., `aB3*X9`), click "Check Input". *Expected: "Invalid Value".*
* **TC08: Maximum Length + 1 (Length 8):** Enter 8 valid characters (e.g., `aB3*X9zA`), click "Check Input". *Expected: "Invalid Value" (or the UI prevents typing the 8th character via a `maxlength` attribute).* * **TC09: Single Character (Length 1):** Enter 1 valid character (e.g., `A`), click "Check Input". *Expected: "Invalid Value".*
* **TC10: Extremely Long Input:** Paste a string of 50+ valid characters, click "Check Input". *Expected: "Invalid Value" (or truncated to 7 characters and validated).* ### 3. Functional Testing - Negative (Character Constraints - EP)
Using Equivalence Partitioning (EP) to verify the application rejects any character outside the allowed set.
* **TC11: Contains Spaces:** Enter 7 characters including a space (e.g., `abc def`), click "Check Input". *Expected: "Invalid Value".*
* **TC12: Leading/Trailing Spaces:** Enter 5 valid characters with spaces on the ends (e.g., ` aB3*X `), click "Check Input". *Expected: "Invalid Value".*
* **TC13: Disallowed Special Characters:** Enter 7 characters including symbols like `@, #, $, %` (e.g., `aB3@X9z`), click "Check Input". *Expected: "Invalid Value".*
* **TC14: Punctuation Marks:** Enter 7 characters including punctuation like `. , ; '` (e.g., `aB3.X9z`), click "Check Input". *Expected: "Invalid Value".*
* **TC15: Math/Logic Symbols:** Enter 7 characters including symbols like `+, -, =, <, >` (e.g., `aB3+X9z`), click "Check Input". *Expected: "Invalid Value".*
* **TC16: Accented/Non-Latin Characters:** Enter 7 characters including letters like `é, ü, ñ, ß` (e.g., `aB3*X9é`), click "Check Input". *Expected: "Invalid Value".*
* **TC17: Emojis:** Enter 7 characters including an emoji (e.g., `aB3*X9😊`), click "Check Input". *Expected: "Invalid Value".*
* **TC18: Invisible Characters:** Enter 7 characters including a tab or newline (e.g., `abc\tdef`), click "Check Input". *Expected: "Invalid Value".*

### 4. UI, Interaction, and Usability Tests
These tests focus on how the user interacts with the form elements.
* **TC19: Read-Only Validation Field:** Attempt to click into and type inside the `validation_message` field. *Expected: The field should not be editable by the user.*
* **TC20: Form Submission via Keyboard:** Enter a valid 7-character string, press the `Enter` key instead of clicking the "Check Input" button. *Expected: The validation should trigger and show "Valid Value".*
* **TC21: State Transition:** Enter a valid string, click "Check Input" (shows "Valid Value"). Then, modify the input to be invalid (e.g., delete a character) and click "Check Input" again. *Expected: The message updates to "Invalid Value".*
* **TC22: Copy and Paste:** Copy a valid 7-character string and paste it into the field using the mouse context menu (Right-click -> Paste), click "Check Input". *Expected: "Valid Value".*
* **TC23: Rapid Clicks:** Rapidly double-click or multi-click the "Check Input" button. *Expected: The application should handle it without throwing console errors or behaving unexpectedly.*

###

# Emoji Input Bug Fix

## Issue Description
The emoji test (TC17) was failing in Chrome and Edge browsers but passing in Firefox. The error message was:
- Chrome: "ChromeDriver only supports characters in the BMP"
- Edge: "msedgedriver only supports characters in the BMP"

## Root Cause
ChromeDriver and EdgeDriver (both Chromium-based) only support characters in the Basic Multilingual Plane (BMP), which includes Unicode characters from U+0000 to U+FFFF. The emoji 😊 (U+1F60A) used in the test input "aB3*X9😊" is outside the BMP range, causing `sendKeys()` to fail.

Firefox works because GeckoDriver supports full Unicode, including characters beyond the BMP.

## Solution
Modified the `enterCharacters` method in `Page.js` to:

1. **Detect non-BMP characters**: Check if any character in the input has a code point > 0xFFFF
2. **Use JavaScript for non-BMP**: When non-BMP characters are detected, use `executeScript` to set the input value directly: `arguments[0].value = arguments[1];`
3. **Fallback to sendKeys**: For BMP-only strings, continue using `sendKeys` for normal behavior


## Results
- **Before**: 8 test failures (including emoji tests in Chrome and Edge)
- **After**: 6 test failures (emoji tests now pass in all browsers)
- All browsers now handle the emoji input correctly, and the validation properly returns "Invalid Value" as expected.

## Impact
The fix ensures cross-browser compatibility for Unicode input while maintaining the existing behavior for standard characters. This approach can be extended to handle other Unicode characters outside the BMP in future tests.

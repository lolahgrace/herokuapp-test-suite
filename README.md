# herokuapp-test-suite

An automated test suite built using [Playwright](https://playwright.dev/) and JavaScript, targeting [The Internet by Herokuapp](https://the-internet.herokuapp.com/). Tests are structured using the Page Object Model (POM) pattern and run across Chromium and Firefox browsers.

---

## Key Highlights

- **Page Object Model (POM):** Decoupled test logic from UI selectors for high maintainability.
- **Semantic Reporting:** Utilizes `test.step` to provide human-readable audit logs in HTML reports.
- **Comprehensive Test Coverage:** Includes Happy Path, Sad Path (negative testing), and UI-state validation.
- **Data-Driven Design:** Test scenarios are driven by centralized data objects to ensure clean, DRY code.

---

## Project Structure

```
herokuapp-test-suite/
├── fixtures/                        # Test fixture files
│   ├── test-file.txt                # Sample file for upload tests
│   └── empty.txt                    # Empty file for edge case upload tests
├── pages/                           # Page Object Model files
│   ├── LoginPage.js                 # Login page actions and locators
│   ├── CheckboxPage.js              # Checkbox page actions and locators
│   ├── DropdownPage.js              # Dropdown page actions and locators
│   ├── InputsPage.js                # Inputs page actions and locators
│   ├── AddRemoveElementsPage.js     # Add/Remove Elements page actions and locators
│   ├── JavascriptAlertsPage.js      # JavaScript Alerts page actions and locators
│   ├── HoversPage.js                # Hovers page actions and locators
│   ├── DynamicControlsPage.js       # Dynamic Controls page actions and locators
│   ├── DynamicLoadingPage.js        # Dynamic Loading page actions and locators
│   ├── FileUploadPage.js            # File Upload page actions and locators
│   ├── FileDownloadPage.js          # File Download page actions and locators
│   └── BrokenImagesPage.js          # Broken Images page actions and locators
├── tests/                           # Test spec files
│   ├── login.spec.js                # Login functionality tests
│   ├── checkboxes.spec.js           # Checkbox functionality tests
│   ├── dropdown.spec.js             # Dropdown functionality tests
│   ├── inputs.spec.js               # Inputs functionality tests
│   ├── addRemoveElements.spec.js    # Add/Remove Elements functionality tests
│   ├── javascriptAlerts.spec.js     # JavaScript Alerts functionality tests
│   ├── hovers.spec.js               # Hovers functionality tests
│   ├── dynamicControls.spec.js      # Dynamic Controls functionality tests
│   ├── dynamicLoading.spec.js       # Dynamic Loading functionality tests
│   ├── fileUpload.spec.js           # File Upload functionality tests
│   ├── fileDownload.spec.js         # File Download functionality tests
│   └── brokenImages.spec.js         # Broken Images functionality tests
├── playwright.config.js             # Playwright configuration
├── package.json
└── README.md
```

---

## Test Coverage

### ✅ Login Page (`/login`)

| Test Case | Description |
|---|---|
| Valid login and logout | Logs in with correct credentials, verifies success message, logs out |
| Invalid credentials | Both username and password are wrong |
| Valid username, invalid password | Verifies password-specific error message |
| Invalid username, valid password | Verifies username-specific error message |
| Empty fields | Submits form with no input |
| Trailing spaces in username | Username with trailing whitespace |
| Trailing spaces in password | Password with trailing whitespace |
| UI visibility checks | Verifies form fields and button are visible and enabled |

### ✅ Checkboxes Page (`/checkboxes`)

| Test Case | Description |
|---|---|
| Initial state verification | Verifies checkbox 1 is unchecked and checkbox 2 is checked on page load |
| Check checkbox 1 | Checks checkbox 1 and verifies state changed to checked |
| Uncheck checkbox 2 | Unchecks checkbox 2 and verifies state changed to unchecked |
| Check both checkboxes | Checks both checkboxes and verifies both are checked |
| Uncheck both checkboxes | Unchecks both checkboxes and verifies both are unchecked |

### ✅ Dropdown Page (`/dropdown`)

| Test Case | Description |
|---|---|
| Initial state verification | Verifies dropdown defaults to placeholder and no option is pre-selected on page load |
| Select option 1 | Selects option 1 and verifies it is selected |
| Select option 2 | Selects option 2 and verifies it is selected |
| Switch from option 1 to option 2 | Selects option 1, switches to option 2, and verifies the selection updated correctly |

### ✅ Inputs Page (`/inputs`)

| Test Case | Description |
|---|---|
| Enter a valid number | Types a valid number and verifies it appears in the field |
| Enter a negative number | Types a negative number and verifies it is accepted |
| Clear the input | Enters a number, clears the field, and verifies it is empty |
| Increment via arrow key | Types a number, presses ArrowUp, and verifies the value increased by 1 |
| Decrement via arrow key | Types a number, presses ArrowDown, and verifies the value decreased by 1 |
| Reject alphabets | Types alphabetic characters and verifies the field rejects them |
| Reject special characters | Types special characters and verifies the field rejects them |

### ✅ Add/Remove Elements Page (`/add_remove_elements`)

| Test Case | Description |
|---|---|
| Initial state verification | Verifies no delete buttons are present on page load |
| Add a single element | Clicks Add Element once and verifies one delete button appears |
| Delete an element | Adds one element, deletes it, and verifies it disappears |
| Add multiple elements | Adds multiple elements and verifies the correct count appears |
| Delete one of multiple elements | Adds multiple elements, deletes one, and verifies the correct count remains |
| Remove all elements | Adds multiple elements, deletes all, and verifies none remain |

### ✅ JavaScript Alerts Page (`/javascript_alerts`)

| Test Case | Description |
|---|---|
| JS Alert — accept and verify | Clicks JS Alert, accepts it, and verifies the result message |
| JS Confirm — accept and verify | Clicks JS Confirm, accepts it, and verifies "You clicked: Ok" |
| JS Confirm — dismiss and verify | Clicks JS Confirm, dismisses it, and verifies "You clicked: Cancel" |
| JS Prompt — type and accept | Clicks JS Prompt, types text, accepts, and verifies the entered text appears |
| JS Prompt — cancel and verify | Clicks JS Prompt, cancels, and verifies "You entered: null" |

### ✅ Hovers Page (`/hovers`)

| Test Case | Description |
|---|---|
| Hover over each user (loop) | Verifies user info is hidden before hover and visible after hover for all 3 users |
| Click "View profile" for each user (loop) | Hovers over each user, clicks "View profile", and verifies navigation to correct URL |
| Switch hover from user 1 to user 2 | Verifies user 1's info hides and user 2's info appears when switching hover |

### ✅ Dynamic Controls Page (`/dynamic_controls`)

| Test Case | Description |
|---|---|
| Initial state verification | Verifies checkbox is visible and input field is disabled on page load |
| Remove checkbox | Clicks Remove, waits, and verifies checkbox is gone and "It's gone!" message appears |
| Add checkbox back | Removes checkbox first, then adds it back, and verifies "It's back!" message appears |
| Enable input | Clicks Enable, waits, and verifies input is enabled and "It's enabled!" message appears |
| Disable input | Enables input first, then disables it, and verifies "It's disabled!" message appears |

### ✅ Dynamic Loading Page (`/dynamic_loading`)

| Test Case | Description |
|---|---|
| Example 1 — initial state | Verifies finish text exists in DOM but is hidden on page load |
| Example 1 — reveal hidden element | Clicks Start, waits for loading, and verifies "Hello World!" becomes visible |
| Example 2 — initial state | Verifies finish text does not exist in the DOM on page load |
| Example 2 — render new element | Clicks Start, waits for loading, and verifies "Hello World!" is created and visible |

### ✅ File Upload Page (`/upload`)

| Test Case | Description |
|---|---|
| Successful file upload | Verifies initial state, uploads a file via button, and confirms "File Uploaded!" message |
| Drag and drop upload | Uploads a file via the drag and drop zone and verifies the file name appears |
| Empty file upload | Uploads a 0kb empty file and verifies it is accepted |
| Upload without selecting a file | Clicks Upload with no file selected and verifies error page appears |

### ✅ File Download Page (`/download`)

| Test Case | Description |
|---|---|
| Files listed on page load | Verifies download links are visible on page load |
| Download a file | Clicks a file link and verifies the download event is triggered |
| File name matches link | Verifies the downloaded file name matches the link that was clicked |

### ✅ Broken Images Page (`/broken_images`)

| Test Case | Description |
|---|---|
| Detect broken images | Loops through all images, uses browser-native `naturalWidth` to detect broken ones, and reports each failure individually using soft assertions |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm

### Installation

```bash
git clone https://github.com/lolahgrace/herokuapp-test-suite.git
cd herokuapp-test-suite
npm install
npx playwright install
```

### Running Tests

Run all tests across all configured browsers:

```bash
npx playwright test
```

Run tests in a specific browser:

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
```

Run a specific test file:

```bash
npx playwright test tests/login.spec.js
npx playwright test tests/checkboxes.spec.js
npx playwright test tests/dropdown.spec.js
npx playwright test tests/inputs.spec.js
npx playwright test tests/addRemoveElements.spec.js
npx playwright test tests/javascriptAlerts.spec.js
npx playwright test tests/hovers.spec.js
npx playwright test tests/dynamicControls.spec.js
npx playwright test tests/dynamicLoading.spec.js
npx playwright test tests/fileUpload.spec.js
npx playwright test tests/fileDownload.spec.js
npx playwright test tests/brokenImages.spec.js
```

Run with the Playwright UI (interactive mode):

```bash
npx playwright test --ui
```

### Viewing the Report

```bash
npx playwright show-report
```

---

## Tech Stack

- [Playwright](https://playwright.dev/) — test framework and browser automation
- JavaScript (ES Modules)
- Page Object Model (POM) pattern
- Chromium & Firefox cross-browser testing
- Conventional Commits for version control

---

## Author

**Ololade Adekunle** · QA Engineer · [github.com/lolahgrace](https://github.com/lolahgrace)
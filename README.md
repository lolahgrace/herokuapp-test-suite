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
├── pages/                    # Page Object Model files
│   ├── LoginPage.js          # Login page actions and locators
│   ├── CheckboxPage.js       # Checkbox page actions and locators
│   ├── DropdownPage.js       # Dropdown page actions and locators
│   └── InputsPage.js         # Inputs page actions and locators
├── tests/                    # Test spec files
│   ├── login.spec.js         # Login functionality tests
│   ├── checkboxes.spec.js    # Checkbox functionality tests
│   ├── dropdown.spec.js      # Dropdown functionality tests
│   └── inputs.spec.js        # Inputs functionality tests
├── playwright.config.js      # Playwright configuration
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
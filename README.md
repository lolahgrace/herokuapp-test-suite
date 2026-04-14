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
├── pages/                  # Page Object Model files
│   └── LoginPage.js        # Login page actions and locators
├── tests/                  # Test spec files
│   └── login.spec.js       # Login functionality tests
├── playwright.config.js    # Playwright configuration
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
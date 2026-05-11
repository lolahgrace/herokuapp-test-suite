![Playwright Tests](https://github.com/lolahgrace/herokuapp-test-suite/actions/workflows/playwright.yml/badge.svg)

# herokuapp-test-suite

> A professional-grade test automation suite built from scratch — covering UI, API, hybrid, and network testing with CI/CD, cloud execution, and stakeholder-ready reporting.

An automated test suite built using [Playwright](https://playwright.dev/) and JavaScript, targeting [The Internet by Herokuapp](https://the-internet.herokuapp.com/) and [JSONPlaceholder](https://jsonplaceholder.typicode.com/). Tests are structured using the Page Object Model (POM) pattern, run across Chromium and Firefox browsers, and execute automatically on every push via GitHub Actions.

---

## Key Highlights

- **Page Object Model (POM):** Decoupled test logic from UI selectors for high maintainability.
- **Semantic Reporting:** Utilises `test.step` to provide human-readable audit logs in HTML and Allure reports.
- **Comprehensive Test Coverage:** Includes Happy Path, Sad Path (negative testing), edge cases, and UI-state validation.
- **Data-Driven Design:** Test scenarios driven by centralised data objects for clean, DRY code.
- **Playwright Fixtures:** Reusable `loggedInPage` fixture injects authenticated state into tests, eliminating repetitive login setup.
- **Multi-Environment Configuration:** Supports staging and production environments via `.env` and `cross-env`, switchable with a single npm script.
- **API & Hybrid Testing:** Dedicated API tests using Playwright's `request` fixture, plus hybrid tests combining API setup with UI verification.
- **Network Mocking:** Uses `page.route()` to intercept and stub network requests — testing error states, loading states, and data scenarios without depending on live APIs.
- **Test Tagging:** Tests are tagged (`@smoke`, `@regression`, `@auth`, `@api`, `@network`, `@ui`) for filtered execution by pipeline stage or feature area.
- **CI/CD Pipeline:** GitHub Actions workflow runs the full suite on every push to main, on pull requests, and on a nightly schedule.
- **Cloud Testing:** BrowserStack Automate integration for cross-browser cloud execution.
- **Containerised Execution:** Docker support for consistent test runs across environments using the official Microsoft Playwright image.
- **Allure Reporting:** Allure Reporter generates interactive dashboards with test history, steps, attachments, and failure details — readable by both technical and non-technical stakeholders.
- **Automated Cleanup:** `test.afterEach` hook captures screenshots on failure and clears cookies after every test.
- **Trace Viewer Ready:** Playwright traces captured on first retry for step-by-step visual debugging.

---

## Project Structure

```
herokuapp-test-suite/
├── .github/
│   └── workflows/
│       └── playwright.yml           # GitHub Actions CI pipeline
├── fixtures/                        # Test fixture files
│   ├── index.js                     # loggedInPage fixture — reusable authenticated state
│   ├── test-file.txt                # Sample file for upload tests
│   └── empty.txt                    # Empty file for edge case upload tests
├── pages/                           # Page Object Model files
│   ├── LoginPage.js
│   ├── CheckboxPage.js
│   ├── DropdownPage.js
│   ├── InputsPage.js
│   ├── AddRemoveElementsPage.js
│   ├── JavascriptAlertsPage.js
│   ├── HoversPage.js
│   ├── DynamicControlsPage.js
│   ├── DynamicLoadingPage.js
│   ├── FileUploadPage.js
│   ├── FileDownloadPage.js
│   ├── BrokenImagesPage.js
│   └── FramesPage.js
├── tests/                           # Test spec files
│   ├── login.spec.js                # Login functionality tests
│   ├── api.spec.js                  # API tests using Playwright request fixture
│   ├── hybrid.spec.js               # Hybrid tests combining API and UI verification
│   ├── networkMocking.spec.js       # Network interception and stubbing tests
│   ├── checkboxes.spec.js
│   ├── dropdown.spec.js
│   ├── inputs.spec.js
│   ├── addRemoveElements.spec.js
│   ├── javascriptAlerts.spec.js
│   ├── hovers.spec.js
│   ├── dynamicControls.spec.js
│   ├── dynamicLoading.spec.js
│   ├── fileUpload.spec.js
│   ├── fileDownload.spec.js
│   ├── brokenImages.spec.js         # Skipped in CI (live image detection)
│   └── frames.spec.js
├── .env.example                     # Public-safe template for environment variables
├── playwright.config.js             # Playwright configuration
├── package.json
└── README.md
```

---

## Framework Architecture

### Environment Configuration

The suite uses `.env` for environment-specific variables. Copy `.env.example` to `.env` and populate with your values:

```
BASE_URL=https://the-internet.herokuapp.com
LOGIN_USERNAME=your_username
LOGIN_PASSWORD=your_password
TEST_ENV=staging
```

Environment switching is handled via `cross-env` in npm scripts — no code changes required.

### Fixtures

The `loggedInPage` fixture in `fixtures/index.js` handles authentication setup automatically. Tests that require an authenticated state request this fixture instead of repeating login steps manually:

```javascript
test('example', async ({ loggedInPage }) => {
  // already logged in — test starts on secure page
})
```

### Network Mocking

`page.route()` intercepts browser-level requests before they reach the server. This allows tests to simulate error responses, timeouts, and custom payloads without depending on live API behaviour:

```javascript
await page.route('**/api/endpoint', route => {
  route.fulfill({ status: 500, body: 'Server Error' })
})
```

### Test Tagging

Tests are tagged inside their title strings for filtered execution:

```javascript
test('User can login successfully @smoke @auth', async ({ page }) => { ... })
```

| Tag | Purpose |
|---|---|
| `@smoke` | Critical path — run after every deployment |
| `@regression` | Full coverage — run before every release |
| `@auth` | Authentication feature area |
| `@api` | API tests |
| `@network` | Network mocking tests |
| `@ui` | UI-only tests |

### Cleanup

A `test.afterEach` hook runs after every test:
- Captures a screenshot with a meaningful filename if the test fails
- Clears browser cookies to ensure a clean state for the next test

### Trace Viewer

Traces are configured with `on-first-retry` — automatically recorded when a test fails and retries. Open via the HTML report for step-by-step visual debugging, network request inspection, and DOM snapshots at each action.

---

## CI/CD Pipeline

Tests run automatically via GitHub Actions on:
- Every push to `main`
- Every pull request targeting `main`
- A nightly scheduled run (`0 0 * * *`)
- Manual trigger via `workflow_dispatch`

Sensitive credentials are stored as GitHub Secrets. The pipeline uploads both Playwright and Allure reports as downloadable artifacts after every run.

---

## Cloud & Container Testing

### BrowserStack

The suite integrates with BrowserStack Automate via the BrowserStack Node SDK for cloud-based cross-browser execution:

```bash
npm run test:staging-browserstack
```

Credentials are stored in `.env` and `browserstack.yml` (both gitignored).

### Docker

Run the full suite in a containerised environment using the official Microsoft Playwright image:

```bash
npm run test:docker
```

This ensures consistent execution regardless of local machine configuration.

---

## Test Coverage

### ✅ Login Page (`/login`)

| Test Case | Tags | Description |
|---|---|---|
| Valid login and logout | `@smoke @regression @auth` | Logs in with correct credentials, verifies success message, logs out |
| Invalid credentials | `@regression @auth` | Both username and password are wrong |
| Valid username, invalid password | `@regression @auth` | Verifies password-specific error message |
| Invalid username, valid password | `@regression @auth` | Verifies username-specific error message |
| Empty fields | `@regression @auth` | Submits form with no input |
| Trailing spaces in username | `@regression @auth` | Username with trailing whitespace |
| Trailing spaces in password | `@regression @auth` | Password with trailing whitespace |
| UI visibility checks | `@smoke @auth` | Verifies form fields and button are visible and enabled |

### ✅ API Tests (JSONPlaceholder)

| Test Case | Tags | Description |
|---|---|---|
| GET single user | `@regression @api` | Fetches user by ID, verifies status 200, id, name, and email format |
| POST new post | `@regression @api` | Creates a post, verifies status 201, id exists, and title matches |
| DELETE a post | `@regression @api` | Deletes a post by ID, verifies status 200 |

### ✅ Hybrid Tests (JSONPlaceholder)

| Test Case | Tags | Description |
|---|---|---|
| Create then verify via API | `@regression @api` | POSTs a new resource, asserts 201, verifies all response fields match sent data |

### ✅ Network Mocking Tests

| Test Case | Tags | Description |
|---|---|---|
| Fulfilled response mock | `@smoke @regression @network` | Intercepts request and returns stubbed success response |
| Aborted request mock | `@smoke @regression @network` | Intercepts request and simulates network failure |
| Error state mock | `@smoke @regression @network` | Returns 500 error response and verifies UI handles it correctly |

### ✅ Checkboxes Page (`/checkboxes`)

| Test Case | Tags | Description |
|---|---|---|
| Initial state verification | `@regression @ui` | Verifies checkbox 1 is unchecked and checkbox 2 is checked on page load |
| Check checkbox 1 | `@regression @ui` | Checks checkbox 1 and verifies state changed |
| Uncheck checkbox 2 | `@regression @ui` | Unchecks checkbox 2 and verifies state changed |
| Check both checkboxes | `@regression @ui` | Checks both and verifies both are checked |
| Uncheck both checkboxes | `@regression @ui` | Unchecks both and verifies both are unchecked |

### ✅ Dropdown Page (`/dropdown`)

| Test Case | Tags | Description |
|---|---|---|
| Initial state verification | `@regression @ui` | Verifies dropdown defaults to placeholder on page load |
| Select option 1 | `@regression @ui` | Selects option 1 and verifies it is selected |
| Select option 2 | `@regression @ui` | Selects option 2 and verifies it is selected |
| Switch from option 1 to option 2 | `@regression @ui` | Verifies selection updates correctly when switching |

### ✅ Inputs Page (`/inputs`)

| Test Case | Tags | Description |
|---|---|---|
| Enter a valid number | `@regression @ui` | Types a valid number and verifies it appears |
| Enter a negative number | `@regression @ui` | Types a negative number and verifies it is accepted |
| Clear the input | `@regression @ui` | Enters a number, clears the field, verifies it is empty |
| Increment via arrow key | `@regression @ui` | Presses ArrowUp and verifies value increased by 1 |
| Decrement via arrow key | `@regression @ui` | Presses ArrowDown and verifies value decreased by 1 |
| Reject alphabets | `@regression @ui` | Types alphabetic characters and verifies the field rejects them |
| Reject special characters | `@regression @ui` | Types special characters and verifies the field rejects them |

### ✅ Add/Remove Elements Page (`/add_remove_elements`)

| Test Case | Tags | Description |
|---|---|---|
| Initial state verification | `@regression @ui` | Verifies no delete buttons present on page load |
| Add a single element | `@regression @ui` | Clicks Add Element once, verifies one delete button appears |
| Delete an element | `@regression @ui` | Adds one element, deletes it, verifies it disappears |
| Add multiple elements | `@regression @ui` | Adds multiple elements, verifies correct count |
| Delete one of multiple | `@regression @ui` | Adds multiple, deletes one, verifies correct count remains |
| Remove all elements | `@regression @ui` | Adds multiple, deletes all, verifies none remain |

### ✅ JavaScript Alerts Page (`/javascript_alerts`)

| Test Case | Tags | Description |
|---|---|---|
| JS Alert — accept | `@regression @ui` | Accepts alert and verifies result message |
| JS Confirm — accept | `@regression @ui` | Accepts confirm and verifies "You clicked: Ok" |
| JS Confirm — dismiss | `@regression @ui` | Dismisses confirm and verifies "You clicked: Cancel" |
| JS Prompt — type and accept | `@regression @ui` | Types text, accepts, verifies entered text appears |
| JS Prompt — cancel | `@regression @ui` | Cancels prompt and verifies "You entered: null" |

### ✅ Hovers Page (`/hovers`)

| Test Case | Tags | Description |
|---|---|---|
| Hover over each user | `@regression @ui` | Verifies user info hidden before hover, visible after for all 3 users |
| Click "View profile" for each user | `@regression @ui` | Hovers, clicks View profile, verifies correct URL navigation |
| Switch hover between users | `@regression @ui` | Verifies user 1 info hides and user 2 info appears when switching |

### ✅ Dynamic Controls Page (`/dynamic_controls`)

| Test Case | Tags | Description |
|---|---|---|
| Initial state verification | `@regression @ui` | Verifies checkbox visible and input disabled on page load |
| Remove checkbox | `@regression @ui` | Clicks Remove, verifies checkbox gone and message appears |
| Add checkbox back | `@regression @ui` | Removes then restores checkbox, verifies "It's back!" message |
| Enable input | `@regression @ui` | Clicks Enable, verifies input enabled and message appears |
| Disable input | `@regression @ui` | Enables then disables input, verifies "It's disabled!" message |

### ✅ Dynamic Loading Page (`/dynamic_loading`)

| Test Case | Tags | Description |
|---|---|---|
| Example 1 — initial state | `@regression @ui` | Verifies finish text exists in DOM but is hidden |
| Example 1 — reveal element | `@regression @ui` | Clicks Start, waits, verifies "Hello World!" becomes visible |
| Example 2 — initial state | `@regression @ui` | Verifies finish text does not exist in DOM on page load |
| Example 2 — render element | `@regression @ui` | Clicks Start, waits, verifies "Hello World!" is created and visible |

### ✅ File Upload Page (`/upload`)

| Test Case | Tags | Description |
|---|---|---|
| Successful file upload | `@regression @ui` | Uploads file via button, confirms "File Uploaded!" message |
| Drag and drop upload | `@regression @ui` | Uploads via drag and drop zone, verifies file name appears |
| Empty file upload | `@regression @ui` | Uploads 0kb file and verifies it is accepted |
| Upload without selecting file | `@regression @ui` | Clicks Upload with no file selected, verifies error page |

### ✅ File Download Page (`/download`)

| Test Case | Tags | Description |
|---|---|---|
| Files listed on page load | `@regression @ui` | Verifies download links visible on page load |
| Download a file | `@regression @ui` | Clicks file link and verifies download event is triggered |
| File name matches link | `@regression @ui` | Verifies downloaded file name matches the clicked link |

### ✅ Broken Images Page (`/broken_images`)

| Test Case | Tags | Description |
|---|---|---|
| Detect broken images | `@regression @ui` | Loops all images, uses `naturalWidth` to detect broken ones, reports each failure individually via soft assertions. Skipped in CI. |

### ✅ Frames — iFrame Page (`/iframe`)

| Test Case | Tags | Description |
|---|---|---|
| Verify editor accessible | `@regression @ui` | Switches into iFrame, verifies TinyMCE editor body is visible |
| Type text inside iFrame | `@regression @ui` | Clears content, types new text, verifies it appears correctly |
| Verify main page context | `@regression @ui` | Confirms outer page header accessible after iFrame interaction |

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

### Environment Setup

Copy `.env.example` to `.env` and populate with your values:

```bash
cp .env.example .env
```

---

## Running Tests

### All tests
```bash
npx playwright test
```

### By environment
```bash
npm run test:staging
npm run test:prod
```

### By tag
```bash
npm run test:smoke
npm run test:regression
npx playwright test --grep "@auth"
npx playwright test --grep "@api"
npx playwright test --grep "@network"
npx playwright test --grep "@ui"
```

### By browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
```

### By file
```bash
npx playwright test tests/login.spec.js
npx playwright test tests/api.spec.js
npx playwright test tests/networkMocking.spec.js
```

### Interactive mode
```bash
npx playwright test --ui
```

### In Docker
```bash
npm run test:docker
```

### On BrowserStack
```bash
npm run test:staging-browserstack
```

---

## Viewing Reports

### Playwright HTML Report
```bash
npx playwright show-report
```

### Allure Report
```bash
npm run allure:clean
npx playwright test
npm run allure:report
```

---

## Tech Stack

- [Playwright](https://playwright.dev/) — test framework and browser automation
- JavaScript (ES Modules)
- Page Object Model (POM) pattern
- Allure Reporter — interactive test reporting
- GitHub Actions — CI/CD pipeline
- BrowserStack Automate — cloud cross-browser testing
- Docker — containerised test execution
- dotenv — environment variable management
- cross-env — cross-platform environment switching
- Conventional Commits — version control discipline

---

## Author

**Ololade Adekunle** · QA Engineer · [github.com/lolahgrace](https://github.com/lolahgrace)
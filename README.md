# 🎭 E2E Automation Test Suite with Playwright

A comprehensive end-to-end testing framework built with [Playwright](https://playwright.dev/) and TypeScript, featuring multi-environment support, multi-role authentication, and the Page Object Model (POM) design pattern.

---

## 📋 System Requirements

- **Node.js** >= 18 (LTS recommended)
- **npm** >= 9
- **OS**: Windows / macOS / Linux

---

## 🚀 Installation & Setup

```bash
# Clone the repository
git clone (https://github.com/teoke1234/E2E)
cd E2E

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install --with-deps
```

---

## 🌍 Environment Configuration

The project supports multiple environments (Staging, Production) with environment-specific credentials and configurations.

### Create environment files

Create `.env.{environment}` files in the root directory:

**`.env.stg` (Staging)**
```env
BASE_URL=https://staging.yourdomain.com
API_URL=https://api-staging.yourdomain.com
TIMEOUT=30000
RETRY_COUNT=2
```

**`.env.prod` (Production)**
```env
BASE_URL=https://yourdomain.com
API_URL=https://api.yourdomain.com
TIMEOUT=30000
RETRY_COUNT=2
```

### Running tests with different environments

```bash
# Run tests in staging
$env:TEST_ENV = "stg" ; npx playwright test

# Run tests in production
$env:TEST_ENV = "prod" ; npx playwright test

# Run with default (production)
npx playwright test
```

---

## 📁 Project Structure

```
E2E/
├── .auth/                          # Browser context storage states (auto-generated)
│   ├── admin.json                  # Authenticated session for admin role
│   ├── userA.json                  # Authenticated session for userA role
│   └── guest.json                  # Session state for guest role
├── .github/
│   └── workflows/
│       └── playwright.yml          # GitHub Actions CI/CD workflow
├── constants/
│   ├── env.ts                      # Environment variables (pre-loaded in playwright.config.ts)
│   └── roles.ts                    # Role definitions (admin, userA, guest)
├── fixtures/
│   ├── api.ts                      # API client fixture (Marketstack)
│   ├── fixtureMerge.ts             # Merged fixtures configuration
│   ├── loginAsRole.ts              # Multi-role authentication fixture
│   └── RoleManager.ts              # Browser context manager for multiple roles
├── pages/
│   ├── common/
│   │   ├── sideMenu.ts             # Sidebar menu component (reusable)
│   │   └── upperHeader.ts          # Header component (reusable)
│   ├── 1_PageManager.ts            # Aggregates all page objects
│   ├── DashBoard.page.ts           # Dashboard page object
│   ├── LandingPage.page.ts         # Landing page object
│   └── PopupLogin.page.ts          # Login popup page object
├── services/
│   └── marketstack.client.ts       # API client for Marketstack service
├── test-data/
│   ├── index.ts                    # Selects credentials based on environment
│   ├── login-stg.ts                # Staging credentials
│   └── login-prod.ts               # Production credentials
├── tests/
│   ├── example.spec.ts             # Example test cases
│   └── loginAllRole.setup.spec.ts  # Global setup: authentication for all roles
├── utils/                          # Utility functions (helpers, validators, etc.)
├── playwright.config.ts            # Playwright configuration
├── tsconfig.json                   # TypeScript configuration with path aliases
└── package.json                    # Project dependencies
```

---

## 🔑 Key Features

### 1. **Multi-Role Authentication**
- Support for multiple user roles (admin, userA, guest)
- Pre-authenticated browser contexts stored in `.auth/` folder
- Seamless role switching within tests using `RoleManager`

### 2. **Page Object Model (POM)**
- Centralized page objects for maintainability
- Reusable common components (SideMenu, Header, etc.)
- Single `PageManager` to manage all pages

### 3. **Multi-Environment Support**
- Environment-specific configurations (staging, production, dev)
- Easy switching via `TEST_ENV` variable
- Secure credential management per environment

### 4. **API Testing Integration**
- Built-in API client for external services (Marketstack)
- Combined with UI testing in single test suite
- Type-safe API interactions

### 5. **Custom Fixtures**
- `roleManager` - Manages multiple authenticated browser contexts
- `marketApi` - API client for service interactions
- Merged fixtures for easy test composition

### 6. **TypeScript Path Aliases**
- `@constants/*` - Constants directory
- `@test-data/*` - Test data directory
- `@pages/*` - Page objects directory
- `@fixtures/*` - Fixtures directory
- `@services/*` - Services directory
- `@utils/*` - Utils directory

---

## 🧪 Running Tests

### Run all tests
```bash
npx playwright test
```

### Run tests in headed mode (visible browser)
```bash
npx playwright test --headed
```

### Run tests for a specific browser
```bash
npx playwright test --project=chromium
```

### Run tests matching a pattern
```bash
npx playwright test --grep @TC_001
```

### Run a specific test file
```bash
npx playwright test tests/example.spec.ts
```

### Run tests with debugging
```bash
npx playwright test --debug
```

### View test report
```bash
npx playwright show-report
```

---

## 📝 Test Structure

### Setup Tests (Global Authentication)
The `loginAllRole.setup.spec.ts` file runs once before all tests to authenticate users and save their browser states:

```typescript
for (const user of credentials) {
  setup(`Setup auth for ${user.role}`, async ({ page }) => {
    const popupLogin = new PopupLoginPage(page);
    await popupLogin.performLogin(user.email, user.password);
    // Storage state saved to .auth/{role}.json
  });
}
```

### Example Test with Multi-Role Support
```typescript
test('@TC_001 Navigate as different roles', async ({ roleManager }) => {
  // Access admin context
  const admin = await roleManager.asRole('admin');
  await admin.goto(APP_URL);

  // Switch to userA context
  const userA = await roleManager.asRole('userA');
  await userA.goto(APP_URL);
  await userA.dashboardPage.upperHeader.openSideBar();
  await userA.dashboardPage.sideMenu.clickSideMenuOption('Heartbeats');
});
```

### Example API Test
```typescript
test('@TC_004 API test - Marketstack', async ({ marketApi }) => {
  const response = await marketApi.getEod('AAPL');
  const filteredData = response.data.filter(item => item.close > 272);
  expect(filteredData.length).toBeGreaterThan(0);
});
```

---

## 🛠️ Best Practices

1. **Use Page Object Model** - Encapsulate UI interactions in page objects
2. **Organize Common Components** - Place reusable UI components in `/pages/common`
3. **Environment-Based Credentials** - Store sensitive data in `.env` files (never commit)
4. **Global Setup** - Use setup tests for authentication to reduce redundant logins
5. **Meaningful Test Names** - Use test IDs (@TC_###) for easy identification
6. **Role-Based Testing** - Leverage `RoleManager` for testing different user permissions
7. **Soft Assertions** - Use `expect.soft()` for non-blocking assertions

---

## 📋 Playwright Configuration

Key settings in `playwright.config.ts`:

- **Test Directory**: `./tests`
- **Timeout**: 30 seconds (configurable via `.env`)
- **Retries**: 2 (configurable via `.env`)
- **Projects**: Setup + Chromium, Firefox, WebKit
- **Trace**: `on-first-retry` - collect traces for failed tests
- **Base URL**: Loaded from environment variables

---

## 🔗 Dependencies

- `@playwright/test` - Testing framework
- `@types/node` - TypeScript Node types
- `dotenv` - Environment variable management
- `cross-env` - Cross-platform environment variables
- `typescript` - TypeScript compiler

---

## 📚 Resources

- [Playwright Documentation](https://playwright.dev)
- [Playwright API Reference](https://playwright.dev/docs/api/class-playwright)
- [Best Practices](https://playwright.dev/docs/best-practices)

---

## 👤 Author

Created for comprehensive E2E testing automation.

---



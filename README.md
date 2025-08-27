# Playwright Test Suite

This project contains automated end-to-end tests written with [Playwright](https://playwright.dev/).  
It tests a demo application that runs locally via a custom executable.

---

## 🚀 Features
- UI tests for core user flows (e.g. login, navigation, forms, user full journey etc.).
- Cross-browser testing ( Desktop: Chrome; Mobile: Chrome, Pixel 5).
- Integrated with GitHub Actions for CI/CD.


---

## 🛠️ Tech Stack
- Playwright - JavaScript
- GitHub Actions CI/CD
- Node.js v20 recommended
- Dotenv

---

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/stoicafilip777/playwright-test-suite.git
   cd YOUR-REPO
   
2. **Install dependencies**
   ```
   Install Node.js from https://nodejs.org/
   npm init playright@1.17.123
   Choose JavaScript
   
   ```

3. **Download & install the demo application**

   - The application under test is not included in this repository.  
   - Download the executable from: Mac M1: https://tinyurl.com/maclocal-host
                                   Windows: https://tinyurl.com/windows-pc
   
                                   
   - 

4. **Start the demo application**
   ```
   chmod +x ./path/to/executable
   ```
   By default, it runs on:
   ```
   http://localhost:2221
   ```

---

## 6. Usage / Running Tests

- Run all tests:
  ```
  npm test
  ```

- Run tests in headed mode:
  ```
  npx playwright test --headed
  ```

- Run a specific test file:
  ```
  npx playwright test tests/my_test.spec.js
  ```

# 🎭 E2E Automation Tests with Playwright

End-to-end test suite build by [Playwright](https://playwright.dev/) + TypeScript, hỗ trợ đa môi trường, multi-role authentication và Page Object Model.

---

## 📋 Yêu cầu hệ thống

- **Node.js** >= 18 (khuyến nghị LTS)
- **npm** >= 9
- **OS**: Windows / macOS / Linux

---

## 🚀 Cài đặt

```bash
# Clone repo
git clone <your-repo-url>
cd E2E

# Cài đặt dependencies
npm install

# Cài đặt Playwright browsers
npx playwright install --with-deps


📁 Folder structure
E2E/
├── .auth/                          # Storage state (session) user for each role - auto-generated
├── .github/
│   └── workflows/
│       └── playwright.yml          # GitHub Actions CI workflow
├── constants/
│   ├── env.ts                      # Export enviroment variable (already loaded at playwright.config.t)
│   └── roles.ts                    # Define RoleType (admin, userA, guest...)
├── fixtures/
│   ├── loginAsRole.ts              # Custom fixture for roleManager
│   └── RoleManager.ts              # Manager multi-role browser context
├── pages/
│   ├── common                      # common folder store reusable component such as sideMenu or upperheader
│   │   └── sideMenu.ts             # common                    
│   │   └── upperHeader.ts          #
│   ├── 1_PageManager.ts            # Tổng hợp tất cả page objects
│   ├── LandingPage.page.ts         # Page object - Landing page
│   └── PopupLogin.page.ts          # Page object - Popup login
├── test-data/
│   ├── index.ts                    # Chọn data theo CURRENT_ENV
│   ├── login-prd.ts                # Credentials cho production
│   └── login-stg.ts                # Credentials cho staging
├── tests/
│   ├── loginAllRole.setup.spec.ts  # Setup: login + lưu storage state
│   └── example.spec.ts             # Test specs
├── utils/                          # Helper functions chung
├── .env.prd                        # Env cho production
├── .env.stg                        # Env cho staging
├── .gitignore
├── package.json
├── playwright.config.ts            # Trung tâm cấu hình Playwright + load env
├── README.md
└── tsconfig.json



🌍 Quản lý đa môi trường
Các môi trường hỗ trợ
Môi trường	File .env	File data	Giá trị TEST_ENV
Production	.env.prd	login-prd.ts	prd (mặc định)
Staging	.env.stg	login-stg.ts	stg
Cấu trúc file .env.<env>
ENV
BASE_URL=https://checklyhq.com
APP_URL=https://app.checklyhq.com
TIMEOUT=30000
RETRY_COUNT=2
Lưu ý: Để thêm môi trường mới (ví dụ dev):

Tạo file .env.dev
Tạo file test-data/login-dev.ts
Thêm key dev vào dataMap trong test-data/index.ts
🧪 Chạy test
Chạy với môi trường mặc định (production)
BASH
npm test
Chạy theo môi trường cụ thể
Môi trường	macOS / Linux	Windows PowerShell	Windows CMD
Production	npm run test:prd	npm run test:prd	npm run test:prd
Staging	npm run test:stg	npm run test:stg	npm run test:stg
Các lệnh hữu ích khác
BASH
# Chạy 1 file test
npx playwright test tests/example.spec.ts

# Chạy ở chế độ UI Mode (debug trực quan)
npm run test:ui

# Chạy ở chế độ headed (nhìn thấy browser)
npm run test:headed

# Chạy theo tag
npx playwright test --grep "@TC_001"

# Xem report HTML
npm run report
🔐 Cơ chế Authentication
Project dùng storage state để re-use login session, tránh login lại mỗi test:

Setup phase (loginAllRole.setup.spec.ts): Login lần đầu cho từng role, lưu cookie/session vào .auth/<role>.json.
Test phase: Mỗi test gọi roleManager.asRole('admin') để lấy browser context đã đăng nhập sẵn.
TYPESCRIPT
test('Example', async ({ roleManager }) => {
  const admin = await roleManager.asRole('admin');
  await admin.goto(APP_URL);
  // ...
});
🤖 CI/CD - GitHub Actions
Pipeline tự động chạy khi:

Push lên branch main / master
Tạo Pull Request vào main / master
Xem file: .github/workflows/playwright.yml

Report được upload lên GitHub Actions artifacts (giữ 30 ngày).

🛠️ Troubleshooting
Vấn đề	Giải pháp
Storage state file not found	Chạy npm test hoặc setup project trước: npx playwright test --project=setup
Test bị timeout	Tăng TIMEOUT trong file .env.<env>
Browsers chưa cài	Chạy npx playwright install --with-deps
Env không được load	Kiểm tra file .env.<env> đã tồn tại và đúng chính tả
📚 Tài liệu tham khảo
Playwright Docs
Page Object Model
Authentication

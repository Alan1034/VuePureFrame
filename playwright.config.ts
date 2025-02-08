import type { PlaywrightTestConfig } from '@playwright/test'
import { devices } from '@playwright/test'

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 * https://zhuanlan.zhihu.com/p/635253585
 */
// require('dotenv').config();
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import path from 'path'
const __filenameNew = fileURLToPath(import.meta.url)
const __dirnameNew = path.dirname(__filenameNew)
/**
 * See https://playwright.dev/docs/test-configuration.
 */
// Read from ".env" file.
const modeExt = process.env.CURRENT_ENV || 'dev'
dotenv.config({ path: path.resolve(__dirnameNew, '.env') })
dotenv.config({ path: path.resolve(__dirnameNew, `.env.${modeExt}`), override: true })
process.env.__dirnameNew = __dirnameNew;
const config: PlaywrightTestConfig = {
  /* Run tests in files in parallel */
  fullyParallel: true,
  testDir: './e2e',
  /* Maximum time one test can run for. */
  // 链接失败可能会导致超时
  timeout: 7 * 60 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 2 * 60 * 1000,
  },
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    // 在命令行中同步打印每条用例的执行结果
    ['list'],
    // 输出 html 格式的报告，并将报告归档与指定路径
    [
      'html',
      {
        outputFolder: 'playwright-report'
      }
    ]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.WEBSITE_URL,
    // Trace files, screenshots and videos will appear in the test output directory, typically test-results.
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    video: {
      mode: 'on-first-retry',
      // mode: 'on',
      size: {
        // 分辨率看devices参数
        // Desktop Chrome分辨率
        // width: 1920,
        // height: 1080,
        // 'iPhone 15 Pro Max分辨率
        width: 430,
        height: 739,
      }
    },
    /* Only on CI systems run the tests headless */
    headless: !!process.env.CI
  },

  /* Configure projects for major browsers */
  projects: [
    // setup 工程只执行 e2e 目录下以 .setup.ts 结尾的文件。在所有正式测试执行前先完成鉴权初始化
    { name: 'setup', testMatch: /.*\.setup\.ts/ },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // setup 完成鉴权后，浏览器缓存状态会保存在此，正式的测试工程在执行前通过此文件恢复浏览器缓存，进而获取了用户登录态
        storageState: 'e2e/auth/user.json'
      },
      dependencies: ['setup']
    },
    // {
    //   name: 'firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //     storageState: 'e2e/auth/user.json'
    //   },
    //   dependencies: ['setup']
    // },
    // {
    //   name: 'webkit',
    //   use: {
    //     ...devices['Desktop Safari'],
    //     storageState: 'e2e/auth/user.json'
    //   },
    //   dependencies: ['setup']
    // },

    /* Test against mobile viewports. */
    {
      name: 'Mobile Chrome',
      use: {
        ...devices['Pixel 5'],
        storageState: 'e2e/auth/user.json'
      },
      dependencies: ['setup']
    },
    // {
    //   name: 'Mobile Safari',
    //   use: {
    //     ...devices['iPhone 15 Pro Max'],
    //     storageState: 'e2e/auth/user.json'
    //   },
    //   dependencies: ['setup']
    // }

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: {
    //     channel: 'msedge',
    //   },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: {
    //     channel: 'chrome',
    //   },
    // },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: 'test-results/',

  /* Run your local dev server before starting the tests */
  webServer: {
    /**
     * Use the dev server by default for faster feedback loop.
     * Use the preview server on CI for more realistic testing.
    Playwright will re-use the local server if there is already a dev-server running.
     */
    command: process.env.CI ? 'vite preview --port 5173' : 'vite dev',
    port: 5173,
    reuseExistingServer: !process.env.CI
  }
}

export default config

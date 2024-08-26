/*
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2024-07-22 18:13:03
 * @LastEditTime: 2024-08-26 18:26:30
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description:
 * @FilePath: \VuePureFrame\e2e\router.spec.ts
 *
 */
import { test, expect } from '@playwright/test'
import fs from 'fs/promises'

// See here how to get started:
// https://playwright.dev/docs/intro
test('visits the app root url', async ({ page }) => {
  // console.log(process.env.WEBSITE_URL)
  await page.goto(`/`)
})
// 自动生成的系统路由校验：
const routersConfigure = await fs.readFile(
  `${process.env.__dirnameNew}/src/routers/configure.json`,
  'utf8'
)
const { routersLibrary } = JSON.parse(routersConfigure)
const leafArray = <any>[]
const filterRouters = (arr = <any>[]) => {
  const returnArray = <any>[]
  arr.forEach((item: any) => {
    const { children, path } = item
    if (children) {
      //多层嵌套
      let childrenArr = null
      if (children) {
        childrenArr = filterRouters(children)
      }
      returnArray.push({
        ...item,
        children: childrenArr
      })
    } else {
      //叶子节点
      returnArray.push({
        ...item
      })
      leafArray.push({
        ...item
      })
    }
  })
  return returnArray
}
await filterRouters(routersLibrary)
leafArray.forEach((leaf: any) => {
  const { path, pathKey } = leaf
  test.describe('测试用例-系统路由测试', () => {
    test.describe.configure({ mode: 'default' })
    // https://playwright.dev/docs/test-parameterize
    test(`testing with ${pathKey}`, async ({ page }) => {
      // 哈希路由的写法
      const url = `${process.env.WEBSITE_URL}#${path}`
      await page.goto(url)
    })
  })
})
// 自定义路由校验并截图:
const testPaths = [
  {
    path: "/backstage/accountManager",
    pathKey: "客户经理审批",
    type: "desktop",
  },
  {
    path: "/backstage/returnLogistics",
    pathKey: "退货物流",
    type: "desktop",
  },
  {
    path: "/mobile/accountManager?cancelId=1109",
    pathKey: "客户经理审核",
    type: "mobile",
  },
  {
    path: "/mobile/review?cancelId=1109",
    pathKey: "填写审核信息",
    type: "mobile",
  },
];

testPaths.forEach((leaf: any) => {
  const { path, pathKey, type } = leaf;
  test.describe("测试用例-自定义路由测试", () => {
    test.describe.configure({ mode: "default" });
    // https://playwright.dev/docs/test-parameterize
    test(`testing with ${pathKey}`, async ({ page }, testInfo) => {
      const { project, timeout } = testInfo;
      const { name } = project;
      const goto = async () => {
        // 哈希路由的写法
        const url = `${process.env.WEBSITE_URL}#${path}`;
        await page.goto(url);
        if (["chromium", "firefox", "webkit"].includes(name)) {
          await page.waitForTimeout(1000);
          await page.getByRole("button", { name: "Close" }).click();
        } else if (["Mobile Chrome", "Mobile Safari"].includes(name)) {
          await page.waitForTimeout(1000);
        }
        await page.waitForTimeout(1000);
        await page.screenshot({
          path: `e2e/screenshot/${pathKey}-${name}.png`,
          fullPage: true,
        });
      };

      if (
        type === "mobile" &&
        ["Mobile Chrome", "Mobile Safari"].includes(name)
      ) {
        await goto();
      } else if (
        type === "desktop" &&
        ["chromium", "firefox", "webkit"].includes(name)
      ) {
        await goto();
      }
    });
  });
});


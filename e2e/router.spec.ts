/*
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2024-07-22 18:13:03
 * @LastEditTime: 2024-08-07 18:28:42
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description:
 * @FilePath: \deal-web\e2e\vue.spec.ts
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
  test.describe('测试用例-测试路由', () => {
    test.describe.configure({ mode: 'default' })
    // https://playwright.dev/docs/test-parameterize
    test(`testing with ${pathKey}`, async ({ page }) => {
      // 哈希路由的写法
      const url = `${process.env.WEBSITE_URL}#${path}`
      await page.goto(url)
    })
  })
})

/*
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2024-08-06 18:24:03
 * @LastEditTime: 2024-08-08 11:48:22
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description:
 * @FilePath: \VuePureFrame\e2e\testViews\business.spec.ts
 *
 */
// 自动生成的代码
import { test, expect } from '@playwright/test'

test.use({
  storageState: 'e2e/auth/user.json'
})

test('新增商机管理', async ({ page }, testInfo) => {
  // 访问商机管理
  await page.goto('/')

  const { project } = testInfo
  const { name } = project

  if (['Mobile Chrome', 'Mobile Safari'].includes(name)) {
    // 使用data-testid判断有没有移动端的菜单按钮，注意不是id
    const MobileHeaderMenu = await page.getByTestId('MobileHeader-menu')
    if (await MobileHeaderMenu.isEnabled()) {
      await MobileHeaderMenu.click()
    }
  }

  // await page.locator('div').filter({ hasText: /^商机管理$/ }).click();
  // await page.getByRole('menuitem', { name: '我的' }).click();
  // 因为限制两个，先删一个
  // 有可能一个也没有
  const deleteButton = await page.getByRole('button', { name: '删除' }).first()
  try {
    if (await deleteButton.isEnabled()) {
      await deleteButton.first().click()
      const confirmButton = await page.getByRole('button', { name: 'Yes' })
      if (await confirmButton.isEnabled()) {
        await confirmButton.click()
      }
    }
  } catch (error) {
    console.warn(error)
  }

  // 使用codegen自动生成的测试代码

  // await page.getByRole('button', { name: '新增商机' }).click();
  // await page.getByPlaceholder('请输入商机项目名称').click()
  //...
})

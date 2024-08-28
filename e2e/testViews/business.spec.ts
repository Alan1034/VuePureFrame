/*
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2024-08-06 18:24:03
 * @LastEditTime: 2024-08-28 19:09:06
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description:
 * @FilePath: \VuePureFrame\e2e\testViews\business.spec.ts
 *
 */
// 自动生成的代码
import { test, expect } from '@playwright/test'
import { Mockjs } from 'mockjs-extend';
test.use({
  storageState: 'e2e/auth/user.json'
})

test('新增商机管理', async ({ page,request }, testInfo) => {
  // 访问商机管理
  await page.goto('/')

  const { project, timeout } = testInfo
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
  // 有可能一个也没有，用page.waitForTimeout(3000)，以处理列表接口延迟造成的按钮延迟显示
  await page.waitForTimeout(3000)
  const deleteButton = await page.getByRole('button', { name: '删除' }).first()
  if (await deleteButton.isVisible()) {
    await deleteButton.click()
    const confirmButton = await page.getByRole('button', { name: 'Yes' })
    if (await confirmButton.isVisible()) {
      await confirmButton.click()
    }
  }

  // 使用codegen自动生成的测试代码

  // await page.getByTestId('add-customer').click()
  // await page.getByRole('textbox', { name: '* 客户名称' }).click()
  // await page.getByRole('textbox', { name: '* 客户名称' }).fill(`客户名称${Mockjs.Random.companyName()}`)
  // await page.getByPlaceholder('请输入经营范围').click()
  // await page.getByPlaceholder('请输入经营范围').fill(Mockjs.mock('@cparagraph()'))


  // 调用接口，不写域名默认连接到localhost上
  // const apiResponse = await request.post("/order/query/queryAepOrderList", {
  //   data: {
  //  
  //   },
  // });
  // const data = await apiResponse.json();
  // if (!data.success) {
  //   return;
  // }
  // const { list } = data.data;
  // const toCancle = list.find((item:any) => item.statusCdName === "预受理");
  // console.log(toCancle.orderItemNbr);

  //...
})

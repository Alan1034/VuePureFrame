/*
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2024-08-06 16:51:15
 * @LastEditTime: 2024-08-26 18:26:36
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description:参考https://zhuanlan.zhihu.com/p/635253585
 * 模拟登陆跳过验证码有两种方式，一种是在后台将测试用户设置为免验证，或者将测试执行机 ip 添加到信任白名单中，然后用注释的代码+storageState保存登录信息
 * 另一种是事例中使用的，因为用户的信息使用pinia持久化保存在本地，所以我们只需要在使用验证码登录后返回的新的token替换掉过时的token即可
 * @FilePath: \VuePureFrame\e2e\auth.setup.ts
 *
 */
import { test, } from '@playwright/test'
import { writeFile } from 'node:fs/promises'
const authFile = 'e2e/auth/user.json'

test('authenticate', async ({ page }) => {
  // 输入账号、密码、点击登录
  // await page.goto(`login`)
  // await expect(page.locator('.H1')).toHaveText('欢迎登录');
  // await page.getByPlaceholder('请输入您的手机号').fill('13538812431');
  // await page.getByPlaceholder('请输入您的密码').fill('');
  // await page.getByRole('button', { name: '登陆' }).click();

  // // Wait until the page receives the cookies.
  // //
  // // Sometimes login flow sets cookies in the process of several redirects.
  // // Wait for the final URL to ensure that the cookies are actually set.
  // await page.waitForURL('https://github.com/');
  // // Alternatively, you can wait until the page reaches a state where all cookies are set.
  // await expect(page.getByRole('button', { name: 'View profile and more' })).toBeVisible();

  // // End of authentication steps.
  // // 将登录成功后的浏览器状态存入本地文件
  // await page.context().storageState({ path: authFile });

  // cookies:
  // // 构造缓存数据对象，这里将 Cookies 存入
  // await page
  //   .context()
  //   .addCookies([
  //     {
  //       name: "SESSION",
  //       domain:`localhost`,
  //       value: "cookies",
  //       path: "/",
  //     },
  //   ]);
  // // 获取缓存数据对象
  // const storage = await page.context().storageState();
  // // 将含有 token 的缓存数据写入文件
  // await writeFile(authFile, JSON.stringify(storage), "utf-8");
  // storage:
  const userInfo = {
    icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAMAAAAOusbgAAAASFBMVEX09Pby8vTe3uDPz9DJycm/v8C9vb3BwcLLy8vR0dLp6evn5+i1tbWysrLb29zu7vDNzc7r6+26urrg4OG3t7fj4+TFxcbV1dY8QE/jAAABo0lEQVRo3u2Yi3KCMBBFCY8EIWs0Iv7/n7Y4djqFZEXCTVtnzw+cYZfsqygEQRAEQRAEQRCEt0OVVd1o0x66rNq+tvRFc8ymdSf6gTnn8XaeZthLDm8/0JIM5s5SiCvaq3TQS96BxRVFaLHeM0XBPuhTXAz9ZGfjYkJm+ch4CVnBak5cA8UDJx5wXkUsCiY+82Jcr+h5cf9+4o4X42qX48XACsIVLrI4b6E5sQaKW06M7BIlJy6BYsUk2eIKV8EMIEQV0lu4aJsYwENXtCPD9wkT9hq0NzJX2wy72/FXAj0xLr1jDm9g1LToNeLBYS4+5PEu23Kuq8Bi5oMWy78gvs7F8OX4QTMXN3m8gY3xlEHrgvtTDX/JF09BPPb80o0UZQSO1cw94J5pTLzVzdIT7A3wokv/THtP9d6jZm/WaCfMnquba9dqJ9rdUv08ufNU7xPl5jXtRLNDvG+vaydSP1qN27yf9STpZanVP/MSk2LeGOf0aG/4r75J6dKrqlUML+L/INYp4pQrUJUiTrlNqEr7jegq15gvCIIgCIIgCIIg7M4HkS5rj/A3dbUAAAAASUVORK5CYII=',
    id: 20,
    lastMousemoveTime: 1722994488628,
    name: '王普通',
    sys_role: 1,
    timer: 28,
    // 登陆后更新这个
    token: 'token'
  }

  // 获取一个空的缓存数据对象
  const storage = await page.context().storageState()

  // 构造缓存数据对象，这里将 token 存入 localStorage
  storage.origins.push({
    origin: process.env.WEBSITE_URL || '',
    localStorage: [{ name: 'userInfo', value: JSON.stringify(userInfo) }]
  })

  // 将含有 token 的缓存数据写入文件
  await writeFile(authFile, JSON.stringify(storage), 'utf-8')
})

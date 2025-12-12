import { test, expect } from '@playwright/test'
import { userData, AuthPage } from './pages/auth.js'

test.describe('Аутентификация и авторизация', () => {
  let authPage

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page)
    await authPage.goto()
  })

  test('Проверка открытия приложения и логин', async () => {
    await authPage.login(userData.username, userData.password)
    await expect(await authPage.getWelcomeHeader()).toBeVisible()
  })

  test('Разлогин', async () => {
    await authPage.login(userData.username, userData.password)
    await authPage.logout()
    await expect(await authPage.getSignInButton()).toBeVisible()
  })
})

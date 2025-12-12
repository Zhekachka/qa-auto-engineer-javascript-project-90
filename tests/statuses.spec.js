import { test, expect } from '@playwright/test'
import { userData, AuthPage } from './pages/auth.js'
import { testStatusData, StatusesPage } from './pages/statuses.js'

test.describe('Создание и удаление пользователей', () => {
  let authPage
  let statusesPage

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page)
    statusesPage = new StatusesPage(page)
    await authPage.goto()
    await authPage.login(userData.username, userData.password)
    await expect(await authPage.getWelcomeHeader()).toBeVisible()
  })

  test.describe('Создание статуса', () => {
    test('Форма создания отображается корректно и статус создается', async () => {
      await statusesPage.gotoStatusesList()
      await statusesPage.page.getByRole('link', { name: 'Create' }).click()
      await expect(statusesPage.page.getByLabel('Name')).toBeVisible()
      await expect(statusesPage.page.getByLabel('Slug')).toBeVisible()
      await expect(statusesPage.page.getByRole('button', { name: 'Save' })).toBeVisible()
    })

    test('Данные сохраняются корректно', async () => {
      await statusesPage.gotoStatusesList()
      await statusesPage.createStatus(testStatusData.name, testStatusData.slug)
      await expect(statusesPage.page.getByText(testStatusData.name)).toBeVisible()
    })
  })

  test.describe('Редактирование статуса', () => {
    test('Данные изменяются корректно', async () => {
      await statusesPage.gotoStatusesList()
      await statusesPage.createStatus(testStatusData.name, testStatusData.slug)
      await statusesPage.gotoStatusesList()
      await statusesPage.editStatus(testStatusData.updatedName)
      await expect(statusesPage.page.getByText(testStatusData.updatedName)).toBeVisible()
    })
  })

  test.describe('Удаление статусов', () => {
    test('Удаление одного статуса', async () => {
      await statusesPage.gotoStatusesList()
      await statusesPage.page.locator('tr:has-text("Draft")').locator('[type="checkbox"]').check()
      await statusesPage.deleteSelectedStatus(testStatusData.name)
      await expect(statusesPage.page.getByText(testStatusData.name)).not.toBeVisible()
    })

    test('Массовое удаление', async () => {
      await statusesPage.gotoStatusesList()
      await statusesPage.page.getByRole('checkbox', { name: 'Select all' }).check()
      await statusesPage.deleteSelectedStatus()
      await expect(statusesPage.page.getByText('No Task statuses yet')).toBeVisible()
    })
  })
})

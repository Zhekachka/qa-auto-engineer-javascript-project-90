import { test, expect } from '@playwright/test'
import { userData, AuthPage } from './pages/auth.js'
import { testLabelData, LabelPage } from './pages/labels.js'

test.describe('Создание и удаление пользователей', () => {
  let authPage
  let labelPage

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page)
    labelPage = new LabelPage(page)
    await authPage.goto()
    await authPage.login(userData.username, userData.password)
    await expect(await authPage.getWelcomeHeader()).toBeVisible()
  })

  test.describe('Создание лэйбла', () => {
    test('Форма создания отображается корректно', async () => {
      await labelPage.gotoLabelList()
      await labelPage.page.getByRole('link', { name: 'Create' }).click()
      await expect(labelPage.page.getByLabel('Name')).toBeVisible()
      await expect(labelPage.page.getByRole('button', { name: 'Save' })).toBeVisible()
    })

    test('Данные создаются и сохраняются корректно', async () => {
      await labelPage.gotoLabelList()
      await labelPage.createLabel(testLabelData.name)
      await expect(labelPage.page.getByText(testLabelData.name)).toBeVisible()
    })
  })

  test.describe('Редактирование лэйбла', () => {
    test('Данные изменяются корректно', async () => {
      await labelPage.gotoLabelList()
      await labelPage.createLabel(testLabelData.name)
      await labelPage.gotoLabelList()
      await labelPage.editLabel(testLabelData.updatedName)
      await expect(labelPage.page.getByText(testLabelData.updatedName)).toBeVisible()
    })
  })

  test.describe('Удаление лейбла', () => {
    test('Удаление одного лэйбла', async () => {
      await labelPage.gotoLabelList()
      await labelPage.page.locator('tr:has-text("task")').locator('[type="checkbox"]').check()
      await labelPage.deleteSelectedLabel(testLabelData.name)
      await expect(labelPage.page.getByText(testLabelData.name)).not.toBeVisible()
    })

    test('Массовое удаление', async () => {
      await labelPage.gotoLabelList()
      await labelPage.page.getByRole('checkbox', { name: 'Select all' }).check()
      await labelPage.deleteSelectedLabel()
      await expect(labelPage.page.getByText('No Labels yet')).toBeVisible()
    })
  })
})

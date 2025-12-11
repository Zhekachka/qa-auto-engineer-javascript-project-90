import { test, expect } from '@playwright/test'
import { userData, AuthPage } from './pages/auth.js'
import { testUserData, UserPage } from './pages/users.js'

test.describe('Создание и удаление пользователей', () => {
  let authPage
  let userPage

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page)
    userPage = new UserPage(page)
    await authPage.goto()
    await authPage.login(userData.username, userData.password)
    await expect(await authPage.getWelcomeHeader()).toBeVisible()
  })

  test.describe('Создание пользователя', () => {
    test('Форма создания отображается корректно', async () => {
      await userPage.gotoUsersList()

      await userPage.page.getByRole('link', { name: 'Create' }).click()
      await expect(userPage.page.getByLabel('Email')).toBeVisible()
      await expect(userPage.page.getByLabel('First name')).toBeVisible()
      await expect(userPage.page.getByLabel('Last name')).toBeVisible()
      await expect(userPage.page.getByRole('button', { name: 'Save' })).toBeVisible()
    })

    test('Данные сохраняются корректно', async () => {
      await userPage.gotoUsersList()
      await userPage.createUser(testUserData.email, testUserData.firstName, testUserData.lastName)
      await expect(userPage.page.getByText(testUserData.email)).toBeVisible()
    })
  })

  test.describe('Просмотр пользователей', () => {
    test('Список пользователей отображается', async () => {
      await userPage.gotoUsersList()
      await expect(userPage.page.locator('table.RaDatagrid-table')).toBeVisible()
    })

    test('Основная информация отображается в карточке пользователя', async () => {
      await userPage.gotoUsersList()
      await expect(userPage.page.getByText('Email')).toBeVisible()
      await expect(userPage.page.getByText('First name')).toBeVisible()
      await expect(userPage.page.getByText('Last name')).toBeVisible()
    })
  })

  test.describe('Редактирование пользователя', () => {
    test('Данные изменяются корректно', async () => {
      await userPage.gotoUsersList()
      await userPage.editUser(testUserData.updatedLastName)
      await expect(userPage.page.getByText(testUserData.updatedLastName)).toBeVisible()
    })

    test('Валидация email', async () => {
      await userPage.gotoUsersList()
      await userPage.page.getByRole('cell', { name: 'John', exact: true }).click()
      await userPage.page.getByRole('textbox', { name: 'Email' }).fill('john')
      await userPage.page.getByRole('button', { name: 'Save' }).click()
      await expect(userPage.page.getByText('Incorrect email format')).toBeVisible()
    })
  })

  test.describe('Удаление пользователей', () => {
    test('Удаление одного пользователя', async () => {
      await userPage.gotoUsersList()
      await userPage.page.locator('tr:has-text("john@google.com")').locator('[type="checkbox"]').check()
      await userPage.deleteSelectedUsers()
      await expect(userPage.page.getByText('Element deleted')).toBeVisible()
    })

    test('Массовое удаление', async () => {
      await userPage.gotoUsersList()
      await userPage.page.getByRole('checkbox', { name: 'Select all' }).check()
      await userPage.deleteSelectedUsers()
      await expect(userPage.page.getByText('No Users yet.')).toBeVisible()
    })
  })
})

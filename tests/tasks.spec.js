import { test, expect } from '@playwright/test'
import { userData, AuthPage } from './pages/auth.js'
import { testTaskData, TaskPage } from './pages/tasks.js'

test.describe('Управление задачами', () => {
  let authPage
  let taskPage

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page)
    taskPage = new TaskPage(page)
    await authPage.goto()
    await authPage.login(userData.username, userData.password)
    await expect(await authPage.getWelcomeHeader()).toBeVisible()
  })

  test.describe('Создание задачи', () => {
    test('Форма создания отображается корректно', async () => {
      await taskPage.gotoTaskList()
      await taskPage.page.getByRole('link', { name: 'Create' }).click()
      await expect(taskPage.page.getByRole('combobox', { name: 'Assignee' })).toBeVisible()
      await expect(taskPage.page.getByLabel('Title')).toBeVisible()
      await expect(taskPage.page.getByRole('textbox', { name: 'Content' })).toBeVisible()
      await expect(taskPage.page.getByRole('combobox', { name: 'Status' })).toBeVisible()
      await expect(taskPage.page.getByRole('combobox', { name: 'Label' })).toBeVisible()
      await expect(taskPage.page.getByRole('button', { name: 'Save' })).toBeVisible()
    })

    test('Задача создается и отображается на доске', async () => {
      await taskPage.gotoTaskList()
      await taskPage.createTask(testTaskData.assignee, testTaskData.title, testTaskData.content, testTaskData.status.draft, testTaskData.labels)

      await expect(taskPage.page.getByText(testTaskData.title)).toBeVisible()
    })
  })

  test.describe('Редактирование задачи', () => {
    test('Данные изменяются корректно', async () => {
      await taskPage.gotoTaskList()
      await taskPage.createTask(testTaskData.assignee, testTaskData.title, testTaskData.content, testTaskData.status.draft, testTaskData.labels)
      await taskPage.gotoTaskList()
      await taskPage.editTask(testTaskData.updatedTitle)
      await expect(taskPage.page.getByText(testTaskData.updatedTitle)).toBeVisible()
    })
  })

  test.describe('Перемещение задач', () => {
    test('Задача перемещается между колонками', async () => {
      await taskPage.gotoTaskList()
      await taskPage.createTask()
      await taskPage.gotoTaskList()
      await taskPage.moveTask()
      await taskPage.gotoTaskList()

      const publishedColumn = taskPage.page.locator('.css-1xphtog',
        { hasText: 'Published' })
      await expect(publishedColumn.getByText(testTaskData.title)).toBeVisible()
    })
  })

  test.describe('Фильтрация задач', () => {
    test('Фильтрация по исполнителю', async () => {
      await taskPage.gotoTaskList()
      await taskPage.filterByAssignee(testTaskData.assignee)
      await expect(taskPage.page.getByRole('combobox', { name: 'Assignee john@google.com' })).toBeVisible()
    })

    test('Фильтрация по статусу', async () => {
      await taskPage.gotoTaskList()
      await taskPage.filterByStatus(testTaskData.status.draft)
      await expect(taskPage.page.getByRole('combobox', { name: 'Status Draft' })).toBeVisible()
    })

    test('Фильтрация по лейблу', async () => {
      await taskPage.gotoTaskList()
      await taskPage.filterByLabel(testTaskData.labels)
      await expect(taskPage.page.getByRole('combobox', { name: 'Label bug' })).toBeVisible()
    })

    test('Очистка фильтров', async () => {
      await taskPage.gotoTaskList()
      await taskPage.filterByAssignee(testTaskData.assignee)
      await taskPage.filterByStatus(testTaskData.status.draft)
      await taskPage.filterByLabel(testTaskData.labels)
      await taskPage.clearFilters()
      await expect(taskPage.page.getByRole('combobox', { name: 'Assignee john@google.com' })).not.toBeVisible()
      await expect(taskPage.page.getByRole('combobox', { name: 'Status Draft' })).not.toBeVisible()
      await expect(taskPage.page.getByRole('combobox', { name: 'Label bug' })).not.toBeVisible()
    })
  })

  test.describe('Удаление задачи', () => {
    test('Удаление одной задачи', async () => {
      await taskPage.gotoTaskList()
      await taskPage.createTask(testTaskData.assignee, testTaskData.title, testTaskData.content, testTaskData.status.draft, testTaskData.labels)
      await taskPage.gotoTaskList()
      await taskPage.deleteSelectedTask(testTaskData.title)
      await expect(taskPage.page.getByText(('Element deleted'))).toBeVisible()
      await expect(taskPage.page.getByText(testTaskData.title)).not.toBeVisible()
    })
  })
})

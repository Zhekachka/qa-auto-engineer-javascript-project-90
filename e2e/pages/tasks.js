export const testTaskData = {
  title: 'Test Task',
  content: 'Test description',
  assignee: 'john@google.com',
  status: {
    draft: 'Draft',
    published: 'Published',
  },
  labels: 'bug',
  updatedTitle: 'Updated Task',
}

export class TaskPage {
  constructor(page) {
    this.page = page
  }

  async gotoTaskList() {
    await this.page.goto('http://localhost:5173/#/tasks')
  }

  async createTask() {
    await this.page.getByRole('link', { name: 'Create' }).click()

    await this.page.getByRole('combobox', { name: 'Assignee' }).click()
    await this.page.getByRole('option', { name: testTaskData.assignee }).click()

    await this.page.getByLabel('Title').fill(testTaskData.title)
    await this.page.getByRole('textbox', { name: 'Content' }).fill(testTaskData.content)

    await this.page.getByRole('combobox', { name: 'Status' }).click()
    await this.page.getByRole('option', { name: testTaskData.status.draft }).click()

    await this.page.getByRole('combobox', { name: 'Label' }).click()
    await this.page.getByRole('option', { name: testTaskData.labels }).click()

    await this.page.locator('#menu-label_id div').first().click()

    await this.page.getByRole('button', { name: 'Save' }).click()
  }

  async editTask() {
    await this.page.getByRole('button', { name: testTaskData.title }).getByLabel('Edit').click()
    await this.page.getByRole('textbox', { name: 'Title' }).fill(testTaskData.updatedTitle)
    await this.page.getByRole('button', { name: 'Save' }).click()
  }

  async moveTask() {
    await this.page.getByRole('button', { name: testTaskData.title }).getByLabel('Edit').click()
    await this.page.getByRole('combobox', { name: 'Status' }).click()
    await this.page.getByRole('option', { name: testTaskData.status.published }).click()
    await this.page.getByRole('button', { name: 'Save' }).click()
    // попытка перемещения через dragAndDrop
    // await taskCard.hover()
    // await taskCard.dragTo(targetColumn, {targetPosition: { x: 10, y: 20 }})

    // await taskCard.hover();
    // await this.page.mouse.down();
    
    // await targetColumn.hover();
    // await this.page.mouse.up();
  }

  async filterByStatus(status) {
    await this.page.getByRole('combobox', { name: 'Status' }).click()
    await this.page.getByRole('option', { name: status }).click()
  }

  async filterByAssignee(assignee) {
    await this.page.getByRole('combobox', { name: 'Assignee' }).click()
    await this.page.getByRole('option', { name: assignee }).click()
  }

  async filterByLabel(label) {
    await this.page.getByRole('combobox', { name: 'Label' }).click()
    await this.page.getByRole('option', { name: label }).click()
  }

  async clearFilters() {
    await this.page.getByRole('button', { name: 'Add filter' }).click()
    await this.page.getByText('Remove all filters').click()
  }

  async deleteSelectedTask() {
    await this.page.getByRole('button', { name: testTaskData.title }).getByLabel('Edit').click()
    await this.page.getByRole('button', { name: 'Delete' }).click()
  }
}

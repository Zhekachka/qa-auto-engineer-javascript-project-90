export const testStatusData = {
  name: 'Test Status',
  slug: 'test-status',
  updatedName: 'Updated Status',
}

export class StatusesPage {
  constructor(page) {
    this.page = page
  }

  async gotoStatusesList() {
    await this.page.goto('http://localhost:5173/#/task_statuses')
  }

  async createStatus() {
    await this.page.getByRole('link', { name: 'Create' }).click()
    await this.page.getByLabel('Name').fill(testStatusData.name)
    await this.page.getByLabel('Slug').fill(testStatusData.slug)
    await this.page.getByRole('button', { name: 'Save' }).click()
  }

  async editStatus() {
    await this.page.getByRole('cell', { name: 'Test Status' }).click()
    await this.page.getByRole('textbox', { name: 'Name' }).fill(testStatusData.updatedName)
    await this.page.getByRole('button', { name: 'Save' }).click()
  }

  async deleteSelectedStatus() {
    await this.page.getByRole('button', { name: 'Delete' }).click()
  }
}

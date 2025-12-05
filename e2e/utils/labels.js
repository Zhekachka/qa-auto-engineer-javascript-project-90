export const testLabelData = {
  name: 'Test-label',
  updatedName: 'labelUpdated',
}

export class LabelPage {
  constructor(page) {
    this.page = page
  }

  async gotoLabelList() {
    await this.page.goto('http://localhost:5173/#/labels')
  }

  async createLabel() {
    await this.page.getByRole('link', { name: 'Create' }).click()
    await this.page.getByLabel('Name').fill(testLabelData.name)
    await this.page.getByRole('button', { name: 'Save' }).click()
  }

  async editLabel() {
    await this.page.getByRole('cell', { name: 'bug' }).click()
    await this.page.getByRole('textbox', { name: 'Name' }).fill(testLabelData.updatedName)
    await this.page.getByRole('button', { name: 'Save' }).click()
  }

  async deleteSelectedLabel() {
    await this.page.getByRole('button', { name: 'Delete' }).click()
  }
}

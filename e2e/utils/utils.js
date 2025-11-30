export const userData = {
  username: 'username',
  password: 'password',
}

export const testUserData = {
  email: 'example@mail.ru',
  firstName: 'Test',
  lastName: 'User',
  updatedLastName: 'UserUpdated',
}

export class AuthPage {
  constructor(page) {
    this.page = page
  }

  async goto() {
    await this.page.goto('http://localhost:5173/#/login')
  }

  async login() {
    await this.page.getByLabel('Username').fill(userData.username)
    await this.page.getByLabel('Password').fill(userData.password)
    await this.page.getByRole('button', { name: 'Sign in' }).click()
  }

  async logout() {
    await this.page.getByRole('button', { name: 'Profile' }).click()
    await this.page.getByRole('menuitem', { name: 'Logout' }).click()
  }

  async getWelcomeHeader() {
    return this.page.getByRole('heading', { name: 'Welcome to the administration' })
  }

  async getSignInButton() {
    return this.page.getByRole('button', { name: 'Sign in' })
  }
}

export class UserPage {
  constructor(page) {
    this.page = page
  }

  async gotoUsersList() {
    await this.page.goto('http://localhost:5173/#/users')
  }

  async createUser() {
    await this.page.getByRole('link', { name: 'Create' }).click()
    await this.page.getByLabel('Email').fill(testUserData.email)
    await this.page.getByLabel('First name').fill(testUserData.firstName)
    await this.page.getByLabel('Last name').fill(testUserData.lastName)
    await this.page.getByRole('button', { name: 'Save' }).click()
  }

  async editUser() {
    await this.page.getByRole('cell', { name: 'john@google.com' }).click()
    await this.page.getByRole('textbox', { name: 'Last name' }).fill(testUserData.updatedLastName)
    await this.page.getByRole('button', { name: 'Save' }).click()
  }

  async deleteSelectedUsers() {
    await this.page.getByRole('button', { name: 'Delete' }).click()
  }
}

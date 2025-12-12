export const userData = {
  username: 'username',
  password: 'password',
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

import { test, expect } from '@playwright/test';

test('Проверка открытия приложения и регистрации', async ({ page }) => {

  await page.goto('http://localhost:5173/#/login');

  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('john');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('1234');
  await page.getByRole('button', { name: 'Sign in' }).click();

  await expect(page.getByRole('heading', { name: 'Welcome to the administration' })).toBeVisible()
});
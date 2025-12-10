# Тестирование канбан доски

**Цель проекта:**  
Автотесты для веб-приложения управления задачами (канбан-доска, пользователи, метки).  

---

## Установка  

1. **Клонировать репозиторий**

2. **Инициализировать проект** 

npm create vite@latest . -- --template react

3. **Установить зависимости** 

Для проекта - npm i

Для тестируемого приложения - npm i @hexlet/testing-task-manager

4. **Установить playwright** 

npm init playwright@latest

## Запуск

Проект - npm run dev

Тесты - npx playwright test

Конкретный тест - npx playwright test e2e/tasks.spec.js


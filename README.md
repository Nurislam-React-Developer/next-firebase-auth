# AuthProject — Современная аутентификация на Next.js + Firebase

**AuthProject** — это современное приложение для аутентификации с поддержкой регистрации, входа через email и Google, защищёнными страницами, профилем пользователя и стильным интерфейсом.

## Возможности

- Регистрация и вход по email/паролю
- Вход через Google
- Защищённые роуты (только для авторизованных)
- Современный UI/UX (Tailwind, анимации, toast)
- Профиль пользователя: аватар, имя, email, UID, дата регистрации
- Редактирование профиля (имя, аватар)
- Красивая страница 404
- Безопасное хранение токенов (cookie)

## Быстрый старт

1. **Склонируйте репозиторий:**
   ```bash
   git clone https://github.com/your-username/auth-project.git
   cd auth-project
   ```
2. **Установите зависимости:**
   ```bash
   npm install
   # или
   yarn install
   ```
3. **Создайте .env файл:**
   Скопируйте `.env.example` в `.env` и заполните своими данными Firebase:
   ```bash
   cp .env.example .env
   # затем отредактируйте .env
   ```
4. **Запустите проект:**
   ```bash
   npm run dev
   # или
   yarn dev
   ```
5. Откройте [http://localhost:3000](http://localhost:3000)

## Настройка переменных окружения

В файле `.env` должны быть такие переменные:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## Развёртывание

Рекомендуется деплоить на [Vercel](https://vercel.com/) или [Netlify](https://www.netlify.com/). Просто импортируйте репозиторий и настройте переменные окружения.

## Как назвать проект на GitHub?

- **auth-project**
- **next-firebase-auth**
- **modern-auth-app**
- **auth-portal**
- **nextjs-auth-starter**

---

**Автор:** Nurislam Abdimalicov

---

> Если понравился проект — ставь ⭐️ и делай fork!

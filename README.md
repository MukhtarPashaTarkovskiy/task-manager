# 📋 Task Manager — Java / Spring Boot

**Веб-приложение для управления личными задачами с REST API, регистрацией пользователей и хранением данных в PostgreSQL.**

Проект разработан на Java / Spring Boot и используется как **Application Under Test (AUT)** в выпускной квалификационной работе по автоматизации тестирования веб-приложения.

---

## 🚀 Live Demo

[🌐 Открыть Task Manager](https://task-manager-kqoi.onrender.com)

> ⏳ **Первый запуск может занять 2–3 минуты.** Приложение размещено на бесплатном тарифе Render и после периода неактивности переходит в спящий режим. При первом обращении дождитесь пробуждения сервера и загрузки страницы. Последующие запросы обычно выполняются быстрее.

Для знакомства с приложением можно зарегистрировать собственного пользователя и создать несколько задач. Данные пользователей и задач хранятся в PostgreSQL (Neon).

---

## 🧰 Tech Stack

**Backend:** `Java 17` · `Spring Boot 3` · `Spring MVC` · `Spring Data JPA` · `Hibernate`

**Security:** `Spring Security` · `BCrypt` · `Session Authentication` · `CSRF Protection`

**Database:** `PostgreSQL` · `Neon`

**Frontend:** `Thymeleaf` · `HTML` · `CSS` · `JavaScript`

**API & Documentation:** `REST API` · `JSON` · `Swagger UI` · `OpenAPI`

**Build & Deployment:** `Maven` · `Docker` · `Git` · `GitHub` · `Render`

---

## ⚙️ Возможности

- Регистрация и авторизация пользователей.
- Создание, просмотр, редактирование и удаление личных задач.
- Статусы задач: `TODO`, `IN_PROGRESS`, `DONE`.
- Приоритеты: `LOW`, `MEDIUM`, `HIGH`.
- Указание описания и срока выполнения (`deadline`).
- Разделение данных: пользователь работает только со своими задачами.
- Проверка входных данных и обработка ошибок API.
- Защита изменяющих запросов CSRF-токеном.

---

## 🔌 REST API

| Метод | Endpoint | Назначение |
|---|---|---|
| `POST` | `/api/auth/register` | Регистрация пользователя |
| `GET` | `/api/tasks` | Получение списка своих задач |
| `POST` | `/api/tasks` | Создание задачи |
| `GET` | `/api/tasks/{id}` | Получение задачи по ID |
| `PUT` | `/api/tasks/{id}` | Обновление задачи |
| `DELETE` | `/api/tasks/{id}` | Удаление задачи |
| `DELETE` | `/api/users/me` | Удаление собственного аккаунта |
| `GET` | `/api/csrf` | Получение CSRF-токена авторизованной сессии |

**Аутентификация:** для операций с задачами необходим вход в приложение; используется сессия Spring Security.

**CSRF:** для `POST`, `PUT`, `DELETE` необходимо передавать актуальный токен в заголовке `X-CSRF-TOKEN`. Для регистрации токен можно получить после открытия страницы регистрации или входа в приложение; endpoint `/api/csrf` предназначен для авторизованной сессии.

### 📖 Swagger / OpenAPI

После запуска приложения локально:

[📖 Swagger UI (localhost)](http://localhost:8080/swagger-ui/index.html)

Спецификация OpenAPI: `http://localhost:8080/v3/api-docs`.

> Публичную ссылку на Swagger для Render стоит добавить после публикации текущих изменений и проверки, что документация доступна в развёрнутой версии.

---

## 💻 Локальный запуск

**Требования:** JDK 17, Maven (или Maven Wrapper из репозитория), PostgreSQL.

1. Клонировать проект:

   ```bash
   git clone https://github.com/MukhtarPashaTarkovskiy/task-manager.git
   cd task-manager
   ```

2. Создать собственную базу PostgreSQL и пользователя с правами на неё. Например:

   ```sql
   CREATE USER task_manager_user WITH PASSWORD 'change_me';
   CREATE DATABASE task_manager OWNER task_manager_user;
   ```

3. Настроить параметры подключения в `src/main/resources/application.properties` под свою среду. В исходной локальной конфигурации используется порт PostgreSQL `5435`; если у вас стандартный порт `5432`, измените URL:

   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/task_manager
   spring.datasource.username=task_manager_user
   spring.datasource.password=${DB_PASSWORD}
   ```

4. Установить переменную окружения `DB_PASSWORD` со своим паролем. Например, в PowerShell для текущего терминала:

   ```powershell
   $env:DB_PASSWORD="change_me"
   ```

5. Запустить приложение:

   ```powershell
   .\mvnw.cmd spring-boot:run
   ```

6. Открыть [http://localhost:8080](http://localhost:8080).

> 🔐 Доступ к авторской базе Neon **не требуется**. Каждый разработчик использует собственную PostgreSQL. Реальные пароли и строки подключения не публикуются в репозитории.

### ☁️ Развёртывание

Приложение развёрнуто на **Render**, база данных размещена в **Neon PostgreSQL**. Для production-профиля используются переменные окружения `SPRING_PROFILES_ACTIVE=prod`, `DB_URL`, `DB_USERNAME`, `DB_PASSWORD`. Пароли и другие секреты задаются в настройках хостинга, а не в Git.

---

## 🧪 Проверка функциональности

Основные сценарии проверены вручную через Swagger UI:

| Сценарий | Результат |
|---|---|
| Регистрация с корректными данными | `201 Created` |
| Повторная регистрация существующего пользователя | `409 Conflict` |
| Регистрация с некорректным email | `400 Bad Request` |
| Создание задачи | `200 OK` |
| Получение задачи | `200 OK` |
| Обновление задачи | `200 OK` |
| Удаление задачи | `200 OK` |
| Получение удалённой задачи | `404 Not Found` |

### 🎓 Связь с ВКР

Task Manager — **тестируемое приложение (AUT)**. Автоматизированные API- и UI-тесты будут разрабатываться в **отдельном репозитории** с использованием Java, REST Assured, Selenide, TestNG, Allure и GitHub Actions. Ссылка на репозиторий тестов будет добавлена после его создания.

---

## 📬 Контакты

**Mukhtar-Pasha Tarkovskiy**

[💻 GitHub](https://github.com/MukhtarPashaTarkovskiy) · [✈️ Telegram](https://t.me/TARKOVSKIYM)

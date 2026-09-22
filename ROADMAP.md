# Qos Perne — планы на будущее (ROADMAP)

Этот файл — договорённость с владельцем клуба. Лендинг уже готов (`index.html`),
а ниже — что делаем дальше со старым сайтом и базой данных.

Старый сайт: `landing/dombyra-main/` (Node + Express, данные в `repertoire.json` / `people.xlsx` / `people_fixed.json`).
Новый лендинг: `index.html`, `styles.css`, `script.js` в корне.

---

## 0. Что владелец должен прислать (чтобы заполнить мок-места)

1. **4 конкурса:** название, год, город, место (Гран-при / I / II / III), 1–2 фото каждого.
   Сейчас в блоке `#achievements` стоят 4 мок-карточки с пометкой `TODO`.
2. **WhatsApp-ссылка ✅ (вставлена 2026-09-22):** `https://chat.whatsapp.com/FAgVLbxew4SEcbsksGsS4g`
   Осталось: пересоздать `QR_code.png` под этот линк (сейчас в лендинге старый QR).
3. **Текст «О нас»:** имя учителя, расписание репетиций, контакты.
4. **Логотип Qos Perne** (если есть отдельный от NIS) — положить в корень, подключить в шапку.

## 1. Связать лендинг со старым сайтом (БД)

- [ ] Поднять старый backend (`landing/dombyra-main/server.js`) как API-сервис
  (Render / тот же хостинг): `GET /api/search?piece=&count=`, `GET /api/repertoire`, `GET /api/pieces`.
- [ ] В лендинге в блоке `#repertoire` заменить демо-функцию `repSearch()` в `script.js`
  на реальный `fetch(API_BASE + '/api/search?...')`. `API_BASE` вынести в конфиг.
- [ ] Кнопка «Открыть базу репертуара» должна вести на развёрнутый старый сайт
  или на `/repertoire/` (после объединения — см. п.4).
- [ ] CORS: на backend добавить `cors()` для домена лендинга.

## 2. Настоящая БД (взамен JSON)

Сейчас данные лежат в `repertoire.json` / `people_fixed.json` + `people.xlsx`.
Нужно мигрировать на Postgres (схема уже есть в `schema.sql`, `init-db.js`).

Предлагаемая схема v2:

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  middle_name TEXT,
  class_grade INT NOT NULL,      -- 7..12
  class_letter TEXT NOT NULL,    -- "A".."J"
  group_name TEXT NOT NULL DEFAULT 'Кіші топ', -- 'Үлкен топ' / 'Кіші топ'
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE kuis (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL UNIQUE,    -- нормализованное название, напр. "Адай"
  title_aliases TEXT[] DEFAULT '{}', -- ["адай","Adai"] для нечёткого поиска
  difficulty INT DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE user_kuis (
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  kui_id INT REFERENCES kuis(id) ON DELETE CASCADE,
  learned_at DATE DEFAULT CURRENT_DATE,
  taught_by TEXT,                -- кто отметил (учитель)
  PRIMARY KEY (user_id, kui_id)
);

CREATE TABLE teachers (
  id SERIAL PRIMARY KEY,
  login TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL
);
```

- [ ] Импорт существующих: распарсить `all_participants.txt` + `people_fixed.json` + `people.xlsx`,
  нормализовать имена кюев (сейчас «Адай»/«адай», «Көроғлы»/«Көрұғлы»/«Көроғолы» — дубли!),
  залить через seed-скрипт `seed.js`.
- [ ] Нормализацию кюев делать через таблицу алиасов (`title_aliases`) + ручная чистка ~30 названий.

## 3. Регистрация участников с сайта

Новая страница/блок `#register` на лендинге:

- [ ] Форма: **аты, тегі, әкесінің аты, сынып (grade 7–12 + буква), телефон (необязательно), кюи которые знает (мультиселект с автокомплитом из `/api/pieces`)**.
- [ ] `POST /api/register` → создаёт `users` + связи `user_kuis`. Новым — статус «на проверке».
- [ ] Защита: rate-limit, проверка ФИО (мин. длина), капча (Cloudflare Turnstile) — иначе спам.
- [ ] После регистрации — сообщение «Сәтті! Мұғалім растайды» + кнопка в WhatsApp.

## 4. Отдельная страница учителя

Роут `/teacher.html` (не индексировать, вход по логину/паролю):

- [ ] **Логин учителя** (`POST /api/teacher/login` → сессия/JWT в httpOnly cookie).
- [ ] **Выбор класса:** фильтр `grade + letter` (напр. `8"J"`), список учеников класса.
- [ ] **Массовое добавление кюя классу:** выбрать класс → выбрать кюй → «Отметить всем присутствующим»
  (чекбоксы, снять отсутствующих) → `POST /api/teacher/assign { class_grade, class_letter, kui_id, user_ids[] }`.
- [ ] **По одному:** открыть ученика → галочки выученных кюев → сохранить.
- [ ] **Новый кюй:** поле «Добавить кюй» (`POST /api/kuis`).
- [ ] **Подтверждение новичков:** вкладка «Заявки» — approve/reject.
- [ ] Удобство: большие кнопки, работает с телефона, поиск по имени, фильтр «не знает этот кюй».

API для учителя:

```
POST /api/teacher/login
GET  /api/teacher/students?grade=8&letter=J
POST /api/teacher/assign
POST /api/kuis
GET  /api/teacher/requests
POST /api/teacher/requests/:id/approve
```

## 5. Объединение в один сайт (опционально, рекомендуется)

- [ ] Перенести лендинг в `public/` Express-приложения или наоборот держать два сервиса:
  `qosperne.kz/` (лендинг) + `qosperne.kz/app` (база). Проще — один Express:
  `server.js` отдаёт статику лендинга + API.
- [ ] Один `package.json`, один деплой на Render (`render.yaml` уже есть в старом проекте).

## 6. Порядок работ (предложение)

1. Владелец присылает 4 конкурса + WhatsApp-линк → заполняю мок (30 мин).
2. Деплой старого API + привязка поиска на лендинге (1).
3. Postgres + seed существующих (2) — самый трудоёмкий из-за чистки названий кюев.
4. Форма регистрации (3).
5. Кабинет учителя (4).
6. Объединение и финальный деплой (5).

---
*Обновлено: 2026-09-22. Автор лендинга: Muse Spark. Вопросы — в WhatsApp группу клуба 🙂*

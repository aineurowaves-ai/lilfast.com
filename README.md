# Lilfast — Landing Page

Статический многоязычный сайт (EN / PL / DE / FR) для Lilfast Sp. z o.o.

## Структура

```
lilfast/
├── index.html          # главная страница
├── assets/logo.png     # логотип
├── css/styles.css      # стили
└── js/
    ├── main.js         # навигация, языки, тема
    ├── i18n.js         # переводы
    └── animations.js   # анимации
```

## Локальный запуск

Откройте `index.html` в браузере или запустите локальный сервер:

```bash
# Python
python -m http.server 8080

# Node.js (npx)
npx serve .
```

Сайт будет доступен по адресу `http://localhost:8080`.

## Публикация на GitHub

### 1. Создайте репозиторий

1. Зайдите на [github.com/new](https://github.com/new)
2. Имя репозитория, например: `lilfast-website`
3. **Public** (для бесплатного GitHub Pages)
4. Не добавляйте README / .gitignore через GitHub — они уже есть в папке
5. Нажмите **Create repository**

### 2. Загрузите файлы

**Вариант A — через Git (рекомендуется)**

Установите [Git for Windows](https://git-scm.com/download/win), затем в папке проекта:

```bash
cd c:\Users\Administrator\Desktop\lilfast

git init
git add .
git commit -m "Initial commit: Lilfast landing page"
git branch -M main
git remote add origin https://github.com/ВАШ_ЛОГИН/lilfast-website.git
git push -u origin main
```

**Вариант B — через веб-интерфейс GitHub**

1. На странице нового репозитория: **uploading an existing file**
2. Перетащите всё содержимое папки `lilfast` (не саму папку-обёртку)
3. Commit changes

### 3. Включите GitHub Pages

1. Репозиторий → **Settings** → **Pages**
2. **Source**: **GitHub Actions** (в репозитории уже есть workflow `.github/workflows/pages.yml`)
3. После первого push в `main` деплой запустится автоматически
4. Через 1–2 минуты сайт будет по адресу:

```
https://ВАШ_ЛОГИН.github.io/lilfast-website/
```

> Альтернатива без Actions: выберите **Deploy from a branch** → `main` → `/ (root)`.

> Если репозиторий называется `username.github.io`, сайт откроется сразу на `https://username.github.io`.

## Свой домен (опционально)

1. В **Settings → Pages → Custom domain** укажите домен (например `lilfast.com`)
2. У регистратора добавьте DNS-записи:
   - `A` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - или `CNAME` → `ВАШ_ЛОГИН.github.io`

## Лицензия

© Lilfast Sp. z o.o. Все права защищены.

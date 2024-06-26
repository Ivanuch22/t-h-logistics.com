

## Установка

### Клонирование проекта с репозитория GitHub:

1. В консоли перейдите в директорию, где будет храниться ваш проект.
2. Введите следующую команду:

```
git clone https://github.com/HackHead/strapi-logistics.git
```
### Подготовка приложения Next.js:

1. Из директории `strapi-logistics/` перейдите в папку `client`:
2. Cкопируйте файл `.env.local` переименуйте копию в  `.env`:
```
cd client
yarn
yarn dev
```
В консоли должно появиться сообщение, что React успешно работает на порту 3000.
### Подготовка Strapi:

1. Из директории `strapi-logistics/` перейдите в папку `strapi-app`:
```
cd strapi-app
```

2. Скопируйте файл `.env.example` и переименуйте его в `.env`.

3. Выполните следующие команды:
```
yarn
yarn strapi configuration:restore --file config_dump.json
yarn strapi import --file data.tar.gz
yarn develop
```
В консоли должно появиться сообщение, что Strapi успешно работает на порту 1337.
# Предисловие

Приложение состоит из 3х частей: Nginx веб сервер, NextJs и Strapi
## Как работает ваш сайт
Когда пользователь обращается к вашему сайту его встречает nginx, обрабатывает запрос и в свою очередь обращается к nextJs приложению, который постоянно работает в отличии от статических сайтов, nextJs получает url адрес к которому обратился пользователь и на основании его формирует запрос к страпи для получения меню и данных страницы. Страпи получает запрос и отправляет ответ, NextJs обрабатывает ответ и генерирует html страницу для отправки пользователю.

## Как создать страницу 
1) В контент-менеджере страпи выбирает коллекцию "Page"
1.1) seo_title - Это заголовок страницы, этот тот текст который будет выводиться между тегами title 
```html
    ...
    <head>
        <title>
            Здесь будет ваш seo_title
        </title>
    </head>
    ...
```
1.2) seo_description - Это описание страницы, этот тот текст который будет выводиться между тегами title 
```html
    ...
    <head>
        <meta name="description" content="здесь будеш ваш seo_description" />
    </head>
    ...
```
1.3) page_title - это большой заголовок на зеленом фоне на вашей странице
1.4) url - URL по которому будет доступна ваша страница, начинаться он должен всегда с бэкслеша - "/"
1.5) body - тело вашей страницы, то есть тот контент который будет выводиться между навигацией и подвалом, вы можете добавлять туда все что угодно, даже HTML код

## Как создать пункт меню
В страпи выбирает menus-Main. Там все довольно тривиально: создаете пункты меню и подменю для каждого пункта нужно добавить url который должен начинаться с "/". Этот url должен совпасть с тем который вы указали про создании страницы.
# t-h-logistics.com

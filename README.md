# Creating-short-link
Приложение для создания коротких ссылок и отслеживания количества переходов по ним.

## Предварительный просмотр:
(не работают запросы к серверу http://79.143.31.216/)  
https://savelyevdmitry.github.io/Creating-short-link/

## Запуск проекта
1) Склонировать репозиторий 
```html
git clone https://github.com/SavelyevDmitry/Creating-short-link.git
```
2) Установить все заивисмости 
```html
npm install
```
3) Запустить проект
```html
npm start
```

## Что внутри  
SPA приложение, написанное при помощи React, Redux и Typescript.  
Включает в себя три страницы: авторизация, регистрация и контент.  
На основной странице присутствует возможность создать короткую ссылку, а также в виде таблицы из 3х колонок отображается информация о созданных раннее ссылках.  
При количестве ссылок больше, чем размер страницы, появляется пагинация, работающая на стороне сервера (по умолчанию 10 ссылок на странице).   
При нажатии на заголовки таблицы, информация внутри таблицы сортируется.   
При клике на ссылку, она копируется в буфер обмена. 

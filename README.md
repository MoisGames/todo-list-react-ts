# TodoListReactTS

Небольшое Frontend приложение, написанное на:
REACT + TS

Библиотека для тестирования: Jest

Приложение представляет собой простой Todo list (Список задач).
Вас встречает окно ввода и 3 дела: 2 активных и 1 выполненное.
При вводе названия нового дела и нажатия на кнопку `ENTER`,
в текущий список дел помещается активная задача.
Слева от поля ввода `Input`, кнопка в виде стелочки,
которая скрывает/показывает лист задач.

Функционал:

Слева от названия задачи, есть кнопка в виде `Галочки`,
при нажатии на которую задача становится выполненной,
зачеркивается и кнопка становится зеленой галочкой.

В нижней части приложения:
`2 items left ` - показывает количество текущий задач(по умолчанию все).
Кнопка `All` - показывает все задачи.
Кнопка `Active` - показывает только активные на данный момент задачи.
Кнопка `Completed` - показывает только выполненные задачи.
Кнопка `Clear` - удаляет из списка выполненные задачи.

## Запуск и настройка
Чтобы запустить приложение:
В терминале введите 
```cmd
npm i
```
```cmd
npm start
```
Нажмите Enter
Перейдите на `http://localhost:5173/`.

## Запуск unit тестов

Запустите `npm test`, чтобы выполнить модульные тесты Jest.

## Remote / Install

Чтобы создать клон репозитория в командной строке:

```cmd
git clone https://github.com/MoisGames/to-do-list-react-ts.git
```


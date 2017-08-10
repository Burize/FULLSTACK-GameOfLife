# FULLSTACK-GameOfLife

### Установка 
Для подгрузки всего необходимого запустить npm i (npm install).

### Запуск
Для запуска выполнить npm start - запуститься [webpack devserver](https://webpack.github.io/docs/webpack-dev-server.html) с hot-reload.

### Тестирование
Для запуска тестов выполнить npm test. 
Для Unit тестов используются [Karma](https://karma-runner.github.io/1.0/index.html), [Mocha](https://mochajs.org/), [Chai](http://chaijs.com/) и [Sinon](http://sinonjs.org/).
Для тестирования canvas используется [Canteen](https://github.com/platfora/Canteen).
## Архитектура

В проекте используется шаблон [MVC](https://ru.wikipedia.org/wiki/Model-View-Controller):
- Работа с данными игры(состояние игрового поля) осуществляется в Модели;
- Отрисовка DOM-элементов и обработка взаимодействия пользователя с ними осуществляется в Представлении;
- Основная логика игры(старт, пауза, конец игры, изменение состояния поля) прописывается в Контроллере;
- Элементы должны быть максимально обособлены:
  - Модель ничего не должна знать о контроллере или представлении;
  - Представление ничего не должно знать по контроллере или модели;
- Изменение каких-либо полей должно происходит через методы объекта, а не на прямую:
  - Контроллер работает с моделью используя предоставляемые ею методы;
  - Взаимодействие контроллера и представления осуществляется через события.

## Model
 Хранит текущее состояние игрового поля: двумерный массив с объектами [Cell](src/Model/Cell.js);
 
 Содержит методы для изменения его состояния:
 - getCells() - возвращает копию игрового полям;
 - killCells() - "убивает" клетку по полученным координатам;
 - restoreCells() - "оживляет" клетку по полученным координатам
 - changeCell() - меняет состоянии клетки на обратное;
 - countNeighbors() - считает количество соседей клетки;
 - updateCells() - обновляет игровое поле;
 - changeWidth() - изменяет ширину игрового полям;
 - changeHeight() - изменяет высоту игрового поля.
 
 \+ есть несколько вспомогательных функций:
 - arrayLengthCompare() - сравнивает по длине 2 двумерных-квадратных массива
 - isFieldChange() - проверяет равенство двух игровых полей(до обновления и после);
 - updateCell() - проверяет жива или мертва должна быть клетка на следующей игровой итерации;
 - sizeValidate() - проверяет валидность нового значения для высоты/ширины: число и больше 0.
 
 ## View
 
 Рендерит html разметку при помощи [шаблона](src/View/Template.js) (в качестве шаблонизатора используется [mustache](https://github.com/janl/mustache.js)).
 
 Для тестирования и дальнейшего расширения DOM-объекты сгенерированной html разметки сохранены во View в качестве полей объекта:
 - buttonStart - кнопка начала/продолжения игры;
 - buttonPause - кнопка паузы игры;
 - inputWidth/inputHeight - инпуты для ширины и высоты;
 - _canvas - Канвас, на котором рисуется игровое поле.
 
 По той же причине все обработчики для DOM-объектов описывать, как собственные методы у View.
 
 При введении новых значений для ширины(высоты) должна осуществляться проверка на корректность: введено должно быть число и оно должно быть больше 0. 
 Изменение поля должно происходит по unfocus инпута или нажатию enter. 
 
 Представление реализовывает собственные события, на которые подписывается контроллер. 
 События описываются при помощи [EventEmitter](src/View/EventEmitter.js).
 
 При работе с DOM-объектами использывать [JQuery](https://jquery.com/).
 
 Отрисовка поля происходит при вызове метода reDraw().
 
 ## Controller
 
 При инициализации создает View и Model; подписывается на события View, в качестве обработчиков используются собственные методы:
 
 - startGame() - Запускает игру;
 - pauseClick() - Ставит игру на паузу;
 - fieldClick() - Если игра на паузе, то меняет состоянии клетки с указанными координатами и перерисовывает поле;
 - changeWidth()/changeHeight() - вызывает соответствующий метод модели вызывает перерисовку представления.
 
 ## Соглашения по коду
 
 ###### Стандарты FSD
  На первом месте стоят стандарты Front End разработки от FSD ( если ты работаешь с этим проектом, то наверно уже давно их выучил :mag:)
 
 ###### ESLint
 Для [ESLint](http://eslint.org/) используется конфиг от [airBnB](https://www.npmjs.com/package/eslint-config-airbnb-base). 
 Некоторые [правила](.eslintrc) были опущены.
 
 ESLint автоматически проверяет и редактирует код(убирает лишние пробелы, отступы, скобки и тд.). При не соответствии конфигу проект собран не будет, все ошибки будут видны в консоле.
 
  ###### Общие правила
  Переменные именуются [camelCase](https://en.wikipedia.org/wiki/Camel_case) c маленькой первой буквой;
  Приватные поля и методы начинаются с _;
  Максимально придерживаться [ECMAScript 6](http://es6-features.org/#Constants) - с ESLint у вас по другому и не выйдет;
  При использовании "экспериментальной" технологии всегда добавлять соответствующий полифилл.
 

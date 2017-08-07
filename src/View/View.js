import './View.styl';
import EventEmitter from './EventEmitter';

export default class View {
  constructor(width, height) {
    const _this = this;
    this._width = width;
    this._height = height;

    this.events = new EventEmitter();

    const container = $('<article/>').addClass('container');

    const controls = $('<section/>').addClass('controls');

    this.buttonStart = $('<button>Старт</button>')
      .addClass('controls__btn-start')
      .click('click.buttonStart', () => this.events.emit('startGame'));

    this.buttonPause = $('<button>Пауза</button>')
      .addClass('controls__btn-pause')
      .on('click.buttonPause', () => this.events.emit('pause'));

    const controlsWidth = $('<div/>').addClass('controls__width');

    this.inputWidth = $('<input/>')
      .attr({ id: 'controls__width-input', type: 'number', min: '1' }).val(width)
      .on('blur.inputWidth', function () {
        _this._width = this.value;
        _this._canvas.width = _this._width * _this.cellSize;
        _this.events.emit('changeWidth', this.value);
      })
      .on('keyup.inputWidth', function (e) {
        if (this.value < 1) this.value = 1;

        if (e.keyCode === 13) this.blur();
      })
      .on('click.mozillaSpecial', function () {
        $(this).focus();
      });

    controlsWidth.append($('<span>Ширина: </span>'), this.inputWidth);

    const controlsHeight = $('<div/>').addClass('controls__height');

    this.inputHeight = $('<input/>')
      .attr({ id: 'controls__height-input', type: 'number', min: '1' }).val(height)
      .on('blur.inputHeight', function () {
        _this._height = this.value;
        _this._canvas.height = _this._height * _this.cellSize;
        _this.events.emit('changeHeight', this.value);
      })
      .on('keyup.inputHeight', function (e) {
        if (this.value < 1) this.value = 1;

        if (e.keyCode === 13) this.blur();
      })
      .on('click.mozillaSpecial', function () {
        $(this).focus();
      });

    controlsHeight.append($('<span>Высота: </span>'), this.inputHeight);

    controls.append(this.buttonStart, this.buttonPause, controlsWidth, controlsHeight);

    container.append(controls);

    const field = $('<section/>').addClass('field');

    this._canvas = document.createElement('canvas');
    this._canvas.className = 'field__canvas';

    field.append(this._canvas);
    container.append(field);

    $('body').append(container);


    this.cellSize = parseFloat(field.css('font-size'));

    this._canvas.width = this._width * this.cellSize;
    this._canvas.height = this._height * this.cellSize;

    this._ctx = this._canvas.getContext('2d');

    this._ctx.fillStyle = 'black';

    for (let i = 0; i < this._width; i += 1) {
      for (let j = 0; j < this._height; j += 1) { this._ctx.strokeRect(i * this.cellSize, j * this.cellSize, this.cellSize, this.cellSize); }
    }

    $(this._canvas).click(e => this.events.emit('fieldClick', { x: parseInt(e.offsetX / this.cellSize, 10),
      y: parseInt(e.offsetY / this.cellSize, 10) }));
  }


  reDraw(field) {
    this._canvas.width = this._width * this.cellSize;
    this._canvas.height = this._height * this.cellSize;

    field.forEach((line, x) => {
      line.forEach((cell, y) => {
        this._ctx.clearRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);

        if (cell.alive) { this._ctx.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize); } else { this._ctx.strokeRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize); }
      });
    });
  }

  endGame() {
    alert('Игра завершена!');
  }
}

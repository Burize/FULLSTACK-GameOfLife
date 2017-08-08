import Mustache from 'mustache';
import './View.styl';
import EventEmitter from './EventEmitter';

export default class View {
  constructor(width, height) {
    const _this = this;
    this._width = width;
    this._height = height;

    this.events = new EventEmitter();

    const template = $('#game-template').html();
    const output = $('.container');
    const data = { width, height };
    const html = Mustache.to_html(template, data);
    output.html(html);

    this.buttonStart = output.find('.controls__btn-start')
      .click('click.buttonStart', () => this.events.emit('startGame'));

    this.buttonPause = output.find('.controls__btn-pause')
      .on('click.buttonPause', () => this.events.emit('pause'));


    this.inputWidth = output.find('.controls__width-input')
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


    this.inputHeight = output.find('.controls__height-input')
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


    this._canvas = output.find('canvas')[0];

    this.cellSize = parseFloat(output.find('.field').css('font-size'));

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

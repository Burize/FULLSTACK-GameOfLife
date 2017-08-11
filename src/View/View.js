import Mustache from 'mustache';
import './View.styl';
import template from './template.mustache';
import EventEmitter from '../Shared/EventEmitter';

export default class View {
  constructor(width, height) {
    this._width = width;
    this._height = height;

    this.events = new EventEmitter();

    const $output = $('body');
    const data = { width, height };
    const html = Mustache.to_html(template, data);

    $output.append($(html));

    this.cellSize = parseFloat($output.find('.field').css('font-size'));

    this.findControls($output);

    this.setControlsHandlers();

    this._canvas = $output.find('#field__canvas');

    if (this._canvas.length !== 1) {
      throw new RangeError(`Expected get 1 canvas instead ${this._canvas.length}`);
    } else {
      this._canvas = this._canvas[0];
      this.createCanvas();
    }
  }

  findControls(root) {
    this.$buttonStart = root.find('.controls__btn-start');
    this.$buttonPause = root.find('.controls__btn-pause');
    this.$inputWidth = root.find('.controls__width-input');
    this.$inputHeight = root.find('.controls__height-input');
  }

  setControlsHandlers() {
    this.$buttonStart
      .click('click.buttonStart', this.startGame.bind(this));

    this.$buttonPause
      .on('click.buttonPause', this.pauseGame.bind(this));


    this.$inputWidth
      .on('blur.inputWidth', this.changeWidth.bind(this))
      .on('keyup.inputWidth', this.inputKeyUp)
      .on('click.mozillaSpecial', function () {
        $(this).focus();
      });


    this.$inputHeight
      .on('blur.inputHeight', this.changeHeight.bind(this))
      .on('keyup.inputHeight', this.inputKeyUp)
      .on('click.mozillaSpecial', function () {
        $(this).focus();
      });
  }
  createCanvas() {
    this._canvas.width = this._width * this.cellSize;
    this._canvas.height = this._height * this.cellSize;

    this._ctx = this._canvas.getContext('2d');

    this._ctx.fillStyle = 'black';

    for (let i = 0; i < this._width; i += 1) {
      for (let j = 0; j < this._height; j += 1) {
        this._ctx.strokeRect(i * this.cellSize, j * this.cellSize, this.cellSize, this.cellSize);
      }
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

        if (cell.alive) {
          this._ctx.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
        } else {
          this._ctx.strokeRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
        }
      });
    });
  }
  /* eslint-disable class-methods-use-this, no-undef */


  startGame() {
    this.events.emit('startGame');
  }

  pauseGame() {
    this.events.emit('pause');
  }
  changeWidth(e) {
    this._width = e.currentTarget.value;
    this._canvas.width = this._width * this.cellSize;
    this.events.emit('changeWidth', e.currentTarget.value);
  }

  changeHeight(e) {
    this._height = e.currentTarget.value;
    this._canvas.height = this._height * this.cellSize;
    this.events.emit('changeHeight', e.currentTarget.value);
  }

  inputKeyUp(e) {
    if (e.currentTarget.value < 1) e.currentTarget.value = 1;

    if (e.keyCode === 13) e.currentTarget.blur();
  }
  endGame() {
    alert('Игра завершена!');
  }
}

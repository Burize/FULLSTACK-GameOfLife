import View from '../View/View';
import Model from '../Model/Model';

const autobind = require('auto-bind');

export default class Controller {
  constructor(x, y) {
    this._model = new Model(x, y);

    this._gameTimer; // eslint-disable-line no-unused-expressions

    this._isPause = true;

    this._view = new View(x, y);

    autobind(this);

    this._view.events.subscribe('startGame', this.startGame);

    this._view.events.subscribe('pause', this.pauseGame);

    this._view.events.subscribe('changeCell', this.changeCell);

    this._view.events.subscribe('changeWidth', this.changeWidth);

    this._view.events.subscribe('changeHeight', this.changeHeight);
  }

  startGame() {
    if (this._isPause) {
      this._isPause = false;

      this._gameTimer = setTimeout(this.updateField, 300);
    }
  }

  updateField() {
    this._model.updateCells();

    if (!this._model.isFieldChange) {
      this._isPause = true;
      this._view.endGame();

      return;
    }

    this._view.reDraw(this._model.getCells());

    this._gameTimer = setTimeout(this.updateField, 300);
  }

  pauseGame() {
    this._isPause = true;
    clearTimeout(this._gameTimer);
  }

  changeCell(coordinates) {
    if (this._isPause) {
      this._model.changeCell(coordinates.x, coordinates.y);
      this._view.reDraw(this._model.getCells());
    }
  }

  changeWidth(width) {
    this._model.changeWidth(width);
    this._view.reDraw(this._model.getCells());
  }

  changeHeight(height) {
    this._model.changeHeight(height);
    this._view.reDraw(this._model.getCells());
  }
}

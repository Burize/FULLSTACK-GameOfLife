import View from '../View/View';
import Model from '../Model/Model';


export default class Controller {
  constructor(x, y) {
    this._model = new Model(x, y);

    this._gameTimer; // eslint-disable-line no-unused-expressions

    this._isPause = true;

    this._view = new View(x, y);

    this._view.events.subscribe('startGame', () => this.startGame.call(this));

    this._view.events.subscribe('pause', () => this.pauseGame.call(this));

    this._view.events.subscribe('fieldClick', coordinates => this.fieldClick.call(this, coordinates));

    this._view.events.subscribe('changeWidth', width => this.changeWidth.call(this, width));

    this._view.events.subscribe('changeHeight', height => this.changeHeight.call(this, height));
  }

  startGame() {
    const _this = this;

    if (_this._isPause) {
      _this._isPause = false;

      _this._gameTimer = setTimeout(function tick() {
        _this._model.updateCells();

        if (!_this._model.isFieldChange) {
          _this._isPause = true;
          _this._view.endGame();

          return;
        }

        _this._view.reDraw(_this._model.getCells());

        _this._gameTimer = setTimeout(tick, 300);
      }, 300);
    }
  }

  pauseGame() {
    this._isPause = true;
    clearTimeout(this._gameTimer);
  }

  fieldClick(coordinates) {
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

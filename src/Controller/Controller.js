import View from '../View/view';
import Model from '../Model/model';


function arrayLengthCompare(array1, array2) {
  if (array1.length === array2.length || array1[0].length === array2[0].length) { return true; }

  return false;
}

export default class Controller {
  constructor(x, y) {
    this._model = new Model(x, y);

    this._gameTimer;

    this._pause = true;

    this._previousField = [[], []];

    this._view = new View(x, y);

    this._view.events.subscribe('startGame', () => this.startGame.call(this));

    this._view.events.subscribe('pause', () => this.pauseClick.call(this));

    this._view.events.subscribe('fieldClick', coordinates => this.fieldClick.call(this, coordinates));

    this._view.events.subscribe('changeWidth', width => this.changeWidth.call(this, width));

    this._view.events.subscribe('changeHeight', height => this.changeHeight.call(this, height));
  }

  endGame(currentField) {
    if (!arrayLengthCompare(this._previousField, currentField)) {
      this._previousField = currentField;
      return false;
    }


    for (let i = 0; i < this._previousField.length; i += 1) {
      for (let j = 0; j < this._previousField[0].length; j += 1) {
        if (this._previousField[i][j].alive !== currentField[i][j].alive) {
          this._previousField = currentField;

          return false;
        }
      }
    }

    return true;
  }

  startGame() {
    const _this = this;

    if (_this._pause) {
      _this._pause = false;

      _this._gameTimer = setTimeout(function tick() {
        const field = _this._model.updateCells();

        if (_this.endGame(field)) {
          _this._pause = true;
          _this._view.endGame();
          return;
        }

        _this._view.reDraw(field);

        _this._gameTimer = setTimeout(tick, 300);
      }, 300);
    }
  }

  pauseClick() {
    this._pause = true;
    clearTimeout(this._gameTimer);
  }

  fieldClick(coordinates) {
    if (this._pause) {
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

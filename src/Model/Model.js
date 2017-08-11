import Cell from './Cell';

function createField(x, y) {
  return Array.from({ length: x }, () => Array.from({ length: y }, () => new Cell()));
}

function deepCopy(array) {
  return array.map((line) => {
    let newElement;

    if (Array.isArray(line)) {
      newElement = line.map((cell) => {
        const newCell = Object.assign({}, cell);
        newCell.__proto__ = Object.create(Cell.prototype);// eslint-disable-line no-proto
        return newCell;
      });
    } else {
      newElement = Object.assign({}, line);
      newElement.__proto__ = Object.create(Cell.prototype);// eslint-disable-line no-proto
    }
    return newElement;
  });
}

function arrayLengthCompare(array1, array2) {
  return Boolean(array1.length === array2.length || array1[0].length === array2[0].length);
}

function isFieldChange(previousField, currentField) {
  if (!arrayLengthCompare(previousField, currentField)) { return true; }

  return currentField.some((column, x) => (
    column.some((cell, y) => (cell.alive !== previousField[x][y].alive
    ))
  ));
}

function sizeValidate(size) {
  if (!isNaN(parseInt(size, 10)) && isFinite(size) && size > 0) { return parseInt(size, 10); }
  return 1;
}

export default class Model {
  constructor(x, y) {
    this.isFieldChange = false;

    this._cells = createField(x, y);
  }


  getCells() {
    return deepCopy(this._cells);
  }

  killCell(x, y) {
    this._cells[x][y].kill();
  }

  restoreCell(x, y) {
    this._cells[x][y].restore();
  }

  changeCell(x, y) {
    if (this._cells[x][y].alive) { this.killCell(x, y); } else { this.restoreCell(x, y); }
  }
  updateCell(_x, _y) {
    let neighbors = 0;

    const dx = [-1, -1, -1, 0, 0, 1, 1, 1];
    const dy = [-1, 0, 1, -1, 1, -1, 0, 1];


    for (let i = 0; i < dx.length; i += 1) {
      const x = _x + dx[i];
      const y = _y + dy[i];

      if (x >= 0 && x < this._cells.length && y >= 0 && y < this._cells[0].length) {
        if (this._cells[x][y].alive === true) {
          neighbors += 1;
        }
      }
    }

  if (neighbors === 3 || neighbors === 2 && this._cells[_x][_y].alive === true) return new Cell(true); // eslint-disable-line 

    return new Cell();
  }

  updateCells() {
    const previousField = deepCopy(this._cells);

    this._cells = this._cells.map((line, x) => line.map((cell, y) => this.updateCell(x, y)));

    this.isFieldChange = isFieldChange(previousField, this._cells);
  }

  changeWidth(_x) {
    const x = sizeValidate(_x);


    if (x < this._cells.length) {
      this._cells.splice(x, Number.MAX_VALUE);
    } else {
      this._cells = this._cells.concat(createField(x - this._cells.length, this._cells[0].length));
    }
  }

  changeHeight(_y) {
    const y = sizeValidate(_y);


    if (y < this._cells[0].length) {
      this._cells.forEach(line => line.splice(y, Number.MAX_VALUE));
    } else {
      const newCells = Array.from({ length: y - this._cells[0].length }, () => new Cell());

      this._cells = this._cells.map(line =>
        line.concat(deepCopy(newCells)));
    }
  }
}


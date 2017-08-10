import Cell from './Cell';

function createField(x, y) {
  return Array.from({ length: x }, () => Array.from({ length: y }, () => new Cell()));
}

function deepCopy(array) {
  return array.map(line => line.map(cell => Object.assign({}, cell)));
}

function arrayLengthCompare(array1, array2) {
  return Boolean(array1.length === array2.length || array1[0].length === array2[0].length);
}

function isFieldChange(previousField, currentField) {
  if (!arrayLengthCompare(previousField, currentField)) { return true; }

  return currentField.some((column, x) => column.some((cell, y) => cell.alive !== previousField[x][y].alive)); // eslint-disable-line max-len
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
    this._cells[x][y].alive = false;
  }

  restoreCell(x, y) {
    this._cells[x][y].alive = true;
  }

  changeCell(x, y) {
    this._cells[x][y].alive ? this.killCell(x, y) : this.restoreCell(x, y);
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

/*eslint-disable*/

if (!Array.from) {
  Array.from = (function() {
    var toStr = Object.prototype.toString;
    var isCallable = function(fn) {
      return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
    };
    var toInteger = function (value) {
      var number = Number(value);
      if (isNaN(number)) { return 0; }
      if (number === 0 || !isFinite(number)) { return number; }
      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
    };
    var maxSafeInteger = Math.pow(2, 53) - 1;
    var toLength = function (value) {
      var len = toInteger(value);
      return Math.min(Math.max(len, 0), maxSafeInteger);
    };

    return function from(arrayLike/*, mapFn, thisArg */) {

      var C = this;

      var items = Object(arrayLike);

      if (arrayLike == null) {
        throw new TypeError('Array.from requires an array-like object - not null or undefined');
      }

      var mapFn = arguments[1];
      if (typeof mapFn !== 'undefined') {
        mapFn = arguments.length > 1 ? arguments[1] : void undefined;

        if (!isCallable(mapFn)) {
          throw new TypeError('Array.from: when provided, the second argument must be a function');
        }

        if (arguments.length > 2) {
          T = arguments[2];
        }
      }

      var len = toLength(items.length);

      var A = isCallable(C) ? Object(new C(len)) : new Array(len);

      var k = 0;

      var kValue;
      while (k < len) {
        kValue = items[k];
        if (mapFn) {
          A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
        } else {
          A[k] = kValue;
        }
        k += 1;
      }

      A.length = len;

      return A;
    };
  }());
}

/*eslint-disable*/
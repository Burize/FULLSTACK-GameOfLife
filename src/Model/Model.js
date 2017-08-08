import Cell from './Cell';

function arrayLengthCompare(array1, array2) {
  if (array1.length === array2.length || array1[0].length === array2[0].length) { return true; }

  return false;
}


function isFieldChange(previousField, currentField) {
  if (!arrayLengthCompare(previousField, currentField)) { return true; }

  return currentField.some((column, x) => column.some((cell, y) => cell.alive !== previousField[x][y].alive)); // eslint-disable-line max-len
}

function updateCell(neighbors, cell) {
  if (neighbors === 3 || neighbors === 2 && cell.alive === true) return new Cell(true); // eslint-disable-line 

  return new Cell();
}

function sizeValidate(size) {
  if (!isNaN(parseInt(size, 10)) && isFinite(size) && size > 0) { return size; }
  return 1;
}

export default class Model {
  constructor(x, y) {
    this.fieldChange = false;

    this._cells = Array.from({ length: x }, () => Array.from({ length: y }, () => new Cell()));
  }


  getCells() {
    return JSON.parse(JSON.stringify(this._cells));
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

  countNeighbors(x, y) {
    let neighbors = 0;

    if (x > 0 && y > 0) {
      neighbors += this._cells[x - 1][y - 1].alive;
    }

    if (x > 0) {
      neighbors += this._cells[x - 1][y].alive;
    }

    if (x > 0 && y < this._cells[0].length - 1) {
      neighbors += this._cells[x - 1][y + 1].alive;
    }

    if (y > 0) {
      neighbors += this._cells[x][y - 1].alive;
    }

    if (y < this._cells[0].length - 1) {
      neighbors += this._cells[x][y + 1].alive;
    }

    if (x < this._cells.length - 1 && y > 0) {
      neighbors += this._cells[x + 1][y - 1].alive;
    }

    if (x < this._cells.length - 1) {
      neighbors += this._cells[x + 1][y].alive;
    }

    if (x < this._cells.length - 1 && y < this._cells[0].length - 1) {
      neighbors += this._cells[x + 1][y + 1].alive;
    }

    return neighbors;
  }

  updateCells() {
    const previousfield = JSON.parse(JSON.stringify(this._cells));

    this._cells = this._cells.map((line, x) => line.map((cell, y) => {
      const neighbors = this.countNeighbors(x, y);

      return updateCell(neighbors, cell);
    }));


    this.fieldChange = isFieldChange(previousfield, this._cells);
  }

  changeWidth(_x) {
    const x = sizeValidate(_x);


    if (x < this._cells.length) {
      this._cells.splice(x, Number.MAX_VALUE);
    } else {
      const newColumns = x - this._cells.length;
      for (let i = 0; i < newColumns; i += 1) {
        this._cells.push(Array.from({ length: this._cells[0].length }, () => new Cell()));
      }
    }
  }

  changeHeight(_y) {
    const y = sizeValidate(_y);


    if (y < this._cells[0].length) {
      this._cells.forEach(line => line.splice(y, Number.MAX_VALUE));
    } else {
      const newCells = Array.from({ length: y - this._cells[0].length }, () => new Cell());

      this._cells = this._cells.map(line =>
        line.concat(JSON.parse(JSON.stringify(newCells))));
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
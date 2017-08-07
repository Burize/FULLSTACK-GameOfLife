import Cell from './Cell.js';

function sizeValidate(size) {
  if (!isNaN(parseInt(size, 10)) && isFinite(size) && size > 0) { return size; }
  return 1;
}

export default class Model {
  constructor(x, y) {
    this._cells = [];

    for (let i = 0; i < x; i += 1) {
      this._cells[i] = [];

      for (let j = 0; j < y; j += 1) { this._cells[i].push(new Cell()); }
    }
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

    if (x > 0 && y > 0) { neighbors += this._cells[x - 1][y - 1].alive; }

    if (x > 0) { neighbors += this._cells[x - 1][y].alive; }

    if (x > 0 && y < this._cells[0].length - 1) { neighbors += this._cells[x - 1][y + 1].alive; }

    if (y > 0) { neighbors += this._cells[x][y - 1].alive; }

    if (y < this._cells[0].length - 1) { neighbors += this._cells[x][y + 1].alive; }

    if (x < this._cells.length - 1 && y > 0) { neighbors += this._cells[x + 1][y - 1].alive; }

    if (x < this._cells.length - 1) { neighbors += this._cells[x + 1][y].alive; }

    if (x < this._cells.length - 1 && y < this._cells[0].length - 1) { neighbors += this._cells[x + 1][y + 1].alive; }

    return neighbors;
  }

  updateCells() {
    const cells = this._cells.map((line, x) => line.map((cell, y) => {
      const neighbors = this.countNeighbors(x, y);

      if (neighbors === 3) return true;

      if (neighbors === 2 && cell.alive === true) return true;

      return false;
    }));


    for (let i = 0; i < this._cells.length; i += 1) {
      for (let j = 0; j < this._cells[0].length; j += 1) { this._cells[i][j].alive = cells[i][j]; }
    }

    return JSON.parse(JSON.stringify(this._cells));
  }

  changeWidth(_x) {
    const cells = [];

    const x = sizeValidate(_x);

    for (let i = 0; i < x; i += 1) {
      cells[i] = [];

      for (let j = 0; j < this._cells[0].length; j += 1) {
        if (i < this._cells.length) { cells[i][j] = this._cells[i][j]; } else { cells[i][j] = new Cell(); }
      }
    }

    this._cells = cells;
  }

  changeHeight(_y) {
    const cells = [];

    const y = sizeValidate(_y);

    for (let i = 0; i < this._cells.length; i += 1) {
      cells[i] = [];

      for (let j = 0; j < y; j += 1) {
        if (j < this._cells[0].length) { cells[i][j] = this._cells[i][j]; } else { cells[i][j] = new Cell(); }
      }
    }

    this._cells = cells;


    /* По требованиям нужно стараться работать с методами перебора массивов и не использовать циклов. 
        Был такой вариант реализации, но на мой взгляд он менее читабельный и не быстрее чем с циклами. 
        Причем для функции изменения ширины нужно будет дописать еще пару действий для этого варианта. 
        Поэтому решил оставить как было с циклами.
        
            if(y < this._cells[0].length)
            {
                
                this._cells.forEach((line) => line.splice(y, Number.MAX_VALUE) );
            }    
        else
            {
             
                let amount = y - this._cells[0].length;
                let newCells = []
                for(let i = 0; i< amount; i+=1)
                    newCells.push(new Cell() ); 
                
                this._cells = this._cells.map((line) => line = line.concat(JSON.parse(JSON.stringify(newCells))) );
            }
            
            */
  }
}


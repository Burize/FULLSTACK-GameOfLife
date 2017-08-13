/*eslint-disable*/
export default class Cell {
  constructor(alive = false) {
    this._alive = alive;
  }

    get alive() {
      return this._alive;
    }
  
    kill() {
      this._alive = false;
    }
  
   restore() {
     this._alive = true;
   }
    
    toPrimitive(){

        return {alive: this.alive};
    }
}

import Cell from './Cell.js';

export default class Model {
   
    
    
    constructor(x, y){
        
        this._Cells = [];

        for(let i=0; i<x; i++){

            this._Cells[i] =  new Array(y);

            for(let j=0; j<y; j++)
                this._Cells[i][j]= new Cell();    
        }
    }
   

    GetCells(){
        
        return JSON.parse(JSON.stringify(this._Cells));
    };
     
     
    KillCell(x, y){
            
            this._Cells[x][y].alive = false;
        }
        
    RestoreCell(x, y){
            
            this._Cells[x][y].alive = true;
        }
    
    ChangeCell(x, y){
        
        this._Cells[x][y].alive ? this.KillCell(x, y) : this.RestoreCell(x, y);
    }
        
    CountNeighbors(x,y){
            
            var neighbors = 0;
            
            if(x > 0 && y > 0)
                neighbors +=this._Cells[x-1][y-1].alive;
            if(x > 0)
                neighbors +=this._Cells[x-1][y].alive;
            if(x > 0 && y < this._Cells[0].length - 1)
                neighbors +=this._Cells[x-1][y+1].alive;
            if(y > 0 )
                neighbors +=this._Cells[x][y-1].alive;
            if(y < this._Cells[0].length - 1)
                neighbors +=this._Cells[x][y+1].alive;
            
            if(x < this._Cells.length - 1 && y > 0)
                neighbors +=this._Cells[x+1][y-1].alive;
            if(x < this._Cells.length - 1)
                neighbors +=this._Cells[x+1][y].alive;      
             if(x < this._Cells.length - 1 && y < this._Cells[0].length - 1)
                neighbors +=this._Cells[x+1][y+1].alive;        
              
            return neighbors;
        }
    
    UpdateCells(){
        
        var _cells =  new Array(this._Cells.length);
        
        for(let i=0; i<this._Cells.length; i++){

            _cells[i] =  new Array(this._Cells[0].length);

            for(let j=0; j<this._Cells[0].length; j++)
                {

                    let neighbors = this.CountNeighbors(i,j);
                    
                    if(neighbors == 3)
                        {
                            _cells[i][j]= true;
                            continue;
                        }
                        
                    if(neighbors ==2 && this._Cells[i][j].alive == true)
                        {
                            _cells[i][j] = true;
                            continue;
                        }
                        
                    _cells[i][j] = false;
                    
                }

            }
        
        for(let i=0; i<this._Cells.length; i++)
            for(let j=0; j<this._Cells[0].length; j++)
                this._Cells[i][j].alive = _cells[i][j];
        
        return JSON.parse(JSON.stringify(this._Cells));
        
    }
    
    ChangeSize(x,y){
        
        x = x !==null ? x : this._Cells.length;
        
        y = y !==null ? y : this._Cells[0].length;
        
        var _cells =  new Array(x);
        
        for(let i=0; i<x; i++){

            _cells[i] =  new Array(y);

             for(let j=0; j<y; j++){
                 
                 if(i < this._Cells.length && j < this._Cells[0].length)
                     _cells[i][j] = this._Cells[i][j];
                 else
                     _cells[i][j] = new Cell();
                         
             }
        }
        
        this._Cells = _cells;
    }
}



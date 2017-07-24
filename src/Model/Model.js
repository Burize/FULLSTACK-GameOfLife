import Cell from './Cell.js';

export default class Model {
    
    
    constructor(x, y){
        
        this._Cells = [];

        for(let i = 0; i < x; i++){

            this._Cells[i] = [];

            for(let j = 0; j < y; j++)
                this._Cells[i].push( new Cell());    
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
            
            let neighbors = 0;
            
            if(x > 0 && y > 0)
                neighbors += this._Cells[x-1][y-1].alive;
        
            if(x > 0)
                neighbors += this._Cells[x-1][y].alive;
        
            if(x > 0 && y < this._Cells[0].length - 1)
                neighbors += this._Cells[x-1][y+1].alive;
        
            if(y > 0 )
                neighbors += this._Cells[x][y-1].alive;
        
            if(y < this._Cells[0].length - 1)
                neighbors += this._Cells[x][y+1].alive;
            
            if(x < this._Cells.length - 1 && y > 0)
                neighbors += this._Cells[x+1][y-1].alive;
        
            if(x < this._Cells.length - 1)
                neighbors += this._Cells[x+1][y].alive; 
        
             if(x < this._Cells.length - 1 && y < this._Cells[0].length - 1)
                neighbors += this._Cells[x+1][y+1].alive;        
              
            return neighbors;
        }
    
    UpdateCells(){
        
        let _cells =  this._Cells.map( (line, x) => {
            
            return  line.map( (cell, y) =>{
                
                   let neighbors = this.CountNeighbors(x,y);
                    
                    if(neighbors === 3) return true;
  
                    if(neighbors === 2 && cell.alive === true) return true;
     
                    return false;
            });
            
        });
           
        
        for(let i = 0; i < this._Cells.length; i++)
            for(let j = 0; j < this._Cells[0].length; j++)
                this._Cells[i][j].alive = _cells[i][j];
       
        return JSON.parse(JSON.stringify(this._Cells));
        
    }
    
    ChangeWidth(x){
        
        var _cells =  [];
        
        x = sizeValidate(x);
   
        for(let i = 0; i < x; i++){

            _cells[i] =  [];

             for(let j = 0; j < this._Cells[0].length; j++){
                 
                 if(i < this._Cells.length )
                     _cells[i][j] = this._Cells[i][j];
                 else
                     _cells[i][j] = new Cell();
                         
             }
        }

        this._Cells = _cells;
 
    }
    
    ChangeHeight(y){
        
        var _cells =  [];
        
        y = sizeValidate(y);
        
        for(let i = 0; i < this._Cells.length; i++){

            _cells[i] =  [];

             for(let j = 0; j < y; j++){
                 
                 if(j < this._Cells[0].length)
                     _cells[i][j] = this._Cells[i][j];
                 else
                     _cells[i][j] = new Cell();
                         
             }
        }
        
        this._Cells = _cells;
        
        
        /* По требованиям нужно стараться работать с методами перебора массивов и не использовать циклов. 
        Был такой вариант реализации, но на мой взгляд он менее читабельный и не быстрее чем с циклами. 
        Причем для функции изменения ширины нужно будет дописать еще пару действий для этого варианта. 
        Поэтому решил оставить как было с циклами.
        
            if(y < this._Cells[0].length)
            {
                
                this._Cells.forEach((line) => line.splice(y, Number.MAX_VALUE) );
            }    
        else
            {
             
                let amount = y - this._Cells[0].length;
                let newCells = []

                for(let i = 0; i< amount; i++)
                    newCells.push(new Cell() ); 
                
                this._Cells = this._Cells.map((line) => line = line.concat(JSON.parse(JSON.stringify(newCells))) );
            }
            
            */
    }
}



function sizeValidate( size ){

    
    if(!isNaN(parseInt(size)) && isFinite(size) && size >0)
        return size;
    else
        return 1;
}



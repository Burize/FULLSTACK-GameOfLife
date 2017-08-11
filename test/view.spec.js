import View from '../src/view/view.js'
import Cell from '../src/model/cell.js'

describe('View', function(){
    
    var view = new View(3,5);
    
    
    var canvas = document.createElement('canvas');
    canvas.width = view._width * view.cellSize ; 
    canvas.height = view._height * view.cellSize ; 
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = 'black';
    
    describe('constructor', function(){
        
        
        it('should draw field 3x5 cells',function(){
            
            for(let i=0; i < view._width; i++ )
            for(let j=0; j < view._height; j++)
                ctx.strokeRect(i * view.cellSize, j * view.cellSize,  view.cellSize,  view.cellSize)
                
         assert.equal(ctx.hash(), view._ctx.hash() ); 
            
        })

       
    })
    
    describe('ReDraw', function(){
        
         it('cell at 2,3 should be fill', function(){
        
            var newField = []

               for(let i=0; i<3; i++){

                newField[i] =  new Array(5);

                    for(let j=0; j<5; j++)
                        newField[i][j]= new Cell();    
            }

            newField[2][3]._alive = true;

            view.reDraw(newField);

            for(let i=0; i < newField.length; i++ )
                for(let j=0; j < newField[0].length; j++)
                    {
                        ctx.clearRect(i * view.cellSize, j * view.cellSize,  view.cellSize,  view.cellSize)

                       if(newField[i][j].alive)
                        ctx.fillRect(i * view.cellSize, j * view.cellSize,  view.cellSize,  view.cellSize)
                    else
                        ctx.strokeRect(i * view.cellSize, j * view.cellSize,  view.cellSize,  view.cellSize) 
                    }  


            assert.equal(ctx.hash(), view._ctx.hash() ); 
        
    })
    
    
        it('right drawing after resize', function(){
        
            view._width = 7;

            canvas.width = view._width * view.cellSize ; 

             var newField = []

               for(let i=0; i<7; i++){

                newField[i] =  new Array(5);

                    for(let j=0; j<5; j++)
                        newField[i][j]= new Cell();    
            }

            newField[6][3]._alive = true;

            view.reDraw(newField);

            for(let i=0; i < newField.length; i++ )
                for(let j=0; j < newField[0].length; j++)
                    {
                        ctx.clearRect(i * view.cellSize, j * view.cellSize,  view.cellSize,  view.cellSize)

                       if(newField[i][j].alive)
                        ctx.fillRect(i * view.cellSize, j * view.cellSize,  view.cellSize,  view.cellSize)
                    else
                        ctx.strokeRect(i * view.cellSize, j * view.cellSize,  view.cellSize,  view.cellSize) 
                    }  


            assert.equal(ctx.hash(), view._ctx.hash() ); 

        })
        
    })
   
    
})
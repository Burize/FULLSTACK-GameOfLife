import View from '../src/view/view.js'
import Cell from '../src/model/cell.js'

describe('View', function(){
    
    var view = new View(3,5);
    
    
    var canvas = document.createElement('canvas');
    canvas.width = view._width * view.cell_size ; 
    canvas.height = view._height * view.cell_size ; 
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = 'black';
    
    describe('constructor', function(){
        
        
        it('should draw field 3x5 cells',function(){
            
            for(let i=0; i < view._width; i++ )
            for(let j=0; j < view._height; j++)
                ctx.strokeRect(i * view.cell_size, j * view.cell_size,  view.cell_size,  view.cell_size)
                
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

            newField[2][3].alive = true;

            view.ReDraw(newField);

            for(let i=0; i < newField.length; i++ )
                for(let j=0; j < newField[0].length; j++)
                    {
                        ctx.clearRect(i * view.cell_size, j * view.cell_size,  view.cell_size,  view.cell_size)

                       if(newField[i][j].alive)
                        ctx.fillRect(i * view.cell_size, j * view.cell_size,  view.cell_size,  view.cell_size)
                    else
                        ctx.strokeRect(i * view.cell_size, j * view.cell_size,  view.cell_size,  view.cell_size) 
                    }  


            assert.equal(ctx.hash(), view._ctx.hash() ); 
        
    })
    
    
        it('right drawing after resize', function(){
        
            view._width = 7;

            canvas.width = view._width * view.cell_size ; 

             var newField = []

               for(let i=0; i<7; i++){

                newField[i] =  new Array(5);

                    for(let j=0; j<5; j++)
                        newField[i][j]= new Cell();    
            }

            newField[6][3].alive = true;

            view.ReDraw(newField);

            for(let i=0; i < newField.length; i++ )
                for(let j=0; j < newField[0].length; j++)
                    {
                        ctx.clearRect(i * view.cell_size, j * view.cell_size,  view.cell_size,  view.cell_size)

                       if(newField[i][j].alive)
                        ctx.fillRect(i * view.cell_size, j * view.cell_size,  view.cell_size,  view.cell_size)
                    else
                        ctx.strokeRect(i * view.cell_size, j * view.cell_size,  view.cell_size,  view.cell_size) 
                    }  


            assert.equal(ctx.hash(), view._ctx.hash() ); 

        })
        
    })
   
    
})
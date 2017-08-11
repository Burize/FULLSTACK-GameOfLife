import Model from '../src/Model/model';
import Cell from '../src/Model/Cell';


describe('Model', function() {
    
    describe('Constructor', function(){
        
       var model = new Model(3,3); 
        
        it('should return array[3][3]', function(){
            
            assert.instanceOf(model._cells, Array)
            assert.instanceOf(model._cells[0], Array)
            assert.instanceOf(model._cells[1], Array)
            assert.instanceOf(model._cells[2], Array)
            
        });
        
        
        it('elements should be cells', function(){
             
            assert.instanceOf(model._cells[0][0], Cell)
            assert.instanceOf(model._cells[1][1], Cell)
            assert.instanceOf(model._cells[2][2], Cell)
        });
        
        it('cells should be dead', function(){
            
            assert.isFalse( model._cells[0][0].alive);
            assert.isFalse( model._cells[1][1].alive);
            assert.isFalse( model._cells[2][2].alive);
        });
    });
    
    
    describe('GetCells', function(){
        
        var model = new Model(3,3);
        
        it('should return array[3][3]', function(){
            
            var cells = model.getCells()
            assert.instanceOf(cells, Array)
            assert.instanceOf(cells[0], Array)
            assert.instanceOf(cells[1], Array)
            assert.instanceOf(cells[2], Array)
        });
        
        
        it('cells should be dead', function(){
            
            var cells = model.getCells()
            
           
            assert.isFalse( cells[0][0].alive);
            assert.isFalse( cells[1][1].alive);
            assert.isFalse( cells[2][2].alive);
        });
    });
    
  
    describe('KillCell', function() {
        
        var model = new Model(3,3);
        
        it('dead cell should be dead after execute', function() {
            
            model._cells[0][0]._alive = false;
            model.killCell(0,0);
            assert.isFalse(model._cells[0][0].alive );
        });

        it('alive cell should be dead after execute', function() {

            model._cells[0][0]._alive = true;
            model.killCell(0,0);
            assert.isFalse(model._cells[0][0].alive );
        });
        
  });
    
   
    describe('RestoreCell', function() {
        
        var model = new Model(3,3);
        
        it('dead cell should be alive after execute', function() {

            model._cells[0][0]._alive = false;
            model.restoreCell(0,0);
            assert.isTrue(model._cells[0][0].alive);
        });

        it('alive cell should be alive after execute', function() {

            
            model._cells[0][0]._alive = true;
            model.restoreCell(0,0);
            assert.isTrue(model._cells[0][0].alive);
        });
        
  });
     
    describe('UpdateCells', function(){
       
        
         it('should restore cell at 1,1. Other cells should be unchanged', function(){
             
             var model = new Model(2,2);
             model.restoreCell(0,0);
             model.restoreCell(1,0);
             model.restoreCell(0,1);
             
             model.updateCells();
            
            var cells = model.getCells();
            assert.isTrue(cells[0][0].alive);
            assert.isTrue(cells[1][0].alive);
            assert.isTrue(cells[0][1].alive);
            assert.isTrue(cells[1][1].alive);
             
           
         });
        
        it('should kill cell at 0,1. Other cells should be unchanged', function(){
             
             var model = new Model(2,2);
             model.restoreCell(0,0);
             
             model.updateCells();
            
            var cells = model.getCells();
            assert.isFalse(cells[0][0].alive);
            assert.isFalse(cells[1][0].alive);
            assert.isFalse(cells[0][1].alive);
            assert.isFalse(cells[1][1].alive);
             
           
         });
        
        
        
        it('should kill cells at 0,1 and 0,2. Other cells should be unchanged', function(){
             
             var model = new Model(2,2);
             model.restoreCell(0,0);
             model.restoreCell(0,1);
             
             model.updateCells();
            
            var cells = model.getCells();
            assert.isFalse(cells[0][0].alive);
            assert.isFalse(cells[1][0].alive);
            assert.isFalse(cells[0][1].alive);
            assert.isFalse(cells[1][1].alive);
             
           
         });
        
        it('should kill cells at 1,0 , 0,1 , 1,2 and 2,1. Other cells should be unchanged', function(){
            
            var model = new Model(3,3);
            model.restoreCell(0,0);
            model.restoreCell(1,0);
            model.restoreCell(2,0);
            model.restoreCell(0,1);
            model.restoreCell(2,1);
            model.restoreCell(0,2);
            model.restoreCell(1,2);
            model.restoreCell(2,2);
            model.updateCells();
            
            var cells = model.getCells();
            assert.isTrue(cells[0][0].alive);
            assert.isFalse(cells[1][0].alive);
            assert.isTrue(cells[2][0].alive);
            assert.isFalse(cells[0][1].alive);
            assert.isFalse(cells[1][1].alive);
            assert.isFalse(cells[2][1].alive);
            assert.isTrue(cells[0][2].alive);
            assert.isFalse(cells[1][2].alive);
            assert.isTrue(cells[2][2].alive);
            
        })
        
        it('should restore cell at 1,1 and kill cells at  0,0 and 0,2. Other cells should be unchanged', function(){
            
            var model = new Model(3,3);
            model.restoreCell(0,0);
            model.restoreCell(1,0);
            model.restoreCell(2,0);
            model.restoreCell(2,1);
            model.restoreCell(0,2);
            model.updateCells();
            
            var cells = model.getCells();
            assert.isFalse(cells[0][0].alive);
            assert.isTrue(cells[1][0].alive);
            assert.isTrue(cells[2][0].alive);
            assert.isTrue(cells[0][1].alive);
            assert.isFalse(cells[1][1].alive);
            assert.isTrue(cells[2][1].alive);
            assert.isFalse(cells[0][2].alive);
            assert.isFalse(cells[1][2].alive);
            assert.isFalse(cells[2][2].alive);
            
        })
        });
    
     
    describe('ChangeWidth', function(){
        
        it('should add 1 column to [2][2] array. All new cells should be dead, others be unchanged', function(){

            var model = new Model(2,2);
            model.restoreCell(0,0);
            model.restoreCell(1,1);
            
            assert.lengthOf(model._cells, 2)
            assert.lengthOf(model._cells[0], 2)
            
            model.changeWidth(3);
            
            assert.lengthOf(model._cells, 3)
            assert.lengthOf(model._cells[0], 2)
            
            
            assert.isTrue(model._cells[0][0].alive);
            assert.isFalse(model._cells[1][0].alive);
            assert.isFalse(model._cells[0][1].alive);
            assert.isTrue(model._cells[1][1].alive);     
            assert.isFalse(model._cells[2][0].alive);
            assert.isFalse(model._cells[2][1].alive);
         
            
        });
       
    
        it('should remove 2 columns from [4][4] array. All remaining cells should be unchanged', function(){
        
            var model = new Model(4,4);
            model.restoreCell(0,0);
            model.restoreCell(1,1);
            model.restoreCell(2,2);
            model.restoreCell(3,3);
            
            assert.lengthOf(model._cells, 4)
            assert.lengthOf(model._cells[0], 4)
            
            model.changeWidth(2);
            
            assert.lengthOf(model._cells, 2)
            assert.lengthOf(model._cells[0], 4)
            
            assert.isTrue(model._cells[0][0].alive);
            assert.isFalse(model._cells[1][0].alive);
            assert.isFalse(model._cells[0][1].alive);
            assert.isTrue(model._cells[1][1].alive);
            assert.isFalse(model._cells[0][2].alive);
            assert.isFalse(model._cells[1][2].alive);
            assert.isFalse(model._cells[0][3].alive);
            assert.isFalse(model._cells[1][3].alive);
        }); 
        
         it('should remain 1 column, with existing cells, from [4][4] array, when get 0', function(){
             
            var model = new Model(4,4);
             
            model.restoreCell(0,1);
            model.restoreCell(0,3);
             
            assert.lengthOf(model._cells, 4);
            assert.lengthOf(model._cells[0], 4);
             
            model.changeWidth(0);
             
            assert.lengthOf(model._cells, 1);
            assert.lengthOf(model._cells[0], 4);
             
             
            assert.isFalse(model._cells[0][0].alive);
            assert.isTrue(model._cells[0][1].alive);
            assert.isFalse(model._cells[0][2].alive);
            assert.isTrue(model._cells[0][3].alive);
         });
        
        it('should remain 1 column, with existing cells, from [4][4] array, when get negative number', function(){
             
            var model = new Model(4,4);
             
            model.restoreCell(0,1);
            model.restoreCell(0,3);
             
            assert.lengthOf(model._cells, 4);
            assert.lengthOf(model._cells[0], 4);
             
            model.changeWidth(-1);
             
            assert.lengthOf(model._cells, 1);
            assert.lengthOf(model._cells[0], 4);
             
             
            assert.isFalse(model._cells[0][0].alive);
            assert.isTrue(model._cells[0][1].alive);
            assert.isFalse(model._cells[0][2].alive);
            assert.isTrue(model._cells[0][3].alive);
         });
        
        it('should remain 1 column, with existing cells, from [4][4] array, when get not number variable', function(){
             
            var model = new Model(4,4);
             
            model.restoreCell(0,1);
            model.restoreCell(0,3);
             
            assert.lengthOf(model._cells, 4);
            assert.lengthOf(model._cells[0], 4);
             
            model.changeWidth( new Object());
             
            assert.lengthOf(model._cells, 1);
            assert.lengthOf(model._cells[0], 4);
             
             
            assert.isFalse(model._cells[0][0].alive);
            assert.isTrue(model._cells[0][1].alive);
            assert.isFalse(model._cells[0][2].alive);
            assert.isTrue(model._cells[0][3].alive);
         });
        
    });
    
    
    describe('ChangeHeight', function(){
        
        it('should add 2 rows to [1][1] array. All new cells should be dead, others be unchanged', function(){

            var model = new Model(1,1);
            model.restoreCell(0,0);
            
            assert.lengthOf(model._cells, 1)
            assert.lengthOf(model._cells[0], 1)
            
            model.changeHeight(3);
            
            assert.lengthOf(model._cells, 1)
            assert.lengthOf(model._cells[0], 3)
                  
            assert.isTrue(model._cells[0][0].alive);
            assert.isFalse(model._cells[0][1].alive);
            assert.isFalse(model._cells[0][2].alive);
            
        });
       
    
        it('should remove 2 rows from [4][4] array. All remaining cells should be unchanged', function(){
        
            var model = new Model(4,4);
            model.restoreCell(0,0);
            model.restoreCell(1,1);
            model.restoreCell(2,2);
            model.restoreCell(3,3);
            
            assert.lengthOf(model._cells, 4)
            assert.lengthOf(model._cells[0], 4)
            
            model.changeHeight(2);
            
            assert.lengthOf(model._cells, 4)
            assert.lengthOf(model._cells[0], 2)
            
            assert.isTrue(model._cells[0][0].alive);
            assert.isFalse(model._cells[1][0].alive);
            assert.isFalse(model._cells[2][0].alive);
            assert.isFalse(model._cells[3][0].alive);
            assert.isFalse(model._cells[0][1].alive);
            assert.isTrue(model._cells[1][1].alive);
            assert.isFalse(model._cells[2][1].alive);
            assert.isFalse(model._cells[3][1].alive);
        }); 
        
         it('should remain 1 row, with existing cells, from [4][4] array, when get 0', function(){
             
            var model = new Model(4,4);
             
            model.restoreCell(1,0);
            model.restoreCell(3,0);
             
            assert.lengthOf(model._cells, 4);
            assert.lengthOf(model._cells[0], 4);
             
            model.changeHeight(0);
             
            assert.lengthOf(model._cells, 4);
            assert.lengthOf(model._cells[0], 1);
             
             
            assert.isFalse(model._cells[0][0].alive);
            assert.isTrue(model._cells[1][0].alive);
            assert.isFalse(model._cells[2][0].alive);
            assert.isTrue(model._cells[3][0].alive);
         });
        
        it('should remain 1 row, with existing cells, from [4][4] array, when get negative number', function(){
             
            var model = new Model(4,4);
             
            model.restoreCell(1,0);
            model.restoreCell(3,0);
             
            assert.lengthOf(model._cells, 4);
            assert.lengthOf(model._cells[0], 4);
             
            model.changeHeight(-1);
             
            assert.lengthOf(model._cells, 4);
            assert.lengthOf(model._cells[0], 1);
             
             
            assert.isFalse(model._cells[0][0].alive);
            assert.isTrue(model._cells[1][0].alive);
            assert.isFalse(model._cells[2][0].alive);
            assert.isTrue(model._cells[3][0].alive);
         });
        
        it('should remain 1 row, with existing cells, from [4][4] array, when get not number variable', function(){
             
            var model = new Model(4,4);
             
            model.restoreCell(1,0);
            model.restoreCell(3,0);
             
            assert.lengthOf(model._cells, 4);
            assert.lengthOf(model._cells[0], 4);
             
            model.changeHeight(new Object());
             
            assert.lengthOf(model._cells, 4);
            assert.lengthOf(model._cells[0], 1);
             
             
            assert.isFalse(model._cells[0][0].alive);
            assert.isTrue(model._cells[1][0].alive);
            assert.isFalse(model._cells[2][0].alive);
            assert.isTrue(model._cells[3][0].alive);
         });
        
    });
});
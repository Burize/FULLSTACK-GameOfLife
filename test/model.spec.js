import Model from '../src/Model/model.js';
import Cell from '../src/Model/Cell.js';


describe('Model', function() {
    
    describe('Constructor', function(){
        
       var model = new Model(3,3); 
        
        it('should return array[3][3]', function(){
            
            assert.instanceOf(model._Cells, Array)
            assert.instanceOf(model._Cells[0], Array)
            assert.instanceOf(model._Cells[1], Array)
            assert.instanceOf(model._Cells[2], Array)
            
        });
        
        
        it('elements should be cells', function(){
             
            assert.instanceOf(model._Cells[0][0], Cell)
            assert.instanceOf(model._Cells[1][1], Cell)
            assert.instanceOf(model._Cells[2][2], Cell)
        });
        
        it('cells should be dead', function(){
            
            assert.isFalse( model._Cells[0][0].alive);
            assert.isFalse( model._Cells[1][1].alive);
            assert.isFalse( model._Cells[2][2].alive);
        });
    });
    
    
    describe('GetCells', function(){
        
        var model = new Model(3,3);
        
        it('should return array[3][3]', function(){
            
            var cells = model.GetCells()
            assert.instanceOf(cells, Array)
            assert.instanceOf(cells[0], Array)
            assert.instanceOf(cells[1], Array)
            assert.instanceOf(cells[2], Array)
        });
        
        
        it('cells should be dead', function(){
            
            var cells = model.GetCells()
            
           
            assert.isFalse( cells[0][0].alive);
            assert.isFalse( cells[1][1].alive);
            assert.isFalse( cells[2][2].alive);
        });
    });
    
  
    describe('KillCell', function() {
        
        var model = new Model(3,3);
        
        it('dead cell should be dead after execute', function() {
            
            model._Cells[0][0].alive = false;
            model.KillCell(0,0);
            assert.isFalse(model._Cells[0][0].alive );
        });

        it('alive cell should be dead after execute', function() {

            model._Cells[0][0].alive = true;
            model.KillCell(0,0);
            assert.isFalse(model._Cells[0][0].alive );
        });
        
  });
    
   
    describe('RestoreCell', function() {
        
        var model = new Model(3,3);
        
        it('dead cell should be alive after execute', function() {

            model._Cells[0][0].alive = false;
            model.RestoreCell(0,0);
            assert.isTrue(model._Cells[0][0].alive);
        });

        it('alive cell should be alive after execute', function() {

            
            model._Cells[0][0].alive = true;
            model.RestoreCell(0,0);
            assert.isTrue(model._Cells[0][0].alive);
        });
        
  });
     
  
    describe('CountHeighbors', function() {
        
        var model = new Model(3,3);
        
        model.RestoreCell(0,0);
        model.RestoreCell(1,0);
        model.RestoreCell(0,1);

        
        it('should return 3', function() {

            assert.equal(model.CountNeighbors(1,1), 3);
        });

        it('should return 2', function() {

            assert.equal(model.CountNeighbors(0,0), 2);
        });
        
        it('should return 1', function() {

            assert.equal(model.CountNeighbors(0,2), 1);
        });
        
        it('should return 0', function() {

            assert.equal(model.CountNeighbors(2,2), 0);
        });
        
  });
    
     
    describe('UpdateCells', function(){
       
        
         it('should restore cell at 1,1. Other cells should be unchanged', function(){
             
             var model = new Model(2,2);
             model.RestoreCell(0,0);
             model.RestoreCell(1,0);
             model.RestoreCell(0,1);
             
             model.UpdateCells();
            
            var cells = model.GetCells();
            assert.isTrue(cells[0][0].alive);
            assert.isTrue(cells[1][0].alive);
            assert.isTrue(cells[0][1].alive);
            assert.isTrue(cells[1][1].alive);
             
           
         });
        
        it('should kill cell at 0,1. Other cells should be unchanged', function(){
             
             var model = new Model(2,2);
             model.RestoreCell(0,0);
             
             model.UpdateCells();
            
            var cells = model.GetCells();
            assert.isFalse(cells[0][0].alive);
            assert.isFalse(cells[1][0].alive);
            assert.isFalse(cells[0][1].alive);
            assert.isFalse(cells[1][1].alive);
             
           
         });
        
        
        
        it('should kill cells at 0,1 and 0,2. Other cells should be unchanged', function(){
             
             var model = new Model(2,2);
             model.RestoreCell(0,0);
             model.RestoreCell(0,1);
             
             model.UpdateCells();
            
            var cells = model.GetCells();
            assert.isFalse(cells[0][0].alive);
            assert.isFalse(cells[1][0].alive);
            assert.isFalse(cells[0][1].alive);
            assert.isFalse(cells[1][1].alive);
             
           
         });
        
        it('should kill cells at 1,0 , 0,1 , 1,2 and 2,1. Other cells should be unchanged', function(){
            
            var model = new Model(3,3);
            model.RestoreCell(0,0);
            model.RestoreCell(1,0);
            model.RestoreCell(2,0);
            model.RestoreCell(0,1);
            model.RestoreCell(2,1);
            model.RestoreCell(0,2);
            model.RestoreCell(1,2);
            model.RestoreCell(2,2);
            model.UpdateCells();
            
            var cells = model.GetCells();
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
            model.RestoreCell(0,0);
            model.RestoreCell(1,0);
            model.RestoreCell(2,0);
            model.RestoreCell(2,1);
            model.RestoreCell(0,2);
            model.UpdateCells();
            
            var cells = model.GetCells();
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
    
     
    describe('ChangeSize', function(){
        
        it('should add 1 column and 2 row to [2][2] array. All new cells should be dead, others be unchanged', function(){

            var model = new Model(2,2);
            model.RestoreCell(0,0);
            model.RestoreCell(1,1);
            
            assert.lengthOf(model._Cells, 2)
            assert.lengthOf(model._Cells[0], 2)
            
            model.ChangeSize(3,4);
            
            assert.lengthOf(model._Cells, 3)
            assert.lengthOf(model._Cells[0], 4)
            
            
            assert.isTrue(model._Cells[0][0].alive);
            assert.isFalse(model._Cells[1][0].alive);
            assert.isFalse(model._Cells[0][1].alive);
            assert.isTrue(model._Cells[1][1].alive);
            
            
            assert.isFalse(model._Cells[2][0].alive);
            assert.isFalse(model._Cells[2][1].alive);
            assert.isFalse(model._Cells[2][2].alive);
            assert.isFalse(model._Cells[2][3].alive);
            
            assert.isFalse(model._Cells[1][2].alive);
            assert.isFalse(model._Cells[2][2].alive);
            assert.isFalse(model._Cells[1][3].alive);
            assert.isFalse(model._Cells[2][3].alive);
            
        });
        });
    
        it('should remove  2 column and 1 row from [4][4] array. All remaining cells should be dead, others be unchanged', function(){
        
            var model = new Model(4,4);
            model.RestoreCell(0,0);
            model.RestoreCell(1,1);
            model.RestoreCell(2,2);
            model.RestoreCell(3,3);
            
            
            model.ChangeSize(2,3);
            
            var cells = model.GetCells();
            
            assert.isTrue(cells[0][0].alive);
            assert.isFalse(cells[1][0].alive);
            assert.isFalse(cells[0][1].alive);
            assert.isTrue(cells[1][1].alive);
            assert.isFalse(cells[0][2].alive);
            assert.isFalse(cells[1][2].alive);
        }); 
});
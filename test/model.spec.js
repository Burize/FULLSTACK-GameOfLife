import '../src/model.js'



describe('Model', function() {
    
    
    
    describe('GetCells', function(){
        
        var model = new Model(3,3);
        
        it('should return array[3][3]', function(){
            
            var cells = model.GetCells()
            assert.isTrue( Array.isArray(cells));
            assert.isTrue( Array.isArray(cells[0]));
            assert.isTrue( Array.isArray(cells[1]));
            assert.isTrue( Array.isArray(cells[2]));
        });
        
        
        it('elements should be cells', function(){
            
             var cells = model.GetCells()
             
            assert.isFalse( cells[0][0] instanceof Cell);
            assert.isFalse( cells[1][1] instanceof Cell);
            assert.isFalse( cells[2][2] instanceof Cell);
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

            model.KillCell(0,0);
            assert.isFalse(GetCells()[0][0].alive );
        });

        it('alive cell should be dead after execute', function() {

            model.RestoreCell(0,0);
            model.KillCell(0,0);
            assert.isFalse(GetCells()[0][0].alive );
        });
        
  });
    
    
    describe('RestoreCell', function() {
        
        var model = new Model(3,3);
        
        it('dead cell should be alive after execute', function() {

            model.RestoreCell(1,0);
            assert.isTrue(GetCells()[1][0].alive);
        });

        it('alive cell should be alive after execute', function() {

            
            model.RestoreCell(2,0);
            model.RestoreCell(2,0);
            assert.isTrue(GetCells()[2][0].alive);
        });
        
  });
    
    
    describe('CountHeighbors', function() {
        
        var model = new Model(3,3);
        
        model.RestoreCell(0,0);
        model.RestoreCell(1,0);
        model.RestoreCell(0,1);

        
        it('should return 3', function() {

            assert.equal(model.CountHeighbors(1,1), 3);
        });

        it('should return 2', function() {

            assert.equal(model.CountHeighbors(0,0), 2);
        });
        
        it('should return 1', function() {

            assert.equal(model.CountHeighbors(0,2), 1);
        });
        
        it('should return 0', function() {

            assert.equal(model.CountHeighbors(2,2), 0);
        });
        
  });
    
    
    describe('UpdateCells', function(){
       
        it('should restore cell at 1,1 and kill cell at  2,0 and 0,2. Other cells should be unchanged', function(){
            
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
            assert.isFalse(cells[0][1].alive);
            assert.isTrue(cells[1][1].alive);
            assert.isTrue(cells[2][1].alive);
            assert.isFalse(cells[0][2].alive);
            assert.isFalse(cells[1][2].alive);
            assert.isFalse(cells[2][2].alive);
            
        })
        });
    
    describe('ChangeSize' function(){
        
        it('should add 1 column and 2 row to [2][2] array. All new cells should be dead, others be unchanged', function(){

            var model = new Model(2,2);
            model.RestoreCell(0,0);
            model.RestoreCell(1,1);
            
            model.ChangeSize(3,4);
            
            var cells = model.GetCells();
            assert.isTrue(cells[0][0].alive);
            assert.isFalse(cells[1][0].alive);
            assert.isFalse(cells[0][1].alive);
            assert.isTrue(cells[1][1].alive);
            
            
            assert.isFalse(cells[2][0].alive);
            assert.isFalse(cells[2][1].alive);
            assert.isFalse(cells[2][2].alive);
            assert.isFalse(cells[2][3].alive);
            
            assert.isFalse(cells[1][2].alive);
            assert.isFalse(cells[2][2].alive);
            assert.isFalse(cells[1][3].alive);
            assert.isFalse(cells[2][3].alive);
            
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
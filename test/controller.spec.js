import Controller from '../src/Controller/Controller'


describe('Controller', function(){
    
    var game;
    
    beforeEach( () => {
        
        $('body').html(''); 
         
        game = new Controller(20,20);
    });
   
    describe('constructor', function(){
        
        it('Timer should be undefined', function(){
            
            assert.isUndefined(game._gameTimer);
        })
        
        it('Game should be on pause', function(){
            
            assert.isTrue(game._isPause);
        })
        
        
        it('should initialize model width 20x20 cells', function(){
            
            assert.lengthOf(game._model.getCells(), 20);
            assert.lengthOf(game._model.getCells()[0], 20);
        })
    })
    
    describe('Start game', function(){
        
       let spy_startGame;
        
        before( () => {
        
             spy_startGame = sinon.spy(Controller.prototype, 'startGame')
            });
        
        after( () => {
            
            Controller.prototype.startGame.restore();
        });
        
        
        it("should call 'Start_game()' after click on 'Старт'", function(){
            
           
            game._view.$buttonStart.trigger('click');
            
            sinon.assert.called(spy_startGame);
            assert.isFalse(game._isPause, 'Game on pause');
            assert.isNumber(game._gameTimer, 'GameTimer undefined');
        })       
     
    })
 
    describe('End game', function(){
        
        
        let spy_updateField;
        let _game
        
        beforeEach( () => {
        
             spy_updateField = sinon.spy(Controller.prototype, 'updateField')
             
             $('body').html(''); 
         
             _game = new Controller(20,20);
            
            });
        
        afterEach( () => {
            
            Controller.prototype.updateField.restore();
        });
        
        it("shouldn't call End_game and other functions in GameTimer handler before its one tick", function(done){  
             
            _game._view.$buttonStart.trigger('click');
            let spy_updateCells = sinon.spy(_game._model, 'updateCells');
            let spy_reDraw = sinon.spy(_game._view, 'reDraw');;
            
              setTimeout( function () {
                  
                  
                    try {   
                        assert.equal(spy_updateField.callCount, 0, 'updateField' );
                        assert.equal(spy_updateCells.callCount, 0 );
                        assert.equal(spy_reDraw.callCount, 0 );    
                        done(); 
                  } catch( e ) {
                    done( e );
                  } 
                  
              },200) 
        
        });
        
        
        it("should execute functions in GameTimer handler after first tick", function(done){  

            _game._model._cells[0][0]._alive = true;
            _game._view.$buttonStart.trigger('click');
            let spy_updateCells = sinon.spy(_game._model, 'updateCells');
            let spy_reDraw = sinon.spy(_game._view, 'reDraw');
            let spy_viewEndGame = sinon.spy(_game._view, 'endGame');
            
              setTimeout( function () {
                  
                  
                    try {
                        assert.equal(spy_updateField.callCount, 1, 'updateField' );
                        assert.equal(spy_updateCells.callCount, 1, 'updateCells' );
                        assert.equal(spy_reDraw.callCount, 1, 'reDraw' ); 
                        assert.equal(spy_viewEndGame.callCount, 0, 'endGame' );  
                       
                        done(); 
                  } catch( e ) {
                    done( e );
                  }
                  
              },400) 
        })
        
        
         it("should end game after second GameTimer tick", function(done){  
            
            _game._model._cells[0][0]._alive = true;
            _game._view.$buttonStart.trigger('click');
      
            let spy_viewEndGame = sinon.spy(_game._view, 'endGame');
            let spy_alertGame = sinon.spy(window, 'alert');
             
              setTimeout( function () {
                  
                  
                    try {
                        assert.equal(spy_updateField.callCount, 2, 'updateField' );
                        sinon.assert.called(spy_viewEndGame);
                        sinon.assert.called(spy_alertGame);
              
                        done(); 
                  } catch( e ) {
                    done( e );
                  }
                  
              },800) 
        })
    
   
    })
   
     
    describe('Game pause', function(){
        
        let  spy_pauseGame;
    
        before( () => {
        
             spy_pauseGame = sinon.spy(Controller.prototype, 'pauseGame')
            });
        
        after( () => {
            
            Controller.prototype.pauseGame.restore();
        });
        
        it('game should be on pause', function(){
            
         
            game._view.$buttonStart.trigger('click');
            assert.equal( spy_pauseGame.callCount , 0 );
            assert.isFalse(game._isPause);
            
            game._view.$buttonPause.trigger('click');
            assert.equal( spy_pauseGame.callCount , 1 );
            assert.isTrue(game._isPause);
        })
        
    })
     
    describe('Change cell',function(){
          
        let  spy_changeCell;
    
        before( () => {
        
             spy_changeCell = sinon.spy(Controller.prototype, 'changeCell')
            });
        
        after( () => {
            
            Controller.prototype.changeCell.restore();
        });
         
     
        it('should change cell at 0,0 from dead to alive',function(){
           
          
            let spy_modelChangeCell = sinon.spy(game._model,'changeCell');
            
            var evt = new MouseEvent("click", {
                    bubbles: true,
                    cancelable: true,
                    view: window,
                    clientX: game._view._canvas.offsetLeft + 10,
                    clientY: game._view._canvas.offsetTop + 10
                  });
            
            assert.isFalse(game._model._cells[0][0].alive);
         
            game._view._canvas.dispatchEvent(evt);
            
            sinon.assert.called(  spy_changeCell ); 
            
            sinon.assert.called( spy_modelChangeCell );
            
            assert.isTrue(game._model._cells[0][0].alive);
            
        })
       
    
        it('should change cell at 1,1 from alive to dead',function(){
     
            let spy_modelChangeCell = sinon.spy(game._model,'changeCell');
            
            var evt = new MouseEvent("click", {
                    bubbles: true,
                    cancelable: true,
                    view: window,
                    clientX: game._view._canvas.offsetLeft + 20,
                    clientY: game._view._canvas.offsetTop + 20
                  });
            
            game._model._cells[1][1]._alive = true;
         
            game._view._canvas.dispatchEvent(evt);
            
            sinon.assert.called( spy_changeCell ); 
            
            sinon.assert.called( spy_modelChangeCell );
            
            assert.isFalse(game._model._cells[1][1].alive);
        })
        
        
 
         it("shouldn't change cell while game is playing",function(){
            
            let spy_modelChangeCell = sinon.spy(game._model,'changeCell');
            
            game._view.$buttonStart.trigger('click');
             
            var evt = new MouseEvent("click", {
                    bubbles: true,
                    cancelable: true,
                    view: window,
                    clientX: game._view._canvas.offsetLeft + 20,
                    clientY: game._view._canvas.offsetTop + 20
                  });
         
            game._view._canvas.dispatchEvent(evt);
            
            sinon.assert.called( spy_changeCell ); 
            
            assert.equal( spy_modelChangeCell.callCount , 0 );
            
        }) 
   
    })
  
    describe('Change size', function(){
        
         let spy_changeWidth;
         let spy_changeHeight;
        
          before( () => {
        
             spy_changeWidth = sinon.spy(Controller.prototype, 'changeWidth')
             spy_changeHeight = sinon.spy(Controller.prototype, 'changeHeight')
            });
        
        after( () => {
            
            Controller.prototype.changeWidth.restore();
            Controller.prototype.changeHeight.restore();
        });
         
        it('should change width from 20 to 15 (height should be unchanged)', function(){

            let spy_modelChangeWidth = sinon.spy(game._model, 'changeWidth')

            assert.lengthOf(game._model._cells, 20);
            assert.lengthOf(game._model._cells[0], 20);
            
            game._view.$inputWidth.val(15).blur();
     
            sinon.assert.called(spy_changeWidth);
          
            assert.equal(spy_modelChangeWidth.callCount, 1, 'modelChangeWidth');
            
            assert.lengthOf(game._model._cells, 15);
            assert.lengthOf(game._model._cells[0], 20);
            
        })
        
         
        it('should change height from 20 to 12 (width should be unchanged)', function(){
            
       
            let spy_modelChangeHeight = sinon.spy(game._model, 'changeHeight')
            
            assert.lengthOf(game._model._cells, 20);
            assert.lengthOf(game._model._cells[0], 20);
            
            game._view.$inputHeight.val(12).blur();
            
             sinon.assert.called(spy_changeHeight);
            assert.equal(spy_modelChangeHeight.callCount, 1, 'modelChangeHeight');
            
            assert.lengthOf(game._model._cells, 20);
            assert.lengthOf(game._model._cells[0], 12);
            
        })
        
 
        
    })  
})



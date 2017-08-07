import Controller from '../src/Controller/Controller.js'


describe('Controller', function(){
    
    describe('constructor', function(){
        
         
        var game = new Controller(20,20);
        
        
        it('Timer should be undefined', function(){
            
            assert.isUndefined(game._gameTimer);
        })
        
        it('Game should be on pause', function(){
            
            assert.isTrue(game._pause);
        })
        
        
        it('should initialize model width 20x20 cells', function(){
            
            assert.lengthOf(game._model.getCells(), 20);
            assert.lengthOf(game._model.getCells()[0], 20);
        })
    })
     
    describe('Start game / End Game', function(){
        
       var game = new Controller(20,20);
        
        it("should call 'Start_game()' after click on 'Старт'", function(){
            
            var spy = sinon.spy(game, 'startGame');
         
            game._view.buttonStart.trigger('click');
            sinon.assert.called(spy);
        })       
     
        it("Game shouldn't be on pause", function(){
            
                assert.isFalse(game._pause);
        });
        
        it("should start GameTimer'", function(){
            
                assert.isNumber(game._gameTimer);
        });
        
        
        var spy_endGame = sinon.spy(game, 'endGame');
        var spy_updateCells = sinon.spy(game._model, 'updateCells');
        var spy_reDraw = sinon.spy(game._view, 'reDraw');
        var spy_viewEndGame = sinon.spy(game._view, 'endGame');
        var spy_alertGame = sinon.spy(window, 'alert');
        
        it("shouldn't call End_game and other functions in GameTimer handler before its one tick", function(done){  
             
              setTimeout( function () {
                  
                  
                    try { 
                     //   assert.equal(spy_endGame.callCount, 0 );        
                        assert.equal(spy_updateCells.callCount, 0 );
                        assert.equal(spy_reDraw.callCount, 0 );    
                        done(); 
                  } catch( e ) {
                    done( e );
                  } 
                  
              },200) 
        
        });
        
        
        it("should execute functions in GameTimer handler after first tick", function(done){  
            
              setTimeout( function () {
                  
                  
                    try {
                       // assert.equal(spy_endGame.callCount, 1 );        
                        assert.equal(spy_updateCells.callCount, 1 );
                        assert.equal(spy_reDraw.callCount, 1 ); 
                       // assert.isFalse(spy_endGame.returned(true))
                        assert.isFalse(game._pause) 
                       
                        done(); 
                  } catch( e ) {
                    done( e );
                  }
                  
              },400) 
        })
        
        
         it("should end Game after second GameTimer tick", function(done){  
            
              setTimeout( function () {
                  
                  
                    try {
                        //assert.isTrue(spy_endGame.returned(true)); 
                        //sinon.assert.called(spy_viewEndGame);
                        sinon.assert.called(spy_alertGame);
                        assert.isTrue(game._pause) ;
                        done(); 
                  } catch( e ) {
                    done( e );
                  }
                  
              },800) 
        })
    
   
    })
    
    describe('Game pause', function(){

        var game = new Controller(20,20);
        
        it('game should be on pause', function(){
            
            
            game._view.buttonStart.trigger('click');
            assert.isFalse(game._pause);
            game._view.buttonPause.trigger('click');
            assert.isTrue(game._pause);
        })
        
    })
    
    describe('Field click',function(){
        
        
        it('should change cell at 0,0 from dead to alive',function(){
            
            var game = new Controller(20,20);
            
            var evt = new MouseEvent("click", {
                    bubbles: true,
                    cancelable: true,
                    view: window,
                    clientX: game._view._canvas.offsetLeft + 10,
                    clientY: game._view._canvas.offsetTop + 10
                  });
            
            var spy_fieldClick = sinon.spy(game, 'fieldClick');
            var spy_changeCell = sinon.spy(game._model,'changeCell');
            
            assert.isFalse(game._model._cells[0][0].alive);
         
            game._view._canvas.dispatchEvent(evt);
            
            sinon.assert.called( spy_fieldClick ); 
            
            sinon.assert.called( spy_changeCell );
            
            assert.isTrue(game._model._cells[0][0].alive);
            
        })
        
        
        it('should change cell at 1,1 from alive to dead',function(){
            
            var game = new Controller(20,20);
            
            var evt = new MouseEvent("click", {
                    bubbles: true,
                    cancelable: true,
                    view: window,
                    clientX: game._view._canvas.offsetLeft + 20,
                    clientY: game._view._canvas.offsetTop + 20
                  });
            
            var spy_fieldClick = sinon.spy(game, 'fieldClick');
            var spy_changeCell = sinon.spy(game._model,'changeCell');
            
            
            game._model._cells[1][1].alive = true;
         
            game._view._canvas.dispatchEvent(evt);
            
            sinon.assert.called( spy_fieldClick ); 
            
            sinon.assert.called( spy_changeCell );
            
            assert.isFalse(game._model._cells[1][1].alive);
        })
        
        
         it("shouldn't change cell while game is playing",function(){
            
            var game = new Controller(20,20);
            
            game._view.buttonStart.trigger('click');
             
            var evt = new MouseEvent("click", {
                    bubbles: true,
                    cancelable: true,
                    view: window,
                    clientX: game._view._canvas.offsetLeft + 20,
                    clientY: game._view._canvas.offsetTop + 20
                  });
            
            var spy_fieldClick = sinon.spy(game, 'fieldClick');
            var spy_changeCell = sinon.spy(game._model,'changeCell');
         
            game._view._canvas.dispatchEvent(evt);
            
            sinon.assert.called( spy_fieldClick ); 
            
            assert.equal( spy_changeCell.callCount , 0 );
            
        })
   
    })
    
    describe('Change size', function(){
        
        var game = new Controller(20, 20);
        
        var spy_changeWidth = sinon.spy(game, 'changeWidth')
        var spy_modelChangeWidth = sinon.spy(game._model, 'changeWidth')
        
        var spy_changeHeight = sinon.spy(game, 'changeHeight')
        var spy_modelChangeHeight = sinon.spy(game._model, 'changeHeight')
        
        it('should change width from 20 to 15 (height should be unchanged)', function(){
            
            
            assert.lengthOf(game._model._cells, 20);
            assert.lengthOf(game._model._cells[0], 20);
            
            game._view.inputWidth.val(15).blur();
            
            sinon.assert.called(spy_changeWidth);
            sinon.assert.called(spy_modelChangeWidth);
            
            assert.lengthOf(game._model._cells, 15);
            assert.lengthOf(game._model._cells[0], 20);
            
        })
        
        
        it('should change height from 20 to 12 (width should be unchanged)', function(){
            
            
            assert.lengthOf(game._model._cells, 15);
            assert.lengthOf(game._model._cells[0], 20);
            
            game._view.inputHeight.val(12).blur();
            
            assert.equal(spy_changeHeight.callCount, 1);
            assert.equal(spy_modelChangeHeight.callCount, 1);
            
            assert.lengthOf(game._model._cells, 15);
            assert.lengthOf(game._model._cells[0], 12);
            
        })
        
        it('should change width from 15 to 18 (height should be unchanged)', function(){
            
            
            assert.lengthOf(game._model._cells, 15);
            assert.lengthOf(game._model._cells[0], 12);
            
            game._view.inputWidth.val(18).blur();
            
            assert.equal(spy_changeWidth.callCount, 2);
            assert.equal(spy_modelChangeWidth.callCount, 2);
            
            assert.lengthOf(game._model._cells, 18);
            assert.lengthOf(game._model._cells[0], 12);
            
        })
        
        it('should change height from 12 to 33 (width should be unchanged)', function(){
            
            
            assert.lengthOf(game._model._cells, 18);
            assert.lengthOf(game._model._cells[0], 12);
            
            game._view.inputHeight.val(33).blur();
            
            assert.equal(spy_changeHeight.callCount, 2);
            assert.equal(spy_modelChangeHeight.callCount, 2);
            
            assert.lengthOf(game._model._cells, 18);
            assert.lengthOf(game._model._cells[0], 33);
            
        })
        
    })
})



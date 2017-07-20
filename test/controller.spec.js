import Controller from '../src/Controller/Controller.js'


describe('Controller', function(){
    
    describe('constructor', function(){
        
         
        var game = new Controller(20,20);
        
        
        it('Timer should be undefined', function(){
            
            assert.isUndefined(game._GameTimer);
        })
        
        it('Game should be on pause', function(){
            
            assert.isTrue(game._pause);
        })
        
        
        it('should initialize model width 20x20 cells', function(){
            
            assert.lengthOf(game._model.GetCells(), 20);
            assert.lengthOf(game._model.GetCells()[0], 20);
        })
    })
     
    describe('Start game / End Game', function(){
        
       var game = new Controller(20,20);
        
        it("should call 'Start_game()' after click on 'Старт'", function(){
            
            var spy = sinon.spy(game, 'Start_game');
         
            game._view.button_start.trigger('click');
            sinon.assert.called(spy);
        })
        
        
     
        it("Game shouldn't be on pause", function(){
            
                assert.isFalse(game._pause);
        });
        
        it("should start GameTimer'", function(){
            
                assert.isNumber(game._GameTimer);
        });
        
        
        var spy_endGame = sinon.spy(game, 'End_game');
        var spy_updateCells = sinon.spy(game._model, 'UpdateCells');
        var spy_reDraw = sinon.spy(game._view, 'ReDraw');
        var spy_viewEndGame = sinon.spy(game._view, 'EndGame');
        var spy_alertGame = sinon.spy(window, 'alert');
        
        it("shouldn't call End_game and other functions in GameTimer handler before its one tick", function(done){  
             
              setTimeout( function () {
                  
                  
                    try { 
                        assert.equal(spy_endGame.callCount, 0 );        
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
                        assert.equal(spy_endGame.callCount, 1 );        
                        assert.equal(spy_updateCells.callCount, 1 );
                        assert.equal(spy_reDraw.callCount, 1 ); 
                        assert.isFalse(spy_endGame.returned(true))
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
                        assert.isTrue(spy_endGame.returned(true)); 
                        sinon.assert.called(spy_viewEndGame);
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
            
            
            game._view.button_start.trigger('click');
            assert.isFalse(game._pause);
            game._view.button_pause.trigger('click');
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
            
            var spy_fieldClick = sinon.spy(game, 'Field_click');
            var spy_changeCell = sinon.spy(game._model,'ChangeCell');
            
            assert.isFalse(game._model._Cells[0][0].alive);
         
            game._view._canvas.dispatchEvent(evt);
            
            sinon.assert.called( spy_fieldClick ); 
            
            sinon.assert.called( spy_changeCell );
            
            assert.isTrue(game._model._Cells[0][0].alive);
            
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
            
            var spy_fieldClick = sinon.spy(game, 'Field_click');
            var spy_changeCell = sinon.spy(game._model,'ChangeCell');
            
            
            game._model._Cells[1][1].alive = true;
         
            game._view._canvas.dispatchEvent(evt);
            
            sinon.assert.called( spy_fieldClick ); 
            
            sinon.assert.called( spy_changeCell );
            
            assert.isFalse(game._model._Cells[1][1].alive);
        })
        
        
         it("shouldn't change cell while game is playing",function(){
            
            var game = new Controller(20,20);
            
            game._view.button_start.trigger('click');
             
            var evt = new MouseEvent("click", {
                    bubbles: true,
                    cancelable: true,
                    view: window,
                    clientX: game._view._canvas.offsetLeft + 20,
                    clientY: game._view._canvas.offsetTop + 20
                  });
            
            var spy_fieldClick = sinon.spy(game, 'Field_click');
            var spy_changeCell = sinon.spy(game._model,'ChangeCell');
         
            game._view._canvas.dispatchEvent(evt);
            
            sinon.assert.called( spy_fieldClick ); 
            
            assert.equal( spy_changeCell.callCount , 0 );
            
        })
   
    })
    
    describe('Change width', function(){
        
        var game = new Controller(20, 20);
        
        var spy_Change_width = sinon.spy(game, 'Change_width')
        var spy_Change_height = sinon.spy(game, 'Change_height')
        var spy_ChangeSize= sinon.spy(game._model, 'ChangeSize')
        
        it('should change width from 20 to 15 (height should be unchanged)', function(){
            
            
            assert.lengthOf(game._model._Cells, 20);
            assert.lengthOf(game._model._Cells[0], 20);
            
            game._view.input_width.val(15).blur();
            
            sinon.assert.called(spy_Change_width);
            sinon.assert.called(spy_ChangeSize);
            
            assert.lengthOf(game._model._Cells, 15);
            assert.lengthOf(game._model._Cells[0], 20);
            
        })
        
        
        it('should change height from 20 to 12 (width should be unchanged)', function(){
            
            
            assert.lengthOf(game._model._Cells, 15);
            assert.lengthOf(game._model._Cells[0], 20);
            
            game._view.input_height.val(12).blur();
            
            assert.equal(spy_Change_height.callCount, 1);
            assert.equal(spy_ChangeSize.callCount, 2);
            
            assert.lengthOf(game._model._Cells, 15);
            assert.lengthOf(game._model._Cells[0], 12);
            
        })
        
        it('should change width from 15 to 18 (height should be unchanged)', function(){
            
            
            assert.lengthOf(game._model._Cells, 15);
            assert.lengthOf(game._model._Cells[0], 12);
            
            game._view.input_width.val(18).blur();
            
            assert.equal(spy_Change_width.callCount, 2);
            assert.equal(spy_ChangeSize.callCount, 3);
            
            assert.lengthOf(game._model._Cells, 18);
            assert.lengthOf(game._model._Cells[0], 12);
            
        })
        
        it('should change height from 12 to 33 (width should be unchanged)', function(){
            
            
            assert.lengthOf(game._model._Cells, 18);
            assert.lengthOf(game._model._Cells[0], 12);
            
            game._view.input_height.val(33).blur();
            
            assert.equal(spy_Change_height.callCount, 2);
            assert.equal(spy_ChangeSize.callCount, 4);
            
            assert.lengthOf(game._model._Cells, 18);
            assert.lengthOf(game._model._Cells[0], 33);
            
        })
        
    })
})



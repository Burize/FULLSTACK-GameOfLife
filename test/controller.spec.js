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
  /*   
    describe('Start game', function(){
        
        it("should call 'Start_game()' after click on 'Старт'", function(){
            
            let spy = sinon.spy(game, 'startGame');
            game._view.$buttonStart.trigger('click');
            
            //sinon.assert.called(spy);
            assert.isFalse(game._isPause, 'Game on pause');
            assert.isNumber(game._gameTimer, 'GameTimer undefined');
        })       
     
    })

    describe('End game', function(){
        
        it("shouldn't call End_game and other functions in GameTimer handler before its one tick", function(done){  
             
            game._view.$buttonStart.trigger('click');
            let spy_updateCells = sinon.spy(game._model, 'updateCells');
            let spy_reDraw = sinon.spy(game._view, 'reDraw');;
            
              setTimeout( function () {
                  
                  
                    try {        
                        assert.equal(spy_updateCells.callCount, 0 );
                        assert.equal(spy_reDraw.callCount, 0 );    
                        done(); 
                  } catch( e ) {
                    done( e );
                  } 
                  
              },200) 
        
        });
        
        
        it("should execute functions in GameTimer handler after first tick", function(done){  

            game._model._cells[0][0]._alive = true;
            game._view.$buttonStart.trigger('click');
            let spy_updateCells = sinon.spy(game._model, 'updateCells');
            let spy_reDraw = sinon.spy(game._view, 'reDraw');
            let spy_viewEndGame = sinon.spy(game._view, 'endGame');
            
              setTimeout( function () {
                  
                  
                    try {
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
            
            game._model._cells[0][0]._alive = true;
            game._view.$buttonStart.trigger('click');
      
            let spy_viewEndGame = sinon.spy(game._view, 'endGame');
            let spy_alertGame = sinon.spy(window, 'alert');
             
              setTimeout( function () {
                  
                  
                    try {
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
        
        it('game should be on pause', function(){
            
            
            game._view.$buttonStart.trigger('click');
            assert.isFalse(game._isPause);
            game._view.$buttonPause.trigger('click');
            assert.isTrue(game._isPause);
        })
        
    })
       
    describe('Field click',function(){
          
    
     
        it('should change cell at 0,0 from dead to alive',function(){
           
           // let spy_fieldClick = sinon.spy(game, 'fieldClick');
            let spy_changeCell = sinon.spy(game._model,'changeCell');
            
            var evt = new MouseEvent("click", {
                    bubbles: true,
                    cancelable: true,
                    view: window,
                    clientX: game._view._canvas.offsetLeft + 10,
                    clientY: game._view._canvas.offsetTop + 10
                  });
            
            assert.isFalse(game._model._cells[0][0].alive);
         
            game._view._canvas.dispatchEvent(evt);
            
          //  sinon.assert.called( spy_fieldClick ); 
            
            sinon.assert.called( spy_changeCell );
            
            assert.isTrue(game._model._cells[0][0].alive);
            
        })
       
    
        it('should change cell at 1,1 from alive to dead',function(){
     
           // let spy_fieldClick = sinon.spy(game, 'fieldClick');
            let spy_changeCell = sinon.spy(game._model,'changeCell');
            
            var evt = new MouseEvent("click", {
                    bubbles: true,
                    cancelable: true,
                    view: window,
                    clientX: game._view._canvas.offsetLeft + 20,
                    clientY: game._view._canvas.offsetTop + 20
                  });
            
            game._model._cells[1][1]._alive = true;
         
            game._view._canvas.dispatchEvent(evt);
            
           // sinon.assert.called( spy_fieldClick ); 
            
            sinon.assert.called( spy_changeCell );
            
            assert.isFalse(game._model._cells[1][1].alive);
        })
        
        
 
         it("shouldn't change cell while game is playing",function(){
            
          //  let spy_fieldClick = sinon.spy(game, 'fieldClick');
            let spy_changeCell = sinon.spy(game._model,'changeCell');
            
            game._view.$buttonStart.trigger('click');
             
            var evt = new MouseEvent("click", {
                    bubbles: true,
                    cancelable: true,
                    view: window,
                    clientX: game._view._canvas.offsetLeft + 20,
                    clientY: game._view._canvas.offsetTop + 20
                  });
         
            game._view._canvas.dispatchEvent(evt);
            
          //  sinon.assert.called( spy_fieldClick ); 
            
            assert.equal( spy_changeCell.callCount , 0 );
            
        }) 
   
    })
    */
    describe('Change size', function(){
        
        
         
        it('should change width from 20 to 15 (height should be unchanged)', function(){

            let spy_changeWidth = sinon.spy(game, 'changeWidth')
            let spy_modelChangeWidth = sinon.spy(game._model, 'changeWidth')

            assert.lengthOf(game._model._cells, 20);
            assert.lengthOf(game._model._cells[0], 20);
            
            game._view.$inputWidth.val(15).blur();
     
            
           // assert.equal(spy_changeWidth.callCount, 1, 'changeWidth');
           // assert.equal(spy_modelChangeWidth.callCount, 1, 'modelChangeWidth');
            
            assert.lengthOf(game._model._cells, 15);
            assert.lengthOf(game._model._cells[0], 20);
            
        })
        
//         
//        it('should change height from 20 to 12 (width should be unchanged)', function(){
//            
//          //  let spy_changeHeight = sinon.spy(game, 'changeHeight')
//            let spy_modelChangeHeight = sinon.spy(game._model, 'changeHeight')
//            
//            assert.lengthOf(game._model._cells, 20);
//            assert.lengthOf(game._model._cells[0], 20);
//            
//            game._view.$inputHeight.val(12).blur();
//            
//            //assert.equal(spy_changeHeight.callCount, 1, 'changeHeight');
//            assert.equal(spy_modelChangeHeight.callCount, 1, 'modelChangeHeight');
//            
//            assert.lengthOf(game._model._cells, 20);
//            assert.lengthOf(game._model._cells[0], 12);
//            
//        })
        
 
        
    }) 
})



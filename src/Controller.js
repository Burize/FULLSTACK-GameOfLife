import View from './View/view.js';
import Model from './model.js';

$(function(){
    
    var model = new Model(20,20);
    
    var GameTimer;
    
    var pause = true;
    
    var previous_field = [[],[]];
    
    var end_game = function(current_field){
        
        if(previous_field.length !== current_field.length || previous_field[0].length !== current_field[0].length)
            {
                previous_field = current_field; 
                return false;
            }

        
        for(let i=0; i < previous_field.length; i++ )
            for(let j=0; j < previous_field[0].length; j++)
                {
                    if(previous_field[i][j].alive !== current_field[i][j].alive)
                        {
                            previous_field = current_field; 
                            
                            return false;
                        }
                
                }
   
        return true;
    }
     
    var start_click= function(){
        
        if(pause)
            {
                pause = false;
                
               GameTimer = setTimeout(function tick() {
        
                  
                var field = model.UpdateCells()
        
                if(end_game(field))
                    {   console.log('end')
                        pause=true;
                        view.EndGame();
                        return;
                    }
                   
                view.ReDraw( field );
                   
                   
                   
                GameTimer = setTimeout(tick, 300);

                }, 300); 
            }
        
        
    }
    
    var pause_click = function(){
        
        pause = true;
        clearTimeout( GameTimer );
    }
    
    var field_click = function(x,y){
        
        if(pause)
        {
            
            model.ChangeCell(x,y);
            view.ReDraw(model.GetCells());    
        }
        
    }
    
    var change_width = function(value){
        
        model.ChangeSize(value, null);
        view.ReDraw( model.GetCells() );
     
    }
    
    var change_height = function(value){
        
        model.ChangeSize(null, value);
        view.ReDraw( model.GetCells() );
    }
    
    var view = new View(20, 20, start_click, pause_click, field_click, change_width, change_height);
});
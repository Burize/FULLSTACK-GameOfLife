import View from '../View/view.js';
import Model from '../Model/model.js';

export default class Controller{
        

    constructor(x,y){
        
        var _this = this;
        this._model = new Model(x,y);
        
        this._GameTimer;
    
        this._pause = true;
    
        this._previous_field = [[],[]];
        
        this._view = new View(x, y);
        
        this._view.events.subscribe('Start_game', function(){
          _this.Start_game.call(_this);  
        } );
        
        this._view.events.subscribe('Pause', function(){
          _this.Pause_click.call(_this);  
        } );
        
        this._view.events.subscribe('Field_Click', function(coordinates){
          _this.Field_click.call(_this, coordinates);  
        } );
        
        this._view.events.subscribe('Change_Width', function(width){
          _this.Change_width.call(_this, width);  
        } );
        
        this._view.events.subscribe('Change_Height', function(height){
          _this.Change_height.call(_this, height);  
        } );
    }
    
    End_game(current_field){
        
        if(this._previous_field.length !== current_field.length || this._previous_field[0].length !== current_field[0].length)
            {
                this._previous_field = current_field; 
                return false;
            }

        
        for(let i=0; i < this._previous_field.length; i++ )
            for(let j=0; j < this._previous_field[0].length; j++)
                {
                    if(this._previous_field[i][j].alive !== current_field[i][j].alive)
                        {
                            this._previous_field = current_field; 
                            
                            return false;
                        }
                
                }
   
        return true;
    }
     
    Start_game(){
       
        var _this = this;
        
        if(_this._pause)
            {
                _this._pause = false;
                
               _this._GameTimer = setTimeout(function tick() {
        
                  
                var field = _this._model.UpdateCells()
        
                if(_this.End_game(field))
                    {  
                        _this._pause=true;
                        _this._view.EndGame();
                        return;
                    }
                   
                _this._view.ReDraw( field );
                   
                   
                   
                _this._GameTimer = setTimeout(tick, 300);

                }, 300); 
            }
        
        
    }
    
    Pause_click(){
        
        this._pause = true;
        clearTimeout( this._GameTimer );
    }
    
    Field_click(coordinates){
        
        if(this._pause)
        {

            this._model.ChangeCell(coordinates.x,coordinates.y);
            this._view.ReDraw(this._model.GetCells());    
        }
        
    }
    
    Change_width(width){
        
        this._model.ChangeSize(width, null);
        this._view.ReDraw( this._model.GetCells() );
     
    }
    
    Change_height(height){
        
        this._model.ChangeSize(null, height);
        this._view.ReDraw( this._model.GetCells() );
    }
    
}
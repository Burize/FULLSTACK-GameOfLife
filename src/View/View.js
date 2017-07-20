import './View.styl';
import EventEmitter from './EventEmitter.js';


export default class View{
    
    
    constructor( width, height){
        
        var _this = this; 
        this._width =  width;
        this._height = height;
        
        this.events = new EventEmitter();
        
        var container = $('<article/>').addClass('container');
        
        var controls = $('<section/>').addClass('controls');
        this.button_start = $('<button>Старт</button>').addClass('btn_start')
        .click(function(){
             _this.events.emit('Start_game');                                                                         
        });
        this.button_pause = $('<button>Пауза</button>').attr('id','btn_pause')
        .click(function(){
             _this.events.emit('Pause');                                                                         
        });

        var controls__width = $('<div/>').addClass('controls__width');
        this.input_width = $('<input/>').attr({id: 'controls__width-input', type: 'number', min: '1'}).val(width)
        .blur( function(){ 
            
            _this._width = this.value;
            _this._canvas.width = _this._width * _this.cell_size ; 
            _this.events.emit('Change_Width',this.value);
        }).on('keyup', function (e) {
            if (e.keyCode == 13) {
               this.blur();
            }
        });
        
        controls__width.append($('<span>Ширина: </span>'), this.input_width);

        var controls__height = $('<div/>').addClass('controls__height');
        this.input_height = $('<input/>').attr({id: 'controls__height-input', type: 'number', min: '1'}).val(height)
        .blur( function(){ 
            
            _this._height = this.value;
            _this._canvas.height = _this._height * _this.cell_size ; 
            _this.events.emit('Change_Height',this.value);
        }).
        on('keyup', function (e) {
            if (e.keyCode == 13) {
               this.blur();
            }
        });
        
        controls__height.append($('<span>Высота: </span>'), this.input_height);

        controls.append(this.button_start, this.button_pause, controls__width, controls__height);

        container.append(controls);

        var field = $('<section/>').addClass('field');
        this._canvas = document.createElement('canvas');
        this._canvas.className = 'field__canvas';
        field.append(this._canvas);
        container.append(field);

        $('body').append(container);
        
        
        this.cell_size = parseFloat( field.css('font-size') ); 
        
        this._canvas.width = this._width * this.cell_size ; 
        this._canvas.height = this._height * this.cell_size ; 
        
        this._ctx = this._canvas.getContext('2d');
         
        this._ctx.fillStyle = 'black';
        
        for(let i=0; i < this._width; i++ )
            for(let j=0; j < this._height; j++)
                this._ctx.strokeRect(i * this.cell_size, j * this.cell_size,  this.cell_size,  this.cell_size)
       
        $(this._canvas).click(function(e){
            
        
            _this.events.emit('Field_Click', {x: parseInt( e.offsetX / _this.cell_size), y: parseInt( e.offsetY / _this.cell_size)});
        });
        
        
    }

    ReDraw(field){
       
        this._canvas.width = this._width * this.cell_size ; 
        this._canvas.height = this._height * this.cell_size ; 
        
        for(let i=0; i < field.length; i++ )
            for(let j=0; j < field[0].length; j++)
                {
                    this._ctx.clearRect(i * this.cell_size, j * this.cell_size,  this.cell_size,  this.cell_size)
                    
                   if(field[i][j].alive)
                    this._ctx.fillRect(i * this.cell_size, j * this.cell_size,  this.cell_size,  this.cell_size)
                else
                    this._ctx.strokeRect(i * this.cell_size, j * this.cell_size,  this.cell_size,  this.cell_size) 
                }  
    }
    
    EndGame(){
        
        alert('Игра завершена!');
    }
    
    
}
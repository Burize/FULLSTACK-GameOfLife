import './View.styl';
import EventEmitter from './EventEmitter.js';


export default class View{
    
    
    constructor( width, height){
        
        let _this = this; 
        this._width =  width;
        this._height = height;
        
        this.events = new EventEmitter();
        
        let container = $('<article/>').addClass('container');
        
        let controls = $('<section/>').addClass('controls');
        
        this.button_start = $('<button>Старт</button>')
            .addClass('controls__btn-start')
            .click( 'click.button_start', () => this.events.emit('Start_game') );
        
        this.button_pause = $('<button>Пауза</button>')
            .addClass('controls__btn-pause')
            .on( 'click.button_pause', () => this.events.emit('Pause') );

        let controls__width = $('<div/>').addClass('controls__width');
        
        this.input_width = $('<input/>')
            .attr({id: 'controls__width-input', type: 'number', min: '1'}).val(width)
            .on('blur.input_width', function(){ 

                _this._width = this.value;
                _this._canvas.width = _this._width * _this.cell_size ; 
                _this.events.emit('Change_Width',this.value);
            })
            .on('keyup.input_width', function (e) {
            
                if(this.value < 1) this.value = 1;

                if(e.keyCode == 13) this.blur();
            })
            .on("click.mozillaSpecial", function(){
                $(this).focus();
            });
        
        controls__width.append($('<span>Ширина: </span>'), this.input_width);

        let controls__height = $('<div/>').addClass('controls__height');
        
        this.input_height = $('<input/>')
            .attr({id: 'controls__height-input', type: 'number', min: '1'}).val(height)
            .on('blur.input_height', function(){ 

                _this._height = this.value;
                _this._canvas.height = _this._height * _this.cell_size ; 
                _this.events.emit('Change_Height',this.value);
            })
            .on('keyup.input_height', function (e) {

                if(this.value < 1) this.value = 1;

                if(e.keyCode == 13) this.blur();
            })
            .on("click.mozillaSpecial", function(){
                $(this).focus();
            });
        
        controls__height.append($('<span>Высота: </span>'), this.input_height);

        controls.append(this.button_start, this.button_pause, controls__width, controls__height);

        container.append(controls);

        let field = $('<section/>').addClass('field');
        
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
       
        $(this._canvas).click((e) => {
            
            console.log(parseInt( e.offsetX / this.cell_size));
            
            this.events.emit('Field_Click', {x: parseInt( e.offsetX / this.cell_size), y: parseInt( e.offsetY / this.cell_size)});
            
            
        });
        
        
    }

    
    ReDraw(field){
       
        this._canvas.width = this._width * this.cell_size ; 
        this._canvas.height = this._height * this.cell_size ; 
        
         field.forEach((line, x)=>{
             
             line.forEach( (cell, y)=> {
                 
                 this._ctx.clearRect(x * this.cell_size, y * this.cell_size,  this.cell_size,  this.cell_size)
                    
                    if(cell.alive)
                        this._ctx.fillRect(x * this.cell_size, y * this.cell_size,  this.cell_size,  this.cell_size)
                    else
                        this._ctx.strokeRect(x * this.cell_size, y * this.cell_size,  this.cell_size,  this.cell_size) 
             });
         });
  
    }
    
    EndGame(){
        
        alert('Игра завершена!');
    }
    
    
}
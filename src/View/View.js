import './View.styl'

export default class View{
    
    
    constructor( width, height, start_click, pause_click, field_click,  change_width, change_height){
        
        var _this = this; 
        this._width =  width;
        this._height = height;
       
        
        var container = $('<article/>').addClass('container');
        
        var controls = $('<section/>').addClass('controls');
        var controls__start = $('<button>Старт</button>').attr('id','btn_start').click(start_click);
        var controls__pause = $('<button>Пауза</button>').attr('id','btn_pause').click(pause_click);

        var controls__width = $('<div/>').addClass('controls__width');
        var input_width = $('<input/>').attr({id: 'controls__width-input', type: 'number', min: '1'}).val(width)
        .blur( function(){ 
            
            _this._width = this.value;
            _this._canvas.width = _this._width * _this.cell_size ; 
            change_width(this.value)
        }).on('keyup', function (e) {
            if (e.keyCode == 13) {
               this.blur();
            }
        });
        
        controls__width.append($('<span>Ширина: </span>'), input_width);

        var controls__height = $('<div/>').addClass('controls__height');
        var input_height = $('<input/>').attr({id: 'controls__height-input', type: 'number', min: '1'}).val(height)
        .blur( function(){ 
            
            _this._height = this.value;
            _this._canvas.height = _this._height * _this.cell_size ; 
            change_height(this.value)
        }).
        on('keyup', function (e) {
            if (e.keyCode == 13) {
               this.blur();
            }
        });
        
        controls__height.append($('<span>Высота: </span>'), input_height);

        controls.append(controls__start, controls__pause, controls__width, controls__height);

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
            
                
            var x = e.pageX - this.offsetLeft;
            var y = e.pageY - this.offsetTop;
            
            field_click( parseInt( x / _this.cell_size),parseInt( y / _this.cell_size) );
            
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
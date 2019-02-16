var CanvasManager = {
    canvas: null,
    context: null,

    init: function(element) {
        this.canvas = document.getElementById(element);
        this.context = this.canvas.getContext('2d');

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    },

    drawPlayground: function() {
        var squareWidth = 70;
        var squareHeight = 70;
    
        var darkerSquare = "#424242";
        var lighterSquare = "#999999";
        var theLightestSquare = "#cccccc";

        // цикъл, изчертаващ игровото поле
        var x = 0;
        var y = 0;
        for(var i = 0; i < 7; i++) {
            for(var j = 0; j < 9; j++) {
                
                // променяме цвета
                if(i < 2 || i > 4) {
                    if(i % 2 == 0) {
                        if(j % 2 == 0) {
                            this.context.fillStyle = lighterSquare;
                        } else {
                            this.context.fillStyle = darkerSquare;
                        }
                    } else {
                        if(j % 2 == 0) {
                            this.context.fillStyle = darkerSquare;
                        } else {
                            this.context.fillStyle = lighterSquare;
                        }
                    }
                } else {
                    this.context.fillStyle = theLightestSquare;
                }

                this.context.strokeRect(x, y, squareWidth, squareHeight);
                this.context.fillRect(x, y, squareWidth, squareHeight);

                x += squareWidth;
            }
            x = 0;
            y += squareHeight;
        }
    },
};
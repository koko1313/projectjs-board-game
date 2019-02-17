var CanvasManager = {
    canvas: null,
    context: null,

    playgroundSquaresCollection: [],

    // Инициализира canvas-а
    init: function(element) {
        this.canvas = document.getElementById(element);
        this.context = this.canvas.getContext('2d');

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    },

    // Обработва игровото поле (добавя квадратите към списъка с квадрати)
    processPlayground: function() {
        var squareWidth = 70;
    
        var darkerSquare = "#424242";
        var lighterSquare = "#999999";
        var theLightestSquare = "#cccccc";

        // цикъл, "изчертаващ" игровото поле
        var x = 0;
        var y = 0;
        var color = null;
        for(var i = 0; i < 7; i++) {

            // тук ще съхраняваме квадратите за съответния ред от игровото поле с цел да направим многомерен масив
            var playgroundSquaresRow = [];

            for(var j = 0; j < 9; j++) {
                
                // променяме цвета
                if(i < 2 || i > 4) {
                    if(i % 2 == 0) {
                        if(j % 2 == 0) {
                            color = lighterSquare;
                        } else {
                            color = darkerSquare;
                        }
                    } else {
                        if(j % 2 == 0) {
                            color = darkerSquare;
                        } else {
                            color = lighterSquare;
                        }
                    }
                } else {
                    color = theLightestSquare;
                }

                var squareName = "r"+i+"c"+j;

                // към текущия ред добавяме квадратчето
                playgroundSquaresRow.push(new PlaygroundSquare(x, y, squareWidth, squareName, color));

                x += squareWidth;
            }

            // добавяме реда към игровото поле
            this.playgroundSquaresCollection.push(playgroundSquaresRow);

            x = 0;
            y += squareWidth;
        }


        this.drawPlayground(); // изчертаваме игровото поле
    },

    // Изчертава игровото поле
    drawPlayground: function() {
        this.context.clearRect(0,0, this.canvas.width, this.canvas.height);

        var playgroundRows = this.playgroundSquaresCollection; // всички редове от игровото поле
        for(var i = 0; i<playgroundRows.length; i++) {
            var row = playgroundRows[i]; // текущия ред
            for(var j=0; j<row.length; j++) {
                var square = playgroundRows[i][j]; // текущата колона
                square.draw();
            }
        }
    },
};
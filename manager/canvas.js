var CanvasManager = {
    canvas: null,
    context: null,

    // колекция с квадратите на игровото поле
    playgroundSquaresCollection: [],

    // колекция с героите на играч A
    heroesOfPlayerA: [],

    // колекция с героите на играч B
    heroesOfPlayerB: [],

    // ред е на играч (1 или 2)
    playerTurn: 1,

    // сменя играча, който е на ход
    changePlayerTurn: function() {
        if(this.playerTurn == 1) {
            this.playerTurn = 2;
        } else
        if(this.playerTurn == 2) {
            this.playerTurn = 1;
        }
    },

    // Инициализира canvas-а
    init: function(element) {
        this.canvas = document.getElementById(element);
        this.context = this.canvas.getContext('2d');

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.initHeroes();
    },

    // Инициализира героите на всеки от играчите
    initHeroes: function() {
        this.heroesOfPlayerA.push(new Hero("knight", 8, 3, 15, 1, 1, 2));
        this.heroesOfPlayerA.push(new Hero("elf", 5, 1, 10, 3, 3, 2));
        this.heroesOfPlayerA.push(new Hero("dwarf", 6, 2, 12, 2, 2, 2));

        this.heroesOfPlayerB.push(new Hero("knight", 8, 3, 15, 1, 1, 2));
        this.heroesOfPlayerB.push(new Hero("elf", 5, 1, 10, 3, 3, 2));
        this.heroesOfPlayerB.push(new Hero("dwarf", 6, 2, 12, 2, 2, 2));
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

        this.drawHeroPicker();

        // добавяме click listener
        this.canvas.addEventListener("click", function(e) {
            for(var i = 0; i<playgroundRows.length; i++) {
                var row = playgroundRows[i];
                for(var j=0; j<row.length; j++) {
                    var square = playgroundRows[i][j];
                    
                    if(square.containsPoint(e.clientX, e.clientY)) {
                        console.log(square.name);
                    }
                }
            }

            var heroes = null;
            if(CanvasManager.playerTurn == 1) {
                heroes = CanvasManager.heroesOfPlayerA;
            } else 
            if(CanvasManager.playerTurn == 2) {
                heroes = CanvasManager.heroesOfPlayerB;
            }

            for(var i = 0; i<heroes.length; i++) {
                if(heroes[i].containsPoint(e.clientX, e.clientY)) {
                    console.log(heroes[i].name)
                }
            }
        });
    },

    // Изчертава picker-а за герой
    drawHeroPicker: function() {
        var x = 700;
        var y = 100;
        var width = 80;
        this.context.font = "30px Arial";

        this.context.fillStyle = "black";
        this.context.fillText("Player turn " + this.playerTurn, x, 50);

        var heroes = null;

        if(this.playerTurn == 1) {
            heroes = this.heroesOfPlayerA;
        } else 
        if(this.playerTurn == 2) {
            heroes = this.heroesOfPlayerB;
        }

        for(var i=0; i<heroes.length; i++) {
            this.context.fillStyle = "white";
            this.context.strokeRect(x, y, width, width);
            this.context.fillRect(x, y, width, width);

            // добавяме координати на героя, за да може после да изчислим дали е цъкнато върху него
            heroes[i].x = x;
            heroes[i].y = y;
            heroes[i].width = width;

            this.context.fillStyle = "black";
            this.context.fillText(heroes[i].availableForPick, x, y+width-30); // изписваме бройката
            this.context.fillText(heroes[i].name, x, y+width); // изписваме името

            x += width + 10;
        }
    },
};
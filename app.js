var row = 10;
var col = 10;
var nbFourmis = 20;
var tab = [];


//virtual representation of the game

for (var i = 0; i < row; i++) {
    tab.push(Array(col).fill(0));
}   

//console.log(tab);
//verifie les deplacements possible pour une coordonnées precise
function checkDeplacement(x, y, row, col) {
    var array = [];
    var tabDeplacement = [[1, 0], [0, 1], [1, 1], [-1, 0], [0, -1], [-1, -1], [1, -1], [-1, 1]];
    var xtemp, ytemp;
    for (var i = 0; i < tabDeplacement.length; i++) {
        xtemp = (x + tabDeplacement[i][0]);
        ytemp = (y + tabDeplacement[i][1]);
        if ((xtemp >= 0 && xtemp < row) && (ytemp >= 0 && ytemp < col)) {
            array.push(tabDeplacement[i]);
        }
    }
    return array;
}

//random int max exclu
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

//creation du tableau html
var createTable = function (col, row) {
    // rows creation
    for (var i = 0; i < row; i++) {
        $("#table").append("<tr id=" + i + "></tr>");
        //cols creation
        for (var j = 0; j < col; j++) {
            $("#" + i).append("<td id=" + i + j + "></td>");

        }
    }

};
//ajoute les fourmis dans le tableau html et le tableau virtuel
var addFourmis = function (nb, couleur, row, col) {
    var x, y;// x pour abscisse, y pour ordonée
    var i = 0;
    while (i < nb) {
        x = getRandomInt(0, row);

        y = getRandomInt(0, col);
        if (tab[x][y] === 0) {

            tab[x][y] = couleur;
            $("#" + x + y).text(couleur);
            i++;

        }

    }
}
//deplace une fourmi
var deplacementFourmi = function (x, y, tabDep) {
    var xfinal = x + tabDep[0];
    var yfinal = y + tabDep[1];
    if (tab[xfinal][yfinal] === 0) {
        $("#" + xfinal + yfinal).text($("#" + x + y).text());
        $("#" + x + y).text("");
        tab[xfinal][yfinal] = tab[x][y];
        tab[x][y] = 0;
    }
    else {
        if (tab[xfinal][yfinal] === tab[x][y]) {
            return (0);
            //meme couleur   
        }
        else {
            if (getRandomInt(0, 2) == 1) {
                $("#" + xfinal + yfinal).text($("#" + x + y).text());
                $("#" + x + y).text("");
                tab[xfinal][yfinal] = tab[x][y];
                tab[x][y] = 0;
            }
            else {
                tab[x][y] = 0;
                $("#" + x + y).text("");
                return (0);
            }
        }

    }
    return ([xfinal, yfinal]);
}

createTable(col, row);

addFourmis(nbFourmis, 'R', row, col);
addFourmis(nbFourmis, 'N', row, col);
// tab[3][4]="R";
// tab[3][5]="N";
// $("#34").text("R");
// $("#35").text("N");
console.log(tab);
//console.log(checkDeplacement(2, 1, row, col));
//deplacementFourmi(3,4,[0,1]);
//console.log(tab);
//console.log(tab);

//main program
window.setInterval(function () {
    var tabFour = [];
    var tabArrive = [];
    for (var i = 0; i < row; i++) {
        for (var j = 0; j < col; j++) {
            if (tab[i][j] !== 0) {
                tabFour.push([i, j]);
            }
        }
    }

    
    for (var i = 0; i < tabFour.length; i++) {
        var x = tabFour[i][0];
        var y = tabFour[i][1];
        var tabDep = checkDeplacement(x, y, row, col);
        if (!tabArrive.includes([x,y])) {
            var result = deplacementFourmi(x, y, tabDep[getRandomInt(0, tabDep.length)]);           
            if(result !==0){
                tabArrive.push(result);        
            }
        }
    }
    console.log(tab);
}, 5000);
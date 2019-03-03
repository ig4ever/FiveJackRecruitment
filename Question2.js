var nRow = 8;
var nCol = 8;

var cacheRow = [];
var cacheColumn = [];
var room = [];
var row = [];
var counterGunMan = 0;
var counterStepRight = 0;
var counterStepLeft = 0;
var counterStepTop = 0;
var counterStepDown = 0;
var totalPath = 4;

row[0] = " □ ■ □ ■ □ ■ □ ■ ";
row[1] = " □ □ □ □ □ ■ □ □ ";
row[2] = " ■ □ ■ □ □ ■ □ ■ ";
row[3] = " □ □ □ □ □ □ □ □ ";
row[4] = " □ □ □ ■ □ □ □ □ ";
row[5] = " □ □ □ □ □ ■ □ ■ ";
row[6] = " □ ■ □ □ □ □ □ □ ";
row[7] = " □ □ □ □ ■ □ ■ □ ";

for(var i = 0; i < nRow; i++){
    room[i] = [];
    for(var j = 0; j < nCol; j++){
        room[i][j] = row[i].toString().trim().split(" ")[j];
    }
}

// for(var x = 0; x < nRow; x++){
//     for(var y = 0; y < nCol; y++){
//         if(room[x][y] == "□"){
//             room[x][y] = "♂";
//             counterGunMan++;
//             counterStepRight = 0;
//             counterStepLeft = 0;
//             counterStepDown = 0;
//             counterStepTop = 0;

//             //Checking to right column
//             for(var j = 1; j < nCol - y; j++){
//                 if(room[x][y+j] == "■"){
//                     break;
//                 }else if(room[x][y+j] == "♂"){
//                     room[x][y] = "□";
//                     counterGunMan--;
//                     break;
//                 }
//                 counterStepRight++;
//             }

//              //Checking to left column
//              for(var j = 1; j < y + 1; j++){
//                 if(room[x][y-j] == "■"){
//                     break;
//                 }else if(room[x][y-j] == "♂"){
//                     room[x][y] = "□";
//                     counterGunMan--;
//                     break;
//                 }
//                 counterStepLeft++;
//             }
        
//             //Checking to bottom row
//             for(var i = 1; i < nRow - x ; i++){
//                 if(room[x+i][y] == "■"){
//                     break;
//                 }else if(room[x+i][y] == "♂"){
//                     room[x][y] = "□";
//                     counterGunMan--;
//                     break;
//                 }
//                 counterStepDown++;
//             }
        
//             //Checking to top row
//             for(var i = 1; i < x + 1 ; i++){
//                 if(room[x-i][y] == "■"){
//                     break;
//                 }else if(room[x-i][y] == "♂"){
//                     room[x][y] = "□";
//                     counterGunMan--;
//                     break;
//                 }
//                 counterStepTop++;
//             }

//             if(room[x][y] == "♂"){
//                 cacheRow.push(x);
//                 cacheColumn.push(y);
//             }
//         }
//     }
// }

for(var x = 0; x < nRow; x++){
    for(var y = 0; y < nCol; y++){
        if(room[x][y] == "□"){
            counterStepRight = 0;
            counterStepLeft = 0;
            counterStepDown = 0;
            counterStepTop = 0;

            //Checking to right column
            for(var j = 1; j < nCol - y; j++){
                if(room[x][y+j] == "■"){
                    break;
                }else{
                    counterStepRight++;
                }
            }

             //Checking to left column
             for(var j = 1; j < y + 1; j++){
                if(room[x][y-j] == "■"){
                    break;
                }else{
                    counterStepLeft++;
                }
            }
        
            //Checking to bottom row
            for(var i = 1; i < nRow - x ; i++){
                if(room[x+i][y] == "■"){
                    break;
                }else if(room[x+i][y] == "♂"){
                    room[x][y] = "□";
                    counterGunMan--;
                    break;
                }
                counterStepDown++;
            }
        
            //Checking to top row
            for(var i = 1; i < x + 1 ; i++){
                if(room[x-i][y] == "■"){
                    break;
                }else if(room[x-i][y] == "♂"){
                    room[x][y] = "□";
                    counterGunMan--;
                    break;
                }
                counterStepTop++;
            }

            if(room[x][y] == "♂"){
                cacheRow.push(x);
                cacheColumn.push(y);
            }
        }
        
        if(x == 3 && y == 5){
            console.log(counterStepRight);
            console.log(counterStepLeft);
            console.log(counterStepTop);
            console.log(counterStepDown);
        }
    }
}

var arr = []
while(arr.length < 8){
    var r = Math.floor(Math.random()*8);
    if(arr.indexOf(r) === -1) arr.push(r);
}

console.log(cacheRow);
console.log(cacheColumn);
console.log(room[2][0]);





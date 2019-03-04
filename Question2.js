var nRow = 8;
var nCol = 8;

var cacheRow = [];
var cacheColumn = [];

var cacheWallRow = [];
var cacheWallColumn = [];

var room = [];
var map = [];

var counterGunMan = 0;
var counterGunManMax = Number.MIN_VALUE;

var counterStepRight = 0;
var counterStepLeft = 0;
var counterStepTop = 0;
var counterStepDown = 0;

var totalCombination = 0;
var totalPOV = 0;
var totalPath = 0;
var maxPath = Number.MIN_VALUE;

var roomPOVTotal = [];
var roomPathTotal = [];

map[0] = " □ ■ □ ■ □ ■ □ ■ ";
map[1] = " □ □ □ □ □ ■ □ □ ";
map[2] = " ■ □ ■ □ □ ■ □ ■ ";
map[3] = " □ □ □ □ □ □ □ □ ";
map[4] = " □ □ □ ■ □ □ □ □ ";
map[5] = " □ □ □ □ □ ■ □ ■ ";
map[6] = " □ ■ □ □ □ □ □ □ ";
map[7] = " □ □ □ □ ■ □ ■ □ ";

//Fetching map into 2D array
for(var i = 0; i < nRow; i++){
    room[i] = [];
    roomPOVTotal[i] = [];
    roomPathTotal[i] = [];
    for(var j = 0; j < nCol; j++){
        room[i][j] = map[i].toString().trim().split(" ")[j];
        //Caching wall position
        if(room[i][j] == "■"){
            cacheWallRow.push(i);
            cacheWallColumn.push(j);
        }
    }
}

//Fetching data of empty space position including 
//total of point of view (ex : did empty space position has 4 side ways, 3 side ways, 2 side ways or 1 side ways?) 
//and total of the empty space position (ex : if empty space has 2 side ways, how many total of empty space in each side
//these 2 variable will determine when the gunmen should be placed)
for(var x = 0; x < nRow; x++){
    for(var y = 0; y < nCol; y++){
        if(room[x][y] == "□"){
            counterStepRight = 0;
            counterStepLeft = 0;
            counterStepDown = 0;
            counterStepTop = 0;
            totalPOV = 0;
            totalPath = 0;

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
                }else{
                    counterStepDown++;
                }    
            }
        
            //Checking to top row
            for(var i = 1; i < x + 1 ; i++){
                if(room[x-i][y] == "■"){
                    break;
                }else{
                    counterStepTop++;
                }
            }

            if(counterStepRight > 0){
                totalPOV++;
            }
            if(counterStepLeft > 0){
                totalPOV++;
            }
            if(counterStepDown > 0){
                totalPOV++;
            }
            if(counterStepTop > 0){
                totalPOV++;
            }

            totalPath = counterStepRight + counterStepLeft + counterStepTop + counterStepDown;
            if(maxPath < totalPath){
                maxPath = totalPath;
            }

            roomPOVTotal[x][y] = totalPOV;
            roomPathTotal[x][y] = totalPath;
        }
    }
}

//Placing a gunmen on empty space
for(var n = 0; n <= 4; n++){
    for(var m = 0; m <= maxPath; m++){
        for(var x = 0; x < nRow; x++){
            for(var y = 0; y < nCol; y++){
                if(room[x][y] == "□" && roomPOVTotal[x][y] == n && roomPathTotal[x][y] == m){
                    room[x][y] = "♂";
                    counterStepRight = 0;
                    counterStepLeft = 0;
                    counterStepDown = 0;
                    counterStepTop = 0;
        
                    //Checking to right column
                    for(var j = 1; j < nCol - y; j++){
                        if(room[x][y+j] == "■"){
                            break;
                        }else if(room[x][y+j] == "♂"){
                            room[x][y] = "□";
                            break;
                        }
                        counterStepRight++;
                    }
        
                     //Checking to left column
                     for(var j = 1; j < y + 1; j++){
                        if(room[x][y-j] == "■"){
                            break;
                        }else if(room[x][y-j] == "♂"){
                            room[x][y] = "□";
                            break;
                        }
                        counterStepLeft++;
                    }
                
                    //Checking to bottom row
                    for(var i = 1; i < nRow - x ; i++){
                        if(room[x+i][y] == "■"){
                            break;
                        }else if(room[x+i][y] == "♂"){
                            room[x][y] = "□";
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
                            break;
                        }
                        counterStepTop++;
                    }
        
                    //Caching and increment a filled empty box
                    if(room[x][y] == "♂"){
                        counterGunMan++;
                        cacheRow.push(x);
                        cacheColumn.push(y);
                    }

                    //Counting maximum number of a gunmen
                    if(counterGunManMax < counterGunMan){
                        counterGunManMax = counterGunMan;
                    }
                }
            }
        }
    }
}


// for(var x = 0; x <= nRow; x++){
//     for(var y = 0; y <= nCol; y++){
//         if(room[x][y] == "♂"){
//             counterStepRight = 0;
//             counterStepLeft = 0;
//             counterStepDown = 0;
//             counterStepTop = 0;
//             totalPOV = 0;
//             totalPath = 0;

//             //Checking to right column
//             for(var j = 1; j < nCol - y; j++){
//                 if(room[x][y+j] == "■"){
//                     break;
//                 }else if(room[x][y+j] == "□"){
//                     //Checking to top column
//                     for(var k = 1; k < x + 1; k++){
//                         if(room[x+k][y+j] == "■"){
//                             totalCombination++;
//                             room[x+k][y+j] == "";
//                             break;
//                         }else if(room[x+k][y+j] == "♂"){
//                             room[x+k][y+j]
//                         }
//                     }
//                     counterStepRight++;
//                 }
//             }

//             //Checking to left column
//             for(var j = 1; j < y + 1; j++){
//                 if(room[x][y-j] == "■"){
//                     break;
//                 }else{
//                     counterStepLeft++;
//                 }
//             }
        
//             //Checking to bottom row
//             for(var i = 1; i < nRow - x ; i++){
//                 if(room[x+i][y] == "■"){
//                     break;
//                 }else{
//                     counterStepDown++;
//                 }    
//             }
        
//             //Checking to top row
//             for(var i = 1; i < x + 1 ; i++){
//                 if(room[x-i][y] == "■"){
//                     break;
//                 }else{
//                     counterStepTop++;
//                 }
//             }

//             if(counterStepRight > 0){
//                 totalPOV++;
//             }
//             if(counterStepLeft > 0){
//                 totalPOV++;
//             }
//             if(counterStepDown > 0){
//                 totalPOV++;
//             }
//             if(counterStepTop > 0){
//                 totalPOV++;
//             }

//             totalPath = counterStepRight + counterStepLeft + counterStepTop + counterStepDown;
//             if(maxPath < totalPath){
//                 maxPath = totalPath;
//             }

//             roomPOVTotal[x][y] = totalPOV;
//             roomPathTotal[x][y] = totalPath;
//         }
//     }
// }

// var arr = []
// while(arr.length < 8){
//     var r = Math.floor(Math.random()*8);
//     if(arr.indexOf(r) === -1) arr.push(r);
// }

console.log(cacheWallRow);
console.log(cacheWallColumn);
console.log("Maximum number of Gunmen : " + counterGunManMax);
console.log(cacheRow);
console.log(cacheColumn);
// console.log(room[2][0]);
console.log(roomPOVTotal[0][0]);
console.log(roomPathTotal[1][0]);
console.log(room[7][1]);





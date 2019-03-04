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
var totalCombinationNext = 0;
var totalPOV = 0;
var totalPath = 0;
var maxPath = Number.MIN_VALUE;

var roomPOVTotal = [];
var roomPathTotal = [];

var hasCacheTemp = false;

var hasCache = false;
var hasCacheNext = false;

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

//Increment a possible ways if a gunmen can be moved horizontally or vertically
for(var x = 0; x < nRow; x++){
    for(var y = 0; y < nCol; y++){
        if(room[x][y] == "♂"){

            //Checking to right column
            for(var j = 1; j < nCol - y; j++){
                if(room[x][y+j] == "■"){
                    break;
                }else if(room[x][y+j] == "□"){
                    hasCacheTemp = false;
                    hasCacheTemp = checkingPathVertical(x, y + j);

                    if(hasCacheTemp){
                        totalCombination++;
                    }
                }
            }

            //Checking to left column
            for(var j = 1; j < y + 1; j++){
                if(room[x][y-j] == "■"){
                    break;
                }else if(room[x][y-j] == "□"){
                    hasCacheTemp = false;
                    hasCacheTemp = checkingPathVertical(x, y - j);

                    if(hasCacheTemp){
                        totalCombination++;
                    }
                }
            }
        
            //Checking to bottom row
            for(var i = 1; i < nRow - x ; i++){
                if(room[x+i][y] == "■"){
                    break;
                }else if(room[x+i][y] == "□"){
                    hasCacheTemp = false;
                    hasCacheTemp = checkingPathHorizontal(x + i, y);

                    if(hasCacheTemp){
                        totalCombination++;
                    }           
                }    
            }
        
            //Checking to top row
            for(var i = 1; i < x + 1 ; i++){
                if(room[x-i][y] == "■"){
                    break;
                }else if(room[x-i][y] == "□"){
                    hasCacheTemp = false;
                    hasCacheTemp = checkingPathHorizontal(x - i, y);

                    if(hasCacheTemp){
                        totalCombination++;
                    }
                }
            }
        }
    }
}

//////
for(var x = 0; x < nRow; x++){
    for(var y = 0; y < nCol; y++){
        if(room[x][y] == "♂"){

            //Checking to right column
            for(var j = 1; j < nCol - y; j++){
                if(room[x][y+j] == "■"){
                    break;
                }else if(room[x][y+j] == "□"){
                    hasCacheTemp = false;
                    room[x][y+j] = "♂";
                    room[x][y] = "□";
                    hasCacheTemp = checkingPathVerticalNext(x, y + j);

                    room[x][y+j] = "□";
                    room[x][y] = "♂";

                    if(hasCacheTemp){
                        totalCombinationNext++;
                    }
                }
            }

            //Checking to left column
            for(var j = 1; j < y + 1; j++){
                if(room[x][y-j] == "■"){
                    break;
                }else if(room[x][y-j] == "□"){
                    hasCacheTemp = false;
                    room[x][y-j] = "♂";
                    room[x][y] = "□";
                    hasCacheTemp = checkingPathVerticalNext(x, y - j);

                    room[x][y-j] = "□";
                    room[x][y] = "♂";

                    if(hasCacheTemp){
                        totalCombinationNext++;
                    } 
                }
            }
        
            //Checking to bottom row
            for(var i = 1; i < nRow - x ; i++){
                if(room[x+i][y] == "■"){
                    break;
                }else if(room[x+i][y] == "□"){
                    hasCacheTemp = false;
                    room[x+i][y] = "♂";
                    room[x][y] = "□";
                    hasCacheTemp = checkingPathHorizontalNext(x + i, y);

                    room[x+i][y] = "□";
                    room[x][y] = "♂";
                    
                    if(hasCacheTemp){
                        totalCombinationNext++;
                    }     
                }    
            }
        
            //Checking to top row
            for(var i = 1; i < x + 1 ; i++){
                if(room[x-i][y] == "■"){
                    break;
                }else if(room[x-i][y] == "□"){
                    hasCacheTemp = false;
                    room[x-i][y] = "♂";
                    room[x][y] = "□";
                    hasCacheTemp = checkingPathHorizontalNext(x - i, y);

                    room[x-i][y] = "□";
                    room[x][y] = "♂";

                    if(hasCacheTemp){
                        totalCombinationNext++;
                    }
                }
            }
        }
    }
}

function checkingPathHorizontal(x, y){
    hasCache = true;

    //Checking to right column
    for(var j = 1; j < nCol - y; j++){
        if(room[x][y+j] == "■"){
            break;
        }else if(room[x][y+j] == "♂"){
            hasCache = false;
        }
    }

    //Checking to left column
    for(var j = 1; j < y + 1; j++){
        if(room[x][y-j] == "■"){
            break;
        }else if(room[x][y-j] == "♂"){
            hasCache = false;
        }
    }

    return hasCache;
}

function checkingPathVertical(x, y){
    hasCache = true;

    //Checking to bottom row
    for(var i = 1; i < nRow - x ; i++){
        if(room[x+i][y] == "■"){
            break;
        }else if(room[x+i][y] == "♂"){
            hasCache = false;
        }
    }

    //Checking to top row
    for(var i = 1; i < x + 1 ; i++){
        if(room[x-i][y] == "■"){
            break;
        }else if(room[x-i][y] == "♂"){
            hasCache = false;
        }
    }

    return hasCache;
}

function checkingPathHorizontalNext(x, y){
    hasCacheNext = true;

    //Checking to right column
    for(var j = 1; j < nCol - y; j++){
        if(room[x][y+j] == "■"){
            break;
        }else if(room[x][y+j] == "♂"){
            room[x][y+j] = "□";
            room[x][y] = "♂";
            hasCacheNext = checkingPathVertical(x, y);

            room[x][y+j] = "♂";
            room[x][y] = "□";

            if(hasCacheNext){
                break;
            }
        }
    }

    //Checking to left column
    for(var j = 1; j < y + 1; j++){
        if(room[x][y-j] == "■"){
            break;
        }else if(room[x][y-j] == "♂"){
            room[x][y-j] = "□";
            room[x][y] = "♂";

            hasCacheNext = checkingPathVertical(x, y);

            room[x][y-j] = "♂";
            room[x][y] = "□";

            if(hasCacheNext){
                break;
            }
        }
    }

    return hasCacheNext;
}

function checkingPathVerticalNext(x, y){
    hasCacheNext = true;

    //Checking to bottom row
    for(var i = 1; i < nRow - x ; i++){
        if(room[x+i][y] == "■"){
            break;
        }else if(room[x+i][y] == "♂"){
            room[x+i][y] = "□";
            room[x][y] = "♂";

            hasCacheNext = checkingPathHorizontal(x,y);

            room[x+i][y] = "♂";
            room[x][y] = "□";
            if(hasCacheNext){
                break;
            }
        }
    }

    //Checking to top row
    for(var i = 1; i < x + 1 ; i++){
        if(room[x-i][y] == "■"){
            break;
        }else if(room[x-i][y] == "♂"){
            room[x-i][y] = "□";
            room[x][y] = "♂";

            hasCacheNext = checkingPathHorizontal(x,y);

            room[x-i][y] = "♂";
            room[x][y] = "□";

            if(hasCacheNext){
                break;
            }
            
        }
    }

    return hasCacheNext;
}

// console.log(cacheWallRow);
// console.log(cacheWallColumn);
// console.log("");
// console.log(cacheRow);
// console.log(cacheColumn);
// console.log(totalCombinationNext);
console.log("Maximum number of Gunmen : " + counterGunManMax);
console.log("Total possible ways to place " + counterGunManMax + " Gunman : " + totalCombination);







var maxNumber = 5000;

var number = 0;
var elementNumber = 0;
var result = [];
var selfNumberTotal = 0;

for(number = 0; number <= maxNumber; number++){
    result[number] = calculateGeneratorNumber(number);
}

result.sort(function(a, b){return a - b});

result.forEach(element => {
    if(elementNumber > 0
    && (result[elementNumber] - result[elementNumber-1]) > 1 
    && (result[elementNumber] - result[elementNumber-1]) != 0
    && (result[elementNumber] - 1) <= maxNumber){
        console.log("Self Number : " + (result[elementNumber] - 1));
        selfNumberTotal += (result[elementNumber] - 1);
    }
    elementNumber++;
});

// Fetch generator number & Sum all generator number equal d(n)
function calculateGeneratorNumber(number){
    var lengthNumber =  number.toString().length;
    var generator = [];
    var result = 0;

    if(lengthNumber > 0){
        if(lengthNumber == 1){
            generator[0] = number;
            generator[1] = parseInt(number.toString().split("")[0]);
            result += generator[0] + generator[1];   
        }else if(lengthNumber == 2){
            generator[0] = number;
            generator[1] = parseInt(number.toString().split("")[0]);
            generator[2] = parseInt(number.toString().split("")[1]);
            result += generator[0] + generator[1]+ generator[2]; 
        }else if(lengthNumber == 3){
            generator[0] = number;
            generator[1] = parseInt(number.toString().split("")[0]);
            generator[2] = parseInt(number.toString().split("")[1]);
            generator[3] = parseInt(number.toString().split("")[2]);
            result += generator[0] + generator[1] + generator[2] + generator[3]; 
        }else if(lengthNumber == 4){
            generator[0] = number;
            generator[1] = parseInt(number.toString().split("")[0]);
            generator[2] = parseInt(number.toString().split("")[1]);
            generator[3] = parseInt(number.toString().split("")[2]);
            generator[4] = parseInt(number.toString().split("")[3]);
            result += generator[0] + generator[1] + generator[2] + generator[3]+ generator[4]; 
        }
    }

    return result;
}

console.log("Sum of Self Number : " + selfNumberTotal);



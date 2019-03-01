var number = 0;
var result = [];
var selfNumberTotal = 0;

for(number = 0; number <= 5000; number++){
    result[number] = calculateGeneratorNumber(number);
}

result.sort(function(a, b){return a - b});

for(number = 0; number <= 5000; number++){
    if(number > 0
    && (result[number] - result[number-1]) > 1 
    && (result[number] - result[number-1]) != 0
    && (result[number] - 1) <= 5000){
        console.log("Self Number : " + (result[number] - 1));
        selfNumberTotal += (result[number] - 1);
    }
}

// Fetch generator number & Sum all generator number equal d(n)
function calculateGeneratorNumber(number){
    var lengthNumber =  number.toString().length;
    var generator = [];
    var result = 0;

    for(var i = 0; i < lengthNumber; i++){
        if(i == 0){
            generator[i] = number;
            generator[i + 1] = parseInt(number.toString().split("")[i]);
            result += generator[i] + generator[i + 1];
        }
        else{
            generator[i + 1] = parseInt(number.toString().split("")[i]);
            result += generator[i + 1];
        }
    }

    return result;
}

console.log("Sum of Self Number : " + selfNumberTotal);



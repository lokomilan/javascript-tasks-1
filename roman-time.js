var helpMessage = 'Run roman-time.js [0 <= hours < 24] [0 <= minutes < 60]';
var messages = [helpMessage, 'Wrong time! ', 'Invalid arguments! '];
var bases = [1, 5, 10, 50];
var digits = ['I', 'V', 'X', 'L'];

function checkNumber(supposedNumber, maxValue) {
    return /^\d+$/.test(Number(supposedNumber)) && supposedNumber < maxValue;
}

function getErrorCode(hours, minutes) {
    if (hours === '-h') {
        return 0;
    } else {
        return isNaN(hours) || isNaN(minutes) ? 2 : 1;
    }
}

function makeRoman(number) {
    var currentNumber = Number(number);
    var romanString = '';
    for (var i = bases.length - 1; i >= 0; i--) {
        var preBase = Number(bases[i - 2 + i % 2]);
        var preDigit = digits[i - 2 + i % 2];
        romanString += digits[i].repeat(Math.floor(currentNumber / bases[i]));
        currentNumber %= bases[i];
        if (currentNumber > 0 && bases[i] - currentNumber <= preBase) {
            romanString = romanString + preDigit + digits[i];
            currentNumber = currentNumber + preBase - bases[i];
        }
    }
    if (romanString === '') {
        return 'N';
    }
    return romanString;
}

var hours = process.argv[2];
var minutes = process.argv[3];

if (checkNumber(hours, 24) && checkNumber(minutes, 60)) {
    console.log(makeRoman(hours) + ':' + makeRoman(minutes));
} else {
    console.log(messages[getErrorCode(hours, minutes)]);
}

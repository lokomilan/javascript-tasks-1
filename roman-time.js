function satisfies(number, max) {
    return parseInt(number) == number && number >= 0 && number < max;
}

var messages = ['OK', 'Wrong time! ', 'Invalid arguments! '];

function failAndExit(errorCode) {
    console.log(messages[errorCode] + 'Try roman-time.js -h to get the hint');
    process.exit(errorCode);
}

function printHelp() {
    console.log('Run roman-time.js -h to get this hint');
    console.log('Run roman-time.js [hours] [minutes] to get roman time');
    console.log('Hours and minutes should not be negative');
    console.log('Hours should not exceed 23, minutes should not exceed 59');
}

function makeRoman(number) {
    var currentNumber = Number(number);
    var romanString = '';
    var bases = [1, 5, 10, 50];
    var romanDigits = ['I', 'V', 'X', 'L'];
    for (var i = bases.length - 1; i >= 0; i--) {
        var base = Number(bases[i]);
        var digit = romanDigits[i];
        var preBase = Number(bases[i - 2 + i % 2]);
        var preDigit = romanDigits[i - 2 + i % 2];
        var times = Math.floor(currentNumber / base);
        for (var j = 0; j < times; j++) {
            romanString += digit;
            currentNumber -= base;
        }
        if (currentNumber > 0 && base - currentNumber <= preBase) {
            romanString = romanString + preDigit + digit;
            currentNumber = currentNumber + preBase - base;
        }
    }
    if (romanString === '') {
        return 'N';
    }
    return romanString;
}

var hours = process.argv[2];
var minutes = process.argv[3];

if (!(isNaN(hours) || isNaN(minutes))) {
    if (satisfies(hours, 24) && satisfies(minutes, 60)) {
        console.log(makeRoman(hours) + ':' + makeRoman(minutes));
    } else {
        failAndExit(1);
    }
} else {
    if (hours == '-h') {
        printHelp();
    } else {
        failAndExit(2);
    }
}

#!/usr/bin/env node

function Solve (rows) {
    var REVEAL_CHAR = '*',
        result = rows.slice(0),
        rowsCount = rows.length,
        i = 0;

    String.prototype.replaceAt = function(index, character) {
        return this.substr(0, index) +
            character +
            this.substr(index + character.length);
    };

    for (; i < rowsCount; i++) {
        var currentRow = rows[i],
            rowLength = currentRow.length,
            j = 0,
            nextRow, currentChar;

        for (; j <= rowLength; j++) {
            currentChar = currentRow[j];

            nextRow = rows[i + 1];

            if (nextRow && nextRow[j - 1] &&
                nextRow[j] && nextRow[j + 1] &&
                nextRow[j - 1] === currentChar &&
                nextRow[j] === currentChar &&
                nextRow[j + 1] === currentChar) {
                result[i + 1] = result[i + 1].replaceAt(j - 1, REVEAL_CHAR);
                result[i + 1] = result[i + 1].replaceAt(j, REVEAL_CHAR);
                result[i + 1] = result[i + 1].replaceAt(j + 1, REVEAL_CHAR);
                result[i] = result[i].replaceAt(j, REVEAL_CHAR);
            }
        }
    }

    return result.join('\n');
}

assert(Solve([
    'abcdexgh',
    'bbbdxxxh',
    'abcxxxxx'
]),
    'a*cde*gh' + '\n' +
    '***d***h' + '\n' +
    'abc*****'
);

function assert (actual, expected) {
    actual = actual.trim();
    if (actual === expected) {
        console.log('\n\nOK!\n\n');
    } else {
        console.log('\n\nFAIL!\n\EXPECTED RESULT:');
        console.log(expected);

        console.log('\n\nFAIL!\n\nACTUAL RESULT:');
        console.log(actual);
    }
}

// var readline = require('readline'),
//     rl = readline.createInterface({
//         input: process.stdin,
//         output: process.stdout,
//         terminal: true
//     });

// rl.once("line", function( n ) {
//     console.log( Solve( [ n.toString().trim() ] ) );
//     process.exit(0);
// });

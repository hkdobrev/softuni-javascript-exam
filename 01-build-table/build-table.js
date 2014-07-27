#!/usr/bin/env node

function Solve (args) {
	var tableHeader = '<table>' +
		'\n' + '<tr><th>Num</th><th>Square</th><th>Fib</th></tr>' +
		'\n',
		rowStart = '<tr><td>',
		rowEnd = '</td></tr>\n',
		columnGap = '</td><td>',
		tableFooter = '</table>',
		start = parseInt(args[0], 10),
		end = parseInt(args[1], 10),
		table = tableHeader,
		i = start;

	function booleanToString (yesOrNo) {
		return (yesOrNo ? 'yes' : 'no');
	}

	function isFibonacci (n) {
		if (n === 0) {
			return false;
		}

		return (isPerfectSquare(5 * n * n + 4) || isPerfectSquare(5 * n * n - 4));
	}

	function isPerfectSquare (n) {
		var s = Math.sqrt(n).toFixed(0);
		return (s * s === n);
	}

	for (; i <= end; i++) {
		table += rowStart + i + columnGap + (i * i) + columnGap + booleanToString(isFibonacci(i)) + rowEnd;
	}

	table += tableFooter;

    return table;
}

var readline = require('readline'),
    rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: true
    });

rl.once("line", function( start ) {
	rl.once("line", function( end ) {
	    console.log( Solve( [ start.toString().trim(), end.toString().trim() ] ) );
	    process.exit(0);
	});
});

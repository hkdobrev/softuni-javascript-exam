#!/usr/bin/env node

function Solve (concerts) {
    var result = {};

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    concerts.sort(function(a, b) {
        var dataA = a.split('|'),
            dataB = b.split('|'),
            townA = dataA[1].trim(),
            townB = dataB[1].trim(),
            venueA = dataA[3].trim(),
            venueB = dataB[3].trim(),
            townComparison = townA.localeCompare(townB);

        if (townComparison === 0) {
            return venueA.localeCompare(venueB);
        }

        return townComparison;
    });

    concerts.forEach(function(concert) {
        var data = concert.split('|'),
            band = data[0].trim(),
            town = data[1].trim(),
            venue = data[3].trim();


        result[town] = result[town] ? result[town] : {};
        result[town][venue] = result[town][venue] ? result[town][venue] : [];
        result[town][venue].push(band);
        result[town][venue] = result[town][venue].filter(onlyUnique);
        result[town][venue].sort();
    });

    return JSON.stringify(result);
}

assert(Solve([
    'ZZ Top | London | 2-Aug-2014 | Wembley Stadium',
    'Iron Maiden | London | 28-Jul-2014 | Wembley Stadium',
    'Metallica | Sofia | 11-Aug-2014 | Lokomotiv Stadium',
    'Helloween | Sofia | 1-Nov-2014 | Vassil Levski Stadium',
    'Iron Maiden | Sofia | 20-June-2015 | Vassil Levski Stadium',
    'Helloween | Sofia | 30-July-2015 | Vassil Levski Stadium',
    'Iron Maiden | Sofia | 26-Sep-2014 | Lokomotiv Stadium',
    'Helloween | London | 28-Jul-2014 | Wembley Stadium',
    'Twisted Sister | London | 30-Sep-2014 | Wembley Stadium',
    'Metallica | London | 03-Oct-2014 | Olympic Stadium',
    'Iron Maiden | Sofia | 11-Apr-2016 | Lokomotiv Stadium',
    'Iron Maiden | Buenos Aires | 03-Mar-2014 | River Plate Stadium'
]),
    '{"Buenos Aires":{"River Plate Stadium":["Iron Maiden"]},"London":{"Olympic Stadium":["Metallica"],"Wembley Stadium":["Helloween","Iron Maiden","Twisted Sister","ZZ Top"]},"Sofia":{"Lokomotiv Stadium":["Iron Maiden","Metallica"],"Vassil Levski Stadium":["Helloween","Iron Maiden"]}}'
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

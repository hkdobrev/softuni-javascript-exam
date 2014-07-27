#!/usr/bin/env node

function Solve (args) {
    var html = args.join(''),
        regex = /<a\s[^>]*?href\s*=\s*(['"])(.*?)\1/mgi,
        matches,
        links = [];

    while (matches = regex.exec(html)) {
        links.push(matches[2]);
    }

    return links.join('\n');
}


assert(Solve([
    '<a href="http://softuni.bg" class="new"></a>'
]),
    'http://softuni.bg'
);

assert(Solve([
    '<p>This text has no links</p>'
]),
    ''
);

assert(Solve([
    '<!DOCTYPE html>',
    '<html>',
    '<head>',
    '  <title>Hyperlinks</title>',
    '  <link href="theme.css" rel="stylesheet" />',
    '</head>',
    '<body>',
    '<ul><li><a   href="/"  id="home">Home</a></li><li><a',
    ' class="selected" href="/courses">Courses</a>',
    '</li><li><a href = ',
    "'/forum' >Forum</a></li><li><a class=" + '"href"',
    'onclick="go()" href= "#">Forum</a></li>',
    '<li><a id="js" href = ',
    '"javascript:alert(' + "'hi')" + '" class="new">click</a></li>',
    "<li><a id='nakov' href =",
    "'http://www.nakov.com' class='new'>nak</a></li></ul>",
    '<a href="#"></a>',
    '<a id="href">href=' + "'fake'<img src='http://abv.bg/i.gif'",
    "alt='abv'/></a><a href=" + '"#">&lt;a href=' + "'hello'&gt;</a>",
    '<!-- This code is commented:',
    '  <a href="#commented">commentex hyperlink</a> -->',
    '</body>'
]), [
    '/',
    '/courses',
    '/forum',
    '#',
    'javascript:alert(\'hi\')',
    'http://www.nakov.com',
    '#',
    '#',
    '#commented'
].join('\n'));

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

var test = require('tape');
var nlp = require('./lib/nlp');



test('specific_noun :', function(t) {
  [
    ['five hundred feet', 'Value'],
    ['50 square feet', 'Value'],
    ['90 hertz', 'Value'],
    ['two books', 'Value'],
    ['two hundred', 'Value'],
    ['4 hundred and ten', 'Value'],
    ['4 and a half million', 'Value'],
    ['499 thousand', 'Value'],
    ['499', 'Value'],
    ['4,899', 'Value'],

    ['John Smith', 'Person'],
    ['dr. John Smith', 'Person'],
    ['John Smith jr.', 'Person'],
    ['John Jacob Smith', 'Person'],
    ['Jani K. Smith', 'Person'],

    ['asdfefs', 'Noun'],
    ['octopus', 'Noun'],
    ['tree', 'Noun'],
    // ['i', 'Noun'],

    ['FBI', 'Organization'],
    ['F.B.I.', 'Organization'],
    ['Fun ltd.', 'Organization'],
    ['Fun co', 'Organization'],
    ['Smith & Rogers', 'Organization'],
    ['Google', 'Organization'],

    ['tuesday', 'Date'],
    ['february', 'Date'],
    ['february fifth', 'Date'],
    ['tuesday march 5th', 'Date'],
    ['tuesday march 5th, 2015', 'Date'],
  ].forEach(function(a) {
    var n = nlp.noun(a[0]);
    var msg = '';

    msg = '"' + a[0] + '" is_person: ' + a[1];
    t.equal(n.is_person(), (a[1] === 'Person'), msg);

    msg = '"' + a[0] + '" is_place: ' + a[1];
    t.equal(n.is_place(), (a[1] === 'Place'), msg);

    msg = '"' + a[0] + '" is_value: ' + a[1];
    t.equal(n.is_value(), (a[1] === 'Value'), msg);

    msg = '"' + a[0] + '" is_date: ' + a[1];
    t.equal(n.is_date(), (a[1] === 'Date'), msg);

    msg = '"' + a[0] + '" is_organization: ' + a[1];
    t.equal(n.is_organization(), (a[1] === 'Organization'), msg);

  });
  t.end();
});

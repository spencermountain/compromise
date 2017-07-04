var test = require('tape');
var nlp = require('../lib/nlp');

test('specific_noun :', function(t) {
  [
    // ['five hundred feet', 'Value'],
    // ['50 square feet', 'Value'],
    // ['90 hertz', 'Value'],
    // ['two books', 'Value'],
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
    ['tuesday march 5th, 2015', 'Date']
  ].forEach(function(a) {
    var r = nlp(a[0]);

    if (a[1] === 'Person') {
      t.equal(r.people().out(), a[0], a[0] + ' - is_person');
    } else {
      t.equal(r.people().out(), '', a[0] + ' - not-a-person');
    }

    if (a[1] === 'Place') {
      t.equal(r.places().out(), a[0], a[0] + ' - is_place');
    } else {
      t.equal(r.places().out(), '', a[0] + ' - not-a-place');
    }

    if (a[1] === 'Value') {
      t.equal(r.values().noDates().out(), a[0], a[0] + ' - is_value');
    } else {
      t.equal(r.values().noDates().out(), '', a[0] + ' - not-a-value');
    }

    if (a[1] === 'Date') {
      t.equal(r.dates().out(), a[0], a[0] + ' - is_date');
    } else {
      t.equal(r.dates().out(), '', a[0] + ' - not-a-date');
    }

    if (a[1] === 'Organization') {
      t.equal(r.organizations().out(), a[0], a[0] + ' - is_organization');
    } else {
      t.equal(r.organizations().out(), '', a[0] + ' - not-a-org');
    }
  });
  t.end();
});

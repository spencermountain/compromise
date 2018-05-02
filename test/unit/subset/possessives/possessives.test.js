var test = require('tape');
var nlp = require('../../lib/nlp');

test('possessives tagger', function(t) {
  var arr = [
    `Spencer's`,
    `Spencer Kelly's`,
    `Spencer C. Kelly's`,
    `Union Corp's`,
    `Los Angeles's`,
  ];
  arr.forEach((a) => {
    var doc = nlp(a);
    var m = doc.possessives();
    t.equal(m.length, 1, 'one possessive -' + a);
    t.equal(m.out(), a, 'possessive match -' + a);
  });
  t.end();
});

test('possessives strip', function(t) {
  var arr = [
    [`Spencer's`, 'Spencer'],
    [`Corey Hart's`, 'Corey Hart'],
    [`Corey M. Hart's`, 'Corey M. Hart'],
    [`Spencer C. Kelly's`, 'Spencer C. Kelly'],
    [`Agility Inc's`, 'Agility Inc'],
    [`University of Wisconsin's`, 'University of Wisconsin'],
    [`Los Angeles's`, 'Los Angeles'],
  ];
  arr.forEach((a) => {
    var doc = nlp(a[0]);
    doc.possessives().strip();
    t.equal(doc.out('text'), a[1], a[0]);
  });
  t.end();
});

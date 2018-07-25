var test = require('tape');
var nlp = require('../../lib/nlp');
var str_test = require('../../lib/fns').str_test;

test('known-regions:', function(t) {
  [
    ['i want to go to Ohio to see George Harrison', 'ohio'],
    ['we are visiting Gloucestershire, before we leave', 'gloucestershire'],
    ['manitoba is nice this time of year', 'manitoba']
  ].forEach(function(a) {
    var str = nlp(a[0]).match('#Region').out('normal');
    str_test(str, a[0], a[1], t);
  });
  t.end();
});

test('unknown-places:', function(t) {
  [
    ['live in the Rekcjd Province', 'rekcjd province'],
    ['live in the Lekfjs District', 'lekfjs district'],
    ['visiting Tojbs Kjeh Region', 'tojbs kjeh region'],
    ['visiting the State of Lkjfhe', 'state of lkjfhe'],
    ['see you in West Nunavut', 'west nunavut'],
    ['see you in western Hunan', 'western hunan'],
    ['see you in Northern Hunan province', 'northern hunan province']
  ].forEach(function(a) {
    var str = nlp(a[0]).places(0).out('normal');
    str_test(str, a[0], a[1], t);
  });
  t.end();
});

test('mixed continents-places:', function(t) {
  var doc = nlp('in north africa, eastern asia, guatemala, europe, north america, and japan');
  t.equal(doc.places().length, 6, '6-places');
  t.end();
});

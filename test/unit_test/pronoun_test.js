var test = require('tape');
var nlp = require('./lib/nlp');
var str_test = require('./lib/fns').str_test;

test('pronoun:', function(t) {
  [
    ['John', 'he'],
    ['John Smith', 'he'],
    ['Jane', 'she'],
    ['turtle', 'it'],
    ['turtles', 'they'],
    ['Toronto', 'it'],
    ['studying', 'it'],
    ['horses', 'they'],
    ['road bikes', 'they'],
    ['NHL goaltenders', 'they'],
    ['Tony Danza', 'he'],
    ['Tanya Danza', 'she'],
    ['Mrs. Tanya Danza', 'she'],
    ['John G. Fishermore Institute', 'it'],
    ['John Fisher & sons', 'it'],
  ].forEach(function (a) {
    var str = nlp.noun(a[0]).pronoun();
    str_test(str, a[0], a[1], t);
  });
  t.end();
});

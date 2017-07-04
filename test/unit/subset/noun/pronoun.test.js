var test = require('tape');
var nlp = require('../../lib/nlp');

test('pronoun:', function(t) {
  [
    ['John', 'he'],
    ['John Smith', 'he'],
    ['Jane', 'she'],
    // ['turtle', 'it'],
    // ['turtles', 'they'],
    // ['Toronto', 'it'],
    // ['studying', 'it'],
    // ['horses', 'they'],
    // ['road bikes', 'they'],
    // ['NHL goaltenders', 'they'],
    ['Tony Danza', 'he'],
    ['Tanya Danza', 'she'],
    ['Mrs. Tanya Danza', 'she']
    // ['John G. Fishermore Institute', 'it'],
    // ['John Fisher & sons', 'it'],
  ].forEach(function(a) {
    var str = nlp(a[0]).people().pronoun()[0];
    var msg = a[0] + ' -> ' + str;
    t.equal(str, a[1], msg);
  });
  t.end();
});

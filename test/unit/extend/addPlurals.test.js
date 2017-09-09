var test = require('tape');
var nlp = require('../lib/nlp');

test('addPlurals-test', function(t) {
  let plurals = {
    bookly: 'booklii',
    algebra: 'algebri'
  };
  nlp.addPlurals(plurals);
  let arr = nlp('the bookly did many algebri').nouns();
  t.equal(arr.length, 2, 'found both');

  t.end();
});

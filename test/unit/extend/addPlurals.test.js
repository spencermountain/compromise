var test = require('tape');
var nlp = require('../lib/nlp');

test('addPlurals-test', function(t) {
  let plurals = {
    bookly: 'booklii',
    algebra: 'algebri'
  };
  nlp.addPlurals(plurals);
  let doc = nlp('the bookly did many algebri');
  let arr = doc.nouns().data();
  t.equal(arr.length, 2, 'found both');
  t.equal(arr[0].singular, 'bookly', 'singular-form');
  t.equal(arr[0].plural, 'booklii', 'plural-form');

  t.equal(arr[1].singular, 'algebra', 'singular-form2');
  t.equal(arr[1].plural, 'algebri', 'plural-form2');

  t.end();
});

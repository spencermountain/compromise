var test = require('tape');
var nlp = require('./lib/nlp');
var str_test = require('./lib/fns').str_test;


test('match-replace :', function(t) {
  [
    ['the dog played', 'the dog', 'the cat', 'the cat played'],
    ['the dog played', 'the [Noun]', 'the cat', 'the cat played'],
    ['the dog played', 'the (dog|hamster|pet-snake)', 'the cat', 'the cat played'],
    ['the boy and the girl', 'the [Noun]', 'the house', 'the house and the house'],
    ['the boy and the girl', 'the cat', 'the house', 'the boy and the girl'],
  ].forEach(function(a) {
    var str = nlp.sentence(a[0]).replace(a[1], a[2]).text();
    str_test(str, a[0], a[3], t);
  });
  t.end();
});

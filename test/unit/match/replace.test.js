var test = require('tape');
var nlp = require('../lib/nlp');

test('replace-basic :', function(t) {

  var m = nlp('the dog played').match('dog').replace('cat').all();
  t.equal(m.out('text'), 'the cat played', 'dog-cat');

  m = nlp('the dog played').match('the dog').replace('a cat').all();
  t.equal(m.out('text'), 'a cat played', 'a-cat');

  m = nlp('the dog played').match('#Noun').replace('snake').all();
  t.equal(m.out('text'), 'the snake played', 'snake');

  m = nlp('the pit bull played').match('#Noun+').replace('snake').all();
  t.equal(m.out('text'), 'the snake played', 'pit bull');

  m = nlp('the pit bull dog played').match('#Noun+').replace('grey snake').all();
  t.equal(m.out('text'), 'the grey snake played', 'pit bull dog');

  t.end();
});

test('match-replace :', function(t) {
  [
    ['the dog played', 'the dog', 'the cat', 'the cat played'],
    ['the dog played', 'the #Noun', 'the cat', 'the cat played'],
    ['the dog played', 'the (dog|hamster|pet-snake)', 'the cat', 'the cat played'],
    ['the boy and the girl', 'the #Noun', 'the house', 'the house and the house'],
    ['the boy and the girl', 'the cat', 'the house', 'the boy and the girl'],
  ].forEach(function(a) {
    var str = nlp(a[0]).replace(a[1], a[2]).out('text');
    var msg = str + ' -- ' + a[3];
    t.equal(str, a[3], msg);
  });
  t.end();
});

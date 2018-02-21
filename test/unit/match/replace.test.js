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
    ['the boy and the girl', 'the cat', 'the house', 'the boy and the girl']
  ].forEach(function(a) {
    var str = nlp(a[0]).replace(a[1], a[2]).out('text');
    var msg = str + ' -- ' + a[3];
    t.equal(str, a[3], msg);
  });

  t.end();
});

test('replace-with-punctuation', function(t) {
  var doc = nlp('Simon, how is Pamela and Jason?');
  var str = doc.match('#Person').replace('PERSON').all().out();
  t.equal(str, 'PERSON, how is PERSON and PERSON?', 'replace-with-punctuation');
  t.end();
});

test('structured-object-replace :', function(t) {
  var r = nlp('fun times in cool town');
  var term = r.match('times');
  r.replace(term, 'day');
  t.equal(r.out(), 'fun day in cool town', 'structured-replace');

  r = nlp('fun times in cool town');
  var terms = r.match('cool town');
  r.replace(terms, 'shitsville');
  t.equal(r.out(), 'fun times in shitsville', 'structured-replace-multi');
  t.end();
});

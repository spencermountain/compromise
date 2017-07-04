var test = require('tape');
var nlp = require('../lib/nlp');

test('insert-basic :', function(t) {
  var m = nlp('the dog sat').insertBefore('and');
  t.equal(m.out('text'), 'and the dog sat', 'and-dog');

  m = nlp('the dog sat').insertAfter('patiently');
  t.equal(m.out('text'), 'the dog sat patiently', 'sat-patiently');

  m = nlp('the dog sat');
  m.match('dog').insertBefore('nice');
  t.equal(m.out('text'), 'the nice dog sat', 'nice-dog');

  m = nlp('a dog sat');
  m.match('sat').insertAfter('quickly');
  t.equal(m.out('text'), 'a dog sat quickly', 'sat-quickly');

  m = nlp('a dog sat');
  m.match('a dog sat').insertAfter('quickly');
  t.equal(m.out('text'), 'a dog sat quickly', 'multi-match-quickly');

  m = nlp('a dog sat');
  m.match('asdf').insertAfter('no no no');
  t.equal(m.out('text'), 'a dog sat', 'no no no no');

  t.end();
});

test('insert-subset-include :', function(t) {
  var m = nlp('the dog is nice');
  var sub = m.match('is');
  sub.insertAfter('really');
  t.equal(sub.out('normal'), 'is really', 'is-really');
  t.equal(m.out('normal'), 'the dog is really nice', 'dog-is-really-nice');

  m = nlp('the dog climbed the fence');
  sub = m.match('climbed');
  sub.insertBefore('really');
  t.equal(sub.out('normal'), 'really climbed', 'really-quickly');
  t.equal(m.out('normal'), 'the dog really climbed the fence', 'dog-really-climbed');

  t.end();
});

var test = require('tape');
var nlp = require('../lib/nlp');

test('custom-tags-persist', function(t) {
  let r = nlp('i am two years older now');
  let two = r.match('#Value').tag('#FunTag');
  two.replaceWith('never');
  t.equal(two.has('#FunTag'), false, 'custom tag is forgotten');

  r = nlp('i am two years older now');
  two = r.match('#Value').tag('#FunTag');
  two.replaceWith('three', true);
  t.equal(two.has('#FunTag'), true, 'custom tag is kept');

  r = nlp('i am two years older now');
  two = r.match('#Value').tag('#FunTag');
  two.toUpperCase();
  two.values().toNumber();
  t.equal(two.has('#FunTag'), true, 'custom tag stays over transformations');

  r = nlp('june 1999');
  r.values().toNumber();
  let year = r.match('#Year');
  t.equal(year.out('normal'), '1999', 'year-stays-a-year');

  t.end();
});

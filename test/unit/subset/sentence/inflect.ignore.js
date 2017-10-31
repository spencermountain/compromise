var test = require('tape');
var nlp = require('../../lib/nlp');
var str_test = require('../../lib/fns').str_test;

test('toPlural():', function(t) {
  [
    ['cranberry', 'cranberries'],
    ['a cranberry', 'the cranberries'],
    ['a red cranberry', 'the red cranberries'],
    ['mayor of chicago', 'mayors of chicago'],
    ['chicago mayor', 'chicago mayors']
  ].forEach(function(a) {
    var str = nlp(a[0]).sentences().toPlural().out('normal');
    str_test(str, a[0], a[1], t);
  });
  t.end();
});

test('toSingular:', function(t) {
  var str = 'i\'d buy those nachos';
  var m = nlp(str).sentences().toSingular();
  t.equal(m.out('normal'), 'i\'d buy that nacho', str);

  str = 'i\'d buy these nachos';
  m = nlp(str).sentences().toSingular();
  t.equal(m.out('normal'), 'i\'d buy this nacho', str);

  str = 'i\'d buy nachos';
  m = nlp(str).sentences().toSingular();
  t.equal(m.out('normal'), 'i\'d buy a nacho', str);

  str = 'i\'d buy the nachos';
  m = nlp(str).sentences().toSingular();
  t.equal(m.out('normal'), 'i\'d buy a nacho', str);

  str = 'i\'d buy the eggs';
  m = nlp(str).sentences().toSingular();
  t.equal(m.out('normal'), 'i\'d buy an egg', str);

  str = 'men go';
  m = nlp(str).sentences().toPast().nouns().toSingular();
  t.equal(m.out('normal'), 'a man went', str);
  t.end();
});

var test = require('tape')
var nlp = require('../lib/nlp')

test('custom-tags-persist', function(t) {
  var r = nlp('i am two years older now')
  var two = r.match('#Value').tag('#FunTag')
  two.replaceWith('never')
  t.equal(two.has('#FunTag'), false, 'custom tag is forgotten')

  r = nlp('i am two years older now')
  two = r.match('#Value').tag('#FunTag')
  two.replaceWith('three', true)
  t.equal(two.has('#FunTag'), true, 'custom tag is kept')

  r = nlp('i am two years older now')
  two = r.match('#Value').tag('#FunTag')
  two.toUpperCase()
  two.values().toNumber()
  t.equal(two.has('#FunTag'), true, 'custom tag stays over transformations')

  r = nlp('june 1999')
  r.values().toNumber()
  var year = r.match('#Year')
  t.equal(year.out('normal'), '1999', 'year-stays-a-year')

  //not sure if these should pass..
  // r = nlp('i am two years older now')
  // r.match('am').tag('#FunTag')
  // r = r.sentences().toFutureTense().toPresentTense().toPastTense()
  // var verb = r.match('#FunTag')
  // t.equal(verb.out('normal'), 'was', 'tag stays over sentence-change')

  // r = nlp('walked').tag('#FunTag');
  // r = r.verbs().toFutureTense().toPresentTense().toPastTense();
  // verb = r.match('#FunTag');
  // t.equal(verb.out('normal'), 'walked', 'tag stays over verb-change');

  t.end()
})

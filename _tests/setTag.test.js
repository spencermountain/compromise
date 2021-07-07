const test = require('tape')
const nlp = require('./_lib')

test('custom-tags-persist', function (t) {
  let r = nlp('i am two years older now')
  let two = r.match('#Value').tag('#FunTag')
  two.replaceWith('never')
  t.equal(two.has('#FunTag'), false, 'custom tag is forgotten')

  r = nlp('i am two years older now')
  two = r.match('#Value').tag('#FunTag')
  two.toUpperCase().trim()
  t.equal(two.text(), 'TWO', 'term transformed')
  t.equal(two.has('#Value'), true, 'original tag stays over transformations')
  t.equal(two.has('#FunTag'), true, 'custom tag stays over transformations')

  // r = nlp('i am two years older now')
  // two = r.match('#Value').tag('#FunTag')
  // two.toUpperCase()
  // two.values().toNumber()
  // t.equal(two.has('#FunTag'), true, 'custom tag stays over transformations')

  // r = nlp('june 1999')
  // r.values().toNumber()
  // const year = r.match('#Year')
  // t.equal(year.out('normal'), '1999', 'year-stays-a-year')

  //not sure if these should pass..
  // r = nlp('i am two years older now')
  // r.match('am').tag('#FunTag')
  // r = r.sentences().toFutureTense().toPresentTense().toPastTense()
  // const verb = r.match('#FunTag')
  // t.equal(verb.out('normal'), 'was', 'tag stays over sentence-change')

  // r = nlp('walked').tag('#FunTag');
  // r = r.verbs().toFutureTense().toPresentTense().toPastTense();
  // verb = r.match('#FunTag');
  // t.equal(verb.out('normal'), 'walked', 'tag stays over verb-change');

  t.end()
})

test('untag-soft', function (t) {
  let doc = nlp('$5.32')
  t.equal(doc.has('#Money'), true, 'had-money')
  doc.untag('#money')
  t.equal(doc.has('#Money'), false, 'has-no-money')
  t.end()
})

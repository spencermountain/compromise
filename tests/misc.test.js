const test = require('tape')
const nlp = require('./_lib')

test('tag-multiples:', function (t) {
  const r = nlp('twas brillig in the doofgafoof.')
  r.match('brillig').tag(['Foo', 'Barr'])
  t.ok(r.match('#Foo').found, 'tagged-foo')
  t.ok(r.match('#Barr').found, 'tagged-barr')
  t.end()
})

// -----

test('root-text vs match-text', function (t) {
  let str = `  paper, scissors, rock. I run with scissors.`
  let doc = nlp(str).match('*').all()
  t.equal(doc.text(), str, 'perfect-root-text')

  let m = doc.match('scissors')
  t.equal(m.text(), 'scissors, scissors', 'match-text')
  t.end()
})

test('barely a term', function (t) {
  let str = '.('
  let doc = nlp(str)
  t.equal(doc.out(), str, 'barely-term-no-space')
  str = '.( '
  doc = nlp(str)
  t.equal(doc.out(), str, 'barely-term-with-space')
  t.end()
})

//#744
test('replacement with a contraction', function (t) {
  let doc = nlp('a b c d')
  t.equal(doc.text(), 'a b c d', 'before replace')
  doc.replace('b', "added i'm")
  t.equal(doc.text(), "a added i'm c d", 'after replace')

  doc = nlp("The only reason he doesn't continue is because of how tired he feels.", { reason: 'Noun' })
  doc.verbs().toPastTense()
  t.equal(doc.text(), 'The only reason he did not continue was because of how tired he felt.', 'conjugate-contraction')

  t.end()
})

test('Doc.fromText', function (t) {
  let doc = nlp('original')
  let b = doc.fromText('a bee see')
  t.equal(b.text(), 'a bee see', 'fromText')
  t.end()
})

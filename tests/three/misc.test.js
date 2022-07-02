import test from 'tape'
import nlp from './_lib.js'
const here = '[three/misc] '

test('full-sentence-issue', function (t) {
  let doc = nlp(`Images of death have lost shock value`)
  doc.ptrs = [[0], [0]]
  t.equal(doc.questions().found, false, here + 'no questions')
  t.equal(doc.length, 2, here + '2 matches')
  t.equal(doc.sentences().length, 2, here + '2 sentences')
  doc.unique()
  t.equal(doc.sentences().length, 2, here + 'still 2')
  doc = doc.unique()
  t.equal(doc.sentences().length, 1, here + '1 unique sentence')
  t.end()
})

test('test overloading', function (t) {
  let doc = nlp(`the 7 days since december were gross`)

  let m = doc.verbs()
  t.ok(m.json(), 'overload-verb')
  t.equal(m.eq(0).viewType, 'Verbs', 'still-is-verb')

  m = doc.nouns()
  t.ok(m.json(), 'overload-nouns')
  t.equal(m.eq(0).viewType, 'Nouns', 'still-is-nouns')

  m = doc.numbers()
  t.ok(m.json(), 'overload-numbers')
  t.equal(m.eq(0).viewType, 'Numbers', 'still-is-numbers')

  m = doc.sentences()
  t.ok(m.json(), 'overload-sentences')
  t.equal(m.eq(0).viewType, 'Sentences', 'still-is-sentences')

  m = doc.people()
  t.ok(m.json(), 'overload-people')
  t.equal(m.eq(0).viewType, 'People', 'still-is-people')

  m = doc.places()
  t.ok(m.json(), 'overload-places')
  t.equal(m.eq(0).viewType, 'View', 'places has no class')

  t.end()
})

test('drop back to View', function (t) {
  let doc = nlp(`John Smith and Jack were walking`)
  let vb = doc.verbs()
  // ====== drop class ----
  let m = vb.match('.')
  t.equal(m.viewType, 'View', here + 'match-to-view')

  m = vb.before('.$')
  t.equal(m.viewType, 'View', here + 'before-to-view')

  m = vb.map(v => v)
  t.equal(m.viewType, 'View', here + 'map-to-view')

  m = vb.insertAfter('drugs')
  t.equal(m.viewType, 'View', here + 'insert-to-view')

  m = vb.remove('jack')
  t.equal(m.viewType, 'View', here + 'remove-to-view')

  m = vb.replaceWith('jack', 'blue')
  t.equal(m.viewType, 'View', here + 'replace-to-view')

  m = vb.intersection(doc.match('.'))
  t.equal(m.viewType, 'View', here + 'intersection-to-view')

  m = vb.adverbs()
  t.equal(m.viewType, 'View', here + 'adverbs-to-view')

  t.end()
})

test('retain class', function (t) {
  let doc = nlp(`John Smith and Jack were walking`)
  let vb = doc.verbs()
  // ====== keep class ---
  let m = vb.update([])
  t.equal(m.viewType, 'Verbs', here + 'update-keeps-class')

  m = vb.find(v => v.toUpperCase())
  t.equal(m.viewType, 'Verbs', here + 'find-kees-class')

  m = vb.tag('Foo')
  t.equal(m.viewType, 'Verbs', here + 'tag-keeps-class')

  m = vb.ifNo('.')
  t.equal(m.viewType, 'Verbs', here + 'if-keeps-class')

  m = vb.toUpperCase()
  t.equal(m.viewType, 'Verbs', here + 'case-keeps-class')

  m = vb.clone()
  t.equal(m.viewType, 'Verbs', here + 'clone-keeps-class')

  m = vb.sort('alpha')
  t.equal(m.viewType, 'Verbs', here + 'sort-keeps-class')

  m = vb.unique()
  t.equal(m.viewType, 'Verbs', here + 'unique-keeps-class')
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

test('json extended options:', function (t) {
  let doc = nlp(`Hey everybody, I'm lookin' for Amanda Hugginkiss`)
  let json = doc.people().json({ offset: true })
  t.ok(json[0].offset, here + 'exteded json methods')
  t.end()
})


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


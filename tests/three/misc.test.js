import test from 'tape'
import nlp from './_lib.js'
const _ = '[three/misc] '

test('full-sentence-issue', function (t) {
  let doc = nlp(`Images of death have lost shock value`)
  doc.ptrs = [[0], [0]]
  t.equal(doc.questions().found, false, _ + 'no questions')
  t.equal(doc.length, 2, _ + '2 matches')
  t.equal(doc.sentences().length, 2, _ + '2 sentences')
  doc.unique()
  t.equal(doc.sentences().length, 2, _ + 'still 2')
  doc = doc.unique()
  t.equal(doc.sentences().length, 1, _ + '1 unique sentence')
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
  t.equal(m.viewType, 'View', _ + 'match-to-view')

  m = vb.before('.$')
  t.equal(m.viewType, 'View', _ + 'before-to-view')

  m = vb.map(v => v)
  t.equal(m.viewType, 'View', _ + 'map-to-view')

  m = vb.insertAfter('drugs')
  t.equal(m.viewType, 'View', _ + 'insert-to-view')

  m = vb.remove('jack')
  t.equal(m.viewType, 'View', _ + 'insert-to-view')

  m = vb.replaceWith('jack', 'blue')
  t.equal(m.viewType, 'View', _ + 'replace-to-view')

  m = vb.intersection(doc.match('.'))
  t.equal(m.viewType, 'View', _ + 'intersection-to-view')

  m = vb.adverbs()
  t.equal(m.viewType, 'Adverbs', _ + 'adverbs-to-view')

  t.end()
})

test('retain class', function (t) {
  let doc = nlp(`John Smith and Jack were walking`)
  let vb = doc.verbs()
  // ====== keep class ---
  let m = vb.update([])
  t.equal(m.viewType, 'Verbs', _ + 'update-keeps-class')

  m = vb.find(v => v.toUpperCase())
  t.equal(m.viewType, 'Verbs', _ + 'find-kees-class')

  m = vb.tag('Foo')
  t.equal(m.viewType, 'Verbs', _ + 'tag-keeps-class')

  m = vb.ifNo('.')
  t.equal(m.viewType, 'Verbs', _ + 'if-keeps-class')

  m = vb.toUpperCase()
  t.equal(m.viewType, 'Verbs', _ + 'case-keeps-class')

  m = vb.clone()
  t.equal(m.viewType, 'Verbs', _ + 'clone-keeps-class')

  m = vb.sort('alpha')
  t.equal(m.viewType, 'Verbs', _ + 'sort-keeps-class')

  m = vb.unique()
  t.equal(m.viewType, 'Verbs', _ + 'unique-keeps-class')
  t.end()
})

import test from 'tape'
import nlp from '../_lib.js'

// Already fails before rule cleanup: the gerund-like list item hides the noun list.
test('noun list with clothing preserves watches as a noun', t => {
  const target = nlp('We sell food, clothing and watches.').match('watches')
  t.equal(target.has('#Noun'), true)
  t.equal(target.has('#Verb'), false)
  t.end()
})

// These intended readings already fail before the migration.
test('rule cleanup: pre-existing phrase failures', t => {
  const cases = [
    ['we have since finished', 'since', 'Adverb'],
    ['we have not finished yet', 'yet', 'Adverb'],
    ['we under-estimate costs', 'under', 'Prefix'],
    ['they out-run us', 'out', 'Prefix'],
    ['all dogs bark', 'all', 'Determiner'],
    ['a holy book', 'holy', 'Adjective'],
    ['an even number', 'even', 'Adjective'],
  ]
  cases.forEach(([text, word, tag]) => {
    t.ok(nlp(text).match(word).has('#' + tag), `${text}: ${word} is ${tag}`)
  })
  t.end()
})

// These adjective readings already fail before the lexical past-tense entry.
test('rule cleanup: woke adjective contrasts', t => {
  ;['a woke activist', 'the woke movement', 'a woke audience'].forEach(text => {
    t.ok(nlp(text).match('woke').has('#Adjective'), text)
  })
  t.end()
})

// This predicate already fails before the hyphen migration.
test('rule cleanup: predicate vacuum-sealed', t => {
  t.ok(nlp('the package is vacuum-sealed').has('#Adjective #Adjective$'))
  t.end()
})

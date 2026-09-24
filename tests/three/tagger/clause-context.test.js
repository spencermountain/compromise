import test from 'tape'
import nlp from '../_lib.js'

test('inverted questions retain auxiliaries rather than conditions', t => {
  for (const str of ['had she left already?', 'had you eaten before you arrived?', 'had she already left?']) {
    const had = nlp(str).match('had')
    t.equal(had.has('#Auxiliary'), true, str)
    t.equal(had.has('#Condition'), false, str + ' not condition')
  }
  for (const str of ['had he survived, we would know', 'had he survived, would we know?', 'we would know, had he survived']) {
    t.equal(nlp(str).match('had').has('#Condition'), true, str)
  }
  const copula = nlp('they were friends to remember').match('were')
  t.equal(copula.has('#Copula'), true, 'ordinary were')
  t.equal(copula.has('#Condition'), false, 'ordinary were not condition')
  t.equal(nlp('were you to leave, I would follow').match('were').has('#Condition'), true, 'inverted were condition')
  t.end()
})

test('prepositions before noun phrases and after intensifiers', t => {
  for (const str of ['she walked to Paris', 'she talked to John', 'he came to lunch']) {
    const to = nlp(str).match('to')
    t.equal(to.has('#Preposition'), true, str)
    t.equal(to.has('#Conjunction'), false, str + ' not conjunction')
  }
  for (const [str, word] of [
    ['the plane flew well above the clouds', 'above'],
    ['the cat hid just under the bed', 'under'],
    ['she stood directly below the window', 'below'],
  ]) {
    const prep = nlp(str).match(word)
    t.equal(prep.has('#Preposition'), true, str)
    t.equal(prep.has('#Adjective'), false, str + ' not adjective')
  }
  for (const str of ['she wants to swim', 'she is home to rest']) {
    t.equal(nlp(str).match('to').has('#Preposition'), false, str + ' infinitive preserved')
  }
  t.equal(nlp('the above example').match('above').has('#Adjective'), true, 'attributive above preserved')
  t.end()
})

test('imperative be retains adjective complements', t => {
  for (const str of ['do not be late', 'please do not be late', 'can you please not be late?', 'be early', 'we are late']) {
    const adj = nlp(str).match('(late|early)')
    t.equal(adj.has('#Adjective'), true, str)
    t.equal(adj.has('#Adverb'), false, str + ' not adverb')
  }
  t.equal(nlp('she arrived late').match('late').has('#Adverb'), true, 'arrived late adverb')
  t.equal(nlp('they worked early').match('early').has('#Adverb'), true, 'worked early adverb')
  t.end()
})

test('singular subjects with common intransitive predicates', t => {
  for (const str of ['the dog runs', 'a dog runs', 'that dog runs', 'my dog runs', 'the river runs', 'the dog runs quickly', 'a dog sleeps', 'my dog walks']) {
    const verb = nlp(str).match('(runs|sleeps|walks)')
    t.equal(verb.has('#PresentTense'), true, str + ' has #PresentTense')
    t.equal(verb.has('#Noun'), false, str + ' not noun')
  }
  for (const [str, word] of [['the dog treats', 'treats'], ['the garden plants', 'plants'], ['the credit cards', 'cards']]) {
    t.equal(nlp(str).match(word).has('#Noun'), true, str + ' keeps compound noun')
  }
  const doc = nlp('the dog runs')
  doc.sentences().toPastTense()
  t.equal(doc.text(), 'the dog ran', 'predicate can be conjugated')
  t.end()
})

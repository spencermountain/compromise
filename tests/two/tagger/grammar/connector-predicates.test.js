import test from 'tape'
import nlp from '../../_lib.js'

test('connector predicates and their competing word senses', t => {
  for (const [str, word, want, reject] of [
    ['We waited until the sun rose.', 'rose', 'PastTense', 'Noun'],
    ['As rain fell, the river rose.', 'rose', 'PastTense', 'Noun'],
    ['The tide rose quickly.', 'rose', 'PastTense', 'Noun'],
    ['She picked a red rose.', 'rose', 'Noun', 'Verb'],
    ['The rose was red.', 'rose', 'Noun', 'Verb'],
    ['Before the dog and the cat woke, she left.', 'woke', 'PastTense', 'Noun'],
    ['The cat woke.', 'woke', 'PastTense', 'Noun'],
    ['When the rain stops, we will leave.', 'stops', 'PresentTense', 'Noun'],
    ['We will leave when the rain stops.', 'stops', 'PresentTense', 'Noun'],
    ['Whenever the bell rings, the dog barks.', 'rings', 'PresentTense', 'Noun'],
    ['The tower is older than the bridge looks.', 'looks', 'PresentTense', 'Noun'],
    ['We waited near the bus stops.', 'stops', 'Plural', 'Verb'],
    ['She inspected the gold rings.', 'rings', 'Plural', 'Verb'],
    ['We left after the wedding photos.', 'photos', 'Plural', 'Verb'],
    ['He left, for the station was closing.', 'closing', 'Gerund', 'Adjective'],
    ['The shop is closing soon.', 'closing', 'Gerund', 'Adjective'],
    ['The speech was interesting.', 'interesting', 'Adjective', 'Gerund'],
    ['She read the closing remarks.', 'closing', 'Adjective', 'Gerund'],
    ['The journey tired him.', 'tired', 'PastTense', 'Adjective'],
    ['He was tired by the journey.', 'tired', 'Passive', 'Adjective'],
    ['Which chair did she sit on?', 'on', 'Preposition', 'Particle'],
    ['What cushion can he sit on?', 'on', 'Preposition', 'Particle'],
    ['What did she turn on?', 'on', 'Particle', 'Preposition'],
    ['She looked up.', 'up', 'Particle', 'Preposition'],
  ]) {
    const term = nlp(str).match(word)
    t.equal(term.has('#' + want), true, str + ' ' + want)
    t.equal(term.has('#' + reject), false, str + ' excludes ' + reject)
  }
  t.end()
})

test('tired describes a state without leaving passive tags on the copula', t => {
  for (const str of [
    'He was tired.',
    'Although he was tired, he smiled.',
    'As our guide was tired, we stopped.',
    'He was tired, so we stopped.',
  ]) {
    const doc = nlp(str)
    t.equal(doc.match('tired').has('#Adjective'), true, str)
    t.equal(doc.has('#Passive'), false, str + ' not passive')
    t.equal(doc.match('was').has('#Copula'), true, str + ' copula')
    t.equal(doc.match('was').has('#Auxiliary'), false, str + ' not auxiliary')
  }
  t.end()
})

test('resolved predicates support connector decisions', t => {
  for (const [str, word, want] of [
    ['We waited until the sun rose.', 'until', 'Conjunction'],
    ['When the rain stops, we will leave.', 'when', 'Conjunction'],
    ['Before the dog and the cat woke, she left.', 'before', 'Conjunction'],
    ['Before the dog and the cat slept, she left.', 'before', 'Conjunction'],
    ['Before the dog and the cat, she fed the birds.', 'before', 'Preposition'],
    ['The nurses are sweet as pie and the doctor is wonderful.', 'as', 'Preposition'],
  ]) {
    const term = nlp(str).match(word)
    t.equal(term.has('#' + want), true, str)
    t.equal(term.has(want === 'Conjunction' ? '#Preposition' : '#Conjunction'), false, str + ' excludes competing tag')
  }
  t.equal(nlp('Which chair did she sit on?').match('sit').has('#PhrasalVerb'), false, 'sit loses the phrasal tag too')
  t.end()
})

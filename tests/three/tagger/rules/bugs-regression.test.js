import test from 'tape'
import nlp from '../../_lib.js'

test('resolved examples from bugs.md', t => {
  const thought = nlp('My first thought was to push it away, he said.')
  t.ok(thought.has('(thought && #Noun)'), 'thought is a noun after a possessive ordinal')
  t.notOk(thought.has('(thought && #Verb)'), 'thought is not a verb here')
  t.ok(nlp('age of it').has('(age && #Noun)'), 'age before of is a noun')

  const place = nlp('Puerto Rico only (I need historical inflation data)')
  t.equal(place.places().text(), 'Puerto Rico', 'parenthetical does not extend the place')
  t.ok(place.has('(need && #Verb)'), 'parenthetical retains its verb')

  const walk = nlp('i did really walk')
  walk.sentences().toPresentTense()
  t.equal(walk.text(), 'i do really walk', 'preserve emphatic do and adverb')

  const study = nlp('i could study')
  study.verbs().toPastParticiple()
  t.equal(study.text(), 'i could have studied', 'modal perfect')
  study.sentences().toPastTense()
  t.equal(study.text(), 'i could have studied', 'modal perfect remains unchanged')

  t.deepEqual(
    nlp('you are John, Lisa, Fred').match('#FirstName{1,2}').out('array'),
    ['John, Lisa,', 'Fred'],
    'bounded repetition returns all names'
  )
  t.end()
})

test('snowboarding noun and continuous uses', t => {
  t.ok(nlp('Snowboarding is a winter sport.').has('(snowboarding && #Noun)'), 'subject activity')
  for (const [input, phrase] of [
    ['Right now, the athlete is snowboarding.', 'is snowboarding'],
    ['He was snowboarding yesterday afternoon.', 'was snowboarding'],
    ['Tomorrow, my friends and I are going to be snowboarding.', 'are going to be snowboarding'],
  ]) {
    const doc = nlp(input)
    t.ok(doc.has('(snowboarding && #Gerund)'), 'continuous gerund: ' + input)
    t.ok(doc.verbs().has(phrase), 'complete auxiliary phrase: ' + input)
  }
  t.end()
})

test('tagging regressions from bugs.md', t => {
  t.notOk(nlp('and too many of the rich made their money').has('(rich && #Comparative)'), 'rich is not comparative')
  t.ok(nlp('with heads and arms rolling around').has('(arms && #Plural)'), 'coordinated body parts')
  t.ok(nlp('it bristles outwards, brushlike.').has('(brushlike && #Adjective)'), 'brushlike adjective')
  t.ok(nlp('polyunsaturated').has('#Adjective'), 'polyunsaturated adjective')
  t.ok(nlp('red-shouldered').has('#Adjective #Adjective'), 'standalone compound adjective')
  t.end()
})

test('bug fixes preserve nearby grammatical uses', t => {
  t.ok(nlp('he arms the guards').has('(arms && #Verb)'), 'arms remains a verb with an object')
  t.ok(nlp('Rich Smith arrived').has('Rich #LastName'), 'Rich remains part of a name')
  t.ok(nlp('Rich Smith arrived').match('Rich').has('#Person'), 'Rich is a person')
  t.ok(nlp('richer').has('#Comparative'), 'genuine comparative')
  t.ok(nlp('richest').has('#Superlative'), 'genuine superlative')
  t.notOk(nlp('rusty').has('#Comparative'), 'other name/adjective words are not comparative')
  t.ok(nlp('the watched pot').has('(watched && #Adjective)'), 'attributive watched stays adjective')
  t.ok(nlp('being kind').has('(kind && #Adjective)'), 'ordinary adjective after being')
  t.ok(nlp('she shouldered the bag').has('(shouldered && #PastTense)'), 'unhyphenated verb')
  t.ok(nlp('red-shouldered birds').has('#Adjective #Adjective #Plural'), 'attributive compound')
  t.deepEqual(
    nlp('we are going to be swimming').verbs().out('array'),
    ['are going to be swimming'],
    'auxiliary chain stays together'
  )
  t.deepEqual(
    nlp('she likes to be pampered').verbs().out('array'),
    ['likes', 'be pampered'],
    'lexical verb and infinitive stay separate'
  )
  t.end()
})

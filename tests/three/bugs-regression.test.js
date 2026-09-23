import test from 'tape'
import nlp from './_lib.js'

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

  t.deepEqual(nlp('you are John, Lisa, Fred').match('#FirstName{1,2}').out('array'),
    ['John, Lisa,', 'Fred'], 'bounded repetition returns all names')
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
    t.ok(doc.verbs().has(phrase), 'complete auxiliary phrase: ' + input,
      { todo: phrase === 'are going to be snowboarding' })
  }
  t.end()
})

test('remaining unambiguous tagging bugs from bugs.md', { todo: true }, t => {
  t.notOk(nlp('and too many of the rich made their money').has('(rich && #Comparative)'), 'rich is not comparative')
  t.ok(nlp('with heads and arms rolling around').has('(arms && #Plural)'), 'coordinated body parts')
  t.ok(nlp('it bristles outwards, brushlike.').has('(brushlike && #Adjective)'), 'brushlike adjective')
  t.ok(nlp('polyunsaturated').has('#Adjective'), 'polyunsaturated adjective')
  t.ok(nlp('red-shouldered').has('#Adjective #Adjective'), 'standalone compound adjective')
  t.end()
})

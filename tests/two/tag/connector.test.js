import test from 'tape'
import nlp from '../_lib.js'

const children = ['Preposition', 'Conjunction', 'Condition']
const blank = () => nlp('xyz').unTag('*')

test('Connector is the parent of prepositions, conjunctions, and conditions', t => {
  const tagSet = nlp.world().model.one.tagSet
  t.deepEqual([...tagSet.Connector.children].sort(), [...children].sort(), 'three child tags')
  children.forEach(tag => {
    const doc = blank().tag(tag)
    t.ok(doc.has('#Connector'), tag + ' inherits Connector')
    t.ok(doc.has('#' + tag), tag + ' remains specific')
    t.equal(doc.out('spec'), 'xyz {Connector}', tag + ' prints its root')
    doc.unTag('Connector')
    t.notOk(doc.has('#' + tag), 'removing the parent removes ' + tag)
    for (const other of ['Noun', 'Verb', 'Adjective', 'Adverb', 'Determiner', 'QuestionWord']) {
      const changed = blank().tag(tag).tag(other)
      t.notOk(changed.has('#Connector'), `${tag} → ${other} clears the parent`)
      t.notOk(changed.has('#' + tag), `${tag} → ${other} clears the child`)
      const safe = blank().tag(other).tagSafe('Connector')
      t.notOk(safe.has('#Connector'), other + ' rejects Connector safely')
    }
  })
  const parent = blank().tag('Connector')
  t.notOk(parent.has('(#Preposition|#Conjunction|#Condition)'), 'parent does not imply a child')
  t.end()
})

test('Connector matches parsed text and preserves child distinctions', t => {
  const doc = nlp('If rain falls, we wait under the roof and talk.')
  t.deepEqual(doc.match('#Connector').out('array'), ['If', 'under', 'and'], 'shared selection')
  t.ok(doc.match('under').has('#Preposition'), 'under remains a preposition')
  t.ok(doc.match('and').has('#Conjunction'), 'and remains a conjunction')
  t.ok(doc.match('if').has('#Condition'), 'if remains a condition')
  t.ok(doc.match('if').has('#Conjunction'), 'condition and conjunction can coexist')
  const changed = blank().tag('Preposition').tag('Conjunction')
  t.ok(changed.has('#Connector'), 'switching siblings retains the parent')
  t.notOk(changed.has('#Preposition'), 'preposition and conjunction remain exclusive')
  const fraction = nlp('66.5 of 69').match('of')
  t.ok(fraction.has('#Fraction'), 'fraction span still includes of')
  t.ok(fraction.has('#Preposition'), 'fraction retains preposition')
  t.ok(fraction.has('#Connector'), 'fraction retains connector')
  t.notOk(nlp.testSpec('She waited at the gate. {Noun,Vb,Prep,Det,Noun}', false).found, 'child aliases still accepted')
  t.notOk(nlp.testSpec('Tea and coffee were available. {Noun,Conj,Noun,Vb,Adj}', false).found, 'Conj alias still accepted')
  t.notOk(nlp.testSpec('She waited at the gate. {Noun,Vb,Connector,Det,Noun}', false).found, 'parent accepted in specs')
  t.end()
})

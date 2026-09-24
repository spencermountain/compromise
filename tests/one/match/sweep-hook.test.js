import test from 'tape'
import nlp from '../_lib.js'

test('explicit hooks choose a required word or tag', t => {
  const net = nlp.buildNet([
    { match: 'including [#Noun]', hook: 'including', group: 0, tag: 'Listed' },
    { match: 'near [#Place]', hook: '#Place', group: 0, tag: 'Nearby' },
  ])
  const doc = nlp('including apples. near Paris.')
  doc.match('apples').tag('Noun')
  doc.match('Paris').tag('Place')
  doc.sweep(net)
  t.equal(doc.match('#Listed').text(), 'apples', 'literal hook applies the captured action')
  t.equal(doc.match('#Nearby').text(), 'Paris', 'tag hook applies the captured action')
  t.deepEqual(Object.keys(net.index), ['including', '#Place'], 'only the selected required hooks enqueue these rules')
  t.end()
})

test('explicit hooks preserve action order and matchOne', t => {
  const rules = [
    { match: 'two', reason: 'two' },
    { match: 'one two', hook: 'one', reason: 'both' },
    { match: 'one', reason: 'one' },
  ]
  const net = nlp.buildNet(rules)
  const doc = nlp('one two')
  t.deepEqual(doc.sweep(net).found.map(r => r.reason), ['two', 'both', 'one'], 'manual hook does not move the action to a later bucket')
  t.deepEqual(doc.sweep(net, { matchOne: true }).found.map(r => r.reason), ['two'], 'first result is unchanged')
  t.end()
})

test('explicit hooks accept required AND terms and switches', t => {
  const net = nlp.buildNet([
    { match: '(including && #Verb) #Noun', hook: 'including' },
    { match: '[%Noun|Verb%] #Preposition', hook: '%Noun|Verb%' },
  ])
  t.deepEqual(Object.keys(net.index), ['including', '%Noun|Verb%'], 'AND requirement and switch are valid hook keys')
  t.end()
})

test('unsafe explicit hooks fail at compilation', t => {
  const cases = [
    ['one #Noun', 'missing'],
    ['one #Noun', '#Verb'],
    ['one? #Noun', 'one'],
    ['!one #Noun', 'one'],
    ['(one|two) #Noun', 'one'],
    ['(one && #Noun)? two', 'one'],
    ['!(one && #Noun) two', 'one'],
    ['@hasComma #Noun', '@hasComma'],
    ['one', null],
    ['one', 1],
  ]
  for (let i = 0; i < cases.length; i += 1) {
    const [match, hook] = cases[i]
    t.throws(() => nlp.buildNet([{ match, hook }]), /Invalid hook.*required word, #Tag, or %Switch%/, match + ' rejects ' + hook)
  }
  t.end()
})

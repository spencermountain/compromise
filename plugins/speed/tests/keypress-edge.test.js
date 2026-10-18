import test from 'tape'
import { nlp, words } from './edge-lib.js'

test('keypress resets, evicts, and reorders cached sentences', t => {
  let parsed = 0
  nlp.plugin({
    hooks: ['speedEdgeParseCount'],
    compute: { speedEdgeParseCount: doc => { parsed += doc.length } },
  })
  const cache = {}
  const input = 'Cats sleep. Dogs run. '
  nlp.keyPress(input, undefined, { cache })
  parsed = 0
  const reordered = nlp.keyPress('Dogs run. Cats sleep. ', undefined, { cache })
  t.equal(parsed, 0, 'reordering unchanged sentences does not parse them again')
  t.equal(reordered.text(), 'Dogs run. Cats sleep. ', 'reordering preserves output order')
  parsed = 0
  nlp.keyPress(input, undefined, { cache, reset: true })
  t.equal(parsed, 2, 'explicit reset reparses both sentences')
  nlp.keyPress('', undefined, { cache })
  parsed = 0
  nlp.keyPress(input, undefined, { cache })
  t.equal(parsed, 2, 'clearing an editor evicts its previous sentences')
  t.end()
})

test('keypress returns independent terms and repairs positions after edits', t => {
  const cache = {}
  const input = 'The cat sleeps. The cat sleeps. '
  const first = nlp.keyPress(input, undefined, { cache })
  first.eq(0).match('cat').tag('Adjective')
  t.notOk(first.eq(1).match('cat').has('#Adjective'), 'tag mutation does not affect a duplicate sentence')
  const next = nlp.keyPress(input, undefined, { cache })
  t.notOk(next.match('cat').has('#Adjective'), 'tag mutation does not affect the cached sentence')
  const changed = nlp.keyPress('A bird flies. ' + input, undefined, { cache })
  changed.eq(2).replace('cat', 'dog')
  t.equal(changed.text(), 'A bird flies. The cat sleeps. The dog sleeps. ', 'transforms target the correct shifted sentence')
  t.equal(nlp.keyPress(input, undefined, { cache }).text(), input, 'transforms do not change future results')
  t.end()
})

test('keypress separates editor settings and notices plugin words', t => {
  const first = {}
  const second = {}
  const noun = { speedquux: 'Noun' }
  const adjective = { speedquux: 'Adjective' }
  t.ok(nlp.keyPress('speedquux', noun, { cache: first }).has('#Noun'), 'first editor uses its lexicon')
  t.ok(nlp.keyPress('speedquux', adjective, { cache: second }).has('#Adjective'), 'second editor uses its lexicon')
  t.ok(nlp.keyPress('speedquux', noun, { cache: first }).has('#Noun'), 'first editor can restore its lexical settings')
  nlp.plugin({ words: { speedquux: 'Adjective' } })
  t.ok(nlp.keyPress('speedquux', undefined, { cache: first }).has('#Adjective'), 'plugin lexical changes invalidate cached results')
  for (const input of ['__proto__', 'constructor', 'toString', 'Café 🎉. Café 🎉. ', "She can't go. He won't leave."]) {
    t.deepEqual(words(nlp.keyPress(input)), words(nlp(input)), 'ordinary parsing parity: ' + input)
  }
  t.end()
})

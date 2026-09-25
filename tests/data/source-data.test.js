import test from 'tape'
import { addWords, validatePairs } from '../../data/validate.js'
import lexicon from '../../data/lexicon/index.js'
import pairs from '../../data/pairs/index.js'
import { shared } from '../../src/2-two/preTagger/model/lexicon/frozenLex.js'
import misc from '../../src/2-two/preTagger/model/lexicon/misc.js'
import packed from '../../src/2-two/preTagger/model/lexicon/_data.js'
import { unpack } from 'efrt'

test('source lexicon rejects duplicates and malformed words', t => {
  const lex = {}
  addWords(lex, ['pilot'], 'Actor', 'actors')
  t.throws(() => addWords(lex, ['pilot'], 'Infinitive', 'verbs'), /Duplicate.*pilot.*verbs/)
  t.throws(() => addWords({}, ['pilot', 'pilot'], 'Actor', 'actors'), /Duplicate/)
  for (const word of ['', ' Pilot', 'Pilot', 'pilot ', 'pi|lot', 'pilot2', null]) {
    t.throws(() => addWords({}, [word], 'Actor', 'actors'), /Invalid lexicon word/)
  }
  t.equal(lex.pilot, 'Actor', 'a rejected duplicate does not replace the first tag')
  t.end()
})

test('source pairs reject ambiguous inputs while allowing shared outputs', t => {
  t.throws(() => validatePairs({ Gerund: [['enrolling', 'enroll'], ['enrolling', 'enrol']] }), /Duplicate Gerund input/)
  t.throws(() => validatePairs({ Comparative: [['neat', 'neater'], ['neat', 'neater']] }), /Duplicate Comparative input/)
  for (const pair of [['', ''], ['great', ''], ['great'], ['great', 'greatest', 'extra'], ['big', null], ['big', 'big|gest']]) {
    t.throws(() => validatePairs({ Superlative: [pair] }), /Invalid Superlative pair/)
  }
  t.doesNotThrow(() => validatePairs({ PastTense: [['learned', 'learn'], ['learnt', 'learn']] }))
  t.doesNotThrow(() => validatePairs(pairs), 'maintained training data passes validation')
  t.end()
})

test('shared frozen phrases also supply the regular lexicon', t => {
  for (const [word, tag] of Object.entries(shared)) {
    t.deepEqual(lexicon[word], tag, word)
  }
  t.end()
})

test('packed lexicon is current and does not shadow unpacked entries', t => {
  const decoded = {}
  for (const [tag, data] of Object.entries(packed)) {
    for (const word of Object.keys(unpack(data))) {
      decoded[word] = tag
    }
  }
  t.deepEqual(decoded, lexicon, 'run pnpm run pack after editing the source lexicon')
  t.deepEqual(Object.keys(misc).filter(word => Object.hasOwn(lexicon, word)), [], 'unpacked entries have a single owner')
  t.end()
})

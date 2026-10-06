import test from 'tape'
import nlp from '../_lib.js'
import isolateModel from '../../_isolate-model.js'
const here = '[three/misc/at-mentions] '

test('atMention case:', function (t) {
  isolateModel(t, nlp.model().one, ['lexicon', '_multiCache'])
  const str = '@DonaldTrump and @lasVegas'
  const doc = nlp(str, { lasVegas: 'City' })
  let m = doc.atMentions()
  t.equal(m.length, 2, here + 'two atMentions')

  m = doc.match('donaldTrump and lasVegas')
  t.equal(m.text(), str, here + 'atMention tag')
  t.end()
})

test(here + 'mentions beside punctuation and repeated handles', t => {
  const cases = [
    ['Hello, @alice!', ['@alice']],
    ['Ask (@alice) or @bob.', ['@alice', '@bob']],
    ['@alice, @bob and @alice agreed.', ['@alice', '@bob', '@alice']],
    ['Thanks @Alice_42!', ['@Alice_42']],
    ['@alice replied. Then @bob replied.', ['@alice', '@bob']],
    ['@alice', ['@alice']],
    ['Write to alice@example.com.', []],
    ['Email alice@example.com or ask @alice.', ['@alice']],
    ['Meet me @ noon.', []],
    ['No handles in this sentence.', []],
    ['', []],
  ]
  cases.forEach(([input, expected]) => {
    const doc = nlp(input)
    const mentions = doc.atMentions()
    t.deepEqual(mentions.termList().map(term => term.text), expected, here + input)
    t.equal(doc.text(), input, here + 'selection preserves input: ' + input)
  })
  t.end()
})

test(here + 'mention selection stays within the selected sentence', t => {
  const doc = nlp('@alice arrived. @bob left.')
  t.deepEqual(doc.eq(0).atMentions().termList().map(term => term.text), ['@alice'], here + 'first sentence')
  t.deepEqual(doc.eq(1).atMentions().termList().map(term => term.text), ['@bob'], here + 'second sentence')
  t.equal(doc.match('missing').atMentions().length, 0, here + 'empty selection')
  t.end()
})

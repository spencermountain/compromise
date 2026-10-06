import test from 'tape'
import nlp from '../_lib.js'
import isolateModel from '../../_lib/isolate-model.js'
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

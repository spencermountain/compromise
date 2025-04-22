import test from 'tape'
import nlp from './_lib.js'
const here = '[three/hashtags] '

test('case insensitive:', function (t) {
  const doc = nlp('the #leafs and the #JetsGo')
  const m = doc.hashTags()
  t.equal(m.length, 2, here + 'two hashtags')
  t.end()
})

test('case insensitive:', function (t) {
  const doc = nlp('the #leafs and the #JetsGo')
  const m = doc.match('the leafs and')
  t.equal(m.text(), 'the #leafs and', here + 'hashtag normal match')
  t.end()
})

test('hashtag lexicon:', function (t) {
  const str = 'the #leafs and the #JetsGo'
  const doc = nlp(str, { leafs: 'Team' })
  const m = doc.match('the #Team . the #HashTag')
  t.equal(m.text(), 'the #leafs and the #JetsGo', here + 'hashtag lexicon')
  t.end()
})

test('atMention case:', function (t) {
  const str = '@DonaldTrump and @lasVegas'
  const doc = nlp(str, { lasVegas: 'City' })
  let m = doc.atMentions()
  t.equal(m.length, 2, here + 'two atMentions')

  m = doc.match('donaldTrump and lasVegas')
  t.equal(m.text(), str, here + 'atMention tag')
  t.end()
})
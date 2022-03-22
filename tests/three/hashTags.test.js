import test from 'tape'
import nlp from './_lib.js'
const here = '[three/hashtags] '

test('case insensitive:', function (t) {
  let doc = nlp('the #leafs and the #JetsGo')
  let m = doc.hashTags()
  t.equal(m.length, 2, here + 'two hashtags')
  t.end()
})

test('case insensitive:', function (t) {
  let doc = nlp('the #leafs and the #JetsGo')
  let m = doc.match('the leafs and')
  t.equal(m.text(), 'the #leafs and', here + 'hashtag normal match')
  t.end()
})

test('hashtag lexicon:', function (t) {
  let str = 'the #leafs and the #JetsGo'
  let doc = nlp(str, { leafs: 'Team' })
  let m = doc.match('the #Team . the #HashTag')
  t.equal(m.text(), 'the #leafs and the #JetsGo', here + 'hashtag lexicon')
  t.end()
})

test('atMention case:', function (t) {
  let str = '@DonaldTrump and @lasVegas'
  let doc = nlp(str, { lasVegas: 'City' })
  let m = doc.atMentions()
  t.equal(m.length, 2, here + 'two atMentions')

  m = doc.match('donaldTrump and lasVegas')
  t.equal(m.text(), str, here + 'atMention tag')
  t.end()
})
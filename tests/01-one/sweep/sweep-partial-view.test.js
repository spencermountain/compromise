import test from 'tape'
import nlp from '../lib.js'
const here = '[one/sweep/sweep-partial-view] '

test(here + 'sweep on a view that starts mid-sentence keeps the full match', t => {
  const doc = nlp('I saw the big red dog yesterday')
  const sub = doc.match('the big red dog')
  const net = nlp.buildNet([{ match: 'red dog' }])
  const res = sub.sweep(net, { tagger: false })
  t.equal(res.view.text(), 'red dog', 'sweep view text')
  t.equal(res.found[0].view.text(), 'red dog', 'found view text')
  t.deepEqual(res.view.fullPointer.map(a => a.slice(0, 3)), [[0, 4, 6]], 'pointer covers both terms')
  t.equal(sub.match(net).text(), 'red dog', 'match(net)')
  t.equal(sub.has(net), true, 'has(net)')
  t.equal(sub.matchOne(net).text(), 'red dog', 'matchOne(net)')
  t.end()
})

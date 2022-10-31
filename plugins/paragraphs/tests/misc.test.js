import test from 'tape'
import nlp from './_lib.js'
const here = '[paragraph/misc] '

test('paragraph-tests', function (t) {
  let txt = `What's with these homies dissin' my girl? Why do they gotta front? What did we ever do to these guys that made them so violent?

Second paragraph! Oh yeah! my friends`

  let doc = nlp(txt)
  let res = doc.paragraphs()
  t.equal(res.found, true, here + 'found')
  t.equal(res.length, 2, here + 'length')

  // match
  let m = res.match('^what did')
  t.equal(m.length, 1, here + 'match')
  t.equal(m.growRight('. .').text(), 'What did we ever', here + 'match-text')

  t.equal(res.has('foo'), false, here + 'has')
  t.equal(res.has('my girl'), true, here + 'has2')
  t.equal(res.if('homies').length, 1, here + 'if')


  t.end()
})

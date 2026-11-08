import test from 'tape'
import nlp from '../lib.js'
const here = '[one/output/highlight] '

const esc = '\x1b'
const plain = str => str.replaceAll(esc + '[90m', '').replaceAll(esc + '[32m', '').replaceAll(esc + '[0m', '')
// column where the green match begins
const column = line => plain(line.split(esc + '[32m')[0]).length

test('out-highlight', function (t) {
  const doc = nlp('the quick brown fox jumps over the lazy dog. he said and so on, and so on and so forth, then left.')
  const lines = doc.match('and so on').out('highlight').split('\n')
  t.equal(lines.length, 2, here + 'one line per match')
  t.equal(column(lines[0]), 27, here + 'first match at middle column')
  t.equal(column(lines[1]), 27, here + 'second match at middle column')
  t.equal(plain(lines[0]), '                   he said and so on, and so on and …', here + 'right side trimmed')
  t.equal(plain(lines[1]), '        he said and so on, and so on and so forth, then left.', here + 'short right side kept')
  t.ok(lines[0].includes(esc + '[32mand so on, ' + esc + '[0m'), here + 'match is green')

  const long = nlp('one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen')
  const out = plain(long.match('nine').out('highlight'))
  t.equal(out, '    … five six seven eight nine ten eleven twelve …', here + 'both sides trimmed')
  t.ok(out.length <= 55, here + 'fits width')

  t.equal(nlp('nothing here').match('missing').out('highlight'), '', here + 'no match')
  t.end()
})

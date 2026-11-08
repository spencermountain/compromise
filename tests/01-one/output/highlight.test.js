/* eslint-disable no-console */
import test from 'tape'
import nlp from '../lib.js'
const here = '[one/output/highlight] '

const esc = '\x1b'
const plain = str => str.replaceAll(esc + '[90m', '').replaceAll(esc + '[32m', '').replaceAll(esc + '[0m', '')
// column where the green match begins
const column = line => plain(line.split(esc + '[32m')[0]).length

// run fn, collecting the arguments of each console.log call
const capture = fn => {
  const logs = []
  const original = console.log
  console.log = (...args) => logs.push(args)
  try {
    fn()
  } finally {
    console.log = original
  }
  return logs
}

test('debug-highlight', function (t) {
  const doc = nlp('the quick brown fox jumps over the lazy dog. he said and so on, and so on and so forth, then left.')
  const lines = capture(() => doc.match('and so on').debug('highlight')).map(args => args[0])
  t.equal(lines.length, 2, here + 'one line per match')
  t.equal(column(lines[0]), 27, here + 'first match at middle column')
  t.equal(column(lines[1]), 27, here + 'second match at middle column')
  t.equal(plain(lines[0]), '                   he said and so on, and so on and …', here + 'right side trimmed')
  t.equal(plain(lines[1]), '        he said and so on, and so on and so forth, …', here + 'second line trimmed')
  t.ok(lines[0].includes(esc + '[32mand so on, ' + esc + '[0m'), here + 'match is green')

  const long = nlp('one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen')
  const out = plain(capture(() => long.match('nine').debug('highlight'))[0][0])
  t.equal(out, '    … five six seven eight nine ten eleven twelve …', here + 'both sides trimmed')
  t.ok(out.length <= 55, here + 'fits width')

  t.equal(capture(() => nlp('nothing here').match('missing').debug('highlight')).length, 0, here + 'no match, no output')
  t.end()
})

test('debug-highlight client-side', function (t) {
  globalThis.window = { document: {} }
  t.teardown(() => {
    delete globalThis.window
  })
  const logs = capture(() => nlp('the lazy dog').match('lazy').debug('highlight'))
  const expected = ['%c' + ' '.repeat(23) + 'the %clazy %cdog', 'color:grey', 'color:green', 'color:grey']
  t.deepEqual(logs, [expected], here + 'css styles for the browser console')
  t.end()
})

import test from 'tape'
import nlp from '../lib.js'
const here = '[three/quotations-partial] '

test(here + 'quotations in a partial view', function (t) {
  const arr = [
    // [text, the view, its quotations]
    ['one two three "four" five', 'four five', ['"four"']],
    ['one "two three" four', 'two three four', ['"two three"']],
    ['one two "three four" five six', 'three four five', ['"three four"']],
    ['one "two" "three four" five', 'two three four five', ['"two"', '"three four"']],
    ['one "two three" "four" five', 'two three four', ['"two three"', '"four"']],
    // only those inside the view
    ['zero "one two" three "four" five', 'three four five', ['"four"']],
    // the view must hold both ends
    ['one "two three" four', 'one two', []],
    ['one "two three" four', 'three four', []],
    // from the start of a sentence
    ['one "two three" four', 'one two three four', ['"two three"']],
    // a later sentence
    ['this is first. one two "three four" five', 'three four five', ['"three four"']],
  ]
  arr.forEach(a => {
    const [str, view, want] = a
    const res = nlp(str).match(view).quotations().out('array')
    t.deepEqual(res, want, here + str + ' -> ' + view)
  })
  t.end()
})

test(here + 'full documents are unchanged', function (t) {
  const arr = [
    ['one "two three" four', ['"two three"']],
    ['"one two" three "four" five', ['"one two"', '"four"']],
    ['one "two three" four. five "six" seven', ['"two three"', '"six"']],
    ['one "two three four', []],
  ]
  arr.forEach(a => {
    t.deepEqual(nlp(a[0]).quotations().out('array'), a[1], here + a[0])
  })
  t.end()
})

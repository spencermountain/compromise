import test from 'tape'
import nlp from '../../two/_lib.js'
const here = '[one/term-split] '


test('term tokenizer', function (t) {
  const arr = [
    [``, 0],
    [`1`, 1],
    [`&`, 1],
    [`*`, 1],
    [`oh yeah??`, 2],
    [`#canada #goose @gooseman`, 3],
    [`the  "gouvernement" party`, 3],
    [`the  «gouvernement»`, 2],
    [`the  « gouvernement »`, 2],
    [`i guess... but`, 3],
    [`i guess ... but`, 3],
    [`he did. (but barely)`, 4],
    [`he did. ( but barely )`, 4],
  ]
  arr.forEach(a => {
    const [str, len] = a
    t.equal(nlp(str).terms().length, len, here + `"${str}"`)
  })
  t.end()
})
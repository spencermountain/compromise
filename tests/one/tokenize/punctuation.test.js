import test from 'tape'
import nlp from '../../two/_lib.js'
const here = '[one/term-punctuation] '


test('term punctuation', function (t) {
  let arr = [
    [`yeah??`, 'yeah'],
    [`#canada`, 'canada'],
    [`@canada`, 'canada'],
    [`the  "gouvernement" party`, 'gouvernement'],
    [`i guess... but`, 'guess'],
    [`he did. (but barely)`, 'but barely'],
    [`~word~`, 'word'],
    [`'word'`, 'word'],
    [`(word)`, 'word'],
    [`([word])`, 'word'],
    [`{word}`, 'word'],
    [`-word-`, 'word'],
    [`«‛“word〉`, 'word'],
    // [`_word_`, 'word'],
  ]
  arr.forEach(a => {
    let [txt, match] = a
    t.equal(nlp(txt).has(match), true, here + `"${txt}"`)
  })
  t.end()
})
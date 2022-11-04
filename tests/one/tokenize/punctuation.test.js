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
    [`'word'`, 'word'],
    [`flanders'`, `flanders'`],
    // [`_word_`, 'word'],
  ]
  arr.forEach(a => {
    let [txt, match] = a
    t.equal(nlp(txt).has(match), true, here + `"${txt}"`)
  })
  t.end()
})

test('modify existing punctuation', function (t) {
  let world = nlp.world()

  let term = nlp('=cool=').docs[0][0]
  t.equal(term.normal, 'cool', here + 'before')

  // change it
  world.model.one.prePunctuation['='] = true
  term = nlp('=cool=').docs[0][0]
  t.equal(term.normal, '=cool', here + 'allow before')

  world.model.one.postPunctuation['='] = true
  term = nlp('=cool=').docs[0][0]
  t.equal(term.normal, '=cool=', here + 'both')

  world.model.one.prePunctuation['='] = false
  world.model.one.postPunctuation['='] = false
  term = nlp('=cool=').docs[0][0]
  t.equal(term.normal, 'cool', here + 'fixed')


  t.end()
})
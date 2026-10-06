import test from 'tape'
import nlp from '../_lib.js'
import isolateModel from '../../_lib/isolate-model.js'
const here = '[one/term-punctuation] '


test('term punctuation', function (t) {
  const arr = [
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
    const [txt, match] = a
    t.equal(nlp(txt).has(match), true, here + `"${txt}"`)
  })
  t.end()
})

test('closing bracket inside a word', function (t) {
  const arr = [
    ['foo(bar) foo', 'foo(bar)', ' '],
    ['foo[bar] foo', 'foo[bar]', ' '],
    ['foo{bar} foo', 'foo{bar}', ' '],
    ['f(x), y', 'f(x)', ', '],
    ['(foo) bar', 'foo', ') '],
  ]
  arr.forEach(([str, text, post]) => {
    const term = nlp(str).docs[0][0]
    t.equal(term.text, text, here + `text "${str}"`)
    t.equal(term.post, post, here + `post "${str}"`)
  })
  t.end()
})

test('modify existing punctuation', function (t) {
  const world = nlp.world()
  isolateModel(t, world.model.one, ['prePunctuation', 'postPunctuation'])

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

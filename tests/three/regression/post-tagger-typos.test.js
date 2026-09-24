import test from 'tape'
import nlp from '../_lib.js'

test('corrected post-tagger patterns tag their intended words', t => {
  const cases = [
    ['the nice walk', 'walk', 'Noun'],
    ['wit me', 'wit', 'Preposition'],
    ['mount Everest', 'mount', 'Place'],
    ['American standard time', 'standard', 'Timezone'],
    ['must-win game', 'win', 'Adjective'],
  ]
  cases.forEach(([text, word, tag]) => {
    t.ok(
      nlp(text)
        .match(word)
        .has('#' + tag),
      text + ' tags ' + word
    )
  })
  t.notOk(nlp('we must win').match('win').has('#Adjective'), 'must-win requires a hyphen')
  t.notOk(nlp('wit me').has('#Presposition'), 'misspelled output tag is gone')
  t.end()
})

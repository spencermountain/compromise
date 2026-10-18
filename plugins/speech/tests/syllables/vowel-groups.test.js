import test from 'tape'
import nlp from '../_lib.js'

// Pronounced vowel pairs need contrasting words, not a blanket split or merge.
const examples = [
  ['diet', 2],
  ['diets', 2],
  ['dietary', 4],
  ['died', 1],
  ['field', 1],
  ['cereal', 3],
  ['cereals', 3],
  ['real', 2],
  ['really', 2],
  ['read', 1],
  ['bread', 1],
  ['fluent', 2],
  ['affluent', 3],
  ['affluence', 3],
  ['confluence', 3],
  ['constituent', 4],
  ['constituency', 5],
  ['subsequent', 3],
  ['blue', 1],
  ['true', 1],
  ['Bryan', 2],
  ['Ryan', 2],
  ['cyan', 2],
  ['bellyache', 3],
  ['crying', 2],
  ['yellow', 2],
  ['yard', 1],
  ['beyond', 2],
  ['lawyer', 2],
  ['canyon', 2],
  ['anyone', 3],
  ['language', 2],
  ['languages', 3],
  ['guard', 1],
  ['guarded', 2],
  ['iguana', 3],
  ['arguing', 3],
  ['annual', 3],
  ['January', 4],
  ['Louisville', 3],
  ['McCarville', 3],
  ['McConville', 3],
  ['McDonald', 3],
]

test('speech: contextual vowel groups', t => {
  examples.forEach(([text, count]) => {
    const parts = nlp(text).syllables()[0]
    t.equal(parts.length, count, text)
    t.equal(parts.join(''), text, `${text}: reconstruction`)
  })
  t.end()
})

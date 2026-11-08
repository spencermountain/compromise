import test from 'tape'
import nlp from '../lib.js'
const here = '[two/contraction-two/is-has-context] '

// what one 's word was read as: '#Possessive', 'is', or 'has'
const readAs = (str, word) => {
  const terms = nlp(str).docs.flat()
  const i = terms.findIndex(t => t.text.toLowerCase() === word)
  if (i === -1) {
    return 'missing'
  }
  if (terms[i].implicit) {
    return terms[i + 1].implicit
  }
  if (terms[i].tags.has('Possessive')) {
    return '#Possessive'
  }
  return 'neither'
}

// [sentence, word, reading]
const arr = [
  // a describing word that ends the clause
  ["John's tired", "john's", 'is'],
  ["I can tell she's tired", "she's", 'is'],
  ["you know she's interested", "she's", 'is'],
  ["he's probably interested", "he's", 'is'],
  ["the door's locked", "door's", 'is'],
  ["the elevator's locked and we are leaving", "elevator's", 'is'],
  ["her heart's broken", "heart's", 'is'],
  ["he's upset, so be kind", "he's", 'is'],
  ["he's seriously depressed", "he's", 'is'],
  // words that are passive nearly every time
  ["it's called Kiwi Heaven", "it's", 'is'],
  ["in Luxembourg it's called benzine", "it's", 'is'],
  ["the fruit's called a peach", "fruit's", 'is'],
  ["he's supposed to be here", "he's", 'is'],
  ["it's not meant to be a joke", "it's", 'is'],
  ["she's not allowed to wake me", "she's", 'is'],
  ["it's conveniently located and cheap", "it's", 'is'],
  ["she's headed to the pyramid", "she's", 'is'],
  // passive, with 'by'
  ["it's made by a local bakery", "it's", 'is'],
  ["the house's owned by the bank", "house's", 'is'],
  // still 'has'
  ["John's finished his homework", "john's", 'has'],
  ["she's lost her keys", "she's", 'has'],
  ["he's left the building", "he's", 'has'],
  ["he's left", "he's", 'has'],
  ["the plane's landed", "plane's", 'has'],
  ["he's had enough", "he's", 'has'],
  ["it's made a difference", "it's", 'has'],
  ["he's called me twice", "he's", 'has'],
  ["John's eaten dinner", "john's", 'has'],
  ["the team's made progress", "team's", 'has'],
  ["Dad's lost weight", "dad's", 'has'],
  ["your girl's got red in her cheeks", "girl's", 'has'],
  ["Mary's visited Paris before", "mary's", 'has'],
  // a describing word, then a thing: possessive
  ["Fiona's planned attack on the tree failed", "fiona's", '#Possessive'],
  ["Louisiana's asserted interest in the case", "louisiana's", '#Possessive'],
  ["China's continued reinvestment of its surplus", "china's", '#Possessive'],
  ["last year's failed bid to reform it", "year's", '#Possessive'],
  ["Dynegy's planned acquisition of Enron", "dynegy's", '#Possessive'],
  ["Bush's proposed risky experiments", "bush's", '#Possessive'],
  ["the company's bottled water comes from a spring", "company's", '#Possessive'],
]

test('is, has, or possessive before a past word', function (t) {
  arr.forEach(([str, word, want]) => {
    t.equal(readAs(str, word), want, here + `${str} - ${word}`)
  })
  t.end()
})

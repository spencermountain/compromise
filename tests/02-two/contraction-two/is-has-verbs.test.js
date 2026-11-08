import test from 'tape'
import nlp from '../lib.js'
const here = '[two/contraction-two/is-has-verbs] '

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
  // a state, then an adverb
  ["the car's parked outside", "car's", 'is'],
  ["the door's locked now", "door's", 'is'],
  ["he's tired again", "he's", 'is'],
  // passive
  ["he's married", "he's", 'is'],
  ["he's married with two kids", "he's", 'is'],
  ["it's derived from Latin", "it's", 'is'],
  ["she's attracted to him", "she's", 'is'],
  ["it's made with butter", "it's", 'is'],
  // a later verb belongs to another clause
  ["it's because he wanted it", "it's", 'is'],
  ["it's like they wrote it", "it's", 'is'],
  ["it's time we left", "it's", 'is'],
  ["that's something I heard", "that's", 'is'],
  ["John's at home because he left early", "john's", 'is'],
  // verbs that take 'has'
  ["it's improved", "it's", 'has'],
  ["it's increased", "it's", 'has'],
  ["he's failed", "he's", 'has'],
  ["he's left", "he's", 'has'],
  ["he's left for work", "he's", 'has'],
  ["she's gone to the store", "she's", 'has'],
  ["he's worked for IBM", "he's", 'has'],
  ["he's lived in Paris", "he's", 'has'],
  ["she's moved to Boston", "she's", 'has'],
  ["he's come from the office", "he's", 'has'],
  ["he's got in trouble", "he's", 'has'],
  ["it's happened to me", "it's", 'has'],
  ["it's turned out fine", "it's", 'has'],
  ["she's married a doctor", "she's", 'has'],
  ["he's married her", "he's", 'has'],
  ["she's never been to Asia", "she's", 'has'],
  ["the cake's already been eaten", "cake's", 'has'],
  // a meal or a place is done, not owned
  ["Mom's cooked dinner", "mom's", 'has'],
  ["Dad's fixed breakfast", "dad's", 'has'],
  ["John's finished work", "john's", 'has'],
  ["Mary's finished school", "mary's", 'has'],
  // a describing word, then things: possessive
  ["Europe's troubled economies struggled", "europe's", '#Possessive'],
  ["Laden's hijacked planes attacked", "laden's", '#Possessive'],
  ["the General's sustained efforts continued", "general's", '#Possessive'],
  ["the committee's detailed reports were long", "committee's", '#Possessive'],
  // older misses
  ["John's still here", "john's", 'is'],
  ["the man in black's gonna rock", "black's", 'is'],
]

test('is, has, or possessive, by verb', function (t) {
  arr.forEach(([str, word, want]) => {
    t.equal(readAs(str, word), want, here + `${str} - ${word}`)
  })
  t.end()
})

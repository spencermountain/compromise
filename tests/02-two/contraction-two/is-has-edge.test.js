import test from 'tape'
import nlp from '../lib.js'
const here = '[two/contraction-two/is-has-edge] '

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
  // 'only human', and 'still' before a role
  ["John's only human", "john's", 'is'],
  ["John's still king", "john's", 'is'],
  ["Mary's still captain", "mary's", 'is'],
  // a state, then how or when
  ["the store's closed early today", "store's", 'is'],
  ["the shop's closed late on Fridays", "shop's", 'is'],
  ["it's considered rude", "it's", 'is'],
  // reported things
  ["it's said to be haunted", "it's", 'is'],
  ["he's said to be rich", "he's", 'is'],
  ["it's thought to be safe", "it's", 'is'],
  ["it's believed Shakespeare wrote it", "it's", 'is'],
  ["it's rumored that he left", "it's", 'is'],
  // the 's has to be the verb
  ["Mom's baked cookies", "mom's", 'has'],
  ["Dad's fixed cars", "dad's", 'has'],
  // verbs that take 'has', before 'to'
  ["she's reacted to the news", "she's", 'has'],
  ["he's responded to the email", "he's", 'has'],
  ["she's listened to him", "she's", 'has'],
  ["he's agreed to the terms", "he's", 'has'],
  ["she's returned to work", "she's", 'has'],
  // an object follows
  ["she's lost many friends", "she's", 'has'],
  ["he's broken many records", "he's", 'has'],
  ["she's said enough", "she's", 'has'],
  ["he's said that before", "he's", 'has'],
  ["he's believed in her", "he's", 'has'],
  ["she's thought about it", "she's", 'has'],
  // still possessive
  ["we visited Europe's troubled economies", "europe's", '#Possessive'],
  ["China's proposed reforms were delayed", "china's", '#Possessive'],
  ["the pond's still water was cold", "pond's", '#Possessive'],
  ["her mother's only child left", "mother's", '#Possessive'],
]

test('is, has, or possessive - edge cases', function (t) {
  arr.forEach(([str, word, want]) => {
    t.equal(readAs(str, word), want, here + `${str} - ${word}`)
  })
  t.end()
})

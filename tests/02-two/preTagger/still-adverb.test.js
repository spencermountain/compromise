import test from 'tape'
import nlp from '../lib.js'
const here = '[two/preTagger/still-adverb] '

const tagsOf = (str, word) => {
  const term = nlp(str).docs.flat().find(t => t.normal === word)
  return term ? term.tags : new Set()
}

// [sentence, word, expected tag, forbidden tag]
const arr = [
  // 'still' is an adverb
  ['he is still here', 'still', 'Adverb', 'Adjective'],
  ['they are still kicking', 'still', 'Adverb', 'Adjective'],
  ['she still has it', 'still', 'Adverb', 'Adjective'],
  ['it is still the best', 'still', 'Adverb', 'Adjective'],
  ['there is still no cure', 'still', 'Adverb', 'Adjective'],
  ['we still do not know', 'still', 'Adverb', 'Adjective'],
  ['still, he left', 'still', 'Adverb', 'Adjective'],
  // and the words around it
  ['they are still kicking', 'are', 'Auxiliary', 'Noun'],
  ['they are still kicking', 'kicking', 'Gerund', 'Noun'],
  ['my hair is still recovering', 'recovering', 'Gerund', 'Noun'],
  ['are you still teaching', 'teaching', 'Gerund', 'Noun'],
  // between a determiner and its noun, it describes the noun
  ['a still night', 'still', 'Adjective', 'Adverb'],
  ['a still night', 'night', 'Noun', 'Verb'],
  ['the still water was cold', 'still', 'Adjective', 'Adverb'],
  ['the still water was cold', 'water', 'Noun', 'Verb'],
  ['his still face', 'still', 'Adjective', 'Adverb'],
  ['a still life', 'life', 'Noun', 'Verb'],
  ["the pond's still water was cold", 'still', 'Adjective', 'Adverb'],
  ["the pond's still water was cold", 'water', 'Noun', 'Verb'],
  // other adverbs in the same place
  ['the very idea', 'idea', 'Noun', 'Verb'],
  ['an only child', 'child', 'Noun', 'Verb'],
  // a subject, an adverb, then a verb
  ['this really works', 'works', 'PresentTense', 'Noun'],
  ['this still helps', 'helps', 'PresentTense', 'Noun'],
  ['the dog still barks', 'barks', 'PresentTense', 'Noun'],
  ['my mother still works', 'works', 'PresentTense', 'Noun'],
]

// what one 's word was read as: '#Possessive', 'is', or 'has'
const readAs = (str, word) => {
  const terms = nlp(str).docs.flat()
  const i = terms.findIndex(t => t.text.toLowerCase() === word)
  if (terms[i].implicit) {
    return terms[i + 1].implicit
  }
  return terms[i].tags.has('Possessive') ? '#Possessive' : 'neither'
}

const contractions = [
  ["John's still here", "john's", 'is'],
  ["John's still king", "john's", 'is'],
  ["Mary's still captain", "mary's", 'is'],
  ["Tag's still talking to them", "tag's", 'is'],
  ["the car's still running", "car's", 'is'],
  ["the pond's still water was cold", "pond's", '#Possessive'],
]

test('still is an adverb', function (t) {
  arr.forEach(([str, word, tag, not]) => {
    const tags = tagsOf(str, word)
    t.ok(tags.has(tag), here + `${str} - ${word} #${tag}`)
    t.notOk(tags.has(not), here + `${str} - ${word} not #${not}`)
  })
  contractions.forEach(([str, word, want]) => {
    t.equal(readAs(str, word), want, here + `${str} - ${word}`)
  })
  t.end()
})

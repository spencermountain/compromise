import test from 'tape'
import nlp from '../lib.js'
const here = '[two/preTagger/now-ours] '

const tagsOf = (str, word) => {
  const term = nlp(str).docs.flat().find(t => t.normal === word)
  return term ? term.tags : new Set()
}

// [sentence, word, expected tag, forbidden tag]
const arr = [
  // 'now' is an adverb
  ['it is now open', 'now', 'Adverb', 'Conjunction'],
  ['he is here now', 'now', 'Adverb', 'Conjunction'],
  ['we saw him just now', 'now', 'Adverb', 'Conjunction'],
  ['you can now eat bagels', 'now', 'Adverb', 'Conjunction'],
  ['from now on we walk', 'now', 'Adverb', 'Conjunction'],
  // and the words around it
  ['it is now open', 'open', 'Adjective', 'Verb'],
  ['you can now eat bagels', 'can', 'Auxiliary', 'Noun'],
  ['scientists are now discovering it', 'are', 'Auxiliary', 'Noun'],
  ['he has now become rich', 'has', 'Auxiliary', 'Noun'],
  ['this now takes two days', 'takes', 'PresentTense', 'Noun'],
  // 'now that' joins two clauses
  ['now that he left, we can go', 'now', 'Conjunction', 'Adverb'],
  // 'ours' is a possessive pronoun, like 'hers' and 'theirs'
  ['the city is ours', 'ours', 'Pronoun', 'Verb'],
  ['the city is ours', 'ours', 'Possessive', 'Verb'],
  ['ours is better', 'ours', 'Pronoun', 'Verb'],
  ['a house like ours', 'ours', 'Pronoun', 'Verb'],
  ['the city is theirs', 'theirs', 'Pronoun', 'Verb'],
]

test('now and ours', function (t) {
  arr.forEach(([str, word, tag, not]) => {
    const tags = tagsOf(str, word)
    t.ok(tags.has(tag), here + `${str} - ${word} #${tag}`)
    t.notOk(tags.has(not), here + `${str} - ${word} not #${not}`)
  })
  // the contraction reads it as an adverb too
  const terms = nlp("it's now been a year").docs.flat()
  t.equal(terms[1].implicit, 'has', here + "it's now been - has")
  t.end()
})

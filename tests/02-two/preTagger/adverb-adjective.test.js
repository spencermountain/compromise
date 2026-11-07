import test from 'tape'
import nlp from '../lib.js'
const here = '[two/preTagger/adverb-adjective] '

const tagsOf = (str, word) => {
  const term = nlp(str).docs.flat().find(t => t.normal === word)
  return term ? term.tags : new Set()
}

// [sentence, word, expected tag, forbidden tag]
const arr = [
  // between a determiner and its noun, these describe the noun
  ['the only way', 'only', 'Adjective', 'Adverb'],
  ['the only way', 'way', 'Noun', 'Verb'],
  ['an only child', 'only', 'Adjective', 'Adverb'],
  ['an only child', 'child', 'Noun', 'Verb'],
  ['my only hope is gone', 'only', 'Adjective', 'Adverb'],
  ['my only hope is gone', 'hope', 'Noun', 'Verb'],
  ['my very existence', 'very', 'Adjective', 'Adverb'],
  ['the very idea', 'very', 'Adjective', 'Adverb'],
  ['the very idea', 'idea', 'Noun', 'Verb'],
  ['the further escalation', 'further', 'Adjective', 'Adverb'],
  ['the further details', 'further', 'Adjective', 'Adverb'],
  // elsewhere they are adverbs
  ['he only wants one', 'only', 'Adverb', 'Adjective'],
  ['this only works sometimes', 'only', 'Adverb', 'Adjective'],
  ['this only works sometimes', 'works', 'PresentTense', 'Noun'],
  ['it is very good', 'very', 'Adverb', 'Adjective'],
  ['the very best', 'very', 'Adverb', 'Adjective'],
  ['the very first time', 'very', 'Adverb', 'Adjective'],
  ['we walked further', 'further', 'Adverb', 'Adjective'],
  ['the further we go', 'further', 'Adverb', 'Adjective'],
]

test('adverbs that describe a noun', function (t) {
  arr.forEach(([str, word, tag, not]) => {
    const tags = tagsOf(str, word)
    t.ok(tags.has(tag), here + `${str} - ${word} #${tag}`)
    t.notOk(tags.has(not), here + `${str} - ${word} not #${not}`)
  })
  t.end()
})

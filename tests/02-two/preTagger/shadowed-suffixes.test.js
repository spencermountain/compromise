import test from 'tape'
import nlp from '../lib.js'
const here = '[two/preTagger/shadowed-suffixes] '

const tagsOf = (str, word) => {
  const term = nlp(str).docs.flat().find(t => t.normal === word)
  return term ? term.tags : new Set()
}

// [sentence, word, expected tag, forbidden tag]
const arr = [
  // doubled-consonant -ly words are adjectives
  ['a wobbly table', 'wobbly', 'Adjective', 'Adverb'],
  ['a wobbly table', 'table', 'Noun', 'Verb'],
  ['a grizzly bear', 'grizzly', 'Adjective', 'Adverb'],
  ['a grizzly bear', 'bear', 'Noun', 'Verb'],
  ['the bubbly drink', 'bubbly', 'Adjective', 'Adverb'],
  ['a drizzly day', 'drizzly', 'Adjective', 'Adverb'],
  // other -ly words are still adverbs
  ['he walked quickly', 'quickly', 'Adverb', 'Adjective'],
  ['it is really good', 'really', 'Adverb', 'Adjective'],
  // common words, not airport codes
  ['he was in the den', 'den', 'Noun', 'Place'],
  ['he slept in his den', 'den', 'Noun', 'Place'],
  ['lax security', 'lax', 'Adjective', 'Place'],
  // places are not disturbed
  ['we went to Las Vegas', 'vegas', 'Place', 'Verb'],
  ['we flew to London', 'london', 'Place', 'Verb'],
]

test('shadowed suffix rules', function (t) {
  arr.forEach(([str, word, tag, not]) => {
    const tags = tagsOf(str, word)
    t.ok(tags.has(tag), here + `${str} - ${word} #${tag}`)
    t.notOk(tags.has(not), here + `${str} - ${word} not #${not}`)
  })
  t.end()
})

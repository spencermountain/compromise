import test from 'tape'
import nlp from '../lib.js'
const here = '[two/preTagger/suffix-mistags] '

// the term's tags, without match-syntax normalization getting in the way
const tagsOf = (str, word) => {
  const term = nlp(str).docs.flat().find(t => t.text.toLowerCase() === word)
  return term ? term.tags : new Set()
}

// [sentence, word, expected tag, forbidden tag]
const nouns = [
  ['he learned a lesson', 'lesson', 'Singular', 'Person'],
  ['it is a good lesson', 'lesson', 'Singular', 'Person'],
  ['my wrist hurts', 'wrist', 'Singular', 'Actor'],
  ['put it in the fridge', 'fridge', 'Singular', 'Place'],
  ['a bowl of porridge', 'porridge', 'Singular', 'Place'],
  ['a printer cartridge', 'cartridge', 'Singular', 'Place'],
  ['watch the preview', 'preview', 'Singular', 'Place'],
  ['his worldview is narrow', 'worldview', 'Singular', 'Place'],
  ['the action scenes are good', 'scenes', 'Plural', 'Verb'],
  ['two small planes landed', 'planes', 'Plural', 'Verb'],
  ['lakes and rivers', 'lakes', 'Plural', 'Verb'],
  ['some earthquakes', 'earthquakes', 'Plural', 'Verb'],
  ['we ate pancakes', 'pancakes', 'Plural', 'Verb'],
  ['jump over the spikes', 'spikes', 'Plural', 'Verb'],
  ['many difficult tasks', 'tasks', 'Plural', 'Verb'],
  ['small doses of it', 'doses', 'Plural', 'Verb'],
  ['the old pirates', 'pirates', 'Plural', 'Verb'],
  ['the pit bull terrier is old', 'terrier', 'Singular', 'Comparative'],
  ['the king and his courtier', 'courtier', 'Actor', 'Comparative'],
  ['the town crier', 'crier', 'Actor', 'Comparative'],
  ['the vizier of egypt', 'vizier', 'Actor', 'Comparative'],
  ['i wore my khakis', 'khakis', 'Plural', 'Person'],
  ["it is 3 o'clock", "o'clock", 'Noun', 'Person'],
  ['i ate at mcdonalds', 'mcdonalds', 'Organization', 'Person'],
  ['it cost 10 zł', 'zł', 'Currency', 'Verb'],
  ['it cost 100 руб', 'руб', 'Currency', 'Verb'],
]

const pronouns = [
  ['the book is yours', 'yours', 'Pronoun', 'Plural'],
  ['the book is hers', 'hers', 'Pronoun', 'Plural'],
  ['the book is theirs', 'theirs', 'Pronoun', 'Plural'],
]

const adjectives = [
  ['many unknown causes', 'unknown', 'Adjective', 'Verb'],
  ['entirely unknown causes', 'unknown', 'Adjective', 'Verb'],
  ['it was previously unknown to us', 'unknown', 'Adjective', 'Verb'],
]

// nearby readings that these fixes must not disturb
const contrasts = [
  ['he postpones it', 'postpones', 'PresentTense', 'Noun'],
  ['she condones it', 'condones', 'PresentTense', 'Noun'],
  ['he proposes a plan', 'proposes', 'PresentTense', 'Noun'],
  ['it exposes them', 'exposes', 'PresentTense', 'Noun'],
  ['she juxtaposes them', 'juxtaposes', 'PresentTense', 'Noun'],
  ['he revokes it', 'revokes', 'PresentTense', 'Noun'],
  ['the law evokes fear', 'evokes', 'PresentTense', 'Noun'],
  ['she chokes', 'chokes', 'PresentTense', 'Noun'],
  ['she is healthier', 'healthier', 'Comparative', 'Noun'],
  ['she is a chemist', 'chemist', 'Actor', 'Verb'],
  ['John McDonald left', 'mcdonald', 'LastName', 'Verb'],
  ["Conan O'Brien left", "o'brien", 'LastName', 'Verb'],
  ['he uncovered the plot', 'uncovered', 'PastTense', 'Adjective'],
  ['it was previously known to us', 'known', 'Verb', 'Noun'],
  ['fear of the unknown', 'unknown', 'Noun', 'Verb'],
]

test('suffix-rule mistags', function (t) {
  const all = [...nouns, ...pronouns, ...adjectives, ...contrasts]
  all.forEach(([str, word, tag, not]) => {
    const tags = tagsOf(str, word)
    t.ok(tags.has(tag), here + `${str} - #${tag}`)
    t.notOk(tags.has(not), here + `${str} - not #${not}`)
  })
  t.end()
})

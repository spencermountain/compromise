import test from 'tape'
import nlp from '../lib.js'
const here = '[two/preTagger/surname-suffixes] '

const tagsOf = (str, word) => {
  const term = nlp(str).docs.flat().find(t => t.normal === word)
  return term ? term.tags : new Set()
}

// capitalized mid-sentence, sentence-first, lowercase, and possessive
const surnames = [
  ['i saw Novakovic today', 'novakovic'],
  ['we met Medvedev in march', 'medvedev'],
  ['a book by Asimov', 'asimov'],
  ['i spoke to Valdez yesterday', 'valdez'],
  ['the film by Rasmussen', 'rasmussen'],
  ['a letter to Virtanen', 'virtanen'],
  ['she beat Ivanova in the final', 'ivanova'],
  ['i saw Johansson today', 'johansson'],
  ['i saw Yushchenko today', 'yushchenko'],
  ['Hernandez was late', 'hernandez'],
  ['i saw novakovic', 'novakovic'],
  ["we read Medvedev's speech", "medvedev's"],
]

// [sentence, word, expected tag]
const exceptions = [
  ['the Civic Center', 'civic', 'ProperNoun'],
  ['a civic duty', 'civic', 'Adjective'],
  ['the slavic languages', 'slavic', 'Adjective'],
  ['a pelvic injury', 'pelvic', 'Adjective'],
  ['the Suez canal', 'suez', 'Place'],
  ['he lives in Natchez', 'natchez', 'City'],
  ['a laissez faire attitude', 'laissez', 'Adjective'],
  ['a linen shirt', 'linen', 'Noun'],
  ['the bright nova', 'nova', 'Noun'],
  ['a distant supernova', 'supernova', 'Noun'],
  ['he is a casanova', 'casanova', 'Noun'],
  ['new lederhosen', 'lederhosen', 'Noun'],
  ['the lead dev quit', 'dev', 'Noun'],
  ['the Negev desert', 'negev', 'Place'],
  ['he lives in Essen', 'essen', 'City'],
  ['he lives in Kirov', 'kirov', 'City'],
  ['he lives in Rostov', 'rostov', 'City'],
  ['it will loosen', 'loosen', 'Verb'],
  ['she has chosen', 'chosen', 'Verb'],
]

// abbreviations stay honorifics
const honorifics = [
  ['Rev. Smith spoke', 'rev', 'Honorific'],
  ['Gov. Smith spoke', 'gov', 'Honorific'],
]

test('surname suffixes', function (t) {
  surnames.forEach(([str, word]) => {
    t.ok(tagsOf(str, word).has('LastName'), here + `${str} - #LastName`)
  })
  ;[...exceptions, ...honorifics].forEach(([str, word, tag]) => {
    const tags = tagsOf(str, word)
    t.ok(tags.has(tag), here + `${str} - #${tag}`)
    t.notOk(tags.has('LastName'), here + `${str} - not #LastName`)
  })
  t.end()
})

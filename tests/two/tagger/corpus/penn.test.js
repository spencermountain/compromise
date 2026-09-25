import test from 'tape'
import nlp from '../../_lib.js'
import penn from './penn-sample.js'
const here = '[two/penn] '

const softMapping = {
  CC: 'Conjunction',
  CD: 'Cardinal',
  DT: 'Determiner',
  EX: 'There', //existential 'there'
  FW: 'Expression',
  IN: 'Preposition',
  JJ: 'Adjective',
  JJR: 'Comparative',
  JJS: 'Superlative',
  MD: 'Modal',
  NN: 'Noun',
  NNS: 'Noun', //'Plural',
  NNP: 'Noun',
  NNPS: 'Noun',
  POS: 'Possessive',
  PRP: 'Pronoun',
  PRP$: 'Possessive',
  RB: 'Adverb',
  RP: 'Verb', //phrasal particle
  RBR: 'Comparative',
  RBS: 'Superlative',
  TO: 'Conjunction',
  UH: 'Expression',
  VB: 'Verb',
  VBD: 'Verb',
  VBG: 'Gerund',
  VBN: 'Verb', // past participle
  VBP: 'Verb', // non-3rd person singular present
  VBZ: 'Verb', // 3rd person singular present
  WDT: 'Determiner',
  WP: 'Pronoun',
  WP$: 'Possessive',
  WRB: 'Adverb',
  PDT: 'Noun', //predeterminer
  SYM: 'Noun', //symbol
  NFP: 'Noun', //
}

test('pennTreebank-test:', function (t) {
  const all = []
  penn.forEach((sentence, index) => {
    sentence.tags = sentence.tags.split(', ')

    const doc = nlp(sentence.text)
    let isPerfect = true
    let msg = `'` + sentence.text.substring(0, 55) + `..   -  `

    const terms = doc.json()[0].terms
    if (doc.length !== 1) {
      isPerfect = false
      msg = 'one sentence #' + index
    }
    if (terms.length !== sentence.tags.length) {
      isPerfect = false
      msg = 'tokenize: '
      msg += sentence.text.substring(0, 100)
    }
    // t.equal(doc.length, 1, 'one sentence #' + index)
    // t.equal(terms.length, sentence.tags.length, 'tokenize#' + index)

    for (let i = 0; i < sentence.tags.length; i++) {
      const want = softMapping[sentence.tags[i]]
      terms[i] = terms[i] || { tags: [] }
      // Penn's DT includes standalone demonstratives, which compromise now
      // distinguishes as pronouns. Keep ordinary determiners strict.
      const demonstrative = sentence.tags[i] === 'DT' && /^(this|that|these|those)(['’]s)?$/i.test(terms[i].text)
      // Penn IN includes both prepositions and subordinating conjunctions.
      // Its relative WDT "that" is also a clause linker in our tagset.
      const clauseLinker = sentence.tags[i] === 'IN' || (sentence.tags[i] === 'WDT' && /^that$/i.test(terms[i].text))
      const found = terms[i].tags.some(tag => tag === want || (demonstrative && tag === 'Pronoun') || (clauseLinker && tag === 'Conjunction'))
      if (!found) {
        isPerfect = false
        msg += `'${terms[i].text}' no #${want}`
        break
      }
    }
    if (!isPerfect) {
      all.push(sentence.text)
    }
    t.ok(isPerfect, here + msg)
  })
  t.end()
  // console.log(all)
})

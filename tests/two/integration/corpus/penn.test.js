import test from 'tape'
import nlp from '../../_lib.js'
import penn from './penn-sample.js'
const here = '[two/integration/corpus/penn] '

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
  penn.forEach((sentence, index) => {
    const expectedTags = sentence.tags.split(', ')

    const doc = nlp(sentence.text)
    let isPerfect = true
    let msg = `'` + sentence.text.substring(0, 55) + `..   -  `

    const terms = doc.json()[0].terms
    if (doc.length !== 1) {
      isPerfect = false
      msg = 'one sentence #' + index
    }
    if (terms.length !== expectedTags.length) {
      isPerfect = false
      msg = 'tokenize: '
      msg += sentence.text.substring(0, 100)
    }

    for (let i = 0; i < expectedTags.length; i++) {
      const want = softMapping[expectedTags[i]]
      const term = terms[i] || { tags: [] }
      // Penn's DT includes standalone demonstratives, which compromise now
      // distinguishes as pronouns. Keep ordinary determiners strict.
      const demonstrative = expectedTags[i] === 'DT' && /^(this|that|these|those)(['’]s)?$/i.test(term.text)
      // Penn IN includes both prepositions and subordinating conjunctions.
      // Its relative WDT "that" is also a clause linker in our tagset.
      const clauseLinker = expectedTags[i] === 'IN' || (expectedTags[i] === 'WDT' && /^that$/i.test(term.text))
      const found = term.tags.some(tag => tag === want || (demonstrative && tag === 'Pronoun') || (clauseLinker && tag === 'Conjunction'))
      if (!found) {
        isPerfect = false
        msg += `'${term.text}' no #${want}`
        break
      }
    }
    t.ok(isPerfect, here + msg)
  })
  t.end()
})

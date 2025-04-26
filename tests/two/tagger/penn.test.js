import test from 'tape'
import nlp from '../_lib.js'
import penn from './_pennSample.js'
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
    let perfect = true
    let msg = `'` + sentence.text.substring(0, 55) + `..   -  `

    const terms = doc.json()[0].terms
    if (doc.length !== 1) {
      perfect = false
      msg = 'one sentence #' + index
    }
    if (terms.length !== sentence.tags.length) {
      perfect = false
      msg = 'tokenize: '
      msg += sentence.text.substring(0, 100)
    }
    // t.equal(doc.length, 1, 'one sentence #' + index)
    // t.equal(terms.length, sentence.tags.length, 'tokenize#' + index)

    for (let i = 0; i < sentence.tags.length; i++) {
      const want = softMapping[sentence.tags[i]]
      terms[i] = terms[i] || { tags: [] }
      const found = terms[i].tags.some(tag => tag === want)
      if (!found) {
        perfect = false
        msg += `'${terms[i].text}' no #${want}`
        break
      }
    }
    if (!perfect) {
      all.push(sentence.text)
    }
    t.ok(perfect, here + msg)
  })
  t.end()
  // console.log(all)
})

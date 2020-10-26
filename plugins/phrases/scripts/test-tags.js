const nlp = require('../../../src')
let data = require('../data/smaller-tags.json')
// console.log(data[42])

const mapping = {
  CC: 'Conjunction',
  CD: 'Cardinal',
  DT: 'Determiner',
  EX: 'Noun', //'there'
  FW: 'Expression',
  IN: 'Preposition',
  JJ: 'Adjective',
  JJR: 'Comparative',
  JJS: 'Superlative',
  MD: 'Verb',
  NN: 'Noun',
  NNS: 'Noun',
  NNP: 'Noun',
  NNPS: 'Noun',
  POS: 'Possessive',
  PRP: 'Pronoun',
  PRP$: 'Pronoun',
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
  WP$: 'Noun',
  WRB: 'Adverb',
  PDT: 'Noun', //predeterminer
  SYM: 'Noun', //symbol
  NFP: 'Noun', //
}

let rights = []
let haveno = {}
let right = 0
let wrong = 0
// data = data.slice(0, 20)
data.forEach(a => {
  let out = nlp(a[0]).json(0).terms
  let wrongs = a[1].filter((tag, i) => {
    out[i] = out[i] || {}
    tag = mapping[tag]
    if ((out[i].tags || []).includes(tag) !== true) {
      console.log(out[i].text, tag, out[i].tags)
      return true
    }
    return false
  })
  if (wrongs.length === 0) {
    right += 1
    rights.push({
      text: a[0],
      tags: a[1].join(', '),
    })
  } else {
    wrong += 1
  }
})
// console.log('right:', right)
// console.log('wrong', wrong)

console.log(JSON.stringify(rights, null, 2))

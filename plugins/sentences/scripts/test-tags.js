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
  WP: 'QuestionWord',
  WP$: 'QuestionWord',
  WRB: 'Adverb',
  PDT: 'Noun', //predeterminer
  SYM: 'Noun', //symbol
  NFP: 'Noun', //
}

const topk = function (arr) {
  let obj = {}
  arr.forEach(a => {
    obj[a] = obj[a] || 0
    obj[a] += 1
  })
  let res = Object.keys(obj).map(k => [k, obj[k]])
  return res.sort((a, b) => (a[1] > b[1] ? -1 : 0))
}

let rights = []
let wrongs = []
let haveno = {}
let right = 0
let wrong = 0
// data = data.slice(0, 20)
data.forEach(a => {
  let out = nlp(a[0]).json(0).terms
  let word = null
  let want = null
  let errors = a[1].filter((tag, i) => {
    out[i] = out[i] || {}
    tag = mapping[tag]
    if ((out[i].tags || []).includes(tag) !== true) {
      // console.log(out[i].text, tag, out[i].tags)
      word = out[i].text
      want = tag
      return true
    }
    return false
  })
  if (errors.length === 0) {
    right += 1
    rights.push({
      text: a[0],
      tags: a[1].join(', '),
    })
  } else {
    wrong += 1
    wrongs.push({ text: a[0], word: word, want: want })
  }
})
console.log('right:', right)
console.log('wrong', wrong)

// let byTag = topk(wrongs.map(o => o.want))
wrongs = wrongs.filter(o => o.want === 'Adverb')
let byWord = topk(wrongs.map(o => o.word))
// wrongs = wrongs.filter(o => o.word === 'fun')

// console.log(JSON.stringify(wrongs, null, 2))
// console.log(JSON.stringify(byTag, null, 2))
console.log(JSON.stringify(byWord, null, 2))
// console.log(JSON.stringify(wrongs.length, null, 2))

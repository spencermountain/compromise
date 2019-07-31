var test = require('tape')
var nlp = require('../_lib')
var penn = require('../_pennSample')

var softMapping = {
  CC: 'Conjunction',
  CD: 'Cardinal',
  DT: 'Determiner',
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
}

test('pennTreebank-test:', function(t) {
  penn.forEach((sentence, index) => {
    sentence.tags = sentence.tags.split(', ')

    let doc = nlp(sentence.text)
    t.equal(doc.length, 1, 'one sentence #' + index)
    let terms = doc.json()[0]
    t.equal(terms.length, sentence.tags.length, 'tokenize#' + index)

    for (var i = 0; i < sentence.tags.length; i++) {
      var want = softMapping[sentence.tags[i]]
      let found = terms[i].tags.some(tag => tag === want)
      let msg = `'` + sentence.text.substr(0, 20) + `'..   -  `
      msg += `'${terms[i].text}' missing #${want}`
      t.equal(found, true, msg)
    }
    // t.ok(equal, msg + ' - "' + sentence.text + '"')
  })
  t.end()
})

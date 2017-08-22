var test = require('tape')
var nlp = require('../lib/nlp')
var penn = require('../lib/pennSample')

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
  VBG: 'Verb',
  VBN: 'Verb', // past participle
  VBP: 'Verb', // non-3rd person singular present
  VBZ: 'Verb', // 3rd person singular present
  WDT: 'Determiner',
  WP: 'Pronoun',
  WP$: 'Noun',
  WRB: 'Adverb'
}

test('pennTreebank-test:', function(t) {
  penn.forEach((o, index) => {
    var terms = nlp(o.text).terms()
    o.pos = o.pos.split(', ')
    t.equal(terms.length, o.pos.length, 'tokenize#' + index)

    var equal = true
    var msg = ''
    for (var i = 0; i < o.pos.length; i++) {
      var want = softMapping[o.pos[i]]
      var term = terms.list[i].terms[0]
      if (!term.tags[want]) {
        equal = false
        msg += " - '" + term.normal + "' " + want
        break
      }
    }
    t.ok(equal, msg + ' - "' + o.text + '"')
  })
  t.end()
})

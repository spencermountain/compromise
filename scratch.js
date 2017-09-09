'use strict'
var nlp = require('./src/index')
// nlp.verbose('tagger');

let plugin = {
  words: {},
  tags: {},
  regex: {},
  conjugations: {
    wook: {
      past: 'wooked',
      present: 'wooks'
    }
  },
  plurals: {
    snail: 'snailii'
  }
}

nlp.addRegex({
  aaa: 'Exaggeration'
})
let doc = nlp('wook').tag('Infinitive')
doc.debug()

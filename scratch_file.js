'use strict';
//this file is not included in the build.
//use it for messing around.
const nlp = require('./src/index');
// const Term = require('./src/term');
// const corpus = require('nlp-corpus');
// const nlp = require('./builds/nlp_compromise');

// require('./src/logger').enable();
const context = {
  lexicon: {
    'donkey kong': 'Person',
    march: 'Person'
  }
};
// var m = nlp('aasdf2').unTag('Noun').unTag('NounPhrase');
// m.tag('FemaleName');
// m.check()
// m.unTag('Noun');
// m.check()

let m = nlp('if it is raining, the driveway is wet')
  // m = m.remove('#ConditionPhrase+')
m.remove('#ConditionPhrase+').check()

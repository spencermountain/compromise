'use strict';

//some prepositions are clumped onto the back of a verb "looked for", "looks at"
//they should be combined with the verb, sometimes.
//does not handle seperated phrasal verbs ('take the coat off' -> 'take off')
const phrasals = require('../../../data/phrasal_verbs');

//combine ['blew','up'] -> 'blew up'
let phrasal_verbs = function(terms) {
  for(let i = 0; i < terms.length - 1; i++) {
    if (!terms[i] || !terms[i + 1]) {
      break;
    }
    if (terms[i].pos['Verb'] && phrasals[terms[i].normal + terms[i + 1].normal]) {
      //don't do 'is in'
      if (terms[i].pos['Copula']) {
        continue;
      }
      terms[i].pos['Phrasal'] = true;
      terms[i].text = terms[i].text + ' ' + terms[i + 1].text;
      terms[i].reason = 'phrasal(' + terms[i].reason + ')';
      terms[i + 1] = null;
      terms[i].rebuild();
    // terms[i].conjugate();
    }
  }
  //remove killed-off ones
  terms = terms.filter(function(t) {
    return t !== null;
  });
  return terms;
};

module.exports = phrasal_verbs;

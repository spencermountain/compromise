'use strict';

//boolean if sentence has

// "[copula] [pastTense] by"
// "[pastParticiple] by"
const passive_voice = function(s) {
  let terms = s.terms;
  for (let i = 0; i < terms.length - 2; i++) {
    if (terms[i].pos['Copula'] && terms[i + 1].pos['Verb'] && terms[i + 2].normal === 'by') {
      //don't do 'june was approaching by then'
      if (terms[i + 1].pos['Gerund']) {
        continue;
      }
      return true;
    }
  }
  return false;
};

module.exports = passive_voice;

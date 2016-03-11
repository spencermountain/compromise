'use strict';
//turns 'is not' into "isn't", and "he is" into "he's"
const contractor = {
  'will': 'll',
  'would': 'd',
  'have': 've',
  'are': 're',
  'not': 't',
  'is': 's'
// 'was': 's' //this is too folksy
};

const contract = function(terms) {
  for(let i = 1; i < terms.length; i++) {
    if (contractor[terms[i].normal]) {
      //remember expansion
      terms[i - 1].expansion = terms[i - 1].text;
      terms[i].expansion = terms[i].text;
      //handle special `n't` case
      if (terms[i].normal === 'not') {
        terms[i - 1].text += 'n';
      }
      terms[i - 1].text += `'` + contractor[terms[i].normal];
      terms[i - 1].rebuild();
      terms[i].text = '';
      terms[i].rebuild();
    }
  }
  return terms;
};

module.exports = contract;

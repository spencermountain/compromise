'use strict';

const expand = function(terms) {
  for(let i = 0; i < terms.length; i++) {
    if (terms[i].expansion) {
      terms[i].text = terms[i].expansion;
      terms[i].rebuild();
    }
  }
  return terms;
};

module.exports = expand;

'use strict';


const lookLeft = {
  Modal: 'Verb', // would foo..
  Determiner: 'Noun', // the foo
  Possessive: 'Noun', // spencer's foo
  Copula: 'Adjective' // is foo
}
//reads backwards
const lookRight = {
  Preposition: 'Verb', // foo for..
  Determiner: 'Verb', // foo the..
}

//for unknown terms, look left + right first
const neighbour_step = function(s) {
  for (let i = 0; i < s.terms.length; i++) {
    //is it still unknown?
    let tags = Object.keys(s.terms[i].pos);
    if (tags.length === 0) {
      if (s.terms[i - 1]) {

      }
    }
  }
  return s;
};

module.exports = neighbour_step;

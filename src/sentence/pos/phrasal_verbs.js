'use strict';

//some prepositions are clumped onto the back of a verb "looked for", "looks at"
//they should be combined with the verb, sometimes.
//does not handle seperated phrasal verbs ('take the coat off' -> 'take off')


let particles = ['in', 'out', 'on', 'off', 'behind', 'way', 'with', 'of', 'do', 'away', 'across', 'ahead', 'back', 'over', 'under', 'together', 'apart', 'up', 'upon', 'aback', 'down', 'about', 'before', 'after', 'around', 'to', 'forth', 'round', 'through', 'along', 'onto'];
particles = particles.reduce(function (h, s) {
  h[s] = true;
  return h;
}, {});

//combine ['blew','up'] -> 'blew up'
let phrasal_verbs = function(terms) {
  for(let i = 0; i < terms.length - 1; i++) {
    if (terms[i] && terms[i].pos['Verb'] && particles[terms[i + 1].normal]) {
      //don't do 'is in'
      if (terms[i].pos['Copula']) {
        continue;
      }
      terms[i].text = terms[i].text + ' ' + terms[i + 1].text;
      terms[i].reason = 'phrasal(' + terms[i].reason + ')';
      terms[i + 1] = null;
      terms[i].normalize();
      terms[i].conjugate();
    }
  }
  //remove killed-off ones
  terms = terms.filter(function(t) {
    return t !== null;
  });
  return terms;
};

module.exports = phrasal_verbs;

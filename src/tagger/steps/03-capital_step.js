'use strict';
//titlecase is a signal for a noun

const capital_logic = function (s) {
  //(ignore first word)
  for (let i = 1; i < s.terms.length; i++) {
    let t = s.terms[i];
    //has a capital, but isn't too weird.
    if (t.tags.TitleCase && t.isWord()) {
      t.tag('Noun', 'capital-step');
      t.tag('TitleCase', 'capital-step');
    }
  }
  //support first-word of sentence as proper titlecase
  let t = s.terms[0];
  if (t && t.tags.TitleCase) {
    if (t.tags.Person || t.tags.Organization || t.tags.Place) {
      t.tag('TitleCase', 'first-term-capital');
    }
  }
  return s;
};

module.exports = capital_logic;

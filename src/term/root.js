'use strict';
//
const rootForm = function(term) {
  let str = term.normal || term.silent_term || '';
  //plural
  // if (term.tag.Plural) {
  // str = term.noun.Singular() || str;
  // }
  str = str.replace(/'s\b/, '');
  str = str.replace(/'\b/, '');
  term.root = str;
};

module.exports = rootForm;

'use strict';
//
const rootForm = function(term) {
  let str = term.normal || term.silent_term || '';
  //handle apostrophes and stuff (go further than normalize())
  str = str.replace(/'s\b/, '');
  str = str.replace(/'$/, '');
  term.root = str;
};

module.exports = rootForm;

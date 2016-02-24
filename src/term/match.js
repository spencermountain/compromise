'use strict';
const fns = require('../fns.js');

//a regex-like string search
// returns a boolean for match/not
const match = function(term, str, options) {
  //wildcard
  if (str === '*') {
    return true;
  }
  //a regular string-match
  if (term.normal === str || term.text === str || term.root === str) {
    return true;
  }
  //declare a POS-match like term '[Noun]'
  let bracketed = str.match(/^\[(.*?)\]$/);
  if (bracketed) {
    //a pos match
    let pos = fns.titlecase(bracketed[1]);
    if (term.pos[pos]) {
      return true;
    }
    return false;
  }
  //declare a list-match like term '(a|an)'
  let listed = str.match(/^\((.*?)\)$/);
  if (listed) {
    let list = listed[1].split('|');
    for(let i = 0; i < list.length; i++) {
      if (list[i] === term.normal || list[i] === term.text || list[i] === term.root) {
        return true;
      }
    }
    return false;
  }
  return false;
};

module.exports = match;

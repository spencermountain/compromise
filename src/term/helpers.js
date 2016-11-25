'use strict';
const Term = require('./index');
const fns = require('./paths').fns;

module.exports = {
  makeTerm: (str, t) => {
    let c = fns.copy(t.context);
    let index = t.term.index();
    let s = t.parent;

    let term = new Term(str, c);
    //create the proper whitespace for this term
    if (index === s.arr.length - 1) {
      term.whitespace.before = ' ';
    } else {
      term.whitespace.before = ' ';
    }
    return term;
  }
};

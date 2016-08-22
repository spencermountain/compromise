'use strict';
const Term = require('./term');
const fns = require('../fns');

module.exports = {
  makeTerm: (str, t) => {
    let c = fns.copy(t.context);
    let index = t.info('index');
    let s = t.context.sentence;

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

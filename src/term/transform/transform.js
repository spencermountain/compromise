'use strict';
//supported Sentence.to() methods
const normalize = require('./normalize');
module.exports = {

  normal(term) {
    term.text = normalize(term.text);
    return term;
  }

};

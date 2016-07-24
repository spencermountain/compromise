'use strict';
const fns = require('../../log/fns');
//supported Sentence.return() methods
module.exports = {
  text: (t) => {
    return t.sentences.reduce((str, s) => {
      str += s.as('text');
      return str;
    }, '');
  },
  normal: (t) => {
    return t.sentences.reduce((str, s) => {
      str += s.as('normal') + ' ';
      return str;
    }, '');
  },
  tags: (t) => {
    return t.sentences.map((s) => {
      return s.as('tags');
    });
  },
  html: (t) => {
    return t.sentences.reduce((str, s) => {
      return str + s.render('html') + '\n'
    }, '')
  },
  prettyprint: (t) => {
    t.sentences.forEach((s) => {
      console.log(' ');
      s.terms.forEach((term) => {
        let niceTags = Object.keys(term.pos).filter((tag) => tag !== 'Term').join(', ');
        let title = '"' + term.text + '"';
        let silent = '';
        if (term.silent_term) {
          silent = '  [' + term.silent_term + ']';
        }
        silent = fns.rightPad(silent, 15);
        console.log(fns.rightPad('   ' + title, 12) + silent + '- ' + niceTags);
      });
    });
  }
};

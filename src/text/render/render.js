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
  printTags: (t) => {
    t.sentences.forEach((s) => {
      console.log(' ');
      s.as('tags').forEach((tag) => {
        let niceTags = tag.tags.map((w) => w).join(', ');
        console.log(fns.rightPad('   "' + tag.normal + '"', 15) + '- ' + niceTags);
      });
    });
  }
};

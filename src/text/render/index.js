'use strict';
const chalk = require('chalk');

//supported Sentence.return() methods
module.exports = {
  text: (t) => {
    return t.sentences.reduce((str, s) => {
      str += s.render('text');
      return str;
    }, '');
  },
  normal: (t) => {
    return t.sentences.reduce((str, s) => {
      str += s.render('normal') + ' ';
      return str;
    }, '');
  },
  tags: (t) => {
    return t.sentences.map((s) => {
      return s.render('tags');
    });
  },
  html: (t) => {
    return t.sentences.reduce((str, s) => {
      return str + s.render('html') + '\n'
    }, '')
  },
  pretty: (t) => {
    console.log('\n\n')
    t.sentences.forEach((s) => {
      s.render('pretty')
      console.log('   ' + chalk.cyan('-----------'));
    });
  }
};

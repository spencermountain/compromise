'use strict';
const renderHtml = require('./renderHtml');
const chalk = require('chalk');
const paths = require('../paths');
const log = paths.log;
const fns = paths.fns;

const colors = {
  Noun: chalk.cyan,
  Verb: chalk.magenta,
  Adjective: chalk.yellow,
  Adverb: chalk.red,
};

//supported Sentence.return() methods
module.exports = {
  /** a pixel-perfect reproduction of the input, with whitespace preserved */
  text: (t) => {
    return t.whitespace.before + t.text + t.whitespace.after;
  },
  /** a lowercased, punctuation-cleaned, whitespace-trimmed version of the word */
  normal: (t) => {
    return t.normal;
  },
  /** the &encoded term in a span element, with POS as classNames */
  html: (t) => {
    return renderHtml(t);
  },
  /** a simplified response for Part-of-Speech tagging*/
  tags: (t) => {
    return {
      text: t.text,
      normal: t.render('normal'),
      tags: Object.keys(t.tag)
    };
  },
  /** check-print information for the console */
  check: (t) => {
    let tags = Object.keys(t.tag).map((tag) => {
      if (colors[tag]) {
        return colors[tag](tag);
      }
      return tag;
    }).join(', ');
    let word = t.text;
    word = '\'' + chalk.green(word || '-') + '\'';
    let silent = '';
    if (t.silent_term) {
      silent = '[' + t.silent_term + ']';
    }
    // word += fns.leftPad(silent, 10);
    word = fns.leftPad(word, 25);
    word += fns.leftPad(silent, 10);
    // word = fns.leftPad(word, 32);
    // word = fns.rightPad(word, 28);
    console.log('   ' + word + '   ' + '     - ' + tags);
  }
};

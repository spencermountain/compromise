'use strict';
const renderHtml = require('./renderHtml');
const chalk = require('chalk');
const log = require('../../log');
const fns = require('../../log/fns');

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
      tags: Object.keys(t.pos)
    }
  },
  /** pretty-print information for the console */
  pretty: (term) => {
    let niceTags = Object.keys(term.pos).map((tag) => log.pos(tag)).join(', ');
    niceTags = fns.rightPad(niceTags, 40)
    let title = '\'' + term.text + '\'';
    let silent = '';
    if (term.silent_term) {
      silent = '  [' + term.silent_term + ']';
    }
    silent = fns.rightPad(silent, 6);
    let reason = chalk.green('  - ' + (term.context.reason || ''))
    let msg = fns.rightPad('   ' + title, 20) + silent + '  ' + niceTags + reason
    console.log(msg)
  }
};

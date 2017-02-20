'use strict';
const renderHtml = require('./renderHtml');
const fns = require('../../paths').fns;

const methods = {
  /** a pixel-perfect reproduction of the input, with whitespace preserved */
  text: function(r) {
    return r.whitespace.before + r._text + r.whitespace.after;
  },
  /** a lowercased, punctuation-cleaned, whitespace-trimmed version of the word */
  normal: function(r) {
    return r.normal;
  },
  /** even-more normalized than normal */
  root: function(r) {
    return r.root || r.normal;
  },
  /** the &encoded term in a span element, with POS as classNames */
  html: function(r) {
    return renderHtml(r);
  },
  /** a simplified response for Part-of-Speech tagging*/
  tags: function(r) {
    return {
      text: r.text,
      normal: r.normal,
      tags: Object.keys(r.tag)
    };
  },
  /** check-print information for the console */
  debug: function(r) {
    let tags = Object.keys(r.tag).map((tag) => {
      return fns.printTag(tag);
    }).join(', ');
    let word = r.text;
    // word = r.whitespace.before + word + r.whitespace.after;
    word = '\'' + fns.yellow(word || '-') + '\'';
    if (r.dirty) {
      // word += fns.red('*');
    }
    let silent = '';
    if (r.silent_term) {
      silent = '[' + r.silent_term + ']';
    }
    word = fns.leftPad(word, 25);
    word += fns.leftPad(silent, 5);
    console.log('   ' + word + '   ' + '     - ' + tags);
  }
};

const addMethods = (Term) => {
  //hook them into result.proto
  Term.prototype.out = function(fn) {
    if (!methods[fn]) {
      fn = 'text';
    }
    return methods[fn](this);
  };
  return Term;
};

module.exports = addMethods;

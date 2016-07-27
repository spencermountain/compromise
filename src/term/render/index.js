'use strict';

const renderHtml = require('./renderHtml');

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
  }
};

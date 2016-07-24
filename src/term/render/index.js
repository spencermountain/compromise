'use strict';

const renderHtml = require('./renderHtml');

//supported Sentence.return() methods
module.exports = {
  text: (t) => {
    return t.whitespace.before + t.text + t.whitespace.after;
  },
  normal: (t) => {
    return t.normal;
  },
  html: (t) => {
    return renderHtml(t);
  }
};

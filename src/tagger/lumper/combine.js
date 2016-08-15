'use strict';
const Term = require('../../term/term');
const log = require('../paths').log;
const path = 'tagger/combine';
//merge two term objects.. carefully

const combine = function(s, i) {
  let a = s._terms[i];
  let b = s._terms[i + 1];
  if (!b) {
    return;
  }
  log.tell('--combining: "' + a.normal + '"+"' + b.normal + '"', path);
  let text = a.whitespace.before + a.text + a.whitespace.after;
  text += b.whitespace.before + b.text + b.whitespace.after;
  s._terms[i] = new Term(text, a.context);
  s._terms[i + 1] = null;
  s._terms = s._terms.filter((t) => t !== null);
  return;
};

module.exports = combine;

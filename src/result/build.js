'use strict';
const Text = require('./index');
const tokenize = require('./tokenize');
const p = require('./paths');
const Terms = p.Terms;
const fns = p.fns;
const normalize = require('../term/methods/normalize/normalize').normalize;

//basically really dirty and stupid.
const normalizeLex = function(lex) {
  lex = lex || {};
  return Object.keys(lex).reduce((h, k) => {
    //add natural form
    h[k] = lex[k];
    let normal = normalize(k);
    //remove periods
    //normalize whitesace
    normal = normal.replace(/\s+/, ' ');
    //remove sentence-punctuaion too
    normal = normal.replace(/[.\?\!]/g, '');
    if (k !== normal) {
      //add it too
      h[normal] = lex[k];
    }
    return h;
  }, {});
};

const fromString = (str, lexicon) => {
  let sentences = [];
  //allow pre-tokenized input
  if (fns.isArray(str)) {
    sentences = str;
  } else {
    str = fns.ensureString(str);
    sentences = tokenize(str);
  }
  //make sure lexicon obeys standards
  lexicon = normalizeLex(lexicon);
  let list = sentences.map((s) => Terms.fromString(s, lexicon));

  let r = new Text(list, lexicon);
  //give each ts a ref to the result
  r.list.forEach((ts) => {
    ts.refText = r;
  });
  return r;
};
module.exports = fromString;

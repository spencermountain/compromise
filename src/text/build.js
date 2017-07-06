'use strict';
const Text = require('./index');
const tokenize = require('./tokenize');
const paths = require('./paths');
const Terms = paths.Terms;
const fns = paths.fns;
const normalize = require('../term/methods/normalize/normalize').normalize;
const unpackLex = require('../lexicon/unpack');
const firstWords = require('../lexicon/firstWords');
const buildUp = require('../lexicon/buildUp');

//basically really dirty and stupid.
const normalizeLex = function(lex) {
  lex = lex || {};
  return Object.keys(lex).reduce((h, k) => {
    let normal = normalize(k);
    //remove periods
    //normalize whitesace
    normal = normal.replace(/\s+/, ' ');
    //remove sentence-punctuaion too
    normal = normal.replace(/[.\?\!]/g, '');
    h[normal] = lex[k];
    return h;
  }, {});
};

//basically really dirty and stupid.
const handleLexicon = function(lex) {
  if (!lex) {
    return null;
  }
  if (typeof lex === 'string') {
    lex = unpackLex(lex);
  } else {
    lex = normalizeLex(lex);
  }
  lex = buildUp(lex);
  return {
    lexicon: lex,
    firstWords: firstWords(lex)
  };
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
  lexicon = handleLexicon(lexicon);
  let list = sentences.map(s => Terms.fromString(s, lexicon));

  let r = new Text(list, lexicon);
  //give each ts a ref to the result
  r.list.forEach(ts => {
    ts.refText = r;
  });
  return r;
};
module.exports = fromString;

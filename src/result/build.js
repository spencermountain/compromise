'use strict';
const Text = require('./index');
const tokenize = require('./tokenize');
const p = require('./paths');
const Terms = p.Terms;
const fns = p.fns;
const normalize = require('../term/methods/normalize/normalize').normalize;
const tagArr = require('../tags');


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

const extendTags = function(newTags) {
  console.log(newTags);
  console.log(tagArr);
};

const fromString = (str, lexicon, tagSet, skipTagging) => {

  let sentences = [];
  if (fns.isArray(str)) {
    sentences = str;
  } else {
    sentences = tokenize(str);
  }

  if (tagSet) {
    extendTags(tagSet);
  }

  //make sure lexicon obeys standards
  lexicon = normalizeLex(lexicon);
  let list = sentences.map((s) => Terms.fromString(s, lexicon, skipTagging));
  //extend tagset for this ref
  if (tagSet) {
    extendTags(tagSet);
  }

  let r = new Text(list, lexicon, null, tagSet);
  //give each ts a ref to the result
  r.list.forEach((ts) => {
    ts.refText = r;
  });
  return r;
};
module.exports = fromString;

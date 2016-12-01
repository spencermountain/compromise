'use strict';
const Text = require('./index');
const tokenize = require('./tokenize');
const corrections = require('./tag/corrections');
const tagPhrase = require('./tag/phrase');
const Terms = require('./paths').Terms

//build a new pos-tagged Result obj from a string
const fromString = (str, lexicon) => {
  let sentences = tokenize(str)
  let list = sentences.map((s) => Terms.fromString(s, lexicon))
  let r = new Text(list, lexicon)
    //give each ts a ref to the result
  r.list.forEach((ts) => {
    ts.parent = r;
  });
  r = corrections(r)
  r = tagPhrase(r)
  return r
}
module.exports = fromString

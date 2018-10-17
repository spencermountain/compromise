const checkLexicon = require('./01-lexicon');
const checkPunctuation = require('./02-punctuation');
const prefixLookup = require('./03-prefix');
const suffixLookup = require('./04-suffix');

//'lookups' look at a term by itself
const lookups = function(doc) {
  let terms = doc.termList();
  let world = doc.world;
  //our list of known-words
  checkLexicon(terms, world);
  //
  checkPunctuation(terms, world);
  return doc;
};
module.exports = lookups;

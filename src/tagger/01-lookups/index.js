const checkLexicon = require('./01-lexicon');
const checkRegex = require('./02-regex');
const checkPunctuation = require('./03-punctuation');
const checkEmoji = require('./04-emoji');

//'lookups' look at a term by itself
const lookups = function(doc) {
  let terms = doc.termList();
  let world = doc.world;
  //our list of known-words
  checkLexicon(terms, world);
  //maybe we can guess
  checkRegex(terms, world);
  //or maybe some helpful punctuation
  checkPunctuation(terms, world);
  // ¯\_(ツ)_/¯
  checkEmoji(terms, world);
  return doc;
};
module.exports = lookups;

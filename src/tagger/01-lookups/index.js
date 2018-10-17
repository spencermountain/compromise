const checkLexicon = require("./01-lexicon");

//
const lookups = function(doc) {
  //our list of known-words
  doc = checkLexicon(doc);
  return doc;
};
module.exports = lookups;

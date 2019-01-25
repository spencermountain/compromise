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

  //try these other methods
  for(let i = 0; i < terms.length; i += 1) {
    let term = terms[i];
    //don't overwrite existing tags
    // if (Object.keys(term.tags).length > 0) {
    //   continue;
    // }
    //maybe we can guess
    checkRegex(term, world);
    //or maybe some helpful punctuation
    checkPunctuation(terms, i, world);
    // ¯\_(ツ)_/¯
    checkEmoji(term, world);
  }
  return doc;
};
module.exports = lookups;

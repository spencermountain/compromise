const unpack = require('../world/unpack');
const buildOut = require('./buildOut');
const indexFirst = require('./firstWords');

//unpack a user-given lexicon
const unpackLex = function(pckd) {
  // console.log(pckd);
  let lex = unpack({
    words: pckd
  }).words;

  lex = buildOut(lex);

  //collect first-of-multi words for quicker lookup
  let firstWords = indexFirst(lex);

  return {
    lexicon: lex,
    firstWords: firstWords
  };
};

module.exports = unpackLex;

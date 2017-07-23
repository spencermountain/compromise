const efrt = require('efrt');
const buildOut = require('./buildOut');
const indexFirst = require('./firstWords');

//unpack a user-given lexicon
const unpackLex = function(pckd) {
  let lex = efrt.unpack(pckd);

  lex = buildOut(lex);

  //collect first-of-multi words for quicker lookup
  let firstWords = indexFirst(lex);

  return {
    lexicon: lex,
    firstWords: firstWords
  };
};

module.exports = unpackLex;

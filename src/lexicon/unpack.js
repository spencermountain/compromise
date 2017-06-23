const efrt = require('efrt');
const blastOut = require('./blastOut');
const indexFirst = require('./indexFirst');

//unpack a user-given lexicon
const unpackLex = function(pckd) {
  let lex = efrt.unpack(pckd);

  console.log(Object.keys(lex).length);
  lex = blastOut(lex);
  console.log(Object.keys(lex).length);

  //collect first-of-multi words for quicker lookup
  let firstWords = indexFirst(lex);

  return {
    lexicon: lex,
    firstWords: firstWords
  };
};

module.exports = unpackLex;

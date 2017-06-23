const fastConjugate = require('../result/subset/verbs/methods/conjugate/faster');

//inflect singulars, conjugate infinitives
const blastOut = function(lex) {
  let keys = Object.keys(lex);
  for (let i = 0; i < keys.length; i++) {
    let str = keys[i];

    //conjugate infinitives
    if (lex[str] === 'Infinitive') {
      const obj = fastConjugate(str);
      let tags = Object.keys(obj);
      for (var o = 0; o < tags.length; o++) {
        let tag = tags[o];
        lex[obj[tag]] = tag;
      }
    }
  }

  return lex;
};

module.exports = blastOut;

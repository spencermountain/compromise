const toPlural = require("../result/subset/nouns/methods/pluralize");
// const fastConjugate = require("../result/subset/verbs/methods/conjugate/faster");

//inflect singulars, conjugate infinitives
const buildOut = function(lex) {
  let keys = Object.keys(lex);
  for (let i = 0; i < keys.length; i++) {
    let str = keys[i];
    if (lex[str] === "Singular") {
      //inflect singulars
      lex[toPlural(str)] = "Plural";
    } else if (lex[str] === "Infinitive") {
      //conjugate infinitives
      // const obj = fastConjugate(str);
      // let tags = Object.keys(obj);
      // for (var o = 0; o < tags.length; o++) {
      //   let tag = tags[o];
      //   lex[obj[tag]] = tag;
      // }
    }
  }

  return lex;
};

module.exports = buildOut;

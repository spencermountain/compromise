//wrapper for Adjective's methods
var Adjective = function (str, sentence, word_i) {
  var the = this
  the.word = str || '';

  var to_comparative = require("./conjugate/to_comparative")
  var to_superlative = require("./conjugate/to_superlative")
  var adj_to_adv = require("./conjugate/to_adverb")
  var adj_to_noun = require("./conjugate/to_noun")
  var parts_of_speech = require("../../data/parts_of_speech")

  the.conjugate = function () {
    return {
      comparative: to_comparative(the.word),
      superlative: to_superlative(the.word),
      adverb: adj_to_adv(the.word),
      noun: adj_to_noun(the.word)
    }
  }

  the.which = (function () {
    if (the.word.match(/..est$/)) {
      return parts_of_speech['JJS']
    }
    if (the.word.match(/..er$/)) {
      return parts_of_speech['JJR']
    }
    return parts_of_speech['JJ']
  })()

  return the;
};
module.exports = Adjective;
// console.log(new Adjective("crazy"))

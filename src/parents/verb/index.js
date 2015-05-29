//wrapper for verb's methods
var Verb = function (str, sentence, word_i) {
  var the = this
  var token, next;
  if (sentence !== undefined && word_i !== undefined) {
    token = sentence.tokens[word_i]
    next = sentence.tokens[word_i + i]
  }
  the.word = str || '';

  var verb_conjugate = require("./conjugate/conjugate")
  var parts_of_speech = require("../../data/parts_of_speech")

  var copulas = {
    "is": "CP",
    "will be": "CP",
    "will": "CP",
    "are": "CP",
    "was": "CP",
    "were": "CP"
  }
  var modals = {
    "can": "MD",
    "may": "MD",
    "could": "MD",
    "might": "MD",
    "will": "MD",
    "ought to": "MD",
    "would": "MD",
    "must": "MD",
    "shall": "MD",
    "should": "MD"
  }
  var tenses = {
    past: "VBD",
    participle: "VBN",
    infinitive: "VBP",
    present: "VBZ",
    gerund: "VBG"
  }

  the.conjugate = function () {
    return verb_conjugate(the.word)
  }

  the.to_past = function () {
    if (the.form === "gerund") {
      return the.word
    }
    return verb_conjugate(the.word).past
  }

  the.to_present = function () {
    return verb_conjugate(the.word).present
  }

  the.to_future = function () {
    return "will " + verb_conjugate(the.word).infinitive
  }

  //which conjugation
  the.form = (function () {
    //don't choose infinitive if infinitive==present
    var order = [
      "past",
      "present",
      "gerund",
      "infinitive"
    ]
    var forms = verb_conjugate(the.word)
    for (var i = 0; i < order.length; i++) {
      if (forms[order[i]] === the.word) {
        return order[i]
      }
    }
  })()

  //past/present/future   //wahh?!
  the.tense = (function () {
    if (the.word.match(/\bwill\b/)) {
      return "future"
    }
    if (the.form === "present") {
      return "present"
    }
    if (the.form === "past") {
      return "past"
    }
    return "present"
  })()

  //the most accurate part_of_speech
  the.which = (function () {
    if (copulas[the.word]) {
      return parts_of_speech['CP']
    }
    if (the.word.match(/([aeiou][^aeiouwyrlm])ing$/)) {
      return parts_of_speech['VBG']
    }
    var form = the.form
    return parts_of_speech[tenses[form]]
  })()

  //is this verb negative already?
  the.negative = function () {
    if (the.word.match(/n't$/)) {
      return true
    }
    if ((modals[the.word] || copulas[the.word]) && next && next.normalised === "not") {
      return true
    }
    return false
  }

  return the;
}
module.exports = Verb;

// console.log(new Verb("will"))
// console.log(new Verb("stalking").tense)

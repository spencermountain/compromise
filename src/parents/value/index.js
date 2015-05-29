//wrapper for value's methods
var Value = function (str, sentence, word_i) {
  var the = this
  the.word = str || '';

  var to_number = require("./to_number")
  var date_extractor = require("./date_extractor")
  var parts_of_speech = require("../../data/parts_of_speech")

  the.date = function (options) {
    options = options || {}
    return date_extractor(the.word, options)
  }

  the.is_date = function () {
    var months = /(january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|aug|sept|oct|nov|dec)/i
    var times = /1?[0-9]:[0-9]{2}/
    var days = /\b(monday|tuesday|wednesday|thursday|friday|saturday|sunday|mon|tues|wed|thurs|fri|sat|sun)\b/i
    if (the.word.match(months) || the.word.match(times) || the.word.match(days)) {
      return true
    }
    return false
  }

  the.number = function () {
    if (the.is_date()) {
      return null
    }
    return to_number(the.word)
  }

  the.which = (function () {
    if (the.date()) {
      return parts_of_speech['DA']
    }
    if (the.number()) {
      return parts_of_speech['NU']
    }
    return parts_of_speech['CD']
  })()

  return the;
};
module.exports = Value;

// console.log(new Value("fifty five").number())
// console.log(new Value("june 5th 1998").date())

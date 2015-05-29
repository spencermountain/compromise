//Parents are classes for each main part of speech, with appropriate methods
//load files if server-side, otherwise assume these are prepended already
var Adjective = require("./adjective/index");
var Noun = require("./noun/index");
var Adverb = require("./adverb/index");
var Verb = require("./verb/index");
var Value = require("./value/index");

var parents = {
  adjective: function(str, next, last, token) {
    return new Adjective(str, next, last, token)
  },
  noun: function(str, next, last, token) {
    return new Noun(str, next, last, token)
  },
  adverb: function(str, next, last, token) {
    return new Adverb(str, next, last, token)
  },
  verb: function(str, next, last, token) {
    return new Verb(str, next, last, token)
  },
  value: function(str, next, last, token) {
    return new Value(str, next, last, token)
  },
  glue: function(str, next, last, token) {
    return {}
  }
}

module.exports = parents;

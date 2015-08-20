// import Verb = require("./verb/verb");
// import Term = require("./term/term")
import Sentence = require("./sentence/sentence");

var s = new Sentence("hello version two");
// let v = new Verb("walks");

s.tag();
console.log(s.syllables());

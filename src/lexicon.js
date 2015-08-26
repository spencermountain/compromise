//
"use strict";

let lexicon = require("./data/misc.js")

//add uncountable nouns
let uncountables = require("./data/uncountables.js")
for (let i = 0; i < uncountables.length; i++) {
  lexicon[uncountables[i]] = "NN"
}

//add irregular nouns
let irregular_nouns = require("./data/irregular_nouns.js")
for (let i = 0; i < irregular_nouns.length; i++) {
  lexicon[irregular_nouns[i][0]] = "NN"
  lexicon[irregular_nouns[i][1]] = "NNS"
}


console.log(lexicon)

module.exports = lexicon

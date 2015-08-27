//the lexicon is a big hash of words to pos tags
//it's built by conjugating and inflecting a small seed of terms
"use strict";
let fns = require("./fns.js")

let lexicon = {}

let addObj = function(obj) {
  let keys = Object.keys(obj)
  let l = keys.length
  for (let i = 0; i < l; i++) {
    lexicon[keys[i]] = obj[keys[i]]
  }
}

let addArr = function(arr, tag) {
  let l = arr.length
  for (let i = 0; i < l; i++) {
    lexicon[arr[i]] = tag
  }
}

addArr(require("./data/abbreviations.js"), "NNAB")
addArr(require("./data/adjectives.js"), "JJ")
addArr(require("./data/demonyms.js"), "JJ")
addArr(require("./data/honourifics.js"), "NNAB")
addArr(require("./data/uncountables.js"), "NN")
addArr(require("./data/values.js"), "CD")
addArr(require("./data/verbs.js"), "VB")
//a little fancy
addArr(Object.keys(require("./data/firstnames.js")), "NN")
//add irregular nouns
let irregNouns = require("./data/irregular_nouns.js")
addArr(fns.pluck(irregNouns, 0), "NN")
addArr(fns.pluck(irregNouns, 1), "NNS")

addObj(require("./data/misc.js"))
addObj(require("./data/multiples.js"))
addObj(require("./data/phrasal_verbs.js"))

// console.log(Object.keys(lexicon).length)
// console.log(lexicon)

module.exports = lexicon

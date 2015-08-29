//the lexicon is a big hash of words to pos tags
//it's built by conjugating and inflecting a small seed of terms
"use strict";
const fns = require("./fns.js");
const verb_conjugate = require("./term/verb/conjugate/conjugate.js");

const lexicon = {};

const addObj = function(obj) {
  const keys = Object.keys(obj);
  const l = keys.length;
  for (let i = 0; i < l; i++) {
    lexicon[keys[i]] = obj[keys[i]];
  }
};

const addArr = function(arr, tag) {
  const l = arr.length;
  for (let i = 0; i < l; i++) {
    lexicon[arr[i]] = tag;
  }
};

//conjugate all verbs.
const verbs = require("./data/verbs.js");
for (let i = 0; i < verbs.length; i++) {
  const c = verb_conjugate(verbs[i]);
  lexicon[c.infinitive] = "VBP";
  lexicon[c.past] = "VBD";
  lexicon[c.gerund] = "VBG";
  lexicon[c.present] = "VBZ";
  if (c.doer) {
    lexicon[c.doer] = "NNA";
  }
  if (c.participle) {
    lexicon[c.participle] = "VBN";
  }
}

addArr(require("./data/abbreviations.js"), "NNAB");
addArr(require("./data/adjectives.js"), "JJ");
addArr(require("./data/demonyms.js"), "JJ");
addArr(require("./data/honourifics.js"), "NNAB");
addArr(require("./data/uncountables.js"), "NN");
addArr(require("./data/dates.js"), "CD");
addArr(require("./data/numbers.js"), "CD");
//a little fancy
addArr(Object.keys(require("./data/firstnames.js")), "NN");
//add irregular nouns
const irregNouns = require("./data/irregular_nouns.js");
addArr(fns.pluck(irregNouns, 0), "NN");
addArr(fns.pluck(irregNouns, 1), "NNS");

addObj(require("./data/misc.js"));
addObj(require("./data/multiples.js"));
addObj(require("./data/phrasal_verbs.js"));

// console.log(Object.keys(lexicon).length)
// console.log(lexicon)

// console.log(lexicon['once again'] === "RB")
// console.log(lexicon['seven'] === "CD")
// console.log(lexicon['sleep'] === "VBP")
// console.log(lexicon['slept'] === "VBD")
// console.log(lexicon['sleeping'] === "VBG")
// console.log(lexicon['canadian'] === "JJ")
// console.log(lexicon['july'] === "CD")
// console.log(lexicon[null] === undefined)
// console.log(lexicon["dr"] === "NNAB")
// console.log(lexicon["sounds"] === "VBZ")
// console.log(lexicon["look after"] === "VBP")
// console.log(lexicon['tony'] === "NN")
// console.log(lexicon['loaf'] === "NN")
// console.log(lexicon['loaves'] === "NNS")
// console.log(lexicon['he'] === "PRP")

module.exports = lexicon;

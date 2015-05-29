//the lexicon is a large hash of words and their predicted part-of-speech.
// it plays a bootstrap-role in pos tagging in this library.
// to save space, most of the list is derived from conjugation methods,
// and other forms are stored in a compact way

var multiples = require("./lexicon/multiples")
var values = require("./lexicon/values")
var demonyms = require("./lexicon/demonyms")
var abbreviations = require("./lexicon/abbreviations")
var honourifics = require("./lexicon/honourifics")
var uncountables = require("./lexicon/uncountables")
var firstnames = require("./lexicon/firstnames")
var irregular_nouns = require("./lexicon/irregular_nouns")
  //verbs
var verbs = require("./lexicon/verbs")
var verb_conjugate = require("../parents/verb/conjugate/conjugate")
var verb_irregulars = require("../parents/verb/conjugate/verb_irregulars")
var phrasal_verbs = require("./lexicon/phrasal_verbs")

var adjectives = require("./lexicon/adjectives")
var adj_to_adv = require("../parents/adjective/conjugate/to_adverb")
var to_superlative = require("../parents/adjective/conjugate/to_superlative")
var to_comparative = require("../parents/adjective/conjugate/to_comparative")
var convertables = require("../parents/adjective/conjugate/convertables")

var main = {

  "etc": "FW", //foreign words
  "ie": "FW",

  "there": "EX",

  "better": "JJR",
  "earlier": "JJR",

  "has": "VB",
  "more": "RBR",

  "sounds": "VBZ"
}

var compact = {
    //conjunctions
    "CC": [
      "yet",
      "therefore",
      "or",
      "while",
      "nor",
      "whether",
      "though",
      "because",
      "but",
      "for",
      "and",
      "if",
      "however",
      "before",
      "although",
      "how",
      "plus",
      "versus",
      "not"
    ],

    "VBD": [
      "where'd",
      "when'd",
      "how'd",
      "what'd",
      "said",
      "had",
      "been",
      "began",
      "came",
      "did",
      "meant",
      "went"
    ],

    "VBN": [
      "given",
      "known",
      "shown",
      "seen",
      "born",
    ],

    "VBG": [
      "going",
      "being",
      "according",
      "resulting",
      "developing",
      "staining"
    ],

    //copula
    "CP": [
      "is",
      "will be",
      "are",
      "was",
      "were",
      "am",
      "isn't",
      "ain't",
      "aren't"
    ],

    //determiners
    "DT": [
      "this",
      "any",
      "enough",
      "each",
      "whatever",
      "every",
      "which",
      "these",
      "another",
      "plenty",
      "whichever",
      "neither",
      "an",
      "a",
      "least",
      "own",
      "few",
      "both",
      "those",
      "the",
      "that",
      "various",
      "what",
      "either",
      "much",
      "some",
      "else",
      "no",
      //some other languages (what could go wrong?)
      "la",
      "le",
      "les",
      "des",
      "de",
      "du",
      "el"
    ],

    //prepositions
    "IN": [
      "until",
      "onto",
      "of",
      "into",
      "out",
      "except",
      "across",
      "by",
      "between",
      "at",
      "down",
      "as",
      "from",
      "around",
      "with",
      "among",
      "upon",
      "amid",
      "to",
      "along",
      "since",
      "about",
      "off",
      "on",
      "within",
      "in",
      "during",
      "per",
      "without",
      "throughout",
      "through",
      "than",
      "via",
      "up",
      "unlike",
      "despite",
      "below",
      "unless",
      "towards",
      "besides",
      "after",
      "whereas",
      "'o",
      "amidst",
      "amongst",
      "apropos",
      "atop",
      "barring",
      "chez",
      "circa",
      "mid",
      "midst",
      "notwithstanding",
      "qua",
      "sans",
      "vis-a-vis",
      "thru",
      "till",
      "versus",
      "without",
      "w/o",
      "o'",
      "a'",
    ],

    //modal verbs
    "MD": [
      "can",
      "may",
      "could",
      "might",
      "will",
      "ought to",
      "would",
      "must",
      "shall",
      "should",
      "ought",
      "shouldn't",
      "wouldn't",
      "couldn't",
      "mustn't",
      "shan't",
      "shant",
      "lets", //arguable
      "who'd",
      "let's"
    ],

    //posessive pronouns
    "PP": [
      "mine",
      "something",
      "none",
      "anything",
      "anyone",
      "theirs",
      "himself",
      "ours",
      "his",
      "my",
      "their",
      "yours",
      "your",
      "our",
      "its",
      "nothing",
      "herself",
      "hers",
      "themselves",
      "everything",
      "myself",
      "itself",
      "her", //this one is pretty ambiguous
      "who",
      "whom",
      "whose"
    ],

    //personal pronouns (nouns)
    "PRP": [
      "it",
      "they",
      "i",
      "them",
      "you",
      "she",
      "me",
      "he",
      "him",
      "ourselves",
      "us",
      "we",
      "thou",
      "il",
      "elle",
      "yourself",
      "'em"
    ],

    //some manual adverbs (the rest are generated)
    "RB": [
      "now",
      "again",
      "already",
      "soon",
      "directly",
      "toward",
      "forever",
      "apart",
      "instead",
      "yes",
      "alone",
      "ago",
      "indeed",
      "ever",
      "quite",
      "perhaps",
      "where",
      "then",
      "here",
      "thus",
      "very",
      "often",
      "once",
      "never",
      "why",
      "when",
      "away",
      "always",
      "sometimes",
      "also",
      "maybe",
      "so",
      "just",
      "well",
      "several",
      "such",
      "randomly",
      "too",
      "rather",
      "abroad",
      "almost",
      "anyway",
      "twice",
      "aside",
      "moreover",
      "anymore",
      "newly",
      "damn",
      "somewhat",
      "somehow",
      "meanwhile",
      "hence",
      "further",
      "furthermore"
    ],

    //interjections
    "UH": [
      "uhh",
      "uh-oh",
      "ugh",
      "sheesh",
      "eww",
      "pff",
      "voila",
      "oy",
      "eep",
      "hurrah",
      "yuck",
      "ow",
      "duh",
      "oh",
      "hmm",
      "yeah",
      "whoa",
      "ooh",
      "whee",
      "ah",
      "bah",
      "gah",
      "yaa",
      "phew",
      "gee",
      "ahem",
      "eek",
      "meh",
      "yahoo",
      "oops",
      "d'oh",
      "psst",
      "argh",
      "grr",
      "nah",
      "shhh",
      "whew",
      "mmm",
      "yay",
      "uh-huh",
      "boo",
      "wow",
      "nope"
    ],

    //nouns that shouldnt be seen as a verb
    "NN": [
      "president",
      "dollar",
      "student",
      "patent",
      "funding",
      "morning",
      "banking",
      "ceiling",
      "energy",
      "secretary",
      "purpose",
      "friends",
      "event"
    ]
  }
  //unpack the compact terms into the main lexicon..
var i, arr;
var keys = Object.keys(compact)
var l = keys.length
for (i = 0; i < l; i++) {
  arr = compact[keys[i]]
  for (i2 = 0; i2 < arr.length; i2++) {
    main[arr[i2]] = keys[i];
  }
}

//add values
keys = Object.keys(values)
l = keys.length
for (i = 0; i < l; i++) {
  main[keys[i]] = "CD"
}

//add demonyms
l = demonyms.length
for (i = 0; i < l; i++) {
  main[demonyms[i]] = "JJ"
}

//add abbreviations
l = abbreviations.length
for (i = 0; i < l; i++) {
  main[abbreviations[i]] = "NNAB"
}

//add honourifics
l = honourifics.length
for (i = 0; i < l; i++) {
  main[honourifics[i]] = "NNAB"
}

//add uncountable nouns
l = uncountables.length
for (i = 0; i < l; i++) {
  main[uncountables[i]] = "NN"
}

//add irregular nouns
l = irregular_nouns.length
for (i = 0; i < l; i++) {
  main[irregular_nouns[i][0]] = "NN"
  main[irregular_nouns[i][1]] = "NNS"
}

//add firstnames
Object.keys(firstnames).forEach(function (k) {
  main[k] = "NNP"
})

//add multiple-word terms
Object.keys(multiples).forEach(function (k) {
  main[k] = multiples[k]
})

//add phrasal verbs
Object.keys(phrasal_verbs).forEach(function (k) {
  main[k] = phrasal_verbs[k]
})

//add verbs
//conjugate all verbs. takes ~8ms. triples the lexicon size.
var c;
l = verbs.length;
for (i = 0; i < l; i++) {
  //add conjugations
  c = verb_conjugate(verbs[i])
  main[c.infinitive] = main[c.infinitive] || "VBP"
  main[c.past] = main[c.past] || "VBD"
  main[c.gerund] = main[c.gerund] || "VBG"
  main[c.present] = main[c.present] || "VBZ"
  if (c.doer) {
    main[c.doer] = main[c.doer] || "NNA"
  }
  if (c.participle) {
    main[c.participle] = main[c.participle] || "VBN"
  }
}
//add irregular verbs
l = verb_irregulars.length;
for (i = 0; i < l; i++) {
  c = verb_irregulars[i]
  main[c.infinitive] = main[c.infinitive] || "VBP"
  main[c.gerund] = main[c.gerund] || "VBG"
  main[c.past] = main[c.past] || "VBD"
  main[c.present] = main[c.present] || "VBZ"
  if (c.doer) {
    main[c.doer] = main[c.doer] || "NNA"
  }
  if (c.participle) {
    main[c.future] = main[c.future] || "VB"
  }
}

//add adjectives
//conjugate all of these adjectives to their adverbs. (13ms)
var tmp, j;
l = adjectives.length;
for (i = 0; i < l; i++) {
  main[adjectives[i]] = "JJ"
}
keys = Object.keys(convertables)
l = keys.length;
for (i = 0; i < l; i++) {
  j = keys[i]
  main[j] = "JJ"
  //add adverb form
  tmp = adj_to_adv(j)
  if (tmp && tmp !== j && !main[tmp]) {
    main[tmp] = main[tmp] || "RB"
  }
  //add comparative form
  tmp = to_comparative(j)
  if (tmp && !tmp.match(/^more ./) && tmp !== j && !main[tmp]) {
    main[tmp] = main[tmp] || "JJR"
  }
  //add superlative form
  tmp = to_superlative(j)
  if (tmp && !tmp.match(/^most ./) && tmp !== j && !main[tmp]) {
    main[tmp] = main[tmp] || "JJS"
  }
}

module.exports = main;

// console.log(lexicon['once again']=="RB")
// console.log(lexicon['seven']=="CD")
// console.log(lexicon['sleep']=="VBP")
// console.log(lexicon['slept']=="VBD")
// console.log(lexicon['sleeping']=="VBG")
// // console.log(lexicon['completely'])
// console.log(lexicon['pretty']=="JJ")
// console.log(lexicon['canadian']=="JJ")
// console.log(lexicon['july']=="CD")
// console.log(lexicon[null]===undefined)
// console.log(lexicon["dr"]==="NNAB")
// console.log(lexicon["hope"]==="NN")
// console.log(lexicon["higher"]==="JJR")
// console.log(lexicon["earlier"]==="JJR")
// console.log(lexicon["larger"]==="JJR")
// console.log(lexicon["says"]==="VBZ")
// console.log(lexicon["sounds"]==="VBZ")
// console.log(lexicon["means"]==="VBZ")
// console.log(lexicon["look after"]==="VBP")

// console.log(Object.keys(lexicon).length)
// console.log(lexicon['prettier']=="JJR")
// console.log(lexicon['prettiest']=="JJS")
// console.log(lexicon['tony']=="NNP")
// console.log(lexicon['loaf']=="NN")
// console.log(lexicon['loaves']=="NNS")
// console.log(lexicon['he']=="PRP")

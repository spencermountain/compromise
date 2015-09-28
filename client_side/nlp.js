(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// nlp_comprimise by @spencermountain  in 2014
// most files are self-contained modules that optionally export for nodejs
// this file loads them all together
// if we're server-side, grab files, otherwise assume they're prepended already
// console.time('nlp_boot')

var parents = require("./src/parents/parents")

var sentence_parser = require('./src/methods/tokenization/sentence');
var tokenize = require('./src/methods/tokenization/tokenize');
var ngram = require('./src/methods/tokenization/ngram');

//tokenize
var normalize = require('./src/methods/transliteration/unicode_normalisation')
var syllables = require('./src/methods/syllables/syllable');

//localization
var americanize = require('./src/methods/localization/americanize')
var britishize = require('./src/methods/localization/britishize')

//part of speech tagging
var pos = require('./src/pos');

//named_entity_recognition
var spot = require('./src/spot');

///
// define the api
var nlp = {
  noun: parents.noun,
  adjective: parents.adjective,
  verb: parents.verb,
  adverb: parents.adverb,
  value: parents.value,

  sentences: sentence_parser,
  ngram: ngram,
  tokenize: tokenize,
  americanize: americanize,
  britishize: britishize,
  syllables: syllables,
  normalize: normalize.normalize,
  denormalize: normalize.denormalize,
  pos: pos,
  spot: spot
}

//export it for client-side
if (typeof window!=="undefined") { //is this right?
  window.nlp = nlp
}

//export it for server-side
module.exports = nlp;

// console.timeEnd('nlp_boot')
// console.log( nlp.pos('she sells seashells by the seashore').sentences[0].negate().text() )
// console.log( nlp.pos('i will slouch'));
// console.log( nlp.pos('Sally Davidson sells seashells by the seashore. Joe Biden said so.').people() )
// console.log(nlp.pos("Tony Danza is great. He works in the bank.").sentences[1].tokens[0].analysis.reference_to())
// console.log(nlp.pos("the FBI was hacked. He took their drugs.").sentences[1].tokens[2].analysis.reference_to())

},{"./src/methods/localization/americanize":17,"./src/methods/localization/britishize":18,"./src/methods/syllables/syllable":19,"./src/methods/tokenization/ngram":20,"./src/methods/tokenization/sentence":21,"./src/methods/tokenization/tokenize":22,"./src/methods/transliteration/unicode_normalisation":23,"./src/parents/parents":35,"./src/pos":45,"./src/spot":48}],2:[function(require,module,exports){
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

},{"../parents/adjective/conjugate/convertables":24,"../parents/adjective/conjugate/to_adverb":25,"../parents/adjective/conjugate/to_comparative":26,"../parents/adjective/conjugate/to_superlative":28,"../parents/verb/conjugate/conjugate":39,"../parents/verb/conjugate/verb_irregulars":42,"./lexicon/abbreviations":3,"./lexicon/adjectives":4,"./lexicon/demonyms":5,"./lexicon/firstnames":6,"./lexicon/honourifics":7,"./lexicon/irregular_nouns":8,"./lexicon/multiples":9,"./lexicon/phrasal_verbs":10,"./lexicon/uncountables":11,"./lexicon/values":12,"./lexicon/verbs":13}],3:[function(require,module,exports){
//these are common word shortenings used in the lexicon and sentence segmentation methods
//there are all nouns, or at the least, belong beside one.

var honourifics = require("./honourifics") //stored seperately, for 'noun.is_person()'

var main = [
    //common abbreviations
    "arc", "al", "ave", "blvd", "cl", "ct", "cres", "exp", "rd", "st", "dist", "mt", "fy", "hwy", "pd", "pl", "plz", "tce", "llb", "md", "bl", "ma", "ba", "lit",
    //place main
    "ala", "ariz", "ark", "cal", "calif", "col", "colo", "conn", "del", "fed", "fla", "fl", "ga", "ida", "ind", "ia", "la", "kan", "kans", "ken", "ky", "la", "md", "mich", "minn", "mont", "neb", "nebr", "nev", "okla", "penna", "penn", "pa", "dak", "tenn", "tex", "ut", "vt", "va", "wash", "wis", "wisc", "wy", "wyo", "usafa", "alta", "ont", "que", "sask", "yuk",
    //org main
    "dept", "univ", "assn", "bros", "inc", "ltd", "co", "corp",
    //proper nouns with exclamation marks
    "yahoo", "joomla", "jeopardy"
  ]
  //person titles like 'jr', (stored seperately)
main = main.concat(honourifics)

module.exports = main;

},{"./honourifics":7}],4:[function(require,module,exports){
//adjectives that either aren't covered by rules, or have superlative/comparative forms
//this list is the seed, from which various forms are conjugated
module.exports= [
    "colonial",
    "moody",
    "literal",
    "actual",
    "probable",
    "apparent",
    "usual",
    "aberrant",
    "ablaze",
    "able",
    "absolute",
    "aboard",
    "abrupt",
    "absent",
    "absorbing",
    "abundant",
    "accurate",
    "adult",
    "afraid",
    "agonizing",
    "ahead",
    "aloof",
    "amazing",
    "arbitrary",
    "arrogant",
    "asleep",
    "astonishing",
    "average",
    "awake",
    "aware",
    "awkward",
    "back",
    "bad",
    "bankrupt",
    "bawdy",
    "beneficial",
    "bent",
    "best",
    "better",
    "bizarre",
    "bloody",
    "bouncy",
    "brilliant",
    "broken",
    "burly",
    "busy",
    "cagey",
    "careful",
    "caring",
    "certain",
    "chief",
    "chilly",
    "civil",
    "clever",
    "closed",
    "cloudy",
    "colossal",
    "commercial",
    "common",
    "complete",
    "complex",
    "concerned",
    "concrete",
    "congruent",
    "constant",
    "cooing",
    "correct",
    "cowardly",
    "craven",
    "cuddly",
    "daily",
    "damaged",
    "damaging",
    "dapper",
    "dashing",
    "deadpan",
    "deeply",
    "defiant",
    "degenerate",
    "delicate",
    "delightful",
    "desperate",
    "determined",
    "didactic",
    "difficult",
    "discreet",
    "done",
    "double",
    "doubtful",
    "downtown",
    "dreary",
    "east",
    "eastern",
    "elderly",
    "elegant",
    "elfin",
    "elite",
    "eminent",
    "encouraging",
    "entire",
    "erect",
    "ethereal",
    "exact",
    "expert",
    "extra",
    "exuberant",
    "exultant",
    "false",
    "fancy",
    "faulty",
    "female",
    "fertile",
    "fierce ",
    "financial",
    "first",
    "fit",
    "fixed",
    "flagrant",
    "foamy",
    "foolish",
    "foregoing",
    "foreign",
    "former",
    "fortunate",
    "frantic",
    "freezing",
    "frequent",
    "fretful",
    "friendly",
    "fun",
    "furry",
    "future",
    "gainful",
    "gaudy",
    "giant",
    "giddy",
    "gigantic",
    "gleaming",
    "global",
    "gold",
    "gone",
    "good",
    "goofy",
    "graceful",
    "grateful",
    "gratis",
    "gray",
    "grey",
    "groovy",
    "gross",
    "guarded",
    "half",
    "handy",
    "hanging",
    "hateful",
    "heady",
    "heavenly",
    "hellish",
    "helpful",
    "hesitant",
    "highfalutin",
    "homely",
    "honest",
    "huge",
    "humdrum",
    "hurried",
    "hurt",
    "icy",
    "ignorant",
    "ill",
    "illegal",
    "immediate",
    "immense",
    "imminent",
    "impartial",
    "imperfect",
    "imported",
    "initial",
    "innate",
    "inner",
    "inside",
    "irate",
    "jolly",
    "juicy",
    "junior",
    "juvenile",
    "kaput",
    "kindly",
    "knowing",
    "labored",
    "languid",
    "latter",
    "learned",
    "left",
    "legal",
    "lethal",
    "level",
    "lewd",
    "likely",
    "literate",
    "lively",
    "living",
    "lonely",
    "longing",
    "loutish",
    "lovely",
    "loving",
    "lowly",
    "luxuriant",
    "lying",
    "macabre",
    "madly",
    "magenta",
    "main",
    "major",
    "makeshift",
    "male",
    "mammoth",
    "measly",
    "meaty",
    "medium",
    "mere",
    "middle",
    "miniature",
    "minor",
    "miscreant",
    "mobile",
    "moldy",
    "mute",
    "naive",
    "nearby",
    "necessary",
    "neighborly",
    "next",
    "nimble",
    "nonchalant",
    "nondescript",
    "nonstop",
    "north",
    "nosy",
    "obeisant",
    "obese",
    "obscene",
    "observant",
    "obsolete",
    "offbeat",
    "official",
    "ok",
    "open",
    "opposite",
    "organic",
    "outdoor",
    "outer",
    "outgoing",
    "oval",
    "over",
    "overall",
    "overt",
    "overweight",
    "overwrought",
    "painful",
    "past",
    "peaceful",
    "perfect",
    "petite",
    "picayune",
    "placid",
    "plant",
    "pleasant",
    "polite",
    "potential",
    "pregnant",
    "premium",
    "present",
    "pricey",
    "prickly",
    "primary",
    "prior",
    "private",
    "profuse",
    "proper",
    "public",
    "pumped",
    "puny",
    "quack",
    "quaint",
    "quickest",
    "rabid",
    "racial",
    "ready",
    "real",
    "rebel",
    "recondite",
    "redundant",
    "relevant",
    "remote",
    "resolute",
    "resonant",
    "right",
    "rightful",
    "ritzy",
    "robust",
    "romantic",
    "roomy",
    "rough",
    "royal",
    "salty",
    "same",
    "scary",
    "scientific",
    "screeching",
    "second",
    "secret",
    "secure",
    "sedate",
    "seemly",
    "selfish",
    "senior",
    "separate",
    "severe",
    "shiny",
    "shocking",
    "shut",
    "shy",
    "sick",
    "significant",
    "silly",
    "sincere",
    "single",
    "skinny",
    "slight",
    "slimy",
    "smelly",
    "snobbish",
    "social",
    "somber",
    "sordid",
    "sorry",
    "southern",
    "spare",
    "special",
    "specific",
    "spicy",
    "splendid",
    "squeamish",
    "standard",
    "standing",
    "steadfast",
    "steady",
    "stereotyped",
    "still",
    "striped",
    "stupid",
    "sturdy",
    "subdued",
    "subsequent",
    "substantial",
    "sudden",
    "super",
    "superb",
    "superficial",
    "supreme",
    "sure",
    "taboo",
    "tan",
    "tasteful",
    "tawdry",
    "telling",
    "temporary",
    "terrific",
    "tested",
    "thoughtful",
    "tidy",
    "tiny",
    "top",
    "torpid",
    "tranquil",
    "trite",
    "ugly",
    "ultra",
    "unbecoming",
    "understood",
    "uneven",
    "unfair",
    "unlikely",
    "unruly",
    "unsightly",
    "untidy",
    "unwritten",
    "upbeat",
    "upper",
    "uppity",
    "upset",
    "upstairs",
    "uptight",
    "used",
    "useful",
    "utter",
    "uttermost",
    "vagabond",
    "vanilla",
    "various",
    "vengeful",
    "verdant",
    "violet",
    "volatile",
    "wanting",
    "wary",
    "wasteful",
    "weary",
    "weekly",
    "welcome",
    "western",
    "whole",
    "wholesale",
    "wiry",
    "wistful",
    "womanly",
    "wooden",
    "woozy",
    "wound",
    "wrong",
    "wry",
    "zany",
    "sacred",
    "unknown",
    "detailed",
    "ongoing",
    "prominent",
    "permanent",
    "diverse",
    "partial",
    "moderate",
    "contemporary",
    "intense",
    "widespread",
    "ultimate",
    "ideal",
    "adequate",
    "sophisticated",
    "naked",
    "dominant",
    "precise",
    "intact",
    "adverse",
    "genuine",
    "subtle",
    "universal",
    "resistant",
    "routine",
    "distant",
    "unexpected",
    "soviet",
    "blind",
    "artificial",
    "mild",
    "legitimate",
    "unpublished",
    "superior",
    "intermediate",
    "everyday",
    "dumb",
    "excess",
    "sexy",
    "fake",
    "monthly",
    "premature",
    "sheer",
    "generic",
    "insane",
    "contrary",
    "twin",
    "upcoming",
    "bottom",
    "costly",
    "indirect",
    "sole",
    "unrelated",
    "hispanic",
    "improper",
    "underground",
    "legendary",
    "reluctant",
    "beloved",
    "inappropriate",
    "corrupt",
    "irrelevant",
    "justified",
    "obscure",
    "profound",
    "hostile",
    "influential",
    "inadequate",
    "abstract",
    "timely",
    "authentic",
    "bold",
    "intimate",
    "straightforward",
    "rival",
    "right-wing",
    "racist",
    "symbolic",
    "unprecedented",
    "loyal",
    "talented",
    "troubled",
    "noble",
    "instant",
    "incorrect",
    "dense",
    "blond",
    "deliberate",
    "blank",
    "rear",
    "feminine",
    "apt",
    "stark",
    "alcoholic",
    "teenage",
    "vibrant",
    "humble",
    "vain",
    "covert",
    "bland",
    "trendy",
    "foul",
    "populist",
    "alarming",
    "hooked",
    "wicked",
    "deaf",
    "left-wing",
    "lousy",
    "malignant",
    "stylish",
    "upscale",
    "hourly",
    "refreshing",
    "cozy",
    "slick",
    "dire",
    "yearly",
    "inbred",
    "part-time",
    "finite",
    "backwards",
    "nightly",
    "unauthorized",
    "cheesy",
    "indoor",
    "surreal",
    "bald",
    "masculine",
    "shady",
    "spirited",
    "eerie",
    "horrific",
    "smug",
    "stern",
    "hefty",
    "savvy",
    "bogus",
    "elaborate",
    "gloomy",
    "pristine",
    "extravagant",
    "serene",
    "advanced",
    "perverse",
    "devout",
    "crisp",
    "rosy",
    "slender",
    "melancholy",
    "faux",
    "phony",
    "danish",
    "lofty",
    "nuanced",
    "lax",
    "adept",
    "barren",
    "shameful",
    "sleek",
    "solemn",
    "vacant",
    "dishonest",
    "brisk",
    "fluent",
    "insecure",
    "humid",
    "menacing",
    "moot",
    "soothing",
    "self-loathing",
    "far-reaching",
    "harrowing",
    "scathing",
    "perplexing",
    "calming",
    "unconvincing",
    "unsuspecting",
    "unassuming",
    "surprising",
    "unappealing",
    "vexing",
    "unending",
    "easygoing",
    "appetizing",
    "disgruntled",
    "retarded",
    "undecided",
    "unregulated",
    "unsupervised",
    "unrecognized",
    "crazed",
    "distressed",
    "jagged",
    "paralleled",
    "cramped",
    "warped",
    "antiquated",
    "fabled",
    "deranged",
    "diseased",
    "ragged",
    "intoxicated",
    "hallowed",
    "crowded",
    "ghastly",
    "disorderly",
    "saintly",
    "wily",
    "sly",
    "sprightly",
    "ghostly",
    "oily",
    "hilly",
    "grisly",
    "earthly",
    "friendly",
    "unwieldy",
    "many",
    "most",
    "last",
    "expected",
    "far",
    "due",
    "divine",
    "all",
    "together",
    "only",
    "outside",
    "multiple",
    "appropriate",
    "evil",
    "favorite",
    "limited",
    "random",
    "republican",
    "okay",
    "essential",
    "secondary",
    "gay",
    "south",
    "pro",
    "northern",
    "urban",
    "acute",
    "prime",
    "arab",
    "overnight",
    "mixed",
    "crucial",
    "behind",
    "above",
    "beyond",
    "against",
    "under",
    "other",
    "less"
  ]

},{}],5:[function(require,module,exports){
//adjectival forms of place names, as adjectives.
module.exports= [
    "afghan",
    "albanian",
    "algerian",
    "argentine",
    "armenian",
    "australian",
    "aussie",
    "austrian",
    "bangladeshi",
    "belgian",
    "bolivian",
    "bosnian",
    "brazilian",
    "bulgarian",
    "cambodian",
    "canadian",
    "chilean",
    "chinese",
    "colombian",
    "croat",
    "cuban",
    "czech",
    "dominican",
    "egyptian",
    "british",
    "estonian",
    "ethiopian",
    "finnish",
    "french",
    "gambian",
    "georgian",
    "german",
    "greek",
    "haitian",
    "hungarian",
    "indian",
    "indonesian",
    "iranian",
    "iraqi",
    "irish",
    "israeli",
    "italian",
    "jamaican",
    "japanese",
    "jordanian",
    "kenyan",
    "korean",
    "kuwaiti",
    "latvian",
    "lebanese",
    "liberian",
    "libyan",
    "lithuanian",
    "macedonian",
    "malaysian",
    "mexican",
    "mongolian",
    "moroccan",
    "dutch",
    "nicaraguan",
    "nigerian",
    "norwegian",
    "omani",
    "pakistani",
    "palestinian",
    "filipino",
    "polish",
    "portuguese",
    "qatari",
    "romanian",
    "russian",
    "rwandan",
    "samoan",
    "saudi",
    "scottish",
    "senegalese",
    "serbian",
    "singaporean",
    "slovak",
    "somali",
    "sudanese",
    "swedish",
    "swiss",
    "syrian",
    "taiwanese",
    "thai",
    "tunisian",
    "ugandan",
    "ukrainian",
    "american",
    "hindi",
    "spanish",
    "venezuelan",
    "vietnamese",
    "welsh",
    "african",
    "european",
    "asian",
    "californian",
  ]

},{}],6:[function(require,module,exports){
// common first-names in compressed form.
//from http://www.ssa.gov/oact/babynames/limits.html  and http://www.servicealberta.gov.ab.ca/pdf/vs/2001_Boys.pdf
//not sure what regional/cultural/demographic bias this has. Probably a lot.
// 73% of people are represented in the top 1000 names
//used to reduce redundant named-entities in longer text. (don't spot the same person twice.)
//used to identify gender for coreference resolution

var main = []

//an ad-hoc prefix encoding for names. 2ms decompression of names
var male_names = {
  "will": "iam,ie,ard,is,iams",
  "fred": ",erick,die,rick,dy",
  "marc": "us,,o,os,el",
  "darr": "ell,yl,en,el,in",
  "fran": "k,cis,cisco,klin,kie",
  "terr": "y,ance,ence,ell",
  "rand": "y,all,olph,al",
  "brad": "ley,,ford,y",
  "jeff": "rey,,ery,ry",
  "john": ",ny,nie,athan",
  "greg": "ory,,g,orio",
  "mar": "k,tin,vin,io,shall,ty,lon,lin",
  "car": "l,los,lton,roll,y,ey",
  "ken": "neth,,t,ny,dall,drick",
  "har": "old,ry,vey,ley,lan,rison",
  "ste": "ven,phen,ve,wart,phan,rling",
  "jer": "ry,emy,ome,emiah,maine,ald",
  "mic": "hael,heal,ah,key,hel",
  "dar": "yl,in,nell,win,ius",
  "dan": "iel,ny,,e",
  "wil": "bur,son,bert,fred,fredo",
  "ric": "hard,ky,ardo,k,key",
  "cli": "fford,nton,fton,nt,ff",
  "cla": "rence,ude,yton,rk,y",
  "ben": "jamin,,nie,ny,ito",
  "rod": "ney,erick,olfo,ger,",
  "rob": "ert,erto,bie,",
  "gar": "y,ry,rett,land",
  "sam": "uel,,my,mie",
  "and": "rew,re,y,res",
  "jos": "eph,e,hua,h",
  "joe": ",l,y,sph",
  "leo": "nard,n,,nardo",
  "tom": ",my,as,mie",
  "bry": "an,ant,ce,on",
  "ant": "hony,onio,oine,on",
  "jac": "k,ob,kson",
  "cha": "rles,d,rlie,se",
  "sha": "wn,ne,un",
  "bre": "nt,tt,ndan,t",
  "jes": "se,us,s",
  "al": "bert,an,len,fred,exander,ex,vin,lan,fredo,berto,ejandro,fonso,ton,,onzo,i,varo",
  "ro": "nald,ger,y,nnie,land,n,ss,osevelt,gelio,lando,man,cky,yce,scoe,ry",
  "de": "nnis,rek,an,rrick,lbert,vin,wey,xter,wayne,metrius,nis,smond",
  "ja": "mes,son,y,red,vier,ke,sper,mal,rrod",
  "el": "mer,lis,bert,ias,ijah,don,i,ton,liot,liott,vin,wood",
  "ma": "tthew,nuel,urice,thew,x,tt,lcolm,ck,son",
  "do": "nald,uglas,n,nnie,ug,minic,yle,mingo,minick",
  "er": "ic,nest,ik,nesto,ick,vin,nie,win",
  "ra": "ymond,lph,y,mon,fael,ul,miro,phael",
  "ed": "ward,win,die,gar,uardo,,mund,mond",
  "co": "rey,ry,dy,lin,nrad,rnelius",
  "le": "roy,wis,ster,land,vi",
  "lo": "uis,nnie,renzo,ren,well,uie,u,gan",
  "da": "vid,le,ve,mon,llas,mian,mien",
  "jo": "nathan,n,rge,rdan,nathon,aquin",
  "ru": "ssell,ben,dolph,dy,fus,ssel,sty",
  "ke": "vin,ith,lvin,rmit",
  "ar": "thur,nold,mando,turo,chie,mand",
  "re": "ginald,x,ynaldo,uben,ggie",
  "ge": "orge,rald,ne,rard,offrey,rardo",
  "la": "rry,wrence,nce,urence,mar,mont",
  "mo": "rris,ses,nte,ises,nty",
  "ju": "an,stin,lio,lian,lius,nior",
  "pe": "ter,dro,rry,te,rcy",
  "tr": "avis,oy,evor,ent",
  "he": "nry,rbert,rman,ctor,ath",
  "no": "rman,el,ah,lan,rbert",
  "em": "anuel,il,ilio,mett,manuel",
  "wa": "lter,yne,rren,llace,de",
  "mi": "ke,guel,lton,tchell,les",
  "sa": "lvador,lvatore,ntiago,ul,ntos",
  "ch": "ristopher,ris,ester,ristian,uck",
  "pa": "ul,trick,blo,t",
  "st": "anley,uart,an",
  "hu": "gh,bert,go,mberto",
  "br": "ian,uce,andon,ain",
  "vi": "ctor,ncent,rgil,cente",
  "ca": "lvin,meron,leb",
  "gu": "y,illermo,stavo",
  "lu": "is,ther,ke,cas",
  "gr": "ant,ady,over,aham",
  "ne": "il,lson,al,d",
  "t": "homas,imothy,odd,ony,heodore,im,yler,ed,yrone,aylor,erence,immy,oby,eddy,yson",
  "s": "cott,ean,idney,ergio,eth,pencer,herman,ylvester,imon,heldon,cotty,olomon",
  "r": "yan",
  "n": "icholas,athan,athaniel,ick,icolas",
  "a": "dam,aron,drian,ustin,ngelo,braham,mos,bel,gustin,ugust,dolfo",
  "b": "illy,obby,arry,ernard,ill,ob,yron,lake,ert,oyd,illie,laine,art,uddy,urton",
  "e": "ugene,arl,verett,nrique,van,arnest,frain,than,steban",
  "h": "oward,omer,orace,ans,al",
  "p": "hillip,hilip,reston,hil,ierre",
  "c": "raig,urtis,lyde,ecil,esar,edric,leveland,urt",
  "j": "immy,im,immie",
  "g": "lenn,ordon,len,ilbert,abriel,ilberto",
  "m": "elvin,yron,erle,urray",
  "k": "yle,arl,urt,irk,ristopher",
  "o": "scar,tis,liver,rlando,mar,wen,rville,tto",
  "l": "loyd,yle,ionel",
  "f": "loyd,ernando,elix,elipe,orrest,abian,idel",
  "w": "esley,endell,m,oodrow,inston",
  "d": "ustin,uane,wayne,wight,rew,ylan",
  "z": "achary",
  "v": "ernon,an,ance",
  "i": "an,van,saac,ra,rving,smael,gnacio,rvin",
  "q": "uentin,uinton",
  "x": "avier"
}
var female_names = {
  "mari": "a,e,lyn,an,anne,na,ssa,bel,sa,sol,tza",
  "kris": "ten,tin,tina,ti,tine,ty,ta,tie",
  "jean": "ette,ne,nette,nie,ine,nine",
  "chri": "stine,stina,sty,stie,sta,sti",
  "marg": "aret,ie,arita,uerite,ret,o",
  "ange": "la,lica,lina,lia,line",
  "fran": "ces,cine,cisca",
  "kath": "leen,erine,y,ryn,arine",
  "sher": "ry,ri,yl,i,rie",
  "caro": "l,lyn,line,le,lina",
  "dian": "e,a,ne,na",
  "jenn": "ifer,ie,y,a",
  "luci": "lle,a,nda,le",
  "kell": "y,i,ey,ie",
  "rosa": ",lie,lind",
  "jani": "ce,e,s,ne",
  "stac": "y,ey,ie,i",
  "shel": "ly,ley,ia",
  "laur": "a,en,ie,el",
  "trac": "y,ey,i,ie",
  "jane": "t,,lle,tte",
  "bett": "y,ie,e,ye",
  "rose": "mary,marie,tta",
  "joan": ",ne,n,na",
  "mar": "y,tha,jorie,cia,lene,sha,yann,cella,ta,la,cy,tina",
  "lor": "i,raine,etta,a,ena,ene,na,ie",
  "sha": "ron,nnon,ri,wna,nna,na,una",
  "dor": "othy,is,a,een,thy,othea",
  "cla": "ra,udia,ire,rice,udette",
  "eli": "zabeth,sa,sabeth,se,za",
  "kar": "en,la,a,i,in",
  "tam": "my,ara,i,mie,ika",
  "ann": "a,,e,ie,ette",
  "car": "men,rie,la,a,mela",
  "mel": "issa,anie,inda",
  "ali": "ce,cia,son,sha,sa",
  "bri": "ttany,dget,ttney,dgette",
  "lyn": "n,da,ne,ette",
  "del": "ores,la,ia,oris",
  "ter": "esa,ri,i",
  "son": "ia,ya,ja,dra",
  "deb": "orah,ra,bie,ora",
  "jac": "queline,kie,quelyn,lyn",
  "lat": "oya,asha,onya,isha",
  "che": "ryl,lsea,ri,rie",
  "vic": "toria,ki,kie,ky",
  "sus": "an,ie,anne,ana",
  "rob": "erta,yn",
  "est": "her,elle,ella,er",
  "lea": "h,,nne,nn",
  "lil": "lian,lie,a,y",
  "ma": "ureen,ttie,xine,bel,e,deline,ggie,mie,ble,ndy,ude,yra,nuela,vis,gdalena,tilda",
  "jo": "yce,sephine,,di,dy,hanna,sefina,sie,celyn,lene,ni,die",
  "be": "verly,rtha,atrice,rnice,th,ssie,cky,linda,ulah,rnadette,thany,tsy,atriz",
  "ca": "therine,thy,ssandra,ndace,ndice,mille,itlin,ssie,thleen,llie",
  "le": "slie,na,ona,ticia,igh,la,nora,ola,sley,ila",
  "el": "aine,len,eanor,sie,la,ena,oise,vira,sa,va,ma",
  "sa": "ndra,rah,ra,lly,mantha,brina,ndy,die,llie",
  "mi": "chelle,ldred,chele,nnie,riam,sty,ndy,randa,llie",
  "co": "nnie,lleen,nstance,urtney,ra,rinne,nsuelo,rnelia",
  "ju": "lie,dith,dy,lia,anita,ana,stine",
  "da": "wn,nielle,rlene,na,isy,rla,phne",
  "re": "becca,nee,na,bekah,ba",
  "al": "ma,lison,berta,exandra,yssa,ta",
  "ra": "chel,mona,chael,quel,chelle",
  "an": "drea,ita,a,gie,toinette,tonia",
  "ge": "raldine,rtrude,orgia,nevieve,orgina",
  "de": "nise,anna,siree,na,ana,e",
  "ja": "smine,na,yne",
  "lu": "cy,z,la,pe,ella,isa",
  "je": "ssica,nifer,well,ri",
  "ad": "a,rienne,die,ele,riana,eline",
  "pa": "tricia,mela,ula,uline,tsy,m,tty,ulette,tti,trice,trica,ige",
  "ke": "ndra,rri,isha,ri",
  "mo": "nica,lly,nique,na,llie",
  "lo": "uise,is,la",
  "he": "len,ather,idi,nrietta,lene,lena",
  "me": "gan,rcedes,redith,ghan,agan",
  "wi": "lma,lla,nnie",
  "ga": "il,yle,briela,brielle,le",
  "er": "in,ica,ika,ma,nestine",
  "ce": "cilia,lia,celia,leste,cile",
  "ka": "tie,y,trina,yla,te",
  "ol": "ga,ivia,lie,a",
  "li": "nda,sa,ndsay,ndsey,zzie",
  "na": "ncy,talie,omi,tasha,dine",
  "la": "verne,na,donna,ra",
  "vi": "rginia,vian,ola",
  "ha": "rriet,nnah",
  "pe": "ggy,arl,nny,tra",
  "br": "enda,andi,ooke",
  "ki": "mberly,m,mberley,rsten",
  "au": "drey,tumn,dra",
  "bo": "nnie,bbie,nita,bbi",
  "do": "nna,lores,lly,minique",
  "gl": "oria,adys,enda,enna",
  "tr": "icia,ina,isha,udy",
  "ta": "ra,nya,sha,bitha",
  "ro": "sie,xanne,chelle,nda",
  "am": "y,anda,ber,elia",
  "fa": "ye,nnie,y",
  "ni": "cole,na,chole,kki",
  "ve": "ronica,ra,lma,rna",
  "gr": "ace,etchen,aciela,acie",
  "b": "arbara,lanca,arbra,ianca",
  "r": "uth,ita,honda",
  "s": "hirley,tephanie,ylvia,heila,uzanne,ue,tella,ophia,ilvia,ophie,tefanie,heena,ummer,elma,ocorro,ybil,imone",
  "c": "ynthia,rystal,indy,harlene,ristina,leo",
  "e": "velyn,mily,dna,dith,thel,mma,va,ileen,unice,ula,ssie,ffie,tta,ugenia",
  "a": "shley,pril,gnes,rlene,imee,bigail,ida,bby,ileen",
  "t": "heresa,ina,iffany,helma,onya,oni,herese,onia",
  "i": "rene,da,rma,sabel,nez,ngrid,va,mogene,sabelle",
  "w": "anda,endy,hitney",
  "p": "hyllis,riscilla,olly",
  "n": "orma,ellie,ora,ettie,ell",
  "f": "lorence,elicia,lora,reda,ern,rieda",
  "v": "alerie,anessa",
  "j": "ill,illian",
  "y": "vonne,olanda,vette",
  "g": "ina,wendolyn,wen,oldie",
  "l": "ydia",
  "m": "yrtle,yra,uriel,yrna",
  "h": "ilda",
  "o": "pal,ra,felia",
  "k": "rystal",
  "d": "ixie,ina",
  "u": "rsula"
}
var ambiguous = [
  "casey",
  "jamie",
  "lee",
  "jaime",
  "jessie",
  "morgan",
  "rene",
  "robin",
  "devon",
  "kerry",
  "alexis",
  "guadalupe",
  "blair",
  "kasey",
  "jean",
  "marion",
  "aubrey",
  "shelby",
  "jan",
  "shea",
  "jade",
  "kenyatta",
  "kelsey",
  "shay",
  "lashawn",
  "trinity",
  "regan",
  "jammie",
  "cassidy",
  "cheyenne",
  "reagan",
  "shiloh",
  "marlo",
  "andra",
  "devan",
  "rosario",
  "lee"
]

var i, arr, i2, l, keys;
//add data into the main obj
//males
keys = Object.keys(male_names)
l = keys.length
for (i = 0; i < l; i++) {
  arr = male_names[keys[i]].split(',')
  for (i2 = 0; i2 < arr.length; i2++) {
    main[keys[i] + arr[i2]] = "m"
  }
}

//females
keys = Object.keys(female_names)
l = keys.length
for (i = 0; i < l; i++) {
  arr = female_names[keys[i]].split(',')
  for (i2 = 0; i2 < arr.length; i2++) {
    main[keys[i] + arr[i2]] = "f"
  }
}
//unisex names
l = ambiguous.length
for (i = 0; i < l; i += 1) {
  main[ambiguous[i]] = "a"
}

module.exports = main;

// console.log(firstnames['spencer'])
// console.log(firstnames['jill'])
// console.log(firstnames['sue'])
// console.log(firstnames['jan'])
// console.log(JSON.stringify(Object.keys(firstnames).length, null, 2));

},{}],7:[function(require,module,exports){
//these are common person titles used in the lexicon and sentence segmentation methods
//they are also used to identify that a noun is a person
  var main = [
    //honourifics
    "jr",
    "mr",
    "mrs",
    "ms",
    "dr",
    "prof",
    "sr",
    "sen",
    "corp",
    "rep",
    "gov",
    "atty",
    "supt",
    "det",
    "rev",
    "col",
    "gen",
    "lt",
    "cmdr",
    "adm",
    "capt",
    "sgt",
    "cpl",
    "maj",
    "miss",
    "misses",
    "mister",
    "sir",
    "esq",
    "mstr",
    "phd",
    "adj",
    "adv",
    "asst",
    "bldg",
    "brig",
    "comdr",
    "hon",
    "messrs",
    "mlle",
    "mme",
    "op",
    "ord",
    "pvt",
    "reps",
    "res",
    "sens",
    "sfc",
    "surg",
  ]

module.exports = main;

},{}],8:[function(require,module,exports){
//nouns with irregular plural/singular forms
//used in noun.inflect, and also in the lexicon.
//compressed with '_' to reduce some redundancy.
var main=[
    ["child", "_ren"],
    ["person", "people"],
    ["leaf", "leaves"],
    ["database", "_s"],
    ["quiz", "_zes"],
    ["child", "_ren"],
    ["stomach", "_s"],
    ["sex", "_es"],
    ["move", "_s"],
    ["shoe", "_s"],
    ["goose", "geese"],
    ["phenomenon", "phenomena"],
    ["barracks", "_"],
    ["deer", "_"],
    ["syllabus", "syllabi"],
    ["index", "indices"],
    ["appendix", "appendices"],
    ["criterion", "criteria"],
    ["man", "men"],
    ["sex", "_es"],
    ["rodeo", "_s"],
    ["epoch", "_s"],
    ["zero", "_s"],
    ["avocado", "_s"],
    ["halo", "_s"],
    ["tornado", "_s"],
    ["tuxedo", "_s"],
    ["sombrero", "_s"],
    ["addendum", "addenda"],
    ["alga", "_e"],
    ["alumna", "_e"],
    ["alumnus", "alumni"],
    ["bacillus", "bacilli"],
    ["cactus", "cacti"],
    ["beau", "_x"],
    ["château", "_x"],
    ["chateau", "_x"],
    ["tableau", "_x"],
    ["corpus", "corpora"],
    ["curriculum", "curricula"],
    ["echo", "_es"],
    ["embargo", "_es"],
    ["foot", "feet"],
    ["genus", "genera"],
    ["hippopotamus", "hippopotami"],
    ["larva", "_e"],
    ["libretto", "libretti"],
    ["loaf", "loaves"],
    ["matrix", "matrices"],
    ["memorandum", "memoranda"],
    ["mosquito", "_es"],
    ["opus", "opera"],
    ["ovum", "ova"],
    ["ox", "_en"],
    ["radius", "radii"],
    ["referendum", "referenda"],
    ["thief", "thieves"],
    ["tooth", "teeth"]
  ]

  main = main.map(function (a) {
    a[1] = a[1].replace('_', a[0])
    return a
  })

module.exports = main;

},{}],9:[function(require,module,exports){
//common terms that are multi-word, but one part-of-speech
//these should not include phrasal verbs, like 'looked out'. These are handled elsewhere.
module.exports = {
    "of course": "RB",
    "at least": "RB",
    "no longer": "RB",
    "sort of": "RB",
    "at first": "RB",
    "once again": "RB",
    "once more": "RB",
    "up to": "RB",
    "by now": "RB",
    "all but": "RB",
    "just about": "RB",
    "on board": "JJ",
    "a lot": "RB",
    "by far": "RB",
    "at best": "RB",
    "at large": "RB",
    "for good": "RB",
    "vice versa": "JJ",
    "en route": "JJ",
    "for sure": "RB",
    "upside down": "JJ",
    "at most": "RB",
    "per se": "RB",
    "at worst": "RB",
    "upwards of": "RB",
    "en masse": "RB",
    "point blank": "RB",
    "up front": "JJ",
    "in situ": "JJ",
    "in vitro": "JJ",
    "ad hoc": "JJ",
    "de facto": "JJ",
    "ad infinitum": "JJ",
    "ad nauseam": "RB",
    "for keeps": "JJ",
    "a priori": "FW",
    "et cetera": "FW",
    "off guard": "JJ",
    "spot on": "JJ",
    "ipso facto": "JJ",
    "not withstanding": "RB",
    "de jure": "RB",
    "a la": "IN",
    "ad hominem": "NN",
    "par excellence": "RB",
    "de trop": "RB",
    "a posteriori": "RB",
    "fed up": "JJ",
    "brand new": "JJ",
    "old fashioned": "JJ",
    "bona fide": "JJ",
    "well off": "JJ",
    "far off": "JJ",
    "straight forward": "JJ",
    "hard up": "JJ",
    "sui generis": "JJ",
    "en suite": "JJ",
    "avant garde": "JJ",
    "sans serif": "JJ",
    "gung ho": "JJ",
    "super duper": "JJ",
    "new york":"NN",
    "new england":"NN",
    "new hampshire":"NN",
    "new delhi":"NN",
    "new jersey":"NN",
    "new mexico":"NN",
    "united states":"NN",
    "united kingdom":"NN",
    "great britain":"NN",
    "head start":"NN"
  }

},{}],10:[function(require,module,exports){
//phrasal verbs are two words that really mean one verb.
//'beef up' is one verb, and not some direction of beefing.
//by @spencermountain, 2015 mit
//many credits to http://www.allmyphrasalverbs.com/
var verb_conjugate = require("../../parents/verb/conjugate/conjugate")

//start the list with some randoms
var main = [
  "be onto",
  "fall behind",
  "fall through",
  "fool with",
  "get across",
  "get along",
  "get at",
  "give way",
  "hear from",
  "hear of",
  "lash into",
  "make do",
  "run across",
  "set upon",
  "take aback",
  "keep from"
]

//if there's a phrasal verb "keep on", there's often a "keep off"
var opposites = {
  "away": "back",
  "in": "out",
  "on": "off",
  "over": "under",
  "together": "apart",
  "up": "down"
}

//forms that have in/out symmetry
var symmetric = {
  "away": "blow,bounce,bring,call,come,cut,drop,fire,get,give,go,keep,pass,put,run,send,shoot,switch,take,tie,throw",
  "in": "bang,barge,bash,beat,block,book,box,break,bring,burn,butt,carve,cash,check,come,cross,drop,fall,fence,fill,give,grow,hand,hang,head,jack,keep,leave,let,lock,log,move,opt,pack,peel,pull,put,rain,reach,ring,rub,send,set,settle,shut,sign,smash,snow,strike,take,try,turn,type,warm,wave,wean,wear,wheel",
  "on": "add,call,carry,catch,count,feed,get,give,go,grind,head,hold,keep,lay,log,pass,pop,power,put,send,show,snap,switch,take,tell,try,turn,wait",
  "over": "come,go,look,read,run,talk",
  "together": "come,pull,put",
  "up": "add,back,beat,bend,blow,boil,bottle,break,bring,buckle,bundle,call,carve,clean,cut,dress,fill,flag,fold,get,give,grind,grow,hang,hold,keep,let,load,lock,look,man,mark,melt,move,pack,pin,pipe,plump,pop,power,pull,put,rub,scale,scrape,send,set,settle,shake,show,sit,slow,smash,square,stand,strike,take,tear,tie,turn,use,wash,wind",
}
Object.keys(symmetric).forEach(function (k) {
  symmetric[k].split(',').forEach(function (s) {
    //add the given form
    main.push(s + " " + k)
    //add its opposite form
    main.push(s + " " + opposites[k])
  })
})

//forms that don't have in/out symmetry
var asymmetric = {
  "about": "bring,fool,gad,go,root",
  "after": "go,look,take",
  "ahead": "get,go,press",
  "along": "bring,move",
  "apart": "fall,take",
  "around": "ask,boss,bring,call,come,fool,get,horse,joke,lie,mess,play",
  "away": "back,carry,file,frighten,hide,wash",
  "back": "fall,fight,hit,hold,look,pay,stand,think",
  "by": "drop,get,go,stop,swear,swing,tick,zip",
  "down": "bog,calm,fall,hand,hunker,jot,knock,lie,narrow,note,pat,pour,run,tone,trickle,wear",
  "for": "fend,file,gun,hanker,root,shoot",
  "forth": "bring,come",
  "forward": "come,look",
  "in": "cave,chip,hone,jump,key,pencil,plug,rein,shade,sleep,stop,suck,tie,trade,tuck,usher,weigh,zero",
  "into": "look,run",
  "it": "go,have",
  "off": "auction,be,beat,blast,block,brush,burn,buzz,cast,cool,drop,end,face,fall,fend,frighten,goof,jack,kick,knock,laugh,level,live,make,mouth,nod,pair,pay,peel,read,reel,ring,rip,round,sail,shave,shoot,sleep,slice,split,square,stave,stop,storm,strike,tear,tee,tick,tip,top,walk,work,write",
  "on": "bank,bargain,egg,frown,hit,latch,pile,prattle,press,spring,spur,tack,urge,yammer",
  "out": "act,ask,back,bail,bear,black,blank,bleed,blow,blurt,branch,buy,cancel,cut,eat,edge,farm,figure,find,fill,find,fish,fizzle,flake,flame,flare,flesh,flip,geek,get,help,hide,hold,iron,knock,lash,level,listen,lose,luck,make,max,miss,nerd,pan,pass,pick,pig,point,print,psych,rat,read,rent,root,rule,run,scout,see,sell,shout,single,sit,smoke,sort,spell,splash,stamp,start,storm,straighten,suss,time,tire,top,trip,trot,wash,watch,weird,whip,wimp,wipe,work,zone,zonk",
  "over": "bend,bubble,do,fall,get,gloss,hold,keel,mull,pore,sleep,spill,think,tide,tip",
  "round": "get,go",
  "through": "go,run",
  "to": "keep,see",
  "up": "act,beef,board,bone,boot,brighten,build,buy,catch,cheer,cook,end,eye,face,fatten,feel,fess,finish,fire,firm,flame,flare,free,freeze,freshen,fry,fuel,gang,gear,goof,hack,ham,heat,hit,hole,hush,jazz,juice,lap,light,lighten,line,link,listen,live,loosen,make,mash,measure,mess,mix,mock,mop,muddle,open,own,pair,patch,pick,prop,psych,read,rough,rustle,save,shack,sign,size,slice,slip,snap,sober,spark,split,spruce,stack,start,stay,stir,stitch,straighten,string,suck,suit,sum,team,tee,think,tidy,tighten,toss,trade,trip,type,vacuum,wait,wake,warm,weigh,whip,wire,wise,word,write,zip",
}
Object.keys(asymmetric).forEach(function (k) {
  asymmetric[k].split(',').forEach(function (s) {
    main.push(s + " " + k)
  })
})

//at his point all verbs are infinitive. lets make this explicit.
main = main.reduce(function (h, s) {
  h[s] = "VBP"
  return h
}, {})

//conjugate every phrasal verb. takes ~30ms
var tags = {
  present: "VB",
  past: "VBD",
  future: "VBF",
  gerund: "VBG",
  infinitive: "VBP",
}
var cache = {} //cache individual verbs to speed it up
var split, verb, particle, phrasal;
Object.keys(main).forEach(function (s) {
  split = s.split(' ')
  verb = split[0]
  particle = split[1]
  if (cache[verb] === undefined) {
    cache[verb] = verb_conjugate(verb)
  }
  Object.keys(cache[verb]).forEach(function (k) {
    phrasal = cache[verb][k] + " " + particle
    main[phrasal] = tags[k]
  })
})

module.exports = main;
// console.log(JSON.stringify(phrasal_verbs, null, 2))

},{"../../parents/verb/conjugate/conjugate":39}],11:[function(require,module,exports){
//common nouns that have no plural form. These are suprisingly rare
//used in noun.inflect(), and added as nouns in lexicon
module.exports=[
    "aircraft",
    "bass",
    "bison",
    "fowl",
    "halibut",
    "moose",
    "salmon",
    "spacecraft",
    "tuna",
    "trout",
    "advice",
    "information",
    "knowledge",
    "trouble",
    "enjoyment",
    "fun",
    "recreation",
    "relaxation",
    "meat",
    "rice",
    "bread",
    "cake",
    "coffee",
    "ice",
    "water",
    "oil",
    "grass",
    "hair",
    "fruit",
    "wildlife",
    "equipment",
    "machinery",
    "furniture",
    "mail",
    "luggage",
    "jewelry",
    "clothing",
    "money",
    "mathematics",
    "economics",
    "physics",
    "civics",
    "ethics",
    "gymnastics",
    "mumps",
    "measles",
    "news",
    "tennis",
    "baggage",
    "currency",
    "soap",
    "toothpaste",
    "food",
    "sugar",
    "butter",
    "flour",
    "research",
    "leather",
    "wool",
    "wood",
    "coal",
    "weather",
    "homework",
    "cotton",
    "silk",
    "patience",
    "impatience",
    "vinegar",
    "art",
    "beef",
    "blood",
    "cash",
    "chaos",
    "cheese",
    "chewing",
    "conduct",
    "confusion",
    "education",
    "electricity",
    "entertainment",
    "fiction",
    "forgiveness",
    "gold",
    "gossip",
    "ground",
    "happiness",
    "history",
    "honey",
    "hospitality",
    "importance",
    "justice",
    "laughter",
    "leisure",
    "lightning",
    "literature",
    "luck",
    "melancholy",
    "milk",
    "mist",
    "music",
    "noise",
    "oxygen",
    "paper",
    "pay",
    "peace",
    "peanut",
    "pepper",
    "petrol",
    "plastic",
    "pork",
    "power",
    "pressure",
    "rain",
    "recognition",
    "sadness",
    "safety",
    "salt",
    "sand",
    "scenery",
    "shopping",
    "silver",
    "snow",
    "softness",
    "space",
    "speed",
    "steam",
    "sunshine",
    "tea",
    "thunder",
    "time",
    "traffic",
    "trousers",
    "violence",
    "warmth",
    "wine",
    "steel",
    "soccer",
    "hockey",
    "golf",
    "fish",
    "gum",
    "liquid",
    "series",
    "sheep",
    "species",
    "fahrenheit",
    "celcius",
    "kelvin",
    "hertz"
  ]

},{}],12:[function(require,module,exports){
//terms that are "CD", a 'value' term
module.exports = [
  //numbers
  'zero',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  'ten',
  'eleven',
  'twelve',
  'thirteen',
  'fourteen',
  'fifteen',
  'sixteen',
  'seventeen',
  'eighteen',
  'nineteen',
  'twenty',
  'thirty',
  'forty',
  'fifty',
  'sixty',
  'seventy',
  'eighty',
  'ninety',
  'hundred',
  'thousand',
  'million',
  'billion',
  'trillion',
  'quadrillion',
  'quintillion',
  'sextillion',
  'septillion',
  'octillion',
  'nonillion',
  'decillion',

  //months
  "january",
  "february",
  // "march",
  "april",
  // "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
  "jan", "feb", "mar", "apr", "jun", "jul", "aug", "sep", "oct", "nov", "dec", "sept", "sep",

  //days
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday"
].reduce(function (h, s) {
  h[s] = "CD"
  return h
}, {})

},{}],13:[function(require,module,exports){
//most-frequent non-irregular verbs, to be conjugated for the lexicon
//this list is the seed, from which various forms are conjugated
module.exports = [
  "collapse",
  "stake",
  "forsee",
  "suck",
  "answer",
  "argue",
  "tend",
  "examine",
  "depend",
  "form",
  "figure",
  "mind",
  "surround",
  "suspect",
  "reflect",
  "wonder",
  "hope",
  "end",
  "thank",
  "file",
  "regard",
  "report",
  "imagine",
  "consider",
  "ensure",
  "cause",
  "work",
  "enter",
  "stop",
  "defeat",
  "surge",
  "launch",
  "turn",
  "like",
  "control",
  "relate",
  "remember",
  "join",
  "listen",
  "train",
  "spring",
  "enjoy",
  "fail",
  "recognize",
  "obtain",
  "learn",
  "fill",
  "announce",
  "prevent",
  "achieve",
  "realize",
  "involve",
  "remove",
  "aid",
  "visit",
  "test",
  "prepare",
  "ask",
  "carry",
  "suppose",
  "determine",
  "raise",
  "love",
  "use",
  "pull",
  "improve",
  "contain",
  "offer",
  "talk",
  "pick",
  "care",
  "express",
  "remain",
  "operate",
  "close",
  "add",
  "mention",
  "support",
  "decide",
  "walk",
  "vary",
  "demand",
  "describe",
  "agree",
  "happen",
  "allow",
  "suffer",
  "study",
  "press",
  "watch",
  "seem",
  "occur",
  "contribute",
  "claim",
  "compare",
  "apply",
  "direct",
  "discuss",
  "indicate",
  "require",
  "change",
  "fix",
  "reach",
  "prove",
  "expect",
  "exist",
  "play",
  "permit",
  "kill",
  "charge",
  "increase",
  "believe",
  "create",
  "continue",
  "live",
  "help",
  "represent",
  "edit",
  "serve",
  "appear",
  "cover",
  "maintain",
  "start",
  "stay",
  "move",
  "extend",
  "design",
  "supply",
  "suggest",
  "want",
  "approach",
  "call",
  "include",
  "try",
  "receive",
  "save",
  "discover",
  "marry",
  "need",
  "establish",
  "keep",
  "assume",
  "attend",
  "unite",
  "explain",
  "publish",
  "accept",
  "settle",
  "reduce",
  "do",
  "look",
  "interact",
  "concern",
  "labor",
  "return",
  "select",
  "die",
  "provide",
  "seek",
  "wish",
  "finish",
  "follow",
  "disagree",
  "produce",
  "attack",
  "attempt",
  "brake",
  "brush",
  "burn",
  "bang",
  "bomb",
  "budget",
  "comfort",
  "cook",
  "copy",
  "cough",
  "crush",
  "cry",
  "check",
  "claw",
  "clip",
  "combine",
  "damage",
  "desire",
  "doubt",
  "drain",
  "dance",
  "decrease",
  "defect",
  "deposit",
  "drift",
  "dip",
  "dive",
  "divorce",
  "dream",
  "exchange",
  "envy",
  "exert",
  "exercise",
  "export",
  "fold",
  "flood",
  "focus",
  "forecast",
  "fracture",
  "grip",
  "guide",
  "guard",
  "guarantee",
  "guess",
  "hate",
  "heat",
  "handle",
  "hire",
  "host",
  "hunt",
  "hurry",
  "import",
  "judge",
  "jump",
  "jam",
  "kick",
  "kiss",
  "knock",
  "laugh",
  "lift",
  "lock",
  "lecture",
  "link",
  "load",
  "loan",
  "lump",
  "melt",
  "message",
  "murder",
  "neglect",
  "overlap",
  "overtake",
  "overuse",
  "print",
  "protest",
  "pump",
  "push",
  "post",
  "progress",
  "promise",
  "purchase",
  "regret",
  "request",
  "reward",
  "roll",
  "rub",
  "rent",
  "repair",
  "sail",
  "scale",
  "screw",
  "shock",
  "sleep",
  "slip",
  "smash",
  "smell",
  "smoke",
  "sneeze",
  "snow",
  "surprise",
  "scratch",
  "search",
  "share",
  "shave",
  "spit",
  "splash",
  "stain",
  "stress",
  "switch",
  "taste",
  "touch",
  "trade",
  "trick",
  "twist",
  "trap",
  "travel",
  "tune",
  "undergo",
  "undo",
  "uplift",
  "vote",
  "wash",
  "wave",
  "whistle",
  "wreck",
  "yawn",
  "betray",
  "restrict",
  "perform",
  "worry",
  "point",
  "activate",
  "fear",
  "plan",
  "note",
  "face",
  "predict",
  "differ",
  "deserve",
  "torture",
  "recall",
  "count",
  "admit",
  "insist",
  "lack",
  "pass",
  "belong",
  "complain",
  "constitute",
  "rely",
  "refuse",
  "range",
  "cite",
  "flash",
  "arrive",
  "reveal",
  "consist",
  "observe",
  "notice",
  "trust",
  "display",
  "view",
  "stare",
  "acknowledge",
  "owe",
  "gaze",
  "treat",
  "account",
  "gather",
  "address",
  "confirm",
  "estimate",
  "manage",
  "participate",
  "sneak",
  "drop",
  "mirror",
  "experience",
  "strive",
  "arch",
  "dislike",
  "favor",
  "earn",
  "emphasize",
  "match",
  "question",
  "emerge",
  "encourage",
  "matter",
  "name",
  "head",
  "line",
  "slam",
  "list",
  "warn",
  "ignore",
  "resemble",
  "feature",
  "place",
  "reverse",
  "accuse",
  "spoil",
  "retain",
  "survive",
  "praise",
  "function",
  "please",
  "date",
  "remind",
  "deliver",
  "echo",
  "engage",
  "deny",
  "yield",
  "center",
  "gain",
  "anticipate",
  "reason",
  "side",
  "thrive",
  "defy",
  "dodge",
  "enable",
  "applaud",
  "bear",
  "persist",
  "pose",
  "reject",
  "attract",
  "await",
  "inhibit",
  "declare",
  "process",
  "risk",
  "urge",
  "value",
  "block",
  "confront",
  "credit",
  "cross",
  "amuse",
  "dare",
  "resent",
  "smile",
  "gloss",
  "threaten",
  "collect",
  "depict",
  "dismiss",
  "submit",
  "benefit",
  "step",
  "deem",
  "limit",
  "sense",
  "issue",
  "embody",
  "force",
  "govern",
  "replace",
  "bother",
  "cater",
  "adopt",
  "empower",
  "outweigh",
  "alter",
  "enrich",
  "influence",
  "prohibit",
  "pursue",
  "warrant",
  "convey",
  "approve",
  "reserve",
  "rest",
  "strain",
  "wander",
  "adjust",
  "dress",
  "market",
  "mingle",
  "disapprove",
  "evaluate",
  "flow",
  "inhabit",
  "pop",
  "rule",
  "depart",
  "roam",
  "assert",
  "disappear",
  "envision",
  "pause",
  "afford",
  "challenge",
  "grab",
  "grumble",
  "house",
  "portray",
  "revel",
  "base",
  "conduct",
  "review",
  "stem",
  "crave",
  "mark",
  "store",
  "target",
  "unlock",
  "weigh",
  "resist",
  "drag",
  "pour",
  "reckon",
  "assign",
  "cling",
  "rank",
  "attach",
  "decline",
  "destroy",
  "interfere",
  "paint",
  "skip",
  "sprinkle",
  "wither",
  "allege",
  "retire",
  "score",
  "monitor",
  "expand",
  "honor",
  "pack",
  "assist",
  "float",
  "appeal",
  "stretch",
  "undermine",
  "assemble",
  "boast",
  "bounce",
  "grasp",
  "install",
  "borrow",
  "crack",
  "elect",
  "shout",
  "contrast",
  "overcome",
  "relax",
  "relent",
  "strengthen",
  "conform",
  "dump",
  "pile",
  "scare",
  "relive",
  "resort",
  "rush",
  "boost",
  "cease",
  "command",
  "excel",
  "plug",
  "plunge",
  "proclaim",
  "discourage",
  "endure",
  "ruin",
  "stumble",
  "abandon",
  "cheat",
  "convince",
  "merge",
  "convert",
  "harm",
  "multiply",
  "overwhelm",
  "chew",
  "invent",
  "bury",
  "wipe",
  "added",
  "took",
  "define",
  "goes",
  "measure",
  "enhance",
  "distinguish",
  "avoid",
  //contractions
  "don't",
  "won't",
  "what's" //somewhat ambiguous (what does|what are)

]

},{}],14:[function(require,module,exports){
//the parts of speech used by this library. mostly standard, but some changes.
module.exports = {
  //verbs
  "VB": {
    "name": "verb, generic",
    "parent": "verb",
    "tag": "VB"
  },
  "VBD": {
    "name": "past-tense verb",
    "parent": "verb",
    "tense": "past",
    "tag": "VBD"
  },
  "VBN": {
    "name": "past-participle verb",
    "parent": "verb",
    "tense": "past",
    "tag": "VBN"
  },
  "VBP": {
    "name": "infinitive verb",
    "parent": "verb",
    "tense": "present",
    "tag": "VBP"
  },
  "VBF": {
    "name": "future-tense verb",
    "parent": "verb",
    "tense": "future",
    "tag": "VBF"
  },
  "VBZ": {
    "name": "present-tense verb",
    "tense": "present",
    "parent": "verb",
    "tag": "VBZ"
  },
  "CP": {
    "name": "copula",
    "parent": "verb",
    "tag": "CP"
  },
  "VBG": {
    "name": "gerund verb",
    "parent": "verb",
    "tag": "VBG"
  },

  //adjectives
  "JJ": {
    "name": "adjective, generic",
    "parent": "adjective",
    "tag": "JJ"
  },
  "JJR": {
    "name": "comparative adjective",
    "parent": "adjective",
    "tag": "JJR"
  },
  "JJS": {
    "name": "superlative adjective",
    "parent": "adjective",
    "tag": "JJS"
  },

  //adverbs
  "RB": {
    "name": "adverb",
    "parent": "adverb",
    "tag": "RB"
  },
  "RBR": {
    "name": "comparative adverb",
    "parent": "adverb",
    "tag": "RBR"
  },
  "RBS": {
    "name": "superlative adverb",
    "parent": "adverb",
    "tag": "RBS"
  },

  //nouns
  "NN": {
    "name": "noun, generic",
    "parent": "noun",
    "tag": "NN"
  },
  "NNP": {
    "name": "singular proper noun",
    "parent": "noun",
    "tag": "NNP"
  },
  "NNA": {
    "name": "noun, active",
    "parent": "noun",
    "tag": "NNA"
  },
  "NNPA": {
    "name": "noun, acronym",
    "parent": "noun",
    "tag": "NNPA"
  },
  "NNPS": {
    "name": "plural proper noun",
    "parent": "noun",
    "tag": "NNPS"
  },
  "NNAB": {
    "name": "noun, abbreviation",
    "parent": "noun",
    "tag": "NNAB"
  },
  "NNS": {
    "name": "plural noun",
    "parent": "noun",
    "tag": "NNS"
  },
  "NNO": {
    "name": "possessive noun",
    "parent": "noun",
    "tag": "NNO"
  },
  "NNG": {
    "name": "gerund noun",
    "parent": "noun",
    "tag": "VBG"
  },
  "PP": {
    "name": "possessive pronoun",
    "parent": "noun",
    "tag": "PP"
  },

  //glue
  "FW": {
    "name": "foreign word",
    "parent": "glue",
    "tag": "FW"
  },
  "CD": {
    "name": "cardinal value, generic",
    "parent": "value",
    "tag": "CD"
  },
  "DA": {
    "name": "date",
    "parent": "value",
    "tag": "DA"
  },
  "NU": {
    "name": "number",
    "parent": "value",
    "tag": "NU"
  },
  "IN": {
    "name": "preposition",
    "parent": "glue",
    "tag": "IN"
  },
  "MD": {
    "name": "modal verb",
    "parent": "verb", //dunno
    "tag": "MD"
  },
  "CC": {
    "name": "co-ordating conjunction",
    "parent": "glue",
    "tag": "CC"
  },
  "PRP": {
    "name": "personal pronoun",
    "parent": "noun",
    "tag": "PRP"
  },
  "DT": {
    "name": "determiner",
    "parent": "glue",
    "tag": "DT"
  },
  "UH": {
    "name": "interjection",
    "parent": "glue",
    "tag": "UH"
  },
  "EX": {
    "name": "existential there",
    "parent": "glue",
    "tag": "EX"
  }
}

},{}],15:[function(require,module,exports){
// word suffixes with a high pos signal, generated with wordnet
//by spencer kelly spencermountain@gmail.com  2014
var data = {
    "NN": [
      "ceae",
      "inae",
      "idae",
      "leaf",
      "rgan",
      "eman",
      "sman",
      "star",
      "boat",
      "tube",
      "rica",
      "tica",
      "nica",
      "auce",
      "tics",
      "ency",
      "ancy",
      "poda",
      "tude",
      "xide",
      "body",
      "weed",
      "tree",
      "rrel",
      "stem",
      "cher",
      "icer",
      "erer",
      "ader",
      "ncer",
      "izer",
      "ayer",
      "nner",
      "ates",
      "ales",
      "ides",
      "rmes",
      "etes",
      "llet",
      "uage",
      "ings",
      "aphy",
      "chid",
      "tein",
      "vein",
      "hair",
      "tris",
      "unit",
      "cake",
      "nake",
      "illa",
      "ella",
      "icle",
      "ille",
      "etle",
      "scle",
      "cell",
      "bell",
      "bill",
      "palm",
      "toma",
      "game",
      "lamp",
      "bone",
      "mann",
      "ment",
      "wood",
      "book",
      "nson",
      "agon",
      "odon",
      "dron",
      "iron",
      "tion",
      "itor",
      "ator",
      "root",
      "cope",
      "tera",
      "hora",
      "lora",
      "bird",
      "worm",
      "fern",
      "horn",
      "wort",
      "ourt",
      "stry",
      "etry",
      "bush",
      "ness",
      "gist",
      "rata",
      "lata",
      "tata",
      "moth",
      "lity",
      "nity",
      "sity",
      "rity",
      "city",
      "dity",
      "vity",
      "drug",
      "dium",
      "llum",
      "trum",
      "inum",
      "lium",
      "tium",
      "atum",
      "rium",
      "icum",
      "anum",
      "nium",
      "orum",
      "icus",
      "opus",
      "chus",
      "ngus",
      "thus",
      "rius",
      "rpus"
    ],
    "JJ": [
      "liac",
      "siac",
      "clad",
      "deaf",
      "xial",
      "hial",
      "chal",
      "rpal",
      "asal",
      "rial",
      "teal",
      "oeal",
      "vial",
      "phal",
      "sial",
      "heal",
      "rbal",
      "neal",
      "geal",
      "dial",
      "eval",
      "bial",
      "ugal",
      "kian",
      "izan",
      "rtan",
      "odan",
      "llan",
      "zian",
      "eian",
      "eyan",
      "ndan",
      "eban",
      "near",
      "unar",
      "lear",
      "liar",
      "-day",
      "-way",
      "tech",
      "sick",
      "tuck",
      "inct",
      "unct",
      "wide",
      "endo",
      "uddy",
      "eedy",
      "uted",
      "aled",
      "rred",
      "oned",
      "rted",
      "obed",
      "oped",
      "ched",
      "dded",
      "cted",
      "tied",
      "eked",
      "ayed",
      "rked",
      "teed",
      "mmed",
      "tred",
      "awed",
      "rbed",
      "bbed",
      "axed",
      "bred",
      "pied",
      "cked",
      "rced",
      "ened",
      "fied",
      "lved",
      "mned",
      "kled",
      "hted",
      "lied",
      "eted",
      "rded",
      "lued",
      "rved",
      "azed",
      "oked",
      "ghed",
      "sked",
      "emed",
      "aded",
      "ived",
      "mbed",
      "pted",
      "zled",
      "ored",
      "pled",
      "wned",
      "afed",
      "nied",
      "aked",
      "gued",
      "oded",
      "oved",
      "oled",
      "ymed",
      "lled",
      "bled",
      "cled",
      "eded",
      "toed",
      "ited",
      "oyed",
      "eyed",
      "ured",
      "omed",
      "ixed",
      "pped",
      "ined",
      "lted",
      "iced",
      "exed",
      "nded",
      "amed",
      "owed",
      "dged",
      "nted",
      "eged",
      "nned",
      "used",
      "ibed",
      "nced",
      "umed",
      "dled",
      "died",
      "rged",
      "aped",
      "oted",
      "uled",
      "ided",
      "nked",
      "aved",
      "rled",
      "rned",
      "aned",
      "rmed",
      "lmed",
      "aged",
      "ized",
      "eved",
      "ofed",
      "thed",
      "ered",
      "ared",
      "ated",
      "eled",
      "sted",
      "ewed",
      "nsed",
      "nged",
      "lded",
      "gged",
      "osed",
      "fled",
      "shed",
      "aced",
      "ffed",
      "tted",
      "uced",
      "iled",
      "uded",
      "ired",
      "yzed",
      "-fed",
      "mped",
      "iked",
      "fted",
      "imed",
      "hree",
      "llel",
      "aten",
      "lden",
      "nken",
      "apen",
      "ozen",
      "ober",
      "-set",
      "nvex",
      "osey",
      "laid",
      "paid",
      "xvii",
      "xxii",
      "-air",
      "tair",
      "icit",
      "knit",
      "nlit",
      "xxiv",
      "-six",
      "-old",
      "held",
      "cile",
      "ible",
      "able",
      "gile",
      "full",
      "-ply",
      "bbly",
      "ggly",
      "zzly",
      "-one",
      "mane",
      "mune",
      "rung",
      "uing",
      "mant",
      "yant",
      "uant",
      "pant",
      "urnt",
      "awny",
      "eeny",
      "ainy",
      "orny",
      "siny",
      "tood",
      "shod",
      "-toe",
      "d-on",
      "-top",
      "-for",
      "odox",
      "wept",
      "eepy",
      "oopy",
      "hird",
      "dern",
      "worn",
      "mart",
      "ltry",
      "oury",
      "ngry",
      "arse",
      "bose",
      "cose",
      "mose",
      "iose",
      "gish",
      "kish",
      "pish",
      "wish",
      "vish",
      "yish",
      "owsy",
      "ensy",
      "easy",
      "ifth",
      "edth",
      "urth",
      "ixth",
      "00th",
      "ghth",
      "ilty",
      "orty",
      "ifty",
      "inty",
      "ghty",
      "kety",
      "afty",
      "irty",
      "roud",
      "true",
      "wful",
      "dful",
      "rful",
      "mful",
      "gful",
      "lful",
      "hful",
      "kful",
      "iful",
      "yful",
      "sful",
      "tive",
      "cave",
      "sive",
      "five",
      "cive",
      "xxvi",
      "urvy",
      "nown",
      "hewn",
      "lown",
      "-two",
      "lowy",
      "ctyl"
    ],
    "VB": [
      "wrap",
      "hear",
      "draw",
      "rlay",
      "away",
      "elay",
      "duce",
      "esce",
      "elch",
      "ooch",
      "pick",
      "huck",
      "back",
      "hack",
      "ruct",
      "lict",
      "nect",
      "vict",
      "eact",
      "tect",
      "vade",
      "lude",
      "vide",
      "rude",
      "cede",
      "ceed",
      "ivel",
      "hten",
      "rken",
      "shen",
      "open",
      "quer",
      "over",
      "efer",
      "eset",
      "uiet",
      "pret",
      "ulge",
      "lign",
      "pugn",
      "othe",
      "rbid",
      "raid",
      "veil",
      "vail",
      "roil",
      "join",
      "dain",
      "feit",
      "mmit",
      "erit",
      "voke",
      "make",
      "weld",
      "uild",
      "idle",
      "rgle",
      "otle",
      "rble",
      "self",
      "fill",
      "till",
      "eels",
      "sult",
      "pply",
      "sume",
      "dime",
      "lame",
      "lump",
      "rump",
      "vene",
      "cook",
      "look",
      "from",
      "elop",
      "grow",
      "adow",
      "ploy",
      "sorb",
      "pare",
      "uire",
      "jure",
      "lore",
      "surf",
      "narl",
      "earn",
      "ourn",
      "hirr",
      "tort",
      "-fry",
      "uise",
      "lyse",
      "sise",
      "hise",
      "tise",
      "nise",
      "lise",
      "rise",
      "anse",
      "gise",
      "owse",
      "oosh",
      "resh",
      "cuss",
      "uess",
      "sess",
      "vest",
      "inst",
      "gest",
      "fest",
      "xist",
      "into",
      "ccur",
      "ieve",
      "eive",
      "olve",
      "down",
      "-dye",
      "laze",
      "lyze",
      "raze",
      "ooze"
    ],
    "RB": [
      "that",
      "oubt",
      "much",
      "diem",
      "high",
      "atim",
      "sely",
      "nely",
      "ibly",
      "lely",
      "dely",
      "ally",
      "gely",
      "imly",
      "tely",
      "ully",
      "ably",
      "owly",
      "vely",
      "cely",
      "mely",
      "mply",
      "ngly",
      "exly",
      "ffly",
      "rmly",
      "rely",
      "uely",
      "time",
      "iori",
      "oors",
      "wise",
      "orst",
      "east",
      "ways"
    ]
  }
  //convert it to an easier format
module.exports = Object.keys(data).reduce(function (h, k) {
  data[k].forEach(function (w) {
    h[w] = k
  })
  return h
}, {})

},{}],16:[function(require,module,exports){
//regex patterns and parts of speech],
module.exports= [
  [".[cts]hy$", "JJ"],
  [".[st]ty$", "JJ"],
  [".[lnr]ize$", "VB"],
  [".[gk]y$", "JJ"],
  [".fies$", "VB"],
  [".some$", "JJ"],
  [".[nrtumcd]al$", "JJ"],
  [".que$", "JJ"],
  [".[tnl]ary$", "JJ"],
  [".[di]est$", "JJS"],
  ["^(un|de|re)\\-[a-z]..", "VB"],
  [".lar$", "JJ"],
  ["[bszmp]{2}y", "JJ"],
  [".zes$", "VB"],
  [".[icldtgrv]ent$", "JJ"],
  [".[rln]ates$", "VBZ"],
  [".[oe]ry$", "JJ"],
  ["[rdntkdhs]ly$", "RB"],
  [".[lsrnpb]ian$", "JJ"],
  [".[^aeiou]ial$", "JJ"],
  [".[^aeiou]eal$", "JJ"],
  [".[vrl]id$", "JJ"],
  [".[ilk]er$", "JJR"],
  [".ike$", "JJ"],
  [".ends$", "VB"],
  [".wards$", "RB"],
  [".rmy$", "JJ"],
  [".rol$", "NN"],
  [".tors$", "NN"],
  [".azy$", "JJ"],
  [".where$", "RB"],
  [".ify$", "VB"],
  [".bound$", "JJ"],
  [".ens$", "VB"],
  [".oid$", "JJ"],
  [".vice$", "NN"],
  [".rough$", "JJ"],
  [".mum$", "JJ"],
  [".teen(th)?$", "CD"],
  [".oses$", "VB"],
  [".ishes$", "VB"],
  [".ects$", "VB"],
  [".tieth$", "CD"],
  [".ices$", "NN"],
  [".bles$", "VB"],
  [".pose$", "VB"],
  [".ions$", "NN"],
  [".ean$", "JJ"],
  [".[ia]sed$", "JJ"],
  [".tized$", "VB"],
  [".llen$", "JJ"],
  [".fore$", "RB"],
  [".ances$", "NN"],
  [".gate$", "VB"],
  [".nes$", "VB"],
  [".less$", "RB"],
  [".ried$", "JJ"],
  [".gone$", "JJ"],
  [".made$", "JJ"],
  [".[pdltrkvyns]ing$", "JJ"],
  [".tions$", "NN"],
  [".tures$", "NN"],
  [".ous$", "JJ"],
  [".ports$", "NN"],
  [". so$", "RB"],
  [".ints$", "NN"],
  [".[gt]led$", "JJ"],
  ["[aeiou].*ist$", "JJ"],
  [".lked$", "VB"],
  [".fully$", "RB"],
  [".*ould$", "MD"],
  ["^-?[0-9]+(.[0-9]+)?$", "CD"],
  ["[a-z]*\\-[a-z]*\\-", "JJ"],
  ["[a-z]'s$", "NNO"],
  [".'n$", "VB"],
  [".'re$", "CP"],
  [".'ll$", "MD"],
  [".'t$", "VB"],
  [".tches$", "VB"],
  ["^https?\:?\/\/[a-z0-9]", "CD"],//the colon is removed in normalisation
  ["^www\.[a-z0-9]", "CD"],
  [".ize$", "VB"],
  [".[^aeiou]ise$", "VB"],
  [".[aeiou]te$", "VB"],
  [".ea$", "NN"],
  ["[aeiou][pns]er$", "NN"],
  [".ia$", "NN"],
  [".sis$", "NN"],
  [".[aeiou]na$", "NN"],
  [".[^aeiou]ity$", "NN"],
  [".[^aeiou]ium$", "NN"],
  [".[^aeiou][ei]al$", "JJ"],
  [".ffy$", "JJ"],
  [".[^aeiou]ic$", "JJ"],
  [".(gg|bb|zz)ly$", "JJ"],
  [".[aeiou]my$", "JJ"],
  [".[aeiou]ble$", "JJ"],
  [".[^aeiou]ful$", "JJ"],
  [".[^aeiou]ish$", "JJ"],
  [".[^aeiou]ica$", "NN"],
  ["[aeiou][^aeiou]is$", "NN"],
  ["[^aeiou]ard$", "NN"],
  ["[^aeiou]ism$", "NN"],
  [".[^aeiou]ity$", "NN"],
  [".[^aeiou]ium$", "NN"],
  [".[lstrn]us$", "NN"],
  ["..ic$", "JJ"],
  ["[aeiou][^aeiou]id$", "JJ"],
  [".[^aeiou]ish$", "JJ"],
  [".[^aeiou]ive$", "JJ"],
  ["[ea]{2}zy$", "JJ"],
].map(function(a) {
  return {
    reg: new RegExp(a[0], "i"),
    pos: a[1]
  }
})


},{}],17:[function(require,module,exports){
// convert british spellings into american ones
// built with patterns+exceptions from https://en.wikipedia.org/wiki/British_spelling

module.exports = function (str) {
  var patterns = [
    // ise -> ize
    {
      reg: /([^aeiou][iy])s(e|ed|es|ing)?$/,
      repl: '$1z$2'
    },
    // our -> or
    {
      reg: /(..)our(ly|y|ite)?$/,
      repl: '$1or$2'
    },
    // re -> er
    {
      reg: /([^cdnv])re(s)?$/,
      repl: '$1er$2'
    },
    // xion -> tion
    {
      reg: /([aeiou])xion([ed])?$/,
      repl: '$1tion$2'
    },
    //logue -> log
    {
      reg: /logue$/,
      repl: 'log'
    },
    // ae -> e
    {
      reg: /([o|a])e/,
      repl: 'e'
    },
    //eing -> ing
    {
      reg: /e(ing|able)$/,
      repl: '$1'
    },
    // illful -> ilful
    {
      reg: /([aeiou]+[^aeiou]+[aeiou]+)ll(ful|ment|est|ing|or|er|ed)$/, //must be second-syllable
      repl: '$1l$2'
    }
  ]

  for (var i = 0; i < patterns.length; i++) {
    if (str.match(patterns[i].reg)) {
      return str.replace(patterns[i].reg, patterns[i].repl)
    }
  }

  return str
}

// console.log(americanize("synthesise")=="synthesize")
// console.log(americanize("synthesised")=="synthesized")

},{}],18:[function(require,module,exports){
// convert american spellings into british ones
// built with patterns+exceptions from https://en.wikipedia.org/wiki/British_spelling
// (some patterns are only safe to do in one direction)

module.exports = function (str) {
  var patterns = [
    // ise -> ize
    {
      reg: /([^aeiou][iy])z(e|ed|es|ing)?$/,
      repl: '$1s$2'
    },
    // our -> or
    // {
    //   reg: /(..)our(ly|y|ite)?$/,
    //   repl: '$1or$2',
    //   exceptions: []
    // },
    // re -> er
    // {
    //   reg: /([^cdnv])re(s)?$/,
    //   repl: '$1er$2',
    //   exceptions: []
    // },
    // xion -> tion
    // {
    //   reg: /([aeiou])xion([ed])?$/,
    //   repl: '$1tion$2',
    //   exceptions: []
    // },
    //logue -> log
    // {
    //   reg: /logue$/,
    //   repl: 'log',
    //   exceptions: []
    // },
    // ae -> e
    // {
    //   reg: /([o|a])e/,
    //   repl: 'e',
    //   exceptions: []
    // },
    //eing -> ing
    // {
    //   reg: /e(ing|able)$/,
    //   repl: '$1',
    //   exceptions: []
    // },
    // illful -> ilful
    {
      reg: /([aeiou]+[^aeiou]+[aeiou]+)l(ful|ment|est|ing|or|er|ed)$/, //must be second-syllable
      repl: '$1ll$2',
      exceptions: []
    }
  ]

  for (var i = 0; i < patterns.length; i++) {
    if (str.match(patterns[i].reg)) {
      return str.replace(patterns[i].reg, patterns[i].repl)
    }
  }
  return str
}

},{}],19:[function(require,module,exports){
//chop a string into pronounced syllables

module.exports = function (str) {
  var all = []
    //suffix fixes
  var postprocess = function (arr) {
    //trim whitespace
    arr = arr.map(function (w) {
      w = w.replace(/^ */, '')
      w = w.replace(/ *$/, '')
      return w
    })
    if (arr.length > 2) {
      return arr
    }
    var ones = [
      /^[^aeiou]?ion/,
      /^[^aeiou]?ised/,
      /^[^aeiou]?iled/
    ]
    var l = arr.length
    if (l > 1) {
      var suffix = arr[l - 2] + arr[l - 1];
      for (var i = 0; i < ones.length; i++) {
        if (suffix.match(ones[i])) {
          arr[l - 2] = arr[l - 2] + arr[l - 1];
          arr.pop();
        }
      }
    }
    return arr
  }

  var doer = function (str) {
    var vow = /[aeiouy]$/
    if (!str) {
      return
    }
    var chars = str.split('')
    var before = "";
    var after = "";
    var current = "";
    for (var i = 0; i < chars.length; i++) {
      before = chars.slice(0, i).join('')
      current = chars[i]
      after = chars.slice(i + 1, chars.length).join('')
      var candidate = before + chars[i]

      //rules for syllables-

      //it's a consonant that comes after a vowel
      if (before.match(vow) && !current.match(vow)) {
        if (after.match(/^e[sm]/)) {
          candidate += "e"
          after = after.replace(/^e/, '')
        }
        all.push(candidate)
        return doer(after)
      }
      //unblended vowels ('noisy' vowel combinations)
      if (candidate.match(/(eo|eu|ia|oa|ua|ui)$/i)) { //'io' is noisy, not in 'ion'
        all.push(before)
        all.push(current)
        return doer(after)
      }
    }
    //if still running, end last syllable
    if (str.match(/[aiouy]/) || str.match(/ee$/)) { //allow silent trailing e
      all.push(str)
    } else {
      all[all.length - 1] = (all[all.length - 1] || '') + str; //append it to the last one
    }
  }

  str.split(/\s\-/).forEach(function (s) {
    doer(s)
  })
  all = postprocess(all)

  //for words like 'tree' and 'free'
  if (all.length === 0) {
    all = [str]
  }

  return all
}

// console.log(syllables("suddenly").length === 3)
// console.log(syllables("tree"))

//broken
// console.log(syllables("birchtree"))

},{}],20:[function(require,module,exports){
//split a string into all possible parts

module.exports = function (text, options) {
  options = options || {}
  var min_count = options.min_count || 1; // minimum hit-count
  var max_size = options.max_size || 5; // maximum gram count
  var REallowedChars = /[^a-zA-Z'\-]+/g; //Invalid characters are replaced with a whitespace
  var i, j, k, textlen, s;
  var keys = [null];
  var results = [];
  max_size++;
  for (i = 1; i <= max_size; i++) {
    keys.push({});
  }
  // clean the text
  text = text.replace(REallowedChars, " ").replace(/^\s+/, "").replace(/\s+$/, "");
  text = text.toLowerCase()
  // Create a hash
  text = text.split(/\s+/);
  for (i = 0, textlen = text.length; i < textlen; i++) {
    s = text[i];
    keys[1][s] = (keys[1][s] || 0) + 1;
    for (j = 2; j <= max_size; j++) {
      if (i + j <= textlen) {
        s += " " + text[i + j - 1];
        keys[j][s] = (keys[j][s] || 0) + 1;
      } else {
        break
      }
    }
  }
  // map to array
  i = undefined;
  for (k = 1; k < max_size; k++) {
    results[k] = [];
    var key = keys[k];
    for (i in key) {
      if (key.hasOwnProperty(i) && key[i] >= min_count) {
        results[k].push({
          "word": i,
          "count": key[i],
          "size": k
        })
      }
    }
  }
  results = results.filter(function (s) {
    return s !== null
  })
  results = results.map(function (r) {
    r = r.sort(function (a, b) {
      return b.count - a.count
    })
    return r;
  });
  return results
}

//console.log(module.exports("i really think that we all really think it's all good"))
// console.log(module.exports("i said i rule", {max_size:1})) // word-count

},{}],21:[function(require,module,exports){
//(Rule-based sentence boundary segmentation) - chop given text into its proper sentences.
// Ignore periods/questions/exclamations used in acronyms/abbreviations/numbers, etc.
// @spencermountain 2015 MIT
module.exports = function(text) {

  var abbreviations = require("../../data/lexicon/abbreviations")

  var sentences = [];
  //first do a greedy-split..
  var chunks = text.split(/(\S.+?[.\?!])(?=\s+|$|")/g);

  //date abbrevs.
  //these are added seperately because they are not nouns
  abbreviations = abbreviations.concat(["jan", "feb", "mar", "apr", "jun", "jul", "aug", "sep", "oct", "nov", "dec", "sept", "sep"]);
  //misc non-noun abbreviations
  abbreviations = abbreviations.concat(["ex", "eg", "ie","circa","ca","cca", "vs", "etc", "esp", "ft", "bc","ad"])

  //detection of non-sentence chunks
  var abbrev_reg = new RegExp("\\b(" + abbreviations.join("|") + ")[.!?] ?$", "i");
  var acronym_reg= new RegExp("[ |\.][A-Z]\.?$", "i")
  var elipses_reg= new RegExp("\\.\\.\\.*$")

  //loop through these chunks, and join the non-sentence chunks back together..
  var chunks_length = chunks.length;
  for (i = 0; i < chunks_length; i++) {
    if (chunks[i]) {
      //trim whitespace
      chunks[i] = chunks[i].replace(/^\s+|\s+$/g, "");
      //should this chunk be combined with the next one?
      if (chunks[i+1] && chunks[i].match(abbrev_reg) || chunks[i].match(acronym_reg) || chunks[i].match(elipses_reg) ) {
          chunks[i + 1] = ((chunks[i]||'') + " " + (chunks[i + 1]||'')).replace(/ +/g, " ");
      } else if(chunks[i] && chunks[i].length>0){ //this chunk is a proper sentence..
          sentences.push(chunks[i]);
          chunks[i] = "";
      }
    }
  }
  //if we never got a sentence, return the given text
  if (sentences.length === 0) {
    return [text]
  }

  return sentences;
}

// console.log(sentence_parser('Tony is nice. He lives in Japan.').length === 2)
// console.log(sentence_parser('I like that Color').length === 1)
// console.log(sentence_parser("She was dead. He was ill.").length === 2)
// console.log(sentence_parser("i think it is good ... or else.").length == 1)

},{"../../data/lexicon/abbreviations":3}],22:[function(require,module,exports){
//split a string into 'words' - as intended to be most helpful for this library.

var sentence_parser = require("./sentence")
var multiples = require("../../data/lexicon/multiples")

//these expressions ought to be one token, not two, because they are a distinct POS together
var multi_words = Object.keys(multiples).map(function (m) {
  return m.split(' ')
})

var normalise = function (str) {
  if (!str) {
    return ""
  }
  str = str.toLowerCase()
  str = str.replace(/[,\.!:;\?\(\)]/, '')
  str = str.replace(/’/g, "'")
  str = str.replace(/"/g, "")
  // single curly quotes
  str = str.replace(/[\u2018\u2019\u201A\u201B\u2032\u2035]+/g, "'");
  // double curly quotes
  str = str.replace(/[\u201C\u201D\u201E\u201F\u2033\u2036]+/g, '"');
  if (!str.match(/[a-z0-9]/i)) {
    return ''
  }
  return str
}

var sentence_type = function (sentence) {
  if (sentence.match(/\?$/)) {
    return "interrogative";
  } else if (sentence.match(/\!$/)) {
    return "exclamative";
  } else {
    return "declarative";
  }
}

//some multi-word tokens should be combined here
var combine_multiples = function (arr) {
  var better = []
  var normalised = arr.map(function (a) {
      return normalise(a)
    }) //cached results
  for (var i = 0; i < arr.length; i++) {
    for (var o = 0; o < multi_words.length; o++) {
      if (arr[i + 1] && normalised[i] === multi_words[o][0] && normalised[i + 1] === multi_words[o][1]) { //
        //we have a match
        arr[i] = arr[i] + ' ' + arr[i + 1]
        arr[i + 1] = null
        break
      }
    }
    better.push(arr[i])
  }
  return better.filter(function (w) {
    return w
  })
}

var tokenize = function (str) {
  var sentences = sentence_parser(str)
  return sentences.map(function (sentence) {
    var arr = sentence.split(' ');
    arr = combine_multiples(arr)
    var tokens = arr.map(function (w, i) {
      return {
        text: w,
        normalised: normalise(w),
        title_case: (w.match(/^[A-Z][a-z]/) !== null), //use for merge-tokens
        noun_capital: i > 0 && (w.match(/^[A-Z][a-z]/) !== null), //use for noun signal
        punctuated: (w.match(/[,;:\(\)"]/) !== null) || undefined,
        end: (i === (arr.length - 1)) || undefined,
        start: (i === 0) || undefined
      }
    })
    return {
      sentence: sentence,
      tokens: tokens,
      type: sentence_type(sentence)
    }
  })
}

module.exports = tokenize

// console.log(tokenize("i live in new york")[0].tokens.length==4)
// console.log(tokenize("I speak optimistically of course.")[0].tokens.length==4)
// console.log(tokenize("Joe is 9")[0].tokens.length==3)
// console.log(tokenize("Joe in Toronto")[0].tokens.length==3)
// console.log(tokenize("I am mega-rich")[0].tokens.length==3)

},{"../../data/lexicon/multiples":9,"./sentence":21}],23:[function(require,module,exports){
// a hugely-ignorant, and widely subjective transliteration of latin, cryllic, greek unicode characters to english ascii.
//http://en.wikipedia.org/wiki/List_of_Unicode_characters
//https://docs.google.com/spreadsheet/ccc?key=0Ah46z755j7cVdFRDM1A2YVpwa1ZYWlpJM2pQZ003M0E
//approximate visual (not semantic) relationship between unicode and ascii characters
var compact = {
    "2": "²ƻ",
    "3": "³ƷƸƹƺǮǯЗҘҙӞӟӠӡȜȝ",
    "5": "Ƽƽ",
    "8": "Ȣȣ",
    "!": "¡",
    "?": "¿Ɂɂ",
    "a": "ªÀÁÂÃÄÅàáâãäåĀāĂăĄąǍǎǞǟǠǡǺǻȀȁȂȃȦȧȺΆΑΔΛάαλАДадѦѧӐӑӒӓƛɅ",
    "b": "ßþƀƁƂƃƄƅɃΒβϐϦБВЪЬбвъьѢѣҌҍҔҕƥƾ",
    "c": "¢©ÇçĆćĈĉĊċČčƆƇƈȻȼͻͼͽϲϹϽϾϿЄСсєҀҁҪҫ",
    "d": "ÐĎďĐđƉƊȡƋƌǷ",
    "e": "ÈÉÊËèéêëĒēĔĕĖėĘęĚěƎƏƐǝȄȅȆȇȨȩɆɇΈΕΞΣέεξϱϵ϶ЀЁЕЭеѐёҼҽҾҿӖӗӘәӚӛӬӭ",
    "f": "ƑƒϜϝӺӻ",
    "g": "ĜĝĞğĠġĢģƓǤǥǦǧǴǵ",
    "h": "ĤĥĦħƕǶȞȟΉΗЂЊЋНнђћҢңҤҥҺһӉӊ",
    "I": "ÌÍÎÏ",
    "i": "ìíîïĨĩĪīĬĭĮįİıƖƗȈȉȊȋΊΐΪίιϊІЇії",
    "j": "ĴĵǰȷɈɉϳЈј",
    "k": "ĶķĸƘƙǨǩΚκЌЖКжкќҚқҜҝҞҟҠҡ",
    "l": "ĹĺĻļĽľĿŀŁłƚƪǀǏǐȴȽΙӀӏ",
    "m": "ΜϺϻМмӍӎ",
    "n": "ÑñŃńŅņŇňŉŊŋƝƞǸǹȠȵΝΠήηϞЍИЙЛПийлпѝҊҋӅӆӢӣӤӥπ",
    "o": "ÒÓÔÕÖØðòóôõöøŌōŎŏŐőƟƠơǑǒǪǫǬǭǾǿȌȍȎȏȪȫȬȭȮȯȰȱΌΘΟΦΩδθοσόϕϘϙϬϭϴОФоѲѳѺѻѼѽӦӧӨөӪӫ¤ƍΏ",
    "p": "ƤƿΡρϷϸϼРрҎҏÞ",
    "q": "Ɋɋ",
    "r": "ŔŕŖŗŘřƦȐȑȒȓɌɍЃГЯгяѓҐґҒғӶӷſ",
    "s": "ŚśŜŝŞşŠšƧƨȘșȿςϚϛϟϨϩЅѕ",
    "t": "ŢţŤťŦŧƫƬƭƮȚțȶȾΓΤτϮϯТт҂Ҭҭ",
    "u": "µÙÚÛÜùúûüŨũŪūŬŭŮůŰűŲųƯưƱƲǓǔǕǖǗǘǙǚǛǜȔȕȖȗɄΰμυϋύϑЏЦЧцџҴҵҶҷҸҹӋӌӇӈ",
    "v": "ƔνѴѵѶѷ",
    "w": "ŴŵƜωώϖϢϣШЩшщѡѿ",
    "x": "×ΧχϗϰХхҲҳӼӽӾӿ",
    "y": "¥ÝýÿŶŷŸƳƴȲȳɎɏΎΥΨΫγψϒϓϔЎУучўѰѱҮүҰұӮӯӰӱӲӳ",
    "z": "ŹźŻżŽžƩƵƶȤȥɀΖζ"
  }
  //decompress data into an array
var data = []
Object.keys(compact).forEach(function (k) {
  compact[k].split('').forEach(function (s) {
    data.push([s, k])
  })
})

//convert array to two hashes
var normaler = {}
var greek = {}
data.forEach(function (arr) {
  normaler[arr[0]] = arr[1]
  greek[arr[1]] = arr[0]
})

var normalize = function (str, options) {
  options = options || {}
  options.percentage = options.percentage || 50
  var arr = str.split('').map(function (s) {
    var r = Math.random() * 100
    if (normaler[s] && r < options.percentage) {
      return normaler[s] || s
    } else {
      return s
    }
  })
  return arr.join('')
}

var denormalize = function (str, options) {
  options = options || {}
  options.percentage = options.percentage || 50
  var arr = str.split('').map(function (s) {
    var r = Math.random() * 100
    if (greek[s] && r < options.percentage) {
      return greek[s] || s
    } else {
      return s
    }
  })
  return arr.join('')
}

module.exports = {
  normalize: normalize,
  denormalize: denormalize
}

// s = "ӳžŽżźŹźӳžŽżźŹźӳžŽżźŹźӳžŽżźŹźӳžŽżźŹź"
// s = "Björk"
// console.log(normalize.normalize(s, {
//   percentage: 100
// }))

// s = "The quick brown fox jumps over the lazy dog"
// console.log(normalize.denormalize(s, {
//   percentage: 100
// }))

},{}],24:[function(require,module,exports){
//these are adjectives that can become comparative + superlative with out "most/more"
//its a whitelist for conjugation
//this data is shared between comparative/superlative methods
module.exports= [
  "absurd",
  "aggressive",
  "alert",
  "alive",
  "awesome",
  "beautiful",
  "big",
  "bitter",
  "black",
  "blue",
  "bored",
  "boring",
  "brash",
  "brave",
  "brief",
  "bright",
  "broad",
  "brown",
  "calm",
  "charming",
  "cheap",
  "clean",
  "cold",
  "cool",
  "cruel",
  "cute",
  "damp",
  "deep",
  "dear",
  "dead",
  "dark",
  "dirty",
  "drunk",
  "dull",
  "eager",
  "efficient",
  "even",
  "faint",
  "fair",
  "fanc",
  "fast",
  "fat",
  "feeble",
  "few",
  "fierce",
  "fine",
  "flat",
  "forgetful",
  "frail",
  "full",
  "gentle",
  "glib",
  "great",
  "green",
  "gruesome",
  "handsome",
  "hard",
  "harsh",
  "high",
  "hollow",
  "hot",
  "impolite",
  "innocent",
  "keen",
  "kind",
  "lame",
  "lean",
  "light",
  "little",
  "loose",
  "long",
  "loud",
  "low",
  "lush",
  "macho",
  "mean",
  "meek",
  "mellow",
  "mundane",
  "near",
  "neat",
  "new",
  "nice",
  "normal",
  "odd",
  "old",
  "pale",
  "pink",
  "plain",
  "poor",
  "proud",
  "purple",
  "quick",
  "rare",
  "rapid",
  "red",
  "rich",
  "ripe",
  "rotten",
  "round",
  "rude",
  "sad",
  "safe",
  "scarce",
  "scared",
  "shallow",
  "sharp",
  "short",
  "shrill",
  "simple",
  "slim",
  "slow",
  "small",
  "smart",
  "smooth",
  "soft",
  "sore",
  "sour",
  "square",
  "stale",
  "steep",
  "stiff",
  "straight",
  "strange",
  "strong",
  "sweet",
  "swift",
  "tall",
  "tame",
  "tart",
  "tender",
  "tense",
  "thick",
  "thin",
  "tight",
  "tough",
  "vague",
  "vast",
  "vulgar",
  "warm",
  "weak",
  "wet",
  "white",
  "wide",
  "wild",
  "wise",
  "young",
  "yellow",
  "easy",
  "narrow",
  "late",
  "early",
  "soon",
  "close",
  "empty",
  "dry",
  "windy",
  "noisy",
  "thirsty",
  "hungry",
  "fresh",
  "quiet",
  "clear",
  "heavy",
  "happy",
  "funny",
  "lucky",
  "pretty",
  "important",
  "interesting",
  "attractive",
  "dangerous",
  "intellegent",
  "pure",
  "orange",
  "large",
  "firm",
  "grand",
  "formal",
  "raw",
  "weird",
  "glad",
  "mad",
  "strict",
  "tired",
  "solid",
  "extreme",
  "mature",
  "true",
  "free",
  "curly",
  "angry"
].reduce(function(h,s){
  h[s]=true
  return h
},{})

},{}],25:[function(require,module,exports){
//turn 'quick' into 'quickly'

var main = function (str) {
  var irregulars = {
    "idle": "idly",
    "public": "publicly",
    "vague": "vaguely",
    "day": "daily",
    "icy": "icily",
    "single": "singly",
    "female": "womanly",
    "male": "manly",
    "simple": "simply",
    "whole": "wholly",
    "special": "especially",
    "straight": "straight",
    "wrong": "wrong",
    "fast": "fast",
    "hard": "hard",
    "late": "late",
    "early": "early",
    "well": "well",
    "best": "best",
    "latter": "latter",
    "bad": "badly"
  }

  var dont = {
    "foreign": 1,
    "black": 1,
    "modern": 1,
    "next": 1,
    "difficult": 1,
    "degenerate": 1,
    "young": 1,
    "awake": 1,
    "back": 1,
    "blue": 1,
    "brown": 1,
    "orange": 1,
    "complex": 1,
    "cool": 1,
    "dirty": 1,
    "done": 1,
    "empty": 1,
    "fat": 1,
    "fertile": 1,
    "frozen": 1,
    "gold": 1,
    "grey": 1,
    "gray": 1,
    "green": 1,
    "medium": 1,
    "parallel": 1,
    "outdoor": 1,
    "unknown": 1,
    "undersized": 1,
    "used": 1,
    "welcome": 1,
    "yellow": 1,
    "white": 1,
    "fixed": 1,
    "mixed": 1,
    "super": 1,
    "guilty": 1,
    "tiny": 1,
    "able": 1,
    "unable": 1,
    "same": 1,
    "adult": 1
  }

  var transforms = [{
    reg: /al$/i,
    repl: 'ally'
  }, {
    reg: /ly$/i,
    repl: 'ly'
  }, {
    reg: /(.{3})y$/i,
    repl: '$1ily'
  }, {
    reg: /que$/i,
    repl: 'quely'
  }, {
    reg: /ue$/i,
    repl: 'uly'
  }, {
    reg: /ic$/i,
    repl: 'ically'
  }, {
    reg: /ble$/i,
    repl: 'bly'
  }, {
    reg: /l$/i,
    repl: 'ly'
  }]

  var not_matches = [
    /airs$/,
    /ll$/,
    /ee.$/,
    /ile$/
  ]

  if (dont[str]) {
    return null
  }
  if (irregulars[str]) {
    return irregulars[str]
  }
  if (str.length <= 3) {
    return null
  }
  var i;
  for (i = 0; i < not_matches.length; i++) {
    if (str.match(not_matches[i])) {
      return null
    }
  }
  for (i = 0; i < transforms.length; i++) {
    if (str.match(transforms[i].reg)) {
      return str.replace(transforms[i].reg, transforms[i].repl)
    }
  }
  return str + 'ly'
}

module.exports = main;

// console.log(adj_to_adv('direct'))

},{}],26:[function(require,module,exports){
//turn 'quick' into 'quickly'
var convertables = require("./convertables")

var main = function (str) {
  var irregulars = {
    "grey": "greyer",
    "gray": "grayer",
    "green": "greener",
    "yellow": "yellower",
    "red": "redder",
    "good": "better",
    "well": "better",
    "bad": "worse",
    "sad": "sadder"
  }

  var dont = {
    "overweight": 1,
    "main": 1,
    "nearby": 1,
    "asleep": 1,
    "weekly": 1,
    "secret": 1,
    "certain": 1
  }

  var transforms = [{
    reg: /y$/i,
    repl: 'ier'
  }, {
    reg: /([aeiou])t$/i,
    repl: '$1tter'
  }, {
    reg: /([aeou])de$/i,
    repl: '$1der'
  }, {
    reg: /nge$/i,
    repl: 'nger'
  }]

  var matches = [
    /ght$/,
    /nge$/,
    /ough$/,
    /ain$/,
    /uel$/,
    /[au]ll$/,
    /ow$/,
    /old$/,
    /oud$/,
    /e[ae]p$/
  ]

  var not_matches = [
    /ary$/,
    /ous$/
  ]

  if (dont.hasOwnProperty(str)) {
    return null
  }

  for (i = 0; i < transforms.length; i++) {
    if (str.match(transforms[i].reg)) {
      return str.replace(transforms[i].reg, transforms[i].repl)
    }
  }

  if (convertables.hasOwnProperty(str)) {
    if (str.match(/e$/)) {
      return str + "r"
    } else {
      return str + "er"
    }
  }

  if (irregulars.hasOwnProperty(str)) {
    return irregulars[str]
  }

  var i;
  for (i = 0; i < not_matches.length; i++) {
    if (str.match(not_matches[i])) {
      return "more " + str
    }
  }

  for (i = 0; i < matches.length; i++) {
    if (str.match(matches[i])) {
      return str + "er"
    }
  }
  return "more " + str
}

module.exports = main;

},{"./convertables":24}],27:[function(require,module,exports){
//convert cute to cuteness

module.exports = function (w) {
  var irregulars = {
    "clean": "cleanliness",
    "naivety": "naivety"
  };
  if (!w) {
    return "";
  }
  if (irregulars.hasOwnProperty(w)) {
    return irregulars[w];
  }
  if (w.match(" ")) {
    return w;
  }
  if (w.match(/w$/)) {
    return w;
  }
  var transforms = [{
    "reg": /y$/,
    "repl": 'iness'
  }, {
    "reg": /le$/,
    "repl": 'ility'
  }, {
    "reg": /ial$/,
    "repl": 'y'
  }, {
    "reg": /al$/,
    "repl": 'ality'
  }, {
    "reg": /ting$/,
    "repl": 'ting'
  }, {
    "reg": /ring$/,
    "repl": 'ring'
  }, {
    "reg": /bing$/,
    "repl": 'bingness'
  }, {
    "reg": /sing$/,
    "repl": 'se'
  }, {
    "reg": /ing$/,
    "repl": 'ment'
  }, {
    "reg": /ess$/,
    "repl": 'essness'
  }, {
    "reg": /ous$/,
    "repl": 'ousness'
  }, ]

  for (var i = 0; i < transforms.length; i++) {
    if (w.match(transforms[i].reg)) {
      return w.replace(transforms[i].reg, transforms[i].repl);
    }
  }

  if (w.match(/s$/)) {
    return w;
  }
  return w + "ness";
};

},{}],28:[function(require,module,exports){
//turn 'quick' into 'quickest'
var convertables = require("./convertables")

module.exports = function (str) {
  var irregulars = {
    "nice": "nicest",
    "late": "latest",
    "hard": "hardest",
    "inner": "innermost",
    "outer": "outermost",
    "far": "furthest",
    "worse": "worst",
    "bad": "worst",
    "good": "best"
  }

  var dont = {
    "overweight": 1,
    "ready": 1
  }

  var transforms = [{
    "reg": /y$/i,
    "repl": 'iest'
  }, {
    "reg": /([aeiou])t$/i,
    "repl": '$1ttest'
  }, {
    "reg": /([aeou])de$/i,
    "repl": '$1dest'
  }, {
    "reg": /nge$/i,
    "repl": 'ngest'
  }]

  var matches = [
    /ght$/,
    /nge$/,
    /ough$/,
    /ain$/,
    /uel$/,
    /[au]ll$/,
    /ow$/,
    /oud$/,
    /...p$/
  ]

  var not_matches = [
    /ary$/
  ]

  var generic_transformation = function (str) {
    if (str.match(/e$/)) {
      return str + "st"
    } else {
      return str + "est"
    }
  }

  for (i = 0; i < transforms.length; i++) {
    if (str.match(transforms[i].reg)) {
      return str.replace(transforms[i].reg, transforms[i].repl)
    }
  }

  if (convertables.hasOwnProperty(str)) {
    return generic_transformation(str)
  }

  if (dont.hasOwnProperty(str)) {
    return "most " + str
  }

  if (irregulars.hasOwnProperty(str)) {
    return irregulars[str]
  }
  var i;
  for (i = 0; i < not_matches.length; i++) {
    if (str.match(not_matches[i])) {
      return "most " + str
    }
  }

  for (i = 0; i < matches.length; i++) {
    if (str.match(matches[i])) {
      return generic_transformation(str)
    }
  }
  return "most " + str
}

},{"./convertables":24}],29:[function(require,module,exports){
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

},{"../../data/parts_of_speech":14,"./conjugate/to_adverb":25,"./conjugate/to_comparative":26,"./conjugate/to_noun":27,"./conjugate/to_superlative":28}],30:[function(require,module,exports){
//turns 'quickly' into 'quick'
module.exports = function (str) {
  var irregulars = {
    "idly": "idle",
    "sporadically": "sporadic",
    "basically": "basic",
    "grammatically": "grammatical",
    "alphabetically": "alphabetical",
    "economically": "economical",
    "conically": "conical",
    "politically": "political",
    "vertically": "vertical",
    "practically": "practical",
    "theoretically": "theoretical",
    "critically": "critical",
    "fantastically": "fantastic",
    "mystically": "mystical",
    "pornographically": "pornographic",
    "fully": "full",
    "jolly": "jolly",
    "wholly": "whole"
  }
  var transforms = [{
    "reg": /bly$/i,
    "repl": 'ble'
  }, {
    "reg": /gically$/i,
    "repl": 'gical'
  }, {
    "reg": /([rsdh])ically$/i,
    "repl": '$1ical'
  }, {
    "reg": /ically$/i,
    "repl": 'ic'
  }, {
    "reg": /uly$/i,
    "repl": 'ue'
  }, {
    "reg": /ily$/i,
    "repl": 'y'
  }, {
    "reg": /(.{3})ly$/i,
    "repl": '$1'
  }]
  if (irregulars.hasOwnProperty(str)) {
    return irregulars[str]
  }
  for (var i = 0; i < transforms.length; i++) {
    if (str.match(transforms[i].reg)) {
      return str.replace(transforms[i].reg, transforms[i].repl)
    }
  }
  return str
}

// console.log(to_adjective('quickly') === 'quick')
// console.log(to_adjective('marvelously') === 'marvelous')

},{}],31:[function(require,module,exports){
//wrapper for Adverb's methods
var Adverb = function (str, sentence, word_i) {
  var the = this
  the.word = str || '';

  var to_adjective = require("./conjugate/to_adjective")
  var parts_of_speech = require("../../data/parts_of_speech")

  the.conjugate = function () {
    return {
      adjective: to_adjective(the.word)
    }
  }

  the.which = (function () {
    if (the.word.match(/..est$/)) {
      return parts_of_speech['RBS']
    }
    if (the.word.match(/..er$/)) {
      return parts_of_speech['RBR']
    }
    return parts_of_speech['RB']
  })()

  return the;
}

module.exports = Adverb;

// console.log(new Adverb("suddenly").conjugate())
// console.log(adverbs.conjugate('powerfully'))

},{"../../data/parts_of_speech":14,"./conjugate/to_adjective":30}],32:[function(require,module,exports){
//converts nouns from plural and singular, and viceversases
//some regex borrowed from pksunkara/inflect
//https://github.com/pksunkara/inflect/blob/master/lib/defaults.js

var uncountables = require("../../../data/lexicon/uncountables");
var irregular_nouns = require("../../../data/lexicon/irregular_nouns");

var i;

//words that shouldn't ever inflect, for metaphysical reasons
var uncountable_nouns = uncountables.reduce(function(h, a) {
  h[a] = true;
  return h;
}, {});

var titlecase = function(str) {
  if (!str) {
    return "";
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
};

//these aren't nouns, but let's inflect them anyways
var irregulars = [
  ["he", "they"],
  ["she", "they"],
  ["this", "these"],
  ["that", "these"],
  ["mine", "ours"],
  ["hers", "theirs"],
  ["his", "theirs"],
  ["i", "we"],
  ["move", "_s"],
  ["myself", "ourselves"],
  ["yourself", "yourselves"],
  ["himself", "themselves"],
  ["herself", "themselves"],
  ["themself", "themselves"],
  ["its", "theirs"],
  ["theirs", "_"]
];
irregulars = irregulars.concat(irregular_nouns);

var pluralize_rules = [
  [/(ax|test)is$/i, "$1es"],
  [/(octop|vir|radi|nucle|fung|cact|stimul)us$/i, "$1i"],
  [/(octop|vir)i$/i, "$1i"],
  [/([rl])f$/i, "$1ves"],
  [/(alias|status)$/i, "$1es"],
  [/(bu)s$/i, "$1ses"],
  [/(al|ad|at|er|et|ed|ad)o$/i, "$1oes"],
  [/([ti])um$/i, "$1a"],
  [/([ti])a$/i, "$1a"],
  [/sis$/i, "ses"],
  [/(?:([^f])fe|([lr])f)$/i, "$1ves"],
  [/(hive)$/i, "$1s"],
  [/([^aeiouy]|qu)y$/i, "$1ies"],
  [/(x|ch|ss|sh|s|z)$/i, "$1es"],
  [/(matr|vert|ind|cort)(ix|ex)$/i, "$1ices"],
  [/([m|l])ouse$/i, "$1ice"],
  [/([m|l])ice$/i, "$1ice"],
  [/^(ox)$/i, "$1en"],
  [/^(oxen)$/i, "$1"],
  [/(quiz)$/i, "$1zes"],
  [/(antenn|formul|nebul|vertebr|vit)a$/i, "$1ae"],
  [/(sis)$/i, "ses"],
  [/^(?!talis|.*hu)(.*)man$/i, "$1men"],
  [/(.*)/i, "$1s"]
].map(function(a) {
  return {
    reg: a[0],
    repl: a[1]
  };
});

var pluralize = function(str) {
  var low = str.toLowerCase();
  //uncountable
  if (uncountable_nouns[low]) {
    return str;
  }
  //is it already plural?
  if (is_plural(low) === true) {
    return str;
  }
  //irregular
  var found = irregulars.filter(function(r) {
    return r[0] === low;
  });
  if (found[0]) {
    if (titlecase(low) === str) { //handle capitalisation properly
      return titlecase(found[0][1]);
    } else {
      return found[0][1];
    }
  }
  //inflect first word of preposition-phrase
  if (str.match(/([a-z]*) (of|in|by|for) [a-z]/)) {
    var first = (str.match(/^([a-z]*) (of|in|by|for) [a-z]/) || [])[1];
    if (first) {
      var better_first = pluralize(first);
      return better_first + str.replace(first, "");
    }
  }
  //regular
  for (i = 0; i < pluralize_rules.length; i++) {
    if (str.match(pluralize_rules[i].reg)) {
      return str.replace(pluralize_rules[i].reg, pluralize_rules[i].repl);
    }
  }
};

var singularize_rules = [
  [/([^v])ies$/i, "$1y"],
  [/ises$/i, "isis"],
  [/ives$/i, "ife"],
  [/(antenn|formul|nebul|vertebr|vit)ae$/i, "$1a"],
  [/(octop|vir|radi|nucle|fung|cact|stimul)(i)$/i, "$1us"],
  [/(buffal|tomat|tornad)(oes)$/i, "$1o"],
  [/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$/i, "$1sis"],
  [/(vert|ind|cort)(ices)$/i, "$1ex"],
  [/(matr|append)(ices)$/i, "$1ix"],
  [/(x|ch|ss|sh|s|z|o)es$/i, "$1"],
  [/men$/i, "man"],
  [/(n)ews$/i, "$1ews"],
  [/([ti])a$/i, "$1um"],
  [/([^f])ves$/i, "$1fe"],
  [/([lr])ves$/i, "$1f"],
  [/([^aeiouy]|qu)ies$/i, "$1y"],
  [/(s)eries$/i, "$1eries"],
  [/(m)ovies$/i, "$1ovie"],
  [/([m|l])ice$/i, "$1ouse"],
  [/(cris|ax|test)es$/i, "$1is"],
  [/(alias|status)es$/i, "$1"],
  [/(ss)$/i, "$1"],
  [/(ics)$/i, "$1"],
  [/s$/i, ""]
].map(function(a) {
  return {
    reg: a[0],
    repl: a[1]
  };
});

var singularize = function(str) {
  var low = str.toLowerCase();
  //uncountable
  if (uncountable_nouns[low]) {
    return str;
  }
  //is it already singular?
  if (is_plural(low) === false) {
    return str;
  }
  //irregular
  var found = irregulars.filter(function(r) {
    return r[1] === low;
  });
  if (found[0]) {
    if (titlecase(low) === str) { //handle capitalisation properly
      return titlecase(found[0][0]);
    } else {
      return found[0][0];
    }
  }
  //inflect first word of preposition-phrase
  if (str.match(/([a-z]*) (of|in|by|for) [a-z]/)) {
    var first = str.match(/^([a-z]*) (of|in|by|for) [a-z]/);
    if (first && first[1]) {
      var better_first = singularize(first[1]);
      return better_first + str.replace(first[1], "");
    }
  }
  //regular
  for (i = 0; i < singularize_rules.length; i++) {
    if (str.match(singularize_rules[i].reg)) {
      return str.replace(singularize_rules[i].reg, singularize_rules[i].repl);
    }
  }
  return str;
};

var is_plural = function(str) {
  str = (str || "").toLowerCase();
  //handle 'mayors of chicago'
  var preposition = str.match(/([a-z]*) (of|in|by|for) [a-z]/);
  if (preposition && preposition[1]) {
    str = preposition[1];
  }
  // if it's a known irregular case
  for (i = 0; i < irregulars.length; i++) {
    if (irregulars[i][1] === str) {
      return true;
    }
    if (irregulars[i][0] === str) {
      return false;
    }
  }
  //similar to plural/singularize rules, but not the same
  var plural_indicators = [
    /(^v)ies$/i,
    /ises$/i,
    /ives$/i,
    /(antenn|formul|nebul|vertebr|vit)ae$/i,
    /(octop|vir|radi|nucle|fung|cact|stimul)i$/i,
    /(buffal|tomat|tornad)oes$/i,
    /(analy|ba|diagno|parenthe|progno|synop|the)ses$/i,
    /(vert|ind|cort)ices$/i,
    /(matr|append)ices$/i,
    /(x|ch|ss|sh|s|z|o)es$/i,
    /men$/i,
    /news$/i,
    /.tia$/i,
    /(^f)ves$/i,
    /(lr)ves$/i,
    /(^aeiouy|qu)ies$/i,
    /(m|l)ice$/i,
    /(cris|ax|test)es$/i,
    /(alias|status)es$/i,
    /ics$/i
  ];
  for (i = 0; i < plural_indicators.length; i++) {
    if (str.match(plural_indicators[i])) {
      return true;
    }
  }
  //similar to plural/singularize rules, but not the same
  var singular_indicators = [
    /(ax|test)is$/i,
    /(octop|vir|radi|nucle|fung|cact|stimul)us$/i,
    /(octop|vir)i$/i,
    /(rl)f$/i,
    /(alias|status)$/i,
    /(bu)s$/i,
    /(al|ad|at|er|et|ed|ad)o$/i,
    /(ti)um$/i,
    /(ti)a$/i,
    /sis$/i,
    /(?:(^f)fe|(lr)f)$/i,
    /hive$/i,
    /(^aeiouy|qu)y$/i,
    /(x|ch|ss|sh|z)$/i,
    /(matr|vert|ind|cort)(ix|ex)$/i,
    /(m|l)ouse$/i,
    /(m|l)ice$/i,
    /(antenn|formul|nebul|vertebr|vit)a$/i,
    /.sis$/i,
    /^(?!talis|.*hu)(.*)man$/i
  ];
  for (i = 0; i < singular_indicators.length; i++) {
    if (str.match(singular_indicators[i])) {
      return false;
    }
  }
  // 'looks pretty plural' rules
  if (str.match(/s$/) && !str.match(/ss$/) && str.length > 3) { //needs some lovin'
    return true;
  }
  return false;
};

var inflect = function(str) {
  if (uncountable_nouns[str]) { //uncountables shouldn't ever inflect
    return {
      plural: str,
      singular: str
    };
  }
  if (is_plural(str)) {
    return {
      plural: str,
      singular: singularize(str)
    };
  } else {
    return {
      singular: str,
      plural: pluralize(str)
    };
  }
};

module.exports = {
  inflect: inflect,
  is_plural: is_plural,
  singularize: singularize,
  pluralize: pluralize
};

// console.log(inflect.singularize('kisses')=="kiss")
// console.log(inflect.singularize('kiss')=="kiss")
// console.log(inflect.singularize('children')=="child")
// console.log(inflect.singularize('child')=="child")
// console.log(inflect.pluralize('gas')=="gases")
// console.log(inflect.pluralize('narrative')=="narratives")
// console.log(inflect.singularize('gases')=="gas")
// console.log(inflect.pluralize('video')=="videos")
// console.log(inflect.pluralize('photo')=="photos")
// console.log(inflect.pluralize('stomach')=="stomachs")
// console.log(inflect.pluralize('database')=="databases")
// console.log(inflect.pluralize('kiss')=="kisses")
// console.log(inflect.pluralize('towns')=="towns")
// console.log(inflect.pluralize('mayor of chicago')=="mayors of chicago")
// console.log(inflect.inflect('Index').plural=='Indices')
// console.log(inflect.is_plural('octopus')==false)
// console.log(inflect.is_plural('octopi')==true)
// console.log(inflect.is_plural('eyebrow')==false)
// console.log(inflect.is_plural('eyebrows')==true)
// console.log(inflect.is_plural('child')==false)
// console.log(inflect.is_plural('children')==true)
// console.log(inflect.singularize('mayors of chicago')=="mayor of chicago")

},{"../../../data/lexicon/irregular_nouns":8,"../../../data/lexicon/uncountables":11}],33:[function(require,module,exports){
//chooses an indefinite aricle 'a/an' for a word
module.exports = function (str) {
  if (!str) {
    return null
  }
  var irregulars = {
    "hour": "an",
    "heir": "an",
    "heirloom": "an",
    "honest": "an",
    "honour": "an",
    "honor": "an",
    "uber": "an" //german u
  }

  var is_acronym = function (s) {
    //no periods
    if (s.length <= 5 && s.match(/^[A-Z]*$/)) {
      return true
    }
    //with periods
    if (s.length >= 4 && s.match(/^([A-Z]\.)*$/)) {
      return true
    }
    return false
  }

  //pronounced letters of acronyms that get a 'an'
  var an_acronyms = {
    A: true,
    E: true,
    F: true,
    H: true,
    I: true,
    L: true,
    M: true,
    N: true,
    O: true,
    R: true,
    S: true,
    X: true
  }

  //'a' regexes
  var a_regexs = [
    /^onc?e/i, //'wu' sound of 'o'
    /^u[bcfhjkqrstn][aeiou]/i, // 'yu' sound for hard 'u'
    /^eul/i
  ];

  //begin business time
  ////////////////////
  //explicit irregular forms
  if (irregulars.hasOwnProperty(str)) {
    return irregulars[str]
  }
  //spelled-out acronyms
  if (is_acronym(str) && an_acronyms.hasOwnProperty(str.substr(0, 1))) {
    return "an"
  }
  //'a' regexes
  for (var i = 0; i < a_regexs.length; i++) {
    if (str.match(a_regexs[i])) {
      return "a"
    }
  }
  //basic vowel-startings
  if (str.match(/^[aeiou]/i)) {
    return "an"
  }
  return "a"
}

// console.log(indefinite_article("wolf") === "a")

},{}],34:[function(require,module,exports){
//wrapper for noun's methods
var Noun = function (str, sentence, word_i) {
  var the = this
  var token, next;
  if (sentence !== undefined && word_i !== undefined) {
    token = sentence.tokens[word_i]
    next = sentence.tokens[word_i + i]
  }
  the.word = str || '';

  var parts_of_speech = require("../../data/parts_of_speech")
  var firstnames = require("../../data/lexicon/firstnames")
  var honourifics = require("../../data/lexicon/honourifics")
  var inflect = require("./conjugate/inflect")
  var indefinite_article = require("./indefinite_article")

  //personal pronouns
  var prps = {
    "it": "PRP",
    "they": "PRP",
    "i": "PRP",
    "them": "PRP",
    "you": "PRP",
    "she": "PRP",
    "me": "PRP",
    "he": "PRP",
    "him": "PRP",
    "her": "PRP",
    "us": "PRP",
    "we": "PRP",
    "thou": "PRP"
  }
  var blacklist = {
      "itself": 1,
      "west": 1,
      "western": 1,
      "east": 1,
      "eastern": 1,
      "north": 1,
      "northern": 1,
      "south": 1,
      "southern": 1,
      "the": 1,
      "one": 1,
      "your": 1,
      "my": 1,
      "today": 1,
      "yesterday": 1,
      "tomorrow": 1,
      "era": 1,
      "century": 1,
      "it": 1
    }
    //for resolution of obama -> he -> his
  var possessives = {
    "his": "he",
    "her": "she",
    "hers": "she",
    "their": "they",
    "theirs": "they",
    "them": "they",
    "its": "it",
    "mine": "i",
    "yours": "you",
    "our": 'we',
    "ours": 'we'
  }


  the.is_acronym = function () {
    var s = the.word
      //no periods
    if (s.length <= 5 && s.match(/^[A-Z]*$/)) {
      return true
    }
    //with periods
    if (s.length >= 4 && s.match(/^([A-Z]\.)*$/)) {
      return true
    }
    return false
  }

  the.is_entity = function () {
    if (!token) {
      return false
    }
    if (token.normalised.length < 3 || !token.normalised.match(/[a-z]/i)) {
      return false
    }
    //prepositions
    if (prps[token.normalised]) {
      return false
    }
    //blacklist
    if (blacklist[token.normalised]) {
      return false
    }
    //discredit specific nouns forms
    if (token.pos) {
      if (token.pos.tag == "NNA") { //eg. 'singer'
        return false
      }
      if (token.pos.tag == "NNO") { //eg. "spencer's"
        return false
      }
      if (token.pos.tag == "NNG") { //eg. 'walking'
        return false
      }
      if (token.pos.tag == "NNP") { //yes! eg. 'Edinburough'
        return true
      }
    }
    //distinct capital is very good signal
    if (token.noun_capital) {
      return true
    }
    //multiple-word nouns are very good signal
    if (token.normalised.match(/ /)) {
      return true
    }
    //if it has an acronym/abbreviation, like 'business ltd.'
    if (token.normalised.match(/\./)) {
      return true
    }
    //appears to be a non-capital acronym, and not just caps-lock
    if (token.normalised.length < 5 && token.text.match(/^[A-Z]*$/)) {
      return true
    }
    //acronyms are a-ok
    if (the.is_acronym()) {
      return true
    }
    //else, be conservative
    return false
  }

  the.conjugate = function () {
    return inflect.inflect(the.word)
  }

  the.is_plural = function () {
    return inflect.is_plural(the.word)
  }

  the.article = function () {
    if (the.is_plural()) {
      return "the"
    } else {
      return indefinite_article(the.word)
    }
  }

  the.pluralize = function () {
    return inflect.pluralize(the.word)
  }

  the.singularize = function () {
    return inflect.singularize(the.word)
  }

  //uses common first-name list + honourifics to guess if this noun is the name of a person
  the.is_person = function () {
    var i, l;
    //remove things that are often named after people
    var blacklist = [
      "center",
      "centre",
      "memorial",
      "school",
      "bridge",
      "university",
      "house",
      "college",
      "square",
      "park",
      "foundation",
      "institute",
      "club",
      "museum",
      "arena",
      "stadium",
      "ss",
      "of",
      "the",
      "for",
      "and",
      "&",
      "co",
      "sons"
    ]
    l = blacklist.length
    for (i = 0; i < l; i++) {
      if (the.word.match(new RegExp("\\b" + blacklist[i] + "\\b", "i"))) {
        return false
      }
    }
    //see if noun has an honourific, like 'jr.'
    l = honourifics.length;
    for (i = 0; i < l; i++) {
      if (the.word.match(new RegExp("\\b" + honourifics[i] + "\\.?\\b", 'i'))) {
        return true
      }
    }
    //see if noun has a known first-name
    var names = the.word.split(' ').map(function (a) {
      return a.toLowerCase()
    })
    if (firstnames[names[0]]) {
      return true
    }
    //(test middle name too, if there's one)
    if (names.length > 2 && firstnames[names[1]]) {
      return true
    }

    //if it has an initial between two words
    if (the.word.match(/[a-z]{3,20} [a-z]\.? [a-z]{3,20}/i)) {
      return true
    }
    return false
  }

  //decides if it deserves a he, she, they, or it
  the.pronoun = function () {

    //if it's a person try to classify male/female
    if (the.is_person()) {
      var names = the.word.split(' ').map(function (a) {
        return a.toLowerCase()
      })
      if (firstnames[names[0]] === "m" || firstnames[names[1]] == "m") {
        return "he"
      }
      if (firstnames[names[0]] === "f" || firstnames[names[1]] == "f") {
        return "she"
      }
      //test some honourifics
      if (the.word.match(/^(mrs|miss|ms|misses|mme|mlle)\.? /, 'i')) {
        return "she"
      }
      if (the.word.match(/\b(mr|mister|sr|jr)\b/, 'i')) {
        return "he"
      }
      //if it's a known unisex name, don't try guess it. be safe.
      if (firstnames[names[0]] === "a" || firstnames[names[1]] == "a") {
        return "they"
      }
      //if we think it's a person, but still don't know the gender, do a little guessing
      if (names[0].match(/[aeiy]$/)) { //if it ends in a 'ee or ah', female
        return "she"
      }
      if (names[0].match(/[ou]$/)) { //if it ends in a 'oh or uh', male
        return "he"
      }
      if (names[0].match(/(nn|ll|tt)/)) { //if it has double-consonants, female
        return "she"
      }
      //fallback to 'singular-they'
      return "they"
    }

    //not a person
    if (the.is_plural()) {
      return "they"
    }

    return "it"
  }

  //list of pronouns that refer to this named noun. "[obama] is cool, [he] is nice."
  the.referenced_by = function () {
    //if it's named-noun, look forward for the pronouns pointing to it -> '... he'
    if (token && token.pos.tag !== "PRP" && token.pos.tag !== "PP") {
      var prp = the.pronoun()
        //look at rest of sentence
      var interested = sentence.tokens.slice(word_i + 1, sentence.tokens.length)
        //add next sentence too, could go further..
      if (sentence.next) {
        interested = interested.concat(sentence.next.tokens)
      }
      //find the matching pronouns, and break if another noun overwrites it
      var matches = []
      for (var i = 0; i < interested.length; i++) {
        if (interested[i].pos.tag === "PRP" && (interested[i].normalised === prp || possessives[interested[i].normalised] === prp)) {
          //this pronoun points at our noun
          matches.push(interested[i])
        } else if (interested[i].pos.tag === "PP" && possessives[interested[i].normalised] === prp) {
          //this posessive pronoun ('his/her') points at our noun
          matches.push(interested[i])
        } else if (interested[i].pos.parent === "noun" && interested[i].analysis.pronoun() === prp) {
          //this noun stops our further pursuit
          break
        }
      }
      return matches
    }
    return []
  }

  // a pronoun that points at a noun mentioned previously '[he] is nice'
  the.reference_to = function () {
    //if it's a pronoun, look backwards for the first mention '[obama]... <-.. [he]'
    if (token && (token.pos.tag === "PRP" || token.pos.tag === "PP")) {
      var prp = token.normalised

      if(possessives[prp]!==undefined){//support possessives
        prp=possessives[prp]
      }
        //look at starting of this sentence
      var interested = sentence.tokens.slice(0, word_i)
        //add previous sentence, if applicable
      if (sentence.last) {
        interested = sentence.last.tokens.concat(interested)
      }
      //reverse the terms to loop through backward..
      interested = interested.reverse()
      for (var i = 0; i < interested.length; i++) {
        //it's a match
        if (interested[i].pos.parent === "noun" && interested[i].pos.tag !== "PRP" && interested[i].analysis.pronoun() === prp ) {
          return interested[i]
        }
      }
    }
  }

  //specifically which pos it is
  the.which = (function () {
    //posessive
    if (the.word.match(/'s$/)) {
      return parts_of_speech['NNO']
    }
    //plural
    // if (the.is_plural) {
    //   return parts_of_speech['NNS']
    // }
    //generic
    return parts_of_speech['NN']
  })()

  return the;
}
module.exports = Noun;

// console.log(new Noun('farmhouse').is_entity())
// console.log(new Noun("FBI").is_acronym())
// console.log(new Noun("Tony Danza").is_person())
// console.log(new Noun("Tony Danza").pronoun()=="he")
// console.log(new Noun("Tanya Danza").pronoun()=="she")
// console.log(new Noun("mrs. Taya Danza").pronoun()=="she")
// console.log(new Noun("Gool Tanya Danza").pronoun()=="she")
// console.log(new Noun("illi G. Danza").pronoun()=="she")
// console.log(new Noun("horses").pronoun()=="they")

},{"../../data/lexicon/firstnames":6,"../../data/lexicon/honourifics":7,"../../data/parts_of_speech":14,"./conjugate/inflect":32,"./indefinite_article":33}],35:[function(require,module,exports){
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

},{"./adjective/index":29,"./adverb/index":31,"./noun/index":34,"./value/index":37,"./verb/index":44}],36:[function(require,module,exports){
// #generates properly-formatted dates from free-text date forms
// #by spencer kelly 2014

var months = "(january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|aug|sept|oct|nov|dec),?";
var days = "([0-9]{1,2}),?";
var years = "([12][0-9]{3})";

var to_obj = function (arr, places) {
  return Object.keys(places).reduce(function (h, k) {
    h[k] = arr[places[k]];
    return h;
  }, {});
}

var regexes = [{
  reg: String(months) + " " + String(days) + "-" + String(days) + " " + String(years),
  example: "March 7th-11th 1987",
  process: function (arr) {
    if (!arr) {
      arr = [];
    }
    var places = {
      month: 1,
      day: 2,
      to_day: 3,
      year: 4
    };
    return to_obj(arr, places);
  }
}, {
  reg: String(days) + " of " + String(months) + " to " + String(days) + " of " + String(months) + " " + String(years),
  example: "28th of September to 5th of October 2008",
  process: function (arr) {
    if (!arr) {
      arr = [];
    }
    var places = {
      day: 1,
      month: 2,
      to_day: 3,
      to_month: 4,
      to_year: 5
    };
    return to_obj(arr, places);
  }
}, {
  reg: String(months) + " " + String(days) + " to " + String(months) + " " + String(days) + " " + String(years),
  example: "March 7th to june 11th 1987",
  process: function (arr) {
    if (!arr) {
      arr = [];
    }
    var places = {
      month: 1,
      day: 2,
      to_month: 3,
      to_day: 4,
      year: 5,
      to_year: 5
    };
    return to_obj(arr, places);
  }
}, {
  reg: "between " + String(days) + " " + String(months) + " and " + String(days) + " " + String(months) + " " + String(years),
  example: "between 13 February and 15 February 1945",
  process: function (arr) {
    if (!arr) {
      arr = [];
    }
    var places = {
      day: 1,
      month: 2,
      to_day: 3,
      to_month: 4,
      year: 5,
      to_year: 5
    };
    return to_obj(arr, places);
  }
}, {
  reg: "between " + String(months) + " " + String(days) + " and " + String(months) + " " + String(days) + " " + String(years),
  example: "between March 7th and june 11th 1987",
  process: function (arr) {
    if (!arr) {
      arr = [];
    }
    var places = {
      month: 1,
      day: 2,
      to_month: 3,
      to_day: 4,
      year: 5,
      to_year: 5
    };
    return to_obj(arr, places);
  }
}, {
  reg: String(months) + " " + String(days) + " " + String(years),
  example: "March 1st 1987",
  process: function (arr) {
    if (!arr) {
      arr = [];
    }
    var places = {
      month: 1,
      day: 2,
      year: 3
    };
    return to_obj(arr, places);
  }
}, {
  reg: String(days) + " - " + String(days) + " of " + String(months) + " " + String(years),
  example: "3rd - 5th of March 1969",
  process: function (arr) {
    if (!arr) {
      arr = [];
    }
    var places = {
      day: 1,
      to_day: 2,
      month: 3,
      year: 4
    };
    return to_obj(arr, places);
  }
}, {
  reg: String(days) + " of " + String(months) + " " + String(years),
  example: "3rd of March 1969",
  process: function (arr) {
    if (!arr) {
      arr = [];
    }
    var places = {
      day: 1,
      month: 2,
      year: 3
    };
    return to_obj(arr, places);
  }
}, {
  reg: String(months) + " " + years + ",? to " + String(months) + " " + String(years),
  example: "September 1939 to April 1945",
  process: function (arr) {
    if (!arr) {
      arr = [];
    }
    var places = {
      month: 1,
      year: 2,
      to_month: 3,
      to_year: 4
    };
    return to_obj(arr, places);
  }
}, {
  reg: String(months) + " " + String(years),
  example: "March 1969",
  process: function (arr) {
    if (!arr) {
      arr = [];
    }
    var places = {
      month: 1,
      year: 2
    };
    return to_obj(arr, places);
  }
}, {
  reg: String(months) + " " + days,
  example: "March 18th",
  process: function (arr) {
    if (!arr) {
      arr = [];
    }
    var places = {
      month: 1,
      day: 2
    };
    return to_obj(arr, places);
  }
}, {
  reg: String(days) + " of " + months,
  example: "18th of March",
  process: function (arr) {
    if (!arr) {
      arr = [];
    }
    var places = {
      month: 2,
      day: 1
    };
    return to_obj(arr, places);
  }
}, {
  reg: years + " ?- ?" + String(years),
  example: "1997-1998",
  process: function (arr) {
    if (!arr) {
      arr = [];
    }
    var places = {
      year: 1,
      to_year: 2
    };
    return to_obj(arr, places);
  }
}, {
  reg: years,
  example: "1998",
  process: function (arr) {
    if (!arr) {
      arr = [];
    }
    var places = {
      year: 1
    };
    return to_obj(arr, places);
  }
}].map(function (o) {
  o.reg = new RegExp(o.reg, "g");
  return o;
});

//0 based months, 1 based days...
var months_obj = {
  january: 0,
  february: 1,
  march: 2,
  april: 3,
  may: 4,
  june: 5,
  july: 6,
  august: 7,
  september: 8,
  october: 9,
  november: 10,
  december: 11,
  jan: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  aug: 7,
  sept: 8,
  oct: 9,
  nov: 10,
  dec: 11
};

//thirty days hath september...
var last_dates = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

var preprocess = function (str) {
  str = str.toLowerCase();
  str = str.replace(/([0-9])(th|rd|st)/g, '$1');
  return str;
};

var postprocess = function (obj, options) {
  var d;
  d = new Date();
  options = options || {};
  obj.year = parseInt(obj.year, 10) || undefined;
  obj.day = parseInt(obj.day, 10) || undefined;
  obj.to_day = parseInt(obj.to_day, 10) || undefined;
  obj.to_year = parseInt(obj.to_year, 10) || undefined;
  obj.month = months_obj[obj.month];
  obj.to_month = months_obj[obj.to_month];
  //swap to_month and month
  if (obj.to_month !== undefined && obj.month === undefined) {
    obj.month = obj.to_month;
  }
  if (obj.to_month === undefined && obj.month !== undefined) {
    obj.to_month = obj.month;
  }
  //swap to_year and year
  if (obj.to_year && !obj.year) {
    obj.year = obj.to_year;
  }
  if (!obj.to_year && obj.year && obj.to_month !== undefined) {
    obj.to_year = obj.year;
  }
  if (options.assume_year && !obj.year) {
    obj.year = d.getFullYear();
  }
  //make sure date is in that month..
  if (obj.day !== undefined && (obj.day > 31 || (obj.month !== undefined && obj.day > last_dates[obj.month]))) {
    obj.day = undefined;
  }
  //make sure to date is after from date. fail everything if so...
  //todo: do this smarter
  if (obj.to_month !== undefined && obj.to_month < obj.month) {
    return {}
  }
  if (obj.to_year && obj.to_year < obj.year) {
    obj.year = undefined;
    obj.to_year = undefined;
  }

  //make sure date is in reasonable range (very opinionated)
  if (obj.year > 2090 || obj.year < 1200) {
    obj.year = undefined;
    obj.to_year = undefined;
  }
  //format result better
  obj = {
    day: obj.day,
    month: obj.month,
    year: obj.year,
    to: {
      day: obj.to_day,
      month: obj.to_month,
      year: obj.to_year
    }
  };
  //add javascript date objects, if you can
  if (obj.year && obj.day && obj.month !== undefined) {
    obj.date_object = new Date();
    obj.date_object.setYear(obj.year);
    obj.date_object.setMonth(obj.month);
    obj.date_object.setDate(obj.day);
  }
  if (obj.to.year && obj.to.day && obj.to.month !== undefined) {
    obj.to.date_object = new Date();
    obj.to.date_object.setYear(obj.to.year);
    obj.to.date_object.setMonth(obj.to.month);
    obj.to.date_object.setDate(obj.to.day);
  }
  //if we have enough data to return a result..
  if (obj.year || obj.month !== undefined) {
    return obj;
  }
  return {};
};

//pass through sequence of regexes until tempate is matched..
module.exports = function (str, options) {
  options = options || {};
  str = preprocess(str)
  var arr, good, clone_reg, obj;
  var l = regexes.length;
  for (var i = 0; i < l; i += 1) {
    obj = regexes[i]
    if (str.match(obj.reg)) {
      clone_reg = new RegExp(obj.reg.source, "i"); //this avoids a memory-leak
      arr = clone_reg.exec(str);
      good = obj.process(arr);
      return postprocess(good, options);
    }
  }
};

// console.log(date_extractor("1998"))
// console.log(date_extractor("1999"))

},{}],37:[function(require,module,exports){
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

},{"../../data/parts_of_speech":14,"./date_extractor":36,"./to_number":38}],38:[function(require,module,exports){
// converts spoken numbers into integers  "fifty seven point eight" -> 57.8
//
// Spoken numbers take the following format
// [sixty five] (thousand) [sixty five] (hundred) [sixty five]
// aka: [one/teen/ten] (multiple) [one/teen/ten] (multiple) ...
// combile the [one/teen/ten]s as 'current_sum', then multiply it by its following multiple
// multiple not repeat

"use strict";
//these sets of numbers each have different rules
//[tenth, hundreth, thousandth..] are ambiguous because they could be ordinal like fifth, or decimal like one-one-hundredth, so are ignored
var ones = {
  'a': 1,
  'zero': 0,
  'one': 1,
  'two': 2,
  'three': 3,
  'four': 4,
  'five': 5,
  'six': 6,
  'seven': 7,
  'eight': 8,
  'nine': 9,
  "first": 1,
  "second": 2,
  "third": 3,
  "fourth": 4,
  "fifth": 5,
  "sixth": 6,
  "seventh": 7,
  "eighth": 8,
  "ninth": 9
}
var teens = {
  'ten': 10,
  'eleven': 11,
  'twelve': 12,
  'thirteen': 13,
  'fourteen': 14,
  'fifteen': 15,
  'sixteen': 16,
  'seventeen': 17,
  'eighteen': 18,
  'nineteen': 19,
  "eleventh": 11,
  "twelfth": 12,
  "thirteenth": 13,
  "fourteenth": 14,
  "fifteenth": 15,
  "sixteenth": 16,
  "seventeenth": 17,
  "eighteenth": 18,
  "nineteenth": 19
}
var tens = {
  'twenty': 20,
  'thirty': 30,
  'forty': 40,
  'fifty': 50,
  'sixty': 60,
  'seventy': 70,
  'eighty': 80,
  'ninety': 90,
  "twentieth": 20,
  "thirtieth": 30,
  "fourtieth": 40,
  "fiftieth": 50,
  "sixtieth": 60,
  "seventieth": 70,
  "eightieth": 80,
  "ninetieth": 90
}
var multiple = {
    'hundred': 100,
    'grand': 1000,
    'thousand': 1000,
    'million': 1000000,
    'billion': 1000000000,
    'trillion': 1000000000000,
    'quadrillion': 1000000000000000,
    'quintillion': 1000000000000000000,
    'sextillion': 1000000000000000000000,
    'septillion': 1000000000000000000000000,
    'octillion': 1000000000000000000000000000,
    'nonillion': 1000000000000000000000000000000,
    'decillion': 1000000000000000000000000000000000
  }
  // var decimal_multiple={'tenth':0.1, 'hundredth':0.01, 'thousandth':0.001, 'millionth':0.000001,'billionth':0.000000001};

var main = function (s) {
  //remember these concerns for possible errors
  var ones_done = false
  var teens_done = false
  var tens_done = false
  var multiple_done = {}
  var total = 0
  var global_multiplier = 1
    //pretty-printed numbers
  s = s.replace(/, ?/g, '')
  //parse-out currency
  s = s.replace(/[$£€]/, '')
  //try to finish-fast
  if (s.match(/[0-9]\.[0-9]/) && parseFloat(s) == s) {
    return parseFloat(s)
  }
  if (parseInt(s, 10) == s) {
    return parseInt(s, 10)
  }
  //try to die fast. (phone numbers or times)
  if (s.match(/[0-9][\-:][0-9]/)) {
    return null
  }
  //support global multipliers, like 'half-million' by doing 'million' then multiplying by 0.5
  var mults = [{
    reg: /^(minus|negative)[\s\-]/i,
    mult: -1
  }, {
    reg: /^(a\s)?half[\s\-](of\s)?/i,
    mult: 0.5
  }, {
    reg: /^(a\s)?quarter[\s\-]/i,
    mult: 0.25
  }]
  for (i = 0; i < mults.length; i++) {
    if (s.match(mults[i].reg)) {
      global_multiplier = mults[i].mult
      s = s.replace(mults[i].reg, '')
      break;
    }
  }

  //do each word in turn..
  var words = s.toString().split(/[\s\-]+/);
  var w, x;
  var current_sum = 0;
  var local_multiplier = 1
  var decimal_mode = false
  for (var i = 0; i < words.length; i++) {
    w = words[i]

    //skip 'and' eg. five hundred and twelve
    if (w == "and") {
      continue;
    }

    //..we're doing decimals now
    if (w == "point" || w == "decimal") {
      if (decimal_mode) {
        return null
      } //two point one point six
      decimal_mode = true
      total += current_sum
      current_sum = 0
      ones_done = false
      local_multiplier = 0.1
      continue;
    }

    //handle special rules following a decimal
    if (decimal_mode) {
      x = null
      //allow consecutive ones in decimals eg. 'two point zero five nine'
      if (ones[w] !== undefined) {
        x = ones[w]
      }
      if (teens[w] !== undefined) {
        x = teens[w]
      }
      if (parseInt(w, 10) == w) {
        x = parseInt(w, 10)
      }
      if (!x) {
        return null
      }
      if (x < 10) {
        total += x * local_multiplier
        local_multiplier = local_multiplier * 0.1 // next number is next decimal place
        current_sum = 0
        continue;
      }
      //two-digit decimals eg. 'two point sixteen'
      if (x < 100) {
        total += x * (local_multiplier * 0.1)
        local_multiplier = local_multiplier * 0.01 // next number is next decimal place
        current_sum = 0
        continue;
      }
    }

    //if it's already an actual number
    if (w.match(/^[0-9]\.[0-9]$/)) {
      current_sum += parseFloat(w)
      continue;
    }
    if (parseInt(w, 10) == w) {
      current_sum += parseInt(w, 10)
      continue;
    }

    //ones rules
    if (ones[w] !== undefined) {
      if (ones_done) {
        return null
      } // eg. five seven
      if (teens_done) {
        return null
      } // eg. five seventeen
      ones_done = true
      current_sum += ones[w]
      continue;
    }
    //teens rules
    if (teens[w]) {
      if (ones_done) {
        return null
      } // eg. five seventeen
      if (teens_done) {
        return null
      } // eg. fifteen seventeen
      if (tens_done) {
        return null
      } // eg. sixty fifteen
      teens_done = true
      current_sum += teens[w]
      continue;
    }
    //tens rules
    if (tens[w]) {
      if (ones_done) {
        return null
      } // eg. five seventy
      if (teens_done) {
        return null
      } // eg. fiveteen seventy
      if (tens_done) {
        return null
      } // eg. twenty seventy
      tens_done = true
      current_sum += tens[w]
      continue;
    }
    //multiple rules
    if (multiple[w]) {
      if (multiple_done[w]) {
        return null
      } // eg. five hundred six hundred
      multiple_done[w] = true
      //reset our concerns. allow 'five hundred five'
      ones_done = false
      teens_done = false
      tens_done = false
      //case of 'hundred million', (2 consecutive multipliers)
      if (current_sum === 0) {
        total = total || 1 //dont ever multiply by 0
        total *= multiple[w]
      } else {
        current_sum *= multiple[w]
        total += current_sum
      }
      current_sum = 0
      continue;
    }
    //if word is not a known thing now, die
    return null
  }
  if (current_sum) {
    total += (current_sum || 1) * local_multiplier
  }
  //combine with global multiplier, like 'minus' or 'half'
  total = total * global_multiplier

  return total
}

//kick it into module
module.exports = main;

// console.log(to_number("sixteen hundred"))
// console.log(to_number("a hundred"))
// console.log(to_number("four point seven seven"))

},{}],39:[function(require,module,exports){
//turn a verb into its other grammatical forms.
var verb_to_doer = require("./to_doer")
var verb_irregulars = require("./verb_irregulars")
var verb_rules = require("./verb_rules")
var suffix_rules = require("./suffix_rules")

//this method is the slowest in the whole library, basically TODO:whaaa
var predict = function (w) {
  var endsWith = function (str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
  }
  var arr = Object.keys(suffix_rules);
  for (i = 0; i < arr.length; i++) {
    if (endsWith(w, arr[i])) {
      return suffix_rules[arr[i]]
    }
  }
  return "infinitive"
}

//fallback to this transformation if it has an unknown prefix
var fallback = function (w) {
  var infinitive;
  if (w.length > 4) {
    infinitive = w.replace(/ed$/, '');
  } else {
    infinitive = w.replace(/d$/, '');
  }
  var present, past, gerund, doer;
  if (w.match(/[^aeiou]$/)) {
    gerund = w + "ing"
    past = w + "ed"
    if (w.match(/ss$/)) {
      present = w + "es" //'passes'
    } else {
      present = w + "s"
    }
    doer = verb_to_doer(infinitive)
  } else {
    gerund = w.replace(/[aeiou]$/, 'ing')
    past = w.replace(/[aeiou]$/, 'ed')
    present = w.replace(/[aeiou]$/, 'es')
    doer = verb_to_doer(infinitive)
  }
  return {
    infinitive: infinitive,
    present: present,
    past: past,
    gerund: gerund,
    doer: doer,
    future: "will " + infinitive
  }
}

//make sure object has all forms
var fufill = function (obj, prefix) {
  if (!obj.infinitive) {
    return obj
  }
  if (!obj.gerund) {
    obj.gerund = obj.infinitive + 'ing'
  }
  if (!obj.doer) {
    obj.doer = verb_to_doer(obj.infinitive)
  }
  if (!obj.present) {
    obj.present = obj.infinitive + 's'
  }
  if (!obj.past) {
    obj.past = obj.infinitive + 'ed'
  }
  //add the prefix to all forms, if it exists
  if (prefix) {
    Object.keys(obj).forEach(function (k) {
      obj[k] = prefix + obj[k]
    })
  }
  //future is 'will'+infinitive
  if (!obj.future) {
    obj.future = "will " + obj.infinitive
  }
  //perfect is 'have'+past-tense
  if (!obj.perfect) {
    obj.perfect = "have " + obj.past
  }
  //pluperfect is 'had'+past-tense
  if (!obj.pluperfect) {
    obj.pluperfect = "had " + obj.past
  }
  //future perfect is 'will have'+past-tense
  if (!obj.future_perfect) {
    obj.future_perfect = "will have " + obj.past
  }
  return obj
}

var main = function (w) {
  if (w === undefined) {
    return {}
  }

  //for phrasal verbs ('look out'), conjugate look, then append 'out'
  var phrasal_reg = new RegExp("^(.*?) (in|out|on|off|behind|way|with|of|do|away|across|ahead|back|over|under|together|apart|up|upon|aback|down|about|before|after|around|to|forth|round|through|along|onto)$", 'i')
  if (w.match(' ') && w.match(phrasal_reg)) {
    var split = w.match(phrasal_reg, '')
    var phrasal_verb = split[1]
    var particle = split[2]
    var result = main(phrasal_verb) //recursive
    delete result["doer"]
    Object.keys(result).forEach(function (k) {
      if (result[k]) {
        result[k] += " " + particle
      }
    })
    return result
  }

  //for pluperfect ('had tried') remove 'had' and call it past-tense
  if (w.match(/^had [a-z]/i)) {
    w = w.replace(/^had /i, '')
  }
  //for perfect ('have tried') remove 'have' and call it past-tense
  if (w.match(/^have [a-z]/i)) {
    w = w.replace(/^have /i, '')
  }

  //for future perfect ('will have tried') remove 'will have' and call it past-tense
  if (w.match(/^will have [a-z]/i)) {
    w = w.replace(/^will have /i, '')
  }

  //chop it if it's future-tense
  w = w.replace(/^will /i, '')
  //un-prefix the verb, and add it in later
  var prefix = (w.match(/^(over|under|re|anti|full)\-?/i) || [])[0]
  var verb = w.replace(/^(over|under|re|anti|full)\-?/i, '')
    //check irregulars
  var obj = {};
  var l = verb_irregulars.length
  var x, i;
  for (i = 0; i < l; i++) {
    x = verb_irregulars[i]
    if (verb === x.present || verb === x.gerund || verb === x.past || verb === x.infinitive) {
      obj = JSON.parse(JSON.stringify(verb_irregulars[i])); // object 'clone' hack, to avoid mem leak
      return fufill(obj, prefix)
    }
  }
  //guess the tense, so we know which transormation to make
  var predicted = predict(w) || 'infinitive'

  //check against suffix rules
  l = verb_rules[predicted].length
  var r, keys;
  for (i = 0; i < l; i++) {
    r = verb_rules[predicted][i];
    if (w.match(r.reg)) {
      obj[predicted] = w;
      keys= Object.keys(r.repl)
      for(var o=0; o<keys.length; o++){
        if (keys[o] === predicted) {
          obj[keys[o]] = w
        } else {
          obj[keys[o]] = w.replace(r.reg, r.repl[keys[o]])
        }
      }
      return fufill(obj);
    }
  }

  //produce a generic transformation
  return fallback(w)
};
module.exports = main;

// console.log(module.exports("walking"))
// console.log(module.exports("overtook"))
// console.log(module.exports("watch out"))
// console.log(module.exports("watch"))
// console.log(module.exports("smash"))
// console.log(module.exports("word"))
// // broken
// console.log(module.exports("read"))
// console.log(module.exports("free"))
// console.log(module.exports("flesh"))
// console.log(module.exports("branch"))
// console.log(module.exports("spred"))
// console.log(module.exports("bog"))
// console.log(module.exports("nod"))
// console.log(module.exports("had tried"))
// console.log(module.exports("have tried"))

},{"./suffix_rules":40,"./to_doer":41,"./verb_irregulars":42,"./verb_rules":43}],40:[function(require,module,exports){
//generated from test data
var compact = {
  "gerund": [
    "ing"
  ],
  "infinitive": [
    "ate",
    "ize",
    "tion",
    "rify",
    "ress",
    "ify",
    "age",
    "nce",
    "ect",
    "ise",
    "ine",
    "ish",
    "ace",
    "ash",
    "ure",
    "tch",
    "end",
    "ack",
    "and",
    "ute",
    "ade",
    "ock",
    "ite",
    "ase",
    "ose",
    "use",
    "ive",
    "int",
    "nge",
    "lay",
    "est",
    "ain",
    "ant",
    "eed",
    "er",
    "le"
  ],
  "past": [
    "ed",
    "lt",
    "nt",
    "pt",
    "ew",
    "ld"
  ],
  "present": [
    "rks",
    "cks",
    "nks",
    "ngs",
    "mps",
    "tes",
    "zes",
    "ers",
    "les",
    "acks",
    "ends",
    "ands",
    "ocks",
    "lays",
    "eads",
    "lls",
    "els",
    "ils",
    "ows",
    "nds",
    "ays",
    "ams",
    "ars",
    "ops",
    "ffs",
    "als",
    "urs",
    "lds",
    "ews",
    "ips",
    "es",
    "ts",
    "ns",
    "s"
  ]
}
var suffix_rules = {}
var keys = Object.keys(compact)
var l = keys.length;
var l2, i;
for (i = 0; i < l; i++) {
  l2 = compact[keys[i]].length
  for (var o = 0; o < l2; o++) {
    suffix_rules[compact[keys[i]][o]] = keys[i]
  }
}
module.exports = suffix_rules;

},{}],41:[function(require,module,exports){
//somone who does this present-tense verb
//turn 'walk' into 'walker'
module.exports = function (str) {
  str = str || ''
  var irregulars = {
    "tie": "tier",
    "dream": "dreamer",
    "sail": "sailer",
    "run": "runner",
    "rub": "rubber",
    "begin": "beginner",
    "win": "winner",
    "claim": "claimant",
    "deal": "dealer",
    "spin": "spinner"
  }
  var dont = {
    "aid": 1,
    "fail": 1,
    "appear": 1,
    "happen": 1,
    "seem": 1,
    "try": 1,
    "say": 1,
    "marry": 1,
    "be": 1,
    "forbid": 1,
    "understand": 1,
    "bet": 1
  }
  var transforms = [{
    "reg": /e$/i,
    "repl": 'er'
  }, {
    "reg": /([aeiou])([mlgp])$/i,
    "repl": '$1$2$2er'
  }, {
    "reg": /([rlf])y$/i,
    "repl": '$1ier'
  }, {
    "reg": /^(.?.[aeiou])t$/i,
    "repl": '$1tter'
  }]

  if (dont.hasOwnProperty(str)) {
    return null
  }
  if (irregulars.hasOwnProperty(str)) {
    return irregulars[str]
  }
  for (var i = 0; i < transforms.length; i++) {
    if (str.match(transforms[i].reg)) {
      return str.replace(transforms[i].reg, transforms[i].repl)
    }
  }
  return str + "er"
}

// console.log(verb_to_doer('set'))
// console.log(verb_to_doer('sweep'))
// console.log(verb_to_doer('watch'))

},{}],42:[function(require,module,exports){
var types = [
  'infinitive',
  'gerund',
  'past',
  'present',
  'doer',
  'future'
]

//list of verb irregular verb forms, compacted to save space. ('_' -> infinitive )
var compact = [
    [
      "arise",
      "arising",
      "arose",
      "_s",
      "_r"
    ],
    [
      "babysit",
      "_ting",
      "babysat",
      "_s",
      "_ter"
    ],
    [
      "be",
      "_ing",
      "was",
      "is",
      ""
    ],
    [
      "beat",
      "_ing",
      "_",
      "_s",
      "_er"
    ],
    [
      "become",
      "becoming",
      "became",
      "_s",
      "_r"
    ],
    [
      "bend",
      "_ing",
      "bent",
      "_s",
      "_er"
    ],
    [
      "begin",
      "_ning",
      "began",
      "_s",
      "_ner"
    ],
    [
      "bet",
      "_ting",
      "_",
      "_s",
      "_ter"
    ],
    [
      "bind",
      "_ing",
      "bound",
      "_s",
      "_er"
    ],
    [
      "bite",
      "biting",
      "bit",
      "_s",
      "_r"
    ],
    [
      "bleed",
      "_ing",
      "bled",
      "_s",
      "_er"
    ],
    [
      "blow",
      "_ing",
      "blew",
      "_s",
      "_er"
    ],
    [
      "break",
      "_ing",
      "broke",
      "_s",
      "_er"
    ],
    [
      "breed",
      "_ing",
      "bred",
      "_s",
      "_er"
    ],
    [
      "bring",
      "_ing",
      "brought",
      "_s",
      "_er"
    ],
    [
      "broadcast",
      "_ing",
      "_",
      "_s",
      "_er"
    ],
    [
      "build",
      "_ing",
      "built",
      "_s",
      "_er"
    ],
    [
      "buy",
      "_ing",
      "bought",
      "_s",
      "_er"
    ],
    [
      "catch",
      "_ing",
      "caught",
      "_es",
      "_er"
    ],
    [
      "choose",
      "choosing",
      "chose",
      "_s",
      "_r"
    ],
    [
      "come",
      "coming",
      "came",
      "_s",
      "_r"
    ],
    [
      "cost",
      "_ing",
      "_",
      "_s",
      "_er"
    ],
    [
      "cut",
      "_ting",
      "_",
      "_s",
      "_ter"
    ],
    [
      "deal",
      "_ing",
      "_t",
      "_s",
      "_er"
    ],
    [
      "dig",
      "_ging",
      "dug",
      "_s",
      "_ger"
    ],
    [
      "do",
      "_ing",
      "did",
      "_es",
      "_er"
    ],
    [
      "draw",
      "_ing",
      "drew",
      "_s",
      "_er"
    ],
    [
      "drink",
      "_ing",
      "drank",
      "_s",
      "_er"
    ],
    [
      "drive",
      "driving",
      "drove",
      "_s",
      "_r"
    ],
    [
      "eat",
      "_ing",
      "ate",
      "_s",
      "_er"
    ],
    [
      "fall",
      "_ing",
      "fell",
      "_s",
      "_er"
    ],
    [
      "feed",
      "_ing",
      "fed",
      "_s",
      "_er"
    ],
    [
      "feel",
      "_ing",
      "felt",
      "_s",
      "_er"
    ],
    [
      "fight",
      "_ing",
      "fought",
      "_s",
      "_er"
    ],
    [
      "find",
      "_ing",
      "found",
      "_s",
      "_er"
    ],
    [
      "fly",
      "_ing",
      "flew",
      "_s",
      "flier"
    ],
    [
      "forbid",
      "_ing",
      "forbade",
      "_s",

    ],
    [
      "forget",
      "_ing",
      "forgot",
      "_s",
      "_er"
    ],
    [
      "forgive",
      "forgiving",
      "forgave",
      "_s",
      "_r"
    ],
    [
      "freeze",
      "freezing",
      "froze",
      "_s",
      "_r"
    ],
    [
      "get",
      "_ting",
      "got",
      "_s",
      "_ter"
    ],
    [
      "give",
      "giving",
      "gave",
      "_s",
      "_r"
    ],
    [
      "go",
      "_ing",
      "went",
      "_es",
      "_er"
    ],
    [
      "grow",
      "_ing",
      "grew",
      "_s",
      "_er"
    ],
    [
      "hang",
      "_ing",
      "hung",
      "_s",
      "_er"
    ],
    [
      "have",
      "having",
      "had",
      "has",

    ],
    [
      "hear",
      "_ing",
      "_d",
      "_s",
      "_er"
    ],
    [
      "hide",
      "hiding",
      "hid",
      "_s",
      "_r"
    ],
    [
      "hit",
      "_ting",
      "_",
      "_s",
      "_ter"
    ],
    [
      "hold",
      "_ing",
      "held",
      "_s",
      "_er"
    ],
    [
      "hurt",
      "_ing",
      "_",
      "_s",
      "_er"
    ],
    [
      "know",
      "_ing",
      "knew",
      "_s",
      "_er"
    ],
    [
      "relay",
      "_ing",
      "_ed",
      "_s",
      "_er"
    ],
    [
      "lay",
      "_ing",
      "laid",
      "_s",
      "_er"
    ],
    [
      "lead",
      "_ing",
      "led",
      "_s",
      "_er"
    ],
    [
      "leave",
      "leaving",
      "left",
      "_s",
      "_r"
    ],
    [
      "lend",
      "_ing",
      "lent",
      "_s",
      "_er"
    ],
    [
      "let",
      "_ting",
      "_",
      "_s",
      "_ter"
    ],
    [
      "lie",
      "lying",
      "lay",
      "_s",
      "_r"
    ],
    [
      "light",
      "_ing",
      "lit",
      "_s",
      "_er"
    ],
    [
      "lose",
      "losing",
      "lost",
      "_s",
      "_r"
    ],
    [
      "make",
      "making",
      "made",
      "_s",
      "_r"
    ],
    [
      "mean",
      "_ing",
      "_t",
      "_s",
      "_er"
    ],
    [
      "meet",
      "_ing",
      "met",
      "_s",
      "_er"
    ],
    [
      "pay",
      "_ing",
      "paid",
      "_s",
      "_er"
    ],
    [
      "put",
      "_ting",
      "_",
      "_s",
      "_ter"
    ],
    [
      "quit",
      "_ting",
      "_",
      "_s",
      "_ter"
    ],
    [
      "read",
      "_ing",
      "_",
      "_s",
      "_er"
    ],
    [
      "ride",
      "riding",
      "rode",
      "_s",
      "_r"
    ],
    [
      "ring",
      "_ing",
      "rang",
      "_s",
      "_er"
    ],
    [
      "rise",
      "rising",
      "rose",
      "_s",
      "_r"
    ],
    [
      "run",
      "_ning",
      "ran",
      "_s",
      "_ner"
    ],
    [
      "say",
      "_ing",
      "said",
      "_s",

    ],
    [
      "see",
      "_ing",
      "saw",
      "_s",
      "_r"
    ],
    [
      "sell",
      "_ing",
      "sold",
      "_s",
      "_er"
    ],
    [
      "send",
      "_ing",
      "sent",
      "_s",
      "_er"
    ],
    [
      "set",
      "_ting",
      "_",
      "_s",
      "_ter"
    ],
    [
      "shake",
      "shaking",
      "shook",
      "_s",
      "_r"
    ],
    [
      "shine",
      "shining",
      "shone",
      "_s",
      "_r"
    ],
    [
      "shoot",
      "_ing",
      "shot",
      "_s",
      "_er"
    ],
    [
      "show",
      "_ing",
      "_ed",
      "_s",
      "_er"
    ],
    [
      "shut",
      "_ting",
      "_",
      "_s",
      "_ter"
    ],
    [
      "sing",
      "_ing",
      "sang",
      "_s",
      "_er"
    ],
    [
      "sink",
      "_ing",
      "sank",
      "_s",
      "_er"
    ],
    [
      "sit",
      "_ting",
      "sat",
      "_s",
      "_ter"
    ],
    [
      "slide",
      "sliding",
      "slid",
      "_s",
      "_r"
    ],
    [
      "speak",
      "_ing",
      "spoke",
      "_s",
      "_er"
    ],
    [
      "spend",
      "_ing",
      "spent",
      "_s",
      "_er"
    ],
    [
      "spin",
      "_ning",
      "spun",
      "_s",
      "_ner"
    ],
    [
      "spread",
      "_ing",
      "_",
      "_s",
      "_er"
    ],
    [
      "stand",
      "_ing",
      "stood",
      "_s",
      "_er"
    ],
    [
      "steal",
      "_ing",
      "stole",
      "_s",
      "_er"
    ],
    [
      "stick",
      "_ing",
      "stuck",
      "_s",
      "_er"
    ],
    [
      "sting",
      "_ing",
      "stung",
      "_s",
      "_er"
    ],
    [
      "strike",
      "striking",
      "struck",
      "_s",
      "_r"
    ],
    [
      "swear",
      "_ing",
      "swore",
      "_s",
      "_er"
    ],
    [
      "swim",
      "_ing",
      "swam",
      "_s",
      "_mer"
    ],
    [
      "swing",
      "_ing",
      "swung",
      "_s",
      "_er"
    ],
    [
      "take",
      "taking",
      "took",
      "_s",
      "_r"
    ],
    [
      "teach",
      "_ing",
      "taught",
      "_s",
      "_er"
    ],
    [
      "tear",
      "_ing",
      "tore",
      "_s",
      "_er"
    ],
    [
      "tell",
      "_ing",
      "told",
      "_s",
      "_er"
    ],
    [
      "think",
      "_ing",
      "thought",
      "_s",
      "_er"
    ],
    [
      "throw",
      "_ing",
      "threw",
      "_s",
      "_er"
    ],
    [
      "understand",
      "_ing",
      "understood",
      "_s",

    ],
    [
      "wake",
      "waking",
      "woke",
      "_s",
      "_r"
    ],
    [
      "wear",
      "_ing",
      "wore",
      "_s",
      "_er"
    ],
    [
      "win",
      "_ning",
      "won",
      "_s",
      "_ner"
    ],
    [
      "withdraw",
      "_ing",
      "withdrew",
      "_s",
      "_er"
    ],
    [
      "write",
      "writing",
      "wrote",
      "_s",
      "_r"
    ],
    [
      "tie",
      "tying",
      "_d",
      "_s",
      "_r"
    ],
    [
      "obey",
      "_ing",
      "_ed",
      "_s",
      "_er"
    ],
    [
      "ski",
      "_ing",
      "_ied",
      "_s",
      "_er"
    ],
    [
      "boil",
      "_ing",
      "_ed",
      "_s",
      "_er"
    ],
    [
      "miss",
      "_ing",
      "_ed",
      "_",
      "_er"
    ],
    [
      "act",
      "_ing",
      "_ed",
      "_s",
      "_or"
    ],
    [
      "compete",
      "competing",
      "_d",
      "_s",
      "competitor"
    ],
    [
      "being",
      "are",
      "were",
      "are",

    ],
    [
      "imply",
      "_ing",
      "implied",
      "implies",
      "implier"
    ],
    [
      "ice",
      "icing",
      "_d",
      "_s",
      "_r"
    ],
    [
      "develop",
      "_ing",
      "_",
      "_s",
      "_er"
    ],
    [
      "wait",
      "_ing",
      "_ed",
      "_s",
      "_er"
    ],
    [
      "aim",
      "_ing",
      "_ed",
      "_s",
      "_er"
    ],
    [
      "spill",
      "_ing",
      "spilt",
      "_s",
      "_er"
    ],
    [
      "drop",
      "_ping",
      "_ped",
      "_s",
      "_per"
    ],
    [
      "head",
      "_ing",
      "_ed",
      "_s",
      "_er"
    ],
    [
      "log",
      "_ging",
      "_ged",
      "_s",
      "_ger"
    ],
    [
      "rub",
      "_bing",
      "_bed",
      "_s",
      "_ber"
    ],
    [
      "smash",
      "_ing",
      "_ed",
      "_es",
      "_er"
    ],
    [
      "add",
      "_ing",
      "_ed",
      "_s",
      "_er"
    ],
    [
      "word",
      "_ing",
      "_ed",
      "_s",
      "_er"
    ],
    [
      "suit",
      "_ing",
      "_ed",
      "_s",
      "_er"
    ],
    [
      "be",
      "am",
      "was",
      "am",
      ""
    ],
    [
      "load",
      "_ing",
      "_ed",
      "_s",
      "_er"
    ]
  ]
  //expand compact version out
module.exports = compact.map(function (arr) {
  var obj = {}
  for (var i = 0; i < arr.length; i++) {
    obj[types[i]] = arr[i].replace(/_/, arr[0])
  }
  return obj
})

// console.log(JSON.stringify(verb_irregulars, null, 2));

},{}],43:[function(require,module,exports){
// regex rules for each part of speech that convert it to all other parts of speech.
// used in combination with the generic 'fallback' method
var verb_rules = {
  "infinitive": [
    [
      "(eed)$",
      {
        "pr": "$1s",
        "g": "$1ing",
        "pa": "$1ed",
        "do": "$1er"
      }
    ],
    [
      "(e)(ep)$",
      {
        "pr": "$1$2s",
        "g": "$1$2ing",
        "pa": "$1pt",
        "do": "$1$2er"
      }
    ],
    [
      "(a[tg]|i[zn]|ur|nc|gl|is)e$",
      {
        "pr": "$1es",
        "g": "$1ing",
        "pa": "$1ed"
      }
    ],
    [
      "([i|f|rr])y$",
      {
        "pr": "$1ies",
        "g": "$1ying",
        "pa": "$1ied"
      }
    ],
    [
      "([td]er)$",
      {
        "pr": "$1s",
        "g": "$1ing",
        "pa": "$1ed"
      }
    ],
    [
      "([bd]l)e$",
      {
        "pr": "$1es",
        "g": "$1ing",
        "pa": "$1ed"
      }
    ],
    [
      "(ish|tch|ess)$",
      {
        "pr": "$1es",
        "g": "$1ing",
        "pa": "$1ed"
      }
    ],
    [
      "(ion|end|e[nc]t)$",
      {
        "pr": "$1s",
        "g": "$1ing",
        "pa": "$1ed"
      }
    ],
    [
      "(om)e$",
      {
        "pr": "$1es",
        "g": "$1ing",
        "pa": "ame"
      }
    ],
    [
      "([aeiu])([pt])$",
      {
        "pr": "$1$2s",
        "g": "$1$2$2ing",
        "pa": "$1$2"
      }
    ],
    [
      "(er)$",
      {
        "pr": "$1s",
        "g": "$1ing",
        "pa": "$1ed"
      }
    ],
    [
      "(en)$",
      {
        "pr": "$1s",
        "g": "$1ing",
        "pa": "$1ed"
      }
    ]
  ],
  "present": [
    [
      "(ies)$",
      {
        "in": "y",
        "g": "ying",
        "pa": "ied"
      }
    ],
    [
      "(tch|sh)es$",
      {
        "in": "$1",
        "g": "$1ing",
        "pa": "$1ed"
      }
    ],
    [
      "(ss)es$",
      {
        "in": "$1",
        "g": "$1ing",
        "pa": "$1ed"
      }
    ],
    [
      "([tzlshicgrvdnkmu])es$",
      {
        "in": "$1e",
        "g": "$1ing",
        "pa": "$1ed"
      }
    ],
    [
      "(n[dtk]|c[kt]|[eo]n|i[nl]|er|a[ytrl])s$",
      {
        "in": "$1",
        "g": "$1ing",
        "pa": "$1ed"
      }
    ],
    [
      "(ow)s$",
      {
        "in": "$1",
        "g": "$1ing",
        "pa": "ew"
      }
    ],
    [
      "(op)s$",
      {
        "in": "$1",
        "g": "$1ping",
        "pa": "$1ped"
      }
    ],
    [
      "([eirs])ts$",
      {
        "in": "$1t",
        "g": "$1tting",
        "pa": "$1tted"
      }
    ],
    [
      "(ll)s$",
      {
        "in": "$1",
        "g": "$1ing",
        "pa": "$1ed"
      }
    ],
    [
      "(el)s$",
      {
        "in": "$1",
        "g": "$1ling",
        "pa": "$1led"
      }
    ],
    [
      "(ip)es$",
      {
        "in": "$1e",
        "g": "$1ing",
        "pa": "$1ed"
      }
    ],
    [
      "ss$",
      {
        "in": "ss",
        "g": "ssing",
        "pa": "ssed"
      }
    ],
    [
      "s$",
      {
        "in": "",
        "g": "ing",
        "pa": "ed"
      }
    ]
  ],
  "gerund": [
    [
      "pping$",
      {
        "in": "p",
        "pr": "ps",
        "pa": "pped"
      }
    ],
    [
      "lling$",
      {
        "in": "ll",
        "pr": "lls",
        "pa": "lled"
      }
    ],
    [
      "tting$",
      {
        "in": "t",
        "pr": "ts",
        "pa": "t"
      }
    ],
    [
      "ssing$",
      {
        "in": "ss",
        "pr": "sses",
        "pa": "ssed"
      }
    ],
    [
      "gging$",
      {
        "in": "g",
        "pr": "gs",
        "pa": "gged"
      }
    ],
    [
      "([^aeiou])ying$",
      {
        "in": "$1y",
        "pr": "$1ies",
        "pa": "$1ied",
        "do": "$1ier"
      }
    ],
    [
      "(i.)ing$",
      {
        "in": "$1e",
        "pr": "$1es",
        "pa": "$1ed"
      }
    ],
    [
      "(u[rtcb]|[bdtpkg]l|n[cg]|a[gdkvtc]|[ua]s|[dr]g|yz|o[rlsp]|cre)ing$",
      {
        "in": "$1e",
        "pr": "$1es",
        "pa": "$1ed"
      }
    ],
    [
      "(ch|sh)ing$",
      {
        "in": "$1",
        "pr": "$1es",
        "pa": "$1ed"
      }
    ],
    [
      "(..)ing$",
      {
        "in": "$1",
        "pr": "$1s",
        "pa": "$1ed"
      }
    ]
  ],
  "past": [
    [
      "(ued)$",
      {
        "pr": "ues",
        "g": "uing",
        "pa": "ued",
        "do": "uer"
      }
    ],
    [
      "(e|i)lled$",
      {
        "pr": "$1lls",
        "g": "$1lling",
        "pa": "$1lled",
        "do": "$1ller"
      }
    ],
    [
      "(sh|ch)ed$",
      {
        "in": "$1",
        "pr": "$1es",
        "g": "$1ing",
        "do": "$1er"
      }
    ],
    [
      "(tl|gl)ed$",
      {
        "in": "$1e",
        "pr": "$1es",
        "g": "$1ing",
        "do": "$1er"
      }
    ],
    [
      "(ss)ed$",
      {
        "in": "$1",
        "pr": "$1es",
        "g": "$1ing",
        "do": "$1er"
      }
    ],
    [
      "pped$",
      {
        "in": "p",
        "pr": "ps",
        "g": "pping",
        "do": "pper"
      }
    ],
    [
      "tted$",
      {
        "in": "t",
        "pr": "ts",
        "g": "tting",
        "do": "tter"
      }
    ],
    [
      "gged$",
      {
        "in": "g",
        "pr": "gs",
        "g": "gging",
        "do": "gger"
      }
    ],
    [
      "(h|ion|n[dt]|ai.|[cs]t|pp|all|ss|tt|int|ail|ld|en|oo.|er|k|pp|w|ou.|rt|ght|rm)ed$",
      {
        "in": "$1",
        "pr": "$1s",
        "g": "$1ing",
        "do": "$1er"
      }
    ],
    [
      "(..[^aeiou])ed$",
      {
        "in": "$1e",
        "pr": "$1es",
        "g": "$1ing",
        "do": "$1er"
      }
    ],
    [
      "ied$",
      {
        "in": "y",
        "pr": "ies",
        "g": "ying",
        "do": "ier"
      }
    ],
    [
      "(.o)ed$",
      {
        "in": "$1o",
        "pr": "$1os",
        "g": "$1oing",
        "do": "$1oer"
      }
    ],
    [
      "(.i)ed$",
      {
        "in": "$1",
        "pr": "$1s",
        "g": "$1ing",
        "do": "$1er"
      }
    ],
    [
      "([rl])ew$",
      {
        "in": "$1ow",
        "pr": "$1ows",
        "g": "$1owing"
      }
    ],
    [
      "([pl])t$",
      {
        "in": "$1t",
        "pr": "$1ts",
        "g": "$1ting"
      }
    ]
  ]
}
//unpack compressed form
verb_rules=Object.keys(verb_rules).reduce(function(h,k){
  h[k]=verb_rules[k].map(function(a){
    var obj={
      reg:new RegExp(a[0],"i"),
      repl:{
        infinitive:a[1]["in"],
        present:a[1]["pr"],
        past:a[1]["pa"],
        gerund:a[1]["g"]
      }
    }
    if(a[1]["do"]){
      obj.repl.doer=a[1]["do"]
    }
    return obj
  })
  return h
},{})

module.exports = verb_rules;
// console.log(JSON.stringify(verb_rules, null, 2));

},{}],44:[function(require,module,exports){
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

},{"../../data/parts_of_speech":14,"./conjugate/conjugate":39}],45:[function(require,module,exports){
var lexicon = require("./data/lexicon")
var values = require("./data/lexicon/values")

var tokenize = require("./methods/tokenization/tokenize");
var parts_of_speech = require("./data/parts_of_speech")
var word_rules = require("./data/word_rules")
var wordnet_suffixes = require("./data/unambiguous_suffixes")
var Sentence = require("./sentence")
var Section = require("./section")
var parents = require("./parents/parents")

//possible 2nd part in a phrasal verb
var particles = ["in", "out", "on", "off", "behind", "way", "with", "of", "do", "away", "across", "ahead", "back", "over", "under", "together", "apart", "up", "upon", "aback", "down", "about", "before", "after", "around", "to", "forth", "round", "through", "along", "onto"]
particles = particles.reduce(function (h, s) {
  h[s] = true
  return h
}, {})

var merge_tokens = function (a, b) {
  a.text += " " + b.text
  a.normalised += " " + b.normalised
  a.pos_reason += "|" + b.pos_reason
  a.start = a.start || b.start
  a.noun_capital = (a.noun_capital && b.noun_capital)
  a.punctuated = a.punctuated || b.punctuated
  a.end = a.end || b.end
  return a
}

//combine adjacent neighbours, and special cases
var combine_tags = function (sentence) {
  var arr = sentence.tokens || []
  for (var i = 0; i <= arr.length; i++) {
    var next = arr[i + 1]

    if (arr[i] && next) {
      var tag = arr[i].pos.tag
        //'joe smith' are both NN, for example
      if (tag === next.pos.tag && arr[i].punctuated !== true && arr[i].noun_capital == next.noun_capital) {
        arr[i + 1] = merge_tokens(arr[i], arr[i + 1])
        arr[i] = null
      }
      //merge NNP and NN, like firstname, lastname
      else if ((tag === "NNP" && next.pos.tag === "NN") || (tag === "NN" && next.pos.tag === "NNP")) {
        arr[i + 1] = merge_tokens(arr[i], arr[i + 1])
        arr[i] = null
        arr[i + 1].pos = parts_of_speech['NNP']
      }
      //merge dates manually, which often have punctuation
      else if (tag === "CD" && next.pos.tag === "CD") {
        arr[i + 1] = merge_tokens(arr[i], arr[i + 1])
        arr[i] = null
      }
      //merge abbreviations with nouns manually, eg. "Joe jr."
      else if ((tag === "NNAB" && next.pos.parent === "noun") || (arr[i].pos.parent === "noun" && next.pos.tag === "NNAB")) {
        arr[i + 1] = merge_tokens(arr[i], arr[i + 1])
        arr[i] = null
      }
      //'will walk' -> future-tense verb
      else if (arr[i].normalised === "will" && next.pos.parent === "verb") {
        arr[i + 1] = merge_tokens(arr[i], arr[i + 1])
        arr[i] = null
      }
      //'hundred and fifty', 'march the 5th'
      else if (tag === "CD" && (next.normalised === "and" || next.normalised === "the") && arr[i + 2] && arr[i + 2].pos.tag === "CD") {
        arr[i + 1] = merge_tokens(arr[i], arr[i + 1])
        arr[i] = null
      }
      //capitals surrounding a preposition  'United States of America'
      else if (tag == "NN" && arr[i].noun_capital && (next.normalised == "of" || next.normalised == "and") && arr[i + 2] && arr[i + 2].noun_capital) {
        arr[i + 1] = merge_tokens(arr[i], arr[i + 1])
        arr[i] = null
        arr[i + 2] = merge_tokens(arr[i + 1], arr[i + 2])
        arr[i + 1] = null
      }
      //capitals surrounding two prepositions  'Phantom of the Opera'
      else if (arr[i].noun_capital && next.normalised == "of" && arr[i + 2] && arr[i + 2].pos.tag == "DT" && arr[i + 3] && arr[i + 3].noun_capital) {
        arr[i + 1] = merge_tokens(arr[i], arr[i + 1])
        arr[i] = null
        arr[i + 2] = merge_tokens(arr[i + 1], arr[i + 2])
        arr[i + 1] = null
        arr[i + 3] = merge_tokens(arr[i + 2], arr[i + 3])
        arr[i + 2] = null
      }
    }
  }
  sentence.tokens = arr.filter(function (r) {
    return r
  })
  return sentence
}

//some prepositions are clumped onto the back of a verb "looked for", "looks at"
//they should be combined with the verb, sometimes.
//does not handle seperated phrasal verbs ('take the coat off' -> 'take off')
var combine_phrasal_verbs = function (sentence) {
  var arr = sentence.tokens || []
  for (var i = 1; i < arr.length; i++) {
    if (particles[arr[i].normalised]) {
      //it matches a known phrasal-verb
      if (lexicon[arr[i - 1].normalised + " " + arr[i].normalised]) {
        // console.log(arr[i-1].normalised + " " + arr[i].normalised)
        arr[i] = merge_tokens(arr[i - 1], arr[i])
        arr[i - 1] = null
      }
    }
  }
  sentence.tokens = arr.filter(function (r) {
    return r
  })
  return sentence
}

var lexicon_pass = function (w) {
  if (lexicon.hasOwnProperty(w)) {
    return parts_of_speech[lexicon[w]]
  }
  //try to match it without a prefix - eg. outworked -> worked
  if (w.match(/^(over|under|out|-|un|re|en).{4}/)) {
    var attempt = w.replace(/^(over|under|out|.*?-|un|re|en)/, '')
    return parts_of_speech[lexicon[attempt]]
  }
}

var rules_pass = function (w) {
  for (var i = 0; i < word_rules.length; i++) {
    if (w.length > 4 && w.match(word_rules[i].reg)) {
      return parts_of_speech[word_rules[i].pos]
    }
  }
}

var fourth_pass = function (token, i, sentence) {
  var last = sentence.tokens[i - 1]
  var next = sentence.tokens[i + 1]
  var strong_determiners = {
      "the": 1,
      "a": 1,
      "an": 1
    }
    //resolve ambiguous 'march','april','may' with dates
  if ((token.normalised == "march" || token.normalised == "april" || token.normalised == "may") && ((next && next.pos.tag == "CD") || (last && last.pos.tag == "CD"))) {
    token.pos = parts_of_speech['CD']
    token.pos_reason = "may_is_date"
  }
  //if it's before a modal verb, it's a noun -> lkjsdf would
  if (next && token.pos.parent !== "noun" && token.pos.parent !== "glue" && next.pos.tag === "MD") {
    token.pos = parts_of_speech['NN']
    token.pos_reason = "before_modal"
  }
  //if it's after the word 'will' its probably a verb/adverb
  if (last && last.normalised == "will" && !last.punctuated && token.pos.parent == "noun" && token.pos.tag !== "PRP" && token.pos.tag !== "PP") {
    token.pos = parts_of_speech['VB']
    token.pos_reason = "after_will"
  }
  //if it's after the word 'i' its probably a verb/adverb
  if (last && last.normalised == "i" && !last.punctuated && token.pos.parent == "noun") {
    token.pos = parts_of_speech['VB']
    token.pos_reason = "after_i"
  }
  //if it's after an adverb, it's not a noun -> quickly acked
  //support form 'atleast he is..'
  if (last && token.pos.parent === "noun" && token.pos.tag !== "PRP" && token.pos.tag !== "PP" && last.pos.tag === "RB" && !last.start) {
    token.pos = parts_of_speech['VB']
    token.pos_reason = "after_adverb"
  }
  //no consecutive, unpunctuated adjectives -> real good
  if (next && token.pos.parent === "adjective" && next.pos.parent === "adjective" && !token.punctuated) {
    token.pos = parts_of_speech['RB']
    token.pos_reason = "consecutive_adjectives"
  }
  //if it's after a determiner, it's not a verb -> the walk
  if (last && token.pos.parent === "verb" && strong_determiners[last.pos.normalised] && token.pos.tag != "CP") {
    token.pos = parts_of_speech['NN']
    token.pos_reason = "determiner-verb"
  }
  //copulas are followed by a determiner ("are a .."), or an adjective ("are good")
  if (last && last.pos.tag === "CP" && token.pos.tag !== "DT" && token.pos.tag !== "RB" && token.pos.tag !== "PRP" && token.pos.parent !== "adjective" && token.pos.parent !== "value") {
    token.pos = parts_of_speech['JJ']
    token.pos_reason = "copula-adjective"
  }
  //copula, adverb, verb -> copula adverb adjective -> is very lkjsdf
  if (last && next && last.pos.tag === "CP" && token.pos.tag === "RB" && next.pos.parent === "verb") {
    sentence.tokens[i + 1].pos = parts_of_speech['JJ']
    sentence.tokens[i + 1].pos_reason = "copula-adverb-adjective"
  }
  // the city [verb] him.
  if (next && next.pos.tag == "PRP" && token.pos.tag !== "PP" && token.pos.parent == "noun" && !token.punctuated) {
    token.pos = parts_of_speech['VB']
    token.pos_reason = "before_[him|her|it]"
  }
  //the misled worker -> misled is an adjective, not vb
  if (last && next && last.pos.tag === "DT" && next.pos.parent === "noun" && token.pos.parent === "verb") {
    token.pos = parts_of_speech['JJ']
    token.pos_reason = "determiner-adjective-noun"
  }

  //where's he gone -> gone=VB, not JJ
  if (last && last.pos.tag === "PRP" && token.pos.tag === "JJ") {
    token.pos = parts_of_speech['VB']
    token.pos_reason = "adjective-after-pronoun"
  }

  return token
}

//add a 'quiet' token for contractions so we can represent their grammar
var handle_contractions = function (arr) {
  var contractions = {
    "i'd": ["i", "would"],
    "she'd": ["she", "would"],
    "he'd": ["he", "would"],
    "they'd": ["they", "would"],
    "we'd": ["we", "would"],
    "i'll": ["i", "will"],
    "she'll": ["she", "will"],
    "he'll": ["he", "will"],
    "they'll": ["they", "will"],
    "we'll": ["we", "will"],
    "i've": ["i", "have"],
    "they've": ["they", "have"],
    "we've": ["we", "have"],
    "should've": ["should", "have"],
    "would've": ["would", "have"],
    "could've": ["could", "have"],
    "must've": ["must", "have"],
    "i'm": ["i", "am"],
    "we're": ["we", "are"],
    "they're": ["they", "are"],
    "cannot": ["can", "not"]
  }
  var before, after, fix;
  for (var i = 0; i < arr.length; i++) {
    if (contractions.hasOwnProperty(arr[i].normalised)) {
      before = arr.slice(0, i)
      after = arr.slice(i + 1, arr.length)
      fix = [{
        text: arr[i].text,
        normalised: contractions[arr[i].normalised][0],
        start: arr[i].start
      }, {
        text: "",
        normalised: contractions[arr[i].normalised][1],
        start: undefined
      }]
      arr = before.concat(fix)
      arr = arr.concat(after)
      return handle_contractions(arr) //recursive
    }
  }
  return arr
}

//these contractions require (some) grammatical knowledge to disambig properly (e.g "he's"=> ['he is', 'he was']
var handle_ambiguous_contractions = function (arr) {
  var ambiguous_contractions = {
    "he's": "he",
    "she's": "she",
    "it's": "it",
    "who's": "who",
    "what's": "what",
    "where's": "where",
    "when's": "when",
    "why's": "why",
    "how's": "how"
  }
  var before, after, fix;
  for (var i = 0; i < arr.length; i++) {
    if (ambiguous_contractions.hasOwnProperty(arr[i].normalised)) {
      before = arr.slice(0, i)
      after = arr.slice(i + 1, arr.length)
      //choose which verb this contraction should have..
      var chosen = "is"
        //look for the next verb, and if it's past-tense (he's walked -> he has walked)
      for (var o = i + 1; o < arr.length; o++) {
        if (arr[o] && arr[o].pos && arr[o].pos.tag == "VBD") { //past tense
          chosen = "has"
          break
        }
      }
      fix = [{
        text: arr[i].text,
        normalised: ambiguous_contractions[arr[i].normalised], //the "he" part
        start: arr[i].start,
        pos: parts_of_speech[lexicon[ambiguous_contractions[arr[i].normalised]]],
        pos_reason: "ambiguous_contraction"
      }, {
        text: "",
        normalised: chosen, //is,was,or have
        start: undefined,
        pos: parts_of_speech[lexicon[chosen]],
        pos_reason: "silent_contraction"
      }]
      arr = before.concat(fix)
      arr = arr.concat(after)
      return handle_ambiguous_contractions(arr) //recursive
    }
  }
  return arr
}

////////////////
///party-time//
var main = function (text, options) {
  options = options || {}
  if (!text || !text.match(/[a-z0-9]/i)) {
    return new Section([])
  }
  var sentences = tokenize(text);

  sentences.forEach(function (sentence) {

    //first, let's handle the capitalisation-of-the-first-word issue
    var first = sentence.tokens[0]
    if (first) {
      //if second word is a noun-capital, give more sympathy to this capital
      if (sentence.tokens[1] && sentence.tokens[1].noun_capital && !lexicon_pass(first.normalised)) {
        sentence.tokens[0].noun_capital = true;
      }
    }
    //smart handling of contractions
    sentence.tokens = handle_contractions(sentence.tokens)

    //first pass, word-level clues
    sentence.tokens = sentence.tokens.map(function (token) {
      //it has a capital and isn't a month, etc.
      if (token.noun_capital && !values[token.normalised]) {
        token.pos = parts_of_speech['NN']
        token.pos_reason = "noun_capitalised"
        return token
      }
      //known words list
      var lex = lexicon_pass(token.normalised)
      if (lex) {
        token.pos = lex;
        token.pos_reason = "lexicon"
        //if it's an abbreviation, forgive the punctuation (eg. 'dr.')
        if (token.pos.tag === "NNAB") {
          token.punctuated = false
        }
        return token
      }

      //handle punctuation like ' -- '
      if (!token.normalised) {
        token.pos = parts_of_speech['UH']
        token.pos_reason = "wordless_string"
        return token
      }

      // suffix pos signals from wordnet
      var len = token.normalised.length
      if (len > 4) {
        var suffix = token.normalised.substr(len - 4, len - 1)
        if (wordnet_suffixes.hasOwnProperty(suffix)) {
          token.pos = parts_of_speech[wordnet_suffixes[suffix]]
          token.pos_reason = "wordnet suffix"
          return token
        }
      }

      // suffix regexes for words
      var r = rules_pass(token.normalised);
      if (r) {
        token.pos = r;
        token.pos_reason = "regex suffix"
        return token
      }

      //see if it's a number
      if (parseFloat(token.normalised)) {
        token.pos = parts_of_speech['CD']
        token.pos_reason = "parsefloat"
        return token
      }

      return token
    })

    //second pass, wrangle results a bit
    sentence.tokens = sentence.tokens.map(function (token, i) {
      //set ambiguous 'ed' endings as either verb/adjective
      if (token.pos_reason !== "lexicon" && token.normalised.match(/.ed$/)) {
        token.pos = parts_of_speech['VB']
        token.pos_reason = "ed"
      }
      return token
    })

    //split-out more difficult contractions, like "he's"->["he is", "he was"]
    // (now that we have enough pos data to do this)
    sentence.tokens = handle_ambiguous_contractions(sentence.tokens)

    //third pass, seek verb or noun phrases after their signals
    var need = null
    var reason = ''
    sentence.tokens = sentence.tokens.map(function (token, i) {
      var next = sentence.tokens[i + 1]
      if (token.pos) {
        //suggest noun after some determiners (a|the), posessive pronouns (her|my|its)
        if (token.normalised == "the" || token.normalised == "a" || token.normalised == "an" || token.pos.tag === "PP") {
          need = 'noun'
          reason = token.pos.name
          return token //proceed
        }
        //suggest verb after personal pronouns (he|she|they), modal verbs (would|could|should)
        if (token.pos.tag === "PRP" && token.pos.tag !== "PP" || token.pos.tag === "MD") {
          need = 'verb'
          reason = token.pos.name
          return token //proceed
        }

      }
      //satisfy need on a conflict, and fix a likely error
      if (token.pos) {
        if (need == "verb" && token.pos.parent == "noun" && (!next || (next.pos && next.pos.parent != "noun"))) {
          if (!next || !next.pos || next.pos.parent != need) { //ensure need not satisfied on the next one
            token.pos = parts_of_speech['VB']
            token.pos_reason = "signal from " + reason
            need = null
          }
        }
        if (need == "noun" && token.pos.parent == "verb" && (!next || (next.pos && next.pos.parent != "verb"))) {
          if (!next || !next.pos || next.pos.parent != need) { //ensure need not satisfied on the next one
            token.pos = parts_of_speech["NN"]
            token.pos_reason = "signal from " + reason
            need = null
          }
        }
      }
      //satisfy need with an unknown pos
      if (need && !token.pos) {
        if (!next || !next.pos || next.pos.parent != need) { //ensure need not satisfied on the next one
          token.pos = parts_of_speech[need]
          token.pos_reason = "signal from " + reason
          need = null
        }
      }
      //set them back as satisfied..
      if (need === 'verb' && token.pos && token.pos.parent === 'verb') {
        need = null
      }
      if (need === 'noun' && token.pos && token.pos.parent === 'noun') {
        need = null
      }
      return token
    })

    //third pass, identify missing clauses, fallback to noun
    var has = {}
    sentence.tokens.forEach(function (token) {
      if (token.pos) {
        has[token.pos.parent] = true
      }
    })
    sentence.tokens = sentence.tokens.map(function (token, i) {
      if (!token.pos) {
        //if there is no verb in the sentence, and there needs to be.
        if (has['adjective'] && has['noun'] && !has['verb']) {
          token.pos = parts_of_speech['VB']
          token.pos_reason = "need one verb"
          has['verb'] = true
          return token
        }

        //fallback to a noun
        token.pos = parts_of_speech['NN']
        token.pos_reason = "noun fallback"
      }
      return token
    })
    //fourth pass, error correction
    sentence.tokens = sentence.tokens.map(function (token, i) {
      return fourth_pass(token, i, sentence)
    })
    //run the fourth-pass again!
    sentence.tokens = sentence.tokens.map(function (token, i) {
      return fourth_pass(token, i, sentence)
    })
  })

  //combine neighbours
  if (!options.dont_combine) {
    sentences = sentences.map(function (s) {
      return combine_tags(s)
    })
    sentences = sentences.map(function (s) {
      return combine_phrasal_verbs(s)
    })
  }

  //make them Sentence objects
  sentences = sentences.map(function (s) {
    var sentence = new Sentence(s.tokens)
    sentence.type = s.type
    return sentence
  })
  //add analysis on each token
  sentences = sentences.map(function (s) {
    s.tokens = s.tokens.map(function (token, i) {
      token.analysis = parents[token.pos.parent](token.normalised, s, i)
      return token
    })
    return s
  })

  //add next-last references
  sentences = sentences.map(function (sentence, i) {
    sentence.last = sentences[i - 1]
    sentence.next = sentences[i + 1]
    return sentence
  })
  //return a Section object, with its methods
  return new Section(sentences)
}

module.exports = main;

// console.log( pos("Geroge Clooney walked, quietly into a bank. It was cold.") )
// console.log( pos("it is a three-hundred and one").tags() )
// console.log( pos("funny funny funny funny").sentences[0].tokens )
// pos("In March 2009, while Secretary of State for Energy and Climate Change, Miliband attended the UK premiere of climate-change film The Age of Stupid, where he was ambushed").sentences[0].tokens.map(function(t){console.log(t.pos.tag + "  "+t.text)})
// pos("the Energy and Climate Change, Miliband").sentences[0].tokens.map(function(t){console.log(t.pos.tag + "  "+t.text)})
// console.log(pos("Energy and Climate Change, Miliband").sentences[0].tokens)
// console.log(pos("http://google.com").sentences[0].tokens)
// console.log(pos("may live").tags())
// console.log(pos("may 7th live").tags())
// console.log(pos("She and Marc Emery married on July 23, 2006.").tags())
// console.log(pos("Toronto is fun. Spencer and heather quickly walked. it was cool").sentences[0].referables())
// console.log(pos("a hundred").sentences[0].tokens)
// console.log(pos("Tony Reagan skates").sentences[0].tokens)
// console.log(pos("She and Marc Emery married on July 23, 2006").sentences[0].tokens)
// console.log(pos("Tony Hawk walked quickly to the store.").sentences[0].tokens)
// console.log(pos("jahn j. jacobheimer").sentences[0].tokens[0].analysis.is_person())
// pos("Dr. Conrad Murray recieved a guilty verdict").sentences[0].tokens.map(function(t){console.log(t.pos.tag + "  "+t.text)})
// pos("the Phantom of the Opera").sentences[0].tokens.map(function(t){console.log(t.pos.tag + "  "+t.text)})
// pos("Tony Hawk is nice").sentences[0].tokens.map(function(t){console.log(t.pos.tag + "  "+t.text)})
// pos("tony hawk is nice").sentences[0].tokens.map(function(t){console.log(t.pos.tag + "  "+t.text)})
// console.log(pos("look after a kid").sentences[0].tags())
// pos("Sather tried to stop the deal, but when he found out that Gretzky").sentences[0].tokens.map(function(t){console.log(t.pos.tag + "  "+t.text+"  "+t.pos_reason)})
// pos("Gretzky had tried skating").sentences[0].tokens.map(function(t){console.log(t.pos.tag + "  "+t.text+"  "+t.pos_reason)})
// pos("Sally and Tom fight a lot. She thinks he is her friend.").sentences[0].tokens.map(function(t){console.log(t.pos.tag + "  "+t.text+"  "+t.pos_reason)})

// console.log(pos("i think Tony Danza is cool. He rocks and he is golden.").sentences[0].tokens[2].analysis.referenced_by())
// console.log(pos("i think Tony Danza is cool and he is golden.").sentences[0].tokens[6].analysis.reference_to())
// console.log(pos("Tina grabbed her shoes. She is lovely.").sentences[0].tokens[0].analysis.referenced_by())
// console.log(pos("Sally and Tom fight a lot. She thinks he is her friend.").sentences[0].tokens[0].analysis.referenced_by())

// console.log(pos("it's gotten the best features").sentences[0].tokens[1].normalised=="has") //bug

// console.log(pos("he's fun").sentences[0].tokens[1].normalised=="is")

},{"./data/lexicon":2,"./data/lexicon/values":12,"./data/parts_of_speech":14,"./data/unambiguous_suffixes":15,"./data/word_rules":16,"./methods/tokenization/tokenize":22,"./parents/parents":35,"./section":46,"./sentence":47}],46:[function(require,module,exports){
//a section is a block of text, with an arbitrary number of sentences
//these methods are just wrappers around the ones in sentence.js
var Section = function(sentences) {
  var the = this
  the.sentences = sentences || [];

  the.text = function() {
    return the.sentences.map(function(s) {
      return s.text()
    }).join(' ')
  }

  the.tense = function() {
    return the.sentences.map(function(s) {
      return s.tense()
    })
  }

  //pluck out wanted data from sentences
  the.nouns = function() {
    return the.sentences.map(function(s) {
      return s.nouns()
    }).reduce(function(arr, a) {
      return arr.concat(a)
    }, [])
  }

  the.entities = function(options) {
    return the.sentences.map(function(s) {
      return s.entities(options)
    }).reduce(function(arr, a) {
      return arr.concat(a)
    }, [])
  }

  the.people = function() {
    return the.sentences.map(function(s) {
      return s.people()
    }).reduce(function(arr, a) {
      return arr.concat(a)
    }, [])
  }

  the.adjectives = function() {
    return the.sentences.map(function(s) {
      return s.adjectives()
    }).reduce(function(arr, a) {
      return arr.concat(a)
    }, [])
  }

  the.verbs = function() {
    return the.sentences.map(function(s) {
      return s.verbs()
    }).reduce(function(arr, a) {
      return arr.concat(a)
    }, [])
  }

  the.adverbs = function() {
    return the.sentences.map(function(s) {
      return s.adverbs()
    }).reduce(function(arr, a) {
      return arr.concat(a)
    }, [])
  }

  the.values = function() {
    return the.sentences.map(function(s) {
      return s.values()
    }).reduce(function(arr, a) {
      return arr.concat(a)
    }, [])
  }

  the.tags = function() {
    return the.sentences.map(function(s) {
      return s.tags()
    })
  }

  //transform the sentences
  the.negate = function() {
    the.sentences = the.sentences.map(function(s) {
      return s.negate()
    })
    return the
  }
  the.to_past = function() {
    the.sentences = the.sentences.map(function(s) {
      return s.to_past()
    })
    return the
  }
  the.to_present = function() {
    the.sentences = the.sentences.map(function(s) {
      return s.to_present()
    })
    return the
  }
  the.to_future = function() {
    the.sentences = the.sentences.map(function(s) {
      return s.to_future()
    })
    return the
  }

}
module.exports = Section;

},{}],47:[function(require,module,exports){
// methods that hang on a parsed set of words
// accepts parsed tokens
var Sentence = function(tokens) {
  var the = this
  the.tokens = tokens || [];

  var capitalise = function(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  the.tense = function() {
    var verbs = the.tokens.filter(function(token) {
      return token.pos.parent === "verb"
    })
    return verbs.map(function(v) {
      return v.analysis.tense
    })
  }

  the.to_past = function() {
    the.tokens = the.tokens.map(function(token) {
      if (token.pos.parent === "verb") {
        token.text = token.analysis.to_past()
        token.normalised = token.text
      }
      return token
    })
    return the
  }

  the.to_present = function() {
    the.tokens = the.tokens.map(function(token) {
      if (token.pos.parent === "verb") {
        token.text = token.analysis.to_present()
        token.normalised = token.text
      }
      return token
    })
    return the
  }

  the.to_future = function() {
    the.tokens = the.tokens.map(function(token) {
      if (token.pos.parent === "verb") {
        token.text = token.analysis.to_future()
        token.normalised = token.text
      }
      return token
    })
    return the
  }

  the.insert = function(token, i) {
    if (i && token) {
      the.tokens.splice(i, 0, token);
    }
  }

  //negate makes the sentence mean the opposite thing.
  the.negate = function() {
    //these are cheap ways to negate the meaning
    // ('none' is ambiguous because it could mean (all or some) )
    var logic_negate = {
        //some logical ones work
        "everyone": "no one",
        "everybody": "nobody",
        "someone": "no one",
        "somebody": "nobody",
        // everything:"nothing",
        "always": "never",
        //copulas
        "is": "isn't",
        "are": "aren't",
        "was": "wasn't",
        "will": "won't",
        //modals
        "didn't": "did",
        "wouldn't": "would",
        "couldn't": "could",
        "shouldn't": "should",
        "can't": "can",
        "won't": "will",
        "mustn't": "must",
        "shan't": "shall",
        "shant": "shall",

        "did": "didn't",
        "would": "wouldn't",
        "could": "couldn't",
        "should": "shouldn't",
        "can": "can't",
        "must": "mustn't"
      }
      //loop through each term..
    for (var i = 0; i < the.tokens.length; i++) {
      var tok = the.tokens[i]
      // handle ambiguous contractions
      if (tok.pos_reason === 'ambiguous_contraction') { tok.text = tok.normalised; }
      
      //turn 'is' into 'isn't', etc - make sure 'is' isnt followed by a 'not', too
      if (logic_negate[tok.normalised] && (!the.tokens[i + 1] || the.tokens[i + 1].normalised != "not")) {
        tok.text = logic_negate[tok.normalised]
        tok.normalised = logic_negate[tok.normalised]
        if (tok.capitalised) {
          tok.text = capitalise(tok.text)
        }
        return the
      }

      // find the first verb..
      if (tok.pos.parent == "verb") {
        // if verb is already negative, make it not negative
        if (tok.analysis.negative()) {
          if (the.tokens[i + 1] && the.tokens[i + 1].normalised == "not") {
            the.tokens.splice(i + 1, 1)
          }
          return the
        }
        //turn future-tense 'will go' into "won't go"
        if (tok.normalised.match(/^will /i)) {
          tok.text = tok.text.replace(/^will /i, "won't ")
          tok.normalised = tok.text
          if (tok.capitalised) {
            tok.text = capitalise(tok.text)
          }
          return the
        }
        // - INFINITIVE-
        // 'i walk' -> "i don't walk"
        if (tok.analysis.form == "infinitive" && tok.analysis.form != "future") {
          tok.text = "don't " + (tok.analysis.conjugate().infinitive || tok.text)
          tok.normalised = tok.text.toLowerCase()
          return the
        }
        // - GERUND-
        // if verb is gerund, 'walking' -> "not walking"
        if (tok.analysis.form == "gerund") {
          tok.text = "not " + tok.text
          tok.normalised = tok.text.toLowerCase()
          return the
        }
        // - PAST-
        // if verb is past-tense, 'he walked' -> "he did't walk"
        if (tok.analysis.tense == "past") {
          tok.text = "didn't " + (tok.analysis.conjugate().infinitive || tok.text)
          tok.normalised = tok.text.toLowerCase()
          return the
        }
        // - PRESENT-
        // if verb is present-tense, 'he walks' -> "he doesn't walk"
        if (tok.analysis.tense == "present") {
          tok.text = "doesn't " + (tok.analysis.conjugate().infinitive || tok.text)
          tok.normalised = tok.text.toLowerCase()
          return the
        }
        // - FUTURE-
        // if verb is future-tense, 'will go' -> won't go. easy-peasy
        if (tok.analysis.tense == "future") {
          if (tok.normalised == "will") {
            tok.normalised = "won't"
            tok.text = "won't"
          } else {
            tok.text = tok.text.replace(/^will /i, "won't ")
            tok.normalised = tok.normalised.replace(/^will /i, "won't ")
          }
          if (tok.capitalised) {
            tok.text = capitalise(tok.text);
          }
          return the
        }

        return the
      }
    }

    return the
  }

  the.entities = function(options) {
    var spots = []
    options = options || {}
    the.tokens.forEach(function(token) {
      if (token.pos.parent === "noun" && token.analysis.is_entity()) {
        spots.push(token)
      }
    })
    if (options.ignore_gerund) {
      spots = spots.filter(function(t) {
        return t.pos.tag !== "VBG"
      })
    }
    return spots
  }

  //noun-entities that look like person names..
  the.people = function(){
    return the.entities({}).filter(function(o){
      return o.analysis.is_person()
    })
  }

  the.text = function() {
    return the.tokens.map(function(s) {
      return s.text
    }).join(' ')
  }

  //sugar 'grab' methods
  the.verbs = function() {
    return the.tokens.filter(function(t) {
      return t.pos.parent == "verb"
    })
  }

  the.adverbs = function() {
    return the.tokens.filter(function(t) {
      return t.pos.parent == "adverb"
    })
  }

  the.nouns = function() {
    return the.tokens.filter(function(t) {
      return t.pos.parent == "noun"
    })
  }

  the.adjectives = function() {
    return the.tokens.filter(function(t) {
      return t.pos.parent == "adjective"
    })
  }

  the.values = function() {
    return the.tokens.filter(function(t) {
      return t.pos.parent == "value"
    })
  }

  the.tags = function() {
    return the.tokens.map(function(t) {
      return t.pos.tag
    })
  }

  //find the 'it', 'he', 'she', and 'they' of this sentence
  //these are the words that get 'exported' to be used in other sentences
  the.referables=function(){
    var pronouns={
      he:undefined,
      she:undefined,
      they:undefined,
      it:undefined
    }
    the.tokens.forEach(function(t){
      if(t.pos.parent=="noun" && t.pos.tag!="PRP"){
        pronouns[t.analysis.pronoun()]=t
      }
    })
    return pronouns
  }

  return the
}

module.exports = Sentence;

},{}],48:[function(require,module,exports){
//just a wrapper for text -> entities
//most of this logic is in ./parents/noun
var pos = require("./pos");

var main = function (text, options) {
  options = options || {}
  //collect 'entities' from all nouns
  var sentences = pos(text, options).sentences
  var arr = sentences.reduce(function (arr, s) {
      return arr.concat(s.entities(options))
    }, [])
    //for people, remove instances of 'george', and 'bush' after 'george bush'.
  var ignore = {}
  arr = arr.filter(function (o) {
    //add tokens to blacklist
    if (o.analysis.is_person()) {
      o.normalised.split(' ').forEach(function (s) {
        ignore[s] = true
      })
    }
    if (ignore[o.normalised]) {
      return false
    }
    return true
  })

  return arr
}

module.exports = main;

// console.log(spot("Tony Hawk is cool. Tony eats all day.").map(function(s){return s}))
// console.log(spot("Tony eats all day. Tony Hawk is cool.").map(function(s){return s}))
// console.log(spot("My Hawk is cool").map(function(s){return s.normalised}))

},{"./pos":45}]},{},[1]);

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


var parts_of_speech={
  "VB": {
    "description": "verb, base form",
    "example": "eat",
    "parent": "verb",
    "tag": "VB"
  },
  "CP": {
    "description": "copula",
    "example": "is, was, were",
    "parent": "verb",
    "tag": "CP"
  },
  "VBD": {
    "description": "verb, past tense",
    "example": "ate",
    "parent": "verb",
    "tense": "past",
    "tag": "VBD"
  },
  "VBN": {
    "description": "verb, past part",
    "example": "eaten",
    "parent": "verb",
    "tense": "past",
    "tag": "VBN"
  },
  "VBP": {
    "description": "Verb, present",
    "example": "eat",
    "parent": "verb",
    "tense": "present",
    "tag": "VBP"
  },
  "VBZ": {
    "description": "Verb, present",
    "example": "eats, swims",
    "tense": "present",
    "parent": "verb",
    "tag": "VBZ"
  },
  "MD": {
    "description": "Modal",
    "example": "can,should",
    "parent": "glue",
    "tag": "MD"
  },
  "RB": {
    "description": "Adverb",
    "example": "quickly, softly",
    "parent": "glue",
    "tag": "RB"
  },
  "JJ": {
    "description": "Adjective",
    "example": "big, nice",
    "parent": "adjective",
    "tag": "JJ"
  },
  "JJR": {
    "description": "Adj., comparative",
    "example": "bigger, cooler",
    "parent": "adjective",
    "tag": "JJR"
  },
  "JJS": {
    "description": "Adj., superlative",
    "example": "biggest, fattest",
    "parent": "adjective",
    "tag": "JJS"
  },
  "RBR": {
    "description": "Adverb, comparative",
    "example": "faster, cooler",
    "parent": "adjective",
    "tag": "RBR"
  },
  "RBS": {
    "description": "Adverb, superlative",
    "example": "fastest (driving), coolest (looking)",
    "parent": "adjective",
    "tag": "RBS"
  },
  "NN": {
    "description": "Noun, sing. or mass",
    "example": "dog, rain",
    "parent": "noun",
    "tag": "NN"
  },
  "NNP": {
    "description": "Proper noun, sing.",
    "example": "Edinburgh, skateboard",
    "parent": "noun",
    "tag": "NNP"
  },
  "NNPS": {
    "description": "Proper noun, plural",
    "example": "Smiths",
    "parent": "noun",
    "tag": "NNPS"
  },
  "NNS": {
    "description": "Noun, plural",
    "example": "dogs, foxes",
    "parent": "noun",
    "tag": "NNS"
  },
 "NNO": {
    "description": "Noun, possessive",
    "example": "spencer's, sam's",
    "parent": "noun",
    "tag": "NNO"
  },
  "PP": {
    "description": "Possessive pronoun",
    "example": "my,one's",
    "parent": "glue",
    "tag": "PP"
  },
  "FW": {
    "description": "foreign word",
    "example": "mon dieu, voila",
    "parent": "noun",
    "tag": "FW"
  },
  "CD": {
    "description": "Cardinal number",
    "example": "one,two",
    "parent": "glue", //may want to change this
    "tag": "CD"
  },
  "VBG": {
    "description": "verb, gerund",
    "example": "eating,winning",
    "parent": "verb",
    "tag": "VBG"
  },
  "NG": {
    "description": "noun, gerund",
    "example": "eating,winning - but used grammatically as a noun",
    "parent": "noun",
    "tag": "VBG"
  },
  "IN": {
    "description": "Preposition",
    "example": "of,in,by",
    "parent": "glue",
    "tag": "IN"
  },
  "UP": {
    "description": "dependent preposition",
    "example": "up, down",
    "parent": "glue",
    "tag": "UP"
  },
  "CC": {
    "description": "Coord Conjuncn",
    "example": "and,but,or",
    "parent": "glue",
    "tag": "CC"
  },
  "PRP": {
    "description": "Personal pronoun",
    "example": "I,you,she",
    "parent": "glue",
    "tag": "PRP"
  },
  "DT": {
    "description": "Determiner",
    "example": "the,some",
    "parent": "title",
    "tag": "DT"
  },
  "example": {
    "description": "Existential there",
    "example": "there",
    "parent": "glue",
    "tag": "EX"
  },
  "POS": {
    "description": "Possessive ending",
    "example": "s",
    "parent": "glue",
    "tag": "POS"
  },
  "PDT": {
    "description": "Predeterminer",
    "example": "all, both",
    "parent": "glue",
    "tag": "PDT"
  },
  "RP": {
    "description": "Particle",
    "example": "up,off",
    "parent": "glue",
    "tag": "RP"
  },
  "TO": {
    "description": "to",
    "example": "to",
    "parent": "glue",
    "tag": "TO"
  },
  "UH": {
    "description": "Interjection",
    "example": "oh, oops",
    "parent": "glue",
    "tag": "UH"
  },
  "WDT": {
    "description": "Wh-determiner",
    "example": "which,that",
    "parent": "glue",
    "tag": "WDT"
  },
  "WP": {
    "description": "Wh pronoun",
    "example": "who,what",
    "parent": "glue",
    "tag": "WP"
  },
  "WRB": {
    "description": "Wh-adverb",
    "example": "how,where",
    "parent": "glue",
    "tag": "WRB"
  },
  "LS": {
    "description": "List item marker",
    "example": "1,One",
    "parent": "glue",
    "tag": "LS"
  },
  "SYM": {
    "description": "Symbol",
    "example": "+,%,&",
    "parent": "glue",
    "tag": "SYM"
  }
}


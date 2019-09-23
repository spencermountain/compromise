module.exports = {
  toTitleCase: {
    desc: 'set the first letter of each term as a capital',
    returns: 'Text',
    example: "nlp('jupiter, pluto and mars').nouns().toTitleCase().all().out()\n//Jupiter, Pluto and Mars.",
  },
  toUpperCase: {
    desc: 'set all the letters as a capital',
    returns: 'Text',
    example: "nlp('Dental plan. Lisa needs braces.').match('dental .').toUpperCase().out()\n//DENTAL PLAN.",
  },
  toLowerCase: {
    desc: 'set all the letters as a not-capital. Even acronyms and first-letters of sentences',
    returns: 'Text',
    example: "nlp('Careful! They’re RUFFLED!!').toLowerCase().out()\n//careful! they’re ruffled!!",
  },
  toCamelCase: {
    desc: 'remove whitespace and titlecase the words',
    returns: 'Text',
    example: "nlp('natural language processing').toCamelCase().out()\n//NaturalLanguageProcessing",
  },
  hyphenate: {
    desc: 'remove whitespace and add a hyphenate between the words',
    returns: 'Text',
    example: "nlp('natural language processing').hyphenate().out()\n//natural-language-processing",
  },
  dehyphenate: {
    desc: 'remove hyphens and add normal whitespace between words',
    returns: 'Text',
    example: "nlp('natural-language processing').dehyphenate().out()\n//natural language processing",
  },
  trim: {
    desc: 'remove leading and trailing whitespace from each match',
    returns: 'Text',
    example: "nlp(' Lenny and Carl ').people().trim().out()\n//['Lenny', 'Carl']",
  },
  normalize: {
    desc:
      'transforms whitespace, case, punctuation, contractions and values, so that they are more standard and workable',
    returns: 'Doc',
    example:
      "nlp(' so... you like   DONUTS? have all the donuts in the WORLD!!!').normalize().sentences(0).out()\n//So you like donuts?",
  },
}

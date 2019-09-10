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
  // getPunctuation: {
  //   desc: 'get an array of trailing-punctuation for the results',
  //   returns: 'Array',
  //   example: "nlp('my bubbly, longnecked, beechwood aged lover').adjectives().eq(1).getPunctuation()\n//[',']",
  // },
  // setPunctuation: {
  //   desc: 'overwrite the trailing punctuation',
  //   returns: 'Text',
  //   example: "nlp('there\\'s a new mexico?').sentences().setPunctuation('!??').out()\n//there's a new mexico!??",
  // },
  insertBefore: {
    desc: 'append a word (or words) before each match',
    mutative: true,
    returns: 'Text',
    example: "nlp('stupid flanders').match('flanders').insertBefore('sexy').all().out()\n//stupid sexy flanders",
  },
  insertAfter: {
    desc: 'append a word (or words) after each match',
    mutative: true,
    returns: 'Text',
    example: "nlp('i know so many words').insertAfter('bigly').all().out()\n//i know so many words bigly",
  },
  insertAt: {
    desc: 'insert a word or words at a known index (zero-based)',
    mutative: true,
    returns: 'Text',
    example: "nlp('so you are from Africa?').insertAt(2, 'like,').all().out()\n//so you are like, from africa?",
  },
  // lump: {
  //   desc: 'merge matches into one term, with shared tags.',
  //   mutative: true,
  //   returns: 'Text',
  //   example:
  //     "nlp('Keanu Reeves said whoa').match('#Person+').lump().all().out('terms')\n//['Keanu Reeves', 'said', 'whoa']",
  // },
  replaceWith: {
    desc:
      'turn the current selection into something else. Essentially just delete() -> insertAt(). The second param says whether to keep original tags around.',
    mutative: true,
    returns: 'Text',
    example:
      "nlp('it was the worst of times').match('worst').replaceWith('blurst', true).all().out()\n//it was the blurst of times",
  },
  replace: {
    desc:
      'turn a new selection into something else. Essentially just match() -> delete() -> insertAt(). Third optional param keeps original tags around.',
    mutative: true,
    returns: 'Text',
    example: "nlp('trust me folks, big league.').replace('big league','bigly').all().out()\n//trust me folks, bigly.",
  },
  delete: {
    desc: 'remove a match from the Text permanently. For a temporary filter, see `.not()`',
    mutative: true,
    returns: 'Text',
    example: "nlp('you don’t win friends with salad').delete('do not').out()\n//you win friends with salad",
  },
  splitOn: {
    desc: 'split matches into [before, match, after]',
    mutative: true,
    returns: 'Text',
    example: "nlp('Monorail...Once again! Monorail... Monorail!').splitOn('monorail').get(0).out()\n//Monorail",
  },
  splitBefore: {
    desc: 'split matches into [before,  match + after]',
    mutative: true,
    returns: 'Text',
    example:
      "nlp('Monorail...Once again! Monorail... Monorail!').splitBefore('monorail').get(0).out()\n//Monorail...Once again!",
  },
  splitAfter: {
    desc: 'split matches into [before + match,  after]',
    mutative: true,
    returns: 'Text',
    example: "nlp('Monorail...Once again! Monorail... Monorail!').splitAfter('monorail').get(0).out()\n//Monorail",
  },
  slice: {
    desc: 'grab a subset of the results',
    mutative: false,
    returns: 'Text',
    example: "nlp('Homer, have you been eating that sandwich again?').terms().slice(0, 3).out()\n//Homer, have you",
  },
  clone: {
    desc: 'copy the object, so changes no longer effect the original (make it ~immutable)',
    mutative: false,
    returns: 'Text',
    example:
      "nlp('would somebody please think of the children').clone().toUpperCase().parent.out()\n//would somebody please think of the children",
  },
  concat: {
    desc: 'combine two results into one',
    mutative: false,
    returns: 'Text',
    example: "nlp('My name is Otto').concat('and i love to get blotto').sentences().length\n//1",
  },
  flatten: {
    desc: 'turn a list of results into one result',
    mutative: false,
    returns: 'Text',
    example: "nlp('sex cauldron? I thought they closed that place down.').flatten().length\n//1",
  },
}

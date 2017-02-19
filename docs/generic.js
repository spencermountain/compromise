//methods on the generic Result prototype
module.exports = {
  inspect: {
    data: {
      desc: 'return a handy array of meta-data for this subset. Default subset is sentences, but it can be anything.',
      example: `nlp('The stage was set for the Alan Parsons Project! Which I believe was some sort of hovercraft.').data()
//[{normal:'the stage was set...'}]`,
      returns: 'array',
    },
    found: {
      desc: 'is the match empty or not',
      returns: 'bool',
      example: `nlp('oh say can you see?').match('see').found
//true`
    },
    all: {
      desc: 'zooms-out from a subset back to the whole input',
      returns: 'Text',
      example: `nlp('this is yelling').verbs().toTitleCase().all().out()
//this IS yelling`
    },
    debug: {
      desc: 'pretty-print the current selection to the console',
      returns: 'Text',
      example: `nlp('wayne’s world, party time, excellent- weeeyooweeeyoo!').debug().out()`
    },
    whitespace: {
      desc: 'set before or after whitespace on each match',
      returns: 'Text',
      example: `nlp('We like Roy! We like Roy!').whitespace.before('   ').out()
//We like Roy!   We like Roy!`
    },
    normalize: {
      desc: 'transforms whitespace, case, punctuation, contractions and values, so that they are more standard and workable',
      returns: 'Text',
      example: `nlp(' so... you like   DONUTS? have all the donuts in the WORLD!!!').normalize().sentences(0).out()
//So you like donuts?`
    },
  },
  array: {
    clone: {
      desc: 'copy the object, so changes no longer effect the original (make it ~immutable)',
      returns: 'Text',
      example: `nlp('would somebody please think of the children').clone().toUpperCase().parent.out()
//would somebody please think of the children`
    },
    length: {
      desc: 'how many individual matches in the result',
      returns: 'int',
      example: `nlp('jackie kennedy and aristotle onassis').people().length
//2`
    },
    concat: {
      desc: 'combine two results into one',
      returns: 'Text',
      example: `nlp('My name is Otto.').concat(nlp('i love to get blotto')).length()
//2`
    },
    flatten: {
      desc: 'turn a list of results into one result',
      returns: 'Text',
      example: `nlp('sex cauldron? I thought they closed that place down.').flatten().length()
//1`
    },
  },

  case: {
    toTitleCase: {
      desc: 'set the first letter of each term as a capital',
      returns: 'Text',
      example: `nlp('jupiter, pluto and mars').nouns().toTitleCase().all().out()
//Jupiter, Pluto and Mars.`
    },
    toUpperCase: {
      desc: 'set all the letters as a capital',
      returns: 'Text',
      example: `nlp('Dental plan. Lisa needs braces.').match('dental .').toUpperCase().out()
//DENTAL PLAN.`
    },
    toLowerCase: {
      desc: 'set all the letters as a not-capital. Even acronyms and first-letters of sentences',
      returns: 'Text',
      example: `nlp('Careful! They’re RUFFLED!!').toLowerCase().out()
//careful! they’re ruffled!!`
    },
    toCamelCase: {
      desc: 'remove whitespace and titlecase the words',
      returns: 'Text',
      example: `nlp('natural language processing').toCamelCase().out()
//NaturalLanguageProcessing`
    },
  },
  punctuation: {
    hyphenate: {
      desc: 'remove whitespace and add a hyphenate between the words',
      returns: 'Text',
      example: `nlp('natural language processing').hyphenate().out()
//natural-language-processing`
    },
    dehyphenate: {
      desc: 'remove hyphens and add normal whitespace between words',
      returns: 'Text',
      example: `nlp('natural-language processing').dehyphenate().out()
//natural language processing`
    },

  },

  insert: {
    insertBefore: {
      desc: 'append a word (or words) before each match',
      returns: 'Text',
      example: `nlp('stupid flanders').match('flanders').insertBefore('sexy').all().out()
//stupid sexy flanders`
    },
    insertAfter: {
      desc: 'append a word (or words) after each match',
      returns: 'Text',
      example: `nlp('i know so many words').insertAfter('bigly').all().out()
//i know so many words bigly`
    },
    insertAt: {
      desc: 'insert a word or words at a known index (zero-based)',
      returns: 'Text',
      example: `nlp('so you are from Africa?').insertAt(2, 'like,').all().out()
//so you are like, from africa?`
    },
  },

  replace: {
    replaceWith: {
      desc: 'turn the current selection into something else. Essentially just delete() -> insertAt().',
      returns: 'Text',
      example: `nlp('it was the worst of times').match('worst').replaceWith('blurst').all().out()
//it was the blurst of times`
    },
    replace: {
      desc: 'turn a new selection into something else. Essentially just match() -> delete() -> insertAt().',
      returns: 'Text',
      example: `nlp('trust me folks, big league.').replace('big league','bigly').all().out()
//trust me folks, bigly.`
    },
    delete: {
      desc: 'remove a match from the Text permanently. For a temporary filter, see `.not()`',
      returns: 'Text',
      example: `nlp('you don’t win friends with salad').delete('do not').out()
//you win friends with salad`
    },
  },

  match: {
    match: {
      desc: 'zoom-in to a subset of the text, using a [regex-like syntax](https:\n//github.com/nlp-compromise/compromise/wiki/Match-syntax)',
      returns: 'Text',
      example: `nlp('we understand, we are from the land of chocolate.').match('land of #Noun').out()
//land of chocolate`
    },
    not: {
      desc: 'return parts of the text that do not match. Like .match() but opposite.',
      returns: 'Text',
      example: `nlp('wait, there’s a new mexico?').places().not('new').out()
//mexico`
    },
    if: {
      desc: 'returns only the sets which contain this match. Like a Array.filter() method, for your results',
      returns: 'Text',
      example: `nlp('We’re here, we’re clear, we don’t want anymore bears.').clauses().if('anymore').out()
//we don't want anymore bears`
    },
    ifNo: {
      desc: 'removes any sets that have this match',
      returns: 'Text',
      example: `nlp('We’re here, we’re clear, we don’t want anymore bears.').clauses().ifNo('anymore').out()
//We're here, we're clear,`
    },
  },



  split: {
    splitOn: {
      desc: 'split matches into [before, match, after]',
      returns: 'Text',
      example: `nlp('Monorail...Once again! Monorail... Monorail!').splitOn('monorail').get(0).out()
//Monorail`
    },
    splitBefore: {
      desc: 'split matches into [before,  match + after]',
      returns: 'Text',
      example: `nlp('Monorail...Once again! Monorail... Monorail!').splitBefore('monorail').get(0).out()
//Monorail...Once again!`
    },
    splitAfter: {
      desc: 'split matches into [before + match,  after]',
      returns: 'Text',
      example: `nlp('Monorail...Once again! Monorail... Monorail!').splitAfter('monorail').get(0).out()
//Monorail`
    },
  },

  tag: {
    tag: {
      desc: 'set a particular interpretation for these terms. Can tag your match as anything. Supported tags do dependency/conflict logic.',
      returns: 'Text',
      example: `nlp('Michael Apple ate a delicious apple.').match('#FirstName apple').tag('Person').people().out()
//Michael Apple`
    },
    unTag: {
      desc: 'remove a particular tag for all these terms.',
      returns: 'Text',
      example: `nlp('they made a catch & scored a run').match(['run','catch']).unTag('#Verb').nouns().out('array')
//catch, run`
    },
    canBe: {
      desc: 'return only terms that have no conflicts with this tag',
      returns: 'Text',
      example: `nlp('it’s fusilli jerry!').canBe('Person').out()
//fusilli jerry`
    }
  }
};

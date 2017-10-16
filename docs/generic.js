'use strict';

//methods on the generic Result prototype
module.exports = {
  'doc-inspect': {
    data: {
      desc: 'return a handy array of meta-data for this subset. Default subset is sentences, but it can be anything.',
      example: 'nlp(\'The stage was set for the Alan Parsons Project! Which I believe was some sort of hovercraft.\').data()\n//[{normal:\'the stage was set...\'}]',
      returns: 'array'
    },
    found: {
      desc: 'is the match empty or not',
      returns: 'bool',
      example: 'nlp(\'oh say can you see?\').match(\'see\').found\n//true'
    },
    all: {
      desc: 'zooms-out from a subset back to the whole input',
      returns: 'Text',
      example: 'nlp(\'this is yelling\').verbs().toTitleCase().all().out()\n//this IS yelling'
    },
    debug: {
      desc: 'pretty-print the current selection to the console',
      returns: 'Text',
      example: 'nlp(\'wayne\u2019s world, party time, excellent- weeeyooweeeyoo!\').out()'
    },
    out: {
      desc: 'render parsed data as an output. supports `text`, `normal`, `array`, `html`, `grid`, `color`, `debug`, `csv`',
      returns: 'Text',
      example: 'nlp(\'you might say there\u2019s a little Uter in all of us\').match(\'#Adjective uter\').out(\'html\')\n//<span><span class="nl-Adjective">little</span>&nbsp;<span class="nl-Person nl-FirstName">Uter</span></span>'
    },
    whitespace: {
      desc: 'set before or after whitespace on each match',
      returns: 'Text',
      example: 'nlp(\'We like Roy! We like Roy!\').whitespace.before(\'   \').out()\n//We like Roy!   We like Roy!'
    },
    normalize: {
      desc: 'transforms whitespace, case, punctuation, contractions and values, so that they are more standard and workable',
      returns: 'Text',
      example: 'nlp(\' so... you like   DONUTS? have all the donuts in the WORLD!!!\').normalize().sentences(0).out()\n//So you like donuts?'
    },
    length: {
      desc: 'how many individual matches in the result',
      returns: 'int',
      example: 'nlp(\'jackie kennedy and aristotle onassis\').people().length\n//2'
    },
    random: {
      desc: 'sample a random section of n matches',
      returns: 'Text',
      example: 'nlp(\'one two three four\').terms().random(2).out(\'array\')\n//[\'four\',\'one\']'
    },
    sort: {
      desc: 'set a new ordering for the sentences/results. Accepts `alphabetical`, `chronological`, `length`, `wordcount`, `frequency`',
      returns: 'Text',
      example: 'nlp(\'Larry, Curly, and Moe\').people().sort(\'alphabetical\').out(\'array\')\n//Curly, Larry, Moe'
    },
    forEach: {
      desc: 'do something on each result independently',
      returns: 'Text',
      example: 'nlp(\'Larry, Curly, and Moe\').people().map((m,i)=> i + m.out() )\n//0curly\n//1larry\n//2moe'
    },
    map: {
      desc: 'create a new array from these results',
      returns: 'Text',
      example: 'nlp(\'Larry, Curly, and Moe\').people().map((m)=> m.out(\'normal\'))\n// [\'curly\', \'larry\', \'moe\']'
    },
    filter: {
      desc: 'select only the results that return true for some function',
      returns: 'Text',
      example: 'nlp(\'Larry, Curly, and Moe\').people().filter(m => m.out(\'normal\')===\'larry\' ).length\n//1'
    },
    find: {
      desc: 'select only the first result that returns true',
      returns: 'Text',
      example: 'nlp(\'Larry, Curly, and Moe\').people().find(m => m.out(\'normal\')===\'larry\' ).out()\n//"Larry,"'
    },
    reduce: {
      desc: 'combine the results of a function into one thing',
      returns: 'Text',
      example: 'nlp(\'Larry, Curly, and Moe\').people().reduce((h,m) => {\n  var str=m.out(\'normal\');\n  h[str]=true;\n  return h }, {})\n//{larry:true, curly:true, moe:true}'
    },
  },

  'word-changes': {
    toTitleCase: {
      desc: 'set the first letter of each term as a capital',
      returns: 'Text',
      example: 'nlp(\'jupiter, pluto and mars\').nouns().toTitleCase().all().out()\n//Jupiter, Pluto and Mars.'
    },
    toUpperCase: {
      desc: 'set all the letters as a capital',
      returns: 'Text',
      example: 'nlp(\'Dental plan. Lisa needs braces.\').match(\'dental .\').toUpperCase().out()\n//DENTAL PLAN.'
    },
    toLowerCase: {
      desc: 'set all the letters as a not-capital. Even acronyms and first-letters of sentences',
      returns: 'Text',
      example: 'nlp(\'Careful! They\u2019re RUFFLED!!\').toLowerCase().out()\n//careful! they\u2019re ruffled!!'
    },
    toCamelCase: {
      desc: 'remove whitespace and titlecase the words',
      returns: 'Text',
      example: 'nlp(\'natural language processing\').toCamelCase().out()\n//NaturalLanguageProcessing'
    },
    hyphenate: {
      desc: 'remove whitespace and add a hyphenate between the words',
      returns: 'Text',
      example: 'nlp(\'natural language processing\').hyphenate().out()\n//natural-language-processing'
    },
    dehyphenate: {
      desc: 'remove hyphens and add normal whitespace between words',
      returns: 'Text',
      example: 'nlp(\'natural-language processing\').dehyphenate().out()\n//natural language processing'
    },
    trim: {
      desc: 'remove leading and trailing whitespace from each match',
      returns: 'Text',
      example: 'nlp(\' Lenny and Carl \').people().trim().out()\n//[\'Lenny\', \'Carl\']'
    }
  },

  'sentence-changes': {
    insertBefore: {
      desc: 'append a word (or words) before each match',
      mutative: true,
      returns: 'Text',
      example: 'nlp(\'stupid flanders\').match(\'flanders\').insertBefore(\'sexy\').all().out()\n//stupid sexy flanders'
    },
    insertAfter: {
      desc: 'append a word (or words) after each match',
      mutative: true,
      returns: 'Text',
      example: 'nlp(\'i know so many words\').insertAfter(\'bigly\').all().out()\n//i know so many words bigly'
    },
    insertAt: {
      desc: 'insert a word or words at a known index (zero-based)',
      mutative: true,
      returns: 'Text',
      example: 'nlp(\'so you are from Africa?\').insertAt(2, \'like,\').all().out()\n//so you are like, from africa?'
    },
    lump: {
      desc: 'merge matches into one term, with shared tags.',
      mutative: true,
      returns: 'Text',
      example: 'nlp(\'Keanu Reeves said whoa\').match(\'#Person\').lump().all().out(\'terms\')\n//[\'Keanu Reeves\', \'said\', \'whoa\']'
    },
    replaceWith: {
      desc: 'turn the current selection into something else. Essentially just delete() -> insertAt(). The second param says whether to keep original tags around.',
      mutative: true,
      returns: 'Text',
      example: 'nlp(\'it was the worst of times\').match(\'worst\').replaceWith(\'blurst\', true).all().out()\n//it was the blurst of times'
    },
    replace: {
      desc: 'turn a new selection into something else. Essentially just match() -> delete() -> insertAt(). Third optional param keeps original tags around.',
      mutative: true,
      returns: 'Text',
      example: 'nlp(\'trust me folks, big league.\').replace(\'big league\',\'bigly\').all().out()\n//trust me folks, bigly.'
    },
    delete: {
      desc: 'remove a match from the Text permanently. For a temporary filter, see `.not()`',
      mutative: true,
      returns: 'Text',
      example: 'nlp(\'you don\u2019t win friends with salad\').delete(\'do not\').out()\n//you win friends with salad'
    },
    splitOn: {
      desc: 'split matches into [before, match, after]',
      mutative: true,
      returns: 'Text',
      example: 'nlp(\'Monorail...Once again! Monorail... Monorail!\').splitOn(\'monorail\').get(0).out()\n//Monorail'
    },
    splitBefore: {
      desc: 'split matches into [before,  match + after]',
      mutative: true,
      returns: 'Text',
      example: 'nlp(\'Monorail...Once again! Monorail... Monorail!\').splitBefore(\'monorail\').get(0).out()\n//Monorail...Once again!'
    },
    splitAfter: {
      desc: 'split matches into [before + match,  after]',
      mutative: true,
      returns: 'Text',
      example: 'nlp(\'Monorail...Once again! Monorail... Monorail!\').splitAfter(\'monorail\').get(0).out()\n//Monorail'
    },
    slice: {
      desc: 'grab a subset of the results',
      mutative: false,
      returns: 'Text',
      example: 'nlp(\'Homer, have you been eating that sandwich again?\').terms().slice(0, 3).out()\n//Homer, have you'
    },
    clone: {
      desc: 'copy the object, so changes no longer effect the original (make it ~immutable)',
      mutative: false,
      returns: 'Text',
      example: 'nlp(\'would somebody please think of the children\').clone().toUpperCase().parent.out()\n//would somebody please think of the children'
    },
    concat: {
      desc: 'combine two results into one',
      mutative: false,
      returns: 'Text',
      example: 'nlp(\'My name is Otto\').concat(\'and i love to get blotto\').sentences().length\n//1'
    },
    flatten: {
      desc: 'turn a list of results into one result',
      mutative: false,
      returns: 'Text',
      example: 'nlp(\'sex cauldron? I thought they closed that place down.\').flatten().length\n//1'
    }
  },

  'match/tag': {
    match: {
      desc: 'zoom-in to a subset of the text, using a [regex-like syntax](https:\n//github.com/nlp-compromise/compromise/wiki/Match-syntax)',
      returns: 'Text',
      example: 'nlp(\'we understand, we are from the land of chocolate.\').match(\'land of #Noun\').out()\n//land of chocolate'
    },
    not: {
      desc: 'return parts of the text that do not match. Like .match() but opposite.',
      returns: 'Text',
      example: 'nlp(\'wait, there\u2019s a new mexico?\').places().not(\'new\').out()\n//mexico'
    },
    if: {
      desc: 'returns only the sets which contain this match. Like a Array.filter() method, for your results',
      returns: 'Text',
      example: 'nlp(\'We\u2019re here, we\u2019re clear, we don\u2019t want anymore bears.\').clauses().if(\'anymore\').out()\n//we don\'t want anymore bears'
    },
    ifNo: {
      desc: 'removes any sets that have this match',
      returns: 'Text',
      example: 'nlp(\'We\u2019re here, we\u2019re clear, we don\u2019t want anymore bears.\').clauses().ifNo(\'anymore\').out()\n//We\'re here, we\'re clear,'
    },
    has: {
      desc: 'quick check to see if this match is found',
      returns: 'Boolean',
      example: 'nlp(\'I am the very model of a modern Major-General\').has(\'#Pronoun\')\n//true,'
    },
    before: {
      desc: 'find a match, and return everything infront of it',
      returns: 'Text',
      example: 'nlp(\'one two three four five\').before(\'three\').out()\n//one two'
    },
    after: {
      desc: 'find a match, and return everything following of it',
      returns: 'Text',
      example: 'nlp(\'one two three four five\').after(\'three\').out()\n//four five'
    },
    tag: {
      desc: 'set a particular interpretation for these terms. Can tag your match as anything. Supported tags do dependency/conflict logic.',
      returns: 'Text',
      example: 'nlp(\'Michael Apple ate a delicious apple.\').match(\'#FirstName apple\').tag(\'Person\').people().out()\n//Michael Apple'
    },
    unTag: {
      desc: 'remove a particular tag for all these terms. Passing in a \'*\' removes all the current tags.',
      returns: 'Text',
      example: 'nlp(\'they made a catch & scored a run\').match([\'run\',\'catch\']).unTag(\'#Verb\').nouns().out(\'array\')\n//catch, run'
    },
    canBe: {
      desc: 'return only terms that have no conflicts with this tag',
      returns: 'Text',
      example: 'nlp(\'it\u2019s fusilli jerry!\').canBe(\'Person\').out()\n//fusilli jerry'
    }
  }
};

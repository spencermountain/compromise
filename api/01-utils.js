module.exports = {
  all: {
    desc: 'zooms-out from a subset back to the whole input',
    returns: 'Doc',
    example: `nlp('this is yelling').match('#Verb').toTitleCase().all().out()\n//this IS yelling`,
  },
  found: {
    desc: 'is the match empty or not',
    getter: true,
    returns: 'Boolean',
    example: `nlp('oh say can you see?').match('see').found\n//true`,
  },
  parent: {},
  parents: {},
  tagger: {},
  clone: {
    desc: 'copy the object, so changes no longer effect the original (make it ~immutable)',
    mutative: false,
    returns: 'Text',
    example: `nlp('would somebody please think of the children').clone().toUpperCase().parent().out()\n//would somebody please think of the children`,
  },
  wordCount: {},
  length: {
    desc: 'how many individual matches in the result',
    getter: true,
    returns: 'Number',
    example: `nlp('jackie kennedy and aristotle onassis').match('#Person+').length\n//2`,
  },
  normalize: {
    desc:
      'transforms whitespace, case, punctuation, contractions and values, so that they are more standard and workable',
    returns: 'Doc',
    example: `nlp(' so... you like   DONUTS? have all the donuts in the WORLD!!!').normalize().all().get(0).out()\n//So you like donuts?`,
  },
  debug: {
    desc: 'pretty-print the current selection to the console',
    returns: 'Doc',
    example: `nlp('wayne’s world, party time, excellent- weeeyooweeeyoo!')//.debug()`,
  },
}

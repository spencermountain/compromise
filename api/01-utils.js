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
  parent: { desc: 'return the previous result', returns: 'Doc', example: '' },
  parents: { desc: 'return all of the previous results', returns: 'Array', example: '' },
  tagger: { desc: '(re)run the part-of-speech tagger on this document', returns: 'Doc', example: '' },
  wordCount: { desc: '', returns: 'Doc', example: '' },
  length: {
    desc: 'how many individual matches in the result',
    getter: true,
    returns: 'Number',
    example: `nlp('jackie kennedy and aristotle onassis').match('#Person+').length\n//2`,
  },
  clone: {
    desc: 'copy the object, so changes no longer effect the original (make it ~immutable)',
    mutative: false,
    returns: 'Doc',
    example: `nlp('would somebody please think of the children').clone().toUpperCase().parent().out()\n//would somebody please think of the children`,
  },
  pre: { desc: 'add this punctuation or whitespace before each match', returns: 'Doc', example: '' },
  post: { desc: 'add this punctuation or whitespace after each match', returns: 'Doc', example: '' },
  cache: { desc: 'freeze the current state of the document, for speed-purposes', returns: 'Doc', example: '' },
  uncache: {
    desc: 'un-freezes the current state of the document, so it may be transformed',
    returns: 'Doc',
    example: '',
  },
}

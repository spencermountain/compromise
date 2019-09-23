module.exports = {
  found: {
    desc: 'is the match empty or not',
    getter: true,
    returns: 'Boolean',
    example: "nlp('oh say can you see?').match('see').found\n//true",
  },
  all: {
    desc: 'zooms-out from a subset back to the whole input',
    returns: 'Doc',
    example: "nlp('this is yelling').verbs().toTitleCase().all().out()\n//this IS yelling",
  },
  length: {
    desc: 'how many individual matches in the result',
    getter: true,
    returns: 'Number',
    example: "nlp('jackie kennedy and aristotle onassis').people().length\n//2",
  },
  debug: {
    desc: 'pretty-print the current selection to the console',
    returns: 'Doc',
    example: "nlp('wayne’s world, party time, excellent- weeeyooweeeyoo!').out()",
  },

  clone: {
    desc: 'copy the object, so changes no longer effect the original (make it ~immutable)',
    mutative: false,
    returns: 'Text',
    example:
      "nlp('would somebody please think of the children').clone().toUpperCase().parent.out()\n//would somebody please think of the children",
  },
}

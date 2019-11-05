module.exports = {
  split: {
    desc: 'split matches into [before, match, after]',
    returns: 'Doc',
    example: `nlp('Monorail...Once again! Monorail... Monorail!').splitOn('monorail').get(0).out()\n//Monorail`,
  },
  splitBefore: {
    desc: 'split matches into [before,  match + after]',
    returns: 'Doc',
    example: `nlp('Monorail...Once again! Monorail... Monorail!').splitBefore('monorail').get(0).out()\n//Monorail...Once again!`,
  },
  splitAfter: {
    desc: 'split matches into [before + match,  after]',
    returns: 'Doc',
    example: `nlp('Monorail...Once again! Monorail... Monorail!').splitAfter('monorail').get(0).out()\n//Monorail`,
  },
  join: { desc: 'make all phrases into one phrase', returns: 'Doc', example: '' },
  export: { desc: 'store a parsed document for later use ', returns: 'Object', example: '' },
}

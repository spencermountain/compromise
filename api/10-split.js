module.exports = {
  split: {
    desc: 'split matches into [before, match, after]',
    returns: 'Doc',
    example: `nlp('Monorail...Once again! Monorail... Monorail!').splitOn('monorail').eq(0).text()\n//Monorail`,
  },
  splitAfter: {
    desc: 'split matches into [before + match,  after]',
    returns: 'Doc',
    example: `nlp('Monorail...Once again! Monorail... Monorail!').splitAfter('monorail').eq(0).text()\n//Monorail`,
  },
  splitBefore: {
    desc: 'split matches into [before,  match + after]',
    returns: 'Doc',
    example: `nlp('Monorail...Once again! Monorail... Monorail!').splitBefore('monorail').eq(0).text()\n//Monorail...Once again!`,
  },

  segment: { desc: 'split a document into labeled sections', returns: 'Doc', example: '' },
  join: { desc: 'make all phrases into one phrase', returns: 'Doc', example: '' },
  export: { desc: 'store a parsed document for later use ', returns: 'Object', example: '' },
}

module.exports = {
  first: { desc: ' use only the first result(s)', returns: 'Doc', example: '' },
  last: { desc: ' use only the last result(s)', returns: 'Doc', example: '' },
  slice: {
    desc: 'grab a subset of the results',
    mutative: false,
    returns: 'Doc',
    example: `nlp('Homer, have you been eating that sandwich again?').terms().slice(0, 3).out()\n//Homer, have you`,
  },
  eq: { desc: 'use only the nth result', returns: 'Doc', example: '' },
  firstTerm: { desc: 'get the first word in each match', returns: 'Doc', example: '' },
  lastTerm: { desc: 'get the final word in each match', returns: 'Doc', example: '' },
  termList: { desc: 'return a flat list of all Term objects in match', returns: 'Array', example: '' },
}

module.exports = {
  get: {},
  first: {},
  last: {},
  slice: {
    desc: 'grab a subset of the results',
    mutative: false,
    returns: 'Text',
    example: `nlp('Homer, have you been eating that sandwich again?').terms().slice(0, 3).out()\n//Homer, have you`,
  },
}

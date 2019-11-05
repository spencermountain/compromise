module.exports = {
  tag: {
    desc: 'Give all terms the given tag',
    returns: 'Doc',
    example: `nlp('Michael Apple ate a delicious apple.').match('#FirstName apple').tag('Person').all().match('#Person+').out()\n//Michael Apple`,
  },
  tagSafe: { desc: 'Only apply tag to terms if it is consistent with current tags', returns: 'Doc', example: `` },
  unTag: {
    desc: `remove a particular tag for all these terms. Passing in a '*' removes all the current tags.`,
    returns: 'Doc',
    example: `nlp('they made a catch & scored a run').match('(run|catch)').unTag('#Verb').all().match('#Verb').out('array')\n//made, scored`,
  },
  canBe: {
    desc: 'return only terms that have no conflicts with this tag',
    returns: 'Doc',
    example: `nlp('it’s fusilli jerry!').canBe('Person').out()\n//fusilli jerry`,
  },
}

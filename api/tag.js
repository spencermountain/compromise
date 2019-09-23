module.exports = {
  tag: {
    desc:
      'set a particular interpretation for these terms. Can tag your match as anything. Supported tags do dependency/conflict logic.',
    returns: 'Doc',
    example:
      "nlp('Michael Apple ate a delicious apple.').match('#FirstName apple').tag('Person').people().out()\n//Michael Apple",
  },
  unTag: {
    desc: "remove a particular tag for all these terms. Passing in a '*' removes all the current tags.",
    returns: 'Doc',
    example:
      "nlp('they made a catch & scored a run').match(['run','catch']).unTag('#Verb').nouns().out('array')\n//catch, run",
  },
  canBe: {
    desc: 'return only terms that have no conflicts with this tag',
    returns: 'Doc',
    example: "nlp('it’s fusilli jerry!').canBe('Person').out()\n//fusilli jerry",
  },
}

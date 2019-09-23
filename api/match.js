module.exports = {
  match: {
    desc:
      'zoom-in to a subset of the text, using a [regex-like syntax](https:\n//github.com/nlp-compromise/compromise/wiki/Match-syntax)',
    returns: 'Doc',
    example: `nlp('we understand, we are from the land of chocolate.').match('land of #Noun').out()\n//land of chocolate`,
  },
  not: {
    desc: 'return parts of the text that do not match. Like .match() but opposite.',
    returns: 'Doc',
    example: `nlp('wait, there’s a new mexico?').places().not('new').out()\n//mexico`,
  },
  if: {
    desc: 'returns only the sets which contain this match. Like a Array.filter() method, for your results',
    returns: 'Doc',
    example: `nlp('We’re here, we’re clear, we don’t want anymore bears.').clauses().if('anymore').out()\n//we don't want anymore bears`,
  },
  ifNo: {
    desc: 'removes any sets that have this match',
    returns: 'Doc',
    example: `nlp('We’re here, we’re clear, we don’t want anymore bears.').clauses().ifNo('anymore').out()\n//We're here, we're clear,`,
  },
  has: {
    desc: 'quick check to see if this match is found',
    returns: 'Boolean',
    example: `nlp('I am the very model of a modern Major-General').has('#Pronoun')\n//true,`,
  },
  before: {
    desc: 'find a match, and return everything infront of it',
    returns: 'Doc',
    example: `nlp('one two three four five').before('three').out()\n//one two`,
  },
  after: {
    desc: 'find a match, and return everything following of it',
    returns: 'Doc',
    example: `nlp('one two three four five').after('three').out()\n//four five`,
  },
}

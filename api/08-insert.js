module.exports = {
  replaceWith: {
    desc:
      'turn the current selection into something else. Essentially just delete() -> insertAt(). The second param says whether to keep original tags around.',
    mutative: true,
    returns: 'Doc',
    example: `nlp('it was the worst of times').match('worst').replaceWith('blurst', true).all().out()\n//it was the blurst of times`,
  },
  replace: {
    desc:
      'turn a new selection into something else. Essentially just match() -> delete() -> insertAt(). Third optional param keeps original tags around.',
    mutative: true,
    returns: 'Doc',
    example: `nlp('trust me folks, big league.').replace('big league','bigly').all().out()\n//trust me folks, bigly.`,
  },
  delete: {
    desc: 'remove a match from the Text permanently. For a temporary filter, see `.not()`',
    mutative: true,
    returns: 'Doc',
    example: `nlp('you don’t win friends with salad').delete('do not').out()\n//you win friends with salad`,
  },

  append: {
    desc: 'append a word (or words) after each match',
    mutative: true,
    returns: 'Doc',
    example: `nlp('i know so many words').insertAfter('bigly').all().out()\n//i know so many words bigly`,
  },
  prepend: {
    desc: 'append a word (or words) before each match',
    mutative: true,
    returns: 'Doc',
    example: `nlp('stupid flanders').match('flanders').insertBefore('sexy').all().out()\n//stupid sexy flanders`,
  },

  concat: {
    desc: 'combine two results into one',
    mutative: false,
    returns: 'Doc',
    example: `nlp('My name is Otto').concat('and i love to get blotto').all().length\n//1`,
  },
  sort: {
    desc:
      'set a new ordering for the results. Accepts `alphabetical`, `chronological`, `length`, `wordcount`, `frequency`',
    returns: 'Doc',
    example: `nlp('Larry, Curly, Moe').terms().sort('alphabetical').out('array')
    \n//Curly, Larry, Moe`,
  },
  reverse: { desc: 're-arrange the order of the matches (in place)', returns: 'Doc', example: '' },
  unique: { desc: 'remove any duplicate matches', returns: 'Doc', example: '' },
}

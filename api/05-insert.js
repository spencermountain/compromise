module.exports = {
  append: {
    desc: 'append a word (or words) after each match',
    mutative: true,
    returns: 'Text',
    example: `nlp('i know so many words').insertAfter('bigly').all().out()\n//i know so many words bigly`,
  },
  prepend: {
    desc: 'append a word (or words) before each match',
    mutative: true,
    returns: 'Text',
    example: `nlp('stupid flanders').match('flanders').insertBefore('sexy').all().out()\n//stupid sexy flanders`,
  },

  split: {
    desc: 'split matches into [before, match, after]',
    mutative: true,
    returns: 'Text',
    example: `nlp('Monorail...Once again! Monorail... Monorail!').splitOn('monorail').get(0).out()\n//Monorail`,
  },
  splitBefore: {
    desc: 'split matches into [before,  match + after]',
    mutative: true,
    returns: 'Text',
    example: `nlp('Monorail...Once again! Monorail... Monorail!').splitBefore('monorail').get(0).out()\n//Monorail...Once again!`,
  },
  splitAfter: {
    desc: 'split matches into [before + match,  after]',
    mutative: true,
    returns: 'Text',
    example: `nlp('Monorail...Once again! Monorail... Monorail!').splitAfter('monorail').get(0).out()\n//Monorail`,
  },

  concat: {
    desc: 'combine two results into one',
    mutative: false,
    returns: 'Text',
    example: `nlp('My name is Otto').concat('and i love to get blotto').sentences().length\n//1`,
  },

  replace: {
    desc:
      'turn a new selection into something else. Essentially just match() -> delete() -> insertAt(). Third optional param keeps original tags around.',
    mutative: true,
    returns: 'Text',
    example: `nlp('trust me folks, big league.').replace('big league','bigly').all().out()\n//trust me folks, bigly.`,
  },
  replaceWith: {
    desc:
      'turn the current selection into something else. Essentially just delete() -> insertAt(). The second param says whether to keep original tags around.',
    mutative: true,
    returns: 'Text',
    example: `nlp('it was the worst of times').match('worst').replaceWith('blurst', true).all().out()\n//it was the blurst of times`,
  },
  delete: {
    desc: 'remove a match from the Text permanently. For a temporary filter, see `.not()`',
    mutative: true,
    returns: 'Text',
    example: `nlp('you don’t win friends with salad').delete('do not').out()\n//you win friends with salad`,
  },
}

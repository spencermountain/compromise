module.exports = {
  map: {
    desc: 'create a new array from these results',
    returns: 'Doc',
    example: `nlp('yahoo serious festival').terms().map((m)=> m.toUpperCase()).out()
    \n// YAHOO SERIOUS FESTIVAL`,
  },
  forEach: {
    desc: 'do something on each result independently',
    returns: 'Doc',
    example: `nlp('Oh, no! Bette Midler!').match('#Person+').forEach((m,i)=> m.out())  //(console.log)
    //Bette Midler!`,
  },
  filter: {
    desc: 'select only the results that return true for some function',
    returns: 'Doc',
    example: `nlp('Hey, anymore arboretum’s around here?').terms().filter(m => m.has('#Plural') ).length
    \n//1`,
  },
  find: {
    desc: 'select only the first result that returns true',
    returns: 'Doc',
    example: `  nlp('Always do the opposite of what bart says')
    .terms()
    .find(t => t.out('normal').match(/b[ao]rt/))
    .out()
    \n//\`bart\``,
  },
  some: {
    desc: 'return true or false if there is one matching phrase ',
    returns: 'Boolean',
    example: `nlp('Don’t make me run, I’m full of chocolate!').terms().some(m => m.out('normal')==='run' )
    \n//true`,
  },

  random: {
    desc: 'sample a random section of n matches',
    returns: 'Doc',
    example: `nlp('one two three four').terms().random(2).out('array')
    \n//['four','one']`,
  },
}

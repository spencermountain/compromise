module.exports = {
  toUpperCase: {
    desc: 'set all the letters as a capital',
    returns: 'Text',
    example: `nlp('Dental plan. Lisa needs braces.').match('dental .').toUpperCase().out()\n//DENTAL PLAN.`,
  },
  toLowerCase: {
    desc: 'set all the letters as a not-capital. Even acronyms and first-letters of sentences',
    returns: 'Text',
    example: `nlp('Careful! They’re RUFFLED!!').toLowerCase().out()\n//careful! they’re ruffled!!`,
  },
  toTitleCase: {
    desc: 'set the first letter of each term as a capital',
    returns: 'Text',
    example: `nlp('jupiter, pluto and mars').nouns().toTitleCase().all().out()\n//Jupiter, Pluto and Mars.`,
  },
  toCamelCase: {
    desc: 'remove whitespace and titlecase the words',
    returns: 'Text',
    example: `nlp('natural language processing').toCamelCase().out()\n//NaturalLanguageProcessing`,
  },
}

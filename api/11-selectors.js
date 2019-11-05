module.exports = {
  terms: {
    desc: '',
    returns: 'Doc',
    example: "nlp('we should all be more like little Ruttiger').terms().json()\n//[{text:'we'}, {text:'should'}...]",
  },
  hyphenated: {
    desc: '',
    returns: 'Doc',
    example: '',
  },

  phoneNumbers: {
    desc: '',
    returns: 'Doc',
    example:
      "nlp('Moe Sizlak. That’s right. I’m a surgeon. (800) 555-0000.').phoneNumbers().json()\n//[{text:'(800) 555-0000'}]",
  },
  hashTags: {
    desc: '',
    returns: 'Doc',
    example: "nlp('oh, but where is the #anykey').hashTags().json()\n//[{normal:'anykey'}]",
  },
  emails: {
    desc: '',
    returns: 'Doc',
    example: '',
  },
  atMentions: {
    desc: '',
    returns: 'Doc',
    example: '',
  },
  urls: {
    desc: '',
    returns: 'Doc',
    example: "nlp('thank you http://simpsons.wikia.com').urls().json()\n//[{text:'http://simpsons.wikia.com'}]",
  },
  adverbs: {
    desc: '',
    returns: 'Doc',
    example: '',
  },
  pronouns: {
    desc: '',
    returns: 'Doc',
    example: '',
  },
  fractions: {
    desc: '',
    returns: 'Doc',
    example: '',
  },
  money: {
    desc: '',
    returns: 'Doc',
    example: '',
  },
  conjunctions: {
    desc: '',
    returns: 'Doc',
    example: '',
  },
  prepositions: {
    desc: '',
    returns: 'Doc',
    example: '',
  },
  abbreviations: {
    desc: '',
    returns: 'Doc',
    example: '',
  },
  romanNumerals: {
    desc: '',
    returns: 'Doc',
    example: '',
  },

  acronyms: {
    desc: '',
    returns: 'Doc',
    example: '',
  },
  clauses: {
    desc: 'return an array of words split by sentence phrase (clause)',
    example:
      "nlp('All right, Colossus, you’re free to go, but stay away from Death Mountain').clauses().data()\n//[{normal:'all right'}, {normal:'Colossus'}, {normal:'you're free to go'},]",
    returns: 'array',
  },
  contractions: {
    desc: '',
    returns: 'Doc',
    example: '',
  },
  lists: {
    desc: '',
    returns: 'Doc',
    example: '',
  },
  nouns: {
    desc: '',
    returns: 'Doc',
    example: '',
  },
  parentheses: {
    desc: 'return a list of phrases between ( ) brackets.',
    returns: 'Doc',
    example: "nlp('Use a pointed stick (a pencil) or a similar tool').parentheses().data()\n//[{text:'a pencil'}..]",
  },
  possessives: {
    desc: 'grab all the things that are possessive, like "Homer Simpson\'s"',
    returns: 'Doc',
    example: "nlp('moe’s tavern').possessives().text()\n//moe's",
  },
  quotations: {
    desc: 'return any terms inside quotation marks ',
    returns: 'Doc',
    example: 'nlp(\'the he said "crazy like a fox!".\').quotations().data().length\n//1',
  },
  verbs: {
    desc: '',
    returns: 'Doc',
    example: '',
  },

  // questions: {
  //   example: "nlp('are you saying boo, or boo-urns?').questions().json().length\n//1",
  // },
  // statements: {
  //   example: "nlp('i was saying boo-urns.').statements().json()\n//[{normal:'i was saying boo-urns'}]",
  // },
}

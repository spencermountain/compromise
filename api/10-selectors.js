module.exports = {
  hashTags: {
    example: "nlp('oh, but where is the #anykey').hashTags().json()\n//[{normal:'anykey'}]",
  },

  phoneNumbers: {
    example:
      "nlp('Moe Sizlak. That’s right. I’m a surgeon. (800) 555-0000.').phoneNumbers().json()\n//[{text:'(800) 555-0000'}]",
  },
  // questions: {
  //   example: "nlp('are you saying boo, or boo-urns?').questions().json().length\n//1",
  // },
  // statements: {
  //   example: "nlp('i was saying boo-urns.').statements().json()\n//[{normal:'i was saying boo-urns'}]",
  // },

  questions: {
    desc: 'return an array of question sentences in this text',
    example: "nlp('are you saying boo, or boo-urns?').questions().data().length\n//1",
    returns: 'array',
  },
  quotations: {
    desc: 'return an array of meta-data with the parsed quoations',
    example: 'nlp(\'the he said "crazy like a fox!".\').quotations().data().length\n//1',
    returns: 'array',
  },
  possessives: {
    desc: 'grab all the things that are possessive, like "Homer Simpson\'s"',
    example: "nlp('moe’s tavern').possessives().strip()\n//moe",
    returns: 'array',
  },
  parentheses: {
    desc: 'return a list of phrases between ( ) brackets.',
    example: "nlp('Use a pointed stick (a pencil) or a similar tool').parentheses().data()\n//[{text:'a pencil'}..]",
    returns: 'array',
  },
  clauses: {
    desc: 'return an array of words split by sentence phrase (clause)',
    example:
      "nlp('All right, Colossus, you’re free to go, but stay away from Death Mountain').clauses().data()\n//[{normal:'all right'}, {normal:'Colossus'}, {normal:'you're free to go'},]",
    returns: 'array',
  },
  terms: {
    example: "nlp('we should all be more like little Ruttiger').terms().json()\n//[{text:'we'}, {text:'should'}...]",
  },
  urls: {
    example: "nlp('👏 http://simpsons.wikia.com').urls().json()\n//[{text:'http://simpsons.wikia.com'}]",
  },
}

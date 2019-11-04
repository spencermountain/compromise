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
  terms: {
    example: "nlp('we should all be more like little Ruttiger').terms().json()\n//[{text:'we'}, {text:'should'}...]",
  },
  urls: {
    example: "nlp('👏 http://simpsons.wikia.com').urls().json()\n//[{text:'http://simpsons.wikia.com'}]",
  },
}

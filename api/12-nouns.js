module.exports = {
  json: {
    desc: 'return a handy array of meta-data for the nouns in this text',
    example:
      "nlp('Lunchlady Doris, have you got any grease?').nouns().json()\n//[{text:'Lunchlady Doris'}, {text:'grease'}]",
    returns: 'Array',
  },
  isPlural: {
    desc: 'return only the plural nouns',
    returns: 'Text',
    example: "nlp('All my life I’ve had one dream, to accomplish my many goals.').nouns().isPlural().text()\n//goals",
  },
  hasPlural: {
    desc: "return only the nouns which can be plural (sometimes called 'countable' nouns)",
    returns: 'Text',
    example: "nlp('bring joy to the air, water, earth, and sky.').nouns().hasPlural().length\n//0",
  },
  toPlural: {
    desc: 'transform singular nouns into their plural (inflected) forms',
    returns: 'Text',
    example: "nlp('the purple dinosaur').nouns().toPlural().all().text()\n//the purple dinosaurs",
  },
  toSingular: {
    desc: 'transform plural nouns into their singular forms',
    returns: 'Text',
    example: "nlp('the king’s men').nouns().toSingular().text()\n//the king's man",
  },
  toPossessive: {
    desc: "transform nouns into a possessive form  - John → John's",
    returns: 'Text',
    example: "nlp('the king').nouns().toPossessive().text()\n//the king's",
  },
  // articles: {
  //   desc: "whether this noun deserves 'a' or 'an'",
  //   returns: 'Array',
  //   example: 'nlp(\'the king\').nouns().articles()\n//[{text:"king", article:"a"}]',
  // },
}

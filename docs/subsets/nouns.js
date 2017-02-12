module.exports = {
  data: {
    desc: 'return a handy array of meta-data for this subset',
    example: `nlp().nouns().data()`,
    returns: 'array'
  },
  isPlural: {
    desc: 'return only the plural nouns',
    returns: 'Text',
    example: `nlp('All my life I’ve had one dream, to accomplish my many goals.').nouns().isPlural().out() //goals`
  },
  hasPlural: {
    desc: 'return only the nouns which can be plural (sometimes called \'countable\' nouns)',
    returns: 'Text',
    example: `nlp('bring joy to the air, water, earth, and sky.').nouns().hasPlural().length() //0`
  },
  toPlural: {
    desc: 'transform singular nouns into their plural (inflected) forms',
    returns: 'Text',
    example: `nlp('the purple dinosaur').nouns().toPlural().all().out()//the purple dinosaurs`
  },
  toSingular: {
    desc: 'transform plural nouns into their singular forms',
    returns: 'Text',
    example: `nlp('the king's men').nouns().toSingular().out()//the king's man`
  },

};

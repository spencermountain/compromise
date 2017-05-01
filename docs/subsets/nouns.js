'use strict';

module.exports = {
  data: {
    desc: 'return a handy array of meta-data for the nouns in this text',
    example: 'nlp(\'Lunchlady Doris, have you got any grease?\').nouns().data()\n//[{text:\'Lunchlady Doris\'}, {text:\'grease\'}]',
    returns: 'array'
  },
  isPlural: {
    desc: 'return only the plural nouns',
    returns: 'Text',
    example: 'nlp(\'All my life I\u2019ve had one dream, to accomplish my many goals.\').nouns().isPlural().out()\n//goals'
  },
  hasPlural: {
    desc: 'return only the nouns which can be plural (sometimes called \'countable\' nouns)',
    returns: 'Text',
    example: 'nlp(\'bring joy to the air, water, earth, and sky.\').nouns().hasPlural().length\n//0'
  },
  toPlural: {
    desc: 'transform singular nouns into their plural (inflected) forms',
    returns: 'Text',
    example: 'nlp(\'the purple dinosaur\').nouns().toPlural().all().out()\n//the purple dinosaurs'
  },
  toSingular: {
    desc: 'transform plural nouns into their singular forms',
    returns: 'Text',
    example: 'nlp(\'the king\u2019s men\').nouns().toSingular().out()\n//the king\'s man'
  }

};

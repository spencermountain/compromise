'use strict';

module.exports = {
  data: {
    desc: 'return a handy array of meta-data for the numbers and values in this text',
    example: 'nlp(\'I\u2019d like to request seventeen dollars for a push broom rebristling\').values().data()\n//[{number:17, TextValue:{ Ordinal:\'seventeenth\'}, NumericValue:{ Ordinal:\'17th\'}} ]',
    returns: 'array'
  },
  noDates: {
    desc: 'remove numbers that are also dates, like in \'June 5th 1999\'.',
    returns: 'Text',
    example: 'nlp(\'in 2016, I\u2019m going to party like it\u2019s on sale for $19.99.\').values().noDates().length\n//1'
  },
  noUnits: {
    desc: 'remove \'books\' from \'12 books\'',
    returns: 'Text',
    example: 'nlp(\'harry potter and the 12 sequels\').values().noUnits().out()\n//\'12\''
  },
  toNumber: {
    desc: 'turn a written number like `five thousand five hundred` into it\'s numerical form, like `5500`',
    returns: 'Text',
    example: 'nlp(\'ten things i hate about you\').values().toNumber().all().out()\n//10 things i hate about you'
  },
  toText: {
    desc: 'turn a number like `5,500` into it\'s textual form, like `five thousand five hundred`',
    returns: 'Text',
    example: 'nlp(\'10 things i hate about you\').values().toText().all().out()\n//ten things i hate about you'
  },
  toNice: {
    desc: 'turn a number into numerical form, but with nice commas, like `5,500`',
    returns: 'Text',
    example: 'nlp(\'five hundred sixty two thousand, four hundred and seven\').values().toNice().all().out()\n//\'562,407\''
  },
  toCardinal: {
    desc: 'turn `fifth` into `five`, and `5th` into `5`',
    returns: 'Text',
    example: 'nlp(\'twenty-third of december\').values().toCardinal().all().out()\n//23rd of december'
  },
  toOrdinal: {
    desc: 'turn `five` into `fifth` and `5` into `5th`',
    returns: 'Text',
    example: 'nlp(\'three strikes\').values().toOrdinal().all().nouns().toSingular().all().out()\n//third strike'
  },
  numbers: {
    desc: 'return the actual javascript integers (or floats)',
    returns: 'Array',
    example: 'nlp(\'at the seven eleven\').values().numbers()\n// [7, 11]'
  },
  greaterThan: {
    desc: 'return only the values larger than a given value',
    returns: 'Text',
    example: 'nlp(\'seven peaches weigh ten kilograms\').values().greaterThan(7).out(\'array\')\n// [\'10\']'
  },
  lessThan: {
    desc: 'return only the values smaller than a given value',
    returns: 'Text',
    example: 'nlp(\'he is 7 years old\').values().greaterThan(\'five\').out(\'array\')\n// [\'7\']'
  },
  isEqual: {
    desc: 'return only the values equal to a given value',
    returns: 'Text',
    example: 'nlp(\'his 7th birthday\').values().isEqual(7).out(\'array\')\n// [\'7th\']'
  },
  add: {
    desc: 'increment the current number by a given integer',
    returns: 'Text',
    example: 'nlp(\'his 7th birthday\').values().add(2).out()\n// \'his 9th birthday\''
  },
  subtract: {
    desc: 'subtract the current number by a given integer',
    returns: 'Text',
    example: 'nlp(\'his seventh birthday\').values().subtract(2).out()\n// \'his fifth birthday\''
  },
  increment: {
    desc: 'add one to the current number',
    returns: 'Text',
    example: 'nlp(\'his seventh birthday\').values().increment().out()\n// \'his eighth birthday\''
  },
  decrement: {
    desc: 'subtract one from the current number',
    returns: 'Text',
    example: 'nlp(\'his 7th birthday\').values().decrement().out()\n// \'his 6th birthday\''
  },
};

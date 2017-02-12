module.exports = {
  data: {
    desc: 'return a handy array of meta-data for this subset',
    example: `nlp().values().data()`,
    returns: 'array'
  },
  noDates: {
    desc: 'remove numbers that are also dates, like in \'June 5th 1999\'.',
    returns: 'Text',
    example: `nlp('in 2016, I’m going to party like it’s on sale for $19.99.').values().noDates().length //1`
  },

  toNumber: {
    desc: 'turn a written number like `five thousand five hundred` into it\'s numerical form, like `5500`',
    returns: 'Text',
    example: `nlp('ten things i hate about you').values().toNumber().all().out() //10 things i hate about you`
  },
  toTextValue: {
    desc: 'turn a number like `5,500` into it\'s textual form, like `five thousand five hundred`',
    returns: 'Text',
    example: `nlp('10 things i hate about you').values().toTextValue().all().out() //ten things i hate about you`
  },
  toNiceNumber: {
    desc: 'turn a number into numerical form, but with nice commas, like `5,500`',
    returns: 'Text',
    example: `nlp('five hundred sixty two thousand, four hundred and seven').values().toTextValue().all().out() //'562,407'`
  },
  toCardinal: {
    desc: 'turn `fifth` into `five`, and `5th` into `5`',
    returns: 'Text',
    example: `nlp('twenty-third of december').values().toCardinal().all().out()//23rd of december`
  },
  toOrdinal: {
    desc: 'turn `five` into `fifth` and `5` into `5th`',
    returns: 'Text',
    example: `nlp('three strikes').values().toOrdinal().all().nouns().toSingular().all().out() //third strike`
  },
  numbers: {
    desc: 'return the actual javascript integers (or floats)',
    returns: 'Array',
    example: `nlp('at the seven eleven').values().numbers()// [7, 11]`
  },
};

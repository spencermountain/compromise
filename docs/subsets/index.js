module.exports = {
  contractions: require('./contractions'),
  dates: require('./dates'),
  ngrams: require('./ngrams'),
  nouns: require('./nouns'),
  sentences: require('./sentences'),
  people: require('./people'),
  values: require('./values'),
  verbs: require('./verbs'),

  acronyms: {
    data: {
      desc: 'return a handy array of meta-data for this subset',
      example: `nlp('In the USA, the big CIA. The Bloods and the Crips, and the KKK.').acronyms().data()\n//[ {text:'USA'...}]`,
      returns: 'array'
    }
  },

  adjectives: {
    data: {
      desc: 'return a handy array of meta-data for this subset',
      example: `nlp().adjectives().data()\n//[{text:''...}]`,
      returns: 'array'
    }
  },

  adverbs: {
    data: {
      desc: 'return a handy array of meta-data for this subset',
      example: `nlp().adverbs().data()\n//[{text:''...}]`,
      returns: 'array'
    }
  },

  clauses: {
    data: {
      desc: 'return a handy array of meta-data for this subset',
      example: `nlp().clauses().data()\n//[{text:''...}]`,
      returns: 'array'
    }
  },

  hashTags: {
    data: {
      desc: 'return a handy array of meta-data for this subset',
      example: `nlp().hashTags().data()\n//[{text:''...}]`,
      returns: 'array'
    }
  },

  startGrams: {
    data: {
      desc: 'return a handy array of meta-data for this subset',
      example: `nlp().startGrams().data()`,
      returns: 'array'
    }
  },

  endGrams: {
    data: {
      desc: 'return a handy array of meta-data for this subset',
      example: `nlp().endGrams().data()\n//[{text:''...}]`,
      returns: 'array'
    }
  },

  organizations: {
    data: {
      desc: 'return a handy array of meta-data for this subset',
      example: `nlp().organizations().data()\n//[{text:''...}]`,
      returns: 'array'
    }
  },

  phoneNumbers: {
    data: {
      desc: 'return a handy array of meta-data for this subset',
      example: `nlp().phoneNumbers().data()\n//[{text:''...}]`,
      returns: 'array'
    }
  },

  places: {
    data: {
      desc: 'return a handy array of meta-data for this subset',
      example: `nlp().places().data()\n//[{text:''...}]`,
      returns: 'array'
    }
  },

  questions: {
    data: {
      desc: 'return a handy array of meta-data for this subset',
      example: `nlp().questions().data()\n//[{text:''...}]`,
      returns: 'array'
    }
  },

  quotations: {
    data: {
      desc: 'return a handy array of meta-data for this subset',
      example: `nlp().quotations().data()\n//[{text:''...}]`,
      returns: 'array'
    }
  },

  statements: {
    data: {
      desc: 'return a handy array of meta-data for this subset',
      example: `nlp().statements().data()\n//[{text:''...}]`,
      returns: 'array'
    }
  },

  terms: {
    data: {
      desc: 'return a handy array of meta-data for this subset',
      example: `nlp().terms().data()`,
      returns: 'array'
    }
  },

  topics: {
    data: {
      desc: 'return a handy array of meta-data for this subset',
      example: `nlp().topics().data()`,
      returns: 'array'
    }
  },

  urls: {
    data: {
      desc: 'return a handy array of meta-data for this subset',
      example: `nlp().urls().data()`,
      returns: 'array'
    }
  }

};

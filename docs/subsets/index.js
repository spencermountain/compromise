'use strict';

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
      desc: 'return an array of meta-data for the acronyms in this text',
      example: 'nlp(\'In the USA, the big CIA. The Bloods and the Crips, and the KKK.\').acronyms().data()\n//[{text:\'USA\'...}]',
      returns: 'array'
    }
  },

  adjectives: {
    data: {
      desc: 'return an array of meta-data for the adjectives and their adverbs',
      example: 'nlp(\'Guys, we have to assume our guns are useless. Throw them in the lake.\').adjectives().data()\n//[{text:\'useless\'}]',
      returns: 'array'
    }
  },

  adverbs: {
    data: {
      desc: 'return an array of meta-data for the adverbs in this text',
      example: 'nlp(\'truly, madly, deeply\').adverbs().data()\n//[{text:\'truly\'...}]',
      returns: 'array'
    }
  },

  clauses: {
    data: {
      desc: 'return an array of words split by sentence phrase (clause)',
      example: 'nlp(\'All right, Colossus, you\u2019re free to go, but stay away from Death Mountain\').clauses().data()\n//[{normal:\'all right\'}, {normal:\'Colossus\'}, {normal:\'you\'re free to go\'},]',
      returns: 'array'
    }
  },

  hashTags: {
    data: {
      desc: 'return an array of parsed hashtags used in the text',
      example: 'nlp(\'oh, but where is the #anykey\').hashTags().data()\n//[{normal:\'anykey\'}]',
      returns: 'array'
    }
  },

  startGrams: {
    data: {
      desc: 'return an array of subsequences beginning at the start of each sentence or match',
      example: 'nlp(\'Who controls the British crown? Who keeps the metric system down?\').startGrams().data()\n//[{normal:\'who\', size:1, count:2}...]',
      returns: 'array'
    }
  },
  endGrams: {
    data: {
      desc: 'return an array of subsequences ending at the end of each sentence or match',
      example: 'nlp(\'you think that\u2019s a knife? I\u2019ll show you a knife.\').endGrams().data()\n//[{normal:\'knife\', count:2, size:1}...]',
      returns: 'array'
    }
  },

  organizations: {
    data: {
      desc: 'return an array of named-organizations in this text',
      example: 'nlp(\'Your dreams may vary from those of Globex Corporation, its subsidiaries and shareholders.\').organizations().data()\n//[{text:\'Globex Corporation\'}]',
      returns: 'array'
    }
  },

  phoneNumbers: {
    data: {
      desc: 'return an array of parsed phonenumbers in this text',
      example: 'nlp(\'Moe Sizlak. That\u2019s right. I\u2019m a surgeon. (800) 555-0000.\').phoneNumbers().data()\n//[{text:\'(800) 555-0000\'}]',
      returns: 'array'
    }
  },

  places: {
    data: {
      desc: 'return an array of locations mentioned in this text',
      example: 'nlp(\'you could still go to McGill, the Harvard of Canada!\').places().data()\n//[{normal:\'canada\'}]',
      returns: 'array'
    }
  },

  questions: {
    data: {
      desc: 'return an array of question sentences in this text',
      example: 'nlp(\'are you saying boo, or boo-urns?\').questions().data().length\n//1',
      returns: 'array'
    }
  },

  quotations: {
    data: {
      desc: 'return an array of meta-data with the parsed quoations',
      example: 'nlp(\'the he said "crazy like a fox!".\').quotations().data().length\n//1',
      returns: 'array'
    }
  },

  statements: {
    data: {
      desc: 'return an array of sentences that are not questions',
      example: 'nlp(\'i was saying boo-urns.\').statements().data()\n//[{normal:\'i was saying boo-urns\'}]',
      returns: 'array'
    }
  },

  terms: {
    data: {
      desc: 'split all words into individual results, and return their metadata',
      example: 'nlp(\'we should all be more like little Ruttiger\').terms().data()\n//[{text:\'we\'}, {text:\'should\'}...]',
      returns: 'array'
    }
  },

  topics: {
    data: {
      desc: 'return the people, places, and organizations of this text',
      example: 'nlp(\'Hey everybody, I\u2019m lookin\u2019 for Amanda Hugginkiss\').topics().data()\n//[{text:\'Amanda Hugginkiss\'}]',
      returns: 'array'
    }
  },

  urls: {
    data: {
      desc: 'return an array of urls mentioned in this text',
      example: 'nlp(\'\uD83D\uDC4F http://simpsons.wikia.com\').urls().data()\n//[{text:\'http://simpsons.wikia.com\'}]',
      returns: 'array'
    }
  }

};

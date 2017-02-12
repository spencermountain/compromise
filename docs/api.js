module.exports = {
  generic: {
    data: {
      desc: '',
      example: `nlp().subset().data()`,
      returns: 'array',
    },
    found: {
      desc: 'is the match empty or not',
      returns: 'bool',
      example: `nlp('oh say can you see?').match('see').found //true`
    },
    length: {
      desc: 'how many individual matches in the result',
      returns: 'int',
      example: `nlp('jackie kennedy and aristotle onassis').people().length //2`
    },
    all: {
      desc: 'zooms-out from a subset back to the whole input',
      returns: 'Text',
      example: `nlp('this is yelling').verbs().toTitleCase().all().out()//this IS yelling`
    },
    debug: {
      desc: 'pretty-print the current selection to the console',
      returns: 'Text',
      example: `nlp('wayne's world, party time, excellent- weeeyooweeeyoo!').debug().out()`
    },
    whitespace: {
      desc: 'set before or after whitespace on each match',
      returns: 'Text',
      example: `nlp('we want will! we want will!').whitespace.before('   ').out()//we want will!   we want will!`
    },
    toTitleCase: {
      desc: 'set the first letter of each term as a capital',
      returns: 'Text',
      example: `nlp('jupiter, pluto and mars').nouns().toTitleCase().all().out()//Jupiter, Pluto and Mars.`
    },
    toUpperCase: {
      desc: 'set all the letters as a capital',
      returns: 'Text',
      example: `nlp('Dental plan. Lisa needs braces.').match('dental .').toUpperCase().out()//DENTAL PLAN.`
    },
    toLowerCase: {
      desc: 'set all the letters as a not-capital. Even acronyms and first-letters of sentences',
      returns: 'Text',
      example: `nlp('Careful! They’re RUFFLED!!').toLowerCase().out()//careful! they’re ruffled!!`
    },
    toCamelCase: {
      desc: 'remove whitespace and titlecase the words',
      returns: 'Text',
      example: `nlp('natural language processing').toCamelCase().out()//NaturalLanguageProcessing`
    },
    hyphenate: {
      desc: 'remove whitespace and add a hyphenate between the words',
      returns: 'Text',
      example: `nlp('natural language processing').hyphenate().out()//natural-language-processing`
    },
    dehyphenate: {
      desc: 'remove hyphens and add normal whitespace between words',
      returns: 'Text',
      example: `nlp('natural-language processing').dehyphenate().out()//natural language processing`
    },
    fn: {
      desc: '',
      returns: '',
      example: `nlp('').fn()`
    },
    fn: {
      desc: '',
      returns: '',
      example: `nlp('').fn()`
    },
    fn: {
      desc: '',
      returns: '',
      example: `nlp('').fn()`
    },
    fn: {
      desc: '',
      returns: '',
      example: `nlp('').fn()`
    },


  },
  subsets: {
    acronyms: {
      data: {
        example: `nlp().acronyms().data()`,
        returns: 'array'
      }
    },

    adjectives: {
      data: {
        example: `nlp().adjectives().data()`,
        returns: 'array'
      }
    },

    adverbs: {
      data: {
        example: `nlp().adverbs().data()`,
        returns: 'array'
      }
    },

    clauses: {
      data: {
        example: `nlp().clauses().data()`,
        returns: 'array'
      }
    },

    contractions: {
      data: {
        example: `nlp().contractions().data()`,
        returns: 'array'
      }
    },

    dates: {
      data: {
        example: `nlp().dates().data()`,
        returns: 'array'
      }
    },

    hashTags: {
      data: {
        example: `nlp().hashTags().data()`,
        returns: 'array'
      }
    },

    nouns: {
      data: {
        example: `nlp().nouns().data()`,
        returns: 'array'
      }
    },

    organizations: {
      data: {
        example: `nlp().organizations().data()`,
        returns: 'array'
      }
    },

    people: {
      data: {
        example: `nlp().people().data()`,
        returns: 'array'
      }
    },

    phoneNumbers: {
      data: {
        example: `nlp().phoneNumbers().data()`,
        returns: 'array'
      }
    },

    places: {
      data: {
        example: `nlp().places().data()`,
        returns: 'array'
      }
    },

    questions: {
      data: {
        example: `nlp().questions().data()`,
        returns: 'array'
      }
    },

    quotations: {
      data: {
        example: `nlp().quotations().data()`,
        returns: 'array'
      }
    },

    sentences: {
      data: {
        example: `nlp().sentences().data()`,
        returns: 'array'
      }
    },

    statements: {
      data: {
        example: `nlp().statements().data()`,
        returns: 'array'
      }
    },

    terms: {
      data: {
        example: `nlp().terms().data()`,
        returns: 'array'
      }
    },

    topics: {
      data: {
        example: `nlp().topics().data()`,
        returns: 'array'
      }
    },

    urls: {
      data: {
        example: `nlp().urls().data()`,
        returns: 'array'
      }
    },

    values: {
      data: {
        example: `nlp().values().data()`,
        returns: 'array'
      }
    },

    verbs: {
      data: {
        example: `nlp().verbs().data()`,
        returns: 'array'
      }
    },

    ngrams: {
      data: {
        example: `nlp().ngrams().data()`,
        returns: 'array'
      }
    },

    startGrams: {
      data: {
        example: `nlp().startGrams().data()`,
        returns: 'array'
      }
    },

    endGrams: {
      data: {
        example: `nlp().endGrams().data()`,
        returns: 'array'
      }
    },
  }
};

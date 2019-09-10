module.exports = {
  contractions: {
    data: {
      desc: 'return a handy array of meta-data for this the contractions in this text',
      example:
        "nlp(' I’d like to request seventeen dollars for a push broom rebristling').contractions().data()\n//[{text:'I'd'}]",
      returns: 'array',
    },
    expand: {
      desc: "turn `didn't` into `did not`, etc",
      returns: 'Text',
      example: "nlp('He’s the greatest guy in history').contractions().expand().out('')\n//He is",
    },
    contract: {
      desc: "turn did not into didn't, etc.",
      returns: 'Text',
      example: "nlp('He is about to hit a chestnut tree').contractions().contract().out('')\n//He's",
    },
    contracted: {
      desc: "show only the contractions that are currently contracted -eg. `i'll` but not `i will`",
      returns: 'Text',
      example: "nlp('Lisa, I’d like to buy your rock.').contractions().contracted().out('')\n//I'd",
    },
    expanded: {
      desc: "show only the contractions that are currently not contracted -eg. `he would` but not `he'd`",
      returns: 'Text',
      example: "nlp('Lisa, I would like to buy your rock.').contractions().expanded().out('')\n//I would",
    },
  },

  dates: {
    data: {
      desc: 'return an array of meta-data about the dates and times in this text',
      example:
        "nlp('Finally, I just stopped caring. Luckily for me, it was 1980 and no one noticed.').dates().data()\n//[{text:'1980'}]",
      returns: 'array',
    },
    toShortForm: {
      desc: "turn 'Thurs' and 'Sept' into `Thursday` and `September`",
      returns: 'Text',
      example: "nlp('April, June, and Sept').dates().toShortForm().all().out()\n//Apr, Jun, and Sept",
    },
    toLongForm: {
      desc: "turn `Thursday` and `September` into 'Thurs' and 'Sept'",
      returns: 'Text',
      example: "nlp('April, June, and Sept').dates().toShortForm().all().out()\n//April, June, and September",
    },
  },

  ngrams: {
    data: {
      desc:
        'return a handy array of meta-data for the n-grams in this text. accepts an obj with `max` or `size` number',
      example: "nlp('love love me do.').ngrams({max:3}).data()\n//[{text:'love', count:2, size:1}..]",
      returns: 'array',
    },
    unigrams: {
      desc: 'return only the ngrams of size 1',
      returns: 'Text',
      example:
        "nlp('University of Toronto, in toronto').ngrams().unigrams(0).data()\n//[{normal:'toronto', count:2, size:1}]",
    },
    bigrams: {
      desc: 'return only the ngrams of size 2',
      returns: 'Text',
      example:
        "nlp('The University of Ryerson and University of Toronto, in toronto').ngrams().bigrams(0).data()\n//[{normal:'university of', count:2, size:2}]",
    },
    trigrams: {
      desc: 'return only the ngrams of size 3',
      returns: 'Text',
      example:
        "nlp('we like Roy! we like Roy!').ngrams().trigrams(0).data()\n//[{normal:'we like roy', count:2, size:3}]",
    },
    sort: {
      desc: 'the default sort for ngrams - count, then size, then character length. (called by default)',
      returns: 'Text',
      example: "nlp('i scream, you scream, we all scream for icecream.').ngrams().sort().first().out()\n//scream",
    },
  },

  people: {
    data: {
      desc: 'return a handy array of meta-data of people mentioned in the text',
      example:
        "nlp('The bone-rattling bass of Mel Schacher? The competent drum work of Don Brewer?').people().data()\n//[{text:' Mel Schacher'}, {text:'Don Brewer'}]",
      returns: 'array',
    },
    pronoun: {
      desc: 'find the pronoun used to refer to the person, or suggest one based on their inferred gender.',
      returns: 'String',
      example: "nlp('Tony Hawk did a 900').people().pronoun()\n//'he'",
    },
    firstNames: {
      desc: 'grab only the first-names',
      returns: 'Text',
      example: "nlp('Tony Hawk did a 900').people().firstNames().out('array')\n//['tony']",
    },
    lastNames: {
      desc: 'grab only the last-names',
      returns: 'Text',
      example: "nlp('Tony Hawk did a 900').people().lastNames().out('array')\n//['hawk']",
    },
  },

  acronyms: {
    stripPeriods: {
      desc: "turn 'FBI' into 'F.B.I.'",
      returns: 'Text',
      example: "nlp('Director of the F.B.I.').acronyms().stripPeriods().out()\n//Director of the FBI",
    },
    addPeriods: {
      desc: "turn 'FBI' into 'F.B.I.'",
      returns: 'Text',
      example: "nlp('Director of the FBI').acronyms().addPeriods().out()\n//Director of the F.B.I.",
    },
    data: {
      desc: 'return an array of meta-data for the acronyms in this text',
      example:
        "nlp('In the USA, the big CIA. The Bloods and the Crips, and the KKK.').acronyms().data()\n//[{text:'USA'...}]",
      returns: 'array',
    },
  },
  adjectives: {
    data: {
      desc: 'return an array of meta-data for the adjectives and their adverbs',
      example:
        "nlp('Guys, we have to assume our guns are useless. Throw them in the lake.').adjectives().data()\n//[{text:'useless'}]",
      returns: 'array',
    },
  },
  adverbs: {
    data: {
      desc: 'return an array of meta-data for the adverbs in this text',
      example: "nlp('truly, madly, deeply').adverbs().data()\n//[{text:'truly'...}]",
      returns: 'array',
    },
  },
  clauses: {
    data: {
      desc: 'return an array of words split by sentence phrase (clause)',
      example:
        "nlp('All right, Colossus, you’re free to go, but stay away from Death Mountain').clauses().data()\n//[{normal:'all right'}, {normal:'Colossus'}, {normal:'you're free to go'},]",
      returns: 'array',
    },
  },
  hashTags: {
    data: {
      desc: 'return an array of parsed hashtags used in the text',
      example: "nlp('oh, but where is the #anykey').hashTags().data()\n//[{normal:'anykey'}]",
      returns: 'array',
    },
  },
  startGrams: {
    data: {
      desc: 'return an array of subsequences beginning at the start of each sentence or match',
      example:
        "nlp('Who controls the British crown? Who keeps the metric system down?').startGrams().data()\n//[{normal:'who', size:1, count:2}...]",
      returns: 'array',
    },
  },
  endGrams: {
    data: {
      desc: 'return an array of subsequences ending at the end of each sentence or match',
      example:
        "nlp('you think that’s a knife? I’ll show you a knife.').endGrams().data()\n//[{normal:'knife', count:2, size:1}...]",
      returns: 'array',
    },
  },
  organizations: {
    data: {
      desc: 'return an array of named-organizations in this text',
      example:
        "nlp('Your dreams may vary from those of Globex Corporation, its subsidiaries and shareholders.').organizations().data()\n//[{text:'Globex Corporation'}]",
      returns: 'array',
    },
  },
  phoneNumbers: {
    data: {
      desc: 'return an array of parsed phonenumbers in this text',
      example:
        "nlp('Moe Sizlak. That’s right. I’m a surgeon. (800) 555-0000.').phoneNumbers().data()\n//[{text:'(800) 555-0000'}]",
      returns: 'array',
    },
  },
  places: {
    data: {
      desc: 'return an array of locations mentioned in this text',
      example: "nlp('you could still go to McGill, the Harvard of Canada!').places().data()\n//[{normal:'canada'}]",
      returns: 'array',
    },
  },
  parentheses: {
    data: {
      desc: 'return a list of phrases between ( ) brackets.',
      example: "nlp('Use a pointed stick (a pencil) or a similar tool').parentheses().data()\n//[{text:'a pencil'}..]",
      returns: 'array',
    },
  },
  questions: {
    data: {
      desc: 'return an array of question sentences in this text',
      example: "nlp('are you saying boo, or boo-urns?').questions().data().length\n//1",
      returns: 'array',
    },
  },
  quotations: {
    data: {
      desc: 'return an array of meta-data with the parsed quoations',
      example: 'nlp(\'the he said "crazy like a fox!".\').quotations().data().length\n//1',
      returns: 'array',
    },
  },
  statements: {
    data: {
      desc: 'return an array of sentences that are not questions',
      example: "nlp('i was saying boo-urns.').statements().data()\n//[{normal:'i was saying boo-urns'}]",
      returns: 'array',
    },
  },
  terms: {
    data: {
      desc: 'split all words into individual results, and return their metadata',
      example: "nlp('we should all be more like little Ruttiger').terms().data()\n//[{text:'we'}, {text:'should'}...]",
      returns: 'array',
    },
  },
  possessives: {
    strip: {
      desc: 'grab all the things that are possessive, like "Homer Simpson\'s"',
      example: "nlp('moe’s tavern').possessives().strip()\n//moe",
      returns: 'array',
    },
  },
  topics: {
    data: {
      desc: 'return the people, places, and organizations of this text',
      example:
        "nlp('Hey everybody, I’m lookin’ for Amanda Hugginkiss').topics().data()\n//[{text:'Amanda Hugginkiss'}]",
      returns: 'array',
    },
  },
  urls: {
    data: {
      desc: 'return an array of urls mentioned in this text',
      example: "nlp('👏 http://simpsons.wikia.com').urls().data()\n//[{text:'http://simpsons.wikia.com'}]",
      returns: 'array',
    },
  },
}

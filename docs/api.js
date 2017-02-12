module.exports = {
  generic: {
    data: {
      desc: 'return a handy array of meta-data for this subset',
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

    //case
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

    //insert
    insertBefore: {
      desc: 'append a word (or words) before each match',
      returns: 'Text',
      example: `nlp('stupid flanders').match('flanders').insertBefore('sexy').all().out()//stupid sexy flanders`
    },
    insertAfter: {
      desc: 'append a word (or words) after each match',
      returns: 'Text',
      example: `nlp('i know so many words').insertAfter('bigly').all().out()//i know so many words bigly`
    },
    insertAt: {
      desc: 'insert a word or words at a known index (zero-based)',
      returns: 'Text',
      example: `nlp('so you are from Africa?').insertAt(2, 'like,').all().out()//so you are like, from africa?`
    },

    //replace
    replaceWith: {
      desc: 'turn the current selection into something else. Essentially just delete() -> insertAt().',
      returns: 'Text',
      example: `nlp('it was the worst of times').match('worst').replaceWith('blurst').all().out()//it was the blurst of times`
    },
    replace: {
      desc: 'turn a new selection into something else. Essentially just match() -> delete() -> insertAt().',
      returns: 'Text',
      example: `nlp('it was the worst of times').replace('worst','blurst').all().out()//it was the blurst of times`
    },
    delete: {
      desc: 'remove a match from the Text permanently. For a temporary filter, see `.not()`',
      returns: 'Text',
      example: `nlp('you don't win friends with salad').delete('do not').out()//you win friends with salad`
    },

    //match
    match: {
      desc: 'zoom-in to a subset of the text, using a [regex-like syntax](https://github.com/nlp-compromise/compromise/wiki/Match-syntax)',
      returns: 'Text',
      example: `nlp('we understand, we are from the land of chocolate.').match('land of #Noun').out()//land of chocolate`
    },
    not: {
      desc: 'return parts of the text that do not match. Like .match() but opposite.',
      returns: 'Text',
      example: `nlp('wait, there's a new mexico?').places().not('new').out()//mexico`
    },
    if: {
      desc: 'returns only the sets which contain this match. Like a Array.filter() method, for your results',
      returns: 'Text',
      example: `nlp('We're here, we're clear, we don't want anymore bears.').clauses().if('anymore').out()//we don't want anymore bears`
    },
    ifNo: {
      desc: 'removes any sets that have this match',
      returns: 'Text',
      example: `nlp('We're here, we're clear, we don't want anymore bears.').clauses().ifNo('anymore').out()//We're here, we're clear,`
    },

    normalize: {
      desc: 'transforms whitespace, case, punctuation, contractions and values, so that they are more standard and workable',
      returns: 'Text',
      example: `nlp(' so... you like   DONUTS? have all the donuts in the WORLD!!!').normalize().sentences(0).out()//So you like donuts?`
    },

    //split
    splitOn: {
      desc: 'split matches into [before, match, after]',
      returns: 'Text',
      example: `nlp('Monorail...Once again! Monorail... Monorail!').splitOn('monorail').get(0).out()//Monorail`
    },
    splitBefore: {
      desc: 'split matches into [before,  match + after]',
      returns: 'Text',
      example: `nlp('Monorail...Once again! Monorail... Monorail!').splitBefore('monorail').get(0).out()//Monorail...Once again!`
    },
    splitAfter: {
      desc: 'split matches into [before + match,  after]',
      returns: 'Text',
      example: `nlp('Monorail...Once again! Monorail... Monorail!').splitAfter('monorail').get(0).out()//Monorail`
    },

    //tag
    tag: {
      desc: 'set a particular interpretation for these terms. Can tag your match as anything. Supported tags do dependency/conflict logic.',
      returns: 'Text',
      example: `nlp('Michael Apple ate a delicious apple.').match('#FirstName apple').tag('Person').people().out()//Michael Apple`
    },
    unTag: {
      desc: 'remove a particular tag for all these terms.',
      returns: 'Text',
      example: `nlp('they made a catch & scored a run').match(['run','catch']).unTag('#Verb').nouns().out('array')//catch, run`
    },
    canBe: {
      desc: 'return only terms that have no conflicts with this tag',
      returns: 'Text',
      example: `nlp('it's fusilli jerry!').canBe('Person').out()//fusilli jerry`
    }
  },





  subsets: {
    acronyms: {
      data: {
        desc: 'return a handy array of meta-data for this subset',
        example: `nlp().acronyms().data()`,
        returns: 'array'
      }
    },

    adjectives: {
      data: {
        desc: 'return a handy array of meta-data for this subset',
        example: `nlp().adjectives().data()`,
        returns: 'array'
      }
    },

    adverbs: {
      data: {
        desc: 'return a handy array of meta-data for this subset',
        example: `nlp().adverbs().data()`,
        returns: 'array'
      }
    },

    clauses: {
      data: {
        desc: 'return a handy array of meta-data for this subset',
        example: `nlp().clauses().data()`,
        returns: 'array'
      }
    },

    contractions: {
      data: {
        desc: 'return a handy array of meta-data for this subset',
        example: `nlp().contractions().data()`,
        returns: 'array'
      },
      expand: {
        desc: 'turn `didn\'t` into `did not`, etc',
        returns: 'Text',
        example: `nlp('He’s the greatest guy in history').contractions().expand().out('')//He is`
      },
      contract: {
        desc: 'turn did not into didn\'t, etc.',
        returns: 'Text',
        example: `nlp('He is about to hit a chestnut tree').contractions().contract().out('')//He's`
      },
      contracted: {
        desc: 'show only the contractions that are currently contracted -eg. `i\'ll` but not `i will`',
        returns: 'Text',
        example: `nlp('Lisa, I’d like to buy your rock.').contractions().contracted().out('')//I'd`
      },
      expanded: {
        desc: 'show only the contractions that are currently not contracted -eg. `he would` but not `he\'d`',
        returns: 'Text',
        example: `nlp('Lisa, I would like to buy your rock.').contractions().expanded().out('')//I would`
      }
    },

    dates: {
      data: {
        desc: 'return a handy array of meta-data for this subset',
        example: `nlp().dates().data()`,
        returns: 'array'
      },
      toShortForm: {
        desc: 'turn \'Thurs\' and \'Sept\' into `Thursday` and `September`',
        returns: 'Text',
        example: `nlp('April, June, and Sept').dates().toShortForm().all().out()//Apr, Jun, and Sept`
      },
      toLongForm: {
        desc: 'turn `Thursday` and `September` into \'Thurs\' and \'Sept\'',
        returns: 'Text',
        example: `nlp('April, June, and Sept').dates().toShortForm().all().out()//April, June, and September`
      },
    },

    hashTags: {
      data: {
        desc: 'return a handy array of meta-data for this subset',
        example: `nlp().hashTags().data()`,
        returns: 'array'
      }
    },

    ngrams: {
      data: {
        desc: 'return a handy array of meta-data for this subset',
        example: `nlp().ngrams().data()`,
        returns: 'array'
      },
      unigrams: {
        desc: 'return only the ngrams of size 1',
        returns: 'Text',
        example: `nlp('University of Toronto, in toronto').ngrams().unigrams(0).data()//[{normal:'toronto', count:2, size:1}]`
      },
      bigrams: {
        desc: 'return only the ngrams of size 2',
        returns: 'Text',
        example: `nlp('The University of Ryerson and University of Toronto, in toronto').ngrams().bigrams(0).data()//[{normal:'university of', count:2, size:2}]`
      },
      trigrams: {
        desc: 'return only the ngrams of size 3',
        returns: 'Text',
        example: `nlp('we want bart! we want bart!').ngrams().trigrams(0).data()//[{normal:'we want bart', count:2, size:3}]`
      },
      sort: {
        desc: 'the default sort for ngrams - count, then size, then character length. (called by default)',
        returns: 'Text',
        example: `nlp('i scream, you scream, we all scream for icecream.').ngrams().sort().first().out()//scream`
      },
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
        example: `nlp().endGrams().data()`,
        returns: 'array'
      }
    },

    nouns: {
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

    },

    organizations: {
      data: {
        desc: 'return a handy array of meta-data for this subset',
        example: `nlp().organizations().data()`,
        returns: 'array'
      }
    },

    people: {
      data: {
        desc: 'return a handy array of meta-data for this subset',
        example: `nlp().people().data()`,
        returns: 'array'
      },
      pronoun: {
        desc: 'find the pronoun used to refer to the person, or suggest one based on their inferred gender.',
        returns: 'String',
        example: `nlp('Tony Hawk did a 900').people().pronoun() //'he'`
      }
    },

    phoneNumbers: {
      data: {
        desc: 'return a handy array of meta-data for this subset',
        example: `nlp().phoneNumbers().data()`,
        returns: 'array'
      }
    },

    places: {
      data: {
        desc: 'return a handy array of meta-data for this subset',
        example: `nlp().places().data()`,
        returns: 'array'
      }
    },

    questions: {
      data: {
        desc: 'return a handy array of meta-data for this subset',
        example: `nlp().questions().data()`,
        returns: 'array'
      }
    },

    quotations: {
      data: {
        desc: 'return a handy array of meta-data for this subset',
        example: `nlp().quotations().data()`,
        returns: 'array'
      }
    },

    sentences: {
      data: {
        desc: 'return a handy array of meta-data for this subset',
        example: `nlp().sentences().data()`,
        returns: 'array'
      },
      toPastTense: {
        desc: 'transform the sentences so that they are in the past tense',
        returns: 'Text',
        example: `nlp('I pay the Homer tax.').sentences().toPastTense().out()//I paid the Homer tax.`
      },
      toPresentTense: {
        desc: 'transform the sentences so that they are in the present tense',
        returns: 'Text',
        example: `nlp('I paid the Homer tax.').sentences().toPresentTense().out()//I pay the Homer tax.`
      },
      toFutureTense: {
        desc: 'transform the sentences so that they are in the future tense',
        returns: 'Text',
        example: `nlp('I pay the Homer tax.').sentences().toFutureTense().out()//I will pay the Homer tax.`
      },
      toNegative: {
        desc: 'turn the sentence negative, so that it means the opposite thing',
        returns: 'Text',
        example: `nlp('Now make like my pants, and split.').sentences(0).toNegative().out()//Now do not make like my pants, and split.`
      },
      toPositive: {
        desc: 'if the sentence is negatively-stated, make it say the opposite thing',
        returns: 'Text',
        example: `nlp('The goggles do nothing!').sentences().toPositive().out()//The goggles do everything!`
      },
      isPassive: {
        desc: 'return only sentences that are passive-tense',
        returns: 'Text',
        example: `nlp('you were saved by the bell').sentences().isPassive().out()//you were saved by the bell`
      },
      toExclamation: {
        desc: 'replace the sentence\'s end punctuation with an exclamation point',
        returns: 'Text',
        example: `nlp('sweet balls of fire?').sentences().toExclamation().out()//sweet balls of fire!`
      },
      toQuestion: {
        desc: 'turn the sentence into a question',
        returns: 'Text',
        example: `nlp('Stupider like a fox.').sentences().toQuestion().out()//Stupider like a fox?`
      },
      toStatement: {
        desc: 'turn the sentence into a statement. Replace it\'s end punctuation with a period',
        returns: 'Text',
        example: `nlp('Go out on a Tuesday? Who am I, Charlie Sheen?').sentences(0).toStatement().out()//Go out on a Tuesday. Who am I, Charlie Sheen?`
      }
    },

    statements: {
      data: {
        desc: 'return a handy array of meta-data for this subset',
        example: `nlp().statements().data()`,
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
    },

    values: {
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
    },

    verbs: {
      data: {
        desc: 'return a handy array of meta-data for this subset',
        example: `nlp().verbs().data()`,
        returns: 'array'
      },
      conjugation: {
        desc: 'which form of is the verb in currently? PastTense, PresentTense, Infinitive, etc',
        returns: 'String',
        example: `nlp('My cat’s breath smells like cat food').verbs().conjugation() //['PresentTense']`
      },
      conjugate: {
        desc: 'she walked the walk',
        returns: 'Array',
        example: `nlp('').verbs().conjugate() //[{Infinitive:'walk', ...}]`
      },
      isNegative: {
        desc: '',
        returns: 'Text',
        example: `nlp('Dear Miss Hoover, you have Lyme disease.').verbs().isNegative().length() //1`
      },
      toNegative: {
        desc: 'make the verbs mean the opposite thing - `walk`->`did not walk` etc',
        returns: 'Text',
        example: `nlp('Dear Miss Hoover, you have Lyme disease.').verbs().toNegative().out() //do not have`
      },
      toPositive: {
        desc: 'if the verb is negative, make it not negative',
        returns: 'Text',
        example: `nlp('Dear Miss Hoover, you do not have Lyme disease').verbs().toPositive().out() //have`
      },
      toPastTense: {
        desc: 'turn the verb into past tense - `walk`->`walked` etc.',
        returns: 'Text',
        example: `nlp('It tastes like burning.').verbs().toPastTense().out() //tasted`
      },
      toPresentTense: {
        desc: 'turn the verb into present tense - `walked`->`walks` etc.',
        returns: 'Text',
        example: `nlp('').verbs().toPresentTense().out() //`
      },
      toFutureTense: {
        desc: 'turn the verb into future tense - `walked`->`will walk` etc.',
        returns: 'Text',
        example: `nlp('I'm a furniture! ').verbs().toFutureTense().out() //will be`
      },
      asAdjective: {
        desc: 'conjugate the verb to its adjectival form - `walk`->`walkable`',
        returns: 'Array',
        example: `nlp('strain').verbs().asAdjective() //strenuous`
      },
    },


  }
};

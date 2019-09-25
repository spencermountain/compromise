module.exports = {
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

  clauses: {
    data: {
      desc: 'return an array of words split by sentence phrase (clause)',
      example:
        "nlp('All right, Colossus, you’re free to go, but stay away from Death Mountain').clauses().data()\n//[{normal:'all right'}, {normal:'Colossus'}, {normal:'you're free to go'},]",
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
}

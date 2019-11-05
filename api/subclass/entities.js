module.exports = {
  people: {
    json: {
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
      returns: 'Doc',
      example: "nlp('Tony Hawk did a 900').people().firstNames().out('array')\n//['tony']",
    },
    lastNames: {
      desc: 'grab only the last-names',
      returns: 'Doc',
      example: "nlp('Tony Hawk did a 900').people().lastNames().out('array')\n//['hawk']",
    },
  },

  organizations: {
    json: {
      desc: 'return an array of named-organizations in this text',
      example:
        "nlp('Your dreams may vary from those of Globex Corporation, its subsidiaries and shareholders.').organizations().data()\n//[{text:'Globex Corporation'}]",
      returns: 'array',
    },
  },
  places: {
    json: {
      desc: 'return an array of locations mentioned in this text',
      example: "nlp('you could still go to McGill, the Harvard of Canada!').places().data()\n//[{normal:'canada'}]",
      returns: 'array',
    },
  },
  topics: {
    json: {
      desc: 'return the people, places, and organizations of this text',
      example:
        "nlp('Hey everybody, I’m lookin’ for Amanda Hugginkiss').topics().data()\n//[{text:'Amanda Hugginkiss'}]",
      returns: 'array',
    },
  },
}

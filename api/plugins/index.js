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
      returns: 'Doc',
      example: "nlp('April, June, and Sept').dates().toShortForm().all().out()\n//Apr, Jun, and Sept",
    },
    toLongForm: {
      desc: "turn `Thursday` and `September` into 'Thurs' and 'Sept'",
      returns: 'Doc',
      example: "nlp('April, June, and Sept').dates().toShortForm().all().out()\n//April, June, and September",
    },
  },

  acronyms: {
    stripPeriods: {
      desc: "turn 'FBI' into 'F.B.I.'",
      returns: 'Doc',
      example: "nlp('Director of the F.B.I.').acronyms().stripPeriods().out()\n//Director of the FBI",
    },
    addPeriods: {
      desc: "turn 'FBI' into 'F.B.I.'",
      returns: 'Doc',
      example: "nlp('Director of the FBI').acronyms().addPeriods().out()\n//Director of the F.B.I.",
    },
    data: {
      desc: 'return an array of meta-data for the acronyms in this text',
      example:
        "nlp('In the USA, the big CIA. The Bloods and the Crips, and the KKK.').acronyms().data()\n//[{text:'USA'...}]",
      returns: 'array',
    },
  },
}

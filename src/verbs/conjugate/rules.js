exports.rules = [

  // //infinitive
  {
    reg: /([a[tg]|i[zn]]|ur|nc|gl|is)e$/i,
    repl: {
      present: "$1es",
      gerund: "$1ing",
      past: "$1ed"
    },
    examples: 'angulate, stipulate, orientate',
    exceptions: ["ate", "overate"],
    power: 804,
    tense: 'infinitive'
  }, {
    reg: /([i|f|rr])y$/i,
    repl: {
      present: "$1ies",
      gerund: "$1ying",
      past: "$1ied"
    },
    examples: 'unify, classify, glorify',
    exceptions: [],
    power: 128,
    tense: 'infinitive'
  }, {
    reg: /([td]er)$/i,
    repl: {
      present: "$1s",
      gerund: "$1ing",
      past: "$1ed"
    },
    examples: 'sputter, fritter, charter',
    exceptions: [],
    power: 123,
    tense: 'infinitive'
  }, {
    reg: /([bd])le$/i,
    repl: {
      present: "$1es",
      gerund: "$1ing",
      past: "$1ed"
    },
    examples: 'shamble, warble, grabble',
    exceptions: [],
    power: 69,
    tense: 'infinitive'
  }, {
    reg: /(ish|tch|ess)$/i,
    repl: {
      present: "$1es",
      gerund: "$1ing",
      past: "$1ed"
    },
    examples: 'relish, wish, brandish',
    exceptions: [],
    power: 62,
    tense: 'infinitive'
  }, {
    reg: /(ion|end|e[nc]t)$/i,
    repl: {
      present: "$1s",
      gerund: "$1ing",
      past: "$1ed"
    },
    examples: 'caution, aircondition, cushion',
    exceptions: ["sent", "bent", "overspent", "misspent", "went", "kent", "outwent", "forwent", "spent", "pent", "lent", "underwent", "rent", "unbent", "shent"],
    power: 55,
    tense: 'infinitive'
  }, {
    reg: /(om)e$/i,
    repl: {
      present: "$1es",
      gerund: "$1ing",
      past: "ame",
    },
    examples: 'become',
    exceptions: [],
    power: 1,
    tense: 'infinitive'
  }, {
    reg: /([aeiou])([ptn])$/i,
    repl: {
      present: "$1$2s",
      gerund: "$1$2$2ing",
      past: "$1$2",
    },
    examples: 'win',
    exceptions: [],
    power: 1,
    tense: 'infinitive'
  },

  {
    reg: /(er)$/i,
    repl: {
      present: "$1s",
      gerund: "$1ing",
      past: "$1ed",
    },
    examples: 'win',
    exceptions: [],
    power: 1,
    tense: 'infinitive'
  },

  // {
  //   reg: /(ed)$/i,
  //   repl: {
  //     present: "$1s",
  //     gerund: "ing",
  //     past: "",
  //   },
  //   examples: 'telecasted',
  //   exceptions: [],
  //   power: 1,
  //   tense: 'infinitive'
  // }, {
  //   reg: /(es)$/i,
  //   repl: {
  //     present: "$1",
  //     gerund: "ing",
  //     past: "ed",
  //   },
  //   examples: 'telecasted',
  //   exceptions: [],
  //   power: 1,
  //   tense: 'infinitive'
  // },




  //present
  {
    reg: /([tzlshicgrvdnkmu])es$/i,
    repl: {
      infinitive: "$1e",
      gerund: "$1ing",
      past: "$1ed"
    },
    examples: 'convolutes, angulates, stipulates',
    exceptions: [],
    power: 923,
    tense: 'present'
  }, {
    reg: /(n[dtk]|c[kt]|[eo]n|i[nl]|er|a[ytrl])s$/i,
    repl: {
      infinitive: "$1",
      gerund: "$1ing",
      past: "$1ed"
    },
    examples: 'wants, squints, garments',
    exceptions: [],
    power: 153,
    tense: 'present'
  }, {
    reg: /(ow)s$/i,
    repl: {
      infinitive: "$1",
      gerund: "$1ing",
      past: "ew"
    },
    examples: 'wants, squints, garments',
    exceptions: [],
    power: 153,
    tense: 'present'
  }, {
    reg: /(op)s$/i,
    repl: {
      infinitive: "$1",
      gerund: "$1ping",
      past: "$1ped"
    },
    examples: 'wants, squints, garments',
    exceptions: [],
    power: 153,
    tense: 'present'
  }, {
    reg: /([eirs])ts$/i,
    repl: {
      infinitive: "$1t",
      gerund: "$1tting",
      past: "$1tted"
    },
    examples: 'outwits, revisits, knits',
    exceptions: [],
    power: 105,
    tense: 'present'
  }, {
    reg: /(ll)s$/i,
    repl: {
      infinitive: "$1",
      gerund: "$1ing",
      past: "$1ed"
    },
    examples: 'culls, tolls, shalls',
    exceptions: [],
    power: 92,
    tense: 'present'
  }, {
    reg: /(el)s$/i,
    repl: {
      infinitive: "$1",
      gerund: "$1ling",
      past: "$1led"
    },
    examples: 'swivels, rebels, travels',
    exceptions: [],
    power: 88,
    tense: 'present'
  },




  //gerund
  {
    reg: /([aeiou][^aeiouwyrlm])ing$/i,
    repl: {
      infinitive: "$1e",
      present: "$1es",
      past: "$1ed"
    },
    examples: 'convoluting, compensating, fouling',
    exceptions: [],
    power: 8475,
    tense: 'gerund'
  }, {
    reg: /([aeiou][^aeiou]*)ing$/i,
    repl: {
      infinitive: "$1",
      present: "$1s",
      past: "$1ed"
    },
    examples: 'walking, fawning, farming, swing',
    exceptions: [],
    power: 8475,
    tense: 'gerund'
  },


  //past
  {
    reg: /(.[pigmcvwbyfkt])ed$/i,
    repl: {
      infinitive: "$1e",
      present: "$1es",
      gerund: "$1ing"
    },
    examples: 'convoluted, outwitted, angulated',
    exceptions: [],
    power: 1854,
    tense: 'past'
  }, {
    reg: /([rl])ew$/i,
    repl: {
      infinitive: "$1ow",
      present: "$1ows",
      gerund: "$1owing"
    },
    example: "overthrew",
    exceptions: ["brew", "crew", "screw", "unscrew"],
    tense: "past"
  }
];
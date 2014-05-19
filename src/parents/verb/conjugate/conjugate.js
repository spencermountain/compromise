verb_conjugate = (function() {

  var verb_rules = [

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

  var verb_irregulars = [{
      "present": "arises",
      "gerund": "arising",
      "past": "arose",
      "infinitive": "arise",
      "participle": "arisen"
    }, {
      "infinitive": "babysit",
      "present": "babysits",
      "past": "babysat",
      "gerund": "babysitting",
      "participle": "babysat"
    }, {
      "infinitive": "be",
      "present": "is",
      "gerund": "being",
      "past": "were",
      "participle": "been"
    }, {
      "infinitive": "be",
      "present": "is",
      "gerund": "being",
      "past": "were",
      "participle": "been"
    }, {
      "infinitive": "beat",
      "present": "beats",
      "past": "beat",
      "gerund": "beating",
      "participle": "beaten"
    }, {
      "present": "becomes",
      "gerund": "becoming",
      "past": "became",
      "infinitive": "become",
      "participle": "become"
    }, {
      "present": "bends",
      "gerund": "bending",
      "past": "bent",
      "infinitive": "bend",
      "participle": "bent"
    }, {
      "infinitive": "begin",
      "present": "begins",
      "past": "began",
      "gerund": "begining",
      "participle": "begun"
    }, {
      "infinitive": "bet",
      "present": "bets",
      "past": "bet",
      "gerund": "betting",
      "participle": "bet"
    }, {
      "infinitive": "bind",
      "present": "binds",
      "past": "bound",
      "gerund": "binding",
      "participle": "bound"
    }, {
      "present": "bites",
      "gerund": "biting",
      "past": "bit",
      "infinitive": "bite",
      "participle": "bitten"
    }, {
      "infinitive": "bleed",
      "present": "bleeds",
      "past": "bled",
      "gerund": "bleeding",
      "participle": "bled"
    }, {
      "infinitive": "blow",
      "present": "blows",
      "past": "blew",
      "gerund": "blowing",
      "participle": "blown"
    }, {
      "infinitive": "break",
      "present": "breaks",
      "past": "broke",
      "gerund": "breaking",
      "participle": "broken"
    }, {
      "infinitive": "breed",
      "present": "breeds",
      "past": "bred",
      "gerund": "breeding",
      "participle": "bred"
    }, {
      "infinitive": "bring",
      "present": "brings",
      "past": "brought",
      "gerund": "bringing",
      "participle": "brought"
    }, {
      "infinitive": "broadcast",
      "present": "broadcasts",
      "past": "broadcast",
      "gerund": "broadcasting",
      "participle": "broadcast"
    }, {
      "infinitive": "build",
      "present": "builds",
      "past": "built",
      "gerund": "building",
      "participle": "built"
    }, {
      "infinitive": "buy",
      "present": "buys",
      "past": "bought",
      "gerund": "buying",
      "participle": "bought"
    }, {
      "present": "catches",
      "gerund": "catching",
      "past": "caught",
      "infinitive": "catch",
      "participle": "caught"
    }, {
      "infinitive": "choose",
      "present": "chooses",
      "past": "chose",
      "gerund": "choosing",
      "participle": "chosen"
    }, {
      "present": "comes",
      "gerund": "coming",
      "past": "came",
      "infinitive": "come",
      "participle": "come"
    }, {
      "infinitive": "cost",
      "present": "costs",
      "past": "cost",
      "gerund": "costing",
      "participle": "cost"
    }, {
      "infinitive": "cut",
      "present": "cuts",
      "past": "cut",
      "gerund": "cutting",
      "participle": "cut"
    }, {
      "infinitive": "deal",
      "present": "deals",
      "past": "dealt",
      "gerund": "dealing",
      "participle": "dealt"
    }, {
      "infinitive": "dig",
      "present": "digs",
      "past": "dug",
      "gerund": "digging",
      "participle": "dug"
    }, {
      "infinitive": "do",
      "present": "does",
      "past": "did",
      "gerund": "doing",
      "participle": "done"
    }, {
      "infinitive": "draw",
      "present": "draws",
      "past": "drew",
      "gerund": "drawing",
      "participle": "drawn"
    }, {
      "infinitive": "drink",
      "present": "drinks",
      "past": "drank",
      "gerund": "drinking",
      "participle": "drunk"
    }, {
      "infinitive": "drive",
      "present": "drives",
      "past": "drove",
      "gerund": "driving",
      "participle": "driven"
    }, {
      "infinitive": "eat",
      "present": "eats",
      "past": "ate",
      "gerund": "eating",
      "participle": "eaten"
    }, {
      "infinitive": "fall",
      "present": "falls",
      "past": "fell",
      "gerund": "falling",
      "participle": "fallen"
    }, {
      "infinitive": "feed",
      "present": "feeds",
      "past": "fed",
      "gerund": "feeding",
      "participle": "fed"
    }, {
      "infinitive": "feel",
      "present": "feels",
      "past": "felt",
      "gerund": "feeling",
      "participle": "felt"
    }, {
      "infinitive": "fight",
      "present": "fights",
      "past": "fought",
      "gerund": "fighting",
      "participle": "fought"
    }, {
      "infinitive": "find",
      "present": "finds",
      "past": "found",
      "gerund": "finding",
      "participle": "found"
    }, {
      "infinitive": "fly",
      "present": "flys",
      "past": "flew",
      "gerund": "flying",
      "participle": "flown"
    }, {
      "infinitive": "forbid",
      "present": "forbids",
      "past": "forbade",
      "gerund": "forbiding",
      "participle": "forbidden"
    }, {
      "infinitive": "forget",
      "present": "forgets",
      "past": "forgot",
      "gerund": "forgeting",
      "participle": "forgotten"
    }, {
      "infinitive": "forgive",
      "present": "forgives",
      "past": "forgave",
      "gerund": "forgiving",
      "participle": "forgiven"
    }, {
      "infinitive": "freeze",
      "present": "freezes",
      "past": "froze",
      "gerund": "freezing",
      "participle": "frozen"
    }, {
      "infinitive": "get",
      "present": "gets",
      "past": "got",
      "gerund": "getting",
      "participle": "gotten"
    }, {
      "infinitive": "give",
      "present": "gives",
      "past": "gave",
      "gerund": "giving",
      "participle": "given"
    }, {
      "infinitive": "go",
      "present": "goes",
      "gerund": "going",
      "past": "went",
      "participle": "gone"
    }, {
      "infinitive": "grow",
      "present": "grows",
      "past": "grew",
      "gerund": "growing",
      "participle": "grown"
    }, {
      "infinitive": "hang",
      "present": "hangs",
      "past": "hung",
      "gerund": "hanging",
      "participle": "hung"
    }, {
      "infinitive": "have",
      "present": "haves",
      "past": "had",
      "gerund": "having",
      "participle": "had"
    }, {
      "infinitive": "hear",
      "present": "hears",
      "past": "heard",
      "gerund": "hearing",
      "participle": "heard"
    }, {
      "infinitive": "hide",
      "present": "hides",
      "past": "hid",
      "gerund": "hiding",
      "participle": "hidden"
    }, {
      "infinitive": "hit",
      "present": "hits",
      "past": "hit",
      "gerund": "hitting",
      "participle": "hit"
    }, {
      "infinitive": "hold",
      "present": "holds",
      "past": "held",
      "gerund": "holding",
      "participle": "held"
    }, {
      "infinitive": "hurt",
      "present": "hurts",
      "past": "hurt",
      "gerund": "hurting",
      "participle": "hurt"
    }, {
      "present": "keeps",
      "gerund": "keeping",
      "past": "kept",
      "infinitive": "keep",
      "participle": "kept"
    }, {
      "infinitive": "know",
      "present": "knows",
      "past": "knew",
      "gerund": "knowing",
      "participle": "known"
    }, {
      "infinitive": "lay",
      "present": "lays",
      "past": "laid",
      "gerund": "laying",
      "participle": "laid"
    }, {
      "infinitive": "lead",
      "present": "leads",
      "past": "led",
      "gerund": "leading",
      "participle": "led"
    }, {
      "infinitive": "leave",
      "present": "leaves",
      "past": "left",
      "gerund": "leaving",
      "participle": "left"
    }, {
      "present": "lends",
      "gerund": "lending",
      "past": "lent",
      "infinitive": "lend",
      "participle": "lent"
    }, {
      "infinitive": "let",
      "present": "lets",
      "past": "let",
      "gerund": "letting",
      "participle": "let"
    }, {
      "infinitive": "lie",
      "present": "lies",
      "past": "lay",
      "gerund": "lying",
      "participle": "lied"
    }, {
      "infinitive": "light",
      "present": "lights",
      "past": "lit",
      "gerund": "lighting",
      "participle": "lit"
    }, {
      "infinitive": "lose",
      "present": "loses",
      "past": "lost",
      "gerund": "losing",
      "participle": "lost"
    }, {
      "infinitive": "make",
      "present": "makes",
      "past": "made",
      "gerund": "making",
      "participle": "made"
    }, {
      "infinitive": "mean",
      "present": "means",
      "past": "meant",
      "gerund": "meaning",
      "participle": "meant"
    }, {
      "infinitive": "meet",
      "present": "meets",
      "past": "met",
      "gerund": "meeting",
      "participle": "met"
    }, {
      "infinitive": "pay",
      "present": "pays",
      "past": "paid",
      "gerund": "paying",
      "participle": "paid"
    }, {
      "infinitive": "put",
      "present": "puts",
      "past": "put",
      "gerund": "putting",
      "participle": "put"
    }, {
      "infinitive": "quit",
      "present": "quits",
      "past": "quit",
      "gerund": "quitting",
      "participle": "quit"
    }, {
      "infinitive": "read",
      "present": "reads",
      "past": "read",
      "gerund": "reading",
      "participle": "read"
    }, {
      "infinitive": "ride",
      "present": "rides",
      "past": "rode",
      "gerund": "riding",
      "participle": "ridden"
    }, {
      "infinitive": "ring",
      "present": "rings",
      "past": "rang",
      "gerund": "ringing",
      "participle": "rung"
    }, {
      "present": "rises",
      "gerund": "rising",
      "past": "rose",
      "infinitive": "rise",
      "participle": "risen"
    }, {
      "infinitive": "run",
      "present": "runs",
      "past": "ran",
      "gerund": "runing",
      "participle": "run"
    }, {
      "infinitive": "say",
      "present": "says",
      "past": "said",
      "gerund": "saying",
      "participle": "said"
    }, {
      "infinitive": "see",
      "present": "sees",
      "past": "saw",
      "gerund": "seing",
      "participle": "seen"
    }, {
      "infinitive": "sell",
      "present": "sells",
      "past": "sold",
      "gerund": "selling",
      "participle": "sold"
    }, {
      "present": "sends",
      "gerund": "sending",
      "past": "sent",
      "infinitive": "send",
      "participle": "sent"
    }, {
      "infinitive": "set",
      "present": "sets",
      "past": "set",
      "gerund": "setting",
      "participle": "set"
    }, {
      "infinitive": "shake",
      "present": "shakes",
      "past": "shook",
      "gerund": "shaking",
      "participle": "shaken"
    }, {
      "infinitive": "shine",
      "present": "shines",
      "past": "shone",
      "gerund": "shining",
      "participle": "shone"
    }, {
      "infinitive": "shoot",
      "present": "shoots",
      "past": "shot",
      "gerund": "shooting",
      "participle": "shot"
    }, {
      "infinitive": "show",
      "present": "shows",
      "past": "showed",
      "gerund": "showing",
      "participle": "shown"
    }, {
      "infinitive": "shut",
      "present": "shuts",
      "past": "shut",
      "gerund": "shutting",
      "participle": "shut"
    }, {
      "infinitive": "sing",
      "present": "sings",
      "past": "sang",
      "gerund": "singing",
      "participle": "sung"
    }, {
      "infinitive": "sink",
      "present": "sinks",
      "past": "sank",
      "gerund": "sinking",
      "participle": "sunk"
    }, {
      "infinitive": "sit",
      "present": "sits",
      "past": "sat",
      "gerund": "sitting",
      "participle": "sat"
    }, {
      "present": "sleeps",
      "gerund": "sleepping",
      "past": "slept",
      "infinitive": "sleep",
      "participle": "slept"
    }, {
      "infinitive": "slide",
      "present": "slides",
      "past": "slid",
      "gerund": "sliding",
      "participle": "slid"
    }, {
      "infinitive": "speak",
      "present": "speaks",
      "past": "spoke",
      "gerund": "speaking",
      "participle": "spoken"
    }, {
      "present": "spends",
      "gerund": "spending",
      "past": "spent",
      "infinitive": "spend",
      "participle": "spent"
    }, {
      "infinitive": "spin",
      "present": "spins",
      "past": "spun",
      "gerund": "spinning",
      "participle": "spun"
    }, {
      "infinitive": "spread",
      "present": "spreads",
      "past": "spread",
      "gerund": "spreading",
      "participle": "spread"
    }, {
      "infinitive": "stand",
      "present": "stands",
      "past": "stood",
      "gerund": "standing",
      "participle": "stood"
    }, {
      "infinitive": "steal",
      "present": "steals",
      "past": "stole",
      "gerund": "stealing",
      "participle": "stolen"
    }, {
      "infinitive": "stick",
      "present": "sticks",
      "past": "stuck",
      "gerund": "sticking",
      "participle": "stuck"
    }, {
      "infinitive": "sting",
      "present": "stings",
      "past": "stung",
      "gerund": "stinging",
      "participle": "stung"
    }, {
      "infinitive": "strike",
      "present": "strikes",
      "past": "struck",
      "gerund": "striking",
      "participle": "struck"
    }, {
      "infinitive": "swear",
      "present": "swears",
      "past": "swore",
      "gerund": "swearing",
      "participle": "sworn"
    }, {
      "present": "sweeps",
      "gerund": "sweeping",
      "past": "swept",
      "infinitive": "sweep",
      "participle": "swept"
    }, {
      "infinitive": "swim",
      "present": "swims",
      "past": "swam",
      "gerund": "swiming",
      "participle": "swum"
    }, {
      "infinitive": "swing",
      "present": "swings",
      "past": "swung",
      "gerund": "swinging",
      "participle": "swung"
    }, {
      "infinitive": "take",
      "present": "takes",
      "past": "took",
      "gerund": "taking",
      "participle": "taken"
    }, {
      "infinitive": "teach",
      "present": "teachs",
      "past": "taught",
      "gerund": "teaching",
      "participle": "taught"
    }, {
      "infinitive": "tear",
      "present": "tears",
      "past": "tore",
      "gerund": "tearing",
      "participle": "torn"
    }, {
      "infinitive": "tell",
      "present": "tells",
      "past": "told",
      "gerund": "telling",
      "participle": "told"
    }, {
      "infinitive": "think",
      "present": "thinks",
      "past": "thought",
      "gerund": "thinking",
      "participle": "thought"
    }, {
      "infinitive": "throw",
      "present": "throws",
      "past": "threw",
      "gerund": "throwing",
      "participle": "thrown"
    }, {
      "infinitive": "understand",
      "present": "understands",
      "past": "understood",
      "gerund": "understanding",
      "participle": "understood"
    }, {
      "infinitive": "wake",
      "present": "wakes",
      "past": "woke",
      "gerund": "waking",
      "participle": "woken"
    }, {
      "infinitive": "wear",
      "present": "wears",
      "past": "wore",
      "gerund": "wearing",
      "participle": "worn"
    }, {
      "present": "wins",
      "gerund": "winning",
      "past": "won",
      "infinitive": "win",
      "participle": "won"
    }, {
      "infinitive": "withdraw",
      "present": "withdraws",
      "past": "withdrew",
      "gerund": "withdrawing",
      "participle": "withdrawn"
    }, {
      "present": "writes",
      "gerund": "writing",
      "past": "wrote",
      "infinitive": "write",
      "participle": "written"
    }, {
      "infinitive": 'tie',
      "present": 'ties',
      "past": 'tied',
      "gerund": 'tying'
    }

  ]



  // console.log(verb_irregulars)
  // console.log(verb_rules)
  //fallback to this transformation if it has an unknown prefix
  var fallback = function(w) {
    // console.log('fallback')
    var infinitive = w;
    var present, past, gerund;
    if (w.match(/[^aeiou]$/)) {
      gerund = w + "ing"
      past = w + "ed"
      present = w + "s"
    } else {
      gerund = w.replace(/[aeiou]$/, 'ing')
      past = w.replace(/[aeiou]$/, 'ed')
      present = w.replace(/[aeiou]$/, 'es')
    }
    return {
      infinitive: infinitive,
      present: present,
      past: past,
      gerund: gerund
    }
  }



  var main = function(w) {
    if (!w) {
      return {}
    }

    //check irregulars
    for (var i = 0; i < verb_irregulars.length; i++) {
      var x = verb_irregulars[i];
      if (w == x.present || w == x.gerund || w == x.past || w == x.infinitive) {
        return verb_irregulars[i]
      }
    }

    //check against suffix rules
    var obj, r, _i, _len;
    for (_i = 0, _len = verb_rules.length; _i < _len; _i++) {
      r = verb_rules[_i];
      if (w.match(r.reg)) {
        obj = Object.keys(r.repl).reduce(function(h, k) {
          h[k] = w.replace(r.reg, r.repl[k]);
          return h;
        }, {});
        obj[r.tense] = w;
        return obj;
      }
    }

    //produce a generic transformation
    return fallback(w)
  };



  if (typeof module !== "undefined" && module.exports) {
    module.exports = main;
  }
  return main
})()

// console.log(verb_conjugate("swing"))
// console.log(verb_conjugate("walking"))
// console.log(verb_conjugate("win"))
// console.log(verb_conjugate("write"))
// console.log(verb_conjugate("stop"))
// console.log(verb_conjugate("carry"))
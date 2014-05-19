verb_conjugate = (function() {
  if (typeof module !== "undefined" && module.exports) {
    verb_to_doer = require("./to_doer")
  }

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
    "participle": "arisen",
    "noun": "ariser"
  }, {
    "infinitive": "babysit",
    "present": "babysits",
    "past": "babysat",
    "gerund": "babysitting",
    "participle": "babysat",
    "noun": "babysitter"
  }, {
    "infinitive": "be",
    "present": "is",
    "gerund": "being",
    "past": "were",
    "participle": "been",
    "noun": "ber"
  }, {
    "infinitive": "be",
    "present": "is",
    "gerund": "being",
    "past": "were",
    "participle": "been",
    "noun": null
  }, {
    "infinitive": "beat",
    "present": "beats",
    "past": "beat",
    "gerund": "beating",
    "participle": "beaten",
    "noun": "beater"
  }, {
    "present": "becomes",
    "gerund": "becoming",
    "past": "became",
    "infinitive": "become",
    "participle": "become",
    "noun": "becomer"
  }, {
    "present": "bends",
    "gerund": "bending",
    "past": "bent",
    "infinitive": "bend",
    "participle": "bent",
    "noun": "bender"
  }, {
    "infinitive": "begin",
    "present": "begins",
    "past": "began",
    "gerund": "begining",
    "participle": "begun",
    "noun": "beginner"
  }, {
    "infinitive": "bet",
    "present": "bets",
    "past": "bet",
    "gerund": "betting",
    "participle": "bet",
    "noun": "better"
  }, {
    "infinitive": "bind",
    "present": "binds",
    "past": "bound",
    "gerund": "binding",
    "participle": "bound",
    "noun": "binder"
  }, {
    "present": "bites",
    "gerund": "biting",
    "past": "bit",
    "infinitive": "bite",
    "participle": "bitten",
    "noun": "biter"
  }, {
    "infinitive": "bleed",
    "present": "bleeds",
    "past": "bled",
    "gerund": "bleeding",
    "participle": "bled",
    "noun": "bleeder"
  }, {
    "infinitive": "blow",
    "present": "blows",
    "past": "blew",
    "gerund": "blowing",
    "participle": "blown",
    "noun": "blower"
  }, {
    "infinitive": "break",
    "present": "breaks",
    "past": "broke",
    "gerund": "breaking",
    "participle": "broken",
    "noun": "breaker"
  }, {
    "infinitive": "breed",
    "present": "breeds",
    "past": "bred",
    "gerund": "breeding",
    "participle": "bred",
    "noun": "breeder"
  }, {
    "infinitive": "bring",
    "present": "brings",
    "past": "brought",
    "gerund": "bringing",
    "participle": "brought",
    "noun": "bringer"
  }, {
    "infinitive": "broadcast",
    "present": "broadcasts",
    "past": "broadcast",
    "gerund": "broadcasting",
    "participle": "broadcast",
    "noun": "broadcaster"
  }, {
    "infinitive": "build",
    "present": "builds",
    "past": "built",
    "gerund": "building",
    "participle": "built",
    "noun": "builder"
  }, {
    "infinitive": "buy",
    "present": "buys",
    "past": "bought",
    "gerund": "buying",
    "participle": "bought",
    "noun": "buyer"
  }, {
    "present": "catches",
    "gerund": "catching",
    "past": "caught",
    "infinitive": "catch",
    "participle": "caught",
    "noun": "catcher"
  }, {
    "infinitive": "choose",
    "present": "chooses",
    "past": "chose",
    "gerund": "choosing",
    "participle": "chosen",
    "noun": "chooser"
  }, {
    "present": "comes",
    "gerund": "coming",
    "past": "came",
    "infinitive": "come",
    "participle": "come",
    "noun": "comer"
  }, {
    "infinitive": "cost",
    "present": "costs",
    "past": "cost",
    "gerund": "costing",
    "participle": "cost",
    "noun": "coster"
  }, {
    "infinitive": "cut",
    "present": "cuts",
    "past": "cut",
    "gerund": "cutting",
    "participle": "cut",
    "noun": "cutter"
  }, {
    "infinitive": "deal",
    "present": "deals",
    "past": "dealt",
    "gerund": "dealing",
    "participle": "dealt",
    "noun": "dealer"
  }, {
    "infinitive": "dig",
    "present": "digs",
    "past": "dug",
    "gerund": "digging",
    "participle": "dug",
    "noun": "digger"
  }, {
    "infinitive": "do",
    "present": "does",
    "past": "did",
    "gerund": "doing",
    "participle": "done",
    "noun": "doer"
  }, {
    "infinitive": "draw",
    "present": "draws",
    "past": "drew",
    "gerund": "drawing",
    "participle": "drawn",
    "noun": "drawer"
  }, {
    "infinitive": "drink",
    "present": "drinks",
    "past": "drank",
    "gerund": "drinking",
    "participle": "drunk",
    "noun": "drinker"
  }, {
    "infinitive": "drive",
    "present": "drives",
    "past": "drove",
    "gerund": "driving",
    "participle": "driven",
    "noun": "driver"
  }, {
    "infinitive": "eat",
    "present": "eats",
    "past": "ate",
    "gerund": "eating",
    "participle": "eaten",
    "noun": "eater"
  }, {
    "infinitive": "fall",
    "present": "falls",
    "past": "fell",
    "gerund": "falling",
    "participle": "fallen",
    "noun": "faller"
  }, {
    "infinitive": "feed",
    "present": "feeds",
    "past": "fed",
    "gerund": "feeding",
    "participle": "fed",
    "noun": "feeder"
  }, {
    "infinitive": "feel",
    "present": "feels",
    "past": "felt",
    "gerund": "feeling",
    "participle": "felt",
    "noun": "feeller"
  }, {
    "infinitive": "fight",
    "present": "fights",
    "past": "fought",
    "gerund": "fighting",
    "participle": "fought",
    "noun": "fighter"
  }, {
    "infinitive": "find",
    "present": "finds",
    "past": "found",
    "gerund": "finding",
    "participle": "found",
    "noun": "finder"
  }, {
    "infinitive": "fly",
    "present": "flys",
    "past": "flew",
    "gerund": "flying",
    "participle": "flown",
    "noun": "flier"
  }, {
    "infinitive": "forbid",
    "present": "forbids",
    "past": "forbade",
    "gerund": "forbiding",
    "participle": "forbidden",
    "noun": null
  }, {
    "infinitive": "forget",
    "present": "forgets",
    "past": "forgot",
    "gerund": "forgeting",
    "participle": "forgotten",
    "noun": "forgeter"
  }, {
    "infinitive": "forgive",
    "present": "forgives",
    "past": "forgave",
    "gerund": "forgiving",
    "participle": "forgiven",
    "noun": "forgiver"
  }, {
    "infinitive": "freeze",
    "present": "freezes",
    "past": "froze",
    "gerund": "freezing",
    "participle": "frozen",
    "noun": "freezer"
  }, {
    "infinitive": "get",
    "present": "gets",
    "past": "got",
    "gerund": "getting",
    "participle": "gotten",
    "noun": "getter"
  }, {
    "infinitive": "give",
    "present": "gives",
    "past": "gave",
    "gerund": "giving",
    "participle": "given",
    "noun": "giver"
  }, {
    "infinitive": "go",
    "present": "goes",
    "gerund": "going",
    "past": "went",
    "participle": "gone",
    "noun": "goer"
  }, {
    "infinitive": "grow",
    "present": "grows",
    "past": "grew",
    "gerund": "growing",
    "participle": "grown",
    "noun": "grower"
  }, {
    "infinitive": "hang",
    "present": "hangs",
    "past": "hung",
    "gerund": "hanging",
    "participle": "hung",
    "noun": "hanger"
  }, {
    "infinitive": "have",
    "present": "haves",
    "past": "had",
    "gerund": "having",
    "participle": "had",
    "noun": "haver"
  }, {
    "infinitive": "hear",
    "present": "hears",
    "past": "heard",
    "gerund": "hearing",
    "participle": "heard",
    "noun": "hearer"
  }, {
    "infinitive": "hide",
    "present": "hides",
    "past": "hid",
    "gerund": "hiding",
    "participle": "hidden",
    "noun": "hider"
  }, {
    "infinitive": "hit",
    "present": "hits",
    "past": "hit",
    "gerund": "hitting",
    "participle": "hit",
    "noun": "hitter"
  }, {
    "infinitive": "hold",
    "present": "holds",
    "past": "held",
    "gerund": "holding",
    "participle": "held",
    "noun": "holder"
  }, {
    "infinitive": "hurt",
    "present": "hurts",
    "past": "hurt",
    "gerund": "hurting",
    "participle": "hurt",
    "noun": "hurter"
  }, {
    "present": "keeps",
    "gerund": "keeping",
    "past": "kept",
    "infinitive": "keep",
    "participle": "kept",
    "noun": "keepper"
  }, {
    "infinitive": "know",
    "present": "knows",
    "past": "knew",
    "gerund": "knowing",
    "participle": "known",
    "noun": "knower"
  }, {
    "infinitive": "lay",
    "present": "lays",
    "past": "laid",
    "gerund": "laying",
    "participle": "laid",
    "noun": "layer"
  }, {
    "infinitive": "lead",
    "present": "leads",
    "past": "led",
    "gerund": "leading",
    "participle": "led",
    "noun": "leader"
  }, {
    "infinitive": "leave",
    "present": "leaves",
    "past": "left",
    "gerund": "leaving",
    "participle": "left",
    "noun": "leaver"
  }, {
    "present": "lends",
    "gerund": "lending",
    "past": "lent",
    "infinitive": "lend",
    "participle": "lent",
    "noun": "lender"
  }, {
    "infinitive": "let",
    "present": "lets",
    "past": "let",
    "gerund": "letting",
    "participle": "let",
    "noun": "letter"
  }, {
    "infinitive": "lie",
    "present": "lies",
    "past": "lay",
    "gerund": "lying",
    "participle": "lied",
    "noun": "lier"
  }, {
    "infinitive": "light",
    "present": "lights",
    "past": "lit",
    "gerund": "lighting",
    "participle": "lit",
    "noun": "lighter"
  }, {
    "infinitive": "lose",
    "present": "loses",
    "past": "lost",
    "gerund": "losing",
    "participle": "lost",
    "noun": "loser"
  }, {
    "infinitive": "make",
    "present": "makes",
    "past": "made",
    "gerund": "making",
    "participle": "made",
    "noun": "maker"
  }, {
    "infinitive": "mean",
    "present": "means",
    "past": "meant",
    "gerund": "meaning",
    "participle": "meant",
    "noun": "meaner"
  }, {
    "infinitive": "meet",
    "present": "meets",
    "past": "met",
    "gerund": "meeting",
    "participle": "met",
    "noun": "meeter"
  }, {
    "infinitive": "pay",
    "present": "pays",
    "past": "paid",
    "gerund": "paying",
    "participle": "paid",
    "noun": "payer"
  }, {
    "infinitive": "put",
    "present": "puts",
    "past": "put",
    "gerund": "putting",
    "participle": "put",
    "noun": "putter"
  }, {
    "infinitive": "quit",
    "present": "quits",
    "past": "quit",
    "gerund": "quitting",
    "participle": "quit",
    "noun": "quitter"
  }, {
    "infinitive": "read",
    "present": "reads",
    "past": "read",
    "gerund": "reading",
    "participle": "read",
    "noun": "reader"
  }, {
    "infinitive": "ride",
    "present": "rides",
    "past": "rode",
    "gerund": "riding",
    "participle": "ridden",
    "noun": "rider"
  }, {
    "infinitive": "ring",
    "present": "rings",
    "past": "rang",
    "gerund": "ringing",
    "participle": "rung",
    "noun": "ringer"
  }, {
    "present": "rises",
    "gerund": "rising",
    "past": "rose",
    "infinitive": "rise",
    "participle": "risen",
    "noun": "riser"
  }, {
    "infinitive": "run",
    "present": "runs",
    "past": "ran",
    "gerund": "runing",
    "participle": "run",
    "noun": "runner"
  }, {
    "infinitive": "say",
    "present": "says",
    "past": "said",
    "gerund": "saying",
    "participle": "said",
    "noun": null
  }, {
    "infinitive": "see",
    "present": "sees",
    "past": "saw",
    "gerund": "seing",
    "participle": "seen",
    "noun": "seer"
  }, {
    "infinitive": "sell",
    "present": "sells",
    "past": "sold",
    "gerund": "selling",
    "participle": "sold",
    "noun": "seller"
  }, {
    "present": "sends",
    "gerund": "sending",
    "past": "sent",
    "infinitive": "send",
    "participle": "sent",
    "noun": "sender"
  }, {
    "infinitive": "set",
    "present": "sets",
    "past": "set",
    "gerund": "setting",
    "participle": "set",
    "noun": "setter"
  }, {
    "infinitive": "shake",
    "present": "shakes",
    "past": "shook",
    "gerund": "shaking",
    "participle": "shaken",
    "noun": "shaker"
  }, {
    "infinitive": "shine",
    "present": "shines",
    "past": "shone",
    "gerund": "shining",
    "participle": "shone",
    "noun": "shiner"
  }, {
    "infinitive": "shoot",
    "present": "shoots",
    "past": "shot",
    "gerund": "shooting",
    "participle": "shot",
    "noun": "shooter"
  }, {
    "infinitive": "show",
    "present": "shows",
    "past": "showed",
    "gerund": "showing",
    "participle": "shown",
    "noun": "shower"
  }, {
    "infinitive": "shut",
    "present": "shuts",
    "past": "shut",
    "gerund": "shutting",
    "participle": "shut",
    "noun": "shutter"
  }, {
    "infinitive": "sing",
    "present": "sings",
    "past": "sang",
    "gerund": "singing",
    "participle": "sung",
    "noun": "singer"
  }, {
    "infinitive": "sink",
    "present": "sinks",
    "past": "sank",
    "gerund": "sinking",
    "participle": "sunk",
    "noun": "sinker"
  }, {
    "infinitive": "sit",
    "present": "sits",
    "past": "sat",
    "gerund": "sitting",
    "participle": "sat",
    "noun": "sitter"
  }, {
    "present": "sleeps",
    "gerund": "sleepping",
    "past": "slept",
    "infinitive": "sleep",
    "participle": "slept",
    "noun": "sleepper"
  }, {
    "infinitive": "slide",
    "present": "slides",
    "past": "slid",
    "gerund": "sliding",
    "participle": "slid",
    "noun": "slider"
  }, {
    "infinitive": "speak",
    "present": "speaks",
    "past": "spoke",
    "gerund": "speaking",
    "participle": "spoken",
    "noun": "speaker"
  }, {
    "present": "spends",
    "gerund": "spending",
    "past": "spent",
    "infinitive": "spend",
    "participle": "spent",
    "noun": "spender"
  }, {
    "infinitive": "spin",
    "present": "spins",
    "past": "spun",
    "gerund": "spinning",
    "participle": "spun",
    "noun": "spinner"
  }, {
    "infinitive": "spread",
    "present": "spreads",
    "past": "spread",
    "gerund": "spreading",
    "participle": "spread",
    "noun": "spreader"
  }, {
    "infinitive": "stand",
    "present": "stands",
    "past": "stood",
    "gerund": "standing",
    "participle": "stood",
    "noun": "stander"
  }, {
    "infinitive": "steal",
    "present": "steals",
    "past": "stole",
    "gerund": "stealing",
    "participle": "stolen",
    "noun": "stealer"
  }, {
    "infinitive": "stick",
    "present": "sticks",
    "past": "stuck",
    "gerund": "sticking",
    "participle": "stuck",
    "noun": "sticker"
  }, {
    "infinitive": "sting",
    "present": "stings",
    "past": "stung",
    "gerund": "stinging",
    "participle": "stung",
    "noun": "stinger"
  }, {
    "infinitive": "strike",
    "present": "strikes",
    "past": "struck",
    "gerund": "striking",
    "participle": "struck",
    "noun": "striker"
  }, {
    "infinitive": "swear",
    "present": "swears",
    "past": "swore",
    "gerund": "swearing",
    "participle": "sworn",
    "noun": "swearer"
  }, {
    "present": "sweeps",
    "gerund": "sweeping",
    "past": "swept",
    "infinitive": "sweep",
    "participle": "swept",
    "noun": "sweepper"
  }, {
    "infinitive": "swim",
    "present": "swims",
    "past": "swam",
    "gerund": "swiming",
    "participle": "swum",
    "noun": "swimmer"
  }, {
    "infinitive": "swing",
    "present": "swings",
    "past": "swung",
    "gerund": "swinging",
    "participle": "swung",
    "noun": "swinger"
  }, {
    "infinitive": "take",
    "present": "takes",
    "past": "took",
    "gerund": "taking",
    "participle": "taken",
    "noun": "taker"
  }, {
    "infinitive": "teach",
    "present": "teachs",
    "past": "taught",
    "gerund": "teaching",
    "participle": "taught",
    "noun": "teacher"
  }, {
    "infinitive": "tear",
    "present": "tears",
    "past": "tore",
    "gerund": "tearing",
    "participle": "torn",
    "noun": "tearer"
  }, {
    "infinitive": "tell",
    "present": "tells",
    "past": "told",
    "gerund": "telling",
    "participle": "told",
    "noun": "teller"
  }, {
    "infinitive": "think",
    "present": "thinks",
    "past": "thought",
    "gerund": "thinking",
    "participle": "thought",
    "noun": "thinker"
  }, {
    "infinitive": "throw",
    "present": "throws",
    "past": "threw",
    "gerund": "throwing",
    "participle": "thrown",
    "noun": "thrower"
  }, {
    "infinitive": "understand",
    "present": "understands",
    "past": "understood",
    "gerund": "understanding",
    "participle": "understood",
    "noun": null
  }, {
    "infinitive": "wake",
    "present": "wakes",
    "past": "woke",
    "gerund": "waking",
    "participle": "woken",
    "noun": "waker"
  }, {
    "infinitive": "wear",
    "present": "wears",
    "past": "wore",
    "gerund": "wearing",
    "participle": "worn",
    "noun": "wearer"
  }, {
    "present": "wins",
    "gerund": "winning",
    "past": "won",
    "infinitive": "win",
    "participle": "won",
    "noun": "winner"
  }, {
    "infinitive": "withdraw",
    "present": "withdraws",
    "past": "withdrew",
    "gerund": "withdrawing",
    "participle": "withdrawn",
    "noun": "withdrawer"
  }, {
    "present": "writes",
    "gerund": "writing",
    "past": "wrote",
    "infinitive": "write",
    "participle": "written",
    "noun": "writer"
  }, {
    "infinitive": "tie",
    "present": "ties",
    "past": "tied",
    "gerund": "tying",
    "noun": "tier"
  }]

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
      doer = verb_to_doer(infinitive)
    } else {
      gerund = w.replace(/[aeiou]$/, 'ing')
      past = w.replace(/[aeiou]$/, 'ed')
      present = w.replace(/[aeiou]$/, 'es')
      doer = verb_to_doer(infinitive)
    }
    return {
      infinitive: infinitive,
      present: present,
      past: past,
      gerund: gerund,
      doer: doer,
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
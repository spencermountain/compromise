// regex rules for each part of speech that convert it to all other parts of speech.
// used in combination with the generic 'fallback' method
var verb_rules = {
  "infinitive": [
    {
      "reg": /(eed)$/i,
      "repl": {
        "present": "$1s",
        "gerund": "$1ing",
        "past": "$1ed",
        "doer": "$1er"
      }
    },
    {
      "reg": /(e)(ep)$/i,
      "repl": {
        "present": "$1$2s",
        "gerund": "$1$2ing",
        "past": "$1pt",
        "doer": "$1$2er"
      }
    },
    {
      "reg": /(a[tg]|i[zn]|ur|nc|gl|is)e$/i,
      "repl": {
        "present": "$1es",
        "gerund": "$1ing",
        "past": "$1ed"
      },
      "exceptions": [
        "ate",
        "overate"
      ]
    },
    {
      "reg": /([i|f|rr])y$/i,
      "repl": {
        "present": "$1ies",
        "gerund": "$1ying",
        "past": "$1ied"
      }
    },
    {
      "reg": /([td]er)$/i,
      "repl": {
        "present": "$1s",
        "gerund": "$1ing",
        "past": "$1ed"
      }
    },
    {
      "reg": /([bd]l)e$/i,
      "repl": {
        "present": "$1es",
        "gerund": "$1ing",
        "past": "$1ed"
      }
    },
    {
      "reg": /(ish|tch|ess)$/i,
      "repl": {
        "present": "$1es",
        "gerund": "$1ing",
        "past": "$1ed"
      }
    },
    {
      "reg": /(ion|end|e[nc]t)$/i,
      "repl": {
        "present": "$1s",
        "gerund": "$1ing",
        "past": "$1ed"
      },
      "exceptions": [
        "sent",
        "bent",
        "overspent",
        "misspent",
        "went",
        "kent",
        "outwent",
        "forwent",
        "spent",
        "pent",
        "lent",
        "underwent",
        "rent",
        "unbent",
        "shent"
      ]
    },
    {
      "reg": /(om)e$/i,
      "repl": {
        "present": "$1es",
        "gerund": "$1ing",
        "past": "ame"
      }
    },
    {
      "reg": /([aeiu])([pt])$/i,
      "repl": {
        "present": "$1$2s",
        "gerund": "$1$2$2ing",
        "past": "$1$2"
      }
    },
    {
      "reg": /(er)$/i,
      "repl": {
        "present": "$1s",
        "gerund": "$1ing",
        "past": "$1ed"
      }
    },
    {
      "reg": /(en)$/i,
      "repl": {
        "present": "$1s",
        "gerund": "$1ing",
        "past": "$1ed"
      }
    }
  ],
  "present": [
    {
      "reg": /(ies)$/i,
      "repl": {
        "infinitive": "y",
        "gerund": "ying",
        "past": "ied"
      }
    },
    {
      "reg": /(tch|sh)es$/i,
      "repl": {
        "infinitive": "$1",
        "gerund": "$1ing",
        "past": "$1ed"
      }
    },
    {
      "reg": /(ss)es$/i,
      "repl": {
        "infinitive": "$1",
        "gerund": "$1ing",
        "past": "$1ed"
      }
    },
    {
      "reg": /([tzlshicgrvdnkmu])es$/i,
      "repl": {
        "infinitive": "$1e",
        "gerund": "$1ing",
        "past": "$1ed"
      }
    },
    {
      "reg": /(n[dtk]|c[kt]|[eo]n|i[nl]|er|a[ytrl])s$/i,
      "repl": {
        "infinitive": "$1",
        "gerund": "$1ing",
        "past": "$1ed"
      }
    },
    {
      "reg": /(ow)s$/i,
      "repl": {
        "infinitive": "$1",
        "gerund": "$1ing",
        "past": "ew"
      }
    },
    {
      "reg": /(op)s$/i,
      "repl": {
        "infinitive": "$1",
        "gerund": "$1ping",
        "past": "$1ped"
      }
    },
    {
      "reg": /([eirs])ts$/i,
      "repl": {
        "infinitive": "$1t",
        "gerund": "$1tting",
        "past": "$1tted"
      }
    },
    {
      "reg": /(ll)s$/i,
      "repl": {
        "infinitive": "$1",
        "gerund": "$1ing",
        "past": "$1ed"
      }
    },
    {
      "reg": /(el)s$/i,
      "repl": {
        "infinitive": "$1",
        "gerund": "$1ling",
        "past": "$1led"
      }
    },
    {
      "reg": /(ip)es$/i,
      "repl": {
        "infinitive": "$1e",
        "gerund": "$1ing",
        "past": "$1ed"
      }
    },
    {
      "reg": /ss$/i,
      "repl": {
        "infinitive": "ss",
        "gerund": "ssing",
        "past": "ssed"
      }
    },
    {
      "reg": /s$/i,
      "repl": {
        "infinitive": "",
        "gerund": "ing",
        "past": "ed"
      }
    }
  ],
  "gerund": [
    {
      "reg": /pping$/i,
      "repl": {
        "infinitive": "p",
        "present": "ps",
        "past": "pped"
      }
    },
    {
      "reg": /lling$/i,
      "repl": {
        "infinitive": "ll",
        "present": "lls",
        "past": "lled"
      }
    },
    {
      "reg": /tting$/i,
      "repl": {
        "infinitive": "t",
        "present": "ts",
        "past": "t"
      }
    },
    {
      "reg": /ssing$/i,
      "repl": {
        "infinitive": "ss",
        "present": "sses",
        "past": "ssed"
      }
    },
    {
      "reg": /gging$/i,
      "repl": {
        "infinitive": "g",
        "present": "gs",
        "past": "gged"
      }
    },
    {
      "reg": /([^aeiou])ying$/i,
      "repl": {
        "infinitive": "$1y",
        "present": "$1ies",
        "past": "$1ied",
        "doer": "$1ier"
      }
    },
    {
      "reg": /(i.)ing$/i,
      "repl": {
        "infinitive": "$1e",
        "present": "$1es",
        "past": "$1ed"
      }
    },
    {
      "reg": /(u[rtcb]|[bdtpkg]l|n[cg]|a[gdkvtc]|[ua]s|[dr]g|yz|o[rlsp]|cre)ing$/i,
      "repl": {
        "infinitive": "$1e",
        "present": "$1es",
        "past": "$1ed"
      }
    },
    {
      "reg": /(ch|sh)ing$/i,
      "repl": {
        "infinitive": "$1",
        "present": "$1es",
        "past": "$1ed"
      }
    },
    {
      "reg": /(..)ing$/i,
      "repl": {
        "infinitive": "$1",
        "present": "$1s",
        "past": "$1ed"
      }
    }
  ],
  "past": [
    {
      "reg": /(ued)$/i,
      "repl": {
        "present": "ues",
        "gerund": "uing",
        "past": "ued",
        "doer": "uer"
      }
    },
    {
      "reg": /(e|i)lled$/i,
      "repl": {
        "present": "$1lls",
        "gerund": "$1lling",
        "past": "$1lled",
        "doer": "$1ller"
      }
    },
    {
      "reg": /(sh|ch)ed$/i,
      "repl": {
        "infinitive": "$1",
        "present": "$1es",
        "doer": "$1er",
        "gerund": "$1ing"
      }
    },
    {
      "reg": /(tl|gl)ed$/i,
      "repl": {
        "infinitive": "$1e",
        "present": "$1es",
        "doer": "$1er",
        "gerund": "$1ing"
      }
    },
    {
      "reg": /(ss)ed$/i,
      "repl": {
        "infinitive": "$1",
        "present": "$1es",
        "doer": "$1er",
        "gerund": "$1ing"
      }
    },
    {
      "reg": /pped$/i,
      "repl": {
        "infinitive": "p",
        "present": "ps",
        "doer": "pper",
        "gerund": "pping"
      }
    },
    {
      "reg": /tted$/i,
      "repl": {
        "infinitive": "t",
        "present": "ts",
        "doer": "tter",
        "gerund": "tting"
      }
    },
    {
      "reg": /gged$/i,
      "repl": {
        "infinitive": "g",
        "present": "gs",
        "doer": "gger",
        "gerund": "gging"
      }
    },
    {
      "reg": /(h|ion|n[dt]|ai.|[cs]t|pp|all|ss|tt|int|ail|ld|en|oo.|er|k|pp|w|ou.|rt|ght|rm)ed$/i,
      "repl": {
        "infinitive": "$1",
        "present": "$1s",
        "doer": "$1er",
        "gerund": "$1ing"
      }
    },
    {
      "reg": /(..[^aeiou])ed$/i,
      "repl": {
        "infinitive": "$1e",
        "present": "$1es",
        "doer": "$1er",
        "gerund": "$1ing"
      }
    },
    {
      "reg": /ied$/i,
      "repl": {
        "infinitive": "y",
        "present": "ies",
        "doer": "ier",
        "gerund": "ying"
      }
    },
    {
      "reg": /(.o)ed$/i,
      "repl": {
        "infinitive": "$1o",
        "present": "$1os",
        "doer": "$1oer",
        "gerund": "$1oing"
      }
    },
    {
      "reg": /(.i)ed$/i,
      "repl": {
        "infinitive": "$1",
        "present": "$1s",
        "doer": "$1er",
        "gerund": "$1ing"
      }
    },
    {
      "reg": /([rl])ew$/i,
      "repl": {
        "infinitive": "$1ow",
        "present": "$1ows",
        "gerund": "$1owing"
      },
      "exceptions": [
        "brew",
        "drew",
        "withdrew",
        "crew",
        "screw",
        "unscrew"
      ]
    },
    {
      "reg": /([pl])t$/i,
      "repl": {
        "infinitive": "$1t",
        "present": "$1ts",
        "gerund": "$1ting"
      }
    }
  ]
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = verb_rules;
}

// regex rules for each part of speech that convert it to all other parts of speech.
// used in combination with the generic 'fallback' method
var verb_rules = {
  "infinitive": [
    [
      "(eed)$",
      {
        "pr": "$1s",
        "g": "$1ing",
        "pa": "$1ed",
        "do": "$1er"
      }
    ],
    [
      "(e)(ep)$",
      {
        "pr": "$1$2s",
        "g": "$1$2ing",
        "pa": "$1pt",
        "do": "$1$2er"
      }
    ],
    [
      "(a[tg]|i[zn]|ur|nc|gl|is)e$",
      {
        "pr": "$1es",
        "g": "$1ing",
        "pa": "$1ed"
      }
    ],
    [
      "([i|f|rr])y$",
      {
        "pr": "$1ies",
        "g": "$1ying",
        "pa": "$1ied"
      }
    ],
    [
      "([td]er)$",
      {
        "pr": "$1s",
        "g": "$1ing",
        "pa": "$1ed"
      }
    ],
    [
      "([bd]l)e$",
      {
        "pr": "$1es",
        "g": "$1ing",
        "pa": "$1ed"
      }
    ],
    [
      "(ish|tch|ess)$",
      {
        "pr": "$1es",
        "g": "$1ing",
        "pa": "$1ed"
      }
    ],
    [
      "(ion|end|e[nc]t)$",
      {
        "pr": "$1s",
        "g": "$1ing",
        "pa": "$1ed"
      }
    ],
    [
      "(om)e$",
      {
        "pr": "$1es",
        "g": "$1ing",
        "pa": "ame"
      }
    ],
    [
      "([aeiu])([pt])$",
      {
        "pr": "$1$2s",
        "g": "$1$2$2ing",
        "pa": "$1$2"
      }
    ],
    [
      "(er)$",
      {
        "pr": "$1s",
        "g": "$1ing",
        "pa": "$1ed"
      }
    ],
    [
      "(en)$",
      {
        "pr": "$1s",
        "g": "$1ing",
        "pa": "$1ed"
      }
    ]
  ],
  "present": [
    [
      "(ies)$",
      {
        "in": "y",
        "g": "ying",
        "pa": "ied"
      }
    ],
    [
      "(tch|sh)es$",
      {
        "in": "$1",
        "g": "$1ing",
        "pa": "$1ed"
      }
    ],
    [
      "(ss)es$",
      {
        "in": "$1",
        "g": "$1ing",
        "pa": "$1ed"
      }
    ],
    [
      "([tzlshicgrvdnkmu])es$",
      {
        "in": "$1e",
        "g": "$1ing",
        "pa": "$1ed"
      }
    ],
    [
      "(n[dtk]|c[kt]|[eo]n|i[nl]|er|a[ytrl])s$",
      {
        "in": "$1",
        "g": "$1ing",
        "pa": "$1ed"
      }
    ],
    [
      "(ow)s$",
      {
        "in": "$1",
        "g": "$1ing",
        "pa": "ew"
      }
    ],
    [
      "(op)s$",
      {
        "in": "$1",
        "g": "$1ping",
        "pa": "$1ped"
      }
    ],
    [
      "([eirs])ts$",
      {
        "in": "$1t",
        "g": "$1tting",
        "pa": "$1tted"
      }
    ],
    [
      "(ll)s$",
      {
        "in": "$1",
        "g": "$1ing",
        "pa": "$1ed"
      }
    ],
    [
      "(el)s$",
      {
        "in": "$1",
        "g": "$1ling",
        "pa": "$1led"
      }
    ],
    [
      "(ip)es$",
      {
        "in": "$1e",
        "g": "$1ing",
        "pa": "$1ed"
      }
    ],
    [
      "ss$",
      {
        "in": "ss",
        "g": "ssing",
        "pa": "ssed"
      }
    ],
    [
      "s$",
      {
        "in": "",
        "g": "ing",
        "pa": "ed"
      }
    ]
  ],
  "gerund": [
    [
      "pping$",
      {
        "in": "p",
        "pr": "ps",
        "pa": "pped"
      }
    ],
    [
      "lling$",
      {
        "in": "ll",
        "pr": "lls",
        "pa": "lled"
      }
    ],
    [
      "tting$",
      {
        "in": "t",
        "pr": "ts",
        "pa": "t"
      }
    ],
    [
      "ssing$",
      {
        "in": "ss",
        "pr": "sses",
        "pa": "ssed"
      }
    ],
    [
      "gging$",
      {
        "in": "g",
        "pr": "gs",
        "pa": "gged"
      }
    ],
    [
      "([^aeiou])ying$",
      {
        "in": "$1y",
        "pr": "$1ies",
        "pa": "$1ied",
        "do": "$1ier"
      }
    ],
    [
      "(i.)ing$",
      {
        "in": "$1e",
        "pr": "$1es",
        "pa": "$1ed"
      }
    ],
    [
      "(u[rtcb]|[bdtpkg]l|n[cg]|a[gdkvtc]|[ua]s|[dr]g|yz|o[rlsp]|cre)ing$",
      {
        "in": "$1e",
        "pr": "$1es",
        "pa": "$1ed"
      }
    ],
    [
      "(ch|sh)ing$",
      {
        "in": "$1",
        "pr": "$1es",
        "pa": "$1ed"
      }
    ],
    [
      "(..)ing$",
      {
        "in": "$1",
        "pr": "$1s",
        "pa": "$1ed"
      }
    ]
  ],
  "past": [
    [
      "(ued)$",
      {
        "pr": "ues",
        "g": "uing",
        "pa": "ued",
        "do": "uer"
      }
    ],
    [
      "(e|i)lled$",
      {
        "pr": "$1lls",
        "g": "$1lling",
        "pa": "$1lled",
        "do": "$1ller"
      }
    ],
    [
      "(sh|ch)ed$",
      {
        "in": "$1",
        "pr": "$1es",
        "g": "$1ing",
        "do": "$1er"
      }
    ],
    [
      "(tl|gl)ed$",
      {
        "in": "$1e",
        "pr": "$1es",
        "g": "$1ing",
        "do": "$1er"
      }
    ],
    [
      "(ss)ed$",
      {
        "in": "$1",
        "pr": "$1es",
        "g": "$1ing",
        "do": "$1er"
      }
    ],
    [
      "pped$",
      {
        "in": "p",
        "pr": "ps",
        "g": "pping",
        "do": "pper"
      }
    ],
    [
      "tted$",
      {
        "in": "t",
        "pr": "ts",
        "g": "tting",
        "do": "tter"
      }
    ],
    [
      "gged$",
      {
        "in": "g",
        "pr": "gs",
        "g": "gging",
        "do": "gger"
      }
    ],
    [
      "(h|ion|n[dt]|ai.|[cs]t|pp|all|ss|tt|int|ail|ld|en|oo.|er|k|pp|w|ou.|rt|ght|rm)ed$",
      {
        "in": "$1",
        "pr": "$1s",
        "g": "$1ing",
        "do": "$1er"
      }
    ],
    [
      "(..[^aeiou])ed$",
      {
        "in": "$1e",
        "pr": "$1es",
        "g": "$1ing",
        "do": "$1er"
      }
    ],
    [
      "ied$",
      {
        "in": "y",
        "pr": "ies",
        "g": "ying",
        "do": "ier"
      }
    ],
    [
      "(.o)ed$",
      {
        "in": "$1o",
        "pr": "$1os",
        "g": "$1oing",
        "do": "$1oer"
      }
    ],
    [
      "(.i)ed$",
      {
        "in": "$1",
        "pr": "$1s",
        "g": "$1ing",
        "do": "$1er"
      }
    ],
    [
      "([rl])ew$",
      {
        "in": "$1ow",
        "pr": "$1ows",
        "g": "$1owing"
      }
    ],
    [
      "([pl])t$",
      {
        "in": "$1t",
        "pr": "$1ts",
        "g": "$1ting"
      }
    ]
  ]
}
//unpack compressed form
verb_rules=Object.keys(verb_rules).reduce(function(h,k){
  h[k]=verb_rules[k].map(function(a){
    var obj={
      reg:new RegExp(a[0],"i"),
      repl:{
        infinitive:a[1]["in"],
        present:a[1]["pr"],
        past:a[1]["pa"],
        gerund:a[1]["g"]
      }
    }
    if(a[1]["do"]){
      obj.repl.doer=a[1]["do"]
    }
    return obj
  })
  return h
},{})

module.exports = verb_rules;
// console.log(JSON.stringify(verb_rules, null, 2));

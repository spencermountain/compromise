//generated from test data
var compact = {
  "gerund": [
    "ing"
  ],
  "infinitive": [
    "ate",
    "ize",
    "tion",
    "rify",
    "ress",
    "ify",
    "age",
    "nce",
    "ect",
    "ise",
    "ine",
    "ish",
    "ace",
    "ash",
    "ure",
    "tch",
    "end",
    "ack",
    "and",
    "ute",
    "ade",
    "ock",
    "ite",
    "ase",
    "ose",
    "use",
    "ive",
    "int",
    "nge",
    "lay",
    "est",
    "ain",
    "ant",
    "eed",
    "er",
    "le"
  ],
  "past": [
    "ed",
    "lt",
    "nt",
    "pt",
    "ew",
    "ld"
  ],
  "present": [
    "rks",
    "cks",
    "nks",
    "ngs",
    "mps",
    "tes",
    "zes",
    "ers",
    "les",
    "acks",
    "ends",
    "ands",
    "ocks",
    "lays",
    "eads",
    "lls",
    "els",
    "ils",
    "ows",
    "nds",
    "ays",
    "ams",
    "ars",
    "ops",
    "ffs",
    "als",
    "urs",
    "lds",
    "ews",
    "ips",
    "es",
    "ts",
    "ns",
    "s"
  ]
}
var suffix_rules = {}
var keys = Object.keys(compact)
var l = keys.length;
var l2, i;
for (i = 0; i < l; i++) {
  l2 = compact[keys[i]].length
  for (var o = 0; o < l2; o++) {
    suffix_rules[compact[keys[i]][o]] = keys[i]
  }
}
module.exports = suffix_rules;

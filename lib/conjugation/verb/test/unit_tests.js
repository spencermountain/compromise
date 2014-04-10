conjugate = require("../conjugate")
data = [{
  "infinitive": "convolute",
  "present": "convolutes",
  "gerund": "convoluting",
  "past": "convoluted"
}, {
  "infinitive": "overthrow",
  "present": "overthrows",
  "gerund": "overthrowing",
  "past": "overthrew"
}, {
  "infinitive": "overthrow",
  "present": "overthrows",
  "past": "overthrowed",
  "gerund": "overthrowing"
}, {
  "infinitive": "overcompensate",
  "present": "overcompensates",
  "past": "overcompensated",
  "gerund": "overcompensating"
}, {
  "infinitive": "convolute",
  "gerund": "convoluting",
  "past": "convoluted",
  "present": "convolutes"
}, {
  "present": "presents",
  "gerund": "presenting",
  "past": "presented",
  "infinitive": "present"
}, {
  "present": "angulates",
  "gerund": "angulating",
  "past": "angulated",
  "infinitive": "angulate"
}, {}, {
  "present": "conjures",
  "gerund": "conjuring",
  "past": "conjured",
  "infinitive": "conjure"
}, {
  "present": "denounces",
  "gerund": "denouncing",
  "past": "denounced",
  "infinitive": "denounce"
}, {
  "present": "watches",
  "gerund": "watching",
  "past": "watched",
  "infinitive": "watch"
}, {
  "present": "tingles",
  "gerund": "tingling",
  "past": "tingled",
  "infinitive": "tingle"
}, {
  "present": "mortises",
  "gerund": "mortising",
  "past": "mortised",
  "infinitive": "mortise"
}, {
  "present": "unifies",
  "gerund": "unifying",
  "past": "unified",
  "infinitive": "unify"
}, {
  "present": "addresses",
  "gerund": "addressing",
  "past": "addressed",
  "infinitive": "address"
}, {
  "present": "relishes",
  "gerund": "relishing",
  "past": "relished",
  "infinitive": "relish"
}, {
  "present": "disguises",
  "gerund": "disguising",
  "past": "disguised",
  "infinitive": "disguise"
}, {
  "infinitive": "effect",
  "gerund": "effecting",
  "past": "effected",
  "present": "effects"
}, {
  "infinitive": "want",
  "gerund": "wanting",
  "past": "wanted",
  "present": "wants"
}, {
  "infinitive": "lengthen",
  "gerund": "lengthening",
  "past": "lengthened",
  "present": "lengthens"
}, {
  "infinitive": "disdain",
  "gerund": "disdaining",
  "past": "disdained",
  "present": "disdains"
}, {
  "infinitive": "power",
  "gerund": "powering",
  "past": "powered",
  "present": "powers"
}, {
  "infinitive": "yellow",
  "gerund": "yellowing",
  "past": "yellew",
  "present": "yellows"
}, {
  "infinitive": "relay",
  "gerund": "relaying",
  "past": "relayed",
  "present": "relays"
}, {
  "infinitive": "overthrow",
  "gerund": "overthrowing",
  "past": "overthrew",
  "present": "overthrows"
}, {
  "infinitive": "gallop",
  "gerund": "gallopping",
  "past": "gallopped",
  "present": "gallops"
}, {
  "infinitive": "overthrow",
  "present": "overthrows",
  "past": "overthrowed",
  "gerund": "overthrowing"
}, {
  "infinitive": "overcompensate",
  "present": "overcompensates",
  "past": "overcompensated",
  "gerund": "overcompensating"
}, {
  "infinitive": "convolute",
  "present": "convolutes",
  "past": "convoluted",
  "gerund": "convoluting"
}, {
  "infinitive": "ice",
  "present": "ices",
  "past": "iced",
  "gerund": "icing"
}, {
  "infinitive": "farm",
  "present": "farms",
  "past": "farmed",
  "gerund": "farming"
}, {
  "infinitive": "buy",
  "present": "buys",
  "past": "buyed",
  "gerund": "buying"
}, {
  "infinitive": "grape",
  "present": "grapes",
  "past": "graped",
  "gerund": "graping"
}, {
  "infinitive": "flower",
  "present": "flowers",
  "past": "flowered",
  "gerund": "flowering"
}, {
  "infinitive": "bumbel",
  "present": "bumbels",
  "past": "bumbeled",
  "gerund": "bumbeling"
}, {
  "infinitive": "foul",
  "present": "fouls",
  "past": "fouled",
  "gerund": "fouling"
}, {
  "infinitive": "rage",
  "present": "rages",
  "past": "raged",
  "gerund": "raging"
}, {
  "infinitive": "aim",
  "present": "aims",
  "past": "aimed",
  "gerund": "aiming"
}, {
  "infinitive": "drive",
  "present": "drives",
  "past": "drived",
  "gerund": "driving"
}, {
  "infinitive": "snipe",
  "present": "snipes",
  "past": "sniped",
  "gerund": "sniping"
}]

function isequal(o1, o2) {
  return types.every(function(t) {
    return o1[t] == o2[t]
  })
}

var types = [
  "infinitive",
  "present",
  "gerund",
  "past",
]


data.forEach(function(o) {
  var type = types[Math.floor(Math.random() * 4)]
  var o2 = conjugate(o[type])
  if (!isequal(o, o2)) {
    console.log(o[type])
    console.log(o2)
  }
})
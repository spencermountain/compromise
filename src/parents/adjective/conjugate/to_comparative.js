//turn 'quick' into 'quickly'
var convertables = require("./convertables")

var main = function (str) {
  var irregulars = {
    "grey": "greyer",
    "gray": "grayer",
    "green": "greener",
    "yellow": "yellower",
    "red": "redder",
    "good": "better",
    "well": "better",
    "bad": "worse",
    "sad": "sadder"
  }

  var dont = {
    "overweight": 1,
    "main": 1,
    "nearby": 1,
    "asleep": 1,
    "weekly": 1,
    "secret": 1,
    "certain": 1
  }

  var transforms = [{
    reg: /y$/i,
    repl: 'ier'
  }, {
    reg: /([aeiou])t$/i,
    repl: '$1tter'
  }, {
    reg: /([aeou])de$/i,
    repl: '$1der'
  }, {
    reg: /nge$/i,
    repl: 'nger'
  }]

  var matches = [
    /ght$/,
    /nge$/,
    /ough$/,
    /ain$/,
    /uel$/,
    /[au]ll$/,
    /ow$/,
    /old$/,
    /oud$/,
    /e[ae]p$/
  ]

  var not_matches = [
    /ary$/,
    /ous$/
  ]

  if (dont.hasOwnProperty(str)) {
    return null
  }

  for (i = 0; i < transforms.length; i++) {
    if (str.match(transforms[i].reg)) {
      return str.replace(transforms[i].reg, transforms[i].repl)
    }
  }

  if (convertables.hasOwnProperty(str)) {
    if (str.match(/e$/)) {
      return str + "r"
    } else {
      return str + "er"
    }
  }

  if (irregulars.hasOwnProperty(str)) {
    return irregulars[str]
  }

  var i;
  for (i = 0; i < not_matches.length; i++) {
    if (str.match(not_matches[i])) {
      return "more " + str
    }
  }

  for (i = 0; i < matches.length; i++) {
    if (str.match(matches[i])) {
      return str + "er"
    }
  }
  return "more " + str
}

module.exports = main;

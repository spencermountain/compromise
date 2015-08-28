//turn 'quick' into 'quickly'
"use strict";
let convertables = require("./convertables");

let to_comparative = function(str) {
  let irregulars = {
    "grey": "greyer",
    "gray": "grayer",
    "green": "greener",
    "yellow": "yellower",
    "red": "redder",
    "good": "better",
    "well": "better",
    "bad": "worse",
    "sad": "sadder"
  };

  let dont = {
    "overweight": 1,
    "main": 1,
    "nearby": 1,
    "asleep": 1,
    "weekly": 1,
    "secret": 1,
    "certain": 1
  };

  let transforms = [{
    reg: /y$/i,
    repl: "ier"
  }, {
    reg: /([aeiou])t$/i,
    repl: "$1tter"
  }, {
    reg: /([aeou])de$/i,
    repl: "$1der"
  }, {
    reg: /nge$/i,
    repl: "nger"
  }];

  let matches = [
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
  ];

  let not_matches = [
    /ary$/,
    /ous$/
  ];

  if (dont.hasOwnProperty(str)) {
    return null;
  }

  for (let i = 0; i < transforms.length; i++) {
    if (str.match(transforms[i].reg)) {
      return str.replace(transforms[i].reg, transforms[i].repl);
    }
  }

  if (convertables.hasOwnProperty(str)) {
    if (str.match(/e$/)) {
      return str + "r";
    }
    return str + "er";
  }

  if (irregulars.hasOwnProperty(str)) {
    return irregulars[str];
  }

  for (let i = 0; i < not_matches.length; i++) {
    if (str.match(not_matches[i])) {
      return "more " + str;
    }
  }

  for (let i = 0; i < matches.length; i++) {
    if (str.match(matches[i])) {
      return str + "er";
    }
  }
  return "more " + str;
};

// console.log(to_comparative("great"))

module.exports = to_comparative;

//turn 'quick' into 'quickest'
"use strict";
let convertables = require("./convertables");

let to_superlative = function(str) {
  let irregulars = {
    "nice": "nicest",
    "late": "latest",
    "hard": "hardest",
    "inner": "innermost",
    "outer": "outermost",
    "far": "furthest",
    "worse": "worst",
    "bad": "worst",
    "good": "best"
  };

  let dont = {
    "overweight": 1,
    "ready": 1
  };

  let transforms = [{
    "reg": /y$/i,
    "repl": "iest"
  }, {
    "reg": /([aeiou])t$/i,
    "repl": "$1ttest"
  }, {
    "reg": /([aeou])de$/i,
    "repl": "$1dest"
  }, {
    "reg": /nge$/i,
    "repl": "ngest"
  }];

  let matches = [
    /ght$/,
    /nge$/,
    /ough$/,
    /ain$/,
    /uel$/,
    /[au]ll$/,
    /ow$/,
    /oud$/,
    /...p$/
  ];

  let not_matches = [
    /ary$/
  ];

  let generic_transformation = function(s) {
    if (s.match(/e$/)) {
      return s + "st";
    }
    return s + "est";
  };

  for (let i = 0; i < transforms.length; i++) {
    if (str.match(transforms[i].reg)) {
      return str.replace(transforms[i].reg, transforms[i].repl);
    }
  }

  if (convertables.hasOwnProperty(str)) {
    return generic_transformation(str);
  }

  if (dont.hasOwnProperty(str)) {
    return "most " + str;
  }

  if (irregulars.hasOwnProperty(str)) {
    return irregulars[str];
  }
  for (let i = 0; i < not_matches.length; i++) {
    if (str.match(not_matches[i])) {
      return "most " + str;
    }
  }

  for (let i = 0; i < matches.length; i++) {
    if (str.match(matches[i])) {
      return generic_transformation(str);
    }
  }
  return "most " + str;
};

// console.log(to_superlative("great"))

module.exports = to_superlative;

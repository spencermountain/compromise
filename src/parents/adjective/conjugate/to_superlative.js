//turn 'quick' into 'quickest'
var to_superlative = (function() {

  if (typeof module !== "undefined" && module.exports) {
    convertables = require("./convertables")
  }

  var main = function(str) {
    var irregulars = {
      "nice": "nicest",
      "late": "latest",
      "hard": "hardest",
      "inner": "innermost",
      "outer": "outermost",
      "far": "furthest",
      "worse": "worst",
      "bad": "worst",
      "good": "best"
    }

    var dont = {
      "overweight": 1,
      "ready": 1
    }

    var transforms = [{
      "reg": /y$/i,
      "repl": 'iest'
    }, {
      "reg": /([aeiou])t$/i,
      "repl": '$1ttest'
    }, {
      "reg": /([aeou])de$/i,
      "repl": '$1dest'
    }, {
      "reg": /nge$/i,
      "repl": 'ngest'
    }]

    var matches = [
      /ght$/,
      /nge$/,
      /ough$/,
      /ain$/,
      /uel$/,
      /[au]ll$/,
      /ow$/,
      /oud$/,
      /...p$/
    ]

    var not_matches = [
      /ary$/
    ]

    var generic_transformation = function(str) {
      if (str.match(/e$/)) {
        return str + "st"
      } else {
        return str + "est"
      }
    }

    for (i = 0; i < transforms.length; i++) {
      if (str.match(transforms[i].reg)) {
        return str.replace(transforms[i].reg, transforms[i].repl)
      }
    }

    if (convertables.hasOwnProperty(str)) {
      return generic_transformation(str)
    }

    if (dont.hasOwnProperty(str)) {
      return "most " + str
    }

    if (irregulars.hasOwnProperty(str)) {
      return irregulars[str]
    }
    var i;
    for (i = 0; i < not_matches.length; i++) {
      if (str.match(not_matches[i])) {
        return "most " + str
      }
    }

    for (i = 0; i < matches.length; i++) {
      if (str.match(matches[i])) {
        return generic_transformation(str)
      }
    }
    return "most " + str
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = main;
  }
  return main;
})();

// console.log(to_superlative('dry'))
// console.log(to_superlative('rich'))

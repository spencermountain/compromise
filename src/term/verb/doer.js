//somone who does this present-tense verb
//turn 'walk' into 'walker'

let doer = function(str) {
  str = str || "";
  let irregulars = {
    "tie": "tier",
    "dream": "dreamer",
    "sail": "sailer",
    "run": "runner",
    "rub": "rubber",
    "begin": "beginner",
    "win": "winner",
    "claim": "claimant",
    "deal": "dealer",
    "spin": "spinner"
  };

  let dont = {
    "aid": 1,
    "fail": 1,
    "appear": 1,
    "happen": 1,
    "seem": 1,
    "try": 1,
    "say": 1,
    "marry": 1,
    "be": 1,
    "forbid": 1,
    "understand": 1,
    "bet": 1
  };

  let transforms = [{
    "reg": /e$/i,
    "repl": "er"
  }, {
    "reg": /([aeiou])([mlgp])$/i,
    "repl": "$1$2$2er"
  }, {
    "reg": /([rlf])y$/i,
    "repl": "$1ier"
  }, {
    "reg": /^(.?.[aeiou])t$/i,
    "repl": "$1tter"
  }];

  if (dont.hasOwnProperty(str)) {
    return null;
  }
  if (irregulars.hasOwnProperty(str)) {
    return irregulars[str];
  }
  for (let i = 0; i < transforms.length; i++) {
    if (str.match(transforms[i].reg)) {
      return str.replace(transforms[i].reg, transforms[i].repl);
    }
  }
  return str + "er";
};

// console.log(doer('watch'))

module.exports = doer;

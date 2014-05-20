verb_conjugate = (function() {

  if (typeof module !== "undefined" && module.exports) {
    verb_to_doer = require("./to_doer")
    verb_irregulars = require("./verb_irregulars")
    verb_rules = require("./verb_rules")
  }

  var predict = function(w) {
    if (w.match(/[aeiou].*ing/)) {
      return "gerund"
    }
  }


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
// console.log(verb_conjugate("having"))
// console.log(verb_conjugate("attend"))
// console.log(verb_conjugate("forecasts"))
// console.log(verb_conjugate("increased"))
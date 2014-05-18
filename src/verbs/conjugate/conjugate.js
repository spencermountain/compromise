var conjugate = (function() {

  if (typeof module !== "undefined" && module.exports) {
    var rules = require("./rules").rules;
    var irregulars = require("./irregulars").data;
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
    } else {
      gerund = w.replace(/[aeiou]$/, 'ing')
      past = w.replace(/[aeiou]$/, 'ed')
      present = w.replace(/[aeiou]$/, 'es')
    }
    return {
      infinitive: infinitive,
      present: present,
      past: past,
      gerund: gerund
    }
  }



  var main = function(w) {
    if (!w) {
      return {}
    }

    //check irregulars
    for (var i = 0; i < irregulars.length; i++) {
      var x = irregulars[i];
      if (w == x.present || w == x.gerund || w == x.past || w == x.infinitive) {
        return irregulars[i]
      }
    }

    //check against suffix rules
    var obj, r, _i, _len;
    for (_i = 0, _len = rules.length; _i < _len; _i++) {
      r = rules[_i];
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
    exports.conjugate = main;
  }
  return main
})()

// console.log(conjugate("swing"))
// console.log(conjugate("walking"))
// console.log(conjugate("win"))
// console.log(conjugate("write"))
// console.log(conjugate("stop"))
// console.log(conjugate("carry"))
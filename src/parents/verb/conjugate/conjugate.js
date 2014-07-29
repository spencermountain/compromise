verb_conjugate = (function() {

  if (typeof module !== "undefined" && module.exports) {
    verb_to_doer = require("./to_doer")
    verb_irregulars = require("./verb_irregulars")
    verb_rules = require("./verb_rules")
  }

  var predict = function(w) {
    //generated from test data
    var suffix_rules = {
      "ing": "gerund",
      "tes": "present",
      "ate": "infinitive",
      "zes": "present",
      "ize": "infinitive",
      "ers": "present",
      "les": "present",
      "es": "present",
      "ts": "present",
      "ns": "present",
      "er": "infinitive",
      "le": "infinitive",
      "acks": "present",
      "ends": "present",
      "ands": "present",
      "ocks": "present",
      "tion": "infinitive",
      "lays": "present",
      "rify": "infinitive",
      "eads": "present",
      "ress": "infinitive",
      "lls": "present",
      "els": "present",
      "ify": "infinitive",
      "age": "infinitive",
      "ils": "present",
      "ows": "present",
      "nce": "infinitive",
      "ect": "infinitive",
      "nds": "present",
      "ise": "infinitive",
      "ine": "infinitive",
      "nks": "present",
      "ish": "infinitive",
      "ace": "infinitive",
      "cks": "present",
      "ash": "infinitive",
      "ure": "infinitive",
      "tch": "infinitive",
      "ngs": "present",
      "end": "infinitive",
      "ack": "infinitive",
      "mps": "present",
      "ays": "present",
      "and": "infinitive",
      "ute": "infinitive",
      "ade": "infinitive",
      "ock": "infinitive",
      "ite": "infinitive",
      "rks": "present",
      "ase": "infinitive",
      "ose": "infinitive",
      "use": "infinitive",
      "ams": "present",
      "ars": "present",
      "ops": "present",
      "ffs": "present",
      "als": "present",
      "ive": "infinitive",
      "int": "infinitive",
      "nge": "infinitive",
      "urs": "present",
      "lds": "present",
      "ews": "present",
      "ips": "present",
      "lay": "infinitive",
      "est": "infinitive",
      "ain": "infinitive",
      "ant": "infinitive",
      "s": "present",
      "ed": "past",
      "lt": "past",
      "nt": "past",
      "pt": "past",
      "ew": "past",
      "ld": "past",
    }

    var endsWith = function(str, suffix) {
      return str.indexOf(suffix, str.length - suffix.length) !== -1;
    }
    var arr = Object.keys(suffix_rules);
    for (var i = 0; i < arr.length; i++) {
      if (endsWith(w, arr[i])) {
        return suffix_rules[arr[i]]
      }
    }
    return "infinitive"
  }


  //fallback to this transformation if it has an unknown prefix
  var fallback = function(w) {
    // console.log('fallback')
    var infinitive = w.replace(/ed$/, '');
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

  //make sure object has all forms
  var fufill = function(obj) {
    if (!obj.infinitive) {
      return obj
    }
    if (!obj.gerund) {
      obj.gerund = obj.infinitive + 'ing'
    }
    if (!obj.doer) {
      obj.doer = verb_to_doer(obj.infinitive)
    }
    if (!obj.present) {
      obj.present = obj.infinitive + 's'
    }
    if (!obj.past) {
      obj.past = obj.infinitive + 'ed'
    }
    return obj
  }


  var main = function(w) {
    if (!w) {
      return {}
    }
    var done = {}
    //check irregulars
    for (var i = 0; i < verb_irregulars.length; i++) {
      var x = verb_irregulars[i];
      if (w == x.present || w == x.gerund || w == x.past || w == x.infinitive) {
        return fufill(verb_irregulars[i])
      }
    }
    // console.log(predict(w))
    var predicted = predict(w) || 'infinitive'

    //check against suffix rules
    for (var i = 0; i < verb_rules[predicted].length; i++) {
      var r = verb_rules[predicted][i];
      if (w.match(r.reg)) {
        // console.log(r)
        var obj = Object.keys(r.repl).reduce(function(h, k) {
          if (k == predicted) {
            h[k] = w
          } else {
            h[k] = w.replace(r.reg, r.repl[k]);
          }
          return h;
        }, {});
        obj[r.tense] = w;
        return fufill(obj);
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
// console.log(verb_conjugate("walked"))
// console.log(verb_conjugate("having"))
// console.log(verb_conjugate("attend"))
// console.log(verb_conjugate("forecasts"))
// console.log(verb_conjugate("increased"))
// console.log(verb_conjugate("spoilt"))
// console.log(verb_conjugate("oversold"))
// console.log(verb_conjugate("lynching"))
// console.log(verb_conjugate("marooning"))
// console.log(verb_conjugate("immoblizing"))
// console.log(verb_conjugate("immobilize"))
// console.log(verb_conjugate("rushing"))
// console.log(verb_conjugate("timing"))
// console.log(verb_conjugate("produces"))
// console.log(verb_conjugate("boiling"))
// console.log(verb_conjugate("mortified"))
// console.log(verb_conjugate("located"))
// console.log(verb_conjugate("timed"))
// console.log(verb_conjugate("flipped"))
// console.log(verb_conjugate("fitted"))
// console.log(verb_conjugate("passed"))
// console.log(verb_conjugate("wrangled"))
// console.log(verb_conjugate("twisted"))
// console.log(verb_conjugate("walled"))
// console.log(verb_conjugate("finished"))
// console.log(verb_conjugate("wiggled"))
// console.log(verb_conjugate("confessed"))
// console.log(verb_conjugate("called"))
// console.log(verb_conjugate("whipped"))
// console.log(verb_conjugate("batted"))
// console.log(verb_conjugate("chugged"))
// console.log(verb_conjugate("flopped"))

// console.log(verb_conjugate("clipping"))
// console.log(verb_conjugate("searching"))
// console.log(verb_conjugate("confessing"))
// console.log(verb_conjugate("satisfying"))
// console.log(verb_conjugate("write"))
// console.log(verb_conjugate("see"))
// console.log(verb_conjugate("consider"))

// console.log(verb_conjugate("suck")) ///*****bug


// console.log(verb_conjugate("imply")) ///*****bug
// console.log(verb_conjugate("count")) ///*****bug
// console.log(verb_conjugate("contain")) ///*****bug
// console.log(verb_conjugate("result")) //****bug
// console.log(verb_conjugate("develop")) //****bug
// console.log(verb_conjugate("wait"))//****bug
// console.log(verb_conjugate("represent"))//****bug
// console.log(verb_conjugate("stain"))//****bug
// console.log(verb_conjugate("pass"))//****bug
// console.log(verb_conjugate("answer"))//****bug
var verb_conjugate = (function() {

  var debug=false //find the particular transformation

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
      "eed": "infinitive",
      "ed": "past",
      "s": "present",
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
    if(w.length>4){
      var infinitive = w.replace(/ed$/, '');
    }else{
      var infinitive = w.replace(/d$/, '');
    }
    var present, past, gerund, doer;
    if (w.match(/[^aeiou]$/)) {
      gerund = w + "ing"
      past = w + "ed"
      if(w.match(/ss$/)){
        present = w + "es" //'passes'
      }else{
        present = w + "s"
      }
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
      future: "will "+infinitive,
    }
  }

  //make sure object has all forms
  var fufill = function(obj, prefix) {
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
    //add the prefix to all forms, if it exists
    if(prefix){
      Object.keys(obj).forEach(function(k){
        obj[k]= prefix+obj[k]
      })
    }
    //future is 'will'+infinitive
    if(!obj.future){
      obj.future= "will "+obj.infinitive
    }
    return obj
  }


  var main = function(w) {
    if (!w) {
      return {}
    }
    var done = {}
    //chop it if it's future-tense
    w=w.replace(/^will /i,'')
    //un-prefix the verb, and add it in later
    var prefix= (w.match(/^(over|under|re|anti|full)\-?/i)||[])[0]
    var verb=w.replace(/^(over|under|re|anti|full)\-?/i, '')
    //check irregulars
    for (var i = 0; i < verb_irregulars.length; i++) {
      var x = verb_irregulars[i]
      if (verb == x.present || verb == x.gerund || verb == x.past || verb == x.infinitive) {
        var x = JSON.parse(JSON.stringify(verb_irregulars[i])); // object 'clone' hack, to avoid mem leak
        return fufill(x, prefix)
      }
    }
    //guess the tense, so we know which transormation to make
    var predicted = predict(w) || 'infinitive'
    if(debug){console.log("==predicted= " + predicted)}

    //check against suffix rules
    for (var i = 0; i < verb_rules[predicted].length; i++) {
      var r = verb_rules[predicted][i];
      if (w.match(r.reg)) {
        if(debug){ console.log(r) }
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

    if(debug){console.log("--fallback--")}
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
// console.log(verb_conjugate("weep"))
// console.log(verb_conjugate("imply"))
// console.log(verb_conjugate("count"))
// console.log(verb_conjugate("seed"))//
// console.log(verb_conjugate("plead"))
// console.log(verb_conjugate("sliced"))
// console.log(verb_conjugate("underthrow"))
// console.log(verb_conjugate("will walk"))
// console.log(verb_conjugate("overthrow"))
// console.log(verb_conjugate("fasten"))
// console.log(verb_conjugate("will go"))
// console.log(verb_conjugate("farmed"))
// console.log(verb_conjugate("fouled"))
// console.log(verb_conjugate("contain"))
// console.log(verb_conjugate("stain"))
// console.log(verb_conjugate("glean"))
// console.log(verb_conjugate("result"))
// console.log(verb_conjugate("develop"))
// console.log(verb_conjugate("worship"))
// console.log(verb_conjugate("wait"))
// console.log(verb_conjugate("pass"))
// console.log(verb_conjugate("doesn't walk"))
// console.log(verb_conjugate("answer"))
// console.log(verb_conjugate("walks"))
// console.log(verb_conjugate("will go"))


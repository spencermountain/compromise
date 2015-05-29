//turn a verb into its other grammatical forms.
var verb_to_doer = require("./to_doer")
var verb_irregulars = require("./verb_irregulars")
var verb_rules = require("./verb_rules")
var suffix_rules = require("./suffix_rules")

//this method is the slowest in the whole library, basically TODO:whaaa
var predict = function (w) {
  var endsWith = function (str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
  }
  var arr = Object.keys(suffix_rules);
  for (i = 0; i < arr.length; i++) {
    if (endsWith(w, arr[i])) {
      return suffix_rules[arr[i]]
    }
  }
  return "infinitive"
}

//fallback to this transformation if it has an unknown prefix
var fallback = function (w) {
  var infinitive;
  if (w.length > 4) {
    infinitive = w.replace(/ed$/, '');
  } else {
    infinitive = w.replace(/d$/, '');
  }
  var present, past, gerund, doer;
  if (w.match(/[^aeiou]$/)) {
    gerund = w + "ing"
    past = w + "ed"
    if (w.match(/ss$/)) {
      present = w + "es" //'passes'
    } else {
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
    future: "will " + infinitive
  }
}

//make sure object has all forms
var fufill = function (obj, prefix) {
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
  if (prefix) {
    Object.keys(obj).forEach(function (k) {
      obj[k] = prefix + obj[k]
    })
  }
  //future is 'will'+infinitive
  if (!obj.future) {
    obj.future = "will " + obj.infinitive
  }
  //perfect is 'have'+past-tense
  if (!obj.perfect) {
    obj.perfect = "have " + obj.past
  }
  //pluperfect is 'had'+past-tense
  if (!obj.pluperfect) {
    obj.pluperfect = "had " + obj.past
  }
  //future perfect is 'will have'+past-tense
  if (!obj.future_perfect) {
    obj.future_perfect = "will have " + obj.past
  }
  return obj
}

var main = function (w) {
  if (w === undefined) {
    return {}
  }

  //for phrasal verbs ('look out'), conjugate look, then append 'out'
  var phrasal_reg = new RegExp("^(.*?) (in|out|on|off|behind|way|with|of|do|away|across|ahead|back|over|under|together|apart|up|upon|aback|down|about|before|after|around|to|forth|round|through|along|onto)$", 'i')
  if (w.match(' ') && w.match(phrasal_reg)) {
    var split = w.match(phrasal_reg, '')
    var phrasal_verb = split[1]
    var particle = split[2]
    var result = main(phrasal_verb) //recursive
    delete result["doer"]
    Object.keys(result).forEach(function (k) {
      if (result[k]) {
        result[k] += " " + particle
      }
    })
    return result
  }

  //for pluperfect ('had tried') remove 'had' and call it past-tense
  if (w.match(/^had [a-z]/i)) {
    w = w.replace(/^had /i, '')
  }
  //for perfect ('have tried') remove 'have' and call it past-tense
  if (w.match(/^have [a-z]/i)) {
    w = w.replace(/^have /i, '')
  }

  //for future perfect ('will have tried') remove 'will have' and call it past-tense
  if (w.match(/^will have [a-z]/i)) {
    w = w.replace(/^will have /i, '')
  }

  //chop it if it's future-tense
  w = w.replace(/^will /i, '')
  //un-prefix the verb, and add it in later
  var prefix = (w.match(/^(over|under|re|anti|full)\-?/i) || [])[0]
  var verb = w.replace(/^(over|under|re|anti|full)\-?/i, '')
    //check irregulars
  var obj = {};
  var l = verb_irregulars.length
  var x, i;
  for (i = 0; i < l; i++) {
    x = verb_irregulars[i]
    if (verb === x.present || verb === x.gerund || verb === x.past || verb === x.infinitive) {
      obj = JSON.parse(JSON.stringify(verb_irregulars[i])); // object 'clone' hack, to avoid mem leak
      return fufill(obj, prefix)
    }
  }
  //guess the tense, so we know which transormation to make
  var predicted = predict(w) || 'infinitive'

  //check against suffix rules
  l = verb_rules[predicted].length
  var r, keys;
  for (i = 0; i < l; i++) {
    r = verb_rules[predicted][i];
    if (w.match(r.reg)) {
      obj[predicted] = w;
      keys= Object.keys(r.repl)
      for(var o=0; o<keys.length; o++){
        if (keys[o] === predicted) {
          obj[keys[o]] = w
        } else {
          obj[keys[o]] = w.replace(r.reg, r.repl[keys[o]])
        }
      }
      return fufill(obj);
    }
  }

  //produce a generic transformation
  return fallback(w)
};
module.exports = main;

// console.log(module.exports("walking"))
// console.log(module.exports("overtook"))
// console.log(module.exports("watch out"))
// console.log(module.exports("watch"))
// console.log(module.exports("smash"))
// console.log(module.exports("word"))
// // broken
// console.log(module.exports("read"))
// console.log(module.exports("free"))
// console.log(module.exports("flesh"))
// console.log(module.exports("branch"))
// console.log(module.exports("spred"))
// console.log(module.exports("bog"))
// console.log(module.exports("nod"))
// console.log(module.exports("had tried"))
// console.log(module.exports("have tried"))

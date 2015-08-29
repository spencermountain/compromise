//turn a verb into its other grammatical forms.
"use strict";
const verb_to_doer = require("./to_doer");
const verb_irregulars = require("./verb_irregulars");
const verb_rules = require("./verb_rules");
const predict = require("./predict_form.js");

//fallback to this transformation if it has an unknown prefix
const fallback = function(w) {
  let infinitive;
  if (w.length > 4) {
    infinitive = w.replace(/ed$/, "");
  } else {
    infinitive = w.replace(/d$/, "");
  }
  let present, past, gerund, doer;
  if (w.match(/[^aeiou]$/)) {
    gerund = w + "ing";
    past = w + "ed";
    if (w.match(/ss$/)) {
      present = w + "es"; //'passes'
    } else {
      present = w + "s";
    }
    doer = verb_to_doer(infinitive);
  } else {
    gerund = w.replace(/[aeiou]$/, "ing");
    past = w.replace(/[aeiou]$/, "ed");
    present = w.replace(/[aeiou]$/, "es");
    doer = verb_to_doer(infinitive);
  }
  return {
    infinitive: infinitive,
    present: present,
    past: past,
    gerund: gerund,
    doer: doer,
    future: "will " + infinitive
  };
};

//make sure object has all forms
const fufill = function(obj, prefix) {
  if (!obj.infinitive) {
    return obj;
  }
  if (!obj.gerund) {
    obj.gerund = obj.infinitive + "ing";
  }
  if (!obj.doer) {
    obj.doer = verb_to_doer(obj.infinitive);
  }
  if (!obj.present) {
    obj.present = obj.infinitive + "s";
  }
  if (!obj.past) {
    obj.past = obj.infinitive + "ed";
  }
  //add the prefix to all forms, if it exists
  if (prefix) {
    Object.keys(obj).forEach(function(k) {
      obj[k] = prefix + obj[k];
    });
  }
  //future is 'will'+infinitive
  if (!obj.future) {
    obj.future = "will " + obj.infinitive;
  }
  //perfect is 'have'+past-tense
  if (!obj.perfect) {
    obj.perfect = "have " + obj.past;
  }
  //pluperfect is 'had'+past-tense
  if (!obj.pluperfect) {
    obj.pluperfect = "had " + obj.past;
  }
  //future perfect is 'will have'+past-tense
  if (!obj.future_perfect) {
    obj.future_perfect = "will have " + obj.past;
  }
  return obj;
};

const conjugate = function(w) {
  if (w === undefined) {
    return {};
  }

  //for phrasal verbs ('look out'), conjugate look, then append 'out'
  const phrasal_reg = new RegExp("^(.*?) (in|out|on|off|behind|way|with|of|do|away|across|ahead|back|over|under|together|apart|up|upon|aback|down|about|before|after|around|to|forth|round|through|along|onto)$", "i");
  if (w.match(" ") && w.match(phrasal_reg)) {
    const split = w.match(phrasal_reg, "");
    const phrasal_verb = split[1];
    const particle = split[2];
    const result = conjugate(phrasal_verb); //recursive
    delete result["doer"];
    Object.keys(result).forEach(function(k) {
      if (result[k]) {
        result[k] += " " + particle;
      }
    });
    return result;
  }

  //for pluperfect ('had tried') remove 'had' and call it past-tense
  if (w.match(/^had [a-z]/i)) {
    w = w.replace(/^had /i, "");
  }
  //for perfect ('have tried') remove 'have' and call it past-tense
  if (w.match(/^have [a-z]/i)) {
    w = w.replace(/^have /i, "");
  }

  //for future perfect ('will have tried') remove 'will have' and call it past-tense
  if (w.match(/^will have [a-z]/i)) {
    w = w.replace(/^will have /i, "");
  }

  //chop it if it's future-tense
  w = w.replace(/^will /i, "");
  //un-prefix the verb, and add it in later
  const prefix = (w.match(/^(over|under|re|anti|full)\-?/i) || [])[0];
  const verb = w.replace(/^(over|under|re|anti|full)\-?/i, "");
  //check irregulars
  let obj = {};
  let l = verb_irregulars.length;
  for (let i = 0; i < l; i++) {
    const x = verb_irregulars[i];
    if (verb === x.present || verb === x.gerund || verb === x.past || verb === x.infinitive) {
      obj = JSON.parse(JSON.stringify(verb_irregulars[i])); // object 'clone' hack, to avoid mem leak
      return fufill(obj, prefix);
    }
  }
  //guess the tense, so we know which transormation to make
  const predicted = predict(w) || "infinitive";

  //check against suffix rules
  l = verb_rules[predicted].length;
  for (let i = 0; i < l; i++) {
    const r = verb_rules[predicted][i];
    if (w.match(r.reg)) {
      obj[predicted] = w;
      const keys = Object.keys(r.repl);
      for (let o = 0; o < keys.length; o++) {
        if (keys[o] === predicted) {
          obj[keys[o]] = w;
        } else {
          obj[keys[o]] = w.replace(r.reg, r.repl[keys[o]]);
        }
      }
      return fufill(obj);
    }
  }

  //produce a generic transformation
  return fallback(w);
};
module.exports = conjugate;

// console.log(conjugate("walking"))
// console.log(conjugate("overtook"))
// console.log(conjugate("watch out"))
// console.log(conjugate("watch"))
// console.log(conjugate("smash"))
// console.log(conjugate("word"))
// // broken
// console.log(conjugate("read"))
// console.log(conjugate("free"))
// console.log(conjugate("flesh"))
// console.log(conjugate("branch"))
// console.log(conjugate("spred"))
// console.log(conjugate("bog"))
// console.log(conjugate("nod"))
// console.log(conjugate("had tried"))
// console.log(conjugate("have tried"))

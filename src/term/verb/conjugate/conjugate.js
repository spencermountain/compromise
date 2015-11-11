//turn a verb into its other grammatical forms.
'use strict';
const verb_to_actor = require('./to_actor');
const to_infinitive = require('./to_infinitive');
const from_infinitive = require('./from_infinitive');
const irregular_verbs = require('./irregular_verbs');
const predict = require('./predict_form.js');


//make sure object has all forms
const fufill = function(obj, prefix) {
  if (!obj.infinitive) {
    return obj;
  }
  if (!obj.gerund) {
    obj.gerund = obj.infinitive + 'ing';
  }
  if (!obj.actor) {
    obj.actor = verb_to_actor(obj.infinitive);
  }
  if (!obj.present) {
    obj.present = obj.infinitive + 's';
  }
  if (!obj.past) {
    obj.past = obj.infinitive + 'ed';
  }
  //add the prefix to all forms, if it exists
  if (prefix) {
    Object.keys(obj).forEach(function(k) {
      obj[k] = prefix + obj[k];
    });
  }
  //future is 'will'+infinitive
  if (!obj.future) {
    obj.future = 'will ' + obj.infinitive;
  }
  //perfect is 'have'+past-tense
  if (!obj.perfect) {
    obj.perfect = 'have ' + (obj.participle || obj.past);
  }
  //pluperfect is 'had'+past-tense
  if (!obj.pluperfect) {
    obj.pluperfect = 'had ' + obj.past;
  }
  //future perfect is 'will have'+past-tense
  if (!obj.future_perfect) {
    obj.future_perfect = 'will have ' + obj.past;
  }
  return obj;
};

//fallback to this transformation if it has an unknown prefix
const fallback = function(w) {
  if (!w) {
    return {};
  }
  let infinitive;
  if (w.length > 4) {
    infinitive = w.replace(/ed$/, '');
  } else {
    infinitive = w.replace(/d$/, '');
  }
  let present, past, gerund, actor;
  if (w.match(/[^aeiou]$/)) {
    gerund = w + 'ing';
    past = w + 'ed';
    if (w.match(/ss$/)) {
      present = w + 'es'; //'passes'
    } else {
      present = w + 's';
    }
    actor = verb_to_actor(infinitive);
  } else {
    gerund = w.replace(/[aeiou]$/, 'ing');
    past = w.replace(/[aeiou]$/, 'ed');
    present = w.replace(/[aeiou]$/, 'es');
    actor = verb_to_actor(infinitive);
  }
  let obj = {
    infinitive: infinitive,
    present: present,
    past: past,
    gerund: gerund,
    actor: actor
  };
  return fufill(obj);
};


const conjugate = function(w) {
  if (w === undefined) {
    return {};
  }

  //for phrasal verbs ('look out'), conjugate look, then append 'out'
  const phrasal_reg = new RegExp('^(.*?) (in|out|on|off|behind|way|with|of|do|away|across|ahead|back|over|under|together|apart|up|upon|aback|down|about|before|after|around|to|forth|round|through|along|onto)$', 'i');
  if (w.match(' ') && w.match(phrasal_reg)) {
    const split = w.match(phrasal_reg, '');
    const phrasal_verb = split[1];
    const particle = split[2];
    const result = conjugate(phrasal_verb); //recursive
    Object.keys(result).forEach(function(k) {
      if (result[k]) {
        result[k] += ' ' + particle;
      }
    });
    return result;
  }

  //for pluperfect ('had tried') remove 'had' and call it past-tense
  w = w.replace(/^had /i, '');
  //for perfect ('have tried') remove 'have' and call it past-tense
  w = w.replace(/^have /i, '');
  //for future perfect ('will have tried') remove 'will have' and call it past-tense
  w = w.replace(/^will have /i, '');
  //chop it if it's future-tense
  w = w.replace(/^will /i, '');

  //un-prefix the verb, and add it in later
  const prefix = (w.match(/^(over|under|re|anti|full)\-?/i) || [])[0];
  const verb = w.replace(/^(over|under|re|anti|full)\-?/i, '');

  //guess the tense, so we know which transormation to make
  const predicted = predict(w) || 'infinitive';
  //check against suffix rules
  let infinitive = to_infinitive(w, predicted);
  //check irregulars
  let obj = irregular_verbs[infinitive] || {};

  obj = from_infinitive(infinitive);
  // return obj;
  return fufill(obj);

//produce a generic transformation
// return fallback(w);
};
module.exports = conjugate;

// console.log(conjugate('smell'));
// console.log(conjugate('taken'));


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

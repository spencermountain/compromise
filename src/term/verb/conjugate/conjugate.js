//turn a verb into its other grammatical forms.
'use strict';
const verb_to_actor = require('./to_actor');
const to_infinitive = require('./to_infinitive');
const from_infinitive = require('./from_infinitive');
const irregular_verbs = require('../../../data/irregular_verbs');
const predict = require('./predict_form.js');
const generic = require('./generic.js');
const strip_prefix = require('./strip_prefix.js');
const fns = require('../../../fns.js');


//make sure object has all forms
const fufill = function(obj, prefix) {
  //we're toast if there's no infinitive
  if (!obj.infinitive) {
    return obj;
  }
  //apply generic methods to missing forms
  if (!obj.gerund) {
    obj.gerund = generic.gerund(obj);
  }
  if (!obj.present) {
    obj.present = generic.present(obj);
  }
  if (!obj.past) {
    obj.past = generic.past(obj);
  }
  if (obj.actor === undefined) {
    obj.actor = verb_to_actor(obj.infinitive);
  }

  //add the prefix to all forms, if it exists
  if (prefix) {
    Object.keys(obj).forEach(function(k) {
      obj[k] = prefix + obj[k];
    });
  }
  //future is 'will'+infinitive
  if (!obj.future) {
    obj.future = generic.future(obj);
  }
  //perfect is 'have'+past-tense
  if (!obj.perfect) {
    obj.perfect = generic.perfect(obj);
  }
  //pluperfect is 'had'+past-tense
  if (!obj.pluperfect) {
    obj.pluperfect = generic.pluperfect(obj);
  }
  //future perfect is 'will have'+past-tense
  if (!obj.future_perfect) {
    obj.future_perfect = generic.future_perfect(obj);
  }
  return obj;
};


const conjugate = function(w) {
  if (w === undefined) {
    return {};
  }

  //for phrasal verbs ('look out'), conjugate look, then append 'out'
  const phrasal_reg = new RegExp('^(.*?) (in|out|on|off|behind|way|with|of|away|across|ahead|back|over|under|together|apart|up|upon|aback|down|about|before|after|around|to|forth|round|through|along|onto)$', 'i');
  if (w.match(phrasal_reg)) {
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
  let prefix = strip_prefix(w);
  w = w.replace(prefix, '');

  //guess the tense, so we know which transormation to make
  const predicted = predict(w) || 'infinitive';
  //check against suffix rules
  let infinitive = to_infinitive(w, predicted) || '';
  //check irregulars
  let obj = irregular_verbs[w] || irregular_verbs[infinitive] || {};
  obj = fns.extend({}, obj);
  //apply regex-transformations
  let conjugations = from_infinitive(infinitive);
  Object.keys(conjugations).forEach(function(k) {
    if (!obj[k]) {
      obj[k] = conjugations[k];
    }
  });
  return fufill(obj, prefix);
};
module.exports = conjugate;

// console.log(conjugate('played'));

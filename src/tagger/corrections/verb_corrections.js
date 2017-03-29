'use strict';

const corrections = function (r) {
  //support a splattering of auxillaries before a verb
  let advb = '(#Adverb|not)+?';
  //had walked
  r.match(`(has|had) ${advb} #PastTense`).not('#Verb$').tag('Auxiliary', 'had-walked');
  //was walking
  r.match(`#Copula ${advb} #Gerund`).not('#Verb$').tag('Auxiliary', 'copula-walking');
  //been walking
  r.match(`(be|been) ${advb} #Gerund`).not('#Verb$').tag('Auxiliary', 'be-walking');
  //would walk
  r.match(`(#Modal|did) ${advb} #Verb`).not('#Verb$').tag('Auxiliary', 'modal-verb');
  //would have had
  r.match(`#Modal ${advb} have ${advb} had ${advb} #Verb`).not('#Verb$').tag('Auxiliary', 'would-have');
  //would be walking
  r.match(`(#Modal) ${advb} be ${advb} #Verb`).not('#Verb$').tag('Auxiliary', 'would-be');
  //would been walking
  r.match(`(#Modal|had|has) ${advb} been ${advb} #Verb`).not('#Verb$').tag('Auxiliary', 'would-be');
  //infinitive verbs suggest plural nouns - 'XYZ walk to the store'
  // r.match(`#Singular+ #Infinitive`).match('#Singular+').tag('Plural', 'infinitive-make-plural');
  return r;
};
module.exports = corrections;

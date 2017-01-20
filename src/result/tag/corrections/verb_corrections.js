'use strict';
const log = require('../paths').log;
const path = 'verb_correction';

const corrections = function (r) {
  log.here(path);
  //support a splattering of auxillaries before a verb
  let advb = '(#Adverb|not)+?';
  //was walking
  r.match(`#Copula ${advb} #Gerund`).not('#Verb$').tag('Auxillary', 'copula-walking');
  //been walking
  r.match(`(be|been) ${advb} #Gerund`).not('#Verb$').tag('Auxillary', 'be-walking');
  //would have had
  r.match(`#Modal ${advb} have ${advb} had ${advb} #Verb`).not('#Verb$').tag('Auxillary', 'would-have');
  //would be walking
  r.match(`#Modal ${advb} (be|been) ${advb} #Verb`).not('#Verb$').tag('Auxillary', 'would-be');
  //has been walking
  r.match(`has ${advb} been ${advb} #Verb`).not('#Verb$').tag('Auxillary', 'has-been');

  return r;
};
module.exports = corrections;

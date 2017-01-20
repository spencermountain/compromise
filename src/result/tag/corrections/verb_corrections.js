'use strict';
const log = require('../paths').log;
const path = 'verb_correction';

const corrections = function (r) {
  log.here(path);
  //verbs
  //was walking
  r.match('#Copula not? #Gerund').term(0).tag('Auxillary', 'copula-walking');
  //would have had
  r.match('#Modal not? have not? had').term(0).tag('Auxillary', 'would-have');
  //has been walking
  r.match('has #Adverb? not? #Adverb? been').term(0).tag('Auxillary', 'has-been');
  //been walking
  r.match('(be|been) not? #Gerund').term(0).tag('Auxillary', 'be-walking');

  return r;
};
module.exports = corrections;

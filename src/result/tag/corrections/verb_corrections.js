'use strict';
const log = require('../paths').log;
const path = 'verb_correction';

const corrections = function (r) {
  log.here(path);
  //verbs
  //was walking
  r.match('#Copula (#Adverb+|not)? #Gerund').term(0).tag('Auxillary', 'copula-walking');
  //would have had
  r.match('#Modal (#Adverb+|not)? have (#Adverb+|not)? had').term(0).tag('Auxillary', 'would-have');
  //would be walking
  r.match('#Modal (#Adverb+|not)? be (#Adverb+|not)? #Verb').term(0).tag('Auxillary', 'would-be');
  //has been walking
  r.match('has (#Adverb+|not)? been').term(0).tag('Auxillary', 'has-been');
  //been walking
  r.match('(be|been) (#Adverb+|not)? #Gerund').term(0).tag('Auxillary', 'be-walking');

  return r;
};
module.exports = corrections;

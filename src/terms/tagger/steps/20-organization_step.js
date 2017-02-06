'use strict';
const log = require('../paths').log;
const path = 'tagger/organization_step';

const cantBe = [
  'Verb',
  'Pronoun',
  'Determiner',
  'Adverb',
  'Possessive',
  'Conjunction',
  'Preposition',
  'Adjective',
  'QuestionWord',
  'Value',
  'Negative',
];

//orgwords like 'bank' in 'Foo Bank'
let orgWords = require('../paths').data.orgWords;
orgWords = orgWords.reduce((h, str) => {
  h[str] = true;
  return h;
}, {});

//could this word be an organization
const maybeOrg = function(t) {
  for(let i = 0; i < cantBe.length; i++) {
    if (t.tag[cantBe[i]]) {
      return false;
    }
  }
  if (t.tag.TitleCase || t.tag.Organization) {
    return true;
  }
  return false;
};

const organization_step = (ts) => {
  log.here(path);
  for(let i = 0; i < ts.terms.length; i++) {
    let t = ts.terms[i];
    if (orgWords[t.normal]) {
      //eg. Toronto University
      let lastTerm = ts.terms[i - 1];
      if (lastTerm && maybeOrg(lastTerm)) {
        lastTerm.tagAs('Organization', 'org-word-1');
        t.tagAs('Organization', 'org-word-2');
        continue;
      }
      //eg. University of Toronto
      let nextTerm = ts.terms[i + 1];
      if (nextTerm && nextTerm.normal === 'of') {
        if (ts.terms[i + 2] && maybeOrg(ts.terms[i + 2])) {
          t.tagAs('Organization', 'org-word-1');
          nextTerm.tagAs('Organization', 'org-word-2');
          ts.terms[i + 2].tagAs('Organization', 'org-word-3');
          continue;
        }
      }
    }
  }
  return ts;
};
module.exports = organization_step;

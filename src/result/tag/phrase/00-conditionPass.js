'use strict';

//
const conditionPass = function(r) {
  //'if it really goes, I will..'
  let m = r.match('#Condition {1,7} #ClauseEnd');
  //make sure it ends on a comma
  if (m.found && m.match('#Comma$')) {
    m.tag('ConditionPhrase');
  }
  //'go a bit further, if it then has a pronoun
  m = r.match('#Condition {1,13} #ClauseEnd #Pronoun');
  if (m.found && m.match('#Comma$')) {
    m.remove('#Pronoun$').tag('ConditionPhrase');
  }
  //if it goes then ..
  m = r.match('#Condition {1,7} then');
  if (m.found) {
    m.remove('then$').tag('ConditionPhrase');
  }
  //at the end of a sentence:
  //'..., if it really goes.'
  m = r.match('#Comma #Condition {1,7} .$');
  if (m.found) {
    m.remove('^#Comma').tag('ConditionPhrase');
  }
  // '... if so.'
  m = r.match('#Condition {1,4}$');
  if (m.found) {
    m.tag('ConditionPhrase');
  }
  return r;
};

module.exports = conditionPass;

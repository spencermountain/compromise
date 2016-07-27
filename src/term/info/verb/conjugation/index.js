'use strict';
//turn a verb into all it's forms

const conjugate = function(t) {
  let all = {}
  //first, get its current form
  let form = t.info('Conjugation')
  if (form) {
    all[form] = t.normal
  }
  let inf = null;
  if (form !== 'Infinitive') {
    all['Infinitive'] = t.info('Infinitive')
  }
  return all
}

module.exports = conjugate

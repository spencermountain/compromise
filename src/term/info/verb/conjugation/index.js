'use strict';
//turn a verb into all it's forms
const to = {
  Actor: require('./toActor')
}

const conjugate = function(t) {
  let all = {}
  //first, get its current form
  let form = t.info('Conjugation')
  if (form) {
    all[form] = t.normal
  }
  if (form !== 'Infinitive') {
    all['Infinitive'] = t.info('Infinitive')
  }
  //ok, send this infinitive to all conjugators
  let inf = all['Infinitive'] || t.normal
  //to Actor
  if (!all.Actor) {
    all.Actor = to.Actor(inf)
  }

  return all
}

module.exports = conjugate

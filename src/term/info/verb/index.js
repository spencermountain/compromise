'use strict';
const predictForm = require('./predict')
const conjugate = require('./conjugation')
const toInfinitive = require('./toInfinitive')
const info = {

  //try to predict which form this verb is
  conjugation: (t) => {
    return predictForm(t)
  },
  infinitive: (t) => {
    return toInfinitive(t)
  },
  //return all forms of this verb
  conjugate: (t) => {
    return conjugate(t)
  },

  tense: (t) => {
    let tenses = {
      PresentTense: 'PresentTense',
      PastTense: 'PastTense',
      FutureTense: 'FutureTense',
      Infinitive: 'PresentTense',
      Gerund: 'PresentTense',
      Actor: 'PresentTense',
      PerfectTense: 'PastTense',
      Pluperfect: 'PastTense',
      FuturePerfect: 'FutureTense'
    };
    let keys = Object.keys(tenses)
    for (let i = 0; i < keys.length; i++) {
      if (t.pos[keys[i]]) {
        return tenses[keys[i]]
      }
    }
    return null
  }

}
module.exports = info

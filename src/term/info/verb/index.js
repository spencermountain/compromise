'use strict';
const predictForm = require('./predict')
const conjugate = require('./conjugation')
const components = require('./components')
const toInfinitive = require('./toInfinitive')
const info = {
  /** find the auxillary, root, and particle of this verb*/
  components: (t) => {
    return components(t)
  },
  /** try to predict which form this verb is */
  conjugation: (t) => {
    return predictForm(t)
  },
  /** return the main 'default' form of the verb*/
  infinitive: (t) => {
    return toInfinitive(t)
  },
  /** return all forms of this verb */
  conjugate: (t) => {
    return conjugate(t)
  },
  /** is it past/present/future tense */
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

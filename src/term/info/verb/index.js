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
  },

  /** look around for the auxillary terms before this, like 'would have had' */
  auxillaries: (t) => {
    //if this is an auxillary, return nothing
    if (t.is('Auxillary')) {
      return []
    }
    let arr = []
    let before = t.info('Before').slice(0, 4)
    for (let i = 0; i < before.length; i++) {
      if (before[i].is('Auxillary')) {
        arr.unshift(before[i]) //(before terms are reversed)
      } else if (before[i].is('Negation')) {
        continue
      } else {
        break
      }
    }
    return arr
  },

  /** find the term that reverses the meaning of this verb */
  negation: (t) => {
    //look at the words before
    let before = t.info('Before').slice(0, 3)
    for (let i = 0; i < before.length; i++) {
      if (before[i].normal === 'not' || before[i].silent_term === 'not') {
        return before[i]
      }
    }
    //look at the next word after - 'is not'
    let after = t.info('after')
    if (after[0] && after[0].normal === 'not') {
      return after[0]
    }
    return null
  }
}
module.exports = info

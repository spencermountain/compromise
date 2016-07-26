'use strict'

//is a normal 'Verb', also something more?
const advancedVerbs = {
  Infinitive: true,
  Gerund: true,
  PastTense: true,
  PresentTense: true,
  FutureTense: true,
  Pluperfect: true,
  FuturePerfect: true
}
const isNormalVerb = (t) => {
  let keys = Object.keys(advancedVerbs)
  for (let i = 0; i < keys.length; i++) {
    if (t.pos[keys[i]]) {
      return false
    }
  }
  return true
}

//methods to run, once a term is tagged
const wrestlePos = (t) => {

  //turn just 'Verb', into something more
  if (t.pos.Verb && isNormalVerb(t)) {
    let form = t.info('conjugation')
    t.tag(form, 'wrestle-conjugation')
  }

  //turn just 'Noun', into something more
  if (t.pos.Noun) {
    //turn 'Noun', into plural/singular
    if (!t.pos.Plural && !t.pos.Singular) {
      let inflection = 'Singular'
      if (t.info('isPlural')) {
        inflection = 'Plural'
      }
      t.tag(inflection, 'wrestle-pluralization')
    }
  }

  //find an unknown gender
  if (t.pos.Person) {
    if (!t.pos.MalePerson && !t.pos.FemalePerson) {
      let gender = t.info('gender')
      if (gender) {
        t.tag(gender, 'wrestle-pluralization')
      }
    }
  }
  return t
}

module.exports = wrestlePos

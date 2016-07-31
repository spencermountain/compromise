'use strict';
//

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

//turn just 'Verb', into something more
const wrestleVerb = function(t) {
  //make sure it's not a fancy verb already
  let keys = Object.keys(advancedVerbs)
  for (let i = 0; i < keys.length; i++) {
    if (t.pos[keys[i]]) {
      return t
    }
  }
  //determine this verb's conjugation
  let form = t.info('Conjugation')
  if (form) {
    t.tag(form, 'wrestle-conjugation')
  }
  return t
}

module.exports = wrestleVerb

'use strict';
//true/false methods for Verbs
const verb = {
  /** is this a word, like 'will have had', before another verb */
  auxillary: (t) => {
    const aux = {
      will: true,
      be: true,
      was: true,
      have: true,
      had: true
    }
    if (aux[t.normal] || aux[t.silent_term]) {
      return true
    }
    if (t.tag.Modal) {
      return true
    }
    return false
  }
}
module.exports = verb

import verbs from './verb.js'
import adjectives from './adjective.js'
import nouns from './noun.js'

// const setup = function (senses) {
// Object.keys(senses).forEach(k => {
//   const res = {
//     words: {},
//     fallback: null,
//   }
//   senses[k].forEach( o => {

//   })
//   senses[k] = res
// })
// return senses
// }

export default {
  four: {
    senses: {
      Noun: nouns,
      Verb: verbs,
      Adjective: adjectives,
    },
  },
}

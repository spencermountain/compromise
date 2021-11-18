import clues from './clues.js.js.js'
// import methods from '../../methods/index.js'
// import switches from './_data.js'
// import { unpack } from 'efrt'

// const toTitleCase = function (str) {
//   return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
// }
// const titleCase = function (obj) {
//   return Object.keys(obj).reduce((h, key) => {
//     let name = toTitleCase(key).replace(/tense$/, 'Tense')
//     name = toTitleCase(key).replace(/noun$/, 'Noun')
//     h[name] = obj[key]
//     return h
//   }, {})
// }

// // make a copy of nounVerb called 'presentPlural'
// const copySwitch = function (from) {
//   const presentPlural = Object.assign({}, from)
//   presentPlural.fallback = 'PresentTense'
//   let keys = ['beforeTags', 'afterTags', 'beforeWords', 'afterWords', 'ownTags']
//   keys.forEach(k => {
//     presentPlural[k] = Object.assign({}, from[k])
//     Object.keys(presentPlural[k]).forEach(key => {
//       presentPlural[k][key] = presentPlural[k][key] === 'Infinitive' ? 'PresentTense' : 'Plural'
//     })
//   })
//   let words = {}
//   Object.keys(presentPlural.words).forEach(str => {
//     words[str + 's'] = true
//   })
//   presentPlural.words = words
//   return presentPlural
// }

// // unpack our lexicon of ambiguous-words
// // (found in ./lib/switches/)
// // add compressed word-data
// Object.keys(switches).forEach(k => {
//   Object.keys(switches[k]).forEach(key => {
//     if (switches[k][key] !== '' && key !== 'fallback') {
//       switches[k][key] = unpack(switches[k][key])
//     }
//   })
//   switches[k].beforeTags = titleCase(switches[k].beforeTags)
//   switches[k].afterTags = titleCase(switches[k].afterTags)
//   switches[k].ownTags = titleCase(switches[k].ownTags)
// })

// switches.presentPlural = copySwitch(switches.nounVerb)

// // random ad-hoc changes  - 
// // 'was time' vs 'was working'
// switches.gerundNoun.beforeWords.was = 'Gerund'
// // 'waiting for'
// switches.gerundNoun.afterWords.for = 'Gerund'
// // she loves
// switches.presentPlural.beforeTags.Pronoun = 'PresentTense'
// // definetly warm
// switches.adjPresent.beforeTags.Adverb = 'Adjective'
// switches.adjPresent.beforeTags.Negative = 'Adjective'
// switches.adjPresent.beforeTags.Plural = 'Adjective'
// // Object.assign(switches.adjPresent.afterTags, { Determiner: 'Adjective', Adverb: 'Adjective', Conjunction: 'Adjective', Possessive: 'Adjective', })
// // switches.adjPresent.afterTags.Determiner = 'Adjective'
// // switches.adjPresent.afterTags.Adverb = 'Adjective'
// // switches.adjPresent.afterTags.Conjunction = 'Adjective'
// // switches.adjPresent.afterTags.Possessive = 'Adjective'
// switches.adjPresent.afterTags = {}
// switches.adjPresent.beforeWords.have = 'Adjective'
// switches.adjPresent.beforeWords.had = 'Adjective'
// switches.adjPresent.beforeWords.do = 'Adjective'
// switches.adjPresent.beforeWords.does = 'Adjective'
// switches.adjPresent.afterWords.from = 'Adjective'

// switches.adjGerund.beforeWords.is = 'Adjective'
// switches.adjGerund.beforeWords.was = 'Adjective'
// switches.adjGerund.beforeWords.be = 'Adjective'
// delete switches.nounVerb.afterTags.Noun

export default {}

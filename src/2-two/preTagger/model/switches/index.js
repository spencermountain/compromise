// import methods from '../../methods/index.js'
import switches from './_data.js'
import { unpack } from 'efrt'

const toTitleCase = function (str) {
  return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
}
const titleCase = function (obj) {
  return Object.keys(obj).reduce((h, key) => {
    h[toTitleCase(key)] = obj[key]
    return h
  }, {})
}

// unpack our lexicon of ambiguous-words
// (found in ./lib/switches/)
// add compressed word-data
Object.keys(switches).forEach(k => {
  Object.keys(switches[k]).forEach(key => {
    if (switches[k][key] !== '' && key !== 'fallback') {
      switches[k][key] = unpack(switches[k][key])
    }
  })
  switches[k].before = titleCase(switches[k].before)
  switches[k].after = titleCase(switches[k].after)
  switches[k].ownTags = titleCase(switches[k].ownTags)
})

// make a copy of nounVerb called 'presentPlural'
const presentPlural = Object.assign({}, switches.nounVerb)
presentPlural.fallback = 'PresentTense'
let keys = ['before', 'after', 'beforeWords', 'afterWords', 'ownTags']
keys.forEach(k => {
  presentPlural[k] = Object.assign({}, switches.nounVerb[k])
  Object.keys(presentPlural[k]).forEach(key => {
    presentPlural[k][key] = presentPlural[k][key] === 'Infinitive' ? 'PresentTense' : 'Plural'
  })
})
let words = {}
Object.keys(presentPlural.words).forEach(str => {
  words[str + 's'] = true
})
presentPlural.words = words
switches.presentPlural = presentPlural

export default switches

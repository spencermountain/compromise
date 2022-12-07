/* eslint-disable no-console, no-unused-vars */
import nlp from './src/four.js'
// import plg from './plugins/paragraphs/src/plugin.js'
// nlp.plugin(plg)
let txt = ''

// nlp.verbose('tagger')



txt = `the county fair was pretty wild until 1989. it went all night`
// txt = `there are three bedrooms and two bathrooms`
// txt = `all sales are final and quality checks are provided`
// txt = `all sales are final and provided for free`
txt = `the theatre was built in 1984 and completed in 2019`
txt = `he married john in September 1992`
txt = `after he married her in june 1882, he left town`
txt = `he was wild`

let doc = nlp(txt)
doc.debug('chunks')

let table = doc.facts()
table.debug()
console.dir(table.json(), { depth: 5 })


const menu = [
  {
    id: 'is-adj',
    verbs: ['be'],
    tense: null,
    obj: {
      noun: false,
      adjective: true,
    },
  },
  {
    id: 'made-date',
    verbs: ['build', 'construct', 'complete', 'make', 'finish'],
    tense: 'PastTense',
    obj: {
      person: false,
      place: false
    },
    mod: {
      types: ['in', 'during', 'on'],
      date: true
    }
  },
  {
    id: 'marriage',
    verbs: ['marry', 'wed'],
    tense: 'PastTense',
    mod: {
      types: ['in', 'during', 'on'],
      date: true
    },
    subj: {
      person: true
    },
    obj: {
      person: true
    }
  },
]


// doc.pickup('')
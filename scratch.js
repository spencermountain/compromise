/* eslint-disable no-console, no-unused-vars */
import nlp from './src/four.js'
// import plg from './plugins/dates/src/plugin.js'
// nlp.plugin(plg)

// nlp.verbose('tagger')


let doc = nlp('match one two bar three four five six')
doc.match('match !(foo|bar){0,3}').debug()

// console.log(nlp.parseMatch('match !(foo|bar){0,3}'))
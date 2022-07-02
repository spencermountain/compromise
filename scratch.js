/* eslint-disable no-console, no-unused-vars */
import nlp from './src/two.js'
// import plg from './plugins/dates/src/plugin.js'
// nlp.plugin(plg)

// nlp.verbose('tagger')

let txt = ''
let doc
doc = nlp('May, 2009...')
// doc.match('april').tag('Person')
doc.debug()
// doc.dates().debug()
// doc = doc.match('33 km').debug()

// doc = nlp('he sweetly sang').debug()
// doc.match('{sweet}').debug()
// console.log(nlp.parseMatch('{sweet/adj}'))


// doc = nlp.lazy('one two three. four five six. seven foo eight nine.', 'foo #Value')
// doc.debug()

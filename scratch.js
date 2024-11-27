/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
// import plg from './plugins/dates/src/plugin.js'
// nlp.plugin(plg)


// nlp('Will is an employee').debug()



const text = '- to the window'

// Throws an error, capturing group at beginning, replacing with an empty string
const doc1 = nlp(text).debug()
doc1.match('[to] the window', 0).replaceWith('by')
doc1.match('[by]', 0).replaceWith('')
doc1.all().debug()
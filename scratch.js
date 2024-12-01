/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
// import plg from './plugins/dates/src/plugin.js'
// nlp.plugin(plg)


// nlp('Will is an employee').debug()


let txt = ''
txt = `i sent the documents up the hill`
txt = `he would up stage his friend`
txt = `he couldn't off gas`
txt = `he got up over the hill`
txt = 'piled up over'
// text = ``
nlp(txt).debug()

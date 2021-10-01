/* eslint-disable no-console, no-unused-vars */
import nlp from './src/four.js'
// import nlp from './builds/compromise.cjs'

// nlp.verbose('tagger')

let doc = nlp(`four two five`)
let m = doc.eq(0) //.debug()
// console.log(m.pointer)
m.remove('two')
m.debug()
// m.all().debug()
// m.match('four five').debug()

// let text = 'he is really walking. he is nice'
// const doc = nlp(text)
// let res = doc.match('#Adverb').remove()
// doc.verbs().toPastTense()
// doc.verbs().toPresentTense()
// m.debug()

/*












*/

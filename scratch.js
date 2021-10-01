/* eslint-disable no-console, no-unused-vars */
import nlp from './src/four.js'
// import nlp from './builds/compromise.cjs'

// nlp.verbose('tagger')

let doc = nlp(`one two three. four two five`)
let m = doc.eq(1).clone()
m.remove('two').debug()

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

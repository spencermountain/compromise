/* eslint-disable no-console, no-unused-vars */
import nlp from './src/four.js'
// import nlp from './builds/compromise.cjs'

// nlp.verbose('tagger')

let doc = nlp.tokenize(`four two five`)
console.log(doc.eq(0).match('two'))
// let m = doc.eq(0)
// m.remove('two')
// m.debug()

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

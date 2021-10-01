/* eslint-disable no-console, no-unused-vars */
import nlp from './src/four.js'
// import nlp from './builds/compromise.cjs'

// nlp.verbose('tagger')

const doc = nlp('foo one two. one foo two. one two foo. foo.')
const res = doc.match('foo').remove()
// console.log(doc.document)
doc.debug()

// let text = 'he is really walking. he is nice'
// const doc = nlp(text)
// let res = doc.match('#Adverb').remove()
// doc.verbs().toPastTense()
// doc.verbs().toPresentTense()
// m.debug()

/*












*/

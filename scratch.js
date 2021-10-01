/* eslint-disable no-console, no-unused-vars */
import nlp from './src/four.js'
// import nlp from './builds/compromise.cjs'

// nlp.verbose('tagger')

// let doc = nlp('before during after')
// let before = doc.match('before')
// let after = doc.match('after')
// doc.remove(before)
// doc.remove(after)
// doc.debug()

// let text = `i will start looking`
let text = `he will be walking`
let doc = nlp(text)
doc.verbs().toPastTense()
// doc.verbs().toPresentTense()
doc.debug()

/*












*/

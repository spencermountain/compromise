/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
// import nlp from './builds/compromise.cjs'
// import text from '/Users/spencer/mountain/compromise/scripts/perf/flame/_sotu-text.js'

// nlp.verbose('tagger')




// bug!
// let doc = nlp(`extra. one two.`)
// doc.remove('extra')
// console.log(doc.text())

// let doc = nlp(`Pursuing a successful career, along with the usual social and financial advantages, will be easier this year `)
let doc = nlp(`all the days since december were really awful`)
// console.log(doc.verbs().json())
// console.log(doc.verbs().adverbs())
// let doc = nlp(`one two three`)
// doc.replace('two', 'foo bar')
// doc.debug()

// let doc = nlp(text)
doc.debug('chunks')
// doc.chunks().debug()
console.log('verb:')
doc.verbs().debug()
console.log('subj:')
doc.verbs().subjects().debug()
// console.log(doc.nouns().json())


// let r = nlp(`John Smith and Jack were walking`)
// let m = doc.verbs().match('.')
// console.log(m)


/*




(#Noun && @hasHyphen) #Verb







*/

/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
// import nlp from './builds/compromise.cjs'
// nlp.verbose('tagger')

// bug!
// let doc = nlp(`john walks`)
// let s = doc.sentences()
// s.toFutureTense().fullSentences()
// console.log(s.text())


let txt
// txt = `please go `

// let arr = [
//   // `Toronto`,
//   `delta`,
//   `farming`,
//   `Toronto`,
//   `Toronto marlies`,
// ]
// console.log(nlp.compile(arr))

// bug: doc-match issue
// txt = `clearly did suggest`
// let doc = nlp(txt)
// let vb = doc.verbs()
// let parsed = vb.parse()[0]
// parsed.auxiliary.debug()
// vb.match(parsed.auxiliary).debug()

// bug 1
// txt = `he out-lived`
// txt = `he out lived`
// txt = `pseudo clean`
// txt = `he was anti cleaning`
// // txt = `he was anti cleaning`
txt = 'the robber Captain carried a dagger under his garment.'
txt = 'poststructuralist [thought]'
// txt = `schools of thought`
// txt = `my friend's house`

txt = `advances are within reach.`
// txt = `A description, study or analysis of such rules`
// txt = `I wonder what fate is`
// txt = `Man, these are the best beers of our lives.`

// '^[#Infinitive] (#Adjective|#Adverb)?$'

// let doc = nlp(txt)
// doc.debug()


// AND issue:
// let doc = nlp('toronto and montreal. Sydney and Paris.')
// console.log(nlp.parseMatch('(#Place && #Noun)')[0].choices)
// let m = doc.match('(#Place && #Noun)').debug()
// a bunch of words we're expecting

nlp.typeahead(['milan', 'milwaukee'], { min: 1 })
// nlp.addWords({ swim: 'Verb' })
// nlp.typeahead(['swimsuit'])
nlp('mil').autoFill().debug()

/*










*/

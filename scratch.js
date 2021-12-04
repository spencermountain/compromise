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

// let lex = {
//   big: 'Size',
//   'big apple': 'Town'
// }
// console.log(nlp.model().one.lexicon == _nlp.model().one.lexicon)
// let _nlp = nlp.fork()
// nlp('the big apple', lex).debug()
// console.log(a.big, b.big)
// _nlp('the big apple').debug()

// insert punctuation issue
// let doc = nlp('one two. three four')
// doc.prepend('food')
// console.log(doc.text())



const doc = nlp('he is cool')
doc.verbs().toNegative()
doc.debug()
/*
  nlp.extend((Doc, world) => {
    world.addTags({
      Doctor: {
        isA: 'Person',
      },
      Surgeon: {
        isA: 'Doctor',
      },
    })
  })
  let doc = nlp('george is a person.')
  doc.match('george').tag('Surgeon')

*/


// nlp.parseMatch('#foo and')
// console.log(doc.methods.one.expandLexicon)
// console.log(doc.methods.two.expandLexicon)
// AND issue:
// let doc = nlp('toronto and montreal. Sydney and Paris.')
// console.log(nlp.parseMatch('(#Place && #Noun)')[0].choices)
// let m = doc.match('(#Place && #Noun)').debug()
// a bunch of words we're expecting

/*










*/

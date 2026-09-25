
import nlp from './src/three.js'
// import plg from './plugins/dates/src/plugin.js'
// nlp.plugin(plg)


// let out = nlp.testSpec(str, true)
// out.debug()

// let doc = nlp('john smith')
// doc.compute('tagRank')
// let out=doc.docs.map(ts => {
//   return ts.map(t => {
//     if (t.tagRank[0]) {
//       return `#${t.tagRank[0]}`
//     }
//     return  ''
//   }).join(' ')
// }).join('\n')
// console.log(out)

// #Expression!=#Negative
// She has no idea. {Noun,Vb,Negative,Noun}
// There are no seats left. {There,Vb,Negative,Noun,Vb}
// He has no money. {Noun,Vb,Negative,Noun}

// adverb
// We succeeded through working together. {Noun,Vb,Prep,Ger,Adv}


nlp.verbose(true)
// nlp(`When the rain stops, we will leave`).debug()


// nlp.testSpec('He was tired, so we stopped. {Noun,Vb,Adj,Conj,Noun,Vb}').debug()
let str = `Before the dog and the cat woke, she left. {Conj,Det,Noun,Conj,Det,Noun,Vb,Noun,Vb}`
let doc=nlp.testSpec(str)

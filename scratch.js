
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


// nlp.verbose(true)
// nlp(`When the rain stops, we will leave`).debug()


// nlp.testSpec('He was tired, so we stopped. {Noun,Vb,Adj,Conj,Noun,Vb}').debug()
let str=`The dog is nice. {Det,Noun,Vb,Adj}
The flowers bloomed in spring. {Det,Plural,Past,Prep,Noun}
this sentence has no tags. #that's fine

# block-comments are supported, too
Tony Hawk rides {Person|FirstName,Person|LastName,Pres} #has both tags`
let doc=nlp.testSpec(str)
doc.match('sentence has no tags').found //true

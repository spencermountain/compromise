
import nlp from './src/three.js'
// import plg from './plugins/dates/src/plugin.js'
// nlp.plugin(plg)

let str = `
john smith {Person, Person}
Why did the engine stop? {QuestionWord,Vb,Det,Singular,Inf}
When does the store open? {QuestionWord,Vb,Det,Singular,Inf}
When will the rain stop? {QuestionWord,Modal,Det,Noun,Inf}

`
nlp.testSpec(str, true)


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

// nlp.verbose(true)
// nlp('She has no idea.').debug()


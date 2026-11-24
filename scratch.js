import nlp from './src/three.js'
// let result = nlp('This is a "test". Hello "World."').quotations().out('text')
// console.log(result)

// nlp.verbose()
// nlp('the only painting').debug()

const txt = `The dog is nice. {Det,Noun,Vb,Adj}
The dog don't bark. {Det,Noun,Vb,Negative,Vb}
The dog's tail wagged. {Det,Noun,Noun,Vb}`

const doc = nlp.testSpec(txt, true, false)
console.log(doc)

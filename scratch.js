const nlp = require('./src/index')
// nlp.verbose(true)
// let txt = require('./scripts/test/speed/_sotu-text.js')
nlp.extend(require('./plugins/sentences/src'))

// let doc = nlp('i am being driven')
// doc.debug()
// let doc = nlp('he has been stalking his prey')
// 'Our pet alligator'
let doc = nlp('he should have been eating Gator Chow')

// let doc = nlp('Joelle bit her tongue instead of criticizing her prom date.')
// doc.sentences().toPastTense().debug()
// doc.sentences().toPresentTense().debug()
doc.sentences().toFutureTense().debug()

doc = nlp('I am being driven to madness.')
let res = doc.verbs().debug().conjugate()[0]
console.log(res)

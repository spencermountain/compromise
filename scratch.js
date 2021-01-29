const nlp = require('./src/index')
nlp.verbose(true)

//
//
//
//
//
//
//

let doc = nlp(`a priest`).debug()
// doc.match('#Determiner #Adjective (#Copula|#PastTense|#Auxiliary)').debug()
// doc.cache({ root: true })
// doc.match('~walk~ into').debug()

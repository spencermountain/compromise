var nlp = require('./src/index')
// nlp.verbose(true)
// nlp.extend(require('./plugins/values/src'))

// var doc = nlp(`jamie's run`)
// doc.debug()

let doc = nlp(`ümasdfs`)
doc.toTitleCase()
// let doc = nlp(`spencer is/was trying`)
doc.debug()
console.log(doc.text())
// 1. doc.has('#PresentTense') == true (choose first)
// 2. doc.has('#Verb') (only common tags)
// 3. doc.has('#PastTense') && doc.has('#PresentTense') :/

// doc = nlp(`spencer is/was trying`)
// 1b. doc.has('is') == true (choose first)
// 2b. doc.has('was') == true  (find both)
// 3b. doc.has('is') == false  (find none)

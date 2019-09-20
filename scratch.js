var nlp = require('./src/index')
// nlp.verbose(true)
// nlp.extend(require('./plugins/verbs/src'))
nlp.extend(require('./plugins/ngrams/src'))

var doc = nlp('i am in houston texas. i am a good person. so i think.')
let arr = doc.startgrams({})
console.log(arr)

const nlp = require('./src/index')
// nlp.verbose(true)
// nlp.extend(require('./plugins/numbers/src'))
// nlp.extend(require('./plugins/dates/src'))

let nlpObj = nlp('I love peaches. Yes I do. ')
const sen = nlpObj.sentences().data()
console.log(sen)

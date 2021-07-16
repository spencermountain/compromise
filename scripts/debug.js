import nlp from '../src/index.js'
const txt = process.argv.slice(2).join(' ')
console.log(`\n\n======== '${txt}' ======\n`)
nlp.verbose(true)

nlp(txt).debug()

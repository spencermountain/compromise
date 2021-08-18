import nlp from '../src/three.js'
const txt = process.argv.slice(2).join(' ')
console.log(`\n\n======== '${txt}' ======\n`) // eslint-disable-line
nlp.verbose(true)

nlp(txt).debug()

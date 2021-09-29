/* eslint-disable no-console, no-unused-vars */
import nlp from './src/four.js'

// nlp.verbose('tagger')

let text = 'cold demeanor'
// text = 'diet traps'
// text = 'tape measures'
// text = '#cool'
const doc = nlp(text)
doc.match('{cold} .').debug()

/*












*/

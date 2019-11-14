const nlp = require('./src/index')
// nlp.verbose(true)
nlp.extend(require('./plugins/syllables/src'))
// nlp.extend(require('./plugins/dates/src'))

/*
**'normal'** 
    *human-readable plaintext form*
  - normalized whitespace
  - normalized unicode
  - titlecase sentence beginning, uppercase acronyms
  - expanded contractions
  - hide semicolons, emdashes, or slashes (allow commas)
   {}

**'clean'** 
  *machine-scan plaintext form*
  - full lowercase
  - expand contractions
  - only punctuation is end-of-sentence. (no commas)
   {}

**'reduced'** 
  *machine-scan plaintext form*
  - no punctuation, or sentence delimiters.
  - no emoji
  - parentheses
  - quotations

**'root'** 
  *'stemmed' version. Not fully legible.*
  - all verbs to infinitive
  - all nouns to singular
  - no (unnecessary) adverbs
*/

let doc = nlp(`SPENCER's house (spencer)`)
doc = doc.terms().unique()
console.log(doc.text('reduced'))

// let doc = nlp(`My dog LOVES pizza, and grapes!!`)
// doc.debug()

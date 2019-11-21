
## compromise-how-it-works




## compromise-tagging


## compromise-cache



-------------

<!-- # .contractions()
calling `.contractions()` returns both contracted, and *possible contractions* as a list:
```js
r= nlp(`john is nice. john's cool.`)
r.contractions().out('array')
//['john is', 'john\'s']

r.contractions().expand()
// john is nice. john is cool.

r.contractions.contract()
// john's nice. john's cool.
``` -->



## Text output
there are 4 preset text outputs:

```js
const default = {
  whitespace: false,
  unicode: false,
  lowercase: false,
  titlecase: false,
  punctuation: false,
  acronyms: false,
  abbreviations: false,

  reduced:false,
  root:false,
  implicit: false,
}
```

**'text'**
    *a perfect copy of the input text* (default)
   {}

**'normal'** 
    *clean plaintext form for human-reading*
  - normalized whitespace
  - normalized unicode
  <!-- - titlecase sentence beginning, uppercase acronyms -->
  - expanded contractions
  - hide semicolons, emdashes, or slashes (allow commas)
   {}

**'clean'** 
  *human-readable, but grammatically incorrect*
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


## JSON output
```js
const default = {
  // text outputs
  text:true,
  reduced:false,
  normal:false,

  // phrase metadata
  trim:false, // ?
  offset:false, // character-position where this begins
  count:false, // frequency of this match in the document

  // each term
  terms:{
    text: true,
    normal: false,
    clean: false,
    implicit: false,
    
    tags: true,
    whitespace: false,
    id: false,
    offset:false,
    bestTag: false,

  }
}
```

## Normalize settings
```js
const default = {
  // light
  whitespace: true,
  unicode: true,
  punctuation: true,
  emoji: true,
  acronyms: true,
  abbreviations: true,

  // medium
  case: true,
  contractions: false,
  parentheses: false,
  quotations: false,
  adverbs: false,

  // heavy (lose legibility)
  possessives: false,
  verbs: false,
  nouns: false,
  honorifics: false,
}
```
#### 'light'
`{  whitespace: true, unicode: true, punctuation: true, emoji: true, acronyms: true, abbreviations: true }`

#### 'medium'
`{ case: true, contractions: false, parentheses: false, quotations: false, adverbs: false }`

#### 'heavy'
`{ possessives: false, verbs: false, nouns: false, honorifics: false }`


## Sort methods:

- **_'alpha'_** - [default] alphabetical order
- **_'index'_** - the 'chronological', or original document sort order
- **_'freq'_** - sort by # of duplicates in the document
- **_'wordcount'_** - sort by # of terms in each result
- **_'length'_** - sort by character counts of each result

## Match methods:

- **@hasQuote** - does it have a quotation symbol?
- **@hasComma** - does it have a comma?
- **@hasPeriod** - does it end in a period?
- **@hasExclamation** - does it end in an exclamation
- **@hasQuestionMark** - does it end with a question mark?
- **@hasEllipses** - is there a ... at the end?
- **@hasSemicolon** - is there a semicolon after this word?
- **@hasSlash** - is there a slash '/' in this word?
- **@hasHyphen** - a hyphen connects two words like-this
- **@hasDash** - a dash separates words - like that

- **@hasContraction** - is it multiple words combined?
- **@isAcronym** - does this term look like an acronym?
- **@isKnown** - does the term have at least one good tag?
- **@isUpperCase** - are all the (main) letters upper-case?
- **@isTitleCase** - is the first letter upper-case, and the remaining not?



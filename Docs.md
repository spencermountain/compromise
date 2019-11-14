## Text output
there are 4 preset text outputs:

```js
const default = {
  whitespace: true,
  unicode: true,
  case: true,
  punctuation: true,
  acronyms: true,
  abbreviations: true,

  reduced:true,
  root:true,
  implicit: true,
}
```

#### 'text'
a perfect copy of the input text (default)
#### 'normal'
normalized whitespace, case, unicode, punctuation
#### 'clean'
'normal' + lowercase, trimmed whitespace
#### 'reduced'
'clean' + contractions expanded.
#### 'root'
for machine-reading, inflected verbs, singular nouns. Like a 'stemmed' text.


## JSON output
```js
const default = {
  // text outputs
  text:true,
  reduced:false,
  normal:false,

  // phrase metadata
  trim:false, //?
  offset:false,
  frequency:false,

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
  case: true,
  whitespace: true,
  unicode: true,
  punctuation: true,
  emoji: true,
  acronyms: true,
  abbreviations: true,

  // medium
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
`{ case: true, whitespace: true, unicode: true, punctuation: true, emoji: true, acronyms: true, abbreviations: true }`

#### 'medium'
`{ contractions: false, parentheses: false, quotations: false, adverbs: false }`

#### 'heavy'
`{ possessives: false, verbs: false, nouns: false, honorifics: false }`


## Match methods:

- **@hasComma** - does it have a comma?
- **@hasPeriod** - does it end in a period?
- **@hasExclamation** - does it end in an exclamation
- **@hasQuestionMark** - does it end with a question mark?
- **@hasEllipses** - is there a ... at the end?
- **@hasSemicolon** - is there a semicolon after this word?
- **@hasSlash** - is there a slash after this word?
- **@hasContraction** - is it multiple words combined?
- **@isAcronym** - does this term look like an acronym?
- **@isKnown** - does the term have at least one good tag?
- **@isImplicit** - is this term implied by a contraction?
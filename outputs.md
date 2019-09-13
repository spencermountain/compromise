**.normalize()** options
```js
options = {
  case: true,
  whitespace: true,
  unicode: true,
  punctuation: true,

  contractions: false,

  adverbs: false,
  emoji: false,
  parentheses: false,
  quotations: false,
  possessives: false,

  verbs: false,
  nouns: false,
}
```

-------


**'text'**
    *exactly the same as input text*
   {}

**'normal'** 
    *human-readable plaintext form*
  - normalized whitespace
  - normalized unicode
  - titlecase sentence starting
  - expanded contractions
  - hide semicolons, emdashes, or slashes (allow commas)
   {}

**'clean'** 
  *machine-scan plaintext form*
  - full lowercase
  - only punctuation is end-of-sentence? (no commas)
   {}

**'simple'** - += contractions

**'reduced'** - += no adverbs, emoji, parentheses, quotations

**'root'** - += infinitive verbs, singular nouns
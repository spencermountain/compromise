hmmm:
  getPunctuation()
  setPunctuation()

  lump()?

  js array fns


---
### Breaking changes:
 
* remove `.flatten()` (anti-pattern)

* results of `.canbe()` are more like `.match()`

more consistent behaviour for `.replace('foo [bar]', 'baz')`

some cases like `.canbe()` where v11 results were mutable, but v12 are not mutating

cleaned-up various `.data()` results

removed no-longer-needed `prefix_` and `_suffix` operators from match syntax

stopped using `#Comma` pos-tag, for less denormalization

stopped parsing `#NumberRange`

improved handling of slashed terms - like `he is/was fun.`

* map/reduce/foreach/etc all loop over proper `Doc` objects, instead of an internal object
---

**non-breaking changes**

* cleaned-up internal handling of whitspace/punctuation
  
* better unicode-letter support in regexes

* adds `.matchOne()`
* adds `.freeze()`


jsdoc output:
`jsdoc src/** -t templates/haruki -d console`

generate typings file
`jsdoc -t node_modules/tsd-jsdoc/dist -r src/**/*.js`

type hints

`tsc --allowJs --checkJs --noEmit --target ES6 src/*.js`




## Subsets

### in main:

- contractions
  -expand/contract

- acronyms
  -stripPeriods/addPeriods

* verbs
  -conjugation/conjugate
  -isSingular/isPlural
  -isPositive/isNegative
  -toPast/toPresent/toFuture
  -asAdjective

* nouns
  -isplural/hasplural
  -toSingular/toPlural
  -toPossessive
  -articles

* adjectives
* adverbs
* parentheses
* quotations
* possessives

* hashtags
* phoneNumbers
* urls

### External libs:

`compromise-entity`

- people
  -firstName/lastName
  -pronoun

- organizations
- places
- topics

`compromise-number`
-toText/toNumber
-toCardinal/toOrdinal
-greaterThan/lessThan
-between/isEqual
-add/subtract/increment/decrement

`compromise-sentence`
-prepend/append
-toPast/toPresent/toFuture
-toNegative/toPositive
-toQuestion/toStatement

- questions
- statements

`compromise-date`

`compromise-term`

- terms

`compromise-ngram`
-unigrams/bigrams/trigrams
-startGrams/endGrams ?

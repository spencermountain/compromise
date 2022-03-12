# lib
* .compute()
* .forEach()
* .map() 
* .filter() 
* .find() 
* .some()
* .random()
* .all()
* .eq()
* .first()         
* .firstTerms()    
* .fullSentences() 
* .groups()        
* .is()            
* .last()
* .lastTerms()
* .none()
* .slice()         
* .termList()      
* .terms()
* .wordCount()

* .fullPointer
* .update()
* .toView()
* .fromText()
* .clone()

* .docs
* .pointer
* .methods
* .model
* .hooks
* .isView
* .found
* .length

# One

### Cache
* .compute('cache')
* .cache()
* .uncache()


### Change
* .compute('id')
* .toLowerCase()
* .toUpperCase()
* .toTitleCase()
* .toCamelCase()
* .insertAfter()
* .insertBefore()
* .append()
* .prepend()
* .insert()
* .replaceWith()
* .replace()
* .remove()
* .delete()
* .pre()
* .post()
* .trim()
* .hyphenate()
* .dehyphenate()
* .toQuotations()
* .toParentheses()
* .deHyphenate()
* .toQuotation()
* .unique()
* .reverse()
* .sort()
* .fork()
* .concat()


### Contraction-one
hooks: ['contractions']
* model.one.contractions

* .compute('contractions')


### Lexicon
hooks: ['lexicon']
* .compute('lexicon')


### Lookup
* .compile()
* .lookup()


### Match
* nlp.parseMatch()

* .matchOne()
* .match()
* .has()
* .if()
* .ifNo()
* .before()
* .after()
* .growLeft()
* .growRight()
* .grow()
* .splitOn()
* .splitBefore()
* .splitAfter()
* .split()


### Output
* .debug()
* .out()
* .text()
  * .text('normal')
  * .text('machine')
  * .text('root')
  * .text('implicit')
* .json()

### Pointers
* .union()
* .and()
* .intersection()
* .difference()
* .not()
* .complement()
* .settle()

### Tag
* model.one.tagSet
* nlp.addTags()

* .tag()
* .tagSafe()
* .unTag()
* .canBe()

### Tokenize
hooks: ['alias', 'machine', 'index']
* .compute('alias')
* .compute('normal')
* .compute('machine')
* .compute('freq')
* .compute('offset')
* .compute('index')
* .compute('wordCount')

### Typeahead
hooks: ['typeahead']
* nlp.typeahead()

* .compute('typeahead')
* .autoFill()

---
# Two
### Contraction-two
hooks: ['apostropheS']
* .compute('apostropheS')
* .contractions()
  * .contractions().expand()

### Post-tagger
hooks: ['postTagger']

*.confidence()

### Pre-tagger
hooks: ['preTagger']
* .compute('preTagger')
* .compute('tagRank')
* .compute('root')
* .compute('penn')

### Swap
* .swap('stroll', 'walk')

---
# Three
### Chunker
hooks: ['chunks']
* .compute('chunks')
.chunks()
.clauses()
.quotations()
.parentheses()

### Nouns
* .nouns()
  * .nouns().parse()
  * .nouns().json()
  * .nouns().isPlural()
  * .nouns().adjectives()
  * .nouns().toPlural()
  * .nouns().toSingular()
### Numbers
* .numbers()
  * .numbers().parse()
  * .numbers().get()
  * .numbers().json()
  * .numbers().isOrdinal()
  * .numbers().isCardinal()
  * .numbers().toNumber()
  * .numbers().toLocaleString()
  * .numbers().toText()
  * .numbers().toCardinal()
  * .numbers().toOrdinal()
  * .numbers().isEqual()
  * .numbers().greaterThan()
  * .numbers().lessThan()
  * .numbers().between()
  * .numbers().set()
  * .numbers().add()
  * .numbers().subtract()
  * .numbers().increment()
  * .numbers().decrement()
* .percentages()
* .money()
* .fractions()
  * .fractions().json()
### Redact
* .redact()

### Sentences
* .sentences()
  * .sentences().toPastTense()
  * .sentences().toPresentTense()
  * .sentences().toFutureTense()
  * .sentences().toInfinitive()
  * .sentences().toNegative()
* .questions()

### Topics
* .topics()
* .organizations()
* .people()
  * .people().parse()
  * .people().json()
* .places()

### Verbs
* .verbs()
  * .verbs().parse()
  * .verbs().json()
  * .verbs().subjects()
  * .verbs().isSingular()
  * .verbs().isPlural()
  * .verbs().isImperative()
  * .verbs().toInfinitive()
  * .verbs().toPresentTense()
  * .verbs().toPastTense()
  * .verbs().toFutureTense()
  * .verbs().toGerund()
  * .verbs().conjugate()
  * .verbs().isNegative()
  * .verbs().isPositive()
  * .verbs().toPositive()
  * .verbs().toNegative()

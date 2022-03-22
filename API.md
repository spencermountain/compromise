# lib
* nlp.tokenize()
* nlp.plugin()
* nlp.parseMatch()

* nlp.world()
* nlp.model()
* nlp.methods()
* nlp.hooks()
* nlp.verbose()
* nlp.version


# One
### API
* .found
* .docs
* .pointer
* .fullPointer
* .methods
* .model
* .hooks
* .isView
* .length

* .update()
* .toView()
* .fromText()
* .termList()   

* .compute()
* .clone()

### Loops
* .forEach()
* .map() 
* .filter() 
* .find() 
* .some()
* .random()

### Accessors
* .terms()
* .groups()     
* .eq()
* .first()         
* .last()
* .firstTerms()    
* .lastTerms()
* .slice()         
* .all()
* .fullSentences() 
* .none()
* .isDoc()            
* .wordCount()


### Match
* nlp.parseMatch()

* .match()
* .matchOne()
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

### Change
* .compute('id')
* .toLowerCase()
* .toUpperCase()
* .toTitleCase()
* .toCamelCase()

* .concat()

* .insertBefore()
* .insertAfter()

* .remove()

* .replace()
* .replaceWith()

* .unique()
* .reverse()
* .sort()

* .pre()
* .post()
* .trim()
* .hyphenate()
* .dehyphenate()
* .toQuotations()
* .toParentheses()

### Output
* .text()
* .json()
* .debug()
* .out()
* .html()
* .wrap()


### Pointers
* .union()
* .intersection()
* .not()
* .complement()
* .settle()

### Tag
* nlp.addTags()
* .compute('tagRank')

* .tag()
* .tagSafe()
* .unTag()
* .canBe()

### Contractions
* .compute('contractions')

### Tokenize
* .compute('alias')
* .compute('machine')
* .compute('normal')
* .compute('freq')
* .compute('offset')
* .compute('index')
* .compute('wordCount')

### Cache
* .compute('cache')
* .cache()
* .uncache()

### Lookup
* nlp.compile()
* .lookup()

### Typeahead
* nlp.typeahead()
* .compute('typeahead')

* .autoFill()

### Lexicon
* .compute('lexicon')
* nlp.addWords()


---

# Two
### Pre-tagger
* .compute('preTagger')
* .compute('root')
* .compute('penn')

### Contraction-two
* .compute('contractionTwo')
* .contractions()
  * .contractions().expand()
* .contract()

### Post-tagger
* .compute('postTagger')
* .confidence()


### Swap
* .swap()

---

# Three

### Chunker
* .compute('chunks')
.chunks()
.clauses()

### Normalize
.normalize()

### Redact
* .redact()

### Misc
.hyphenated()
.hashTags()
.emails()
.emoji()
.emoticons()
.atMentions()
.urls()
.pronouns()
.conjunctions()
.prepositions()
.honorifics()
.abbreviations()
.phoneNumbers()

.acronyms()
  .acronyms().strip()
  .acronyms().addPeriods()
.parentheses()
  .parentheses().strip()
.possessives()
  .possessives().strip()
.quotations()
  .quotations().strip()
.adjectives()
  .adjectives().json()
.adverbs()
  .adverbs().json()

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
  * .fractions().parse()
  * .fractions().get()
  * .fractions().json()
  * .fractions().toDecimal()
  * .fractions().toFraction()
  * .fractions().toOrdinal()
  * .fractions().toCardinal()
  * .fractions().toPercentage()

### Sentences
* .sentences()
  * .sentences().parse()
  * .sentences().json()
  * .sentences().toPastTense()
  * .sentences().toPresentTense()
  * .sentences().toFutureTense()
  * .sentences().toInfinitive()
  * .sentences().toNegative()
  * .sentences().toPositive()
  * .sentences().isQuestion()
  * .sentences().isExclamation()
  * .sentences().isStatement()
* .questions()


### Verbs
* .verbs()
  * .verbs().parse()
  * .verbs().json()
  * .verbs().subjects()
  * .verbs().adverbs()
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


### Topics
* .people()
  * .people().parse()
  * .people().json()
* .places()
* .organizations()
* .topics()

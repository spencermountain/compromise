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
* .compute()
* .forEach()
* .map() 
* .filter() 
* .find() 
* .some()
* .random()

* .termList()      
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

* .docs
* .pointer
* .methods
* .model
* .hooks
* .isView
* .found
* .length
* .fullPointer
* .update()
* .toView()
* .fromText()
* .clone()

### Change
* .compute('id')
* .toLowerCase()
* .toUpperCase()
* .toTitleCase()
* .toCamelCase()

* .concat()

* .insertAfter()
* .insertBefore()

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
* .deHyphenate()
* .toQuotation()

### Output
* .html()
* .json()
* .out()
* .debug()
* .text()
* .wrap()

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
* .compile()
* .lookup()

### Typeahead
* nlp.typeahead()

* .compute('typeahead')
* .autoFill()

### Lexicon
* .compute('lexicon')


---

# Two
### Pre-tagger
* .compute('preTagger')
* .compute('tagRank')
* .compute('root')
* .compute('penn')

### Contraction-two
* .compute('apostropheS')
* .contractions()
  * .contractions().expand()

### Post-tagger
* .compute('postTagger')
*.confidence()


### Swap
* .swap('stroll', 'walk')

---

# Three
### Chunker
* .compute('chunks')
.chunks()
.clauses()
.quotations()
.parentheses()

### Misc
### Normalize

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

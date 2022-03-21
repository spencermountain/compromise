# lib
* nlp.tokenize()
* nlp.plugin()
* nlp.parseMatch()
* nlp.compile()

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
* .concat()

### Output
* .debug()
* .out()
* .text()
  * .text('normal')
  * .text('machine')
  * .text('root')
  * .text('implicit')
* .json()

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

### Contractions
* .compute('contractions')

### Tokenize
* .compute('alias')
* .compute('normal')
* .compute('machine')
* .compute('freq')
* .compute('offset')
* .compute('index')
* .compute('wordCount')

### Cache
* .compute('cache')
* .cache()
* .uncache()

### Lookup
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

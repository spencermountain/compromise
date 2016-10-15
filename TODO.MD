
# top-level
###selections
* [ ] nlp.when()
* [ ] nlp.all()
* [ ] nlp.questions()
* [ ] nlp.statements()
* [ ] by tag - nlp.people()..

###inspection  (non-destructive)
* [ ] nlp.parse({})
* [ ] nlp.topk()
* [ ] nlp.ngram()

##destructive
* [ ] nlp.remove()
* [ ] nlp.replace()
* [ ] nlp.normalize({})

### conjugation wrapper
* [ ] nlp.toPast()
* [ ] nlp.toPresent()
* [ ] nlp.toFuture()

### negate wrapper
* [ ] nlp.opposite()

#subset fns (some destructive)
###noun
* [ ] nlp.nouns().parse()
* [ ] nlp.nouns().toPlural()
* [ ] nlp.nouns().toSingular()

###adj
* [ ] nlp.adjectives().parse()
* [ ] nlp.adjectives().stripAdverbs()
* [ ] nlp.adjectives().addAdverb()

###verb
* [ ] nlp.verbs().parse()
* [ ] nlp.verbs().conjugate()
* [ ] nlp.verbs().toNegative()
* [ ] nlp.verbs().toPositive()

###people
* [ ] nlp.people().parse()

###value
* [ ] nlp.values().parse()
* [ ] nlp.values().toNumeric()
* [ ] nlp.values().toTextual()
* [ ] nlp.values().toOrdinal()
* [ ] nlp.values().toCardinal()

###place
* [ ] nlp.places().parse()

###date
* [ ] nlp.dates().parse()

###contraction
* [ ] nlp.contractions().expand()
* [ ] nlp.contractions().contract()

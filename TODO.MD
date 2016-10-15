
# top-level
###selections  (non-destructive)
* [ ] when()
* [ ] all()
* [ ] questions()
* [ ] statements()
* [ ] by tag - people()..

###inspection  (non-destructive)
* [ ] parse({})
* [ ] topk()
* [ ] ngram()

##destructive
* [ ] remove()
* [ ] replace()
* [ ] normalize({})

### conjugation wrapper
* [ ] toPast()
* [ ] toPresent()
* [ ] toFuture()

### negate wrapper
* [ ] opposite()

#subset fns (some destructive)
###noun
* [ ] nouns().parse()
* [ ] nouns().toPlural()
* [ ] nouns().toSingular()

###adj
* [ ] adjectives().parse()
* [ ] adjectives().stripAdverbs()
* [ ] adjectives().addAdverb()

###verb
* [ ] verbs().parse()
* [ ] verbs().conjugate()
* [ ] verbs().toNegative()
* [ ] verbs().toPositive()

###people
* [ ] people().parse()

###value
* [ ] values().parse()
* [ ] values().toNumeric()
* [ ] values().toTextual()
* [ ] values().toOrdinal()
* [ ] values().toCardinal()

###place
* [ ] places().parse()

###date
* [ ] dates().parse()

###contraction
* [ ] contractions().expand()
* [ ] contractions().contract()

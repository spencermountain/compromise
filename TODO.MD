
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

###transform (destructive)
* [ ] remove()
* [ ] replace()
* [ ] normalize({})

### sentence conjugation (destructive)
* [ ] toPast()
* [ ] toPresent()
* [ ] toFuture()

### sentence inflection (destructive)
* [ ] toPlural()
* [ ] toSingular()

### sentence negation (destructive)
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


#Parser-Tagging

##organization-handling
* (federal|royal|national|regional|local|District)
* [groups] (of|du|de) #TitleCase
* #TitleCase [groups]
* air #Country
* #TitleCase (and|&) (son|sons|brothers|co)
* #Place stock? exchange
* #Place city? united? (sc|fc)
* fc #Place
* #Organization of #Place
* league of
* Cardiff University School of (Medicine|law)
* toronto college of art and design
* cardiff law school

##place-handling
* (Bay|gulf) of
* north atlantic ocean
* north thames river

// import nlp from '../../src/three.js'
import nlp from '../../types/three'

let doc = nlp('okay cool')
// lib

// ### Chunker
doc.compute('chunks')
doc.chunks()
doc.clauses()

// ### Misc
doc.acronyms()
doc.acronyms().strip()
doc.parentheses()
doc.parentheses().strip()
doc.possessives()
doc.possessives().strip()
doc.quotations()
doc.quotations().strip()
doc.adjectives()
doc.adjectives().json()
doc.adverbs()
doc.adverbs().json()
doc.hyphenated()
doc.adjectives()
doc.hashTags()
doc.emails()
doc.emoji()
doc.emoticons()
doc.atMentions()
doc.urls()
doc.pronouns()
doc.conjunctions()
doc.prepositions()
doc.abbreviations()
doc.honorifics()


// ### Normalize
doc.normalize()

// ### Nouns
doc.nouns()
doc.nouns().parse()
doc.nouns().json()
doc.nouns().isPlural()
doc.nouns().adjectives()
doc.nouns().toPlural()
doc.nouns().toSingular()

// ### Numbers
doc.numbers()
doc.numbers().parse()
doc.numbers().get()
doc.numbers().json()
doc.numbers().isOrdinal()
doc.numbers().isCardinal()
doc.numbers().toNumber()
doc.numbers().toLocaleString()
doc.numbers().toText()
doc.numbers().toCardinal()
doc.numbers().toOrdinal()
doc.numbers().isEqual()
doc.numbers().greaterThan()
doc.numbers().lessThan()
doc.numbers().between()
doc.numbers().set()
doc.numbers().add()
doc.numbers().subtract()
doc.numbers().increment()
doc.numbers().decrement()
doc.percentages()
doc.money()
doc.fractions()
doc.fractions().parse()
doc.fractions().get()
doc.fractions().json()
doc.fractions().toDecimal()
doc.fractions().toFraction()
doc.fractions().toOrdinal()
doc.fractions().toCardinal()
doc.fractions().toPercentage()

// ### Redact
doc.redact()

// ### Sentences
doc.sentences()
doc.sentences().json()
doc.sentences().toPastTense()
doc.sentences().toPresentTense()
doc.sentences().toFutureTense()
doc.sentences().toInfinitive()
doc.sentences().toNegative()
doc.questions()

// ### Topics
doc.topics()
doc.organizations()
doc.people()
doc.people().parse()
doc.people().json()
doc.places()

// ### Verbs
doc.verbs()
doc.verbs().parse()
doc.verbs().json()
doc.verbs().subjects()
doc.verbs().isSingular()
doc.verbs().isPlural()
doc.verbs().isImperative()
doc.verbs().toInfinitive()
doc.verbs().toPresentTense()
doc.verbs().toPastTense()
doc.verbs().toFutureTense()
doc.verbs().toGerund()
doc.verbs().conjugate()
doc.verbs().isNegative()
doc.verbs().isPositive()
doc.verbs().toPositive()
doc.verbs().toNegative()





/*
nlp.tokenize()
nlp.plugin()
nlp.parseMatch()

nlp.world()
nlp.model()
nlp.methods()
nlp.hooks()
nlp.verbose()
nlp.version

// API
doc.compute()
doc.forEach()
doc.map()
doc.filter()
doc.find()
doc.some()
doc.random()

doc.termList()
doc.terms()
doc.groups()
doc.eq()
doc.first()
doc.last()
doc.firstTerms()
doc.lastTerms()
doc.slice()
doc.all()
doc.fullSentences()
doc.none()
doc.isDoc()
doc.wordCount()

doc.docs
doc.pointer
doc.methods
doc.model
doc.hooks
doc.isView
doc.found
doc.length
doc.fullPointer
doc.update()
doc.toView()
doc.fromText()
doc.clone()

// Change
doc.compute('id')
doc.toLowerCase()
doc.toUpperCase()
doc.toTitleCase()
doc.toCamelCase()

doc.concat()

doc.insertAfter()
doc.insertBefore()

doc.remove()

doc.replace()
doc.replaceWith()

doc.unique()
doc.reverse()
doc.sort()

doc.pre()
doc.post()
doc.trim()
doc.hyphenate()
doc.dehyphenate()
doc.toQuotations()
doc.toParentheses()
doc.deHyphenate()
doc.toQuotation()

// Output
doc.html()
doc.json()
doc.out()
doc.debug()
doc.text()
doc.wrap()

// Match
nlp.parseMatch()

doc.match()
doc.matchOne()
doc.has()
doc.if()
doc.ifNo()

doc.before()
doc.after()
doc.growLeft()
doc.growRight()
doc.grow()

doc.splitOn()
doc.splitBefore()
doc.splitAfter()

// Pointers
doc.union()
doc.intersection()
doc.not()
doc.complement()
doc.settle()

// Tag
nlp.addTags()
doc.compute('tagRank')

doc.tag()
doc.tagSafe()
doc.unTag()
doc.canBe()

// Contractions
doc.compute('contractions')

// Tokenize
doc.compute('alias')
doc.compute('machine')
doc.compute('normal')
doc.compute('freq')
doc.compute('offset')
doc.compute('index')
doc.compute('wordCount')

// Cache
doc.compute('cache')
doc.cache()
doc.uncache()

// Lookup
nlp.compile()
doc.compile()
doc.lookup()

// Typeahead
nlp.typeahead()
doc.compute('typeahead')

doc.autoFill()

// Lexicon
doc.compute('lexicon')
nlp.addWords()
*/

// import nlp from '../../src/three.js'
import nlp from '../../types/one'

let doc = nlp('okay cool')

// ### Lib
nlp.tokenize('adf')
nlp.plugin({})
nlp.parseMatch()

nlp.world()
nlp.model()
nlp.methods()
nlp.hooks()
nlp.verbose()
nlp.version

// ### API
doc.compute('')
doc.forEach(s => s)
doc.map(s => s)
doc.filter(s => s.found)
doc.find(s => s.found)
doc.some(s => s.found)
doc.random()

doc.termList()
doc.terms()
doc.groups()
doc.eq(3)
doc.first()
doc.last()
doc.firstTerms()
doc.lastTerms()
doc.slice(3)
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
doc.update(null)
doc.toView(null)
doc.fromText('')
doc.clone()

// ### Change
doc.compute('id')
doc.toLowerCase()
doc.toUpperCase()
doc.toTitleCase()
doc.toCamelCase()

doc.concat('')

doc.insertAfter('')
doc.insertBefore('')

doc.remove('')

doc.replace('', '')
doc.replaceWith('')

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

// ### Output
doc.html({})
doc.json()
doc.out()
doc.debug()
doc.text()
doc.wrap({})

// ### Match
nlp.parseMatch()

doc.match('')
doc.matchOne('')
doc.has('')
doc.if('')
doc.ifNo('')

doc.before('')
doc.after('')
doc.growLeft('')
doc.growRight('')
doc.grow('')

doc.splitOn()
doc.splitBefore()
doc.splitAfter()

// ### Pointers
doc.union('')
doc.intersection('')
doc.not('')
doc.complement('')
doc.settle('')

// ### Tag
nlp.addTags({})
doc.compute('tagRank')

doc.tag('')
doc.tagSafe('')
doc.unTag('')
doc.canBe('')

// ### Contractions
doc.compute('contractions')

// ### Tokenize
doc.compute('alias')
doc.compute('machine')
doc.compute('normal')
doc.compute('freq')
doc.compute('offset')
doc.compute('index')
doc.compute('wordCount')

// ### Cache
doc.compute('cache')
doc.cache()
doc.uncache()

// ### Lookup
nlp.compile([''])
doc.lookup({})

// ### Typeahead
nlp.typeahead({})
doc.compute('typeahead')
doc.autoFill()

// ### Lexicon
doc.compute('lexicon')
nlp.addWords({})





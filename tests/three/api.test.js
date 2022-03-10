import test from 'tape'
import nlp from './_lib.js'
const here = '[three/api] '

test('api:', function (t) {
  let arr = [
    `He's really good. we were walking. Tony Hawk's swimming pool will dry-up.`,
    '',
    '...........?',
  ]
  arr.forEach(str => {
    let doc = nlp(str)
    // lib
    doc.forEach((s) => s)
    doc = doc.map(s => s)
    doc = doc.filter(s => s)
    doc.find(s => s)
    doc.some(s => s)
    doc.random()
    doc.all()
    doc.eq(0)
    doc.first()
    doc.firstTerms()
    doc.fullSentences()
    doc.groups()
    doc.is()
    doc.last()
    doc.lastTerms()
    doc.none()
    doc.slice()
    doc.termList()
    doc.terms()
    doc.wordCount()
    doc.update()
    doc.toView()
    doc.fromText()
    doc.clone()
    doc.fullPointer
    doc.docs
    doc.pointer
    doc.methods
    doc.model
    doc.hooks
    doc.isView
    doc.found
    doc.length

    // One
    doc.compute('id')
    doc.toLowerCase()
    doc.toUpperCase()
    doc.toTitleCase()
    doc.toCamelCase()
    doc.insertAfter('asdf')
    doc.insertBefore('boo')
    doc.append('foo')
    doc.prepend('foo')
    doc.insert('bar')
    // doc.replaceWith('asf')
    doc.replace('m', 'woo')
    doc.remove('foo')
    doc.delete('bar')
    doc.pre(' ')
    doc.post(' ')
    doc.trim()
    doc.hyphenate()
    doc.dehyphenate()
    doc.toQuotations()
    doc.toParentheses()
    doc.deHyphenate()
    doc.toQuotation()
    doc.unique()
    doc.reverse()
    doc.sort()
    // doc.fork()
    doc.concat()

    doc.compute('contractions')
    doc.compute('lexicon')
    doc.lookup(['blue jays', 'farmer'])

    doc.matchOne('#Foo')
    doc.match('#Foo')
    doc.has('#Foo')
    doc.if('#Foo')
    doc.ifNo('#Foo')
    doc.before('#Foo')
    doc.after('#Foo')
    doc.growLeft('#Foo')
    doc.growRight('#Foo')
    doc.grow('#Foo')
    doc.splitOn('#Foo')
    doc.splitBefore('#Foo')
    doc.splitAfter('#Foo')
    doc.split('#Foo')

    doc.out()
    doc.text()
    doc.text('normal')
    doc.text('machine')
    doc.text('root')
    doc.text('implicit')
    doc.json()

    doc.union('blah')
    doc.and('blah')
    doc.intersection('blah')
    doc.difference('blah')
    doc.not('blah')
    doc.complement('blah')
    doc.settle('blah')

    doc.tag('Foo')
    doc.tagSafe('Foo')
    doc.unTag('Foo')
    doc.canBe('Foo')

    doc.compute('alias')
    doc.compute('normal')
    doc.compute('machine')
    doc.compute('freq')
    doc.compute('offset')
    doc.compute('index')
    doc.compute('wordCount')

    doc.compute('typeahead')
    doc.autoFill()


    // Two
    doc.compute('apostropheS')
    doc.contractions()
    doc.contractions().expand()

    doc.confidence()

    doc.compute('preTagger')
    doc.compute('tagRank')
    doc.compute('root')
    doc.compute('penn')


    // Three
    doc.compute('chunks')
    doc.chunks()
    doc.clauses()
    doc.quotations()
    doc.parentheses()

    doc.nouns().parse()
    doc.nouns().json()
    doc.nouns().isPlural()
    doc.nouns().adjectives()
    doc.nouns().toPlural()
    doc.nouns().toSingular()
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
    doc.percentages().json()
    doc.money().json()
    doc.fractions().json()

    doc.redact()

    doc.sentences().toPastTense()
    doc.sentences().toPresentTense()
    doc.sentences().toFutureTense()
    doc.sentences().toInfinitive()
    doc.sentences().toNegative()
    doc.questions()

    doc.topics()
    doc.organizations()
    doc.people().parse()
    doc.people().json()
    doc.places()

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
    t.ok(doc.json(), here + str)
  })
  t.end()
})

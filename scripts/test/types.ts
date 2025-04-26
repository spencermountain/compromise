// a smoke-test for our typescipt typings
import nlp from '../../'
import tape from 'tape'
import stats, { StatsMethods } from '../../plugins/stats'
import dates, { DatesMethods } from '../../plugins/dates'
import speech, { SpeechMethods } from '../../plugins/speech'
import speed, { SpeedMethods } from '../../plugins/speed'
import wiki, { WikiMethods } from '../../plugins/wikipedia'
nlp.plugin(stats)
nlp.plugin(dates)
nlp.plugin(speech)
nlp.plugin(speed)
nlp.plugin(wiki)

console.log('\n 🥗  - running types-test..\n')

tape('misc functions', function (t) {
  let doc = nlp('John and Joe walked to the store')
  let m = doc.filter(s => s.found)
  const b = doc.map(s => s)
  doc.forEach((s) => s)
  const o = doc.find(s => s.found)
  m = doc.some(s => s.found)
  m = doc.random()
  m = doc.all()
  m = doc.eq(0)
  m = doc.first()
  m = doc.firstTerms()
  m = doc.fullSentences()
  m = doc.last()
  m = doc.lastTerms()
  m = doc.none()
  m = doc.slice(0, 1)
  m = doc.terms()
  m = doc.update([])
  m = doc.toView([])
  m = doc.fromText('')
  m = doc.clone()
  const obj = doc.groups()
  let arr = doc.termList()
  const c = doc.wordCount()
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
  // change
  m = doc.toLowerCase()
  m = doc.toUpperCase()
  m = doc.toTitleCase()
  m = doc.toCamelCase()
  m = doc.insertAfter('asdf')
  m = doc.insertBefore('boo')
  m = doc.append('foo')
  m = doc.prepend('foo')
  m = doc.insert('bar')
  m = doc.match('flood').replaceWith('asf')
  m = doc.replace('m', 'woo')
  m = doc.remove('foo')
  m = doc.delete('bar')
  m = doc.pre(' ')
  m = doc.post(' ')
  m = doc.trim()
  m = doc.hyphenate()
  m = doc.dehyphenate()
  m = doc.toQuotations()
  m = doc.toParentheses()
  m = doc.deHyphenate()
  m = doc.toQuotation()
  m = doc.unique()
  m = doc.reverse()
  m = doc.sort()
  m = doc.concat(doc.none())
  // doc.fork()

  doc.compute('contractions')
  doc.compute('lexicon')
  doc.lookup(['blue jays', 'farmer'])

  // match
  m = doc.matchOne('#Foo')
  m = doc.match('#Foo')
  const bool = doc.has('#Foo')
  m = doc.if('#Foo')
  m = doc.ifNo('#Foo')
  m = doc.before('#Foo')
  m = doc.after('#Foo')
  m = doc.growLeft('#Foo')
  m = doc.growRight('#Foo')
  m = doc.grow('#Foo')
  m = doc.splitOn('#Foo')
  m = doc.splitBefore('#Foo')
  m = doc.splitAfter('#Foo')
  m = doc.split('#Foo')

  // output
  const res = doc.out()
  let txt = doc.text()
  txt = doc.text('normal')
  txt = doc.text('machine')
  txt = doc.text('root')
  txt = doc.text('implicit')
  txt = doc.json()

  // sets
  m = doc.union('blah')
  m = doc.and('blah')
  m = doc.intersection('blah')
  m = doc.difference('blah')
  m = doc.not('blah')
  m = doc.complement('blah')
  m = doc.settle('blah')

  m = doc.tag('Foo')
  m = doc.tagSafe('Foo')
  m = doc.unTag('Foo')
  m = doc.canBe('Foo')

  doc.compute('alias')
  doc.compute('normal')
  doc.compute('machine')
  doc.compute('freq')
  doc.compute('offset')
  doc.compute('index')
  doc.compute('wordCount')

  doc.compute('typeahead')
  doc.autoFill()

  // sweep
  const matches = [
    { match: '2nd quarter of? 2022', tag: 'TimePeriod' },
    { match: '(from|by|before) now', tag: 'FooBar' },
  ]
  const net = nlp.buildNet(matches)
  doc = nlp(`so good by now. woo hoo before now. in the 2nd quarter 2022`)
  const sr = doc.sweep(net)

  // lazy
  doc = nlp.lazy('hello', 'foo')

  // Two
  doc.compute('contractionTwo')
  m = doc.contractions()
  m = doc.contractions().expand()

  doc.confidence()

  doc.compute('preTagger')
  doc.compute('tagRank')
  doc.compute('root')
  doc.compute('penn')

  m = doc.swap('rock', 'stone', '#Noun')


  // Three
  doc.compute('chunks')
  m = doc.chunks()
  m = doc.clauses()

  // nouns
  let tmp = doc.nouns().parse()
  arr = doc.nouns().json()
  let noun = doc.nouns().isPlural()
  noun = doc.nouns().adjectives()
  noun = doc.nouns().toPlural()
  noun = doc.nouns().toSingular()
  // numbers
  tmp = doc.numbers().parse()
  doc.numbers().get()
  arr = doc.numbers().json()
  let num = doc.numbers().isOrdinal()
  num = doc.numbers().isCardinal()
  num = doc.numbers().toNumber()
  num = doc.numbers().toLocaleString()
  num = doc.numbers().toText()
  num = doc.numbers().toCardinal()
  num = doc.numbers().toOrdinal()
  num = doc.numbers().isEqual()
  num = doc.numbers().greaterThan(3)
  num = doc.numbers().lessThan(3)
  num = doc.numbers().between(3, 4)
  num = doc.numbers().set(2)
  num = doc.numbers().add(3)
  num = doc.numbers().subtract(2)
  num = doc.numbers().increment()
  num = doc.numbers().decrement()
  num = doc.percentages().json()
  num = doc.money().json()
  num = doc.fractions().json()

  // sentences
  let s = doc.sentences().toPastTense()
  s = doc.sentences().toPresentTense()
  s = doc.sentences().toFutureTense()
  s = doc.sentences().toInfinitive()
  s = doc.sentences().toNegative()
  s = doc.questions()

  // verbs
  // arr = doc.verbs().parse()
  arr = doc.verbs().json()
  const sj = doc.verbs().subjects()
  let vb = doc.verbs().isSingular()
  vb = doc.verbs().isPlural()
  vb = doc.verbs().isImperative()
  vb = doc.verbs().toInfinitive()
  vb = doc.verbs().toPresentTense()
  vb = doc.verbs().toPastTense()
  vb = doc.verbs().toFutureTense()
  vb = doc.verbs().toGerund()
  vb = doc.verbs().conjugate()
  vb = doc.verbs().isNegative()
  vb = doc.verbs().isPositive()
  vb = doc.verbs().toPositive()
  vb = doc.verbs().toNegative()

  // misc
  m = doc.redact()
  m = doc.topics()
  m = doc.organizations()
  tmp = doc.people().parse()
  arr = doc.people().json()
  m = doc.places()

  m = doc.quotations()
  m = doc.quotations().strip()
  m = doc.parentheses()
  m = doc.parentheses().strip()
  m = doc.possessives()
  m = doc.possessives().strip()

  t.ok(true)
  t.end()
})

tape('plugin-date', function (t) {
  const doc = nlp<DatesMethods>('foo bar baz')
  const a = doc.dates()
  const b = doc.times()
  const c = doc.durations()

  let m = doc.dates().match('foo')
  m = doc.dates().format('foo')
  const arr = doc.dates().get()
  // doc.dates().floob()
  // doc.floob()
  t.end()
})

tape('plugin-speech', function (t) {
  const doc = nlp<SpeechMethods>('foo bar baz')
  let arr = doc.syllables()
  arr = doc.soundsLike()
  t.end()
})

tape('plugin-speed', function (t) {
  const doc = nlp<SpeedMethods>('foo bar')
  // nlp.workerPool()
  doc.match('foo')
  t.end()
})

tape('plugin-stats', function (t) {
  const doc = nlp<StatsMethods>('foo bar baz. foo')
  let arr = doc.ngrams()
  arr = doc.ngrams()
  arr = doc.unigrams()
  arr = doc.bigrams()
  arr = doc.trigrams()
  arr = doc.startgrams()
  arr = doc.endgrams()
  arr = doc.edgegrams()
  const res = doc.tfidf()
  t.end()
})

tape('plugin-wikipedia', function (t) {
  const doc = nlp<WikiMethods>('foo bar baz. foo')
  const wp = doc.wikipedia()
  t.end()
})


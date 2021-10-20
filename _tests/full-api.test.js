const test = require('tape')
const nlp = require('./_lib') // eslint-disable-line

//run every method once, and check against runtime errors
test('constructor api', function (t) {
  const fns = {
    tokenize: '()=>{ nlp.tokenize("you\'re sure you haven\'t just made thousands of mistakes?") }',
    extend: "()=>{ nlp.extend((Doc, world)=>world.addWords({bort:'FirstName'})) }",
    clone: "()=>{ let b=nlp.clone(); b.extend((Doc, world)=>{world.addWords({ 'a hoy hoy' : 'Greeting'})}) }",
    // load: "()=>{ let json=nlp('Tony Hawk').export();nlp.load(json).match('#Person') }",
    verbose: "()=>{ nlp.verbose(false);nlp('I am the very model of a modern Major-General') }",
    version: '()=>{ nlp.version}',
  }
  Object.keys(fns).forEach(k => {
    t.doesNotThrow(eval(fns[k]), k)
  })
  t.end()
})

test('utils api', function (t) {
  const fns = {
    all: "()=>{ nlp('this is yelling').match('#Verb').toTitleCase().all().text() }",
    found: "()=>{ nlp('oh say can you see?').match('see').found }",
    parent: '()=>{  }',
    parents: '()=>{  }',
    tagger: '()=>{  }',
    wordCount: '()=>{  }',
    length: "()=>{ nlp('jackie kennedy and aristotle onassis').match('#Person+').length }",
    clone: "()=>{ nlp('would somebody please think of the children').clone().toUpperCase().parent().text() }",
    cache: "()=>{ let doc=nlp(\"I'm looking for Amanda Hugginkiss\").cache({root:true});doc.match('~look~') }",
    uncache: '()=>{ let doc=nlp("urine-soaked hell-hole").uncache();doc.tag("Insult") }',
  }
  Object.keys(fns).forEach(k => {
    t.doesNotThrow(eval(fns[k]), k)
  })
  t.end()
})

test('accessors api', function (t) {
  const fns = {
    first: '()=>{  }',
    last: '()=>{  }',
    slice: "()=>{ nlp('Homer, have you been eating that sandwich again?').terms().slice(0, 3).text() }",
    eq: '()=>{  }',
    firstTerm: '()=>{  }',
    lastTerm: '()=>{  }',
    termList: '()=>{  }',
  }
  Object.keys(fns).forEach(k => {
    t.doesNotThrow(eval(fns[k]), k)
  })
  t.end()
})

test('match api', function (t) {
  const fns = {
    match: "()=>{ nlp('we understand, we are from the land of chocolate.').match('land of #Noun').text() }",
    not: "()=>{ nlp('wait, there’s a new mexico?').match('#Place').not('new').text() }",
    matchOne: '()=>{  }',
    if: "()=>{ nlp('We’re here, we’re clear, we don’t want anymore bears.').clauses().if('anymore').text() }",
    ifNo: "()=>{ nlp('We’re here, we’re clear, we don’t want anymore bears.').clauses().ifNo('anymore').text() }",
    has: "()=>{ nlp('I am the very model of a modern Major-General').has('#Pronoun') }",
    lookBehind: '()=>{  }',
    lookAhead: '()=>{  }',
    before: "()=>{ nlp('one two three four five').before('three').text() }",
    after: "()=>{ nlp('one two three four five').after('three').text() }",
    lookup: "()=>{ nlp('chocolate microscopes? double guitars?').lookup(['double guitars']).length }",
  }
  Object.keys(fns).forEach(k => {
    t.doesNotThrow(eval(fns[k]), k)
  })
  t.end()
})

test('case api', function (t) {
  const fns = {
    toUpperCase: "()=>{ nlp('Dental plan. Lisa needs braces.').match('dental .').toUpperCase().text() }",
    toLowerCase: "()=>{ nlp('Careful! They’re RUFFLED!!').toLowerCase().text() }",
    toTitleCase: "()=>{ nlp('jupiter, pluto and mars').match('#Noun').toTitleCase().all().text() }",
    toCamelCase: "()=>{ nlp('natural language processing').toCamelCase().text() }",
  }
  Object.keys(fns).forEach(k => {
    t.doesNotThrow(eval(fns[k]), k)
  })
  t.end()
})

test('whitespace api', function (t) {
  const fns = {
    pre: '()=>{ nlp("we\'re here. we\'re clear. we don\'t want anymore bears.").pre("  ") }',
    post: "()=>{ nlp(\"we're here. we're clear. we don't want anymore bears.\").post('!') }",
    trim: "()=>{ nlp(' Lenny and Carl ').match('#Person').trim().text() }",
    hyphenate: "()=>{ nlp('natural language processing').hyphenate().text() }",
    dehyphenate: "()=>{ nlp('natural-language processing').dehyphenate().text() }",
  }
  Object.keys(fns).forEach(k => {
    t.doesNotThrow(eval(fns[k]), k)
  })
  t.end()
})

test('tag api', function (t) {
  const fns = {
    tag:
      "()=>{ nlp('Michael Apple ate a delicious apple.').match('#FirstName apple').tag('Person').all().match('#Person+').text() }",
    tagSafe: '()=>{  }',
    unTag:
      "()=>{ nlp('they made a catch & scored a run').match('(run|catch)').unTag('#Verb').all().match('#Verb').out('array') }",
    canBe: "()=>{ nlp('it’s fusilli jerry!').canBe('Person').text() }",
  }
  Object.keys(fns).forEach(k => {
    t.doesNotThrow(eval(fns[k]), k)
  })
  t.end()
})

test('loops api', function (t) {
  const fns = {
    map: "()=>{ nlp('yahoo serious festival').terms().map((m)=> m.toUpperCase()).text()     }",
    forEach: "()=>{ nlp('Oh, no! Bette Midler!').match('#Person+').forEach((m,i)=> m.text())  }",
    filter: "()=>{ nlp('Hey, anymore arboretum’s around here?').terms().filter(m => m.has('#Plural') ).length    }",
    find:
      "()=>{   nlp('Always do the opposite of what bart says')    .terms()    .find(t => t.out('normal').match(/b[ao]rt/))    .text() }",
    some: "()=>{ nlp('Don’t make me run, I’m full of chocolate!').terms().some(m => m.out('normal')==='run' )}",
    random: "()=>{ nlp('one two three four').terms().random(2).out('array')    }",
  }
  Object.keys(fns).forEach(k => {
    t.doesNotThrow(eval(fns[k]), k)
  })
  t.end()
})

test('insert api', function (t) {
  const fns = {
    replaceWith: "()=>{ nlp('it was the worst of times').match('worst').replaceWith('blurst', true).all().text() }",
    replace: "()=>{ nlp('trust me folks, big league.').replace('big league','bigly').all().text() }",
    delete: "()=>{ nlp('you don’t win friends with salad').delete('do not').text() }",
    append: "()=>{ nlp('i know so many words').insertAfter('bigly').all().text() }",
    prepend: "()=>{ nlp('stupid flanders').match('flanders').insertBefore('sexy').all().text() }",
    concat: "()=>{ nlp('My name is Otto').concat('and i love to get blotto').all().length }",
  }
  Object.keys(fns).forEach(k => {
    t.doesNotThrow(eval(fns[k]), k)
  })
  t.end()
})

test('transform api', function (t) {
  const fns = {
    sort: "()=>{ nlp('Larry, Curly, Moe').terms().sort('alphabetical').out('array')    }",
    reverse: '()=>{  }',
    normalize:
      "()=>{ nlp(' so... you like   DONUTS? have all the donuts in the WORLD!!!').normalize().all().get(0).text() }",
    unique: '()=>{  }',
    split: "()=>{ nlp('Monorail...Once again! Monorail... Monorail!').splitOn('monorail').eq(0).text() }",
    splitAfter: "()=>{ nlp('Monorail...Once again! Monorail... Monorail!').splitAfter('monorail').eq(0).text() }",
    splitBefore: "()=>{ nlp('Monorail...Once again! Monorail... Monorail!').splitBefore('monorail').eq(0).text()}",
    segment: '()=>{  }',
    join: '()=>{  }',
  }
  Object.keys(fns).forEach(k => {
    t.doesNotThrow(eval(fns[k]), k)
  })
  t.end()
})

test('out api', function (t) {
  const fns = {
    text: "()=>{ nlp('you might say there’s a little Uter in all of us').match('#Adjective uter').out('array') }",
    debug: '()=>{  }',
    out: '()=>{  }',
    json:
      "()=>{ nlp('The stage was set for the Alan Parsons Project! Which I believe was some sort of hovercraft.').data() }",

    export: '()=>{  }',
  }
  Object.keys(fns).forEach(k => {
    t.doesNotThrow(eval(fns[k]), k)
  })
  t.end()
})

test('selectors api', function (t) {
  const fns = {
    terms: "()=>{ nlp('we should all be more like little Ruttiger').terms().json() }",
    clauses:
      "()=>{ nlp('All right, Colossus, you’re free to go, but stay away from Death Mountain').clauses().data() }",
    hyphenated: '()=>{  }',
    phoneNumbers: "()=>{ nlp('Moe Sizlak. That’s right. I’m a surgeon. (800) 555-0000.').phoneNumbers().json() }",
    hashTags: "()=>{ nlp('oh, but where is the #anykey').hashTags().json() }",
    emails: '()=>{  }',
    emoticons: '()=>{  }',
    emoji: '()=>{  }',
    atMentions: '()=>{  }',
    urls: "()=>{ nlp('thank you http://simpsons.wikia.com').urls().json()}",
    adverbs: '()=>{  }',
    pronouns: '()=>{  }',
    conjunctions: '()=>{  }',
    prepositions: '()=>{  }',
    abbreviations: '()=>{  }',
  }
  Object.keys(fns).forEach(k => {
    t.doesNotThrow(eval(fns[k]), k)
  })
  t.end()
})

test('subsets api', function (t) {
  const fns = {
    contractions: '()=>{  }',
    parentheses: "()=>{ nlp('Use a pointed stick (a pencil) or a similar tool').parentheses().data() }",
    possessives: "()=>{ nlp('moe’s tavern').possessives().text() }",
    quotations: '()=>{ nlp(\'the he said "crazy like a fox!".\').quotations().data().length }',
    acronyms: '()=>{  }',
    lists: '()=>{  }',
    nouns: '()=>{  }',
    verbs: `()=>{  nlp('Moe Sizlak. That’s right. I’m a surgeon.').verbs() }`,
  }
  Object.keys(fns).forEach(k => {
    t.doesNotThrow(eval(fns[k]), k)
  })
  t.end()
})

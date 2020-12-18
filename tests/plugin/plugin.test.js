const test = require('tape')
const nlp = require('../_lib')

const myPlugin = function (Doc, world) {
  /** add a method */
  Doc.prototype.beNice = function () {
    this.match('#Infinitive').prepend('kindly')
    return this
  }
  /** add some tags */
  world.addTags({
    Character: {
      isA: 'Person',
      notA: 'Adjective',
    },
  })
  /** add some words */
  world.addWords({
    gonzo: 'MaleName',
    kermit: 'Frog',
    'minnie mouse': 'Character',
  })
  /** post-process tagger */
  // world.postProcess(doc => {
  //   doc.match('light the lights').tag('#Verb . #Plural')
  // })
}

nlp.extend(myPlugin)

//TODO: not sure why this doesn't pass when running all-tests
// must be a race-condition?
// test('plugin post-process tagger', function(t) {
//   let doc = nlp(`it's time to light the lights.`)
//   t.equal(doc.has('#Verb the #Plural'), true, 'post-tagger ran')
//   t.end()
// })

test('plugin adds a method', function (t) {
  let doc = nlp(`wash the floor`)
  doc.beNice()
  t.equal(doc.text(), 'kindly wash the floor', 'beNice method worked')
  t.end()
})

test('plugin adds a tag', function (t) {
  let doc = nlp(`goofy`)
  t.equal(doc.has('#Adjective'), true, 'starts adjective')
  // random unknown tag
  doc.tag('FooBar')
  // our tag
  doc.tag('Character')
  t.equal(doc.has('#Character'), true, 'has given tag')
  t.equal(doc.has('#Person'), true, 'has implied tag')
  t.equal(doc.has('#FooBar'), true, 'has unrelated tag')
  t.equal(doc.has('#Adjective'), false, 'missing notA tag')
  t.end()
})

test('plugin adds words', function (t) {
  let doc = nlp(`gonzo, minnie mouse and kermit the frog`)
  t.equal(doc.match('gonzo').has('#MaleName'), true, 'new word existing tag')
  t.equal(doc.match('gonzo').has('#Person'), true, 'new word implied tag')

  t.equal(doc.match('#Frog').text('normal'), 'kermit', 'new word new tag')

  let m = doc.match('minnie mouse')
  t.equal(m.has('#Character #Character'), true, 'multi word given tag')
  t.equal(m.has('#Person #Person'), true, 'multi word implied tag')
  t.end()
})

// test('extend-tagset-flat', function(t) {
//   const tagSet = {
//     Color: {},
//   }
//   const lexicon = {
//     'mother of pearl': 'Color',
//   }
//   nlp.addTags(tagSet)
//   var m = nlp('it is mother of pearl', lexicon).match('#Color+')
//   t.equal(m.out('normal'), 'mother of pearl', 'text found')
//   t.ok(m.has('#Noun'), 'it does not get in the way of the tagger')
//   t.end()
// })

test('extend-tagset-nested', function (t) {
  const tagSet = {
    Color: {},
    OffWhite: {
      isA: 'Color',
    },
  }
  nlp.extend((Doc, world) => {
    world.addTags(tagSet)
  })
  const lexicon = {
    'mother of pearl': 'OffWhite',
  }
  const m = nlp('it is mother of pearl', lexicon).match('#OffWhite')
  t.equal(m.out('normal'), 'mother of pearl', 'text found')
  // t.equal(m.has('#Noun'), true, 'it does not get in the way of the tagger')
  t.equal(m.has('#Color'), true, 'has isA tag, too')
  t.end()
})

test('word-array to lex-string', function (t) {
  nlp.extend((Doc, world) => {
    world.addWords({
      mi: ['Possessive'],
    })
  })
  let doc = nlp('hello mi')
  t.equal(doc.has('#Possessive'), true)
  t.end()
})

test('basic-plugin', function (t) {
  nlp.extend((Doc, world) => {
    world.addWords({
      trex: 'Dinosaur',
    })
    world.addTags({
      Dinosaur: {
        isA: 'Animal',
      },
      Animal: {
        isA: 'Noun',
      },
    })
    world.postProcess(d => {
      d.match('/uuu/').tag('Exaggeration')
    })
  })
  const doc = nlp('i saw a HUUUUGE trex')
  t.equal(doc.match('#Exaggeration').out('normal'), 'huuuuge', 'regex-works')
  t.equal(doc.match('#Dinosaur').out('normal'), 'trex', 'lexicon-works')
  t.equal(doc.match('#Animal').out('normal'), 'trex', 'tagset-works')
  t.end()
})

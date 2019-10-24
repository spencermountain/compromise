const test = require('tape')
const nlp = require('./_lib')

const myPlugin = function(Doc, world) {
  /** add a method */
  Doc.prototype.beNice = function() {
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
  world.postProcess(doc => {
    doc.match('light the lights').tag('#Verb . #Plural')
  })
}

nlp.extend(myPlugin)

test('plugin adds a method', function(t) {
  let doc = nlp(`wash the floor`)
  doc.beNice()
  t.equal(doc.text(), 'kindly wash the floor', 'beNice method worked')
  t.end()
})

test('plugin adds a tag', function(t) {
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

test('plugin adds words', function(t) {
  let doc = nlp(`gonzo, minnie mouse and kermit the frog`)
  t.equal(doc.match('gonzo').has('#MaleName'), true, 'new word existing tag')
  t.equal(doc.match('gonzo').has('#Person'), true, 'new word implied tag')

  t.equal(doc.match('#Frog').text('normal'), 'kermit', 'new word new tag')

  let m = doc.match('minnie mouse')
  t.equal(m.has('#Character #Character'), true, 'multi word given tag')
  t.equal(m.has('#Person #Person'), true, 'multi word implied tag')
  t.end()
})

test('plugin post-process tagger', function(t) {
  let doc = nlp(`it's time to light the lights.`)
  t.equal(doc.has('#Verb the #Plural'), true, 'post-tagger ran')
  t.end()
})

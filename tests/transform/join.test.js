const test = require('tape')
const nlp = require('../_lib')

test('join-basic', function (t) {
  let str = `What's with these homies dissin' my girl? Why do they gotta front? 
  
  What did we ever do to these guys that made them so violent?
  
  `
  let doc = nlp(str).join()
  t.equal(doc.length, 1, 'one phrase')
  doc = doc.splitOn('we ever')
  t.equal(doc.length, 3, 'three phrases now')
  // t.equal(doc.text(), str, 'original text unchanged') //TODO:fix me
  t.end()
})

test('join-parents', function (t) {
  let str = `left side. middle part one. two middle part two. right side.`
  let doc = nlp(str)
  doc.if('middle').join()
  t.equal(doc.length, 3, 'three parts now')
  t.equal(doc.all().length, 3, 'three sentences now')
  t.equal(doc.text(), str, 'original text unchanged')
  t.end()
})

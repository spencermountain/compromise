const corpus = require('nlp-corpus')

const paths = {
  // v11: '/Users/spencer/Desktop/compromise/src/index.js',
  v12: '../../src',
  // sept2: '/Users/spencer/Desktop/aug-2-start.js',
  // v12build: '../../builds/compromise.min.js',
  // start: '/Users/spencer/mountain/compromise/builds/aug-2-start.js',
  // two: '/Users/spencer/mountain/compromise/builds/aug-2-2.js',
  // start: '/Users/spencer/Desktop/aug-2-start.js',
  // two: '/Users/spencer/Desktop/aug-2-2.js',
  // ive: '/Users/spencer/Desktop/aug-2-ive.js',
  // pos: '/Users/spencer/Desktop/aug-2-pos.js',
  // much: '/Users/spencer/Desktop/aug-2-much.js',
  // end: '/Users/spencer/Desktop/aug-2-end.js',
}

function test(build) {
  console.log('\n-- testing: ' + build + ' --')
  console.time('load')
  const nlp = require(paths[build])
  console.timeEnd('load')

  let txt = corpus.sotu.array()[8]
  console.time('parse')
  let doc = nlp(txt)
  console.timeEnd('parse')

  console.time('match')
  doc.match('#Noun')
  console.timeEnd('match')
  console.log('\n')
}

Object.keys(paths).forEach(test)

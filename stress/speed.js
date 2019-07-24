const corpus = require('nlp-corpus')

const paths = {
  // v11: '/Users/spencer/Desktop/compromise/src/index.js',
  v12: '../src',
  // v12build: '../builds/compromise.min.js',
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

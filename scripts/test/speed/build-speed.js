const txt = require('./_sotu-text')

const paths = {
  v12: '../../../src',
  // v12build: '../../../builds/compromise.min.js',
}

function test(build) {
  console.log('\n-- testing: ' + build + ' --')
  console.time('load')
  const nlp = require(paths[build])
  console.timeEnd('load')

  console.time('parse')
  let doc = nlp(txt)
  console.timeEnd('parse')

  console.time('match')
  doc.match('#Noun')
  console.timeEnd('match')
  console.log('\n')
}

Object.keys(paths).forEach(test)

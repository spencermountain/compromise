const sh = require('shelljs')

let code = sh.exec('tape "./tests/**/*.test.js" | tap-dancer --color always').code
if (code !== 0) {
  sh.exit(1)
}

// this one complains about too many listeners
// sh.exec(`tape "./plugins/*/tests/**/*.test.js" | tap-dancer --color always`)

let plugins = [
  'adjectives',
  'dates',
  'emoji',
  'entities',
  'ngrams',
  'numbers',
  'output',
  'paragraphs',
  'sentences',
  'swap',
  'syllables',
]
plugins.forEach(dir => {
  // console.log(dir + ':')
  code = sh.exec(`tape "./plugins/${dir}/tests/**/*.test.js" | tap-dancer --color always`).code
  if (code !== 0) {
    sh.exit(1)
  }
})

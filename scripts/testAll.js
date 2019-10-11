const sh = require('shelljs')

sh.exec('tape "./tests/**/*.test.js" | tap-dancer --color always')
console.log('-plugins-')
sh.exec(`tape "./plugins/*/tests/**/*.test.js" | tap-dancer --color always`)

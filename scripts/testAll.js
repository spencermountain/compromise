var sh = require('shelljs')
const cmd = 'tape "./tests/**/*.test.js" | tap-dancer'
sh.exec(cmd + ' --color always')

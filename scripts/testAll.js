var sh = require('shelljs')
sh.exec('tape "./tests/**/*.test.js" | tap-dancer --color always')

sh.ls('./plugins').forEach(plugin => {
  // console.log('\n' + plugin + ':')
  sh.exec(`tape "./plugins/${plugin}/tests/**/*.test.js" | tap-dancer --color always`)
})

// Run arbitrary (but typically npm) commands for each plugin
// Example: "node ./plugins.js npm install"
const sh = require('shelljs')

// process.argv contains the complete command-line, with [0] as the node
// executable, and [1] as the script (this file).  [2] is the beginning of any
// remaining args.
const args = process.argv.slice(2)
const command = args.join(' ')

let shouldFail = false
sh.ls('./plugins').forEach(function (dir) {
  console.log('\n===' + dir + '===')
  let code = sh.exec(command, { cwd: `./plugins/${dir}` }).code
  if (code !== 0) {
    shouldFail = dir
  }
})

if (shouldFail !== false) {
  console.warn('==================')
  console.log('    dir: ' + shouldFail)
  console.warn('==================')
  throw shouldFail
}

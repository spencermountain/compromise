/* eslint-disable no-console */
// Run arbitrary (but typically npm) commands for each plugin
// Example: "node ./plugins.js npm install"
import sh from 'shelljs'
import path from 'path'

// process.argv contains the complete command-line, with [0] as the node
// executable, and [1] as the script (this file).  [2] is the beginning of any
// remaining args.
const args = process.argv.slice(2)
const includeExperiments = args[0] === '--all'
if (includeExperiments) {
  args.shift()
}
const command = args.join(' ')

let shouldFail = false
const packages = sh.ls('./plugins/*/package.json')
if (includeExperiments) {
  packages.push(...sh.ls('./plugins/_experiments/*/package.json'))
}
packages.forEach(function (file) {
  const dir = path.dirname(file)
  console.log('\n===' + dir.replace(/^\.\/plugins\//, '') + '===')
  const code = sh.exec(command, { cwd: dir }).code
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

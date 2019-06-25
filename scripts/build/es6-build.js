const shelljs = require('shelljs')
const chalk = require('chalk')
const fileSize = require('../lib/filesize')
const pkg = require('../../package.json')
const exec = shelljs.exec
const echo = shelljs.echo

const browserify = '"node_modules/.bin/browserify"'
const derequire = '"node_modules/.bin/derequire"'
const babili = '"node_modules/.bin/babili"'

const es6 = './builds/compromise.es6.js'
const es6min = './builds/compromise.es6.min.js'

const banner =
  '/* compromise v' + pkg.version + '\n   http://compromise.cool\n   MIT\n*/\n'
echo(banner).to(es6)

console.log(chalk.yellow(' 🕑 creating es6 build..'))

//es6 main (browserify)
let cmd = browserify + ' "./src/index.js" --standalone nlp'
// cmd += ' -p bundle-collapser/plugin';
cmd += ' | ' + derequire
cmd += ' >> ' + es6
exec(cmd)

//es6min (babili)
cmd = babili + ' ' + es6
cmd += ' >> ' + es6min
exec(cmd)

//remove the first one
console.log(chalk.green(' done!    es6min ' + fileSize(es6min) + 'k\n'))

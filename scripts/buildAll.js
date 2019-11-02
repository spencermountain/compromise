// ensure all our plugins are up-to-spec
const fs = require('fs')
const path = require('path')
const sh = require('shelljs')

sh.ls('./plugins').forEach(function(dir) {
  console.log('\n\n===' + dir + '===')
  // sh.exec('cd ./plugins/' + dir + ' && npm install')
  // sh.exec('cd ./plugins/' + dir + ' && npm audit')
  sh.exec('cd ./plugins/' + dir + ' && npm run build')
  // sh.exec('cd ./plugins/' + dir + ' && npm run test ')

  let pkg = JSON.parse(fs.readFileSync(`./plugins/${dir}/package.json`))
  let stats = fs.statSync(path.join('./plugins', dir, pkg.unpkg))
  let size = (stats['size'] / 1000.0).toFixed(1)
  console.log(dir + '   ' + size + 'kb')
})

// ensure all our plugins are up-to-spec
var sh = require('shelljs')
// shell.cd('')
sh.ls('./plugins').forEach(function(dir) {
  console.log('\n\n===' + dir + '===')
  sh.exec('cd ./plugins/' + dir + ' && npm outdated')
  sh.exec('cd ./plugins/' + dir + ' && npm install')
  sh.exec('cd ./plugins/' + dir + ' && npm audit')
  sh.exec('cd ./plugins/' + dir + ' && npm run build')
  console.log(dir)
})

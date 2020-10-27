// ensure all our plugins are up-to-spec
const sh = require('shelljs')

sh.ls('./plugins').forEach(function (dir) {
  console.log('\n\n===' + dir + '===')
  // sh.exec('cd ./plugins/' + dir + ' && npm install')
  // sh.exec('cd ./plugins/' + dir + ' && npm-check -u -E')
  sh.exec('cd ./plugins/' + dir + ' && npm outdated')
  sh.exec('cd ./plugins/' + dir + ' && npm audit')
  // sh.exec('cd ./plugins/' + dir + ' && npm run build ')
  // sh.exec('cd ./plugins/' + dir + ' && npm run test ')
})

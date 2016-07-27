require('shelljs/global');
var watch = require('watch')
var chalk = require('chalk');
var options = {
  interval: 1,
  ignoreDotFiles: true,
  wait: 2
}

var banner = function() {
  var emojis = {
    lemon: chalk.yellow('🍋'),
    flower: chalk.red('🌼'),
    check: chalk.green('✅'),
    boat: chalk.blue('⛵ '),
    sun: chalk.yellow('🌞 '),
    sprout: chalk.green('🌱 '),
    time: chalk.green('🕙 '),
    shirt: chalk.blue('👕 '),
    hat: chalk.magenta('🎩 '),
    orange: chalk.red('🍑 '),
    candy: chalk.magenta('🍬 '),
    lollypop: chalk.red('🍭 '),
    dress: chalk.red('👗 '),
    happy: chalk.green('😊 '),
    trumpet: chalk.yellow('🎺 ')
  }
  var keys = Object.keys(emojis)
  var r = parseInt(Math.random() * keys.length - 1, 10)
  return emojis[keys[r]]
}


watch.watchTree('./', options, function(f, curr, prev) {
  console.log(banner())
  exec('node ./scratch_file.js --color')
  console.log('\n\n\n\n\n\n\n')
})
// watch.watchTree('./test/unit', options, function(f, curr, prev) {
//   exec('node ./scripts/test.js')
// })

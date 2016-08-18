require('shelljs/global');
var gaze = require('gaze');
var chalk = require('chalk');
var options = {
  interval: 1,
  ignoreDotFiles: true,
  wait: 2
};

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
  };
  var keys = Object.keys(emojis);
  var r = parseInt(Math.random() * keys.length - 1, 10);
  return emojis[keys[r]];
};

var run = function() {
  console.log(banner());
  exec('node ./scratch_file.js --debug --color');
  console.log('\n\n\n\n\n\n\n');
};

run();

var options = {
  interval: 1
};
gaze(['./scripts/watch.js', './src/**/*.js'], options, function(err, watcher) {
  var watched = this.watched();
  // // On changed/added/deleted
  this.on('all', function(event, filepath) {
    run();
    console.log(filepath + ' was ' + event);
  });
});

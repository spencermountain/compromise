require('shelljs/global');
var gaze = require('gaze');
var chalk = require('chalk');
//this is a nice way to 'hot-reload' compromise, while debugging something from ./scratch.js

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
  exec('node ./scratch.js --debug --color');
  console.log('\n\n\n\n\n\n\n');
};

run();

gaze(['./scripts/watch.js', './src/**/*.js', './scratch.js'], options, function(err) {
  if (err) {
    console.log(err);
  }
  this.on('added', function(filepath) {
    console.log(filepath + ' was added');
  });
  // // On changed/added/deleted
  this.on('all', function() {
    run();
  });
});

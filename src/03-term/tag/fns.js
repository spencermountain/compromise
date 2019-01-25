const padEnd = function(str, width) {
  str = str.toString();
  while (str.length < width) {
    str += ' ';
  }
  return str;
};

exports.logTag = function(t, tag, reason) {
  let log = '\x1b[33m' + padEnd(t.normal, 15) + '\x1b[0m + \x1b[32m' + tag + '\x1b[0m ';
  if (reason) {
    log = padEnd(log, 35) + ' ' + reason + '';
  }
  console.log(log);
};

exports.logUntag = function(t, tag, reason) {
  let log = '\x1b[33m' + padEnd(t.normal, 3) + ' \x1b[31m - #' + tag + '\x1b[0m ';
  if (reason) {
    log = padEnd(log, 35) + ' ' + reason;
  }
  console.log(log);
};

exports.isArray = function(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]';
};

exports.titleCase = str => {
  return str.charAt(0).toUpperCase() + str.substr(1);
};
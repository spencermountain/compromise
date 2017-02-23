'use strict';
const tagColors = require('./tags/colors');

// https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
const c = {
  reset: '\x1b[0m',
  red : '\x1b[31m',
  green : '\x1b[32m',
  yellow : '\x1b[33m',
  blue : '\x1b[34m',
  magenta : '\x1b[35m',
  cyan : '\x1b[36m',
  black: '\x1b[30m'
};
//dont use colors on client-side
if (typeof module === 'undefined') {
  Object.keys(c).forEach((k) => {
    c[k] = '';
  });
}

//coerce any input into a string
exports.ensureString = (input) => {
  if (typeof input === 'string') {
    return input;
  } else if (typeof input === 'number') {
    return '' + input;
  }
  return '';
};
//coerce any input into a string
exports.ensureObject = (input) => {
  if (typeof input !== 'object') {
    return {};
  }
  if (input === null || input instanceof Array) {
    return {};
  }
  return input;
};
//string utilities
exports.endsWith = function (str, suffix) {
  if (str && str.substr(-suffix.length) === suffix) {
    return true;
  }
  return false;
};

exports.startsWith = function (str, prefix) {
  if (str && prefix) {
    if (str.substr(0, prefix.length) === prefix) {
      return true;
    }
  }
  return false;
};

exports.titleCase = (str) => {
  return str.charAt(0).toUpperCase() + str.substr(1);
};

//turn a nested array into one array
exports.flatten = function (arr) {
  let all = [];
  arr.forEach(function (a) {
    all = all.concat(a);
  });
  return all;
};

//shallow-clone an object
exports.copy = (o) => {
  let o2 = {};
  o = exports.ensureObject(o);
  Object.keys(o).forEach((k) => {
    o2[k] = o[k];
  });
  return o2;
};
exports.extend = (obj, a) => {
  obj = exports.copy(obj);
  let keys = Object.keys(a);
  for(let i = 0; i < keys.length; i++) {
    obj[keys[i]] = a[keys[i]];
  }
  return obj;
};

//colorization
exports.green = function(str) {
  return c.green + str + c.reset;
};
exports.red = function(str) {
  return c.red + str + c.reset;
};
exports.blue = function(str) {
  return c.blue + str + c.reset;
};
exports.magenta = function(str) {
  return c.magenta + str + c.reset;
};
exports.cyan = function(str) {
  return c.cyan + str + c.reset;
};
exports.yellow = function(str) {
  return c.yellow + str + c.reset;
};
exports.black = function(str) {
  return c.black + str + c.reset;
};
exports.printTag = function(tag) {
  if (tagColors[tag]) {
    return exports[tagColors[tag]](tag);
  }
  return tag;
};
exports.printTerm = function(t) {
  let tags = Object.keys(t.tag);
  for(let i = 0; i < tags.length; i++) {
    if (tagColors[tags[i]]) {
      let color = tagColors[tags[i]];
      return exports[color](t.plaintext);
    }
  }
  return c.reset + t.plaintext + c.reset;
};

exports.leftPad = function (str, width, char) {
  char = char || ' ';
  str = str.toString();
  while (str.length < width) {
    str += char;
  }
  return str;
};

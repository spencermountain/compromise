// 'use strict';
var nc='\033[0m'
var c = {
  red: (s)=>"\033[0;31m"+s+nc,
  green:(s)=>"\033[0;32m"+s+nc,
  orange:(s)=>"\033[0;33m"+s+nc,
  yellow:(s)=>"\033[1;33m"+s+nc,
  blue: (s)=>"\033[0;34m"+s+nc,
  purple: (s)=>"\033[0;35m"+s+nc,
}

var rightPad = function(str, width, char) {
  char = char || ' ';
  str = str.toString();
  while (str.length < width) str += char;
  return str;
};


var pretty_print = function(input, path) {
  path=path||''
  var indent=path.split('/').length - 1
  indent=rightPad('',indent,'   ')

  path=indent+path
  path=rightPad(path+':', 12, ' ')
  path=c.yellow(path)
  console.log(path)
}

module.exports = pretty_print

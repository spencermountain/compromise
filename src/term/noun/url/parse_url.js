'use strict';
//parse a url into components, in 'loose' mode
//taken from   http://locutus.io/php/url/parse_url/

const parse_url = function(str) { // eslint-disable-line camelcase
  let key = [
    'source',
    'scheme',
    'authority',
    'userInfo',
    'user',
    'pass',
    'host',
    'port',
    'relative',
    'path',
    'directory',
    'file',
    'query',
    'fragment'
  ];
  let reg = new RegExp([
    '(?:(?![^:@]+:[^:@\\/]*@)([^:\\/?#.]+):)?',
    '(?:\\/\\/\\/?)?',
    '((?:(([^:@\\/]*):?([^:@\\/]*))?@)?([^:\\/?#]*)(?::(\\d*))?)',
    '(((\\/(?:[^?#](?![^?#\\/]*\\.[^?#\\/.]+(?:[?#]|$)))*\\/?)?([^?#\\/]*))',
    '(?:\\?([^#]*))?(?:#(.*))?)'
  ].join(''));
  let m = reg.exec(str);
  let uri = {};
  let i = 14;
  while (i--) {
    if (m[i]) {
      uri[key[i]] = m[i];
    }
  }
  return uri;
};

module.exports = parse_url;
// console.log(parse_url('http://fun.domain.com/fun?foo=bar'));

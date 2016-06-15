'use strict';
const Noun = require('../noun');
const parse_url = require('./parse_url');

class Url extends Noun {
  constructor(str, tag) {
    super(str);
    this.tag = tag;
    this.pos['Url'] = true;
    this.parsed = this.parse();
    this.normal = this.parsed.host || str;
    this.normal = this.normal.replace(/^www\./, '');
  }
  parse() {
    return parse_url(this.text);
  }
}
Url.fn = Url.prototype;
module.exports = Url;
// console.log(new Url('http://fun.domain.com/fun?foo=bar'));

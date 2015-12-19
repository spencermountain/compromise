'use strict';
const Noun = require('../noun.js');
const to_number = require('./to_number.js');
const units = require('./units.js');
const nums = require('./numbers.js');

class Value extends Noun {
  constructor(str, tag) {
    super(str);
    this.tag = tag;
    this.pos['Value'] = true;
    this.number = null;
    this.unit = null;
    this.unit_name = null;
    this.measurement = null;
    this.parse();
  }

  is_unit(s) {
    if (units[s]) {
      return true;
    }
    s = s.toLowerCase();
    if (nums.prefixes[s]) {
      return true;
    }
    //try singular version
    s = s.replace(/s$/); //ew
    if (units[s]) {
      return true;
    }

    return false;
  }

  parse() {
    let words = this.text.toLowerCase().split(' ');
    let number_words = {
      minus: true,
      point: true
    };
    let numbers = '';
    for(let i = 0; i < words.length; i++) {
      let w = words[i];
      if (nums.ones[w] || nums.teens[w] || nums.tens[w] || nums.multiples[w] || number_words[w] || w.match(/[0-9]/)) {
        numbers += ' ' + w;
      } else if (this.is_unit(w)) { //optional units come after the number
        this.unit = w;
        if (units[w]) {
          this.measurement = units[w].category;
          this.unit_name = units[w].name;
        }
      }
    }
    this.number = to_number(numbers);
  }

}
Value.fn = Value.prototype;

module.exports = Value;

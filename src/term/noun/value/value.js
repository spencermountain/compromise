'use strict';
const Noun = require('../noun');
const to_number = require('./parse/to_number');
const to_text = require('./to_text');
const units = require('./units');
const nums = require('../../../data/numbers');
const fns = require('../../../fns');
//get an array of ordinal (first, second...) numbers
let ordinals = {};
ordinals = fns.extend(ordinals, nums.ordinal_ones);
ordinals = fns.extend(ordinals, nums.ordinal_teens);
ordinals = fns.extend(ordinals, nums.ordinal_tens);
ordinals = fns.extend(ordinals, nums.ordinal_multiples);
ordinals = Object.keys(ordinals);

class Value extends Noun {
  constructor(str, tag) {
    super(str);
    this.tag = tag;
    this.pos['Value'] = true;
    this.number = null;
    this.unit = null;
    this.unit_name = null;
    this.measurement = null;
    this.of_what = '';
    // this.text = str;
    // this.normal = str;
    if (this.is_ordinal()) {
      this.pos['Ordinal'] = true;
    }
    this.parse();
  }

  //test for nearly-numbers, like phonenumbers, or whatever
  is_number(s) {
    //phone numbers, etc
    if (s.match(/[:@]/)) {
      return false;
    }
    //if there's a number, then something, then a number
    if (s.match(/[0-9][^0-9,\.][0-9]/)) {
      return false;
    }
    return true;
  };

  is_ordinal() { //todo: make this clever.
    //1st
    if (this.normal.match(/^[0-9]+(rd|st|nd|th)$/)) {
      return true;
    }
    //first, second...
    for(let i = 0; i < ordinals.length; i++) {
      if (fns.endsWith(this.normal, ordinals[i])) {
        return true;
      }
    }
    return false;
  }

  //turn an integer like 22 into '22nd'
  to_ordinal(num) {
    num = '' + num;
    //fail safely
    if (!num.match(/[0-9]$/)) {
      return num;
    }
    if (fns.endsWith(num, '1')) {
      return num + 'st';
    }
    if (fns.endsWith(num, '2')) {
      return num + 'nd';
    }
    if (fns.endsWith(num, '3')) {
      return num + 'rd';
    }
    return num + 'th';
  }

  //overwrite term.normalize?
  // normalize() {
  //   let str = '' + (this.number || '');
  //   if (this.is_ordinal()) {
  //     str = this.to_ordinal(str);
  //   }
  //   if (this.unit) {
  //     str += ' ' + this.unit;
  //   }
  //   return str;
  // }

  root() {
    let str = this.number;
    if (this.unit) {
      str += ' ' + this.unit;
    }
    return str;
  }

  is_unit() {
    if (units[this.unit]) {
      return true;
    }

    let s = this.unit.toLowerCase();
    if (nums.prefixes[s]) {
      return true;
    }

    //try singular version
    s = this.unit.replace(/s$/, '');
    if (units[s]) {
      this.unit = this.unit.replace(/s$/, '');
      return true;
    }

    s = this.unit.replace(/es$/, '');
    if (units[s]) {
      this.unit = this.unit.replace(/es$/, '');
      return true;
    }

    return false;
  }

  parse() {
    if (!this.is_number(this.text)) {
      return;
    }
    let words = this.text.toLowerCase().split(/[ -]/);
    let number_words = {
      minus: true,
      negative: true,
      point: true,
      half: true,
      quarter: true,
    };
    let numbers = '';
    let raw_units = '';

    //seperate number-words from unit-words
    for (let i = 0; i < words.length; i++) {
      let w = words[i];
      if (w.match(/[0-9]/) || number_words[w]) {
        numbers += ' ' + w;
      } else if (nums.ones[w] || nums.teens[w] || nums.tens[w] || nums.multiples[w]) {
        numbers += ' ' + w;
      } else if (nums.ordinal_ones[w] || nums.ordinal_teens[w] || nums.ordinal_tens[w] || nums.ordinal_multiples[w]) {
        numbers += ' ' + w;
      } else {
        raw_units += ' ' + w;
      }
    }
    this.unit = raw_units.trim();
    //is the word something like 'dollars'
    if (this.is_unit()) {
      this.measurement = units[this.unit].category;
      this.unit_name = units[this.unit].name;
    }
    //support '$400' => 400 dollars
    let firstChar = this.text.substr(0, 1);
    const symbolic_currency = {
      '€': 'euro',
      '$': 'dollar',
      '¥': 'yen',
      '£': 'pound',
      '¢': 'cent',
      '฿': 'bitcoin'
    };
    if (symbolic_currency[firstChar]) {
      this.measurement = 'Money';
      this.unit_name = 'currency';
      this.unit = symbolic_currency[firstChar];
    }

    numbers = numbers.trim();
    this.number = to_number(numbers);

    //of_what
    var of_pos = this.text.indexOf(' of ');
    if (of_pos > 0) {
      this.of_what = this.text.substring(of_pos + 4).trim();
    } else if (this.unit_name) {
      this.of_what = this.unit_name;
    }

  }

  textual() {
    return to_text(this.number || this.normal || this.text);
  }

}
Value.fn = Value.prototype;
module.exports = Value;

// console.log(new Value('first').normal);
// console.log(new Value('minus eighty eight point nine nine').number);

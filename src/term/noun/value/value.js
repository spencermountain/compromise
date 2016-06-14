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
    if (s.match(/[0-9][^(0-9|\/),\.][0-9]/)) {
      if (s.match(/((?:[0-9]|\.)+) ((?:[0-9]|\.)+)\/((?:[0-9]|\.)+)/)) { // I'm sure there is a better regexpxs
        return true;
      }
      return false;
    }
    return true;
  };

  is_number_word(w) {
    let number_words = {
      minus: true,
      negative: true,
      point: true,
      half: true,
      quarter: true,
    };

    if (w.match(/[0-9]/) || number_words[w]) {
      return true;
    } else if (nums.ones[w] || nums.teens[w] || nums.tens[w] || nums.multiples[w]) {
      return true;
    } else if (nums.ordinal_ones[w] || nums.ordinal_teens[w] || nums.ordinal_tens[w] || nums.ordinal_multiples[w]) {
      return true;
    }

    return false;
  };


  is_ordinal() {
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
  to_ordinal() {
    let num = this.number;
    //fail fast
    if (!num && num !== 0) {
      return '';
    }
    //teens are all 'th'
    if (num >= 10 && num <= 20) {
      return '' + num + 'th';
    }
    //treat it as a string..
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

  //overwrite term.normal?
  // normal() {
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
    //if it's a known unit
    if (units[this.unit]) {
      return true;
    }
    //currencies are derived-through POS
    if (this.pos['Currency']) {
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

    let words = this.text.toLowerCase().split(/[ ]/);
    //split at '-' only for numbers like twenty-two, sixty-seven, etc.
    //so that 'twelve six-gram pieces' returns 12 for number, not null
    //however, still returns null for 'three sevel-eleven stores'
    for (let i = 0; i < words.length; i++) {
      let w = words[i];
      if ((w.indexOf('-') === w.lastIndexOf('-')) && w.indexOf('-') > -1) {
        let halves = w.split(/[-]/);
        if (this.is_number_word(halves[0]) && this.is_number_word(halves[1])) {
          words[i] = halves[0];
          words.splice(i + 1, 0, halves[1]);
        }
      }
    }

    let numbers = '';
    let raw_units = '';

    //seperate number-words from unit-words
    for (let i = 0; i < words.length; i++) {
      let w = words[i];
      if (this.is_number_word(w)) {
        numbers += ' ' + w;
      } else {
        raw_units += ' ' + w;
      }
    }
    this.unit = raw_units.trim();

    //if raw_units is something like "grams of sugar", try it first,
    //then "grams of", and then "grams".
    while (this.unit !== '') {
      if (this.is_unit() && units[this.unit]) {
        this.measurement = units[this.unit].category;
        this.unit_name = units[this.unit].name;
        break;
      } else {
        this.unit = this.unit.substr(0, this.unit.lastIndexOf(' ')).trim();
      }
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
    let of_pos = this.text.indexOf(' of ');
    if (of_pos > 0) {
      let before = this.text.substring(0, of_pos).trim();
      let after = this.text.substring(of_pos + 4).trim();

      let space_pos = before.lastIndexOf(' ');
      let w = before.substring(space_pos).trim();

      //if the word before 'of' is a unit, return whatever is after 'of'
      //else return this word + of + whatever is after 'of'
      if (w && (this.is_unit(w) || this.is_number_word(w))) {
        this.of_what = after;
      } else {
        this.of_what = w + ' of ' + after;
      }
    } else if (this.unit_name) {
      //if value contains a unit but no 'of', return unit
      this.of_what = this.unit;
    } else {
      //if value is a number followed by words, skip numbers
      //and return words; if there is no numbers, return full
      let temp_words = this.text.split(' ');
      for (let i = 0; i < temp_words.length; i++) {
        if (this.is_number_word(temp_words[i])) {
          temp_words[i] = '';
          continue;
        }
        this.of_what = temp_words.join(' ').trim();
      }
    }

  }

  textual() {
    return to_text(this.number || this.normal || this.text);
  }

}
Value.fn = Value.prototype;
module.exports = Value;

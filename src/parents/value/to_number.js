// converts spoken numbers into integers  "fifty seven point eight" -> 57.8
//
// Spoken numbers take the following format
// [sixty five] (thousand) [sixty five] (hundred) [sixty five]
// aka: [one/teen/ten] (multiple) [one/teen/ten] (multiple) ...
// combile the [one/teen/ten]s as 'current_sum', then multiply it by its following multiple
// multiple not repeat

"use strict";
//these sets of numbers each have different rules
//[tenth, hundreth, thousandth..] are ambiguous because they could be ordinal like fifth, or decimal like one-one-hundredth, so are ignored
var ones = {
  'a': 1,
  'zero': 0,
  'one': 1,
  'two': 2,
  'three': 3,
  'four': 4,
  'five': 5,
  'six': 6,
  'seven': 7,
  'eight': 8,
  'nine': 9,
  "first": 1,
  "second": 2,
  "third": 3,
  "fourth": 4,
  "fifth": 5,
  "sixth": 6,
  "seventh": 7,
  "eighth": 8,
  "ninth": 9
}
var teens = {
  'ten': 10,
  'eleven': 11,
  'twelve': 12,
  'thirteen': 13,
  'fourteen': 14,
  'fifteen': 15,
  'sixteen': 16,
  'seventeen': 17,
  'eighteen': 18,
  'nineteen': 19,
  "eleventh": 11,
  "twelfth": 12,
  "thirteenth": 13,
  "fourteenth": 14,
  "fifteenth": 15,
  "sixteenth": 16,
  "seventeenth": 17,
  "eighteenth": 18,
  "nineteenth": 19
}
var tens = {
  'twenty': 20,
  'thirty': 30,
  'forty': 40,
  'fifty': 50,
  'sixty': 60,
  'seventy': 70,
  'eighty': 80,
  'ninety': 90,
  "twentieth": 20,
  "thirtieth": 30,
  "fourtieth": 40,
  "fiftieth": 50,
  "sixtieth": 60,
  "seventieth": 70,
  "eightieth": 80,
  "ninetieth": 90
}
var multiple = {
    'hundred': 100,
    'grand': 1000,
    'thousand': 1000,
    'million': 1000000,
    'billion': 1000000000,
    'trillion': 1000000000000,
    'quadrillion': 1000000000000000,
    'quintillion': 1000000000000000000,
    'sextillion': 1000000000000000000000,
    'septillion': 1000000000000000000000000,
    'octillion': 1000000000000000000000000000,
    'nonillion': 1000000000000000000000000000000,
    'decillion': 1000000000000000000000000000000000
  }
  // var decimal_multiple={'tenth':0.1, 'hundredth':0.01, 'thousandth':0.001, 'millionth':0.000001,'billionth':0.000000001};

var main = function (s) {
  //remember these concerns for possible errors
  var ones_done = false
  var teens_done = false
  var tens_done = false
  var multiple_done = {}
  var total = 0
  var global_multiplier = 1
    //pretty-printed numbers
  s = s.replace(/, ?/g, '')
  //parse-out currency
  s = s.replace(/[$£€]/, '')
  //try to finish-fast
  if (s.match(/[0-9]\.[0-9]/) && parseFloat(s) == s) {
    return parseFloat(s)
  }
  if (parseInt(s, 10) == s) {
    return parseInt(s, 10)
  }
  //try to die fast. (phone numbers or times)
  if (s.match(/[0-9][\-:][0-9]/)) {
    return null
  }
  //support global multipliers, like 'half-million' by doing 'million' then multiplying by 0.5
  var mults = [{
    reg: /^(minus|negative)[\s\-]/i,
    mult: -1
  }, {
    reg: /^(a\s)?half[\s\-](of\s)?/i,
    mult: 0.5
  }, {
    reg: /^(a\s)?quarter[\s\-]/i,
    mult: 0.25
  }]
  for (i = 0; i < mults.length; i++) {
    if (s.match(mults[i].reg)) {
      global_multiplier = mults[i].mult
      s = s.replace(mults[i].reg, '')
      break;
    }
  }

  //do each word in turn..
  var words = s.toString().split(/[\s\-]+/);
  var w, x;
  var current_sum = 0;
  var local_multiplier = 1
  var decimal_mode = false
  for (var i = 0; i < words.length; i++) {
    w = words[i]

    //skip 'and' eg. five hundred and twelve
    if (w == "and") {
      continue;
    }

    //..we're doing decimals now
    if (w == "point" || w == "decimal") {
      if (decimal_mode) {
        return null
      } //two point one point six
      decimal_mode = true
      total += current_sum
      current_sum = 0
      ones_done = false
      local_multiplier = 0.1
      continue;
    }

    //handle special rules following a decimal
    if (decimal_mode) {
      x = null
      //allow consecutive ones in decimals eg. 'two point zero five nine'
      if (ones[w] !== undefined) {
        x = ones[w]
      }
      if (teens[w] !== undefined) {
        x = teens[w]
      }
      if (parseInt(w, 10) == w) {
        x = parseInt(w, 10)
      }
      if (!x) {
        return null
      }
      if (x < 10) {
        total += x * local_multiplier
        local_multiplier = local_multiplier * 0.1 // next number is next decimal place
        current_sum = 0
        continue;
      }
      //two-digit decimals eg. 'two point sixteen'
      if (x < 100) {
        total += x * (local_multiplier * 0.1)
        local_multiplier = local_multiplier * 0.01 // next number is next decimal place
        current_sum = 0
        continue;
      }
    }

    //if it's already an actual number
    if (w.match(/^[0-9]\.[0-9]$/)) {
      current_sum += parseFloat(w)
      continue;
    }
    if (parseInt(w, 10) == w) {
      current_sum += parseInt(w, 10)
      continue;
    }

    //ones rules
    if (ones[w] !== undefined) {
      if (ones_done) {
        return null
      } // eg. five seven
      if (teens_done) {
        return null
      } // eg. five seventeen
      ones_done = true
      current_sum += ones[w]
      continue;
    }
    //teens rules
    if (teens[w]) {
      if (ones_done) {
        return null
      } // eg. five seventeen
      if (teens_done) {
        return null
      } // eg. fifteen seventeen
      if (tens_done) {
        return null
      } // eg. sixty fifteen
      teens_done = true
      current_sum += teens[w]
      continue;
    }
    //tens rules
    if (tens[w]) {
      if (ones_done) {
        return null
      } // eg. five seventy
      if (teens_done) {
        return null
      } // eg. fiveteen seventy
      if (tens_done) {
        return null
      } // eg. twenty seventy
      tens_done = true
      current_sum += tens[w]
      continue;
    }
    //multiple rules
    if (multiple[w]) {
      if (multiple_done[w]) {
        return null
      } // eg. five hundred six hundred
      multiple_done[w] = true
      //reset our concerns. allow 'five hundred five'
      ones_done = false
      teens_done = false
      tens_done = false
      //case of 'hundred million', (2 consecutive multipliers)
      if (current_sum === 0) {
        total = total || 1 //dont ever multiply by 0
        total *= multiple[w]
      } else {
        current_sum *= multiple[w]
        total += current_sum
      }
      current_sum = 0
      continue;
    }
    //if word is not a known thing now, die
    return null
  }
  if (current_sum) {
    total += (current_sum || 1) * local_multiplier
  }
  //combine with global multiplier, like 'minus' or 'half'
  total = total * global_multiplier

  return total
}

//kick it into module
module.exports = main;

// console.log(to_number("sixteen hundred"))
// console.log(to_number("a hundred"))
// console.log(to_number("four point seven seven"))

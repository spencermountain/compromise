/* compromise-numbers 1.4.0 MIT */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.compromiseNumbers = factory());
}(this, (function () { 'use strict';

  const findMoney$1 = function (doc, n) {
    // five dollars
    let res = doc.match('#Value+? #Money+ #Currency+ (and #Money+ #Currency+)+?'); // $5.05

    doc.match('#Money').forEach(m => {
      // don't duplicate it
      if (!m.lookAfter('#Currency').found) {
        res = res.concat(m);
      }
    }); //grab (n)th result

    if (typeof n === 'number') {
      res = res.get(n);
    }

    return res;
  };

  var find$3 = findMoney$1;

  const ones = 'one|two|three|four|five|six|seven|eight|nine';
  const tens = 'twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|fourty';
  const teens = 'eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen'; // this is a bit of a mess

  const findNumbers$1 = function (doc, n) {
    let m = doc.match('#Value+'); //"50 83"

    if (m.has('#NumericValue #NumericValue')) {
      //a comma may mean two numbers
      if (m.has('#Value @hasComma #Value')) {
        m.splitAfter('@hasComma');
      } else if (m.has('#NumericValue #Fraction')) {
        m.splitAfter('#NumericValue #Fraction');
      } else {
        m = m.splitAfter('#NumericValue');
      }
    } //three-length


    if (m.has('#Value #Value #Value') && !m.has('#Multiple')) {
      //twenty-five-twenty
      if (m.has('(' + tens + ') #Cardinal #Cardinal')) {
        m = m.splitAfter('(' + tens + ') #Cardinal');
      }
    } //two-length ones


    if (m.has('#Value #Value')) {
      //june 21st 1992 is two seperate values
      if (m.has('#NumericValue #NumericValue')) {
        m = m.splitOn('#Year');
      } //sixty fifteen


      if (m.has('(' + tens + ') (' + teens + ')')) {
        m = m.splitAfter('(' + tens + ')');
      } //"72 82"


      let double = m.match('#Cardinal #Cardinal');

      if (double.found && !m.has('(point|decimal|#Fraction)')) {
        //not 'two hundred'
        if (!double.has('#Cardinal (#Multiple|point|decimal)')) {
          // two fifty five
          let noMultiple = m.has(`(${ones}) (${tens})`); // twenty one

          let tensVal = double.has('(' + tens + ') #Cardinal'); // hundredOne

          let multVal = double.has('#Multiple #Value'); //one proper way, 'twenty one', or 'hundred one'

          if (!noMultiple && !tensVal && !multVal) {
            // double = double.firstTerm()
            double.terms().forEach(d => {
              m = m.splitOn(d);
            });
          }
        }
      } //seventh fifth


      if (m.match('#Ordinal #Ordinal').match('#TextValue').found && !m.has('#Multiple')) {
        //the one proper way, 'twenty first'
        if (!m.has('(' + tens + ') #Ordinal')) {
          m = m.splitAfter('#Ordinal');
        }
      } //fifth five


      if (m.has('#Ordinal #Cardinal')) {
        m = m.splitBefore('#Cardinal+');
      } //five 2017 (support '5 hundred', and 'twenty 5'


      if (m.has('#TextValue #NumericValue') && !m.has('(' + tens + '|#Multiple)')) {
        m = m.splitBefore('#NumericValue+');
      }
    } //5-8


    if (m.has('#NumberRange')) {
      m = m.splitAfter('#NumberRange');
    } //grab (n)th result


    if (typeof n === 'number') {
      m = m.get(n);
    }

    return m;
  };

  var find$2 = findNumbers$1;

  const findFractions$1 = function (doc, n) {
    // five eighths
    let m = doc.match('#Fraction+'); // remove 'two and five eights'

    m = m.filter(r => {
      return !r.lookBehind('#Value and$').found;
    });

    if (typeof n === 'number') {
      m = m.eq(n);
    }

    return m;
  };

  var find$1 = findFractions$1;

  const findPercentages$1 = function (doc, n) {
    // 5%
    let m = doc.match('#Percent+'); // five percent

    m = m.concat(doc.match('[#Cardinal] percent', 0));

    if (typeof n === 'number') {
      m = m.eq(n);
    }

    return m;
  };

  var find = findPercentages$1;

  const findModifiers$1 = str => {
    const mults = [{
      reg: /^(minus|negative)[\s\-]/i,
      mult: -1
    }, {
      reg: /^(a\s)?half[\s\-](of\s)?/i,
      mult: 0.5
    } //  {
    //   reg: /^(a\s)?quarter[\s\-]/i,
    //   mult: 0.25
    // }
    ];

    for (let i = 0; i < mults.length; i++) {
      if (mults[i].reg.test(str) === true) {
        return {
          amount: mults[i].mult,
          str: str.replace(mults[i].reg, '')
        };
      }
    }

    return {
      amount: 1,
      str: str
    };
  };

  var findModifiers_1 = findModifiers$1;

  var data = {
    ones: {
      zeroth: 0,
      first: 1,
      second: 2,
      third: 3,
      fourth: 4,
      fifth: 5,
      sixth: 6,
      seventh: 7,
      eighth: 8,
      ninth: 9,
      zero: 0,
      one: 1,
      two: 2,
      three: 3,
      four: 4,
      five: 5,
      six: 6,
      seven: 7,
      eight: 8,
      nine: 9
    },
    teens: {
      tenth: 10,
      eleventh: 11,
      twelfth: 12,
      thirteenth: 13,
      fourteenth: 14,
      fifteenth: 15,
      sixteenth: 16,
      seventeenth: 17,
      eighteenth: 18,
      nineteenth: 19,
      ten: 10,
      eleven: 11,
      twelve: 12,
      thirteen: 13,
      fourteen: 14,
      fifteen: 15,
      sixteen: 16,
      seventeen: 17,
      eighteen: 18,
      nineteen: 19
    },
    tens: {
      twentieth: 20,
      thirtieth: 30,
      fortieth: 40,
      fourtieth: 40,
      fiftieth: 50,
      sixtieth: 60,
      seventieth: 70,
      eightieth: 80,
      ninetieth: 90,
      twenty: 20,
      thirty: 30,
      forty: 40,
      fourty: 40,
      fifty: 50,
      sixty: 60,
      seventy: 70,
      eighty: 80,
      ninety: 90
    },
    multiples: {
      hundredth: 100,
      thousandth: 1000,
      millionth: 1e6,
      billionth: 1e9,
      trillionth: 1e12,
      quadrillionth: 1e15,
      quintillionth: 1e18,
      sextillionth: 1e21,
      septillionth: 1e24,
      hundred: 100,
      thousand: 1000,
      million: 1e6,
      billion: 1e9,
      trillion: 1e12,
      quadrillion: 1e15,
      quintillion: 1e18,
      sextillion: 1e21,
      septillion: 1e24,
      grand: 1000
    }
  };

  const words$2 = data; //prevent things like 'fifteen ten', and 'five sixty'

  const isValid$1 = (w, has) => {
    if (words$2.ones.hasOwnProperty(w)) {
      if (has.ones || has.teens) {
        return false;
      }
    } else if (words$2.teens.hasOwnProperty(w)) {
      if (has.ones || has.teens || has.tens) {
        return false;
      }
    } else if (words$2.tens.hasOwnProperty(w)) {
      if (has.ones || has.teens || has.tens) {
        return false;
      }
    }

    return true;
  };

  var validate = isValid$1;

  const words$1 = data; //concatenate into a string with leading '0.'

  const parseDecimals$1 = function (arr) {
    let str = '0.';

    for (let i = 0; i < arr.length; i++) {
      let w = arr[i];

      if (words$1.ones.hasOwnProperty(w) === true) {
        str += words$1.ones[w];
      } else if (words$1.teens.hasOwnProperty(w) === true) {
        str += words$1.teens[w];
      } else if (words$1.tens.hasOwnProperty(w) === true) {
        str += words$1.tens[w];
      } else if (/^[0-9]$/.test(w) === true) {
        str += w;
      } else {
        return 0;
      }
    }

    return parseFloat(str);
  };

  var parseDecimals_1 = parseDecimals$1;

  const parseNumeric$2 = str => {
    //remove ordinal - 'th/rd'
    str = str.replace(/1st$/, '1');
    str = str.replace(/2nd$/, '2');
    str = str.replace(/3rd$/, '3');
    str = str.replace(/([4567890])r?th$/, '$1'); //remove prefixes

    str = str.replace(/^[$€¥£¢]/, ''); //remove suffixes

    str = str.replace(/[%$€¥£¢]$/, ''); //remove commas

    str = str.replace(/,/g, ''); //split '5kg' from '5'

    str = str.replace(/([0-9])([a-z\u00C0-\u00FF]{1,2})$/, '$1');
    return str;
  };

  var parseNumeric_1 = parseNumeric$2;

  const findModifiers = findModifiers_1;
  const words = data;
  const isValid = validate;
  const parseDecimals = parseDecimals_1;
  const parseNumeric$1 = parseNumeric_1;
  const improperFraction = /^([0-9,\. ]+)\/([0-9,\. ]+)$/; //some numbers we know

  const casualForms = {
    'a few': 3,
    'a couple': 2,
    'a dozen': 12,
    'two dozen': 24,
    zero: 0
  }; // a 'section' is something like 'fifty-nine thousand'
  // turn a section into something we can add to - like 59000

  const section_sum = obj => {
    return Object.keys(obj).reduce((sum, k) => {
      sum += obj[k];
      return sum;
    }, 0);
  }; //turn a string into a number


  const parse$5 = function (str) {
    //convert some known-numbers
    if (casualForms.hasOwnProperty(str) === true) {
      return casualForms[str];
    } //'a/an' is 1


    if (str === 'a' || str === 'an') {
      return 1;
    }

    const modifier = findModifiers(str);
    str = modifier.str;
    let last_mult = null;
    let has = {};
    let sum = 0;
    let isNegative = false;
    const terms = str.split(/[ -]/); // const isFraction = findFraction(terms)

    for (let i = 0; i < terms.length; i++) {
      let w = terms[i];
      w = parseNumeric$1(w);

      if (!w || w === 'and') {
        continue;
      }

      if (w === '-' || w === 'negative') {
        isNegative = true;
        continue;
      }

      if (w.charAt(0) === '-') {
        isNegative = true;
        w = w.substr(1);
      } //decimal mode


      if (w === 'point') {
        sum += section_sum(has);
        sum += parseDecimals(terms.slice(i + 1, terms.length));
        sum *= modifier.amount;
        return sum;
      } //improper fraction


      const fm = w.match(improperFraction);

      if (fm) {
        const num = parseFloat(fm[1].replace(/[, ]/g, ''));
        const denom = parseFloat(fm[2].replace(/[, ]/g, ''));

        if (denom) {
          sum += num / denom || 0;
        }

        continue;
      } // try to support 'two fifty'


      if (words.tens.hasOwnProperty(w)) {
        if (has.ones && Object.keys(has).length === 1) {
          sum = has.ones * 100;
          has = {};
        }
      } //prevent mismatched units, like 'seven eleven' if not a fraction


      if (isValid(w, has) === false) {
        return null;
      } //buildOut section, collect 'has' values


      if (/^[0-9\.]+$/.test(w)) {
        has['ones'] = parseFloat(w); //not technically right
      } else if (words.ones.hasOwnProperty(w) === true) {
        has['ones'] = words.ones[w];
      } else if (words.teens.hasOwnProperty(w) === true) {
        has['teens'] = words.teens[w];
      } else if (words.tens.hasOwnProperty(w) === true) {
        has['tens'] = words.tens[w];
      } else if (words.multiples.hasOwnProperty(w) === true) {
        let mult = words.multiples[w]; //something has gone wrong : 'two hundred five hundred'
        //possibly because it's a fraction

        if (mult === last_mult) {
          return null;
        } //support 'hundred thousand'
        //this one is tricky..


        if (mult === 100 && terms[i + 1] !== undefined) {
          const w2 = terms[i + 1];

          if (words.multiples[w2]) {
            mult *= words.multiples[w2]; //hundredThousand/hundredMillion

            i += 1;
          }
        } //natural order of things
        //five thousand, one hundred..


        if (last_mult === null || mult < last_mult) {
          sum += (section_sum(has) || 1) * mult;
          last_mult = mult;
          has = {};
        } else {
          //maybe hundred .. thousand
          sum += section_sum(has);
          last_mult = mult;
          sum = (sum || 1) * mult;
          has = {};
        }
      }
    } //dump the remaining has values


    sum += section_sum(has); //post-process add modifier

    sum *= modifier.amount;
    sum *= isNegative ? -1 : 1; //dont return 0, if it went straight-through

    if (sum === 0 && Object.keys(has).length === 0) {
      return null;
    }

    return sum;
  };

  var toNumber$1 = parse$5;

  const endS = /s$/;
  const parseText$1 = toNumber$1; // just using .toNumber() again may risk an infinite-loop

  const parseNumber$4 = function (m) {
    let str = m.text('reduced');
    return parseText$1(str);
  };

  let mapping = {
    half: 2,
    halve: 2,
    quarter: 4
  };

  const slashForm = function (m) {
    let str = m.text('reduced');
    let found = str.match(/^([-+]?[0-9]+)\/([-+]?[0-9]+)(st|nd|rd|th)?s?$/);

    if (found && found[1] && found[0]) {
      return {
        numerator: Number(found[1]),
        denominator: Number(found[2])
      };
    }

    return null;
  }; // parse '4 out of 4'


  const nOutOfN = function (m) {
    let found = m.match('[<num>#Value+] out of every? [<den>#Value+]');

    if (found.found !== true) {
      return null;
    }

    let {
      num,
      den
    } = found.groups();

    if (!num || !den) {
      return null;
    }

    num = parseNumber$4(num);
    den = parseNumber$4(den);

    if (typeof num === 'number' && typeof den === 'number') {
      return {
        numerator: num,
        denominator: den
      };
    }

    return null;
  }; // parse 'five thirds'


  const nOrinalth = function (m) {
    let found = m.match('[<num>(#Cardinal|a)+] [<dem>#Fraction+]');

    if (found.found !== true) {
      return null;
    }

    let {
      num,
      dem
    } = found.groups(); // -- parse numerator---
    // quick-support for 'a third'

    if (num.has('a')) {
      num = 1;
    } else {
      // abuse the number-parser for 'thirty three'
      // let tmp = num.clone().unTag('Fraction')
      // num = tmp.numbers().get(0)
      num = parseNumber$4(num);
    } // -- parse denominator --
    // turn 'thirds' into third


    let str = dem.text('reduced');

    if (endS.test(str)) {
      str = str.replace(endS, '');
      dem.replaceWith(str);
    } // support 'one half' as '1/2'


    if (mapping.hasOwnProperty(str)) {
      dem = mapping[str];
    } else {
      // dem = dem.numbers().get(0)
      dem = parseNumber$4(dem);
    }

    if (typeof num === 'number' && typeof dem === 'number') {
      return {
        numerator: num,
        denominator: dem
      };
    }

    return null;
  }; // implied 1 in '100th of a', 'fifth of a'


  const oneNth = function (m) {
    let found = m.match('^#Ordinal$');

    if (found.found !== true) {
      return null;
    } // ensure it's '100th of a '


    if (m.lookAhead('^of .')) {
      // let num = found.numbers().get(0)
      let num = parseNumber$4(found);
      return {
        numerator: 1,
        denominator: num
      };
    }

    return null;
  }; // 'half'


  const named = function (m) {
    let str = m.text('reduced');

    if (mapping.hasOwnProperty(str)) {
      return {
        numerator: 1,
        denominator: mapping[str]
      };
    }

    return null;
  };

  const round = n => {
    let rounded = Math.round(n * 1000) / 1000; // don't round 1 millionth down into 0

    if (rounded === 0 && n !== 0) {
      return n;
    }

    return rounded;
  };

  const parseFraction$1 = function (m) {
    m = m.clone();
    let res = named(m) || slashForm(m) || nOutOfN(m) || nOrinalth(m) || oneNth(m) || null;

    if (res !== null) {
      // do the math
      if (res.numerator && res.denominator) {
        res.decimal = res.numerator / res.denominator;
        res.decimal = round(res.decimal);
      }
    }

    return res;
  };

  var parse$4 = parseFraction$1;

  const parseText = toNumber$1;
  const parseFraction = parse$4;

  const parseNumeric = function (str, p, isFraction) {
    str = str.replace(/,/g, ''); //parse a numeric-number (easy)

    let arr = str.split(/^([^0-9]*)([0-9.,]*)([^0-9]*)$/);

    if (arr && arr[2] && p.terms().length < 2) {
      let num = parseFloat(arr[2] || str); //ensure that num is an actual number

      if (typeof num !== 'number') {
        num = null;
      } // strip an ordinal off the suffix


      let suffix = arr[3] || '';

      if (suffix === 'st' || suffix === 'nd' || suffix === 'rd' || suffix === 'th') {
        suffix = '';
      } // support M for million, k for thousand


      if (suffix === 'm' || suffix === 'M') {
        num *= 1000000;
        suffix = '';
      }

      if (suffix === 'k' || suffix === 'k') {
        num *= 1000;
        suffix = '';
      }

      num = isFraction ? 1 / num : num;
      return {
        prefix: arr[1] || '',
        num: num,
        suffix: suffix
      };
    }

    return null;
  }; // get a numeric value from this phrase


  const parseNumber$3 = function (m) {
    let str = m.text('reduced'); // is it in '3,123' format?

    let hasComma = /[0-9],[0-9]/.test(m.text('text')); // parse a numeric-number like '$4.00'

    let res = parseNumeric(str, m);

    if (res !== null) {
      res.hasComma = hasComma;
      return res;
    } // -- parse text-formats --
    // Fractions: remove 'and a half' etc. from the end


    let frPart = m.match('#Fraction #Fraction+$');
    frPart = frPart.found === false ? m.match('^#Fraction$') : frPart;
    let fraction = null;

    if (frPart.found) {
      // fraction = frPart.fractions().get(0)
      fraction = parseFraction(frPart); // remove it from our string

      m = m.not(frPart);
      m = m.not('and$');
      str = m.text('reduced');
    }

    let num = 0;

    if (str) {
      num = parseText(str) || 0;
    } // apply numeric fraction


    if (fraction && fraction.decimal) {
      num += fraction.decimal;
    }

    return {
      hasComma: hasComma,
      prefix: '',
      num: num,
      suffix: ''
    };
  };

  var parse$3 = parseNumber$3;

  const agreeUnits$1 = function (agree, val, obj) {
    if (agree === false) {
      return;
    }

    let unit = val.lookAhead('^(#Unit|#Noun)'); // don't do these

    if (unit.has('(#Address|#Money|#Percent)') || val.has('#Ordinal')) {
      return;
    }

    if (obj.num === 1) {
      unit.nouns().toSingular();
    } else if (unit.has('#Singular')) {
      unit.nouns().toPlural();
    }
  };

  var _agreeUnits = agreeUnits$1;

  /**
   * turn big numbers, like 2.3e+22, into a string with a ton of trailing 0's
   * */

  const numToString = function (n) {
    if (n < 1000000) {
      return String(n);
    }

    let str;

    if (typeof n === 'number') {
      str = n.toFixed(0);
    } else {
      str = n;
    }

    if (str.indexOf('e+') === -1) {
      return str;
    }

    return str.replace('.', '').split('e+').reduce(function (p, b) {
      return p + Array(b - p.length + 2).join(0);
    });
  };

  var _toString = numToString; // console.log(numToString(2.5e+22));

  const toString$2 = _toString;
  /**
   * turns an integer/float into.ber, like 'fifty-five'
   */

  const tens_mapping = [['ninety', 90], ['eighty', 80], ['seventy', 70], ['sixty', 60], ['fifty', 50], ['forty', 40], ['thirty', 30], ['twenty', 20]];
  const ones_mapping = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  const sequence = [[1e24, 'septillion'], [1e20, 'hundred sextillion'], [1e21, 'sextillion'], [1e20, 'hundred quintillion'], [1e18, 'quintillion'], [1e17, 'hundred quadrillion'], [1e15, 'quadrillion'], [1e14, 'hundred trillion'], [1e12, 'trillion'], [1e11, 'hundred billion'], [1e9, 'billion'], [1e8, 'hundred million'], [1e6, 'million'], [100000, 'hundred thousand'], [1000, 'thousand'], [100, 'hundred'], [1, 'one']]; //turn number into an array of magnitudes, like [[5, million], [2, hundred]]

  const breakdown_magnitudes = function (num) {
    let working = num;
    let have = [];
    sequence.forEach(a => {
      if (num >= a[0]) {
        let howmany = Math.floor(working / a[0]);
        working -= howmany * a[0];

        if (howmany) {
          have.push({
            unit: a[1],
            count: howmany
          });
        }
      }
    });
    return have;
  }; //turn numbers from 100-0 into their text


  const breakdown_hundred = function (num) {
    let arr = [];

    if (num > 100) {
      return arr; //something bad happened..
    }

    for (let i = 0; i < tens_mapping.length; i++) {
      if (num >= tens_mapping[i][1]) {
        num -= tens_mapping[i][1];
        arr.push(tens_mapping[i][0]);
      }
    } //(hopefully) we should only have 20-0 now


    if (ones_mapping[num]) {
      arr.push(ones_mapping[num]);
    }

    return arr;
  };
  /** print-out 'point eight nine'*/


  const handle_decimal = num => {
    const names = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    let arr = []; //parse it out like a string, because js math is such shit

    let str = toString$2(num);
    let decimal = str.match(/\.([0-9]+)/);

    if (!decimal || !decimal[0]) {
      return arr;
    }

    arr.push('point');
    let decimals = decimal[0].split('');

    for (let i = 0; i < decimals.length; i++) {
      arr.push(names[decimals[i]]);
    }

    return arr;
  };
  /** turns an integer into a textual number */


  const to_text = function (num) {
    // handle zero, quickly
    if (num === 0 || num === '0') {
      return 'zero'; // no?
    } //big numbers, north of sextillion, aren't gonna work well..
    //keep them small..


    if (num > 1e21) {
      num = toString$2(num);
    }

    let arr = []; //handle negative numbers

    if (num < 0) {
      arr.push('minus');
      num = Math.abs(num);
    } //break-down into units, counts


    let units = breakdown_magnitudes(num); //build-up the string from its components

    for (let i = 0; i < units.length; i++) {
      let unit_name = units[i].unit;

      if (unit_name === 'one') {
        unit_name = ''; //put an 'and' in here

        if (arr.length > 1) {
          arr.push('and');
        }
      }

      arr = arr.concat(breakdown_hundred(units[i].count));
      arr.push(unit_name);
    } //also support decimals - 'point eight'


    arr = arr.concat(handle_decimal(num)); //remove empties

    arr = arr.filter(s => s);

    if (arr.length === 0) {
      arr[0] = '';
    }

    return arr.join(' ');
  };

  var toText$2 = to_text; // console.log(to_text(-1000.8));

  const toString$1 = _toString;
  /**
   * turn a number like 5 into an ordinal like 5th
   */

  const numOrdinal$1 = function (num) {
    if (!num && num !== 0) {
      return null;
    } //the teens are all 'th'


    let tens = num % 100;

    if (tens > 10 && tens < 20) {
      return String(num) + 'th';
    } //the rest of 'em


    const mapping = {
      0: 'th',
      1: 'st',
      2: 'nd',
      3: 'rd'
    };
    let str = toString$1(num);
    let last = str.slice(str.length - 1, str.length);

    if (mapping[last]) {
      str += mapping[last];
    } else {
      str += 'th';
    }

    return str;
  };

  var numOrdinal_1 = numOrdinal$1;

  const textValue = toText$2; // const toString = require('../_toString')

  const irregulars = {
    one: 'first',
    two: 'second',
    three: 'third',
    five: 'fifth',
    eight: 'eighth',
    nine: 'ninth',
    twelve: 'twelfth',
    twenty: 'twentieth',
    thirty: 'thirtieth',
    forty: 'fortieth',
    fourty: 'fourtieth',
    fifty: 'fiftieth',
    sixty: 'sixtieth',
    seventy: 'seventieth',
    eighty: 'eightieth',
    ninety: 'ninetieth'
  };
  /**
   * convert a javascript number to 'twentieth' format
   * */

  const textOrdinal$1 = num => {
    let words = textValue(num).split(' '); //convert the last number to an ordinal

    let last = words[words.length - 1];

    if (irregulars.hasOwnProperty(last)) {
      words[words.length - 1] = irregulars[last];
    } else {
      words[words.length - 1] = last.replace(/y$/, 'i') + 'th';
    }

    return words.join(' ');
  };

  var textOrdinal_1 = textOrdinal$1;

  const prefixes$1 = {
    '¢': 'cents',
    $: 'dollars',
    '£': 'pounds',
    '¥': 'yen',
    '€': 'euros',
    '₡': 'colón',
    '฿': 'baht',
    '₭': 'kip',
    '₩': 'won',
    '₹': 'rupees',
    '₽': 'ruble',
    '₺': 'liras'
  };
  const suffixes$1 = {
    '%': 'percent',
    s: 'seconds',
    cm: 'centimetres',
    km: 'kilometres'
  };
  var _symbols = {
    prefixes: prefixes$1,
    suffixes: suffixes$1
  };

  const toString = _toString;
  const toText$1 = toText$2;
  const numOrdinal = numOrdinal_1;
  const textOrdinal = textOrdinal_1;
  const symbols$1 = _symbols;
  const prefixes = symbols$1.prefixes;
  const suffixes = symbols$1.suffixes;
  const isCurrency = {
    usd: true,
    eur: true,
    jpy: true,
    gbp: true,
    cad: true,
    aud: true,
    chf: true,
    cny: true,
    hkd: true,
    nzd: true,
    kr: true,
    rub: true
  }; // convert $ to 'dollars', etc

  const prefixToText = function (obj) {
    // turn 5% to 'five percent'
    if (prefixes.hasOwnProperty(obj.prefix)) {
      obj.suffix += prefixes[obj.prefix];
      obj.prefix = '';
    } //turn 5km to 'five kilometres'


    if (suffixes.hasOwnProperty(obj.suffix)) {
      obj.suffix = suffixes[obj.suffix];
    } //uppercase lost case for 'USD', etc


    if (isCurrency.hasOwnProperty(obj.suffix)) {
      obj.suffix = obj.suffix.toUpperCase();
    } // add a space, if it exists


    if (obj.suffix) {
      obj.suffix = ' ' + obj.suffix;
    }

    return obj;
  }; //business-logic for converting a cardinal-number to other forms


  const makeNumber$2 = function (obj, isText, isOrdinal) {
    let num = String(obj.num);

    if (isText) {
      obj = prefixToText(obj);

      if (isOrdinal) {
        //ordinal-text
        num = textOrdinal(num);
        return `${obj.prefix || ''}${num}${obj.suffix || ''}`;
      } //cardinal-text


      num = toText$1(num);
      return `${obj.prefix || ''}${num}${obj.suffix || ''}`;
    } //ordinal-number


    if (isOrdinal) {
      num = numOrdinal(num); // support '5th percent'

      obj = prefixToText(obj);
      return `${obj.prefix || ''}${num}${obj.suffix || ''}`;
    } // support comma format


    if (obj.hasComma === true) {
      num = obj.num.toLocaleString();
    } // cardinal-number


    num = toString(num); // support very large numbers

    return `${obj.prefix || ''}${num}${obj.suffix || ''}`;
  };

  var makeNumber_1 = makeNumber$2;

  const parseNumber$2 = parse$3;
  const agreeUnits = _agreeUnits;
  const makeNumber$1 = makeNumber_1;
  const toNumber = toNumber$1;
  let methods$3 = {
    /** overloaded json method with additional number information */
    json: function (options) {
      let n = null;

      if (typeof options === 'number') {
        n = options;
        options = null;
      }

      options = options || {
        text: true,
        normal: true,
        trim: true,
        terms: true
      };
      let res = [];
      this.forEach(doc => {
        let json = doc.json(options)[0];
        let obj = parseNumber$2(doc);
        json.prefix = obj.prefix;
        json.number = obj.num;
        json.suffix = obj.suffix;
        json.cardinal = makeNumber$1(obj, false, false);
        json.ordinal = makeNumber$1(obj, false, true);
        json.textCardinal = makeNumber$1(obj, true, false);
        json.textOrdinal = makeNumber$1(obj, true, true);
        res.push(json);
      });

      if (n !== null) {
        return res[n];
      }

      return res;
    },

    /** two of what? */
    units: function () {
      let m = this.lookAhead('(#Unit|#Noun)+');
      m = m.splitAfter('@hasComma').first();
      m = m.not('#Pronoun');
      return m.first();
    },

    /** return only ordinal numbers */
    isOrdinal: function () {
      return this.if('#Ordinal');
    },

    /** return only cardinal numbers*/
    isCardinal: function () {
      return this.if('#Cardinal');
    },

    /** convert to numeric form like '8' or '8th' */
    toNumber: function () {
      this.forEach(val => {
        let obj = parseNumber$2(val);

        if (obj.num === null) {
          return;
        }

        let str = makeNumber$1(obj, false, val.has('#Ordinal'));
        val.replaceWith(str, true);
        val.tag('NumericValue');
      });
      return this;
    },

    /** add commas, or nicer formatting for numbers */
    toLocaleString: function () {
      this.forEach(val => {
        let obj = parseNumber$2(val);

        if (obj.num === null) {
          return;
        }

        obj.num = obj.num.toLocaleString();
        let str = makeNumber$1(obj, false, val.has('#Ordinal'));
        val.replaceWith(str, true);
      });
      return this;
    },

    /** convert to text form - like 'eight' or 'eigth'*/
    toText: function () {
      this.forEach(val => {
        let obj = parseNumber$2(val);

        if (obj.num === null) {
          return;
        }

        let str = makeNumber$1(obj, true, val.has('#Ordinal'));
        val.replaceWith(str, true);
        val.tag('TextValue');
      });
      return this;
    },

    /** convert to cardinal form, like 'eight', or '8' */
    toCardinal: function (agree) {
      let m = this.if('#Ordinal');
      m.forEach(val => {
        let obj = parseNumber$2(val);

        if (obj.num === null) {
          return;
        }

        let str = makeNumber$1(obj, val.has('#TextValue'), false); // a hack for number-ranges

        if (val.has('#NumberRange')) {
          let t = val.termList()[0];

          if (t.text && t.post === '') {
            t.post = ' ';
          }
        } // change the number text


        val.replaceWith(str, true);
        val.tag('Cardinal'); // turn unit into plural -> 'seven beers'

        agreeUnits(agree, val, obj);
      });
      return this;
    },

    /** convert to ordinal form, like 'eighth', or '8th' */
    toOrdinal: function () {
      let m = this.if('#Cardinal');
      m.forEach(val => {
        let obj = parseNumber$2(val);

        if (obj.num === null) {
          return;
        }

        let str = makeNumber$1(obj, val.has('#TextValue'), true); // a hack for number-ranges

        if (val.has('#NumberRange')) {
          let t = val.termList()[0];

          if (t.text && t.post === '') {
            t.post = ' ';
          }
        } // change the number text


        val.replaceWith(str, true);
        val.tag('Ordinal'); // turn unit into singular -> 'seventh beer'

        let unit = this.lookAhead('^#Plural');

        if (unit.found) {
          unit.nouns().toSingular();
        }
      });
      return this;
    },

    /** return only numbers that are == n */
    isEqual: function (n) {
      return this.filter(val => {
        let num = parseNumber$2(val).num;
        return num === n;
      });
    },

    /** return only numbers that are > n*/
    greaterThan: function (n) {
      return this.filter(val => {
        let num = parseNumber$2(val).num;
        return num > n;
      });
    },

    /** return only numbers that are < n*/
    lessThan: function (n) {
      return this.filter(val => {
        let num = parseNumber$2(val).num;
        return num < n;
      });
    },

    /** return only numbers > min and < max */
    between: function (min, max) {
      return this.filter(val => {
        let num = parseNumber$2(val).num;
        return num > min && num < max;
      });
    },

    /** set these number to n */
    set: function (n, agree) {
      if (n === undefined) {
        return this; // don't bother
      }

      if (typeof n === 'string') {
        n = toNumber(n);
      }

      this.forEach(val => {
        let obj = parseNumber$2(val);
        obj.num = n;

        if (obj.num === null) {
          return;
        }

        let str = makeNumber$1(obj, val.has('#TextValue'), val.has('#Ordinal'));
        val = val.not('#Currency');
        val.replaceWith(str, true); // handle plural/singular unit

        agreeUnits(agree, val, obj);
      });
      return this;
    },
    add: function (n, agree) {
      if (!n) {
        return this; // don't bother
      }

      if (typeof n === 'string') {
        n = toNumber(n);
      }

      this.forEach(val => {
        let obj = parseNumber$2(val);

        if (obj.num === null) {
          return;
        }

        obj.num += n;
        let str = makeNumber$1(obj, val.has('#TextValue'), val.has('#Ordinal'));
        val = val.not('#Currency');
        val.replaceWith(str, true); // handle plural/singular unit

        agreeUnits(agree, val, obj);
      });
      return this;
    },

    /** decrease each number by n*/
    subtract: function (n, agree) {
      return this.add(n * -1, agree);
    },

    /** increase each number by 1 */
    increment: function (agree) {
      this.add(1, agree);
      return this;
    },

    /** decrease each number by 1 */
    decrement: function (agree) {
      this.add(-1, agree);
      return this;
    },

    /** return things like CCXX*/
    romanNumerals: function (n) {
      let m = this.match('#RomanNumeral').numbers();

      if (typeof n === 'number') {
        m = m.get(n);
      }

      return m;
    },

    /** split-apart suffix and number */
    normalize: function () {
      const keep = {
        '%': true
      };
      this.forEach(val => {
        let obj = parseNumber$2(val);

        if (obj.num !== null && obj.suffix && keep[obj.suffix] !== true) {
          let prefix = obj.prefix || '';
          val = val.replaceWith(prefix + obj.num + ' ' + obj.suffix);
          return;
        }
      });
      return this;
    },

    /** retrieve the parsed number */
    get: function (n) {
      let arr = [];
      this.forEach(doc => {
        arr.push(parseNumber$2(doc).num);
      });

      if (n !== undefined) {
        return arr[n] || null;
      }

      return arr || null;
    }
  }; // aliases

  methods$3.toNice = methods$3.toLocaleString;
  methods$3.isBetween = methods$3.between;
  methods$3.minus = methods$3.subtract;
  methods$3.plus = methods$3.add;
  methods$3.equals = methods$3.isEqual;
  var methods_1$1 = methods$3;

  const parseNumber$1 = parse$3;

  const parse$2 = function (m) {
    let num = parseNumber$1(m).num;

    if (typeof num === 'number') {
      return num / 100;
    }

    return null;
  };

  var methods$2 = {
    /** get the money info */
    get: function (n) {
      let arr = [];
      this.forEach(doc => {
        let num = parse$2(doc);

        if (num !== null) {
          arr.push(num);
        }
      });

      if (n !== undefined) {
        return arr[n] || null;
      }

      return arr || null;
    },

    /** overloaded json method with additional number information */
    json: function (options) {
      let n = null;

      if (typeof options === 'number') {
        n = options;
        options = null;
      }

      options = options || {
        text: true,
        normal: true,
        trim: true,
        terms: true
      };
      let res = [];
      this.forEach(m => {
        let json = m.json(options)[0];
        let dec = parse$2(m);
        json.number = dec;

        if (dec !== null) {
          let full = dec * 100;
          json.textNumber = `${full} percent`;
          json.cardinal = `${full}%`;
        }

        res.push(json);
      });

      if (n !== null) {
        return res[n] || {};
      }

      return res;
    },
    // turn 80% to 8/100
    toFraction: function () {
      this.forEach(doc => {
        let num = parse$2(doc);

        if (num !== null) {
          num *= 100;
          num = Math.round(num * 100) / 100;
          let str = `${num}/100`;
          this.replace(doc, str);
        }
      });
      return this;
    }
  };

  var currencies$2 = [{
    dem: 'american',
    name: 'dollar',
    iso: 'usd',
    sub: 'cent',
    sym: ['$', 'US$', 'U$']
  }, {
    name: 'euro',
    iso: 'eur',
    sub: 'cent',
    sym: ['€']
  }, {
    dem: 'british',
    name: 'pound',
    iso: 'gbp',
    sub: 'penny',
    alias: {
      sterling: true
    },
    sym: ['£']
  }, {
    name: 'renminbi',
    iso: 'cny',
    plural: 'yuán',
    // sub: 'yuán',
    alias: {
      yuan: true
    },
    sym: ['元'] //'¥'

  }, {
    dem: 'japanese',
    name: 'yen',
    iso: 'jpy',
    sub: 'sen',
    sym: ['¥', '円', '圓']
  }, // kr
  {
    dem: 'swedish',
    name: 'krona',
    iso: 'sek',
    sub: 'öre',
    alias: {
      ore: true,
      kronor: true
    },
    sym: ['kr']
  }, {
    dem: 'estonian',
    name: 'kroon',
    iso: 'eek',
    sub: 'sent',
    sym: ['kr']
  }, {
    dem: 'norwegian',
    name: 'krone',
    iso: 'nok',
    sub: 'øre',
    sym: ['kr']
  }, {
    dem: 'icelandic',
    name: 'króna',
    iso: 'isk',
    sym: ['kr']
  }, {
    dem: 'danish',
    name: 'krone',
    iso: 'dkk',
    sub: 'øre',
    sym: ['kr.']
  }, // {
  //   dem: 'scandinavian',
  //   name: 'Monetary Union',
  //   sub: 'øre',
  //   sym: ['kr.'],
  // },
  // 'k'
  {
    dem: 'zambian',
    name: 'kwacha',
    iso: 'zmw',
    sub: 'ngwee',
    sym: ['K']
  }, {
    dem: 'malawian',
    name: 'kwacha',
    iso: 'mwk',
    sub: 'tambala',
    sym: ['K']
  }, // misc
  {
    dem: 'greek',
    name: 'drachma',
    iso: 'grd',
    sub: 'leptοn',
    sym: ['Δρχ.', 'Δρ.', '₯']
  }, {
    dem: 'eastern caribbean',
    name: 'dollar',
    iso: 'xcd',
    sub: 'cent',
    sym: ['$']
  }, {
    dem: 'finnish',
    name: 'markka',
    iso: 'fim',
    sub: 'penni',
    sym: ['mk']
  }, {
    dem: 'polish',
    name: 'złoty',
    iso: 'pln',
    sub: 'grosz',
    sym: ['zł']
  }, {
    dem: 'slovenian',
    name: 'tolar',
    iso: 'sit',
    sub: 'stotin',
    sym: []
  }, {
    dem: 'australian',
    name: 'dollar',
    iso: 'aud',
    sub: 'cent',
    sym: ['$', 'A$', 'AU$']
  }, {
    dem: 'deutsche',
    name: 'mark',
    iso: 'dem',
    sub: 'pfennig',
    sym: ['DM']
  }, {
    dem: 'thai',
    name: 'baht',
    iso: 'thb',
    sub: 'satang',
    sym: ['฿']
  }, {
    dem: 'canadian',
    name: 'dollar',
    iso: 'cad',
    sub: 'cent',
    sym: ['$', 'Can$', 'C$', 'CA$', 'CAD']
  }, {
    dem: 'mexican',
    name: 'peso',
    iso: 'mxn',
    sub: 'centavo',
    sym: ['$', 'Mex$']
  }, {
    dem: 'spanish',
    name: 'peseta',
    iso: 'esp',
    sub: 'céntimo',
    sym: ['Pta']
  }, {
    dem: 'new zealand',
    name: 'dollar',
    iso: 'nzd',
    sub: 'cent',
    sym: ['$', 'NZ$']
  }, {
    dem: 'chilean',
    name: 'peso',
    iso: 'clp',
    sub: 'centavo',
    sym: ['Cifrão', '$']
  }, {
    dem: 'nigerian',
    name: 'naira',
    iso: 'ngn',
    sub: 'kobo',
    sym: ['₦']
  }, {
    dem: 'austrian',
    name: 'schilling',
    iso: 'ats',
    sub: 'groschen',
    sym: ['S', 'öS']
  }, {
    dem: 'guatemalan',
    name: 'quetzal',
    iso: 'gtq',
    sub: 'centavo',
    sym: ['Q']
  }, {
    dem: 'philippine',
    name: 'peso',
    iso: 'php',
    sub: 'sentimo',
    sym: ['₱']
  }, {
    dem: 'hungarian',
    name: 'forint',
    iso: 'huf',
    // sub: 'fillér',
    sym: ['Ft']
  }, {
    dem: 'russian',
    name: 'ruble',
    iso: 'rub',
    sub: 'kopeyka',
    sym: ['₽', 'руб', 'р.']
  }, {
    dem: 'kuwaiti',
    name: 'dinar',
    iso: 'kwd',
    sub: 'fils',
    sym: ['د.ك', 'KD']
  }, {
    dem: 'israeli',
    name: 'new shekel',
    iso: 'ils',
    sub: 'agora',
    sym: ['₪']
  }, {
    dem: 'latvian',
    name: 'lats',
    iso: 'lvl',
    sub: 'santīms',
    sym: ['Ls']
  }, {
    dem: 'kazakhstani',
    name: 'tenge',
    iso: 'kzt',
    sub: 'tıyn',
    sym: ['₸']
  }, {
    dem: 'iraqi',
    name: 'dinar',
    iso: 'iqd',
    sub: 'fils',
    sym: ['د.ع']
  }, {
    dem: 'bahamian',
    name: 'dollar',
    iso: 'bsd',
    sub: 'cent',
    sym: ['$', 'B$']
  }, {
    dem: 'seychellois',
    name: 'rupee',
    iso: 'scr',
    sub: 'cent',
    sym: ['SCR', 'SR']
  }, {
    dem: 'albanian',
    name: 'lek',
    iso: 'all',
    sub: 'qindarkë',
    sym: ['L']
  }, {
    dem: 'bulgarian',
    name: 'lev',
    iso: 'bgn',
    sub: 'stotinka',
    sym: ['лв.']
  }, {
    dem: 'irish',
    name: 'pound',
    iso: 'iep',
    sym: ['£', 'IR£']
  }, {
    name: 'cfp franc',
    iso: 'xpf',
    sym: ['f']
  }, {
    dem: 'south african',
    name: 'rand',
    iso: 'zar',
    sub: 'cent',
    sym: ['R']
  }, {
    dem: 'south korean',
    name: 'won',
    iso: 'krw',
    sub: 'jeon',
    plural: 'won',
    sym: ['₩']
  }, {
    dem: 'north korean',
    name: 'won',
    iso: 'kpw',
    sub: 'chon',
    plural: 'won',
    sym: ['₩']
  }, {
    dem: 'portuguese',
    name: 'escudo',
    iso: 'pte',
    sub: 'centavo',
    sym: []
  }, {
    dem: 'ghanaian',
    name: 'cedi',
    iso: 'ghs',
    sub: 'pesewa',
    sym: ['GH₵']
  }, {
    dem: 'hong kong',
    name: 'dollar',
    iso: 'hkd',
    sub: '毫',
    sym: ['$']
  }, {
    dem: 'new taiwan',
    name: 'dollar',
    iso: 'twd',
    sub: 'dime',
    sym: ['NT$']
  }, {
    dem: 'east german',
    name: 'mark',
    iso: 'ddm',
    sub: 'pfennig',
    sym: ['M']
  }, {
    dem: 'namibian',
    name: 'dollar',
    iso: 'nad',
    sub: 'cent',
    sym: ['$']
  }, {
    dem: 'malaysian',
    name: 'ringgit',
    iso: 'myr',
    sub: 'sen',
    sym: ['RM']
  }, {
    dem: 'swiss',
    name: 'franc',
    iso: 'chf',
    sym: ['Rp.']
  }, {
    dem: 'panamanian',
    name: 'balboa',
    iso: 'pab',
    sub: 'centésimo',
    sym: ['B/.']
  }, {
    dem: 'indonesian',
    name: 'rupiah',
    iso: 'idr',
    sub: 'sen',
    sym: ['Rp']
  }, {
    dem: 'brunei',
    name: 'dollar',
    iso: 'bnd',
    sub: 'sen',
    sym: ['$', 'B$']
  }, {
    dem: 'venezuelan',
    name: 'bolívar',
    iso: 'vef',
    sub: 'céntimo',
    sym: ['Bs.F', 'Bs.']
  }, {
    dem: 'macedonian',
    name: 'denar',
    iso: 'mkd',
    sub: 'deni',
    sym: ['den']
  }, {
    dem: 'mauritanian',
    name: 'ouguiya',
    iso: 'mru',
    sub: 'khoums',
    sym: ['UM']
  }, {
    dem: 'argentine',
    name: 'peso',
    iso: 'ars',
    sub: 'centavo',
    sym: ['$']
  }, {
    dem: 'libyan',
    name: 'dinar',
    iso: 'lyd',
    sub: 'dirham',
    sym: ['LD', 'ل.د']
  }, {
    dem: 'jordanian',
    name: 'dinar',
    iso: 'jod',
    sub: 'dirham',
    sym: ['د.أ']
  }, {
    dem: 'french',
    name: 'franc',
    iso: 'frf',
    sub: 'centime',
    sym: ['F', 'Fr', 'FF', '₣']
  }, {
    dem: 'syrian',
    name: 'pound',
    iso: 'syp',
    sub: 'piastre',
    sym: ['LS', '£S']
  }, {
    dem: 'belize',
    name: 'dollar',
    iso: 'bzd',
    sub: 'cent',
    sym: ['$']
  }, {
    dem: 'saudi',
    name: 'riyal',
    iso: 'sar',
    sub: 'halalah',
    sym: ['SAR', 'ر.س', ' ﷼']
  }, {
    dem: 'surinamese',
    name: 'dollar',
    iso: 'srd',
    sub: 'cent',
    sym: ['$']
  }, {
    dem: 'singapore',
    name: 'dollar',
    iso: 'sgd',
    sub: 'cent',
    sym: ['S$', '$']
  }, {
    dem: 'nepalese',
    name: 'rupee',
    iso: 'npr',
    sub: 'paisa',
    sym: ['रु ₨', 'Re']
  }, // {
  //   dem: 'macanese',
  //   name: 'pataca',
  //   iso: 'mop',
  //   sub: 'ho',
  //   sym: ['MOP$'],
  // },
  {
    dem: 'nicaraguan',
    name: 'córdoba',
    iso: 'nio',
    sub: 'centavo',
    sym: ['C$']
  }, {
    dem: 'bangladeshi',
    name: 'taka',
    iso: 'bdt',
    sub: 'poysha',
    sym: ['৳']
  }, {
    dem: 'indian',
    name: 'rupee',
    iso: 'inr',
    sub: 'paisa',
    sym: ['₹']
  }, {
    dem: 'maldivian',
    name: 'rufiyaa',
    iso: 'mvr',
    sub: 'laari',
    sym: ['Rf', 'MRf', 'MVR', '.ރ ']
  }, {
    dem: 'sri lankan',
    name: 'rupee',
    iso: 'lkr',
    sub: 'cents',
    sym: ['Rs', 'රු', 'ரூ']
  }, {
    dem: 'bhutanese',
    name: 'ngultrum',
    iso: 'btn',
    sub: 'chhertum',
    sym: ['Nu.']
  }, {
    dem: 'turkish',
    name: 'lira',
    iso: 'try',
    sub: 'kuruş',
    sym: ['YTL']
  }, {
    dem: 'serbian',
    name: 'dinar',
    iso: 'rsd',
    sub: 'para',
    sym: ['din', 'дин']
  }, {
    dem: 'bosnia and herzegovina',
    name: 'convertible mark',
    iso: 'bam',
    sub: 'fening',
    sym: ['KM']
  }, {
    dem: 'botswana',
    name: 'pula',
    iso: 'bwp',
    sub: 'thebe',
    sym: ['p']
  }, {
    dem: 'swazi',
    name: 'lilangeni',
    iso: 'szl',
    sub: 'cent',
    sym: ['L', 'E']
  }, {
    dem: 'lithuanian',
    name: 'litas',
    iso: 'ltl',
    sub: 'centas',
    sym: ['Lt', 'ct']
  }, {
    dem: 'mauritian',
    name: 'rupee',
    iso: 'mur',
    sub: 'cent',
    sym: ['₨']
  }, {
    dem: 'pakistani',
    name: 'rupee',
    iso: 'pkr',
    sub: 'paisa',
    sym: ['₨']
  }, {
    dem: 'maltese',
    name: 'lira',
    iso: 'mtl',
    sub: 'cent',
    sym: ['₤', 'Lm']
  }, {
    dem: 'cypriot',
    name: 'pound',
    iso: 'cyp',
    sub: 'cent',
    sym: ['£']
  }, {
    dem: 'moldovan',
    name: 'leu',
    iso: 'mdl',
    // sub: 'ban',
    sym: ['l']
  }, {
    dem: 'croatian',
    name: 'kuna',
    iso: 'hrk',
    sub: 'lipa',
    sym: ['kn']
  }, {
    dem: 'afghan',
    name: 'afghani',
    iso: 'afn',
    sub: 'pul',
    sym: ['؋', 'Af', 'Afs']
  }, {
    dem: 'ecuadorian',
    name: 'sucre',
    iso: 'ecs',
    sub: 'centavo',
    sym: ['S/.']
  }, {
    dem: 'sierra leonean',
    name: 'leone',
    iso: 'sll',
    sub: 'cent',
    sym: ['Le']
  } // {
  //
  //   name: 'European Currency Unit',
  //   iso: 'xeu',
  //   sym: ['₠'],
  // },
  // {
  //
  //   name: 'Special drawing rights',
  //   iso: 'xdr',
  //   sym: ['SDR'],
  // },
  // {
  //
  //   name: 'Unidad de Valor Constante',
  //   iso: 'ecv',
  // },
  ];

  const currencies$1 = currencies$2;
  const parseNumber = parse$3; // const isPenny = `(cent|cents|penny|pennies|ore|sent|ngwee|tambala|penni|grosz|pfennig)`
  // aggregate currency symbols for easy lookup
  // const subs = {
  //   pennies: true,
  // }

  const symbols = {};
  let pennies = {};
  currencies$1.forEach(o => {
    o.sym.forEach(str => {
      symbols[str] = symbols[str] || o.iso;
    });
    symbols[o.iso] = symbols[o.iso] || o.iso;

    if (o.sub) {
      pennies[o.sub] = true;
    }
  }); // create a match statement with all the penny-units

  let isPenny = `(${Object.keys(pennies).join('|')})`; // parse 'australian dollars'

  const getNamedCurrency = function (doc) {
    let m = doc.match('#Currency+');
    m.nouns().toSingular(); // 'dollars'➔'dollar'

    let str = m.text('reduced');
    return currencies$1.find(o => {
      // 'mexcan peso'
      if (str === `${o.dem} ${o.name}`) {
        return o;
      } // 'CAD'


      if (str === o.iso) {
        return o;
      } // 'cent'


      if (str === o.sub) {
        return o;
      } // 'peso'


      if (str === o.name) {
        return o;
      } // any other alt names


      if (o.alias && o.alias[str] === true) {
        return o;
      }

      return false;
    });
  }; // turn '£' into GBP


  const getBySymbol = function (obj) {
    // do suffix first, for '$50CAD'
    if (obj.suffix && symbols.hasOwnProperty(obj.suffix)) {
      return currencies$1.find(o => o.iso === symbols[obj.suffix]);
    } // parse prefix for '£50'


    if (obj.prefix && symbols.hasOwnProperty(obj.prefix)) {
      return currencies$1.find(o => o.iso === symbols[obj.prefix]);
    }

    return null;
  }; // five dollars and six cents -> 5.06


  const parseMoney$1 = function (doc) {
    // support 'and five cents' as a decimal
    let decimal = 0;
    let decimalEnd = doc.match(`and #Money+ ${isPenny}`);

    if (decimalEnd.found) {
      doc = doc.not(decimalEnd);
      let res = parseNumber(decimalEnd.match('#Value+'));

      if (res && res.num) {
        decimal = res.num / 100;
      }
    }

    let res = parseNumber(doc);
    let num = res.num || 0;
    num += decimal;
    let found = getBySymbol(res) || getNamedCurrency(doc) || {};
    let sym = '';

    if (found && found.sym) {
      sym = found.sym[0]; // make '50 cents' -> 0.50

      if (num && doc.has(`${isPenny}`)) {
        num = num / 100;
      }
    }

    return {
      num: num,
      iso: found.iso,
      demonym: found.dem,
      currency: found.name,
      plural: found.plural,
      symbol: sym
    };
  };

  var parse$1 = parseMoney$1;

  const makeNumber = makeNumber_1;
  const parseMoney = parse$1;

  const titleCase = function (str = '') {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  const moneyMethods$1 = {
    /** get the money info */
    get: function (n) {
      let arr = [];
      this.forEach(doc => {
        arr.push(parseMoney(doc));
      });

      if (n !== undefined) {
        return arr[n] || null;
      }

      return arr || null;
    },

    /** which currency is this money in? */
    currency: function (n) {
      let arr = [];
      this.forEach(doc => {
        let found = parseMoney(doc);

        if (found) {
          arr.push(found);
        }
      });

      if (typeof n === 'number') {
        return arr[n] || null;
      }

      return arr || null;
    },

    /** overloaded json method with additional number information */
    json: function (options) {
      let n = null;

      if (typeof options === 'number') {
        n = options;
        options = null;
      }

      options = options || {
        text: true,
        normal: true,
        trim: true,
        terms: true
      };
      let res = [];
      this.forEach(doc => {
        let json = doc.json(options)[0];
        let obj = parseMoney(doc);
        json.number = obj.num;

        if (obj.iso) {
          json.iso = obj.iso.toUpperCase();
          json.symbol = obj.symbol;
          json.currency = titleCase(obj.demonym) + ' ' + titleCase(obj.currency);
        } // 'thirty pounds'


        json.textFmt = makeNumber(obj, true, false);

        if (obj.currency) {
          let str = obj.currency;

          if (obj.num !== 1) {
            str = obj.plural || str + 's';
          }

          json.textFmt += ' ' + str;
        }

        res.push(json);
      });

      if (n !== null) {
        return res[n] || {};
      }

      return res;
    }
  };
  var methods$1 = moneyMethods$1;

  var _lib = {};

  const toText = toText$2;
  const toOrdinal = textOrdinal_1; // do some fraction-work
  // create 'one thirds' from {1,3}

  _lib.toText = function (obj) {
    // don't divide by zero!
    if (!obj.numerator || !obj.denominator) {
      return '';
    } // create [two] [fifths]


    let start = toText(obj.numerator);
    let end = toOrdinal(obj.denominator); // 'one secondth' -> 'one half'

    if (obj.denominator === 2) {
      end = 'half';
    }

    if (start && end) {
      if (obj.numerator !== 1) {
        end += 's';
      }

      return `${start} ${end}`;
    }

    return '';
  }; // 'two out of three'


  _lib.textCardinal = function (obj) {
    if (!obj.numerator || !obj.denominator) {
      return '';
    }

    let a = toText(obj.numerator);
    let b = toText(obj.denominator);
    return `${a} out of ${b}`;
  }; // create 1.33 from {1,3}


  _lib.toDecimal = function (obj) {
    return obj.decimal;
  };

  const parse = parse$4;
  const lib = _lib;
  const methods = {
    get: function (n) {
      let arr = [];
      this.forEach(doc => {
        arr.push(parse(doc));
      });

      if (n !== undefined) {
        return arr[n] || null;
      }

      return arr || null;
    },

    // become 0.5
    toDecimal() {
      this.forEach(val => {
        let obj = parse(val);

        if (obj) {
          let num = lib.toDecimal(obj);
          val.replaceWith(String(num), true);
          val.tag('NumericValue');
          val.unTag('Fraction');
        }
      });
      return this;
    },

    /** overloaded json method with additional number information */
    json: function (options) {
      let n = null;

      if (typeof options === 'number') {
        n = options;
        options = null;
      }

      options = options || {
        text: true,
        normal: true,
        trim: true,
        terms: true
      };
      let res = [];
      this.forEach(m => {
        let json = m.json(options)[0];
        let found = parse(m) || {};
        let num = lib.toDecimal(found); // let obj = parseNumber(m, m.has('#Fraction'))

        json.numerator = found.numerator;
        json.denominator = found.denominator;
        json.number = num;
        json.textOrdinal = lib.toText(found);
        json.textCardinal = lib.textCardinal(found);
        res.push(json);
      });

      if (n !== null) {
        return res[n] || {};
      }

      return res;
    },

    /** change 'four out of 10' to 4/10 */
    normalize: function () {
      this.forEach(m => {
        let found = parse(m);

        if (found && typeof found.numerator === 'number' && typeof found.denominator === 'number') {
          let str = `${found.numerator}/${found.denominator}`;
          this.replace(m, str);
        }
      });
      return this;
    },
    // turn the fraction into 'five tenths'
    toText: function (n) {
      let arr = [];
      this.forEach(doc => {
        let obj = parse(doc) || {}; // create [one] [fifth]

        let str = lib.toText(obj);
        doc.replaceWith(str, true);
        doc.tag('Fraction');
      });

      if (n !== undefined) {
        return arr[n];
      }

      return arr;
    },
    // turn 8/10 into 80%
    toPercentage: function () {
      this.forEach(m => {
        let found = parse(m);

        if (found.decimal || found.decimal === 0) {
          let num = found.decimal * 100;
          num = Math.round(num * 100) / 100;
          this.replace(m, `${num}%`);
        }
      });
      return this;
    }
  }; // aliases

  methods.toNumber = methods.toDecimal;
  var methods_1 = methods;

  const multiples = '(hundred|thousand|million|billion|trillion|quadrillion|quintillion|sextillion|septillion)';
  const here$1 = 'fraction-tagger'; // plural-ordinals like 'hundredths' are already tagged as Fraction by compromise

  const tagFractions$1 = function (doc) {
    // hundred
    doc.match(multiples).tag('#Multiple', here$1); // half a penny

    doc.match('[(half|quarter)] of? (a|an)', 0).tag('Fraction', 'millionth'); // nearly half

    doc.match('#Adverb [half]', 0).tag('Fraction', 'nearly-half'); // half the

    doc.match('[half] the', 0).tag('Fraction', 'half-the'); // two-halves

    doc.match('#Value (halves|halfs|quarters)').tag('Fraction', 'two-halves'); // ---ordinals as fractions---
    // a fifth

    doc.match('a #Ordinal').tag('Fraction', 'a-quarter'); // seven fifths

    doc.match('(#Fraction && /s$/)').lookBefore('#Cardinal+$').tag('Fraction'); // one third of ..

    doc.match('[#Cardinal+ #Ordinal] of .', 0).tag('Fraction', 'ordinal-of'); // 100th of

    doc.match('[(#NumericValue && #Ordinal)] of .', 0).tag('Fraction', 'num-ordinal-of'); // a twenty fifth

    doc.match('(a|one) #Cardinal?+ #Ordinal').tag('Fraction', 'a-ordinal'); // doc.match('(a|one) [#Ordinal]', 0).tag('Fraction', 'a-ordinal')
    // values.if('#Ordinal$').tag('Fraction', '4-fifths')
    // seven quarters
    // values.tag('Fraction', '4-quarters')
    // doc.match('(#Value && !#Ordinal)+ (#Ordinal|#Fraction)').tag('Fraction', '4-fifths')
    // 12 and seven fifths
    // doc.match('#Value+ and #Value+ (#Ordinal|half|quarter|#Fraction)').tag('Fraction', 'val-and-ord')
    // fixups
    // doc.match('#Cardinal+? (second|seconds)').unTag('Fraction', '3 seconds')
    // doc.match('#Ordinal (half|quarter)').unTag('Fraction', '2nd quarter')
    // doc.match('#Ordinal #Ordinal+').unTag('Fraction')
    // doc.match('[#Cardinal+? (second|seconds)] of (a|an)', 0).tag('Fraction', here)
    // doc.match(multiples).tag('#Multiple', here)
    // //  '3 out of 5'

    doc.match('#Cardinal+ out? of every? #Cardinal').tag('Fraction', here$1); // // one and a half
    // doc.match('#Cardinal and a (#Fraction && #Value)').tag('Fraction', here)
    // fraction - 'a third of a slice'
    // TODO:fixme
    // m = doc.match(`[(#Cardinal|a) ${ordinals}] of (a|an|the)`, 0).tag('Fraction', 'ord-of')
    // tag 'thirds' as a ordinal
    // m.match('.$').tag('Ordinal', 'plural-ordinal')

    return doc;
  };

  var fractions = tagFractions$1;

  const tagMoney$1 = function (doc) {
    const here = 'money-tagger'; //one hundred and seven dollars

    doc.match('#Money and #Money #Currency?').tag('Money', 'money-and-money'); // $5.032 is invalid money

    doc.match('#Money').not('#TextValue').match('/\\.[0-9]{3}$/').unTag('#Money', 'three-decimal money'); // cleanup currency false-positives

    doc.ifNo('#Value').match('#Currency #Verb').unTag('Currency', 'no-currency'); // 6 dollars and 5 cents

    doc.match('#Value #Currency [and] #Value (cents|ore|centavos|sens)', 0).tag('Money', here); // maybe currencies

    let m = doc.match('[<num>#Value] [<currency>(mark|rand|won|rub|ore)]');
    m.group('num').tag('Money', here);
    m.group('currency').tag('Currency', here);
    return doc;
  };

  var money = tagMoney$1;

  const tagFractions = fractions;
  const tagMoney = money;
  const here = 'number-tag'; // improved tagging for numbers

  const tagger$1 = function (doc) {
    // add #Money + #Currency tags
    doc = tagMoney(doc); //  in the 400s

    doc.match('the [/[0-9]+s$/]').tag('#Plural', here); //half a million

    doc.match('half a? #Value').tag('Value', 'half-a-value'); //(quarter not ready)
    //five and a half

    doc.match('#Value [and a (half|quarter)]', 0).tag(['TextValue', '#Fraction'], 'value-and-a-half'); // add #Fraction tags

    doc = tagFractions(doc); // two and two thirds

    doc.match('#Cardinal and #Fraction #Fraction').tag('Value', here);
  };

  var tagger_1 = tagger$1;

  var tags$1 = {
    Fraction: {
      isA: ['Value']
    },
    Multiple: {
      isA: 'Value'
    }
  };

  const currencies = currencies$2;
  const ambig = {
    mark: true,
    sucre: true,
    leone: true,
    afghani: true,
    rand: true,
    try: true,
    mop: true,
    won: true,
    all: true,
    rub: true,
    eek: true,
    sit: true,
    bam: true,
    npr: true,
    leu: true
  };
  let lex = {
    kronor: 'Currency'
  };
  currencies.forEach(o => {
    if (o.iso && !ambig[o.iso]) {
      lex[o.iso] = ['Acronym', 'Currency'];
    }

    let name = o.name;

    if (name && !ambig[name]) {
      lex[name] = 'Currency';
      lex[name + 's'] = 'Currency';
    }

    if (o.dem) {
      let dem = o.dem;
      lex[`${dem} ${name}`] = 'Currency';
      lex[`${dem} ${name}s`] = 'Currency';
    }

    if (o.sub) {
      lex[o.sub] = 'Currency';
    }
  });
  var lexicon$1 = lex;

  const findMoney = find$3;
  const findNumbers = find$2;
  const findFractions = find$1;
  const findPercentages = find;
  const numberMethods = methods_1$1;
  const percentageMethods = methods$2;
  const moneyMethods = methods$1;
  const fractionMethods = methods_1;
  const tagger = tagger_1;
  const tags = tags$1;
  const lexicon = lexicon$1;
  /** adds .numbers() method */

  const plugin = function (Doc, world) {
    // add money words to our lexicon
    world.addWords(lexicon); // add tags to our tagset

    world.addTags(tags); // additional tagging before running the number-parser

    world.postProcess(tagger);
    /** a list of number values, and their units */

    class Numbers extends Doc {}

    Object.assign(Numbers.prototype, numberMethods);
    /** a number and a currency */

    class Money extends Numbers {}

    Object.assign(Money.prototype, moneyMethods);
    /**  */

    class Fraction extends Numbers {}

    Object.assign(Fraction.prototype, fractionMethods);
    /**  */

    class Percentage extends Numbers {}

    Object.assign(Percentage.prototype, percentageMethods);
    const docMethods = {
      /** find all numbers and values */
      numbers: function (n) {
        let m = findNumbers(this, n);
        return new Numbers(m.list, this, this.world);
      },

      /** return '4%' or 'four percent' etc*/
      percentages: function (n) {
        let m = findPercentages(this, n);
        return new Percentage(m.list, this, this.world);
      },

      /** return '3 out of 5' or '3/5' etc**/
      fractions: function (n) {
        let m = findFractions(this, n);
        return new Fraction(m.list, this, this.world);
      },

      /** number + currency pair */
      money: function (n) {
        let m = findMoney(this, n);
        return new Money(m.list, this, this.world);
      }
    }; // aliases

    docMethods.values = docMethods.numbers;
    docMethods.percents = docMethods.percentages;
    Object.assign(Doc.prototype, docMethods);
    return Doc;
  };

  var src = plugin;

  return src;

})));

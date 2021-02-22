/* compromise-numbers 1.2.0 MIT */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.compromiseNumbers = factory());
}(this, (function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  var findMoney = function findMoney(doc, n) {
    // five dollars
    var res = doc.match('#Value+? #Money+ #Currency+ (and #Money+ #Currency+)+?'); // let res = doc.match('#Value+? #Money+ #Currency+ (and #Money #Money? #Currency+)+?')
    // res.debug()
    // $5.05

    doc.match('#Money').forEach(function (m) {
      // don't duplicate it
      if (!m.lookAfter('#Currency').found) {
        res = res.concat(m);
      }
    }); // five percent
    // m = m.concat(doc.match('#Money ', 0))
    // m = m.unique()
    // m.debug()
    // doc.debug()
    // let m = doc.splitOn('(#Money|#Currency)+')
    // m = m.if('#Money').if('#Value')
    //grab (n)th result

    if (typeof n === 'number') {
      res = res.get(n);
    }

    return res;
  };

  var find = findMoney;

  var ones = 'one|two|three|four|five|six|seven|eight|nine';
  var tens = 'twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|fourty';
  var teens = 'eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen'; // this is a bit of a mess

  var findNumbers = function findNumbers(doc, n) {
    var m = doc.match('#Value+'); //"50 83"

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


      var _double = m.match('#Cardinal #Cardinal');

      if (_double.found && !m.has('(point|decimal|#Fraction)')) {
        //not 'two hundred'
        if (!_double.has('#Cardinal (#Multiple|point|decimal)')) {
          // two fifty five
          var noMultiple = m.has("(".concat(ones, ") (").concat(tens, ")")); // twenty one

          var tensVal = _double.has('(' + tens + ') #Cardinal'); // hundredOne


          var multVal = _double.has('#Multiple #Value'); //one proper way, 'twenty one', or 'hundred one'


          if (!noMultiple && !tensVal && !multVal) {
            // double = double.firstTerm()
            _double.terms().forEach(function (d) {
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

  var find$1 = findNumbers;

  var findFractions = function findFractions(doc, n) {
    // five eighths
    var m = doc.match('#Fraction+'); // remove 'two and five eights'

    m = m.filter(function (r) {
      return !r.lookBehind('#Value and$').found;
    });

    if (typeof n === 'number') {
      m = m.eq(n);
    }

    return m;
  };

  var find$2 = findFractions;

  var findPercentages = function findPercentages(doc, n) {
    // 5%
    var m = doc.match('#Percent+'); // five percent

    m = m.concat(doc.match('[#Cardinal] percent', 0));

    if (typeof n === 'number') {
      m = m.eq(n);
    }

    return m;
  };

  var find$3 = findPercentages;

  //support global multipliers, like 'half-million' by doing 'million' then multiplying by 0.5
  var findModifiers = function findModifiers(str) {
    var mults = [{
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

    for (var i = 0; i < mults.length; i++) {
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

  var findModifiers_1 = findModifiers;

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

  var isValid = function isValid(w, has) {
    if (data.ones.hasOwnProperty(w)) {
      if (has.ones || has.teens) {
        return false;
      }
    } else if (data.teens.hasOwnProperty(w)) {
      if (has.ones || has.teens || has.tens) {
        return false;
      }
    } else if (data.tens.hasOwnProperty(w)) {
      if (has.ones || has.teens || has.tens) {
        return false;
      }
    }

    return true;
  };

  var validate = isValid;

  var parseDecimals = function parseDecimals(arr) {
    var str = '0.';

    for (var i = 0; i < arr.length; i++) {
      var w = arr[i];

      if (data.ones.hasOwnProperty(w) === true) {
        str += data.ones[w];
      } else if (data.teens.hasOwnProperty(w) === true) {
        str += data.teens[w];
      } else if (data.tens.hasOwnProperty(w) === true) {
        str += data.tens[w];
      } else if (/^[0-9]$/.test(w) === true) {
        str += w;
      } else {
        return 0;
      }
    }

    return parseFloat(str);
  };

  var parseDecimals_1 = parseDecimals;

  //parse a string like "4,200.1" into Number 4200.1
  var parseNumeric = function parseNumeric(str) {
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

  var parseNumeric_1 = parseNumeric;

  var improperFraction = /^([0-9,\. ]+)\/([0-9,\. ]+)$/; //some numbers we know

  var casualForms = {
    'a few': 3,
    'a couple': 2,
    'a dozen': 12,
    'two dozen': 24,
    zero: 0
  }; // a 'section' is something like 'fifty-nine thousand'
  // turn a section into something we can add to - like 59000

  var section_sum = function section_sum(obj) {
    return Object.keys(obj).reduce(function (sum, k) {
      sum += obj[k];
      return sum;
    }, 0);
  }; //turn a string into a number


  var parse = function parse(str) {
    //convert some known-numbers
    if (casualForms.hasOwnProperty(str) === true) {
      return casualForms[str];
    } //'a/an' is 1


    if (str === 'a' || str === 'an') {
      return 1;
    }

    var modifier = findModifiers_1(str);
    str = modifier.str;
    var last_mult = null;
    var has = {};
    var sum = 0;
    var isNegative = false;
    var terms = str.split(/[ -]/); // const isFraction = findFraction(terms)

    for (var i = 0; i < terms.length; i++) {
      var w = terms[i];
      w = parseNumeric_1(w);

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
        sum += parseDecimals_1(terms.slice(i + 1, terms.length));
        sum *= modifier.amount;
        return sum;
      } //improper fraction


      var fm = w.match(improperFraction);

      if (fm) {
        var num = parseFloat(fm[1].replace(/[, ]/g, ''));
        var denom = parseFloat(fm[2].replace(/[, ]/g, ''));

        if (denom) {
          sum += num / denom || 0;
        }

        continue;
      } // try to support 'two fifty'


      if (data.tens.hasOwnProperty(w)) {
        if (has.ones && Object.keys(has).length === 1) {
          sum = has.ones * 100;
          has = {};
        }
      } //prevent mismatched units, like 'seven eleven' if not a fraction


      if (validate(w, has) === false) {
        return null;
      } //buildOut section, collect 'has' values


      if (/^[0-9\.]+$/.test(w)) {
        has['ones'] = parseFloat(w); //not technically right
      } else if (data.ones.hasOwnProperty(w) === true) {
        has['ones'] = data.ones[w];
      } else if (data.teens.hasOwnProperty(w) === true) {
        has['teens'] = data.teens[w];
      } else if (data.tens.hasOwnProperty(w) === true) {
        has['tens'] = data.tens[w];
      } else if (data.multiples.hasOwnProperty(w) === true) {
        var mult = data.multiples[w]; //something has gone wrong : 'two hundred five hundred'
        //possibly because it's a fraction

        if (mult === last_mult) {
          return null;
        } //support 'hundred thousand'
        //this one is tricky..


        if (mult === 100 && terms[i + 1] !== undefined) {
          var w2 = terms[i + 1];

          if (data.multiples[w2]) {
            mult *= data.multiples[w2]; //hundredThousand/hundredMillion

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

  var toNumber = parse;

  var endS = /s$/; // just using .toNumber() again may risk an infinite-loop

  var parseNumber = function parseNumber(m) {
    var str = m.text('reduced');
    return toNumber(str);
  };

  var mapping = {
    half: 2,
    halve: 2,
    quarter: 4
  };

  var slashForm = function slashForm(m) {
    var str = m.text('reduced');
    var found = str.match(/^([-+]?[0-9]+)\/([-+]?[0-9]+)(st|nd|rd|th)?s?$/);

    if (found && found[1] && found[0]) {
      return {
        numerator: Number(found[1]),
        denominator: Number(found[2])
      };
    }

    return null;
  }; // parse '4 out of 4'


  var nOutOfN = function nOutOfN(m) {
    var found = m.match('[<num>#Value+] out of every? [<den>#Value+]');

    if (found.found !== true) {
      return null;
    }

    var _found$groups = found.groups(),
        num = _found$groups.num,
        den = _found$groups.den; // num = num.numbers().get(0)
    // den = den.numbers().get(0)


    num = parseNumber(num);
    den = parseNumber(den);

    if (typeof num === 'number' && typeof den === 'number') {
      return {
        numerator: num,
        denominator: den
      };
    }

    return null;
  }; // parse 'five thirds'


  var nOrinalth = function nOrinalth(m) {
    var found = m.match('[<num>(#Cardinal|a)+] [<dem>#Fraction+]');

    if (found.found !== true) {
      return null;
    }

    var _found$groups2 = found.groups(),
        num = _found$groups2.num,
        dem = _found$groups2.dem; // -- parse numerator---
    // quick-support for 'a third'


    if (num.has('a')) {
      num = 1;
    } else {
      // abuse the number-parser for 'thirty three'
      // let tmp = num.clone().unTag('Fraction')
      // num = tmp.numbers().get(0)
      num = parseNumber(num);
    } // -- parse denominator --
    // turn 'thirds' into third


    var str = dem.text('reduced');

    if (endS.test(str)) {
      str = str.replace(endS, '');
      dem.replaceWith(str);
    } // support 'one half' as '1/2'


    if (mapping.hasOwnProperty(str)) {
      dem = mapping[str];
    } else {
      // dem = dem.numbers().get(0)
      dem = parseNumber(dem);
    }

    if (typeof num === 'number' && typeof dem === 'number') {
      return {
        numerator: num,
        denominator: dem
      };
    }

    return null;
  }; // implied 1 in '100th of a', 'fifth of a'


  var oneNth = function oneNth(m) {
    var found = m.match('^#Ordinal$');

    if (found.found !== true) {
      return null;
    } // ensure it's '100th of a '


    if (m.lookAhead('^of .')) {
      // let num = found.numbers().get(0)
      var num = parseNumber(found);
      return {
        numerator: 1,
        denominator: num
      };
    }

    return null;
  }; // 'half'


  var named = function named(m) {
    var str = m.text('reduced');

    if (mapping.hasOwnProperty(str)) {
      return {
        numerator: 1,
        denominator: mapping[str]
      };
    }

    return null;
  };

  var round = function round(n) {
    var rounded = Math.round(n * 1000) / 1000; // don't round 1 millionth down into 0

    if (rounded === 0 && n !== 0) {
      return n;
    }

    return rounded;
  };

  var parseFraction = function parseFraction(m) {
    m = m.clone();
    var res = named(m) || slashForm(m) || nOutOfN(m) || nOrinalth(m) || oneNth(m) || null;

    if (res !== null) {
      // do the math
      if (res.numerator && res.denominator) {
        res.decimal = res.numerator / res.denominator;
        res.decimal = round(res.decimal);
      }
    }

    return res;
  };

  var parse$1 = parseFraction;

  var parseNumeric$1 = function parseNumeric(str, p, isFraction) {
    str = str.replace(/,/g, ''); //parse a numeric-number (easy)

    var arr = str.split(/^([^0-9]*)([0-9.,]*)([^0-9]*)$/);

    if (arr && arr[2] && p.terms().length < 2) {
      var num = parseFloat(arr[2] || str); //ensure that num is an actual number

      if (typeof num !== 'number') {
        num = null;
      } // strip an ordinal off the suffix


      var suffix = arr[3] || '';

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


  var parseNumber$1 = function parseNumber(m) {
    var str = m.text('reduced'); // is it in '3,123' format?

    var hasComma = /[0-9],[0-9]/.test(m.text('text')); // parse a numeric-number like '$4.00'

    var res = parseNumeric$1(str, m);

    if (res !== null) {
      res.hasComma = hasComma;
      return res;
    } // -- parse text-formats --
    // Fractions: remove 'and a half' etc. from the end


    var frPart = m.match('#Fraction #Fraction+$');
    frPart = frPart.found === false ? m.match('^#Fraction$') : frPart;
    var fraction = null;

    if (frPart.found) {
      // fraction = frPart.fractions().get(0)
      fraction = parse$1(frPart); // remove it from our string

      m = m.not(frPart);
      m = m.not('and$');
      str = m.text('reduced');
    }

    var num = 0;

    if (str) {
      num = toNumber(str) || 0;
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

  var parse$2 = parseNumber$1;

  // handle 'one bottle', 'two bottles'
  var agreeUnits = function agreeUnits(agree, val, obj) {
    if (agree === false) {
      return;
    }

    var unit = val.lookAhead('^(#Unit|#Noun)'); // don't do these

    if (unit.has('(#Address|#Money|#Percent)') || val.has('#Ordinal')) {
      return;
    }

    if (obj.num === 1) {
      unit.nouns().toSingular();
    } else if (unit.has('#Singular')) {
      unit.nouns().toPlural();
    }
  };

  var _agreeUnits = agreeUnits;

  /**
   * turn big numbers, like 2.3e+22, into a string with a ton of trailing 0's
   * */
  var numToString = function numToString(n) {
    if (n < 1000000) {
      return String(n);
    }

    var str;

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

  /**
   * turns an integer/float into.ber, like 'fifty-five'
   */

  var tens_mapping = [['ninety', 90], ['eighty', 80], ['seventy', 70], ['sixty', 60], ['fifty', 50], ['forty', 40], ['thirty', 30], ['twenty', 20]];
  var ones_mapping = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  var sequence = [[1e24, 'septillion'], [1e20, 'hundred sextillion'], [1e21, 'sextillion'], [1e20, 'hundred quintillion'], [1e18, 'quintillion'], [1e17, 'hundred quadrillion'], [1e15, 'quadrillion'], [1e14, 'hundred trillion'], [1e12, 'trillion'], [1e11, 'hundred billion'], [1e9, 'billion'], [1e8, 'hundred million'], [1e6, 'million'], [100000, 'hundred thousand'], [1000, 'thousand'], [100, 'hundred'], [1, 'one']]; //turn number into an array of magnitudes, like [[5, million], [2, hundred]]

  var breakdown_magnitudes = function breakdown_magnitudes(num) {
    var working = num;
    var have = [];
    sequence.forEach(function (a) {
      if (num >= a[0]) {
        var howmany = Math.floor(working / a[0]);
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


  var breakdown_hundred = function breakdown_hundred(num) {
    var arr = [];

    if (num > 100) {
      return arr; //something bad happened..
    }

    for (var i = 0; i < tens_mapping.length; i++) {
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


  var handle_decimal = function handle_decimal(num) {
    var names = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    var arr = []; //parse it out like a string, because js math is such shit

    var str = _toString(num);
    var decimal = str.match(/\.([0-9]+)/);

    if (!decimal || !decimal[0]) {
      return arr;
    }

    arr.push('point');
    var decimals = decimal[0].split('');

    for (var i = 0; i < decimals.length; i++) {
      arr.push(names[decimals[i]]);
    }

    return arr;
  };
  /** turns an integer into a textual number */


  var to_text = function to_text(num) {
    // handle zero, quickly
    if (num === 0 || num === '0') {
      return 'zero'; // no?
    } //big numbers, north of sextillion, aren't gonna work well..
    //keep them small..


    if (num > 1e21) {
      num = _toString(num);
    }

    var arr = []; //handle negative numbers

    if (num < 0) {
      arr.push('minus');
      num = Math.abs(num);
    } //break-down into units, counts


    var units = breakdown_magnitudes(num); //build-up the string from its components

    for (var i = 0; i < units.length; i++) {
      var unit_name = units[i].unit;

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

    arr = arr.filter(function (s) {
      return s;
    });

    if (arr.length === 0) {
      arr[0] = '';
    }

    return arr.join(' ');
  };

  var toText = to_text; // console.log(to_text(-1000.8));

  /**
   * turn a number like 5 into an ordinal like 5th
   */

  var numOrdinal = function numOrdinal(num) {
    if (!num && num !== 0) {
      return null;
    } //the teens are all 'th'


    var tens = num % 100;

    if (tens > 10 && tens < 20) {
      return String(num) + 'th';
    } //the rest of 'em


    var mapping = {
      0: 'th',
      1: 'st',
      2: 'nd',
      3: 'rd'
    };
    var str = _toString(num);
    var last = str.slice(str.length - 1, str.length);

    if (mapping[last]) {
      str += mapping[last];
    } else {
      str += 'th';
    }

    return str;
  };

  var numOrdinal_1 = numOrdinal;

  var irregulars = {
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

  var textOrdinal = function textOrdinal(num) {
    var words = toText(num).split(' '); //convert the last number to an ordinal

    var last = words[words.length - 1];

    if (irregulars.hasOwnProperty(last)) {
      words[words.length - 1] = irregulars[last];
    } else {
      words[words.length - 1] = last.replace(/y$/, 'i') + 'th';
    }

    return words.join(' ');
  };

  var textOrdinal_1 = textOrdinal;

  var prefixes = {
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
  var suffixes = {
    '%': 'percent',
    s: 'seconds',
    cm: 'centimetres',
    km: 'kilometres'
  };
  var _symbols = {
    prefixes: prefixes,
    suffixes: suffixes
  };

  var prefixes$1 = _symbols.prefixes;
  var suffixes$1 = _symbols.suffixes;
  var isCurrency = {
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

  var prefixToText = function prefixToText(obj) {
    // turn 5% to 'five percent'
    if (prefixes$1.hasOwnProperty(obj.prefix)) {
      obj.suffix += prefixes$1[obj.prefix];
      obj.prefix = '';
    } //turn 5km to 'five kilometres'


    if (suffixes$1.hasOwnProperty(obj.suffix)) {
      obj.suffix = suffixes$1[obj.suffix];
    } //uppercase lost case for 'USD', etc


    if (isCurrency.hasOwnProperty(obj.suffix)) {
      obj.suffix = obj.suffix.toUpperCase();
    } // add a space, if it exists


    if (obj.suffix) {
      obj.suffix = ' ' + obj.suffix;
    }

    return obj;
  }; //business-logic for converting a cardinal-number to other forms


  var makeNumber = function makeNumber(obj, isText, isOrdinal) {
    var num = String(obj.num);

    if (isText) {
      obj = prefixToText(obj);

      if (isOrdinal) {
        //ordinal-text
        num = textOrdinal_1(num);
        return "".concat(obj.prefix || '').concat(num).concat(obj.suffix || '');
      } //cardinal-text


      num = toText(num);
      return "".concat(obj.prefix || '').concat(num).concat(obj.suffix || '');
    } //ordinal-number


    if (isOrdinal) {
      num = numOrdinal_1(num); // support '5th percent'

      obj = prefixToText(obj);
      return "".concat(obj.prefix || '').concat(num).concat(obj.suffix || '');
    } // support comma format


    if (obj.hasComma === true) {
      num = obj.num.toLocaleString();
    } // cardinal-number


    num = _toString(num); // support very large numbers

    return "".concat(obj.prefix || '').concat(num).concat(obj.suffix || '');
  };

  var makeNumber_1 = makeNumber;

  var methods = {
    /** overloaded json method with additional number information */
    json: function json(options) {
      var n = null;

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
      var res = [];
      this.forEach(function (doc) {
        var json = doc.json(options)[0];
        var obj = parse$2(doc);
        json.prefix = obj.prefix;
        json.number = obj.num;
        json.suffix = obj.suffix;
        json.cardinal = makeNumber_1(obj, false, false);
        json.ordinal = makeNumber_1(obj, false, true);
        json.textCardinal = makeNumber_1(obj, true, false);
        json.textOrdinal = makeNumber_1(obj, true, true);
        res.push(json);
      });

      if (n !== null) {
        return res[n];
      }

      return res;
    },

    /** two of what? */
    units: function units() {
      var m = this.lookAhead('(#Unit|#Noun)+');
      m = m.splitAfter('@hasComma').first();
      m = m.not('#Pronoun');
      return m.first();
    },

    /** return only ordinal numbers */
    isOrdinal: function isOrdinal() {
      return this["if"]('#Ordinal');
    },

    /** return only cardinal numbers*/
    isCardinal: function isCardinal() {
      return this["if"]('#Cardinal');
    },

    /** convert to numeric form like '8' or '8th' */
    toNumber: function toNumber() {
      this.forEach(function (val) {
        var obj = parse$2(val);

        if (obj.num === null) {
          return;
        }

        var str = makeNumber_1(obj, false, val.has('#Ordinal'));
        val.replaceWith(str, true);
        val.tag('NumericValue');
      });
      return this;
    },

    /** add commas, or nicer formatting for numbers */
    toLocaleString: function toLocaleString() {
      this.forEach(function (val) {
        var obj = parse$2(val);

        if (obj.num === null) {
          return;
        }

        obj.num = obj.num.toLocaleString();
        var str = makeNumber_1(obj, false, val.has('#Ordinal'));
        val.replaceWith(str, true);
      });
      return this;
    },

    /** convert to text form - like 'eight' or 'eigth'*/
    toText: function toText() {
      this.forEach(function (val) {
        var obj = parse$2(val);

        if (obj.num === null) {
          return;
        }

        var str = makeNumber_1(obj, true, val.has('#Ordinal'));
        val.replaceWith(str, true);
        val.tag('TextValue');
      });
      return this;
    },

    /** convert to cardinal form, like 'eight', or '8' */
    toCardinal: function toCardinal(agree) {
      var m = this["if"]('#Ordinal');
      m.forEach(function (val) {
        var obj = parse$2(val);

        if (obj.num === null) {
          return;
        }

        var str = makeNumber_1(obj, val.has('#TextValue'), false); // a hack for number-ranges

        if (val.has('#NumberRange')) {
          var t = val.termList()[0];

          if (t.text && t.post === '') {
            t.post = ' ';
          }
        } // change the number text


        val.replaceWith(str, true);
        val.tag('Cardinal'); // turn unit into plural -> 'seven beers'

        _agreeUnits(agree, val, obj);
      });
      return this;
    },

    /** convert to ordinal form, like 'eighth', or '8th' */
    toOrdinal: function toOrdinal() {
      var _this = this;

      var m = this["if"]('#Cardinal');
      m.forEach(function (val) {
        var obj = parse$2(val);

        if (obj.num === null) {
          return;
        }

        var str = makeNumber_1(obj, val.has('#TextValue'), true); // a hack for number-ranges

        if (val.has('#NumberRange')) {
          var t = val.termList()[0];

          if (t.text && t.post === '') {
            t.post = ' ';
          }
        } // change the number text


        val.replaceWith(str, true);
        val.tag('Ordinal'); // turn unit into singular -> 'seventh beer'

        var unit = _this.lookAhead('^#Plural');

        if (unit.found) {
          unit.nouns().toSingular();
        }
      });
      return this;
    },

    /** return only numbers that are == n */
    isEqual: function isEqual(n) {
      return this.filter(function (val) {
        var num = parse$2(val).num;
        return num === n;
      });
    },

    /** return only numbers that are > n*/
    greaterThan: function greaterThan(n) {
      return this.filter(function (val) {
        var num = parse$2(val).num;
        return num > n;
      });
    },

    /** return only numbers that are < n*/
    lessThan: function lessThan(n) {
      return this.filter(function (val) {
        var num = parse$2(val).num;
        return num < n;
      });
    },

    /** return only numbers > min and < max */
    between: function between(min, max) {
      return this.filter(function (val) {
        var num = parse$2(val).num;
        return num > min && num < max;
      });
    },

    /** set these number to n */
    set: function set(n, agree) {
      if (n === undefined) {
        return this; // don't bother
      }

      if (typeof n === 'string') {
        n = toNumber(n);
      }

      this.forEach(function (val) {
        var obj = parse$2(val);
        obj.num = n;

        if (obj.num === null) {
          return;
        }

        var str = makeNumber_1(obj, val.has('#TextValue'), val.has('#Ordinal'));
        val = val.not('#Currency');
        val.replaceWith(str, true); // handle plural/singular unit

        _agreeUnits(agree, val, obj);
      });
      return this;
    },
    add: function add(n, agree) {
      if (!n) {
        return this; // don't bother
      }

      if (typeof n === 'string') {
        n = toNumber(n);
      }

      this.forEach(function (val) {
        var obj = parse$2(val);

        if (obj.num === null) {
          return;
        }

        obj.num += n;
        var str = makeNumber_1(obj, val.has('#TextValue'), val.has('#Ordinal'));
        val = val.not('#Currency');
        val.replaceWith(str, true); // handle plural/singular unit

        _agreeUnits(agree, val, obj);
      });
      return this;
    },

    /** decrease each number by n*/
    subtract: function subtract(n, agree) {
      return this.add(n * -1, agree);
    },

    /** increase each number by 1 */
    increment: function increment(agree) {
      this.add(1, agree);
      return this;
    },

    /** decrease each number by 1 */
    decrement: function decrement(agree) {
      this.add(-1, agree);
      return this;
    },

    /** return things like CCXX*/
    romanNumerals: function romanNumerals(n) {
      var m = this.match('#RomanNumeral').numbers();

      if (typeof n === 'number') {
        m = m.get(n);
      }

      return m;
    },

    /** split-apart suffix and number */
    normalize: function normalize() {
      var keep = {
        '%': true
      };
      this.forEach(function (val) {
        var obj = parse$2(val);

        if (obj.num !== null && obj.suffix && keep[obj.suffix] !== true) {
          var prefix = obj.prefix || '';
          val = val.replaceWith(prefix + obj.num + ' ' + obj.suffix);
          return;
        }
      });
      return this;
    },

    /** retrieve the parsed number */
    get: function get(n) {
      var arr = [];
      this.forEach(function (doc) {
        arr.push(parse$2(doc).num);
      });

      if (n !== undefined) {
        return arr[n] || null;
      }

      return arr || null;
    }
  }; // aliases

  methods.toNice = methods.toLocaleString;
  methods.isBetween = methods.between;
  methods.minus = methods.subtract;
  methods.plus = methods.add;
  methods.equals = methods.isEqual;
  var methods_1 = methods;

  var parse$3 = function parse(m) {
    var num = parse$2(m).num;

    if (typeof num === 'number') {
      return num / 100;
    }

    return null;
  };

  var methods$1 = {
    /** get the money info */
    get: function get(n) {
      var arr = [];
      this.forEach(function (doc) {
        var num = parse$3(doc);

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
    json: function json(options) {
      var n = null;

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
      var res = [];
      this.forEach(function (m) {
        var json = m.json(options)[0];
        var dec = parse$3(m);
        json.number = dec;

        if (dec !== null) {
          var full = dec * 100;
          json.textNumber = "".concat(full, " percent");
          json.cardinal = "".concat(full, "%");
        }

        res.push(json);
      });

      if (n !== null) {
        return res[n] || {};
      }

      return res;
    },
    // turn 80% to 8/100
    toFraction: function toFraction() {
      var _this = this;

      this.forEach(function (doc) {
        var num = parse$3(doc);

        if (num !== null) {
          num *= 100;
          num = Math.round(num * 100) / 100;
          var str = "".concat(num, "/100");

          _this.replace(doc, str);
        }
      });
      return this;
    }
  };

  //from wikipedia's {{infobox currency}}, Dec 2020
  var currencies = [{
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

  // aggregate currency symbols for easy lookup
  // const subs = {
  //   pennies: true,
  // }

  var symbols = {};
  var pennies = {};
  currencies.forEach(function (o) {
    o.sym.forEach(function (str) {
      symbols[str] = symbols[str] || o.iso;
    });
    symbols[o.iso] = symbols[o.iso] || o.iso;

    if (o.sub) {
      pennies[o.sub] = true;
    }
  }); // create a match statement with all the penny-units

  var isPenny = "(".concat(Object.keys(pennies).join('|'), ")"); // parse 'australian dollars'

  var getNamedCurrency = function getNamedCurrency(doc) {
    var m = doc.match('#Currency+');
    m.nouns().toSingular(); // 'dollars'➔'dollar'

    var str = m.text('reduced');
    return currencies.find(function (o) {
      // 'mexcan peso'
      if (str === "".concat(o.dem, " ").concat(o.name)) {
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


  var getBySymbol = function getBySymbol(obj) {
    // do suffix first, for '$50CAD'
    if (obj.suffix && symbols.hasOwnProperty(obj.suffix)) {
      return currencies.find(function (o) {
        return o.iso === symbols[obj.suffix];
      });
    } // parse prefix for '£50'


    if (obj.prefix && symbols.hasOwnProperty(obj.prefix)) {
      return currencies.find(function (o) {
        return o.iso === symbols[obj.prefix];
      });
    }

    return null;
  }; // five dollars and six cents -> 5.06


  var parseMoney = function parseMoney(doc) {
    // support 'and five cents' as a decimal
    var decimal = 0;
    var decimalEnd = doc.match("and #Money+ ".concat(isPenny));

    if (decimalEnd.found) {
      doc = doc.not(decimalEnd);

      var _res = parse$2(decimalEnd.match('#Value+'));

      if (_res && _res.num) {
        decimal = _res.num / 100;
      }
    }

    var res = parse$2(doc);
    var num = res.num || 0;
    num += decimal;
    var found = getBySymbol(res) || getNamedCurrency(doc) || {};
    var sym = '';

    if (found && found.sym) {
      sym = found.sym[0]; // make '50 cents' -> 0.50

      if (num && doc.has("".concat(isPenny))) {
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

  var parse$4 = parseMoney;

  var titleCase = function titleCase() {
    var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  var moneyMethods = {
    /** get the money info */
    get: function get(n) {
      var arr = [];
      this.forEach(function (doc) {
        arr.push(parse$4(doc));
      });

      if (n !== undefined) {
        return arr[n] || null;
      }

      return arr || null;
    },

    /** which currency is this money in? */
    currency: function currency(n) {
      var arr = [];
      this.forEach(function (doc) {
        var found = parse$4(doc);

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
    json: function json(options) {
      var n = null;

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
      var res = [];
      this.forEach(function (doc) {
        var json = doc.json(options)[0];
        var obj = parse$4(doc);
        json.number = obj.num;

        if (obj.iso) {
          json.iso = obj.iso.toUpperCase();
          json.symbol = obj.symbol;
          json.currency = titleCase(obj.demonym) + ' ' + titleCase(obj.currency);
        } // 'thirty pounds'


        json.textFmt = makeNumber_1(obj, true, false);

        if (obj.currency) {
          var str = obj.currency;

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
  var methods$2 = moneyMethods;

  // create 'one thirds' from {1,3}

  var toText_1 = function toText_1(obj) {
    // don't divide by zero!
    if (!obj.numerator || !obj.denominator) {
      return '';
    } // create [two] [fifths]


    var start = toText(obj.numerator);
    var end = textOrdinal_1(obj.denominator); // 'one secondth' -> 'one half'

    if (obj.denominator === 2) {
      end = 'half';
    }

    if (start && end) {
      if (obj.numerator !== 1) {
        end += 's';
      }

      return "".concat(start, " ").concat(end);
    }

    return '';
  }; // 'two out of three'


  var textCardinal = function textCardinal(obj) {
    if (!obj.numerator || !obj.denominator) {
      return '';
    }

    var a = toText(obj.numerator);
    var b = toText(obj.denominator);
    return "".concat(a, " out of ").concat(b);
  }; // create 1.33 from {1,3}


  var toDecimal = function toDecimal(obj) {
    return obj.decimal;
  };

  var _lib = {
    toText: toText_1,
    textCardinal: textCardinal,
    toDecimal: toDecimal
  };

  var methods$3 = {
    get: function get(n) {
      var arr = [];
      this.forEach(function (doc) {
        arr.push(parse$1(doc));
      });

      if (n !== undefined) {
        return arr[n] || null;
      }

      return arr || null;
    },
    // become 0.5
    toDecimal: function toDecimal() {
      this.forEach(function (val) {
        var obj = parse$1(val);

        if (obj) {
          var num = _lib.toDecimal(obj);
          val.replaceWith(String(num), true);
          val.tag('NumericValue');
          val.unTag('Fraction');
        }
      });
      return this;
    },

    /** overloaded json method with additional number information */
    json: function json(options) {
      var n = null;

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
      var res = [];
      this.forEach(function (m) {
        var json = m.json(options)[0];
        var found = parse$1(m) || {};
        var num = _lib.toDecimal(found); // let obj = parseNumber(m, m.has('#Fraction'))

        json.numerator = found.numerator;
        json.denominator = found.denominator;
        json.number = num;
        json.textOrdinal = _lib.toText(found);
        json.textCardinal = _lib.textCardinal(found);
        res.push(json);
      });

      if (n !== null) {
        return res[n] || {};
      }

      return res;
    },

    /** change 'four out of 10' to 4/10 */
    normalize: function normalize() {
      var _this = this;

      this.forEach(function (m) {
        var found = parse$1(m);

        if (found && typeof found.numerator === 'number' && typeof found.denominator === 'number') {
          var str = "".concat(found.numerator, "/").concat(found.denominator);

          _this.replace(m, str);
        }
      });
      return this;
    },
    // turn the fraction into 'five tenths'
    toText: function toText(n) {
      var arr = [];
      this.forEach(function (doc) {
        var obj = parse$1(doc) || {}; // create [one] [fifth]

        var str = _lib.toText(obj);
        doc.replaceWith(str, true);
        doc.tag('Fraction');
      });

      if (n !== undefined) {
        return arr[n];
      }

      return arr;
    },
    // turn 8/10 into 80%
    toPercentage: function toPercentage() {
      var _this2 = this;

      this.forEach(function (m) {
        var found = parse$1(m);

        if (found.decimal || found.decimal === 0) {
          var num = found.decimal * 100;
          num = Math.round(num * 100) / 100;

          _this2.replace(m, "".concat(num, "%"));
        }
      });
      return this;
    }
  }; // aliases

  methods$3.toNumber = methods$3.toDecimal;
  var methods_1$1 = methods$3;

  var multiples = '(hundred|thousand|million|billion|trillion|quadrillion|quintillion|sextillion|septillion)';
  var here = 'fraction-tagger'; // plural-ordinals like 'hundredths' are already tagged as Fraction by compromise

  var tagFractions = function tagFractions(doc) {
    // hundred
    doc.match(multiples).tag('#Multiple', here); // half a penny

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

    doc.match('#Cardinal+ out? of every? #Cardinal').tag('Fraction', here); // // one and a half
    // doc.match('#Cardinal and a (#Fraction && #Value)').tag('Fraction', here)
    // fraction - 'a third of a slice'
    // TODO:fixme
    // m = doc.match(`[(#Cardinal|a) ${ordinals}] of (a|an|the)`, 0).tag('Fraction', 'ord-of')
    // tag 'thirds' as a ordinal
    // m.match('.$').tag('Ordinal', 'plural-ordinal')

    return doc;
  };

  var fractions = tagFractions;

  var tagMoney = function tagMoney(doc) {
    var here = 'money-tagger'; //one hundred and seven dollars

    doc.match('#Money and #Money #Currency?').tag('Money', 'money-and-money'); // $5.032 is invalid money

    doc.match('#Money').not('#TextValue').match('/\\.[0-9]{3}$/').unTag('#Money', 'three-decimal money'); // cleanup currency false-positives

    doc.ifNo('#Value').match('#Currency #Verb').unTag('Currency', 'no-currency'); // 6 dollars and 5 cents

    doc.match('#Value #Currency [and] #Value (cents|ore|centavos|sens)', 0).tag('Money', here); // maybe currencies

    var m = doc.match('[<num>#Value] [<currency>(mark|rand|won|rub|ore)]');
    m.group('num').tag('Money', here);
    m.group('currency').tag('Currency', here);
    return doc;
  };

  var money = tagMoney;

  var here$1 = 'number-tag'; // improved tagging for numbers

  var tagger = function tagger(doc) {
    // add #Money + #Currency tags
    doc = money(doc); //  in the 400s

    doc.match('the [/[0-9]+s$/]').tag('#Plural', here$1); //half a million

    doc.match('half a? #Value').tag('Value', 'half-a-value'); //(quarter not ready)
    //five and a half

    doc.match('#Value [and a (half|quarter)]', 0).tag(['TextValue', '#Fraction'], 'value-and-a-half'); // add #Fraction tags

    doc = fractions(doc); // two and two thirds

    doc.match('#Cardinal and #Fraction #Fraction').tag('Value', here$1);
  };

  var tagger_1 = tagger;

  var tags = {
    Fraction: {
      isA: ['Value']
    },
    Multiple: {
      isA: 'Value'
    }
  };

  var ambig = {
    mark: true,
    sucre: true,
    leone: true,
    afghani: true,
    rand: true,
    "try": true,
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
  var lex = {
    kronor: 'Currency'
  };
  currencies.forEach(function (o) {
    if (o.iso && !ambig[o.iso]) {
      lex[o.iso] = ['Acronym', 'Currency'];
    }

    var name = o.name;

    if (name && !ambig[name]) {
      lex[name] = 'Currency';
      lex[name + 's'] = 'Currency';
    }

    if (o.dem) {
      var dem = o.dem;
      lex["".concat(dem, " ").concat(name)] = 'Currency';
      lex["".concat(dem, " ").concat(name, "s")] = 'Currency';
    }

    if (o.sub) {
      lex[o.sub] = 'Currency';
    }
  });
  var lexicon = lex;

  /** adds .numbers() method */

  var plugin = function plugin(Doc, world) {
    // add money words to our lexicon
    world.addWords(lexicon); // add tags to our tagset

    world.addTags(tags); // additional tagging before running the number-parser

    world.postProcess(tagger_1);
    /** a list of number values, and their units */

    var Numbers = /*#__PURE__*/function (_Doc) {
      _inherits(Numbers, _Doc);

      var _super = _createSuper(Numbers);

      function Numbers() {
        _classCallCheck(this, Numbers);

        return _super.apply(this, arguments);
      }

      return Numbers;
    }(Doc);

    Object.assign(Numbers.prototype, methods_1);
    /** a number and a currency */

    var Money = /*#__PURE__*/function (_Numbers) {
      _inherits(Money, _Numbers);

      var _super2 = _createSuper(Money);

      function Money() {
        _classCallCheck(this, Money);

        return _super2.apply(this, arguments);
      }

      return Money;
    }(Numbers);

    Object.assign(Money.prototype, methods$2);
    /**  */

    var Fraction = /*#__PURE__*/function (_Numbers2) {
      _inherits(Fraction, _Numbers2);

      var _super3 = _createSuper(Fraction);

      function Fraction() {
        _classCallCheck(this, Fraction);

        return _super3.apply(this, arguments);
      }

      return Fraction;
    }(Numbers);

    Object.assign(Fraction.prototype, methods_1$1);
    /**  */

    var Percentage = /*#__PURE__*/function (_Numbers3) {
      _inherits(Percentage, _Numbers3);

      var _super4 = _createSuper(Percentage);

      function Percentage() {
        _classCallCheck(this, Percentage);

        return _super4.apply(this, arguments);
      }

      return Percentage;
    }(Numbers);

    Object.assign(Percentage.prototype, methods$1);
    var docMethods = {
      /** find all numbers and values */
      numbers: function numbers(n) {
        var m = find$1(this, n);
        return new Numbers(m.list, this, this.world);
      },

      /** return '4%' or 'four percent' etc*/
      percentages: function percentages(n) {
        var m = find$3(this, n);
        return new Percentage(m.list, this, this.world);
      },

      /** return '3 out of 5' or '3/5' etc**/
      fractions: function fractions(n) {
        var m = find$2(this, n);
        return new Fraction(m.list, this, this.world);
      },

      /** number + currency pair */
      money: function money(n) {
        var m = find(this, n);
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
//# sourceMappingURL=compromise-numbers.js.map

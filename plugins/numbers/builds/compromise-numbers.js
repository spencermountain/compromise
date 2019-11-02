(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.nlp = factory());
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

  var tens = 'twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|fourty';
  var teens = 'eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen';

  var findNumbers = function findNumbers(doc, n) {
    var match = doc.match('#Value+ #Unit?'); //"50 83"

    if (match.has('#NumericValue #NumericValue')) {
      //a comma may mean two numbers
      if (match.has('#Value @hasComma #Value')) {
        match.splitAfter('@hasComma');
      } else {
        match = match.splitAfter('#NumericValue');
      }
    } //three-length


    if (match.has('#Value #Value #Value') && !match.has('#Multiple')) {
      //twenty-five-twenty
      if (match.has('(' + tens + ') #Cardinal #Cardinal')) {
        match = match.splitAfter('(' + tens + ') #Cardinal');
      }
    } //two-length ones


    if (match.has('#Value #Value')) {
      //june 21st 1992 is two seperate values
      if (match.has('#NumericValue #NumericValue')) {
        match = match.splitOn('#Year');
      } //sixty fifteen


      if (match.has('(' + tens + ') (' + teens + ')')) {
        match = match.splitAfter('(' + tens + ')');
      } //"72 82"


      var _double = match.match('#Cardinal #Cardinal');

      if (_double.found && !match.has('(point|decimal)')) {
        //not 'two hundred'
        if (!_double.has('#Cardinal (#Multiple|point|decimal)')) {
          //one proper way, 'twenty one', or 'hundred one'
          if (!_double.has('(' + tens + ') #Cardinal') && !_double.has('#Multiple #Value')) {
            // double = double.firstTerm()
            _double.terms().forEach(function (d) {
              match = match.splitOn(d);
            });
          }
        }
      } //seventh fifth


      if (match.match('#Ordinal #Ordinal').match('#TextValue').found && !match.has('#Multiple')) {
        //the one proper way, 'twenty first'
        if (!match.has('(' + tens + ') #Ordinal')) {
          match = match.splitAfter('#Ordinal');
        }
      } //fifth five


      if (match.has('#Ordinal #Cardinal')) {
        match = match.splitBefore('#Cardinal+');
      } //five 2017 (support '5 hundred', and 'twenty 5'


      if (match.has('#TextValue #NumericValue') && !match.has('(' + tens + '|#Multiple)')) {
        match = match.splitBefore('#NumericValue+');
      }
    } //5-8


    if (match.has('#NumberRange')) {
      match = match.splitAfter('#NumberRange');
    } //grab (n)th result


    if (typeof n === 'number') {
      match = match.get(n);
    }

    return match;
  };

  var find = findNumbers;

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
    // 'a few': 3,
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
    var terms = str.split(/[ -]/);

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
      } //prevent mismatched units, like 'seven eleven'


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

        if (mult === last_mult) {
          return null;
        } //support 'hundred thousand'
        //this one is tricky..


        if (mult === 100 && terms[i + 1] !== undefined) {
          // has['hundreds']=
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

  var parseNumber = function parseNumber(p) {
    var str = p.text('reduced'); //parse a numeric-number (easy)

    var arr = str.split(/^([^0-9]*)([0-9.,]*)([^0-9]*)$/);

    if (arr && arr[2] && p.terms().length < 2) {
      var _num = parseFloat(arr[2] || str); //ensure that num is an actual number


      if (typeof _num !== 'number') {
        _num = null;
      } // strip an ordinal off the suffix


      var suffix = arr[3] || '';

      if (suffix === 'st' || suffix === 'nd' || suffix === 'rd' || suffix === 'th') {
        suffix = '';
      } // support M for million, k for thousand


      if (suffix === 'm' || suffix === 'M') {
        _num *= 1000000;
        suffix = '';
      }

      if (suffix === 'k' || suffix === 'k') {
        _num *= 1000;
        suffix = '';
      }

      return {
        prefix: arr[1] || '',
        num: _num,
        suffix: suffix
      };
    } //parse a text-numer (harder)


    var num = toNumber(str);
    return {
      prefix: '',
      num: num,
      suffix: ''
    };
  };

  var parse$1 = parseNumber;

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
    //big numbers, north of sextillion, aren't gonna work well..
    //keep them small..
    if (num > 1e21) {
      num = _toString(num);
    }

    var arr = []; //handle negative numbers

    if (num < 0) {
      arr.push('negative');
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
    } // cardinal-number


    num = _toString(num); // support very large numbers

    return "".concat(obj.prefix || '').concat(num).concat(obj.suffix || '');
  };

  var makeNumber_1 = makeNumber;

  var methods = {
    /** overload the original json with noun information */
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
        var obj = parse$1(doc);
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
    isOrdinal: function isOrdinal() {
      return this["if"]('#Ordinal');
    },
    isCardinal: function isCardinal() {
      return this["if"]('#Cardinal');
    },
    toNumber: function toNumber() {
      this.forEach(function (val) {
        var obj = parse$1(val);

        if (obj.num === null) {
          return;
        }

        var str = makeNumber_1(obj, false, val.has('#Ordinal'));
        val.replaceWith(str);
      });
      return this;
    },
    // toNumber, but with some commas
    toLocaleString: function toLocaleString() {
      this.forEach(function (val) {
        var obj = parse$1(val);

        if (obj.num === null) {
          return;
        }

        obj.num = obj.num.toLocaleString();
        var str = makeNumber_1(obj, false, val.has('#Ordinal'));
        val.replaceWith(str);
      });
      return this;
    },
    toText: function toText() {
      this.forEach(function (val) {
        var obj = parse$1(val);

        if (obj.num === null) {
          return;
        }

        var str = makeNumber_1(obj, true, val.has('#Ordinal'));
        val.replaceWith(str);
      });
      return this;
    },
    toCardinal: function toCardinal() {
      var m = this["if"]('#Ordinal');
      m.forEach(function (val) {
        var obj = parse$1(val);

        if (obj.num === null) {
          return;
        }

        var str = makeNumber_1(obj, val.has('#TextValue'), false);
        val.replaceWith(str);
      });
      return this;
    },
    toOrdinal: function toOrdinal() {
      var m = this["if"]('#Cardinal');
      m.forEach(function (val) {
        var obj = parse$1(val);

        if (obj.num === null) {
          return;
        }

        var str = makeNumber_1(obj, val.has('#TextValue'), true);
        val.replaceWith(str);
      });
      return this;
    },
    isEqual: function isEqual(n) {
      return this.filter(function (val) {
        var num = parse$1(val).num;
        return num === n;
      });
    },
    greaterThan: function greaterThan(n) {
      return this.filter(function (val) {
        var num = parse$1(val).num;
        return num > n;
      });
    },
    lessThan: function lessThan(n) {
      return this.filter(function (val) {
        var num = parse$1(val).num;
        return num < n;
      });
    },
    between: function between(a, b) {
      return this.filter(function (val) {
        var num = parse$1(val).num;
        return num > a && num < b;
      });
    },
    add: function add(n) {
      if (!n) {
        return this; // don't bother
      }

      this.forEach(function (val) {
        var obj = parse$1(val);

        if (obj.num === null) {
          return;
        }

        obj.num += n;
        var str = makeNumber_1(obj, val.has('#TextValue'), val.has('#Ordinal'));
        val.replaceWith(str);
      });
      return this;
    },
    subtract: function subtract(n) {
      return this.add(n * -1);
    },
    increment: function increment() {
      this.add(1);
      return this;
    },
    decrement: function decrement() {
      this.add(-1);
      return this;
    }
  }; // aliases

  methods.toNice = methods.toLocaleString;
  methods.minus = methods.subtract;
  methods.plus = methods.add;
  methods.equals = methods.isEqual;
  var methods_1 = methods;

  var tagger = function tagger(doc) {
    doc.match('(hundred|thousand|million|billion|trillion|quadrillion|quintillion|sextillion|septillion)').tag('#Multiple'); //  in the 400s

    doc.match('the [/[0-9]+s$/]').tag('#Plural');
  };

  var tagger_1 = tagger;

  /** adds .numbers() method */

  var addMethod = function addMethod(Doc, world) {
    // additional tagging before running the number-parser
    world.postProcess(tagger_1);
    /** a list of number values, and their units */

    var Numbers =
    /*#__PURE__*/
    function (_Doc) {
      _inherits(Numbers, _Doc);

      function Numbers(list, from, w) {
        var _this;

        _classCallCheck(this, Numbers);

        _this = _possibleConstructorReturn(this, _getPrototypeOf(Numbers).call(this, list, from, w));
        _this.unit = _this.match('#Unit+$');

        var numbers = _this.not('#Unit+$');

        _this.list = numbers.list;
        return _this;
      }

      return Numbers;
    }(Doc); //aliases


    Object.assign(Numbers.prototype, methods_1);
    Numbers.prototype.plus = Numbers.prototype.add;
    Numbers.prototype.minus = Numbers.prototype.subtract;

    Doc.prototype.numbers = function (n) {
      var match = find(this, n);
      return new Numbers(match.list, this, this.world);
    }; // alias for reverse-compatibility


    Doc.prototype.values = Doc.prototype.numbers;
    return Doc;
  };

  var src = addMethod;

  return src;

})));
//# sourceMappingURL=compromise-numbers.js.map

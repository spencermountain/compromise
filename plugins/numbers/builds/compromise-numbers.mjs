const tens = 'twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|fourty';
const teens = 'eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen';

const findNumbers = function(doc, n) {
  let match = doc.match('#Value+ #Unit?');

  //"50 83"
  if (match.has('#NumericValue #NumericValue')) {
    //a comma may mean two numbers
    if (match.has('#Value @hasComma #Value')) {
      match.splitAfter('@hasComma');
    } else {
      match = match.splitAfter('#NumericValue');
    }
  }
  //three-length
  if (match.has('#Value #Value #Value') && !match.has('#Multiple')) {
    //twenty-five-twenty
    if (match.has('(' + tens + ') #Cardinal #Cardinal')) {
      match = match.splitAfter('(' + tens + ') #Cardinal');
    }
  }

  //two-length ones
  if (match.has('#Value #Value')) {
    //june 21st 1992 is two seperate values
    if (match.has('#NumericValue #NumericValue')) {
      match = match.splitOn('#Year');
    }
    //sixty fifteen
    if (match.has('(' + tens + ') (' + teens + ')')) {
      match = match.splitAfter('(' + tens + ')');
    }
    //"72 82"
    let double = match.match('#Cardinal #Cardinal');
    if (double.found && !match.has('(point|decimal)')) {
      //not 'two hundred'
      if (!double.has('#Cardinal (#Multiple|point|decimal)')) {
        //one proper way, 'twenty one', or 'hundred one'
        if (!double.has('(' + tens + ') #Cardinal') && !double.has('#Multiple #Value')) {
          // double = double.firstTerm()
          double.terms().forEach(d => {
            match = match.splitOn(d);
          });
        }
      }
    }
    //seventh fifth
    if (match.match('#Ordinal #Ordinal').match('#TextValue').found && !match.has('#Multiple')) {
      //the one proper way, 'twenty first'
      if (!match.has('(' + tens + ') #Ordinal')) {
        match = match.splitAfter('#Ordinal');
      }
    }
    //fifth five
    if (match.has('#Ordinal #Cardinal')) {
      match = match.splitBefore('#Cardinal+');
    }
    //five 2017 (support '5 hundred', and 'twenty 5'
    if (match.has('#TextValue #NumericValue') && !match.has('(' + tens + '|#Multiple)')) {
      match = match.splitBefore('#NumericValue+');
    }
  }
  //5-8
  if (match.has('#NumberRange')) {
    match = match.splitAfter('#NumberRange');
  }
  //grab (n)th result
  if (typeof n === 'number') {
    match = match.get(n);
  }
  return match
};
var find = findNumbers;

//support global multipliers, like 'half-million' by doing 'million' then multiplying by 0.5
const findModifiers = str => {
  const mults = [
    {
      reg: /^(minus|negative)[\s\-]/i,
      mult: -1,
    },
    {
      reg: /^(a\s)?half[\s\-](of\s)?/i,
      mult: 0.5,
    },
    //  {
    //   reg: /^(a\s)?quarter[\s\-]/i,
    //   mult: 0.25
    // }
  ];
  for (let i = 0; i < mults.length; i++) {
    if (mults[i].reg.test(str) === true) {
      return {
        amount: mults[i].mult,
        str: str.replace(mults[i].reg, ''),
      }
    }
  }
  return {
    amount: 1,
    str: str,
  }
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
    nine: 9,
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
    nineteen: 19,
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
    ninety: 90,
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
    grand: 1000,
  },
};

//prevent things like 'fifteen ten', and 'five sixty'
const isValid = (w, has) => {
  if (data.ones.hasOwnProperty(w)) {
    if (has.ones || has.teens) {
      return false
    }
  } else if (data.teens.hasOwnProperty(w)) {
    if (has.ones || has.teens || has.tens) {
      return false
    }
  } else if (data.tens.hasOwnProperty(w)) {
    if (has.ones || has.teens || has.tens) {
      return false
    }
  }
  return true
};
var validate = isValid;

//concatenate into a string with leading '0.'
const parseDecimals = function(arr) {
  let str = '0.';
  for (let i = 0; i < arr.length; i++) {
    let w = arr[i];
    if (data.ones.hasOwnProperty(w) === true) {
      str += data.ones[w];
    } else if (data.teens.hasOwnProperty(w) === true) {
      str += data.teens[w];
    } else if (data.tens.hasOwnProperty(w) === true) {
      str += data.tens[w];
    } else if (/^[0-9]$/.test(w) === true) {
      str += w;
    } else {
      return 0
    }
  }
  return parseFloat(str)
};

var parseDecimals_1 = parseDecimals;

//parse a string like "4,200.1" into Number 4200.1
const parseNumeric = str => {
  //remove ordinal - 'th/rd'
  str = str.replace(/1st$/, '1');
  str = str.replace(/2nd$/, '2');
  str = str.replace(/3rd$/, '3');
  str = str.replace(/([4567890])r?th$/, '$1');
  //remove prefixes
  str = str.replace(/^[$€¥£¢]/, '');
  //remove suffixes
  str = str.replace(/[%$€¥£¢]$/, '');
  //remove commas
  str = str.replace(/,/g, '');
  //split '5kg' from '5'
  str = str.replace(/([0-9])([a-z\u00C0-\u00FF]{1,2})$/, '$1');
  return str
};

var parseNumeric_1 = parseNumeric;

const improperFraction = /^([0-9,\. ]+)\/([0-9,\. ]+)$/;

//some numbers we know
const casualForms = {
  // 'a few': 3,
  'a couple': 2,
  'a dozen': 12,
  'two dozen': 24,
  zero: 0,
};

// a 'section' is something like 'fifty-nine thousand'
// turn a section into something we can add to - like 59000
const section_sum = obj => {
  return Object.keys(obj).reduce((sum, k) => {
    sum += obj[k];
    return sum
  }, 0)
};

//turn a string into a number
const parse = function(str) {
  //convert some known-numbers
  if (casualForms.hasOwnProperty(str) === true) {
    return casualForms[str]
  }
  //'a/an' is 1
  if (str === 'a' || str === 'an') {
    return 1
  }
  const modifier = findModifiers_1(str);
  str = modifier.str;
  let last_mult = null;
  let has = {};
  let sum = 0;
  let isNegative = false;
  const terms = str.split(/[ -]/);
  for (let i = 0; i < terms.length; i++) {
    let w = terms[i];
    w = parseNumeric_1(w);
    if (!w || w === 'and') {
      continue
    }
    if (w === '-' || w === 'negative') {
      isNegative = true;
      continue
    }
    if (w.charAt(0) === '-') {
      isNegative = true;
      w = w.substr(1);
    }
    //decimal mode
    if (w === 'point') {
      sum += section_sum(has);
      sum += parseDecimals_1(terms.slice(i + 1, terms.length));
      sum *= modifier.amount;
      return sum
    }
    //improper fraction
    const fm = w.match(improperFraction);
    if (fm) {
      const num = parseFloat(fm[1].replace(/[, ]/g, ''));
      const denom = parseFloat(fm[2].replace(/[, ]/g, ''));
      if (denom) {
        sum += num / denom || 0;
      }
      continue
    }
    //prevent mismatched units, like 'seven eleven'
    if (validate(w, has) === false) {
      return null
    }
    //buildOut section, collect 'has' values
    if (/^[0-9\.]+$/.test(w)) {
      has['ones'] = parseFloat(w); //not technically right
    } else if (data.ones.hasOwnProperty(w) === true) {
      has['ones'] = data.ones[w];
    } else if (data.teens.hasOwnProperty(w) === true) {
      has['teens'] = data.teens[w];
    } else if (data.tens.hasOwnProperty(w) === true) {
      has['tens'] = data.tens[w];
    } else if (data.multiples.hasOwnProperty(w) === true) {
      let mult = data.multiples[w];

      //something has gone wrong : 'two hundred five hundred'
      if (mult === last_mult) {
        return null
      }
      //support 'hundred thousand'
      //this one is tricky..
      if (mult === 100 && terms[i + 1] !== undefined) {
        // has['hundreds']=
        const w2 = terms[i + 1];
        if (data.multiples[w2]) {
          mult *= data.multiples[w2]; //hundredThousand/hundredMillion
          i += 1;
        }
      }
      //natural order of things
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
  }
  //dump the remaining has values
  sum += section_sum(has);
  //post-process add modifier
  sum *= modifier.amount;
  sum *= isNegative ? -1 : 1;
  //dont return 0, if it went straight-through
  if (sum === 0 && Object.keys(has).length === 0) {
    return null
  }
  return sum
};

var toNumber = parse;

// get a numeric value from this phrase
const parseNumber = function(p) {
  let str = p.text('reduced');
  //parse a numeric-number (easy)
  let arr = str.split(/^([^0-9]*)([0-9.,]*)([^0-9]*)$/);
  if (arr && arr[2] && p.terms().length < 2) {
    let num = parseFloat(arr[2] || str);
    //ensure that num is an actual number
    if (typeof num !== 'number') {
      num = null;
    }
    // strip an ordinal off the suffix
    let suffix = arr[3] || '';
    if (suffix === 'st' || suffix === 'nd' || suffix === 'rd' || suffix === 'th') {
      suffix = '';
    }
    // support M for million, k for thousand
    if (suffix === 'm' || suffix === 'M') {
      num *= 1000000;
      suffix = '';
    }
    if (suffix === 'k' || suffix === 'k') {
      num *= 1000;
      suffix = '';
    }
    return {
      prefix: arr[1] || '',
      num: num,
      suffix: suffix,
    }
  }
  //parse a text-numer (harder)
  let num = toNumber(str);
  return {
    prefix: '',
    num: num,
    suffix: '',
  }
};
var parse$1 = parseNumber;

/**
 * turn big numbers, like 2.3e+22, into a string with a ton of trailing 0's
 * */
const numToString = function(n) {
  if (n < 1000000) {
    return String(n)
  }
  let str;
  if (typeof n === 'number') {
    str = n.toFixed(0);
  } else {
    str = n;
  }
  if (str.indexOf('e+') === -1) {
    return str
  }
  return str
    .replace('.', '')
    .split('e+')
    .reduce(function(p, b) {
      return p + Array(b - p.length + 2).join(0)
    })
};
var _toString = numToString;

/**
 * turns an integer/float into.ber, like 'fifty-five'
 */

const tens_mapping = [
  ['ninety', 90],
  ['eighty', 80],
  ['seventy', 70],
  ['sixty', 60],
  ['fifty', 50],
  ['forty', 40],
  ['thirty', 30],
  ['twenty', 20],
];
const ones_mapping = [
  '',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  'ten',
  'eleven',
  'twelve',
  'thirteen',
  'fourteen',
  'fifteen',
  'sixteen',
  'seventeen',
  'eighteen',
  'nineteen',
];

const sequence = [
  [1e24, 'septillion'],
  [1e20, 'hundred sextillion'],
  [1e21, 'sextillion'],
  [1e20, 'hundred quintillion'],
  [1e18, 'quintillion'],
  [1e17, 'hundred quadrillion'],
  [1e15, 'quadrillion'],
  [1e14, 'hundred trillion'],
  [1e12, 'trillion'],
  [1e11, 'hundred billion'],
  [1e9, 'billion'],
  [1e8, 'hundred million'],
  [1e6, 'million'],
  [100000, 'hundred thousand'],
  [1000, 'thousand'],
  [100, 'hundred'],
  [1, 'one'],
];

//turn number into an array of magnitudes, like [[5, million], [2, hundred]]
const breakdown_magnitudes = function(num) {
  let working = num;
  let have = [];
  sequence.forEach(a => {
    if (num >= a[0]) {
      let howmany = Math.floor(working / a[0]);
      working -= howmany * a[0];
      if (howmany) {
        have.push({
          unit: a[1],
          count: howmany,
        });
      }
    }
  });
  return have
};

//turn numbers from 100-0 into their text
const breakdown_hundred = function(num) {
  let arr = [];
  if (num > 100) {
    return arr //something bad happened..
  }
  for (let i = 0; i < tens_mapping.length; i++) {
    if (num >= tens_mapping[i][1]) {
      num -= tens_mapping[i][1];
      arr.push(tens_mapping[i][0]);
    }
  }
  //(hopefully) we should only have 20-0 now
  if (ones_mapping[num]) {
    arr.push(ones_mapping[num]);
  }
  return arr
};

/** print-out 'point eight nine'*/
const handle_decimal = num => {
  const names = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  let arr = [];
  //parse it out like a string, because js math is such shit
  let str = _toString(num);
  let decimal = str.match(/\.([0-9]+)/);
  if (!decimal || !decimal[0]) {
    return arr
  }
  arr.push('point');
  let decimals = decimal[0].split('');
  for (let i = 0; i < decimals.length; i++) {
    arr.push(names[decimals[i]]);
  }
  return arr
};

/** turns an integer into a textual number */
const to_text = function(num) {
  //big numbers, north of sextillion, aren't gonna work well..
  //keep them small..
  if (num > 1e21) {
    num = _toString(num);
  }
  let arr = [];
  //handle negative numbers
  if (num < 0) {
    arr.push('negative');
    num = Math.abs(num);
  }
  //break-down into units, counts
  let units = breakdown_magnitudes(num);
  //build-up the string from its components
  for (let i = 0; i < units.length; i++) {
    let unit_name = units[i].unit;
    if (unit_name === 'one') {
      unit_name = '';
      //put an 'and' in here
      if (arr.length > 1) {
        arr.push('and');
      }
    }
    arr = arr.concat(breakdown_hundred(units[i].count));
    arr.push(unit_name);
  }
  //also support decimals - 'point eight'
  arr = arr.concat(handle_decimal(num));
  //remove empties
  arr = arr.filter(s => s);
  if (arr.length === 0) {
    arr[0] = '';
  }
  return arr.join(' ')
};

var toText = to_text;

/**
 * turn a number like 5 into an ordinal like 5th
 */
const numOrdinal = function(num) {
  if (!num && num !== 0) {
    return null
  }
  //the teens are all 'th'
  let tens = num % 100;
  if (tens > 10 && tens < 20) {
    return String(num) + 'th'
  }
  //the rest of 'em
  const mapping = {
    0: 'th',
    1: 'st',
    2: 'nd',
    3: 'rd',
  };
  let str = _toString(num);
  let last = str.slice(str.length - 1, str.length);
  if (mapping[last]) {
    str += mapping[last];
  } else {
    str += 'th';
  }
  return str
};

var numOrdinal_1 = numOrdinal;

// const toString = require('../_toString')

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
  ninety: 'ninetieth',
};

/**
 * convert a javascript number to 'twentieth' format
 * */
const textOrdinal = num => {
  let words = toText(num).split(' ');
  //convert the last number to an ordinal
  let last = words[words.length - 1];
  if (irregulars.hasOwnProperty(last)) {
    words[words.length - 1] = irregulars[last];
  } else {
    words[words.length - 1] = last.replace(/y$/, 'i') + 'th';
  }
  return words.join(' ')
};

var textOrdinal_1 = textOrdinal;

const prefixes = {
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
  '₺': 'liras',
};
const suffixes = {
  '%': 'percent',
  s: 'seconds',
  cm: 'centimetres',
  km: 'kilometres',
};
var _symbols = {
  prefixes: prefixes,
  suffixes: suffixes,
};

const prefixes$1 = _symbols.prefixes;
const suffixes$1 = _symbols.suffixes;

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
  rub: true,
};
// convert $ to 'dollars', etc
const prefixToText = function(obj) {
  // turn 5% to 'five percent'
  if (prefixes$1.hasOwnProperty(obj.prefix)) {
    obj.suffix += prefixes$1[obj.prefix];
    obj.prefix = '';
  }
  //turn 5km to 'five kilometres'
  if (suffixes$1.hasOwnProperty(obj.suffix)) {
    obj.suffix = suffixes$1[obj.suffix];
  }
  //uppercase lost case for 'USD', etc
  if (isCurrency.hasOwnProperty(obj.suffix)) {
    obj.suffix = obj.suffix.toUpperCase();
  }
  // add a space, if it exists
  if (obj.suffix) {
    obj.suffix = ' ' + obj.suffix;
  }
  return obj
};

//business-logic for converting a cardinal-number to other forms
const makeNumber = function(obj, isText, isOrdinal) {
  let num = String(obj.num);
  if (isText) {
    obj = prefixToText(obj);
    if (isOrdinal) {
      //ordinal-text
      num = textOrdinal_1(num);
      return `${obj.prefix || ''}${num}${obj.suffix || ''}`
    }
    //cardinal-text
    num = toText(num);
    return `${obj.prefix || ''}${num}${obj.suffix || ''}`
  }
  //ordinal-number
  if (isOrdinal) {
    num = numOrdinal_1(num);
    // support '5th percent'
    obj = prefixToText(obj);
    return `${obj.prefix || ''}${num}${obj.suffix || ''}`
  }
  // cardinal-number
  num = _toString(num); // support very large numbers
  return `${obj.prefix || ''}${num}${obj.suffix || ''}`
};
var makeNumber_1 = makeNumber;

let methods = {
  /** overload the original json with noun information */
  json: function(options) {
    let n = null;
    if (typeof options === 'number') {
      n = options;
      options = null;
    }
    options = options || { text: true, normal: true, trim: true, terms: true };
    let res = [];
    this.forEach(doc => {
      let json = doc.json(options)[0];
      let obj = parse$1(doc);
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
      return res[n]
    }
    return res
  },

  isOrdinal: function() {
    return this.if('#Ordinal')
  },
  isCardinal: function() {
    return this.if('#Cardinal')
  },
  toNumber: function() {
    this.forEach(val => {
      let obj = parse$1(val);
      if (obj.num === null) {
        return
      }
      let str = makeNumber_1(obj, false, val.has('#Ordinal'));
      val.replaceWith(str);
    });
    return this
  },
  // toNumber, but with some commas
  toLocaleString: function() {
    this.forEach(val => {
      let obj = parse$1(val);
      if (obj.num === null) {
        return
      }
      obj.num = obj.num.toLocaleString();
      let str = makeNumber_1(obj, false, val.has('#Ordinal'));
      val.replaceWith(str);
    });
    return this
  },
  toText: function() {
    this.forEach(val => {
      let obj = parse$1(val);
      if (obj.num === null) {
        return
      }
      let str = makeNumber_1(obj, true, val.has('#Ordinal'));
      val.replaceWith(str);
    });
    return this
  },
  toCardinal: function() {
    let m = this.if('#Ordinal');
    m.forEach(val => {
      let obj = parse$1(val);
      if (obj.num === null) {
        return
      }
      let str = makeNumber_1(obj, val.has('#TextValue'), false);
      val.replaceWith(str);
    });
    return this
  },

  toOrdinal: function() {
    let m = this.if('#Cardinal');
    m.forEach(val => {
      let obj = parse$1(val);
      if (obj.num === null) {
        return
      }
      let str = makeNumber_1(obj, val.has('#TextValue'), true);
      val.replaceWith(str);
    });
    return this
  },
  isEqual: function(n) {
    return this.filter(val => {
      let num = parse$1(val).num;
      return num === n
    })
  },
  greaterThan: function(n) {
    return this.filter(val => {
      let num = parse$1(val).num;
      return num > n
    })
  },
  lessThan: function(n) {
    return this.filter(val => {
      let num = parse$1(val).num;
      return num < n
    })
  },
  between: function(a, b) {
    return this.filter(val => {
      let num = parse$1(val).num;
      return num > a && num < b
    })
  },
  add: function(n) {
    if (!n) {
      return this // don't bother
    }
    this.forEach(val => {
      let obj = parse$1(val);
      if (obj.num === null) {
        return
      }
      obj.num += n;
      let str = makeNumber_1(obj, val.has('#TextValue'), val.has('#Ordinal'));
      val.replaceWith(str);
    });
    return this
  },
  subtract: function(n) {
    return this.add(n * -1)
  },
  increment: function() {
    this.add(1);
    return this
  },
  decrement: function() {
    this.add(-1);
    return this
  },
};
// aliases
methods.toNice = methods.toLocaleString;
methods.minus = methods.subtract;
methods.plus = methods.add;
methods.equals = methods.isEqual;

var methods_1 = methods;

const tagger = function(doc) {
  doc
    .match(
      '(hundred|thousand|million|billion|trillion|quadrillion|quintillion|sextillion|septillion)'
    )
    .tag('#Multiple');
  //  in the 400s
  doc.match('the [/[0-9]+s$/]').tag('#Plural');
};
var tagger_1 = tagger;

/** adds .numbers() method */
const addMethod = function(Doc, world) {
  // additional tagging before running the number-parser
  world.postProcess(tagger_1);

  /** a list of number values, and their units */
  class Numbers extends Doc {
    constructor(list, from, w) {
      super(list, from, w);
      this.unit = this.match('#Unit+$');
      let numbers = this.not('#Unit+$');
      this.list = numbers.list;
    }
  }
  //aliases
  Object.assign(Numbers.prototype, methods_1);
  Numbers.prototype.plus = Numbers.prototype.add;
  Numbers.prototype.minus = Numbers.prototype.subtract;

  Doc.prototype.numbers = function(n) {
    let match = find(this, n);
    return new Numbers(match.list, this, this.world)
  };
  // alias for reverse-compatibility
  Doc.prototype.values = Doc.prototype.numbers;
  return Doc
};
var src = addMethod;

export default src;

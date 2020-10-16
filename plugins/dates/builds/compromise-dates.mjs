/* compromise-dates 1.2.0 MIT */
function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
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

//ambiguous 'may' and 'march'
var preps = '(in|by|before|during|on|until|after|of|within|all)'; //6

var thisNext = '(last|next|this|previous|current|upcoming|coming)'; //2

var sections = '(start|end|middle|starting|ending|midpoint|beginning)'; //2

var seasons = '(spring|summer|winter|fall|autumn)'; //ensure a year is approximately typical for common years
//please change in one thousand years

var tagYear = function tagYear(m, reason) {
  if (m.found !== true) {
    return;
  }

  var term = m.termList()[0];

  if (term) {
    var num = parseInt(term.clean, 10);

    if (num && num > 1000 && num < 3000) {
      m.tag('Year', reason);
    }
  }
}; //same, but for less-confident values


var tagYearSafe = function tagYearSafe(m, reason) {
  if (m.found !== true) {
    return;
  }

  var term = m.termList()[0];

  if (term) {
    var num = parseInt(term.clean, 10);

    if (num && num > 1900 && num < 2030) {
      m.tag('Year', reason);
    }
  }
};

var fixDates = function fixDates(doc) {
  doc.match('in the (night|evening|morning|afternoon|day|daytime)').tag('Time', 'in-the-night');
  doc.match('(#Value|#Time) (am|pm)').tag('Time', 'value-ampm'); //months:

  var month = doc["if"]('#Month');

  if (month.found === true) {
    //June 5-7th
    month.match("#Month #Date+").tag('Date', 'correction-numberRange'); //5th of March

    month.match('#Value of #Month').tag('Date', 'value-of-month'); //5 March

    month.match('#Cardinal #Month').tag('Date', 'cardinal-month'); //march 5 to 7

    month.match('#Month #Value to #Value').tag('Date', 'value-to-value'); //march the 12th

    month.match('#Month the #Value').tag('Date', 'month-the-value');
  } //months:


  var val = doc["if"]('#Value');

  if (val.found === true) {
    //june 7
    val.match('(#WeekDay|#Month) #Value').ifNo('#Money').tag('Date', 'date-value'); //7 june

    val.match('#Value (#WeekDay|#Month)').ifNo('#Money').tag('Date', 'value-date'); //may twenty five

    val.match('#TextValue #TextValue')["if"]('#Date').tag('#Date', 'textvalue-date'); //eg 'year'

    var duration = val["if"]('#Duration');

    if (duration.found === true) {
      //for 4 months
      duration.match('for #Value #Duration').tag('Date', 'for-x-duration'); //two days before

      duration.match('#Value #Duration #Conjunction').tag('Date', 'val-duration-conjunction'); //for four days

      duration.match("".concat(preps, "? #Value #Duration")).tag('Date', 'value-duration'); //two years old

      duration.match('#Value #Duration old').unTag('Date', 'val-years-old');
    }
  } //seasons


  var season = doc["if"](seasons);

  if (season.found === true) {
    season.match("".concat(preps, "? ").concat(thisNext, " ").concat(seasons)).tag('Date', 'thisNext-season');
    season.match("the? ".concat(sections, " of ").concat(seasons)).tag('Date', 'section-season');
    season.match("".concat(seasons, " ").concat(preps, "? #Cardinal")).tag('Date', 'season-year');
  } //rest-dates


  var date = doc["if"]('#Date');

  if (date.found === true) {
    //june the 5th
    date.match('#Date the? #Ordinal').tag('Date', 'correction'); //last month

    date.match("".concat(thisNext, " #Date")).tag('Date', 'thisNext'); //by 5 March

    date.match('due? (by|before|after|until) #Date').tag('Date', 'by'); //next feb

    date.match('(last|next|this|previous|current|upcoming|coming|the) #Date').tag('Date', 'next-feb'); //start of june

    date.match("the? ".concat(sections, " of #Date")).tag('Date', 'section-of'); //fifth week in 1998

    date.match('#Ordinal #Duration in #Date').tag('Date', 'duration-in'); //early in june

    date.match('(early|late) (at|in)? the? #Date').tag('Time', 'early-evening'); //tomorrow before 3

    date.match('#Date (by|before|after|at|@|about) #Cardinal').not('^#Date').tag('Time', 'date-before-Cardinal'); //saturday am

    date.match('#Date [(am|pm)]', 0).unTag('Verb').unTag('Copula').tag('Time', 'date-am'); //feb to june

    date.match('#Date (#Preposition|to) #Date').ifNo('#Duration').tag('Date', 'date-prep-date');
  } //year/cardinal tagging


  var cardinal = doc["if"]('#Cardinal');

  if (cardinal.found === true) {
    var v = cardinal.match("#Date #Value [#Cardinal]", 0);
    tagYear(v, 'date-value-year'); //scoops up a bunch

    v = cardinal.match("#Date+ [#Cardinal]", 0);
    tagYear(v, 'date-year'); //feb 8 2018

    v = cardinal.match("#Month #Value [#Cardinal]", 0);
    tagYear(v, 'month-value-year'); //feb 8 to 10th 2018

    v = cardinal.match("#Month #Value to #Value [#Cardinal]", 0);
    tagYear(v, 'month-range-year'); //in 1998

    v = cardinal.match("(in|of|by|during|before|starting|ending|for|year) [#Cardinal]", 0);
    tagYear(v, 'in-year'); //q2 2009

    v = cardinal.match('(q1|q2|q3|q4) [#Cardinal]', 0);
    tagYear(v, 'in-year'); //2nd quarter 2009

    v = cardinal.match('#Ordinal quarter [#Cardinal]', 0);
    tagYear(v, 'in-year'); //in the year 1998

    v = cardinal.match('the year [#Cardinal]', 0);
    tagYear(v, 'in-year'); //it was 1998

    v = cardinal.match('it (is|was) [#Cardinal]', 0);
    tagYearSafe(v, 'in-year');
  }

  var time = doc["if"]('#Time');

  if (time.found === true) {
    //by 6pm
    time.match('(by|before|after|at|@|about) #Time').tag('Time', 'preposition-time'); //7 7pm

    time.match('#Cardinal #Time').not('#Year').tag('Time', 'value-time'); //2pm est

    time.match('#Time [(eastern|pacific|central|mountain)]', 0).tag('Date', 'timezone'); //6pm est

    time.match('#Time [(est|pst|gmt)]', 0).tag('Date', 'timezone abbr');
  }

  return doc;
};

var _00Basic = fixDates;

var here = 'date-values'; //

var values = function values(doc) {
  // a year ago
  if (!doc.has('once [a] #Duration')) {
    doc.match('[a] #Duration', 0).replaceWith('1').tag('Cardinal', here);
  }

  if (doc.has('#Value')) {
    //june 5 to 7th
    doc.match('#Month #Value to #Value of? #Year?').tag('Date', here); //5 to 7th june

    doc.match('#Value to #Value of? #Month #Year?').tag('Date', here); //third week of may

    doc.match('#Value #Duration of #Date').tag('Date', here); //two days after

    doc.match('#Value+ #Duration (after|before|into|later|afterwards|ago)?').tag('Date', here); //two days

    doc.match('#Value #Date').tag('Date', here); //june 5th

    doc.match('#Date #Value').tag('Date', here); //tuesday at 5

    doc.match('#Date #Preposition #Value').tag('Date', here); //tomorrow before 3

    doc.match('#Date (after|before|during|on|in) #Value').tag('Date', here); //a year and a half

    doc.match('#Value (year|month|week|day) and a half').tag('Date', here); //5 and a half years

    doc.match('#Value and a half (years|months|weeks|days)').tag('Date', here); //on the fifth

    doc.match('on the #Ordinal').tag('Date', here);
  }

  return doc;
};

var _01Values = values;

var here$1 = 'date-tagger'; //

var dateTagger = function dateTagger(doc) {
  doc.match('(spring|summer|winter|fall|autumn|springtime|wintertime|summertime)').match('#Noun').tag('Season', here$1);
  doc.match('(q1|q2|q3|q4)').tag('FinancialQuarter', here$1);
  doc.match('(this|next|last|current) quarter').tag('FinancialQuarter', here$1);
  doc.match('(this|next|last|current) season').tag('Season', here$1);

  if (doc.has('#Date')) {
    //friday to sunday
    doc.match('#Date #Preposition #Date').tag('Date', here$1); //once a day..

    doc.match('(once|twice) (a|an|each) #Date').tag('Date', here$1); //TODO:fixme

    doc.match('(by|until|on|in|at|during|over|every|each|due) the? #Date').tag('Date', here$1); //tuesday

    doc.match('#Date+').tag('Date', here$1); //by June

    doc.match('(by|until|on|in|at|during|over|every|each|due) the? #Date').tag('Date', here$1); //a year after..

    doc.match('a #Duration').tag('Date', here$1); //between x and y

    doc.match('(between|from) #Date').tag('Date', here$1);
    doc.match('(to|until|upto) #Date').tag('Date', here$1);
    doc.match('#Date and #Date').tag('Date', here$1); //during this june

    doc.match('(by|until|after|before|during|on|in|following) (next|this|last)? (#Date|#Date)').tag('Date', here$1); //day after next

    doc.match('the? #Date after next one?').tag('Date', here$1); //approximately...

    doc.match('(about|approx|approximately|around) #Date').tag('Date', here$1);
  }

  return doc;
};

var _02Dates = dateTagger;

var here$2 = 'section-tagger'; //

var sectionTagger = function sectionTagger(doc) {
  if (doc.has('#Date')) {
    // //next september
    doc.match('this? (last|next|past|this|previous|current|upcoming|coming|the) #Date').tag('Date', here$2); //starting this june

    doc.match('(starting|beginning|ending) #Date').tag('Date', here$2); //start of june

    doc.match('the? (start|end|middle|beginning) of (last|next|this|the) (#Date|#Date)').tag('Date', here$2); //this coming june

    doc.match('(the|this) #Date').tag('Date', here$2);
  }

  return doc;
};

var _03Sections = sectionTagger;

var here$3 = 'time-tagger'; //

var timeTagger = function timeTagger(doc) {
  // quarter to seven (not march 5 to 7)
  if (doc.has('#Cardinal') && !doc.has('#Month')) {
    doc.match('(half|quarter|25|15|10|5) (past|after|to) #Cardinal').tag('Time', here$3);
  } //timezone


  if (doc.has('#Date')) {
    //eastern daylight time
    doc.match('#Noun (standard|daylight|central|mountain)? time').tag('Timezone', here$3); //utc+5

    doc.match('/^utc[+-][0-9]/').tag('Timezone', here$3);
    doc.match('/^gmt[+-][0-9]/').tag('Timezone', here$3);
    doc.match('(in|for|by|near|at) #Timezone').tag('Timezone', here$3); // https://raw.githubusercontent.com/davispuh/TimezoneParser/master/data/abbreviations.yml
    // let abbr =
    // '(acdt|acst|ace|dmt|ist|tse|addt|adt|aedt|aest|ahdt|ahst|akdt|akst|amt|nst|apt|awt|gmt|awdt|awst|bdst|bst|bdt|nwt|bmt|wet|bost|cddt|cdt|cet|cmt|cpt|cst|cwt|chst|gst|eat|eddt|edt|eest|eet|emt|ept|ewt|est|ffmt|fmt|hdt|hst|hkst|hkt|hmt|iddt|idt|jmt|imt|jdt|jst|kdt|kst|kmt|lst|mddt|mdst|msd|msk|mdt|mmt|mpt|pdt|pst|mst|mwt|nddt|ndt|npt|nzdt|nzmt|nzst|pddt|pkst|pkt|plmt|pmmt|pmt|ppmt|ppt|pwt|qmt|rmt|sast|sdmt|set|sjmt|smt|sst|tbmt|tmt|utc|wast|wemt|wib|wit|wita|wmt|yddt|ydt|ypt|ywt|yst)'
    // doc.match(abbr).tag('Timezone', here)
  }

  return doc;
};

var _04Time = timeTagger;

var here$4 = 'shift-tagger'; //

var shiftTagger = function shiftTagger(doc) {
  if (doc.has('#Date')) {
    //'two days before'/ 'nine weeks frow now'
    doc.match('#Cardinal #Duration (before|after|ago|from)').tag('#DateShift', here$4); // in two weeks

    doc.match('in #Cardinal #Duration').tag('#DateShift', here$4); //two weeks and three days before

    doc.match('#Cardinal #Duration and? #DateShift').tag('#DateShift', here$4);
    doc.match('#DateShift and #Cardinal #Duration').tag('#DateShift', here$4); // doc.match('#Cardinal #Duration and? #DateShift').tag('#DateShift', here)
  }

  return doc;
};

var _05Shifts = shiftTagger;

var here$5 = 'fix-tagger'; //

var fixUp = function fixUp(doc) {
  //fixups
  if (doc.has('#Date')) {
    //first day by monday
    var oops = doc.match('#Date+ by #Date+');

    if (oops.found && !oops.has('^due')) {
      oops.match('^#Date+').unTag('Date', 'by-monday');
    }

    var d = doc.match('#Date+'); //'spa day'

    d.match('^day$').unTag('Date', 'spa-day'); // tomorrow's meeting

    d.match('(in|of|by|for)? (#Possessive && #Date)').unTag('Date', 'tomorrows meeting');
    var knownDate = '(yesterday|today|tomorrow)';

    if (d.has(knownDate)) {
      //yesterday 7
      d.match("".concat(knownDate, " [#Value]$")).unTag('Date', 'yesterday-7'); //7 yesterday

      d.match("^[#Value] ".concat(knownDate, "$"), 0).unTag('Date', '7 yesterday'); //friday yesterday

      d.match("#WeekDay+ ".concat(knownDate, "$")).unTag('Date').lastTerm().tag('Date', 'fri-yesterday'); // yesterday yesterday
      // d.match(`${knownDate}+ ${knownDate}$`)
      //   .unTag('Date')
      //   .lastTerm()
      //   .tag('Date', here)

      d.match("(this|last|next) #Date ".concat(knownDate, "$")).unTag('Date').lastTerm().tag('Date', 'this month yesterday');
    } //tomorrow on 5


    d.match("on #Cardinal$").unTag('Date', here$5); //this tomorrow

    d.match("this tomorrow").terms(0).unTag('Date', 'this-tomorrow'); //q2 2019

    d.match("(q1|q2|q3|q4) #Year").tag('Date', here$5); //5 tuesday
    // d.match(`^#Value #WeekDay`).terms(0).unTag('Date');
    //5 next week

    d.match("^#Value (this|next|last)").terms(0).unTag('Date', here$5);

    if (d.has('(last|this|next)')) {
      //this month 7
      d.match("(last|this|next) #Duration #Value").terms(2).unTag('Date', here$5); //7 this month

      d.match("!#Month #Value (last|this|next) #Date").terms(0).unTag('Date', here$5);
    } //january 5 5


    if (d.has('(#Year|#Time|#TextValue|#NumberRange)') === false) {
      d.match('(#Month|#WeekDay) #Value #Value').terms(2).unTag('Date', here$5);
    } //between june


    if (d.has('^between') && !d.has('and .')) {
      d.unTag('Date', here$5);
    } //june june


    if (d.has('#Month #Month') && !d.has('@hasHyphen') && !d.has('@hasComma')) {
      d.match('#Month').lastTerm().unTag('Date', 'month-month');
    } // log the hours


    if (d.has('(minutes|seconds|weeks|hours|days|months)') && !d.has('#Value #Duration')) {
      d.match('(minutes|seconds|weeks|hours|days|months)').unTag('Date', 'log-hours');
    } // about thanksgiving


    if (d.has('about #Holiday')) {
      d.match('about').unTag('#Date', 'about-thanksgiving');
    } // a month from now


    d.match('(from|by|before) now').unTag('Time'); // dangling date-chunks
    // if (d.has('!#Date (in|of|by|for) !#Date')) {
    //   d.unTag('Date', 'dangling-date')
    // }
  }

  return doc;
};

var _06Fixup = fixUp;

var methods = [_00Basic, _01Values, _02Dates, _03Sections, _04Time, _05Shifts, _06Fixup]; // run each of the taggers

var tagDate = function tagDate(doc) {
  methods.forEach(function (fn) {
    return fn(doc);
  });
  return doc;
};

var _01Tag = tagDate;

var _tags = {
  FinancialQuarter: {
    isA: 'Date'
  },
  // 'summer'
  Season: {
    isA: 'Date'
  },
  // '1982'
  Year: {
    isA: ['Date'],
    notA: 'RomanNumeral'
  },
  // 'months'
  Duration: {
    isA: ['Date', 'Noun']
  },
  // 'easter'
  Holiday: {
    isA: ['Date', 'Noun']
  },
  // 'PST'
  Timezone: {
    isA: ['Date', 'Noun']
  },
  // 'two weeks before'
  DateShift: {
    isA: ['Date']
  }
};

/* spencermountain/spacetime 6.6.3 Apache 2.0 */
function createCommonjsModule(fn, module) {
  return module = {
    exports: {}
  }, fn(module, module.exports), module.exports;
}

function getCjsExportFromNamespace(n) {
  return n && n['default'] || n;
}

var fns = createCommonjsModule(function (module, exports) {
  //git:blame @JuliasCaesar https://www.timeanddate.com/date/leapyear.html
  exports.isLeapYear = function (year) {
    return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
  }; // unsurprisingly-nasty `typeof date` call


  exports.isDate = function (d) {
    return Object.prototype.toString.call(d) === '[object Date]' && !isNaN(d.valueOf());
  };

  exports.isArray = function (input) {
    return Object.prototype.toString.call(input) === '[object Array]';
  };

  exports.isObject = function (input) {
    return Object.prototype.toString.call(input) === '[object Object]';
  };

  exports.zeroPad = function (str) {
    var len = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
    var pad = '0';
    str = str + '';
    return str.length >= len ? str : new Array(len - str.length + 1).join(pad) + str;
  };

  exports.titleCase = function (str) {
    if (!str) {
      return '';
    }

    return str[0].toUpperCase() + str.substr(1);
  };

  exports.ordinal = function (i) {
    var j = i % 10;
    var k = i % 100;

    if (j === 1 && k !== 11) {
      return i + 'st';
    }

    if (j === 2 && k !== 12) {
      return i + 'nd';
    }

    if (j === 3 && k !== 13) {
      return i + 'rd';
    }

    return i + 'th';
  }; //strip 'st' off '1st'..


  exports.toCardinal = function (str) {
    str = String(str);
    str = str.replace(/([0-9])(st|nd|rd|th)$/i, '$1');
    return parseInt(str, 10);
  }; //used mostly for cleanup of unit names, like 'months'


  exports.normalize = function () {
    var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    str = str.toLowerCase().trim();
    str = str.replace(/ies$/, 'y'); //'centuries'

    str = str.replace(/s$/, '');
    str = str.replace(/-/g, '');

    if (str === 'day') {
      return 'date';
    }

    return str;
  };

  exports.getEpoch = function (tmp) {
    //support epoch
    if (typeof tmp === 'number') {
      return tmp;
    } //suport date objects


    if (exports.isDate(tmp)) {
      return tmp.getTime();
    }

    if (tmp.epoch) {
      return tmp.epoch;
    }

    return null;
  }; //make sure this input is a spacetime obj


  exports.beADate = function (d, s) {
    if (exports.isObject(d) === false) {
      return s.clone().set(d);
    }

    return d;
  };

  exports.formatTimezone = function (offset) {
    var delimiter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var absOffset = Math.abs(offset);
    var sign = offset > 0 ? '+' : '-';
    return "".concat(sign).concat(exports.zeroPad(absOffset)).concat(delimiter, "00");
  };
});
var fns_1 = fns.isLeapYear;
var fns_2 = fns.isDate;
var fns_3 = fns.isArray;
var fns_4 = fns.isObject;
var fns_5 = fns.zeroPad;
var fns_6 = fns.titleCase;
var fns_7 = fns.ordinal;
var fns_8 = fns.toCardinal;
var fns_9 = fns.normalize;
var fns_10 = fns.getEpoch;
var fns_11 = fns.beADate;
var fns_12 = fns.formatTimezone;
var zeroPad = fns.zeroPad;

var serialize = function serialize(d) {
  return zeroPad(d.getMonth() + 1) + '/' + zeroPad(d.getDate()) + ':' + zeroPad(d.getHours());
}; // a timezone will begin with a specific offset in january
// then some will switch to something else between november-march


var shouldChange = function shouldChange(epoch, start, end, defaultOffset) {
  //note: this has a cray order-of-operations issue
  //we can't get the date, without knowing the timezone, and vice-versa
  //it's possible that we can miss a dst-change by a few hours.
  var d = new Date(epoch); //(try to mediate this a little?)

  var bias = d.getTimezoneOffset() || 0;
  var shift = bias + defaultOffset * 60; //in minutes

  shift = shift * 60 * 1000; //in ms

  d = new Date(epoch + shift);
  var current = serialize(d); //eg. is it after ~november?

  if (current >= start) {
    //eg. is it before ~march~ too?
    if (current < end) {
      return true;
    }
  }

  return false;
};

var summerTime = shouldChange; // it reproduces some things in ./index.js, but speeds up spacetime considerably

var quickOffset = function quickOffset(s) {
  var zones = s.timezones;
  var obj = zones[s.tz];

  if (obj === undefined) {
    console.warn("Warning: couldn't find timezone " + s.tz);
    return 0;
  }

  if (obj.dst === undefined) {
    return obj.offset;
  } //get our two possible offsets


  var jul = obj.offset;
  var dec = obj.offset + 1; // assume it's the same for now

  if (obj.hem === 'n') {
    dec = jul - 1;
  }

  var split = obj.dst.split('->');
  var inSummer = summerTime(s.epoch, split[0], split[1], jul);

  if (inSummer === true) {
    return jul;
  }

  return dec;
};

var quick = quickOffset;
var _build = {
  "9|s": "2/dili,2/jayapura",
  "9|n": "2/chita,2/khandyga,2/pyongyang,2/seoul,2/tokyo,11/palau",
  "9.5|s|04/05:03->10/04:02": "4/adelaide,4/broken_hill,4/south,4/yancowinna",
  "9.5|s": "4/darwin,4/north",
  "8|s": "12/casey,2/kuala_lumpur,2/makassar,2/singapore,4/perth,4/west",
  "8|n|03/25:03->09/29:23": "2/ulan_bator",
  "8|n": "2/brunei,2/choibalsan,2/chongqing,2/chungking,2/harbin,2/hong_kong,2/irkutsk,2/kuching,2/macao,2/macau,2/manila,2/shanghai,2/taipei,2/ujung_pandang,2/ulaanbaatar",
  "8.75|s": "4/eucla",
  "7|s": "12/davis,2/jakarta,9/christmas",
  "7|n": "2/bangkok,2/barnaul,2/ho_chi_minh,2/hovd,2/krasnoyarsk,2/novokuznetsk,2/novosibirsk,2/phnom_penh,2/pontianak,2/saigon,2/tomsk,2/vientiane",
  "6|s": "12/vostok",
  "6|n": "2/almaty,2/bishkek,2/dacca,2/dhaka,2/kashgar,2/omsk,2/qyzylorda,2/thimbu,2/thimphu,2/urumqi,9/chagos",
  "6.5|n": "2/rangoon,2/yangon,9/cocos",
  "5|s": "12/mawson,9/kerguelen",
  "5|n": "2/aqtau,2/aqtobe,2/ashgabat,2/ashkhabad,2/atyrau,2/baku,2/dushanbe,2/karachi,2/oral,2/samarkand,2/tashkent,2/yekaterinburg,9/maldives",
  "5.75|n": "2/kathmandu,2/katmandu",
  "5.5|n": "2/calcutta,2/colombo,2/kolkata",
  "4|s": "9/reunion",
  "4|n": "2/dubai,2/muscat,2/tbilisi,2/yerevan,8/astrakhan,8/samara,8/saratov,8/ulyanovsk,8/volgograd,2/volgograd,9/mahe,9/mauritius",
  "4.5|n|03/21:00->09/20:24": "2/tehran",
  "4.5|n": "2/kabul",
  "3|s": "12/syowa,9/antananarivo",
  "3|n|03/29:03->10/25:04": "2/famagusta,2/nicosia,8/athens,8/bucharest,8/helsinki,8/kiev,8/mariehamn,8/nicosia,8/riga,8/sofia,8/tallinn,8/uzhgorod,8/vilnius,8/zaporozhye",
  "3|n|03/29:02->10/25:03": "8/chisinau,8/tiraspol",
  "3|n|03/29:00->10/24:24": "2/beirut",
  "3|n|03/27:02->10/25:02": "2/jerusalem,2/tel_aviv",
  "3|n|03/27:00->10/31:01": "2/gaza,2/hebron",
  "3|n|03/27:00->10/30:01": "2/amman",
  "3|n|03/27:00->10/29:24": "2/damascus",
  "3|n": "0/addis_ababa,0/asmara,0/asmera,0/dar_es_salaam,0/djibouti,0/juba,0/kampala,0/mogadishu,0/nairobi,2/aden,2/baghdad,2/bahrain,2/istanbul,2/kuwait,2/qatar,2/riyadh,8/istanbul,8/kirov,8/minsk,8/moscow,8/simferopol,9/comoro,9/mayotte",
  "2|s|03/29:02->10/25:02": "12/troll",
  "2|s": "0/gaborone,0/harare,0/johannesburg,0/lubumbashi,0/lusaka,0/maputo,0/maseru,0/mbabane",
  "2|n|03/29:02->10/25:03": "0/ceuta,arctic/longyearbyen,3/jan_mayen,8/amsterdam,8/andorra,8/belgrade,8/berlin,8/bratislava,8/brussels,8/budapest,8/busingen,8/copenhagen,8/gibraltar,8/ljubljana,8/luxembourg,8/madrid,8/malta,8/monaco,8/oslo,8/paris,8/podgorica,8/prague,8/rome,8/san_marino,8/sarajevo,8/skopje,8/stockholm,8/tirane,8/vaduz,8/vatican,8/vienna,8/warsaw,8/zagreb,8/zurich",
  "2|n": "0/blantyre,0/bujumbura,0/cairo,0/khartoum,0/kigali,0/tripoli,8/kaliningrad",
  "1|s|04/02:01->09/03:03": "0/windhoek",
  "1|s": "0/kinshasa,0/luanda",
  "1|n|04/19:03->05/31:02": "0/casablanca,0/el_aaiun",
  "1|n|03/29:01->10/25:02": "3/canary,3/faeroe,3/faroe,3/madeira,8/belfast,8/dublin,8/guernsey,8/isle_of_man,8/jersey,8/lisbon,8/london",
  "1|n": "0/algiers,0/bangui,0/brazzaville,0/douala,0/lagos,0/libreville,0/malabo,0/ndjamena,0/niamey,0/porto-novo,0/tunis",
  "14|n": "11/kiritimati",
  "13|s|04/05:04->09/27:03": "11/apia",
  "13|s|01/15:02->11/05:03": "11/tongatapu",
  "13|n": "11/enderbury,11/fakaofo",
  "12|s|04/05:03->09/27:02": "12/mcmurdo,12/south_pole,11/auckland",
  "12|s|01/12:03->11/08:02": "11/fiji",
  "12|n": "2/anadyr,2/kamchatka,2/srednekolymsk,11/funafuti,11/kwajalein,11/majuro,11/nauru,11/tarawa,11/wake,11/wallis",
  "12.75|s|04/05:03->04/05:02": "11/chatham",
  "11|s": "12/macquarie,11/bougainville",
  "11|n": "2/magadan,2/sakhalin,11/efate,11/guadalcanal,11/kosrae,11/noumea,11/pohnpei,11/ponape",
  "11.5|n|04/05:03->10/04:02": "11/norfolk",
  "10|s|04/05:03->10/04:02": "4/act,4/canberra,4/currie,4/hobart,4/melbourne,4/nsw,4/sydney,4/tasmania,4/victoria",
  "10|s": "12/dumontdurville,4/brisbane,4/lindeman,4/queensland",
  "10|n": "2/ust-nera,2/vladivostok,2/yakutsk,11/chuuk,11/guam,11/port_moresby,11/saipan,11/truk,11/yap",
  "10.5|s|04/05:01->10/04:02": "4/lhi,4/lord_howe",
  "0|n|03/29:00->10/25:01": "1/scoresbysund,3/azores",
  "0|n": "0/abidjan,0/accra,0/bamako,0/banjul,0/bissau,0/conakry,0/dakar,0/freetown,0/lome,0/monrovia,0/nouakchott,0/ouagadougou,0/sao_tome,0/timbuktu,1/danmarkshavn,3/reykjavik,3/st_helena,13/gmt,13/gmt+0,13/gmt-0,13/gmt0,13/greenwich,13/utc,13/universal,13/zulu",
  "-9|n|03/08:02->11/01:02": "1/adak,1/atka",
  "-9|n": "11/gambier",
  "-9.5|n": "11/marquesas",
  "-8|n|03/08:02->11/01:02": "1/anchorage,1/juneau,1/metlakatla,1/nome,1/sitka,1/yakutat",
  "-8|n": "11/pitcairn",
  "-7|n|03/08:02->11/01:02": "1/dawson,1/ensenada,1/los_angeles,1/santa_isabel,1/tijuana,1/vancouver,1/whitehorse,6/pacific,6/yukon,10/bajanorte",
  "-7|n": "1/creston,1/dawson_creek,1/hermosillo,1/phoenix",
  "-6|s|04/04:22->09/05:22": "7/easterisland,11/easter",
  "-6|n|04/05:02->10/25:02": "1/chihuahua,1/mazatlan,10/bajasur",
  "-6|n|03/08:02->11/01:02": "1/boise,1/cambridge_bay,1/denver,1/edmonton,1/inuvik,1/ojinaga,1/shiprock,1/yellowknife,6/mountain",
  "-6|n": "1/belize,1/costa_rica,1/el_salvador,1/guatemala,1/managua,1/regina,1/swift_current,1/tegucigalpa,6/east-saskatchewan,6/saskatchewan,11/galapagos",
  "-5|s": "1/lima,1/rio_branco,5/acre",
  "-5|n|04/05:02->10/25:02": "1/bahia_banderas,1/merida,1/mexico_city,1/monterrey,10/general",
  "-5|n|03/12:03->11/05:01": "1/north_dakota",
  "-5|n|03/08:02->11/01:02": "1/chicago,1/knox_in,1/matamoros,1/menominee,1/rainy_river,1/rankin_inlet,1/resolute,1/winnipeg,6/central",
  "-5|n": "1/atikokan,1/bogota,1/cancun,1/cayman,1/coral_harbour,1/eirunepe,1/guayaquil,1/jamaica,1/panama,1/porto_acre",
  "-4|s|05/13:23->08/13:01": "12/palmer",
  "-4|s|04/04:24->09/06:00": "1/santiago,7/continental",
  "-4|s|03/21:24->10/04:00": "1/asuncion",
  "-4|s|02/16:24->11/03:00": "1/campo_grande,1/cuiaba",
  "-4|s": "1/la_paz,1/manaus,5/west",
  "-4|n|03/12:03->11/05:01": "1/indiana,1/kentucky",
  "-4|n|03/08:02->11/01:02": "1/detroit,1/fort_wayne,1/grand_turk,1/indianapolis,1/iqaluit,1/louisville,1/montreal,1/nassau,1/new_york,1/nipigon,1/pangnirtung,1/port-au-prince,1/thunder_bay,1/toronto,6/eastern",
  "-4|n|03/08:00->11/01:01": "1/havana",
  "-4|n": "1/anguilla,1/antigua,1/aruba,1/barbados,1/blanc-sablon,1/boa_vista,1/caracas,1/curacao,1/dominica,1/grenada,1/guadeloupe,1/guyana,1/kralendijk,1/lower_princes,1/marigot,1/martinique,1/montserrat,1/port_of_spain,1/porto_velho,1/puerto_rico,1/santo_domingo,1/st_barthelemy,1/st_kitts,1/st_lucia,1/st_thomas,1/st_vincent,1/tortola,1/virgin",
  "-3|s": "1/argentina,1/buenos_aires,1/cordoba,1/fortaleza,1/montevideo,1/punta_arenas,1/sao_paulo,12/rothera,3/stanley,5/east",
  "-3|n|03/08:02->11/01:02": "1/glace_bay,1/goose_bay,1/halifax,1/moncton,1/thule,3/bermuda,6/atlantic",
  "-3|n": "1/araguaina,1/bahia,1/belem,1/catamarca,1/cayenne,1/jujuy,1/maceio,1/mendoza,1/paramaribo,1/recife,1/rosario,1/santarem",
  "-2|s": "5/denoronha",
  "-2|n|03/28:22->10/24:23": "1/godthab",
  "-2|n|03/08:02->11/01:02": "1/miquelon",
  "-2|n": "1/noronha,3/south_georgia",
  "-2.5|n|03/08:02->11/01:02": "1/st_johns,6/newfoundland",
  "-1|n": "3/cape_verde",
  "-11|n": "11/midway,11/niue,11/pago_pago,11/samoa",
  "-10|n": "11/honolulu,11/johnston,11/rarotonga,11/tahiti"
};

var _build$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': _build
}); //prefixes for iana names..


var _prefixes = ['africa', 'america', 'asia', 'atlantic', 'australia', 'brazil', 'canada', 'chile', 'europe', 'indian', 'mexico', 'pacific', 'antarctica', 'etc'];
var data = getCjsExportFromNamespace(_build$1);
var all = {};
Object.keys(data).forEach(function (k) {
  var split = k.split('|');
  var obj = {
    offset: Number(split[0]),
    hem: split[1]
  };

  if (split[2]) {
    obj.dst = split[2];
  }

  var names = data[k].split(',');
  names.forEach(function (str) {
    str = str.replace(/(^[0-9]+)\//, function (before, num) {
      num = Number(num);
      return _prefixes[num] + '/';
    });
    all[str] = obj;
  });
});
all['utc'] = {
  offset: 0,
  hem: 'n' //(sorry)

}; //add etc/gmt+n

for (var i = -14; i <= 14; i += 0.5) {
  var num = i;

  if (num > 0) {
    num = '+' + num;
  }

  var name = 'etc/gmt' + num;
  all[name] = {
    offset: i * -1,
    //they're negative!
    hem: 'n' //(sorry)

  };
  name = 'utc/gmt' + num; //this one too, why not.

  all[name] = {
    offset: i * -1,
    hem: 'n'
  };
} // console.log(all)
// console.log(Object.keys(all).length)


var unpack = all; //find the implicit iana code for this machine.
//safely query the Intl object
//based on - https://bitbucket.org/pellepim/jstimezonedetect/src

var fallbackTZ = 'utc'; //
//this Intl object is not supported often, yet

var safeIntl = function safeIntl() {
  if (typeof Intl === 'undefined' || typeof Intl.DateTimeFormat === 'undefined') {
    return null;
  }

  var format = Intl.DateTimeFormat();

  if (typeof format === 'undefined' || typeof format.resolvedOptions === 'undefined') {
    return null;
  }

  var timezone = format.resolvedOptions().timeZone;

  if (!timezone) {
    return null;
  }

  return timezone.toLowerCase();
};

var guessTz = function guessTz() {
  var timezone = safeIntl();

  if (timezone === null) {
    return fallbackTZ;
  }

  return timezone;
}; //do it once per computer


var guessTz_1 = guessTz;
var isOffset = /(\-?[0-9]+)h(rs)?/i;
var isNumber = /(\-?[0-9]+)/;
var utcOffset = /utc([\-+]?[0-9]+)/i;
var gmtOffset = /gmt([\-+]?[0-9]+)/i;

var toIana = function toIana(num) {
  num = Number(num);

  if (num > -13 && num < 13) {
    num = num * -1; //it's opposite!

    num = (num > 0 ? '+' : '') + num; //add plus sign

    return 'etc/gmt' + num;
  }

  return null;
};

var parseOffset = function parseOffset(tz) {
  // '+5hrs'
  var m = tz.match(isOffset);

  if (m !== null) {
    return toIana(m[1]);
  } // 'utc+5'


  m = tz.match(utcOffset);

  if (m !== null) {
    return toIana(m[1]);
  } // 'GMT-5' (not opposite)


  m = tz.match(gmtOffset);

  if (m !== null) {
    var num = Number(m[1]) * -1;
    return toIana(num);
  } // '+5'


  m = tz.match(isNumber);

  if (m !== null) {
    return toIana(m[1]);
  }

  return null;
};

var parseOffset_1 = parseOffset;
var local = guessTz_1(); //add all the city names by themselves

var cities = Object.keys(unpack).reduce(function (h, k) {
  var city = k.split('/')[1] || '';
  city = city.replace(/_/g, ' ');
  h[city] = k;
  return h;
}, {}); //try to match these against iana form

var normalize = function normalize(tz) {
  tz = tz.replace(/ time/g, '');
  tz = tz.replace(/ (standard|daylight|summer)/g, '');
  tz = tz.replace(/\b(east|west|north|south)ern/g, '$1');
  tz = tz.replace(/\b(africa|america|australia)n/g, '$1');
  tz = tz.replace(/\beuropean/g, 'europe');
  tz = tz.replace(/\islands/g, 'island');
  return tz;
}; // try our best to reconcile the timzone to this given string


var lookupTz = function lookupTz(str, zones) {
  if (!str) {
    return local;
  }

  var tz = str.trim();
  var split = str.split('/'); //support long timezones like 'America/Argentina/Rio_Gallegos'

  if (split.length > 2 && zones.hasOwnProperty(tz) === false) {
    tz = split[0] + '/' + split[1];
  }

  tz = tz.toLowerCase();

  if (zones.hasOwnProperty(tz) === true) {
    return tz;
  } //lookup more loosely..


  tz = normalize(tz);

  if (zones.hasOwnProperty(tz) === true) {
    return tz;
  } //try city-names


  if (cities.hasOwnProperty(tz) === true) {
    return cities[tz];
  } // //try to parse '-5h'


  if (/[0-9]/.test(tz) === true) {
    var id = parseOffset_1(tz);

    if (id) {
      return id;
    }
  }

  throw new Error("Spacetime: Cannot find timezone named: '" + str + "'. Please enter an IANA timezone id.");
};

var find = lookupTz;
var o = {
  millisecond: 1
};
o.second = 1000;
o.minute = 60000;
o.hour = 3.6e6; // dst is supported post-hoc

o.day = 8.64e7; //

o.date = o.day;
o.month = 8.64e7 * 29.5; //(average)

o.week = 6.048e8;
o.year = 3.154e10; // leap-years are supported post-hoc
//add plurals

Object.keys(o).forEach(function (k) {
  o[k + 's'] = o[k];
});
var milliseconds = o;

var walk = function walk(s, n, fn, unit, previous) {
  var current = s.d[fn]();

  if (current === n) {
    return; //already there
  }

  var startUnit = previous === null ? null : s.d[previous]();
  var original = s.epoch; //try to get it as close as we can

  var diff = n - current;
  s.epoch += milliseconds[unit] * diff; //DST edge-case: if we are going many days, be a little conservative
  // console.log(unit, diff)

  if (unit === 'day') {
    // s.epoch -= ms.minute
    //but don't push it over a month
    if (Math.abs(diff) > 28 && n < 28) {
      s.epoch += milliseconds.hour;
    }
  } // 1st time: oops, did we change previous unit? revert it.


  if (previous !== null && startUnit !== s.d[previous]()) {
    // console.warn('spacetime warning: missed setting ' + unit)
    s.epoch = original; // s.epoch += ms[unit] * diff * 0.89 // maybe try and make it close...?
  } //repair it if we've gone too far or something
  //(go by half-steps, just in case)


  var halfStep = milliseconds[unit] / 2;

  while (s.d[fn]() < n) {
    s.epoch += halfStep;
  }

  while (s.d[fn]() > n) {
    s.epoch -= halfStep;
  } // 2nd time: did we change previous unit? revert it.


  if (previous !== null && startUnit !== s.d[previous]()) {
    // console.warn('spacetime warning: missed setting ' + unit)
    s.epoch = original;
  }
}; //find the desired date by a increment/check while loop


var units = {
  year: {
    valid: function valid(n) {
      return n > -4000 && n < 4000;
    },
    walkTo: function walkTo(s, n) {
      return walk(s, n, 'getFullYear', 'year', null);
    }
  },
  month: {
    valid: function valid(n) {
      return n >= 0 && n <= 11;
    },
    walkTo: function walkTo(s, n) {
      var d = s.d;
      var current = d.getMonth();
      var original = s.epoch;
      var startUnit = d.getFullYear();

      if (current === n) {
        return;
      } //try to get it as close as we can..


      var diff = n - current;
      s.epoch += milliseconds.day * (diff * 28); //special case
      //oops, did we change the year? revert it.

      if (startUnit !== s.d.getFullYear()) {
        s.epoch = original;
      } //incriment by day


      while (s.d.getMonth() < n) {
        s.epoch += milliseconds.day;
      }

      while (s.d.getMonth() > n) {
        s.epoch -= milliseconds.day;
      }
    }
  },
  date: {
    valid: function valid(n) {
      return n > 0 && n <= 31;
    },
    walkTo: function walkTo(s, n) {
      return walk(s, n, 'getDate', 'day', 'getMonth');
    }
  },
  hour: {
    valid: function valid(n) {
      return n >= 0 && n < 24;
    },
    walkTo: function walkTo(s, n) {
      return walk(s, n, 'getHours', 'hour', 'getDate');
    }
  },
  minute: {
    valid: function valid(n) {
      return n >= 0 && n < 60;
    },
    walkTo: function walkTo(s, n) {
      return walk(s, n, 'getMinutes', 'minute', 'getHours');
    }
  },
  second: {
    valid: function valid(n) {
      return n >= 0 && n < 60;
    },
    walkTo: function walkTo(s, n) {
      //do this one directly
      s.epoch = s.seconds(n).epoch;
    }
  },
  millisecond: {
    valid: function valid(n) {
      return n >= 0 && n < 1000;
    },
    walkTo: function walkTo(s, n) {
      //do this one directly
      s.epoch = s.milliseconds(n).epoch;
    }
  }
};

var walkTo = function walkTo(s, wants) {
  var keys = Object.keys(units);
  var old = s.clone();

  for (var i = 0; i < keys.length; i++) {
    var k = keys[i];
    var n = wants[k];

    if (n === undefined) {
      n = old[k]();
    }

    if (typeof n === 'string') {
      n = parseInt(n, 10);
    } //make-sure it's valid


    if (!units[k].valid(n)) {
      s.epoch = null;

      if (s.silent === false) {
        console.warn('invalid ' + k + ': ' + n);
      }

      return;
    }

    units[k].walkTo(s, n);
  }

  return;
};

var walk_1 = walkTo;
var shortMonths = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sept', 'oct', 'nov', 'dec'];
var longMonths = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

function buildMapping() {
  var obj = {
    sep: 8 //support this format

  };

  for (var i = 0; i < shortMonths.length; i++) {
    obj[shortMonths[i]] = i;
  }

  for (var _i = 0; _i < longMonths.length; _i++) {
    obj[longMonths[_i]] = _i;
  }

  return obj;
}

var months = {
  "short": function _short() {
    return shortMonths;
  },
  "long": function _long() {
    return longMonths;
  },
  mapping: function mapping() {
    return buildMapping();
  },
  set: function set(i18n) {
    shortMonths = i18n["short"] || shortMonths;
    longMonths = i18n["long"] || longMonths;
  }
}; //pull-apart ISO offsets, like "+0100"

var parseOffset$1 = function parseOffset(s, offset) {
  if (!offset) {
    return s;
  } //this is a fancy-move


  if (offset === 'Z') {
    offset = '+0000';
  } // according to ISO8601, tz could be hh:mm, hhmm or hh
  // so need few more steps before the calculation.


  var num = 0; // for (+-)hh:mm

  if (/^[\+-]?[0-9]{2}:[0-9]{2}$/.test(offset)) {
    //support "+01:00"
    if (/:00/.test(offset) === true) {
      offset = offset.replace(/:00/, '');
    } //support "+01:30"


    if (/:30/.test(offset) === true) {
      offset = offset.replace(/:30/, '.5');
    }
  } // for (+-)hhmm


  if (/^[\+-]?[0-9]{4}$/.test(offset)) {
    offset = offset.replace(/30$/, '.5');
  }

  num = parseFloat(offset); //divide by 100 or 10 - , "+0100", "+01"

  if (Math.abs(num) > 100) {
    num = num / 100;
  } //okay, try to match it to a utc timezone
  //remember - this is opposite! a -5 offset maps to Etc/GMT+5  ¯\_(:/)_/¯
  //https://askubuntu.com/questions/519550/why-is-the-8-timezone-called-gmt-8-in-the-filesystem


  num *= -1;

  if (num >= 0) {
    num = '+' + num;
  }

  var tz = 'etc/gmt' + num;
  var zones = s.timezones;

  if (zones[tz]) {
    // log a warning if we're over-writing a given timezone?
    // console.log('changing timezone to: ' + tz)
    s.tz = tz;
  }

  return s;
};

var parseOffset_1$1 = parseOffset$1;

var parseTime = function parseTime(s) {
  var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  str = str.replace(/^\s+/, '').toLowerCase(); //trim
  //formal time formats - 04:30.23

  var arr = str.match(/([0-9]{1,2}):([0-9]{1,2}):?([0-9]{1,2})?[:\.]?([0-9]{1,4})?/);

  if (arr !== null) {
    //validate it a little
    var h = Number(arr[1]);

    if (h < 0 || h > 24) {
      return s.startOf('day');
    }

    var m = Number(arr[2]); //don't accept '5:3pm'

    if (arr[2].length < 2 || m < 0 || m > 59) {
      return s.startOf('day');
    }

    s = s.hour(h);
    s = s.minute(m);
    s = s.seconds(arr[3] || 0);
    s = s.millisecond(arr[4] || 0); //parse-out am/pm

    var ampm = str.match(/[\b0-9](am|pm)\b/);

    if (ampm !== null && ampm[1]) {
      s = s.ampm(ampm[1]);
    }

    return s;
  } //try an informal form - 5pm (no minutes)


  arr = str.match(/([0-9]+) ?(am|pm)/);

  if (arr !== null && arr[1]) {
    var _h = Number(arr[1]); //validate it a little..


    if (_h > 12 || _h < 1) {
      return s.startOf('day');
    }

    s = s.hour(arr[1] || 0);
    s = s.ampm(arr[2]);
    s = s.startOf('hour');
    return s;
  } //no time info found, use start-of-day


  s = s.startOf('day');
  return s;
};

var parseTime_1 = parseTime;
var monthLengths = [31, // January - 31 days
28, // February - 28 days in a common year and 29 days in leap years
31, // March - 31 days
30, // April - 30 days
31, // May - 31 days
30, // June - 30 days
31, // July - 31 days
31, // August - 31 days
30, // September - 30 days
31, // October - 31 days
30, // November - 30 days
31 // December - 31 days
];
var monthLengths_1 = monthLengths; // 28 - feb

var isLeapYear = fns.isLeapYear; //given a month, return whether day number exists in it

var hasDate = function hasDate(obj) {
  //invalid values
  if (monthLengths_1.hasOwnProperty(obj.month) !== true) {
    return false;
  } //support leap-year in february


  if (obj.month === 1) {
    if (isLeapYear(obj.year) && obj.date <= 29) {
      return true;
    } else {
      return obj.date <= 28;
    }
  } //is this date too-big for this month?


  var max = monthLengths_1[obj.month] || 0;

  if (obj.date <= max) {
    return true;
  }

  return false;
};

var hasDate_1 = hasDate;
var months$1 = months.mapping();

var parseYear = function parseYear() {
  var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var today = arguments.length > 1 ? arguments[1] : undefined;
  var year = parseInt(str.trim(), 10); // use a given year from options.today

  if (!year && today) {
    year = today.year;
  } // fallback to this year


  year = year || new Date().getFullYear();
  return year;
};

var strFmt = [//iso-this 1998-05-30T22:00:00:000Z, iso-that 2017-04-03T08:00:00-0700
{
  reg: /^(\-?0?0?[0-9]{3,4})-([0-9]{1,2})-([0-9]{1,2})[T| ]([0-9.:]+)(Z|[0-9\-\+:]+)?$/,
  parse: function parse(s, arr, givenTz, options) {
    var month = parseInt(arr[2], 10) - 1;
    var obj = {
      year: arr[1],
      month: month,
      date: arr[3]
    };

    if (hasDate_1(obj) === false) {
      s.epoch = null;
      return s;
    }

    parseOffset_1$1(s, arr[5]);
    walk_1(s, obj);
    s = parseTime_1(s, arr[4]);
    return s;
  }
}, //iso "2015-03-25" or "2015/03/25" or "2015/03/25 12:26:14 PM"
{
  reg: /^([0-9]{4})[\-\/]([0-9]{1,2})[\-\/]([0-9]{1,2}),?( [0-9]{1,2}:[0-9]{2}:?[0-9]{0,2}? ?(am|pm|gmt))?$/i,
  parse: function parse(s, arr) {
    var obj = {
      year: arr[1],
      month: parseInt(arr[2], 10) - 1,
      date: parseInt(arr[3], 10)
    };

    if (obj.month >= 12) {
      //support yyyy/dd/mm (weird, but ok)
      obj.date = parseInt(arr[2], 10);
      obj.month = parseInt(arr[3], 10) - 1;
    }

    if (hasDate_1(obj) === false) {
      s.epoch = null;
      return s;
    }

    walk_1(s, obj);
    s = parseTime_1(s, arr[4]);
    return s;
  }
}, //mm/dd/yyyy - uk/canada "6/28/2019, 12:26:14 PM"
{
  reg: /^([0-9]{1,2})[\-\/]([0-9]{1,2})[\-\/]?([0-9]{4})?,?( [0-9]{1,2}:[0-9]{2}:?[0-9]{0,2}? ?(am|pm|gmt))?$/i,
  parse: function parse(s, arr) {
    var month = parseInt(arr[1], 10) - 1;
    var date = parseInt(arr[2], 10); //support dd/mm/yyy

    if (s.british || month >= 12) {
      date = parseInt(arr[1], 10);
      month = parseInt(arr[2], 10) - 1;
    }

    var year = arr[3] || new Date().getFullYear();
    var obj = {
      year: year,
      month: month,
      date: date
    };

    if (hasDate_1(obj) === false) {
      s.epoch = null;
      return s;
    }

    walk_1(s, obj);
    s = parseTime_1(s, arr[4]);
    return s;
  }
}, //common british format - "25-feb-2015"
{
  reg: /^([0-9]{1,2})[\-\/]([a-z]+)[\-\/]?([0-9]{4})?$/i,
  parse: function parse(s, arr) {
    var month = months$1[arr[2].toLowerCase()];
    var year = parseYear(arr[3], s._today);
    var obj = {
      year: year,
      month: month,
      date: fns.toCardinal(arr[1] || '')
    };

    if (hasDate_1(obj) === false) {
      s.epoch = null;
      return s;
    }

    walk_1(s, obj);
    s = parseTime_1(s, arr[4]);
    return s;
  }
}, //Long "Mar 25 2015"
//February 22, 2017 15:30:00
{
  reg: /^([a-z]+) ([0-9]{1,2}(?:st|nd|rd|th)?),?( [0-9]{4})?( ([0-9:]+( ?am| ?pm| ?gmt)?))?$/i,
  parse: function parse(s, arr) {
    var month = months$1[arr[1].toLowerCase()];
    var year = parseYear(arr[3], s._today);
    var obj = {
      year: year,
      month: month,
      date: fns.toCardinal(arr[2] || '')
    };

    if (hasDate_1(obj) === false) {
      s.epoch = null;
      return s;
    }

    walk_1(s, obj);
    s = parseTime_1(s, arr[4]);
    return s;
  }
}, //February 2017 (implied date)
{
  reg: /^([a-z]+) ([0-9]{4})$/i,
  parse: function parse(s, arr) {
    var month = months$1[arr[1].toLowerCase()];
    var year = parseYear(arr[2], s._today);
    var obj = {
      year: year,
      month: month,
      date: s._today.date || 1
    };

    if (hasDate_1(obj) === false) {
      s.epoch = null;
      return s;
    }

    walk_1(s, obj);
    s = parseTime_1(s, arr[4]);
    return s;
  }
}, //Long "25 Mar 2015"
{
  reg: /^([0-9]{1,2}(?:st|nd|rd|th)?) ([a-z]+),?( [0-9]{4})?,? ?([0-9]{1,2}:[0-9]{2}:?[0-9]{0,2}? ?(am|pm|gmt))?$/i,
  parse: function parse(s, arr) {
    var month = months$1[arr[2].toLowerCase()];

    if (!month) {
      return null;
    }

    var year = parseYear(arr[3], s._today);
    var obj = {
      year: year,
      month: month,
      date: fns.toCardinal(arr[1])
    };

    if (hasDate_1(obj) === false) {
      s.epoch = null;
      return s;
    }

    walk_1(s, obj);
    s = parseTime_1(s, arr[4]);
    return s;
  }
}, {
  // '200bc'
  reg: /^[0-9,]+ ?b\.?c\.?$/i,
  parse: function parse(s, arr) {
    var str = arr[0] || ''; //make negative-year

    str = str.replace(/^([0-9,]+) ?b\.?c\.?$/i, '-$1'); //remove commas

    str = str.replace(/,/g, '');
    var year = parseInt(str.trim(), 10);
    var d = new Date();
    var obj = {
      year: year,
      month: d.getMonth(),
      date: d.getDate()
    };

    if (hasDate_1(obj) === false) {
      s.epoch = null;
      return s;
    }

    walk_1(s, obj);
    s = parseTime_1(s);
    return s;
  }
}, {
  // '200ad'
  reg: /^[0-9,]+ ?(a\.?d\.?|c\.?e\.?)$/i,
  parse: function parse(s, arr) {
    var str = arr[0] || ''; //remove commas

    str = str.replace(/,/g, '');
    var year = parseInt(str.trim(), 10);
    var d = new Date();
    var obj = {
      year: year,
      month: d.getMonth(),
      date: d.getDate()
    };

    if (hasDate_1(obj) === false) {
      s.epoch = null;
      return s;
    }

    walk_1(s, obj);
    s = parseTime_1(s);
    return s;
  }
}, {
  // '1992'
  reg: /^[0-9]{4}( ?a\.?d\.?)?$/i,
  parse: function parse(s, arr) {
    var today = s._today;
    var year = parseYear(arr[0], today);
    var d = new Date(); // using today's date, but a new month is awkward.

    if (today.month && !today.date) {
      today.date = 1;
    }

    var obj = {
      year: year,
      month: today.month || d.getMonth(),
      date: today.date || d.getDate()
    };

    if (hasDate_1(obj) === false) {
      s.epoch = null;
      return s;
    }

    walk_1(s, obj);
    s = parseTime_1(s);
    return s;
  }
}];
var strParse = strFmt; // pull in 'today' data for the baseline moment

var getNow = function getNow(s) {
  s.epoch = Date.now();
  Object.keys(s._today || {}).forEach(function (k) {
    if (typeof s[k] === 'function') {
      s = s[k](s._today[k]);
    }
  });
  return s;
};

var dates = {
  now: function now(s) {
    return getNow(s);
  },
  today: function today(s) {
    return getNow(s);
  },
  tonight: function tonight(s) {
    s = getNow(s);
    s = s.hour(18); //6pm

    return s;
  },
  tomorrow: function tomorrow(s) {
    s = getNow(s);
    s = s.add(1, 'day');
    s = s.startOf('day');
    return s;
  },
  yesterday: function yesterday(s) {
    s = getNow(s);
    s = s.subtract(1, 'day');
    s = s.startOf('day');
    return s;
  },
  christmas: function christmas(s) {
    var year = getNow(s).year();
    s = s.set([year, 11, 25, 18, 0, 0]); // Dec 25

    return s;
  },
  'new years': function newYears(s) {
    var year = getNow(s).year();
    s = s.set([year, 11, 31, 18, 0, 0]); // Dec 31

    return s;
  }
};
dates['new years eve'] = dates['new years'];
var namedDates = dates; //  -  can't use built-in js parser ;(
//=========================================
// ISO Date	  "2015-03-25"
// Short Date	"03/25/2015" or "2015/03/25"
// Long Date	"Mar 25 2015" or "25 Mar 2015"
// Full Date	"Wednesday March 25 2015"
//=========================================
//-- also -
// if the given epoch is really small, they've probably given seconds and not milliseconds
// anything below this number is likely (but not necessarily) a mistaken input.
// this may seem like an arbitrary number, but it's 'within jan 1970'
// this is only really ambiguous until 2054 or so

var minimumEpoch = 2500000000;
var defaults = {
  year: new Date().getFullYear(),
  month: 0,
  date: 1
}; //support [2016, 03, 01] format

var handleArray = function handleArray(s, arr, today) {
  var order = ['year', 'month', 'date', 'hour', 'minute', 'second', 'millisecond'];

  for (var i = 0; i < order.length; i++) {
    var num = arr[i] || today[order[i]] || defaults[order[i]] || 0;
    s = s[order[i]](num);
  }

  return s;
}; //support {year:2016, month:3} format


var handleObject = function handleObject(s, obj, today) {
  obj = Object.assign({}, defaults, today, obj);
  var keys = Object.keys(obj);

  for (var i = 0; i < keys.length; i++) {
    var unit = keys[i]; //make sure we have this method

    if (s[unit] === undefined || typeof s[unit] !== 'function') {
      continue;
    } //make sure the value is a number


    if (obj[unit] === null || obj[unit] === undefined || obj[unit] === '') {
      continue;
    }

    var num = obj[unit] || today[unit] || defaults[unit] || 0;
    s = s[unit](num);
  }

  return s;
}; //find the epoch from different input styles


var parseInput = function parseInput(s, input, givenTz) {
  var today = s._today || defaults; //if we've been given a epoch number, it's easy

  if (typeof input === 'number') {
    if (input > 0 && input < minimumEpoch && s.silent === false) {
      console.warn('  - Warning: You are setting the date to January 1970.');
      console.warn('       -   did input seconds instead of milliseconds?');
    }

    s.epoch = input;
    return s;
  } //set tmp time


  s.epoch = Date.now(); // overwrite tmp time with 'today' value, if exists

  if (s._today && fns.isObject(s._today) && Object.keys(s._today).length > 0) {
    var res = handleObject(s, today, defaults);

    if (res.isValid()) {
      s.epoch = res.epoch;
    }
  } // null input means 'now'


  if (input === null || input === undefined || input === '') {
    return s; //k, we're good.
  } //support input of Date() object


  if (fns.isDate(input) === true) {
    s.epoch = input.getTime();
    return s;
  } //support [2016, 03, 01] format


  if (fns.isArray(input) === true) {
    s = handleArray(s, input, today);
    return s;
  } //support {year:2016, month:3} format


  if (fns.isObject(input) === true) {
    //support spacetime object as input
    if (input.epoch) {
      s.epoch = input.epoch;
      s.tz = input.tz;
      return s;
    }

    s = handleObject(s, input, today);
    return s;
  } //input as a string..


  if (typeof input !== 'string') {
    return s;
  } //little cleanup..


  input = input.replace(/\b(mon|tues|wed|wednes|thu|thurs|fri|sat|satur|sun)(day)?\b/i, '');
  input = input.replace(/,/g, '');
  input = input.replace(/ +/g, ' ').trim(); //try some known-words, like 'now'

  if (namedDates.hasOwnProperty(input) === true) {
    s = namedDates[input](s);
    return s;
  } //try each text-parse template, use the first good result


  for (var i = 0; i < strParse.length; i++) {
    var m = input.match(strParse[i].reg);

    if (m) {
      var _res = strParse[i].parse(s, m, givenTz);

      if (_res !== null) {
        return _res;
      }
    }
  }

  if (s.silent === false) {
    console.warn("Warning: couldn't parse date-string: '" + input + "'");
  }

  s.epoch = null;
  return s;
};

var input = parseInput;
var shortDays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
var longDays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
var days = {
  "short": function _short2() {
    return shortDays;
  },
  "long": function _long2() {
    return longDays;
  },
  set: function set(i18n) {
    shortDays = i18n["short"] || shortDays;
    longDays = i18n["long"] || longDays;
  }
}; // it's kind of nuts how involved this is
// "+01:00", "+0100", or simply "+01"

var isoOffset = function isoOffset(s) {
  var offset = s.timezone().current.offset;
  var isNegative = offset < 0;
  var minute = '00'; //handle 5.5 → '5:30'

  if (Math.abs(offset % 1) === 0.5) {
    minute = '30';

    if (offset >= 0) {
      offset = Math.floor(offset);
    } else {
      offset = Math.ceil(offset);
    }
  }

  if (isNegative) {
    //handle negative sign
    offset *= -1;
    offset = fns.zeroPad(offset, 2);
    offset = '-' + offset;
  } else {
    offset = fns.zeroPad(offset, 2);
    offset = '+' + offset;
  }

  offset = offset + ':' + minute; //'Z' means 00

  if (offset === '+00:00') {
    offset = 'Z';
  }

  return offset;
};

var _offset = isoOffset;
var format = {
  day: function day(s) {
    return fns.titleCase(s.dayName());
  },
  'day-short': function dayShort(s) {
    return fns.titleCase(days["short"]()[s.day()]);
  },
  'day-number': function dayNumber(s) {
    return s.day();
  },
  'day-ordinal': function dayOrdinal(s) {
    return fns.ordinal(s.day());
  },
  'day-pad': function dayPad(s) {
    return fns.zeroPad(s.day());
  },
  date: function date(s) {
    return s.date();
  },
  'date-ordinal': function dateOrdinal(s) {
    return fns.ordinal(s.date());
  },
  'date-pad': function datePad(s) {
    return fns.zeroPad(s.date());
  },
  month: function month(s) {
    return fns.titleCase(s.monthName());
  },
  'month-short': function monthShort(s) {
    return fns.titleCase(months["short"]()[s.month()]);
  },
  'month-number': function monthNumber(s) {
    return s.month();
  },
  'month-ordinal': function monthOrdinal(s) {
    return fns.ordinal(s.month());
  },
  'month-pad': function monthPad(s) {
    return fns.zeroPad(s.month());
  },
  'iso-month': function isoMonth(s) {
    return fns.zeroPad(s.month() + 1);
  },
  //1-based months
  year: function year(s) {
    var year = s.year();

    if (year > 0) {
      return year;
    }

    year = Math.abs(year);
    return year + ' BC';
  },
  'year-short': function yearShort(s) {
    var year = s.year();

    if (year > 0) {
      return "'".concat(String(s.year()).substr(2, 4));
    }

    year = Math.abs(year);
    return year + ' BC';
  },
  'iso-year': function isoYear(s) {
    var year = s.year();
    var isNegative = year < 0;
    var str = fns.zeroPad(Math.abs(year), 4); //0-padded

    if (isNegative) {
      //negative years are for some reason 6-digits ('-00008')
      str = fns.zeroPad(str, 6);
      str = '-' + str;
    }

    return str;
  },
  time: function time(s) {
    return s.time();
  },
  'time-24': function time24(s) {
    return "".concat(s.hour24(), ":").concat(fns.zeroPad(s.minute()));
  },
  hour: function hour(s) {
    return s.hour12();
  },
  'hour-pad': function hourPad(s) {
    return fns.zeroPad(s.hour12());
  },
  'hour-24': function hour24(s) {
    return s.hour24();
  },
  'hour-24-pad': function hour24Pad(s) {
    return fns.zeroPad(s.hour24());
  },
  minute: function minute(s) {
    return s.minute();
  },
  'minute-pad': function minutePad(s) {
    return fns.zeroPad(s.minute());
  },
  second: function second(s) {
    return s.second();
  },
  'second-pad': function secondPad(s) {
    return fns.zeroPad(s.second());
  },
  ampm: function ampm(s) {
    return s.ampm();
  },
  quarter: function quarter(s) {
    return 'Q' + s.quarter();
  },
  season: function season(s) {
    return s.season();
  },
  era: function era(s) {
    return s.era();
  },
  json: function json(s) {
    return s.json();
  },
  timezone: function timezone(s) {
    return s.timezone().name;
  },
  offset: function offset(s) {
    return _offset(s);
  },
  numeric: function numeric(s) {
    return "".concat(s.year(), "/").concat(fns.zeroPad(s.month() + 1), "/").concat(fns.zeroPad(s.date()));
  },
  // yyyy/mm/dd
  'numeric-us': function numericUs(s) {
    return "".concat(fns.zeroPad(s.month() + 1), "/").concat(fns.zeroPad(s.date()), "/").concat(s.year());
  },
  // mm/dd/yyyy
  'numeric-uk': function numericUk(s) {
    return "".concat(fns.zeroPad(s.date()), "/").concat(fns.zeroPad(s.month() + 1), "/").concat(s.year());
  },
  //dd/mm/yyyy
  'mm/dd': function mmDd(s) {
    return "".concat(fns.zeroPad(s.month() + 1), "/").concat(fns.zeroPad(s.date()));
  },
  //mm/dd
  // ... https://en.wikipedia.org/wiki/ISO_8601 ;(((
  iso: function iso(s) {
    var year = s.format('iso-year');
    var month = fns.zeroPad(s.month() + 1); //1-based months

    var date = fns.zeroPad(s.date());
    var hour = fns.zeroPad(s.h24());
    var minute = fns.zeroPad(s.minute());
    var second = fns.zeroPad(s.second());
    var ms = fns.zeroPad(s.millisecond(), 3);

    var offset = _offset(s);

    return "".concat(year, "-").concat(month, "-").concat(date, "T").concat(hour, ":").concat(minute, ":").concat(second, ".").concat(ms).concat(offset); //2018-03-09T08:50:00.000-05:00
  },
  'iso-short': function isoShort(s) {
    var month = fns.zeroPad(s.month() + 1); //1-based months

    var date = fns.zeroPad(s.date());
    return "".concat(s.year(), "-").concat(month, "-").concat(date); //2017-02-15
  },
  'iso-utc': function isoUtc(s) {
    return new Date(s.epoch).toISOString(); //2017-03-08T19:45:28.367Z
  },
  //i made these up
  nice: function nice(s) {
    return "".concat(months["short"]()[s.month()], " ").concat(fns.ordinal(s.date()), ", ").concat(s.time());
  },
  'nice-year': function niceYear(s) {
    return "".concat(months["short"]()[s.month()], " ").concat(fns.ordinal(s.date()), ", ").concat(s.year());
  },
  'nice-day': function niceDay(s) {
    return "".concat(days["short"]()[s.day()], " ").concat(fns.titleCase(months["short"]()[s.month()]), " ").concat(fns.ordinal(s.date()));
  },
  'nice-full': function niceFull(s) {
    return "".concat(s.dayName(), " ").concat(fns.titleCase(s.monthName()), " ").concat(fns.ordinal(s.date()), ", ").concat(s.time());
  }
}; //aliases

var aliases = {
  'day-name': 'day',
  'month-name': 'month',
  'iso 8601': 'iso',
  'time-h24': 'time-24',
  'time-12': 'time',
  'time-h12': 'time',
  tz: 'timezone',
  'day-num': 'day-number',
  'month-num': 'month-number',
  'month-iso': 'iso-month',
  'year-iso': 'iso-year',
  'nice-short': 'nice',
  mdy: 'numeric-us',
  dmy: 'numeric-uk',
  ymd: 'numeric',
  'yyyy/mm/dd': 'numeric',
  'mm/dd/yyyy': 'numeric-us',
  'dd/mm/yyyy': 'numeric-us',
  'little-endian': 'numeric-uk',
  'big-endian': 'numeric',
  'day-nice': 'nice-day'
};
Object.keys(aliases).forEach(function (k) {
  return format[k] = format[aliases[k]];
});

var printFormat = function printFormat(s) {
  var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ''; //don't print anything if it's an invalid date

  if (s.isValid() !== true) {
    return '';
  } //support .format('month')


  if (format.hasOwnProperty(str)) {
    var out = format[str](s) || '';

    if (str !== 'json') {
      out = String(out);

      if (str !== 'ampm') {
        out = fns.titleCase(out);
      }
    }

    return out;
  } //support '{hour}:{minute}' notation


  if (str.indexOf('{') !== -1) {
    var sections = /\{(.+?)\}/g;
    str = str.replace(sections, function (_, fmt) {
      fmt = fmt.toLowerCase().trim();

      if (format.hasOwnProperty(fmt)) {
        return String(format[fmt](s));
      }

      return '';
    });
    return str;
  }

  return s.format('iso-short');
};

var format_1 = printFormat;
var pad = fns.zeroPad;
var formatTimezone = fns.formatTimezone; //parse this insane unix-time-templating thing, from the 19th century
//http://unicode.org/reports/tr35/tr35-25.html#Date_Format_Patterns
//time-symbols we support

var mapping = {
  G: function G(s) {
    return s.era();
  },
  GG: function GG(s) {
    return s.era();
  },
  GGG: function GGG(s) {
    return s.era();
  },
  GGGG: function GGGG(s) {
    return s.era() === 'AD' ? 'Anno Domini' : 'Before Christ';
  },
  //year
  y: function y(s) {
    return s.year();
  },
  yy: function yy(s) {
    //last two chars
    return parseInt(String(s.year()).substr(2, 4), 10);
  },
  yyy: function yyy(s) {
    return s.year();
  },
  yyyy: function yyyy(s) {
    return s.year();
  },
  yyyyy: function yyyyy(s) {
    return '0' + s.year();
  },
  // u: (s) => {},//extended non-gregorian years
  //quarter
  Q: function Q(s) {
    return s.quarter();
  },
  QQ: function QQ(s) {
    return s.quarter();
  },
  QQQ: function QQQ(s) {
    return s.quarter();
  },
  QQQQ: function QQQQ(s) {
    return s.quarter();
  },
  //month
  M: function M(s) {
    return s.month() + 1;
  },
  MM: function MM(s) {
    return pad(s.month() + 1);
  },
  MMM: function MMM(s) {
    return s.format('month-short');
  },
  MMMM: function MMMM(s) {
    return s.format('month');
  },
  //week
  w: function w(s) {
    return s.week();
  },
  ww: function ww(s) {
    return pad(s.week());
  },
  //week of month
  // W: (s) => s.week(),
  //date of month
  d: function d(s) {
    return s.date();
  },
  dd: function dd(s) {
    return pad(s.date());
  },
  //date of year
  D: function D(s) {
    return s.dayOfYear();
  },
  DD: function DD(s) {
    return pad(s.dayOfYear());
  },
  DDD: function DDD(s) {
    return pad(s.dayOfYear(), 3);
  },
  // F: (s) => {},//date of week in month
  // g: (s) => {},//modified julian day
  //day
  E: function E(s) {
    return s.format('day-short');
  },
  EE: function EE(s) {
    return s.format('day-short');
  },
  EEE: function EEE(s) {
    return s.format('day-short');
  },
  EEEE: function EEEE(s) {
    return s.format('day');
  },
  EEEEE: function EEEEE(s) {
    return s.format('day')[0];
  },
  e: function e(s) {
    return s.day();
  },
  ee: function ee(s) {
    return s.day();
  },
  eee: function eee(s) {
    return s.format('day-short');
  },
  eeee: function eeee(s) {
    return s.format('day');
  },
  eeeee: function eeeee(s) {
    return s.format('day')[0];
  },
  //am/pm
  a: function a(s) {
    return s.ampm().toUpperCase();
  },
  aa: function aa(s) {
    return s.ampm().toUpperCase();
  },
  aaa: function aaa(s) {
    return s.ampm().toUpperCase();
  },
  aaaa: function aaaa(s) {
    return s.ampm().toUpperCase();
  },
  //hour
  h: function h(s) {
    return s.h12();
  },
  hh: function hh(s) {
    return pad(s.h12());
  },
  H: function H(s) {
    return s.hour();
  },
  HH: function HH(s) {
    return pad(s.hour());
  },
  // j: (s) => {},//weird hour format
  m: function m(s) {
    return s.minute();
  },
  mm: function mm(s) {
    return pad(s.minute());
  },
  s: function s(_s) {
    return _s.second();
  },
  ss: function ss(s) {
    return pad(s.second());
  },
  //milliseconds in the day
  A: function A(s) {
    return s.epoch - s.startOf('day').epoch;
  },
  //timezone
  z: function z(s) {
    return s.timezone().name;
  },
  zz: function zz(s) {
    return s.timezone().name;
  },
  zzz: function zzz(s) {
    return s.timezone().name;
  },
  zzzz: function zzzz(s) {
    return s.timezone().name;
  },
  Z: function Z(s) {
    return formatTimezone(s.timezone().current.offset);
  },
  ZZ: function ZZ(s) {
    return formatTimezone(s.timezone().current.offset);
  },
  ZZZ: function ZZZ(s) {
    return formatTimezone(s.timezone().current.offset);
  },
  ZZZZ: function ZZZZ(s) {
    return formatTimezone(s.timezone().current.offset, ':');
  }
};

var addAlias = function addAlias(_char, to, n) {
  var name = _char;
  var toName = to;

  for (var i = 0; i < n; i += 1) {
    mapping[name] = mapping[toName];
    name += _char;
    toName += to;
  }
};

addAlias('q', 'Q', 4);
addAlias('L', 'M', 4);
addAlias('Y', 'y', 4);
addAlias('c', 'e', 4);
addAlias('k', 'H', 2);
addAlias('K', 'h', 2);
addAlias('S', 's', 2);
addAlias('v', 'z', 4);
addAlias('V', 'Z', 4);

var unixFmt = function unixFmt(s, str) {
  var chars = str.split(''); //combine consecutive chars, like 'yyyy' as one.

  var arr = [chars[0]];
  var quoteOn = false;

  for (var i = 1; i < chars.length; i += 1) {
    //support quoted substrings
    if (chars[i] === "'") {
      quoteOn = !quoteOn; //support '', meaning one tick

      if (quoteOn === true && chars[i + 1] && chars[i + 1] === "'") {
        quoteOn = true;
      } else {
        continue;
      }
    } //merge it with the last one


    if (quoteOn === true || chars[i] === arr[arr.length - 1][0]) {
      arr[arr.length - 1] += chars[i];
    } else {
      arr.push(chars[i]);
    }
  }

  return arr.reduce(function (txt, c) {
    if (mapping[c] !== undefined) {
      txt += mapping[c](s) || '';
    } else {
      txt += c;
    }

    return txt;
  }, '');
};

var unixFmt_1 = unixFmt;
var units$1 = ['year', 'season', 'quarter', 'month', 'week', 'day', 'quarterHour', 'hour', 'minute'];

var doUnit = function doUnit(s, k) {
  var start = s.clone().startOf(k);
  var end = s.clone().endOf(k);
  var duration = end.epoch - start.epoch;
  var percent = (s.epoch - start.epoch) / duration;
  return parseFloat(percent.toFixed(2));
}; //how far it is along, from 0-1


var progress = function progress(s, unit) {
  if (unit) {
    unit = fns.normalize(unit);
    return doUnit(s, unit);
  }

  var obj = {};
  units$1.forEach(function (k) {
    obj[k] = doUnit(s, k);
  });
  return obj;
};

var progress_1 = progress;

var nearest = function nearest(s, unit) {
  //how far have we gone?
  var prog = s.progress();
  unit = fns.normalize(unit); //fix camel-case for this one

  if (unit === 'quarterhour') {
    unit = 'quarterHour';
  }

  if (prog[unit] !== undefined) {
    // go forward one?
    if (prog[unit] > 0.5) {
      s = s.add(1, unit);
    } // go to start


    s = s.startOf(unit);
  } else if (s.silent === false) {
    console.warn("no known unit '" + unit + "'");
  }

  return s;
};

var nearest_1 = nearest; //increment until dates are the same

var climb = function climb(a, b, unit) {
  var i = 0;
  a = a.clone();

  while (a.isBefore(b)) {
    //do proper, expensive increment to catch all-the-tricks
    a = a.add(1, unit);
    i += 1;
  } //oops, we went too-far..


  if (a.isAfter(b, unit)) {
    i -= 1;
  }

  return i;
}; // do a thurough +=1 on the unit, until they match
// for speed-reasons, only used on day, month, week.


var diffOne = function diffOne(a, b, unit) {
  if (a.isBefore(b)) {
    return climb(a, b, unit);
  } else {
    return climb(b, a, unit) * -1; //reverse it
  }
};

var one = diffOne; // 2020 - 2019 may be 1 year, or 0 years
// - '1 year difference' means 366 days during a leap year

var fastYear = function fastYear(a, b) {
  var years = b.year() - a.year(); // should we decrement it by 1?

  a = a.year(b.year());

  if (a.isAfter(b)) {
    years -= 1;
  }

  return years;
}; // use a waterfall-method for computing a diff of any 'pre-knowable' units
// compute years, then compute months, etc..
// ... then ms-math for any very-small units


var diff = function diff(a, b) {
  // an hour is always the same # of milliseconds
  // so these units can be 'pre-calculated'
  var msDiff = b.epoch - a.epoch;
  var obj = {
    milliseconds: msDiff,
    seconds: parseInt(msDiff / 1000, 10)
  };
  obj.minutes = parseInt(obj.seconds / 60, 10);
  obj.hours = parseInt(obj.minutes / 60, 10); //do the year

  var tmp = a.clone();
  obj.years = fastYear(tmp, b);
  tmp = a.add(obj.years, 'year'); //there's always 12 months in a year...

  obj.months = obj.years * 12;
  tmp = a.add(obj.months, 'month');
  obj.months += one(tmp, b, 'month'); // there's always atleast 52 weeks in a year..
  // (month * 4) isn't as close

  obj.weeks = obj.years * 52;
  tmp = a.add(obj.weeks, 'week');
  obj.weeks += one(tmp, b, 'week'); // there's always atleast 7 days in a week

  obj.days = obj.weeks * 7;
  tmp = a.add(obj.days, 'day');
  obj.days += one(tmp, b, 'day');
  return obj;
};

var waterfall = diff;

var reverseDiff = function reverseDiff(obj) {
  Object.keys(obj).forEach(function (k) {
    obj[k] *= -1;
  });
  return obj;
}; // this method counts a total # of each unit, between a, b.
// '1 month' means 28 days in february
// '1 year' means 366 days in a leap year


var main = function main(a, b, unit) {
  b = fns.beADate(b, a); //reverse values, if necessary

  var reversed = false;

  if (a.isAfter(b)) {
    var tmp = a;
    a = b;
    b = tmp;
    reversed = true;
  } //compute them all (i know!)


  var obj = waterfall(a, b);

  if (reversed) {
    obj = reverseDiff(obj);
  } //return just the requested unit


  if (unit) {
    //make sure it's plural-form
    unit = fns.normalize(unit);

    if (/s$/.test(unit) !== true) {
      unit += 's';
    }

    if (unit === 'dates') {
      unit = 'days';
    }

    return obj[unit];
  }

  return obj;
};

var diff$1 = main; //our conceptual 'break-points' for each unit

var qualifiers = {
  months: {
    almost: 10,
    over: 4
  },
  days: {
    almost: 25,
    over: 10
  },
  hours: {
    almost: 20,
    over: 8
  },
  minutes: {
    almost: 50,
    over: 20
  },
  seconds: {
    almost: 50,
    over: 20
  }
}; //get number of hours/minutes... between the two dates

function getDiff(a, b) {
  var isBefore = a.isBefore(b);
  var later = isBefore ? b : a;
  var earlier = isBefore ? a : b;
  earlier = earlier.clone();
  var diff = {
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  };
  Object.keys(diff).forEach(function (unit) {
    if (earlier.isSame(later, unit)) {
      return;
    }

    var max = earlier.diff(later, unit);
    earlier = earlier.add(max, unit);
    diff[unit] = max;
  }); //reverse it, if necessary

  if (isBefore) {
    Object.keys(diff).forEach(function (u) {
      if (diff[u] !== 0) {
        diff[u] *= -1;
      }
    });
  }

  return diff;
} // Expects a plural unit arg


function pluralize(value, unit) {
  if (value === 1) {
    unit = unit.slice(0, -1);
  }

  return value + ' ' + unit;
} //create the human-readable diff between the two dates


var since = function since(start, end) {
  end = fns.beADate(end, start);
  var diff = getDiff(start, end);
  var isNow = Object.keys(diff).every(function (u) {
    return !diff[u];
  });

  if (isNow === true) {
    return {
      diff: diff,
      rounded: 'now',
      qualified: 'now',
      precise: 'now'
    };
  }

  var rounded;
  var qualified;
  var precise;
  var englishValues = []; //go through each value and create its text-representation

  Object.keys(diff).forEach(function (unit, i, units) {
    var value = Math.abs(diff[unit]);

    if (value === 0) {
      return;
    }

    var englishValue = pluralize(value, unit);
    englishValues.push(englishValue);

    if (!rounded) {
      rounded = qualified = englishValue;

      if (i > 4) {
        return;
      } //is it a 'almost' something, etc?


      var nextUnit = units[i + 1];
      var nextValue = Math.abs(diff[nextUnit]);

      if (nextValue > qualifiers[nextUnit].almost) {
        rounded = pluralize(value + 1, unit);
        qualified = 'almost ' + rounded;
      } else if (nextValue > qualifiers[nextUnit].over) qualified = 'over ' + englishValue;
    }
  }); //make them into a string

  precise = englishValues.splice(0, 2).join(', '); //handle before/after logic

  if (start.isAfter(end) === true) {
    rounded += ' ago';
    qualified += ' ago';
    precise += ' ago';
  } else {
    rounded = 'in ' + rounded;
    qualified = 'in ' + qualified;
    precise = 'in ' + precise;
  }

  return {
    diff: diff,
    rounded: rounded,
    qualified: qualified,
    precise: precise
  };
};

var since_1 = since; //https://www.timeanddate.com/calendar/aboutseasons.html
// Spring - from March 1 to May 31;
// Summer - from June 1 to August 31;
// Fall (autumn) - from September 1 to November 30; and,
// Winter - from December 1 to February 28 (February 29 in a leap year).

var seasons$1 = {
  north: [['spring', 2, 1], //spring march 1
  ['summer', 5, 1], //june 1
  ['fall', 8, 1], //sept 1
  ['autumn', 8, 1], //sept 1
  ['winter', 11, 1] //dec 1
  ],
  south: [['fall', 2, 1], //march 1
  ['autumn', 2, 1], //march 1
  ['winter', 5, 1], //june 1
  ['spring', 8, 1], //sept 1
  ['summer', 11, 1] //dec 1
  ]
};
var quarters = [null, [0, 1], //jan 1
[3, 1], //apr 1
[6, 1], //july 1
[9, 1] //oct 1
];
var units$2 = {
  minute: function minute(s) {
    walk_1(s, {
      second: 0,
      millisecond: 0
    });
    return s;
  },
  quarterhour: function quarterhour(s) {
    var minute = s.minutes();

    if (minute >= 45) {
      s = s.minutes(45);
    } else if (minute >= 30) {
      s = s.minutes(30);
    } else if (minute >= 15) {
      s = s.minutes(15);
    } else {
      s = s.minutes(0);
    }

    walk_1(s, {
      second: 0,
      millisecond: 0
    });
    return s;
  },
  hour: function hour(s) {
    walk_1(s, {
      minute: 0,
      second: 0,
      millisecond: 0
    });
    return s;
  },
  day: function day(s) {
    walk_1(s, {
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0
    });
    return s;
  },
  week: function week(s) {
    var original = s.clone();
    s = s.day(s._weekStart); //monday

    if (s.isAfter(original)) {
      s = s.subtract(1, 'week');
    }

    walk_1(s, {
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0
    });
    return s;
  },
  month: function month(s) {
    walk_1(s, {
      date: 1,
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0
    });
    return s;
  },
  quarter: function quarter(s) {
    var q = s.quarter();

    if (quarters[q]) {
      walk_1(s, {
        month: quarters[q][0],
        date: quarters[q][1],
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0
      });
    }

    return s;
  },
  season: function season(s) {
    var current = s.season();
    var hem = 'north';

    if (s.hemisphere() === 'South') {
      hem = 'south';
    }

    for (var i = 0; i < seasons$1[hem].length; i++) {
      if (seasons$1[hem][i][0] === current) {
        //winter goes between years
        var year = s.year();

        if (current === 'winter' && s.month() < 3) {
          year -= 1;
        }

        walk_1(s, {
          year: year,
          month: seasons$1[hem][i][1],
          date: seasons$1[hem][i][2],
          hour: 0,
          minute: 0,
          second: 0,
          millisecond: 0
        });
        return s;
      }
    }

    return s;
  },
  year: function year(s) {
    walk_1(s, {
      month: 0,
      date: 1,
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0
    });
    return s;
  },
  decade: function decade(s) {
    s = s.startOf('year');
    var year = s.year();
    var decade = parseInt(year / 10, 10) * 10;
    s = s.year(decade);
    return s;
  },
  century: function century(s) {
    s = s.startOf('year');
    var year = s.year(); // near 0AD goes '-1 | +1'

    var decade = parseInt(year / 100, 10) * 100;
    s = s.year(decade);
    return s;
  }
};
units$2.date = units$2.day;

var startOf = function startOf(a, unit) {
  var s = a.clone();
  unit = fns.normalize(unit);

  if (units$2[unit]) {
    return units$2[unit](s);
  }

  if (unit === 'summer' || unit === 'winter') {
    s = s.season(unit);
    return units$2.season(s);
  }

  return s;
}; //piggy-backs off startOf


var endOf = function endOf(a, unit) {
  var s = a.clone();
  unit = fns.normalize(unit);

  if (units$2[unit]) {
    s = units$2[unit](s);
    s = s.add(1, unit);
    s = s.subtract(1, 'milliseconds');
    return s;
  }

  return s;
};

var startOf_1 = {
  startOf: startOf,
  endOf: endOf
};

var isDay = function isDay(unit) {
  if (days["short"]().find(function (s) {
    return s === unit;
  })) {
    return true;
  }

  if (days["long"]().find(function (s) {
    return s === unit;
  })) {
    return true;
  }

  return false;
}; // return a list of the weeks/months/days between a -> b
// returns spacetime objects in the timezone of the input


var every = function every(start) {
  var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var end = arguments.length > 2 ? arguments[2] : undefined;

  if (!unit || !end) {
    return [];
  } //cleanup unit param


  unit = fns.normalize(unit); //cleanup to param

  end = start.clone().set(end); //swap them, if they're backwards

  if (start.isAfter(end)) {
    var tmp = start;
    start = end;
    end = tmp;
  } //support 'every wednesday'


  var d = start.clone();

  if (isDay(unit)) {
    d = d.next(unit);
    unit = 'week';
  } else {
    d = d.next(unit);
  } //okay, actually start doing it


  var result = [];

  while (d.isBefore(end)) {
    result.push(d);
    d = d.add(1, unit);
  }

  return result;
};

var every_1 = every;

var parseDst = function parseDst(dst) {
  if (!dst) {
    return [];
  }

  return dst.split('->');
};

var titleCase = function titleCase(str) {
  str = str[0].toUpperCase() + str.substr(1);
  str = str.replace(/\/gmt/, '/GMT');
  str = str.replace(/[\/_]([a-z])/gi, function (s) {
    return s.toUpperCase();
  });
  return str;
}; //get metadata about this timezone


var timezone = function timezone(s) {
  var zones = s.timezones;
  var tz = s.tz;

  if (zones.hasOwnProperty(tz) === false) {
    tz = find(s.tz, zones);
  }

  if (tz === null) {
    if (s.silent === false) {
      console.warn("Warn: could not find given or local timezone - '" + s.tz + "'");
    }

    return {
      current: {
        epochShift: 0
      }
    };
  }

  var found = zones[tz];
  var result = {
    name: titleCase(tz),
    hasDst: Boolean(found.dst),
    default_offset: found.offset,
    //do north-hemisphere version as default (sorry!)
    hemisphere: found.hem === 's' ? 'South' : 'North',
    current: {}
  };

  if (result.hasDst) {
    var arr = parseDst(found.dst);
    result.change = {
      start: arr[0],
      back: arr[1]
    };
  } //find the offsets for summer/winter times
  //(these variable names are north-centric)


  var summer = found.offset; // (july)

  var winter = summer; // (january) assume it's the same for now

  if (result.hasDst === true) {
    if (result.hemisphere === 'North') {
      winter = summer - 1;
    } else {
      //southern hemisphere
      winter = found.offset + 1;
    }
  } //find out which offset to use right now
  //use 'summer' time july-time


  if (result.hasDst === false) {
    result.current.offset = summer;
    result.current.isDST = false;
  } else if (summerTime(s.epoch, result.change.start, result.change.back, summer) === true) {
    result.current.offset = summer;
    result.current.isDST = result.hemisphere === 'North'; //dst 'on' in winter in north
  } else {
    //use 'winter' january-time
    result.current.offset = winter;
    result.current.isDST = result.hemisphere === 'South'; //dst 'on' in summer in south
  }

  return result;
};

var timezone_1 = timezone;
var units$3 = ['century', 'decade', 'year', 'month', 'date', 'day', 'hour', 'minute', 'second', 'millisecond']; //the spacetime instance methods (also, the API)

var methods$1 = {
  set: function set(input$1, tz) {
    var s = this.clone();
    s = input(s, input$1, null);

    if (tz) {
      this.tz = find(tz);
    }

    return s;
  },
  timezone: function timezone() {
    return timezone_1(this);
  },
  isDST: function isDST() {
    return timezone_1(this).current.isDST;
  },
  hasDST: function hasDST() {
    return timezone_1(this).hasDst;
  },
  offset: function offset() {
    return timezone_1(this).current.offset * 60;
  },
  hemisphere: function hemisphere() {
    return timezone_1(this).hemisphere;
  },
  format: function format(fmt) {
    return format_1(this, fmt);
  },
  unixFmt: function unixFmt(fmt) {
    return unixFmt_1(this, fmt);
  },
  startOf: function startOf(unit) {
    return startOf_1.startOf(this, unit);
  },
  endOf: function endOf(unit) {
    return startOf_1.endOf(this, unit);
  },
  leapYear: function leapYear() {
    var year = this.year();
    return fns.isLeapYear(year);
  },
  progress: function progress(unit) {
    return progress_1(this, unit);
  },
  nearest: function nearest(unit) {
    return nearest_1(this, unit);
  },
  diff: function diff(d, unit) {
    return diff$1(this, d, unit);
  },
  since: function since(d) {
    if (!d) {
      d = this.clone().set();
    }

    return since_1(this, d);
  },
  next: function next(unit) {
    var s = this.add(1, unit);
    return s.startOf(unit);
  },
  //the start of the previous year/week/century
  last: function last(unit) {
    var s = this.subtract(1, unit);
    return s.startOf(unit);
  },
  isValid: function isValid() {
    //null/undefined epochs
    if (!this.epoch && this.epoch !== 0) {
      return false;
    }

    return !isNaN(this.d.getTime());
  },
  //travel to this timezone
  "goto": function _goto(tz) {
    var s = this.clone();
    s.tz = find(tz, s.timezones); //science!

    return s;
  },
  //get each week/month/day between a -> b
  every: function every(unit, to) {
    return every_1(this, unit, to);
  },
  isAwake: function isAwake() {
    var hour = this.hour(); //10pm -> 8am

    if (hour < 8 || hour > 22) {
      return false;
    }

    return true;
  },
  isAsleep: function isAsleep() {
    return !this.isAwake();
  },
  //pretty-printing
  log: function log() {
    console.log('');
    console.log(format_1(this, 'nice-short'));
    return this;
  },
  logYear: function logYear() {
    console.log('');
    console.log(format_1(this, 'full-short'));
    return this;
  },
  json: function json() {
    var _this = this;

    return units$3.reduce(function (h, unit) {
      h[unit] = _this[unit]();
      return h;
    }, {});
  },
  debug: function debug() {
    var tz = this.timezone();
    var date = this.format('MM') + ' ' + this.format('date-ordinal') + ' ' + this.year();
    date += '\n     - ' + this.format('time');
    console.log('\n\n', date + '\n     - ' + tz.name + ' (' + tz.current.offset + ')');
    return this;
  },
  //alias of 'since' but opposite - like moment.js
  from: function from(d) {
    d = this.clone().set(d);
    return d.since(this);
  },
  fromNow: function fromNow() {
    var d = this.clone().set(Date.now());
    return d.since(this);
  },
  weekStart: function weekStart(input) {
    //accept a number directly
    if (typeof input === 'number') {
      this._weekStart = input;
      return this;
    }

    if (typeof input === 'string') {
      // accept 'wednesday'
      input = input.toLowerCase().trim();
      var num = days["short"]().indexOf(input);

      if (num === -1) {
        num = days["long"]().indexOf(input);
      }

      if (num === -1) {
        num = 1; //go back to default
      }

      this._weekStart = num;
    } else {
      console.warn('Spacetime Error: Cannot understand .weekStart() input:', input);
    }

    return this;
  }
}; // aliases

methods$1.inDST = methods$1.isDST;
methods$1.round = methods$1.nearest;
methods$1.each = methods$1.every;
var methods_1 = methods$1; //these methods wrap around them.

var isLeapYear$1 = fns.isLeapYear;

var validate = function validate(n) {
  //handle number as a string
  if (typeof n === 'string') {
    n = parseInt(n, 10);
  }

  return n;
};

var order = ['year', 'month', 'date', 'hour', 'minute', 'second', 'millisecond']; //reduce hostile micro-changes when moving dates by millisecond

var confirm = function confirm(s, tmp, unit) {
  var n = order.indexOf(unit);
  var arr = order.slice(n, order.length);

  for (var i = 0; i < arr.length; i++) {
    var want = tmp[arr[i]]();
    s[arr[i]](want);
  }

  return s;
};

var set = {
  milliseconds: function milliseconds(s, n) {
    n = validate(n);
    var current = s.millisecond();
    var diff = current - n; //milliseconds to shift by

    return s.epoch - diff;
  },
  seconds: function seconds(s, n) {
    n = validate(n);
    var diff = s.second() - n;
    var shift = diff * milliseconds.second;
    return s.epoch - shift;
  },
  minutes: function minutes(s, n) {
    n = validate(n);
    var old = s.clone();
    var diff = s.minute() - n;
    var shift = diff * milliseconds.minute;
    s.epoch -= shift; // check against a screw-up
    // if (old.hour() != s.hour()) {
    //   walkTo(old, {
    //     minute: n
    //   })
    //   return old.epoch
    // }

    confirm(s, old, 'second');
    return s.epoch;
  },
  hours: function hours(s, n) {
    n = validate(n);

    if (n >= 24) {
      n = 24;
    } else if (n < 0) {
      n = 0;
    }

    var old = s.clone();
    var diff = s.hour() - n;
    var shift = diff * milliseconds.hour;
    s.epoch -= shift;
    walk_1(s, {
      hour: n
    });
    confirm(s, old, 'minute');
    return s.epoch;
  },
  //support setting time by '4:25pm' - this isn't very-well developed..
  time: function time(s, str) {
    var m = str.match(/([0-9]{1,2}):([0-9]{1,2})(am|pm)?/);

    if (!m) {
      //fallback to support just '2am'
      m = str.match(/([0-9]{1,2})(am|pm)/);

      if (!m) {
        return s.epoch;
      }

      m.splice(2, 0, '0'); //add implicit 0 minutes
    }

    var h24 = false;
    var hour = parseInt(m[1], 10);
    var minute = parseInt(m[2], 10);

    if (hour > 12) {
      h24 = true;
    } //make the hour into proper 24h time


    if (h24 === false) {
      if (m[3] === 'am' && hour === 12) {
        //12am is midnight
        hour = 0;
      }

      if (m[3] === 'pm' && hour < 12) {
        //12pm is noon
        hour += 12;
      }
    }

    s = s.hour(hour);
    s = s.minute(minute);
    s = s.second(0);
    s = s.millisecond(0);
    return s.epoch;
  },
  date: function date(s, n) {
    n = validate(n); //avoid setting february 31st

    if (n > 28) {
      var month = s.month();
      var max = monthLengths_1[month]; // support leap day in february

      if (month === 1 && n === 29 && isLeapYear$1(s.year())) {
        max = 29;
      }

      if (n > max) {
        n = max;
      }
    } //avoid setting < 0


    if (n <= 0) {
      n = 1;
    }

    walk_1(s, {
      date: n
    });
    return s.epoch;
  },
  //this one's tricky
  month: function month(s, n) {
    if (typeof n === 'string') {
      n = months.mapping()[n.toLowerCase()];
    }

    n = validate(n); //don't go past december

    if (n >= 12) {
      n = 11;
    }

    if (n <= 0) {
      n = 0;
    }

    var date = s.date(); //there's no 30th of february, etc.

    if (date > monthLengths_1[n]) {
      //make it as close as we can..
      date = monthLengths_1[n];
    }

    walk_1(s, {
      month: n,
      date: date
    });
    return s.epoch;
  },
  year: function year(s, n) {
    n = validate(n);
    walk_1(s, {
      year: n
    });
    return s.epoch;
  },
  dayOfYear: function dayOfYear(s, n) {
    n = validate(n);
    var old = s.clone();
    n -= 1; //days are 1-based

    if (n <= 0) {
      n = 0;
    } else if (n >= 365) {
      n = 364;
    }

    s = s.startOf('year');
    s = s.add(n, 'day');
    confirm(s, old, 'hour');
    return s.epoch;
  }
};
var methods$1$1 = {
  millisecond: function millisecond(num) {
    if (num !== undefined) {
      var s = this.clone();
      s.epoch = set.milliseconds(s, num);
      return s;
    }

    return this.d.getMilliseconds();
  },
  second: function second(num) {
    if (num !== undefined) {
      var s = this.clone();
      s.epoch = set.seconds(s, num);
      return s;
    }

    return this.d.getSeconds();
  },
  minute: function minute(num) {
    if (num !== undefined) {
      var s = this.clone();
      s.epoch = set.minutes(s, num);
      return s;
    }

    return this.d.getMinutes();
  },
  hour: function hour(num) {
    var d = this.d;

    if (num !== undefined) {
      var s = this.clone();
      s.epoch = set.hours(s, num);
      return s;
    }

    return d.getHours();
  },
  //'3:30' is 3.5
  hourFloat: function hourFloat(num) {
    if (num !== undefined) {
      var s = this.clone();

      var _minute = num % 1;

      _minute = _minute * 60;

      var _hour = parseInt(num, 10);

      s.epoch = set.hours(s, _hour);
      s.epoch = set.minutes(s, _minute);
      return s;
    }

    var d = this.d;
    var hour = d.getHours();
    var minute = d.getMinutes();
    minute = minute / 60;
    return hour + minute;
  },
  // hour in 12h format
  hour12: function hour12(str) {
    var d = this.d;

    if (str !== undefined) {
      var s = this.clone();
      str = '' + str;
      var m = str.match(/^([0-9]+)(am|pm)$/);

      if (m) {
        var hour = parseInt(m[1], 10);

        if (m[2] === 'pm') {
          hour += 12;
        }

        s.epoch = set.hours(s, hour);
      }

      return s;
    } //get the hour


    var hour12 = d.getHours();

    if (hour12 > 12) {
      hour12 = hour12 - 12;
    }

    if (hour12 === 0) {
      hour12 = 12;
    }

    return hour12;
  },
  //some ambiguity here with 12/24h
  time: function time(str) {
    if (str !== undefined) {
      var s = this.clone();
      s.epoch = set.time(s, str);
      return s;
    }

    return "".concat(this.h12(), ":").concat(fns.zeroPad(this.minute())).concat(this.ampm());
  },
  // either 'am' or 'pm'
  ampm: function ampm(input) {
    var which = 'am';
    var hour = this.hour();

    if (hour >= 12) {
      which = 'pm';
    }

    if (typeof input !== 'string') {
      return which;
    } //okay, we're doing a setter


    var s = this.clone();
    input = input.toLowerCase().trim(); //ampm should never change the day
    // - so use `.hour(n)` instead of `.minus(12,'hour')`

    if (hour >= 12 && input === 'am') {
      //noon is 12pm
      hour -= 12;
      return s.hour(hour);
    }

    if (hour < 12 && input === 'pm') {
      hour += 12;
      return s.hour(hour);
    }

    return s;
  },
  //some hard-coded times of day, like 'noon'
  dayTime: function dayTime(str) {
    if (str !== undefined) {
      var times = {
        morning: '7:00am',
        breakfast: '7:00am',
        noon: '12:00am',
        lunch: '12:00pm',
        afternoon: '2:00pm',
        evening: '6:00pm',
        dinner: '6:00pm',
        night: '11:00pm',
        midnight: '23:59pm'
      };
      var s = this.clone();
      str = str || '';
      str = str.toLowerCase();

      if (times.hasOwnProperty(str) === true) {
        s = s.time(times[str]);
      }

      return s;
    }

    var h = this.hour();

    if (h < 6) {
      return 'night';
    }

    if (h < 12) {
      //until noon
      return 'morning';
    }

    if (h < 17) {
      //until 5pm
      return 'afternoon';
    }

    if (h < 22) {
      //until 10pm
      return 'evening';
    }

    return 'night';
  },
  //parse a proper iso string
  iso: function iso(num) {
    if (num !== undefined) {
      return this.set(num);
    }

    return this.format('iso');
  }
};
var _01Time = methods$1$1;
var methods$2 = {
  // # day in the month
  date: function date(num) {
    if (num !== undefined) {
      var s = this.clone();
      s.epoch = set.date(s, num);
      return s;
    }

    return this.d.getDate();
  },
  //like 'wednesday' (hard!)
  day: function day(input) {
    if (input === undefined) {
      return this.d.getDay();
    }

    var original = this.clone();
    var want = input; // accept 'wednesday'

    if (typeof input === 'string') {
      input = input.toLowerCase();
      want = days["short"]().indexOf(input);

      if (want === -1) {
        want = days["long"]().indexOf(input);
      }
    } //move approx


    var day = this.d.getDay();
    var diff = day - want;
    var s = this.subtract(diff * 24, 'hours'); //tighten it back up

    walk_1(s, {
      hour: original.hour(),
      minute: original.minute(),
      second: original.second()
    });
    return s;
  },
  //these are helpful name-wrappers
  dayName: function dayName(input) {
    if (input === undefined) {
      return days["long"]()[this.day()];
    }

    var s = this.clone();
    s = s.day(input);
    return s;
  },
  //either name or number
  month: function month(input) {
    if (input !== undefined) {
      var s = this.clone();
      s.epoch = set.month(s, input);
      return s;
    }

    return this.d.getMonth();
  }
};
var _02Date = methods$2;

var clearMinutes = function clearMinutes(s) {
  s = s.minute(0);
  s = s.second(0);
  s = s.millisecond(1);
  return s;
};

var methods$3 = {
  // day 0-366
  dayOfYear: function dayOfYear(num) {
    if (num !== undefined) {
      var s = this.clone();
      s.epoch = set.dayOfYear(s, num);
      return s;
    } //days since newyears - jan 1st is 1, jan 2nd is 2...


    var sum = 0;
    var month = this.d.getMonth();
    var tmp; //count the num days in each month

    for (var i = 1; i <= month; i++) {
      tmp = new Date();
      tmp.setDate(1);
      tmp.setFullYear(this.d.getFullYear()); //the year matters, because leap-years

      tmp.setHours(1);
      tmp.setMinutes(1);
      tmp.setMonth(i);
      tmp.setHours(-2); //the last day of the month

      sum += tmp.getDate();
    }

    return sum + this.d.getDate();
  },
  //since the start of the year
  week: function week(num) {
    // week-setter
    if (num !== undefined) {
      var s = this.clone();
      s = s.month(0);
      s = s.date(1);
      s = s.day('monday');
      s = clearMinutes(s); //don't go into last-year

      if (s.monthName() === 'december') {
        s = s.add(1, 'week');
      }

      num -= 1; //1-based

      s = s.add(num, 'weeks');
      return s;
    } //find-out which week it is


    var tmp = this.clone();
    tmp = tmp.month(0);
    tmp = tmp.date(1);
    tmp = clearMinutes(tmp);
    tmp = tmp.day('monday'); //don't go into last-year

    if (tmp.monthName() === 'december') {
      tmp = tmp.add(1, 'week');
    } // is first monday the 1st?


    var toAdd = 1;

    if (tmp.date() === 1) {
      toAdd = 0;
    }

    tmp = tmp.minus(1, 'second');
    var thisOne = this.epoch; //if the week technically hasn't started yet

    if (tmp.epoch > thisOne) {
      return 1;
    } //speed it up, if we can


    var i = 0;
    var skipWeeks = this.month() * 4;
    tmp.epoch += milliseconds.week * skipWeeks;
    i += skipWeeks;

    for (; i < 52; i++) {
      if (tmp.epoch > thisOne) {
        return i + toAdd;
      }

      tmp = tmp.add(1, 'week');
    }

    return 52;
  },
  //'january'
  monthName: function monthName(input) {
    if (input === undefined) {
      return months["long"]()[this.month()];
    }

    var s = this.clone();
    s = s.month(input);
    return s;
  },
  //q1, q2, q3, q4
  quarter: function quarter(num) {
    if (num !== undefined) {
      if (typeof num === 'string') {
        num = num.replace(/^q/i, '');
        num = parseInt(num, 10);
      }

      if (quarters[num]) {
        var s = this.clone();
        var _month = quarters[num][0];
        s = s.month(_month);
        s = s.date(1);
        s = s.startOf('day');
        return s;
      }
    }

    var month = this.d.getMonth();

    for (var i = 1; i < quarters.length; i++) {
      if (month < quarters[i][0]) {
        return i - 1;
      }
    }

    return 4;
  },
  //spring, summer, winter, fall
  season: function season(input) {
    var hem = 'north';

    if (this.hemisphere() === 'South') {
      hem = 'south';
    }

    if (input !== undefined) {
      var s = this.clone();

      for (var i = 0; i < seasons$1[hem].length; i++) {
        if (input === seasons$1[hem][i][0]) {
          s = s.month(seasons$1[hem][i][1]);
          s = s.date(1);
          s = s.startOf('day');
        }
      }

      return s;
    }

    var month = this.d.getMonth();

    for (var _i = 0; _i < seasons$1[hem].length - 1; _i++) {
      if (month >= seasons$1[hem][_i][1] && month < seasons$1[hem][_i + 1][1]) {
        return seasons$1[hem][_i][0];
      }
    }

    return 'winter';
  },
  //the year number
  year: function year(num) {
    if (num !== undefined) {
      var s = this.clone();
      s.epoch = set.year(s, num);
      return s;
    }

    return this.d.getFullYear();
  },
  //bc/ad years
  era: function era(str) {
    if (str !== undefined) {
      var s = this.clone();
      str = str.toLowerCase(); //TODO: there is no year-0AD i think. may have off-by-1 error here

      var year = s.d.getFullYear(); //make '1992' into 1992bc..

      if (str === 'bc' && year > 0) {
        s.epoch = set.year(s, year * -1);
      } //make '1992bc' into '1992'


      if (str === 'ad' && year < 0) {
        s.epoch = set.year(s, year * -1);
      }

      return s;
    }

    if (this.d.getFullYear() < 0) {
      return 'BC';
    }

    return 'AD';
  },
  // 2019 -> 2010
  decade: function decade(input) {
    if (input !== undefined) {
      input = String(input);
      input = input.replace(/([0-9])'?s$/, '$1'); //1950's

      input = input.replace(/([0-9])(th|rd|st|nd)/, '$1'); //fix ordinals

      if (!input) {
        console.warn('Spacetime: Invalid decade input');
        return this;
      } // assume 20th century?? for '70s'.


      if (input.length === 2 && /[0-9][0-9]/.test(input)) {
        input = '19' + input;
      }

      var year = Number(input);

      if (isNaN(year)) {
        return this;
      } // round it down to the decade


      year = Math.floor(year / 10) * 10;
      return this.year(year); //.startOf('decade')
    }

    return this.startOf('decade').year();
  },
  // 1950 -> 19+1
  century: function century(input) {
    if (input !== undefined) {
      if (typeof input === 'string') {
        input = input.replace(/([0-9])(th|rd|st|nd)/, '$1'); //fix ordinals

        input = input.replace(/([0-9]+) ?(b\.?c\.?|a\.?d\.?)/i, function (a, b, c) {
          if (c.match(/b\.?c\.?/i)) {
            b = '-' + b;
          }

          return b;
        });
        input = input.replace(/c$/, ''); //20thC
      }

      var year = Number(input);

      if (isNaN(input)) {
        console.warn('Spacetime: Invalid century input');
        return this;
      } // there is no century 0


      if (year === 0) {
        year = 1;
      }

      if (year >= 0) {
        year = (year - 1) * 100;
      } else {
        year = (year + 1) * 100;
      }

      return this.year(year);
    } // century getter


    var num = this.startOf('century').year();
    num = Math.floor(num / 100);

    if (num < 0) {
      return num - 1;
    }

    return num + 1;
  },
  // 2019 -> 2+1
  millenium: function millenium(input) {
    if (input !== undefined) {
      if (typeof input === 'string') {
        input = input.replace(/([0-9])(th|rd|st|nd)/, '$1'); //fix ordinals

        input = Number(input);

        if (isNaN(input)) {
          console.warn('Spacetime: Invalid millenium input');
          return this;
        }
      }

      if (input > 0) {
        input -= 1;
      }

      var year = input * 1000; // there is no year 0

      if (year === 0) {
        year = 1;
      }

      return this.year(year);
    } // get the current millenium


    var num = Math.floor(this.year() / 1000);

    if (num >= 0) {
      num += 1;
    }

    return num;
  }
};
var _03Year = methods$3;
var methods$4 = Object.assign({}, _01Time, _02Date, _03Year); //aliases

methods$4.milliseconds = methods$4.millisecond;
methods$4.seconds = methods$4.second;
methods$4.minutes = methods$4.minute;
methods$4.hours = methods$4.hour;
methods$4.hour24 = methods$4.hour;
methods$4.h12 = methods$4.hour12;
methods$4.h24 = methods$4.hour24;
methods$4.days = methods$4.day;

var addMethods = function addMethods(Space) {
  //hook the methods into prototype
  Object.keys(methods$4).forEach(function (k) {
    Space.prototype[k] = methods$4[k];
  });
};

var query = addMethods;
var isLeapYear$2 = fns.isLeapYear;

var getMonthLength = function getMonthLength(month, year) {
  if (month === 1 && isLeapYear$2(year)) {
    return 29;
  }

  return monthLengths_1[month];
}; //month is the one thing we 'model/compute'
//- because ms-shifting can be off by enough


var rollMonth = function rollMonth(want, old) {
  //increment year
  if (want.month > 0) {
    var years = parseInt(want.month / 12, 10);
    want.year = old.year() + years;
    want.month = want.month % 12;
  } else if (want.month < 0) {
    //decrement year
    var _years = Math.floor(Math.abs(want.month) / 13, 10);

    _years = Math.abs(_years) + 1;
    want.year = old.year() - _years; //ignore extras

    want.month = want.month % 12;
    want.month = want.month + 12;

    if (want.month === 12) {
      want.month = 0;
    }
  }

  return want;
}; // briefly support day=-2 (this does not need to be perfect.)


var rollDaysDown = function rollDaysDown(want, old, sum) {
  want.year = old.year();
  want.month = old.month();
  var date = old.date();
  want.date = date - Math.abs(sum);

  while (want.date < 1) {
    want.month -= 1;

    if (want.month < 0) {
      want.month = 11;
      want.year -= 1;
    }

    var max = getMonthLength(want.month, want.year);
    want.date += max;
  }

  return want;
}; // briefly support day=33 (this does not need to be perfect.)


var rollDaysUp = function rollDaysUp(want, old, sum) {
  var year = old.year();
  var month = old.month();
  var max = getMonthLength(month, year);

  while (sum > max) {
    sum -= max;
    month += 1;

    if (month >= 12) {
      month -= 12;
      year += 1;
    }

    max = getMonthLength(month, year);
  }

  want.month = month;
  want.date = sum;
  return want;
};

var _model = {
  months: rollMonth,
  days: rollDaysUp,
  daysBack: rollDaysDown
}; // but briefly:
// millisecond-math, and some post-processing covers most-things
// we 'model' the calendar here only a little bit
// and that usually works-out...

var order$1 = ['millisecond', 'second', 'minute', 'hour', 'date', 'month'];
var keep = {
  second: order$1.slice(0, 1),
  minute: order$1.slice(0, 2),
  quarterhour: order$1.slice(0, 2),
  hour: order$1.slice(0, 3),
  date: order$1.slice(0, 4),
  month: order$1.slice(0, 4),
  quarter: order$1.slice(0, 4),
  season: order$1.slice(0, 4),
  year: order$1,
  decade: order$1,
  century: order$1
};
keep.week = keep.hour;
keep.season = keep.date;
keep.quarter = keep.date; // Units need to be dst adjuested

var dstAwareUnits = {
  year: true,
  quarter: true,
  season: true,
  month: true,
  week: true,
  day: true
};
var keepDate = {
  month: true,
  quarter: true,
  season: true,
  year: true
};

var addMethods$1 = function addMethods(SpaceTime) {
  SpaceTime.prototype.add = function (num, unit) {
    var s = this.clone();

    if (!unit || num === 0) {
      return s; //don't bother
    }

    var old = this.clone();
    unit = fns.normalize(unit); //move forward by the estimated milliseconds (rough)

    if (milliseconds[unit]) {
      s.epoch += milliseconds[unit] * num;
    } else if (unit === 'week') {
      s.epoch += milliseconds.day * (num * 7);
    } else if (unit === 'quarter' || unit === 'season') {
      s.epoch += milliseconds.month * (num * 4);
    } else if (unit === 'season') {
      s.epoch += milliseconds.month * (num * 4);
    } else if (unit === 'quarterhour') {
      s.epoch += milliseconds.minute * 15 * num;
    } //now ensure our milliseconds/etc are in-line


    var want = {};

    if (keep[unit]) {
      keep[unit].forEach(function (u) {
        want[u] = old[u]();
      });
    }

    if (dstAwareUnits[unit]) {
      var diff = old.timezone().current.offset - s.timezone().current.offset;
      s.epoch += diff * 3600 * 1000;
    } //ensure month/year has ticked-over


    if (unit === 'month') {
      want.month = old.month() + num; //month is the one unit we 'model' directly

      want = _model.months(want, old);
    } //support coercing a week, too


    if (unit === 'week') {
      var sum = old.date() + num * 7;

      if (sum <= 28 && sum > 1) {
        want.date = sum;
      }
    } //support 25-hour day-changes on dst-changes
    else if (unit === 'date') {
        if (num < 0) {
          want = _model.daysBack(want, old, num);
        } else {
          //specify a naive date number, if it's easy to do...
          var _sum = old.date() + num; // ok, model this one too


          want = _model.days(want, old, _sum);
        } //manually punt it if we haven't moved at all..


        if (num !== 0 && old.isSame(s, 'day')) {
          want.date = old.date() + num;
        }
      } //ensure year has changed (leap-years)
      else if (unit === 'year' && s.year() === old.year()) {
          s.epoch += milliseconds.week;
        } //these are easier
        else if (unit === 'decade') {
            want.year = s.year() + 10;
          } else if (unit === 'century') {
            want.year = s.year() + 100;
          } //keep current date, unless the month doesn't have it.


    if (keepDate[unit]) {
      var max = monthLengths_1[want.month];
      want.date = old.date();

      if (want.date > max) {
        want.date = max;
      }
    }

    walk_1(s, want);
    return s;
  }; //subtract is only add *-1


  SpaceTime.prototype.subtract = function (num, unit) {
    var s = this.clone();
    return s.add(num * -1, unit);
  }; //add aliases


  SpaceTime.prototype.minus = SpaceTime.prototype.subtract;
  SpaceTime.prototype.plus = SpaceTime.prototype.add;
};

var add = addMethods$1; //make a string, for easy comparison between dates

var print = {
  millisecond: function millisecond(s) {
    return s.epoch;
  },
  second: function second(s) {
    return [s.year(), s.month(), s.date(), s.hour(), s.minute(), s.second()].join('-');
  },
  minute: function minute(s) {
    return [s.year(), s.month(), s.date(), s.hour(), s.minute()].join('-');
  },
  hour: function hour(s) {
    return [s.year(), s.month(), s.date(), s.hour()].join('-');
  },
  day: function day(s) {
    return [s.year(), s.month(), s.date()].join('-');
  },
  week: function week(s) {
    return [s.year(), s.week()].join('-');
  },
  month: function month(s) {
    return [s.year(), s.month()].join('-');
  },
  quarter: function quarter(s) {
    return [s.year(), s.quarter()].join('-');
  },
  year: function year(s) {
    return s.year();
  }
};
print.date = print.day;

var addMethods$2 = function addMethods(SpaceTime) {
  SpaceTime.prototype.isSame = function (b, unit) {
    var a = this;

    if (!unit) {
      return null;
    }

    if (typeof b === 'string' || typeof b === 'number') {
      b = new SpaceTime(b, this.timezone.name);
    } //support 'seconds' aswell as 'second'


    unit = unit.replace(/s$/, '');

    if (print[unit]) {
      return print[unit](a) === print[unit](b);
    }

    return null;
  };
};

var same = addMethods$2;

var addMethods$3 = function addMethods(SpaceTime) {
  var methods = {
    isAfter: function isAfter(d) {
      d = fns.beADate(d, this);
      var epoch = fns.getEpoch(d);

      if (epoch === null) {
        return null;
      }

      return this.epoch > epoch;
    },
    isBefore: function isBefore(d) {
      d = fns.beADate(d, this);
      var epoch = fns.getEpoch(d);

      if (epoch === null) {
        return null;
      }

      return this.epoch < epoch;
    },
    isEqual: function isEqual(d) {
      d = fns.beADate(d, this);
      var epoch = fns.getEpoch(d);

      if (epoch === null) {
        return null;
      }

      return this.epoch === epoch;
    },
    isBetween: function isBetween(start, end) {
      var isInclusive = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      start = fns.beADate(start, this);
      end = fns.beADate(end, this);
      var startEpoch = fns.getEpoch(start);

      if (startEpoch === null) {
        return null;
      }

      var endEpoch = fns.getEpoch(end);

      if (endEpoch === null) {
        return null;
      }

      if (isInclusive) {
        return this.isBetween(start, end) || this.isEqual(start) || this.isEqual(end);
      }

      return startEpoch < this.epoch && this.epoch < endEpoch;
    }
  }; //hook them into proto

  Object.keys(methods).forEach(function (k) {
    SpaceTime.prototype[k] = methods[k];
  });
};

var compare = addMethods$3;

var addMethods$4 = function addMethods(SpaceTime) {
  var methods = {
    i18n: function i18n(data) {
      //change the day names
      if (fns.isObject(data.days)) {
        days.set(data.days);
      } //change the month names


      if (fns.isObject(data.months)) {
        months.set(data.months);
      }
    }
  }; //hook them into proto

  Object.keys(methods).forEach(function (k) {
    SpaceTime.prototype[k] = methods[k];
  });
};

var i18n = addMethods$4;
var timezones = unpack; //fake timezone-support, for fakers (es5 class)

var SpaceTime = function SpaceTime(input$1, tz) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {}; //the holy moment

  this.epoch = null; //the shift for the given timezone

  this.tz = find(tz, timezones); //whether to output warnings to console

  this.silent = options.silent || true; // favour british interpretation of 02/02/2018, etc

  this.british = options.dmy || options.british; //does the week start on sunday, or monday:

  this._weekStart = 1; //default to monday

  if (options.weekStart !== undefined) {
    this._weekStart = options.weekStart;
  } // the reference today date object, (for testing)


  this._today = {};

  if (options.today !== undefined) {
    this._today = options.today;
  } //add getter/setters


  Object.defineProperty(this, 'd', {
    //return a js date object
    get: function get() {
      var offset = quick(this); //every computer is somewhere- get this computer's built-in offset

      var bias = new Date(this.epoch).getTimezoneOffset() || 0; //movement

      var shift = bias + offset * 60; //in minutes

      shift = shift * 60 * 1000; //in ms
      //remove this computer's offset

      var epoch = this.epoch + shift;
      var d = new Date(epoch);
      return d;
    }
  }); //add this data on the object, to allow adding new timezones

  Object.defineProperty(this, 'timezones', {
    get: function get() {
      return timezones;
    },
    set: function set(obj) {
      timezones = obj;
      return obj;
    }
  }); //parse the various formats

  var tmp = input(this, input$1, tz);
  this.epoch = tmp.epoch;
}; //(add instance methods to prototype)


Object.keys(methods_1).forEach(function (k) {
  SpaceTime.prototype[k] = methods_1[k];
}); // ¯\_(ツ)_/¯

SpaceTime.prototype.clone = function () {
  return new SpaceTime(this.epoch, this.tz, {
    silent: this.silent,
    weekStart: this._weekStart,
    today: this._today
  });
}; //return native date object at the same epoch


SpaceTime.prototype.toLocalDate = function () {
  return new Date(this.epoch);
}; //append more methods


query(SpaceTime);
add(SpaceTime);
same(SpaceTime);
compare(SpaceTime);
i18n(SpaceTime);
var spacetime = SpaceTime;

var whereIts = function whereIts(a, b) {
  var start = new spacetime(null);
  var end = new spacetime(null);
  start = start.time(a); //if b is undefined, use as 'within one hour'

  if (b) {
    end = end.time(b);
  } else {
    end = start.add(59, 'minutes');
  }

  var startHour = start.hour();
  var endHour = end.hour();
  var tzs = Object.keys(start.timezones).filter(function (tz) {
    if (tz.indexOf('/') === -1) {
      return false;
    }

    var m = new spacetime(null, tz);
    var hour = m.hour(); //do 'calendar-compare' not real-time-compare

    if (hour >= startHour && hour <= endHour) {
      //test minutes too, if applicable
      if (hour === startHour && m.minute() < start.minute()) {
        return false;
      }

      if (hour === endHour && m.minute() > end.minute()) {
        return false;
      }

      return true;
    }

    return false;
  });
  return tzs;
};

var whereIts_1 = whereIts;
var _version = '6.6.3';

var main$1 = function main(input, tz, options) {
  return new spacetime(input, tz, options);
}; // set all properties of a given 'today' object


var setToday = function setToday(s) {
  var today = s._today || {};
  Object.keys(today).forEach(function (k) {
    s = s[k](today[k]);
  });
  return s;
}; //some helper functions on the main method


main$1.now = function (tz, options) {
  var s = new spacetime(new Date().getTime(), tz, options);
  s = setToday(s);
  return s;
};

main$1.today = function (tz, options) {
  var s = new spacetime(new Date().getTime(), tz, options);
  s = setToday(s);
  return s.startOf('day');
};

main$1.tomorrow = function (tz, options) {
  var s = new spacetime(new Date().getTime(), tz, options);
  s = setToday(s);
  return s.add(1, 'day').startOf('day');
};

main$1.yesterday = function (tz, options) {
  var s = new spacetime(new Date().getTime(), tz, options);
  s = setToday(s);
  return s.subtract(1, 'day').startOf('day');
};

main$1.extend = function (obj) {
  Object.keys(obj).forEach(function (k) {
    spacetime.prototype[k] = obj[k];
  });
  return this;
}; //find tz by time


main$1.whereIts = whereIts_1;
main$1.version = _version; //aliases:

main$1.plugin = main$1.extend;
var src = main$1;

var spacetime$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': src
});

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule$1(fn, basedir, module) {
	return module = {
	  path: basedir,
	  exports: {},
	  require: function (path, base) {
      return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
    }
	}, fn(module, module.exports), module.exports;
}

function getCjsExportFromNamespace$1 (n) {
	return n && n['default'] || n;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var spacetime$2 = getCjsExportFromNamespace$1(spacetime$1);

// these timezone abbreviations are wholly made-up by me, Spencer Kelly, with no expertise in geography
// generated humbly from https://github.com/spencermountain/spacetime-informal

var america = 'America/';
var asia = 'Asia/';
var europe = 'Europe/';
var africa = 'Africa/';
var aus = 'Australia/';
var pac = 'Pacific/';
var informal = {
  //europe
  'british summer time': europe + 'London',
  bst: europe + 'London',
  'british time': europe + 'London',
  'britain time': europe + 'London',
  'irish summer time': europe + 'Dublin',
  'irish time': europe + 'Dublin',
  ireland: europe + 'Dublin',
  'central european time': europe + 'Berlin',
  cet: europe + 'Berlin',
  'central european summer time': europe + 'Berlin',
  cest: europe + 'Berlin',
  'central europe': europe + 'Berlin',
  'eastern european time': europe + 'Riga',
  eet: europe + 'Riga',
  'eastern european summer time': europe + 'Riga',
  eest: europe + 'Riga',
  'eastern europe time': europe + 'Riga',
  'western european time': europe + 'Lisbon',
  // wet: europe+'Lisbon',
  'western european summer time': europe + 'Lisbon',
  // west: europe+'Lisbon',
  'western europe': europe + 'Lisbon',
  'turkey standard time': europe + 'Istanbul',
  trt: europe + 'Istanbul',
  'turkish time': europe + 'Istanbul',
  //africa
  etc: africa + 'Freetown',
  utc: africa + 'Freetown',
  'greenwich standard time': africa + 'Freetown',
  gmt: africa + 'Freetown',
  'east africa time': africa + 'Nairobi',
  // eat: africa+'Nairobi',
  'east african time': africa + 'Nairobi',
  'eastern africa time': africa + 'Nairobi',
  'central africa time': africa + 'Khartoum',
  // cat: africa+'Khartoum',
  'central african time': africa + 'Khartoum',
  'south africa standard time': africa + 'Johannesburg',
  sast: africa + 'Johannesburg',
  'southern africa': africa + 'Johannesburg',
  'south african': africa + 'Johannesburg',
  'west africa standard time': africa + 'Lagos',
  // wat: africa+'Lagos',
  'western africa time': africa + 'Lagos',
  'west african time': africa + 'Lagos',
  'australian central standard time': aus + 'Adelaide',
  acst: aus + 'Adelaide',
  'australian central daylight time': aus + 'Adelaide',
  acdt: aus + 'Adelaide',
  'australia central': aus + 'Adelaide',
  'australian eastern standard time': aus + 'Brisbane',
  aest: aus + 'Brisbane',
  'australian eastern daylight time': aus + 'Brisbane',
  aedt: aus + 'Brisbane',
  'australia east': aus + 'Brisbane',
  'australian western standard time': aus + 'Perth',
  awst: aus + 'Perth',
  'australian western daylight time': aus + 'Perth',
  awdt: aus + 'Perth',
  'australia west': aus + 'Perth',
  'australian central western standard time': aus + 'Eucla',
  acwst: aus + 'Eucla',
  'australia central west': aus + 'Eucla',
  'lord howe standard time': aus + 'Lord_Howe',
  lhst: aus + 'Lord_Howe',
  'lord howe daylight time': aus + 'Lord_Howe',
  lhdt: aus + 'Lord_Howe',
  'russian standard time': europe + 'Moscow',
  msk: europe + 'Moscow',
  russian: europe + 'Moscow',
  //america
  'central standard time': america + 'Chicago',
  'central time': america + 'Chicago',
  cst: america + 'Havana',
  'central daylight time': america + 'Chicago',
  cdt: america + 'Havana',
  'mountain standard time': america + 'Denver',
  'mountain time': america + 'Denver',
  mst: america + 'Denver',
  'mountain daylight time': america + 'Denver',
  mdt: america + 'Denver',
  'atlantic standard time': america + 'Halifax',
  'atlantic time': america + 'Halifax',
  ast: asia + 'Baghdad',
  'atlantic daylight time': america + 'Halifax',
  adt: america + 'Halifax',
  'eastern standard time': america + 'New_York',
  'eastern time': america + 'New_York',
  est: america + 'New_York',
  'eastern daylight time': america + 'New_York',
  edt: america + 'New_York',
  'pacific time': america + 'Los_Angeles',
  'pacific standard time': america + 'Los_Angeles',
  pst: america + 'Los_Angeles',
  'pacific daylight time': america + 'Los_Angeles',
  pdt: america + 'Los_Angeles',
  'alaskan standard time': america + 'Anchorage',
  'alaskan time': america + 'Anchorage',
  ahst: america + 'Anchorage',
  'alaskan daylight time': america + 'Anchorage',
  ahdt: america + 'Anchorage',
  'hawaiian standard time': pac + 'Honolulu',
  'hawaiian time': pac + 'Honolulu',
  hst: pac + 'Honolulu',
  'aleutian time': pac + 'Honolulu',
  'hawaii time': pac + 'Honolulu',
  'newfoundland standard time': america + 'St_Johns',
  'newfoundland time': america + 'St_Johns',
  nst: america + 'St_Johns',
  'newfoundland daylight time': america + 'St_Johns',
  ndt: america + 'St_Johns',
  'brazil time': america + 'Sao_Paulo',
  brt: america + 'Sao_Paulo',
  brasília: america + 'Sao_Paulo',
  brasilia: america + 'Sao_Paulo',
  'brazilian time': america + 'Sao_Paulo',
  'argentina time': america + 'Buenos_Aires',
  // art: a+'Buenos_Aires',
  'argentinian time': america + 'Buenos_Aires',
  'amazon time': america + 'Manaus',
  amt: america + 'Manaus',
  'amazonian time': america + 'Manaus',
  'easter island standard time': 'Chile/Easterisland',
  east: 'Chile/Easterisland',
  'easter island summer time': 'Chile/Easterisland',
  easst: 'Chile/Easterisland',
  'venezuelan standard time': america + 'Caracas',
  'venezuelan time': america + 'Caracas',
  vet: america + 'Caracas',
  'venezuela time': america + 'Caracas',
  'paraguay time': america + 'Asuncion',
  pyt: america + 'Asuncion',
  'paraguay summer time': america + 'Asuncion',
  pyst: america + 'Asuncion',
  'cuba standard time': america + 'Havana',
  'cuba time': america + 'Havana',
  'cuba daylight time': america + 'Havana',
  'cuban time': america + 'Havana',
  'bolivia time': america + 'La_Paz',
  // bot: a+'La_Paz',
  'bolivian time': america + 'La_Paz',
  'colombia time': america + 'Bogota',
  cot: america + 'Bogota',
  'colombian time': america + 'Bogota',
  'acre time': america + 'Eirunepe',
  // act: a+'Eirunepe',
  'peru time': america + 'Lima',
  // pet: a+'Lima',
  'chile standard time': america + 'Punta_Arenas',
  'chile time': america + 'Punta_Arenas',
  clst: america + 'Punta_Arenas',
  'chile summer time': america + 'Punta_Arenas',
  cldt: america + 'Punta_Arenas',
  'uruguay time': america + 'Montevideo',
  uyt: america + 'Montevideo',
  //asia
  ist: asia + 'Jerusalem',
  'arabic standard time': asia + 'Baghdad',
  'arabic time': asia + 'Baghdad',
  'arab time': asia + 'Baghdad',
  'iran standard time': asia + 'Tehran',
  'iran time': asia + 'Tehran',
  irst: asia + 'Tehran',
  'iran daylight time': asia + 'Tehran',
  irdt: asia + 'Tehran',
  iranian: asia + 'Tehran',
  'pakistan standard time': asia + 'Karachi',
  'pakistan time': asia + 'Karachi',
  pkt: asia + 'Karachi',
  'india standard time': asia + 'Kolkata',
  'indian time': asia + 'Kolkata',
  'indochina time': asia + 'Bangkok',
  ict: asia + 'Bangkok',
  'south east asia': asia + 'Bangkok',
  'china standard time': asia + 'Shanghai',
  ct: asia + 'Shanghai',
  'chinese time': asia + 'Shanghai',
  'alma-ata time': asia + 'Almaty',
  almt: asia + 'Almaty',
  'oral time': asia + 'Oral',
  'orat time': asia + 'Oral',
  'yakutsk time': asia + 'Yakutsk',
  yakt: asia + 'Yakutsk',
  'gulf standard time': asia + 'Dubai',
  'gulf time': asia + 'Dubai',
  gst: asia + 'Dubai',
  uae: asia + 'Dubai',
  'hong kong time': asia + 'Hong_Kong',
  hkt: asia + 'Hong_Kong',
  'western indonesian time': asia + 'Jakarta',
  wib: asia + 'Jakarta',
  'indonesia time': asia + 'Jakarta',
  'central indonesian time': asia + 'Makassar',
  wita: asia + 'Makassar',
  'israel daylight time': asia + 'Jerusalem',
  idt: asia + 'Jerusalem',
  'israel standard time': asia + 'Jerusalem',
  'israel time': asia + 'Jerusalem',
  israeli: asia + 'Jerusalem',
  'krasnoyarsk time': asia + 'Krasnoyarsk',
  krat: asia + 'Krasnoyarsk',
  'malaysia time': asia + 'Kuala_Lumpur',
  myt: asia + 'Kuala_Lumpur',
  'singapore time': asia + 'Singapore',
  sgt: asia + 'Singapore',
  'korea standard time': asia + 'Seoul',
  'korea time': asia + 'Seoul',
  kst: asia + 'Seoul',
  'korean time': asia + 'Seoul',
  'uzbekistan time': asia + 'Samarkand',
  uzt: asia + 'Samarkand',
  'vladivostok time': asia + 'Vladivostok',
  vlat: asia + 'Vladivostok',
  //indian
  'maldives time': 'Indian/Maldives',
  mvt: 'Indian/Maldives',
  'mauritius time': 'Indian/Mauritius',
  mut: 'Indian/Mauritius',
  // pacific
  'marshall islands time': pac + 'Kwajalein',
  mht: pac + 'Kwajalein',
  'samoa standard time': pac + 'Midway',
  sst: pac + 'Midway',
  'somoan time': pac + 'Midway',
  'chamorro standard time': pac + 'Guam',
  chst: pac + 'Guam',
  'papua new guinea time': pac + 'Bougainville',
  pgt: pac + 'Bougainville'
}; //add the official iana zonefile names

var iana = spacetime$2().timezones;
var formal = Object.keys(iana).reduce(function (h, k) {
  h[k] = k;
  return h;
}, {});

var _timezones = Object.assign({}, informal, formal);

var dates$1 = ['weekday', 'summer', 'winter', 'autumn', 'some day', 'one day', 'all day', 'some point', 'eod', 'eom', 'standard time', 'daylight time'];

var durations = ['centuries', 'century', 'day', 'days', 'decade', 'decades', 'hour', 'hours', 'millisecond', 'milliseconds', 'minute', 'minutes', 'month', 'months', 'seconds', 'week', 'weeks', 'year', 'years'];

var holidays = ['all hallows eve', 'all saints day', 'all sts day', 'april fools', 'armistice day', 'australia day', 'bastille day', 'boxing day', 'canada day', 'christmas eve', 'christmas', 'cinco de mayo', 'day of the dead', 'dia de muertos', 'dieciseis de septiembre', 'emancipation day', 'grito de dolores', 'groundhog day', 'halloween', 'harvey milk day', 'inauguration day', 'independence day', 'independents day', 'juneteenth', 'labour day', 'national freedom day', 'national nurses day', 'new years eve', 'new years', 'purple heart day', 'rememberance day', 'rosa parks day', 'saint andrews day', 'saint patricks day', 'saint stephens day', 'saint valentines day', 'st andrews day', 'st patricks day', 'st stephens day', 'st valentines day ', 'valentines day', 'valentines', 'veterans day', 'victoria day', 'womens equality day', 'xmas', // Fixed religious and cultural holidays
// Catholic + Christian
'epiphany', 'orthodox christmas day', 'orthodox new year', 'assumption of mary', 'all souls day', 'feast of the immaculate conception', 'feast of our lady of guadalupe', // Kwanzaa
'kwanzaa', // Pagan / metal 🤘
'imbolc', 'beltaine', 'lughnassadh', 'samhain', 'martin luther king day', 'mlk day', 'presidents day', 'mardi gras', 'tax day', 'commonwealth day', 'mothers day', 'memorial day', 'fathers day', 'columbus day', 'indigenous peoples day', 'canadian thanksgiving', 'election day', 'thanksgiving', 't-day', 'turkey day', 'black friday', 'cyber monday', // Astronomical religious and cultural holidays
'ash wednesday', 'palm sunday', 'maundy thursday', 'good friday', 'holy saturday', 'easter', 'easter sunday', 'easter monday', 'orthodox good friday', 'orthodox holy saturday', 'orthodox easter', 'orthodox easter monday', 'ascension day', 'pentecost', 'whitsunday', 'whit sunday', 'whit monday', 'trinity sunday', 'corpus christi', 'advent', // Jewish
'tu bishvat', 'tu bshevat', 'purim', 'passover', 'yom hashoah', 'lag baomer', 'shavuot', 'tisha bav', 'rosh hashana', 'yom kippur', 'sukkot', 'shmini atzeret', 'simchat torah', 'chanukah', 'hanukkah', // Muslim
'isra and miraj', 'lailat al-qadr', 'eid al-fitr', 'id al-Fitr', 'eid ul-Fitr', 'ramadan', 'eid al-adha', 'muharram', 'the prophets birthday', 'ostara', 'march equinox', 'vernal equinox', 'litha', 'june solistice', 'summer solistice', 'mabon', 'september equinox', 'fall equinox', 'autumnal equinox', 'yule', 'december solstice', 'winter solstice', // Additional important holidays
'chinese new year', 'diwali'];

var times = ['noon', 'midnight', 'now', 'morning', 'tonight', 'evening', 'afternoon', 'night', 'breakfast time', 'lunchtime', 'dinnertime', 'sometime', 'eod', 'oclock', 'oclock', 'all day', 'at night'];

var lex = {};
var data$1 = [[dates$1, '#Date'], [durations, '#Duration'], [holidays, '#Holiday'], [times, '#Time'], [Object.keys(_timezones), '#Timezone']];
data$1.forEach(function (a) {
  for (var i = 0; i < a[0].length; i++) {
    lex[a[0][i]] = a[1];
  }
});
var words = lex;

var normalize$1 = function normalize(doc) {
  doc = doc.clone();

  if (!doc.numbers) {
    console.warn("Compromise: compromise-dates cannot find plugin dependency 'compromise-number'");
  } else {
    // convert 'two' to 2
    var num = doc.numbers();
    num.toNumber();
    num.toCardinal();
  } // remove adverbs


  doc.adverbs().remove();
  return doc;
};

var _00Normalize = normalize$1;

var knownUnits = {
  second: true,
  minute: true,
  hour: true,
  day: true,
  week: true,
  month: true,
  season: true,
  quarter: true,
  year: true
}; //turn '5 weeks before' to {weeks:5}

var parseShift = function parseShift(doc) {
  var result = {};
  var m = doc.match('#DateShift+');

  if (m.found === false) {
    return result;
  }

  m.match('#Cardinal #Duration').forEach(function (ts) {
    var num = ts.match('#Cardinal').text('normal');
    num = parseFloat(num);

    if (num && typeof num === 'number') {
      var unit = ts.match('#Duration').text('normal');
      unit = unit.replace(/s$/, '');

      if (unit && knownUnits.hasOwnProperty(unit)) {
        result[unit] = num;
      }
    }
  }); //is it 2 weeks ago?  → -2

  if (m.has('(before|ago)$') === true) {
    Object.keys(result).forEach(function (k) {
      return result[k] *= -1;
    });
  } // finally, remove it from our text


  doc.remove('#DateShift');
  return result;
};

var _01Shift = parseShift;

var hardCoded = {
  daybreak: '7:00am',
  //ergh
  breakfast: '8:00am',
  morning: '9:00am',
  noon: '12:00pm',
  afternoon: '2:00pm',
  lunchtime: '12:00pm',
  evening: '6:00pm',
  dinnertime: '6:00pm',
  night: '8:00pm',
  midnight: '12:00am'
};

var halfPast = function halfPast(m, s) {
  var hour = m.match('#Cardinal$').text('reduced');
  var term = m.match('(half|quarter|25|15|10|5)');
  var mins = term.text('reduced');

  if (term.has('half')) {
    mins = '30';
  }

  if (term.has('quarter')) {
    mins = '15';
  }

  var behind = m.has('to'); // apply it

  s = s.hour(hour);
  s = s.startOf('hour');

  if (behind) {
    s = s.subtract(mins, 'minutes');
  } else {
    s = s.add(mins, 'minutes');
  }

  return s;
};

var parseTime$1 = function parseTime(doc, context) {
  var time = doc.match('(at|by|for|before)? #Time+');

  if (time.found) {
    doc.remove(time);
  } // get the main part of the time


  time = time.not('(at|by|for|before|sharp)');
  time = time.not('on the dot');
  var s = spacetime$2.now(context.timezone);
  var now = s.clone(); // check for known-times (like 'today')

  var timeStr = time.text('reduced');

  if (hardCoded.hasOwnProperty(timeStr)) {
    return hardCoded[timeStr];
  } // '5 oclock'


  var m = time.match('^#Cardinal oclock (am|pm)?');

  if (m.found) {
    m = m.not('oclock');
    s = s.hour(m.text('reduced'));

    if (s.isValid() && !s.isEqual(now)) {
      return s.time();
    }
  } // 'quarter to two'


  m = time.match('(half|quarter|25|15|10|5) (past|after|to) #Cardinal');

  if (m.found) {
    s = halfPast(m, s);

    if (s.isValid() && !s.isEqual(now)) {
      return s.time();
    }
  } // parse random a time like '4:54pm'


  var str = time.text('reduced');
  s = s.time(str);

  if (s.isValid() && !s.isEqual(now)) {
    return s.time();
  }

  return null;
};

var _02Time = parseTime$1;

// interpret 'this halloween' or 'next june'
var parseRelative = function parseRelative(doc) {
  var rel = null;

  if (doc.has('^this? (next|upcoming)')) {
    rel = 'next';
  }

  if (doc.has('^this? (last|previous)')) {
    rel = 'last';
  }

  if (doc.has('^(this|current)')) {
    rel = 'this';
  } // finally, remove it from our text


  doc.remove('^(this|current|next|upcoming|last|previous)');
  return rel;
};

var _03Relative = parseRelative;

var isOffset$1 = /(\-?[0-9]+)h(rs)?/i;
var isNumber$1 = /(\-?[0-9]+)/;
var utcOffset$1 = /utc([\-+]?[0-9]+)/i;
var gmtOffset$1 = /gmt([\-+]?[0-9]+)/i;

var toIana$1 = function toIana(num) {
  num = Number(num);

  if (num > -13 && num < 13) {
    num = num * -1; //it's opposite!

    num = (num > 0 ? '+' : '') + num; //add plus sign

    return 'Etc/GMT' + num;
  }

  return null;
};

var parseOffset$2 = function parseOffset(tz) {
  // '+5hrs'
  var m = tz.match(isOffset$1);

  if (m !== null) {
    return toIana$1(m[1]);
  } // 'utc+5'


  m = tz.match(utcOffset$1);

  if (m !== null) {
    return toIana$1(m[1]);
  } // 'GMT-5' (not opposite)


  m = tz.match(gmtOffset$1);

  if (m !== null) {
    var num = Number(m[1]) * -1;
    return toIana$1(num);
  } // '+5'


  m = tz.match(isNumber$1);

  if (m !== null) {
    return toIana$1(m[1]);
  }

  return null;
};

var parseTimezone = function parseTimezone(doc) {
  var m = doc.match('#Timezone+'); //remove prepositions

  m = m.remove('(in|for|by|near|at)');
  var str = m.text('reduced'); // remove it from our doc, either way

  doc.remove('#Timezone+'); // check our list of informal tz names

  if (_timezones.hasOwnProperty(str)) {
    return _timezones[str];
  }

  var tz = parseOffset$2(str);

  if (tz) {
    return tz;
  }

  return null;
};

var _04Timezone = parseTimezone;

var Unit = /*#__PURE__*/function () {
  function Unit(input, unit, context) {
    _classCallCheck(this, Unit);

    this.unit = unit || 'day';
    context = context || {};
    var today = {};

    if (context.today) {
      today = {
        date: context.today.date(),
        month: context.today.month(),
        year: context.today.year()
      };
    } // set it to the beginning of the given unit


    var d = spacetime$2(input, context.timezone, {
      today: today
    }); // set to beginning

    if (d.isValid()) {
      d = d.startOf(this.unit);
    }

    Object.defineProperty(this, 'd', {
      enumerable: false,
      writable: true,
      value: d
    });
    Object.defineProperty(this, 'context', {
      enumerable: false,
      writable: true,
      value: context
    });
  } // make a new one


  _createClass(Unit, [{
    key: "clone",
    value: function clone() {
      var d = new Unit(this.d, this.unit, this.context);
      return d;
    }
  }, {
    key: "log",
    value: function log() {
      console.log('--');
      this.d.log();
      console.log('\n');
      return this;
    }
  }, {
    key: "applyShift",
    value: function applyShift() {
      var _this = this;

      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      Object.keys(obj).forEach(function (k) {
        _this.d = _this.d.add(obj[k], k);
      });
      return this;
    }
  }, {
    key: "applyTime",
    value: function applyTime(str) {
      if (str) {
        this.d = this.d.time(str);
      } else {
        this.d = this.d.startOf('day'); //zero-out time
      }

      return this;
    }
  }, {
    key: "format",
    value: function format(fmt) {
      return this.d.format(fmt);
    }
  }, {
    key: "start",
    value: function start() {
      this.d = this.d.startOf(this.unit);
      return this;
    }
  }, {
    key: "end",
    value: function end() {
      this.d = this.d.endOf(this.unit);
      return this;
    } // 'before 2019'

  }, {
    key: "before",
    value: function before() {
      this.d = spacetime$2.now(this.context.timezone, {
        today: this.context.today
      }); // ???

      return this;
    } // 'after 2019'

  }, {
    key: "after",
    value: function after() {
      this.d = this.d.add(1, this.unit);
      this.d = this.d.startOf(this.unit);
      return this;
    } // tricky: 'next june' 'next tuesday'

  }, {
    key: "next",
    value: function next() {
      this.d = this.d.add(1, this.unit);
      this.d = this.d.startOf(this.unit);
      return this;
    } // tricky: 'last june' 'last tuesday'

  }, {
    key: "last",
    value: function last() {
      this.d = this.d.minus(1, this.unit);
      this.d = this.d.startOf(this.unit);
      return this;
    }
  }]);

  return Unit;
}();

var Unit_1 = Unit;

var Day = /*#__PURE__*/function (_Unit) {
  _inherits(Day, _Unit);

  var _super = _createSuper(Day);

  function Day(input, unit, context) {
    var _this;

    _classCallCheck(this, Day);

    _this = _super.call(this, input, unit, context);
    _this.unit = 'day';
    return _this;
  }

  return Day;
}(Unit_1);

var Month = /*#__PURE__*/function (_Unit2) {
  _inherits(Month, _Unit2);

  var _super2 = _createSuper(Month);

  function Month(input, unit, context) {
    var _this2;

    _classCallCheck(this, Month);

    _this2 = _super2.call(this, input, unit, context);
    _this2.unit = 'month';
    return _this2;
  }

  return Month;
}(Unit_1);

var Quarter = /*#__PURE__*/function (_Unit3) {
  _inherits(Quarter, _Unit3);

  var _super3 = _createSuper(Quarter);

  function Quarter(input, unit, context) {
    var _this3;

    _classCallCheck(this, Quarter);

    _this3 = _super3.call(this, input, unit, context);
    _this3.unit = 'quarter';
    return _this3;
  }

  return Quarter;
}(Unit_1);

var Year = /*#__PURE__*/function (_Unit4) {
  _inherits(Year, _Unit4);

  var _super4 = _createSuper(Year);

  function Year(input, unit, context) {
    var _this4;

    _classCallCheck(this, Year);

    _this4 = _super4.call(this, input, unit, context);
    _this4.unit = 'year';
    return _this4;
  }

  return Year;
}(Unit_1);

var WeekDay = /*#__PURE__*/function (_Unit5) {
  _inherits(WeekDay, _Unit5);

  var _super5 = _createSuper(WeekDay);

  function WeekDay(input, unit, context) {
    var _this5;

    _classCallCheck(this, WeekDay);

    _this5 = _super5.call(this, input, unit, context);
    _this5.unit = 'week'; // is the input just a weekday?

    if (typeof input === 'string') {
      _this5.d = spacetime$2(context.today, context.timezone);
      _this5.d = _this5.d.day(input); // assume a wednesday in the future

      if (_this5.d.isBefore(context.today)) {
        _this5.d = _this5.d.add(7, 'days');
      }
    } else {
      _this5.d = input;
    }

    _this5.weekDay = _this5.d.dayName();
    return _this5;
  }

  _createClass(WeekDay, [{
    key: "clone",
    value: function clone() {
      //overloaded method
      return new WeekDay(this.d, this.unit, this.context);
    }
  }, {
    key: "end",
    value: function end() {
      //overloaded method
      this.d = this.d.endOf('day');
      return this;
    }
  }, {
    key: "next",
    value: function next() {
      this.d = this.d.add(7, 'days');
      this.d = this.d.day(this.weekDay);
      return this;
    }
  }, {
    key: "last",
    value: function last() {
      this.d = this.d.minus(7, 'days');
      this.d = this.d.day(this.weekDay);
      return this;
    }
  }]);

  return WeekDay;
}(Unit_1); // like 'feb 2'


var CalendarDate = /*#__PURE__*/function (_Unit6) {
  _inherits(CalendarDate, _Unit6);

  var _super6 = _createSuper(CalendarDate);

  function CalendarDate(input, unit, context) {
    var _this6;

    _classCallCheck(this, CalendarDate);

    _this6 = _super6.call(this, input, unit, context);
    _this6.unit = 'day';
    return _this6;
  }

  _createClass(CalendarDate, [{
    key: "next",
    value: function next() {
      this.d = this.d.add(1, 'year');
      return this;
    }
  }, {
    key: "last",
    value: function last() {
      this.d = this.d.minus(1, 'year');
      return this;
    }
  }]);

  return CalendarDate;
}(Unit_1);

var _units = {
  Unit: Unit_1,
  Day: Day,
  Month: Month,
  Quarter: Quarter,
  Year: Year,
  WeekDay: WeekDay,
  CalendarDate: CalendarDate
};

var Unit$1 = _units.Unit;

var onlySection = function onlySection(doc, context, section) {
  var d = null;

  if (doc.found === false) {
    // do we have just a time?
    if (section.time !== null) {
      d = new Unit$1(context.today, null, context); // choose today
    } //do we just have a shift?


    if (Object.keys(section.shift).length > 0) {
      d = new Unit$1(context.today, null, context); // choose today
    }
  }

  return d;
};

var _00Implied = onlySection;

var mapping$1 = {
  week: _units.Week,
  month: _units.Month,
  quarter: _units.Quarter,
  year: _units.Year,
  season: _units.Season
}; // when a unit of time is spoken of as 'this month' - instead of 'february'

var namedUnit = function namedUnit(doc, context) {
  //this month, last quarter, next year
  var m = doc.match('^(weekday|week|month|quarter|season|year)$');

  if (m.found === true) {
    var str = m.lastTerm().text('reduced');

    if (mapping$1.hasOwnProperty(str)) {
      var Model = mapping$1[str];

      if (!Model) {
        return null;
      }

      var unit = new Model(null, str, context);
      return unit;
    }
  } //try this version - 'next friday, last thursday'


  m = doc.match('^(monday|tuesday|wednesday|thursday|friday|saturday|sunday)$');

  if (m.found === true) {
    var _str = m.lastTerm().text('reduced');

    var _unit = new _units.WeekDay(_str, null, context);

    return _unit;
  }

  return null;
};

var _01Duration = namedUnit;

var spacetimeHoliday = createCommonjsModule$1(function (module, exports) {
  (function (global, factory) {
     module.exports = factory(spacetime$2) ;
  })(commonjsGlobal, function (spacetime) {

    spacetime = spacetime && spacetime.hasOwnProperty('default') ? spacetime['default'] : spacetime; //yep,

    var jan = 'january';
    var feb = 'february';
    var mar = 'march';
    var apr = 'april';
    var may = 'may';
    var jun = 'june';
    var jul = 'july';
    var aug = 'august';
    var sep = 'september';
    var oct = 'october';
    var nov = 'november';
    var dec = 'december';
    var fixedHolidays = {
      'new years eve': [dec, 31],
      'new years': [jan, 1],
      'new years day': [jan, 1],
      'inauguration day': [jan, 20],
      'australia day': [jan, 26],
      'national freedom day': [feb, 1],
      'groundhog day': [feb, 2],
      'rosa parks day': [feb, 4],
      'valentines day': [feb, 14],
      'saint valentines day': [feb, 14],
      'st valentines day ': [feb, 14],
      'saint patricks day': [mar, 17],
      'st patricks day': [mar, 17],
      'april fools': [apr, 1],
      'april fools day': [apr, 1],
      'emancipation day': [apr, 16],
      'tax day': [apr, 15],
      //US
      'labour day': [may, 1],
      'cinco de mayo': [may, 5],
      'national nurses day': [may, 6],
      'harvey milk day': [may, 22],
      'victoria day': [may, 24],
      juneteenth: [jun, 19],
      'canada day': [jul, 1],
      'independence day': [jul, 4],
      'independents day': [jul, 4],
      'bastille day': [jul, 14],
      'purple heart day': [aug, 7],
      'womens equality day': [aug, 26],
      '16 de septiembre': [sep, 16],
      'dieciseis de septiembre': [sep, 16],
      'grito de dolores': [sep, 16],
      halloween: [oct, 31],
      'all hallows eve': [oct, 31],
      'day of the dead': [oct, 31],
      // Ranged holiday [nov, 2],
      'dia de muertos': [oct, 31],
      // Ranged holiday [nov, 2],
      'veterans day': [nov, 11],
      'st andrews day': [nov, 30],
      'saint andrews day': [nov, 30],
      'all saints day': [nov, 1],
      'all sts day': [nov, 1],
      'armistice day': [nov, 11],
      'rememberance day': [nov, 11],
      'christmas eve': [dec, 24],
      christmas: [dec, 25],
      xmas: [dec, 25],
      'boxing day': [dec, 26],
      'st stephens day': [dec, 26],
      'saint stephens day': [dec, 26],
      // Fixed religious and cultural holidays
      // Catholic + Christian
      epiphany: [jan, 6],
      'orthodox christmas day': [jan, 7],
      'orthodox new year': [jan, 14],
      'assumption of mary': [aug, 15],
      'all souls day': [nov, 2],
      'feast of the immaculate conception': [dec, 8],
      'feast of our lady of guadalupe': [dec, 12],
      // Kwanzaa
      kwanzaa: [dec, 26],
      // Ranged holiday [jan, 1],
      // Pagan / metal 🤘
      imbolc: [feb, 2],
      beltaine: [may, 1],
      lughnassadh: [aug, 1],
      samhain: [oct, 31]
    };

    var fixedDates = function fixedDates(str, normal, year) {
      if (fixedHolidays.hasOwnProperty(str) || fixedHolidays.hasOwnProperty(normal)) {
        var arr = fixedHolidays[str] || fixedHolidays[normal] || [];
        var s = spacetime.now();
        s = s.year(year);
        s = s.startOf('year');
        s = s.month(arr[0]);
        s = s.date(arr[1]);

        if (s.isValid()) {
          return s;
        }
      }

      return null;
    };

    var _01FixedDates = fixedDates; //these are holidays on the 'nth weekday of month'

    var jan$1 = 'january';
    var feb$1 = 'february';
    var mar$1 = 'march'; // const apr = 'april'

    var may$1 = 'may';
    var jun$1 = 'june'; // const jul = 'july'
    // const aug = 'august'

    var sep$1 = 'september';
    var oct$1 = 'october';
    var nov$1 = 'november'; // const dec = 'december'

    var mon = 'monday'; // const tues = 'tuesday'
    // const wed = 'wednesday'

    var thurs = 'thursday';
    var fri = 'friday'; // const sat = 'saturday'

    var sun = 'sunday';
    var holidays = {
      'martin luther king day': [3, mon, jan$1],
      //[third monday in january],
      'presidents day': [3, mon, feb$1],
      //[third monday in february],
      'commonwealth day': [2, mon, mar$1],
      //[second monday in march],
      'mothers day': [2, sun, may$1],
      //[second Sunday in May],
      'fathers day': [3, sun, jun$1],
      //[third Sunday in June],
      'labor day': [1, mon, sep$1],
      //[first monday in september],
      'columbus day': [2, mon, oct$1],
      //[second monday in october],
      'canadian thanksgiving': [2, mon, oct$1],
      //[second monday in october],
      thanksgiving: [4, thurs, nov$1],
      // [fourth Thursday in November],
      'black friday': [4, fri, nov$1] //[fourth friday in november],
      // 'memorial day': [may], //[last monday in may],
      // 'us election': [nov], // [Tuesday following the first Monday in November],
      // 'cyber monday': [nov]
      // 'advent': [] // fourth Sunday before Christmas

    }; // add aliases

    holidays['turday day'] = holidays.thanksgiving;
    holidays['indigenous peoples day'] = holidays['columbus day'];
    holidays['mlk day'] = holidays['martin luther king day'];
    var calendarHolidays = holidays;

    var fixedDates$1 = function fixedDates(str, normal, year) {
      if (calendarHolidays.hasOwnProperty(str) || calendarHolidays.hasOwnProperty(normal)) {
        var arr = calendarHolidays[str] || calendarHolidays[normal] || [];
        var s = spacetime.now();
        s = s.year(year); // [3rd, 'monday', 'january']

        s = s.month(arr[2]);
        s = s.startOf('month'); // make it january

        var month = s.month(); // make it the 1st monday

        s = s.day(arr[1]);

        if (s.month() !== month) {
          s = s.add(1, 'week');
        } // make it nth monday


        if (arr[0] > 1) {
          s = s.add(arr[0] - 1, 'week');
        }

        if (s.isValid()) {
          return s;
        }
      }

      return null;
    };

    var _02NthWeekday = fixedDates$1; // https://www.timeanddate.com/calendar/determining-easter-date.html

    var dates = {
      easter: 0,
      'ash wednesday': -46,
      // (46 days before easter)
      'palm sunday': 7,
      // (1 week before easter)
      'maundy thursday': -3,
      // (3 days before easter)
      'good friday': -2,
      // (2 days before easter)
      'holy saturday': -1,
      // (1 days before easter)
      'easter saturday': -1,
      // (1 day before easter)
      'easter monday': 1,
      // (1 day after easter)
      'ascension day': 39,
      // (39 days after easter)
      'whit sunday': 49,
      // / pentecost (49 days after easter)
      'whit monday': 50,
      // (50 days after easter)
      'trinity sunday': 65,
      // (56 days after easter)
      'corpus christi': 60,
      // (60 days after easter)
      'mardi gras': -47 //(47 days before easter)

    };
    dates['easter sunday'] = dates.easter;
    dates['pentecost'] = dates['whit sunday'];
    dates['whitsun'] = dates['whit sunday'];
    var easterHolidays = dates; // by John Dyer
    // based on the algorithm by Oudin (1940) from http://www.tondering.dk/claus/cal/easter.php

    var calcEaster = function calcEaster(year) {
      var f = Math.floor,
          // Golden Number - 1
      G = year % 19,
          C = f(year / 100),
          // related to Epact
      H = (C - f(C / 4) - f((8 * C + 13) / 25) + 19 * G + 15) % 30,
          // number of days from 21 March to the Paschal full moon
      I = H - f(H / 28) * (1 - f(29 / (H + 1)) * f((21 - G) / 11)),
          // weekday for the Paschal full moon
      J = (year + f(year / 4) + I + 2 - C + f(C / 4)) % 7,
          // number of days from 21 March to the Sunday on or before the Paschal full moon
      L = I - J,
          month = 3 + f((L + 40) / 44),
          date = L + 28 - 31 * f(month / 4);
      month = month === 4 ? 'April' : 'March';
      return month + ' ' + date;
    };

    var calcEaster_1 = calcEaster;

    var easterDates = function easterDates(str, normal, year) {
      if (easterHolidays.hasOwnProperty(str) || easterHolidays.hasOwnProperty(normal)) {
        var days = easterHolidays[str] || easterHolidays[normal] || [];
        var date = calcEaster_1(year);

        if (!date) {
          return null; //no easter for this year
        }

        var e = spacetime(date);
        e = e.year(year);
        var s = e.add(days, 'day');

        if (s.isValid()) {
          return s;
        }
      }

      return null;
    };

    var _03EasterDates = easterDates; // http://www.astropixels.com/ephemeris/soleq2001.html
    // years 2000-2100

    var exceptions = {
      spring: [2003, 2007, 2044, 2048, 2052, 2056, 2060, 2064, 2068, 2072, 2076, 2077, 2080, 2081, 2084, 2085, 2088, 2089, 2092, 2093, 2096, 2097],
      summer: [2021, 2016, 2020, 2024, 2028, 2032, 2036, 2040, 2041, 2044, 2045, 2048, 2049, 2052, 2053, 2056, 2057, 2060, 2061, 2064, 2065, 2068, 2069, 2070, 2072, 2073, 2074, 2076, 2077, 2078, 2080, 2081, 2082, 2084, 2085, 2086, 2088, 2089, 2090, 2092, 2093, 2094, 2096, 2097, 2098, 2099],
      fall: [2002, 2003, 2004, 2006, 2007, 2010, 2011, 2014, 2015, 2018, 2019, 2022, 2023, 2026, 2027, 2031, 2035, 2039, 2043, 2047, 2051, 2055, 2059, 2092, 2096],
      winter: [2002, 2003, 2006, 2007, 2011, 2015, 2019, 2023, 2027, 2031, 2035, 2039, 2043, 2080, 2084, 2088, 2092, 2096]
    };
    var winter20th = [2080, 2084, 2088, 2092, 2096];

    var calcSeasons = function calcSeasons(year) {
      // most common defaults
      var res = {
        spring: 'March 20 ' + year,
        summer: 'June 21 ' + year,
        fall: 'Sept 22 ' + year,
        winter: 'Dec 21 ' + year
      };

      if (exceptions.spring.indexOf(year) !== -1) {
        res.spring = 'March 19 ' + year;
      }

      if (exceptions.summer.indexOf(year) !== -1) {
        res.summer = 'June 20 ' + year;
      }

      if (exceptions.fall.indexOf(year) !== -1) {
        res.fall = 'Sept 21 ' + year;
      } // winter can be 20th, 21st, or 22nd


      if (exceptions.winter.indexOf(year) !== -1) {
        res.winter = 'Dec 22 ' + year;
      }

      if (winter20th.indexOf(year) !== -1) {
        res.winter = 'Dec 20 ' + year;
      }

      return res;
    };

    var seasons = calcSeasons; // these are properly calculated in ./lib/seasons

    var dates$1 = {
      'spring equinox': 'spring',
      'summer solistice': 'summer',
      'fall equinox': 'fall',
      'winter solstice': 'winter'
    }; // aliases

    dates$1['march equinox'] = dates$1['spring equinox'];
    dates$1['vernal equinox'] = dates$1['spring equinox'];
    dates$1['ostara'] = dates$1['spring equinox'];
    dates$1['june solstice'] = dates$1['summer solistice'];
    dates$1['litha'] = dates$1['summer solistice'];
    dates$1['autumn equinox'] = dates$1['fall equinox'];
    dates$1['autumnal equinox'] = dates$1['fall equinox'];
    dates$1['september equinox'] = dates$1['fall equinox'];
    dates$1['sept equinox'] = dates$1['fall equinox'];
    dates$1['mabon'] = dates$1['fall equinox'];
    dates$1['december solstice'] = dates$1['winter solistice'];
    dates$1['dec solstice'] = dates$1['winter solistice'];
    dates$1['yule'] = dates$1['winter solistice'];
    var astroHolidays = dates$1;

    var astroDates = function astroDates(str, normal, year) {
      if (astroHolidays.hasOwnProperty(str) || astroHolidays.hasOwnProperty(normal)) {
        var season = astroHolidays[str] || astroHolidays[normal];
        var seasons$1 = seasons(year);

        if (!season || !seasons$1 || !seasons$1[season]) {
          return null; // couldn't figure it out
        }

        var s = spacetime(seasons$1[season]);

        if (s.isValid()) {
          return s;
        }
      }

      return null;
    };

    var _04Astronomical = astroDates;
    var dates$2 = {
      // Muslim holidays
      'isra and miraj': 'april 13',
      'lailat al-qadr': 'june 10',
      'eid al-fitr': 'june 15',
      'id al-Fitr': 'june 15',
      'eid ul-Fitr': 'june 15',
      ramadan: 'may 16',
      // Range holiday
      'eid al-adha': 'sep 22',
      muharram: 'sep 12',
      'prophets birthday': 'nov 21'
    };
    var lunarHolidays = dates$2;
    var dayDiff = -10.64;

    var lunarDates = function lunarDates(str, normal, year) {
      if (lunarHolidays.hasOwnProperty(str) || lunarHolidays.hasOwnProperty(normal)) {
        var date = lunarHolidays[str] || lunarHolidays[normal] || [];

        if (!date) {
          return null;
        } // start at 2018


        var s = spacetime(date + ' 2018');
        var diff = year - 2018;
        var toAdd = diff * dayDiff;
        s = s.add(toAdd, 'day');
        s = s.startOf('day'); // now set the correct year

        s = s.year(year);

        if (s.isValid()) {
          return s;
        }
      }

      return null;
    };

    var _05LunarDates = lunarDates;
    var nowYear = spacetime.now().year();

    var spacetimeHoliday = function spacetimeHoliday(str, year) {
      year = year || nowYear;
      str = str || '';
      str = String(str);
      str = str.trim().toLowerCase();
      str = str.replace(/'s/, 's'); // 'mother's day'

      var normal = str.replace(/ day$/, '');
      normal = normal.replace(/^the /, '');
      normal = normal.replace(/^orthodox /, ''); //orthodox good friday
      // try easier, unmoving holidays

      var s = _01FixedDates(str, normal, year);

      if (s !== null) {
        return s;
      } // try 'nth monday' holidays


      s = _02NthWeekday(str, normal, year);

      if (s !== null) {
        return s;
      } // easter-based holidays


      s = _03EasterDates(str, normal, year);

      if (s !== null) {
        return s;
      } // solar-based holidays


      s = _04Astronomical(str, normal, year);

      if (s !== null) {
        return s;
      } // mostly muslim holidays


      s = _05LunarDates(str, normal, year);

      if (s !== null) {
        return s;
      }

      return null;
    };

    var src = spacetimeHoliday;
    return src;
  });
});

var CalendarDate$1 = _units.CalendarDate;

var parseHoliday = function parseHoliday(doc, context) {
  var d = null;
  var str = doc.match('#Holiday+').text('reduced');
  var year = 2020; //change me!

  var s = spacetimeHoliday(str, year);

  if (s !== null) {
    d = new CalendarDate$1(s, null, context);
  }

  return d;
};

var _02Holidays = parseHoliday;

var Unit$2 = _units.Unit,
    Day$1 = _units.Day,
    CalendarDate$2 = _units.CalendarDate,
    Month$1 = _units.Month;
var knownWord = {
  today: function today(context) {
    return new Day$1(context.today, null, context);
  },
  yesterday: function yesterday(context) {
    return new Day$1(context.today.minus(1, 'day'), null, context);
  },
  tomorrow: function tomorrow(context) {
    return new Day$1(context.today.plus(1, 'day'), null, context);
  }
}; // parse things like 'june 5th 2019'
// most of this is done in spacetime

var parseExplicit = function parseExplicit(doc, context) {
  var impliedYear = context.today.year(); // 'fifth of june 1992'

  var m = doc.match('[<date>#Value] of? [<month>#Month] [<year>#Year]'); // 'june the fifth 1992'

  if (!m.found) {
    m = doc.match('[<month>#Month] the? [<date>#Value] [<year>#Year]');
  }

  if (m.found) {
    var obj = {
      month: m.groups('month').text(),
      date: m.groups('date').text(),
      year: m.groups('year').text() || impliedYear
    };

    var _d = new CalendarDate$2(obj, null, context);

    if (_d.d.isValid() === true) {
      return _d;
    }
  } //no-dates
  // 'march 1992'


  m = doc.match('[<month>#Month] of? [<year>#Year]');

  if (m.found) {
    var _obj = {
      month: m.groups('month').text(),
      year: m.groups('year').text() || impliedYear
    };

    var _d2 = new Month$1(_obj, null, context);

    if (_d2.d.isValid() === true) {
      return _d2;
    }
  } //no-years
  // 'fifth of june'


  m = doc.match('[<date>#Value] of? [<month>#Month]'); // 'june the fifth'

  if (!m.found) {
    m = doc.match('[<month>#Month] the? [<date>#Value]');
  } // support 'dec 5th'


  if (m.found) {
    var _obj2 = {
      month: m.groups('month').text(),
      date: m.groups('date').text(),
      year: context.today.year()
    };

    var _d3 = new CalendarDate$2(_obj2, null, context);

    if (_d3.d.isValid() === true) {
      return _d3;
    }
  } // support 'december'


  if (doc.has('#Month')) {
    var _obj3 = {
      month: doc.match('#Month').text(),
      date: 1,
      //assume 1st
      year: context.today.year()
    };

    var _d4 = new CalendarDate$2(_obj3, null, context);

    if (_d4.d.isValid() === true) {
      return _d4;
    }
  } // support date-only 'the 21st'


  m = doc.match('the [<date>#Value]');

  if (m.found) {
    var _obj4 = {
      month: context.today.month(),
      date: m.groups('date').text(),
      year: context.today.year()
    };

    var _d5 = new CalendarDate$2(_obj4, null, context);

    if (_d5.d.isValid() === true) {
      return _d5;
    }
  }

  var str = doc.text('reduced'); // today, yesterday, tomorrow

  if (knownWord.hasOwnProperty(str) === true) {
    var _d6 = knownWord[str](context);

    return _d6;
  } // punt it to spacetime, for the heavy-lifting


  var d = new Unit$2(str, null, context); // did we find a date?

  if (d.d.isValid() === false) {
    return null;
  }

  return d;
};

var _03Explicit = parseExplicit;

var section = {
  shift: _01Shift,
  time: _02Time,
  relative: _03Relative,
  timezone: _04Timezone
};
var steps = {
  implied: _00Implied,
  duration: _01Duration,
  holiday: _02Holidays,
  explicit: _03Explicit
};

var parseDate = function parseDate(doc, context) {
  //parse-out any sections
  var shift = section.shift(doc);
  var tz = section.timezone(doc);
  var time = section.time(doc, context);
  var rel = section.relative(doc); //set our new timezone

  if (tz) {
    context = Object.assign({}, context, {
      timezone: tz
    });
    var iso = context.today.format('iso-short');
    context.today = context.today["goto"](context.timezone).set(iso);
  }

  var d = null; //'in two days'

  d = d || steps.implied(doc, context, {
    shift: shift,
    time: time,
    rel: rel
  }); // 'this month'

  d = d || steps.duration(doc, context); // 'this haloween'

  d = d || steps.holiday(doc, context); // 'this june 2nd'

  d = d || steps.explicit(doc, context); // if (typeof process !== undefined && process && process.env.DEBUG) {
  // console.log('\n\n=-=-=-=-=-=Date-=-=-=-=-=-=-')
  // console.log(`  shift:      ${JSON.stringify(shift)}`)
  // console.log(`  rel:        ${rel || '-'}`)
  // console.log(`  time:       ${time || '-'}`)
  // console.log(`\n  str:       '${doc.text()}'`)
  // console.log('\n     ', d)
  // console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-\n\n')
  // }

  if (!d) {
    return null;
  } // // apply relative


  if (rel === 'last') {
    d.last();
  }

  if (rel === 'next') {
    d.next();
  } // apply shift


  if (shift) {
    d.applyShift(shift);
  } // apply time


  d.applyTime(time);
  return d;
};

var _03ParseDate = parseDate;

var punt = function punt(unit, context) {
  unit = unit.applyShift(context.casual_duration);
  return unit;
}; //


var logic = function logic(doc, context) {
  // two explicit dates - 'between friday and sunday'
  var m = doc.match('between [<start>*] and [<end>*]');

  if (m.found) {
    var start = m.groups('start');
    start = _03ParseDate(start, context);
    var end = m.groups('end');
    end = _03ParseDate(end, context);

    if (start) {
      return {
        start: start,
        end: end
      };
    }
  } // two months, no year - 'june 5 to june 7'


  m = doc.match('[<from>#Month #Value] to [<to>#Month #Value] [<year>#Year?]');

  if (m.found) {
    var res = m.groups();
    var _start = res.from;

    if (res.year) {
      _start = _start.concat(res.year);
    }

    _start = _03ParseDate(_start, context);

    if (_start) {
      var _end = res.to;

      if (res.year) {
        _end = _end.concat(res.year);
      }

      _end = _03ParseDate(_end, context);
      return {
        start: _start,
        end: _end
      };
    }
  } // one month, one year, first form - 'january 5 to 7 1998'


  m = doc.match('[<month>#Month] [<from>#Value] to [<to>#Value] of? [<year>#Year]');

  if (m.found) {
    var _res = m.groups();

    var _start2 = _res.month.concat(_res.from, _res.year);

    _start2 = _03ParseDate(_start2, context);

    if (_start2) {
      var _end2 = _res.month.concat(_res.to, _res.year);

      _end2 = _03ParseDate(_end2, context);
      return {
        start: _start2,
        end: _end2
      };
    }
  } // one month, one year, second form - '5 to 7 of january 1998'


  m = doc.match('[<from>#Value] to [<to>#Value of? #Month of? #Year]');

  if (m.found) {
    var to = m.groups('to');
    to = _03ParseDate(to, context);

    if (to) {
      var fromDate = m.groups('to');
      var from = to.clone();
      from.d = from.d.date(fromDate.text('normal'));
      return {
        start: from,
        end: to
      };
    }
  } // one month, no year - '5 to 7 of january'


  m = doc.match('[<from>#Value] to [<to>#Value of? #Month]');

  if (m.found) {
    var _to = m.groups('to');

    _to = _03ParseDate(_to, context);

    if (_to) {
      var _fromDate = m.groups('from');

      var _from = _to.clone();

      _from.d = _from.d.date(_fromDate.text('normal'));
      return {
        start: _from,
        end: _to
      };
    }
  } // one month, no year - 'january 5 to 7'


  m = doc.match('[<from>#Month #Value] to [<to>#Value]');

  if (m.found) {
    var _from2 = m.groups('from');

    _from2 = _03ParseDate(_from2, context);

    if (_from2) {
      var toDate = m.groups('to');

      var _to2 = _from2.clone();

      _to2.d = _to2.d.date(toDate.text('normal'));
      return {
        start: _from2,
        end: _to2
      };
    }
  } // 'from A to B'


  m = doc.match('from? [<from>*] (to|@hasHyphen|until|upto) [<to>*]');

  if (m.found) {
    var _from3 = m.groups('from');

    var _to3 = m.groups('to');

    _from3 = _03ParseDate(_from3, context);
    _to3 = _03ParseDate(_to3, context);

    if (_from3 && _to3) {
      return {
        start: _from3,
        end: _to3
      };
    }
  } // 'before june'


  m = doc.match('^due (by|before|on|in)? [*]', 0);

  if (m.found) {
    var _d = _03ParseDate(m, context);

    if (_d) {
      var today = new Unit_1(context.today, null, context);
      return {
        start: today,
        end: punt(_d.clone(), context)
      };
    }
  } // 'after june'


  m = doc.match('^(after|following|from) [*]', 0);

  if (m.found) {
    var _d2 = _03ParseDate(m, context);

    if (_d2) {
      return {
        start: _d2,
        end: punt(_d2.clone(), context)
      };
    }
  } // 'in june'


  m = doc.match('^(on|during|in) [*]', 0);

  if (m.found) {
    var _d3 = _03ParseDate(m, context);

    if (_d3) {
      return {
        start: _d3,
        end: _d3.clone().end()
      };
    }
  } //else, try whole thing


  var d = _03ParseDate(doc, context);

  if (d) {
    return {
      start: d,
      end: d.clone().end()
    };
  }

  return {
    start: null,
    end: null
  };
};

var _01ParseRange = logic;

var getDate = function getDate(doc, context) {
  // validate context a bit
  context = context || {};
  context.timezone = context.timezone || 'ETC/UTC';
  context.today = spacetime$2(context.today || null, context.timezone); //turn 'five' into 5..

  doc = _00Normalize(doc); //interpret 'between [A] and [B]'...

  return _01ParseRange(doc, context);
};

var _02GetDate = getDate;

var arr = [['mon', 'monday'], ['tue', 'tuesday'], ['tues', 'tuesday'], ['wed', 'wednesday'], ['thu', 'thursday'], ['thurs', 'thursday'], ['fri', 'friday'], ['sat', 'saturday'], ['sun', 'sunday'], ['jan', 'january'], ['feb', 'february'], ['mar', 'march'], ['apr', 'april'], ['jun', 'june'], ['jul', 'july'], ['aug', 'august'], ['sep', 'september'], ['sept', 'september'], ['oct', 'october'], ['nov', 'november'], ['dec', 'december']];
arr = arr.map(function (a) {
  return {
    "short": a[0],
    "long": a[1]
  };
});
var _abbrevs = arr;

var methods$5 = {
  /** overload the original json with noun information */
  json: function json(options) {
    var _this = this;

    var n = null;

    if (typeof options === 'number') {
      n = options;
      options = null;
    }

    options = options || {
      terms: false
    };
    var res = [];
    var format = options.format || 'iso';
    this.forEach(function (doc) {
      var json = doc.json(options)[0];
      var obj = _02GetDate(doc, _this.context);
      var start = obj.start ? obj.start.format(format) : null;
      var end = obj.end ? obj.end.format(format) : null; // set iso strings to json result

      json.date = {
        start: start,
        end: end
      }; // add duration

      if (start && end) {
        json.date.duration = obj.start.d.diff(obj.end.d); // we don't need these

        delete json.date.duration.milliseconds;
        delete json.date.duration.seconds;
      }

      res.push(json);
    });

    if (n !== null) {
      return res[n];
    }

    return res;
  },

  /** render all dates according to a specific format */
  format: function format(fmt) {
    var _this2 = this;

    this.forEach(function (doc) {
      var obj = _02GetDate(doc, _this2.context);
      var str = '';

      if (obj.start) {
        str = obj.start.format(fmt);

        if (obj.end) {
          var end = obj.start.format(fmt);

          if (str !== end) {
            str += ' to ' + end;
          }
        }

        doc.replaceWith(str, {
          keepTags: true,
          keepCase: false
        });
      }
    });
    return this;
  },

  /** replace 'Fri' with 'Friday', etc*/
  toLongForm: function toLongForm() {
    var _this3 = this;

    _abbrevs.forEach(function (a) {
      _this3.replace(a["short"], a["long"], true);
    });
    return this;
  },

  /** replace 'Friday' with 'Fri', etc*/
  toShortForm: function toShortForm() {
    var _this4 = this;

    _abbrevs.forEach(function (a) {
      _this4.replace(a["long"], a["short"], true);
    });
    return this;
  }
};

var addMethods$5 = function addMethods(Doc, world) {
  // our new tags
  world.addTags(_tags); // add info for the date plugin

  world.addWords(words); // run our tagger

  world.postProcess(_01Tag);
  /**  */

  var Dates = /*#__PURE__*/function (_Doc) {
    _inherits(Dates, _Doc);

    var _super = _createSuper(Dates);

    function Dates(list, from, w) {
      var _this;

      _classCallCheck(this, Dates);

      _this = _super.call(this, list, from, w);
      _this.context = {
        casual_duration: {
          weeks: 2
        }
      };
      return _this;
    }

    return Dates;
  }(Doc); //add-in methods


  Object.assign(Dates.prototype, methods$5);

  Doc.prototype.dates = function (n) {
    var context = {};

    if (n && _typeof(n) === 'object') {
      context = n;
      n = null;
    }

    var r = this.clauses();
    var dates = r.match('#Date+');

    if (typeof n === 'number') {
      dates = dates.get(n);
    }

    if (typeof n === 'number') {
      dates = dates.get(n);
    }

    var d = new Dates(dates.list, this, this.world);

    if (context.today) {
      context.today = spacetime$2(context.today, context.timezone);
    }

    d.context = context;
    return d;
  };
};

var src$1 = addMethods$5;

export default src$1;

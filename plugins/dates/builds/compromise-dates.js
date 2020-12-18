/* compromise-dates 1.3.0 MIT */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.compromiseDates = factory());
}(this, (function () { 'use strict';

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

    m.forEach(function (p) {
      var str = p.text('reduced');
      var num = parseInt(str, 10);

      if (num && num > 1000 && num < 3000) {
        p.tag('Year', reason);
      }
    });
  }; //same, but for less-confident values


  var tagYearSafe = function tagYearSafe(m, reason) {
    if (m.found !== true) {
      return;
    }

    m.forEach(function (p) {
      var str = p.text('reduced');
      var num = parseInt(str, 10);

      if (num && num > 1900 && num < 2030) {
        p.tag('Year', reason);
      }
    });
  };

  var tagDates = function tagDates(doc) {
    // in the evening
    doc.match('in the (night|evening|morning|afternoon|day|daytime)').tag('Time', 'in-the-night'); // 8 pm

    doc.match('(#Value|#Time) (am|pm)').tag('Time', 'value-ampm'); // 22-aug
    // doc.match('/^[0-9]{2}-(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov)/').tag('Date', '20-jan')
    // 2012-06

    doc.match('/^[0-9]{4}-[0-9]{2}$/').tag('Date', '2012-06'); // misc weekday words

    doc.match('(tue|thu)').tag('WeekDay', 'misc-weekday'); //months:

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

      val.match('#TextValue #TextValue')["if"]('#Date').tag('#Date', 'textvalue-date'); //two thursdays back

      val.match('#Value (#WeekDay|#Duration) back').tag('#Date', '3-back'); //eg 'year'

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

      date.match('#Date (#Preposition|to) #Date').ifNo('#Duration').tag('Date', 'date-prep-date'); //2nd quarter of 2019
      // date.match('#Date of #Date').tag('Date', 'date-of-date')
    } //year/cardinal tagging


    var cardinal = doc["if"]('#Cardinal');

    if (cardinal.found === true) {
      var v = cardinal.match("#Date #Value [#Cardinal]", 0);
      tagYear(v, 'date-value-year'); //scoops up a bunch

      v = cardinal.match("#Date [#Cardinal]", 0);
      tagYearSafe(v, 'date-year'); //middle of 1999

      v = cardinal.match("".concat(sections, " of [#Cardinal]"));
      tagYearSafe(v, 'section-year'); //feb 8 2018

      v = cardinal.match("#Month #Value [#Cardinal]", 0);
      tagYear(v, 'month-value-year'); //feb 8 to 10th 2018

      v = cardinal.match("#Month #Value to #Value [#Cardinal]", 0);
      tagYear(v, 'month-range-year'); //in 1998

      v = cardinal.match("(in|of|by|during|before|starting|ending|for|year|since) [#Cardinal]", 0);
      tagYear(v, 'in-year-1'); //q2 2009

      v = cardinal.match('(q1|q2|q3|q4) [#Cardinal]', 0);
      tagYear(v, 'in-year-2'); //2nd quarter 2009

      v = cardinal.match('#Ordinal quarter [#Cardinal]', 0);
      tagYear(v, 'in-year-3'); //in the year 1998

      v = cardinal.match('the year [#Cardinal]', 0);
      tagYear(v, 'in-year-4'); //it was 1998

      v = cardinal.match('it (is|was) [#Cardinal]', 0);
      tagYearSafe(v, 'in-year-5'); // re-tag this part

      cardinal.match("".concat(sections, " of #Year")).tag('Date');
    }

    var time = doc["if"]('#Time');

    if (time.found === true) {
      //by 6pm
      time.match('(by|before|after|at|@|about) #Time').tag('Time', 'preposition-time'); //7 7pm
      // time.match('#Cardinal #Time').not('#Year').tag('Time', 'value-time')
      //2pm est

      time.match('#Time [(eastern|pacific|central|mountain)]', 0).tag('Date', 'timezone'); //6pm est

      time.match('#Time [(est|pst|gmt)]', 0).tag('Date', 'timezone abbr');
    } //'2020' bare input


    var m = doc.match('^/^20[012][0-9]$/$');
    tagYearSafe(m, '2020-ish'); // in 20mins

    doc.match('(in|after) /^[0-9]+(min|sec|wk)s?/').tag('Date', 'shift-units');
    return doc;
  };

  var _00Basic = tagDates;

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

      doc.match('(by|until|after|before|during|on|in|following|since) (next|this|last)? (#Date|#Date)').tag('Date', here$1); //day after next

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

      doc.match('(the|this) #Date').tag('Date', here$2); //january up to june

      doc.match('#Date up to #Date').tag('Date', here$2);
    }

    return doc;
  };

  var _03Sections = sectionTagger;

  var here$3 = 'time-tagger'; //

  var timeTagger = function timeTagger(doc) {
    // 2 oclock
    doc.match('#Cardinal oclock').tag('Time', here$3); // 13h30

    doc.match('/^[0-9]{2}h[0-9]{2}$/').tag('Time', here$3); // 03/02

    doc.match('/^[0-9]{2}/[0-9]{2}/').tag('Date', here$3).unTag('Value'); // 3 in the morning

    doc.match('[#Value] (in|at) the? (morning|evening|night|nighttime)').tag('Time', here$3); // quarter to seven (not march 5 to 7)

    if (doc.has('#Cardinal') && !doc.has('#Month')) {
      doc.match('1? (half|quarter|25|15|10|5) (past|after|to) #Cardinal').tag('Time', here$3);
    } //timezone


    if (doc.has('#Date')) {
      // iso  (2020-03-02T00:00:00.000Z)
      doc.match('/^[0-9]{4}[:-][0-9]{2}[:-][0-9]{2}T[0-9]/').tag('Time', here$3); // tuesday at 4

      doc.match('#Date [at #Cardinal]', 0).notIf('#Year').tag('Time', here$3); // half an hour

      doc.match('half an (hour|minute|second)').tag('Date', here$3); //eastern daylight time

      doc.match('#Noun (standard|daylight|central|mountain)? time').tag('Timezone', here$3); //utc+5

      doc.match('/^utc[+-][0-9]/').tag('Timezone', here$3);
      doc.match('/^gmt[+-][0-9]/').tag('Timezone', here$3);
      doc.match('(in|for|by|near|at) #Timezone').tag('Timezone', here$3); // 2pm eastern

      doc.match('#Time [(eastern|mountain|pacific|central)]', 0).tag('Timezone', here$3);
    }

    return doc;
  };

  var _04Time = timeTagger;

  var here$4 = 'shift-tagger'; //

  var shiftTagger = function shiftTagger(doc) {
    if (doc.has('#Date')) {
      //'two days before'/ 'nine weeks frow now'
      doc.match('#Cardinal #Duration (before|after|ago|from|hence|back)').tag('DateShift', here$4); // in two weeks

      doc.match('in #Cardinal #Duration').tag('DateShift', here$4); // in a few weeks

      doc.match('in a (few|couple) of? #Duration').tag('DateShift', here$4); //two weeks and three days before

      doc.match('#Cardinal #Duration and? #DateShift').tag('DateShift', here$4);
      doc.match('#DateShift and #Cardinal #Duration').tag('DateShift', here$4); // 'day after tomorrow'

      doc.match('[#Duration (after|before)] #Date', 0).tag('DateShift', here$4); // in half an hour

      doc.match('in half (a|an) #Duration').tag('DateShift', here$4);
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
      // the day after next

      d.match('#Date+').match('^the').unTag('Date');
    }

    return doc;
  };

  var _06Fixup = fixUp;

  var methods = [_00Basic, _01Values, _02Dates, _03Sections, _04Time, _05Shifts, _06Fixup]; // normalizations to run before tagger

  var normalize = function normalize(doc) {
    // turn '20mins' into '20 mins'
    doc.numbers().normalize(); // this is sorta problematic

    return doc;
  }; // run each of the taggers


  var tagDate = function tagDate(doc) {
    doc = normalize(doc); // run taggers

    methods.forEach(function (fn) {
      return fn(doc);
    });
    return doc;
  };

  var _01Tagger = tagDate;

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
      isA: ['Date', 'Noun'],
      notA: ['Adjective', 'DateShift']
    },
    // 'two weeks before'
    DateShift: {
      isA: ['Date'],
      notA: ['TimeZone', 'Holiday']
    }
  };

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn) {
    var module = { exports: {} };
  	return fn(module, module.exports), module.exports;
  }

  /* spencermountain/spacetime 6.12.2 Apache 2.0 */
  var spacetime = createCommonjsModule(function (module, exports) {
    (function (global, factory) {
       module.exports = factory() ;
    })(commonjsGlobal, function () {

      function _slicedToArray(arr, i) {
        return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
      }

      function _arrayWithHoles(arr) {
        if (Array.isArray(arr)) return arr;
      }

      function _iterableToArrayLimit(arr, i) {
        if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
        var _arr = [];
        var _n = true;
        var _d = false;
        var _e = undefined;

        try {
          for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
            _arr.push(_s.value);

            if (i && _arr.length === i) break;
          }
        } catch (err) {
          _d = true;
          _e = err;
        } finally {
          try {
            if (!_n && _i["return"] != null) _i["return"]();
          } finally {
            if (_d) throw _e;
          }
        }

        return _arr;
      }

      function _unsupportedIterableToArray(o, minLen) {
        if (!o) return;
        if (typeof o === "string") return _arrayLikeToArray(o, minLen);
        var n = Object.prototype.toString.call(o).slice(8, -1);
        if (n === "Object" && o.constructor) n = o.constructor.name;
        if (n === "Map" || n === "Set") return Array.from(o);
        if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
      }

      function _arrayLikeToArray(arr, len) {
        if (len == null || len > arr.length) len = arr.length;

        for (var i = 0, arr2 = new Array(len); i < len; i++) {
          arr2[i] = arr[i];
        }

        return arr2;
      }

      function _nonIterableRest() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }

      var MSEC_IN_HOUR = 60 * 60 * 1000; //convert our local date syntax a javascript UTC date

      var toUtc = function toUtc(dstChange, offset, year) {
        var _dstChange$split = dstChange.split('/'),
            _dstChange$split2 = _slicedToArray(_dstChange$split, 2),
            month = _dstChange$split2[0],
            rest = _dstChange$split2[1];

        var _rest$split = rest.split(':'),
            _rest$split2 = _slicedToArray(_rest$split, 2),
            day = _rest$split2[0],
            hour = _rest$split2[1];

        return Date.UTC(year, month - 1, day, hour) - offset * MSEC_IN_HOUR;
      }; // compare epoch with dst change events (in utc)


      var inSummerTime = function inSummerTime(epoch, start, end, summerOffset, winterOffset) {
        var year = new Date(epoch).getUTCFullYear();
        var startUtc = toUtc(start, winterOffset, year);
        var endUtc = toUtc(end, summerOffset, year); // console.log(epoch, endUtc)
        // simple number comparison now

        return epoch >= startUtc && epoch < endUtc;
      };

      var summerTime = inSummerTime; // it reproduces some things in ./index.js, but speeds up spacetime considerably

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
        var inSummer = summerTime(s.epoch, split[0], split[1], jul, dec);

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
        "8|s|03/08:01->10/04:00": "12/casey",
        "8|s": "2/kuala_lumpur,2/makassar,2/singapore,4/perth,4/west",
        "8|n|03/25:03->09/29:23": "2/ulan_bator",
        "8|n": "2/brunei,2/choibalsan,2/chongqing,2/chungking,2/harbin,2/hong_kong,2/irkutsk,2/kuching,2/macao,2/macau,2/manila,2/shanghai,2/taipei,2/ujung_pandang,2/ulaanbaatar",
        "8.75|s": "4/eucla",
        "7|s": "12/davis,2/jakarta,9/christmas",
        "7|n": "2/bangkok,2/barnaul,2/ho_chi_minh,2/hovd,2/krasnoyarsk,2/novokuznetsk,2/novosibirsk,2/phnom_penh,2/pontianak,2/saigon,2/tomsk,2/vientiane",
        "6|s": "12/vostok",
        "6|n": "2/almaty,2/bishkek,2/dacca,2/dhaka,2/kashgar,2/omsk,2/qyzylorda,2/qostanay,2/thimbu,2/thimphu,2/urumqi,9/chagos",
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
        "3|n|03/28:00->10/24:01": "2/gaza,2/hebron",
        "3|n|03/27:02->10/25:02": "2/jerusalem,2/tel_aviv",
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
        "12|s|01/12:03->12/20:02": "11/fiji",
        "12|n": "2/anadyr,2/kamchatka,2/srednekolymsk,11/funafuti,11/kwajalein,11/majuro,11/nauru,11/tarawa,11/wake,11/wallis",
        "12.75|s|04/05:03->04/05:02": "11/chatham",
        "11|s|04/05:03->10/04:02": "12/macquarie",
        "11|s": "11/bougainville",
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
        "-7|n|03/08:02->11/01:02": "1/ensenada,1/los_angeles,1/santa_isabel,1/tijuana,1/vancouver,6/pacific,10/bajanorte",
        "-7|n|03/08:02->11/01:01": "1/dawson,1/whitehorse,6/yukon",
        "-7|n": "1/creston,1/dawson_creek,1/fort_nelson,1/hermosillo,1/phoenix",
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
        "-3|n|03/28:22->10/24:23": "1/nuuk",
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

      function createCommonjsModule(fn, module) {
        return module = {
          exports: {}
        }, fn(module, module.exports), module.exports;
      }

      function getCjsExportFromNamespace(n) {
        return n && n['default'] || n;
      }

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
        hem: 'n' //default to northern hemisphere - (sorry!)

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
      }

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

        if (num >= -13 && num <= 13) {
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

        if (typeof str !== 'string') {
          console.error("Timezone must be a string - recieved: '", str, "'\n");
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


        if (offset === 'Z' || offset === 'z') {
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

          if (arr[4] > 999) {
            // fix overflow issue with milliseconds, if input is longer than standard (e.g. 2017-08-06T09:00:00.123456Z)
            arr[4] = parseInt("".concat(arr[4]).substring(0, 3), 10);
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

        exports.isBoolean = function (input) {
          return Object.prototype.toString.call(input) === '[object Boolean]';
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

          if (str === 'day' || str === 'days') {
            return 'date';
          }

          if (str === 'min' || str === 'mins') {
            return 'minute';
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
          var sign = offset > 0 ? '+' : '-';
          var absOffset = Math.abs(offset);
          var hours = exports.zeroPad(parseInt('' + absOffset, 10));
          var minutes = exports.zeroPad(absOffset % 1 * 60);
          return "".concat(sign).concat(hours).concat(delimiter).concat(minutes);
        };
      });
      var fns_1 = fns.isLeapYear;
      var fns_2 = fns.isDate;
      var fns_3 = fns.isArray;
      var fns_4 = fns.isObject;
      var fns_5 = fns.isBoolean;
      var fns_6 = fns.zeroPad;
      var fns_7 = fns.titleCase;
      var fns_8 = fns.ordinal;
      var fns_9 = fns.toCardinal;
      var fns_10 = fns.normalize;
      var fns_11 = fns.getEpoch;
      var fns_12 = fns.beADate;
      var fns_13 = fns.formatTimezone;
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
        reg: /^(\-?0?0?[0-9]{3,4})-([0-9]{1,2})-([0-9]{1,2})[T| ]([0-9.:]+)(Z|[0-9\-\+:]+)?$/i,
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
        reg: /^([0-9]{4})[\-\/.]([0-9]{1,2})[\-\/.]([0-9]{1,2}),?( [0-9]{1,2}:[0-9]{2}:?[0-9]{0,2}? ?(am|pm|gmt))?$/i,
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
        reg: /^([0-9]{1,2})[\-\/.]([0-9]{1,2})[\-\/.]?([0-9]{4})?,?( [0-9]{1,2}:[0-9]{2}:?[0-9]{0,2}? ?(am|pm|gmt))?$/i,
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
      }, // '2012-06' last attempt at iso-like format
      {
        reg: /^([0-9]{4})[\-\/]([0-9]{2})$/i,
        parse: function parse(s, arr, givenTz, options) {
          var month = parseInt(arr[2], 10) - 1;
          var obj = {
            year: arr[1],
            month: month,
            date: 1
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
      }, //alt short format - "feb-25-2015"
      {
        reg: /^([a-z]+)[\-\/]([0-9]{1,2})[\-\/]?([0-9]{4})?$/i,
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
        // 'q2 2002'
        reg: /^(q[0-9])( of)?( [0-9]{4})?/i,
        parse: function parse(s, arr) {
          var quarter = arr[1] || '';
          s = s.quarter(quarter);
          var year = arr[3] || '';

          if (year) {
            year = year.trim();
            s = s.year(year);
          }

          return s;
        }
      }, {
        // 'summer 2002'
        reg: /^(spring|summer|winter|fall|autumn)( of)?( [0-9]{4})?/i,
        parse: function parse(s, arr) {
          var season = arr[1] || '';
          s = s.season(season);
          var year = arr[3] || '';

          if (year) {
            year = year.trim();
            s = s.year(year);
          }

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
        if (arr.length === 0) {
          return s;
        }

        var order = ['year', 'month', 'date', 'hour', 'minute', 'second', 'millisecond'];

        for (var i = 0; i < order.length; i++) {
          var num = arr[i] || today[order[i]] || defaults[order[i]] || 0;
          s = s[order[i]](num);
        }

        return s;
      }; //support {year:2016, month:3} format


      var handleObject = function handleObject(s, obj, today) {
        // if obj is empty, do nothing
        if (Object.keys(obj).length === 0) {
          return s;
        }

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
            // console.log(strFmt[i].reg)
            var _res = strParse[i].parse(s, m, givenTz);

            if (_res !== null && _res.isValid()) {
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
        },
        aliases: {
          tues: 2,
          thur: 4,
          thurs: 4
        }
      };
      var titleCaseEnabled = true;
      var caseFormat = {
        useTitleCase: function useTitleCase() {
          return titleCaseEnabled;
        },
        set: function set(useTitleCase) {
          titleCaseEnabled = useTitleCase;
        }
      }; // it's kind of nuts how involved this is
      // "+01:00", "+0100", or simply "+01"

      var isoOffset = function isoOffset(s) {
        var offset = s.timezone().current.offset;
        return !offset ? 'Z' : fns.formatTimezone(offset, ':');
      };

      var _offset = isoOffset;

      var applyCaseFormat = function applyCaseFormat(str) {
        if (caseFormat.useTitleCase()) {
          return fns.titleCase(str);
        }

        return str;
      };

      var format = {
        day: function day(s) {
          return applyCaseFormat(s.dayName());
        },
        'day-short': function dayShort(s) {
          return applyCaseFormat(days["short"]()[s.day()]);
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
          return applyCaseFormat(s.monthName());
        },
        'month-short': function monthShort(s) {
          return applyCaseFormat(months["short"]()[s.month()]);
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
          return "".concat(days["short"]()[s.day()], " ").concat(applyCaseFormat(months["short"]()[s.month()]), " ").concat(fns.ordinal(s.date()));
        },
        'nice-full': function niceFull(s) {
          return "".concat(s.dayName(), " ").concat(applyCaseFormat(s.monthName()), " ").concat(fns.ordinal(s.date()), ", ").concat(s.time());
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
              out = applyCaseFormat(out);
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
      addAlias('V', 'Z', 4); // support unix-style escaping with ' character

      var escapeChars = function escapeChars(arr) {
        for (var i = 0; i < arr.length; i += 1) {
          if (arr[i] === "'") {
            // greedy-search for next apostrophe
            for (var o = i + 1; o < arr.length; o += 1) {
              if (arr[o]) {
                arr[i] += arr[o];
              }

              if (arr[o] === "'") {
                arr[o] = null;
                break;
              }

              arr[o] = null;
            }
          }
        }

        return arr.filter(function (ch) {
          return ch;
        });
      }; //combine consecutive chars, like 'yyyy' as one.


      var combineRepeated = function combineRepeated(arr) {
        for (var i = 0; i < arr.length; i += 1) {
          var c = arr[i]; // greedy-forward

          for (var o = i + 1; o < arr.length; o += 1) {
            if (arr[o] === c) {
              arr[i] += arr[o];
              arr[o] = null;
            } else {
              break;
            }
          }
        } // '' means one apostrophe


        arr = arr.filter(function (ch) {
          return ch;
        });
        arr = arr.map(function (str) {
          if (str === "''") {
            str = "'";
          }

          return str;
        });
        return arr;
      };

      var unixFmt = function unixFmt(s, str) {
        var arr = str.split(''); // support character escaping

        arr = escapeChars(arr); //combine 'yyyy' as string.

        arr = combineRepeated(arr);
        return arr.reduce(function (txt, c) {
          if (mapping[c] !== undefined) {
            txt += mapping[c](s) || '';
          } else {
            // 'unescape'
            if (/^'.{1,}'$/.test(c)) {
              c = c.replace(/'/g, '');
            }

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

      var seasons = {
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

          for (var i = 0; i < seasons[hem].length; i++) {
            if (seasons[hem][i][0] === current) {
              //winter goes between years
              var year = s.year();

              if (current === 'winter' && s.month() < 3) {
                year -= 1;
              }

              walk_1(s, {
                year: year,
                month: seasons[hem][i][1],
                date: seasons[hem][i][2],
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
          s = units$2[unit](s); // startof

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
        } else if (summerTime(s.epoch, result.change.start, result.change.back, summer, winter) === true) {
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

      var methods = {
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

      methods.inDST = methods.isDST;
      methods.round = methods.nearest;
      methods.each = methods.every;
      var methods_1 = methods; //these methods wrap around them.

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
          s.epoch -= shift; // oops, did we change the day?

          if (s.date() !== old.date()) {
            s = old.clone();

            if (diff > 1) {
              diff -= 1;
            }

            if (diff < 1) {
              diff += 1;
            }

            shift = diff * milliseconds.hour;
            s.epoch -= shift;
          }

          walk_1(s, {
            hour: n
          });
          confirm(s, old, 'minute');
          return s.epoch;
        },
        //support setting time by '4:25pm' - this isn't very-well developed..
        time: function time(s, str) {
          var m = str.match(/([0-9]{1,2})[:h]([0-9]{1,2})(:[0-9]{1,2})? ?(am|pm)?/);

          if (!m) {
            //fallback to support just '2am'
            m = str.match(/([0-9]{1,2}) ?(am|pm)/);

            if (!m) {
              return s.epoch;
            }

            m.splice(2, 0, '0'); //add implicit 0 minutes

            m.splice(3, 0, ''); //add implicit seconds
          }

          var h24 = false;
          var hour = parseInt(m[1], 10);
          var minute = parseInt(m[2], 10);

          if (hour > 12) {
            h24 = true;
          } //make the hour into proper 24h time


          if (h24 === false) {
            if (m[4] === 'am' && hour === 12) {
              //12am is midnight
              hour = 0;
            }

            if (m[4] === 'pm' && hour < 12) {
              //12pm is noon
              hour += 12;
            }
          } // handle seconds


          m[3] = m[3] || '';
          m[3] = m[3].replace(/:/, '');
          var sec = parseInt(m[3], 10) || 0;
          s = s.hour(hour);
          s = s.minute(minute);
          s = s.second(sec);
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
          // support '97
          if (typeof n === 'string' && /^'[0-9]{2}$/.test(n)) {
            n = n.replace(/'/, '').trim();
            n = Number(n); // '89 is 1989

            if (n > 30) {
              //change this in 10y
              n = 1900 + n;
            } else {
              // '12 is 2012
              n = 2000 + n;
            }
          }

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
      var methods$1 = {
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
            str = str.toLowerCase().trim();
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
      var _01Time = methods$1;
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

            if (days.aliases.hasOwnProperty(input)) {
              want = days.aliases[input];
            } else {
              want = days["short"]().indexOf(input);

              if (want === -1) {
                want = days["long"]().indexOf(input);
              }
            }
          } //move approx


          var day = this.d.getDay();
          var diff = day - want;
          var s = this.subtract(diff, 'days'); //tighten it back up

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
            s = clearMinutes(s); //first week starts first Thurs in Jan
            // so mon dec 28th is 1st week
            // so mon dec 29th is not the week

            if (s.monthName() === 'december' && s.date() >= 28) {
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

          if (tmp.monthName() === 'december' && tmp.date() >= 28) {
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

            for (var i = 0; i < seasons[hem].length; i++) {
              if (input === seasons[hem][i][0]) {
                s = s.month(seasons[hem][i][1]);
                s = s.date(1);
                s = s.startOf('day');
              }
            }

            return s;
          }

          var month = this.d.getMonth();

          for (var _i = 0; _i < seasons[hem].length - 1; _i++) {
            if (month >= seasons[hem][_i][1] && month < seasons[hem][_i + 1][1]) {
              return seasons[hem][_i][0];
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
          unit = fns.normalize(unit); // support 'fortnight' alias

          if (unit === 'fortnight') {
            num *= 2;
            unit = 'week';
          } //move forward by the estimated milliseconds (rough)


          if (milliseconds[unit]) {
            s.epoch += milliseconds[unit] * num;
          } else if (unit === 'week') {
            s.epoch += milliseconds.day * (num * 7);
          } else if (unit === 'quarter' || unit === 'season') {
            s.epoch += milliseconds.month * (num * 3.1); //go a little too-far
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
            else if (unit === 'year') {
                var wantYear = old.year() + num;
                var haveYear = s.year();

                if (haveYear < wantYear) {
                  s.epoch += milliseconds.day;
                } else if (haveYear > wantYear) {
                  s.epoch += milliseconds.day;
                }
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
          var tzAware = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
          var a = this;

          if (!unit) {
            return null;
          }

          if (typeof b === 'string' || typeof b === 'number') {
            b = new SpaceTime(b, this.timezone.name);
          } //support 'seconds' aswell as 'second'


          unit = unit.replace(/s$/, ''); // make them the same timezone for proper comparison

          if (tzAware === true && a.tz !== b.tz) {
            b = b.clone();
            b.tz = a.tz;
          }

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
            } // change the the display style of the month / day names


            if (fns.isBoolean(data.useTitleCase)) {
              caseFormat.set(data.useTitleCase);
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
      var _version = '6.12.2';

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
      return src;
    });
  });

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

  var iana = spacetime().timezones;
  var formal = Object.keys(iana).reduce(function (h, k) {
    h[k] = k;
    return h;
  }, {});

  var _timezones = Object.assign({}, informal, formal);

  var dates = ['weekday', 'summer', 'winter', 'autumn', 'some day', 'one day', 'all day', 'some point', 'eod', 'eom', 'eoy', 'standard time', 'daylight time', 'tommorrow'];

  var durations = ['centuries', 'century', 'day', 'days', 'decade', 'decades', 'hour', 'hours', 'hr', 'hrs', 'millisecond', 'milliseconds', 'minute', 'minutes', 'min', 'mins', 'month', 'months', 'seconds', 'sec', 'secs', 'week end', 'week ends', 'weekend', 'weekends', 'week', 'weeks', 'wk', 'wks', 'year', 'years', 'yr', 'yrs', 'quarter', 'quarters', 'qtr', 'qtrs', 'season', 'seasons'];

  var holidays = ['all hallows eve', 'all saints day', 'all sts day', 'april fools', 'armistice day', 'australia day', 'bastille day', 'boxing day', 'canada day', 'christmas eve', 'christmas', 'cinco de mayo', 'day of the dead', 'dia de muertos', 'dieciseis de septiembre', 'emancipation day', 'grito de dolores', 'groundhog day', 'halloween', 'harvey milk day', 'inauguration day', 'independence day', 'independents day', 'juneteenth', 'labour day', 'national freedom day', 'national nurses day', 'new years eve', 'new years', 'purple heart day', 'rememberance day', 'rosa parks day', 'saint andrews day', 'saint patricks day', 'saint stephens day', 'saint valentines day', 'st andrews day', 'st patricks day', 'st stephens day', 'st valentines day ', 'valentines day', 'valentines', 'veterans day', 'victoria day', 'womens equality day', 'xmas', // Fixed religious and cultural holidays
  // Catholic + Christian
  'epiphany', 'orthodox christmas day', 'orthodox new year', 'assumption of mary', 'all souls day', 'feast of the immaculate conception', 'feast of our lady of guadalupe', // Kwanzaa
  'kwanzaa', // Pagan / metal 🤘
  'imbolc', 'beltaine', 'lughnassadh', 'samhain', 'martin luther king day', 'mlk day', 'presidents day', 'mardi gras', 'tax day', 'commonwealth day', 'mothers day', 'memorial day', 'fathers day', 'columbus day', 'indigenous peoples day', 'canadian thanksgiving', 'election day', 'thanksgiving', 't-day', 'turkey day', 'black friday', 'cyber monday', // Astronomical religious and cultural holidays
  'ash wednesday', 'palm sunday', 'maundy thursday', 'good friday', 'holy saturday', 'easter', 'easter sunday', 'easter monday', 'orthodox good friday', 'orthodox holy saturday', 'orthodox easter', 'orthodox easter monday', 'ascension day', 'pentecost', 'whitsunday', 'whit sunday', 'whit monday', 'trinity sunday', 'corpus christi', 'advent', // Jewish
  'tu bishvat', 'tu bshevat', 'purim', 'passover', 'yom hashoah', 'lag baomer', 'shavuot', 'tisha bav', 'rosh hashana', 'yom kippur', 'sukkot', 'shmini atzeret', 'simchat torah', 'chanukah', 'hanukkah', // Muslim
  'isra and miraj', 'lailat al-qadr', 'eid al-fitr', 'id al-Fitr', 'eid ul-Fitr', 'ramadan', 'eid al-adha', 'muharram', 'the prophets birthday', 'ostara', 'march equinox', 'vernal equinox', 'litha', 'june solistice', 'summer solistice', 'mabon', 'september equinox', 'fall equinox', 'autumnal equinox', 'yule', 'december solstice', 'winter solstice', // Additional important holidays
  'chinese new year', 'diwali'];

  var times = ['noon', 'midnight', 'now', 'morning', 'tonight', 'evening', 'afternoon', 'night', 'breakfast time', 'lunchtime', 'dinnertime', 'sometime', 'midday', 'eod', 'oclock', 'oclock', 'all day', 'at night'];

  var data = [[dates, '#Date'], [durations, '#Duration'], [holidays, '#Holiday'], [times, '#Time'], [Object.keys(_timezones), '#Timezone']];
  var lex = {
    'a couple': 'Value'
  };
  data.forEach(function (a) {
    for (var i = 0; i < a[0].length; i++) {
      lex[a[0][i]] = a[1];
    }
  });
  var words = lex;

  var knownUnits = {
    second: true,
    minute: true,
    hour: true,
    day: true,
    week: true,
    weekend: true,
    month: true,
    season: true,
    quarter: true,
    year: true
  };
  var aliases = {
    wk: 'week',
    min: 'minute',
    sec: 'second',
    weekend: 'week' //for now...

  };

  var parseUnit = function parseUnit(m) {
    var unit = m.match('#Duration').text('normal');
    unit = unit.replace(/s$/, ''); // support shorthands like 'min'

    if (aliases.hasOwnProperty(unit)) {
      unit = aliases[unit];
    }

    return unit;
  }; //turn '5 weeks before' to {weeks:5}


  var parseShift = function parseShift(doc) {
    var result = {};
    var shift = doc.match('#DateShift+');

    if (shift.found === false) {
      return result;
    } // '5 weeks'


    shift.match('#Cardinal #Duration').forEach(function (ts) {
      var num = ts.match('#Cardinal').text('normal');
      num = parseFloat(num);

      if (num && typeof num === 'number') {
        var unit = parseUnit(ts);

        if (knownUnits[unit] === true) {
          result[unit] = num;
        }
      }
    }); //is it 2 weeks ago?  → -2

    if (shift.has('(before|ago|hence|back)$') === true) {
      Object.keys(result).forEach(function (k) {
        return result[k] *= -1;
      });
    }

    shift.remove('#Cardinal #Duration'); // supoprt '1 day after tomorrow'

    var m = shift.match('[<unit>#Duration] [<dir>(after|before)]');

    if (m.found) {
      var unit = m.groups('unit').text('reduced'); // unit = unit.replace(/s$/, '')

      var dir = m.groups('dir').text('reduced');

      if (dir === 'after') {
        result[unit] = 1;
      } else if (dir === 'before') {
        result[unit] = -1;
      }
    } // in half an hour


    m = shift.match('half (a|an) [#Duration]', 0);

    if (m.found) {
      var _unit = parseUnit(m);

      result[_unit] = 0.5;
    } // finally, remove it from our text


    doc.remove('#DateShift');
    return result;
  };

  var _01Shift = parseShift;

  /*
  a 'counter' is a Unit determined after a point
    * first hour of x
    * 7th week in x
    * last year in x
    * 
  unlike a shift, like "2 weeks after x"
  */
  var oneBased = {
    minute: true
  };

  var getCounter = function getCounter(doc) {
    // 7th week of
    var m = doc.match('[<num>#Value] [<unit>#Duration+] (of|in)');

    if (m.found) {
      var obj = m.groups();
      var num = obj.num.text('reduced');
      var unit = obj.unit.text('reduced');
      var found = {
        unit: unit,
        num: Number(num) || 0
      }; // 0-based or 1-based units

      if (!oneBased[unit]) {
        found.num -= 1;
      }

      doc = doc.remove(m);
      return found;
    } // first week of


    m = doc.match('[<dir>(first|initial|last|final)] [<unit>#Duration+] (of|in)');

    if (m.found) {
      var _obj = m.groups();

      var dir = _obj.dir.text('reduced');

      var _unit = _obj.unit.text('reduced');

      if (dir === 'initial') {
        dir = 'first';
      }

      if (dir === 'final') {
        dir = 'last';
      }

      var _found = {
        unit: _unit,
        dir: dir
      };
      doc = doc.remove(m);
      return _found;
    }

    return {};
  };

  var _02Counter = getCounter;

  var hardCoded = {
    daybreak: '7:00am',
    //ergh
    breakfast: '8:00am',
    morning: '9:00am',
    noon: '12:00pm',
    midday: '12:00pm',
    afternoon: '2:00pm',
    lunchtime: '12:00pm',
    evening: '6:00pm',
    dinnertime: '6:00pm',
    night: '8:00pm',
    eod: '10:00pm',
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
    s = s.startOf('hour'); // assume 'half past 5' is 5pm

    if (hour < 6) {
      s = s.ampm('pm');
    }

    if (behind) {
      s = s.subtract(mins, 'minutes');
    } else {
      s = s.add(mins, 'minutes');
    }

    return s;
  };

  var parseTime = function parseTime(doc, context) {
    var time = doc.match('(at|by|for|before|this)? #Time+');

    if (time.found) {
      doc.remove(time);
    } // get the main part of the time


    time = time.not('^(at|by|for|before|this)');
    time = time.not('sharp');
    time = time.not('on the dot');
    var s = spacetime.now(context.timezone);
    var now = s.clone(); // check for known-times (like 'today')

    var timeStr = time.text('reduced');

    if (hardCoded.hasOwnProperty(timeStr)) {
      return hardCoded[timeStr];
    } // '5 oclock'


    var m = time.match('^#Cardinal oclock (am|pm)?');

    if (m.found) {
      m = m.not('oclock');
      s = s.hour(m.text('reduced'));
      s = s.startOf('hour');

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
    } // '4 in the evening'


    m = time.match('[<time>#Time] (in|at) the? [<desc>(morning|evening|night|nighttime)]');

    if (m.found) {
      var _str = m.groups('time').text('reduced');

      if (/^[0-9]{1,2}$/.test(_str)) {
        s = s.hour(_str); //3 in the morning
      } else {
        s = s.time(_str); // 3:30 in the morning
      }

      if (s.isValid() && !s.isEqual(now)) {
        var desc = m.groups('desc').text('reduced');

        if (desc === 'evening' || desc === 'night') {
          s = s.ampm('pm');
        }

        return s.time();
      }
    } // 'this morning at 4'


    m = time.match('this? [<desc>(morning|evening|tonight)] at [<time>(#Cardinal|#Time)]');

    if (m.found) {
      var g = m.groups();

      var _str2 = g.time.text('reduced');

      if (/^[0-9]{1,2}$/.test(_str2)) {
        s = s.hour(_str2); //3

        s = s.startOf('hour');
      } else {
        s = s.time(_str2); // 3:30
      }

      if (s.isValid() && !s.isEqual(now)) {
        var _desc = g.desc.text('reduced');

        if (_desc === 'morning') {
          s = s.ampm('am');
        }

        if (_desc === 'evening' || _desc === 'tonight') {
          s = s.ampm('pm');
        }

        return s.time();
      }
    } // 'at 4' -> '4'


    m = time.match('^#Cardinal$');

    if (m.found) {
      s = s.hour(m.text('reduced'));
      s = s.startOf('hour');

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

  var _03Time = parseTime;

  // interpret 'this halloween' or 'next june'
  var parseRelative = function parseRelative(doc) {
    // avoid parsing 'last month of 2019'
    // if (doc.has('^(this|current|next|upcoming|last|previous) #Duration')) {
    //   return null
    // }
    // parse 'this evening'
    // let m = doc.match('^(next|last|this)$')
    // if (m.found) {
    //   doc.remove(m)
    //   return doc.text('reduced')
    // }
    // but avoid parsing 'day after next'
    if (doc.has('(next|last|this)$')) {
      return null;
    }

    var rel = null;
    var m = doc.match('^this? (next|upcoming|coming)');

    if (m.found) {
      rel = 'next';
      doc.remove(m);
    }

    m = doc.match('^this? (last|previous)');

    if (m.found) {
      rel = 'last';
      doc.remove(m);
    }

    m = doc.match('^(this|current)');

    if (m.found) {
      rel = 'this';
      doc.remove(m);
    } // finally, remove it from our text
    // doc.remove('^(this|current|next|upcoming|last|previous)')


    return rel;
  };

  var _04Relative = parseRelative;

  // 'start of october', 'middle of june 1st'
  var parseSection = function parseSection(doc) {
    // start of 2019
    var m = doc.match('[(start|beginning) of] .', 0);

    if (m.found) {
      doc.remove(m);
      return 'start';
    } // end of 2019


    m = doc.match('[end of] .', 0);

    if (m.found) {
      doc.remove(m);
      return 'end';
    } // middle of 2019


    m = doc.match('[(middle|midpoint|center) of] .', 0);

    if (m.found) {
      doc.remove(m);
      return 'middle';
    }

    return null;
  };

  var _05Section = parseSection;

  var isOffset = /(\-?[0-9]+)h(rs)?/i;
  var isNumber = /(\-?[0-9]+)/;
  var utcOffset = /utc([\-+]?[0-9]+)/i;
  var gmtOffset = /gmt([\-+]?[0-9]+)/i;

  var toIana = function toIana(num) {
    num = Number(num);

    if (num > -13 && num < 13) {
      num = num * -1; //it's opposite!

      num = (num > 0 ? '+' : '') + num; //add plus sign

      return 'Etc/GMT' + num;
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

  var parseTimezone = function parseTimezone(doc) {
    var m = doc.match('#Timezone+'); //remove prepositions

    m = m.remove('(in|for|by|near|at)');
    var str = m.text('reduced'); // remove it from our doc, either way

    doc.remove('#Timezone+'); // check our list of informal tz names

    if (_timezones.hasOwnProperty(str)) {
      return _timezones[str];
    }

    var tz = parseOffset(str);

    if (tz) {
      return tz;
    }

    return null;
  };

  var _06Timezone = parseTimezone;

  var Unit = /*#__PURE__*/function () {
    function Unit(input, unit, context, keepTime) {
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


      var d = spacetime(input, context.timezone, {
        today: today
      }); // set to beginning
      // if (d.isValid() && keepTime !== true) {
      //   d = d.startOf(this.unit)
      // }

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
        Object.keys(obj).forEach(function (unit) {
          _this.d = _this.d.add(obj[unit], unit);
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
      key: "applyRel",
      value: function applyRel(rel) {
        if (rel === 'next') {
          return this.next();
        }

        if (rel === 'last') {
          return this.last();
        }

        return this;
      }
    }, {
      key: "applySection",
      value: function applySection(section) {
        if (section === 'start') {
          return this.start();
        }

        if (section === 'end') {
          return this.end();
        }

        if (section === 'middle') {
          return this.middle();
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
      }
    }, {
      key: "middle",
      value: function middle() {
        var diff = this.d.diff(this.d.endOf(this.unit));
        var minutes = Math.round(diff.minutes / 2);
        this.d = this.d.add(minutes, 'minutes');
        return this;
      } // the millescond before

    }, {
      key: "before",
      value: function before() {
        this.d = this.d.minus(1, this.unit);
        this.d = this.d.endOf(this.unit);
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

      if (_this.d.isValid()) {
        _this.d = _this.d.startOf('day');
      }

      return _this;
    }

    return Day;
  }(Unit_1); // like 'feb 2'


  var CalendarDate = /*#__PURE__*/function (_Day) {
    _inherits(CalendarDate, _Day);

    var _super2 = _createSuper(CalendarDate);

    function CalendarDate(input, unit, context) {
      var _this2;

      _classCallCheck(this, CalendarDate);

      _this2 = _super2.call(this, input, unit, context);
      _this2.unit = 'day';

      if (_this2.d.isValid()) {
        _this2.d = _this2.d.startOf('day');
      }

      return _this2;
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
  }(Day);

  var WeekDay = /*#__PURE__*/function (_Day2) {
    _inherits(WeekDay, _Day2);

    var _super3 = _createSuper(WeekDay);

    function WeekDay(input, unit, context) {
      var _this3;

      _classCallCheck(this, WeekDay);

      _this3 = _super3.call(this, input, unit, context);
      _this3.unit = 'week'; // is the input just a weekday?

      if (typeof input === 'string') {
        _this3.d = spacetime(context.today, context.timezone);
        _this3.d = _this3.d.day(input); // assume a wednesday in the future

        if (_this3.d.isBefore(context.today)) {
          _this3.d = _this3.d.add(7, 'days');
        }
      } else {
        _this3.d = input;
      }

      _this3.weekDay = _this3.d.dayName();

      if (_this3.d.isValid()) {
        _this3.d = _this3.d.startOf('day');
      }

      return _this3;
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
  }(Day); // like 'haloween'


  var Holiday = /*#__PURE__*/function (_CalendarDate) {
    _inherits(Holiday, _CalendarDate);

    var _super4 = _createSuper(Holiday);

    function Holiday(input, unit, context) {
      var _this4;

      _classCallCheck(this, Holiday);

      _this4 = _super4.call(this, input, unit, context);
      _this4.unit = 'day';

      if (_this4.d.isValid()) {
        _this4.d = _this4.d.startOf('day');
      }

      return _this4;
    }

    return Holiday;
  }(CalendarDate);

  var _day = {
    Day: Day,
    WeekDay: WeekDay,
    CalendarDate: CalendarDate,
    Holiday: Holiday
  };

  var AnyMonth = /*#__PURE__*/function (_Unit) {
    _inherits(AnyMonth, _Unit);

    var _super = _createSuper(AnyMonth);

    function AnyMonth(input, unit, context) {
      var _this;

      _classCallCheck(this, AnyMonth);

      _this = _super.call(this, input, unit, context);
      _this.unit = 'month'; // set to beginning

      if (_this.d.isValid()) {
        _this.d = _this.d.startOf(_this.unit);
      }

      return _this;
    }

    return AnyMonth;
  }(Unit_1); // a specific month, like 'March'


  var Month = /*#__PURE__*/function (_Unit2) {
    _inherits(Month, _Unit2);

    var _super2 = _createSuper(Month);

    function Month(input, unit, context) {
      var _this2;

      _classCallCheck(this, Month);

      _this2 = _super2.call(this, input, unit, context);
      _this2.unit = 'month'; // set to beginning

      if (_this2.d.isValid()) {
        _this2.d = _this2.d.startOf(_this2.unit);
      }

      return _this2;
    }

    _createClass(Month, [{
      key: "next",
      value: function next() {
        this.d = this.d.add(1, 'year');
        this.d = this.d.startOf('month');
        return this;
      }
    }, {
      key: "last",
      value: function last() {
        this.d = this.d.minus(1, 'year');
        this.d = this.d.startOf('month');
        return this;
      }
    }]);

    return Month;
  }(Unit_1);

  var AnyQuarter = /*#__PURE__*/function (_Unit3) {
    _inherits(AnyQuarter, _Unit3);

    var _super3 = _createSuper(AnyQuarter);

    function AnyQuarter(input, unit, context) {
      var _this3;

      _classCallCheck(this, AnyQuarter);

      _this3 = _super3.call(this, input, unit, context);
      _this3.unit = 'quarter'; // set to beginning

      if (_this3.d.isValid()) {
        _this3.d = _this3.d.startOf(_this3.unit);
      }

      return _this3;
    }

    _createClass(AnyQuarter, [{
      key: "last",
      value: function last() {
        console.log(this.d.format());
        this.d = this.d.minus(1, 'quarter');
        console.log(this.d.format());
        this.d = this.d.startOf(this.unit);
        console.log(this.d.format());
        return this;
      }
    }]);

    return AnyQuarter;
  }(Unit_1);

  var Quarter = /*#__PURE__*/function (_Unit4) {
    _inherits(Quarter, _Unit4);

    var _super4 = _createSuper(Quarter);

    function Quarter(input, unit, context) {
      var _this4;

      _classCallCheck(this, Quarter);

      _this4 = _super4.call(this, input, unit, context);
      _this4.unit = 'quarter'; // set to beginning

      if (_this4.d.isValid()) {
        _this4.d = _this4.d.startOf(_this4.unit);
      }

      return _this4;
    }

    _createClass(Quarter, [{
      key: "next",
      value: function next() {
        this.d = this.d.add(1, 'year');
        this.d = this.d.startOf(this.unit);
        return this;
      }
    }, {
      key: "last",
      value: function last() {
        this.d = this.d.minus(1, 'year');
        this.d = this.d.startOf(this.unit);
        return this;
      }
    }]);

    return Quarter;
  }(Unit_1);

  var Season = /*#__PURE__*/function (_Unit5) {
    _inherits(Season, _Unit5);

    var _super5 = _createSuper(Season);

    function Season(input, unit, context) {
      var _this5;

      _classCallCheck(this, Season);

      _this5 = _super5.call(this, input, unit, context);
      _this5.unit = 'season'; // set to beginning

      if (_this5.d.isValid()) {
        _this5.d = _this5.d.startOf(_this5.unit);
      }

      return _this5;
    }

    _createClass(Season, [{
      key: "next",
      value: function next() {
        this.d = this.d.add(1, 'year');
        this.d = this.d.startOf(this.unit);
        return this;
      }
    }, {
      key: "last",
      value: function last() {
        this.d = this.d.minus(1, 'year');
        this.d = this.d.startOf(this.unit);
        return this;
      }
    }]);

    return Season;
  }(Unit_1);

  var Year = /*#__PURE__*/function (_Unit6) {
    _inherits(Year, _Unit6);

    var _super6 = _createSuper(Year);

    function Year(input, unit, context) {
      var _this6;

      _classCallCheck(this, Year);

      _this6 = _super6.call(this, input, unit, context);
      _this6.unit = 'year';

      if (_this6.d.isValid()) {
        _this6.d = _this6.d.startOf('year');
      }

      return _this6;
    }

    return Year;
  }(Unit_1);

  var _year = {
    AnyMonth: AnyMonth,
    Month: Month,
    Quarter: Quarter,
    AnyQuarter: AnyQuarter,
    Season: Season,
    Year: Year
  };

  var Week = /*#__PURE__*/function (_Unit) {
    _inherits(Week, _Unit);

    var _super = _createSuper(Week);

    function Week(input, unit, context) {
      var _this;

      _classCallCheck(this, Week);

      _this = _super.call(this, input, unit, context);
      _this.unit = 'week';

      if (_this.d.isValid()) {
        _this.d = _this.d.startOf('week');
      }

      return _this;
    }

    return Week;
  }(Unit_1); //may need some work


  var WeekEnd = /*#__PURE__*/function (_Unit2) {
    _inherits(WeekEnd, _Unit2);

    var _super2 = _createSuper(WeekEnd);

    function WeekEnd(input, unit, context) {
      var _this2;

      _classCallCheck(this, WeekEnd);

      _this2 = _super2.call(this, input, unit, context);
      _this2.unit = 'week';

      if (_this2.d.isValid()) {
        _this2.d = _this2.d.day('saturday');
        _this2.d = _this2.d.startOf('day');
      }

      return _this2;
    }

    _createClass(WeekEnd, [{
      key: "start",
      value: function start() {
        this.d = this.d.day('saturday').startOf('day');
        return this;
      } // end() {
      //   this.d = this.d.day('sunday').endOf('day')
      //   return this
      // }

    }, {
      key: "next",
      value: function next() {
        this.d = this.d.add(1, this.unit);
        this.d = this.d.startOf('weekend');
        return this;
      }
    }, {
      key: "last",
      value: function last() {
        this.d = this.d.minus(1, this.unit);
        this.d = this.d.startOf('weekend');
        return this;
      }
    }]);

    return WeekEnd;
  }(Unit_1);

  var _week = {
    Week: Week,
    WeekEnd: WeekEnd
  };

  var Hour = /*#__PURE__*/function (_Unit) {
    _inherits(Hour, _Unit);

    var _super = _createSuper(Hour);

    function Hour(input, unit, context) {
      var _this;

      _classCallCheck(this, Hour);

      _this = _super.call(this, input, unit, context, true);
      _this.unit = 'hour';

      if (_this.d.isValid()) {
        _this.d = _this.d.startOf('hour');
      }

      return _this;
    }

    return Hour;
  }(Unit_1);

  var Minute = /*#__PURE__*/function (_Unit2) {
    _inherits(Minute, _Unit2);

    var _super2 = _createSuper(Minute);

    function Minute(input, unit, context) {
      var _this2;

      _classCallCheck(this, Minute);

      _this2 = _super2.call(this, input, unit, context, true);
      _this2.unit = 'minute';

      if (_this2.d.isValid()) {
        _this2.d = _this2.d.startOf('minute');
      }

      return _this2;
    }

    return Minute;
  }(Unit_1);

  var Moment = /*#__PURE__*/function (_Unit3) {
    _inherits(Moment, _Unit3);

    var _super3 = _createSuper(Moment);

    function Moment(input, unit, context) {
      var _this3;

      _classCallCheck(this, Moment);

      _this3 = _super3.call(this, input, unit, context, true);
      _this3.unit = 'millisecond';
      return _this3;
    }

    return Moment;
  }(Unit_1);

  var _time = {
    Hour: Hour,
    Minute: Minute,
    Moment: Moment
  };

  var units = Object.assign({
    Unit: Unit_1
  }, _day, _year, _week, _time);

  var Day$1 = units.Day,
      Moment$1 = units.Moment,
      Hour$1 = units.Hour;
  var knownWord = {
    today: function today(context) {
      return new Day$1(context.today, null, context);
    },
    yesterday: function yesterday(context) {
      return new Day$1(context.today.minus(1, 'day'), null, context);
    },
    tomorrow: function tomorrow(context) {
      return new Day$1(context.today.plus(1, 'day'), null, context);
    },
    eom: function eom(context) {
      var d = context.today.endOf('month');
      d = d.startOf('day');
      return new Day$1(d, null, context);
    },
    // eod: (context) => {
    //   let d = context.today.endOf('day')
    //   d = d.startOf('hour').minus(4, 'hours') //rough
    //   return new Hour(d, null, context)
    // },
    eoy: function eoy(context) {
      var d = context.today.endOf('year');
      d = d.startOf('day');
      return new Day$1(d, null, context);
    }
  };
  knownWord.tommorrow = knownWord.tomorrow;
  knownWord.tmrw = knownWord.tomorrow;

  var today = function today(doc, context, section) {
    var unit = null; // is it empty?

    if (doc.found === false) {
      // do we have just a time?
      if (section.time !== null) {
        unit = new Moment$1(context.today, null, context); // choose today
      } //do we just have a shift?


      if (Object.keys(section.shift).length > 0) {
        if (section.shift.hour || section.shift.minute) {
          unit = new Moment$1(context.today, null, context); // choose now
        } else {
          unit = new Day$1(context.today, null, context); // choose today
        }
      }
    } // today, yesterday, tomorrow


    var str = doc.text('reduced');

    if (knownWord.hasOwnProperty(str) === true) {
      return knownWord[str](context);
    } // day after next


    if (str === 'next' && Object.keys(section.shift).length > 0) {
      return knownWord.tomorrow(context);
    }

    return unit;
  };

  var _01Today = today;

  var spacetimeHoliday = createCommonjsModule(function (module, exports) {
    (function (global, factory) {
       module.exports = factory(spacetime) ;
    })(commonjsGlobal, function (spacetime) {

      function _interopDefaultLegacy(e) {
        return e && _typeof(e) === 'object' && 'default' in e ? e : {
          'default': e
        };
      }

      var spacetime__default = /*#__PURE__*/_interopDefaultLegacy(spacetime); //yep,


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

      var fixedDates = function fixedDates(str, normal, year, tz) {
        if (fixedHolidays.hasOwnProperty(str) || fixedHolidays.hasOwnProperty(normal)) {
          var arr = fixedHolidays[str] || fixedHolidays[normal] || [];
          var s = spacetime__default['default'].now(tz);
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

      var fixedDates$1 = function fixedDates(str, normal, year, tz) {
        if (calendarHolidays.hasOwnProperty(str) || calendarHolidays.hasOwnProperty(normal)) {
          var arr = calendarHolidays[str] || calendarHolidays[normal] || [];
          var s = spacetime__default['default'].now(tz);
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

      var easterDates = function easterDates(str, normal, year, tz) {
        if (easterHolidays.hasOwnProperty(str) || easterHolidays.hasOwnProperty(normal)) {
          var days = easterHolidays[str] || easterHolidays[normal] || [];
          var date = calcEaster_1(year);

          if (!date) {
            return null; //no easter for this year
          }

          var e = spacetime__default['default'](date, tz);
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

      var astroDates = function astroDates(str, normal, year, tz) {
        if (astroHolidays.hasOwnProperty(str) || astroHolidays.hasOwnProperty(normal)) {
          var season = astroHolidays[str] || astroHolidays[normal];
          var seasons$1 = seasons(year);

          if (!season || !seasons$1 || !seasons$1[season]) {
            return null; // couldn't figure it out
          }

          var s = spacetime__default['default'](seasons$1[season], tz);

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

      var lunarDates = function lunarDates(str, normal, year, tz) {
        if (lunarHolidays.hasOwnProperty(str) || lunarHolidays.hasOwnProperty(normal)) {
          var date = lunarHolidays[str] || lunarHolidays[normal] || [];

          if (!date) {
            return null;
          } // start at 2018


          var s = spacetime__default['default'](date + ' 2018', tz);
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
      var nowYear = spacetime__default['default'].now().year();

      var spacetimeHoliday = function spacetimeHoliday(str, year, tz) {
        year = year || nowYear;
        str = str || '';
        str = String(str);
        str = str.trim().toLowerCase();
        str = str.replace(/'s/, 's'); // 'mother's day'

        var normal = str.replace(/ day$/, '');
        normal = normal.replace(/^the /, '');
        normal = normal.replace(/^orthodox /, ''); //orthodox good friday
        // try easier, unmoving holidays

        var s = _01FixedDates(str, normal, year, tz);

        if (s !== null) {
          return s;
        } // try 'nth monday' holidays


        s = _02NthWeekday(str, normal, year, tz);

        if (s !== null) {
          return s;
        } // easter-based holidays


        s = _03EasterDates(str, normal, year, tz);

        if (s !== null) {
          return s;
        } // solar-based holidays


        s = _04Astronomical(str, normal, year, tz);

        if (s !== null) {
          return s;
        } // mostly muslim holidays


        s = _05LunarDates(str, normal, year, tz);

        if (s !== null) {
          return s;
        }

        return null;
      };

      var src = spacetimeHoliday;
      return src;
    });
  });

  var Holiday$1 = units.Holiday;

  var parseHoliday = function parseHoliday(doc, context) {
    var unit = null;
    var m = doc.match('[<holiday>#Holiday+] [<year>#Year?]');
    var year = context.today.year();

    if (m.groups('year').found) {
      year = Number(m.groups('year').text('reduced')) || year;
    }

    var str = m.groups('holiday').text('reduced');
    var s = spacetimeHoliday(str, year, context.timezone);

    if (s !== null) {
      // assume the year in the future..
      if (s.isBefore(context.today) && year === context.today.year()) {
        s = spacetimeHoliday(str, year + 1, context.timezone);
      }

      unit = new Holiday$1(s, null, context);
    }

    return unit;
  };

  var _02Holidays = parseHoliday;

  var Week$1 = units.Week,
      WeekEnd$1 = units.WeekEnd,
      AnyMonth$1 = units.AnyMonth,
      AnyQuarter$1 = units.AnyQuarter,
      Year$1 = units.Year,
      Season$1 = units.Season,
      WeekDay$1 = units.WeekDay,
      Day$2 = units.Day,
      Hour$2 = units.Hour,
      Minute$1 = units.Minute,
      Moment$2 = units.Moment;
  var mapping = {
    day: Day$2,
    hour: Hour$2,
    evening: Hour$2,
    second: Moment$2,
    milliscond: Moment$2,
    instant: Moment$2,
    minute: Minute$1,
    week: Week$1,
    weekend: WeekEnd$1,
    month: AnyMonth$1,
    quarter: AnyQuarter$1,
    year: Year$1,
    season: Season$1,
    // set aliases
    yr: Year$1,
    qtr: AnyQuarter$1,
    wk: Week$1,
    sec: Moment$2,
    hr: Hour$2
  };
  var matchStr = "^(".concat(Object.keys(mapping).join('|'), ")$"); // when a unit of time is spoken of as 'this month' - instead of 'february'

  var nextLast = function nextLast(doc, context) {
    //this month, last quarter, next year
    var m = doc.match(matchStr);

    if (m.found === true) {
      var str = m.text('reduced');

      if (mapping.hasOwnProperty(str)) {
        var Model = mapping[str];

        if (!Model) {
          return null;
        }

        var unit = new Model(null, str, context);
        return unit;
      }
    } //try this version - 'next friday, last thursday'


    m = doc.match('^#WeekDay$');

    if (m.found === true) {
      var _str = m.text('reduced');

      var _unit = new WeekDay$1(_str, null, context);

      return _unit;
    }

    return null;
  };

  var _03NextLast = nextLast;

  var Quarter$1 = units.Quarter,
      Season$2 = units.Season,
      Year$2 = units.Year;

  var fmtToday = function fmtToday(context) {
    return {
      date: context.today.date(),
      month: context.today.month(),
      year: context.today.year()
    };
  };

  var parseYearly = function parseYearly(doc, context) {
    // support 'summer 2002'
    var m = doc.match('(spring|summer|winter|fall|autumn) [<year>#Year?]');

    if (m.found) {
      var str = doc.text('reduced');
      var s = spacetime(str, context.timezone, {
        today: fmtToday(context)
      });
      var unit = new Season$2(s, null, context);

      if (unit.d.isValid() === true) {
        return unit;
      }
    } // support 'q4 2020'


    m = doc.match('[<q>#FinancialQuarter] [<year>#Year?]');

    if (m.found) {
      var _str = m.groups('q').text('reduced');

      var _s = spacetime(_str, context.timezone, {
        today: fmtToday(context)
      });

      if (m.groups('year')) {
        var year = Number(m.groups('year').text()) || context.today.year();
        _s = _s.year(year);
      }

      var _unit = new Quarter$1(_s, null, context);

      if (_unit.d.isValid() === true) {
        return _unit;
      }
    } // support '4th quarter 2020'


    m = doc.match('[<q>#Value] quarter (of|in)? [<year>#Year?]');

    if (m.found) {
      var q = m.groups('q').text('reduced');

      var _s2 = spacetime("q".concat(q), context.timezone, {
        today: fmtToday(context)
      });

      if (m.groups('year')) {
        var _year = Number(m.groups('year').text()) || context.today.year();

        _s2 = _s2.year(_year);
      }

      var _unit2 = new Quarter$1(_s2, null, context);

      if (_unit2.d.isValid() === true) {
        return _unit2;
      }
    } // support '2020'


    m = doc.match('^#Year$');

    if (m.found) {
      var _str2 = doc.text('reduced');

      var _s3 = spacetime(null, context.timezone, {
        today: fmtToday(context)
      });

      _s3 = _s3.year(_str2);

      var _unit3 = new Year$2(_s3, null, context);

      if (_unit3.d.isValid() === true) {
        return _unit3;
      }
    }

    return null;
  };

  var _04Yearly = parseYearly;

  var Day$3 = units.Day,
      CalendarDate$1 = units.CalendarDate,
      Month$1 = units.Month,
      Moment$3 = units.Moment; // parse things like 'june 5th 2019'
  // most of this is done in spacetime

  var parseExplicit = function parseExplicit(doc, context) {
    var impliedYear = context.today.year(); // 'fifth of june 1992'
    // 'june the fifth 1992'

    var m = doc.match('[<date>#Value] of? [<month>#Month] [<year>#Year]');

    if (!m.found) {
      m = doc.match('[<month>#Month] the? [<date>#Value] [<year>#Year]');
    }

    if (m.found) {
      var obj = {
        month: m.groups('month').text(),
        date: m.groups('date').text(),
        year: m.groups('year').text() || impliedYear
      };

      var _unit = new CalendarDate$1(obj, null, context);

      if (_unit.d.isValid() === true) {
        return _unit;
      }
    } // 'march 1992'


    m = doc.match('[<month>#Month] of? [<year>#Year]');

    if (m.found) {
      var _obj = {
        month: m.groups('month').text(),
        year: m.groups('year').text() || impliedYear
      };

      var _unit2 = new Month$1(_obj, null, context);

      if (_unit2.d.isValid() === true) {
        return _unit2;
      }
    } //no-years
    // 'fifth of june'


    m = doc.match('[<date>#Value] of? [<month>#Month]'); // 'june the fifth'

    if (!m.found) {
      m = doc.match('[<month>#Month] the? [<date>#Value]');
    }

    if (m.found) {
      var _obj2 = {
        month: m.groups('month').text(),
        date: m.groups('date').text(),
        year: context.today.year()
      };

      var _unit3 = new CalendarDate$1(_obj2, null, context); // assume 'feb' in the future


      if (_unit3.d.month() < context.today.month()) {
        _obj2.year += 1;
        _unit3 = new CalendarDate$1(_obj2, null, context);
      }

      if (_unit3.d.isValid() === true) {
        return _unit3;
      }
    } // support 'december'


    if (doc.has('#Month')) {
      var _obj3 = {
        month: doc.match('#Month').text(),
        date: 1,
        //assume 1st
        year: context.today.year()
      };

      var _unit4 = new Month$1(_obj3, null, context); // assume 'feb' in the future


      if (_unit4.d.month() < context.today.month()) {
        _obj3.year += 1;
        _unit4 = new Month$1(_obj3, null, context);
      }

      if (_unit4.d.isValid() === true) {
        return _unit4;
      }
    } // support 'thursday 21st'


    m = doc.match('#WeekDay [<date>#Value]');

    if (m.found) {
      var _obj4 = {
        month: context.today.month(),
        date: m.groups('date').text(),
        year: context.today.year()
      };

      var _unit5 = new CalendarDate$1(_obj4, null, context);

      if (_unit5.d.isValid() === true) {
        return _unit5;
      }
    } // support date-only 'the 21st'


    m = doc.match('the [<date>#Value]');

    if (m.found) {
      var _obj5 = {
        month: context.today.month(),
        date: m.groups('date').text(),
        year: context.today.year()
      };

      var _unit6 = new CalendarDate$1(_obj5, null, context);

      if (_unit6.d.isValid() === true) {
        // assume it's forward
        if (_unit6.d.isBefore(context.today)) {
          _unit6.d = _unit6.d.add(1, 'month');
        }

        return _unit6;
      }
    } // parse ISO as a Moment


    m = doc.match('/[0-9]{4}-[0-9]{2}-[0-9]{2}t[0-9]{2}:/');

    if (m.found) {
      var _str = doc.text('reduced');

      var _unit7 = new Moment$3(_str, null, context);

      if (_unit7.d.isValid() === true) {
        return _unit7;
      }
    }

    var str = doc.text('reduced'); // punt it to spacetime, for the heavy-lifting

    var unit = new Day$3(str, null, context); // did we find a date?

    if (unit.d.isValid() === false) {
      return null;
    }

    return unit;
  };

  var _05Explicit = parseExplicit;

  var Quarter$2 = units.Quarter,
      Season$3 = units.Season,
      Week$2 = units.Week,
      Day$4 = units.Day,
      Hour$3 = units.Hour,
      Minute$2 = units.Minute,
      Month$2 = units.Month,
      WeekEnd$2 = units.WeekEnd;
  var units$1 = {
    day: Day$4,
    week: Week$2,
    weekend: WeekEnd$2,
    month: Month$2,
    quarter: Quarter$2,
    season: Season$3,
    hour: Hour$3,
    minute: Minute$2
  };

  var applyCounter = function applyCounter(unit) {
    var counter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var Unit = units$1[counter.unit];

    if (!Unit) {
      return unit;
    }

    var d = unit.d; // support 'first' or 0th

    if (counter.dir === 'first' || counter.num === 0) {
      d = unit.start().d;
      d = d.startOf(counter.unit);
    } else if (counter.dir === 'last') {
      d = d.endOf(unit.unit);
      d = d.startOf(counter.unit);
    } else if (counter.num) {
      // support 'nth week', eg.
      d = d.add(counter.num, counter.unit);
    }

    var u = new Unit(d, null, unit.context);

    if (u.d.isValid() === true) {
      return u;
    }

    return unit; //fallback
  };

  var addCounter = applyCounter;

  var tokens = {
    shift: _01Shift,
    counter: _02Counter,
    time: _03Time,
    relative: _04Relative,
    section: _05Section,
    timezone: _06Timezone
  };
  var parse = {
    today: _01Today,
    holiday: _02Holidays,
    nextLast: _03NextLast,
    yearly: _04Yearly,
    explicit: _05Explicit
  };
  var transform = {
    counter: addCounter
  };

  var parseDate = function parseDate(doc, context) {
    // quick normalization
    doc.match('[^the] !#Value', 0).remove(); // keep 'the 17th'
    //parse-out any sections

    var shift = tokens.shift(doc);
    var counter = tokens.counter(doc);
    var tz = tokens.timezone(doc);
    var time = tokens.time(doc, context);
    var section = tokens.section(doc, context);
    var rel = tokens.relative(doc); //set our new timezone

    if (tz) {
      context = Object.assign({}, context, {
        timezone: tz
      });
      var iso = context.today.format('iso-short');
      context.today = context.today["goto"](context.timezone).set(iso);
    }

    var unit = null; //'in two days'

    unit = unit || parse.today(doc, context, {
      shift: shift,
      time: time,
      rel: rel
    }); // 'this haloween'

    unit = unit || parse.holiday(doc, context); // 'this month'

    unit = unit || parse.nextLast(doc, context); // 'q2 2002'

    unit = unit || parse.yearly(doc, context); // 'this june 2nd'

    unit = unit || parse.explicit(doc, context); // doc.debug()

    if (!unit) {
      return null;
    } // 2 days after..


    if (shift) {
      unit.applyShift(shift); // if (shift.hour || shift.minute || shift.second) {
      //   console.log(shift)
      //   unit = new Hour(unit.d, null, unit.context)
      // }
    } // this/next/last


    if (rel) {
      unit.applyRel(rel);
    } // end of


    if (section) {
      unit.applySection(section);
    } // at 5:40pm


    if (time) {
      unit.applyTime(time);
    } // apply counter


    if (counter && counter.unit) {
      unit = transform.counter(unit, counter);
    } // debugging
    // console.log('\n\n=-=-=-=-=-=-=-=-=-=-=-=Date-=-=-=-=-=-=-=-=-=-=-=-=-\n')
    // console.log(`  shift:      ${JSON.stringify(shift)}`)
    // console.log(`  counter:   `, counter)
    // console.log(`  rel:        ${rel || '-'}`)
    // console.log(`  section:    ${section || '-'}`)
    // console.log(`  time:       ${time || '-'}`)
    // console.log(`  str:       '${doc.text()}'`)
    // console.log('  unit:     ', unit, '\n')
    // doc.debug()
    // console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-\n\n')


    return unit;
  };

  var parse_1 = parseDate;

  var punt = function punt(unit, context) {
    unit = unit.applyShift(context.punt);
    return unit;
  };

  var ranges = [{
    // two explicit dates - 'between friday and sunday'
    match: 'between [<start>*] and [<end>*]',
    parse: function parse(m, context) {
      var start = m.groups('start');
      start = parse_1(start, context);
      var end = m.groups('end');
      end = parse_1(end, context);

      if (start && end) {
        return {
          start: start,
          end: end.before()
        };
      }

      return null;
    }
  }, {
    // two months, no year - 'june 5 to june 7'
    match: '[<from>#Month #Value] (to|through|thru) [<to>#Month #Value] [<year>#Year?]',
    parse: function parse(m, context) {
      var res = m.groups();
      var start = res.from;

      if (res.year) {
        start = start.append(res.year);
      }

      start = parse_1(start, context);

      if (start) {
        var end = res.to;

        if (res.year) {
          end = end.append(res.year);
        }

        end = parse_1(end, context); // reverse the order?

        if (start.d.isAfter(end.d)) {
          var tmp = start;
          start = end;
          end = tmp;
        }

        return {
          start: start,
          end: end.end()
        };
      }

      return null;
    }
  }, {
    // one month, one year, first form - 'january 5 to 7 1998'
    match: '[<month>#Month] [<from>#Value] (to|through|thru) [<to>#Value] of? [<year>#Year]',
    parse: function parse(m, context) {
      var _m$groups = m.groups(),
          month = _m$groups.month,
          from = _m$groups.from,
          to = _m$groups.to,
          year = _m$groups.year;

      var year2 = year.clone();
      var start = from.prepend(month.text()).append(year.text());
      start = parse_1(start, context);

      if (start) {
        var end = to.prepend(month.text()).append(year2);
        end = parse_1(end, context);
        return {
          start: start,
          end: end.end()
        };
      }

      return null;
    }
  }, {
    // one month, one year, second form - '5 to 7 of january 1998'
    match: '[<from>#Value] (to|through|thru) [<to>#Value of? #Month of? #Year]',
    parse: function parse(m, context) {
      var to = m.groups('to');
      to = parse_1(to, context);

      if (to) {
        var fromDate = m.groups('to');
        var from = to.clone();
        from.d = from.d.date(fromDate.text('normal'));
        return {
          start: from,
          end: to.end()
        };
      }

      return null;
    }
  }, {
    // one month, no year - '5 to 7 of january'
    match: '[<from>#Value] (to|through|thru) [<to>#Value of? #Month]',
    parse: function parse(m, context) {
      var to = m.groups('to');
      to = parse_1(to, context);

      if (to) {
        var fromDate = m.groups('from');
        var from = to.clone();
        from.d = from.d.date(fromDate.text('normal'));
        return {
          start: from,
          end: to.end()
        };
      }

      return null;
    }
  }, {
    // one month, no year - 'january 5 to 7'
    match: '[<from>#Month #Value] (to|through|thru) [<to>#Value]',
    parse: function parse(m, context) {
      var from = m.groups('from');
      from = parse_1(from, context);

      if (from) {
        var toDate = m.groups('to');
        var to = from.clone();
        to.d = to.d.date(toDate.text('normal'));
        return {
          start: from,
          end: to.end()
        };
      }

      return null;
    }
  }, {
    // 'from A to B'
    match: 'from? [<from>*] (to|until|upto|through|thru) [<to>*]',
    parse: function parse(m, context) {
      var from = m.groups('from');
      var to = m.groups('to');
      from = parse_1(from, context);
      to = parse_1(to, context);

      if (from && to) {
        return {
          start: from,
          end: to.end()
        };
      }

      return null;
    }
  }, // {
  //   // 'A through B' (inclusive end)
  //   match: 'from? [<a>*] (through|thru) [<b>*]',
  //   parse: (m, context) => {
  //     let from = m.groups('a')
  //     let to = m.groups('b')
  //     from = parseDate(from, context)
  //     to = parseDate(to, context)
  //     if (from && to) {
  //       return {
  //         start: from,
  //         end: to.end(),
  //       }
  //     }
  //     return null
  //   },
  // },
  // {
  //   // 'A until B' (not inclusive end)
  //   match: 'from? [<a>*] (to|until|upto) [<b>*]',
  //   parse: (m, context) => {
  //     let from = m.groups('a')
  //     let to = m.groups('b')
  //     from = parseDate(from, context)
  //     to = parseDate(to, context)
  //     if (from && to) {
  //       return {
  //         start: from,
  //         end: to.end(),
  //       }
  //     }
  //     return null
  //   },
  // },
  {
    // 'before june'
    match: '^due? (by|before) [*]',
    group: 0,
    parse: function parse(m, context) {
      var unit = parse_1(m, context);

      if (unit) {
        var start = new Unit_1(context.today, null, context);

        if (start.d.isAfter(unit.d)) {
          start = unit.clone().applyShift({
            weeks: -2
          });
        } // end the night before


        var end = unit.clone().applyShift({
          day: -1
        });
        return {
          start: start,
          end: end.end()
        };
      }

      return null;
    }
  }, {
    // 'in june'
    match: '^(on|in|at|@) [*]',
    group: 0,
    parse: function parse(m, context) {
      var unit = parse_1(m, context);

      if (unit) {
        return {
          start: unit,
          end: unit.clone().end()
        };
      }

      return null;
    }
  }, {
    // 'after june'
    match: '^(after|following) [*]',
    group: 0,
    parse: function parse(m, context) {
      var unit = parse_1(m, context);

      if (unit) {
        unit = unit.after();
        return {
          start: unit.clone(),
          end: punt(unit.clone(), context)
        };
      }

      return null;
    }
  }, {
    // 'in june'
    match: '^(on|during|in|during) [*]',
    group: 0,
    parse: function parse(m, context) {
      var unit = parse_1(m, context);

      if (unit) {
        return {
          start: unit,
          end: unit.clone().end()
        };
      }

      return null;
    }
  }];

  var parseRange = function parseRange(doc, context) {
    // try each template in order
    for (var i = 0; i < ranges.length; i += 1) {
      var fmt = ranges[i];
      var m = doc.match(fmt.match);

      if (m.found) {
        if (fmt.group !== undefined) {
          m = m.groups(fmt.group);
        }

        var res = fmt.parse(m, context);

        if (res !== null) {
          // console.log(fmt.match)
          return res;
        }
      }
    } //else, try whole thing


    var unit = parse_1(doc, context);

    if (unit) {
      return {
        start: unit,
        end: unit.clone().end()
      };
    }

    return {
      start: null,
      end: null
    };
  };

  var _02Ranges = parseRange;

  var normalize$1 = function normalize(doc) {
    doc = doc.clone();

    if (!doc.numbers) {
      console.warn("Compromise: compromise-dates cannot find plugin dependency 'compromise-number'");
    } else {
      // convert 'two' to 2
      var num = doc.numbers();
      num.toNumber();
      num.toCardinal(false); // num.normalize()
    } // // expand 'aug 20-21'


    doc.contractions().expand(); // // remove adverbs

    doc.adverbs().remove(); // // 'week-end'

    doc.replace('week end', 'weekend').tag('Date'); // // 'a up to b'

    doc.replace('up to', 'upto').tag('Date'); // 'in a few years'

    var m = doc.match('in [a few] #Duration');

    if (m.found) {
      m.groups('0').replaceWith('2');
      m.tag('DateShift');
    }

    return doc;
  };

  var normalize_1 = normalize$1;

  var getDate = function getDate(doc, context) {
    // validate context a bit
    context = context || {};
    context.timezone = context.timezone || 'ETC/UTC';
    context.today = spacetime(context.today || null, context.timezone); //turn 'five' into 5..

    doc = normalize_1(doc); //interpret 'between [A] and [B]'...

    return _02Ranges(doc, context);
  };

  var find = getDate;

  var arr = [['mon', 'monday'], ['tue', 'tuesday'], ['tues', 'tuesday'], ['wed', 'wednesday'], ['thu', 'thursday'], ['thurs', 'thursday'], ['fri', 'friday'], ['sat', 'saturday'], ['sun', 'sunday'], ['jan', 'january'], ['feb', 'february'], ['mar', 'march'], ['apr', 'april'], ['jun', 'june'], ['jul', 'july'], ['aug', 'august'], ['sep', 'september'], ['sept', 'september'], ['oct', 'october'], ['nov', 'november'], ['dec', 'december']];
  arr = arr.map(function (a) {
    return {
      "short": a[0],
      "long": a[1]
    };
  });
  var _abbrevs = arr;

  var methods$1 = {
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
        var obj = find(doc, _this.context);
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
        var obj = find(doc, _this2.context);
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

  var opts = {
    punt: {
      weeks: 2
    }
  };

  var addMethods = function addMethods(Doc, world) {
    // our new tags
    world.addTags(_tags); // add info for the date plugin

    world.addWords(words); // run our tagger

    world.postProcess(_01Tagger);
    /**  */

    var Dates = /*#__PURE__*/function (_Doc) {
      _inherits(Dates, _Doc);

      var _super = _createSuper(Dates);

      function Dates(list, from, w) {
        var _this;

        _classCallCheck(this, Dates);

        _this = _super.call(this, list, from, w);
        _this.context = opts;
        return _this;
      }

      return Dates;
    }(Doc); //add-in methods


    Object.assign(Dates.prototype, methods$1);

    Doc.prototype.dates = function (n) {
      var context = {};

      if (n && _typeof(n) === 'object') {
        context = n;
        n = null;
      }

      context = Object.assign({}, context, opts); // let r = this.clauses()

      var dates = this.match('#Date+');

      if (typeof n === 'number') {
        dates = dates.get(n);
      }

      var d = new Dates(dates.list, this, this.world);

      if (context.today) {
        context.today = spacetime(context.today, context.timezone);
      }

      d.context = context;
      return d;
    };
  };

  var src = addMethods;

  return src;

})));
//# sourceMappingURL=compromise-dates.js.map

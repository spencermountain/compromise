/* compromise-dates 2.0.3 MIT */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.compromiseDates = factory());
}(this, (function () { 'use strict';

  //ambiguous 'may' and 'march'
  const preps = '(in|by|before|during|on|until|after|of|within|all)'; //6

  const thisNext = '(last|next|this|previous|current|upcoming|coming)'; //2

  const sections = '(start|end|middle|starting|ending|midpoint|beginning)'; //2

  const seasons = '(spring|summer|winter|fall|autumn)'; //ensure a year is approximately typical for common years
  //please change in one thousand years

  const tagYear = (m, reason) => {
    if (m.found !== true) {
      return;
    }

    m.forEach(p => {
      let str = p.text('reduced');
      let num = parseInt(str, 10);

      if (num && num > 1000 && num < 3000) {
        p.tag('Year', reason);
      }
    });
  }; //same, but for less-confident values


  const tagYearSafe = (m, reason) => {
    if (m.found !== true) {
      return;
    }

    m.forEach(p => {
      let str = p.text('reduced');
      let num = parseInt(str, 10);

      if (num && num > 1900 && num < 2030) {
        p.tag('Year', reason);
      }
    });
  };

  const tagDates = function (doc) {
    // in the evening
    doc.match('in the (night|evening|morning|afternoon|day|daytime)').tag('Time', 'in-the-night'); // 8 pm

    doc.match('(#Value|#Time) (am|pm)').tag('Time', 'value-ampm'); // 22-aug
    // doc.match('/^[0-9]{2}-(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov)/').tag('Date', '20-jan')
    // 2012-06

    doc.match('/^[0-9]{4}-[0-9]{2}$/').tag('Date', '2012-06'); // misc weekday words

    doc.match('(tue|thu)').tag('WeekDay', 'misc-weekday'); //months:

    let month = doc.if('#Month');

    if (month.found === true) {
      //June 5-7th
      month.match(`#Month #Date+`).tag('Date', 'correction-numberRange'); //5th of March

      month.match('#Value of #Month').tag('Date', 'value-of-month'); //5 March

      month.match('#Cardinal #Month').tag('Date', 'cardinal-month'); //march 5 to 7

      month.match('#Month #Value to #Value').tag('Date', 'value-to-value'); //march the 12th

      month.match('#Month the #Value').tag('Date', 'month-the-value');
    } //months:


    let val = doc.if('#Value');

    if (val.found === true) {
      //june 7
      val.match('(#WeekDay|#Month) #Value').ifNo('#Money').tag('Date', 'date-value'); //7 june

      val.match('#Value (#WeekDay|#Month)').ifNo('#Money').tag('Date', 'value-date'); //may twenty five

      val.match('#TextValue #TextValue').if('#Date').tag('#Date', 'textvalue-date'); //two thursdays back

      val.match('#Value (#WeekDay|#Duration) back').tag('#Date', '3-back'); //eg 'year'

      let duration = val.if('#Duration');

      if (duration.found === true) {
        //for 4 months
        duration.match('for #Value #Duration').tag('Date', 'for-x-duration'); //two days before

        duration.match('#Value #Duration #Conjunction').tag('Date', 'val-duration-conjunction'); //for four days

        duration.match(`${preps}? #Value #Duration`).tag('Date', 'value-duration'); //two years old

        duration.match('#Value #Duration old').unTag('Date', 'val-years-old');
      }
    } //seasons


    let season = doc.if(seasons);

    if (season.found === true) {
      season.match(`${preps}? ${thisNext} ${seasons}`).tag('Date', 'thisNext-season');
      season.match(`the? ${sections} of ${seasons}`).tag('Date', 'section-season');
      season.match(`${seasons} ${preps}? #Cardinal`).tag('Date', 'season-year');
    } //rest-dates


    let date = doc.if('#Date');

    if (date.found === true) {
      //june the 5th
      date.match('#Date the? #Ordinal').tag('Date', 'correction'); //last month

      date.match(`${thisNext} #Date`).tag('Date', 'thisNext-date'); //by 5 March

      date.match('due? (by|before|after|until) #Date').tag('Date', 'by'); //next feb

      date.match('(last|next|this|previous|current|upcoming|coming|the) #Date').tag('Date', 'next-feb'); //start of june

      date.match(`the? ${sections} of #Date`).tag('Date', 'section-of'); //fifth week in 1998

      date.match('#Ordinal #Duration in #Date').tag('Date', 'duration-in'); //early in june

      date.match('(early|late) (at|in)? the? #Date').tag('Time', 'early-evening'); //tomorrow before 3

      date.match('#Date (by|before|after|at|@|about) #Cardinal').not('^#Date').tag('Time', 'date-before-Cardinal'); //saturday am

      date.match('#Date [(am|pm)]', 0).unTag('Verb').unTag('Copula').tag('Time', 'date-am'); //feb to june

      date.match('#Date (#Preposition|to) #Date').ifNo('#Duration').tag('Date', 'date-prep-date'); //2nd quarter of 2019
      // date.match('#Date of #Date').tag('Date', 'date-of-date')
    } //year/cardinal tagging


    let cardinal = doc.if('#Cardinal');

    if (cardinal.found === true) {
      let v = cardinal.match(`#Date #Value [#Cardinal]`, 0);
      tagYear(v, 'date-value-year'); //scoops up a bunch

      v = cardinal.match(`#Date [#Cardinal]`, 0);
      tagYearSafe(v, 'date-year'); //middle of 1999

      v = cardinal.match(`${sections} of [#Cardinal]`);
      tagYearSafe(v, 'section-year'); //feb 8 2018

      v = cardinal.match(`#Month #Value [#Cardinal]`, 0);
      tagYear(v, 'month-value-year'); //feb 8 to 10th 2018

      v = cardinal.match(`#Month #Value to #Value [#Cardinal]`, 0);
      tagYear(v, 'month-range-year'); //in 1998

      v = cardinal.match(`(in|of|by|during|before|starting|ending|for|year|since) [#Cardinal]`, 0);
      tagYear(v, 'in-year-1'); //q2 2009

      v = cardinal.match('(q1|q2|q3|q4) [#Cardinal]', 0);
      tagYear(v, 'in-year-2'); //2nd quarter 2009

      v = cardinal.match('#Ordinal quarter of? [#Cardinal]', 0);
      tagYear(v, 'in-year-3'); //in the year 1998

      v = cardinal.match('the year [#Cardinal]', 0);
      tagYear(v, 'in-year-4'); //it was 1998

      v = cardinal.match('it (is|was) [#Cardinal]', 0);
      tagYearSafe(v, 'in-year-5'); // re-tag this part

      cardinal.match(`${sections} of #Year`).tag('Date'); //between 1999 and 1998

      let m = cardinal.match('between [#Cardinal] and [#Cardinal]');
      tagYear(m.groups('0'), 'between-year-and-year-1');
      tagYear(m.groups('1'), 'between-year-and-year-2');
    }

    let time = doc.if('#Time');

    if (time.found === true) {
      //by 6pm
      time.match('(by|before|after|at|@|about) #Time').tag('Time', 'preposition-time'); //7 7pm
      // time.match('#Cardinal #Time').not('#Year').tag('Time', 'value-time')
      // //2pm est
      // time.match('#Time [(eastern|pacific|central|mountain)]', 0).tag('Date', 'timezone')
      // //6pm est
      // time.match('#Time [(est|pst|gmt)]', 0).tag('Date', 'timezone abbr')
    } //'2020' bare input


    let m = doc.match('^/^20[012][0-9]$/$');
    tagYearSafe(m, '2020-ish'); // in 20mins

    doc.match('(in|after) /^[0-9]+(min|sec|wk)s?/').tag('Date', 'shift-units'); //tuesday night

    doc.match('#Date [(now|night|sometime)]', 0).tag('Time', 'date-now'); // 4 days from now

    doc.match('(from|starting|until|by) now').tag('Date', 'for-now'); // every night

    doc.match('(each|every) night').tag('Date', 'for-now');
    return doc;
  };

  var _00Basic = tagDates;

  const here$5 = 'date-values'; //

  const values = function (doc) {
    if (doc.has('#Value')) {
      //june 5 to 7th
      doc.match('#Month #Value to #Value of? #Year?').tag('Date', here$5); //5 to 7th june

      doc.match('#Value to #Value of? #Month #Year?').tag('Date', here$5); //third week of may

      doc.match('#Value #Duration of #Date').tag('Date', here$5); //two days after

      doc.match('#Value+ #Duration (after|before|into|later|afterwards|ago)?').tag('Date', here$5); //two days

      doc.match('#Value #Date').tag('Date', here$5); //june 5th

      doc.match('#Date #Value').tag('Date', here$5); //tuesday at 5

      doc.match('#Date #Preposition #Value').tag('Date', here$5); //tomorrow before 3

      doc.match('#Date (after|before|during|on|in) #Value').tag('Date', here$5); //a year and a half

      doc.match('#Value (year|month|week|day) and a half').tag('Date', here$5); //5 and a half years

      doc.match('#Value and a half (years|months|weeks|days)').tag('Date', here$5); //on the fifth

      doc.match('on the #Ordinal').tag('Date', here$5);
    }

    return doc;
  };

  var _01Values = values;

  const here$4 = 'date-tagger'; //

  const dateTagger = function (doc) {
    doc.match('(spring|summer|winter|fall|autumn|springtime|wintertime|summertime)').match('#Noun').tag('Season', here$4);
    doc.match('(q1|q2|q3|q4)').tag('FinancialQuarter', here$4);
    doc.match('(this|next|last|current) quarter').tag('FinancialQuarter', here$4);
    doc.match('(this|next|last|current) season').tag('Season', here$4);

    if (doc.has('#Date')) {
      //friday to sunday
      doc.match('#Date #Preposition #Date').tag('Date', here$4); //once a day..

      doc.match('(once|twice) (a|an|each) #Date').tag('Date', here$4); //tuesday

      doc.match('#Date+').tag('Date', here$4); //by June

      doc.match('(by|until|on|in|at|during|over|every|each|due) the? #Date').notIf('#PhrasalVerb').tag('Date', 'until-june'); //a year after..

      doc.match('a #Duration').tag('Date', here$4); //between x and y

      doc.match('(between|from) #Date').tag('Date', here$4);
      doc.match('(to|until|upto) #Date').tag('Date', here$4);
      doc.match('#Date and #Date').tag('Date', here$4); //during this june

      doc.match('(by|until|after|before|during|on|in|following|since) (next|this|last)? (#Date|#Date)').notIf('#PhrasalVerb').tag('Date', here$4); //day after next

      doc.match('the? #Date after next one?').tag('Date', here$4); //approximately...

      doc.match('(about|approx|approximately|around) #Date').tag('Date', here$4);
    }

    return doc;
  };

  var _02Dates = dateTagger;

  const here$3 = 'section-tagger'; //

  const sectionTagger = function (doc) {
    if (doc.has('#Date')) {
      // //next september
      doc.match('this? (last|next|past|this|previous|current|upcoming|coming|the) #Date').tag('Date', here$3); //starting this june

      doc.match('(starting|beginning|ending) #Date').tag('Date', here$3); //start of june

      doc.match('the? (start|end|middle|beginning) of (last|next|this|the) (#Date|#Date)').tag('Date', here$3); //this coming june

      doc.match('(the|this) #Date').tag('Date', here$3); //january up to june

      doc.match('#Date up to #Date').tag('Date', here$3);
    }

    return doc;
  };

  var _03Sections = sectionTagger;

  const here$2 = 'time-tagger'; // 3-4 can be a time-range, sometimes

  const tagTimeRange = function (m, reason) {
    if (m.found) {
      m.tag('Date', reason);
      let nums = m.numbers().lessThan(31).ifNo('#Year');
      nums.tag('#Time', reason);
    }
  }; //


  const timeTagger = function (doc) {
    // 2 oclock
    doc.match('#Cardinal oclock').tag('Time', here$2); // 13h30

    doc.match('/^[0-9]{2}h[0-9]{2}$/').tag('Time', here$2); // 03/02

    doc.match('/^[0-9]{2}/[0-9]{2}/').tag('Date', here$2).unTag('Value'); // 3 in the morning

    doc.match('[#Value] (in|at) the? (morning|evening|night|nighttime)').tag('Time', here$2); // 4-5pm
    // doc.match('/[0-9](am|pm)?-[0-9](am|pm)/').tag(['DateRange', 'Time'], '3-4pm')

    if (!doc.has('#Month')) {
      // ten to seven
      doc.match('(5|10|15|20|five|ten|fifteen|quarter|twenty|half) (to|after|past) #Cardinal').tag('Time', here$2); //add check for 1 to 1 etc.
      // at 10 past

      doc.match('(at|by|before) (5|10|15|20|five|ten|fifteen|twenty|quarter|half) (after|past|to)').tag('Time', 'at-20-past');
    }

    let date = doc.if('#Date');

    if (date.found) {
      //--timezone--
      // iso  (2020-03-02T00:00:00.000Z)
      date.match('/^[0-9]{4}[:-][0-9]{2}[:-][0-9]{2}T[0-9]/').tag('Time', here$2); // tuesday at 4

      date.match('#Date [at #Cardinal]', 0).notIf('#Year').tag('Time', here$2); // half an hour

      date.match('half an (hour|minute|second)').tag('Date', here$2); // in eastern time

      date.match('(in|for|by|near|at) #Timezone').tag('Timezone', here$2); // 3pm to 4pm

      date.match('#Time to #Time').tag('Date', here$2); // 4pm sharp

      date.match('#Time [(sharp|on the dot)]', 0).tag('Time', here$2); // ==time-ranges=
      //   --number-ranges--

      let range = date.if('#NumberRange');

      if (range.found) {
        // 3-4 on tuesday
        let m = range.match('[#NumberRange+] (on|by|at)? #WeekDay', 0);
        tagTimeRange(m, '3-4-tuesday'); // 3-4 on march 2nd

        range.match('[#NumberRange+] (on|by|at)? #Month #Value', 0);
        tagTimeRange(m, '3-4 mar 3'); // 3-4pm

        range.match('[#NumberRange] to (#NumberRange && #Time)', 0);
        tagTimeRange(m, '3-4pm'); // 3pm-5

        range.match('(#NumberRange && #Time) to [#NumberRange]', 0);
        tagTimeRange(m, '3pm-4');
      } // from 4 to 5 tomorrow


      let m = date.match('(from|between) #Cardinal and #Cardinal (in|on)? (#WeekDay|tomorrow|yesterday)');
      tagTimeRange(m, 'from 9-5 tues'); // 9 to 5 tomorrow

      m = doc.match('#Cardinal to #Cardinal (#WeekDay|tomorrow|yesterday)');
      tagTimeRange(m, '9-5 tues'); // from 4 to 5pm

      m = date.match('(from|between) [#NumericValue] (to|and) #Time', 0).tag('Time', '4-to-5pm');
      tagTimeRange(m, 'from 9-5pm'); // wed from 3 to 4

      m = date.match('(#WeekDay|tomorrow|yesterday) (from|between)? (#Cardinal|#Time) (and|to) (#Cardinal|#Time)');
      tagTimeRange(m, 'tues 3-5'); // june 5 from 3 to 4

      m = date.match('#Month #Value+ (from|between) [<time>(#Cardinal|#Time) (and|to) (#Cardinal|#Time)]').group('time');
      tagTimeRange(m, 'sep 4 from 9-5'); // 3pm to 4 on wednesday

      m = date.match('#Time to #Cardinal on? #Date');
      tagTimeRange(m, '3pm-4 wed'); // 3 to 4pm on wednesday

      m = date.match('#Cardinal to #Time on? #Date');
      tagTimeRange(m, '3-4pm wed'); // 3 to 4 on wednesday

      m = date.match('#Cardinal to #Cardinal on? (#WeekDay|#Month #Value)');
      tagTimeRange(m, '3-4 wed');
    } // around four thirty


    doc.match('(at|around|near|#Date) [#Cardinal (thirty|fifteen) (am|pm)?]', 0).tag('Time', here$2); //anytime around 3

    doc.match('(anytime|sometime) (before|after|near) #Cardinal').tag('Date', 'antime-after-3').lastTerm().tag('Time');
    return doc;
  };

  var _04Time = timeTagger;

  const here$1 = 'shift-tagger'; //

  const shiftTagger = function (doc) {
    if (doc.has('#Date')) {
      //'two days before'/ 'nine weeks frow now'
      doc.match('#Cardinal #Duration (before|after|ago|from|hence|back)').tag('DateShift', here$1); // in two weeks

      doc.match('in #Cardinal #Duration').tag('DateShift', here$1); // in a few weeks

      doc.match('in a (few|couple) of? #Duration').tag('DateShift', here$1); //two weeks and three days before

      doc.match('#Cardinal #Duration and? #DateShift').tag('DateShift', here$1);
      doc.match('#DateShift and #Cardinal #Duration').tag('DateShift', here$1); // 'day after tomorrow'

      doc.match('[#Duration (after|before)] #Date', 0).tag('DateShift', here$1); // in half an hour

      doc.match('in half (a|an) #Duration').tag('DateShift', here$1);
    }

    return doc;
  };

  var _05Shifts = shiftTagger;

  const tagIntervals = function (doc) {
    // july 3rd and 4th
    doc.match('#Month #Ordinal and #Ordinal').tag('Date', 'ord-and-ord'); // every other week

    doc.match('every other #Duration').tag('Date', 'every-other'); // every weekend

    doc.match('(every|any|each|a) (day|weekday|week day|weekend|weekend day)').tag('Date', 'any-weekday'); // any-wednesday

    doc.match('(every|any|each|a) (#WeekDay)').tag('Date', 'any-wednesday'); // any week

    doc.match('(every|any|each|a) (#Duration)').tag('Date', 'any-week');
  };

  var _06Intervals = tagIntervals;

  // timezone abbreviations
  // (from spencermountain/timezone-soft)
  const zones = ['act', 'aft', 'akst', 'anat', 'art', 'azot', 'azt', 'bnt', 'bot', 'bt', 'cast', 'cat', 'cct', 'chast', 'chut', 'ckt', 'cvt', 'cxt', 'davt', 'eat', 'ect', 'fjt', 'fkst', 'fnt', 'gamt', 'get', 'gft', 'gilt', 'gyt', 'hast', 'hncu', 'hneg', 'hnnomx', 'hnog', 'hnpm', 'hnpmx', 'hntn', 'hovt', 'iot', 'irkt', 'jst', 'kgt', 'kost', 'lint', 'magt', 'mart', 'mawt', 'mmt', 'nct', 'nft', 'novt', 'npt', 'nrt', 'nut', 'nzst', 'omst', 'pet', 'pett', 'phot', 'phst', 'pont', 'pwt', 'ret', 'sakt', 'samt', 'sbt', 'sct', 'sret', 'srt', 'syot', 'taht', 'tft', 'tjt', 'tkt', 'tlt', 'tmt', 'tot', 'tvt', 'ulat', 'vut', 'wakt', 'wat', 'wet', 'wft', 'wit', 'wst', 'yekt'].reduce((h, str) => {
    h[str] = true;
    return h;
  }, {});

  const tagTz = function (doc) {
    // 4pm PST
    let m = doc.match('#Time [#Acronym]', 0);

    if (m.found) {
      let str = m.text('reduced');

      if (zones[str] === true) {
        m.tag('Timezone', 'tz-abbr');
      }
    }
  };

  var _07Timezone = tagTz;

  const here = 'fix-tagger'; //

  const fixUp = function (doc) {
    //fixups
    if (doc.has('#Date')) {
      //first day by monday
      let oops = doc.match('#Date+ by #Date+');

      if (oops.found && !oops.has('^due')) {
        oops.match('^#Date+').unTag('Date', 'by-monday');
      } // wed nov


      doc.match('[(wed|sat)] (#Month|#Year)', 0).tag('WeekDay', 'wed');
      let d = doc.match('#Date+'); //'spa day'

      d.match('^day$').unTag('Date', 'spa-day'); // tomorrow's meeting

      d.match('(in|of|by|for)? (#Possessive && #Date)').unTag('Date', 'tomorrows meeting');
      let knownDate = '(yesterday|today|tomorrow)';

      if (d.has(knownDate)) {
        //yesterday 7
        d.match(`${knownDate} [#Value]$`).unTag('Date', 'yesterday-7'); //7 yesterday

        d.match(`^[#Value] ${knownDate}$`, 0).unTag('Date', '7 yesterday'); //friday yesterday

        d.match(`#WeekDay+ ${knownDate}$`).unTag('Date').lastTerm().tag('Date', 'fri-yesterday'); // yesterday yesterday
        // d.match(`${knownDate}+ ${knownDate}$`)
        //   .unTag('Date')
        //   .lastTerm()
        //   .tag('Date', here)
        // d.match(`(this|last|next) #Date ${knownDate}$`).unTag('Date').lastTerm().tag('Date', 'this month yesterday')
      } //tomorrow on 5


      d.match(`on #Cardinal$`).unTag('Date', here); //this tomorrow

      d.match(`this tomorrow`).terms(0).unTag('Date', 'this-tomorrow'); //q2 2019

      d.match(`(q1|q2|q3|q4) #Year`).tag('Date', here); //5 tuesday
      // d.match(`^#Value #WeekDay`).terms(0).unTag('Date');
      //5 next week

      d.match(`^#Value (this|next|last)`).terms(0).unTag('Date', here);

      if (d.has('(last|this|next)')) {
        //this month 7
        d.match(`(last|this|next) #Duration #Value`).terms(2).unTag('Date', here); //7 this month

        d.match(`!#Month #Value (last|this|next) #Date`).terms(0).unTag('Date', here);
      } //january 5 5


      if (d.has('(#Year|#Time|#TextValue|#NumberRange)') === false) {
        d.match('(#Month|#WeekDay) #Value #Value').terms(2).unTag('Date', here);
      } //between june


      if (d.has('^between') && !d.has('and .')) {
        d.unTag('Date', here);
      } //june june


      if (d.has('#Month #Month') && !d.has('@hasHyphen') && !d.has('@hasComma')) {
        d.match('#Month').lastTerm().unTag('Date', 'month-month');
      } // over the years


      d.match('(in|over) the #Duration #Date+?').unTag('Date', 'over-the-duration'); // log the hours

      if (d.has('(minutes|seconds|weeks|hours|days|months)') && !d.has('#Value #Duration')) {
        d.match('(minutes|seconds|weeks|hours|days|months)').unTag('Date', 'log-hours');
      } // about thanksgiving


      if (d.has('about #Holiday')) {
        d.match('about').unTag('#Date', 'about-thanksgiving');
      } // second quarter of 2020


      d.match('#Ordinal quarter of? #Year').unTag('Fraction'); // a month from now

      d.match('(from|by|before) now').unTag('Time'); // dangling date-chunks
      // if (d.has('!#Date (in|of|by|for) !#Date')) {
      //   d.unTag('Date', 'dangling-date')
      // }
      // the day after next

      d.match('#Date+').match('^the').unTag('Date');
    }

    return doc;
  };

  var _08Fixup = fixUp;

  const methods$3 = [_00Basic, _01Values, _02Dates, _03Sections, _04Time, _05Shifts, _06Intervals, _07Timezone, _08Fixup]; // normalizations to run before tagger

  const normalize$1 = function (doc) {
    // turn '20mins' into '20 mins'
    if (typeof doc.numbers === 'function') {
      doc.numbers().normalize();
    } else {
      console.warn(`Warning: compromise-numbers plugin is not loaded.\n   You should load this plugin \n     - https://bit.ly/3t8RfFG`);
    }

    return doc;
  }; // run each of the taggers


  const tagDate = function (doc) {
    doc = normalize$1(doc); // run taggers

    methods$3.forEach(fn => fn(doc));
    return doc;
  };

  var _01Tagger = tagDate;

  var _tags = {
    FinancialQuarter: {
      isA: 'Date',
      notA: 'Fraction'
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

  /* spencermountain/spacetime 6.16.0 Apache 2.0 */
  var spacetime = createCommonjsModule(function (module, exports) {
    (function (global, factory) {
      module.exports = factory() ;
    })(commonjsGlobal, function () {

      const MSEC_IN_HOUR = 60 * 60 * 1000; //convert our local date syntax a javascript UTC date

      const toUtc = (dstChange, offset, year) => {
        const [month, rest] = dstChange.split('/');
        const [day, hour] = rest.split(':');
        return Date.UTC(year, month - 1, day, hour) - offset * MSEC_IN_HOUR;
      }; // compare epoch with dst change events (in utc)


      const inSummerTime = (epoch, start, end, summerOffset, winterOffset) => {
        const year = new Date(epoch).getUTCFullYear();
        const startUtc = toUtc(start, winterOffset, year);
        const endUtc = toUtc(end, summerOffset, year); // simple number comparison now

        return epoch >= startUtc && epoch < endUtc;
      };

      var summerTime = inSummerTime; // it reproduces some things in ./index.js, but speeds up spacetime considerably

      const quickOffset = s => {
        let zones = s.timezones;
        let obj = zones[s.tz];

        if (obj === undefined) {
          console.warn("Warning: couldn't find timezone " + s.tz);
          return 0;
        }

        if (obj.dst === undefined) {
          return obj.offset;
        } //get our two possible offsets


        let jul = obj.offset;
        let dec = obj.offset + 1; // assume it's the same for now

        if (obj.hem === 'n') {
          dec = jul - 1;
        }

        let split = obj.dst.split('->');
        let inSummer = summerTime(s.epoch, split[0], split[1], jul, dec);

        if (inSummer === true) {
          return jul;
        }

        return dec;
      };

      var quick = quickOffset;
      var _build = {
        "9|s": "2/dili,2/jayapura",
        "9|n": "2/chita,2/khandyga,2/pyongyang,2/seoul,2/tokyo,11/palau",
        "9.5|s|04/04:03->10/03:02": "4/adelaide,4/broken_hill,4/south,4/yancowinna",
        "9.5|s": "4/darwin,4/north",
        "8|s|03/08:01->10/04:00": "12/casey",
        "8|s": "2/kuala_lumpur,2/makassar,2/singapore,4/perth,2/ujung_pandang,4/west",
        "8|n": "2/brunei,2/choibalsan,2/hong_kong,2/irkutsk,2/kuching,2/macau,2/manila,2/shanghai,2/taipei,2/ulaanbaatar,2/chongqing,2/chungking,2/harbin,2/macao,2/ulan_bator",
        "8.75|s": "4/eucla",
        "7|s": "12/davis,2/jakarta,9/christmas",
        "7|n": "2/bangkok,2/barnaul,2/hovd,2/krasnoyarsk,2/novokuznetsk,2/novosibirsk,2/phnom_penh,2/pontianak,2/saigon,2/tomsk,2/vientiane,2/ho_chi_minh",
        "6|s": "12/vostok",
        "6|n": "2/almaty,2/bishkek,2/dhaka,2/omsk,2/qyzylorda,2/qostanay,2/thimphu,2/urumqi,9/chagos,2/dacca,2/kashgar,2/thimbu",
        "6.5|n": "2/rangoon,9/cocos,2/yangon",
        "5|s": "12/mawson,9/kerguelen",
        "5|n": "2/aqtau,2/aqtobe,2/ashgabat,2/atyrau,2/baku,2/dushanbe,2/karachi,2/oral,2/samarkand,2/tashkent,2/yekaterinburg,9/maldives,2/ashkhabad",
        "5.75|n": "2/katmandu,2/kathmandu",
        "5.5|n": "2/calcutta,2/colombo,2/kolkata",
        "4|s": "9/reunion",
        "4|n": "2/dubai,2/muscat,2/tbilisi,2/yerevan,8/astrakhan,8/samara,8/saratov,8/ulyanovsk,8/volgograd,2/volgograd,9/mahe,9/mauritius",
        "4.5|n|03/22:00->09/21:24": "2/tehran",
        "4.5|n": "2/kabul",
        "3|s": "12/syowa,9/antananarivo",
        "3|n|03/28:03->10/31:04": "2/famagusta,2/nicosia,8/athens,8/bucharest,8/helsinki,8/kiev,8/mariehamn,8/riga,8/sofia,8/tallinn,8/uzhgorod,8/vilnius,8/zaporozhye,8/nicosia",
        "3|n|03/28:02->10/31:03": "8/chisinau,8/tiraspol",
        "3|n|03/28:00->10/30:24": "2/beirut",
        "3|n|03/27:00->10/30:01": "2/gaza,2/hebron",
        "3|n|03/26:02->10/31:02": "2/jerusalem,2/tel_aviv",
        "3|n|03/26:00->10/29:01": "2/amman",
        "3|n|03/26:00->10/28:24": "2/damascus",
        "3|n": "0/addis_ababa,0/asmera,0/dar_es_salaam,0/djibouti,0/juba,0/kampala,0/mogadishu,0/nairobi,2/aden,2/baghdad,2/bahrain,2/kuwait,2/qatar,2/riyadh,8/istanbul,8/kirov,8/minsk,8/moscow,8/simferopol,9/comoro,9/mayotte,0/asmara,2/istanbul",
        "2|s|03/28:02->10/31:02": "12/troll",
        "2|s": "0/gaborone,0/harare,0/johannesburg,0/lubumbashi,0/lusaka,0/maputo,0/maseru,0/mbabane",
        "2|n|03/28:02->10/31:03": "0/ceuta,arctic/longyearbyen,8/amsterdam,8/andorra,8/belgrade,8/berlin,8/bratislava,8/brussels,8/budapest,8/busingen,8/copenhagen,8/gibraltar,8/ljubljana,8/luxembourg,8/madrid,8/malta,8/monaco,8/oslo,8/paris,8/podgorica,8/prague,8/rome,8/san_marino,8/sarajevo,8/skopje,8/stockholm,8/tirane,8/vaduz,8/vatican,8/vienna,8/warsaw,8/zagreb,8/zurich,3/jan_mayen",
        "2|n": "0/blantyre,0/bujumbura,0/cairo,0/khartoum,0/kigali,0/tripoli,8/kaliningrad",
        "1|s": "0/brazzaville,0/kinshasa,0/luanda,0/windhoek",
        "1|n|04/11:03->05/16:02": "0/casablanca,0/el_aaiun",
        "1|n|03/28:01->10/31:02": "3/canary,3/faeroe,3/madeira,8/dublin,8/guernsey,8/isle_of_man,8/jersey,8/lisbon,8/london,3/faroe,8/belfast",
        "1|n": "0/algiers,0/bangui,0/douala,0/lagos,0/libreville,0/malabo,0/ndjamena,0/niamey,0/porto-novo,0/tunis",
        "14|n": "11/kiritimati",
        "13|s|04/04:04->09/26:03": "11/apia",
        "13|s|01/15:02->11/05:03": "11/tongatapu",
        "13|n": "11/enderbury,11/fakaofo",
        "12|s|04/04:03->09/26:02": "12/mcmurdo,11/auckland,12/south_pole",
        "12|s|01/17:03->11/14:02": "11/fiji",
        "12|n": "2/anadyr,2/kamchatka,2/srednekolymsk,11/funafuti,11/kwajalein,11/majuro,11/nauru,11/tarawa,11/wake,11/wallis",
        "12.75|s|04/04:03->09/26:02": "11/chatham",
        "11|s|04/04:03->10/03:02": "12/macquarie",
        "11|s": "11/bougainville",
        "11|n": "2/magadan,2/sakhalin,11/efate,11/guadalcanal,11/kosrae,11/noumea,11/ponape,11/pohnpei",
        "11.5|n|04/04:03->10/03:02": "11/norfolk",
        "10|s|04/04:03->10/03:02": "4/currie,4/hobart,4/melbourne,4/sydney,4/act,4/canberra,4/nsw,4/tasmania,4/victoria",
        "10|s": "12/dumontdurville,4/brisbane,4/lindeman,11/port_moresby,4/queensland",
        "10|n": "2/ust-nera,2/vladivostok,2/yakutsk,11/guam,11/saipan,11/truk,11/chuuk,11/yap",
        "10.5|s|04/04:01->10/03:02": "4/lord_howe,4/lhi",
        "0|n|03/28:00->10/31:01": "1/scoresbysund,3/azores",
        "0|n": "0/abidjan,0/accra,0/bamako,0/banjul,0/bissau,0/conakry,0/dakar,0/freetown,0/lome,0/monrovia,0/nouakchott,0/ouagadougou,0/sao_tome,1/danmarkshavn,3/reykjavik,3/st_helena,13/gmt,13/utc,0/timbuktu,13/gmt-0,13/gmt+0,13/gmt0,13/greenwich,13/uct,13/universal,13/zulu",
        "-9|n|03/14:02->11/07:02": "1/adak,1/atka,us/aleutian",
        "-9|n": "11/gambier",
        "-9.5|n": "11/marquesas",
        "-8|n|03/14:02->11/07:02": "1/anchorage,1/juneau,1/metlakatla,1/nome,1/sitka,1/yakutat,us/alaska",
        "-8|n": "11/pitcairn",
        "-7|n|03/14:02->11/07:02": "1/los_angeles,1/santa_isabel,1/tijuana,1/vancouver,1/ensenada,6/pacific,10/bajanorte,us/pacific-new,us/pacific",
        "-7|n|03/08:02->11/01:01": "1/dawson,1/whitehorse,6/yukon",
        "-7|n": "1/creston,1/dawson_creek,1/fort_nelson,1/hermosillo,1/phoenix,us/arizona",
        "-6|s|04/03:22->09/04:22": "11/easter,7/easterisland",
        "-6|n|04/04:02->10/31:02": "1/chihuahua,1/mazatlan,10/bajasur",
        "-6|n|03/14:02->11/07:02": "1/boise,1/cambridge_bay,1/denver,1/edmonton,1/inuvik,1/ojinaga,1/yellowknife,1/shiprock,6/mountain,us/mountain",
        "-6|n": "1/belize,1/costa_rica,1/el_salvador,1/guatemala,1/managua,1/regina,1/swift_current,1/tegucigalpa,11/galapagos,6/east-saskatchewan,6/saskatchewan",
        "-5|s": "1/lima,1/rio_branco,1/porto_acre,5/acre",
        "-5|n|04/04:02->10/31:02": "1/bahia_banderas,1/merida,1/mexico_city,1/monterrey,10/general",
        "-5|n|03/14:02->11/07:02": "1/chicago,1/matamoros,1/menominee,1/rainy_river,1/rankin_inlet,1/resolute,1/winnipeg,1/indiana/knox,1/indiana/tell_city,1/north_dakota/beulah,1/north_dakota/center,1/north_dakota/new_salem,1/knox_in,6/central,us/central,us/indiana-starke",
        "-5|n|03/12:03->11/05:01": "1/north_dakota",
        "-5|n": "1/bogota,1/cancun,1/cayman,1/coral_harbour,1/eirunepe,1/guayaquil,1/jamaica,1/panama,1/atikokan",
        "-4|s|05/13:23->08/13:01": "12/palmer",
        "-4|s|04/03:24->09/05:00": "1/santiago,7/continental",
        "-4|s|03/27:24->10/03:00": "1/asuncion",
        "-4|s|02/16:24->11/03:00": "1/campo_grande,1/cuiaba",
        "-4|s": "1/la_paz,1/manaus,5/west",
        "-4|n|03/14:02->11/07:02": "1/detroit,1/grand_turk,1/indianapolis,1/iqaluit,1/louisville,1/montreal,1/nassau,1/new_york,1/nipigon,1/pangnirtung,1/port-au-prince,1/thunder_bay,1/toronto,1/indiana/marengo,1/indiana/petersburg,1/indiana/vevay,1/indiana/vincennes,1/indiana/winamac,1/kentucky/monticello,1/fort_wayne,1/indiana/indianapolis,1/kentucky/louisville,6/eastern,us/east-indiana,us/eastern,us/michigan",
        "-4|n|03/14:00->11/07:01": "1/havana",
        "-4|n|03/12:03->11/05:01": "1/indiana,1/kentucky",
        "-4|n": "1/anguilla,1/antigua,1/aruba,1/barbados,1/blanc-sablon,1/boa_vista,1/caracas,1/curacao,1/dominica,1/grenada,1/guadeloupe,1/guyana,1/kralendijk,1/lower_princes,1/marigot,1/martinique,1/montserrat,1/port_of_spain,1/porto_velho,1/puerto_rico,1/santo_domingo,1/st_barthelemy,1/st_kitts,1/st_lucia,1/st_thomas,1/st_vincent,1/tortola,1/virgin",
        "-3|s": "1/argentina,1/buenos_aires,1/catamarca,1/cordoba,1/fortaleza,1/jujuy,1/mendoza,1/montevideo,1/punta_arenas,1/sao_paulo,12/rothera,3/stanley,1/argentina/la_rioja,1/argentina/rio_gallegos,1/argentina/salta,1/argentina/san_juan,1/argentina/san_luis,1/argentina/tucuman,1/argentina/ushuaia,1/argentina/buenos_aires,1/argentina/catamarca,1/argentina/comodrivadavia,1/argentina/cordoba,1/argentina/jujuy,1/argentina/mendoza,1/rosario,5/east",
        "-3|n|03/14:02->11/07:02": "1/glace_bay,1/goose_bay,1/halifax,1/moncton,1/thule,3/bermuda,6/atlantic",
        "-3|n": "1/araguaina,1/bahia,1/belem,1/cayenne,1/maceio,1/paramaribo,1/recife,1/santarem",
        "-2|n|03/27:22->10/30:23": "1/godthab,1/nuuk",
        "-2|n|03/14:02->11/07:02": "1/miquelon",
        "-2|n": "1/noronha,3/south_georgia,5/denoronha",
        "-2.5|n|03/14:02->11/07:02": "1/st_johns,6/newfoundland",
        "-1|n": "3/cape_verde",
        "-11|n": "11/midway,11/niue,11/pago_pago,11/samoa,us/samoa",
        "-10|n": "11/honolulu,11/johnston,11/rarotonga,11/tahiti,us/hawaii"
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
      let all = {};
      Object.keys(data).forEach(k => {
        let split = k.split('|');
        let obj = {
          offset: Number(split[0]),
          hem: split[1]
        };

        if (split[2]) {
          obj.dst = split[2];
        }

        let names = data[k].split(',');
        names.forEach(str => {
          str = str.replace(/(^[0-9]+)\//, (before, num) => {
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

      for (let i = -14; i <= 14; i += 0.5) {
        let num = i;

        if (num > 0) {
          num = '+' + num;
        }

        let name = 'etc/gmt' + num;
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

      const fallbackTZ = 'utc'; //
      //this Intl object is not supported often, yet

      const safeIntl = () => {
        if (typeof Intl === 'undefined' || typeof Intl.DateTimeFormat === 'undefined') {
          return null;
        }

        let format = Intl.DateTimeFormat();

        if (typeof format === 'undefined' || typeof format.resolvedOptions === 'undefined') {
          return null;
        }

        let timezone = format.resolvedOptions().timeZone;

        if (!timezone) {
          return null;
        }

        return timezone.toLowerCase();
      };

      const guessTz = () => {
        let timezone = safeIntl();

        if (timezone === null) {
          return fallbackTZ;
        }

        return timezone;
      }; //do it once per computer


      var guessTz_1 = guessTz;
      const isOffset = /(\-?[0-9]+)h(rs)?/i;
      const isNumber = /(\-?[0-9]+)/;
      const utcOffset = /utc([\-+]?[0-9]+)/i;
      const gmtOffset = /gmt([\-+]?[0-9]+)/i;

      const toIana = function (num) {
        num = Number(num);

        if (num >= -13 && num <= 13) {
          num = num * -1; //it's opposite!

          num = (num > 0 ? '+' : '') + num; //add plus sign

          return 'etc/gmt' + num;
        }

        return null;
      };

      const parseOffset$2 = function (tz) {
        // '+5hrs'
        let m = tz.match(isOffset);

        if (m !== null) {
          return toIana(m[1]);
        } // 'utc+5'


        m = tz.match(utcOffset);

        if (m !== null) {
          return toIana(m[1]);
        } // 'GMT-5' (not opposite)


        m = tz.match(gmtOffset);

        if (m !== null) {
          let num = Number(m[1]) * -1;
          return toIana(num);
        } // '+5'


        m = tz.match(isNumber);

        if (m !== null) {
          return toIana(m[1]);
        }

        return null;
      };

      var parseOffset_1$1 = parseOffset$2;
      const local = guessTz_1(); //add all the city names by themselves

      const cities = Object.keys(unpack).reduce((h, k) => {
        let city = k.split('/')[1] || '';
        city = city.replace(/_/g, ' ');
        h[city] = k;
        return h;
      }, {}); //try to match these against iana form

      const normalize$1 = tz => {
        tz = tz.replace(/ time/g, '');
        tz = tz.replace(/ (standard|daylight|summer)/g, '');
        tz = tz.replace(/\b(east|west|north|south)ern/g, '$1');
        tz = tz.replace(/\b(africa|america|australia)n/g, '$1');
        tz = tz.replace(/\beuropean/g, 'europe');
        tz = tz.replace(/\islands/g, 'island');
        return tz;
      }; // try our best to reconcile the timzone to this given string


      const lookupTz = (str, zones) => {
        if (!str) {
          return local;
        }

        if (typeof str !== 'string') {
          console.error("Timezone must be a string - recieved: '", str, "'\n");
        }

        let tz = str.trim(); // let split = str.split('/')
        //support long timezones like 'America/Argentina/Rio_Gallegos'
        // if (split.length > 2 && zones.hasOwnProperty(tz) === false) {
        //   tz = split[0] + '/' + split[1]
        // }

        tz = tz.toLowerCase();

        if (zones.hasOwnProperty(tz) === true) {
          return tz;
        } //lookup more loosely..


        tz = normalize$1(tz);

        if (zones.hasOwnProperty(tz) === true) {
          return tz;
        } //try city-names


        if (cities.hasOwnProperty(tz) === true) {
          return cities[tz];
        } // //try to parse '-5h'


        if (/[0-9]/.test(tz) === true) {
          let id = parseOffset_1$1(tz);

          if (id) {
            return id;
          }
        }

        throw new Error("Spacetime: Cannot find timezone named: '" + str + "'. Please enter an IANA timezone id.");
      };

      var find = lookupTz;
      var fns = createCommonjsModule(function (module, exports) {
        //git:blame @JuliasCaesar https://www.timeanddate.com/date/leapyear.html
        exports.isLeapYear = year => year % 4 === 0 && year % 100 !== 0 || year % 400 === 0; // unsurprisingly-nasty `typeof date` call


        exports.isDate = d => Object.prototype.toString.call(d) === '[object Date]' && !isNaN(d.valueOf());

        exports.isArray = input => Object.prototype.toString.call(input) === '[object Array]';

        exports.isObject = input => Object.prototype.toString.call(input) === '[object Object]';

        exports.isBoolean = input => Object.prototype.toString.call(input) === '[object Boolean]';

        exports.zeroPad = (str, len = 2) => {
          let pad = '0';
          str = str + '';
          return str.length >= len ? str : new Array(len - str.length + 1).join(pad) + str;
        };

        exports.titleCase = str => {
          if (!str) {
            return '';
          }

          return str[0].toUpperCase() + str.substr(1);
        };

        exports.ordinal = i => {
          let j = i % 10;
          let k = i % 100;

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


        exports.toCardinal = str => {
          str = String(str);
          str = str.replace(/([0-9])(st|nd|rd|th)$/i, '$1');
          return parseInt(str, 10);
        }; //used mostly for cleanup of unit names, like 'months'


        exports.normalize = (str = '') => {
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

        exports.getEpoch = tmp => {
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


        exports.beADate = (d, s) => {
          if (exports.isObject(d) === false) {
            return s.clone().set(d);
          }

          return d;
        };

        exports.formatTimezone = (offset, delimiter = '') => {
          const sign = offset > 0 ? '+' : '-';
          const absOffset = Math.abs(offset);
          const hours = exports.zeroPad(parseInt('' + absOffset, 10));
          const minutes = exports.zeroPad(absOffset % 1 * 60);
          return "".concat(sign).concat(hours).concat(delimiter).concat(minutes);
        };
      });
      fns.isLeapYear;
      fns.isDate;
      fns.isArray;
      fns.isObject;
      fns.isBoolean;
      fns.zeroPad;
      fns.titleCase;
      fns.ordinal;
      fns.toCardinal;
      fns.normalize;
      fns.getEpoch;
      fns.beADate;
      fns.formatTimezone;
      const defaults$1 = {
        year: new Date().getFullYear(),
        month: 0,
        date: 1
      }; //support [2016, 03, 01] format

      const parseArray$1 = (s, arr, today) => {
        if (arr.length === 0) {
          return s;
        }

        let order = ['year', 'month', 'date', 'hour', 'minute', 'second', 'millisecond'];

        for (let i = 0; i < order.length; i++) {
          let num = arr[i] || today[order[i]] || defaults$1[order[i]] || 0;
          s = s[order[i]](num);
        }

        return s;
      }; //support {year:2016, month:3} format


      const parseObject$1 = (s, obj, today) => {
        // if obj is empty, do nothing
        if (Object.keys(obj).length === 0) {
          return s;
        }

        obj = Object.assign({}, defaults$1, today, obj);
        let keys = Object.keys(obj);

        for (let i = 0; i < keys.length; i++) {
          let unit = keys[i]; //make sure we have this method

          if (s[unit] === undefined || typeof s[unit] !== 'function') {
            continue;
          } //make sure the value is a number


          if (obj[unit] === null || obj[unit] === undefined || obj[unit] === '') {
            continue;
          }

          let num = obj[unit] || today[unit] || defaults$1[unit] || 0;
          s = s[unit](num);
        }

        return s;
      }; // this may seem like an arbitrary number, but it's 'within jan 1970'
      // this is only really ambiguous until 2054 or so


      const parseNumber$1 = function (s, input) {
        const minimumEpoch = 2500000000; // if the given epoch is really small, they've probably given seconds and not milliseconds
        // anything below this number is likely (but not necessarily) a mistaken input.

        if (input > 0 && input < minimumEpoch && s.silent === false) {
          console.warn('  - Warning: You are setting the date to January 1970.');
          console.warn('       -   did input seconds instead of milliseconds?');
        }

        s.epoch = input;
        return s;
      };

      var helpers = {
        parseArray: parseArray$1,
        parseObject: parseObject$1,
        parseNumber: parseNumber$1
      }; // pull in 'today' data for the baseline moment

      const getNow = function (s) {
        s.epoch = Date.now();
        Object.keys(s._today || {}).forEach(k => {
          if (typeof s[k] === 'function') {
            s = s[k](s._today[k]);
          }
        });
        return s;
      };

      const dates = {
        now: s => {
          return getNow(s);
        },
        today: s => {
          return getNow(s);
        },
        tonight: s => {
          s = getNow(s);
          s = s.hour(18); //6pm

          return s;
        },
        tomorrow: s => {
          s = getNow(s);
          s = s.add(1, 'day');
          s = s.startOf('day');
          return s;
        },
        yesterday: s => {
          s = getNow(s);
          s = s.subtract(1, 'day');
          s = s.startOf('day');
          return s;
        },
        christmas: s => {
          let year = getNow(s).year();
          s = s.set([year, 11, 25, 18, 0, 0]); // Dec 25

          return s;
        },
        'new years': s => {
          let year = getNow(s).year();
          s = s.set([year, 11, 31, 18, 0, 0]); // Dec 31

          return s;
        }
      };
      dates['new years eve'] = dates['new years'];
      var namedDates = dates; //little cleanup..

      const normalize = function (str) {
        // remove all day-names
        str = str.replace(/\b(mon|tues?|wed|wednes|thur?s?|fri|sat|satur|sun)(day)?\b/i, ''); //remove ordinal ending

        str = str.replace(/([0-9])(th|rd|st|nd)/, '$1');
        str = str.replace(/,/g, '');
        str = str.replace(/ +/g, ' ').trim();
        return str;
      };

      var normalize_1 = normalize;
      let o = {
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

      Object.keys(o).forEach(k => {
        o[k + 's'] = o[k];
      });
      var milliseconds = o;

      const walk = (s, n, fn, unit, previous) => {
        let current = s.d[fn]();

        if (current === n) {
          return; //already there
        }

        let startUnit = previous === null ? null : s.d[previous]();
        let original = s.epoch; //try to get it as close as we can

        let diff = n - current;
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


        const halfStep = milliseconds[unit] / 2;

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


      const units$3 = {
        year: {
          valid: n => n > -4000 && n < 4000,
          walkTo: (s, n) => walk(s, n, 'getFullYear', 'year', null)
        },
        month: {
          valid: n => n >= 0 && n <= 11,
          walkTo: (s, n) => {
            let d = s.d;
            let current = d.getMonth();
            let original = s.epoch;
            let startUnit = d.getFullYear();

            if (current === n) {
              return;
            } //try to get it as close as we can..


            let diff = n - current;
            s.epoch += milliseconds.day * (diff * 28); //special case
            //oops, did we change the year? revert it.

            if (startUnit !== s.d.getFullYear()) {
              s.epoch = original;
            } //increment by day


            while (s.d.getMonth() < n) {
              s.epoch += milliseconds.day;
            }

            while (s.d.getMonth() > n) {
              s.epoch -= milliseconds.day;
            }
          }
        },
        date: {
          valid: n => n > 0 && n <= 31,
          walkTo: (s, n) => walk(s, n, 'getDate', 'day', 'getMonth')
        },
        hour: {
          valid: n => n >= 0 && n < 24,
          walkTo: (s, n) => walk(s, n, 'getHours', 'hour', 'getDate')
        },
        minute: {
          valid: n => n >= 0 && n < 60,
          walkTo: (s, n) => walk(s, n, 'getMinutes', 'minute', 'getHours')
        },
        second: {
          valid: n => n >= 0 && n < 60,
          walkTo: (s, n) => {
            //do this one directly
            s.epoch = s.seconds(n).epoch;
          }
        },
        millisecond: {
          valid: n => n >= 0 && n < 1000,
          walkTo: (s, n) => {
            //do this one directly
            s.epoch = s.milliseconds(n).epoch;
          }
        }
      };

      const walkTo = (s, wants) => {
        let keys = Object.keys(units$3);
        let old = s.clone();

        for (let i = 0; i < keys.length; i++) {
          let k = keys[i];
          let n = wants[k];

          if (n === undefined) {
            n = old[k]();
          }

          if (typeof n === 'string') {
            n = parseInt(n, 10);
          } //make-sure it's valid


          if (!units$3[k].valid(n)) {
            s.epoch = null;

            if (s.silent === false) {
              console.warn('invalid ' + k + ': ' + n);
            }

            return;
          }

          units$3[k].walkTo(s, n);
        }

        return;
      };

      var walk_1 = walkTo;
      const monthLengths = [31, // January - 31 days
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

      let shortMonths = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sept', 'oct', 'nov', 'dec'];
      let longMonths = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

      function buildMapping() {
        const obj = {
          sep: 8 //support this format

        };

        for (let i = 0; i < shortMonths.length; i++) {
          obj[shortMonths[i]] = i;
        }

        for (let i = 0; i < longMonths.length; i++) {
          obj[longMonths[i]] = i;
        }

        return obj;
      }

      var months$1 = {
        short: () => shortMonths,
        long: () => longMonths,
        mapping: () => buildMapping(),
        set: i18n => {
          shortMonths = i18n.short || shortMonths;
          longMonths = i18n.long || longMonths;
        }
      }; //pull-apart ISO offsets, like "+0100"

      const parseOffset$1 = (s, offset) => {
        if (!offset) {
          return s;
        } //this is a fancy-move


        if (offset === 'Z' || offset === 'z') {
          offset = '+0000';
        } // according to ISO8601, tz could be hh:mm, hhmm or hh
        // so need few more steps before the calculation.


        let num = 0; // for (+-)hh:mm

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

        let tz = 'etc/gmt' + num;
        let zones = s.timezones;

        if (zones[tz]) {
          // log a warning if we're over-writing a given timezone?
          // console.log('changing timezone to: ' + tz)
          s.tz = tz;
        }

        return s;
      };

      var parseOffset_1 = parseOffset$1;

      const parseTime$4 = (s, str = '') => {
        // remove all whitespace
        str = str.replace(/^\s+/, '').toLowerCase(); //formal time format - 04:30.23

        let arr = str.match(/([0-9]{1,2}):([0-9]{1,2}):?([0-9]{1,2})?[:\.]?([0-9]{1,4})?/);

        if (arr !== null) {
          //validate it a little
          let h = Number(arr[1]);

          if (h < 0 || h > 24) {
            return s.startOf('day');
          }

          let m = Number(arr[2]); //don't accept '5:3pm'

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

          let ampm = str.match(/[\b0-9](am|pm)\b/);

          if (ampm !== null && ampm[1]) {
            s = s.ampm(ampm[1]);
          }

          return s;
        } //try an informal form - 5pm (no minutes)


        arr = str.match(/([0-9]+) ?(am|pm)/);

        if (arr !== null && arr[1]) {
          let h = Number(arr[1]); //validate it a little..

          if (h > 12 || h < 1) {
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

      var parseTime_1 = parseTime$4;
      const isLeapYear$2 = fns.isLeapYear;
      const months = months$1.mapping(); //given a month, return whether day number exists in it

      const validate$5 = obj => {
        //invalid values
        if (monthLengths_1.hasOwnProperty(obj.month) !== true) {
          return false;
        } //support leap-year in february


        if (obj.month === 1) {
          if (isLeapYear$2(obj.year) && obj.date <= 29) {
            return true;
          } else {
            return obj.date <= 28;
          }
        } //is this date too-big for this month?


        let max = monthLengths_1[obj.month] || 0;

        if (obj.date <= max) {
          return true;
        }

        return false;
      };

      const parseYear$4 = (str = '', today) => {
        str = str.trim(); // parse '86 shorthand

        if (/^'[0-9][0-9]$/.test(str) === true) {
          let num = Number(str.replace(/'/, ''));

          if (num > 50) {
            return 1900 + num;
          }

          return 2000 + num;
        }

        let year = parseInt(str, 10); // use a given year from options.today

        if (!year && today) {
          year = today.year;
        } // fallback to this year


        year = year || new Date().getFullYear();
        return year;
      };

      const parseMonth$4 = function (str) {
        str = str.toLowerCase().trim();
        return months[str];
      };

      const parsers = {
        parseOffset: parseOffset_1,
        parseTime: parseTime_1,
        parseYear: parseYear$4,
        parseMonth: parseMonth$4,
        validate: validate$5
      };
      var _parsers = parsers;
      const {
        validate: validate$4,
        parseTime: parseTime$3,
        parseYear: parseYear$3,
        parseMonth: parseMonth$3,
        parseOffset
      } = _parsers;
      var _01Ymd = [// =====
      //  y-m-d
      // =====
      //iso-this 1998-05-30T22:00:00:000Z, iso-that 2017-04-03T08:00:00-0700
      {
        reg: /^(\-?0?0?[0-9]{3,4})-([0-9]{1,2})-([0-9]{1,2})[T| ]([0-9.:]+)(Z|[0-9\-\+:]+)?$/i,
        parse: (s, m) => {
          let obj = {
            year: m[1],
            month: parseInt(m[2], 10) - 1,
            date: m[3]
          };

          if (validate$4(obj) === false) {
            s.epoch = null;
            return s;
          }

          parseOffset(s, m[5]);
          walk_1(s, obj);
          s = parseTime$3(s, m[4]);
          return s;
        }
      }, //short-iso "2015-03-25" or "2015/03/25" or "2015/03/25 12:26:14 PM"
      {
        reg: /^([0-9]{4})[\-\/\. ]([0-9]{1,2})[\-\/\. ]([0-9]{1,2})( [0-9]{1,2}(:[0-9]{0,2})?(:[0-9]{0,3})? ?(am|pm)?)?$/i,
        parse: (s, m) => {
          let obj = {
            year: m[1],
            month: parseInt(m[2], 10) - 1,
            date: parseInt(m[3], 10)
          };

          if (obj.month >= 12) {
            //support yyyy/dd/mm (weird, but ok)
            obj.date = parseInt(m[2], 10);
            obj.month = parseInt(m[3], 10) - 1;
          }

          if (validate$4(obj) === false) {
            s.epoch = null;
            return s;
          }

          walk_1(s, obj);
          s = parseTime$3(s, m[4]);
          return s;
        }
      }, //text-month "2015-feb-25"
      {
        reg: /^([0-9]{4})[\-\/\. ]([a-z]+)[\-\/\. ]([0-9]{1,2})( [0-9]{1,2}(:[0-9]{0,2})?(:[0-9]{0,3})? ?(am|pm)?)?$/i,
        parse: (s, m) => {
          let obj = {
            year: parseYear$3(m[1], s._today),
            month: parseMonth$3(m[2]),
            date: fns.toCardinal(m[3] || '')
          };

          if (validate$4(obj) === false) {
            s.epoch = null;
            return s;
          }

          walk_1(s, obj);
          s = parseTime$3(s, m[4]);
          return s;
        }
      }];
      const {
        validate: validate$3,
        parseTime: parseTime$2,
        parseYear: parseYear$2,
        parseMonth: parseMonth$2
      } = _parsers;
      var _02Mdy = [// =====
      //  m-d-y
      // =====
      //mm/dd/yyyy - uk/canada "6/28/2019, 12:26:14 PM"
      {
        reg: /^([0-9]{1,2})[\-\/.]([0-9]{1,2})[\-\/.]?([0-9]{4})?( [0-9]{1,2}:[0-9]{2}:?[0-9]{0,2}? ?(am|pm|gmt))?$/i,
        parse: (s, arr) => {
          let month = parseInt(arr[1], 10) - 1;
          let date = parseInt(arr[2], 10); //support dd/mm/yyy

          if (s.british || month >= 12) {
            date = parseInt(arr[1], 10);
            month = parseInt(arr[2], 10) - 1;
          }

          let obj = {
            date,
            month,
            year: parseYear$2(arr[3], s._today) || new Date().getFullYear()
          };

          if (validate$3(obj) === false) {
            s.epoch = null;
            return s;
          }

          walk_1(s, obj);
          s = parseTime$2(s, arr[4]);
          return s;
        }
      }, //alt short format - "feb-25-2015"
      {
        reg: /^([a-z]+)[\-\/\. ]([0-9]{1,2})[\-\/\. ]?([0-9]{4}|'[0-9]{2})?( [0-9]{1,2}(:[0-9]{0,2})?(:[0-9]{0,3})? ?(am|pm)?)?$/i,
        parse: (s, arr) => {
          let obj = {
            year: parseYear$2(arr[3], s._today),
            month: parseMonth$2(arr[1]),
            date: fns.toCardinal(arr[2] || '')
          };

          if (validate$3(obj) === false) {
            s.epoch = null;
            return s;
          }

          walk_1(s, obj);
          s = parseTime$2(s, arr[4]);
          return s;
        }
      }, //Long "Mar 25 2015"
      //February 22, 2017 15:30:00
      {
        reg: /^([a-z]+) ([0-9]{1,2})( [0-9]{4})?( ([0-9:]+( ?am| ?pm| ?gmt)?))?$/i,
        parse: (s, arr) => {
          let obj = {
            year: parseYear$2(arr[3], s._today),
            month: parseMonth$2(arr[1]),
            date: fns.toCardinal(arr[2] || '')
          };

          if (validate$3(obj) === false) {
            s.epoch = null;
            return s;
          }

          walk_1(s, obj);
          s = parseTime$2(s, arr[4]);
          return s;
        }
      }, // 'Sun Mar 14 15:09:48 +0000 2021'
      {
        reg: /^([a-z]+) ([0-9]{1,2})( [0-9:]+)?( \+[0-9]{4})?( [0-9]{4})?$/i,
        parse: (s, arr) => {
          let obj = {
            year: parseYear$2(arr[5], s._today),
            month: parseMonth$2(arr[1]),
            date: fns.toCardinal(arr[2] || '')
          };

          if (validate$3(obj) === false) {
            s.epoch = null;
            return s;
          }

          walk_1(s, obj);
          s = parseTime$2(s, arr[3]);
          return s;
        }
      }];
      const {
        validate: validate$2,
        parseTime: parseTime$1,
        parseYear: parseYear$1,
        parseMonth: parseMonth$1
      } = _parsers;
      var _03Dmy = [// =====
      //  d-m-y
      // =====
      //common british format - "25-feb-2015"
      {
        reg: /^([0-9]{1,2})[\-\/]([a-z]+)[\-\/]?([0-9]{4})?$/i,
        parse: (s, m) => {
          let obj = {
            year: parseYear$1(m[3], s._today),
            month: parseMonth$1(m[2]),
            date: fns.toCardinal(m[1] || '')
          };

          if (validate$2(obj) === false) {
            s.epoch = null;
            return s;
          }

          walk_1(s, obj);
          s = parseTime$1(s, m[4]);
          return s;
        }
      }, // "25 Mar 2015"
      {
        reg: /^([0-9]{1,2})( [a-z]+)( [0-9]{4}| '[0-9]{2})? ?([0-9]{1,2}:[0-9]{2}:?[0-9]{0,2}? ?(am|pm|gmt))?$/i,
        parse: (s, m) => {
          let obj = {
            year: parseYear$1(m[3], s._today),
            month: parseMonth$1(m[2]),
            date: fns.toCardinal(m[1])
          };

          if (!obj.month || validate$2(obj) === false) {
            s.epoch = null;
            return s;
          }

          walk_1(s, obj);
          s = parseTime$1(s, m[4]);
          return s;
        }
      }, // 01-jan-2020
      {
        reg: /^([0-9]{1,2})[\. -/]([a-z]+)[\. -/]([0-9]{4})?( [0-9]{1,2}(:[0-9]{0,2})?(:[0-9]{0,3})? ?(am|pm)?)?$/i,
        parse: (s, m) => {
          let obj = {
            date: Number(m[1]),
            month: parseMonth$1(m[2]),
            year: Number(m[3])
          };

          if (validate$2(obj) === false) {
            s.epoch = null;
            return s;
          }

          walk_1(s, obj);
          s = s.startOf('day');
          s = parseTime$1(s, m[4]);
          return s;
        }
      }];
      const {
        validate: validate$1,
        parseTime,
        parseYear,
        parseMonth
      } = _parsers;
      var _04Misc = [// =====
      // no dates
      // =====
      // '2012-06' month-only
      {
        reg: /^([0-9]{4})[\-\/]([0-9]{2})$/i,
        parse: (s, m) => {
          let obj = {
            year: m[1],
            month: parseInt(m[2], 10) - 1,
            date: 1
          };

          if (validate$1(obj) === false) {
            s.epoch = null;
            return s;
          }

          walk_1(s, obj);
          s = parseTime(s, m[4]);
          return s;
        }
      }, //February 2017 (implied date)
      {
        reg: /^([a-z]+) ([0-9]{4})$/i,
        parse: (s, arr) => {
          let obj = {
            year: parseYear(arr[2], s._today),
            month: parseMonth(arr[1]),
            date: s._today.date || 1
          };

          if (validate$1(obj) === false) {
            s.epoch = null;
            return s;
          }

          walk_1(s, obj);
          s = parseTime(s, arr[4]);
          return s;
        }
      }, {
        // 'q2 2002'
        reg: /^(q[0-9])( of)?( [0-9]{4})?/i,
        parse: (s, arr) => {
          let quarter = arr[1] || '';
          s = s.quarter(quarter);
          let year = arr[3] || '';

          if (year) {
            year = year.trim();
            s = s.year(year);
          }

          return s;
        }
      }, {
        // 'summer 2002'
        reg: /^(spring|summer|winter|fall|autumn)( of)?( [0-9]{4})?/i,
        parse: (s, arr) => {
          let season = arr[1] || '';
          s = s.season(season);
          let year = arr[3] || '';

          if (year) {
            year = year.trim();
            s = s.year(year);
          }

          return s;
        }
      }, {
        // '200bc'
        reg: /^[0-9,]+ ?b\.?c\.?$/i,
        parse: (s, arr) => {
          let str = arr[0] || ''; //make year-negative

          str = str.replace(/^([0-9,]+) ?b\.?c\.?$/i, '-$1');
          let d = new Date();
          let obj = {
            year: parseInt(str.trim(), 10),
            month: d.getMonth(),
            date: d.getDate()
          };

          if (validate$1(obj) === false) {
            s.epoch = null;
            return s;
          }

          walk_1(s, obj);
          s = parseTime(s);
          return s;
        }
      }, {
        // '200ad'
        reg: /^[0-9,]+ ?(a\.?d\.?|c\.?e\.?)$/i,
        parse: (s, arr) => {
          let str = arr[0] || ''; //remove commas

          str = str.replace(/,/g, '');
          let d = new Date();
          let obj = {
            year: parseInt(str.trim(), 10),
            month: d.getMonth(),
            date: d.getDate()
          };

          if (validate$1(obj) === false) {
            s.epoch = null;
            return s;
          }

          walk_1(s, obj);
          s = parseTime(s);
          return s;
        }
      }, {
        // '1992'
        reg: /^[0-9]{4}( ?a\.?d\.?)?$/i,
        parse: (s, arr) => {
          let today = s._today; // using today's date, but a new month is awkward.

          if (today.month && !today.date) {
            today.date = 1;
          }

          let d = new Date();
          let obj = {
            year: parseYear(arr[0], today),
            month: today.month || d.getMonth(),
            date: today.date || d.getDate()
          };

          if (validate$1(obj) === false) {
            s.epoch = null;
            return s;
          }

          walk_1(s, obj);
          s = parseTime(s);
          return s;
        }
      }];
      var formats = [].concat(_01Ymd, _02Mdy, _03Dmy, _04Misc);

      const parseString = function (s, input, givenTz) {
        // let parsers = s.parsers || []
        //try each text-parse template, use the first good result
        for (let i = 0; i < formats.length; i++) {
          let m = input.match(formats[i].reg);

          if (m) {
            // console.log(parsers[i].reg)
            let res = formats[i].parse(s, m, givenTz);

            if (res !== null && res.isValid()) {
              return res;
            }
          }
        }

        if (s.silent === false) {
          console.warn("Warning: couldn't parse date-string: '" + input + "'");
        }

        s.epoch = null;
        return s;
      };

      var parse = parseString;
      const {
        parseArray,
        parseObject,
        parseNumber
      } = helpers; //we have to actually parse these inputs ourselves
      //  -  can't use built-in js parser ;(
      //=========================================
      // ISO Date	  "2015-03-25"
      // Short Date	"03/25/2015" or "2015/03/25"
      // Long Date	"Mar 25 2015" or "25 Mar 2015"
      // Full Date	"Wednesday March 25 2015"
      //=========================================

      const defaults = {
        year: new Date().getFullYear(),
        month: 0,
        date: 1
      }; //find the epoch from different input styles

      const parseInput = (s, input) => {
        let today = s._today || defaults; //if we've been given a epoch number, it's easy

        if (typeof input === 'number') {
          return parseNumber(s, input);
        } //set tmp time


        s.epoch = Date.now(); // overwrite tmp time with 'today' value, if exists

        if (s._today && fns.isObject(s._today) && Object.keys(s._today).length > 0) {
          let res = parseObject(s, today, defaults);

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
          s = parseArray(s, input, today);
          return s;
        } //support {year:2016, month:3} format


        if (fns.isObject(input) === true) {
          //support spacetime object as input
          if (input.epoch) {
            s.epoch = input.epoch;
            s.tz = input.tz;
            return s;
          }

          s = parseObject(s, input, today);
          return s;
        } //input as a string..


        if (typeof input !== 'string') {
          return s;
        } //little cleanup..


        input = normalize_1(input); //try some known-words, like 'now'

        if (namedDates.hasOwnProperty(input) === true) {
          s = namedDates[input](s);
          return s;
        } //try each text-parse template, use the first good result


        return parse(s, input);
      };

      var input = parseInput;
      let shortDays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
      let longDays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
      var days = {
        short: () => shortDays,
        long: () => longDays,
        set: i18n => {
          shortDays = i18n.short || shortDays;
          longDays = i18n.long || longDays;
        },
        aliases: {
          mo: 1,
          tu: 2,
          we: 3,
          th: 4,
          fr: 5,
          sa: 6,
          su: 7,
          tues: 2,
          weds: 3,
          wedn: 3,
          thur: 4,
          thurs: 4
        }
      };
      let titleCaseEnabled = true;
      var caseFormat = {
        useTitleCase: () => titleCaseEnabled,
        set: useTitleCase => {
          titleCaseEnabled = useTitleCase;
        }
      }; // it's kind of nuts how involved this is
      // "+01:00", "+0100", or simply "+01"

      const isoOffset = s => {
        let offset = s.timezone().current.offset;
        return !offset ? 'Z' : fns.formatTimezone(offset, ':');
      };

      var _offset = isoOffset;

      const applyCaseFormat = str => {
        if (caseFormat.useTitleCase()) {
          return fns.titleCase(str);
        }

        return str;
      };

      const format = {
        day: s => applyCaseFormat(s.dayName()),
        'day-short': s => applyCaseFormat(days.short()[s.day()]),
        'day-number': s => s.day(),
        'day-ordinal': s => fns.ordinal(s.day()),
        'day-pad': s => fns.zeroPad(s.day()),
        date: s => s.date(),
        'date-ordinal': s => fns.ordinal(s.date()),
        'date-pad': s => fns.zeroPad(s.date()),
        month: s => applyCaseFormat(s.monthName()),
        'month-short': s => applyCaseFormat(months$1.short()[s.month()]),
        'month-number': s => s.month(),
        'month-ordinal': s => fns.ordinal(s.month()),
        'month-pad': s => fns.zeroPad(s.month()),
        'iso-month': s => fns.zeroPad(s.month() + 1),
        //1-based months
        year: s => {
          let year = s.year();

          if (year > 0) {
            return year;
          }

          year = Math.abs(year);
          return year + ' BC';
        },
        'year-short': s => {
          let year = s.year();

          if (year > 0) {
            return "'".concat(String(s.year()).substr(2, 4));
          }

          year = Math.abs(year);
          return year + ' BC';
        },
        'iso-year': s => {
          let year = s.year();
          let isNegative = year < 0;
          let str = fns.zeroPad(Math.abs(year), 4); //0-padded

          if (isNegative) {
            //negative years are for some reason 6-digits ('-00008')
            str = fns.zeroPad(str, 6);
            str = '-' + str;
          }

          return str;
        },
        time: s => s.time(),
        'time-24': s => "".concat(s.hour24(), ":").concat(fns.zeroPad(s.minute())),
        hour: s => s.hour12(),
        'hour-pad': s => fns.zeroPad(s.hour12()),
        'hour-24': s => s.hour24(),
        'hour-24-pad': s => fns.zeroPad(s.hour24()),
        minute: s => s.minute(),
        'minute-pad': s => fns.zeroPad(s.minute()),
        second: s => s.second(),
        'second-pad': s => fns.zeroPad(s.second()),
        ampm: s => s.ampm(),
        quarter: s => 'Q' + s.quarter(),
        season: s => s.season(),
        era: s => s.era(),
        json: s => s.json(),
        timezone: s => s.timezone().name,
        offset: s => _offset(s),
        numeric: s => "".concat(s.year(), "/").concat(fns.zeroPad(s.month() + 1), "/").concat(fns.zeroPad(s.date())),
        // yyyy/mm/dd
        'numeric-us': s => "".concat(fns.zeroPad(s.month() + 1), "/").concat(fns.zeroPad(s.date()), "/").concat(s.year()),
        // mm/dd/yyyy
        'numeric-uk': s => "".concat(fns.zeroPad(s.date()), "/").concat(fns.zeroPad(s.month() + 1), "/").concat(s.year()),
        //dd/mm/yyyy
        'mm/dd': s => "".concat(fns.zeroPad(s.month() + 1), "/").concat(fns.zeroPad(s.date())),
        //mm/dd
        // ... https://en.wikipedia.org/wiki/ISO_8601 ;(((
        iso: s => {
          let year = s.format('iso-year');
          let month = fns.zeroPad(s.month() + 1); //1-based months

          let date = fns.zeroPad(s.date());
          let hour = fns.zeroPad(s.h24());
          let minute = fns.zeroPad(s.minute());
          let second = fns.zeroPad(s.second());
          let ms = fns.zeroPad(s.millisecond(), 3);

          let offset = _offset(s);

          return "".concat(year, "-").concat(month, "-").concat(date, "T").concat(hour, ":").concat(minute, ":").concat(second, ".").concat(ms).concat(offset); //2018-03-09T08:50:00.000-05:00
        },
        'iso-short': s => {
          let month = fns.zeroPad(s.month() + 1); //1-based months

          let date = fns.zeroPad(s.date());
          return "".concat(s.year(), "-").concat(month, "-").concat(date); //2017-02-15
        },
        'iso-utc': s => {
          return new Date(s.epoch).toISOString(); //2017-03-08T19:45:28.367Z
        },
        //i made these up
        nice: s => "".concat(months$1.short()[s.month()], " ").concat(fns.ordinal(s.date()), ", ").concat(s.time()),
        'nice-24': s => "".concat(months$1.short()[s.month()], " ").concat(fns.ordinal(s.date()), ", ").concat(s.hour24(), ":").concat(fns.zeroPad(s.minute())),
        'nice-year': s => "".concat(months$1.short()[s.month()], " ").concat(fns.ordinal(s.date()), ", ").concat(s.year()),
        'nice-day': s => "".concat(days.short()[s.day()], " ").concat(applyCaseFormat(months$1.short()[s.month()]), " ").concat(fns.ordinal(s.date())),
        'nice-full': s => "".concat(s.dayName(), " ").concat(applyCaseFormat(s.monthName()), " ").concat(fns.ordinal(s.date()), ", ").concat(s.time()),
        'nice-full-24': s => "".concat(s.dayName(), " ").concat(applyCaseFormat(s.monthName()), " ").concat(fns.ordinal(s.date()), ", ").concat(s.hour24(), ":").concat(fns.zeroPad(s.minute()))
      }; //aliases

      const aliases = {
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
        'nice-short-24': 'nice-24',
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
      Object.keys(aliases).forEach(k => format[k] = format[aliases[k]]);

      const printFormat = (s, str = '') => {
        //don't print anything if it's an invalid date
        if (s.isValid() !== true) {
          return '';
        } //support .format('month')


        if (format.hasOwnProperty(str)) {
          let out = format[str](s) || '';

          if (str !== 'json') {
            out = String(out);

            if (str !== 'ampm') {
              out = applyCaseFormat(out);
            }
          }

          return out;
        } //support '{hour}:{minute}' notation


        if (str.indexOf('{') !== -1) {
          let sections = /\{(.+?)\}/g;
          str = str.replace(sections, (_, fmt) => {
            fmt = fmt.toLowerCase().trim();

            if (format.hasOwnProperty(fmt)) {
              let out = String(format[fmt](s));

              if (fmt !== 'ampm') {
                return applyCaseFormat(out);
              }

              return out;
            }

            return '';
          });
          return str;
        }

        return s.format('iso-short');
      };

      var format_1 = printFormat;
      const pad = fns.zeroPad;
      const formatTimezone = fns.formatTimezone; //parse this insane unix-time-templating thing, from the 19th century
      //http://unicode.org/reports/tr35/tr35-25.html#Date_Format_Patterns
      //time-symbols we support

      const mapping = {
        G: s => s.era(),
        GG: s => s.era(),
        GGG: s => s.era(),
        GGGG: s => s.era() === 'AD' ? 'Anno Domini' : 'Before Christ',
        //year
        y: s => s.year(),
        yy: s => {
          //last two chars
          return parseInt(String(s.year()).substr(2, 4), 10);
        },
        yyy: s => s.year(),
        yyyy: s => s.year(),
        yyyyy: s => '0' + s.year(),
        // u: (s) => {},//extended non-gregorian years
        //quarter
        Q: s => s.quarter(),
        QQ: s => s.quarter(),
        QQQ: s => s.quarter(),
        QQQQ: s => s.quarter(),
        //month
        M: s => s.month() + 1,
        MM: s => pad(s.month() + 1),
        MMM: s => s.format('month-short'),
        MMMM: s => s.format('month'),
        //week
        w: s => s.week(),
        ww: s => pad(s.week()),
        //week of month
        // W: (s) => s.week(),
        //date of month
        d: s => s.date(),
        dd: s => pad(s.date()),
        //date of year
        D: s => s.dayOfYear(),
        DD: s => pad(s.dayOfYear()),
        DDD: s => pad(s.dayOfYear(), 3),
        // F: (s) => {},//date of week in month
        // g: (s) => {},//modified julian day
        //day
        E: s => s.format('day-short'),
        EE: s => s.format('day-short'),
        EEE: s => s.format('day-short'),
        EEEE: s => s.format('day'),
        EEEEE: s => s.format('day')[0],
        e: s => s.day(),
        ee: s => s.day(),
        eee: s => s.format('day-short'),
        eeee: s => s.format('day'),
        eeeee: s => s.format('day')[0],
        //am/pm
        a: s => s.ampm().toUpperCase(),
        aa: s => s.ampm().toUpperCase(),
        aaa: s => s.ampm().toUpperCase(),
        aaaa: s => s.ampm().toUpperCase(),
        //hour
        h: s => s.h12(),
        hh: s => pad(s.h12()),
        H: s => s.hour(),
        HH: s => pad(s.hour()),
        // j: (s) => {},//weird hour format
        m: s => s.minute(),
        mm: s => pad(s.minute()),
        s: s => s.second(),
        ss: s => pad(s.second()),
        //milliseconds in the day
        A: s => s.epoch - s.startOf('day').epoch,
        //timezone
        z: s => s.timezone().name,
        zz: s => s.timezone().name,
        zzz: s => s.timezone().name,
        zzzz: s => s.timezone().name,
        Z: s => formatTimezone(s.timezone().current.offset),
        ZZ: s => formatTimezone(s.timezone().current.offset),
        ZZZ: s => formatTimezone(s.timezone().current.offset),
        ZZZZ: s => formatTimezone(s.timezone().current.offset, ':')
      };

      const addAlias = (char, to, n) => {
        let name = char;
        let toName = to;

        for (let i = 0; i < n; i += 1) {
          mapping[name] = mapping[toName];
          name += char;
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

      const escapeChars = function (arr) {
        for (let i = 0; i < arr.length; i += 1) {
          if (arr[i] === "'") {
            // greedy-search for next apostrophe
            for (let o = i + 1; o < arr.length; o += 1) {
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

        return arr.filter(ch => ch);
      }; //combine consecutive chars, like 'yyyy' as one.


      const combineRepeated = function (arr) {
        for (let i = 0; i < arr.length; i += 1) {
          let c = arr[i]; // greedy-forward

          for (let o = i + 1; o < arr.length; o += 1) {
            if (arr[o] === c) {
              arr[i] += arr[o];
              arr[o] = null;
            } else {
              break;
            }
          }
        } // '' means one apostrophe


        arr = arr.filter(ch => ch);
        arr = arr.map(str => {
          if (str === "''") {
            str = "'";
          }

          return str;
        });
        return arr;
      };

      const unixFmt = (s, str) => {
        let arr = str.split(''); // support character escaping

        arr = escapeChars(arr); //combine 'yyyy' as string.

        arr = combineRepeated(arr);
        return arr.reduce((txt, c) => {
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
      const units$2 = ['year', 'season', 'quarter', 'month', 'week', 'day', 'quarterHour', 'hour', 'minute'];

      const doUnit = function (s, k) {
        let start = s.clone().startOf(k);
        let end = s.clone().endOf(k);
        let duration = end.epoch - start.epoch;
        let percent = (s.epoch - start.epoch) / duration;
        return parseFloat(percent.toFixed(2));
      }; //how far it is along, from 0-1


      const progress = (s, unit) => {
        if (unit) {
          unit = fns.normalize(unit);
          return doUnit(s, unit);
        }

        let obj = {};
        units$2.forEach(k => {
          obj[k] = doUnit(s, k);
        });
        return obj;
      };

      var progress_1 = progress;

      const nearest = (s, unit) => {
        //how far have we gone?
        let prog = s.progress();
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

      const climb = (a, b, unit) => {
        let i = 0;
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


      const diffOne = (a, b, unit) => {
        if (a.isBefore(b)) {
          return climb(a, b, unit);
        } else {
          return climb(b, a, unit) * -1; //reverse it
        }
      };

      var one = diffOne; // 2020 - 2019 may be 1 year, or 0 years
      // - '1 year difference' means 366 days during a leap year

      const fastYear = (a, b) => {
        let years = b.year() - a.year(); // should we decrement it by 1?

        a = a.year(b.year());

        if (a.isAfter(b)) {
          years -= 1;
        }

        return years;
      }; // use a waterfall-method for computing a diff of any 'pre-knowable' units
      // compute years, then compute months, etc..
      // ... then ms-math for any very-small units


      const diff$1 = function (a, b) {
        // an hour is always the same # of milliseconds
        // so these units can be 'pre-calculated'
        let msDiff = b.epoch - a.epoch;
        let obj = {
          milliseconds: msDiff,
          seconds: parseInt(msDiff / 1000, 10)
        };
        obj.minutes = parseInt(obj.seconds / 60, 10);
        obj.hours = parseInt(obj.minutes / 60, 10); //do the year

        let tmp = a.clone();
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

      var waterfall = diff$1;

      const reverseDiff = function (obj) {
        Object.keys(obj).forEach(k => {
          obj[k] *= -1;
        });
        return obj;
      }; // this method counts a total # of each unit, between a, b.
      // '1 month' means 28 days in february
      // '1 year' means 366 days in a leap year


      const main$1 = function (a, b, unit) {
        b = fns.beADate(b, a); //reverse values, if necessary

        let reversed = false;

        if (a.isAfter(b)) {
          let tmp = a;
          a = b;
          b = tmp;
          reversed = true;
        } //compute them all (i know!)


        let obj = waterfall(a, b);

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

      var diff = main$1; //our conceptual 'break-points' for each unit

      const qualifiers = {
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
        const isBefore = a.isBefore(b);
        const later = isBefore ? b : a;
        let earlier = isBefore ? a : b;
        earlier = earlier.clone();
        const diff = {
          years: 0,
          months: 0,
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        };
        Object.keys(diff).forEach(unit => {
          if (earlier.isSame(later, unit)) {
            return;
          }

          let max = earlier.diff(later, unit);
          earlier = earlier.add(max, unit);
          diff[unit] = max;
        }); //reverse it, if necessary

        if (isBefore) {
          Object.keys(diff).forEach(u => {
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


      const since = (start, end) => {
        end = fns.beADate(end, start);
        const diff = getDiff(start, end);
        const isNow = Object.keys(diff).every(u => !diff[u]);

        if (isNow === true) {
          return {
            diff,
            rounded: 'now',
            qualified: 'now',
            precise: 'now'
          };
        }

        let rounded;
        let qualified;
        let precise;
        let englishValues = []; //go through each value and create its text-representation

        Object.keys(diff).forEach((unit, i, units) => {
          const value = Math.abs(diff[unit]);

          if (value === 0) {
            return;
          }

          const englishValue = pluralize(value, unit);
          englishValues.push(englishValue);

          if (!rounded) {
            rounded = qualified = englishValue;

            if (i > 4) {
              return;
            } //is it a 'almost' something, etc?


            const nextUnit = units[i + 1];
            const nextValue = Math.abs(diff[nextUnit]);

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
          diff,
          rounded,
          qualified,
          precise
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
      const units$1 = {
        minute: s => {
          walk_1(s, {
            second: 0,
            millisecond: 0
          });
          return s;
        },
        quarterhour: s => {
          let minute = s.minutes();

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
        hour: s => {
          walk_1(s, {
            minute: 0,
            second: 0,
            millisecond: 0
          });
          return s;
        },
        day: s => {
          walk_1(s, {
            hour: 0,
            minute: 0,
            second: 0,
            millisecond: 0
          });
          return s;
        },
        week: s => {
          let original = s.clone();
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
        month: s => {
          walk_1(s, {
            date: 1,
            hour: 0,
            minute: 0,
            second: 0,
            millisecond: 0
          });
          return s;
        },
        quarter: s => {
          let q = s.quarter();

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
        season: s => {
          let current = s.season();
          let hem = 'north';

          if (s.hemisphere() === 'South') {
            hem = 'south';
          }

          for (let i = 0; i < seasons[hem].length; i++) {
            if (seasons[hem][i][0] === current) {
              //winter goes between years
              let year = s.year();

              if (current === 'winter' && s.month() < 3) {
                year -= 1;
              }

              walk_1(s, {
                year,
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
        year: s => {
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
        decade: s => {
          s = s.startOf('year');
          let year = s.year();
          let decade = parseInt(year / 10, 10) * 10;
          s = s.year(decade);
          return s;
        },
        century: s => {
          s = s.startOf('year');
          let year = s.year(); // near 0AD goes '-1 | +1'

          let decade = parseInt(year / 100, 10) * 100;
          s = s.year(decade);
          return s;
        }
      };
      units$1.date = units$1.day;

      const startOf = (a, unit) => {
        let s = a.clone();
        unit = fns.normalize(unit);

        if (units$1[unit]) {
          return units$1[unit](s);
        }

        if (unit === 'summer' || unit === 'winter') {
          s = s.season(unit);
          return units$1.season(s);
        }

        return s;
      }; //piggy-backs off startOf


      const endOf = (a, unit) => {
        let s = a.clone();
        unit = fns.normalize(unit);

        if (units$1[unit]) {
          // go to beginning, go to next one, step back 1ms
          s = units$1[unit](s); // startof

          s = s.add(1, unit);
          s = s.subtract(1, 'millisecond');
          return s;
        }

        return s;
      };

      var startOf_1 = {
        startOf,
        endOf
      };

      const isDay = function (unit) {
        if (days.short().find(s => s === unit)) {
          return true;
        }

        if (days.long().find(s => s === unit)) {
          return true;
        }

        return false;
      }; // return a list of the weeks/months/days between a -> b
      // returns spacetime objects in the timezone of the input


      const every = function (start, unit = '', end) {
        if (!unit || !end) {
          return [];
        } //cleanup unit param


        unit = fns.normalize(unit); //cleanup to param

        end = start.clone().set(end); //swap them, if they're backwards

        if (start.isAfter(end)) {
          let tmp = start;
          start = end;
          end = tmp;
        } //support 'every wednesday'


        let d = start.clone();

        if (isDay(unit)) {
          d = d.next(unit);
          unit = 'week';
        } else {
          d = d.next(unit);
        } //okay, actually start doing it


        let result = [];

        while (d.isBefore(end)) {
          result.push(d);
          d = d.add(1, unit);
        }

        return result;
      };

      var every_1 = every;

      const parseDst = dst => {
        if (!dst) {
          return [];
        }

        return dst.split('->');
      };

      const titleCase = str => {
        str = str[0].toUpperCase() + str.substr(1);
        str = str.replace(/\/gmt/, '/GMT');
        str = str.replace(/[\/_]([a-z])/gi, s => {
          return s.toUpperCase();
        });
        return str;
      }; //get metadata about this timezone


      const timezone = s => {
        let zones = s.timezones;
        let tz = s.tz;

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

        let found = zones[tz];
        let result = {
          name: titleCase(tz),
          hasDst: Boolean(found.dst),
          default_offset: found.offset,
          //do north-hemisphere version as default (sorry!)
          hemisphere: found.hem === 's' ? 'South' : 'North',
          current: {}
        };

        if (result.hasDst) {
          let arr = parseDst(found.dst);
          result.change = {
            start: arr[0],
            back: arr[1]
          };
        } //find the offsets for summer/winter times
        //(these variable names are north-centric)


        let summer = found.offset; // (july)

        let winter = summer; // (january) assume it's the same for now

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
      const units = ['century', 'decade', 'year', 'month', 'date', 'day', 'hour', 'minute', 'second', 'millisecond']; //the spacetime instance methods (also, the API)

      const methods$4 = {
        set: function (input$1, tz) {
          let s = this.clone();
          s = input(s, input$1);

          if (tz) {
            this.tz = find(tz);
          }

          return s;
        },
        timezone: function () {
          return timezone_1(this);
        },
        isDST: function () {
          return timezone_1(this).current.isDST;
        },
        hasDST: function () {
          return timezone_1(this).hasDst;
        },
        offset: function () {
          return timezone_1(this).current.offset * 60;
        },
        hemisphere: function () {
          return timezone_1(this).hemisphere;
        },
        format: function (fmt) {
          return format_1(this, fmt);
        },
        unixFmt: function (fmt) {
          return unixFmt_1(this, fmt);
        },
        startOf: function (unit) {
          return startOf_1.startOf(this, unit);
        },
        endOf: function (unit) {
          return startOf_1.endOf(this, unit);
        },
        leapYear: function () {
          let year = this.year();
          return fns.isLeapYear(year);
        },
        progress: function (unit) {
          return progress_1(this, unit);
        },
        nearest: function (unit) {
          return nearest_1(this, unit);
        },
        diff: function (d, unit) {
          return diff(this, d, unit);
        },
        since: function (d) {
          if (!d) {
            d = this.clone().set();
          }

          return since_1(this, d);
        },
        next: function (unit) {
          let s = this.add(1, unit);
          return s.startOf(unit);
        },
        //the start of the previous year/week/century
        last: function (unit) {
          let s = this.subtract(1, unit);
          return s.startOf(unit);
        },
        isValid: function () {
          //null/undefined epochs
          if (!this.epoch && this.epoch !== 0) {
            return false;
          }

          return !isNaN(this.d.getTime());
        },
        //travel to this timezone
        goto: function (tz) {
          let s = this.clone();
          s.tz = find(tz, s.timezones); //science!

          return s;
        },
        //get each week/month/day between a -> b
        every: function (unit, to) {
          // allow swapping these params:
          if (typeof unit === 'object' && typeof to === 'string') {
            let tmp = to;
            to = unit;
            unit = tmp;
          }

          return every_1(this, unit, to);
        },
        isAwake: function () {
          let hour = this.hour(); //10pm -> 8am

          if (hour < 8 || hour > 22) {
            return false;
          }

          return true;
        },
        isAsleep: function () {
          return !this.isAwake();
        },
        //pretty-printing
        log: function () {
          console.log('');
          console.log(format_1(this, 'nice-short'));
          return this;
        },
        logYear: function () {
          console.log('');
          console.log(format_1(this, 'full-short'));
          return this;
        },
        json: function () {
          return units.reduce((h, unit) => {
            h[unit] = this[unit]();
            return h;
          }, {});
        },
        debug: function () {
          let tz = this.timezone();
          let date = this.format('MM') + ' ' + this.format('date-ordinal') + ' ' + this.year();
          date += '\n     - ' + this.format('time');
          console.log('\n\n', date + '\n     - ' + tz.name + ' (' + tz.current.offset + ')');
          return this;
        },
        //alias of 'since' but opposite - like moment.js
        from: function (d) {
          d = this.clone().set(d);
          return d.since(this);
        },
        fromNow: function () {
          let d = this.clone().set(Date.now());
          return d.since(this);
        },
        weekStart: function (input) {
          //accept a number directly
          if (typeof input === 'number') {
            this._weekStart = input;
            return this;
          }

          if (typeof input === 'string') {
            // accept 'wednesday'
            input = input.toLowerCase().trim();
            let num = days.short().indexOf(input);

            if (num === -1) {
              num = days.long().indexOf(input);
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

      methods$4.inDST = methods$4.isDST;
      methods$4.round = methods$4.nearest;
      methods$4.each = methods$4.every;
      var methods_1 = methods$4; //these methods wrap around them.

      const isLeapYear$1 = fns.isLeapYear;

      const validate = n => {
        //handle number as a string
        if (typeof n === 'string') {
          n = parseInt(n, 10);
        }

        return n;
      };

      const order$1 = ['year', 'month', 'date', 'hour', 'minute', 'second', 'millisecond']; //reduce hostile micro-changes when moving dates by millisecond

      const confirm = (s, tmp, unit) => {
        let n = order$1.indexOf(unit);
        let arr = order$1.slice(n, order$1.length);

        for (let i = 0; i < arr.length; i++) {
          let want = tmp[arr[i]]();
          s[arr[i]](want);
        }

        return s;
      }; // allow specifying setter direction


      const fwdBkwd = function (s, old, goFwd, unit) {
        if (goFwd === true && s.isBefore(old)) {
          s = s.add(1, unit);
        } else if (goFwd === false && s.isAfter(old)) {
          s = s.minus(1, unit);
        }

        return s;
      };

      var set = {
        milliseconds: (s, n) => {
          n = validate(n);
          let current = s.millisecond();
          let diff = current - n; //milliseconds to shift by

          return s.epoch - diff;
        },
        seconds: (s, n, goFwd) => {
          n = validate(n);
          let old = s.clone();
          let diff = s.second() - n;
          let shift = diff * milliseconds.second;
          s.epoch = s.epoch - shift;
          s = fwdBkwd(s, old, goFwd, 'minute'); // specify direction

          return s.epoch;
        },
        minutes: (s, n, goFwd) => {
          n = validate(n);
          let old = s.clone();
          let diff = s.minute() - n;
          let shift = diff * milliseconds.minute;
          s.epoch -= shift;
          confirm(s, old, 'second');
          s = fwdBkwd(s, old, goFwd, 'hour'); // specify direction

          return s.epoch;
        },
        hours: (s, n, goFwd) => {
          n = validate(n);

          if (n >= 24) {
            n = 24;
          } else if (n < 0) {
            n = 0;
          }

          let old = s.clone();
          let diff = s.hour() - n;
          let shift = diff * milliseconds.hour;
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
          s = fwdBkwd(s, old, goFwd, 'day'); // specify direction

          return s.epoch;
        },
        //support setting time by '4:25pm'
        time: (s, str, goFwd) => {
          let m = str.match(/([0-9]{1,2})[:h]([0-9]{1,2})(:[0-9]{1,2})? ?(am|pm)?/);

          if (!m) {
            //fallback to support just '2am'
            m = str.match(/([0-9]{1,2}) ?(am|pm)/);

            if (!m) {
              return s.epoch;
            }

            m.splice(2, 0, '0'); //add implicit 0 minutes

            m.splice(3, 0, ''); //add implicit seconds
          }

          let h24 = false;
          let hour = parseInt(m[1], 10);
          let minute = parseInt(m[2], 10);

          if (minute >= 60) {
            minute = 59;
          }

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
          let sec = parseInt(m[3], 10) || 0;
          let old = s.clone();
          s = s.hour(hour);
          s = s.minute(minute);
          s = s.second(sec);
          s = s.millisecond(0);
          s = fwdBkwd(s, old, goFwd, 'day'); // specify direction

          return s.epoch;
        },
        date: (s, n, goFwd) => {
          n = validate(n); //avoid setting february 31st

          if (n > 28) {
            let month = s.month();
            let max = monthLengths_1[month]; // support leap day in february

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

          let old = s.clone();
          walk_1(s, {
            date: n
          });
          s = fwdBkwd(s, old, goFwd, 'month'); // specify direction

          return s.epoch;
        },
        //this one's tricky
        month: (s, n, goFwd) => {
          if (typeof n === 'string') {
            n = months$1.mapping()[n.toLowerCase()];
          }

          n = validate(n); //don't go past december

          if (n >= 12) {
            n = 11;
          }

          if (n <= 0) {
            n = 0;
          }

          let date = s.date(); //there's no 30th of february, etc.

          if (date > monthLengths_1[n]) {
            //make it as close as we can..
            date = monthLengths_1[n];
          }

          let old = s.clone();
          walk_1(s, {
            month: n,
            date
          });
          s = fwdBkwd(s, old, goFwd, 'year'); // specify direction

          return s.epoch;
        },
        year: (s, n) => {
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
        // go to the nth week of the year
        week: (s, n, goFwd) => {
          let old = s.clone();
          n = validate(n);
          s = s.month(0);
          s = s.date(1);
          s = s.day('monday'); //first week starts first Thurs in Jan
          // so mon dec 28th is 1st week
          // so mon dec 29th is not the week

          if (s.monthName() === 'december' && s.date() >= 28) {
            s = s.add(1, 'week');
          }

          n -= 1; //1-based

          s = s.add(n, 'weeks');
          s = fwdBkwd(s, old, goFwd, 'year'); // specify direction

          return s.epoch;
        },
        // go to the nth day of the year
        dayOfYear: (s, n, goFwd) => {
          n = validate(n);
          let old = s.clone();
          n -= 1; //days are 1-based

          if (n <= 0) {
            n = 0;
          } else if (n >= 365) {
            n = 364;
          }

          s = s.startOf('year');
          s = s.add(n, 'day');
          confirm(s, old, 'hour');
          s = fwdBkwd(s, old, goFwd, 'year'); // specify direction

          return s.epoch;
        }
      };
      const methods$3 = {
        millisecond: function (num) {
          if (num !== undefined) {
            let s = this.clone();
            s.epoch = set.milliseconds(s, num);
            return s;
          }

          return this.d.getMilliseconds();
        },
        second: function (num, goFwd) {
          if (num !== undefined) {
            let s = this.clone();
            s.epoch = set.seconds(s, num, goFwd);
            return s;
          }

          return this.d.getSeconds();
        },
        minute: function (num, goFwd) {
          if (num !== undefined) {
            let s = this.clone();
            s.epoch = set.minutes(s, num, goFwd);
            return s;
          }

          return this.d.getMinutes();
        },
        hour: function (num, goFwd) {
          let d = this.d;

          if (num !== undefined) {
            let s = this.clone();
            s.epoch = set.hours(s, num, goFwd);
            return s;
          }

          return d.getHours();
        },
        //'3:30' is 3.5
        hourFloat: function (num, goFwd) {
          if (num !== undefined) {
            let s = this.clone();
            let minute = num % 1;
            minute = minute * 60;
            let hour = parseInt(num, 10);
            s.epoch = set.hours(s, hour, goFwd);
            s.epoch = set.minutes(s, minute, goFwd);
            return s;
          }

          let d = this.d;
          let hour = d.getHours();
          let minute = d.getMinutes();
          minute = minute / 60;
          return hour + minute;
        },
        // hour in 12h format
        hour12: function (str, goFwd) {
          let d = this.d;

          if (str !== undefined) {
            let s = this.clone();
            str = '' + str;
            let m = str.match(/^([0-9]+)(am|pm)$/);

            if (m) {
              let hour = parseInt(m[1], 10);

              if (m[2] === 'pm') {
                hour += 12;
              }

              s.epoch = set.hours(s, hour, goFwd);
            }

            return s;
          } //get the hour


          let hour12 = d.getHours();

          if (hour12 > 12) {
            hour12 = hour12 - 12;
          }

          if (hour12 === 0) {
            hour12 = 12;
          }

          return hour12;
        },
        //some ambiguity here with 12/24h
        time: function (str, goFwd) {
          if (str !== undefined) {
            let s = this.clone();
            str = str.toLowerCase().trim();
            s.epoch = set.time(s, str, goFwd);
            return s;
          }

          return "".concat(this.h12(), ":").concat(fns.zeroPad(this.minute())).concat(this.ampm());
        },
        // either 'am' or 'pm'
        ampm: function (input, goFwd) {
          let which = 'am';
          let hour = this.hour();

          if (hour >= 12) {
            which = 'pm';
          }

          if (typeof input !== 'string') {
            return which;
          } //okay, we're doing a setter


          let s = this.clone();
          input = input.toLowerCase().trim(); //ampm should never change the day
          // - so use `.hour(n)` instead of `.minus(12,'hour')`

          if (hour >= 12 && input === 'am') {
            //noon is 12pm
            hour -= 12;
            return s.hour(hour, goFwd);
          }

          if (hour < 12 && input === 'pm') {
            hour += 12;
            return s.hour(hour, goFwd);
          }

          return s;
        },
        //some hard-coded times of day, like 'noon'
        dayTime: function (str, goFwd) {
          if (str !== undefined) {
            const times = {
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
            let s = this.clone();
            str = str || '';
            str = str.toLowerCase();

            if (times.hasOwnProperty(str) === true) {
              s = s.time(times[str], goFwd);
            }

            return s;
          }

          let h = this.hour();

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
        iso: function (num) {
          if (num !== undefined) {
            return this.set(num);
          }

          return this.format('iso');
        }
      };
      var _01Time = methods$3;
      const methods$2 = {
        // # day in the month
        date: function (num, goFwd) {
          if (num !== undefined) {
            let s = this.clone();
            num = parseInt(num, 10);

            if (num) {
              s.epoch = set.date(s, num, goFwd);
            }

            return s;
          }

          return this.d.getDate();
        },
        //like 'wednesday' (hard!)
        day: function (input, goFwd) {
          if (input === undefined) {
            return this.d.getDay();
          }

          let original = this.clone();
          let want = input; // accept 'wednesday'

          if (typeof input === 'string') {
            input = input.toLowerCase();

            if (days.aliases.hasOwnProperty(input)) {
              want = days.aliases[input];
            } else {
              want = days.short().indexOf(input);

              if (want === -1) {
                want = days.long().indexOf(input);
              }
            }
          } //move approx


          let day = this.d.getDay();
          let diff = day - want;

          if (goFwd === true && diff > 0) {
            diff = diff - 7;
          }

          if (goFwd === false && diff < 0) {
            diff = diff + 7;
          }

          let s = this.subtract(diff, 'days'); //tighten it back up

          walk_1(s, {
            hour: original.hour(),
            minute: original.minute(),
            second: original.second()
          });
          return s;
        },
        //these are helpful name-wrappers
        dayName: function (input, goFwd) {
          if (input === undefined) {
            return days.long()[this.day()];
          }

          let s = this.clone();
          s = s.day(input, goFwd);
          return s;
        }
      };
      var _02Date = methods$2;

      const clearMinutes = s => {
        s = s.minute(0);
        s = s.second(0);
        s = s.millisecond(1);
        return s;
      };

      const methods$1 = {
        // day 0-366
        dayOfYear: function (num, goFwd) {
          if (num !== undefined) {
            let s = this.clone();
            s.epoch = set.dayOfYear(s, num, goFwd);
            return s;
          } //days since newyears - jan 1st is 1, jan 2nd is 2...


          let sum = 0;
          let month = this.d.getMonth();
          let tmp; //count the num days in each month

          for (let i = 1; i <= month; i++) {
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
        week: function (num, goFwd) {
          // week-setter
          if (num !== undefined) {
            let s = this.clone();
            s.epoch = set.week(this, num, goFwd);
            s = clearMinutes(s);
            return s;
          } //find-out which week it is


          let tmp = this.clone();
          tmp = tmp.month(0);
          tmp = tmp.date(1);
          tmp = clearMinutes(tmp);
          tmp = tmp.day('monday'); //don't go into last-year

          if (tmp.monthName() === 'december' && tmp.date() >= 28) {
            tmp = tmp.add(1, 'week');
          } // is first monday the 1st?


          let toAdd = 1;

          if (tmp.date() === 1) {
            toAdd = 0;
          }

          tmp = tmp.minus(1, 'second');
          const thisOne = this.epoch; //if the week technically hasn't started yet

          if (tmp.epoch > thisOne) {
            return 1;
          } //speed it up, if we can


          let i = 0;
          let skipWeeks = this.month() * 4;
          tmp.epoch += milliseconds.week * skipWeeks;
          i += skipWeeks;

          for (; i <= 52; i++) {
            if (tmp.epoch > thisOne) {
              return i + toAdd;
            }

            tmp = tmp.add(1, 'week');
          }

          return 52;
        },
        //either name or number
        month: function (input, goFwd) {
          if (input !== undefined) {
            let s = this.clone();
            s.epoch = set.month(s, input, goFwd);
            return s;
          }

          return this.d.getMonth();
        },
        //'january'
        monthName: function (input, goFwd) {
          if (input !== undefined) {
            let s = this.clone();
            s = s.month(input, goFwd);
            return s;
          }

          return months$1.long()[this.month()];
        },
        //q1, q2, q3, q4
        quarter: function (num, goFwd) {
          if (num !== undefined) {
            if (typeof num === 'string') {
              num = num.replace(/^q/i, '');
              num = parseInt(num, 10);
            }

            if (quarters[num]) {
              let s = this.clone();
              let month = quarters[num][0];
              s = s.month(month, goFwd);
              s = s.date(1, goFwd);
              s = s.startOf('day');
              return s;
            }
          }

          let month = this.d.getMonth();

          for (let i = 1; i < quarters.length; i++) {
            if (month < quarters[i][0]) {
              return i - 1;
            }
          }

          return 4;
        },
        //spring, summer, winter, fall
        season: function (input, goFwd) {
          let hem = 'north';

          if (this.hemisphere() === 'South') {
            hem = 'south';
          }

          if (input !== undefined) {
            let s = this.clone();

            for (let i = 0; i < seasons[hem].length; i++) {
              if (input === seasons[hem][i][0]) {
                s = s.month(seasons[hem][i][1], goFwd);
                s = s.date(1);
                s = s.startOf('day');
              }
            }

            return s;
          }

          let month = this.d.getMonth();

          for (let i = 0; i < seasons[hem].length - 1; i++) {
            if (month >= seasons[hem][i][1] && month < seasons[hem][i + 1][1]) {
              return seasons[hem][i][0];
            }
          }

          return 'winter';
        },
        //the year number
        year: function (num) {
          if (num !== undefined) {
            let s = this.clone();
            s.epoch = set.year(s, num);
            return s;
          }

          return this.d.getFullYear();
        },
        //bc/ad years
        era: function (str) {
          if (str !== undefined) {
            let s = this.clone();
            str = str.toLowerCase(); //TODO: there is no year-0AD i think. may have off-by-1 error here

            let year = s.d.getFullYear(); //make '1992' into 1992bc..

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
        decade: function (input) {
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

            let year = Number(input);

            if (isNaN(year)) {
              return this;
            } // round it down to the decade


            year = Math.floor(year / 10) * 10;
            return this.year(year); //.startOf('decade')
          }

          return this.startOf('decade').year();
        },
        // 1950 -> 19+1
        century: function (input) {
          if (input !== undefined) {
            if (typeof input === 'string') {
              input = input.replace(/([0-9])(th|rd|st|nd)/, '$1'); //fix ordinals

              input = input.replace(/([0-9]+) ?(b\.?c\.?|a\.?d\.?)/i, (a, b, c) => {
                if (c.match(/b\.?c\.?/i)) {
                  b = '-' + b;
                }

                return b;
              });
              input = input.replace(/c$/, ''); //20thC
            }

            let year = Number(input);

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


          let num = this.startOf('century').year();
          num = Math.floor(num / 100);

          if (num < 0) {
            return num - 1;
          }

          return num + 1;
        },
        // 2019 -> 2+1
        millenium: function (input) {
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

            let year = input * 1000; // there is no year 0

            if (year === 0) {
              year = 1;
            }

            return this.year(year);
          } // get the current millenium


          let num = Math.floor(this.year() / 1000);

          if (num >= 0) {
            num += 1;
          }

          return num;
        }
      };
      var _03Year = methods$1;
      const methods = Object.assign({}, _01Time, _02Date, _03Year); //aliases

      methods.milliseconds = methods.millisecond;
      methods.seconds = methods.second;
      methods.minutes = methods.minute;
      methods.hours = methods.hour;
      methods.hour24 = methods.hour;
      methods.h12 = methods.hour12;
      methods.h24 = methods.hour24;
      methods.days = methods.day;

      const addMethods$4 = Space => {
        //hook the methods into prototype
        Object.keys(methods).forEach(k => {
          Space.prototype[k] = methods[k];
        });
      };

      var query = addMethods$4;
      const isLeapYear = fns.isLeapYear;

      const getMonthLength = function (month, year) {
        if (month === 1 && isLeapYear(year)) {
          return 29;
        }

        return monthLengths_1[month];
      }; //month is the one thing we 'model/compute'
      //- because ms-shifting can be off by enough


      const rollMonth = (want, old) => {
        //increment year
        if (want.month > 0) {
          let years = parseInt(want.month / 12, 10);
          want.year = old.year() + years;
          want.month = want.month % 12;
        } else if (want.month < 0) {
          //decrement year
          let years = Math.floor(Math.abs(want.month) / 13, 10);
          years = Math.abs(years) + 1;
          want.year = old.year() - years; //ignore extras

          want.month = want.month % 12;
          want.month = want.month + 12;

          if (want.month === 12) {
            want.month = 0;
          }
        }

        return want;
      }; // briefly support day=-2 (this does not need to be perfect.)


      const rollDaysDown = (want, old, sum) => {
        want.year = old.year();
        want.month = old.month();
        let date = old.date();
        want.date = date - Math.abs(sum);

        while (want.date < 1) {
          want.month -= 1;

          if (want.month < 0) {
            want.month = 11;
            want.year -= 1;
          }

          let max = getMonthLength(want.month, want.year);
          want.date += max;
        }

        return want;
      }; // briefly support day=33 (this does not need to be perfect.)


      const rollDaysUp = (want, old, sum) => {
        let year = old.year();
        let month = old.month();
        let max = getMonthLength(month, year);

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

      const order = ['millisecond', 'second', 'minute', 'hour', 'date', 'month'];
      let keep = {
        second: order.slice(0, 1),
        minute: order.slice(0, 2),
        quarterhour: order.slice(0, 2),
        hour: order.slice(0, 3),
        date: order.slice(0, 4),
        month: order.slice(0, 4),
        quarter: order.slice(0, 4),
        season: order.slice(0, 4),
        year: order,
        decade: order,
        century: order
      };
      keep.week = keep.hour;
      keep.season = keep.date;
      keep.quarter = keep.date; // Units need to be dst adjuested

      const dstAwareUnits = {
        year: true,
        quarter: true,
        season: true,
        month: true,
        week: true,
        day: true
      };
      const keepDate = {
        month: true,
        quarter: true,
        season: true,
        year: true
      };

      const addMethods$3 = SpaceTime => {
        SpaceTime.prototype.add = function (num, unit) {
          let s = this.clone();

          if (!unit || num === 0) {
            return s; //don't bother
          }

          let old = this.clone();
          unit = fns.normalize(unit);

          if (unit === 'millisecond') {
            s.epoch += num;
            return s;
          } // support 'fortnight' alias


          if (unit === 'fortnight') {
            num *= 2;
            unit = 'week';
          } //move forward by the estimated milliseconds (rough)


          if (milliseconds[unit]) {
            s.epoch += milliseconds[unit] * num;
          } else if (unit === 'week' || unit === 'weekend') {
            s.epoch += milliseconds.day * (num * 7);
          } else if (unit === 'quarter' || unit === 'season') {
            s.epoch += milliseconds.month * (num * 3);
          } else if (unit === 'quarterhour') {
            s.epoch += milliseconds.minute * 15 * num;
          } //now ensure our milliseconds/etc are in-line


          let want = {};

          if (keep[unit]) {
            keep[unit].forEach(u => {
              want[u] = old[u]();
            });
          }

          if (dstAwareUnits[unit]) {
            const diff = old.timezone().current.offset - s.timezone().current.offset;
            s.epoch += diff * 3600 * 1000;
          } //ensure month/year has ticked-over


          if (unit === 'month') {
            want.month = old.month() + num; //month is the one unit we 'model' directly

            want = _model.months(want, old);
          } //support coercing a week, too


          if (unit === 'week') {
            let sum = old.date() + num * 7;

            if (sum <= 28 && sum > 1) {
              want.date = sum;
            }
          }

          if (unit === 'weekend' && s.dayName() !== 'saturday') {
            s = s.day('saturday', true); //ensure it's saturday
          } //support 25-hour day-changes on dst-changes
          else if (unit === 'date') {
              if (num < 0) {
                want = _model.daysBack(want, old, num);
              } else {
                //specify a naive date number, if it's easy to do...
                let sum = old.date() + num; // ok, model this one too

                want = _model.days(want, old, sum);
              } //manually punt it if we haven't moved at all..


              if (num !== 0 && old.isSame(s, 'day')) {
                want.date = old.date() + num;
              }
            } // ensure a quarter is 3 months over
            else if (unit === 'quarter') {
                want.month = old.month() + num * 3;
                want.year = old.year(); // handle rollover

                if (want.month < 0) {
                  let years = Math.floor(want.month / 12);
                  let remainder = want.month + Math.abs(years) * 12;
                  want.month = remainder;
                  want.year += years;
                } else if (want.month >= 12) {
                  let years = Math.floor(want.month / 12);
                  want.month = want.month % 12;
                  want.year += years;
                }

                want.date = old.date();
              } //ensure year has changed (leap-years)
              else if (unit === 'year') {
                  let wantYear = old.year() + num;
                  let haveYear = s.year();

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
            let max = monthLengths_1[want.month];
            want.date = old.date();

            if (want.date > max) {
              want.date = max;
            }
          }

          if (Object.keys(want).length > 1) {
            walk_1(s, want);
          }

          return s;
        }; //subtract is only add *-1


        SpaceTime.prototype.subtract = function (num, unit) {
          let s = this.clone();
          return s.add(num * -1, unit);
        }; //add aliases


        SpaceTime.prototype.minus = SpaceTime.prototype.subtract;
        SpaceTime.prototype.plus = SpaceTime.prototype.add;
      };

      var add = addMethods$3; //make a string, for easy comparison between dates

      const print = {
        millisecond: s => {
          return s.epoch;
        },
        second: s => {
          return [s.year(), s.month(), s.date(), s.hour(), s.minute(), s.second()].join('-');
        },
        minute: s => {
          return [s.year(), s.month(), s.date(), s.hour(), s.minute()].join('-');
        },
        hour: s => {
          return [s.year(), s.month(), s.date(), s.hour()].join('-');
        },
        day: s => {
          return [s.year(), s.month(), s.date()].join('-');
        },
        week: s => {
          return [s.year(), s.week()].join('-');
        },
        month: s => {
          return [s.year(), s.month()].join('-');
        },
        quarter: s => {
          return [s.year(), s.quarter()].join('-');
        },
        year: s => {
          return s.year();
        }
      };
      print.date = print.day;

      const addMethods$2 = SpaceTime => {
        SpaceTime.prototype.isSame = function (b, unit, tzAware = true) {
          let a = this;

          if (!unit) {
            return null;
          } // support swapped params


          if (typeof b === 'string' && typeof unit === 'object') {
            let tmp = b;
            b = unit;
            unit = tmp;
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

      const addMethods$1 = SpaceTime => {
        const methods = {
          isAfter: function (d) {
            d = fns.beADate(d, this);
            let epoch = fns.getEpoch(d);

            if (epoch === null) {
              return null;
            }

            return this.epoch > epoch;
          },
          isBefore: function (d) {
            d = fns.beADate(d, this);
            let epoch = fns.getEpoch(d);

            if (epoch === null) {
              return null;
            }

            return this.epoch < epoch;
          },
          isEqual: function (d) {
            d = fns.beADate(d, this);
            let epoch = fns.getEpoch(d);

            if (epoch === null) {
              return null;
            }

            return this.epoch === epoch;
          },
          isBetween: function (start, end, isInclusive = false) {
            start = fns.beADate(start, this);
            end = fns.beADate(end, this);
            let startEpoch = fns.getEpoch(start);

            if (startEpoch === null) {
              return null;
            }

            let endEpoch = fns.getEpoch(end);

            if (endEpoch === null) {
              return null;
            }

            if (isInclusive) {
              return this.isBetween(start, end) || this.isEqual(start) || this.isEqual(end);
            }

            return startEpoch < this.epoch && this.epoch < endEpoch;
          }
        }; //hook them into proto

        Object.keys(methods).forEach(k => {
          SpaceTime.prototype[k] = methods[k];
        });
      };

      var compare = addMethods$1;

      const addMethods = SpaceTime => {
        const methods = {
          i18n: data => {
            //change the day names
            if (fns.isObject(data.days)) {
              days.set(data.days);
            } //change the month names


            if (fns.isObject(data.months)) {
              months$1.set(data.months);
            } // change the the display style of the month / day names


            if (fns.isBoolean(data.useTitleCase)) {
              caseFormat.set(data.useTitleCase);
            }
          }
        }; //hook them into proto

        Object.keys(methods).forEach(k => {
          SpaceTime.prototype[k] = methods[k];
        });
      };

      var i18n = addMethods;
      let timezones = unpack; //fake timezone-support, for fakers (es5 class)

      const SpaceTime = function (input$1, tz, options = {}) {
        //the holy moment
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
        } // dunno if this is a good idea, or not
        // Object.defineProperty(this, 'parsers', {
        //   enumerable: false,
        //   writable: true,
        //   value: parsers
        // })
        //add getter/setters


        Object.defineProperty(this, 'd', {
          //return a js date object
          get: function () {
            let offset = quick(this); //every computer is somewhere- get this computer's built-in offset

            let bias = new Date(this.epoch).getTimezoneOffset() || 0; //movement

            let shift = bias + offset * 60; //in minutes

            shift = shift * 60 * 1000; //in ms
            //remove this computer's offset

            let epoch = this.epoch + shift;
            let d = new Date(epoch);
            return d;
          }
        }); //add this data on the object, to allow adding new timezones

        Object.defineProperty(this, 'timezones', {
          get: () => timezones,
          set: obj => {
            timezones = obj;
            return obj;
          }
        }); //parse the various formats

        let tmp = input(this, input$1);
        this.epoch = tmp.epoch;
      }; //(add instance methods to prototype)


      Object.keys(methods_1).forEach(k => {
        SpaceTime.prototype[k] = methods_1[k];
      }); // ¯\_(ツ)_/¯

      SpaceTime.prototype.clone = function () {
        return new SpaceTime(this.epoch, this.tz, {
          silent: this.silent,
          weekStart: this._weekStart,
          today: this._today,
          parsers: this.parsers
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

      const whereIts = (a, b) => {
        let start = new spacetime(null);
        let end = new spacetime(null);
        start = start.time(a); //if b is undefined, use as 'within one hour'

        if (b) {
          end = end.time(b);
        } else {
          end = start.add(59, 'minutes');
        }

        let startHour = start.hour();
        let endHour = end.hour();
        let tzs = Object.keys(start.timezones).filter(tz => {
          if (tz.indexOf('/') === -1) {
            return false;
          }

          let m = new spacetime(null, tz);
          let hour = m.hour(); //do 'calendar-compare' not real-time-compare

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
      var _version = '6.16.0';

      const main = (input, tz, options) => new spacetime(input, tz, options); // set all properties of a given 'today' object


      const setToday = function (s) {
        let today = s._today || {};
        Object.keys(today).forEach(k => {
          s = s[k](today[k]);
        });
        return s;
      }; //some helper functions on the main method


      main.now = (tz, options) => {
        let s = new spacetime(new Date().getTime(), tz, options);
        s = setToday(s);
        return s;
      };

      main.today = (tz, options) => {
        let s = new spacetime(new Date().getTime(), tz, options);
        s = setToday(s);
        return s.startOf('day');
      };

      main.tomorrow = (tz, options) => {
        let s = new spacetime(new Date().getTime(), tz, options);
        s = setToday(s);
        return s.add(1, 'day').startOf('day');
      };

      main.yesterday = (tz, options) => {
        let s = new spacetime(new Date().getTime(), tz, options);
        s = setToday(s);
        return s.subtract(1, 'day').startOf('day');
      };

      main.extend = function (obj = {}) {
        Object.keys(obj).forEach(k => {
          spacetime.prototype[k] = obj[k];
        });
        return this;
      };

      main.timezones = function () {
        let s = new spacetime();
        return s.timezones;
      };

      main.max = function (tz, options) {
        let s = new spacetime(null, tz, options);
        s.epoch = 8640000000000000;
        return s;
      };

      main.min = function (tz, options) {
        let s = new spacetime(null, tz, options);
        s.epoch = -8640000000000000;
        return s;
      }; //find tz by time


      main.whereIts = whereIts_1;
      main.version = _version; //aliases:

      main.plugin = main.extend;
      var src = main;
      return src;
    });
  });

  // these timezone abbreviations are wholly made-up by me, Spencer Kelly, with no expertise in geography
  // generated humbly from https://github.com/spencermountain/spacetime-informal

  const america = 'America/';
  const asia = 'Asia/';
  const europe = 'Europe/';
  const africa = 'Africa/';
  const aus = 'Australia/';
  const pac = 'Pacific/';
  const informal = {
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

  let iana = spacetime().timezones;
  let formal = Object.keys(iana).reduce((h, k) => {
    h[k] = k;
    return h;
  }, {});

  var _timezones = Object.assign({}, informal, formal);

  var dates = ['weekday', 'summer', 'winter', 'autumn', 'some day', 'one day', 'all day', 'some point', 'eod', 'eom', 'eoy', 'standard time', 'daylight time', 'tommorrow'];

  var durations$1 = ['centuries', 'century', 'day', 'days', 'decade', 'decades', 'hour', 'hours', 'hr', 'hrs', 'millisecond', 'milliseconds', 'minute', 'minutes', 'min', 'mins', 'month', 'months', 'seconds', 'sec', 'secs', 'week end', 'week ends', 'weekend', 'weekends', 'week', 'weeks', 'wk', 'wks', 'year', 'years', 'yr', 'yrs', 'quarter', // 'quarters',
  'qtr', 'qtrs', 'season', 'seasons'];

  var holidays = ['all hallows eve', 'all saints day', 'all sts day', 'april fools', 'armistice day', 'australia day', 'bastille day', 'boxing day', 'canada day', 'christmas eve', 'christmas', 'cinco de mayo', 'day of the dead', 'dia de muertos', 'dieciseis de septiembre', 'emancipation day', 'grito de dolores', 'groundhog day', 'halloween', 'harvey milk day', 'inauguration day', 'independence day', 'independents day', 'juneteenth', 'labour day', 'national freedom day', 'national nurses day', 'new years eve', 'new years', 'purple heart day', 'rememberance day', 'rosa parks day', 'saint andrews day', 'saint patricks day', 'saint stephens day', 'saint valentines day', 'st andrews day', 'st patricks day', 'st stephens day', 'st valentines day ', 'valentines day', 'valentines', 'veterans day', 'victoria day', 'womens equality day', 'xmas', // Fixed religious and cultural holidays
  // Catholic + Christian
  'epiphany', 'orthodox christmas day', 'orthodox new year', 'assumption of mary', 'all souls day', 'feast of the immaculate conception', 'feast of our lady of guadalupe', // Kwanzaa
  'kwanzaa', // Pagan / metal 🤘
  'imbolc', 'beltaine', 'lughnassadh', 'samhain', 'martin luther king day', 'mlk day', 'presidents day', 'mardi gras', 'tax day', 'commonwealth day', 'mothers day', 'memorial day', 'fathers day', 'columbus day', 'indigenous peoples day', 'canadian thanksgiving', 'election day', 'thanksgiving', 't-day', 'turkey day', 'black friday', 'cyber monday', // Astronomical religious and cultural holidays
  'ash wednesday', 'palm sunday', 'maundy thursday', 'good friday', 'holy saturday', 'easter', 'easter sunday', 'easter monday', 'orthodox good friday', 'orthodox holy saturday', 'orthodox easter', 'orthodox easter monday', 'ascension day', 'pentecost', 'whitsunday', 'whit sunday', 'whit monday', 'trinity sunday', 'corpus christi', 'advent', // Jewish
  'tu bishvat', 'tu bshevat', 'purim', 'passover', 'yom hashoah', 'lag baomer', 'shavuot', 'tisha bav', 'rosh hashana', 'yom kippur', 'sukkot', 'shmini atzeret', 'simchat torah', 'chanukah', 'hanukkah', // Muslim
  'isra and miraj', 'lailat al-qadr', 'eid al-fitr', 'id al-Fitr', 'eid ul-Fitr', 'ramadan', 'eid al-adha', 'muharram', 'the prophets birthday', 'ostara', 'march equinox', 'vernal equinox', 'litha', 'june solistice', 'summer solistice', 'mabon', 'september equinox', 'fall equinox', 'autumnal equinox', 'yule', 'december solstice', 'winter solstice', // Additional important holidays
  'chinese new year', 'diwali'];

  var times$1 = ['noon', 'midnight', 'morning', 'tonight', 'evening', 'afternoon', 'breakfast time', 'lunchtime', 'dinnertime', 'midday', 'eod', 'oclock', 'oclock', 'at night' // 'now',
  // 'night',
  // 'sometime',
  // 'all day',
  ];

  const data = [[dates, '#Date'], [durations$1, '#Duration'], [holidays, '#Holiday'], [times$1, '#Time'], [Object.keys(_timezones), '#Timezone']];
  let lex = {
    'a couple': 'Value',
    thur: 'WeekDay'
  };
  data.forEach(a => {
    for (let i = 0; i < a[0].length; i++) {
      lex[a[0][i]] = a[1];
    }
  });
  var words = lex;

  class Unit {
    constructor(input, unit, context) {
      this.unit = unit || 'day';
      this.setTime = false;
      context = context || {};
      let today = {};

      if (context.today) {
        today = {
          date: context.today.date(),
          month: context.today.month(),
          year: context.today.year()
        };
      } // set it to the beginning of the given unit


      let d = spacetime(input, context.timezone, {
        today: today
      });
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


    clone() {
      let d = new Unit(this.d, this.unit, this.context);
      d.setTime = this.setTime;
      return d;
    }

    log() {
      console.log('--');
      this.d.log();
      console.log('\n');
      return this;
    }

    applyShift(obj = {}) {
      Object.keys(obj).forEach(unit => {
        this.d = this.d.add(obj[unit], unit);

        if (unit === 'hour' || unit === 'minute') {
          this.setTime = true;
        }
      });
      return this;
    }

    applyTime(str) {
      if (str) {
        let justHour = /^[0-9]{1,2}$/;

        if (justHour.test(str)) {
          this.d = this.d.hour(str);
        } else {
          this.d = this.d.time(str);
        } // wiggle the best am/pm


        let amPM = /[ap]m/.test(str);

        if (!amPM) {
          let tooEarly = this.d.time('6:00am');

          if (this.d.isBefore(tooEarly)) {
            this.d = this.d.ampm('pm');
          }

          let tooLate = this.d.time('10:00pm');

          if (this.d.isAfter(tooLate)) {
            this.d = this.d.ampm('am');
          }
        }
      } else {
        this.d = this.d.startOf('day'); //zero-out time
      }

      this.setTime = true;
      return this;
    }

    applyWeekDay(day) {
      if (day) {
        let epoch = this.d.epoch;
        this.d = this.d.day(day);

        if (this.d.epoch < epoch) {
          this.d = this.d.add(1, 'week');
        }
      }

      return this;
    }

    applyRel(rel) {
      if (rel === 'next') {
        return this.next();
      }

      if (rel === 'last' || rel === 'this-past') {
        // special 'this past' logic is handled in WeekDay
        return this.last();
      }

      return this;
    }

    applySection(section) {
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

    format(fmt) {
      return this.d.format(fmt);
    }

    start() {
      // do we have a custom day-start?
      if (this.context.dayStart) {
        let dayStart = this.d.time(this.context.dayStart);

        if (dayStart.isBefore(this.d)) {
          this.d = dayStart;
          return this;
        }
      }

      this.d = this.d.startOf(this.unit);
      return this;
    }

    end() {
      // do we have a custom day-end?
      this.d = this.d.endOf(this.unit);

      if (this.context.dayEnd) {
        this.d = this.d.startOf('day');
        let dayEnd = this.d.time(this.context.dayEnd);

        if (dayEnd.isAfter(this.d)) {
          this.d = dayEnd;
          return this;
        }
      }

      return this;
    }

    middle() {
      let diff = this.d.diff(this.d.endOf(this.unit));
      let minutes = Math.round(diff.minutes / 2);
      this.d = this.d.add(minutes, 'minutes');
      return this;
    } // move it to 3/4s through


    beforeEnd() {
      let diff = this.d.startOf(this.unit).diff(this.d.endOf(this.unit));
      let mins = Math.round(diff.minutes / 4);
      this.d = this.d.endOf(this.unit);
      this.d = this.d.minus(mins, 'minutes');

      if (this.context.dayStart) {
        this.d = this.d.time(this.context.dayStart);
      }

      return this;
    } // the millescond before


    before() {
      this.d = this.d.minus(1, this.unit);
      this.d = this.d.endOf(this.unit);

      if (this.context.dayEnd) {
        this.d = this.d.time(this.context.dayEnd);
      }

      return this;
    } // 'after 2019'


    after() {
      this.d = this.d.add(1, this.unit);
      this.d = this.d.startOf(this.unit);
      return this;
    } // tricky: 'next june' 'next tuesday'


    next() {
      this.d = this.d.add(1, this.unit);
      this.d = this.d.startOf(this.unit);
      return this;
    } // tricky: 'last june' 'last tuesday'


    last() {
      this.d = this.d.minus(1, this.unit);
      this.d = this.d.startOf(this.unit);
      return this;
    }

  }

  var Unit_1 = Unit;

  class Day$5 extends Unit_1 {
    constructor(input, unit, context) {
      super(input, unit, context);
      this.unit = 'day';

      if (this.d.isValid()) {
        this.d = this.d.startOf('day');
      }
    }

    middle() {
      this.d = this.d.time('10am');
      return this;
    }

    beforeEnd() {
      this.d = this.d.time('2pm');
      return this;
    }

  } // like 'feb 2'


  class CalendarDate$1 extends Day$5 {
    constructor(input, unit, context) {
      super(input, unit, context);
      this.unit = 'day';

      if (this.d.isValid()) {
        this.d = this.d.startOf('day');
      }
    }

    next() {
      this.d = this.d.add(1, 'year');
      return this;
    }

    last() {
      this.d = this.d.minus(1, 'year');
      return this;
    }

  }

  class WeekDay$2 extends Day$5 {
    constructor(input, unit, context) {
      super(input, unit, context);
      this.unit = 'day';
      this.isWeekDay = true; //cool.
      // is the input just a weekday?

      if (typeof input === 'string') {
        this.d = spacetime(context.today, context.timezone);
        this.d = this.d.day(input); // assume a wednesday in the future

        if (this.d.isBefore(context.today)) {
          this.d = this.d.add(7, 'days');
        }
      } else {
        this.d = input;
      }

      this.weekDay = this.d.dayName();

      if (this.d.isValid()) {
        this.d = this.d.startOf('day');
      }
    } // clone() {
    //   return new WeekDay(this.d, this.unit, this.context)
    // }


    next() {
      this.d = this.d.add(7, 'days');
      this.d = this.d.day(this.weekDay);
      return this;
    }

    last() {
      this.d = this.d.minus(7, 'days');
      this.d = this.d.day(this.weekDay);
      return this;
    } // the millescond before


    before() {
      this.d = this.d.minus(1, 'day');
      this.d = this.d.endOf('day');

      if (this.context.dayEnd) {
        this.d = this.d.time(this.context.dayEnd);
      }

      return this;
    }

    applyRel(rel) {
      if (rel === 'next') {
        let tooFar = this.context.today.endOf('week').add(1, 'week');
        this.next(); //  did we go too-far?

        if (this.d.isAfter(tooFar)) {
          this.last(); // go back
        }

        return this;
      } // the closest-one backwards


      if (rel === 'this-past') {
        return this.last();
      }

      if (rel === 'last') {
        let start = this.context.today.startOf('week');
        this.last(); // are we still in 'this week' though?

        if (this.d.isBefore(start) === false) {
          this.last(); // do it again
        }

        return this;
      }

      return this;
    }

  } // like 'haloween'


  class Holiday$1 extends CalendarDate$1 {
    constructor(input, unit, context) {
      super(input, unit, context);
      this.unit = 'day';

      if (this.d.isValid()) {
        this.d = this.d.startOf('day');
      }
    }

  }

  var _day = {
    Day: Day$5,
    WeekDay: WeekDay$2,
    CalendarDate: CalendarDate$1,
    Holiday: Holiday$1
  };

  class AnyMonth$1 extends Unit_1 {
    constructor(input, unit, context) {
      super(input, unit, context);
      this.unit = 'month'; // set to beginning

      if (this.d.isValid()) {
        this.d = this.d.startOf(this.unit);
      }
    }

  } // a specific month, like 'March'


  class Month$2 extends Unit_1 {
    constructor(input, unit, context) {
      super(input, unit, context);
      this.unit = 'month'; // set to beginning

      if (this.d.isValid()) {
        this.d = this.d.startOf(this.unit);
      }
    }

    next() {
      this.d = this.d.add(1, 'year');
      this.d = this.d.startOf('month');
      return this;
    }

    last() {
      this.d = this.d.minus(1, 'year');
      this.d = this.d.startOf('month');
      return this;
    }

  }

  class AnyQuarter$1 extends Unit_1 {
    constructor(input, unit, context) {
      super(input, unit, context);
      this.unit = 'quarter'; // set to beginning

      if (this.d.isValid()) {
        this.d = this.d.startOf(this.unit);
      }
    }

    last() {
      this.d = this.d.minus(1, 'quarter');
      this.d = this.d.startOf(this.unit);
      return this;
    }

  }

  class Quarter$2 extends Unit_1 {
    constructor(input, unit, context) {
      super(input, unit, context);
      this.unit = 'quarter'; // set to beginning

      if (this.d.isValid()) {
        this.d = this.d.startOf(this.unit);
      }
    }

    next() {
      this.d = this.d.add(1, 'year');
      this.d = this.d.startOf(this.unit);
      return this;
    }

    last() {
      this.d = this.d.minus(1, 'year');
      this.d = this.d.startOf(this.unit);
      return this;
    }

  }

  class Season$3 extends Unit_1 {
    constructor(input, unit, context) {
      super(input, unit, context);
      this.unit = 'season'; // set to beginning

      if (this.d.isValid()) {
        this.d = this.d.startOf(this.unit);
      }
    }

    next() {
      this.d = this.d.add(1, 'year');
      this.d = this.d.startOf(this.unit);
      return this;
    }

    last() {
      this.d = this.d.minus(1, 'year');
      this.d = this.d.startOf(this.unit);
      return this;
    }

  }

  class Year$2 extends Unit_1 {
    constructor(input, unit, context) {
      super(input, unit, context);
      this.unit = 'year';

      if (this.d.isValid()) {
        this.d = this.d.startOf('year');
      }
    }

  }

  var _year = {
    AnyMonth: AnyMonth$1,
    Month: Month$2,
    Quarter: Quarter$2,
    AnyQuarter: AnyQuarter$1,
    Season: Season$3,
    Year: Year$2
  };

  class Week$2 extends Unit_1 {
    constructor(input, unit, context) {
      super(input, unit, context);
      this.unit = 'week';

      if (this.d.isValid()) {
        this.d = this.d.startOf('week');
      }
    }

    clone() {
      return new Week$2(this.d, this.unit, this.context);
    }

    middle() {
      this.d = this.d.add(2, 'days'); //wednesday

      return this;
    } // move it to 3/4s through


    beforeEnd() {
      this.d = this.d.day('friday');
      return this;
    }

  } //may need some work


  class WeekEnd$2 extends Unit_1 {
    constructor(input, unit, context) {
      super(input, unit, context);
      this.unit = 'week';

      if (this.d.isValid()) {
        this.d = this.d.day('saturday');
        this.d = this.d.startOf('day');
      }
    }

    start() {
      this.d = this.d.day('saturday').startOf('day');
      return this;
    } // end() {
    //   this.d = this.d.day('sunday').endOf('day')
    //   return this
    // }


    next() {
      this.d = this.d.add(1, this.unit);
      this.d = this.d.startOf('weekend');
      return this;
    }

    last() {
      this.d = this.d.minus(1, this.unit);
      this.d = this.d.startOf('weekend');
      return this;
    }

  }

  var _week = {
    Week: Week$2,
    WeekEnd: WeekEnd$2
  };

  class Hour$2 extends Unit_1 {
    constructor(input, unit, context) {
      super(input, unit, context, true);
      this.unit = 'hour';

      if (this.d.isValid()) {
        this.d = this.d.startOf('hour');
      }
    }

  }

  class Minute$2 extends Unit_1 {
    constructor(input, unit, context) {
      super(input, unit, context, true);
      this.unit = 'minute';

      if (this.d.isValid()) {
        this.d = this.d.startOf('minute');
      }
    }

  }

  class Moment$4 extends Unit_1 {
    constructor(input, unit, context) {
      super(input, unit, context, true);
      this.unit = 'millisecond';
    }

  }

  var _time = {
    Hour: Hour$2,
    Minute: Minute$2,
    Moment: Moment$4
  };

  var units$1 = Object.assign({
    Unit: Unit_1
  }, _day, _year, _week, _time);

  const knownUnits = {
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
  const aliases = {
    wk: 'week',
    min: 'minute',
    sec: 'second',
    weekend: 'week' //for now...

  };

  const parseUnit = function (m) {
    let unit = m.match('#Duration').text('normal');
    unit = unit.replace(/s$/, ''); // support shorthands like 'min'

    if (aliases.hasOwnProperty(unit)) {
      unit = aliases[unit];
    }

    return unit;
  }; //turn '5 weeks before' to {weeks:5}


  const parseShift = function (doc) {
    let result = {};
    let shift = doc.match('#DateShift+');

    if (shift.found === false) {
      return result;
    } // '5 weeks'


    shift.match('#Cardinal #Duration').forEach(ts => {
      let num = ts.match('#Cardinal').text('normal');
      num = parseFloat(num);

      if (num && typeof num === 'number') {
        let unit = parseUnit(ts);

        if (knownUnits[unit] === true) {
          result[unit] = num;
        }
      }
    }); //is it 2 weeks ago?  → -2

    if (shift.has('(before|ago|hence|back)$') === true) {
      Object.keys(result).forEach(k => result[k] *= -1);
    }

    shift.remove('#Cardinal #Duration'); // supoprt '1 day after tomorrow'

    let m = shift.match('[<unit>#Duration] [<dir>(after|before)]');

    if (m.found) {
      let unit = m.groups('unit').text('reduced'); // unit = unit.replace(/s$/, '')

      let dir = m.groups('dir').text('reduced');

      if (dir === 'after') {
        result[unit] = 1;
      } else if (dir === 'before') {
        result[unit] = -1;
      }
    } // in half an hour


    m = shift.match('half (a|an) [#Duration]', 0);

    if (m.found) {
      let unit = parseUnit(m);
      result[unit] = 0.5;
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
  const oneBased = {
    minute: true
  };

  const getCounter = function (doc) {
    // 7th week of
    let m = doc.match('[<num>#Value] [<unit>#Duration+] (of|in)');

    if (m.found) {
      let obj = m.groups();
      let num = obj.num.text('reduced');
      let unit = obj.unit.text('reduced');
      let found = {
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
      let obj = m.groups();
      let dir = obj.dir.text('reduced');
      let unit = obj.unit.text('reduced');

      if (dir === 'initial') {
        dir = 'first';
      }

      if (dir === 'final') {
        dir = 'last';
      }

      let found = {
        unit: unit,
        dir: dir
      };
      doc = doc.remove(m);
      return found;
    }

    return {};
  };

  var _02Counter = getCounter;

  const hardCoded = {
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
  const minMap = {
    quarter: 15,
    half: 30
  }; // choose ambiguous ampm

  const ampmChooser = function (s) {
    let early = s.time('6:00am');

    if (s.isBefore(early)) {
      return s.ampm('pm');
    }

    return s;
  }; // parse 'twenty past 2'


  const halfPast = function (m, s) {
    let hour = m.match('#Cardinal$');
    let punt = m.not(hour).match('(half|quarter|25|20|15|10|5)'); // get the mins, and the hour

    hour = hour.text('reduced');
    let mins = punt.text('reduced'); // support 'quarter'

    if (minMap.hasOwnProperty(mins)) {
      mins = minMap[mins];
    }

    let behind = m.has('to'); // apply it

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

  const parseTime = function (doc, context) {
    let time = doc.match('(at|by|for|before|this|after)? #Time+');

    if (time.found) {
      doc.remove(time); // '4pm on tuesday'

      doc.remove('^sharp');
      doc.remove('^on');
      doc.remove('on the dot');
    } // get the main part of the time


    time = time.not('^(at|by|for|before|this|after)');
    time = time.not('sharp');
    time = time.not('on the dot');
    let s = spacetime.now(context.timezone);
    let now = s.clone(); // check for known-times (like 'today')

    let timeStr = time.text('reduced');

    if (hardCoded.hasOwnProperty(timeStr)) {
      return hardCoded[timeStr];
    } // '5 oclock'


    let m = time.match('^#Cardinal oclock (am|pm)?');

    if (m.found) {
      m = m.not('oclock');
      s = s.hour(m.text('reduced'));
      s = s.startOf('hour');

      if (s.isValid() && !s.isEqual(now)) {
        let ampm = m.match('(am|pm)');

        if (ampm.found) {
          s = s.ampm(ampm.text('reduced'));
        } else {
          s = ampmChooser(s);
        }

        return s.time();
      }
    } // 'quarter to two'


    m = time.match('(half|quarter|25|20|15|10|5) (past|after|to) #Cardinal');

    if (m.found) {
      s = halfPast(m, s);

      if (s.isValid() && !s.isEqual(now)) {
        // choose ambiguous ampm
        s = ampmChooser(s);
        return s.time();
      }
    } // 'twenty past'


    m = time.match('[<min>(half|quarter|25|20|15|10|5)] (past|after)');

    if (m.found) {
      let min = m.groups('min').text('reduced');
      let d = spacetime(context.today); // support 'quarter', etc.

      if (minMap.hasOwnProperty(min)) {
        min = minMap[min];
      }

      d = d.next('hour').startOf('hour').minute(min);

      if (d.isValid() && !d.isEqual(now)) {
        return d.time();
      }
    } // 'ten to'


    m = time.match('[<min>(half|quarter|25|20|15|10|5)] to');

    if (m.found) {
      let min = m.groups('min').text('reduced');
      let d = spacetime(context.today); // support 'quarter', etc.

      if (minMap.hasOwnProperty(min)) {
        min = minMap[min];
      }

      d = d.next('hour').startOf('hour').minus(min, 'minutes');

      if (d.isValid() && !d.isEqual(now)) {
        return d.time();
      }
    } // '4 in the evening'


    m = time.match('[<time>#Time] (in|at) the? [<desc>(morning|evening|night|nighttime)]');

    if (m.found) {
      let str = m.groups('time').text('reduced');

      if (/^[0-9]{1,2}$/.test(str)) {
        s = s.hour(str); //3 in the morning

        s = s.startOf('hour');
      } else {
        s = s.time(str); // 3:30 in the morning
      }

      if (s.isValid() && !s.isEqual(now)) {
        let desc = m.groups('desc').text('reduced');

        if (desc === 'evening' || desc === 'night') {
          s = s.ampm('pm');
        }

        return s.time();
      }
    } // 'this morning at 4'


    m = time.match('this? [<desc>(morning|evening|tonight)] at [<time>(#Cardinal|#Time)]');

    if (m.found) {
      let g = m.groups();
      let str = g.time.text('reduced');

      if (/^[0-9]{1,2}$/.test(str)) {
        s = s.hour(str); //3

        s = s.startOf('hour');
      } else {
        s = s.time(str); // 3:30
      }

      if (s.isValid() && !s.isEqual(now)) {
        let desc = g.desc.text('reduced');

        if (desc === 'morning') {
          s = s.ampm('am');
        }

        if (desc === 'evening' || desc === 'tonight') {
          s = s.ampm('pm');
        }

        return s.time();
      }
    } // 'at 4' -> '4'


    m = time.match('^#Cardinal$');

    if (m.found) {
      let str = m.text('reduced');
      s = s.hour(str);
      s = s.startOf('hour');

      if (s.isValid() && !s.isEqual(now)) {
        // choose ambiguous ampm
        if (/(am|pm)/i.test(str) === false) {
          s = ampmChooser(s);
        }

        return s.time();
      }
    } // parse random a time like '4:54pm'


    let str = time.text('reduced');
    s = s.time(str);

    if (s.isValid() && !s.isEqual(now)) {
      // choose ambiguous ampm
      if (/(am|pm)/i.test(str) === false) {
        s = ampmChooser(s);
      }

      return s.time();
    } // should we fallback to a dayStart default?


    if (context.dayStart) {
      return context.dayStart;
    }

    return null;
  };

  var _03Time = parseTime;

  // interpret 'this halloween' or 'next june'
  const parseRelative = function (doc) {
    // avoid parsing 'day after next'
    if (doc.has('(next|last|this)$')) {
      return null;
    } // next monday


    let m = doc.match('^this? (next|upcoming|coming)');

    if (m.found) {
      doc.remove(m);
      return 'next';
    } // 'this past monday' is not-always 'last monday'


    m = doc.match('^this? (past)');

    if (m.found) {
      doc.remove(m);
      return 'this-past';
    } // last monday


    m = doc.match('^this? (last|previous)');

    if (m.found) {
      doc.remove(m);
      return 'last';
    } // this monday


    m = doc.match('^(this|current)');

    if (m.found) {
      doc.remove(m);
      return 'this';
    }

    return null;
  };

  var _04Relative = parseRelative;

  // 'start of october', 'middle of june 1st'
  const parseSection = function (doc) {
    // start of 2019
    let m = doc.match('[(start|beginning) of] .', 0);

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

  const isOffset = /(\-?[0-9]+)h(rs)?/i;
  const isNumber = /(\-?[0-9]+)/;
  const utcOffset = /utc([\-+]?[0-9]+)/i;
  const gmtOffset = /gmt([\-+]?[0-9]+)/i;

  const toIana = function (num) {
    num = Number(num);

    if (num > -13 && num < 13) {
      num = num * -1; //it's opposite!

      num = (num > 0 ? '+' : '') + num; //add plus sign

      return 'Etc/GMT' + num;
    }

    return null;
  };

  const parseOffset = function (tz) {
    // '+5hrs'
    let m = tz.match(isOffset);

    if (m !== null) {
      return toIana(m[1]);
    } // 'utc+5'


    m = tz.match(utcOffset);

    if (m !== null) {
      return toIana(m[1]);
    } // 'GMT-5' (not opposite)


    m = tz.match(gmtOffset);

    if (m !== null) {
      let num = Number(m[1]) * -1;
      return toIana(num);
    } // '+5'


    m = tz.match(isNumber);

    if (m !== null) {
      return toIana(m[1]);
    }

    return null;
  };

  const parseTimezone = function (doc) {
    let m = doc.match('#Timezone+'); //remove prepositions

    m = m.remove('(in|for|by|near|at)');
    let str = m.text('reduced'); // remove it from our doc, either way

    doc.remove('#Timezone+'); // check our list of informal tz names

    if (_timezones.hasOwnProperty(str)) {
      return _timezones[str];
    }

    let tz = parseOffset(str);

    if (tz) {
      return tz;
    }

    return null;
  };

  var _06Timezone = parseTimezone;

  // pull-out 'thurs' from 'thurs next week'
  const parseWeekday = function (doc) {
    let day = doc.match('#WeekDay');

    if (day.found && !doc.has('^#WeekDay$')) {
      // handle relative-day logic elsewhere.
      if (doc.has('(this|next|last) (next|upcoming|coming|past)? #WeekDay')) {
        return null;
      }

      doc.remove(day);
      return day.text('reduced');
    }

    return null;
  };

  var _07Weekday = parseWeekday;

  const {
    Day: Day$4,
    Moment: Moment$3
  } = units$1;
  const knownWord = {
    today: context => {
      return new Day$4(context.today, null, context);
    },
    yesterday: context => {
      return new Day$4(context.today.minus(1, 'day'), null, context);
    },
    tomorrow: context => {
      return new Day$4(context.today.plus(1, 'day'), null, context);
    },
    eom: context => {
      let d = context.today.endOf('month');
      d = d.startOf('day');
      return new Day$4(d, null, context);
    },
    // eod: (context) => {
    //   let d = context.today.endOf('day')
    //   d = d.startOf('hour').minus(4, 'hours') //rough
    //   return new Hour(d, null, context)
    // },
    eoy: context => {
      let d = context.today.endOf('year');
      d = d.startOf('day');
      return new Day$4(d, null, context);
    },
    now: context => {
      return new Moment$3(context.today, null, context); // should we set the current hour?
    }
  };
  knownWord.tommorrow = knownWord.tomorrow;
  knownWord.tmrw = knownWord.tomorrow;
  knownWord.anytime = knownWord.today;
  knownWord.sometime = knownWord.today;

  const today = function (doc, context, section) {
    let unit = null; // is it empty?

    if (doc.found === false) {
      // do we have just a time?
      if (section.time !== null) {
        unit = new Moment$3(context.today, null, context); // choose today
      } //do we just have a shift?


      if (Object.keys(section.shift).length > 0) {
        if (section.shift.hour || section.shift.minute) {
          unit = new Moment$3(context.today, null, context); // choose now
        } else {
          unit = new Day$4(context.today, null, context); // choose today
        }
      }
    } // today, yesterday, tomorrow


    let str = doc.text('reduced');

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
        return e && typeof e === 'object' && 'default' in e ? e : {
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

  const {
    Holiday
  } = units$1;

  const parseHoliday = function (doc, context) {
    let unit = null;
    let m = doc.match('[<holiday>#Holiday+] [<year>#Year?]');
    let year = context.today.year();

    if (m.groups('year').found) {
      year = Number(m.groups('year').text('reduced')) || year;
    }

    let str = m.groups('holiday').text('reduced');
    let s = spacetimeHoliday(str, year, context.timezone);

    if (s !== null) {
      // assume the year in the future..
      if (s.isBefore(context.today) && year === context.today.year()) {
        s = spacetimeHoliday(str, year + 1, context.timezone);
      }

      unit = new Holiday(s, null, context);
    }

    return unit;
  };

  var _02Holidays = parseHoliday;

  const {
    Week: Week$1,
    WeekEnd: WeekEnd$1,
    AnyMonth,
    AnyQuarter,
    Year: Year$1,
    Season: Season$2,
    WeekDay: WeekDay$1,
    Day: Day$3,
    Hour: Hour$1,
    Minute: Minute$1,
    Moment: Moment$2
  } = units$1;
  const mapping$1 = {
    day: Day$3,
    hour: Hour$1,
    evening: Hour$1,
    second: Moment$2,
    milliscond: Moment$2,
    instant: Moment$2,
    minute: Minute$1,
    week: Week$1,
    weekend: WeekEnd$1,
    month: AnyMonth,
    quarter: AnyQuarter,
    year: Year$1,
    season: Season$2,
    // set aliases
    yr: Year$1,
    qtr: AnyQuarter,
    wk: Week$1,
    sec: Moment$2,
    hr: Hour$1
  };
  let matchStr = `^(${Object.keys(mapping$1).join('|')})$`; // when a unit of time is spoken of as 'this month' - instead of 'february'

  const nextLast = function (doc, context) {
    //this month, last quarter, next year
    let m = doc.match(matchStr);

    if (m.found === true) {
      let str = m.text('reduced');

      if (mapping$1.hasOwnProperty(str)) {
        let Model = mapping$1[str];

        if (!Model) {
          return null;
        }

        let unit = new Model(null, str, context);
        return unit;
      }
    } //'next friday, last thursday'


    m = doc.match('^#WeekDay$');

    if (m.found === true) {
      let str = m.text('reduced');
      let unit = new WeekDay$1(str, null, context);
      return unit;
    } // tuesday next week
    // m = doc.match('^#WeekDay (this|next)')
    // if (m.found === true) {
    //   let str = m.text('reduced')
    //   let unit = new WeekDay(str, null, context)
    //   return unit
    // }


    return null;
  };

  var _03NextLast = nextLast;

  const {
    Quarter: Quarter$1,
    Season: Season$1,
    Year
  } = units$1;

  const fmtToday = function (context) {
    return {
      date: context.today.date(),
      month: context.today.month(),
      year: context.today.year()
    };
  };

  const parseYearly = function (doc, context) {
    // support 'summer 2002'
    let m = doc.match('(spring|summer|winter|fall|autumn) [<year>#Year?]');

    if (m.found) {
      let str = doc.text('reduced');
      let s = spacetime(str, context.timezone, {
        today: fmtToday(context)
      });
      let unit = new Season$1(s, null, context);

      if (unit.d.isValid() === true) {
        return unit;
      }
    } // support 'q4 2020'


    m = doc.match('[<q>#FinancialQuarter] [<year>#Year?]');

    if (m.found) {
      let str = m.groups('q').text('reduced');
      let s = spacetime(str, context.timezone, {
        today: fmtToday(context)
      });

      if (m.groups('year')) {
        let year = Number(m.groups('year').text()) || context.today.year();
        s = s.year(year);
      }

      let unit = new Quarter$1(s, null, context);

      if (unit.d.isValid() === true) {
        return unit;
      }
    } // support '4th quarter 2020'


    m = doc.match('[<q>#Value] quarter (of|in)? [<year>#Year?]');

    if (m.found) {
      let q = m.groups('q').text('reduced');
      let s = spacetime(`q${q}`, context.timezone, {
        today: fmtToday(context)
      });

      if (m.groups('year')) {
        let year = Number(m.groups('year').text()) || context.today.year();
        s = s.year(year);
      }

      let unit = new Quarter$1(s, null, context);

      if (unit.d.isValid() === true) {
        return unit;
      }
    } // support '2020'


    m = doc.match('^#Year$');

    if (m.found) {
      let str = doc.text('reduced');
      let s = spacetime(null, context.timezone, {
        today: fmtToday(context)
      });
      s = s.year(str);
      let unit = new Year(s, null, context);

      if (unit.d.isValid() === true) {
        return unit;
      }
    }

    return null;
  };

  var _04Yearly = parseYearly;

  const {
    Day: Day$2,
    CalendarDate,
    Month: Month$1,
    Moment: Moment$1
  } = units$1; // parse things like 'june 5th 2019'
  // most of this is done in spacetime

  const parseExplicit = function (doc, context) {
    let impliedYear = context.today.year(); // 'fifth of june 1992'
    // 'june the fifth 1992'

    let m = doc.match('[<date>#Value] of? [<month>#Month] [<year>#Year]');

    if (!m.found) {
      m = doc.match('[<month>#Month] the? [<date>#Value] [<year>#Year]');
    }

    if (m.found) {
      let obj = {
        month: m.groups('month').text(),
        date: m.groups('date').text(),
        year: m.groups('year').text() || impliedYear
      };
      let unit = new CalendarDate(obj, null, context);

      if (unit.d.isValid() === true) {
        return unit;
      }
    } // 'march 1992'


    m = doc.match('[<month>#Month] of? [<year>#Year]');

    if (m.found) {
      let obj = {
        month: m.groups('month').text(),
        year: m.groups('year').text() || impliedYear
      };
      let unit = new Month$1(obj, null, context);

      if (unit.d.isValid() === true) {
        return unit;
      }
    } //no-years
    // 'fifth of june'


    m = doc.match('[<date>#Value] of? [<month>#Month]'); // 'june the fifth'

    if (!m.found) {
      m = doc.match('[<month>#Month] the? [<date>#Value]');
    }

    if (m.found) {
      let obj = {
        month: m.groups('month').text(),
        date: m.groups('date').text(),
        year: context.today.year()
      };
      let unit = new CalendarDate(obj, null, context); // assume 'feb' in the future

      if (unit.d.month() < context.today.month()) {
        obj.year += 1;
        unit = new CalendarDate(obj, null, context);
      }

      if (unit.d.isValid() === true) {
        return unit;
      }
    } // support 'december'


    if (doc.has('#Month')) {
      let obj = {
        month: doc.match('#Month').text(),
        date: 1,
        //assume 1st
        year: context.today.year()
      };
      let unit = new Month$1(obj, null, context); // assume 'feb' in the future

      if (unit.d.month() < context.today.month()) {
        obj.year += 1;
        unit = new Month$1(obj, null, context);
      }

      if (unit.d.isValid() === true) {
        return unit;
      }
    } // support 'thursday 21st'


    m = doc.match('#WeekDay [<date>#Value]');

    if (m.found) {
      let obj = {
        month: context.today.month(),
        date: m.groups('date').text(),
        year: context.today.year()
      };
      let unit = new CalendarDate(obj, null, context);

      if (unit.d.isValid() === true) {
        return unit;
      }
    } // support date-only 'the 21st'


    m = doc.match('the [<date>#Value]');

    if (m.found) {
      let obj = {
        month: context.today.month(),
        date: m.groups('date').text(),
        year: context.today.year()
      };
      let unit = new CalendarDate(obj, null, context);

      if (unit.d.isValid() === true) {
        // assume it's forward
        if (unit.d.isBefore(context.today)) {
          unit.d = unit.d.add(1, 'month');
        }

        return unit;
      }
    } // parse ISO as a Moment


    m = doc.match('/[0-9]{4}-[0-9]{2}-[0-9]{2}t[0-9]{2}:/');

    if (m.found) {
      let str = doc.text('reduced');
      let unit = new Moment$1(str, null, context);

      if (unit.d.isValid() === true) {
        return unit;
      }
    }

    let str = doc.text('reduced');

    if (!str) {
      return new Moment$1(context.today, null, context);
    } // punt it to spacetime, for the heavy-lifting


    let unit = new Day$2(str, null, context); // console.log(str, unit, context.today.year())
    // did we find a date?

    if (unit.d.isValid() === false) {
      return null;
    }

    return unit;
  };

  var _05Explicit = parseExplicit;

  const {
    Quarter,
    Season,
    Week,
    Day: Day$1,
    Hour,
    Minute,
    Month,
    WeekEnd
  } = units$1;
  const units = {
    day: Day$1,
    week: Week,
    weekend: WeekEnd,
    month: Month,
    quarter: Quarter,
    season: Season,
    hour: Hour,
    minute: Minute
  };

  const applyCounter = function (unit, counter = {}) {
    let Unit = units[counter.unit];

    if (!Unit) {
      return unit;
    }

    let d = unit.d; // support 'first' or 0th

    if (counter.dir === 'first' || counter.num === 0) {
      d = unit.start().d;
      d = d.startOf(counter.unit);
    } else if (counter.dir === 'last') {
      d = d.endOf(unit.unit);

      if (counter.unit === 'weekend') {
        d = d.day('saturday', false);
      } else {
        d = d.startOf(counter.unit);
      }
    } else if (counter.num) {
      if (counter.unit === 'weekend') {
        d = d.day('saturday', true).add(1, 'day'); //fix bug
      } // support 'nth week', eg.


      d = d.add(counter.num, counter.unit);
    }

    let u = new Unit(d, null, unit.context);

    if (u.d.isValid() === true) {
      return u;
    }

    return unit; //fallback
  };

  var addCounter = applyCounter;

  const {
    WeekDay,
    Moment,
    Day
  } = units$1;
  const tokens = {
    shift: _01Shift,
    counter: _02Counter,
    time: _03Time,
    relative: _04Relative,
    section: _05Section,
    timezone: _06Timezone,
    weekday: _07Weekday
  };
  const parse$2 = {
    today: _01Today,
    holiday: _02Holidays,
    nextLast: _03NextLast,
    yearly: _04Yearly,
    explicit: _05Explicit
  };
  const transform = {
    counter: addCounter
  };

  const parseDate = function (doc, context) {
    doc = doc.clone();

    if (doc.world.isVerbose() === 'date') {
      console.log(`     str:   '${doc.text()}'`);
    } // quick normalization


    doc.match('[^the] !#Value', 0).remove(); // keep 'the 17th'
    //parse-out any sections

    let shift = tokens.shift(doc);
    let counter = tokens.counter(doc);
    let tz = tokens.timezone(doc);
    let time = tokens.time(doc, context);
    let weekDay = tokens.weekday(doc, context);
    let section = tokens.section(doc, context);
    let rel = tokens.relative(doc); //set our new timezone

    if (tz) {
      context = Object.assign({}, context, {
        timezone: tz
      });
      let iso = context.today.format('iso-short');
      context.today = context.today.goto(context.timezone).set(iso);
    }

    let unit = null; //'in two days'

    unit = unit || parse$2.today(doc, context, {
      shift,
      time,
      rel
    }); // 'this haloween'

    unit = unit || parse$2.holiday(doc, context); // 'this month'

    unit = unit || parse$2.nextLast(doc, context); // 'q2 2002'

    unit = unit || parse$2.yearly(doc, context); // 'this june 2nd'

    unit = unit || parse$2.explicit(doc, context);

    if (!unit && weekDay) {
      unit = new WeekDay(weekDay, null, context);
      weekDay = null;
    } // debugging


    if (doc.world.isVerbose() === 'date') {
      // console.log('\n\n=-= - - - - - =-=-')
      console.log(`     str:   '${doc.text()}'`);
      console.log(`     shift:      ${JSON.stringify(shift)}`);
      console.log(`     counter:   `, counter);
      console.log(`     rel:        ${rel || '-'}`);
      console.log(`     section:    ${section || '-'}`);
      console.log(`     time:       ${time || '-'}`);
      console.log(`     weekDay:    ${weekDay || '-'}`);
      console.log('     unit:     ', unit);
      console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-\n\n');
    }

    if (!unit) {
      return null;
    } // 2 days after..


    if (shift) {
      unit.applyShift(shift); // allow shift to change our unit size

      if (shift.hour || shift.minute) {
        unit = new Moment(unit.d, null, unit.context);
      } else if (shift.week || shift.day || shift.month) {
        unit = new Day(unit.d, null, unit.context);
      }
    } // wednesday next week


    if (weekDay && unit.unit !== 'day') {
      unit.applyWeekDay(weekDay);
      unit = new WeekDay(unit.d, null, unit.context);
    } // this/next/last


    if (rel) {
      unit.applyRel(rel);
    } // end of


    if (section) {
      unit.applySection(section);
    } // at 5:40pm


    if (time) {
      unit.applyTime(time); // unit = new Minute(unit.d, null, unit.context)
    } // apply counter


    if (counter && counter.unit) {
      unit = transform.counter(unit, counter);
    }

    return unit;
  };

  var _03Parse = parseDate;

  const normalize = function (doc) {
    doc = doc.clone(); // 'four thirty' -> 4:30

    let m = doc.match('[<hour>#Cardinal] [<min>(thirty|fifteen)]').match('#Time+');

    if (m.found) {
      let hour = m.groups('hour');
      let min = m.groups('min');
      let num = hour.values().get(0);

      if (num > 0 && num <= 12) {
        let mins = min.values().get(0);
        let str = `${num}:${mins}`;
        m.replaceWith(str);
      }
    }

    if (!doc.numbers) {
      console.warn(`Warning: compromise-numbers plugin is not loaded.\n   You should load this plugin \n     - https://bit.ly/3t8RfFG`);
    } else {
      // doc.numbers().normalize()
      // convert 'two' to 2
      let num = doc.numbers();
      num.toNumber();
      num.toCardinal(false);
    } // expand 'aug 20-21'


    doc.contractions().expand(); // remove adverbs

    doc.adverbs().remove(); // 'week-end'

    doc.replace('week end', 'weekend').tag('Date'); // 'a up to b'

    doc.replace('up to', 'upto').tag('Date'); // 'a year ago'

    if (doc.has('once (a|an) #Duration') === false) {
      doc.match('[(a|an)] #Duration', 0).replaceWith('1');
      _01Tagger(doc);
    } // 'in a few years'


    m = doc.match('in [a few] #Duration');

    if (m.found) {
      m.groups('0').replaceWith('2');
      _01Tagger(doc);
    } // jan - feb


    doc.match('@hasDash').insertAfter('to').tag('Date'); // console.log('=-=-=-= here -=-=-=-')
    // doc.debug()

    return doc;
  };

  var normalize_1 = normalize;

  const parse$1 = function (m, context) {
    m = normalize_1(m);
    let res = _03Time(m, context);
    return res;
  };

  var parse_1$1 = parse$1;

  const dayNames = {
    mon: 'monday',
    tue: 'tuesday',
    tues: 'wednesday',
    wed: 'wednesday',
    thu: 'thursday',
    fri: 'friday',
    sat: 'saturday',
    sun: 'sunday',
    monday: 'monday',
    tuesday: 'tuesday',
    wednesday: 'wednesday',
    thursday: 'thursday',
    friday: 'friday',
    saturday: 'saturday',
    sunday: 'sunday'
  }; // 'any tuesday' vs 'every tuesday'

  const parseLogic = function (m) {
    if (m.match('(every|each)').found) {
      return 'AND';
    }

    if (m.match('(any|a)').found) {
      return 'OR';
    }

    return null;
  }; // parse repeating dates, like 'every week'


  const parseIntervals = function (doc, context) {
    // 'every week'
    let m = doc.match('[<logic>(every|any|each)] [<skip>other?] [<unit>#Duration] (starting|beginning|commencing)?');

    if (m.found) {
      let repeat = {
        interval: {}
      };
      let unit = m.groups('unit').text('reduced');
      repeat.interval[unit] = 1;
      repeat.choose = parseLogic(m); // 'every other week'

      if (m.groups('skip').found) {
        repeat.interval[unit] = 2;
      }

      doc = doc.remove(m);
      return {
        repeat: repeat
      };
    } // 'every two weeks'


    m = doc.match('[<logic>(every|any|each)] [<num>#Value] [<unit>#Duration] (starting|beginning|commencing)?');

    if (m.found) {
      let repeat = {
        interval: {}
      };
      let units = m.groups('unit');
      units.nouns().toSingular();
      let unit = units.text('reduced');
      repeat.interval[unit] = m.groups('num').numbers().get(0);
      repeat.choose = parseLogic(m);
      doc = doc.remove(m);
      return {
        repeat: repeat
      };
    } // 'every friday'


    m = doc.match('[<logic>(every|any|each|a)] [<skip>other?] [<day>#WeekDay+] (starting|beginning|commencing)?');

    if (m.found) {
      let repeat = {
        interval: {
          day: 1
        },
        filter: {
          weekDays: {}
        }
      };
      let str = m.groups('day').text('reduced');
      str = dayNames[str]; //normalize it

      if (str) {
        repeat.filter.weekDays[str] = true;
        repeat.choose = parseLogic(m);
        doc = doc.remove(m);
        return {
          repeat: repeat
        };
      }
    } // 'every weekday'


    m = doc.match('[<logic>(every|any|each|a)] [<day>(weekday|week day|weekend|weekend day)] (starting|beginning|commencing)?');

    if (m.found) {
      let repeat = {
        interval: {
          day: 1
        },
        filter: {
          weekDays: {}
        }
      };
      let day = m.groups('day');

      if (day.has('(weekday|week day)')) {
        repeat.filter.weekDays = {
          monday: true,
          tuesday: true,
          wednesday: true,
          thursday: true,
          friday: true
        };
      } else if (day.has('(weekend|weekend day)')) {
        repeat.filter.weekDays = {
          saturday: true,
          sunday: true
        };
      }

      repeat.choose = parseLogic(m);
      doc = doc.remove(m);
      return {
        repeat: repeat
      };
    } // mondays


    m = doc.match('[<day>(mondays|tuesdays|wednesdays|thursdays|fridays|saturdays|sundays)] (at|near|after)? [<time>#Time+?]');

    if (m.found) {
      let repeat = {
        interval: {
          day: 1
        },
        filter: {
          weekDays: {}
        }
      };
      let str = m.groups('day').text('reduced');
      str = str.replace(/s$/, '');
      str = dayNames[str]; //normalize it

      if (str) {
        repeat.filter.weekDays[str] = true;
        repeat.choose = 'OR';
        doc = doc.remove(m);
        let time = m.groups('time');

        if (time.found) {
          repeat.time = parse_1$1(time, context);
        }

        return {
          repeat: repeat
        };
      }
    }

    return null;
  };

  var _00Repeats = parseIntervals;

  // somewhat-intellegent response to end-before-start situations
  const reverseMaybe = function (obj) {
    let start = obj.start;
    let end = obj.end;

    if (start.d.isAfter(end.d)) {
      // wednesday to sunday -> move end up a week
      if (start.isWeekDay && end.isWeekDay) {
        obj.end.next();
        return obj;
      } // else, reverse them


      let tmp = start;
      obj.start = end;
      obj.end = tmp;
    }

    return obj;
  };

  var _reverse = reverseMaybe;

  const moveToPM = function (obj) {
    let start = obj.start;
    let end = obj.end;

    if (start.d.isAfter(end.d)) {
      if (end.d.hour() < 10) {
        end.d = end.d.ampm('pm');
      }
    }

    return obj;
  };

  var _01TwoTimes = [{
    // '3pm to 4pm january 5th'
    match: '[<from>#Time+] (to|until|upto|through|thru|and) [<to>#Time+ #Date+]',
    desc: '3pm to 4pm january 5th',
    parse: (m, context) => {
      let from = m.groups('from');
      let to = m.groups('to');
      let end = _03Parse(to, context);

      if (end) {
        let start = end.clone();
        start.applyTime(from.text());

        if (start) {
          let obj = {
            start: start,
            end: end,
            unit: 'time'
          };

          if (/(am|pm)/.test(to) === false) {
            obj = moveToPM(obj);
          }

          obj = _reverse(obj);
          return obj;
        }
      }

      return null;
    }
  }, {
    // 'january from 3pm to 4pm'
    match: '[<from>#Date+] (to|until|upto|through|thru|and) [<to>#Time+]',
    desc: 'january from 3pm to 4pm',
    parse: (m, context) => {
      let from = m.groups('from');
      let to = m.groups('to');
      from = _03Parse(from, context);

      if (from) {
        let end = from.clone();
        end.applyTime(to.text());

        if (end) {
          let obj = {
            start: from,
            end: end,
            unit: 'time'
          };

          if (/(am|pm)/.test(to.text()) === false) {
            obj = moveToPM(obj);
          }

          obj = _reverse(obj);
          return obj;
        }
      }

      return null;
    }
  }];

  var _02TwoDate = [{
    // two explicit dates - 'between friday and sunday'
    match: 'between [<start>.+] and [<end>.+]',
    desc: 'between friday and sunday',
    parse: (m, context) => {
      let start = m.groups('start');
      start = _03Parse(start, context);
      let end = m.groups('end');
      end = _03Parse(end, context);

      if (start && end) {
        end = end.before();
        return {
          start: start,
          end: end
        };
      }

      return null;
    }
  }, {
    // two months, no year - 'june 5 to june 7'
    match: '[<from>#Month #Value] (to|through|thru|and) [<to>#Month #Value] [<year>#Year?]',
    desc: 'june 5 to june 7',
    parse: (m, context) => {
      let res = m.groups();
      let start = res.from;

      if (res.year) {
        start = start.append(res.year);
      }

      start = _03Parse(start, context);

      if (start) {
        let end = res.to;

        if (res.year) {
          end = end.append(res.year);
        }

        end = _03Parse(end, context);

        if (end) {
          // assume end is after start
          if (start.d.isAfter(end.d)) {
            end.d = end.d.add(1, 'year');
          }

          let obj = {
            start: start,
            end: end.end()
          };
          return obj;
        }
      }

      return null;
    }
  }, {
    // one month, one year, first form - 'january 5 to 7 1998'
    match: '[<month>#Month] [<from>#Value] (to|through|thru) [<to>#Value] of? [<year>#Year]',
    desc: 'january 5 to 7 1998',
    parse: (m, context) => {
      let {
        month,
        from,
        to,
        year
      } = m.groups();
      let year2 = year.clone();
      let start = from.prepend(month.text()).append(year.text());
      start = _03Parse(start, context);

      if (start) {
        let end = to.prepend(month.text()).append(year2);
        end = _03Parse(end, context);
        return {
          start: start,
          end: end.end()
        };
      }

      return null;
    }
  }, {
    // one month, one year, second form - '5 to 7 of january 1998'
    match: '[<from>#Value] (to|through|thru|and) [<to>#Value of? #Month #Date+?]',
    desc: '5 to 7 of january 1998',
    parse: (m, context) => {
      let to = m.groups('to');
      to = _03Parse(to, context);

      if (to) {
        let fromDate = m.groups('from');
        let from = to.clone();
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
    match: '[<from>#Month #Value] (to|through|thru|and) [<to>#Value]',
    desc: 'january 5 to 7',
    parse: (m, context) => {
      let from = m.groups('from');
      from = _03Parse(from, context);

      if (from) {
        let toDate = m.groups('to');
        let to = from.clone();
        to.d = to.d.date(toDate.text('normal'));
        return {
          start: from,
          end: to.end()
        };
      }

      return null;
    }
  }, {
    // 'january to may 2020'
    match: 'from? [<from>#Month] (to|until|upto|through|thru|and) [<to>#Month] [<year>#Year]',
    desc: 'january to may 2020',
    parse: (m, context) => {
      let from = m.groups('from');
      let year = from.groups('year').numbers().get(0);
      let to = m.groups('to');
      from = _03Parse(from, context);
      to = _03Parse(to, context);
      from.d = from.d.year(year);
      to.d = to.d.year(year);

      if (from && to) {
        let obj = {
          start: from,
          end: to.end()
        }; // reverse the order?

        obj = _reverse(obj);
        return obj;
      }

      return null;
    }
  }];

  const punt = function (unit, context) {
    unit = unit.applyShift(context.punt);
    return unit;
  };

  var _03OneDate = [{
    // 'from A to B'
    match: 'from? [<from>.+] (to|until|upto|through|thru|and) [<to>.+]',
    desc: 'from A to B',
    parse: (m, context) => {
      let from = m.groups('from');
      let to = m.groups('to');
      from = _03Parse(from, context);
      to = _03Parse(to, context);

      if (from && to) {
        let obj = {
          start: from,
          end: to.end()
        };
        obj = _reverse(obj);
        return obj;
      }

      return null;
    }
  }, {
    // 'before june'
    match: '^due? (by|before) [.+]',
    desc: 'before june',
    group: 0,
    parse: (m, context) => {
      let unit = _03Parse(m, context);

      if (unit) {
        let start = new Unit_1(context.today, null, context);

        if (start.d.isAfter(unit.d)) {
          start = unit.clone().applyShift({
            weeks: -2
          });
        } // end the night before


        let end = unit.clone().applyShift({
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
    match: '^(on|in|at|@|during) [.+]',
    desc: 'in june',
    group: 0,
    parse: (m, context) => {
      let unit = _03Parse(m, context);

      if (unit) {
        return {
          start: unit,
          end: unit.clone().end(),
          unit: unit.unit
        };
      }

      return null;
    }
  }, {
    // 'after june'
    match: '^(after|following) [.+]',
    desc: 'after june',
    group: 0,
    parse: (m, context) => {
      let unit = _03Parse(m, context);

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
    // 'middle of'
    match: '^(middle|center|midpoint) of [.+]',
    desc: 'middle of',
    group: 0,
    parse: (m, context) => {
      let unit = _03Parse(m, context);
      let start = unit.clone().middle();
      let end = unit.beforeEnd();

      if (unit) {
        return {
          start: start,
          end: end
        };
      }

      return null;
    }
  }, {
    // 'tuesday after 5pm'
    match: '.+ after #Time+$',
    desc: 'tuesday after 5pm',
    parse: (m, context) => {
      let unit = _03Parse(m, context);

      if (unit) {
        let start = unit.clone();
        let end = unit.end();
        return {
          start: start,
          end: end,
          unit: 'time'
        };
      }

      return null;
    }
  }, {
    // 'tuesday before noon'
    match: '.+ before #Time+$',
    desc: 'tuesday before noon',
    parse: (m, context) => {
      let unit = _03Parse(m, context);
      let end = unit.clone();
      let start = unit.start();

      if (unit) {
        return {
          start: start,
          end: end,
          unit: 'time'
        };
      }

      return null;
    }
  }];

  const ranges = [].concat(_01TwoTimes, _02TwoDate, _03OneDate); // loop thru each range template

  const parseRange = function (doc, context) {
    // parse-out 'every week ..'
    let repeats = _00Repeats(doc, context) || {}; // if it's *only* an interval response

    if (doc.found === false) {
      return Object.assign({}, repeats, {
        start: null,
        end: null
      });
    } // try each template in order


    for (let i = 0; i < ranges.length; i += 1) {
      let fmt = ranges[i];
      let m = doc.match(fmt.match);

      if (m.found) {
        if (fmt.group !== undefined) {
          m = m.groups(fmt.group);
        }

        if (doc.world.isVerbose() === 'date') {
          console.log(`  ---[${fmt.desc}]---`);
        }

        let res = fmt.parse(m, context);

        if (res !== null) {
          return Object.assign({}, repeats, res);
        }
      }
    } //else, try whole thing


    let res = {
      start: null,
      end: null
    };
    let unit = _03Parse(doc, context);

    if (unit) {
      if (doc.world.isVerbose() === 'date') {
        console.log(`  --[no-range]--`);
      }

      let end = unit.clone().end();
      res = {
        start: unit,
        end: end,
        unit: unit.setTime ? 'time' : unit.unit
      };
    }

    let combined = Object.assign({}, repeats, res); // ensure start is not after end
    // console.log(combined)

    if (combined.start && combined.end && combined.start.d.epoch > combined.end.d.epoch) {
      // console.warn('Warning: Start date is after End date')
      combined.start = combined.start.start(); // combined.end = combined.start.clone()
    }

    return combined;
  };

  var _02Ranges = parseRange;

  const maxDate = 8640000000000000;
  const max_loops = 500;

  const shouldPick = function (s, byDay) {
    if (byDay && byDay[s.dayName()] !== true) {
      return false;
    }

    return true;
  };

  const hasTime = {
    millisecond: true,
    hour: true,
    time: true
  }; // list possible dates of a repeating date

  const generateDates = function (result, context) {
    let list = [];
    let max_count = context.max_repeat || 12;
    let s = spacetime(result.start || context.today, context.timezone);

    if (result.repeat.time) {
      s = s.time(result.repeat.time);
    } else if (hasTime[result.unit] === true) {
      result.repeat.time = s.time();
    } else {
      s = s.startOf('day');
      let time = s.time();

      if (time === '12:00am' && context.dayStart) {
        s = s.time(context.dayStart);
      }
    } // should we stop at the end date?


    let end = spacetime(result.end, context.timezone);
    let toAdd = Object.keys(result.repeat.interval);

    if (toAdd[0] && s.isSame(end, toAdd[0]) === true) {
      // ignore the end date!
      end = spacetime(maxDate, context.timezone);
    } // should we only include these days?


    let byDay = null;

    if (result.repeat.filter) {
      byDay = result.repeat.filter.weekDays;
    } // start going!


    for (let i = 0; i < max_loops; i += 1) {
      if (list.length >= max_count || s.epoch >= end.epoch) {
        break;
      }

      if (shouldPick(s, byDay)) {
        list.push(s.iso());
      }

      toAdd.forEach(unit => {
        s = s.add(result.repeat.interval[unit], unit);
      });
    } // add end-times to list


    result.repeat.generated = list.map(start => {
      let eod = spacetime(start, context.timezone);

      if (context.dayEnd) {
        eod = eod.time(context.dayEnd);
      } else {
        eod = eod.endOf('day');
      }

      return {
        start: start,
        end: eod.iso()
      };
    }); // if we got an interval, but not a start/end

    if (!result.start && result.repeat.generated && result.repeat.generated.length > 1) {
      let arr = result.repeat.generated;
      result.start = arr[0].start;
      result.end = arr[0].end;
    }

    return result;
  };

  var generate = generateDates;

  const toISO = function (unit) {
    if (unit && unit.d) {
      return unit.d.format('iso');
    }

    return null;
  };

  const getDate = function (doc, context) {
    // validate context a bit
    context = context || {};
    context.today = spacetime(context.today || null, context.timezone); //turn 'five' into 5..

    doc = normalize_1(doc); //interpret 'between [A] and [B]'...

    let result = _02Ranges(doc, context); // format as iso

    result.start = toISO(result.start);
    result.end = toISO(result.end); // generate interval dates

    if (result.repeat) {
      result = generate(result, context);
    } // add timezone


    result.tz = context.timezone;
    return result;
  };

  var getDates = getDate;

  let arr = [['mon', 'monday'], ['tue', 'tuesday'], ['tues', 'tuesday'], ['wed', 'wednesday'], ['thu', 'thursday'], ['thurs', 'thursday'], ['fri', 'friday'], ['sat', 'saturday'], ['sun', 'sunday'], ['jan', 'january'], ['feb', 'february'], ['mar', 'march'], ['apr', 'april'], ['jun', 'june'], ['jul', 'july'], ['aug', 'august'], ['sep', 'september'], ['sept', 'september'], ['oct', 'october'], ['nov', 'november'], ['dec', 'december']];
  arr = arr.map(a => {
    return {
      short: a[0],
      long: a[1]
    };
  });
  var _abbrevs = arr;

  const getDuration = function (date) {
    let start = date.start;
    let end = date.end;
    let duration = {};

    if (start && end) {
      start = spacetime(start);
      end = spacetime(end).add(1, 'millisecond');
      duration = start.diff(end); // we don't need these

      delete duration.milliseconds;
      delete duration.seconds;
      Object.keys(duration).forEach(k => {
        if (duration[k] === 0) {
          delete duration[k];
        }
      });
    }

    return duration;
  };

  var duration = getDuration;

  const mapUnits = {
    millisecond: 'time',
    hour: 'time',
    minute: 'time'
  }; // try to decide what 'thing' this date-range is

  const getUnit = function (date) {
    if (date.unit) {
      if (mapUnits.hasOwnProperty(date.unit)) {
        return mapUnits[date.unit];
      }

      return date.unit;
    }

    let duration$1 = date.duration;

    if (!duration$1) {
      duration$1 = duration(date);
    }

    let start = spacetime(date.start);
    let end = spacetime(date.end); // 2021-2022

    if (duration$1.years) {
      if (start.isSame('year', end)) {
        return 'year';
      }

      return 'years';
    } // june-july


    if (duration$1.months) {
      if (start.isSame('month', end)) {
        return 'month';
      }

      return 'months';
    } // june 4-19th


    if (duration$1.days) {
      return 'days';
    } // just a matter of hours


    if (start.isSame('day', end)) {
      return 'time';
    }

    return null;
  };

  var unit = getUnit;

  var methods$2 = {
    /** easy getter for the start/end dates */
    get: function (options) {
      let arr = [];
      this.forEach(doc => {
        let date = getDates(doc, this.context);
        date.unit = unit(date);
        arr.push(date);
      });

      if (typeof options === 'number') {
        return arr[options];
      }

      return arr;
    },

    /** overload the original json with date information */
    json: function (options) {
      let n = null;

      if (typeof options === 'number') {
        n = options;
        options = null;
      }

      options = options || {
        terms: false
      };
      let res = [];
      this.forEach(doc => {
        let json = doc.json(options)[0];
        let found = getDates(doc, this.context);
        json = Object.assign(json, found); // add more data

        json.duration = duration(json);
        json.unit = unit(json);
        res.push(json);
      });

      if (n !== null) {
        return res[n];
      }

      return res;
    },

    /** render all dates according to a specific format */
    format: function (fmt) {
      this.forEach(doc => {
        let obj = getDates(doc, this.context);

        if (obj.start) {
          let start = spacetime(obj.start, this.context.timezone);
          let str = start.format(fmt);

          if (obj.end) {
            let end = spacetime(obj.end, this.context.timezone);

            if (start.isSame(end, 'day') === false) {
              str += ' to ' + end.format(fmt);
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
    toLongForm: function () {
      _abbrevs.forEach(a => {
        this.replace(a.short, a.long, true);
      });
      return this;
    },

    /** replace 'Friday' with 'Fri', etc*/
    toShortForm: function () {
      _abbrevs.forEach(a => {
        this.replace(a.long, a.short, true);
      });
      return this;
    }
  };

  const known = {
    century: true,
    day: true,
    decade: true,
    hour: true,
    millisecond: true,
    minute: true,
    month: true,
    second: true,
    weekend: true,
    week: true,
    year: true,
    quarter: true,
    season: true
  };
  let mapping = {
    m: 'minute',
    h: 'hour',
    hr: 'hour',
    min: 'minute',
    sec: 'second',
    'week end': 'weekend',
    wk: 'week',
    yr: 'year',
    qtr: 'quarter'
  }; // add plurals

  Object.keys(mapping).forEach(k => {
    mapping[k + 's'] = mapping[k];
  });

  const parse = function (doc) {
    let duration = {}; //parse '8 minutes'

    let twoWord = doc.match('#Value+ #Duration');

    if (twoWord.found) {
      twoWord.forEach(m => {
        let num = m.numbers().get(0);
        let unit = m.terms().last().nouns().toSingular().text(); // turn 'mins' into 'minute'

        if (mapping.hasOwnProperty(unit)) {
          unit = mapping[unit];
        }

        if (known.hasOwnProperty(unit) && num !== null) {
          duration[unit] = num;
        }
      });
    } else {
      let oneWord = doc.match('(#Duration && /[0-9][a-z]+$/)');

      if (oneWord.found) {
        let str = doc.text();
        let num = str.match(/([0-9]+)/);
        let unit = str.match(/([a-z]+)/);

        if (num && unit) {
          num = num[0] || null;
          unit = unit[0] || null;

          if (mapping.hasOwnProperty(unit)) {
            unit = mapping[unit];
          }

          if (known.hasOwnProperty(unit) && num !== null) {
            duration[unit] = Number(num);
          }
        }
      }
    }

    return duration;
  };

  var parse_1 = parse;

  const methods$1 = {
    /** easy getter for the time */
    get: function (options) {
      let arr = [];
      this.forEach(doc => {
        let res = parse_1(doc);
        arr.push(res);
      });

      if (typeof options === 'number') {
        return arr[options];
      }

      return arr;
    },

    /** overload the original json with duration information */
    json: function (options) {
      let n = null;

      if (typeof options === 'number') {
        n = options;
        options = null;
      }

      options = options || {
        terms: false
      };
      let res = [];
      this.forEach(doc => {
        let json = doc.json(options);
        json.duration = parse_1(doc);
        res.push(json);
      });

      if (n !== null) {
        return res[n];
      }

      return res;
    },

    /** change to a standard duration format */
    normalize: function () {
      this.forEach(doc => {
        let duration = parse_1(doc);
        let list = [];
        Object.keys(duration).forEach(unit => {
          let num = duration[unit];
          let word = unit;

          if (num !== 1) {
            word += 's';
          }

          list.push(`${num} ${word}`);
        }); // splice-in an 'and'

        if (list.length > 1) {
          let beforeEnd = list.length - 1;
          list.splice(beforeEnd, 0, 'and');
        }

        let text = list.join(' ');
        doc.replaceWith(text);
      });
      return this;
    }
  };

  const addDurations = function (Doc) {
    /** phrases like '2 months', or '2mins' */
    class Durations extends Doc {
      constructor(list, from, w) {
        super(list, from, w);
        this.context = {};
      }

    } //add-in methods


    Object.assign(Durations.prototype, methods$1);
    /** phrases like '2 months' */

    Doc.prototype.durations = function (n) {
      let m = this.match('#Value+ #Duration (and? #Value+ #Duration)?'); // add '20mins'

      m = m.concat(this.match('(#Duration && /[0-9][a-z]+$/)')); // not 'in 20 minutes'

      m = m.notIf('#DateShift');

      if (typeof n === 'number') {
        m = m.get(n);
      }

      return new Durations(m.list, this, this.world);
    };
  };

  var durations = addDurations;

  const methods = {
    /** easy getter for the time */
    get: function (options) {
      let arr = [];
      this.forEach(doc => {
        let res = parse_1$1(doc, this.context);
        arr.push(res);
      });

      if (typeof options === 'number') {
        return arr[options];
      }

      return arr;
    },

    /** overload the original json with duration information */
    json: function (options) {
      let n = null;

      if (typeof options === 'number') {
        n = options;
        options = null;
      }

      options = options || {
        terms: false
      };
      let res = [];
      this.forEach(doc => {
        let json = doc.json(options);
        json.time = parse_1$1(doc, this.context);
        res.push(json);
      });

      if (n !== null) {
        return res[n];
      }

      return res;
    }
  };

  const addTimes = function (Doc) {
    /** phrases like '2 months', or '2mins' */
    class Times extends Doc {
      constructor(list, from, w) {
        super(list, from, w);
        this.context = {};
      }

    } //add-in methods


    Object.assign(Times.prototype, methods);
    /** phrases like '4pm' */

    Doc.prototype.times = function (n) {
      let m = this.match('#Time+ (am|pm)?');

      if (typeof n === 'number') {
        m = m.get(n);
      }

      return new Times(m.list, this, this.world);
    };
  };

  var times = addTimes;

  const findDate = function (doc) {
    // let r = this.clauses()
    let dates = doc.match('#Date+'); // ignore only-durations like '20 minutes'

    dates = dates.filter(m => {
      let isDuration = m.has('^#Duration+$') || m.has('^#Value #Duration+$'); // allow 'q4', etc

      if (isDuration === true && m.has('(#FinancialQuarter|quarter)')) {
        return true;
      }

      return isDuration === false;
    }); // 30 minutes on tuesday

    let m = dates.match('[#Cardinal #Duration (in|on|this|next|during|for)] #Date', 0);

    if (m.found) {
      dates = dates.not(m);
    } // 30 minutes tuesday


    m = dates.match('[#Cardinal #Duration] #WeekDay', 0);

    if (m.found) {
      dates = dates.not(m);
    } // tuesday for 30 mins


    m = dates.match('#Date [for #Value #Duration]$', 0);

    if (m.found) {
      dates = dates.not(m);
    } // 'tuesday, wednesday'


    m = dates.match('^[#WeekDay] and? #WeekDay$', 0);

    if (m.found) {
      if (m.first().has('@hasDash') === false) {
        dates = dates.splitAfter(m);
        dates = dates.not('^and');
      }
    } // 'june, august'


    m = dates.match('^[#Month] and? #Month #Ordinal?$', 0);

    if (m.found) {
      dates = dates.splitAfter(m);
      dates = dates.not('^and');
    } // 'tuesday, wednesday, and friday'


    m = dates.match('#WeekDay #WeekDay and? #WeekDay');

    if (m.found) {
      dates = dates.splitOn('#WeekDay');
      dates = dates.not('^and');
    } // '5 june, 10 june'


    m = dates.match('[#Value #Month] #Value #Month', 0);

    if (m.found) {
      dates = dates.splitAfter(m);
    } // 'june 5th, june 10th'


    m = dates.match('[#Month #Value] #Month', 0).ifNo('@hasDash$');

    if (m.found) {
      dates = dates.splitAfter(m);
    } // '20 minutes june 5th'


    m = dates.match('[#Cardinal #Duration] #Date', 0); //but allow '20 minutes ago'

    if (m.found && !dates.has('#Cardinal #Duration] (ago|from|before|after|back)')) {
      dates = dates.not(m);
    } // for 20 minutes


    m = dates.match('for #Cardinal #Duration');

    if (m.found) {
      dates = dates.not(m);
    } // 'one saturday'


    dates = dates.notIf('^one (#WeekDay|#Month)$'); // next week tomorrow

    m = dates.match('(this|next) #Duration [(today|tomorrow|yesterday)]', 0);

    if (m.found) {
      dates = dates.splitBefore(m);
    } // tomorrow 15 march


    m = dates.match('[(today|tomorrow|yesterday)] #Value #Month', 0);

    if (m.found) {
      dates = dates.splitAfter(m);
    } // tomorrow yesterday


    m = dates.match('[(today|tomorrow|yesterday)] (today|tomorrow|yesterday)', 0);

    if (m.found) {
      dates = dates.splitAfter(m);
    }

    return dates;
  };

  var find = findDate;

  const opts = {
    punt: {
      weeks: 2
    }
  };

  const addMethods = function (Doc, world) {
    // our new tags
    world.addTags(_tags); // add info for the date plugin

    world.addWords(words); // run our tagger

    world.postProcess(_01Tagger); // add .durations() class + methods

    durations(Doc); // add .times() class + methods

    times(Doc);
    /** phraes like 'nov 2nd' or 'on tuesday' */

    class Dates extends Doc {
      constructor(list, from, w) {
        super(list, from, w);
        this.context = opts;
      }

    } //add-in methods


    Object.assign(Dates.prototype, methods$2);

    Doc.prototype.dates = function (n) {
      let context = {};

      if (n && typeof n === 'object') {
        context = n;
        n = null;
      }

      context = Object.assign({}, context, opts); // use the user's timezone, by default

      if (context.timezone === undefined) {
        context.timezone = spacetime().timezone().name;
      } // allow null to mean utc


      if (context.timezone === false) {
        context.timezone = 'ETC/UTC';
      }

      let dates = find(this);

      if (typeof n === 'number') {
        dates = dates.get(n);
      }

      let d = new Dates(dates.list, this, this.world);

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

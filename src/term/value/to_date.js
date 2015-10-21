require('sugar-date');

// var data = require("./old/lexdates").dates;
// console.log("Dates", data);

var rules = {
  // http://rubular.com/r/VUd4LJzIG4
  range: /(?:\b|^)(?:between|from)(.*)(?:\sand(?= ) |or\s)(.*)|(?:\b|^)(?:between|from)?(.*)(?:(?:\sto\s)|(?:\-\s))(.+)/i,
  multi: /(?: |^)(?:and(?= ) |or(?= ) )|(?: ?\& ?)|(?: ?, ?)(?=\d)/i,
  multiburst: {
    at: /(.+)\sat\s(.+)/, // {location} at {time}
    at2: /(.+)?\s?((tomorrow|today|monday|tuesday|wednesday|thursday|friday|saturday|sunday|mon|tue|wed|thu|fri|sat|sun)\sat\s.+)|at\s(.+)/i,
    on: /(.+)\son\s(.+)/, // {event} on {date} or {action} on {date} at {time}
    days: /(tomorrow|today|monday|tuesday|wednesday|thursday|friday|saturday|sunday|mon|tue|wed|thu|fri|sat|sun)/i
  },
  months: /(january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|jun|jul|aug|sep|sept|oct|nov|dec),?/ig,
  short: [
    {
      // [ 'month', 'day', 'year' ]
      matches: /(?:([1-9]|0[1-9]|1[0-2])\s?(?:\-|\/)+\s?(3[0-1]|[12][0-9]|0?[1-9])\s?(?:\-|\/)+\s?(?:([0-9]{1,4})+)?)/
    },
    {
      // [ 'day', 'month', 'year' ]
      matches: /(?:(3[0-1]|[12][0-9]|0?[1-9])\s?(?:\.|\/)+\s?([1-9]|0[1-9]|1[0-2])\s?(?:\.|\/)+\s?(?:([0-9]{1,4})+)?)/,
    }
  ]
};

// Shorthand for date functions
var _methods = {
  day: 'UTCDate',
  month: 'UTCMonth',
  year: 'UTCFullYear',
  weekDay: 'UTCDay',
  // Time
  hours: 'UTCHours',
  minutes: 'UTCMinutes',
  seconds: 'UTCSeconds'
};

// Helpers
var stringCheck = function (input) {
  return (typeof input === 'string' && input.trim() !== '');
};

var hyphenatedDates = function(str, recover) {
  var i;
  for (i = 0; i < 2; i++) {
    var rule = rules.short[i].matches;
    var r = (recover) ? new RegExp(rule.source.replace(/\D\-/g, '/'), 'g') : new RegExp(rule.source, 'g');
    var find = (recover) ? /\//g : /\-/g;
    var repl = (recover) ? '-' : '/', a;

    while ((a = r.exec(str)) !== null) {
      str = str.replace(a[0], a[0].replace(find, repl));
    }
  }
  return str;
};

function get(D, t) {
  var method = ['get', _methods[t]].join('');
  return (D && method)
    ? D[method]() + ((t === 'month') ? 1 : 0)
    : false;
}

function blank(nowD, text) {

  if (!nowD) {
    return {
      text: text.trim(),
      day: false,
      month: false,
      year: false,
      weekDay: false,
      hours: false,
      minutes: false,
      seconds: false
    };
  }

  if (!nowD.isValid()) {
    return null;
  }

  return {
    text: text.trim(),
    day: get(nowD, 'day'),
    month: get(nowD, 'month'),
    year: get(nowD, 'year'),
    weekDay: get(nowD, 'weekDay'),
    hours: get(nowD, 'hours'),
    minutes: get(nowD, 'minutes'),
    seconds: get(nowD, 'seconds'),
    Date: nowD || {},
    to: false
  };
}

var parseInput = function(input) {

  var ranges = input.split(rules.range).filter(stringCheck);
  var dates = [];


  if (ranges.length === 1) {
    // One big chunk with a date
    var part = ranges[0];
    var parts = part.split(rules.multi).filter(stringCheck);

    // Map parts
    dates = parts.map(function(item) {
      var innerpart1 = item.split(rules.multiburst.on).filter(stringCheck);
      var innerpart2 = item.split(rules.multiburst.at2).filter(stringCheck);

      if (innerpart1.length === 2) {
        // first with on
        item = innerpart1[1];
      } else if (innerpart2.length >= 2) {
        // Try at expression
        if (innerpart2.length === 3) {
          // lets meet sunday at 3pm
          // lobby at 3pm
          item = innerpart2[1];

        } else if (innerpart2.length === 2) {
          if (rules.multiburst.days.test(innerpart2[1])) {
            // We just use item...
            // ie: today at TIME
          } else {
            // In this case, we just want the part after 'at' which should be a time component
            // lobby at 3pm
            item = innerpart2[1];
          }
        } else {
          console.log('We need to test this...', innerpart2);
        }
      }

      var td = Date.create(item);
      if (td.isValid()) {
        return blank(Date.future(item), item);
      } else {

        // Last attempt, lets peel it back one token at a time.
        var tok = item.split(' ');
        for (var i = 0; i < tok.length; i++) {
          var na = tok.slice(i);
          var revisedInput = na.join(' ');
          var td = Date.create(revisedInput);
          if (td.isValid()) {
            return blank(Date.future(revisedInput), revisedInput);
          }
        }
      }
    });

  } else if (ranges.length === 2) {
    // Range date
    var d1 = Date.create(ranges[0]);
    var d2 = Date.create(ranges[1]);
    if (d1.isValid() && d2.isValid()) {
      dates[0] = blank(d1, ranges[0]);
      dates[0].to = blank(d2, ranges[1]);
    }
  }

  return dates;
};

var extractDates = function(input) {
  input = stripCommas(hyphenatedDates(input));
  var results = parseInput(input);
  return cleanArray(results);
};

var stripCommas = function (str) {
  return str.replace(/,/g, '');
};

var cleanArray = function (actual) {
  var newArray = new Array();
  for(var i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i]);
    }
  }
  return newArray;
};

// console.log(extractDates("i will get the tagger in tip-top shape this week"));

module.exports = extractDates;

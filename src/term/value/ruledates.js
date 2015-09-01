
var _r = function(a, j, f) {
  if (!j) {
    j = '';
  }
  return new RegExp(a.join(j), f || '');
};

var data = require('./lexdates').dates;

exports.zip = {
  range: /(?:\b|^)(?:between|from)(.*)(?:\sand(?= ) |or\s)(.*)|(?:\b|^)(?:between|from)?(.*)(?:(?:\sto\s)|(?: ?\- ?))(.+)/i,
  multi: /(?: |^)(?:and(?= ) |or(?= ) )|(?: ?\& ?)|(?: ?, ?)(?=\d)/i,
  iso: /(?:(\d{4}|[+\-]\d{6})(?:\-)([1-9]|0[1-9]|1[0-2])(?:\-)(3[0-1]|[12][0-9]|0?[1-9])?)(?:T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3}))?)?(?:(Z)|([+\-])(\d{2})(?::(\d{2}))?)?)?/,
  day: {
    suffix: '(?:st|nd|rd|th)?(?:,\\s| of |$|\\s)',
    nr: /(3[0-1]|[12][0-9]|0?[1-9])(?:st|nd|rd|th)?(?:,\s| of |$|\s)/i },
  month: { nr: /([1-9]|0[1-9]|1[0-2])/ },
  year: {
    nr: '(?:([0-9]{1,4})+)',
    neg: /(?:\b| )[b]\s?(?:.?)\s?[c]\s?(?:.?)\s?[e]?\s?(?:.?)\s(?:([0-9]{1,4})+)|(?:([0-9]{1,4})+)(?:\b| )[b]\s?(?:.?)\s?[c]\s?(?:.?)\s?[e]?\s?(?:.?)| before| vor| v./i,
    pos: /(?:\b| )[a|c]\s?(?:.?)\s?[d|e]\s?(?:.?)\s(?:([0-9]{1,4})+)|(?:([0-9]{1,4})+)(?:\b| )[a|c]\s?(?:.?)\s?[d|e]\s?(?:.?)| anno| nach| n./i
  },
  short: [
    { 
      matches: /(?:([1-9]|0[1-9]|1[0-2])\s?(?:\-|\/)+\s?(3[0-1]|[12][0-9]|0?[1-9])\s?(?:\-|\/)+\s?(?:([0-9]{1,4})+)?)/,
      parameters: {
        pattern: [ 'month', 'day', 'year' ]
      }
    },
    { 
      matches: /(?:(3[0-1]|[12][0-9]|0?[1-9])\s?(?:\.|\/)+\s?([1-9]|0[1-9]|1[0-2])\s?(?:\.|\/)+\s?(?:([0-9]{1,4})+)?)/,
      parameters: {
        pattern: [ 'day', 'month', 'year' ]
      }
    }
  ],
  dayFirst: [
    {
      matches: [
        '(?:',
        '(?: |^)',
        '(?:',
        '(?:',
        '(3[0-1]|[12][0-9]|0?[1-9])(?:st|nd|rd|th)?(?:,\\s| of |$|\\s)',
        ')?)',
        '{m.w}?(?:$| )',
        ')(?:(?:.*?)',
        '(?:([0-9]{1,4})+)',
        '?)' ],
      parameters: {
        pattern: [ 'day', 'month', 'year' ]
      }
    },
    0,
    {
      matches: /(?: |^)(?:([0-9]{1,4})+)/i,
      parameters: {
        pattern: [ 'year' ]
      }
    }
  ],
  monthFirst: [
    {
      matches: [
        '(?:',
        '(?: |^)',
        '{m.w}(?:$| ))(?:',
        '(3[0-1]|[12][0-9]|0?[1-9])(?:st|nd|rd|th)?(?:,\\s| of |$|\\s)',
        ')(?:(?:.*?)',
        '(?:([0-9]{1,4})+)',
        '?)'
      ],
      parameters: {
        pattern: [ 'month', 'day', 'year' ]
      }
    },
    0,
    {
      matches: /(?: |^)(?:([0-9]{1,4})+)/i,
      parameters: {
        pattern: [ 'year' ]
      }
    }
  ],
  relative: [
    {
      matches: /(?:(?: |^)(?:within|in)\s*(?:the\s*)?(?:(?:(?:next |upcoming |coming |following )|(last |previous |closing |past )))([0-9]+)?\s*(?:(millennium(?:s?)|millennia)|(centur(?:y|ies))|(decades?)|(years?)|(months?)|(days?)|(h\.?|hr|hrs|hours?|stunden?|heurs?)|(m(?:\.| )|min(?:ute(?:[sn]?))|mikes?)|(s(?:\.| )|se[ck]\.?(?:(?:[ou])nde?)?|\u0022|\u2033))\s*(?=(?:\W|$)))/i,
      parameters: { fn: 'gregorian', isRange: 1 }
    },
    { 
      matches: /(?:(?: |^)(?:(?:next |upcoming |coming |following )|(last |previous |closing |past ))([0-9]+)?\s*(?:(millennium(?:s?)|millennia)|(centur(?:y|ies))|(decades?)|(years?)|(months?)|(days?)|(h\.?|hr|hrs|hours?|stunden?|heurs?)|(m(?:\.| )|min(?:ute(?:[sn]?))|mikes?)|(s(?:\.| )|se[ck]\.?(?:(?:[ou])nde?)?|\u0022|\u2033))\s*)/i,
      parameters: { fn: 'gregorian' }
    },
    {
      matches: /(?:(?: |^)(tomorrow|tmr)|(yester|y(?:.?)da)|((?:(?:to|2)(?:night|nite|nyt|noc))|tngt)|(morning)|(noon)|(afternoon|aftn)|(eve(?:ning?))|(night|nite|nyt|noc))?/i,
      parameters: { fn: 'dictionary' }
    }
  ]
}

var mainExport = (function () {
  var _d = 'day', _m = 'month', _y = 'year';
  var w = {day: Object.keys(data.days).join('|'), month: ['(?:(',Object.keys(data.months).join('|'),'),?)'].join('')};
  var m_y = {matches:_r([w.month,' ',exports.zip.year.nr],0,'i'), parameters: {pattern:[_m,_y]}};
  exports.zip.year.nr = new RegExp(exports.zip.year.nr);
  exports.zip.day.weekday = _r(['(?:(',w.day,',?))'],0,'i'),
  exports.zip.month.w = _r([w.month],0,'i');
  for (var k in w) {
    var a = exports.zip[k+'First'][0].matches.map(function(s){ return s.replace('{m.w}',w.month) });
    exports.zip[k+'First'][0].matches = _r(a,0,'i');
    exports.zip[k+'First'][1] = m_y;
  }
  exports.zip.short.unshift({matches: exports.zip.iso, parameters: {pattern:[_y,_m,_d]}});
  return exports.zip;
})();

module.exports = mainExport;
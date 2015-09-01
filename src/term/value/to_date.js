// /*
// - hebrew, julian etc.
// observe pattern or setter: 
// - whenever year/month/day... changes, DO update .Date, localized

// - make years negative if b.c. (check suffixes) --> negCheck

// - weekday fallback (rules, but no detection yet for mon.|monday etc., we have the data, so TODO) 
// - cache sets
// - I think all further date (i18n and format) methods are not scope of this project, 
//   so maybe TODO an optional "hook" for moment.js and a moment instead of js Date ...
// */

var data = require('./lexdates').dates;
var rules = require("./ruledates");

// Do we really need to save 16 characters here?
var _d = 'day', _m = 'month', _y = 'year', _wd = 'weekDay';

var _methods = {day:'UTCDate', month:'UTCMonth', year:'UTCFullYear', weekDay:'UTCDay'};
var last_dates = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function get(D, t, doSet) {
  var method = ['get',_methods[t]].join('');
  return (D && method && doSet) 
    ? D[method]()+((t==='month')?1:0) 
    : false;
}

function set(o) {
  // the Date bug "2 digit years always in last century" is fixed in function 'year'
  // now prevent the Date bug "setting the Date to final value if month or date is null"
  var d = new Date(Date.UTC(o[_y]||null, o[_m]-1||0, o[_d]||1, 0, 0, 0, 0 /*, hour, minute, second, millisecond*/));
  // and finally prevent the "year < 1900 // y2k" bug
  // can anybody confirm the above internally uses setYear instead of setFullYear ?
  d.setUTCFullYear((typeof o[_y] === 'number') ? o[_y] : this.now.getUTCFullYear());
  return d;
}

// function negCheck(o) {
//   // negative years ... TODO
//   if (o.integer > 0 && rules[_y].negative.hasOwnProperty(o.normalised)) return -(o.integer);
//   return o.integer;
// }

function year(o) {
  var is = {n: o.text.match(rules[_y].neg), p: o.text.match(rules[_y].pos)}, k;
  for (k in is) { if (!_.hasL(is[k]) || is[k][0].indexOf(o[_y].toString()) < 0) { is[k] = false; } }
  if (o[_y] < 0) { return o[_y]; }
  // 2 digit years, prefer modern - TODO -> options ? strict = true/false
  var nowY = this.now.getUTCFullYear();
  var century = Math.floor(nowY/1000)*1000;
  if (!is.n && !is.p && o[_d] && o[_y]<=((nowY+5)-century) ) { return century+o[_y]; }
  return (is.n) ? -(o[_y]) : o[_y];
}

function lastDay(o) {
  var i = o[_m]-1; // leap years:
  return (i === 1 && new Date(o[_y], 1, 29).getMonth() == 1) ? last_dates[i]+1 : last_dates[i];
}

function blank(nowD, doSet) {
  if (!nowD) {
    return {
      text: this.text.trim(), 
      relativeTo: false, day: false, month: false, year: false, weekDay: false
    };
  }
  return {
    text: this.text.trim(),
    relativeTo: false,
    day:get(nowD,_d,doSet),
    month:get(nowD,_m,doSet),
    year:get(nowD,_y,doSet),
    weekDay:get(nowD,_wd,doSet),
    Date: nowD || {},
    to: false
  };
}

rules.fn = tokenFn(rules, 'short', 1);
rules.dayFirstFn = tokenFn(rules, 'dayFirst', 1);
rules.monthFirstFn = tokenFn(rules, 'monthFirst', 1);
rules.relativeFn = tokenFn(rules, 'relative', 1);
rules.relativeFns = {
  gregorian: function (o,i,summand,isNeg) {
    // super flexible, for all languages with gregorian calendar ! :
    var n = (1000/Math.pow(10, i));
    if (n>=1 && o.year) { o.year = Math.floor((isNeg ? o.year-n : o.year+n)/n)*n; return o; }
    var a = ['month','day','hour','minute']; // TODO goes to blank (object keys) when 'time' TODO is done
    var k = a[((+n).toFixed(a.length)).split(/(?:\.|1)/g)[1].length];
    var D = new Date(o.Date);
    D['set'+_methods[k]](D['get'+_methods[k]]() + (isNeg ? -(summand) : summand));
    return blank(D,1);
  },
  dictionary: function (o,i) { // sets known dates w. times (tommorrow evening)
    var a = [[1],[-1],[-1,22],[0,22],[0,22],[0,6],[0,12],[0,15],[0,18]];
    if (a[i][0]) { o.day += a[i][0]; }
    if (a[i][1]) { o.hour = a[i][1]; }
    return o;
  }
}

function hyphenatedDates(str, recover) {
  var i;
  for (i=0; i<2; i++) {
    var rule = rules.short[i].matches;
    var r = (recover) ? new RegExp(rule.source.replace(/\D\-/g, '_'), 'g') : new RegExp(rule.source, 'g');
    var find = (recover) ? /_/g : /\-/g, repl = (recover) ? '-' : '_', a;
    while ((a = r.exec(str)) !== null) {
      str = str.replace(a[0], a[0].replace(find, repl));
    }
  }
  return str;
}

function range(ranges) {
  var range = ranges[0];
  if (ranges.length > 1) {
    var o = {range:ranges[0], to:ranges[1]};
    if (!o.range[_m]) { o.range[_m] = o.to[_m]; }
    if (!o.range[_y]) { o.range[_y] = o.to[_y]; }
    if (!o.to[_m]) { o.to[_m] = o.range[_m]; }
    if (!o.to[_d]) { o.to[_d] = o.range[_d]; }
    range = o.range;
    range.to = o.to;
  }
  return range;
}

function index(a, st){
  var n = -1, i;
  for (i=st+1; i<a.length; i++){ if(a[i]) { return i-1-st; } }
}

function knows(matches) {
  console.log("Matches", matches);
  if (matches.fn) { // usually *relative* dates
    var _o = mixin({text: matches.shift().trim()||matches.input}, blank(this.options.now,1));
    var isNeg = !!(matches[0]); // TODO suffixes
    var sum = ((matches[1]) ? parseInt(matches[1],10) : 1);
    var res = rules.relativeFns[matches.fn](_.shallow(_o), index(matches, 1), sum, isNeg);
    res.text = _o.text;
    if (matches.isRange || sum > 1) {
      if (isNeg) { res.to = _o; } else { _o.to = res; res = _o; }
    }
    res.relativeTo = this.options.now;
  } else { // usually *absolute* dates
    var _o = {text: matches.shift().trim() || matches.input};

    var res = matches.pattern.reduce(function(o, c, i) {
      if (!matches[i] || !str(matches[i])) {
        return o;
      }
      var n = parseInt(matches[i], 10);
      o[c] = (n) ? n : data.months[matches[i].toLowerCase()];
      return o;
    }, mixin(_o, blank.bind(this)));


  } 
  this.parts = this.parts.concat(res);
  return res;
}

function postprocess(o, i) {
  if (!o.text || o.text.length < 3) { this.results[i] = false; return false; }
  // make sure date is in that month...
  if (o[_d] !== false && (o[_d] > 31 || (o[_m] !== false && o[_d] > lastDay(o)))) {
    return null;  
  }
  o.Date = set.call(this, o);
  // toISOString has crossbrowser issues and automatically 'fills', 
  // see https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString#Polyfill - TODO ???
  // o.iso = o.Date.toISOString();
  o.localized = new Intl.DateTimeFormat(this.options.locale || "en", this.options.localized).format(o.Date);
  if (o.to) { 
    delete o.to.to;
    delete o.to.relativeTo
    o.to = JSON.parse(JSON.stringify(o.to));
    o.to.Date = set.call(this, o.to);
    if(o.to.Date) { 
      var hasToD = 1;
      o.localized = new Intl.DateTimeFormat(this.options.locale|| "en", this.options.localized).format(o.to.Date); 
    }
  }
  if (o.Date && hasToD) { 
    // make sure to-date > date
    var toTooSmall = ((isFinite(o.Date.valueOf()) && isFinite(o.to.Date.valueOf())?(o.Date>o.to.Date)-(o.Date<o.to.Date):NaN) > -1);
    if (toTooSmall) { return blank(); }
  }
  if (o.Date && o[_d] && o[_m] && o[_y] && !o[_wd]) { o[_wd] = get(o.Date,_wd,1); }
  if (hasToD && o.to[_d] && o.to[_m] && o.to[_y] && !o.to[_wd]) { o.to[_wd] = get(o.to.Date,_wd,1); }
  return o;
}

function parseDate(w, i, a) {
  
  w = hyphenatedDates(w, 1);
  function known() { // recursive rules
    ['fn', 'relativeFn', 0].forEach(function(fn) {
      if (!fn) {
        var mdO = {
          month: w.search(rules[_m].w),
          day: w.search(rules[_d].nr)
        };
        console.log("NO FN", w, rules[_m].w, rules[_d].nr);

        fn = (mdO[_d] > -1 && mdO[_m] > -1 && mdO[_m] < mdO[_d]) ? 'monthFirstFn' : 'dayFirstFn';
      }
      var hasMatches = rules[fn](w);
      if (hasMatches && hasL(hasMatches.filter(str), 1)) {
        var o = this.knows(hasMatches);
        if (o.text) { 
          w = w.replace(o.text, '');
        }
        known();
      }
    }.bind(this));
  }
  known.bind(this)();
  console.log("In parseDates", this);
  return this.parts;
}

function toDate(w, input, options){
  this.options = options;
  this.results = [];
  this.now = new Date();
  this._year = year;
  this.knows = knows;
  this.input = input;
  this.text = hyphenatedDates(w);

  if (!this.options.now) { 
    this.options.now = this.now;
  }
  
  console.log("Range Rules", rules.range);

  var ranges = this.text.split(rules.range).filter(str);
  var rL = hasL(ranges);
  if (rL) {
    this.parts = [];
    var multis = [];
    ranges = ranges.map(function(part) {
      var parts = part.split(rules.multi).filter(str);
      if (hasL(parts,1)) {
        part = parts.shift();
        multis = multis.concat(parts);
      }
      return part.trim();
    }).filter(str);

    if (rL < 2) {
      multis.unshift(ranges[0]);
    } else {
      if (rL > 2) {
        multis = multis.concat(ranges.slice(2));
      }


      ranges.map(parseDate, this);

      if (this.parts[0].to || this.parts[1].to) {
        this.results = this.results.concat(this.parts);
      } else {
        this.results = this.results.concat(range(this.parts));
      }
    }
    if (hasL(multis)) { 
      this.parts = [];
      multis.map(parseDate, this);  
      this.results = this.results.concat(this.parts);  
    }    
  }

  console.log(this);
  return this.results.map(postprocess, this).filter(obj);
}

function w_options (wOo) {
  return (typeof wOo === 'string') ? {
    w: wOo || this.word || this.input || '',
    options: {}
  } : {
    w: this.word || this.input || '',
    options: (obj(wOo)) ? wOo : {}
  }
}

// Has Length
function hasL(a, l) {
  if (!l) l = 0;
  return (a && a instanceof Array && a.length > l) ? a.length : 0; 
}

function str(w) {
  return (typeof w === 'string' && w.trim() != '');
}

function obj(o) { 
  return (o && typeof o === 'object' && !(o instanceof Array));
}

function mixin(dest, sources) {
  if(!dest) {
    dest = {};
  }

  for(var i = 1, l = arguments.length; i < l; i++) {
    _mix(dest, arguments[i]);
  }
  return dest; // Object
}

function _mix(dest, source, copyFunc) {
  if (typeof dest != 'object') { dest = {}; }
  if (typeof source != 'object') { source = {}; }
  var name, s;
  for(name in source){
    s = source[name];
    if(!(name in dest)){
      dest[name] = copyFunc ? copyFunc(s) : s;
    }
  }        
  return dest; // Object
}

function tokenFn(rules, type, noFallback, countStart) {
  if (type instanceof Array) {
    var r = _getProp(type, false, rules);
  } else {
    var r = (rules.hasOwnProperty(type)) ? rules[type] : 0;
  }
  return function(t, i, tokens) {
    if (!r) return false;
    var id;
    if (r instanceof Array) {
      for (id = 0; id < r.length; id++) {
        var rule = r[id];
        var set = setToken(t, i, tokens, rule.tag+'Rule_'+id, rule, countStart);
        if (set) return set;
      }
    } else {
      for (id in r) {
        var rule = r[id];
        var set = setToken(t, i, tokens, id, rule, countStart);
        if (set) return set;
      }
    }
    return (noFallback) ? false : t;
  }
}

function _index(a, st){
  a = a.slice(st); if(!hasL(a)) { return -1; }
  for (i=0; i<a.length; i++){ if(a[i]) { return i; } }
}

function setToken(t, i, tokens, id, r, countStart) {
  if (r._if && r._if(t, tokens[i+1], tokens[i-1], i)) {
    var token = (r.set) ? tokens[i+(r.set)] : t;
    setPos(token, schema[r.tag], toReadable(id));
  } else if (r.matches) {
    var matches = t.match(r.matches);
    if (matches) {
      if (hasL(matches) && typeof countStart === 'number') {
        matches.i = _index(matches, countStart); 
        return matches;
      }
      if (r.tag) { return schema[r.tag]; }
      if (r.hasOwnProperty('returns')) { return r.returns; }
      if (r.hasOwnProperty('replacer')) { return t.replace(r[(r.replaces) ? 'replaces':'matches'], r.replacer); }
      if (r.parameters) {
        for (var k in r.parameters) { matches[k] = r.parameters[k]; }
        return matches;
      }
      return true;
    }
    return false;
  } else if (r.hasOwnProperty('replacer')) { 
    return t.replace(r.replaces, r.replacer); 
  }
}

var to_date = function(w) {
  var wo = w_options.bind(this)(w);
  
  if (hasL(this.dates) && !wo.options.now) {
    return this.dates;
  }

  w = wo.w;

  if (!str(w)) {
    return [];
  }

  var res = new toDate(w, wo.w, wo.options).filter(obj);

  this.dates = (this.dates || []).concat(res);
  this.dates.__proto__ = Object.create(Array.prototype);
  var text = wo.w;
  this.dates.forEach(function(o){
    text = text.replace(o.text, o.localized);
  });
  
  this.dates.__proto__._text = text;
  this.dates.__proto__.text = function() { 
    return this._text;
  };

  return wo;
}

// console.log("---", to_date("Saturday March 1st"));
module.exports = to_date;

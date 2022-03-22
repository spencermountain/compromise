(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('spacetime'), require('spacetime-holiday')) :
  typeof define === 'function' && define.amd ? define(['spacetime', 'spacetime-holiday'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.compromiseDates = factory(global.spacetime, global.spacetimeHoliday));
})(this, (function (spacetime, spacetimeHoliday) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var spacetime__default = /*#__PURE__*/_interopDefaultLegacy(spacetime);
  var spacetimeHoliday__default = /*#__PURE__*/_interopDefaultLegacy(spacetimeHoliday);

  // chop things up into bite-size pieces
  const split = function (dates) {
    let m = null;
    // don't split anything if it looks like a range
    if (dates.has('^(between|within) #Date')) {
      return dates
    }

    if (dates.has('#Month')) {
      // 'june 5, june 10'
      m = dates.match('[#Month #Value] and? #Month', 0).ifNo('@hasDash$');
      if (m.found) {
        dates = dates.splitAfter(m);
      }

      // '5 june, 10 june'
      m = dates.match('[#Value #Month] and? #Value #Month', 0);
      if (m.found) {
        dates = dates.splitAfter(m);
      }

      // 'june, august'
      m = dates.match('^[#Month] and? #Month #Ordinal?$', 0);
      if (m.found) {
        dates = dates.splitAfter(m);
      }

      // 'june 5th, june 10th'
      m = dates.match('[#Month #Value] #Month', 0).ifNo('@hasDash$');
      if (m.found) {
        dates = dates.splitAfter(m);
      }
    }

    if (dates.has('#WeekDay')) {
      // 'tuesday, wednesday'
      m = dates.match('^[#WeekDay] and? #WeekDay$', 0).ifNo('@hasDash$');
      if (m.found) {
        dates = dates.splitAfter(m);
      }

      // 'tuesday, wednesday, and friday'
      m = dates.match('#WeekDay #WeekDay and? #WeekDay');
      if (m.found) {
        dates = dates.splitOn('#WeekDay');
      }

      // monday, wednesday
      m = dates.match('[#WeekDay] (and|or|this|next)? #WeekDay', 0).ifNo('@hasDash$');
      if (m.found) {
        dates = dates.splitAfter('#WeekDay');
      }
    }

    // next week tomorrow
    m = dates.match('(this|next) #Duration [(today|tomorrow|yesterday)]', 0);
    if (m.found) {
      dates = dates.splitBefore(m);
    }
    // tomorrow 15 march
    m = dates.match('[(today|tomorrow|yesterday)] #Value #Month', 0);
    if (m.found) {
      dates = dates.splitAfter(m);
    }
    // tomorrow yesterday
    m = dates.match('[(today|tomorrow|yesterday)] (today|tomorrow|yesterday|#WeekDay)', 0).ifNo('@hasDash$');
    if (m.found) {
      dates = dates.splitAfter(m);
    }
    // cleanup any splits
    dates = dates.not('^and');
    return dates
  };

  const findDate = function (doc) {
    // if (doc.world.isVerbose() === 'date') {
    //   doc.debug()
    //   console.log('          ---')
    // }
    let dates = doc.match('#Date+');
    // ignore only-durations like '20 minutes'
    dates = dates.filter((m) => {
      let isDuration = m.has('^#Duration+$') || m.has('^#Value #Duration+$');
      // allow 'q4', etc
      if (isDuration === true && m.has('(#FinancialQuarter|quarter)')) {
        return true
      }
      return isDuration === false
    });
    // 30 minutes on tuesday
    let m = dates.match('[#Cardinal #Duration (in|on|this|next|during|for)] #Date', 0);
    if (m.found) {
      dates = dates.not(m);
    }
    // 30 minutes tuesday
    m = dates.match('[#Cardinal #Duration] #WeekDay', 0);
    if (m.found) {
      dates = dates.not(m);
    }
    // tuesday for 30 mins
    m = dates.match('#Date [for #Value #Duration]$', 0);
    if (m.found) {
      dates = dates.not(m);
    }
    // '20 minutes june 5th'
    m = dates.match('[#Cardinal #Duration] #Date', 0); //but allow '20 minutes ago'
    if (m.found && !dates.has('#Cardinal #Duration] (ago|from|before|after|back)')) {
      dates = dates.not(m);
    }
    // for 20 minutes
    m = dates.match('for #Cardinal #Duration');
    if (m.found) {
      dates = dates.not(m);
    }
    // 'one saturday'
    dates = dates.notIf('^one (#WeekDay|#Month)$');
    // tokenize the dates
    dates = split(dates);

    // $5 an hour
    dates = dates.notIf('(#Money|#Percentage)');
    dates = dates.notIf('^per #Duration');
    return dates
  };

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
    year: true,
  };

  const aliases = {
    wk: 'week',
    min: 'minute',
    sec: 'second',
    weekend: 'week', //for now...
  };

  const parseUnit = function (m) {
    let unit = m.match('#Duration').text('normal');
    unit = unit.replace(/s$/, '');
    // support shorthands like 'min'
    if (aliases.hasOwnProperty(unit)) {
      unit = aliases[unit];
    }
    return unit
  };

  //turn '5 weeks before' to {weeks:5}
  const parseShift = function (doc) {
    let result = {};
    let m = doc.none();
    let shift = doc.match('#DateShift+');
    if (shift.found === false) {
      return { res: result, m }
    }

    // '5 weeks'
    shift.match('#Cardinal #Duration').forEach((ts) => {
      let num = ts.match('#Cardinal').numbers().get()[0];
      if (num && typeof num === 'number') {
        let unit = parseUnit(ts);
        if (knownUnits[unit] === true) {
          result[unit] = num;
        }
      }
    });
    //is it 2 weeks ago?  → -2
    if (shift.has('(before|ago|hence|back)$') === true) {
      Object.keys(result).forEach((k) => (result[k] *= -1));
    }
    m = shift.match('#Cardinal #Duration');
    shift = shift.not(m);

    // supoprt '1 day after tomorrow'
    m = shift.match('[<unit>#Duration] [<dir>(after|before)]');
    if (m.found) {
      let unit = m.groups('unit').text('reduced');
      // unit = unit.replace(/s$/, '')
      let dir = m.groups('dir').text('reduced');
      if (dir === 'after') {
        result[unit] = 1;
      } else if (dir === 'before') {
        result[unit] = -1;
      }
    }

    // in half an hour
    m = shift.match('half (a|an) [#Duration]', 0);
    if (m.found) {
      let unit = parseUnit(m);
      result[unit] = 0.5;
    }
    // finally, remove it from our text
    m = doc.match('#DateShift+');
    return { result, m }
  };

  /*
  a 'counter' is a Unit determined after a point
    * first hour of x
    * 7th week in x
    * last year in x
    * 
  unlike a shift, like "2 weeks after x"
  */
  const oneBased = {
    minute: true,
  };

  const getCounter = function (doc) {
    // 7th week of
    let m = doc.match('[<num>#Value] [<unit>#Duration+] (of|in)');
    if (m.found) {
      let obj = m.groups();
      let num = obj.num.numbers().get()[0];
      let unit = obj.unit.text('reduced');
      let result = {
        unit: unit,
        num: Number(num) || 0,
      };
      // 0-based or 1-based units
      if (!oneBased[unit]) {
        result.num -= 1;
      }
      return { result, m }
    }
    // first week of
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
      let result = {
        unit: unit,
        dir: dir,
      };
      return { result, m }
    }

    return { result: null, m: doc.none() }
  };

  const hardCoded = {
    daybreak: '7:00am', //ergh
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
    midnight: '12:00am',
  };
  const minMap = {
    quarter: 15,
    half: 30,
  };

  // choose ambiguous ampm
  const ampmChooser = function (s) {
    let early = s.time('6:00am');
    if (s.isBefore(early)) {
      return s.ampm('pm')
    }
    return s
  };

  // parse 'twenty past 2'
  const halfPast = function (m, s) {
    let hour = m.match('#Cardinal$');
    let punt = m.not(hour).match('(half|quarter|25|20|15|10|5)');
    // get the mins, and the hour
    hour = hour.text('reduced');
    let mins = punt.text('reduced');
    // support 'quarter'
    if (minMap.hasOwnProperty(mins)) {
      mins = minMap[mins];
    }
    let behind = m.has('to');
    // apply it
    s = s.hour(hour);
    s = s.startOf('hour');
    // assume 'half past 5' is 5pm
    if (hour < 6) {
      s = s.ampm('pm');
    }
    if (behind) {
      s = s.subtract(mins, 'minutes');
    } else {
      s = s.add(mins, 'minutes');
    }
    return s
  };

  const parseTime = function (doc, context) {
    let time = doc.match('(at|by|for|before|this|after)? #Time+');
    // get the main part of the time
    time = time.not('^(at|by|for|before|this|after)');
    time = time.not('sharp');
    time = time.not('on the dot');
    let s = spacetime__default["default"].now(context.timezone);
    let now = s.clone();
    // check for known-times (like 'today')
    let timeStr = time.text('reduced');
    if (hardCoded.hasOwnProperty(timeStr)) {
      return { result: hardCoded[timeStr], m: time }
    }
    // '5 oclock'
    let m = time.match('^#Cardinal oclock (am|pm)?');
    if (m.found) {
      s = s.hour(m.text('reduced'));
      s = s.startOf('hour');
      if (s.isValid() && !s.isEqual(now)) {
        let ampm = m.match('(am|pm)');
        if (ampm.found) {
          s = s.ampm(ampm.text('reduced'));
        } else {
          s = ampmChooser(s);
        }
        return { result: s.time(), m }
      }
    }

    // 'quarter to two'
    m = time.match('(half|quarter|25|20|15|10|5) (past|after|to) #Cardinal');
    if (m.found) {
      s = halfPast(m, s);
      if (s.isValid() && !s.isEqual(now)) {
        // choose ambiguous ampm
        s = ampmChooser(s);
        return { result: s.time(), m }
      }
    }
    // 'twenty past'
    m = time.match('[<min>(half|quarter|25|20|15|10|5)] (past|after)');
    if (m.found) {
      let min = m.groups('min').text('reduced');
      let d = spacetime__default["default"](context.today);
      // support 'quarter', etc.
      if (minMap.hasOwnProperty(min)) {
        min = minMap[min];
      }
      d = d.next('hour').startOf('hour').minute(min);
      if (d.isValid() && !d.isEqual(now)) {
        return { result: d.time(), m }
      }
    }
    // 'ten to'
    m = time.match('[<min>(half|quarter|25|20|15|10|5)] to');
    if (m.found) {
      let min = m.groups('min').text('reduced');
      let d = spacetime__default["default"](context.today);
      // support 'quarter', etc.
      if (minMap.hasOwnProperty(min)) {
        min = minMap[min];
      }
      d = d.next('hour').startOf('hour').minus(min, 'minutes');
      if (d.isValid() && !d.isEqual(now)) {
        return { result: d.time(), m }
      }
    }
    // '4 in the evening'
    m = time.match('[<time>#Time] (in|at) the? [<desc>(morning|evening|night|nighttime)]');
    if (m.found) {
      let str = m.groups('time').text('normal');
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
        return { result: s.time(), m }
      }
    }

    // 'this morning at 4'
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
        return { result: s.time(), m }
      }
    }

    // 'at 4' -> '4'
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
        return { result: s.time(), m }
      }
    }

    // parse random a time like '4:54pm'
    let str = time.text('reduced');
    s = s.time(str);
    if (s.isValid() && !s.isEqual(now)) {
      // choose ambiguous ampm
      if (/(am|pm)/i.test(str) === false) {
        s = ampmChooser(s);
      }
      return { result: s.time(), m: time }
    }
    // should we fallback to a dayStart default?
    if (context.dayStart) {
      return { result: context.dayStart, m: doc.none() }
    }
    return { result: null, m: doc.none() }
  };

  // interpret 'this halloween' or 'next june'
  const parseRelative = function (doc) {
    // avoid parsing 'day after next'
    if (doc.has('(next|last|this)$')) {
      return { result: null, m: doc.none() }
    }
    // next monday
    let m = doc.match('^this? (next|upcoming|coming)');
    if (m.found) {
      return { result: 'next', m }
    }
    // 'this past monday' is not-always 'last monday'
    m = doc.match('^this? (past)');
    if (m.found) {
      return { result: 'this-past', m }
    }
    // last monday
    m = doc.match('^this? (last|previous)');
    if (m.found) {
      return { result: 'last', m }
    }
    // this monday
    m = doc.match('^(this|current)');
    if (m.found) {
      return { result: 'this', m }
    }
    return { result: null, m: doc.none() }
  };

  // 'start of october', 'middle of june 1st'
  const parseSection = function (doc) {
    // start of 2019
    let m = doc.match('[(start|beginning) of] .', 0);
    if (m.found) {
      return { result: 'start', m }
    }
    // end of 2019
    m = doc.match('[end of] .', 0);
    if (m.found) {
      return { result: 'end', m }
    }
    // middle of 2019
    m = doc.match('[(middle|midpoint|center) of] .', 0);
    if (m.found) {
      return { result: 'middle', m }
    }
    return { result: null, m }
  };

  // some opinionated-but-common-sense timezone abbreviations

  const america$1 = 'America/';
  const asia$1 = 'Asia/';
  const europe$1 = 'Europe/';
  const africa$1 = 'Africa/';
  const aus$1 = 'Australia/';
  const pac$1 = 'Pacific/';

  const informal$1 = {
    //europe
    'british summer time': europe$1 + 'London',
    bst: europe$1 + 'London',
    'british time': europe$1 + 'London',
    'britain time': europe$1 + 'London',
    'irish summer time': europe$1 + 'Dublin',
    'irish time': europe$1 + 'Dublin',
    ireland: europe$1 + 'Dublin',
    'central european time': europe$1 + 'Berlin',
    cet: europe$1 + 'Berlin',
    'central european summer time': europe$1 + 'Berlin',
    cest: europe$1 + 'Berlin',
    'central europe': europe$1 + 'Berlin',
    'eastern european time': europe$1 + 'Riga',
    eet: europe$1 + 'Riga',
    'eastern european summer time': europe$1 + 'Riga',
    eest: europe$1 + 'Riga',
    'eastern europe time': europe$1 + 'Riga',
    'western european time': europe$1 + 'Lisbon',
    // wet: europe+'Lisbon',
    'western european summer time': europe$1 + 'Lisbon',
    // west: europe+'Lisbon',
    'western europe': europe$1 + 'Lisbon',
    'turkey standard time': europe$1 + 'Istanbul',
    trt: europe$1 + 'Istanbul',
    'turkish time': europe$1 + 'Istanbul',

    //africa
    etc: africa$1 + 'Freetown',
    utc: africa$1 + 'Freetown',
    'greenwich standard time': africa$1 + 'Freetown',
    gmt: africa$1 + 'Freetown',
    'east africa time': africa$1 + 'Nairobi',
    // eat: africa+'Nairobi',
    'east african time': africa$1 + 'Nairobi',
    'eastern africa time': africa$1 + 'Nairobi',
    'central africa time': africa$1 + 'Khartoum',
    // cat: africa+'Khartoum',
    'central african time': africa$1 + 'Khartoum',
    'south africa standard time': africa$1 + 'Johannesburg',
    sast: africa$1 + 'Johannesburg',
    'southern africa': africa$1 + 'Johannesburg',
    'south african': africa$1 + 'Johannesburg',
    'west africa standard time': africa$1 + 'Lagos',
    // wat: africa+'Lagos',
    'western africa time': africa$1 + 'Lagos',
    'west african time': africa$1 + 'Lagos',

    'australian central standard time': aus$1 + 'Adelaide',
    acst: aus$1 + 'Adelaide',
    'australian central daylight time': aus$1 + 'Adelaide',
    acdt: aus$1 + 'Adelaide',
    'australia central': aus$1 + 'Adelaide',
    'australian eastern standard time': aus$1 + 'Brisbane',
    aest: aus$1 + 'Brisbane',
    'australian eastern daylight time': aus$1 + 'Brisbane',
    aedt: aus$1 + 'Brisbane',
    'australia east': aus$1 + 'Brisbane',
    'australian western standard time': aus$1 + 'Perth',
    awst: aus$1 + 'Perth',
    'australian western daylight time': aus$1 + 'Perth',
    awdt: aus$1 + 'Perth',
    'australia west': aus$1 + 'Perth',
    'australian central western standard time': aus$1 + 'Eucla',
    acwst: aus$1 + 'Eucla',
    'australia central west': aus$1 + 'Eucla',
    'lord howe standard time': aus$1 + 'Lord_Howe',
    lhst: aus$1 + 'Lord_Howe',
    'lord howe daylight time': aus$1 + 'Lord_Howe',
    lhdt: aus$1 + 'Lord_Howe',
    'russian standard time': europe$1 + 'Moscow',
    msk: europe$1 + 'Moscow',
    russian: europe$1 + 'Moscow',

    //america
    'central standard time': america$1 + 'Chicago',
    'central time': america$1 + 'Chicago',
    cst: america$1 + 'Havana',
    'central daylight time': america$1 + 'Chicago',
    cdt: america$1 + 'Havana',
    'mountain standard time': america$1 + 'Denver',
    'mountain time': america$1 + 'Denver',
    mst: america$1 + 'Denver',
    'mountain daylight time': america$1 + 'Denver',
    mdt: america$1 + 'Denver',
    'atlantic standard time': america$1 + 'Halifax',
    'atlantic time': america$1 + 'Halifax',
    ast: asia$1 + 'Baghdad',
    'atlantic daylight time': america$1 + 'Halifax',
    adt: america$1 + 'Halifax',
    'eastern standard time': america$1 + 'New_York',
    'eastern': america$1 + 'New_York',
    'eastern time': america$1 + 'New_York',
    est: america$1 + 'New_York',
    'eastern daylight time': america$1 + 'New_York',
    edt: america$1 + 'New_York',
    'pacific time': america$1 + 'Los_Angeles',
    'pacific standard time': america$1 + 'Los_Angeles',
    pst: america$1 + 'Los_Angeles',
    'pacific daylight time': america$1 + 'Los_Angeles',
    pdt: america$1 + 'Los_Angeles',
    'alaskan standard time': america$1 + 'Anchorage',
    'alaskan time': america$1 + 'Anchorage',
    ahst: america$1 + 'Anchorage',
    'alaskan daylight time': america$1 + 'Anchorage',
    ahdt: america$1 + 'Anchorage',
    'hawaiian standard time': pac$1 + 'Honolulu',
    'hawaiian time': pac$1 + 'Honolulu',
    hst: pac$1 + 'Honolulu',
    'aleutian time': pac$1 + 'Honolulu',
    'hawaii time': pac$1 + 'Honolulu',
    'newfoundland standard time': america$1 + 'St_Johns',
    'newfoundland time': america$1 + 'St_Johns',
    nst: america$1 + 'St_Johns',
    'newfoundland daylight time': america$1 + 'St_Johns',
    ndt: america$1 + 'St_Johns',
    'brazil time': america$1 + 'Sao_Paulo',
    brt: america$1 + 'Sao_Paulo',
    brasília: america$1 + 'Sao_Paulo',
    brasilia: america$1 + 'Sao_Paulo',
    'brazilian time': america$1 + 'Sao_Paulo',
    'argentina time': america$1 + 'Buenos_Aires',
    // art: a+'Buenos_Aires',
    'argentinian time': america$1 + 'Buenos_Aires',
    'amazon time': america$1 + 'Manaus',
    amt: america$1 + 'Manaus',
    'amazonian time': america$1 + 'Manaus',
    'easter island standard time': 'Chile/Easterisland',
    east: 'Chile/Easterisland',
    'easter island summer time': 'Chile/Easterisland',
    easst: 'Chile/Easterisland',
    'venezuelan standard time': america$1 + 'Caracas',
    'venezuelan time': america$1 + 'Caracas',
    vet: america$1 + 'Caracas',
    'venezuela time': america$1 + 'Caracas',
    'paraguay time': america$1 + 'Asuncion',
    pyt: america$1 + 'Asuncion',
    'paraguay summer time': america$1 + 'Asuncion',
    pyst: america$1 + 'Asuncion',
    'cuba standard time': america$1 + 'Havana',
    'cuba time': america$1 + 'Havana',
    'cuba daylight time': america$1 + 'Havana',
    'cuban time': america$1 + 'Havana',
    'bolivia time': america$1 + 'La_Paz',
    // bot: a+'La_Paz',
    'bolivian time': america$1 + 'La_Paz',
    'colombia time': america$1 + 'Bogota',
    cot: america$1 + 'Bogota',
    'colombian time': america$1 + 'Bogota',
    'acre time': america$1 + 'Eirunepe',
    // act: a+'Eirunepe',
    'peru time': america$1 + 'Lima',
    // pet: a+'Lima',
    'chile standard time': america$1 + 'Punta_Arenas',
    'chile time': america$1 + 'Punta_Arenas',
    clst: america$1 + 'Punta_Arenas',
    'chile summer time': america$1 + 'Punta_Arenas',
    cldt: america$1 + 'Punta_Arenas',
    'uruguay time': america$1 + 'Montevideo',
    uyt: america$1 + 'Montevideo',

    //asia
    ist: asia$1 + 'Jerusalem',
    'arabic standard time': asia$1 + 'Baghdad',
    'arabic time': asia$1 + 'Baghdad',
    'arab time': asia$1 + 'Baghdad',
    'iran standard time': asia$1 + 'Tehran',
    'iran time': asia$1 + 'Tehran',
    irst: asia$1 + 'Tehran',
    'iran daylight time': asia$1 + 'Tehran',
    irdt: asia$1 + 'Tehran',
    iranian: asia$1 + 'Tehran',
    'pakistan standard time': asia$1 + 'Karachi',
    'pakistan time': asia$1 + 'Karachi',
    pkt: asia$1 + 'Karachi',
    'india standard time': asia$1 + 'Kolkata',
    'indian time': asia$1 + 'Kolkata',
    'indochina time': asia$1 + 'Bangkok',
    ict: asia$1 + 'Bangkok',
    'south east asia': asia$1 + 'Bangkok',
    'china standard time': asia$1 + 'Shanghai',
    ct: asia$1 + 'Shanghai',
    'chinese time': asia$1 + 'Shanghai',
    'alma-ata time': asia$1 + 'Almaty',
    almt: asia$1 + 'Almaty',
    'oral time': asia$1 + 'Oral',
    'orat time': asia$1 + 'Oral',
    'yakutsk time': asia$1 + 'Yakutsk',
    yakt: asia$1 + 'Yakutsk',
    'gulf standard time': asia$1 + 'Dubai',
    'gulf time': asia$1 + 'Dubai',
    gst: asia$1 + 'Dubai',
    uae: asia$1 + 'Dubai',
    'hong kong time': asia$1 + 'Hong_Kong',
    hkt: asia$1 + 'Hong_Kong',
    'western indonesian time': asia$1 + 'Jakarta',
    wib: asia$1 + 'Jakarta',
    'indonesia time': asia$1 + 'Jakarta',
    'central indonesian time': asia$1 + 'Makassar',
    wita: asia$1 + 'Makassar',
    'israel daylight time': asia$1 + 'Jerusalem',
    idt: asia$1 + 'Jerusalem',
    'israel standard time': asia$1 + 'Jerusalem',
    'israel time': asia$1 + 'Jerusalem',
    israeli: asia$1 + 'Jerusalem',
    'krasnoyarsk time': asia$1 + 'Krasnoyarsk',
    krat: asia$1 + 'Krasnoyarsk',
    'malaysia time': asia$1 + 'Kuala_Lumpur',
    myt: asia$1 + 'Kuala_Lumpur',
    'singapore time': asia$1 + 'Singapore',
    sgt: asia$1 + 'Singapore',
    'korea standard time': asia$1 + 'Seoul',
    'korea time': asia$1 + 'Seoul',
    kst: asia$1 + 'Seoul',
    'korean time': asia$1 + 'Seoul',
    'uzbekistan time': asia$1 + 'Samarkand',
    uzt: asia$1 + 'Samarkand',
    'vladivostok time': asia$1 + 'Vladivostok',
    vlat: asia$1 + 'Vladivostok',

    //indian
    'maldives time': 'Indian/Maldives',
    mvt: 'Indian/Maldives',
    'mauritius time': 'Indian/Mauritius',
    mut: 'Indian/Mauritius',

    // pacific
    'marshall islands time': pac$1 + 'Kwajalein',
    mht: pac$1 + 'Kwajalein',
    'samoa standard time': pac$1 + 'Midway',
    sst: pac$1 + 'Midway',
    'somoan time': pac$1 + 'Midway',
    'chamorro standard time': pac$1 + 'Guam',
    chst: pac$1 + 'Guam',
    'papua new guinea time': pac$1 + 'Bougainville',
    pgt: pac$1 + 'Bougainville',
  };

  //add the official iana zonefile names
  let iana$1 = spacetime__default["default"]().timezones;
  let formal$1 = Object.keys(iana$1).reduce((h, k) => {
    h[k] = k;
    return h
  }, {});
  var informal$2 = Object.assign({}, informal$1, formal$1);

  const isOffset = /(-?[0-9]+)h(rs)?/i;
  const isNumber = /(-?[0-9]+)/;
  const utcOffset = /utc([-+]?[0-9]+)/i;
  const gmtOffset = /gmt([-+]?[0-9]+)/i;

  const toIana = function (num) {
    num = Number(num);
    if (num > -13 && num < 13) {
      num = num * -1; //it's opposite!
      num = (num > 0 ? '+' : '') + num; //add plus sign
      return 'Etc/GMT' + num
    }
    return null
  };

  const parseOffset = function (tz) {
    // '+5hrs'
    let m = tz.match(isOffset);
    if (m !== null) {
      return toIana(m[1])
    }
    // 'utc+5'
    m = tz.match(utcOffset);
    if (m !== null) {
      return toIana(m[1])
    }
    // 'GMT-5' (not opposite)
    m = tz.match(gmtOffset);
    if (m !== null) {
      let num = Number(m[1]) * -1;
      return toIana(num)
    }
    // '+5'
    m = tz.match(isNumber);
    if (m !== null) {
      return toIana(m[1])
    }
    return null
  };

  const parseTimezone = function (doc) {
    let m = doc.match('#Timezone+');
    //remove prepositions
    m = m.not('(in|for|by|near|at)');
    let str = m.text('reduced');

    // check our list of informal tz names
    if (informal$2.hasOwnProperty(str)) {
      return { result: informal$2[str], m }
    }
    let tz = parseOffset(str);
    if (tz) {
      return { result: tz, m }
    }

    return { result: null, m: doc.none() }
  };

  // pull-out 'thurs' from 'thurs next week'
  const parseWeekday = function (doc) {
    let day = doc.match('#WeekDay');
    if (day.found && !doc.has('^#WeekDay$')) {
      // handle relative-day logic elsewhere.
      if (doc.has('(this|next|last) (next|upcoming|coming|past)? #WeekDay')) {
        return { result: null, m: doc.none() }
      }
      return { result: day.text('reduced'), m: day }
    }
    return { result: null, m: doc.none() }
  };

  const cleanup = function (doc) {
    // 'the fifth week ..'
    doc = doc.not('[^the] !#Value', 0); // keep 'the 17th'
    // 
    doc = doc.not('#Preposition$');
    doc = doc.not('#Conjunction$');
    doc = doc.not('sharp');
    doc = doc.not('on the dot');
    doc = doc.not('^(on|of)');
    doc = doc.not('(next|last|this)$');
    return doc
  };


  const tokenize = function (doc, context) {
    // parse 'two weeks after'
    let res = parseShift(doc);
    let shift = res.result;
    doc = doc.not(res.m);

    // parse 'nth week of june'
    res = getCounter(doc);
    let counter = res.result;
    doc = doc.not(res.m);

    // parse 'eastern time'
    res = parseTimezone(doc);
    let tz = res.result;
    doc = doc.not(res.m);

    // parse '2pm'
    res = parseTime(doc, context);
    let time = res.result;
    doc = doc.not(res.m);

    // parse 'tuesday'
    res = parseWeekday(doc);
    let weekDay = res.result;
    doc = doc.not(res.m);

    // parse 'start of x'
    res = parseSection(doc);
    let section = res.result;
    doc = doc.not(res.m);

    // parse 'next x'
    res = parseRelative(doc);
    let rel = res.result;
    doc = doc.not(res.m);

    // cleanup remaining doc object
    doc = cleanup(doc);

    return {
      shift,
      counter,
      tz,
      time,
      weekDay,
      section,
      rel,
      doc
    }
  };

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
          year: context.today.year(),
        };
      }
      // set it to the beginning of the given unit
      let d = spacetime__default["default"](input, context.timezone, { today: today });
      Object.defineProperty(this, 'd', {
        enumerable: false,
        writable: true,
        value: d,
      });
      Object.defineProperty(this, 'context', {
        enumerable: false,
        writable: true,
        value: context,
      });
    }
    // make a new one
    clone() {
      let d = new Unit(this.d, this.unit, this.context);
      d.setTime = this.setTime;
      return d
    }
    log() {
      console.log('--');//eslint-disable-line
      this.d.log();
      console.log('\n');//eslint-disable-line
      return this
    }
    applyShift(obj = {}) {
      Object.keys(obj).forEach((unit) => {
        this.d = this.d.add(obj[unit], unit);
        if (unit === 'hour' || unit === 'minute') {
          this.setTime = true;
        }
      });
      return this
    }
    applyTime(str) {
      if (str) {
        let justHour = /^[0-9]{1,2}$/;
        if (justHour.test(str)) {
          this.d = this.d.hour(str);
        } else {
          this.d = this.d.time(str);
        }
        // wiggle the best am/pm
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
      return this
    }
    applyWeekDay(day) {
      if (day) {
        let epoch = this.d.epoch;
        this.d = this.d.day(day);
        if (this.d.epoch < epoch) {
          this.d = this.d.add(1, 'week');
        }
      }
      return this
    }
    applyRel(rel) {
      if (rel === 'next') {
        return this.next()
      }
      if (rel === 'last' || rel === 'this-past') {
        // special 'this past' logic is handled in WeekDay
        return this.last()
      }
      return this
    }
    applySection(section) {
      if (section === 'start') {
        return this.start()
      }
      if (section === 'end') {
        return this.end()
      }
      if (section === 'middle') {
        return this.middle()
      }
      return this
    }
    format(fmt) {
      return this.d.format(fmt)
    }
    start() {
      this.d = this.d.startOf(this.unit);
      // do we have a custom day-start?
      if (this.context.dayStart) {
        this.d = this.d.time(this.context.dayStart);
      }
      return this
    }
    end() {
      // do we have a custom day-end?
      this.d = this.d.endOf(this.unit);
      if (this.context.dayEnd) {
        this.d = this.d.startOf('day');
        let dayEnd = this.d.time(this.context.dayEnd);
        if (dayEnd.isAfter(this.d)) {
          this.d = dayEnd;
          return this
        }
      }
      return this
    }
    middle() {
      let diff = this.d.diff(this.d.endOf(this.unit));
      let minutes = Math.round(diff.minutes / 2);
      this.d = this.d.add(minutes, 'minutes');
      return this
    }
    // move it to 3/4s through
    beforeEnd() {
      let diff = this.d.startOf(this.unit).diff(this.d.endOf(this.unit));
      let mins = Math.round(diff.minutes / 4);
      this.d = this.d.endOf(this.unit);
      this.d = this.d.minus(mins, 'minutes');
      if (this.context.dayStart) {
        this.d = this.d.time(this.context.dayStart);
      }
      return this
    }
    // the millescond before
    before() {
      this.d = this.d.minus(1, this.unit);
      this.d = this.d.endOf(this.unit);
      if (this.context.dayEnd) {
        this.d = this.d.time(this.context.dayEnd);
      }
      return this
    }
    // 'after 2019'
    after() {
      this.d = this.d.add(1, this.unit);
      this.d = this.d.startOf(this.unit);
      return this
    }
    // tricky: 'next june' 'next tuesday'
    next() {
      this.d = this.d.add(1, this.unit);
      this.d = this.d.startOf(this.unit);
      return this
    }
    // tricky: 'last june' 'last tuesday'
    last() {
      this.d = this.d.minus(1, this.unit);
      this.d = this.d.startOf(this.unit);
      return this
    }
  }

  class Day extends Unit {
    constructor(input, unit, context) {
      super(input, unit, context);
      this.unit = 'day';
      if (this.d.isValid()) {
        this.d = this.d.startOf('day');
      }
    }
    middle() {
      this.d = this.d.time('10am');
      return this
    }
    beforeEnd() {
      this.d = this.d.time('2pm');
      return this
    }
  }

  // like 'feb 2'
  class CalendarDate extends Day {
    constructor(input, unit, context) {
      super(input, unit, context);
      this.unit = 'day';
      if (this.d.isValid()) {
        this.d = this.d.startOf('day');
      }
    }
    next() {
      this.d = this.d.add(1, 'year');
      return this
    }
    last() {
      this.d = this.d.minus(1, 'year');
      return this
    }
  }

  class WeekDay extends Day {
    constructor(input, unit, context) {
      super(input, unit, context);
      this.unit = 'day';
      this.isWeekDay = true; //cool.
      // is the input just a weekday?
      if (typeof input === 'string') {
        this.d = spacetime__default["default"](context.today, context.timezone);
        this.d = this.d.day(input);
        // assume a wednesday in the future
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
    }
    // clone() {
    //   return new WeekDay(this.d, this.unit, this.context)
    // }
    next() {
      this.d = this.d.add(7, 'days');
      this.d = this.d.day(this.weekDay);
      return this
    }
    last() {
      this.d = this.d.minus(7, 'days');
      this.d = this.d.day(this.weekDay);
      return this
    }
    // the millescond before
    before() {
      this.d = this.d.minus(1, 'day');
      this.d = this.d.endOf('day');
      if (this.context.dayEnd) {
        this.d = this.d.time(this.context.dayEnd);
      }
      return this
    }
    applyRel(rel) {
      if (rel === 'next') {
        let tooFar = this.context.today.endOf('week').add(1, 'week');
        this.next();
        //  did we go too-far?
        if (this.d.isAfter(tooFar)) {
          this.last(); // go back
        }
        return this
      }
      // the closest-one backwards
      if (rel === 'this-past') {
        return this.last()
      }
      if (rel === 'last') {
        let start = this.context.today.startOf('week');
        this.last();
        // are we still in 'this week' though?
        if (this.d.isBefore(start) === false) {
          this.last(); // do it again
        }
        return this
      }
      return this
    }
  }

  // like 'haloween'
  class Holiday extends CalendarDate {
    constructor(input, unit, context) {
      super(input, unit, context);
      this.unit = 'day';
      if (this.d.isValid()) {
        this.d = this.d.startOf('day');
      }
    }
  }

  class Hour extends Unit {
    constructor(input, unit, context) {
      super(input, unit, context, true);
      this.unit = 'hour';
      if (this.d.isValid()) {
        this.d = this.d.startOf('hour');
      }
    }
  }
  class Minute extends Unit {
    constructor(input, unit, context) {
      super(input, unit, context, true);
      this.unit = 'minute';
      if (this.d.isValid()) {
        this.d = this.d.startOf('minute');
      }
    }
  }
  class Moment extends Unit {
    constructor(input, unit, context) {
      super(input, unit, context, true);
      this.unit = 'millisecond';
    }
  }

  // a specific month, like 'March'
  class AnyMonth extends Unit {
    constructor(input, unit, context) {
      super(input, unit, context);
      this.unit = 'month';
      // set to beginning
      if (this.d.isValid()) {
        this.d = this.d.startOf(this.unit);
      }
    }
  }

  // a specific month, like 'March'
  class Month extends Unit {
    constructor(input, unit, context) {
      super(input, unit, context);
      this.unit = 'month';
      // set to beginning
      if (this.d.isValid()) {
        this.d = this.d.startOf(this.unit);
      }
    }
    next() {
      this.d = this.d.add(1, 'year');
      this.d = this.d.startOf('month');
      return this
    }
    last() {
      this.d = this.d.minus(1, 'year');
      this.d = this.d.startOf('month');
      return this
    }
  }

  class AnyQuarter extends Unit {
    constructor(input, unit, context) {
      super(input, unit, context);
      this.unit = 'quarter';
      // set to beginning
      if (this.d.isValid()) {
        this.d = this.d.startOf(this.unit);
      }
    }
    last() {
      this.d = this.d.minus(1, 'quarter');
      this.d = this.d.startOf(this.unit);
      return this
    }
  }

  class Quarter extends Unit {
    constructor(input, unit, context) {
      super(input, unit, context);
      this.unit = 'quarter';
      // set to beginning
      if (this.d.isValid()) {
        this.d = this.d.startOf(this.unit);
      }
    }
    next() {
      this.d = this.d.add(1, 'year');
      this.d = this.d.startOf(this.unit);
      return this
    }
    last() {
      this.d = this.d.minus(1, 'year');
      this.d = this.d.startOf(this.unit);
      return this
    }
  }
  class Season extends Unit {
    constructor(input, unit, context) {
      super(input, unit, context);
      this.unit = 'season';
      // set to beginning
      if (this.d.isValid()) {
        this.d = this.d.startOf(this.unit);
      }
    }
    next() {
      this.d = this.d.add(1, 'year');
      this.d = this.d.startOf(this.unit);
      return this
    }
    last() {
      this.d = this.d.minus(1, 'year');
      this.d = this.d.startOf(this.unit);
      return this
    }
  }
  class Year extends Unit {
    constructor(input, unit, context) {
      super(input, unit, context);
      this.unit = 'year';
      if (this.d.isValid()) {
        this.d = this.d.startOf('year');
      }
    }
  }

  class Week extends Unit {
    constructor(input, unit, context) {
      super(input, unit, context);
      this.unit = 'week';
      if (this.d.isValid()) {
        this.d = this.d.startOf('week');
      }
    }
    clone() {
      return new Week(this.d, this.unit, this.context)
    }
    middle() {
      this.d = this.d.add(2, 'days'); //wednesday
      return this
    }
    // move it to 3/4s through
    beforeEnd() {
      this.d = this.d.day('friday');
      return this
    }
  }

  //may need some work
  class WeekEnd extends Unit {
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
      return this
    }
    // end() {
    //   this.d = this.d.day('sunday').endOf('day')
    //   return this
    // }
    next() {
      this.d = this.d.add(1, this.unit);
      this.d = this.d.startOf('weekend');
      return this
    }
    last() {
      this.d = this.d.minus(1, this.unit);
      this.d = this.d.startOf('weekend');
      return this
    }
  }

  const knownWord = {
    today: (context) => {
      return new Day(context.today, null, context)
    },
    yesterday: (context) => {
      return new Day(context.today.minus(1, 'day'), null, context)
    },
    tomorrow: (context) => {
      return new Day(context.today.plus(1, 'day'), null, context)
    },
    eom: (context) => {
      let d = context.today.endOf('month');
      d = d.startOf('day');
      return new Day(d, null, context)
    },
    // eod: (context) => {
    //   let d = context.today.endOf('day')
    //   d = d.startOf('hour').minus(4, 'hours') //rough
    //   return new Hour(d, null, context)
    // },
    eoy: (context) => {
      let d = context.today.endOf('year');
      d = d.startOf('day');
      return new Day(d, null, context)
    },
    now: (context) => {
      return new Moment(context.today, null, context) // should we set the current hour?
    },
  };
  knownWord.tommorrow = knownWord.tomorrow;
  knownWord.tmrw = knownWord.tomorrow;
  knownWord.anytime = knownWord.today;
  knownWord.sometime = knownWord.today;

  const today = function (doc, context, parts) {
    let unit = null;
    // is it empty?
    if (doc.found === false) {
      // do we have just a time?
      if (parts.time !== null) {
        unit = new Moment(context.today, null, context); // choose today
      }
      //do we just have a shift?
      if (parts.shift && Object.keys(parts.shift).length > 0) {
        if (parts.shift.hour || parts.shift.minute) {
          unit = new Moment(context.today, null, context); // choose now
        } else {
          unit = new Day(context.today, null, context); // choose today
        }
      }
    }
    // today, yesterday, tomorrow
    let str = doc.text('reduced');
    if (knownWord.hasOwnProperty(str) === true) {
      return knownWord[str](context)
    }
    // day after next
    if (str === 'next' && parts.shift && Object.keys(parts.shift).length > 0) {
      return knownWord.tomorrow(context)
    }
    return unit
  };

  const parseHoliday = function (doc, context) {
    let unit = null;
    let m = doc.match('[<holiday>#Holiday+] [<year>#Year?]');
    let year = context.today.year();
    if (m.groups('year').found) {
      year = Number(m.groups('year').text('reduced')) || year;
    }
    let str = m.groups('holiday').text('reduced');
    let s = spacetimeHoliday__default["default"](str, year, context.timezone);
    if (s !== null) {
      // assume the year in the future..
      if (s.isBefore(context.today) && year === context.today.year()) {
        s = spacetimeHoliday__default["default"](str, year + 1, context.timezone);
      }
      unit = new Holiday(s, null, context);
    }
    return unit
  };

  const mapping$1 = {
    day: Day,
    hour: Hour,
    evening: Hour,
    second: Moment,
    milliscond: Moment,
    instant: Moment,
    minute: Minute,
    week: Week,
    weekend: WeekEnd,
    month: AnyMonth,
    quarter: AnyQuarter,
    year: Year,
    season: Season,
    // set aliases
    yr: Year,
    qtr: AnyQuarter,
    wk: Week,
    sec: Moment,
    hr: Hour,
  };

  let matchStr = `^(${Object.keys(mapping$1).join('|')})$`;

  // when a unit of time is spoken of as 'this month' - instead of 'february'
  const nextLast = function (doc, context) {
    //this month, last quarter, next year
    let m = doc.match(matchStr);
    if (m.found === true) {
      let str = m.text('reduced');
      if (mapping$1.hasOwnProperty(str)) {
        let Model = mapping$1[str];
        if (!Model) {
          return null
        }
        let unit = new Model(null, str, context);
        return unit
      }
    }
    //'next friday, last thursday'
    m = doc.match('^#WeekDay$');
    if (m.found === true) {
      let str = m.text('reduced');
      let unit = new WeekDay(str, null, context);
      return unit
    }

    // tuesday next week
    // m = doc.match('^#WeekDay (this|next)')
    // if (m.found === true) {
    //   let str = m.text('reduced')
    //   let unit = new WeekDay(str, null, context)
    //   return unit
    // }
    return null
  };

  const fmtToday = function (context) {
    return {
      date: context.today.date(),
      month: context.today.month(),
      year: context.today.year(),
    }
  };

  const parseYearly = function (doc, context) {
    // support 'summer 2002'
    let m = doc.match('(spring|summer|winter|fall|autumn) [<year>#Year?]');
    if (m.found) {
      let str = doc.text('reduced');
      let s = spacetime__default["default"](str, context.timezone, { today: fmtToday(context) });
      let unit = new Season(s, null, context);
      if (unit.d.isValid() === true) {
        return unit
      }
    }

    // support 'q4 2020'
    m = doc.match('[<q>#FinancialQuarter] [<year>#Year?]');
    if (m.found) {
      let str = m.groups('q').text('reduced');
      let s = spacetime__default["default"](str, context.timezone, { today: fmtToday(context) });
      if (m.groups('year')) {
        let year = Number(m.groups('year').text()) || context.today.year();
        s = s.year(year);
      }
      let unit = new Quarter(s, null, context);
      if (unit.d.isValid() === true) {
        return unit
      }
    }
    // support '4th quarter 2020'
    m = doc.match('[<q>#Value] quarter (of|in)? [<year>#Year?]');
    if (m.found) {
      let q = m.groups('q').text('reduced');
      let s = spacetime__default["default"](`q${q}`, context.timezone, { today: fmtToday(context) });
      if (m.groups('year')) {
        let year = Number(m.groups('year').text()) || context.today.year();
        s = s.year(year);
      }
      let unit = new Quarter(s, null, context);
      if (unit.d.isValid() === true) {
        return unit
      }
    }
    // support '2020'
    m = doc.match('^#Year$');
    if (m.found) {
      let str = doc.text('reduced');
      let s = spacetime__default["default"](null, context.timezone, { today: fmtToday(context) });
      s = s.year(str);
      let unit = new Year(s, null, context);
      if (unit.d.isValid() === true) {
        return unit
      }
    }

    return null
  };

  // parse things like 'june 5th 2019'
  // most of this is done in spacetime
  const parseExplicit = function (doc, context) {
    let impliedYear = context.today.year();
    // 'fifth of june 1992'
    // 'june the fifth 1992'
    let m = doc.match('[<date>#Value] of? [<month>#Month] [<year>#Year]');
    if (!m.found) {
      m = doc.match('[<month>#Month] the? [<date>#Value] [<year>#Year]');
    }
    if (m.found) {
      let obj = {
        month: m.groups('month').text('reduced'),
        date: m.groups('date').text('reduced'),
        year: m.groups('year').text() || impliedYear,
      };
      let unit = new CalendarDate(obj, null, context);
      if (unit.d.isValid() === true) {
        return unit
      }
    }

    // 'march 1992'
    m = doc.match('[<month>#Month] of? [<year>#Year]');
    if (m.found) {
      let obj = {
        month: m.groups('month').text('reduced'),
        year: m.groups('year').text('reduced') || impliedYear,
      };
      let unit = new Month(obj, null, context);
      if (unit.d.isValid() === true) {
        return unit
      }
    }

    //no-years
    // 'fifth of june'
    m = doc.match('[<date>#Value] of? [<month>#Month]');
    // 'june the fifth'
    if (!m.found) {
      m = doc.match('[<month>#Month] the? [<date>#Value]');
    }
    if (m.found) {
      let obj = {
        month: m.groups('month').text('reduced'),
        date: m.groups('date').text('reduced'),
        year: context.today.year(),
      };
      let unit = new CalendarDate(obj, null, context);
      // assume 'feb' in the future
      if (unit.d.month() < context.today.month()) {
        obj.year += 1;
        unit = new CalendarDate(obj, null, context);
      }
      if (unit.d.isValid() === true) {
        return unit
      }
    }
    // support 'december'
    if (doc.has('#Month')) {
      let obj = {
        month: doc.match('#Month').text('reduced'),
        date: 1, //assume 1st
        year: context.today.year(),
      };
      let unit = new Month(obj, null, context);
      // assume 'feb' in the future
      if (unit.d.month() < context.today.month()) {
        obj.year += 1;
        unit = new Month(obj, null, context);
      }
      if (unit.d.isValid() === true) {
        return unit
      }
    }

    // support 'thursday 21st'
    m = doc.match('#WeekDay [<date>#Value]');
    if (m.found) {
      let obj = {
        month: context.today.month(),
        date: m.groups('date').text('reduced'),
        year: context.today.year(),
      };
      let unit = new CalendarDate(obj, null, context);
      if (unit.d.isValid() === true) {
        return unit
      }
    }
    // support date-only 'the 21st'
    m = doc.match('the [<date>#Value]');
    if (m.found) {
      let obj = {
        month: context.today.month(),
        date: m.groups('date').text('reduced'),
        year: context.today.year(),
      };
      let unit = new CalendarDate(obj, null, context);
      if (unit.d.isValid() === true) {
        // assume it's forward
        if (unit.d.isBefore(context.today)) {
          unit.d = unit.d.add(1, 'month');
        }
        return unit
      }
    }
    // parse ISO as a Moment
    m = doc.match('/[0-9]{4}-[0-9]{2}-[0-9]{2}t[0-9]{2}:/');
    if (m.found) {
      let str = doc.text('reduced');
      let unit = new Moment(str, null, context);
      if (unit.d.isValid() === true) {
        return unit
      }
    }

    let str = doc.text('reduced');
    if (!str) {
      return new Moment(context.today, null, context)
    }
    // punt it to spacetime, for the heavy-lifting
    let unit = new Day(str, null, context);
    // console.log(str, unit, context.today.year())
    // did we find a date?
    if (unit.d.isValid() === false) {
      return null
    }
    return unit
  };

  const parse$3 = function (doc, context, parts) {
    let unit = null;
    //'in two days'
    unit = unit || today(doc, context, parts);
    // 'this haloween'
    unit = unit || parseHoliday(doc, context);
    // 'this month'
    unit = unit || nextLast(doc, context);
    // 'q2 2002'
    unit = unit || parseYearly(doc, context);
    // 'this june 2nd'
    unit = unit || parseExplicit(doc, context);

    return unit
  };

  const units = {
    day: Day,
    week: Week,
    weekend: WeekEnd,
    month: Month,
    quarter: Quarter,
    season: Season,
    hour: Hour,
    minute: Minute,
  };

  const applyCounter = function (unit, counter = {}) {
    let Unit = units[counter.unit];
    if (!Unit) {
      return unit
    }
    let d = unit.d;
    // support 'first' or 0th
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
      }
      // support 'nth week', eg.
      d = d.add(counter.num, counter.unit);
    }
    let u = new Unit(d, null, unit.context);
    if (u.d.isValid() === true) {
      return u
    }
    return unit //fallback
  };

  // apply all parsed {parts} to our unit date
  const transform = function (unit, context, parts) {

    if (!unit && parts.weekDay) {
      unit = new WeekDay(parts.weekDay, null, context);
      parts.weekDay = null;
    }

    // just don't bother
    if (!unit) {
      return null
    }
    // 2 days after..
    if (parts.shift) {
      let shift = parts.shift;
      unit.applyShift(shift);
      // allow shift to change our unit size
      if (shift.hour || shift.minute) {
        unit = new Moment(unit.d, null, unit.context);
      } else if (shift.week || shift.day || shift.month) {
        unit = new Day(unit.d, null, unit.context);
      }
    }
    // wednesday next week
    if (parts.weekDay && unit.unit !== 'day') {
      unit.applyWeekDay(parts.weekDay);
      unit = new WeekDay(unit.d, null, unit.context);
    }
    // this/next/last
    if (parts.rel) {
      unit.applyRel(parts.rel);
    }
    // end of
    if (parts.section) {
      unit.applySection(parts.section);
    }
    // at 5:40pm
    if (parts.time) {
      unit.applyTime(parts.time);
      // unit = new Minute(unit.d, null, unit.context)
    }
    // apply counter
    if (parts.counter && parts.counter.unit) {
      unit = applyCounter(unit, parts.counter);
    }
    return unit
  };

  // import spacetime from 'spacetime'

  const env$1 = typeof process === 'undefined' ? self.env || {} : process.env;
  const log$1 = parts => {
    if (env$1.DEBUG_DATE) {
      console.log(`\n==== '${parts.doc.text()}' =====`); // eslint-disable-line
      Object.keys(parts).forEach(k => {
        if (k !== 'doc' && parts[k]) {
          console.log(k, parts[k]);// eslint-disable-line
        }
      });
      parts.doc.debug();// allow
    }
  };

  const parseDate = function (doc, context) {
    //parse-out any sections
    let parts = tokenize(doc, context);
    doc = parts.doc;
    // logger
    log$1(parts);

    //apply our given timezone
    if (parts.tz) {
      context = Object.assign({}, context, { timezone: parts.tz });
      // set timezone on any 'today' value, too
      let iso = context.today.format('iso-short');
      context.today = context.today.goto(context.timezone).set(iso);
    }
    // decide on a root date object
    let unit = parse$3(doc, context, parts);
    // apply all our parts
    unit = transform(unit, context, parts);
    return unit
  };

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
    sunday: 'sunday',
  };
  // 'any tuesday' vs 'every tuesday'
  const parseLogic = function (m) {
    if (m.match('(every|each)').found) {
      return 'AND'
    }
    if (m.match('(any|a)').found) {
      return 'OR'
    }
    return null
  };

  // parse repeating dates, like 'every week'
  const parseIntervals = function (doc, context) {
    // 'every week'
    let m = doc.match('[<logic>(every|any|each)] [<skip>other?] [<unit>#Duration] (starting|beginning|commencing)?');
    if (m.found) {
      let repeat = { interval: {} };
      let unit = m.groups('unit').text('reduced');
      repeat.interval[unit] = 1;
      repeat.choose = parseLogic(m);
      // 'every other week'
      if (m.groups('skip').found) {
        repeat.interval[unit] = 2;
      }
      doc = doc.remove(m);
      return { repeat: repeat }
    }

    // 'every two weeks'
    m = doc.match('[<logic>(every|any|each)] [<num>#Value] [<unit>#Duration] (starting|beginning|commencing)?');
    if (m.found) {
      let repeat = { interval: {} };
      let units = m.groups('unit');
      units.nouns().toSingular();
      let unit = units.text('reduced');
      repeat.interval[unit] = m.groups('num').numbers().get()[0];
      repeat.choose = parseLogic(m);
      doc = doc.remove(m);
      return { repeat: repeat }
    }

    // 'every friday'
    m = doc.match('[<logic>(every|any|each|a)] [<skip>other?] [<day>#WeekDay+] (starting|beginning|commencing)?');
    if (m.found) {
      let repeat = { interval: { day: 1 }, filter: { weekDays: {} } };
      let str = m.groups('day').text('reduced');
      str = dayNames[str]; //normalize it
      if (str) {
        repeat.filter.weekDays[str] = true;
        repeat.choose = parseLogic(m);
        doc = doc.remove(m);
        return { repeat: repeat }
      }
    }

    // 'every weekday'
    m = doc.match(
      '[<logic>(every|any|each|a)] [<day>(weekday|week day|weekend|weekend day)] (starting|beginning|commencing)?'
    );
    if (m.found) {
      let repeat = { interval: { day: 1 }, filter: { weekDays: {} } };
      let day = m.groups('day');
      if (day.has('(weekday|week day)')) {
        repeat.filter.weekDays = {
          monday: true,
          tuesday: true,
          wednesday: true,
          thursday: true,
          friday: true,
        };
      } else if (day.has('(weekend|weekend day)')) {
        repeat.filter.weekDays = {
          saturday: true,
          sunday: true,
        };
      }
      repeat.choose = parseLogic(m);
      doc = doc.remove(m);
      return { repeat: repeat }
    }

    // mondays
    m = doc.match(
      '[<day>(mondays|tuesdays|wednesdays|thursdays|fridays|saturdays|sundays)] (at|near|after)? [<time>#Time+?]'
    );
    if (m.found) {
      let repeat = { interval: { day: 1 }, filter: { weekDays: {} } };
      let str = m.groups('day').text('reduced');
      str = str.replace(/s$/, '');
      str = dayNames[str]; //normalize it
      if (str) {
        repeat.filter.weekDays[str] = true;
        repeat.choose = 'OR';
        doc = doc.remove(m);
        let time = m.groups('time');
        if (time.found) {
          repeat.time = parseTime(time, context);
        }
        return { repeat: repeat }
      }
    }
    return null
  };

  // somewhat-intellegent response to end-before-start situations
  const reverseMaybe = function (obj) {
    let start = obj.start;
    let end = obj.end;
    if (start.d.isAfter(end.d)) {
      // wednesday to sunday -> move end up a week
      if (start.isWeekDay && end.isWeekDay) {
        obj.end.next();
        return obj
      }
      // else, reverse them
      let tmp = start;
      obj.start = end;
      obj.end = tmp;
    }
    return obj
  };

  const moveToPM = function (obj) {
    let start = obj.start;
    let end = obj.end;
    if (start.d.isAfter(end.d)) {
      if (end.d.hour() < 10) {
        end.d = end.d.ampm('pm');
      }
    }
    return obj
  };

  var doTwoTimes = [
    {
      // '3pm to 4pm january 5th'
      match: '[<from>#Time+] (to|until|upto|through|thru|and) [<to>#Time+ #Date+]',
      desc: '3pm to 4pm january 5th',
      parse: (m, context) => {
        let from = m.groups('from');
        let to = m.groups('to');
        let end = parseDate(to, context);
        if (end) {
          let start = end.clone();
          start.applyTime(from.text('implicit'));
          if (start) {
            let obj = {
              start: start,
              end: end,
              unit: 'time',
            };
            if (/(am|pm)/.test(to) === false) {
              obj = moveToPM(obj);
            }
            obj = reverseMaybe(obj);
            return obj
          }
        }
        return null
      },
    },

    {
      // 'january from 3pm to 4pm'
      match: '[<main>#Date+] from [<a>#Time] (to|until|upto|through|thru|and) [<b>#Time+]',
      desc: 'january from 3pm to 4pm',
      parse: (m, context) => {
        let main = m.groups('main');
        let a = m.groups('a');
        let b = m.groups('b');
        main = parseDate(main, context);
        if (main) {
          main.applyTime(a.text('implicit'));
          let end = main.clone();
          end.applyTime(b.text('implicit'));
          if (end) {
            let obj = {
              start: main,
              end: end,
              unit: 'time',
            };
            if (/(am|pm)/.test(b.text()) === false) {
              obj = moveToPM(obj);
            }
            obj = reverseMaybe(obj);
            return obj
          }
        }
        return null
      },
    },
    {
      // 'january 5th 3pm to 4pm'
      match: '[<from>#Date+] (to|until|upto|through|thru|and) [<to>#Time+]',
      desc: 'january from 3pm to 4pm',
      parse: (m, context) => {
        let from = m.groups('from');
        let to = m.groups('to');
        from = parseDate(from, context);
        if (from) {
          let end = from.clone();
          end.applyTime(to.text('implicit'));
          if (end) {
            let obj = {
              start: from,
              end: end,
              unit: 'time',
            };
            if (/(am|pm)/.test(to.text()) === false) {
              obj = moveToPM(obj);
            }
            obj = reverseMaybe(obj);
            return obj
          }
        }
        return null
      },
    },
  ];

  // these are dates that produce two seperate dates,
  // and not a start-end range.
  var doCombos = [
    {
      // 'jan, or march 1999'
      match: '^during? #Month+ (or|and) #Month [<year>#Year]?',
      desc: 'march or june',
      parse: (m, context) => {
        let before = m.match('^during? [#Month]', 0);
        m = m.not('(or|and)');
        let start = parseDate(before, context);
        if (start) {
          let result = [
            {
              start: start,
              end: start.clone().end(),
              unit: start.unit,
            },
          ];
          // add more run-on numbers?
          let more = m.not(before);
          if (more.found) {
            more.match('#Month').forEach((month) => {
              let s = parseDate(month, context);
              // s.d = s.d.month(month.text('reduced'))
              result.push({
                start: s,
                end: s.clone().end(),
                unit: s.unit,
              });
            });
          }
          // apply the year
          let year = m.match('#Year$');
          if (year.found) {
            year = year.text('reduced');
            result.forEach((o) => {
              o.start.d = o.start.d.year(year);
              o.end.d = o.end.d.year(year);
            });
          }
          return result
        }
        return null
      },
    },
    {
      // 'jan 5 or 8'  - (one month, shared dates)
      match: '^#Month #Value+ (or|and)? #Value$',
      desc: 'jan 5 or 8',
      parse: (m, context) => {
        m = m.not('(or|and)');
        let before = m.match('^#Month #Value');
        let start = parseDate(before, context);
        if (start) {
          let result = [
            {
              start: start,
              end: start.clone().end(),
              unit: start.unit,
            },
          ];
          // add more run-on numbers?
          let more = m.not(before);
          if (more.found) {
            more.match('#Value').forEach((v) => {
              let s = start.clone();
              s.d = s.d.date(v.text('reduced'));
              result.push({
                start: s,
                end: s.clone().end(),
                unit: s.unit,
              });
            });
          }
          return result
        }
        return null
      },
    },
    {
      // 'jan 5, 8'  - (similar to above)
      match: '^#Month+ #Value #Value+$',
      desc: 'jan 5 8',
      parse: (m, context) => {
        let month = m.match('#Month');
        let year = m.match('#Year');
        m = m.not('#Year');
        let results = [];
        m.match('#Value').forEach((val) => {
          val = val.clone();
          let d = val.prepend(month.text());
          if (year.found) {
            d.append(year);
          }
          let start = parseDate(d, context);
          if (start) {
            results.push({
              start: start,
              end: start.clone().end(),
              unit: start.unit,
            });
          }
        });
        return results
      },
    },
    {
      // '5 or 8 of jan'  - (one month, shared dates)
      match: '^#Value+ (or|and)? #Value of #Month #Year?$',
      desc: '5 or 8 of Jan',
      parse: (m, context) => {
        let month = m.match('#Month');
        let year = m.match('#Year');
        m = m.not('#Year');
        let results = [];
        m.match('#Value').forEach((val) => {
          let d = val.append(month);
          if (year.found) {
            d.append(year);
          }
          let start = parseDate(d, context);
          if (start) {
            results.push({
              start: start,
              end: start.clone().end(),
              unit: start.unit,
            });
          }
        });
        return results
      },
    },

    {
      // 'june or july 2019'
      match: '^!(between|from|during)? [<from>#Date+] (and|or) [<to>#Date+]$',
      desc: 'A or B',
      parse: (m, context) => {
        let fromDoc = m.groups('from');
        let toDoc = m.groups('to');
        let from = parseDate(fromDoc, context);
        let to = parseDate(toDoc, context);
        if (from && to) {
          return [
            {
              start: from,
              end: from.clone().end(),
            },
            {
              start: to,
              end: to.clone().end(),
            },
          ]
        }
        return null
      },
    },
  ];

  var doDateRange = [
    {
      // two explicit dates - 'between friday and sunday'
      match: 'between [<start>.+] and [<end>.+]',
      desc: 'between friday and sunday',
      parse: (m, context) => {
        let start = m.groups('start');
        start = parseDate(start, context);
        let end = m.groups('end');
        end = parseDate(end, context);
        if (start && end) {
          end = end.before();
          return {
            start: start,
            end: end,
          }
        }
        return null
      },
    },

    {
      // two months, no year - 'june 5 to june 7'
      match: '[<from>#Month #Value] (to|through|thru) [<to>#Month #Value] [<year>#Year?]',
      desc: 'june 5 to june 7',
      parse: (m, context) => {
        let res = m.groups();
        let start = res.from;
        if (res.year) {
          start = start.append(res.year);
        }
        start = parseDate(start, context);
        if (start) {
          let end = res.to;
          if (res.year) {
            end = end.append(res.year);
          }
          end = parseDate(end, context);
          if (end) {
            // assume end is after start
            if (start.d.isAfter(end.d)) {
              end.d = end.d.add(1, 'year');
            }
            let obj = {
              start: start,
              end: end.end(),
            };
            return obj
          }
        }
        return null
      },
    },
    {
      // one month, one year, first form - 'january 5 to 7 1998'
      match: '[<month>#Month] [<from>#Value] (to|through|thru) [<to>#Value] of? [<year>#Year]',
      desc: 'january 5 to 7 1998',
      parse: (m, context) => {
        let { month, from, to, year } = m.groups();
        let year2 = year.clone();
        let start = from.prepend(month).append(year);
        start = parseDate(start, context);
        if (start) {
          let end = to.prepend(month).append(year2);
          end = parseDate(end, context);
          return {
            start: start,
            end: end.end(),
          }
        }
        return null
      },
    },
    {
      // one month, one year, second form - '5 to 7 of january 1998'
      match: '[<from>#Value] (to|through|thru) [<to>#Value of? #Month #Date+?]',
      desc: '5 to 7 of january 1998',
      parse: (m, context) => {
        let to = m.groups('to');
        to = parseDate(to, context);
        if (to) {
          let fromDate = m.groups('from');
          let from = to.clone();
          from.d = from.d.date(fromDate.text('implicit'));
          return {
            start: from,
            end: to.end(),
          }
        }
        return null
      },
    },

    {
      // one month, no year - 'january 5 to 7'
      match: '[<from>#Month #Value] (to|through|thru) [<to>#Value]',
      desc: 'january 5 to 7',
      parse: (m, context) => {
        let from = m.groups('from');
        from = parseDate(from, context);
        if (from) {
          let toDate = m.groups('to');
          let to = from.clone();
          to.d = to.d.date(toDate.text('implicit'));
          return {
            start: from,
            end: to.end(),
          }
        }
        return null
      },
    },

    {
      // 'january to may 2020'
      match: 'from? [<from>#Month] (to|until|upto|through|thru) [<to>#Month] [<year>#Year]',
      desc: 'january to may 2020',
      parse: (m, context) => {
        let from = m.groups('from');
        let year = m.groups('year').numbers().get()[0];
        let to = m.groups('to');
        from = parseDate(from, context);
        to = parseDate(to, context);
        from.d = from.d.year(year);
        to.d = to.d.year(year);
        if (from && to) {
          let obj = {
            start: from,
            end: to.end(),
          };
          // reverse the order?
          obj = reverseMaybe(obj);
          return obj
        }
        return null
      },
    },
  ];

  const punt = function (unit, context) {
    unit = unit.applyShift(context.punt);
    return unit
  };

  var doOneDate = [
    {
      // 'from A to B'
      match: 'from? [<from>.+] (to|until|upto|through|thru) [<to>.+]',
      desc: 'from A to B',
      parse: (m, context) => {
        let from = m.groups('from');
        let to = m.groups('to');
        from = parseDate(from, context);
        to = parseDate(to, context);
        if (from && to) {
          let obj = {
            start: from,
            end: to.end(),
          };
          obj = reverseMaybe(obj);
          return obj
        }
        return null
      },
    },

    {
      // 'before june'
      match: '^due? (by|before) [.+]',
      desc: 'before june',
      parse: (m, context) => {
        m = m.group(0);
        let unit = parseDate(m, context);
        if (unit) {
          let start = new Unit(context.today, null, context);
          if (start.d.isAfter(unit.d)) {
            start = unit.clone().applyShift({ weeks: -2 });
          }
          // end the night before
          let end = unit.clone().applyShift({ day: -1 });
          return {
            start: start,
            end: end.end(),
          }
        }
        return null
      },
    },

    {
      // 'in june'
      match: '^(on|in|at|@|during) [.+]',
      desc: 'in june',
      parse: (m, context) => {
        m = m.group(0);
        let unit = parseDate(m, context);
        if (unit) {
          return { start: unit, end: unit.clone().end(), unit: unit.unit }
        }
        return null
      },
    },
    {
      // 'after june'
      match: '^(after|following) [.+]',
      desc: 'after june',
      parse: (m, context) => {
        m = m.group(0);
        let unit = parseDate(m, context);
        if (unit) {
          unit = unit.after();
          return {
            start: unit.clone(),
            end: punt(unit.clone(), context),
          }
        }
        return null
      },
    },
    {
      // 'middle of'
      match: '^(middle|center|midpoint) of [.+]',
      desc: 'middle of',
      parse: (m, context) => {
        m = m.group(0);
        let unit = parseDate(m, context);
        let start = unit.clone().middle();
        let end = unit.beforeEnd();
        if (unit) {
          return {
            start: start,
            end: end,
          }
        }
        return null
      },
    },
    {
      // 'tuesday after 5pm'
      match: '.+ after #Time+$',
      desc: 'tuesday after 5pm',
      parse: (m, context) => {
        let unit = parseDate(m, context);
        if (unit) {
          let start = unit.clone();
          let end = unit.end();
          return {
            start: start,
            end: end,
            unit: 'time',
          }
        }
        return null
      },
    },
    {
      // 'tuesday before noon'
      match: '.+ before #Time+$',
      desc: 'tuesday before noon',
      parse: (m, context) => {
        let unit = parseDate(m, context);
        if (unit) {
          let end = unit.clone();
          let start = unit.start();
          if (unit) {
            return {
              start: start,
              end: end,
              unit: 'time',
            }
          }
        }
        return null
      },
    },
  ];

  const ranges = [].concat(doTwoTimes, doCombos, doDateRange, doOneDate);

  const env = typeof process === 'undefined' ? self.env || {} : process.env;
  const log = msg => {
    if (env.DEBUG_DATE) {
      console.log(`\n  \x1b[32m ${msg} \x1b[0m`); // eslint-disable-line
    }
  };

  const isArray = function (arr) {
    return Object.prototype.toString.call(arr) === '[object Array]'
  };

  //else, try whole thing, non ranges
  const tryFull = function (doc, context) {
    let res = {
      start: null,
      end: null,
    };
    if (!doc.found) {
      return res
    }
    let unit = parseDate(doc, context);
    if (unit) {
      let end = unit.clone().end();
      res = {
        start: unit,
        end: end,
        unit: unit.setTime ? 'time' : unit.unit,
      };
    }
    return res
  };

  const tryRanges = function (doc, context) {

    // try each template in order
    for (let i = 0; i < ranges.length; i += 1) {
      let fmt = ranges[i];
      let m = doc.match(fmt.match);
      if (m.found) {
        log(`  ---[${fmt.desc}]---`);
        let res = fmt.parse(m, context);
        if (res !== null) {
          // did it return more than one date?
          if (!isArray(res)) {
            res = [res];
          }
          return res
        }
      }
    }
    return null
  };

  // loop thru each range template
  const parseRanges = function (m, context) {
    // parse-out 'every week ..'
    let repeats = parseIntervals(m, context) || {};
    // try picking-apart ranges
    let found = tryRanges(m, context);
    if (!found) {
      found = [tryFull(m, context)];
    }
    // add the repeat info to each date
    found = found.map((o) => Object.assign({}, repeats, o));
    // ensure start is not after end
    found.forEach((res) => {
      if (res.start && res.end && res.start.d.epoch > res.end.d.epoch) {
        res.start = res.start.start();
      }
    });
    return found
  };

  const normalize = function (doc) {

    if (!doc.numbers) {
      console.warn(`\nCompromise warning: compromise/three must be used with compromise-dates plugin\n`); // eslint-disable-line
    }

    // normalize doc
    doc = doc.clone();
    doc.numbers().toNumber();

    // expand 'aug 20-21'
    doc.contractions().expand();

    // 'week-end'
    doc.replace('week end', 'weekend', true).tag('Date');
    // 'a up to b'
    doc.replace('up to', 'upto', true).tag('Date');
    // 'a year ago'
    if (doc.has('once (a|an) #Duration') === false) {
      doc.match('[(a|an)] #Duration', 0).replaceWith('1', { tags: true }).compute('lexicon');
    }
    // jan - feb
    doc.match('@hasDash').insertAfter('to').tag('Date');
    return doc
  };

  const parse$2 = function (doc, context) {
    // normalize context
    context = context || {};
    if (context.timezone === false) {
      context.timezone = 'UTC';
    }
    context.today = context.today || spacetime__default["default"].now(context.timezone);
    context.today = spacetime__default["default"](context.today, context.timezone);

    doc = normalize(doc);

    let res = parseRanges(doc, context);
    return res
  };

  const getDuration = function (range) {
    let end = range.end.d.add(1, 'millisecond');
    let diff = end.since(range.start.d).diff;
    delete diff.milliseconds;
    delete diff.seconds;
    return diff
  };

  // const getRange = function (diff) {
  //   if (diff.years) {
  //     return 'decade'
  //   }
  //   // console.log(diff)
  //   return null
  // }

  const toJSON = function (range) {
    if (!range.start) {
      return {
        start: null,
        end: null,
        timezone: null,
        duration: {},
        // range: null
      }
    }
    let diff = range.end ? getDuration(range) : {};
    return {
      start: range.start.format('iso'),
      end: range.end ? range.end.format('iso') : null,
      timezone: range.start.d.format('timezone'),
      duration: diff,
      // range: getRange(diff)
    }
  };

  const api$2 = function (View) {

    class Dates extends View {
      constructor(document, pointer, groups, opts = {}) {
        super(document, pointer, groups);
        this.viewType = 'Nouns';
        this.opts = opts;
      }

      get(n) {
        let all = [];
        this.forEach((m) => {
          parse$2(m, this.opts).forEach(res => {
            all.push(toJSON(res));
          });
        });
        if (typeof n === 'number') {
          return all[n]
        }
        return all
      }

      json(opts = {}) {
        return this.map(m => {
          let json = m.toView().json(opts)[0] || {};
          if (opts && opts.dates !== true) {
            let parsed = parse$2(m, this.opts);
            json.dates = toJSON(parsed[0]);
          }
          return json
        }, [])
      }

      format(fmt) {
        let found = this;
        let res = found.map(m => {
          let obj = parse$2(m, this.opts)[0] || {};
          if (obj.start) {
            let start = obj.start.d;
            let str = start.format(fmt);
            if (obj.end) {
              let end = obj.end.d;
              if (start.isSame(end, 'day') === false) {
                str += ' to ' + end.format(fmt);
              }
            }
            m.replaceWith(str);
          }
          return m
        });
        return new Dates(this.document, res.pointer, null, this.opts)
      }
    }

    View.prototype.dates = function (opts) {
      let m = findDate(this);
      return new Dates(this.document, m.pointer, null, opts)
    };
  };

  // import normalize from './normalize.js'


  const find = function (doc) {
    return doc.match('#Time+ (am|pm)?')
  };

  const parse$1 = function (m, context = {}) {
    let res = parseTime(m, context);
    if (!res.result) {
      return { time: null, '24h': null }
    }
    let s = spacetime__default["default"].now().time(res.result);
    return {
      'time': res.result,
      '24h': s.format('time-24'),
      hour: s.hour(),
      minute: s.minute()
    }
  };

  const getNth = (doc, n) => (typeof n === 'number' ? doc.eq(n) : doc);

  const api$1 = function (View) {

    class Times extends View {
      constructor(document, pointer, groups) {
        super(document, pointer, groups);
        this.viewType = 'Nouns';
      }

      get(n) {
        return getNth(this, n).map(parse$1)
      }

      json(opts = {}) {
        return this.map(m => {
          let json = m.toView().json(opts)[0] || {};
          if (opts && opts.times !== true) {
            json.time = parse$1(m);
          }
          return json
        }, [])
      }
    }

    View.prototype.times = function (n) {
      let m = find(this);
      m = getNth(m, n);
      return new Times(this.document, m.pointer)
    };
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
    season: true,
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
    qtr: 'quarter',
  };
  // add plurals
  Object.keys(mapping).forEach((k) => {
    mapping[k + 's'] = mapping[k];
  });

  const parse = function (doc) {
    let duration = {};
    //parse '8 minutes'
    let twoWord = doc.match('#Value+ #Duration');
    if (twoWord.found) {
      twoWord.forEach((m) => {
        let num = m.numbers().get()[0];
        let unit = m.terms().last().text('reduced');
        unit = unit.replace(/ies$/, 'y');
        unit = unit.replace(/s$/, '');
        // turn 'mins' into 'minute'
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
    return duration
  };

  const addDurations = function (View) {
    /** phrases like '2 months', or '2mins' */
    class Durations extends View {
      constructor(document, pointer, groups) {
        super(document, pointer, groups);
        this.context = {};
      }
      /** overload the original json with duration information */
      json(opts = {}) {
        return this.map(m => {
          let json = m.toView().json(opts)[0] || {};
          if (opts && opts.times !== true) {
            json.duration = parse(m);
          }
          return json
        }, [])
      }
      /** easy getter for the time */
      get(options) {
        let arr = [];
        this.forEach((doc) => {
          let res = parse(doc);
          arr.push(res);
        });
        if (typeof options === 'number') {
          return arr[options]
        }
        return arr
      }
    }

    /** phrases like '2 months' */
    View.prototype.durations = function (n) {
      let m = this.match('#Value+ #Duration (and? #Value+ #Duration)?');
      // add '20mins'
      m = m.concat(this.match('(#Duration && /[0-9][a-z]+$/)'));

      // not 'in 20 minutes'
      m = m.notIf('#DateShift');

      if (typeof n === 'number') {
        m = m.eq(n);
      }
      return new Durations(this.document, m.pointer)
    };
  };

  const api = function (View) {
    api$2(View);
    api$1(View);
    addDurations(View);
  };

  //ambiguous 'may' and 'march'
  // const preps = '(in|by|before|during|on|until|after|of|within|all)' //6
  // const thisNext = '(last|next|this|previous|current|upcoming|coming)' //2
  const sections$1 = '(start|end|middle|starting|ending|midpoint|beginning)'; //2
  // const seasons = '(spring|summer|winter|fall|autumn)'

  //ensure a year is approximately typical for common years
  //please change in one thousand years
  const tagYear = (m, reason) => {
    if (m.found !== true) {
      return
    }
    m.forEach((p) => {
      let str = p.text('reduced');
      let num = parseInt(str, 10);
      if (num && num > 1000 && num < 3000) {
        p.tag('Year', reason);
      }
    });
  };
  //same, but for less-confident values
  const tagYearSafe = (m, reason) => {
    if (m.found !== true) {
      return
    }
    m.forEach((p) => {
      let str = p.text('reduced');
      let num = parseInt(str, 10);
      if (num && num > 1900 && num < 2030) {
        p.tag('Year', reason);
      }
    });
  };

  const tagDates = function (doc) {

    doc
      .match('(march|april|may) (and|to|or|through|until)? (march|april|may)')
      .tag('Date')
      .match('(march|april|may)')
      .tag('Month', 'march|april|may');
    // april should almost-always be a date
    // doc.match('[april] !#LastName?', 0).tag('Month', 'april')


    //year/cardinal tagging
    let cardinal = doc.if('#Cardinal');
    if (cardinal.found === true) {
      let v = cardinal.match(`#Date #Value [#Cardinal]`, 0);
      tagYear(v, 'date-value-year');
      //scoops up a bunch
      v = cardinal.match(`#Date [#Cardinal]`, 0);
      tagYearSafe(v, 'date-year');
      //middle of 1999
      v = cardinal.match(`${sections$1} of [#Cardinal]`);
      tagYearSafe(v, 'section-year');
      //feb 8 2018
      v = cardinal.match(`#Month #Value [#Cardinal]`, 0);
      tagYear(v, 'month-value-year');
      //feb 8 to 10th 2018
      v = cardinal.match(`#Month #Value to #Value [#Cardinal]`, 0);
      tagYear(v, 'month-range-year');
      //in 1998
      v = cardinal.match(`(in|of|by|during|before|starting|ending|for|year|since) [#Cardinal]`, 0);
      tagYear(v, 'in-year-1');
      //q2 2009
      v = cardinal.match('(q1|q2|q3|q4) [#Cardinal]', 0);
      tagYear(v, 'in-year-2');
      //2nd quarter 2009
      v = cardinal.match('#Ordinal quarter of? [#Cardinal]', 0);
      tagYear(v, 'in-year-3');
      //in the year 1998
      v = cardinal.match('the year [#Cardinal]', 0);
      tagYear(v, 'in-year-4');
      //it was 1998
      v = cardinal.match('it (is|was) [#Cardinal]', 0);
      tagYearSafe(v, 'in-year-5');
      // re-tag this part
      cardinal.match(`${sections$1} of #Year`).tag('Date');
      //between 1999 and 1998
      let m = cardinal.match('between [#Cardinal] and [#Cardinal]');
      tagYear(m.groups('0'), 'between-year-and-year-1');
      tagYear(m.groups('1'), 'between-year-and-year-2');
    }

    //'2020' bare input
    let m = doc.match('^/^20[012][0-9]$/$');
    tagYearSafe(m, '2020-ish');

    return doc
  };

  // 3-4 can be a time-range, sometimes
  const tagTimeRange = function (m, reason) {
    if (m.found) {
      m.tag('Date', reason);
      let nums = m.numbers().lessThan(31).ifNo('#Year');
      nums.tag('#Time', reason);
    }
  };

  //
  const timeTagger = function (doc) {

    let date = doc.if('#Date');
    if (date.found) {
      // ==time-ranges=
      //   --number-ranges--
      let range = date.if('#NumberRange');
      if (range.found) {
        // 3-4 on tuesday
        let m = range.match('[#NumberRange+] (on|by|at)? #WeekDay', 0);
        tagTimeRange(m, '3-4-tuesday');
        // 3-4 on march 2nd
        m = range.match('[#NumberRange+] (on|by|at)? #Month #Value', 0);
        tagTimeRange(m, '3-4 mar 3');
        // 3-4pm
        m = range.match('[#NumberRange] to (#NumberRange && #Time)', 0);
        tagTimeRange(m, '3-4pm');
        // 3pm-5
        m = range.match('(#NumberRange && #Time) to [#NumberRange]', 0);
        tagTimeRange(m, '3pm-4');
      }
      // from 4 to 5 tomorrow
      let m = date.match('(from|between) #Cardinal and #Cardinal (in|on)? (#WeekDay|tomorrow|yesterday)');
      tagTimeRange(m, 'from 9-5 tues');
      // 9 to 5 tomorrow
      m = doc.match('#Cardinal to #Cardinal (#WeekDay|tomorrow|yesterday)');
      tagTimeRange(m, '9-5 tues');
      // from 4 to 5pm
      m = date.match('(from|between) [#NumericValue] (to|and) #Time', 0).tag('Time', '4-to-5pm');
      tagTimeRange(m, 'from 9-5pm');
      // wed from 3 to 4
      m = date.match('(#WeekDay|tomorrow|yesterday) (from|between)? (#Cardinal|#Time) (and|to) (#Cardinal|#Time)');
      tagTimeRange(m, 'tues 3-5');
      // june 5 from 3 to 4
      m = date.match('#Month #Value+ (from|between) [<time>(#Cardinal|#Time) (and|to) (#Cardinal|#Time)]').group('time');
      tagTimeRange(m, 'sep 4 from 9-5');
      // 3pm to 4 on wednesday
      m = date.match('#Time to #Cardinal on? #Date');
      tagTimeRange(m, '3pm-4 wed');
      // 3 to 4pm on wednesday
      m = date.match('#Cardinal to #Time on? #Date');
      tagTimeRange(m, '3-4pm wed');
      // 3 to 4 on wednesday
      m = date.match('#Cardinal to #Cardinal on? (#WeekDay|#Month #Value)');
      tagTimeRange(m, '3-4 wed');
      // 3 to 4 pm
      // m = date.match('^#Cardinal to #Time')
      // tagTimeRange(m, '3 to 4pm')
    }
    return doc
  };

  // timezone abbreviations
  // (from spencermountain/timezone-soft)
  const zones = [
    'act',
    'aft',
    'akst',
    'anat',
    'art',
    'azot',
    'azt',
    'bnt',
    'bot',
    'bt',
    'cast',
    'cat',
    'cct',
    'chast',
    'chut',
    'ckt',
    'cvt',
    'cxt',
    'davt',
    'eat',
    'ect',
    'fjt',
    'fkst',
    'fnt',
    'gamt',
    'get',
    'gft',
    'gilt',
    'gyt',
    'hast',
    'hncu',
    'hneg',
    'hnnomx',
    'hnog',
    'hnpm',
    'hnpmx',
    'hntn',
    'hovt',
    'iot',
    'irkt',
    'jst',
    'kgt',
    'kost',
    'lint',
    'magt',
    'mart',
    'mawt',
    'mmt',
    'nct',
    'nft',
    'novt',
    'npt',
    'nrt',
    'nut',
    'nzst',
    'omst',
    'pet',
    'pett',
    'phot',
    'phst',
    'pont',
    'pwt',
    'ret',
    'sakt',
    'samt',
    'sbt',
    'sct',
    'sret',
    'srt',
    'syot',
    'taht',
    'tft',
    'tjt',
    'tkt',
    'tlt',
    'tmt',
    'tot',
    'tvt',
    'ulat',
    'vut',
    'wakt',
    'wat',
    'wet',
    'wft',
    'wit',
    'wst',
    'yekt',
  ].reduce((h, str) => {
    h[str] = true;
    return h
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

  const here = 'fix-tagger';
  //
  const fixUp = function (doc) {
    //fixups
    if (doc.has('#Date')) {
      //first day by monday
      let oops = doc.match('#Date+ by #Date+');
      if (oops.found && !oops.has('^due')) {
        oops.match('^#Date+').unTag('Date', 'by-monday');
      }

      let d = doc.match('#Date+');

      //between june
      if (d.has('^between') && !d.has('and .')) {
        d.unTag('Date', here);
      }
      // log the hours
      if (d.has('(minutes|seconds|weeks|hours|days|months)') && !d.has('#Value #Duration')) {
        d.match('(minutes|seconds|weeks|hours|days|months)').unTag('Date', 'log-hours');
      }
      // about thanksgiving
      if (d.has('about #Holiday')) {
        d.match('about').unTag('#Date', 'about-thanksgiving');
      }
      // the day after next
      d.match('#Date+').match('^the').unTag('Date');
    }
    return doc
  };

  const preps = '(in|by|before|during|on|until|after|of|within|all)'; //6
  const thisNext = '(last|next|this|previous|current|upcoming|coming)'; //2
  const sections = '(start|end|middle|starting|ending|midpoint|beginning)'; //2
  const seasons = '(spring|summer|winter|fall|autumn)';
  const knownDate = '(yesterday|today|tomorrow)';

  // { match: '', tag: '', reason:'' },
  let matches = [
    // in the evening
    { match: 'in the (night|evening|morning|afternoon|day|daytime)', tag: 'Time', reason: 'in-the-night' },
    // 8 pm
    { match: '(#Value|#Time) (am|pm)', tag: 'Time', reason: 'value-ampm' },
    // 2012-06
    // { match: '/^[0-9]{4}-[0-9]{2}$/', tag: 'Date', reason: '2012-06' },
    // 30mins
    // { match: '/^[0-9]+(min|sec|hr|d)s?$/', tag: 'Duration', reason: '30min' },
    // misc weekday words
    { match: '(tue|thu)', tag: 'WeekDay', reason: 'misc-weekday' },
    //June 5-7th
    { match: `#Month #Date+`, tag: 'Date', reason: 'correction-numberRange' },
    //5th of March
    { match: '#Value of #Month', tag: 'Date', unTag: 'Time', reason: 'value-of-month' },
    //5 March
    { match: '#Cardinal #Month', tag: 'Date', reason: 'cardinal-month' },
    //march 5 to 7
    { match: '#Month #Value (and|or|to)? #Value+', tag: 'Date', reason: 'value-to-value' },
    //march the 12th
    { match: '#Month the #Value', tag: 'Date', reason: 'month-the-value' },
    // march to april
    { match: '[(march|may)] to? #Date', group: 0, tag: 'Month', reason: 'march-to' },
    // 'march'
    { match: '^(march|may)$', tag: 'Month', reason: 'single-march' },
    //March or June
    { match: '#Month or #Month', tag: 'Date', reason: 'month-or-month' },
    //june 7
    { match: '(#WeekDay|#Month) #Value', ifNo: '#Money', tag: 'Date', reason: 'date-value' },
    //7 june
    { match: '#Value (#WeekDay|#Month)', ifNo: '#Money', tag: 'Date', reason: 'value-date' },
    //may twenty five
    { match: '#TextValue #TextValue', if: '#Date', tag: '#Date', reason: 'textvalue-date' },
    //two thursdays back
    { match: '#Value (#WeekDay|#Duration) back', tag: '#Date', reason: '3-back' },
    //for 4 months
    { match: 'for #Value #Duration', tag: 'Date', reason: 'for-x-duration' },
    //two days before
    { match: '#Value #Duration #Conjunction', tag: 'Date', reason: 'val-duration-conjunction' },
    //for four days
    { match: `${preps}? #Value #Duration`, tag: 'Date', reason: 'value-duration' },
    //two years old
    { match: '#Value #Duration old', unTag: 'Date', reason: 'val-years-old' },
    // 
    { match: `${preps}? ${thisNext} ${seasons}`, tag: 'Date', reason: 'thisNext-season' },
    // 
    { match: `the? ${sections} of ${seasons}`, tag: 'Date', reason: 'section-season' },
    // 
    { match: `${seasons} ${preps}? #Cardinal`, tag: 'Date', reason: 'season-year' },
    //june the 5th
    { match: '#Date the? #Ordinal', tag: 'Date', reason: 'correction' },
    //last month
    { match: `${thisNext} #Date`, tag: 'Date', reason: 'thisNext-date' },
    //by 5 March
    { match: 'due? (by|before|after|until) #Date', tag: 'Date', reason: 'by' },
    //next feb
    { match: '(last|next|this|previous|current|upcoming|coming|the) #Date', tag: 'Date', reason: 'next-feb' },
    //start of june
    { match: `the? ${sections} of #Date`, tag: 'Date', reason: 'section-of' },
    //fifth week in 1998
    { match: '#Ordinal #Duration in #Date', tag: 'Date', reason: 'duration-in' },
    //early in june
    { match: '(early|late) (at|in)? the? #Date', tag: 'Time', reason: 'early-evening' },
    //tomorrow before 3
    { match: '#Date [(by|before|after|at|@|about) #Cardinal]', group: 0, tag: 'Time', reason: 'date-before-Cardinal' },
    //feb to june
    { match: '#Date (#Preposition|to) #Date', ifNo: '#Duration', tag: 'Date', reason: 'date-prep-date' },
    //by 6pm
    { match: '(by|before|after|at|@|about) #Time', tag: 'Time', reason: 'preposition-time' },
    // in 20mins
    { match: '(in|after) /^[0-9]+(min|sec|wk)s?/', tag: 'Date', reason: 'shift-units' },
    //tuesday night
    { match: '#Date [(now|night|sometime)]', group: 0, tag: 'Time', reason: 'date-now' },
    // 4 days from now
    { match: '(from|starting|until|by) now', tag: 'Date', reason: 'for-now' },
    // every night
    { match: '(each|every) night', tag: 'Date', reason: 'for-now' },
    //saturday am
    { match: '#Date [(am|pm)]', group: 0, tag: 'Time', reason: 'date-am' },


    //june 5 to 7th
    { match: '#Month #Value to #Value of? #Year?', tag: 'Date', reason: 'june 5 to 7th' },
    //5 to 7th june
    { match: '#Value to #Value of? #Month #Year?', tag: 'Date', reason: '5 to 7th june' },
    //third week of may
    { match: '#Value #Duration of #Date', tag: 'Date', reason: 'third week of may' },
    //two days after
    { match: '#Value+ #Duration (after|before|into|later|afterwards|ago)?', tag: 'Date', reason: 'two days after' },
    //two days
    { match: '#Value #Date', tag: 'Date', reason: 'two days' },
    //june 5th
    { match: '#Date #Value', tag: 'Date', reason: 'june 5th' },
    //tuesday at 5
    { match: '#Date #Preposition #Value', tag: 'Date', reason: 'tuesday at 5' },
    //tomorrow before 3
    { match: '#Date (after|before|during|on|in) #Value', tag: 'Date', reason: 'tomorrow before 3' },
    //a year and a half
    { match: '#Value (year|month|week|day) and a half', tag: 'Date', reason: 'a year and a half' },
    //5 and a half years
    { match: '#Value and a half (years|months|weeks|days)', tag: 'Date', reason: '5 and a half years' },
    //on the fifth
    { match: 'on the #Ordinal', tag: 'Date', reason: 'on the fifth' },
    // 'jan 5 or 8'
    { match: '#Month #Value+ (and|or) #Value', tag: 'Date', reason: 'date-or-date' },
    // 5 or 8 of jan
    { match: '#Value+ (and|or) #Value of #Month ', tag: 'Date', reason: 'date-and-date' },

    { match: '(spring|summer|winter|fall|autumn|springtime|wintertime|summertime)', tag: 'Season', reason: 'date-tag1' },
    { match: '(q1|q2|q3|q4)', tag: 'FinancialQuarter', reason: 'date-tag2' },
    { match: '(this|next|last|current) quarter', tag: 'FinancialQuarter', reason: 'date-tag3' },
    { match: '(this|next|last|current) season', tag: 'Season', reason: 'date-tag4' },
    //friday to sunday
    { match: '#Date #Preposition #Date', tag: 'Date', reason: 'friday to sunday' },
    //once a day..
    { match: '(once|twice) (a|an|each) #Date', tag: 'Date', reason: 'once a day' },
    //a year after..
    { match: 'a #Duration', tag: 'Date', reason: 'a year' },
    //between x and y
    { match: '(between|from) #Date', tag: 'Date', reason: 'between x and y' },
    { match: '(to|until|upto) #Date', tag: 'Date', reason: 'between x and y2' },
    { match: '#Date and #Date', tag: 'Date', reason: 'between x and y3' },
    //day after next
    { match: 'the? #Date after next one?', tag: 'Date', reason: 'day after next' },
    //approximately...
    { match: '(about|approx|approximately|around) #Date', tag: 'Date', reason: 'approximately june' },

    // until june
    { match: '(by|until|on|in|at|during|over|every|each|due) the? #Date', ifNo: '#PhrasalVerb', tag: 'Date', reason: 'until june' },
    // until last june
    { match: '(by|until|after|before|during|on|in|following|since) (next|this|last)? #Date', ifNo: '#PhrasalVerb', tag: 'Date', reason: 'until last june' },

    //next september
    { match: 'this? (last|next|past|this|previous|current|upcoming|coming|the) #Date', tag: 'Date', reason: 'next september' },
    //starting this june
    { match: '(starting|beginning|ending) #Date', tag: 'Date', reason: 'starting this june' },
    //start of june
    { match: 'the? (start|end|middle|beginning) of (last|next|this|the) #Date', tag: 'Date', reason: 'start of june' },
    //this coming june
    { match: '(the|this) #Date', tag: 'Date', reason: 'this coming june' },
    //january up to june
    { match: '#Date up to #Date', tag: 'Date', reason: 'january up to june' },

    // 2 oclock
    { match: '#Cardinal oclock', tag: 'Time', reason: '2 oclock' },
    // // 13h30
    // { match: '/^[0-9]{2}h[0-9]{2}$/', tag: 'Time', reason: '13h30' },
    // // 03/02
    // { match: '/^[0-9]{2}/[0-9]{2}/', tag: 'Date', unTag: 'Value', reason: '03/02' },
    // 3 in the morning
    { match: '#Value (in|at) the? (morning|evening|night|nighttime)', tag: 'Time', reason: '3 in the morning' },
    // ten to seven
    { match: '(5|10|15|20|five|ten|fifteen|quarter|twenty|half) (after|past) #Cardinal', tag: 'Time', reason: 'ten to seven' }, //add check for 1 to 1 etc.
    // at 10 past
    { match: '(at|by|before) (5|10|15|20|five|ten|fifteen|twenty|quarter|half) (after|past|to)', tag: 'Time', reason: 'at-20-past' },
    // iso  (2020-03-02T00:00:00.000Z)
    // { match: '/^[0-9]{4}[:-][0-9]{2}[:-][0-9]{2}T[0-9]/', tag: 'Time', reason: 'iso-time-tag' },
    // tuesday at 4
    { match: '#Date [at #Cardinal]', group: 0, ifNo: '#Year', tag: 'Time', reason: ' tuesday at 4' },
    // half an hour
    { match: 'half an (hour|minute|second)', tag: 'Date', reason: 'half an hour' },
    // in eastern time
    { match: '(in|for|by|near|at) #Timezone', tag: 'Date', reason: 'in eastern time' },
    // 3pm to 4pm
    { match: '#Time to #Time', tag: 'Date', reason: '3pm to 4pm' },
    // 4pm sharp
    { match: '#Time [(sharp|on the dot)]', group: 0, tag: 'Time', reason: '4pm sharp' },

    // around four thirty
    { match: '(at|around|near|#Date) [#Cardinal (thirty|fifteen) (am|pm)?]', group: 0, tag: 'Time', reason: 'around four thirty' },
    //anytime around 3
    { match: '(anytime|sometime) (before|after|near) [#Cardinal]', group: 0, tag: 'Time', reason: 'antime-after-3' },


    //'two days before'/ 'nine weeks frow now'
    { match: '(#Cardinal|a|an) #Duration (before|after|ago|from|hence|back)', tag: 'DateShift', reason: 'nine weeks frow now' },
    // in two weeks
    { match: 'in #Cardinal #Duration', tag: 'DateShift', reason: 'in two weeks' },
    { match: 'in (a|an) #Duration', tag: 'DateShift', reason: 'in a week' },
    // an hour from now
    { match: '[(a|an) #Duration from] #Date', group: 0, tag: 'DateShift', reason: 'an hour from now' },
    // a month ago
    { match: '(a|an) #Duration ago', tag: 'DateShift', reason: 'a month ago' },
    // in half an hour
    { match: 'in half (a|an) #Duration', tag: 'DateShift', reason: 'in half an hour' },
    // in a few weeks
    { match: 'in a (few|couple) of? #Duration', tag: 'DateShift', reason: 'in a few weeks' },
    //two weeks and three days before
    { match: '#Cardinal #Duration and? #DateShift', tag: 'DateShift', reason: 'three days before' },
    { match: '#DateShift and #Cardinal #Duration', tag: 'DateShift', reason: 'date-shift' },
    // 'day after tomorrow'
    { match: '[#Duration (after|before)] #Date', group: 0, tag: 'DateShift', reason: 'day after tomorrow' },

    // july 3rd and 4th
    { match: '#Month #Ordinal and #Ordinal', tag: 'Date', reason: 'ord-and-ord' },
    // every other week
    { match: 'every other #Duration', tag: 'Date', reason: 'every-other' },
    // every weekend
    { match: '(every|any|each|a) (day|weekday|week day|weekend|weekend day)', tag: 'Date', reason: 'any-weekday' },
    // any-wednesday
    { match: '(every|any|each|a) (#WeekDay)', tag: 'Date', reason: 'any-wednesday' },
    // any week
    { match: '(every|any|each|a) (#Duration)', tag: 'Date', reason: 'any-week' },
    // wed nov
    { match: '[(wed|sat)] (#Month|#Year|on|between|during|from)', group: 0, tag: 'WeekDay', reason: 'wed' },
    //'spa day'
    { match: '^day$', unTag: 'Date', reason: 'spa-day' },
    // tomorrow's meeting
    { match: '(in|of|by|for)? (#Possessive && #Date)', unTag: 'Date', reason: 'tomorrows meeting' },
    //yesterday 7
    { match: `${knownDate} [#Value]$`, unTag: 'Date', group: 0, reason: 'yesterday-7' },
    //7 yesterday
    { match: `^[#Value] ${knownDate}$`, group: 0, unTag: 'Date', reason: '7 yesterday' },
    //friday yesterday
    // { match: `#WeekDay+ ${knownDate}$`, unTag: 'Date').lastTerm(, tag:'Date',  reason: 'fri-yesterday'},
    //tomorrow on 5
    { match: `on #Cardinal$`, unTag: 'Date', reason: 'on 5' },
    //this tomorrow
    { match: `[this] tomorrow`, group: 0, unTag: 'Date', reason: 'this-tomorrow' },
    //q2 2019
    { match: `(q1|q2|q3|q4) #Year`, tag: 'Date', reason: 'q2 2016' },
    //5 next week
    { match: `^[#Value] (this|next|last)`, group: 0, unTag: 'Date', reason: '4 next' },
    //this month 7
    { match: `(last|this|next) #Duration [#Value]`, group: 0, unTag: 'Date', reason: 'this month 7' },
    //7 this month
    { match: `[!#Month] #Value (last|this|next) #Date`, group: 0, unTag: 'Date', reason: '7 this month' },
    // over the years
    { match: '(in|over) the #Duration #Date+?', unTag: 'Date', reason: 'over-the-duration' },
    // second quarter of 2020
    { match: '#Ordinal quarter of? #Year', unTag: 'Fraction' },
    // a month from now
    { match: '(from|by|before) now', unTag: 'Time', tag: 'Date' },


  ];

  let byGroup = null;


  const doMatches = function (view) {
    let { document, world } = view;
    const { methods } = world;
    byGroup = byGroup || methods.two.compile(matches, methods);
    let found = methods.two.bulkMatch(document, byGroup, methods);
    // console.log(found.length, 'found')
    methods.two.bulkTagger(found, document, world);
  };

  // run each of the taggers
  const compute = function (view) {
    view.cache();
    doMatches(view);
    tagDates(view);
    timeTagger(view);
    tagTz(view);
    fixUp(view);
    view.uncache();
    return view
  };

  var compute$1 = {
    dates: compute
  };

  var tags = {
    FinancialQuarter: {
      is: 'Date',
      not: ['Fraction'],
    },
    // 'summer'
    Season: {
      is: 'Date',
    },
    // '1982'
    Year: {
      is: 'Date',
      not: ['RomanNumeral'],
    },
    // 'easter'
    Holiday: {
      is: 'Date',
      also: 'Noun',
    },
    // 'two weeks before'
    DateShift: {
      is: 'Date',
      not: ['Timezone', 'Holiday'],
    },
  };

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
    'western european summer time': europe + 'Lisbon',
    'turkey standard time': europe + 'Istanbul',
    'turkish time': europe + 'Istanbul',

    utc: africa + 'Freetown',
    'greenwich standard time': africa + 'Freetown',
    gmt: africa + 'Freetown',

    //africa
    'east africa time': africa + 'Nairobi',
    'east african time': africa + 'Nairobi',
    'eastern africa time': africa + 'Nairobi',
    'central africa time': africa + 'Khartoum',
    'central african time': africa + 'Khartoum',
    'south africa standard time': africa + 'Johannesburg',
    'west africa standard time': africa + 'Lagos',
    'western africa time': africa + 'Lagos',
    'west african time': africa + 'Lagos',

    // australia
    'australian central standard time': aus + 'Adelaide',
    acst: aus + 'Adelaide',
    'australian central daylight time': aus + 'Adelaide',
    acdt: aus + 'Adelaide',
    'australian eastern standard time': aus + 'Brisbane',
    aest: aus + 'Brisbane',
    'australian eastern daylight time': aus + 'Brisbane',
    aedt: aus + 'Brisbane',
    'australian western standard time': aus + 'Perth',
    awst: aus + 'Perth',
    'australian western daylight time': aus + 'Perth',
    awdt: aus + 'Perth',
    'australian central western standard time': aus + 'Eucla',
    acwst: aus + 'Eucla',
    'lord howe standard time': aus + 'Lord_Howe',
    lhst: aus + 'Lord_Howe',
    'lord howe daylight time': aus + 'Lord_Howe',
    lhdt: aus + 'Lord_Howe',
    'russian standard time': europe + 'Moscow',
    msk: europe + 'Moscow',

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
    'newfoundland daylight time': america + 'St_Johns',
    'brazil time': america + 'Sao_Paulo',
    'brazilian time': america + 'Sao_Paulo',
    'argentina time': america + 'Buenos_Aires',
    'argentinian time': america + 'Buenos_Aires',
    'amazon time': america + 'Manaus',
    'amazonian time': america + 'Manaus',
    'easter island standard time': 'Chile/Easterisland',
    'easter island summer time': 'Chile/Easterisland',
    easst: 'Chile/Easterisland',
    'venezuelan standard time': america + 'Caracas',
    'venezuelan time': america + 'Caracas',
    'venezuela time': america + 'Caracas',
    'paraguay time': america + 'Asuncion',
    'paraguay summer time': america + 'Asuncion',
    'cuba standard time': america + 'Havana',
    'cuba time': america + 'Havana',
    'cuba daylight time': america + 'Havana',
    'cuban time': america + 'Havana',
    'bolivia time': america + 'La_Paz',
    'bolivian time': america + 'La_Paz',
    'colombia time': america + 'Bogota',
    'colombian time': america + 'Bogota',
    'acre time': america + 'Eirunepe',
    'peru time': america + 'Lima',
    'chile standard time': america + 'Punta_Arenas',
    'chile time': america + 'Punta_Arenas',
    clst: america + 'Punta_Arenas',
    'chile summer time': america + 'Punta_Arenas',
    cldt: america + 'Punta_Arenas',
    'uruguay time': america + 'Montevideo',
    uyt: america + 'Montevideo',

    //asia
    'arabic standard time': asia + 'Baghdad',
    'iran standard time': asia + 'Tehran',
    'iran time': asia + 'Tehran',
    'iran daylight time': asia + 'Tehran',
    'pakistan standard time': asia + 'Karachi',
    'pakistan time': asia + 'Karachi',
    'india standard time': asia + 'Kolkata',
    'indian time': asia + 'Kolkata',
    'indochina time': asia + 'Bangkok',
    'china standard time': asia + 'Shanghai',
    'alma-ata time': asia + 'Almaty',
    'oral time': asia + 'Oral',
    'orat time': asia + 'Oral',
    'yakutsk time': asia + 'Yakutsk',
    yakt: asia + 'Yakutsk',
    'gulf standard time': asia + 'Dubai',
    'gulf time': asia + 'Dubai',
    'hong kong time': asia + 'Hong_Kong',
    'western indonesian time': asia + 'Jakarta',
    'indonesia time': asia + 'Jakarta',
    'central indonesian time': asia + 'Makassar',
    'israel daylight time': asia + 'Jerusalem',
    'israel standard time': asia + 'Jerusalem',
    'israel time': asia + 'Jerusalem',
    'krasnoyarsk time': asia + 'Krasnoyarsk',
    'malaysia time': asia + 'Kuala_Lumpur',
    'singapore time': asia + 'Singapore',
    'korea standard time': asia + 'Seoul',
    'korea time': asia + 'Seoul',
    kst: asia + 'Seoul',
    'korean time': asia + 'Seoul',
    'uzbekistan time': asia + 'Samarkand',
    'vladivostok time': asia + 'Vladivostok',

    //indian
    'maldives time': 'Indian/Maldives',
    'mauritius time': 'Indian/Mauritius',

    'marshall islands time': pac + 'Kwajalein',
    'samoa standard time': pac + 'Midway',
    'somoan time': pac + 'Midway',
    'chamorro standard time': pac + 'Guam',
    'papua new guinea time': pac + 'Bougainville',
  };

  //add the official iana zonefile names
  let iana = spacetime__default["default"]().timezones;
  let formal = Object.keys(iana).reduce((h, k) => {
    h[k] = k;
    return h
  }, {});
  var timezones = Object.assign({}, informal, formal);

  var dates = [
    'weekday',

    'summer',
    'winter',
    'autumn',

    // 'some day',
    // 'one day',
    'all day',
    // 'some point',

    'eod',
    'eom',
    'eoy',
    'standard time',
    'daylight time',
    'tommorrow',
  ];

  var durations = [
    'centuries',
    'century',
    'day',
    'days',
    'decade',
    'decades',
    'hour',
    'hours',
    'hr',
    'hrs',
    'millisecond',
    'milliseconds',
    'minute',
    'minutes',
    'min',
    'mins',
    'month',
    'months',
    'seconds',
    'sec',
    'secs',
    'week end',
    'week ends',
    'weekend',
    'weekends',
    'week',
    'weeks',
    'wk',
    'wks',
    'year',
    'years',
    'yr',
    'yrs',
    'quarter',
    // 'quarters',
    'qtr',
    'qtrs',
    'season',
    'seasons',
  ];

  var holidays = [
    'all hallows eve',
    'all saints day',
    'all sts day',
    'april fools',
    'armistice day',
    'australia day',
    'bastille day',
    'boxing day',
    'canada day',
    'christmas eve',
    'christmas',
    'cinco de mayo',
    'day of the dead',
    'dia de muertos',
    'dieciseis de septiembre',
    'emancipation day',
    'grito de dolores',
    'groundhog day',
    'halloween',
    'harvey milk day',
    'inauguration day',
    'independence day',
    'independents day',
    'juneteenth',
    'labour day',
    'national freedom day',
    'national nurses day',
    'new years eve',
    'new years',
    'purple heart day',
    'rememberance day',
    'rosa parks day',
    'saint andrews day',
    'saint patricks day',
    'saint stephens day',
    'saint valentines day',
    'st andrews day',
    'st patricks day',
    'st stephens day',
    'st valentines day ',
    'valentines day',
    'valentines',
    'veterans day',
    'victoria day',
    'womens equality day',
    'xmas',
    // Fixed religious and cultural holidays
    // Catholic + Christian
    'epiphany',
    'orthodox christmas day',
    'orthodox new year',
    'assumption of mary',
    'all souls day',
    'feast of the immaculate conception',
    'feast of our lady of guadalupe',

    // Kwanzaa
    'kwanzaa',
    // Pagan / metal 🤘
    'imbolc',
    'beltaine',
    'lughnassadh',
    'samhain',
    'martin luther king day',
    'mlk day',
    'presidents day',
    'mardi gras',
    'tax day',
    'commonwealth day',
    'mothers day',
    'memorial day',
    'fathers day',
    'columbus day',
    'indigenous peoples day',
    'canadian thanksgiving',
    'election day',
    'thanksgiving',
    't-day',
    'turkey day',
    'black friday',
    'cyber monday',
    // Astronomical religious and cultural holidays
    'ash wednesday',
    'palm sunday',
    'maundy thursday',
    'good friday',
    'holy saturday',
    'easter',
    'easter sunday',
    'easter monday',
    'orthodox good friday',
    'orthodox holy saturday',
    'orthodox easter',
    'orthodox easter monday',
    'ascension day',
    'pentecost',
    'whitsunday',
    'whit sunday',
    'whit monday',
    'trinity sunday',
    'corpus christi',
    'advent',
    // Jewish
    'tu bishvat',
    'tu bshevat',
    'purim',
    'passover',
    'yom hashoah',
    'lag baomer',
    'shavuot',
    'tisha bav',
    'rosh hashana',
    'yom kippur',
    'sukkot',
    'shmini atzeret',
    'simchat torah',
    'chanukah',
    'hanukkah',
    // Muslim
    'isra and miraj',
    'lailat al-qadr',
    'eid al-fitr',
    'id al-Fitr',
    'eid ul-Fitr',
    'ramadan',
    'eid al-adha',
    'muharram',
    'the prophets birthday',
    'ostara',
    'march equinox',
    'vernal equinox',
    'litha',
    'june solistice',
    'summer solistice',
    'mabon',
    'september equinox',
    'fall equinox',
    'autumnal equinox',
    'yule',
    'december solstice',
    'winter solstice',
    // Additional important holidays
    'chinese new year',
    'diwali',
  ];

  var times = [
    'noon',
    'midnight',
    'morning',
    'tonight',
    'evening',
    'afternoon',
    'breakfast time',
    'lunchtime',
    'dinnertime',
    'midday',
    'eod',
    'oclock',
    'oclock',
    'at night',
    // 'now',
    // 'night',
    // 'sometime',
    // 'all day',
  ];

  let lex = {
    'a couple': 'Value',
    thur: 'WeekDay',
    thurs: 'WeekDay',
  };
  const add = function (arr, tag) {
    arr.forEach(str => {
      lex[str] = tag;
    });
  };
  add(Object.keys(timezones), 'Timezone');
  add(dates, 'Date');
  add(durations, 'Duration');
  add(holidays, 'Holiday');
  add(times, 'Time');

  var regex = [
    // 30sec
    [/^[0-9]+(min|sec|hr|d)s?$/, 'Duration', '30min'],
    // 2012-06
    [/^[0-9]{4}-[0-9]{2}$/, 'Date', '2012-06'],
    // 13h30
    [/^[0-9]{2}h[0-9]{2}$/, 'Time', '13h30'],
    // 03/02
    [/^[0-9]{2}\/[0-9]{2}/, 'Date', '03/02'],
    // iso-time
    [/^[0-9]{4}[:-][0-9]{2}[:-][0-9]{2}T[0-9]/, 'Time', 'iso-time-tag']

  ];

  var plugin = {
    tags,
    words: lex,
    compute: compute$1,
    api,
    mutate: (world) => {
      world.model.two.regexNormal = world.model.two.regexNormal.concat(regex);
    },
    hooks: ['dates']
  };

  return plugin;

}));

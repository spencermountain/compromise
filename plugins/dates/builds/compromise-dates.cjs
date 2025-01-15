(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.compromiseDates = factory());
})(this, (function () { 'use strict';

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
    //1998 and 1999
    m = dates.match('#Year [and] #Year', 0);
    if (m.found) {
      dates = dates.splitAfter(m);
    }
    // cleanup any splits
    dates = dates.not('^and');
    dates = dates.not('and$');
    return dates
  };

  const findDate = function (doc) {
    let dates = doc.match('#Date+');
    // ignore only-durations like '20 minutes'
    dates = dates.filter(m => {
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

  const aliases$2 = {
    wk: 'week',
    min: 'minute',
    sec: 'second',
    weekend: 'week', //for now...
  };

  const parseUnit = function (m) {
    let unit = m.match('#Duration').text('normal');
    unit = unit.replace(/s$/, '');
    // support shorthands like 'min'
    if (aliases$2.hasOwnProperty(unit)) {
      unit = aliases$2[unit];
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

    // a couple years
    m = shift.match('a (few|couple) [#Duration]', 0);
    if (m.found) {
      let unit = parseUnit(m);
      result[unit] = m.has('few') ? 3 : 2;
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

  const MSEC_IN_HOUR = 60 * 60 * 1000;

  //convert our local date syntax a javascript UTC date
  const toUtc = (dstChange, offset, year) => {
    const [month, rest] = dstChange.split('/');
    const [day, hour] = rest.split(':');
    return Date.UTC(year, month - 1, day, hour) - (offset * MSEC_IN_HOUR)
  };

  // compare epoch with dst change events (in utc)
  const inSummerTime = (epoch, start, end, summerOffset, winterOffset) => {
    const year = new Date(epoch).getUTCFullYear();
    const startUtc = toUtc(start, winterOffset, year);
    const endUtc = toUtc(end, summerOffset, year);
    // simple number comparison now
    return epoch >= startUtc && epoch < endUtc
  };

  /* eslint-disable no-console */

  // this method avoids having to do a full dst-calculation on every operation
  // it reproduces some things in ./index.js, but speeds up spacetime considerably
  const quickOffset = s => {
    let zones = s.timezones;
    let obj = zones[s.tz];
    if (obj === undefined) {
      console.warn("Warning: couldn't find timezone " + s.tz);
      return 0
    }
    if (obj.dst === undefined) {
      return obj.offset
    }

    //get our two possible offsets
    let jul = obj.offset;
    let dec = obj.offset + 1; // assume it's the same for now
    if (obj.hem === 'n') {
      dec = jul - 1;
    }
    let split = obj.dst.split('->');
    let inSummer = inSummerTime(s.epoch, split[0], split[1], jul, dec);
    if (inSummer === true) {
      return jul
    }
    return dec
  };

  var data = {
    "9|s": "2/dili,2/jayapura",
    "9|n": "2/chita,2/khandyga,2/pyongyang,2/seoul,2/tokyo,2/yakutsk,11/palau,japan,rok",
    "9.5|s|04/06:03->10/05:04": "4/adelaide,4/broken_hill,4/south,4/yancowinna",
    "9.5|s": "4/darwin,4/north",
    "8|s|03/13:01->10/02:00": "12/casey",
    "8|s": "2/kuala_lumpur,2/makassar,2/singapore,4/perth,2/ujung_pandang,4/west,singapore",
    "8|n": "2/brunei,2/hong_kong,2/irkutsk,2/kuching,2/macau,2/manila,2/shanghai,2/taipei,2/ulaanbaatar,2/chongqing,2/chungking,2/harbin,2/macao,2/ulan_bator,2/choibalsan,hongkong,prc,roc",
    "8.75|s": "4/eucla",
    "7|s": "12/davis,2/jakarta,9/christmas",
    "7|n": "2/bangkok,2/barnaul,2/hovd,2/krasnoyarsk,2/novokuznetsk,2/novosibirsk,2/phnom_penh,2/pontianak,2/ho_chi_minh,2/tomsk,2/vientiane,2/saigon",
    "6|s": "12/vostok",
    "6|n": "2/almaty,2/bishkek,2/dhaka,2/omsk,2/qyzylorda,2/qostanay,2/thimphu,2/urumqi,9/chagos,2/dacca,2/kashgar,2/thimbu",
    "6.5|n": "2/yangon,9/cocos,2/rangoon",
    "5|s": "12/mawson,9/kerguelen",
    "5|n": "2/aqtau,2/aqtobe,2/ashgabat,2/atyrau,2/dushanbe,2/karachi,2/oral,2/samarkand,2/tashkent,2/yekaterinburg,9/maldives,2/ashkhabad",
    "5.75|n": "2/kathmandu,2/katmandu",
    "5.5|n": "2/kolkata,2/colombo,2/calcutta",
    "4|s": "9/reunion",
    "4|n": "2/baku,2/dubai,2/muscat,2/tbilisi,2/yerevan,8/astrakhan,8/samara,8/saratov,8/ulyanovsk,8/volgograd,9/mahe,9/mauritius,2/volgograd",
    "4.5|n": "2/kabul",
    "3|s": "12/syowa,9/antananarivo",
    "3|n|04/25:02->10/30:24": "0/cairo,egypt",
    "3|n|04/12:04->10/25:02": "2/gaza,2/hebron",
    "3|n|03/30:05->10/26:04": "2/famagusta,2/nicosia,8/athens,8/bucharest,8/helsinki,8/kyiv,8/mariehamn,8/riga,8/sofia,8/tallinn,8/uzhgorod,8/vilnius,8/zaporozhye,8/nicosia,8/kiev,eet",
    "3|n|03/30:04->10/26:03": "8/chisinau,8/tiraspol",
    "3|n|03/30:02->10/25:24": "2/beirut",
    "3|n|03/28:04->10/26:02": "2/jerusalem,2/tel_aviv,israel",
    "3|n": "0/addis_ababa,0/asmara,0/asmera,0/dar_es_salaam,0/djibouti,0/juba,0/kampala,0/mogadishu,0/nairobi,2/aden,2/amman,2/baghdad,2/bahrain,2/damascus,2/kuwait,2/qatar,2/riyadh,8/istanbul,8/kirov,8/minsk,8/moscow,8/simferopol,9/comoro,9/mayotte,2/istanbul,turkey,w-su",
    "3.5|n": "2/tehran,iran",
    "2|s|03/30:04->10/26:02": "12/troll",
    "2|s": "0/gaborone,0/harare,0/johannesburg,0/lubumbashi,0/lusaka,0/maputo,0/maseru,0/mbabane",
    "2|n|03/30:04->10/26:03": "0/ceuta,arctic/longyearbyen,8/amsterdam,8/andorra,8/belgrade,8/berlin,8/bratislava,8/brussels,8/budapest,8/busingen,8/copenhagen,8/gibraltar,8/ljubljana,8/luxembourg,8/madrid,8/malta,8/monaco,8/oslo,8/paris,8/podgorica,8/prague,8/rome,8/san_marino,8/sarajevo,8/skopje,8/stockholm,8/tirane,8/vaduz,8/vatican,8/vienna,8/warsaw,8/zagreb,8/zurich,3/jan_mayen,poland,cet,met",
    "2|n": "0/blantyre,0/bujumbura,0/khartoum,0/kigali,0/tripoli,8/kaliningrad,libya",
    "1|s": "0/brazzaville,0/kinshasa,0/luanda,0/windhoek",
    "1|n|03/30:03->10/26:02": "3/canary,3/faroe,3/madeira,8/dublin,8/guernsey,8/isle_of_man,8/jersey,8/lisbon,8/london,3/faeroe,eire,8/belfast,gb-eire,gb,portugal,wet",
    "1|n": "0/algiers,0/bangui,0/douala,0/lagos,0/libreville,0/malabo,0/ndjamena,0/niamey,0/porto-novo,0/tunis",
    "14|n": "11/kiritimati",
    "13|s": "11/apia,11/tongatapu",
    "13|n": "11/enderbury,11/kanton,11/fakaofo",
    "12|s|04/06:03->09/28:04": "12/mcmurdo,11/auckland,12/south_pole,nz",
    "12|s": "11/fiji",
    "12|n": "2/anadyr,2/kamchatka,2/srednekolymsk,11/funafuti,11/kwajalein,11/majuro,11/nauru,11/tarawa,11/wake,11/wallis,kwajalein",
    "12.75|s|04/06:03->04/06:02": "11/chatham,nz-chat",
    "11|s|04/06:03->10/05:04": "12/macquarie",
    "11|s": "11/bougainville",
    "11|n": "2/magadan,2/sakhalin,11/efate,11/guadalcanal,11/kosrae,11/noumea,11/pohnpei,11/ponape",
    "11.5|n|04/06:03->10/05:04": "11/norfolk",
    "10|s|04/06:03->10/05:04": "4/currie,4/hobart,4/melbourne,4/sydney,4/act,4/canberra,4/nsw,4/tasmania,4/victoria",
    "10|s": "12/dumontdurville,4/brisbane,4/lindeman,11/port_moresby,4/queensland",
    "10|n": "2/ust-nera,2/vladivostok,11/guam,11/saipan,11/chuuk,11/truk,11/yap",
    "10.5|s|04/06:01->10/05:02": "4/lord_howe,4/lhi",
    "0|s|02/23:03->04/06:04": "0/casablanca,0/el_aaiun",
    "0|n|03/30:02->10/26:01": "3/azores",
    "0|n|03/30:01->10/25:24": "1/scoresbysund",
    "0|n": "0/abidjan,0/accra,0/bamako,0/banjul,0/bissau,0/conakry,0/dakar,0/freetown,0/lome,0/monrovia,0/nouakchott,0/ouagadougou,0/sao_tome,1/danmarkshavn,3/reykjavik,3/st_helena,13/gmt,13/utc,0/timbuktu,13/greenwich,13/uct,13/universal,13/zulu,gmt-0,gmt+0,gmt0,greenwich,iceland,uct,universal,utc,zulu,13/unknown,factory",
    "-9|n|03/09:04->11/02:02": "1/adak,1/atka,us/aleutian",
    "-9|n": "11/gambier",
    "-9.5|n": "11/marquesas",
    "-8|n|03/09:04->11/02:02": "1/anchorage,1/juneau,1/metlakatla,1/nome,1/sitka,1/yakutat,us/alaska",
    "-8|n": "11/pitcairn",
    "-7|n|03/09:04->11/02:02": "1/los_angeles,1/santa_isabel,1/tijuana,1/vancouver,1/ensenada,6/pacific,10/bajanorte,us/pacific-new,us/pacific",
    "-7|n": "1/creston,1/dawson,1/dawson_creek,1/fort_nelson,1/hermosillo,1/mazatlan,1/phoenix,1/whitehorse,6/yukon,10/bajasur,us/arizona,mst",
    "-6|s|04/05:22->09/06:24": "11/easter,7/easterisland",
    "-6|n|04/07:02->10/27:02": "1/merida",
    "-6|n|03/09:04->11/02:02": "1/boise,1/cambridge_bay,1/denver,1/edmonton,1/inuvik,1/north_dakota,1/ojinaga,1/ciudad_juarez,1/yellowknife,1/shiprock,6/mountain,navajo,us/mountain",
    "-6|n": "1/bahia_banderas,1/belize,1/chihuahua,1/costa_rica,1/el_salvador,1/guatemala,1/managua,1/mexico_city,1/monterrey,1/regina,1/swift_current,1/tegucigalpa,11/galapagos,6/east-saskatchewan,6/saskatchewan,10/general",
    "-5|s": "1/lima,1/rio_branco,1/porto_acre,5/acre",
    "-5|n|03/09:04->11/02:02": "1/chicago,1/matamoros,1/menominee,1/rainy_river,1/rankin_inlet,1/resolute,1/winnipeg,1/indiana/knox,1/indiana/tell_city,1/north_dakota/beulah,1/north_dakota/center,1/north_dakota/new_salem,1/knox_in,6/central,us/central,us/indiana-starke",
    "-5|n": "1/bogota,1/cancun,1/cayman,1/coral_harbour,1/eirunepe,1/guayaquil,1/jamaica,1/panama,1/atikokan,jamaica,est",
    "-4|s|04/05:24->09/07:02": "1/santiago,7/continental",
    "-4|s|03/22:24->10/05:02": "1/asuncion",
    "-4|s": "1/campo_grande,1/cuiaba,1/la_paz,1/manaus,5/west",
    "-4|n|03/09:04->11/02:02": "1/detroit,1/grand_turk,1/indiana,1/indianapolis,1/iqaluit,1/kentucky,1/louisville,1/montreal,1/nassau,1/new_york,1/nipigon,1/pangnirtung,1/port-au-prince,1/thunder_bay,1/toronto,1/indiana/marengo,1/indiana/petersburg,1/indiana/vevay,1/indiana/vincennes,1/indiana/winamac,1/kentucky/monticello,1/fort_wayne,1/indiana/indianapolis,1/kentucky/louisville,6/eastern,us/east-indiana,us/eastern,us/michigan",
    "-4|n|03/09:02->11/02:01": "1/havana,cuba",
    "-4|n": "1/anguilla,1/antigua,1/aruba,1/barbados,1/blanc-sablon,1/boa_vista,1/caracas,1/curacao,1/dominica,1/grenada,1/guadeloupe,1/guyana,1/kralendijk,1/lower_princes,1/marigot,1/martinique,1/montserrat,1/port_of_spain,1/porto_velho,1/puerto_rico,1/santo_domingo,1/st_barthelemy,1/st_kitts,1/st_lucia,1/st_thomas,1/st_vincent,1/tortola,1/virgin",
    "-3|s": "1/argentina,1/buenos_aires,1/catamarca,1/cordoba,1/fortaleza,1/jujuy,1/mendoza,1/montevideo,1/punta_arenas,1/sao_paulo,12/palmer,12/rothera,3/stanley,1/argentina/la_rioja,1/argentina/rio_gallegos,1/argentina/salta,1/argentina/san_juan,1/argentina/san_luis,1/argentina/tucuman,1/argentina/ushuaia,1/argentina/comodrivadavia,1/argentina/buenos_aires,1/argentina/catamarca,1/argentina/cordoba,1/argentina/jujuy,1/argentina/mendoza,1/argentina/rosario,1/rosario,5/east",
    "-3|n|03/09:04->11/02:02": "1/glace_bay,1/goose_bay,1/halifax,1/moncton,1/thule,3/bermuda,6/atlantic",
    "-3|n": "1/araguaina,1/bahia,1/belem,1/cayenne,1/maceio,1/paramaribo,1/recife,1/santarem",
    "-2|n|03/09:04->11/02:02": "1/miquelon",
    "-2|n": "1/noronha,3/south_georgia,5/denoronha",
    "-2.5|n|03/09:04->11/02:02": "1/st_johns,6/newfoundland",
    "-1|n|03/30:01->10/25:24": "1/nuuk,1/godthab",
    "-1|n": "3/cape_verde",
    "-11|n": "11/midway,11/niue,11/pago_pago,11/samoa,us/samoa",
    "-10|n": "11/honolulu,11/johnston,11/rarotonga,11/tahiti,us/hawaii,hst"
  };

  //prefixes for iana names..
  var prefixes = [
    'africa',
    'america',
    'asia',
    'atlantic',
    'australia',
    'brazil',
    'canada',
    'chile',
    'europe',
    'indian',
    'mexico',
    'pacific',
    'antarctica',
    'etc'
  ];

  let all = {};
  Object.keys(data).forEach((k) => {
    let split = k.split('|');
    let obj = {
      offset: Number(split[0]),
      hem: split[1]
    };
    if (split[2]) {
      obj.dst = split[2];
    }
    let names = data[k].split(',');
    names.forEach((str) => {
      str = str.replace(/(^[0-9]+)\//, (before, num) => {
        num = Number(num);
        return prefixes[num] + '/'
      });
      all[str] = obj;
    });
  });

  all.utc = {
    offset: 0,
    hem: 'n' //default to northern hemisphere - (sorry!)
  };

  //add etc/gmt+n
  for (let i = -14; i <= 14; i += 0.5) {
    let num = i;
    if (num > 0) {
      num = '+' + num;
    }
    let name = 'etc/gmt' + num;
    all[name] = {
      offset: i * -1, //they're negative!
      hem: 'n' //(sorry)
    };
    name = 'utc/gmt' + num; //this one too, why not.
    all[name] = {
      offset: i * -1,
      hem: 'n'
    };
  }

  //find the implicit iana code for this machine.
  //safely query the Intl object
  //based on - https://bitbucket.org/pellepim/jstimezonedetect/src
  const fallbackTZ = 'utc'; //

  //this Intl object is not supported often, yet
  const safeIntl = () => {
    if (typeof Intl === 'undefined' || typeof Intl.DateTimeFormat === 'undefined') {
      return null
    }
    let format = Intl.DateTimeFormat();
    if (typeof format === 'undefined' || typeof format.resolvedOptions === 'undefined') {
      return null
    }
    let timezone = format.resolvedOptions().timeZone;
    if (!timezone) {
      return null
    }
    return timezone.toLowerCase()
  };

  const guessTz = () => {
    let timezone = safeIntl();
    if (timezone === null) {
      return fallbackTZ
    }
    return timezone
  };

  const isOffset$1 = /(-?[0-9]+)h(rs)?/i;
  const isNumber$1 = /(-?[0-9]+)/;
  const utcOffset$1 = /utc([\-+]?[0-9]+)/i;
  const gmtOffset$1 = /gmt([\-+]?[0-9]+)/i;

  const toIana$1 = function (num) {
    num = Number(num);
    if (num >= -13 && num <= 13) {
      num = num * -1; //it's opposite!
      num = (num > 0 ? '+' : '') + num; //add plus sign
      return 'etc/gmt' + num
    }
    return null
  };

  const parseOffset$2 = function (tz) {
    // '+5hrs'
    let m = tz.match(isOffset$1);
    if (m !== null) {
      return toIana$1(m[1])
    }
    // 'utc+5'
    m = tz.match(utcOffset$1);
    if (m !== null) {
      return toIana$1(m[1])
    }
    // 'GMT-5' (not opposite)
    m = tz.match(gmtOffset$1);
    if (m !== null) {
      let num = Number(m[1]) * -1;
      return toIana$1(num)
    }
    // '+5'
    m = tz.match(isNumber$1);
    if (m !== null) {
      return toIana$1(m[1])
    }
    return null
  };

  /* eslint-disable no-console */


  let local = guessTz();

  //add all the city names by themselves
  const cities = Object.keys(all).reduce((h, k) => {
    let city = k.split('/')[1] || '';
    city = city.replace(/_/g, ' ');
    h[city] = k;
    return h
  }, {});

  //try to match these against iana form
  const normalize$4 = (tz) => {
    tz = tz.replace(/ time/g, '');
    tz = tz.replace(/ (standard|daylight|summer)/g, '');
    tz = tz.replace(/\b(east|west|north|south)ern/g, '$1');
    tz = tz.replace(/\b(africa|america|australia)n/g, '$1');
    tz = tz.replace(/\beuropean/g, 'europe');
    tz = tz.replace(/islands/g, 'island');
    return tz
  };

  // try our best to reconcile the timzone to this given string
  const lookupTz = (str, zones) => {
    if (!str) {
      // guard if Intl response is unsupported (#397)
      if (!zones.hasOwnProperty(local)) {
        console.warn(`Unrecognized IANA id '${local}'. Setting fallback tz to UTC.`);
        local = 'utc';
      }
      return local
    }
    if (typeof str !== 'string') {
      console.error("Timezone must be a string - recieved: '", str, "'\n");
    }
    let tz = str.trim();
    // let split = str.split('/')
    //support long timezones like 'America/Argentina/Rio_Gallegos'
    // if (split.length > 2 && zones.hasOwnProperty(tz) === false) {
    //   tz = split[0] + '/' + split[1]
    // }
    tz = tz.toLowerCase();
    if (zones.hasOwnProperty(tz) === true) {
      return tz
    }
    //lookup more loosely..
    tz = normalize$4(tz);
    if (zones.hasOwnProperty(tz) === true) {
      return tz
    }
    //try city-names
    if (cities.hasOwnProperty(tz) === true) {
      return cities[tz]
    }
    // //try to parse '-5h'
    if (/[0-9]/.test(tz) === true) {
      let id = parseOffset$2(tz);
      if (id) {
        return id
      }
    }

    throw new Error(
      "Spacetime: Cannot find timezone named: '" + str + "'. Please enter an IANA timezone id."
    )
  };

  //git:blame @JuliasCaesar https://www.timeanddate.com/date/leapyear.html
  function isLeapYear(year) { return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 }
  // unsurprisingly-nasty `typeof date` call
  function isDate(d) { return Object.prototype.toString.call(d) === '[object Date]' && !isNaN(d.valueOf()) }
  function isArray$1(input) { return Object.prototype.toString.call(input) === '[object Array]' }
  function isObject(input) { return Object.prototype.toString.call(input) === '[object Object]' }
  function isBoolean(input) { return Object.prototype.toString.call(input) === '[object Boolean]' }

  function zeroPad(str, len = 2) {
    let pad = '0';
    str = str + '';
    return str.length >= len ? str : new Array(len - str.length + 1).join(pad) + str
  }

  function titleCase$1(str) {
    if (!str) {
      return ''
    }
    return str[0].toUpperCase() + str.substr(1)
  }

  function ordinal(i) {
    let j = i % 10;
    let k = i % 100;
    if (j === 1 && k !== 11) {
      return i + 'st'
    }
    if (j === 2 && k !== 12) {
      return i + 'nd'
    }
    if (j === 3 && k !== 13) {
      return i + 'rd'
    }
    return i + 'th'
  }

  //strip 'st' off '1st'..
  function toCardinal(str) {
    str = String(str);
    str = str.replace(/([0-9])(st|nd|rd|th)$/i, '$1');
    return parseInt(str, 10)
  }

  //used mostly for cleanup of unit names, like 'months'
  function normalize$3(str = '') {
    str = str.toLowerCase().trim();
    str = str.replace(/ies$/, 'y'); //'centuries'
    str = str.replace(/s$/, '');
    str = str.replace(/-/g, '');
    if (str === 'day' || str === 'days') {
      return 'date'
    }
    if (str === 'min' || str === 'mins') {
      return 'minute'
    }
    return str
  }

  function getEpoch(tmp) {
    //support epoch
    if (typeof tmp === 'number') {
      return tmp
    }
    //suport date objects
    if (isDate(tmp)) {
      return tmp.getTime()
    }
    // support spacetime objects
    if (tmp.epoch || tmp.epoch === 0) {
      return tmp.epoch
    }
    return null
  }

  //make sure this input is a spacetime obj
  function beADate(d, s) {
    if (isObject(d) === false) {
      return s.clone().set(d)
    }
    return d
  }

  function formatTimezone(offset, delimiter = '') {
    const sign = offset > 0 ? '+' : '-';
    const absOffset = Math.abs(offset);
    const hours = zeroPad(parseInt('' + absOffset, 10));
    const minutes = zeroPad((absOffset % 1) * 60);
    return `${sign}${hours}${delimiter}${minutes}`
  }

  /* eslint-disable no-console */
  const defaults$1 = {
    year: new Date().getFullYear(),
    month: 0,
    date: 1
  };

  //support [2016, 03, 01] format
  const parseArray$1 = (s, arr, today) => {
    if (arr.length === 0) {
      return s
    }
    let order = ['year', 'month', 'date', 'hour', 'minute', 'second', 'millisecond'];
    for (let i = 0; i < order.length; i++) {
      let num = arr[i] || today[order[i]] || defaults$1[order[i]] || 0;
      s = s[order[i]](num);
    }
    return s
  };

  //support {year:2016, month:3} format
  const parseObject$1 = (s, obj, today) => {
    // if obj is empty, do nothing
    if (Object.keys(obj).length === 0) {
      return s
    }
    obj = Object.assign({}, defaults$1, today, obj);
    let keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      let unit = keys[i];
      //make sure we have this method
      if (s[unit] === undefined || typeof s[unit] !== 'function') {
        continue
      }
      //make sure the value is a number
      if (obj[unit] === null || obj[unit] === undefined || obj[unit] === '') {
        continue
      }
      let num = obj[unit] || today[unit] || defaults$1[unit] || 0;
      s = s[unit](num);
    }
    return s
  };

  // this may seem like an arbitrary number, but it's 'within jan 1970'
  // this is only really ambiguous until 2054 or so
  const parseNumber$1 = function (s, input) {
    const minimumEpoch = 2500000000;
    // if the given epoch is really small, they've probably given seconds and not milliseconds
    // anything below this number is likely (but not necessarily) a mistaken input.
    if (input > 0 && input < minimumEpoch && s.silent === false) {
      console.warn('  - Warning: You are setting the date to January 1970.');
      console.warn('       -   did input seconds instead of milliseconds?');
    }
    s.epoch = input;
    return s
  };

  var fns = {
    parseArray: parseArray$1,
    parseObject: parseObject$1,
    parseNumber: parseNumber$1
  };

  // pull in 'today' data for the baseline moment
  const getNow = function (s) {
    s.epoch = Date.now();
    Object.keys(s._today || {}).forEach((k) => {
      if (typeof s[k] === 'function') {
        s = s[k](s._today[k]);
      }
    });
    return s
  };

  const dates$4 = {
    now: (s) => {
      return getNow(s)
    },
    today: (s) => {
      return getNow(s)
    },
    tonight: (s) => {
      s = getNow(s);
      s = s.hour(18); //6pm
      return s
    },
    tomorrow: (s) => {
      s = getNow(s);
      s = s.add(1, 'day');
      s = s.startOf('day');
      return s
    },
    yesterday: (s) => {
      s = getNow(s);
      s = s.subtract(1, 'day');
      s = s.startOf('day');
      return s
    },
    christmas: (s) => {
      let year = getNow(s).year();
      s = s.set([year, 11, 25, 18, 0, 0]); // Dec 25
      return s
    },
    'new years': (s) => {
      let year = getNow(s).year();
      s = s.set([year, 11, 31, 18, 0, 0]); // Dec 31
      return s
    }
  };
  dates$4['new years eve'] = dates$4['new years'];

  //little cleanup..
  const normalize$2 = function (str) {
    // remove all day-names
    str = str.replace(/\b(mon|tues?|wed|wednes|thur?s?|fri|sat|satur|sun)(day)?\b/i, '');
    //remove ordinal ending
    str = str.replace(/([0-9])(th|rd|st|nd)/, '$1');
    str = str.replace(/,/g, '');
    str = str.replace(/ +/g, ' ').trim();
    return str
  };

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

  /* eslint-disable no-console */

  //basically, step-forward/backward until js Date object says we're there.
  const walk = (s, n, fn, unit, previous) => {
    let current = s.d[fn]();
    if (current === n) {
      return //already there
    }
    let startUnit = previous === null ? null : s.d[previous]();
    let original = s.epoch;
    //try to get it as close as we can
    let diff = n - current;
    s.epoch += o[unit] * diff;
    //DST edge-case: if we are going many days, be a little conservative
    // console.log(unit, diff)
    if (unit === 'day') {
      // s.epoch -= ms.minute
      //but don't push it over a month
      if (Math.abs(diff) > 28 && n < 28) {
        s.epoch += o.hour;
      }
    }
    // 1st time: oops, did we change previous unit? revert it.
    if (previous !== null && startUnit !== s.d[previous]()) {
      // console.warn('spacetime warning: missed setting ' + unit)
      s.epoch = original;
      // s.epoch += ms[unit] * diff * 0.89 // maybe try and make it close...?
    }
    //repair it if we've gone too far or something
    //(go by half-steps, just in case)
    const halfStep = o[unit] / 2;
    while (s.d[fn]() < n) {
      s.epoch += halfStep;
    }

    while (s.d[fn]() > n) {
      s.epoch -= halfStep;
    }
    // 2nd time: did we change previous unit? revert it.
    if (previous !== null && startUnit !== s.d[previous]()) {
      // console.warn('spacetime warning: missed setting ' + unit)
      s.epoch = original;
    }
  };
  //find the desired date by a increment/check while loop
  const units$5 = {
    year: {
      valid: (n) => n > -4000 && n < 4000,
      walkTo: (s, n) => walk(s, n, 'getFullYear', 'year', null)
    },
    month: {
      valid: (n) => n >= 0 && n <= 11,
      walkTo: (s, n) => {
        let d = s.d;
        let current = d.getMonth();
        let original = s.epoch;
        let startUnit = d.getFullYear();
        if (current === n) {
          return
        }
        //try to get it as close as we can..
        let diff = n - current;
        s.epoch += o.day * (diff * 28); //special case
        //oops, did we change the year? revert it.
        if (startUnit !== s.d.getFullYear()) {
          s.epoch = original;
        }
        //increment by day
        while (s.d.getMonth() < n) {
          s.epoch += o.day;
        }
        while (s.d.getMonth() > n) {
          s.epoch -= o.day;
        }
      }
    },
    date: {
      valid: (n) => n > 0 && n <= 31,
      walkTo: (s, n) => walk(s, n, 'getDate', 'day', 'getMonth')
    },
    hour: {
      valid: (n) => n >= 0 && n < 24,
      walkTo: (s, n) => walk(s, n, 'getHours', 'hour', 'getDate')
    },
    minute: {
      valid: (n) => n >= 0 && n < 60,
      walkTo: (s, n) => walk(s, n, 'getMinutes', 'minute', 'getHours')
    },
    second: {
      valid: (n) => n >= 0 && n < 60,
      walkTo: (s, n) => {
        //do this one directly
        s.epoch = s.seconds(n).epoch;
      }
    },
    millisecond: {
      valid: (n) => n >= 0 && n < 1000,
      walkTo: (s, n) => {
        //do this one directly
        s.epoch = s.milliseconds(n).epoch;
      }
    }
  };

  const walkTo = (s, wants) => {
    let keys = Object.keys(units$5);
    let old = s.clone();
    for (let i = 0; i < keys.length; i++) {
      let k = keys[i];
      let n = wants[k];
      if (n === undefined) {
        n = old[k]();
      }
      if (typeof n === 'string') {
        n = parseInt(n, 10);
      }
      //make-sure it's valid
      if (!units$5[k].valid(n)) {
        s.epoch = null;
        if (s.silent === false) {
          console.warn('invalid ' + k + ': ' + n);
        }
        return
      }
      units$5[k].walkTo(s, n);
    }
    return
  };

  const monthLengths = [
    31, // January - 31 days
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

  // 28 - feb
  // 30 - april, june, sept, nov
  // 31 - jan, march, may, july, aug, oct, dec

  let shortMonths = [
    'jan',
    'feb',
    'mar',
    'apr',
    'may',
    'jun',
    'jul',
    'aug',
    'sep',
    'oct',
    'nov',
    'dec'
  ];
  let longMonths = [
    'january',
    'february',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december'
  ];

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
    return obj
  }

  function short$1() { return shortMonths }
  function long$1() { return longMonths }
  function mapping$3() { return buildMapping() }
  function set$5(i18n) {
    shortMonths = i18n.short || shortMonths;
    longMonths = i18n.long || longMonths;
  }

  //pull-apart ISO offsets, like "+0100"
  const parseOffset$1 = (s, offset) => {
    if (!offset) {
      return s
    }
    offset = offset.trim().toLowerCase();
    // according to ISO8601, tz could be hh:mm, hhmm or hh
    // so need few more steps before the calculation.
    let num = 0;

    // for (+-)hh:mm
    if (/^[+-]?[0-9]{2}:[0-9]{2}$/.test(offset)) {
      //support "+01:00"
      if (/:00/.test(offset) === true) {
        offset = offset.replace(/:00/, '');
      }
      //support "+01:30"
      if (/:30/.test(offset) === true) {
        offset = offset.replace(/:30/, '.5');
      }
    }

    // for (+-)hhmm
    if (/^[+-]?[0-9]{4}$/.test(offset)) {
      offset = offset.replace(/30$/, '.5');
    }
    num = parseFloat(offset);

    //divide by 100 or 10 - , "+0100", "+01"
    if (Math.abs(num) > 100) {
      num = num / 100;
    }
    //this is a fancy-move
    if (num === 0 || offset === 'Z' || offset === 'z') {
      s.tz = 'etc/gmt';
      return s
    }
    //okay, try to match it to a utc timezone
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
    return s
  };

  // truncate any sub-millisecond values
  const parseMs = function (str = '') {
    str = String(str);
    //js does not support sub-millisecond values
    // so truncate these - 2021-11-02T19:55:30.087772
    if (str.length > 3) {
      str = str.substring(0, 3);
    } else if (str.length === 1) {
      // assume ms are zero-padded on the left
      // but maybe not on the right.
      // turn '.10' into '.100'
      str = str + '00';
    } else if (str.length === 2) {
      str = str + '0';
    }
    return Number(str) || 0
  };

  const parseTime$1 = (s, str = '') => {
    // remove all whitespace
    str = str.replace(/^\s+/, '').toLowerCase();
    //formal time format - 04:30.23
    let arr = str.match(/([0-9]{1,2}):([0-9]{1,2}):?([0-9]{1,2})?[:.]?([0-9]{1,4})?/);
    if (arr !== null) {
      let [, h, m, sec, ms] = arr;
      //validate it a little
      h = Number(h);
      if (h < 0 || h > 24) {
        return s.startOf('day')
      }
      m = Number(m); //don't accept '5:3pm'
      if (arr[2].length < 2 || m < 0 || m > 59) {
        return s.startOf('day')
      }
      s = s.hour(h);
      s = s.minute(m);
      s = s.seconds(sec || 0);
      s = s.millisecond(parseMs(ms));
      //parse-out am/pm
      let ampm = str.match(/[0-9] ?(am|pm)\b/);
      if (ampm !== null && ampm[1]) {
        s = s.ampm(ampm[1]);
      }
      return s
    }

    //try an informal form - 5pm (no minutes)
    arr = str.match(/([0-9]+) ?(am|pm)/);
    if (arr !== null && arr[1]) {
      let h = Number(arr[1]);
      //validate it a little..
      if (h > 12 || h < 1) {
        return s.startOf('day')
      }
      s = s.hour(arr[1] || 0);
      s = s.ampm(arr[2]);
      s = s.startOf('hour');
      return s
    }

    //no time info found, use start-of-day
    s = s.startOf('day');
    return s
  };

  let months$1 = mapping$3();

  //given a month, return whether day number exists in it
  const validate$1 = (obj) => {
    //invalid values
    if (monthLengths.hasOwnProperty(obj.month) !== true) {
      return false
    }
    //support leap-year in february
    if (obj.month === 1) {
      if (isLeapYear(obj.year) && obj.date <= 29) {
        return true
      } else {
        return obj.date <= 28
      }
    }
    //is this date too-big for this month?
    let max = monthLengths[obj.month] || 0;
    if (obj.date <= max) {
      return true
    }
    return false
  };

  const parseYear = (str = '', today) => {
    str = str.trim();
    // parse '86 shorthand
    if (/^'[0-9][0-9]$/.test(str) === true) {
      let num = Number(str.replace(/'/, ''));
      if (num > 50) {
        return 1900 + num
      }
      return 2000 + num
    }
    let year = parseInt(str, 10);
    // use a given year from options.today
    if (!year && today) {
      year = today.year;
    }
    // fallback to this year
    year = year || new Date().getFullYear();
    return year
  };

  const parseMonth = function (str) {
    str = str.toLowerCase().trim();
    if (str === 'sept') {
      return months$1.sep
    }
    return months$1[str]
  };

  var ymd = [
    // =====
    //  y-m-d
    // =====
    //iso-this 1998-05-30T22:00:00:000Z, iso-that 2017-04-03T08:00:00-0700
    {
      reg: /^(-?0{0,2}[0-9]{3,4})-([0-9]{1,2})-([0-9]{1,2})[T| ]([0-9.:]+)(Z|[0-9-+:]+)?$/i,
      parse: (s, m) => {
        let obj = {
          year: m[1],
          month: parseInt(m[2], 10) - 1,
          date: m[3]
        };
        if (validate$1(obj) === false) {
          s.epoch = null;
          return s
        }
        parseOffset$1(s, m[5]);
        walkTo(s, obj);
        s = parseTime$1(s, m[4]);
        return s
      }
    },
    //short-iso "2015-03-25" or "2015/03/25" or "2015/03/25 12:26:14 PM"
    {
      reg: /^([0-9]{4})[\-/. ]([0-9]{1,2})[\-/. ]([0-9]{1,2})( [0-9]{1,2}(:[0-9]{0,2})?(:[0-9]{0,3})? ?(am|pm)?)?$/i,
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
        if (validate$1(obj) === false) {
          s.epoch = null;
          return s
        }
        walkTo(s, obj);
        s = parseTime$1(s, m[4]);
        return s
      }
    },

    //text-month "2015-feb-25"
    {
      reg: /^([0-9]{4})[\-/. ]([a-z]+)[\-/. ]([0-9]{1,2})( [0-9]{1,2}(:[0-9]{0,2})?(:[0-9]{0,3})? ?(am|pm)?)?$/i,
      parse: (s, m) => {
        let obj = {
          year: parseYear(m[1], s._today),
          month: parseMonth(m[2]),
          date: toCardinal(m[3] || '')
        };
        if (validate$1(obj) === false) {
          s.epoch = null;
          return s
        }
        walkTo(s, obj);
        s = parseTime$1(s, m[4]);
        return s
      }
    }
  ];

  var mdy = [
    // =====
    //  m-d-y
    // =====
    //mm/dd/yyyy - uk/canada "6/28/2019, 12:26:14 PM"
    {
      reg: /^([0-9]{1,2})[-/.]([0-9]{1,2})[\-/.]?([0-9]{4})?( [0-9]{1,2}:[0-9]{2}:?[0-9]{0,2} ?(am|pm|gmt))?$/i,
      parse: (s, arr) => {
        let month = parseInt(arr[1], 10) - 1;
        let date = parseInt(arr[2], 10);
        //support dd/mm/yyy
        if (s.british || month >= 12) {
          date = parseInt(arr[1], 10);
          month = parseInt(arr[2], 10) - 1;
        }
        let obj = {
          date,
          month,
          year: parseYear(arr[3], s._today) || new Date().getFullYear()
        };
        if (validate$1(obj) === false) {
          s.epoch = null;
          return s
        }
        walkTo(s, obj);
        s = parseTime$1(s, arr[4]);
        return s
      }
    },
    //alt short format - "feb-25-2015"
    {
      reg: /^([a-z]+)[\-/. ]([0-9]{1,2})[\-/. ]?([0-9]{4}|'[0-9]{2})?( [0-9]{1,2}(:[0-9]{0,2})?(:[0-9]{0,3})? ?(am|pm)?)?$/i,
      parse: (s, arr) => {
        let obj = {
          year: parseYear(arr[3], s._today),
          month: parseMonth(arr[1]),
          date: toCardinal(arr[2] || '')
        };
        if (validate$1(obj) === false) {
          s.epoch = null;
          return s
        }
        walkTo(s, obj);
        s = parseTime$1(s, arr[4]);
        return s
      }
    },

    //Long "Mar 25 2015"
    //February 22, 2017 15:30:00
    {
      reg: /^([a-z]+) ([0-9]{1,2})( [0-9]{4})?( ([0-9:]+( ?am| ?pm| ?gmt)?))?$/i,
      parse: (s, arr) => {
        let obj = {
          year: parseYear(arr[3], s._today),
          month: parseMonth(arr[1]),
          date: toCardinal(arr[2] || '')
        };
        if (validate$1(obj) === false) {
          s.epoch = null;
          return s
        }
        walkTo(s, obj);
        s = parseTime$1(s, arr[4]);
        return s
      }
    },
    // 'Sun Mar 14 15:09:48 +0000 2021'
    {
      reg: /^([a-z]+) ([0-9]{1,2}) ([0-9]{1,2}:[0-9]{2}:?[0-9]{0,2})( \+[0-9]{4})?( [0-9]{4})?$/i,
      parse: (s, arr) => {
        let [, month, date, time, tz, year] = arr;
        let obj = {
          year: parseYear(year, s._today),
          month: parseMonth(month),
          date: toCardinal(date || '')
        };
        if (validate$1(obj) === false) {
          s.epoch = null;
          return s
        }
        walkTo(s, obj);
        s = parseOffset$1(s, tz);
        s = parseTime$1(s, time);
        return s
      }
    }
  ];

  var dmy = [
    // =====
    //  d-m-y
    // =====
    //common british format - "25-feb-2015"
    {
      reg: /^([0-9]{1,2})[-/]([a-z]+)[\-/]?([0-9]{4})?$/i,
      parse: (s, m) => {
        let obj = {
          year: parseYear(m[3], s._today),
          month: parseMonth(m[2]),
          date: toCardinal(m[1] || '')
        };
        if (validate$1(obj) === false) {
          s.epoch = null;
          return s
        }
        walkTo(s, obj);
        s = parseTime$1(s, m[4]);
        return s
      }
    },
    // "25 Mar 2015"
    {
      reg: /^([0-9]{1,2})( [a-z]+)( [0-9]{4}| '[0-9]{2})? ?([0-9]{1,2}:[0-9]{2}:?[0-9]{0,2} ?(am|pm|gmt))?$/i,
      parse: (s, m) => {
        let obj = {
          year: parseYear(m[3], s._today),
          month: parseMonth(m[2]),
          date: toCardinal(m[1])
        };
        if (!obj.month || validate$1(obj) === false) {
          s.epoch = null;
          return s
        }
        walkTo(s, obj);
        s = parseTime$1(s, m[4]);
        return s
      }
    },
    // 01-jan-2020
    {
      reg: /^([0-9]{1,2})[. \-/]([a-z]+)[. \-/]([0-9]{4})?( [0-9]{1,2}(:[0-9]{0,2})?(:[0-9]{0,3})? ?(am|pm)?)?$/i,
      parse: (s, m) => {
        let obj = {
          date: Number(m[1]),
          month: parseMonth(m[2]),
          year: Number(m[3])
        };
        if (validate$1(obj) === false) {
          s.epoch = null;
          return s
        }
        walkTo(s, obj);
        s = s.startOf('day');
        s = parseTime$1(s, m[4]);
        return s
      }
    }
  ];

  var misc = [
    // =====
    // no dates
    // =====

    // '2012-06' month-only
    {
      reg: /^([0-9]{4})[\-/]([0-9]{2})$/,
      parse: (s, m) => {
        let obj = {
          year: m[1],
          month: parseInt(m[2], 10) - 1,
          date: 1
        };
        if (validate$1(obj) === false) {
          s.epoch = null;
          return s
        }
        walkTo(s, obj);
        s = parseTime$1(s, m[4]);
        return s
      }
    },

    //February 2017 (implied date)
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
          return s
        }
        walkTo(s, obj);
        s = parseTime$1(s, arr[4]);
        return s
      }
    },

    {
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
        return s
      }
    },
    {
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
        return s
      }
    },
    {
      // '200bc'
      reg: /^[0-9,]+ ?b\.?c\.?$/i,
      parse: (s, arr) => {
        let str = arr[0] || '';
        //make year-negative
        str = str.replace(/^([0-9,]+) ?b\.?c\.?$/i, '-$1');
        let d = new Date();
        let obj = {
          year: parseInt(str.trim(), 10),
          month: d.getMonth(),
          date: d.getDate()
        };
        if (validate$1(obj) === false) {
          s.epoch = null;
          return s
        }
        walkTo(s, obj);
        s = parseTime$1(s);
        return s
      }
    },
    {
      // '200ad'
      reg: /^[0-9,]+ ?(a\.?d\.?|c\.?e\.?)$/i,
      parse: (s, arr) => {
        let str = arr[0] || '';
        //remove commas
        str = str.replace(/,/g, '');
        let d = new Date();
        let obj = {
          year: parseInt(str.trim(), 10),
          month: d.getMonth(),
          date: d.getDate()
        };
        if (validate$1(obj) === false) {
          s.epoch = null;
          return s
        }
        walkTo(s, obj);
        s = parseTime$1(s);
        return s
      }
    },
    {
      // '1992'
      reg: /^[0-9]{4}( ?a\.?d\.?)?$/i,
      parse: (s, arr) => {
        let today = s._today;
        // using today's date, but a new month is awkward.
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
          return s
        }
        walkTo(s, obj);
        s = parseTime$1(s);
        return s
      }
    }
  ];

  var parsers = [].concat(ymd, mdy, dmy, misc);

  /* eslint-disable no-console */

  const parseString = function (s, input, givenTz) {
    // let parsers = s.parsers || []
    //try each text-parse template, use the first good result
    for (let i = 0; i < parsers.length; i++) {
      let m = input.match(parsers[i].reg);
      if (m) {
        let res = parsers[i].parse(s, m, givenTz);
        if (res !== null && res.isValid()) {
          return res
        }
      }
    }
    if (s.silent === false) {
      console.warn("Warning: couldn't parse date-string: '" + input + "'");
    }
    s.epoch = null;
    return s
  };

  const { parseArray, parseObject, parseNumber } = fns;
  //we have to actually parse these inputs ourselves
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
  };

  //find the epoch from different input styles
  const parseInput = (s, input) => {
    let today = s._today || defaults;
    //if we've been given a epoch number, it's easy
    if (typeof input === 'number') {
      return parseNumber(s, input)
    }
    //set tmp time
    s.epoch = Date.now();
    // overwrite tmp time with 'today' value, if exists
    if (s._today && isObject(s._today) && Object.keys(s._today).length > 0) {
      let res = parseObject(s, today, defaults);
      if (res.isValid()) {
        s.epoch = res.epoch;
      }
    }
    // null input means 'now'
    if (input === null || input === undefined || input === '') {
      return s //k, we're good.
    }
    //support input of Date() object
    if (isDate(input) === true) {
      s.epoch = input.getTime();
      return s
    }
    //support [2016, 03, 01] format
    if (isArray$1(input) === true) {
      s = parseArray(s, input, today);
      return s
    }
    //support {year:2016, month:3} format
    if (isObject(input) === true) {
      //support spacetime object as input
      if (input.epoch) {
        s.epoch = input.epoch;
        s.tz = input.tz;
        return s
      }
      s = parseObject(s, input, today);
      return s
    }
    //input as a string..
    if (typeof input !== 'string') {
      return s
    }
    //little cleanup..
    input = normalize$2(input);
    //try some known-words, like 'now'
    if (dates$4.hasOwnProperty(input) === true) {
      s = dates$4[input](s);
      return s
    }
    //try each text-parse template, use the first good result
    return parseString(s, input)
  };

  let shortDays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  let longDays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

  function short() { return shortDays }
  function long() { return longDays }
  function set$4(i18n) {
    shortDays = i18n.short || shortDays;
    longDays = i18n.long || longDays;
  }
  const aliases$1 = {
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
  };

  let titleCaseEnabled = true;

  function useTitleCase() {
    return titleCaseEnabled
  }

  function set$3(val) {
    titleCaseEnabled = val;
  }

  // create the timezone offset part of an iso timestamp
  // it's kind of nuts how involved this is
  // "+01:00", "+0100", or simply "+01"
  const isoOffset = s => {
    let offset = s.timezone().current.offset;
    return !offset ? 'Z' : formatTimezone(offset, ':')
  };

  const applyCaseFormat = (str) => {
    if (useTitleCase()) {
      return titleCase$1(str)
    }
    return str
  };

  // iso-year padding
  const padYear = (num) => {
    if (num >= 0) {
      return zeroPad(num, 4)
    } else {
      num = Math.abs(num);
      return '-' + zeroPad(num, 4)
    }
  };

  const format = {
    day: (s) => applyCaseFormat(s.dayName()),
    'day-short': (s) => applyCaseFormat(short()[s.day()]),
    'day-number': (s) => s.day(),
    'day-ordinal': (s) => ordinal(s.day()),
    'day-pad': (s) => zeroPad(s.day()),

    date: (s) => s.date(),
    'date-ordinal': (s) => ordinal(s.date()),
    'date-pad': (s) => zeroPad(s.date()),

    month: (s) => applyCaseFormat(s.monthName()),
    'month-short': (s) => applyCaseFormat(short$1()[s.month()]),
    'month-number': (s) => s.month(),
    'month-ordinal': (s) => ordinal(s.month()),
    'month-pad': (s) => zeroPad(s.month()),
    'iso-month': (s) => zeroPad(s.month() + 1), //1-based months

    year: (s) => {
      let year = s.year();
      if (year > 0) {
        return year
      }
      year = Math.abs(year);
      return year + ' BC'
    },
    'year-short': (s) => {
      let year = s.year();
      if (year > 0) {
        return `'${String(s.year()).substr(2, 4)}`
      }
      year = Math.abs(year);
      return year + ' BC'
    },
    'iso-year': (s) => {
      let year = s.year();
      let isNegative = year < 0;
      let str = zeroPad(Math.abs(year), 4); //0-padded
      if (isNegative) {
        //negative years are for some reason 6-digits ('-00008')
        str = zeroPad(str, 6);
        str = '-' + str;
      }
      return str
    },

    time: (s) => s.time(),
    'time-24': (s) => `${s.hour24()}:${zeroPad(s.minute())}`,

    hour: (s) => s.hour12(),
    'hour-pad': (s) => zeroPad(s.hour12()),
    'hour-24': (s) => s.hour24(),
    'hour-24-pad': (s) => zeroPad(s.hour24()),

    minute: (s) => s.minute(),
    'minute-pad': (s) => zeroPad(s.minute()),
    second: (s) => s.second(),
    'second-pad': (s) => zeroPad(s.second()),
    millisecond: (s) => s.millisecond(),
    'millisecond-pad': (s) => zeroPad(s.millisecond(), 3),

    ampm: (s) => s.ampm(),
    AMPM: (s) => s.ampm().toUpperCase(),
    quarter: (s) => 'Q' + s.quarter(),
    season: (s) => s.season(),
    era: (s) => s.era(),
    json: (s) => s.json(),
    timezone: (s) => s.timezone().name,
    offset: (s) => isoOffset(s),

    numeric: (s) => `${s.year()}/${zeroPad(s.month() + 1)}/${zeroPad(s.date())}`, // yyyy/mm/dd
    'numeric-us': (s) => `${zeroPad(s.month() + 1)}/${zeroPad(s.date())}/${s.year()}`, // mm/dd/yyyy
    'numeric-uk': (s) => `${zeroPad(s.date())}/${zeroPad(s.month() + 1)}/${s.year()}`, //dd/mm/yyyy
    'mm/dd': (s) => `${zeroPad(s.month() + 1)}/${zeroPad(s.date())}`, //mm/dd

    // ... https://en.wikipedia.org/wiki/ISO_8601 ;(((
    iso: (s) => {
      let year = s.format('iso-year');
      let month = zeroPad(s.month() + 1); //1-based months
      let date = zeroPad(s.date());
      let hour = zeroPad(s.h24());
      let minute = zeroPad(s.minute());
      let second = zeroPad(s.second());
      let ms = zeroPad(s.millisecond(), 3);
      let offset = isoOffset(s);
      return `${year}-${month}-${date}T${hour}:${minute}:${second}.${ms}${offset}` //2018-03-09T08:50:00.000-05:00
    },
    'iso-short': (s) => {
      let month = zeroPad(s.month() + 1); //1-based months
      let date = zeroPad(s.date());
      let year = padYear(s.year());
      return `${year}-${month}-${date}` //2017-02-15
    },
    'iso-utc': (s) => {
      return new Date(s.epoch).toISOString() //2017-03-08T19:45:28.367Z
    },

    //i made these up
    nice: (s) => `${short$1()[s.month()]} ${ordinal(s.date())}, ${s.time()}`,
    'nice-24': (s) =>
      `${short$1()[s.month()]} ${ordinal(s.date())}, ${s.hour24()}:${zeroPad(
      s.minute()
    )}`,
    'nice-year': (s) => `${short$1()[s.month()]} ${ordinal(s.date())}, ${s.year()}`,
    'nice-day': (s) =>
      `${short()[s.day()]} ${applyCaseFormat(short$1()[s.month()])} ${ordinal(
      s.date()
    )}`,
    'nice-full': (s) =>
      `${s.dayName()} ${applyCaseFormat(s.monthName())} ${ordinal(s.date())}, ${s.time()}`,
    'nice-full-24': (s) =>
      `${s.dayName()} ${applyCaseFormat(s.monthName())} ${ordinal(
      s.date()
    )}, ${s.hour24()}:${zeroPad(s.minute())}`
  };
  //aliases
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
  Object.keys(aliases).forEach((k) => (format[k] = format[aliases[k]]));

  const printFormat = (s, str = '') => {
    //don't print anything if it's an invalid date
    if (s.isValid() !== true) {
      return ''
    }
    //support .format('month')
    if (format.hasOwnProperty(str)) {
      let out = format[str](s) || '';
      if (str !== 'json') {
        out = String(out);
        if (str.toLowerCase() !== 'ampm') {
          out = applyCaseFormat(out);
        }
      }
      return out
    }
    //support '{hour}:{minute}' notation
    if (str.indexOf('{') !== -1) {
      let sections = /\{(.+?)\}/g;
      str = str.replace(sections, (_, fmt) => {
        fmt = fmt.trim();
        if (fmt !== 'AMPM') {
          fmt = fmt.toLowerCase();
        }
        if (format.hasOwnProperty(fmt)) {
          let out = String(format[fmt](s));
          if (fmt.toLowerCase() !== 'ampm') {
            return applyCaseFormat(out)
          }
          return out
        }
        return ''
      });
      return str
    }

    return s.format('iso-short')
  };

  //parse this insane unix-time-templating thing, from the 19th century
  //http://unicode.org/reports/tr35/tr35-25.html#Date_Format_Patterns

  //time-symbols we support
  const mapping$2 = {
    G: (s) => s.era(),
    GG: (s) => s.era(),
    GGG: (s) => s.era(),
    GGGG: (s) => (s.era() === 'AD' ? 'Anno Domini' : 'Before Christ'),
    //year
    y: (s) => s.year(),
    yy: (s) => {
      //last two chars
      return zeroPad(Number(String(s.year()).substr(2, 4)))
    },
    yyy: (s) => s.year(),
    yyyy: (s) => s.year(),
    yyyyy: (s) => '0' + s.year(),
    // u: (s) => {},//extended non-gregorian years

    //quarter
    Q: (s) => s.quarter(),
    QQ: (s) => s.quarter(),
    QQQ: (s) => s.quarter(),
    QQQQ: (s) => s.quarter(),

    //month
    M: (s) => s.month() + 1,
    MM: (s) => zeroPad(s.month() + 1),
    MMM: (s) => s.format('month-short'),
    MMMM: (s) => s.format('month'),

    //week
    w: (s) => s.week(),
    ww: (s) => zeroPad(s.week()),
    //week of month
    // W: (s) => s.week(),

    //date of month
    d: (s) => s.date(),
    dd: (s) => zeroPad(s.date()),
    //date of year
    D: (s) => s.dayOfYear(),
    DD: (s) => zeroPad(s.dayOfYear()),
    DDD: (s) => zeroPad(s.dayOfYear(), 3),

    // F: (s) => {},//date of week in month
    // g: (s) => {},//modified julian day

    //day
    E: (s) => s.format('day-short'),
    EE: (s) => s.format('day-short'),
    EEE: (s) => s.format('day-short'),
    EEEE: (s) => s.format('day'),
    EEEEE: (s) => s.format('day')[0],
    e: (s) => s.day(),
    ee: (s) => s.day(),
    eee: (s) => s.format('day-short'),
    eeee: (s) => s.format('day'),
    eeeee: (s) => s.format('day')[0],

    //am/pm
    a: (s) => s.ampm().toUpperCase(),
    aa: (s) => s.ampm().toUpperCase(),
    aaa: (s) => s.ampm().toUpperCase(),
    aaaa: (s) => s.ampm().toUpperCase(),

    //hour
    h: (s) => s.h12(),
    hh: (s) => zeroPad(s.h12()),
    H: (s) => s.hour(),
    HH: (s) => zeroPad(s.hour()),
    // j: (s) => {},//weird hour format

    m: (s) => s.minute(),
    mm: (s) => zeroPad(s.minute()),
    s: (s) => s.second(),
    ss: (s) => zeroPad(s.second()),

    //milliseconds
    SSS: (s) => zeroPad(s.millisecond(), 3),
    //milliseconds in the day
    A: (s) => s.epoch - s.startOf('day').epoch,
    //timezone
    z: (s) => s.timezone().name,
    zz: (s) => s.timezone().name,
    zzz: (s) => s.timezone().name,
    zzzz: (s) => s.timezone().name,
    Z: (s) => formatTimezone(s.timezone().current.offset),
    ZZ: (s) => formatTimezone(s.timezone().current.offset),
    ZZZ: (s) => formatTimezone(s.timezone().current.offset),
    ZZZZ: (s) => formatTimezone(s.timezone().current.offset, ':')
  };

  const addAlias = (char, to, n) => {
    let name = char;
    let toName = to;
    for (let i = 0; i < n; i += 1) {
      mapping$2[name] = mapping$2[toName];
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
  addAlias('V', 'Z', 4);

  // support unix-style escaping with ' character
  const escapeChars = function (arr) {
    for (let i = 0; i < arr.length; i += 1) {
      if (arr[i] === `'`) {
        // greedy-search for next apostrophe
        for (let o = i + 1; o < arr.length; o += 1) {
          if (arr[o]) {
            arr[i] += arr[o];
          }
          if (arr[o] === `'`) {
            arr[o] = null;
            break
          }
          arr[o] = null;
        }
      }
    }
    return arr.filter((ch) => ch)
  };

  //combine consecutive chars, like 'yyyy' as one.
  const combineRepeated = function (arr) {
    for (let i = 0; i < arr.length; i += 1) {
      let c = arr[i];
      // greedy-forward
      for (let o = i + 1; o < arr.length; o += 1) {
        if (arr[o] === c) {
          arr[i] += arr[o];
          arr[o] = null;
        } else {
          break
        }
      }
    }
    // '' means one apostrophe
    arr = arr.filter((ch) => ch);
    arr = arr.map((str) => {
      if (str === `''`) {
        str = `'`;
      }
      return str
    });
    return arr
  };

  const unixFmt = (s, str) => {
    let arr = str.split('');
    // support character escaping
    arr = escapeChars(arr);
    //combine 'yyyy' as string.
    arr = combineRepeated(arr);
    return arr.reduce((txt, c) => {
      if (mapping$2[c] !== undefined) {
        txt += mapping$2[c](s) || '';
      } else {
        // 'unescape'
        if (/^'.+'$/.test(c)) {
          c = c.replace(/'/g, '');
        }
        txt += c;
      }
      return txt
    }, '')
  };

  const units$4 = ['year', 'season', 'quarter', 'month', 'week', 'day', 'quarterHour', 'hour', 'minute'];

  const doUnit = function (s, k) {
    let start = s.clone().startOf(k);
    let end = s.clone().endOf(k);
    let duration = end.epoch - start.epoch;
    let percent = (s.epoch - start.epoch) / duration;
    return parseFloat(percent.toFixed(2))
  };

  //how far it is along, from 0-1
  const progress = (s, unit) => {
    if (unit) {
      unit = normalize$3(unit);
      return doUnit(s, unit)
    }
    let obj = {};
    units$4.forEach(k => {
      obj[k] = doUnit(s, k);
    });
    return obj
  };

  /* eslint-disable no-console */

  //round to either current, or +1 of this unit
  const nearest = (s, unit) => {
    //how far have we gone?
    let prog = s.progress();
    unit = normalize$3(unit);
    //fix camel-case for this one
    if (unit === 'quarterhour') {
      unit = 'quarterHour';
    }
    if (prog[unit] !== undefined) {
      // go forward one?
      if (prog[unit] > 0.5) {
        s = s.add(1, unit);
      }
      // go to start
      s = s.startOf(unit);
    } else if (s.silent === false) {
      console.warn("no known unit '" + unit + "'");
    }
    return s
  };

  //increment until dates are the same
  const climb = (a, b, unit) => {
    let i = 0;
    a = a.clone();
    while (a.isBefore(b)) {
      //do proper, expensive increment to catch all-the-tricks
      a = a.add(1, unit);
      i += 1;
    }
    //oops, we went too-far..
    if (a.isAfter(b, unit)) {
      i -= 1;
    }
    return i
  };

  // do a thurough +=1 on the unit, until they match
  // for speed-reasons, only used on day, month, week.
  const diffOne = (a, b, unit) => {
    if (a.isBefore(b)) {
      return climb(a, b, unit)
    } else {
      return climb(b, a, unit) * -1 //reverse it
    }
  };

  // don't do anything too fancy here.
  // 2020 - 2019 may be 1 year, or 0 years
  // - '1 year difference' means 366 days during a leap year
  const fastYear = (a, b) => {
    let years = b.year() - a.year();
    // should we decrement it by 1?
    a = a.year(b.year());
    if (a.isAfter(b)) {
      years -= 1;
    }
    return years
  };

  // use a waterfall-method for computing a diff of any 'pre-knowable' units
  // compute years, then compute months, etc..
  // ... then ms-math for any very-small units
  const diff = function (a, b) {
    // an hour is always the same # of milliseconds
    // so these units can be 'pre-calculated'
    let msDiff = b.epoch - a.epoch;
    let obj = {
      milliseconds: msDiff,
      seconds: parseInt(msDiff / 1000, 10)
    };
    obj.minutes = parseInt(obj.seconds / 60, 10);
    obj.hours = parseInt(obj.minutes / 60, 10);

    //do the year
    let tmp = a.clone();
    obj.years = fastYear(tmp, b);
    tmp = a.add(obj.years, 'year');

    //there's always 12 months in a year...
    obj.months = obj.years * 12;
    tmp = a.add(obj.months, 'month');
    obj.months += diffOne(tmp, b, 'month');

    // there's always 4 quarters in a year...
    obj.quarters = obj.years * 4;
    obj.quarters += parseInt((obj.months % 12) / 3, 10);

    // there's always atleast 52 weeks in a year..
    // (month * 4) isn't as close
    obj.weeks = obj.years * 52;
    tmp = a.add(obj.weeks, 'week');
    obj.weeks += diffOne(tmp, b, 'week');

    // there's always atleast 7 days in a week
    obj.days = obj.weeks * 7;
    tmp = a.add(obj.days, 'day');
    obj.days += diffOne(tmp, b, 'day');

    return obj
  };

  const reverseDiff = function (obj) {
    Object.keys(obj).forEach((k) => {
      obj[k] *= -1;
    });
    return obj
  };

  // this method counts a total # of each unit, between a, b.
  // '1 month' means 28 days in february
  // '1 year' means 366 days in a leap year
  const main$1 = function (a, b, unit) {
    b = beADate(b, a);
    //reverse values, if necessary
    let reversed = false;
    if (a.isAfter(b)) {
      let tmp = a;
      a = b;
      b = tmp;
      reversed = true;
    }
    //compute them all (i know!)
    let obj = diff(a, b);
    if (reversed) {
      obj = reverseDiff(obj);
    }
    //return just the requested unit
    if (unit) {
      //make sure it's plural-form
      unit = normalize$3(unit);
      if (/s$/.test(unit) !== true) {
        unit += 's';
      }
      if (unit === 'dates') {
        unit = 'days';
      }
      return obj[unit]
    }
    return obj
  };

  /*
  ISO 8601 duration format
  // https://en.wikipedia.org/wiki/ISO_8601#Durations
  "P3Y6M4DT12H30M5S"
  P the start of the duration representation.
  Y the number of years.
  M the number of months.
  W the number of weeks.
  D the number of days.
  T of the representation.
  H the number of hours.
  M the number of minutes.
  S the number of seconds.
  */

  const fmt$1 = (n) => Math.abs(n) || 0;

  const toISO = function (diff) {
    let iso = 'P';
    iso += fmt$1(diff.years) + 'Y';
    iso += fmt$1(diff.months) + 'M';
    iso += fmt$1(diff.days) + 'DT';
    iso += fmt$1(diff.hours) + 'H';
    iso += fmt$1(diff.minutes) + 'M';
    iso += fmt$1(diff.seconds) + 'S';
    return iso
  };

  //get number of hours/minutes... between the two dates
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
    Object.keys(diff).forEach((unit) => {
      if (earlier.isSame(later, unit)) {
        return
      }
      let max = earlier.diff(later, unit);
      earlier = earlier.add(max, unit);
      diff[unit] = max;
    });
    //reverse it, if necessary
    if (isBefore) {
      Object.keys(diff).forEach((u) => {
        if (diff[u] !== 0) {
          diff[u] *= -1;
        }
      });
    }
    return diff
  }

  let units$3 = {
      second: 'second',
      seconds: 'seconds',
      minute: 'minute',
      minutes: 'minutes',
      hour: 'hour',
      hours: 'hours',
      day: 'day',
      days: 'days',
      month: 'month',
      months: 'months',
      year: 'year',
      years: 'years',
  };

  function unitsString(unit) {
      return units$3[unit] || '';
  }

  function set$2(i18n = {}) {
      units$3 = {
          second: i18n.second || units$3.second,
          seconds: i18n.seconds || units$3.seconds,
          minute: i18n.minute || units$3.minute,
          minutes: i18n.minutes || units$3.minutes,
          hour: i18n.hour || units$3.hour,
          hours: i18n.hours || units$3.hours,
          day: i18n.day || units$3.day,
          days: i18n.days || units$3.days,
          month: i18n.month || units$3.month,
          months: i18n.months || units$3.months,
          year: i18n.year || units$3.year,
          years: i18n.years || units$3.years,
      };
  }

  let past = 'past';
  let future = 'future';
  let present = 'present';
  let now = 'now';
  let almost = 'almost';
  let over = 'over';
  let pastDistance = (value) => `${value} ago`;
  let futureDistance = (value) => `in ${value}`;

  function pastDistanceString(value) { return pastDistance(value) }
  function futureDistanceString(value) { return futureDistance(value) }
  function pastString() { return past }
  function futureString() { return future }
  function presentString() { return present }
  function nowString() { return now }
  function almostString() { return almost }
  function overString() { return over }

  function set$1(i18n) {
      pastDistance = i18n.pastDistance || pastDistance;
      futureDistance = i18n.futureDistance || futureDistance;
      past = i18n.past || past;
      future = i18n.future || future;
      present = i18n.present || present;
      now = i18n.now || now;
      almost = i18n.almost || almost;
      over = i18n.over || over;
  }

  //our conceptual 'break-points' for each unit

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
  };

  // Expects a plural unit arg
  function pluralize(value, unit) {
    if (value === 1) {
      return value + ' ' + unitsString(unit.slice(0, -1))
    }
    return value + ' ' + unitsString(unit)
  }

  const toSoft = function (diff) {
    let rounded = null;
    let qualified = null;
    let abbreviated = [];
    let englishValues = [];
    //go through each value and create its text-representation
    Object.keys(diff).forEach((unit, i, units) => {
      const value = Math.abs(diff[unit]);
      if (value === 0) {
        return
      }
      abbreviated.push(value + unit[0]);
      const englishValue = pluralize(value, unit);
      englishValues.push(englishValue);
      if (!rounded) {
        rounded = englishValue;
        qualified = englishValue;
        if (i > 4) {
          return
        }
        //is it a 'almost' something, etc?
        const nextUnit = units[i + 1];
        const nextValue = Math.abs(diff[nextUnit]);
        if (nextValue > qualifiers[nextUnit].almost) {
          rounded = pluralize(value + 1, unit);
          qualified = almostString() + ' ' + rounded;
        } else if (nextValue > qualifiers[nextUnit].over) {
          qualified = overString() + ' ' + englishValue;
        }
      }
    });

    return { qualified, rounded, abbreviated, englishValues }
  };

  //by spencermountain + Shaun Grady

  //create the human-readable diff between the two dates
  const since = (start, end) => {
    end = beADate(end, start);
    const diff = getDiff(start, end);
    const isNow = Object.keys(diff).every((u) => !diff[u]);
    if (isNow === true) {
      return {
        diff,
        rounded: nowString(),
        qualified: nowString(),
        precise: nowString(),
        abbreviated: [],
        iso: 'P0Y0M0DT0H0M0S',
        direction: presentString(),
      }
    }
    let precise;
    let direction = futureString();

    let { rounded, qualified, englishValues, abbreviated } = toSoft(diff);

    //make them into a string
    precise = englishValues.splice(0, 2).join(', ');
    //handle before/after logic
    if (start.isAfter(end) === true) {
      rounded = pastDistanceString(rounded);
      qualified = pastDistanceString(qualified);
      precise = pastDistanceString(precise);
      direction = pastString();
    } else {
      rounded = futureDistanceString(rounded);
      qualified = futureDistanceString(qualified);
      precise = futureDistanceString(precise);
    }
    // https://en.wikipedia.org/wiki/ISO_8601#Durations
    // P[n]Y[n]M[n]DT[n]H[n]M[n]S 
    let iso = toISO(diff);
    return {
      diff,
      rounded,
      qualified,
      precise,
      abbreviated,
      iso,
      direction,
    }
  };

  //https://www.timeanddate.com/calendar/aboutseasons.html
  // Spring - from March 1 to May 31;
  // Summer - from June 1 to August 31;
  // Fall (autumn) - from September 1 to November 30; and,
  // Winter - from December 1 to February 28 (February 29 in a leap year).
  const north = [
    ['spring', 2, 1],
    ['summer', 5, 1],
    ['fall', 8, 1],
    ['autumn', 8, 1],
    ['winter', 11, 1] //dec 1
  ];
  const south = [
    ['fall', 2, 1],
    ['autumn', 2, 1],
    ['winter', 5, 1],
    ['spring', 8, 1],
    ['summer', 11, 1] //dec 1
  ];

  var seasons$1 = { north, south };

  var quarters = [
    null,
    [0, 1], //jan 1
    [3, 1], //apr 1
    [6, 1], //july 1
    [9, 1] //oct 1
  ];

  const units$2 = {
    second: (s) => {
      walkTo(s, {
        millisecond: 0
      });
      return s
    },
    minute: (s) => {
      walkTo(s, {
        second: 0,
        millisecond: 0
      });
      return s
    },
    quarterhour: (s) => {
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
      walkTo(s, {
        second: 0,
        millisecond: 0
      });
      return s
    },
    hour: (s) => {
      walkTo(s, {
        minute: 0,
        second: 0,
        millisecond: 0
      });
      return s
    },
    day: (s) => {
      walkTo(s, {
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0
      });
      return s
    },
    week: (s) => {
      let original = s.clone();
      s = s.day(s._weekStart); //monday
      if (s.isAfter(original)) {
        s = s.subtract(1, 'week');
      }
      walkTo(s, {
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0
      });
      return s
    },
    month: (s) => {
      walkTo(s, {
        date: 1,
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0
      });
      return s
    },
    quarter: (s) => {
      let q = s.quarter();
      if (quarters[q]) {
        walkTo(s, {
          month: quarters[q][0],
          date: quarters[q][1],
          hour: 0,
          minute: 0,
          second: 0,
          millisecond: 0
        });
      }
      return s
    },
    season: (s) => {
      let current = s.season();
      let hem = 'north';
      if (s.hemisphere() === 'South') {
        hem = 'south';
      }
      for (let i = 0; i < seasons$1[hem].length; i++) {
        if (seasons$1[hem][i][0] === current) {
          //winter goes between years
          let year = s.year();
          if (current === 'winter' && s.month() < 3) {
            year -= 1;
          }
          walkTo(s, {
            year,
            month: seasons$1[hem][i][1],
            date: seasons$1[hem][i][2],
            hour: 0,
            minute: 0,
            second: 0,
            millisecond: 0
          });
          return s
        }
      }
      return s
    },
    year: (s) => {
      walkTo(s, {
        month: 0,
        date: 1,
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0
      });
      return s
    },
    decade: (s) => {
      s = s.startOf('year');
      let year = s.year();
      let decade = parseInt(year / 10, 10) * 10;
      s = s.year(decade);
      return s
    },
    century: (s) => {
      s = s.startOf('year');
      let year = s.year();
      // near 0AD goes '-1 | +1'
      let decade = parseInt(year / 100, 10) * 100;
      s = s.year(decade);
      return s
    }
  };
  units$2.date = units$2.day;

  const startOf = (a, unit) => {
    let s = a.clone();
    unit = normalize$3(unit);
    if (units$2[unit]) {
      return units$2[unit](s)
    }
    if (unit === 'summer' || unit === 'winter') {
      s = s.season(unit);
      return units$2.season(s)
    }
    return s
  };

  //piggy-backs off startOf
  const endOf = (a, unit) => {
    let s = a.clone();
    unit = normalize$3(unit);
    if (units$2[unit]) {
      // go to beginning, go to next one, step back 1ms
      s = units$2[unit](s); // startof
      s = s.add(1, unit);
      s = s.subtract(1, 'millisecond');
      return s
    }
    return s
  };

  //is it 'wednesday'?
  const isDay = function (unit) {
    if (short().find((s) => s === unit)) {
      return true
    }
    if (long().find((s) => s === unit)) {
      return true
    }
    return false
  };

  // return a list of the weeks/months/days between a -> b
  // returns spacetime objects in the timezone of the input
  const every = function (start, unit, end, stepCount = 1) {
    if (!unit || !end) {
      return []
    }
    //cleanup unit param
    unit = normalize$3(unit);
    //cleanup to param
    end = start.clone().set(end);
    //swap them, if they're backwards
    if (start.isAfter(end)) {
      let tmp = start;
      start = end;
      end = tmp;
    }
    //prevent going beyond end if unit/stepCount > than the range
    if (start.diff(end, unit) < stepCount) {
      return []
    }
    //support 'every wednesday'
    let d = start.clone();
    if (isDay(unit)) {
      d = d.next(unit);
      unit = 'week';
    } else {
      let first = d.startOf(unit);
      if (first.isBefore(start)) {
        d = d.next(unit);
      }
    }
    //okay, actually start doing it
    let result = [];
    while (d.isBefore(end)) {
      result.push(d);
      d = d.add(stepCount, unit);
    }
    return result
  };

  /* eslint-disable no-console */

  const parseDst = dst => {
    if (!dst) {
      return []
    }
    return dst.split('->')
  };

  //iana codes are case-sensitive, technically
  const titleCase = str => {
    str = str[0].toUpperCase() + str.substr(1);
    str = str.replace(/[/_-]([a-z])/gi, s => {
      return s.toUpperCase()
    });
    str = str.replace(/_(of|es)_/i, (s) => s.toLowerCase());
    str = str.replace(/\/gmt/i, '/GMT');
    str = str.replace(/\/Dumontdurville$/i, '/DumontDUrville');
    str = str.replace(/\/Mcmurdo$/i, '/McMurdo');
    str = str.replace(/\/Port-au-prince$/i, '/Port-au-Prince');
    return str
  };

  //get metadata about this timezone
  const timezone = s => {
    let zones = s.timezones;
    let tz = s.tz;
    if (zones.hasOwnProperty(tz) === false) {
      tz = lookupTz(s.tz, zones);
    }
    if (tz === null) {
      if (s.silent === false) {
        console.warn("Warn: could not find given or local timezone - '" + s.tz + "'");
      }
      return {
        current: {
          epochShift: 0
        }
      }
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
    }
    //find the offsets for summer/winter times
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
    }

    //find out which offset to use right now
    //use 'summer' time july-time
    if (result.hasDst === false) {
      result.current.offset = summer;
      result.current.isDST = false;
    } else if (inSummerTime(s.epoch, result.change.start, result.change.back, summer, winter) === true) {
      result.current.offset = summer;
      result.current.isDST = result.hemisphere === 'North'; //dst 'on' in winter in north
    } else {
      //use 'winter' january-time
      result.current.offset = winter;
      result.current.isDST = result.hemisphere === 'South'; //dst 'on' in summer in south
    }
    return result
  };

  /* eslint-disable no-console */
  const units$1 = [
    'century',
    'decade',
    'year',
    'month',
    'date',
    'day',
    'hour',
    'minute',
    'second',
    'millisecond'
  ];

  //the spacetime instance methods (also, the API)
  const methods$4 = {
    set: function (input, tz) {
      let s = this.clone();
      s = parseInput(s, input);
      if (tz) {
        this.tz = lookupTz(tz);
      }
      return s
    },
    timezone: function () {
      return timezone(this)
    },
    isDST: function () {
      return timezone(this).current.isDST
    },
    hasDST: function () {
      return timezone(this).hasDst
    },
    offset: function () {
      return timezone(this).current.offset * 60
    },
    hemisphere: function () {
      return timezone(this).hemisphere
    },
    format: function (fmt) {
      return printFormat(this, fmt)
    },
    unixFmt: function (fmt) {
      return unixFmt(this, fmt)
    },
    startOf: function (unit) {
      return startOf(this, unit)
    },
    endOf: function (unit) {
      return endOf(this, unit)
    },
    leapYear: function () {
      let year = this.year();
      return isLeapYear(year)
    },
    progress: function (unit) {
      return progress(this, unit)
    },
    nearest: function (unit) {
      return nearest(this, unit)
    },
    diff: function (d, unit) {
      return main$1(this, d, unit)
    },
    since: function (d) {
      if (!d) {
        d = this.clone().set();
      }
      return since(this, d)
    },
    next: function (unit) {
      let s = this.add(1, unit);
      return s.startOf(unit)
    },
    //the start of the previous year/week/century
    last: function (unit) {
      let s = this.subtract(1, unit);
      return s.startOf(unit)
    },
    isValid: function () {
      //null/undefined epochs
      if (!this.epoch && this.epoch !== 0) {
        return false
      }
      return !isNaN(this.d.getTime())
    },
    //travel to this timezone
    goto: function (tz) {
      let s = this.clone();
      s.tz = lookupTz(tz, s.timezones); //science!
      return s
    },
    //get each week/month/day between a -> b
    every: function (unit, to, stepCount) {
      // allow swapping these params:
      if (typeof unit === 'object' && typeof to === 'string') {
        let tmp = to;
        to = unit;
        unit = tmp;
      }
      return every(this, unit, to, stepCount)
    },
    isAwake: function () {
      let hour = this.hour();
      //10pm -> 8am
      if (hour < 8 || hour > 22) {
        return false
      }
      return true
    },
    isAsleep: function () {
      return !this.isAwake()
    },
    daysInMonth: function () {
      switch (this.month()) {
        case 0:
          return 31
        case 1:
          return this.leapYear() ? 29 : 28
        case 2:
          return 31
        case 3:
          return 30
        case 4:
          return 31
        case 5:
          return 30
        case 6:
          return 31
        case 7:
          return 31
        case 8:
          return 30
        case 9:
          return 31
        case 10:
          return 30
        case 11:
          return 31
        default:
          throw new Error('Invalid Month state.')
      }
    },
    //pretty-printing
    log: function () {
      console.log('');
      console.log(printFormat(this, 'nice-short'));
      return this
    },
    logYear: function () {
      console.log('');
      console.log(printFormat(this, 'full-short'));
      return this
    },
    json: function () {
      return units$1.reduce((h, unit) => {
        h[unit] = this[unit]();
        return h
      }, {})
    },
    debug: function () {
      let tz = this.timezone();
      let date = this.format('MM') + ' ' + this.format('date-ordinal') + ' ' + this.year();
      date += '\n     - ' + this.format('time');
      console.log('\n\n', date + '\n     - ' + tz.name + ' (' + tz.current.offset + ')');
      return this
    },
    //alias of 'since' but opposite - like moment.js
    from: function (d) {
      d = this.clone().set(d);
      return d.since(this)
    },
    fromNow: function () {
      let d = this.clone().set(Date.now());
      return d.since(this)
    },
    weekStart: function (input) {
      //accept a number directly
      if (typeof input === 'number') {
        this._weekStart = input;
        return this
      }
      if (typeof input === 'string') {
        // accept 'wednesday'
        input = input.toLowerCase().trim();
        let num = short().indexOf(input);
        if (num === -1) {
          num = long().indexOf(input);
        }
        if (num === -1) {
          num = 1; //go back to default
        }
        this._weekStart = num;
      } else {
        console.warn('Spacetime Error: Cannot understand .weekStart() input:', input);
      }
      return this
    }
  };
  // aliases
  methods$4.inDST = methods$4.isDST;
  methods$4.round = methods$4.nearest;
  methods$4.each = methods$4.every;

  // javascript setX methods like setDate() can't be used because of the local bias
  //these methods wrap around them.

  const validate = (n) => {
    //handle number as a string
    if (typeof n === 'string') {
      n = parseInt(n, 10);
    }
    return n
  };

  const order$1 = ['year', 'month', 'date', 'hour', 'minute', 'second', 'millisecond'];

  //reduce hostile micro-changes when moving dates by millisecond
  const confirm = (s, tmp, unit) => {
    let n = order$1.indexOf(unit);
    let arr = order$1.slice(n, order$1.length);
    for (let i = 0; i < arr.length; i++) {
      let want = tmp[arr[i]]();
      s[arr[i]](want);
    }
    return s
  };

  // allow specifying setter direction
  const fwdBkwd = function (s, old, goFwd, unit) {
    if (goFwd === true && s.isBefore(old)) {
      s = s.add(1, unit);
    } else if (goFwd === false && s.isAfter(old)) {
      s = s.minus(1, unit);
    }
    return s
  };

  const milliseconds = function (s, n) {
    n = validate(n);
    let current = s.millisecond();
    let diff = current - n; //milliseconds to shift by
    return s.epoch - diff
  };

  const seconds = function (s, n, goFwd) {
    n = validate(n);
    let old = s.clone();
    let diff = s.second() - n;
    let shift = diff * o.second;
    s.epoch = s.epoch - shift;
    s = fwdBkwd(s, old, goFwd, 'minute'); // specify direction
    return s.epoch
  };

  const minutes = function (s, n, goFwd) {
    n = validate(n);
    let old = s.clone();
    let diff = s.minute() - n;
    let shift = diff * o.minute;
    s.epoch -= shift;
    confirm(s, old, 'second');
    s = fwdBkwd(s, old, goFwd, 'hour'); // specify direction
    return s.epoch
  };

  const hours = function (s, n, goFwd) {
    n = validate(n);
    if (n >= 24) {
      n = 24;
    } else if (n < 0) {
      n = 0;
    }
    let old = s.clone();
    let diff = s.hour() - n;
    let shift = diff * o.hour;
    s.epoch -= shift;
    // oops, did we change the day?
    if (s.date() !== old.date()) {
      s = old.clone();
      if (diff > 1) {
        diff -= 1;
      }
      if (diff < 1) {
        diff += 1;
      }
      shift = diff * o.hour;
      s.epoch -= shift;
    }
    walkTo(s, {
      hour: n
    });
    confirm(s, old, 'minute');
    s = fwdBkwd(s, old, goFwd, 'day'); // specify direction
    return s.epoch
  };

  const time = function (s, str, goFwd) {
    let m = str.match(/([0-9]{1,2})[:h]([0-9]{1,2})(:[0-9]{1,2})? ?(am|pm)?/);
    if (!m) {
      //fallback to support just '2am'
      m = str.match(/([0-9]{1,2}) ?(am|pm)/);
      if (!m) {
        return s.epoch
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
    }
    //make the hour into proper 24h time
    if (h24 === false) {
      if (m[4] === 'am' && hour === 12) {
        //12am is midnight
        hour = 0;
      }
      if (m[4] === 'pm' && hour < 12) {
        //12pm is noon
        hour += 12;
      }
    }
    // handle seconds
    m[3] = m[3] || '';
    m[3] = m[3].replace(/:/, '');
    let sec = parseInt(m[3], 10) || 0;
    let old = s.clone();
    s = s.hour(hour);
    s = s.minute(minute);
    s = s.second(sec);
    s = s.millisecond(0);
    s = fwdBkwd(s, old, goFwd, 'day'); // specify direction
    return s.epoch
  };

  const date = function (s, n, goFwd) {
    n = validate(n);
    //avoid setting february 31st
    if (n > 28) {
      let month = s.month();
      let max = monthLengths[month];
      // support leap day in february
      if (month === 1 && n === 29 && isLeapYear(s.year())) {
        max = 29;
      }
      if (n > max) {
        n = max;
      }
    }
    //avoid setting < 0
    if (n <= 0) {
      n = 1;
    }
    let old = s.clone();
    walkTo(s, {
      date: n
    });
    s = fwdBkwd(s, old, goFwd, 'month'); // specify direction
    return s.epoch
  };

  const month = function (s, n, goFwd) {
    if (typeof n === 'string') {
      if (n === 'sept') {
        n = 'sep';
      }
      n = mapping$3()[n.toLowerCase()];
    }
    n = validate(n);
    //don't go past december
    if (n >= 12) {
      n = 11;
    }
    if (n <= 0) {
      n = 0;
    }

    let d = s.date();
    //there's no 30th of february, etc.
    if (d > monthLengths[n]) {
      //make it as close as we can..
      d = monthLengths[n];
    }
    let old = s.clone();
    walkTo(s, {
      month: n,
      d
    });
    s = fwdBkwd(s, old, goFwd, 'year'); // specify direction
    return s.epoch
  };

  const year = function (s, n) {
    // support '97
    if (typeof n === 'string' && /^'[0-9]{2}$/.test(n)) {
      n = n.replace(/'/, '').trim();
      n = Number(n);
      // '89 is 1989
      if (n > 30) {
        //change this in 10y
        n = 1900 + n;
      } else {
        // '12 is 2012
        n = 2000 + n;
      }
    }
    n = validate(n);
    walkTo(s, {
      year: n
    });
    return s.epoch
  };

  const week = function (s, n, goFwd) {
    let old = s.clone();
    n = validate(n);
    s = s.month(0);
    s = s.date(1);
    s = s.day('monday');
    //first week starts first Thurs in Jan
    // so mon dec 28th is 1st week
    // so mon dec 29th is not the week
    if (s.monthName() === 'december' && s.date() >= 28) {
      s = s.add(1, 'week');
    }
    n -= 1; //1-based
    s = s.add(n, 'weeks');
    s = fwdBkwd(s, old, goFwd, 'year'); // specify direction
    return s.epoch
  };

  const dayOfYear = function (s, n, goFwd) {
    n = validate(n);
    let old = s.clone();
    n -= 1; //days are 1-based
    if (n <= 0) {
      n = 0;
    } else if (n >= 365) {
      if (isLeapYear(s.year())) {
        n = 365;
      } else {
        n = 364;
      }
    }
    s = s.startOf('year');
    s = s.add(n, 'day');
    confirm(s, old, 'hour');
    s = fwdBkwd(s, old, goFwd, 'year'); // specify direction
    return s.epoch
  };

  let morning = 'am';
  let evening = 'pm';

  function am() { return morning }
  function pm() { return evening }
  function set(i18n) {
      morning = i18n.am || morning;
      evening = i18n.pm || evening;
  }

  const methods$3 = {
    millisecond: function (num) {
      if (num !== undefined) {
        let s = this.clone();
        s.epoch = milliseconds(s, num);
        return s
      }
      return this.d.getMilliseconds()
    },
    second: function (num, goFwd) {
      if (num !== undefined) {
        let s = this.clone();
        s.epoch = seconds(s, num, goFwd);
        return s
      }
      return this.d.getSeconds()
    },
    minute: function (num, goFwd) {
      if (num !== undefined) {
        let s = this.clone();
        s.epoch = minutes(s, num, goFwd);
        return s
      }
      return this.d.getMinutes()
    },
    hour: function (num, goFwd) {
      let d = this.d;
      if (num !== undefined) {
        let s = this.clone();
        s.epoch = hours(s, num, goFwd);
        return s
      }
      return d.getHours()
    },

    //'3:30' is 3.5
    hourFloat: function (num, goFwd) {
      if (num !== undefined) {
        let s = this.clone();
        let minute = num % 1;
        minute = minute * 60;
        let hour = parseInt(num, 10);
        s.epoch = hours(s, hour, goFwd);
        s.epoch = minutes(s, minute, goFwd);
        return s
      }
      let d = this.d;
      let hour = d.getHours();
      let minute = d.getMinutes();
      minute = minute / 60;
      return hour + minute
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
          s.epoch = hours(s, hour, goFwd);
        }
        return s
      }
      //get the hour
      let hour12 = d.getHours();
      if (hour12 > 12) {
        hour12 = hour12 - 12;
      }
      if (hour12 === 0) {
        hour12 = 12;
      }
      return hour12
    },

    //some ambiguity here with 12/24h
    time: function (str, goFwd) {
      if (str !== undefined) {
        let s = this.clone();
        str = str.toLowerCase().trim();
        s.epoch = time(s, str, goFwd);
        return s
      }
      return `${this.h12()}:${zeroPad(this.minute())}${this.ampm()}`
    },

    // either 'am' or 'pm'
    ampm: function (input, goFwd) {
      // let which = 'am'
      let which = am();
      let hour = this.hour();
      if (hour >= 12) {
        // which = 'pm'
        which = pm();
      }
      if (typeof input !== 'string') {
        return which
      }
      //okay, we're doing a setter
      let s = this.clone();
      input = input.toLowerCase().trim();
      //ampm should never change the day
      // - so use `.hour(n)` instead of `.minus(12,'hour')`
      if (hour >= 12 && input === 'am') {
        //noon is 12pm
        hour -= 12;
        return s.hour(hour, goFwd)
      }
      if (hour < 12 && input === 'pm') {
        hour += 12;
        return s.hour(hour, goFwd)
      }
      return s
    },

    //some hard-coded times of day, like 'noon'
    dayTime: function (str, goFwd) {
      if (str !== undefined) {
        const times = {
          morning: '7:00',
          breakfast: '7:00',
          noon: '12:00',
          lunch: '12:00',
          afternoon: '14:00',
          evening: '18:00',
          dinner: '18:00',
          night: '23:00',
          midnight: '00:00'
        };
        let s = this.clone();
        str = str || '';
        str = str.toLowerCase();
        if (times.hasOwnProperty(str) === true) {
          s = s.time(times[str], goFwd);
        }
        return s
      }
      let h = this.hour();
      if (h < 6) {
        return 'night'
      }
      if (h < 12) {
        //until noon
        return 'morning'
      }
      if (h < 17) {
        //until 5pm
        return 'afternoon'
      }
      if (h < 22) {
        //until 10pm
        return 'evening'
      }
      return 'night'
    },

    //parse a proper iso string
    iso: function (num) {
      if (num !== undefined) {
        return this.set(num)
      }
      return this.format('iso')
    }
  };

  const methods$2 = {
    // # day in the month
    date: function (num, goFwd) {
      if (num !== undefined) {
        let s = this.clone();
        num = parseInt(num, 10);
        if (num) {
          s.epoch = date(s, num, goFwd);
        }
        return s
      }
      return this.d.getDate()
    },

    //like 'wednesday' (hard!)
    day: function (input, goFwd) {
      if (input === undefined) {
        return this.d.getDay()
      }
      let original = this.clone();
      let want = input;
      // accept 'wednesday'
      if (typeof input === 'string') {
        input = input.toLowerCase();
        if (aliases$1.hasOwnProperty(input)) {
          want = aliases$1[input];
        } else {
          want = short().indexOf(input);
          if (want === -1) {
            want = long().indexOf(input);
          }
        }
      }
      //move approx
      let day = this.d.getDay();
      let diff = day - want;
      if (goFwd === true && diff > 0) {
        diff = diff - 7;
      }
      if (goFwd === false && diff < 0) {
        diff = diff + 7;
      }
      let s = this.subtract(diff, 'days');
      //tighten it back up
      walkTo(s, {
        hour: original.hour(),
        minute: original.minute(),
        second: original.second()
      });
      return s
    },

    //these are helpful name-wrappers
    dayName: function (input, goFwd) {
      if (input === undefined) {
        return long()[this.day()]
      }
      let s = this.clone();
      s = s.day(input, goFwd);
      return s
    }
  };

  /* eslint-disable no-console */

  const clearMinutes = (s) => {
    s = s.minute(0);
    s = s.second(0);
    s = s.millisecond(1);
    return s
  };

  const methods$1 = {
    // day 0-366
    dayOfYear: function (num, goFwd) {
      if (num !== undefined) {
        let s = this.clone();
        s.epoch = dayOfYear(s, num, goFwd);
        return s
      }
      //days since newyears - jan 1st is 1, jan 2nd is 2...
      let sum = 0;
      let month = this.d.getMonth();
      let tmp;
      //count the num days in each month
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
      return sum + this.d.getDate()
    },

    //since the start of the year
    week: function (num, goFwd) {
      // week-setter
      if (num !== undefined) {
        let s = this.clone();
        s.epoch = week(this, num, goFwd);
        s = clearMinutes(s);
        return s
      }
      //find-out which week it is
      let tmp = this.clone();
      tmp = tmp.month(0);
      tmp = tmp.date(1);
      tmp = clearMinutes(tmp);
      tmp = tmp.day('monday');
      //don't go into last-year
      if (tmp.month() === 11 && tmp.date() >= 25) {
        tmp = tmp.add(1, 'week');
      }

      // is first monday the 1st?
      let toAdd = 1;
      if (tmp.date() === 1) {
        toAdd = 0;
      }
      tmp = tmp.minus(2, 'hours');
      const thisOne = this.epoch;
      //if the week technically hasn't started yet
      if (tmp.epoch > thisOne) {
        return 1
      }
      //speed it up, if we can
      let i = 0;
      let skipWeeks = this.month() * 4;
      tmp.epoch += o.week * skipWeeks;
      i += skipWeeks;
      for (; i <= 52; i++) {
        if (tmp.epoch > thisOne) {
          return i + toAdd
        }
        tmp = tmp.add(1, 'week');
      }
      return 52
    },
    //either name or number
    month: function (input, goFwd) {
      if (input !== undefined) {
        let s = this.clone();
        s.epoch = month(s, input, goFwd);
        return s
      }
      return this.d.getMonth()
    },
    //'january'
    monthName: function (input, goFwd) {
      if (input !== undefined) {
        let s = this.clone();
        s = s.month(input, goFwd);
        return s
      }
      return long$1()[this.month()]
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
          return s
        }
      }
      let month = this.d.getMonth();
      for (let i = 1; i < quarters.length; i++) {
        if (month < quarters[i][0]) {
          return i - 1
        }
      }
      return 4
    },

    //spring, summer, winter, fall
    season: function (input, goFwd) {
      let hem = 'north';
      if (this.hemisphere() === 'South') {
        hem = 'south';
      }
      if (input !== undefined) {    // setter
        let s = this.clone();
        for (let i = 0; i < seasons$1[hem].length; i++) {
          if (input === seasons$1[hem][i][0]) {
            s = s.month(seasons$1[hem][i][1], goFwd);
            s = s.date(1);
            s = s.startOf('day');
          }
        }
        return s
      }
      let month = this.d.getMonth();
      for (let i = 0; i < seasons$1[hem].length - 1; i++) {
        if (month >= seasons$1[hem][i][1] && month < seasons$1[hem][i + 1][1]) {
          return seasons$1[hem][i][0]
        }
      }
      return hem === 'north' ? 'winter' : 'summer'
    },

    //the year number
    year: function (num) {
      if (num !== undefined) {
        let s = this.clone();
        s.epoch = year(s, num);
        return s
      }
      return this.d.getFullYear()
    },

    //bc/ad years
    era: function (str) {
      if (str !== undefined) {
        let s = this.clone();
        str = str.toLowerCase();
        //TODO: there is no year-0AD i think. may have off-by-1 error here
        let year$1 = s.d.getFullYear();
        //make '1992' into 1992bc..
        if (str === 'bc' && year$1 > 0) {
          s.epoch = year(s, year$1 * -1);
        }
        //make '1992bc' into '1992'
        if (str === 'ad' && year$1 < 0) {
          s.epoch = year(s, year$1 * -1);
        }
        return s
      }
      if (this.d.getFullYear() < 0) {
        return 'BC'
      }
      return 'AD'
    },

    // 2019 -> 2010
    decade: function (input) {
      if (input !== undefined) {
        input = String(input);
        input = input.replace(/([0-9])'?s$/, '$1'); //1950's
        input = input.replace(/([0-9])(th|rd|st|nd)/, '$1'); //fix ordinals
        if (!input) {
          console.warn('Spacetime: Invalid decade input');
          return this
        }
        // assume 20th century?? for '70s'.
        if (input.length === 2 && /[0-9][0-9]/.test(input)) {
          input = '19' + input;
        }
        let year = Number(input);
        if (isNaN(year)) {
          return this
        }
        // round it down to the decade
        year = Math.floor(year / 10) * 10;
        return this.year(year) //.startOf('decade')
      }
      return this.startOf('decade').year()
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
            return b
          });
          input = input.replace(/c$/, ''); //20thC
        }
        let year = Number(input);
        if (isNaN(input)) {
          console.warn('Spacetime: Invalid century input');
          return this
        }
        // there is no century 0
        if (year === 0) {
          year = 1;
        }
        if (year >= 0) {
          year = (year - 1) * 100;
        } else {
          year = (year + 1) * 100;
        }
        return this.year(year)
      }
      // century getter
      let num = this.startOf('century').year();
      num = Math.floor(num / 100);
      if (num < 0) {
        return num - 1
      }
      return num + 1
    },
    // 2019 -> 2+1
    millenium: function (input) {
      if (input !== undefined) {
        if (typeof input === 'string') {
          input = input.replace(/([0-9])(th|rd|st|nd)/, '$1'); //fix ordinals
          input = Number(input);
          if (isNaN(input)) {
            console.warn('Spacetime: Invalid millenium input');
            return this
          }
        }
        if (input > 0) {
          input -= 1;
        }
        let year = input * 1000;
        // there is no year 0
        if (year === 0) {
          year = 1;
        }
        return this.year(year)
      }
      // get the current millenium
      let num = Math.floor(this.year() / 1000);
      if (num >= 0) {
        num += 1;
      }
      return num
    }
  };

  const methods = Object.assign({}, methods$3, methods$2, methods$1);

  //aliases
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

  const getMonthLength = function (month, year) {
    if (month === 1 && isLeapYear(year)) {
      return 29
    }
    return monthLengths[month]
  };

  //month is the one thing we 'model/compute'
  //- because ms-shifting can be off by enough
  const rollMonth = (want, old) => {
    //increment year
    if (want.month > 0) {
      let years = parseInt(want.month / 12, 10);
      want.year = old.year() + years;
      want.month = want.month % 12;
    } else if (want.month < 0) {
      let m = Math.abs(want.month);
      let years = parseInt(m / 12, 10);
      if (m % 12 !== 0) {
        years += 1;
      }
      want.year = old.year() - years;
      //ignore extras
      want.month = want.month % 12;
      want.month = want.month + 12;
      if (want.month === 12) {
        want.month = 0;
      }
    }
    return want
  };

  // briefly support day=-2 (this does not need to be perfect.)
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
    return want
  };

  // briefly support day=33 (this does not need to be perfect.)
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
    return want
  };

  const months = rollMonth;
  const days = rollDaysUp;
  const daysBack = rollDaysDown;

  // this logic is a bit of a mess,
  // but briefly:
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
  keep.quarter = keep.date;

  // Units need to be dst adjuested
  const dstAwareUnits = {
    year: true,
    quarter: true,
    season: true,
    month: true,
    week: true,
    date: true
  };

  const keepDate = {
    month: true,
    quarter: true,
    season: true,
    year: true
  };

  const addMethods$3 = (SpaceTime) => {
    SpaceTime.prototype.add = function (num, unit) {
      let s = this.clone();

      if (!unit || num === 0) {
        return s //don't bother
      }
      let old = this.clone();
      unit = normalize$3(unit);
      if (unit === 'millisecond') {
        s.epoch += num;
        return s
      }
      // support 'fortnight' alias
      if (unit === 'fortnight') {
        num *= 2;
        unit = 'week';
      }
      //move forward by the estimated milliseconds (rough)
      if (o[unit]) {
        s.epoch += o[unit] * num;
      } else if (unit === 'week' || unit === 'weekend') {
        s.epoch += o.day * (num * 7);
      } else if (unit === 'quarter' || unit === 'season') {
        s.epoch += o.month * (num * 3);
      } else if (unit === 'quarterhour') {
        s.epoch += o.minute * 15 * num;
      }
      //now ensure our milliseconds/etc are in-line
      let want = {};
      if (keep[unit]) {
        keep[unit].forEach((u) => {
          want[u] = old[u]();
        });
      }

      if (dstAwareUnits[unit]) {
        const diff = old.timezone().current.offset - s.timezone().current.offset;
        s.epoch += diff * 3600 * 1000;
      }

      //ensure month/year has ticked-over
      if (unit === 'month') {
        want.month = old.month() + num;
        //month is the one unit we 'model' directly
        want = months(want, old);
      }
      //support coercing a week, too
      if (unit === 'week') {
        let sum = old.date() + (num * 7);
        if (sum <= 28 && sum > 1) {
          want.date = sum;
        }
      }
      if (unit === 'weekend' && s.dayName() !== 'saturday') {
        s = s.day('saturday', true); //ensure it's saturday
      }
      //support 25-hour day-changes on dst-changes
      else if (unit === 'date') {
        if (num < 0) {
          want = daysBack(want, old, num);
        } else {
          //specify a naive date number, if it's easy to do...
          let sum = old.date() + num;
          // ok, model this one too
          want = days(want, old, sum);
        }
        //manually punt it if we haven't moved at all..
        if (num !== 0 && old.isSame(s, 'day')) {
          want.date = old.date() + num;
        }
      }
      // ensure a quarter is 3 months over
      else if (unit === 'quarter') {
        want.month = old.month() + (num * 3);
        want.year = old.year();
        // handle rollover
        if (want.month < 0) {
          let years = Math.floor(want.month / 12);
          let remainder = want.month + (Math.abs(years) * 12);
          want.month = remainder;
          want.year += years;
        } else if (want.month >= 12) {
          let years = Math.floor(want.month / 12);
          want.month = want.month % 12;
          want.year += years;
        }
        want.date = old.date();
      }
      //ensure year has changed (leap-years)
      else if (unit === 'year') {
        let wantYear = old.year() + num;
        let haveYear = s.year();
        if (haveYear < wantYear) {
          let toAdd = Math.floor(num / 4) || 1; //approx num of leap-days
          s.epoch += Math.abs(o.day * toAdd);
        } else if (haveYear > wantYear) {
          let toAdd = Math.floor(num / 4) || 1; //approx num of leap-days
          s.epoch += o.day * toAdd;
        }
      }
      //these are easier
      else if (unit === 'decade') {
        want.year = s.year() + 10;
      } else if (unit === 'century') {
        want.year = s.year() + 100;
      }
      //keep current date, unless the month doesn't have it.
      if (keepDate[unit]) {
        let max = monthLengths[want.month];
        want.date = old.date();
        if (want.date > max) {
          want.date = max;
        }
      }
      if (Object.keys(want).length > 1) {
        walkTo(s, want);
      }
      return s
    };

    //subtract is only add *-1
    SpaceTime.prototype.subtract = function (num, unit) {
      let s = this.clone();
      return s.add(num * -1, unit)
    };
    //add aliases
    SpaceTime.prototype.minus = SpaceTime.prototype.subtract;
    SpaceTime.prototype.plus = SpaceTime.prototype.add;
  };

  //make a string, for easy comparison between dates
  const print = {
    millisecond: (s) => {
      return s.epoch
    },
    second: (s) => {
      return [s.year(), s.month(), s.date(), s.hour(), s.minute(), s.second()].join('-')
    },
    minute: (s) => {
      return [s.year(), s.month(), s.date(), s.hour(), s.minute()].join('-')
    },
    hour: (s) => {
      return [s.year(), s.month(), s.date(), s.hour()].join('-')
    },
    day: (s) => {
      return [s.year(), s.month(), s.date()].join('-')
    },
    week: (s) => {
      return [s.year(), s.week()].join('-')
    },
    month: (s) => {
      return [s.year(), s.month()].join('-')
    },
    quarter: (s) => {
      return [s.year(), s.quarter()].join('-')
    },
    year: (s) => {
      return s.year()
    }
  };
  print.date = print.day;

  const addMethods$2 = (SpaceTime) => {
    SpaceTime.prototype.isSame = function (b, unit, tzAware = true) {
      let a = this;
      if (!unit) {
        return null
      }
      // support swapped params
      if (typeof b === 'string' && typeof unit === 'object') {
        let tmp = b;
        b = unit;
        unit = tmp;
      }
      if (typeof b === 'string' || typeof b === 'number') {
        b = new SpaceTime(b, this.timezone.name);
      }
      //support 'seconds' aswell as 'second'
      unit = unit.replace(/s$/, '');

      // make them the same timezone for proper comparison
      if (tzAware === true && a.tz !== b.tz) {
        b = b.clone();
        b.tz = a.tz;
      }
      if (print[unit]) {
        return print[unit](a) === print[unit](b)
      }
      return null
    };
  };

  const addMethods$1 = SpaceTime => {
    const methods = {
      isAfter: function (d) {
        d = beADate(d, this);
        let epoch = getEpoch(d);
        if (epoch === null) {
          return null
        }
        return this.epoch > epoch
      },
      isBefore: function (d) {
        d = beADate(d, this);
        let epoch = getEpoch(d);
        if (epoch === null) {
          return null
        }
        return this.epoch < epoch
      },
      isEqual: function (d) {
        d = beADate(d, this);
        let epoch = getEpoch(d);
        if (epoch === null) {
          return null
        }
        return this.epoch === epoch
      },
      isBetween: function (start, end, isInclusive = false) {
        start = beADate(start, this);
        end = beADate(end, this);
        let startEpoch = getEpoch(start);
        if (startEpoch === null) {
          return null
        }
        let endEpoch = getEpoch(end);
        if (endEpoch === null) {
          return null
        }
        if (isInclusive) {
          return this.isBetween(start, end) || this.isEqual(start) || this.isEqual(end);
        }
        return startEpoch < this.epoch && this.epoch < endEpoch
      }
    };

    //hook them into proto
    Object.keys(methods).forEach(k => {
      SpaceTime.prototype[k] = methods[k];
    });
  };

  const addMethods = SpaceTime => {
    const methods = {
      i18n: function (data) {
        //change the day names
        if (isObject(data.days)) {
          set$4(data.days);
        }
        //change the month names
        if (isObject(data.months)) {
          set$5(data.months);
        }

        //change the display style of the month / day names
        if (isBoolean(data.useTitleCase)) {
          set$3(data.useTitleCase);
        }

        //change am and pm strings
        if (isObject(data.ampm)) {
          set(data.ampm);
        }

        //change distance strings
        if(isObject(data.distance)){
          set$1(data.distance);
        }

        //change units strings
        if(isObject(data.units)){
          set$2(data.units);
        }

        return this
      }
    };

    //hook them into proto
    Object.keys(methods).forEach(k => {
      SpaceTime.prototype[k] = methods[k];
    });
  };

  let timezones$1 = all;
  // fake timezone-support, for fakers (es5 class)
  const SpaceTime = function (input, tz, options = {}) {
    // the holy moment
    this.epoch = null;
    // the shift for the given timezone
    this.tz = lookupTz(tz, timezones$1);
    // whether to output warnings to console
    this.silent = typeof options.silent !== 'undefined' ? options.silent : true;
    // favour british interpretation of 02/02/2018, etc
    this.british = options.dmy || options.british;

    // does the week start on sunday, or monday:
    this._weekStart = 1; // default to monday
    if (options.weekStart !== undefined) {
      this._weekStart = options.weekStart;
    }
    // the reference today date object, (for testing)
    this._today = {};
    if (options.today !== undefined) {
      this._today = options.today;
    }
    // dunno if this is a good idea, or not
    // Object.defineProperty(this, 'parsers', {
    //   enumerable: false,
    //   writable: true,
    //   value: parsers
    // })
    // add getter/setters
    Object.defineProperty(this, 'd', {
      // return a js date object
      get: function () {
        let offset = quickOffset(this);
        // every computer is somewhere- get this computer's built-in offset
        let bias = new Date(this.epoch).getTimezoneOffset() || 0;
        // movement
        let shift = bias + (offset * 60); //in minutes
        shift = shift * 60 * 1000; //in ms
        // remove this computer's offset
        let epoch = this.epoch + shift;
        let d = new Date(epoch);
        return d
      }
    });
    // add this data on the object, to allow adding new timezones
    Object.defineProperty(this, 'timezones', {
      get: () => timezones$1,
      set: (obj) => {
        timezones$1 = obj;
        return obj
      }
    });
    // parse the various formats
    let tmp = parseInput(this, input);
    this.epoch = tmp.epoch;
    if (tmp.tz) {
      this.tz = tmp.tz;
    }
  };

  // (add instance methods to prototype)
  Object.keys(methods$4).forEach((k) => {
    SpaceTime.prototype[k] = methods$4[k];
  });

  // ¯\_(ツ)_/¯
  SpaceTime.prototype.clone = function () {
    return new SpaceTime(this.epoch, this.tz, {
      silent: this.silent,
      weekStart: this._weekStart,
      today: this._today,
      parsers: this.parsers
    })
  };

  /**
   * @deprecated use toNativeDate()
   * @returns native date object at the same epoch
   */
  SpaceTime.prototype.toLocalDate = function () {
    return this.toNativeDate()
  };

  /**
   * @returns native date object at the same epoch
   */
  SpaceTime.prototype.toNativeDate = function () {
    return new Date(this.epoch)
  };

  // append more methods
  addMethods$4(SpaceTime);
  addMethods$3(SpaceTime);
  addMethods$2(SpaceTime);
  addMethods$1(SpaceTime);
  addMethods(SpaceTime);

  // const timezones = require('../data');

  const whereIts = (a, b) => {
    let start = new SpaceTime(null);
    let end = new SpaceTime(null);
    start = start.time(a);
    //if b is undefined, use as 'within one hour'
    if (b) {
      end = end.time(b);
    } else {
      end = start.add(59, 'minutes');
    }

    let startHour = start.hour();
    let endHour = end.hour();
    let tzs = Object.keys(start.timezones).filter((tz) => {
      if (tz.indexOf('/') === -1) {
        return false
      }
      let m = new SpaceTime(null, tz);
      let hour = m.hour();
      //do 'calendar-compare' not real-time-compare
      if (hour >= startHour && hour <= endHour) {
        //test minutes too, if applicable
        if (hour === startHour && m.minute() < start.minute()) {
          return false
        }
        if (hour === endHour && m.minute() > end.minute()) {
          return false
        }
        return true
      }
      return false
    });
    return tzs
  };

  var version$1 = '7.7.0';

  const main = (input, tz, options) => new SpaceTime(input, tz, options);

  // set all properties of a given 'today' object
  const setToday = function (s) {
    let today = s._today || {};
    Object.keys(today).forEach((k) => {
      s = s[k](today[k]);
    });
    return s
  };

  //some helper functions on the main method
  main.now = (tz, options) => {
    let s = new SpaceTime(new Date().getTime(), tz, options);
    s = setToday(s);
    return s
  };
  main.today = (tz, options) => {
    let s = new SpaceTime(new Date().getTime(), tz, options);
    s = setToday(s);
    return s.startOf('day')
  };
  main.tomorrow = (tz, options) => {
    let s = new SpaceTime(new Date().getTime(), tz, options);
    s = setToday(s);
    return s.add(1, 'day').startOf('day')
  };
  main.yesterday = (tz, options) => {
    let s = new SpaceTime(new Date().getTime(), tz, options);
    s = setToday(s);
    return s.subtract(1, 'day').startOf('day')
  };
  main.extend = function (obj = {}) {
    Object.keys(obj).forEach((k) => {
      SpaceTime.prototype[k] = obj[k];
    });
    return this
  };
  main.timezones = function () {
    let s = new SpaceTime();
    return s.timezones
  };
  main.max = function (tz, options) {
    let s = new SpaceTime(null, tz, options);
    s.epoch = 8640000000000000;
    return s
  };
  main.min = function (tz, options) {
    let s = new SpaceTime(null, tz, options);
    s.epoch = -8640000000000000;
    return s
  };

  //find tz by time
  main.whereIts = whereIts;
  main.version = version$1;

  //aliases:
  main.plugin = main.extend;

  // these should be added to model
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
    am: '9:00am', //tomorow am
    pm: '5:00pm',
    'early day': '8:00am',
    'late at night': '11:00pm'
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

    let s = main.now(context.timezone);
    let now = s.clone();
    // check for known-times (like 'today')
    let timeStr = time.not('in? the').text('reduced');
    timeStr = timeStr.replace(/^@/, '');//@4pm
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
      let d = main(context.today);
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
      let d = main(context.today);
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
  // these timezone abbreviations are wholly made-up by me, Spencer Kelly, with no expertise in geography
  // generated humbly from https://github.com/spencermountain/spacetime-informal

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
    'brasília': america$1 + 'Sao_Paulo',
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
  let iana$1 = main().timezones;
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
      if (input && input.month === 'sept') {
        input.month = 'sep';
      }
      // set it to the beginning of the given unit
      let d = main(input, context.timezone, { today: today, dmy: context.dmy });
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
        this.d = main(context.today, context.timezone);
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
    middle() {
      this.d = this.d.add(15, 'days');
      this.d = this.d.startOf('day');
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

  //yep,
  const jan$1 = 'january';
  const feb$1 = 'february';
  const mar$1 = 'march';
  const apr = 'april';
  const may$1 = 'may';
  const jun$1 = 'june';
  const jul = 'july';
  const aug = 'august';
  const sep$1 = 'september';
  const oct$1 = 'october';
  const nov$1 = 'november';
  const dec = 'december';

  var fixed = {
    'new years eve': [dec, 31],
    'new years': [jan$1, 1],
    'new years day': [jan$1, 1],
    'inauguration day': [jan$1, 20],
    'australia day': [jan$1, 26],
    'national freedom day': [feb$1, 1],
    'groundhog day': [feb$1, 2],
    'rosa parks day': [feb$1, 4],
    'valentines day': [feb$1, 14],
    'saint valentines day': [feb$1, 14],
    'st valentines day ': [feb$1, 14],
    'saint patricks day': [mar$1, 17],
    'st patricks day': [mar$1, 17],
    'april fools': [apr, 1],
    'april fools day': [apr, 1],
    'emancipation day': [apr, 16],
    'tax day': [apr, 15], //US
    'labour day': [may$1, 1],
    'cinco de mayo': [may$1, 5],
    'national nurses day': [may$1, 6],
    'harvey milk day': [may$1, 22],
    'victoria day': [may$1, 24],
    juneteenth: [jun$1, 19],
    'canada day': [jul, 1],
    'independence day': [jul, 4],
    'independents day': [jul, 4],
    'bastille day': [jul, 14],
    'purple heart day': [aug, 7],
    'womens equality day': [aug, 26],
    '16 de septiembre': [sep$1, 16],
    'dieciseis de septiembre': [sep$1, 16],
    'grito de dolores': [sep$1, 16],
    halloween: [oct$1, 31],
    'all hallows eve': [oct$1, 31],
    'day of the dead': [oct$1, 31], // Ranged holiday [nov, 2],
    'dia de muertos': [oct$1, 31], // Ranged holiday [nov, 2],
    'veterans day': [nov$1, 11],
    'st andrews day': [nov$1, 30],
    'saint andrews day': [nov$1, 30],
    'all saints day': [nov$1, 1],
    'all sts day': [nov$1, 1],
    'armistice day': [nov$1, 11],
    'rememberance day': [nov$1, 11],
    'christmas eve': [dec, 24],
    christmas: [dec, 25],
    xmas: [dec, 25],
    'boxing day': [dec, 26],
    'st stephens day': [dec, 26],
    'saint stephens day': [dec, 26],

    // Fixed religious and cultural holidays
    // Catholic + Christian
    epiphany: [jan$1, 6],
    'orthodox christmas day': [jan$1, 7],
    'orthodox new year': [jan$1, 14],
    'assumption of mary': [aug, 15],
    'all souls day': [nov$1, 2],
    'feast of the immaculate conception': [dec, 8],
    'feast of our lady of guadalupe': [dec, 12],

    // Kwanzaa
    kwanzaa: [dec, 26], // Ranged holiday [jan, 1],

    // Pagan / metal 🤘
    imbolc: [feb$1, 2],
    beltaine: [may$1, 1],
    lughnassadh: [aug, 1],
    samhain: [oct$1, 31]
  };

  // holidays that are the same date every year
  const fixedDates$1 = function (str, normal, year, tz) {
    if (fixed.hasOwnProperty(str) || fixed.hasOwnProperty(normal)) {
      let arr = fixed[str] || fixed[normal] || [];
      let s = main.now(tz);
      s = s.year(year);
      s = s.startOf('year');
      s = s.month(arr[0]);
      s = s.date(arr[1]);
      if (s.isValid()) {
        return s
      }
    }
    return null
  };
  var fixedDates$2 = fixedDates$1;

  //these are holidays on the 'nth weekday of month'
  const jan = 'january';
  const feb = 'february';
  const mar = 'march';
  // const apr = 'april'
  const may = 'may';
  const jun = 'june';
  // const jul = 'july'
  // const aug = 'august'
  const sep = 'september';
  const oct = 'october';
  const nov = 'november';
  // const dec = 'december'

  const mon = 'monday';
  // const tues = 'tuesday'
  // const wed = 'wednesday'
  const thurs = 'thursday';
  const fri = 'friday';
  // const sat = 'saturday'
  const sun = 'sunday';

  let holidays$3 = {
    'martin luther king day': [3, mon, jan], //[third monday in january],
    'presidents day': [3, mon, feb], //[third monday in february],

    'commonwealth day': [2, mon, mar], //[second monday in march],
    'mothers day': [2, sun, may], //[second Sunday in May],
    'fathers day': [3, sun, jun], //[third Sunday in June],
    'labor day': [1, mon, sep], //[first monday in september],
    'columbus day': [2, mon, oct], //[second monday in october],
    'canadian thanksgiving': [2, mon, oct], //[second monday in october],
    thanksgiving: [4, thurs, nov], // [fourth Thursday in November],
    'black friday': [4, fri, nov] //[fourth friday in november],

    // 'memorial day': [may], //[last monday in may],
    // 'us election': [nov], // [Tuesday following the first Monday in November],
    // 'cyber monday': [nov]
    // 'advent': [] // fourth Sunday before Christmas
  };

  // add aliases
  holidays$3['turday day'] = holidays$3.thanksgiving;
  holidays$3['indigenous peoples day'] = holidays$3['columbus day'];
  holidays$3['mlk day'] = holidays$3['martin luther king day'];
  var calendar = holidays$3;

  // holidays that are the same date every year
  const fixedDates = function (str, normal, year, tz) {
    if (calendar.hasOwnProperty(str) || calendar.hasOwnProperty(normal)) {
      let arr = calendar[str] || calendar[normal] || [];
      let s = main.now(tz);
      s = s.year(year);

      // [3rd, 'monday', 'january']
      s = s.month(arr[2]);
      s = s.startOf('month');
      // make it january
      let month = s.month();

      // make it the 1st monday
      s = s.day(arr[1]);
      if (s.month() !== month) {
        s = s.add(1, 'week');
      }
      // make it nth monday
      if (arr[0] > 1) {
        s = s.add(arr[0] - 1, 'week');
      }
      if (s.isValid()) {
        return s
      }
    }

    return null
  };
  var nthWeekday = fixedDates;

  // https://www.timeanddate.com/calendar/determining-easter-date.html

  let dates$2 = {
    easter: 0,
    'ash wednesday': -46, // (46 days before easter)
    'palm sunday': 7, // (1 week before easter)
    'maundy thursday': -3, // (3 days before easter)
    'good friday': -2, // (2 days before easter)
    'holy saturday': -1, // (1 days before easter)
    'easter saturday': -1, // (1 day before easter)
    'easter monday': 1, // (1 day after easter)
    'ascension day': 39, // (39 days after easter)
    'whit sunday': 49, // / pentecost (49 days after easter)
    'whit monday': 50, // (50 days after easter)
    'trinity sunday': 65, // (56 days after easter)
    'corpus christi': 60, // (60 days after easter)

    'mardi gras': -47 //(47 days before easter)
  };
  dates$2['easter sunday'] = dates$2.easter;
  dates$2.pentecost = dates$2['whit sunday'];
  dates$2.whitsun = dates$2['whit sunday'];

  var holidays$2 = dates$2;

  // by John Dyer
  // based on the algorithm by Oudin (1940) from http://www.tondering.dk/claus/cal/easter.php
  const calcEaster = function (year) {
    let f = Math.floor,
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
    return month + ' ' + date
  };

  var calcEaster$1 = calcEaster;

  //calculate any holidays based on easter
  const easterDates = function (str, normal, year, tz) {
    if (holidays$2.hasOwnProperty(str) || holidays$2.hasOwnProperty(normal)) {
      let days = holidays$2[str] || holidays$2[normal] || [];

      let date = calcEaster$1(year);
      if (!date) {
        return null //no easter for this year
      }
      let e = main(date, tz);
      e = e.year(year);

      let s = e.add(days, 'day');
      if (s.isValid()) {
        return s
      }
    }
    return null
  };
  var easterDates$1 = easterDates;

  // http://www.astropixels.com/ephemeris/soleq2001.html

  // years 2000-2100
  const exceptions = {
    spring: [
      2003,
      2007,
      2044,
      2048,
      2052,
      2056,
      2060,
      2064,
      2068,
      2072,
      2076,
      2077,
      2080,
      2081,
      2084,
      2085,
      2088,
      2089,
      2092,
      2093,
      2096,
      2097
    ],
    summer: [
      2021,
      2016,
      2020,
      2024,
      2028,
      2032,
      2036,
      2040,
      2041,
      2044,
      2045,
      2048,
      2049,
      2052,
      2053,
      2056,
      2057,
      2060,
      2061,
      2064,
      2065,
      2068,
      2069,
      2070,
      2072,
      2073,
      2074,
      2076,
      2077,
      2078,
      2080,
      2081,
      2082,
      2084,
      2085,
      2086,
      2088,
      2089,
      2090,
      2092,
      2093,
      2094,
      2096,
      2097,
      2098,
      2099
    ],
    fall: [
      2002,
      2003,
      2004,
      2006,
      2007,
      2010,
      2011,
      2014,
      2015,
      2018,
      2019,
      2022,
      2023,
      2026,
      2027,
      2031,
      2035,
      2039,
      2043,
      2047,
      2051,
      2055,
      2059,
      2092,
      2096
    ],
    winter: [
      2002,
      2003,
      2006,
      2007,
      2011,
      2015,
      2019,
      2023,
      2027,
      2031,
      2035,
      2039,
      2043,
      2080,
      2084,
      2088,
      2092,
      2096
    ]
  };

  const winter20th = [2080, 2084, 2088, 2092, 2096];

  const calcSeasons = function (year) {
    // most common defaults
    let res = {
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
    }
    // winter can be 20th, 21st, or 22nd
    if (exceptions.winter.indexOf(year) !== -1) {
      res.winter = 'Dec 22 ' + year;
    }
    if (winter20th.indexOf(year) !== -1) {
      res.winter = 'Dec 20 ' + year;
    }
    return res
  };
  var calcSeasons$1 = calcSeasons;

  // these are properly calculated in ./lib/seasons
  let dates$1 = {
    'spring equinox': 'spring',
    'summer solistice': 'summer',
    'fall equinox': 'fall',
    'winter solstice': 'winter'
  };

  // aliases
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

  var holidays$1 = dates$1;

  const astroDates = function (str, normal, year, tz) {
    if (holidays$1.hasOwnProperty(str) || holidays$1.hasOwnProperty(normal)) {
      let season = holidays$1[str] || holidays$1[normal];
      let seasons = calcSeasons$1(year);
      if (!season || !seasons || !seasons[season]) {
        return null // couldn't figure it out
      }
      let s = main(seasons[season], tz);
      if (s.isValid()) {
        return s
      }
    }

    return null
  };
  var astroDates$1 = astroDates;

  let dates$3 = {
    // Muslim holidays
    'isra and miraj': 'april 13',
    'lailat al-qadr': 'june 10',
    'eid al-fitr': 'june 15',
    'id al-Fitr': 'june 15',
    'eid ul-Fitr': 'june 15',
    ramadan: 'may 16', // Range holiday
    'eid al-adha': 'sep 22',
    muharram: 'sep 12',
    'prophets birthday': 'nov 21'
  };
  var holidays$4 = dates$3;

  // (lunar year is 354.36 days)
  const dayDiff = -10.64;

  const lunarDates = function (str, normal, year, tz) {
    if (holidays$4.hasOwnProperty(str) || holidays$4.hasOwnProperty(normal)) {
      let date = holidays$4[str] || holidays$4[normal] || [];
      if (!date) {
        return null
      }
      // start at 2018
      let s = main(date + ' 2018', tz);
      let diff = year - 2018;
      let toAdd = diff * dayDiff;
      s = s.add(toAdd, 'day');
      s = s.startOf('day');

      // now set the correct year
      s = s.year(year);

      if (s.isValid()) {
        return s
      }
    }
    return null
  };
  var lunarDates$1 = lunarDates;

  const nowYear = main.now().year();

  const spacetimeHoliday = function (str, year, tz) {
    year = year || nowYear;
    str = str || '';
    str = String(str);
    str = str.trim().toLowerCase();
    str = str.replace(/'s/, 's'); // 'mother's day'

    let normal = str.replace(/ day$/, '');
    normal = normal.replace(/^the /, '');
    normal = normal.replace(/^orthodox /, ''); //orthodox good friday

    // try easier, unmoving holidays
    let s = fixedDates$2(str, normal, year, tz);
    if (s !== null) {
      return s
    }
    // try 'nth monday' holidays
    s = nthWeekday(str, normal, year, tz);
    if (s !== null) {
      return s
    }
    // easter-based holidays
    s = easterDates$1(str, normal, year, tz);
    if (s !== null) {
      return s
    }
    // solar-based holidays
    s = astroDates$1(str, normal, year, tz);
    if (s !== null) {
      return s
    }
    // mostly muslim holidays
    s = lunarDates$1(str, normal, year, tz);
    if (s !== null) {
      return s
    }

    return null
  };

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
      let s = main(str, context.timezone, { today: fmtToday(context) });
      let unit = new Season(s, null, context);
      if (unit.d.isValid() === true) {
        return unit
      }
    }

    // support 'q4 2020'
    m = doc.match('[<q>#FinancialQuarter] [<year>#Year?]');
    if (m.found) {
      let str = m.groups('q').text('reduced');
      let s = main(str, context.timezone, { today: fmtToday(context) });
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
      let s = main(`q${q}`, context.timezone, { today: fmtToday(context) });
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
      let s = main(null, context.timezone, { today: fmtToday(context) });
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

    // 'march 5th next year'
    m = doc.match('[<month>#Month] [<date>#Value+]? of? the? [<rel>(this|next|last|current)] year');
    if (m.found) {
      let rel = m.groups('rel').text('reduced');
      let year = impliedYear;
      if (rel === 'next') {
        year += 1;
      } else if (rel === 'last') {
        year -= 1;
      }
      let obj = {
        month: m.groups('month').text('reduced'),
        date: m.groups('date').numbers(0).get()[0],
        year,
      };
      if (obj.date === undefined) {
        obj.date = 1;
        let unit = new Month(obj, null, context);
        if (unit.d.isValid() === true) {
          return unit
        }
      }
      let unit = new CalendarDate(obj, null, context);
      if (unit.d.isValid() === true) {
        return unit
      }
    }

    // '5th of next month'
    m = doc.match('^the? [<date>#Value+]? of? [<rel>(this|next|last|current)] month');
    if (m.found) {
      let month = context.today.month();
      let rel = m.groups('rel').text('reduced');
      if (rel === 'next') {
        month += 1;
      } else if (rel === 'last') {
        month -= 1;
      }
      let obj = {
        month,
        date: m.groups('date').numbers(0).get()[0],
      };
      let unit = new CalendarDate(obj, null, context);
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
      // assume 'february' is always in the future
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

  const env$1 = typeof process === 'undefined' || !process.env ? self.env || {} : process.env;
  const log$1 = parts => {
    if (env$1.DEBUG_DATE) {
      // console.log(parts)// eslint-disable-line
      console.log(`\n==== '${parts.doc.text()}' =====`); // eslint-disable-line
      Object.keys(parts).forEach(k => {
        if (k !== 'doc' && parts[k]) {
          console.log(k, parts[k]); // eslint-disable-line
        }
      });
      parts.doc.debug(); // allow
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
      // month-ranges have some folksy rules
      match: 'between [<start>#Month] and [<end>#Month] [<year>#Year?]',
      desc: 'between march and jan',
      parse: (m, context) => {
        let { start, end, year } = m.groups();
        let y = year && year.found ? Number(year.text('reduced')) : context.today.year();
        let obj = { month: start.text('reduced'), year: y };
        let left = new Month(obj, null, context).start();
        obj = { month: end.text('reduced'), year: y };
        let right = new Month(obj, null, context).start();
        if (left.d.isAfter(right.d)) {
          return {
            start: right,
            end: left,
          }
        }
        return {
          start: left,
          end: right,
        }
      },
    },

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

    {
      // in 2 to 4 weeks
      match: '^in [<min>#Value] to [<max>#Value] [<unit>(days|weeks|months|years)]',
      desc: 'in 2 to 4 weeks',
      parse: (m, context) => {
        const { min, max, unit } = m.groups();

        let start = new CalendarDate(context.today, null, context);
        let end = start.clone();

        const duration = unit.text('implicit');
        start = start.applyShift({ [duration]: min.numbers().get()[0] });
        end = end.applyShift({ [duration]: max.numbers().get()[0] });

        return {
          start: start,
          end: end.end(),
        }
      },
    },
    {
      // 2 to 4 weeks ago
      match:
        '[<min>#Value] to [<max>#Value] [<unit>(days|weeks|months|years)] (ago|before|earlier|prior)',
      desc: '2 to 4 weeks ago',
      parse: (m, context) => {
        const { min, max, unit } = m.groups();

        let start = new CalendarDate(context.today, null, context);
        let end = start.clone();

        const duration = unit.text('implicit');
        start = start.applyShift({ [duration]: -max.numbers().get()[0] });
        end = end.applyShift({ [duration]: -min.numbers().get()[0] });

        return {
          start: start,
          end: end.end(),
        }
      },
    },



    {
      // implicit range
      match: '^until [<to>#Date+]',
      desc: 'until christmas',
      parse: (m, context) => {
        let to = m.groups('to');
        to = parseDate(to, context);
        if (to) {
          let start = new CalendarDate(context.today, null, context);
          return {
            start: start,
            end: to.start(),
          }
        }
        return null
      },
    },

    {
      // second half of march
      match: '[<part>(1st|initial|2nd|latter)] half of [<month>#Month] [<year>#Year?]',
      desc: 'second half of march',
      parse: (m, context) => {
        const { part, month, year } = m.groups();
        let obj = {
          month: month.text('reduced'),
          date: 1, //assume 1st
          year: year && year.found ? year.text('reduced') : context.today.year()
        };
        let unit = new Month(obj, null, context);
        if (part.has('(1st|initial)')) {
          return {
            start: unit.start(),
            end: unit.clone().middle(),
          }
        }
        return {
          start: unit.middle(),
          end: unit.clone().end(),
        }
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

  const env = typeof process === 'undefined' || !process.env ? self.env || {} : process.env;
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

  const normalize$1 = function (doc) {

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
    context.today = context.today || main.now(context.timezone);
    context.today = main(context.today, context.timezone);

    doc = normalize$1(doc);

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

  const quickDate = function (view, str) {
    let tmp = view.fromText(str);
    let found = parse$2(tmp, view.opts)[0];
    if (!found || !found.start || !found.start.d) {
      return null
    }
    return found.start.d
  };

  const api$2 = function (View) {
    class Dates extends View {
      constructor(document, pointer, groups, opts = {}) {
        super(document, pointer, groups);
        this.viewType = 'Dates';
        this.opts = Object.assign({}, opts);
      }

      get(n) {
        let all = [];
        this.forEach(m => {
          parse$2(m, this.opts).forEach(res => {
            let json = toJSON(res);
            if (json.start) {
              all.push(json);
            }
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
          if (opts && opts.dates !== false) {
            let parsed = parse$2(m, this.opts);
            if (parsed.length > 0) {
              json.dates = toJSON(parsed[0]);
            }
          }
          return json
        }, [])
      }

      /** replace date terms with a formatted date */
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

      /** return only dates occuring before a given date  */
      isBefore(iso) {
        let pivot = quickDate(this, iso);
        return this.filter(m => {
          let obj = parse$2(m, this.opts)[0] || {};
          return obj.start && obj.start.d && obj.start.d.isBefore(pivot)
        })
      }
      /** return only dates occuring after a given date  */
      isAfter(iso) {
        let pivot = quickDate(this, iso);
        return this.filter(m => {
          let obj = parse$2(m, this.opts)[0] || {};
          return obj.start && obj.start.d && obj.start.d.isAfter(pivot)
        })
      }
      /** return only dates occuring after a given date  */
      isSame(unit, iso) {
        let pivot = quickDate(this, iso);
        return this.filter(m => {
          let obj = parse$2(m, this.opts)[0] || {};
          return obj.start && obj.start.d && obj.start.d.isSame(pivot, unit)
        })
      }
    }

    View.prototype.dates = function (opts) {
      let m = findDate(this);
      return new Dates(this.document, m.pointer, null, opts)
    };
  };

  const normalize = function (doc) {
    doc = doc.clone();
    // 'four thirty' -> 4:30
    let m = doc.match('#Time+').match('[<hour>#Cardinal] [<min>(thirty|fifteen)]');
    if (m.found) {
      let hour = m.groups('hour');
      let min = m.groups('min');
      let num = hour.values().get()[0];
      if (num > 0 && num <= 12) {
        let mins = min.values().get()[0];
        let str = `${num}:${mins}`;
        m.replaceWith(str);
      }
    }

    if (!doc.numbers) {
      console.warn(`Warning: compromise .numbers() not loaded.\n   This plugin requires >= v14`); //eslint-disable-line
    } else {
      // doc.numbers().normalize()
      // convert 'two' to 2
      let num = doc.numbers();
      num.toNumber();
      num.toCardinal(false);
    }
    // expand 'aug 20-21'
    if (doc.contractions) {
      doc.contractions().expand();
    }
    // remove adverbs
    doc.adverbs().remove();
    // 'week-end'
    doc.replace('week end', 'weekend', true).tag('Date');
    // 'a up to b'
    doc.replace('up to', 'upto', true).tag('Date');
    // 'a year ago'
    if (doc.has('once (a|an) #Duration') === false) {
      doc.match('[(a|an)] #Duration', 0).replaceWith('1').compute('lexicon');
      // tagger(doc)
    }
    // 'in a few years'
    // m = doc.match('in [a few] #Duration')
    // if (m.found) {
    //   m.groups('0').replaceWith('2')
    //   tagger(doc)
    // }
    // jan - feb
    doc.match('@hasDash').insertAfter('to').tag('Date');
    return doc
  };

  const find = function (doc) {
    return doc.match('#Time+ (am|pm)?')
  };

  const parse$1 = function (m, context = {}) {
    m = normalize(m);
    let res = parseTime(m, context);
    if (!res.result) {
      return { time: null, '24h': null }
    }
    let s = main.now().time(res.result);
    return {
      time: res.result,
      '24h': s.format('time-24'),
      hour: s.hour(),
      minute: s.minute(),
    }
  };

  const getNth = (doc, n) => (typeof n === 'number' ? doc.eq(n) : doc);

  const api$1 = function (View) {
    class Times extends View {
      constructor(document, pointer, groups, opts) {
        super(document, pointer, groups);
        this.viewType = 'Times';
        this.opts = opts || {};
      }

      format(fmt) {
        let found = this;
        let res = found.map(m => {
          let obj = parse$1(m) || {};
          if (obj.time) {
            let s = main.now().time(obj.time);
            let str = obj.time;
            if (fmt === '24h') {
              str = s.format('time-24');
            } else {
              str = s.format(fmt);
            }
            m = m.not('#Preposition');
            m.replaceWith(str);
          }
          return m
        });
        return new Times(this.document, res.pointer, null, this.opts)
      }

      get(n) {
        return getNth(this, n).map(parse$1)
      }

      json(opts = {}) {
        return this.map(m => {
          let json = m.toView().json(opts)[0] || {};
          if (opts && opts.time !== false) {
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
          if (opts && opts.duration !== false) {
            json.duration = parse(m);
          }
          return json
        }, [])
      }
      /** easy getter for the time */
      get(options) {
        let arr = [];
        this.forEach(doc => {
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
  const sections = '(start|end|middle|starting|ending|midpoint|beginning|mid)'; //2
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
    // { match: '#TextValue #TextValue', if: '#Date', tag: '#Date', reason: 'textvalue-date' },
    //two thursdays back
    { match: '#Value (#WeekDay|#Duration) back', tag: '#Date', reason: '3-back' },
    //for 4 months
    { match: 'for #Value #Duration', tag: 'Date', reason: 'for-x-duration' },
    //two days before
    { match: '#Value #Duration (before|ago|hence|back)', tag: 'Date', reason: 'val-duration-past' },
    //for four days
    { match: `${preps}? #Value #Duration`, tag: 'Date', reason: 'value-duration' },
    // 6-8 months
    { match: 'in? #Value to #Value #Duration time?', tag: 'Date', reason: '6-to-8-years' },
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
    { match: `#Preposition? the? ${sections} of #Date`, tag: 'Date', reason: 'section-of' },
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
    // mid-august
    { match: `[${sections}] #Date`, group: 0, tag: 'Date', reason: 'mid-sept' },

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
    { match: 'between #Date+ and #Date+', tag: 'Date', reason: 'between x and y3' },
    { match: '#Month and #Month #Year', tag: 'Date', reason: 'x and y4' },
    //day after next
    { match: 'the? #Date after next one?', tag: 'Date', reason: 'day after next' },
    //approximately...
    { match: '(about|approx|approximately|around) #Date', tag: 'Date', reason: 'approximately june' },

    // until june
    {
      match: '(by|until|on|in|at|during|over|every|each|due) the? #Date',
      ifNo: '#PhrasalVerb',
      tag: 'Date',
      reason: 'until june',
    },
    // until last june
    {
      match: '(by|until|after|before|during|on|in|following|since) (next|this|last)? #Date',
      ifNo: '#PhrasalVerb',
      tag: 'Date',
      reason: 'until last june',
    },

    //next september
    {
      match: 'this? (last|next|past|this|previous|current|upcoming|coming|the) #Date',
      tag: 'Date',
      reason: 'next september',
    },
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
    {
      match: '(5|10|15|20|five|ten|fifteen|quarter|twenty|half) (after|past) #Cardinal',
      tag: 'Time',
      reason: 'ten to seven',
    }, //add check for 1 to 1 etc.
    // at 10 past
    {
      match: '(at|by|before) (5|10|15|20|five|ten|fifteen|twenty|quarter|half) (after|past|to)',
      tag: 'Time',
      reason: 'at-20-past',
    },
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
    {
      match: '(at|around|near|#Date) [#Cardinal (thirty|fifteen) (am|pm)?]',
      group: 0,
      tag: 'Time',
      reason: 'around four thirty',
    },
    // four thirty am
    { match: '#Cardinal (thirty|fifteen) (am|pm)', tag: 'Time', reason: 'four thirty am' },
    // four thirty tomorrow
    { match: '[#Cardinal (thirty|fifteen)] #Date', group: 0, tag: 'Time', reason: 'four thirty tomorrow' },
    //anytime around 3
    { match: '(anytime|sometime) (before|after|near) [#Cardinal]', group: 0, tag: 'Time', reason: 'antime-after-3' },

    //'two days before'/ 'nine weeks frow now'
    {
      match: '(#Cardinal|a|an) #Duration (before|after|ago|from|hence|back)',
      tag: 'DateShift',
      reason: 'nine weeks frow now',
    },
    // in two weeks
    { match: 'in (around|about|maybe|perhaps)? #Cardinal #Duration', tag: 'DateShift', reason: 'in two weeks' },
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
    // { match: '#Cardinal #Duration and? #DateShift', tag: 'DateShift', reason: 'three days before' },
    // { match: '#DateShift and #Cardinal #Duration', tag: 'DateShift', reason: 'date-shift' },
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
    // 18th next month
    { match: '#Value of? (this|next|last) #Date', tag: 'Date' },
    // first half of march
    { match: '(first|initial|second|latter) half of #Month', tag: 'Date' },
  ];

  let net = null;

  const doMatches = function (view) {
    let { world } = view;
    net = net || world.methods.one.buildNet(matches, world);
    view.sweep(net);
  };

  // run each of the taggers
  const compute = function (view) {
    view.cache();
    doMatches(view);
    doMatches(view); // do it twice
    tagDates(view);
    timeTagger(view);
    tagTz(view);
    fixUp(view);
    view.uncache();

    // sorry, one more
    view.match('#Cardinal #Duration and? #DateShift').tag('DateShift', 'three days before');
    view.match('#DateShift and #Cardinal #Duration').tag('DateShift', 'three days and two weeks');
    view.match('#Time [(sharp|on the dot)]').tag('Time', '4pm sharp');
    // view.match('in #Adverb #DateShift').tag('Date', 'in-around-2-weeks')

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
  let iana = main().timezones;
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
    [/^[0-9]+(min|sec|hr|d)s?$/i, 'Duration', '30min'],
    // 2012-06
    [/^[0-9]{4}-[0-9]{2}$/, 'Date', '2012-06'],
    // 13h30
    [/^[0-9]{2}h[0-9]{2}$/i, 'Time', '13h30'],
    // @4:30
    [/^@[0-9]+:[0-9]{2}$/, 'Time', '@5:30'],
    // @4pm
    [/^@[1-9]+(am|pm)$/, 'Time', '@5pm'],
    // 03/02
    [/^(?:0[1-9]|[12]\d|3[01])\/(?:0[1-9]|[12]\d|3[01])$/, 'Date', '03/02'],
    // iso-time
    // [/^[0-9]{4}[:-][0-9]{2}[:-][0-9]{2}T[0-9]/i, 'Time', 'iso-time-tag']

  ];

  var version = '3.7.1';

  /* eslint-disable no-console */

  const fmt = iso => (iso ? main(iso).format('{nice-day} {year}') : '-');

  // https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
  const reset = '\x1b[0m';

  //cheaper than requiring chalk
  const cli = {
    magenta: str => '\x1b[35m' + str + reset,
    cyan: str => '\x1b[36m' + str + reset,
    yellow: str => '\x1b[33m' + str + reset,
    dim: str => '\x1b[2m' + str + reset,
    i: str => '\x1b[3m' + str + reset,
  };

  const debug = function (view) {
    view.dates().forEach(m => {
      let res = m.dates().get()[0];

      console.log('\n────────');
      m.debug('highlight');

      let msg = '';
      if (res && res.start) {
        msg = '   ' + cli.magenta(fmt(res.start));
      }
      if (res && res.end) {
        msg += cli.dim('   →   ') + cli.cyan(fmt(res.end));
      }
      console.log(msg + '\n');
    });
  };

  var plugin = {
    tags,
    words: lex,
    compute: compute$1,
    api,
    mutate: world => {
      // add our regexes
      world.model.two.regexText = world.model.two.regexText || [];
      world.model.two.regexText = world.model.two.regexText.concat(regex);
      // add our debug('dates') method
      world.methods.one.debug = world.methods.one.debug || {};
      world.methods.one.debug.dates = debug;
    },
    hooks: ['dates'],
    version,
  };

  return plugin;

}));

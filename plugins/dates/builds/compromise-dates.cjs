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
      const isDuration = m.has('^#Duration+$') || m.has('^#Value #Duration+$');
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
    const result = {};
    let m = doc.none();
    let shift = doc.match('#DateShift+');
    if (shift.found === false) {
      return { res: result, m }
    }

    // '5 weeks'
    shift.match('#Cardinal #Duration').forEach((ts) => {
      const num = ts.match('#Cardinal').numbers().get()[0];
      if (num && typeof num === 'number') {
        const unit = parseUnit(ts);
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
      const unit = m.groups('unit').text('reduced');
      // unit = unit.replace(/s$/, '')
      const dir = m.groups('dir').text('reduced');
      if (dir === 'after') {
        result[unit] = 1;
      } else if (dir === 'before') {
        result[unit] = -1;
      }
    }

    // in half an hour
    m = shift.match('half (a|an) [#Duration]', 0);
    if (m.found) {
      const unit = parseUnit(m);
      result[unit] = 0.5;
    }

    // a couple years
    m = shift.match('a (few|couple) [#Duration]', 0);
    if (m.found) {
      const unit = parseUnit(m);
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
      const obj = m.groups();
      const num = obj.num.numbers().get()[0];
      const unit = obj.unit.text('reduced');
      const result = {
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
      const obj = m.groups();
      let dir = obj.dir.text('reduced');
      const unit = obj.unit.text('reduced');
      if (dir === 'initial') {
        dir = 'first';
      }
      if (dir === 'final') {
        dir = 'last';
      }
      const result = {
        unit: unit,
        dir: dir,
      };
      return { result, m }
    }

    return { result: null, m: doc.none() }
  };

  const e=(e,t,n)=>{const[r,a]=e.split("/"),[o,s]=a.split(":");return Date.UTC(n,r-1,o,s)-36e5*t},t=(t,n,r,a,o)=>{const s=new Date(t).getUTCFullYear(),i=e(n,o,s),u=e(r,a,s);return t>=i&&t<u};var n={"9|s":"2/dili,2/jayapura","9|n":"2/chita,2/khandyga,2/pyongyang,2/seoul,2/tokyo,2/yakutsk,11/palau,japan,rok","9.5|s|04/05:03->10/04:02":"4/adelaide,4/broken_hill,4/south,4/yancowinna","9.5|s":"4/darwin,4/north","8|s|03/13:01->10/02:00":"12/casey","8|s":"2/kuala_lumpur,2/makassar,2/singapore,4/perth,2/ujung_pandang,4/west,singapore","8|n":"2/brunei,2/hong_kong,2/irkutsk,2/kuching,2/macau,2/manila,2/shanghai,2/taipei,2/ulaanbaatar,2/chongqing,2/chungking,2/harbin,2/macao,2/ulan_bator,2/choibalsan,hongkong,prc,roc","8.75|s":"4/eucla","7|s":"12/davis,2/jakarta,9/christmas","7|n":"2/bangkok,2/barnaul,2/hovd,2/krasnoyarsk,2/novokuznetsk,2/novosibirsk,2/phnom_penh,2/pontianak,2/ho_chi_minh,2/tomsk,2/vientiane,2/saigon","6|s":"12/vostok","6|n":"2/bishkek,2/dhaka,2/omsk,2/thimphu,2/urumqi,9/chagos,2/dacca,2/kashgar,2/thimbu","6.5|n":"2/yangon,9/cocos,2/rangoon","5|s":"12/mawson,9/kerguelen","5|n":"2/almaty,2/aqtau,2/aqtobe,2/ashgabat,2/atyrau,2/dushanbe,2/karachi,2/oral,2/qyzylorda,2/qostanay,2/samarkand,2/tashkent,2/yekaterinburg,9/maldives,2/ashkhabad","5.75|n":"2/kathmandu,2/katmandu","5.5|n":"2/kolkata,2/colombo,2/calcutta","4|s":"9/reunion","4|n":"2/baku,2/dubai,2/muscat,2/tbilisi,2/yerevan,8/astrakhan,8/samara,8/saratov,8/ulyanovsk,8/volgograd,9/mahe,9/mauritius,2/volgograd","4.5|n":"2/kabul","3|s":"12/syowa,9/antananarivo","3|n|04/24:00->10/29:24":"0/cairo,egypt","3|n|03/29:03->10/25:04":"2/famagusta,2/nicosia,8/athens,8/bucharest,8/helsinki,8/kyiv,8/mariehamn,8/riga,8/sofia,8/tallinn,8/uzhgorod,8/vilnius,8/zaporozhye,8/nicosia,8/kiev,eet","3|n|03/29:02->10/25:03":"8/chisinau,8/tiraspol","3|n|03/29:00->10/24:24":"2/beirut","3|n|03/28:02->10/24:02":"2/gaza,2/hebron","3|n|03/27:02->10/25:02":"2/jerusalem,2/tel_aviv,israel","3|n":"0/addis_ababa,0/asmara,0/asmera,0/dar_es_salaam,0/djibouti,0/juba,0/kampala,0/mogadishu,0/nairobi,2/aden,2/amman,2/baghdad,2/bahrain,2/damascus,2/kuwait,2/qatar,2/riyadh,8/istanbul,8/kirov,8/minsk,8/moscow,8/simferopol,9/comoro,9/mayotte,2/istanbul,turkey,w-su","3.5|n":"2/tehran,iran","2|s|03/29:02->10/25:02":"12/troll","2|s":"0/gaborone,0/harare,0/johannesburg,0/lubumbashi,0/lusaka,0/maputo,0/maseru,0/mbabane","2|n|03/29:02->10/25:03":"0/ceuta,arctic/longyearbyen,8/amsterdam,8/andorra,8/belgrade,8/berlin,8/bratislava,8/brussels,8/budapest,8/busingen,8/copenhagen,8/gibraltar,8/ljubljana,8/luxembourg,8/madrid,8/malta,8/monaco,8/oslo,8/paris,8/podgorica,8/prague,8/rome,8/san_marino,8/sarajevo,8/skopje,8/stockholm,8/tirane,8/vaduz,8/vatican,8/vienna,8/warsaw,8/zagreb,8/zurich,3/jan_mayen,poland,cet,met","2|n":"0/blantyre,0/bujumbura,0/khartoum,0/kigali,0/tripoli,8/kaliningrad,libya","1|s":"0/brazzaville,0/kinshasa,0/luanda,0/windhoek","1|n|03/29:01->10/25:02":"3/canary,3/faroe,3/madeira,8/dublin,8/guernsey,8/isle_of_man,8/jersey,8/lisbon,8/london,3/faeroe,eire,8/belfast,gb-eire,gb,portugal,wet","1|n":"0/algiers,0/bangui,0/douala,0/lagos,0/libreville,0/malabo,0/ndjamena,0/niamey,0/porto-novo,0/tunis","14|n":"11/kiritimati","13|s":"11/apia,11/tongatapu","13|n":"11/enderbury,11/kanton,11/fakaofo","12|s|04/05:03->09/27:02":"12/mcmurdo,11/auckland,12/south_pole,nz","12|s":"11/fiji","12|n":"2/anadyr,2/kamchatka,2/srednekolymsk,11/funafuti,11/kwajalein,11/majuro,11/nauru,11/tarawa,11/wake,11/wallis,kwajalein","12.75|s|04/05:03->04/05:02":"11/chatham,nz-chat","11|s|04/05:03->10/04:02":"12/macquarie","11|s":"11/bougainville","11|n":"2/magadan,2/sakhalin,11/efate,11/guadalcanal,11/kosrae,11/noumea,11/pohnpei,11/ponape","11.5|n|04/05:03->10/04:02":"11/norfolk","10|s|04/05:03->10/04:02":"4/currie,4/hobart,4/melbourne,4/sydney,4/act,4/canberra,4/nsw,4/tasmania,4/victoria","10|s":"12/dumontdurville,4/brisbane,4/lindeman,11/port_moresby,4/queensland","10|n":"2/ust-nera,2/vladivostok,11/guam,11/saipan,11/chuuk,11/truk,11/yap","10.5|s|04/05:01->10/04:02":"4/lord_howe,4/lhi","0|s|02/15:03->03/22:02":"0/casablanca,0/el_aaiun","0|n|03/29:00->10/25:01":"3/azores","0|n|03/29:00->10/24:24":"1/scoresbysund","0|n":"0/abidjan,0/accra,0/bamako,0/banjul,0/bissau,0/conakry,0/dakar,0/freetown,0/lome,0/monrovia,0/nouakchott,0/ouagadougou,0/sao_tome,1/danmarkshavn,3/reykjavik,3/st_helena,13/gmt,13/utc,0/timbuktu,13/greenwich,13/uct,13/universal,13/zulu,gmt-0,gmt+0,gmt0,greenwich,iceland,uct,universal,utc,zulu,13/unknown,factory","-9|n|03/08:02->11/01:02":"1/adak,1/atka,us/aleutian","-9|n":"11/gambier","-9.5|n":"11/marquesas","-8|n|03/08:02->11/01:02":"1/anchorage,1/juneau,1/metlakatla,1/nome,1/sitka,1/yakutat,us/alaska","-8|n":"11/pitcairn","-7|n|03/08:02->11/01:02":"1/los_angeles,1/santa_isabel,1/tijuana,1/vancouver,1/ensenada,6/pacific,10/bajanorte,us/pacific-new,us/pacific","-7|n":"1/creston,1/dawson,1/dawson_creek,1/fort_nelson,1/hermosillo,1/mazatlan,1/phoenix,1/whitehorse,6/yukon,10/bajasur,us/arizona,mst","-6|s|04/04:22->09/05:22":"11/easter,7/easterisland","-6|n|04/07:02->10/27:02":"1/merida","-6|n|03/08:02->11/01:02":"1/boise,1/cambridge_bay,1/denver,1/edmonton,1/inuvik,1/north_dakota,1/ojinaga,1/ciudad_juarez,1/yellowknife,1/shiprock,6/mountain,navajo,us/mountain","-6|n":"1/bahia_banderas,1/belize,1/chihuahua,1/costa_rica,1/el_salvador,1/guatemala,1/managua,1/mexico_city,1/monterrey,1/regina,1/swift_current,1/tegucigalpa,11/galapagos,6/east-saskatchewan,6/saskatchewan,10/general","-5|s":"1/lima,1/rio_branco,1/porto_acre,5/acre","-5|n|03/08:02->11/01:02":"1/chicago,1/matamoros,1/menominee,1/rainy_river,1/rankin_inlet,1/resolute,1/winnipeg,1/indiana/knox,1/indiana/tell_city,1/north_dakota/beulah,1/north_dakota/center,1/north_dakota/new_salem,1/knox_in,6/central,us/central,us/indiana-starke","-5|n":"1/bogota,1/cancun,1/cayman,1/coral_harbour,1/eirunepe,1/guayaquil,1/jamaica,1/panama,1/atikokan,jamaica,est","-4|s|04/04:24->09/06:00":"1/santiago,7/continental","-4|s|03/22:24->10/05:00":"1/asuncion","-4|s":"1/campo_grande,1/cuiaba,1/la_paz,1/manaus,5/west","-4|n|03/08:02->11/01:02":"1/detroit,1/grand_turk,1/indiana,1/indianapolis,1/iqaluit,1/kentucky,1/louisville,1/montreal,1/nassau,1/new_york,1/nipigon,1/pangnirtung,1/port-au-prince,1/thunder_bay,1/toronto,1/indiana/marengo,1/indiana/petersburg,1/indiana/vevay,1/indiana/vincennes,1/indiana/winamac,1/kentucky/monticello,1/fort_wayne,1/indiana/indianapolis,1/kentucky/louisville,6/eastern,us/east-indiana,us/eastern,us/michigan","-4|n|03/08:00->11/01:01":"1/havana,cuba","-4|n":"1/anguilla,1/antigua,1/aruba,1/barbados,1/blanc-sablon,1/boa_vista,1/caracas,1/curacao,1/dominica,1/grenada,1/guadeloupe,1/guyana,1/kralendijk,1/lower_princes,1/marigot,1/martinique,1/montserrat,1/port_of_spain,1/porto_velho,1/puerto_rico,1/santo_domingo,1/st_barthelemy,1/st_kitts,1/st_lucia,1/st_thomas,1/st_vincent,1/tortola,1/virgin","-3|s":"1/argentina,1/buenos_aires,1/catamarca,1/cordoba,1/coyhaique,1/fortaleza,1/jujuy,1/mendoza,1/montevideo,1/punta_arenas,1/sao_paulo,12/palmer,12/rothera,3/stanley,1/argentina/la_rioja,1/argentina/rio_gallegos,1/argentina/salta,1/argentina/san_juan,1/argentina/san_luis,1/argentina/tucuman,1/argentina/ushuaia,1/argentina/comodrivadavia,1/argentina/buenos_aires,1/argentina/catamarca,1/argentina/cordoba,1/argentina/jujuy,1/argentina/mendoza,1/argentina/rosario,1/rosario,5/east","-3|n|03/08:02->11/01:02":"1/glace_bay,1/goose_bay,1/halifax,1/moncton,1/thule,3/bermuda,6/atlantic","-3|n":"1/araguaina,1/bahia,1/belem,1/cayenne,1/maceio,1/paramaribo,1/recife,1/santarem","-2|n|03/08:02->11/01:02":"1/miquelon","-2|n":"1/noronha,3/south_georgia,5/denoronha","-2.5|n|03/08:02->11/01:02":"1/st_johns,6/newfoundland","-1|n|03/29:00->10/24:24":"1/nuuk,1/godthab","-1|n":"3/cape_verde","-11|n":"11/midway,11/niue,11/pago_pago,11/samoa,us/samoa","-10|n":"11/honolulu,11/johnston,11/rarotonga,11/tahiti,us/hawaii,hst"},r=["africa","america","asia","atlantic","australia","brazil","canada","chile","europe","indian","mexico","pacific","antarctica","etc"];const a={};Object.keys(n).forEach(e=>{const t=e.split("|"),o={offset:Number(t[0]),hem:t[1]};t[2]&&(o.dst=t[2]);n[e].split(",").forEach(e=>{e=e.replace(/(^[0-9]+)\//,(e,t)=>(t=Number(t),r[t]+"/")),a[e]=o;});}),a.utc={offset:0,hem:"n"};for(let e=-14;e<=14;e+=.5){let t=e;t>0&&(t="+"+t);let n="etc/gmt"+t;a[n]={offset:-1*e,hem:"n"},n="utc/gmt"+t,a[n]={offset:-1*e,hem:"n"};}const o=/(-?[0-9]+)h(rs)?/i,s=/(-?[0-9]+)/,i=/utc([\-+]?[0-9]+)/i,u=/gmt([\-+]?[0-9]+)/i,c=function(e){return (e=Number(e))>=-13&&e<=13?"etc/gmt"+(e=((e*=-1)>0?"+":"")+e):null};let h=(()=>{const e=(()=>{if("undefined"==typeof Intl||void 0===Intl.DateTimeFormat)return null;const e=Intl.DateTimeFormat();if(void 0===e||void 0===e.resolvedOptions)return null;const t=e.resolvedOptions().timeZone;return t?t.toLowerCase():null})();return null===e?"utc":e})();const l=Object.keys(a).reduce((e,t)=>{let n=t.split("/")[1]||"";return n=n.replace(/_/g," "),e[n]=t,e},{}),m=(e,t)=>{if(!e)return t.hasOwnProperty(h)||(console.warn(`Unrecognized IANA id '${h}'. Setting fallback tz to UTC.`),h="utc"),h;"string"!=typeof e&&console.error("Timezone must be a string - recieved: '",e,"'\n");let n=e.trim();if(n=n.toLowerCase(),true===t.hasOwnProperty(n))return n;if(n=(e=>(e=(e=(e=(e=(e=e.replace(/ time/g,"")).replace(/ (standard|daylight|summer)/g,"")).replace(/\b(east|west|north|south)ern/g,"$1")).replace(/\b(africa|america|australia)n/g,"$1")).replace(/\beuropean/g,"europe")).replace(/islands/g,"island"))(n),true===t.hasOwnProperty(n))return n;if(true===l.hasOwnProperty(n))return l[n];if(true===/[0-9]/.test(n)){const e=function(e){let t=e.match(o);if(null!==t)return c(t[1]);if(t=e.match(i),null!==t)return c(t[1]);if(t=e.match(u),null!==t){const e=-1*Number(t[1]);return c(e)}return t=e.match(s),null!==t?c(t[1]):null}(n);if(e)return e}throw new Error("Spacetime: Cannot find timezone named: '"+e+"'. Please enter an IANA timezone id.")};function d(e){return e%4==0&&e%100!=0||e%400==0}function f(e){return "[object Date]"===Object.prototype.toString.call(e)&&!isNaN(e.valueOf())}function p(e){return "[object Object]"===Object.prototype.toString.call(e)}function y(e,t=2){return (e+="").length>=t?e:new Array(t-e.length+1).join("0")+e}function g(e){const t=e%10,n=e%100;return 1===t&&11!==n?e+"st":2===t&&12!==n?e+"nd":3===t&&13!==n?e+"rd":e+"th"}function b(e){return e=(e=String(e)).replace(/([0-9])(st|nd|rd|th)$/i,"$1"),parseInt(e,10)}function k(e=""){return "day"===(e=(e=(e=(e=e.toLowerCase().trim()).replace(/ies$/,"y")).replace(/s$/,"")).replace(/-/g,""))||"days"===e?"date":"min"===e||"mins"===e?"minute":e}function w(e){return "number"==typeof e?e:f(e)?e.getTime():e.epoch||0===e.epoch?e.epoch:null}function v(e,t){return  false===p(e)?t.clone().set(e):e}function z(e,t=""){const n=e>0?"+":"-",r=Math.abs(e);return `${n}${y(parseInt(""+r,10))}${t}${y(r%1*60)}`}const _={year:(new Date).getFullYear(),month:0,date:1},$=["year","month","date","hour","minute","second","millisecond"];var j={parseArray:(e,t,n)=>{if(0===t.length)return e;for(let r=0;r<$.length;r++){const a=t[r]||n[$[r]]||_[$[r]]||0;e=e[$[r]](a);}return e},parseObject:(e,t)=>{if(0===Object.keys(t).length)return e;(t=Object.assign({},_,t)).timezone&&(e.tz=t.timezone);for(let n=0;n<$.length;n++){const r=$[n];void 0!==t[r]&&(e=e[r](t[r]));}return e},parseNumber:function(e,t){return t>0&&t<25e8&&false===e.silent&&(console.warn("  - Warning: You are setting the date to January 1970."),console.warn("       -   did input seconds instead of milliseconds?")),e.epoch=t,e}};const O=function(e){return e.epoch=Date.now(),Object.keys(e._today||{}).forEach(t=>{"function"==typeof e[t]&&(e=e[t](e._today[t]));}),e},D={now:e=>O(e),today:e=>O(e),tonight:e=>e=(e=O(e)).hour(18),tomorrow:e=>e=(e=(e=O(e)).add(1,"day")).startOf("day"),yesterday:e=>e=(e=(e=O(e)).subtract(1,"day")).startOf("day"),christmas:e=>{const t=O(e).year();return e=e.set([t,11,25,18,0,0])},"new years":e=>{const t=O(e).year();return e=e.set([t,11,31,18,0,0])}};D["new years eve"]=D["new years"];const M={millisecond:1,second:1e3,minute:6e4,hour:36e5,day:864e5};M.date=M.day,M.month=25488e5,M.week=6048e5,M.year=3154e7,Object.keys(M).forEach(e=>{M[e+"s"]=M[e];});const S=(e,t,n,r,a)=>{const o=e.d[n]();if(o===t)return;const s=null===a?null:e.d[a](),i=e.epoch,u=t-o;e.epoch+=M[r]*u,"day"===r&&Math.abs(u)>28&&t<28&&(e.epoch+=M.hour),null!==a&&s!==e.d[a]()&&(e.epoch=i);const c=M[r]/2;for(;e.d[n]()<t;)e.epoch+=c;for(;e.d[n]()>t;)e.epoch-=c;null!==a&&s!==e.d[a]()&&(e.epoch=i);},q={year:{valid:e=>e>-4e3&&e<4e3,walkTo:(e,t)=>S(e,t,"getFullYear","year",null)},month:{valid:e=>e>=0&&e<=11,walkTo:(e,t)=>{const n=e.d,r=n.getMonth(),a=e.epoch,o=n.getFullYear();if(r===t)return;const s=t-r;for(e.epoch+=M.day*(28*s),o!==e.d.getFullYear()&&(e.epoch=a);e.d.getMonth()<t;)e.epoch+=M.day;for(;e.d.getMonth()>t;)e.epoch-=M.day;}},date:{valid:e=>e>0&&e<=31,walkTo:(e,t)=>S(e,t,"getDate","day","getMonth")},hour:{valid:e=>e>=0&&e<24,walkTo:(e,t)=>S(e,t,"getHours","hour","getDate")},minute:{valid:e=>e>=0&&e<60,walkTo:(e,t)=>S(e,t,"getMinutes","minute","getHours")},second:{valid:e=>e>=0&&e<60,walkTo:(e,t)=>{e.epoch=e.seconds(t).epoch;}},millisecond:{valid:e=>e>=0&&e<1e3,walkTo:(e,t)=>{e.epoch=e.milliseconds(t).epoch;}}},N=(e,t)=>{const n=Object.keys(q),r=e.clone();for(let a=0;a<n.length;a++){const o=n[a];let s=t[o];if(void 0===s&&(s=r[o]()),"string"==typeof s&&(s=parseInt(s,10)),!q[o].valid(s))return e.epoch=null,void(false===e.silent&&console.warn("invalid "+o+": "+s));q[o].walkTo(e,s);}},I=[31,28,31,30,31,30,31,31,30,31,30,31];let T=["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"],C=["january","february","march","april","may","june","july","august","september","october","november","december"];function E(){return T}function A(){return function(){const e={sep:8};for(let t=0;t<T.length;t++)e[T[t]]=t;for(let t=0;t<C.length;t++)e[C[t]]=t;return e}()}const x=(e,t)=>{if(!t)return e;t=t.trim().toLowerCase();let n=0;if(/^[+-]?[0-9]{2}:[0-9]{2}$/.test(t)&&(true===/:00/.test(t)&&(t=t.replace(/:00/,"")),true===/:30/.test(t)&&(t=t.replace(/:30/,".5"))),/^[+-]?[0-9]{4}$/.test(t)&&(t=t.replace(/30$/,".5")),n=parseFloat(t),Math.abs(n)>100&&(n/=100),0===n||"Z"===t||"z"===t)return e.tz="etc/gmt",e;n*=-1,n>=0&&(n="+"+n);const r="etc/gmt"+n;return e.timezones[r]&&(e.tz=r),e},Y=(e,t="")=>{let n=(t=t.replace(/^\s+/,"").toLowerCase()).match(/([0-9]{1,2}):([0-9]{1,2}):?([0-9]{1,2})?[:.]?([0-9]{1,4})?/);if(null!==n){let[,r,a,o,s]=n;if(r=Number(r),r<0||r>24)return e.startOf("day");if(a=Number(a),n[2].length<2||a<0||a>59)return e.startOf("day");e=(e=(e=(e=e.hour(r)).minute(a)).seconds(o||0)).millisecond(function(e=""){return (e=String(e)).length>3?e=e.substring(0,3):1===e.length?e+="00":2===e.length&&(e+="0"),Number(e)||0}(s));const i=t.match(/[0-9] ?(am|pm)\b/);return null!==i&&i[1]&&(e=e.ampm(i[1])),e}if(n=t.match(/([0-9]+) ?(am|pm)/),null!==n&&n[1]){const t=Number(n[1]);return t>12||t<1?e.startOf("day"):e=(e=(e=e.hour(n[1]||0)).ampm(n[2])).startOf("hour")}return e=e.startOf("day")},F=A(),P=e=>{if(true!==I.hasOwnProperty(e.month))return  false;if(1===e.month)return !!(d(e.year)&&e.date<=29)||e.date<=28;const t=I[e.month]||0;return e.date<=t},L=(e="",t)=>{if(e=e.trim(),true===/^'[0-9][0-9]$/.test(e)){const t=Number(e.replace(/'/,""));return t>50?1900+t:2e3+t}let n=parseInt(e,10);return !n&&t&&(n=t.year),n=n||(new Date).getFullYear(),n},U=function(e){return "sept"===(e=e.toLowerCase().trim())?F.sep:F[e]};var B=[{reg:/^([0-9]{1,2})[-/.]([0-9]{1,2})[\-/.]?([0-9]{4})?( [0-9]{1,2}:[0-9]{2}:?[0-9]{0,2} ?(am|pm|gmt))?$/i,parse:(e,t)=>{let n=parseInt(t[1],10)-1,r=parseInt(t[2],10);(e.british||n>=12)&&(r=parseInt(t[1],10),n=parseInt(t[2],10)-1);const a={date:r,month:n,year:L(t[3],e._today)||(new Date).getFullYear()};return  false===P(a)?(e.epoch=null,e):(N(e,a),e=Y(e,t[4]))}},{reg:/^([a-z]+)[\-/. ]([0-9]{1,2})[\-/. ]?([0-9]{4}|'[0-9]{2})?( [0-9]{1,2}(:[0-9]{0,2})?(:[0-9]{0,3})? ?(am|pm)?)?$/i,parse:(e,t)=>{const n={year:L(t[3],e._today),month:U(t[1]),date:b(t[2]||"")};return  false===P(n)?(e.epoch=null,e):(N(e,n),e=Y(e,t[4]))}},{reg:/^([a-z]+) ([0-9]{1,2})( [0-9]{4})?( ([0-9:]+( ?am| ?pm| ?gmt)?))?$/i,parse:(e,t)=>{const n={year:L(t[3],e._today),month:U(t[1]),date:b(t[2]||"")};return  false===P(n)?(e.epoch=null,e):(N(e,n),e=Y(e,t[4]))}},{reg:/^([a-z]+) ([0-9]{1,2}) ([0-9]{1,2}:[0-9]{2}:?[0-9]{0,2})( \+[0-9]{4})?( [0-9]{4})?$/i,parse:(e,t)=>{const[,n,r,a,o,s]=t,i={year:L(s,e._today),month:U(n),date:b(r||"")};return  false===P(i)?(e.epoch=null,e):(N(e,i),e=x(e,o),e=Y(e,a))}}],H=[{reg:/^([0-9]{4})[\-/]([0-9]{2})$/,parse:(e,t)=>{const n={year:t[1],month:parseInt(t[2],10)-1,date:1};return  false===P(n)?(e.epoch=null,e):(N(e,n),e=Y(e,t[4]))}},{reg:/^([a-z]+) ([0-9]{4})$/i,parse:(e,t)=>{const n={year:L(t[2],e._today),month:U(t[1]),date:e._today.date||1};return  false===P(n)?(e.epoch=null,e):(N(e,n),e=Y(e,t[4]))}},{reg:/^(q[0-9])( of)?( [0-9]{4})?/i,parse:(e,t)=>{const n=t[1]||"";e=e.quarter(n);let r=t[3]||"";return r&&(r=r.trim(),e=e.year(r)),e}},{reg:/^(spring|summer|winter|fall|autumn)( of)?( [0-9]{4})?/i,parse:(e,t)=>{const n=t[1]||"";e=e.season(n);let r=t[3]||"";return r&&(r=r.trim(),e=e.year(r)),e}},{reg:/^[0-9,]+ ?b\.?c\.?$/i,parse:(e,t)=>{let n=t[0]||"";n=n.replace(/^([0-9,]+) ?b\.?c\.?$/i,"-$1");const r=new Date,a={year:parseInt(n.trim(),10),month:r.getMonth(),date:r.getDate()};return  false===P(a)?(e.epoch=null,e):(N(e,a),e=Y(e))}},{reg:/^[0-9,]+ ?(a\.?d\.?|c\.?e\.?)$/i,parse:(e,t)=>{let n=t[0]||"";n=n.replace(/,/g,"");const r=new Date,a={year:parseInt(n.trim(),10),month:r.getMonth(),date:r.getDate()};return  false===P(a)?(e.epoch=null,e):(N(e,a),e=Y(e))}},{reg:/^[0-9]{4}( ?a\.?d\.?)?$/i,parse:(e,t)=>{const n=e._today;n.month&&!n.date&&(n.date=1);const r=new Date,a={year:L(t[0],n),month:n.month||r.getMonth(),date:n.date||r.getDate()};return  false===P(a)?(e.epoch=null,e):(N(e,a),e=Y(e))}}],Z=[].concat([{reg:/^(-?0{0,2}[0-9]{3,4})-([0-9]{1,2})-([0-9]{1,2})[T| ]([0-9.:]+)(Z|[0-9-+:]+)?(\[.*?\])?(\[.*?\])?$/i,parse:(e,t)=>{const n={year:t[1],month:parseInt(t[2],10)-1,date:t[3]};if(false===P(n))return e.epoch=null,e;if(t[6]){const n=t[6].trim().replace(/[[\]]/g,"");n&&(e=e.timezone(n));}else x(e,t[5]);return N(e,n),e=Y(e,t[4])}},{reg:/^([0-9]{4})[\-/. ]([0-9]{1,2})[\-/. ]([0-9]{1,2})( [0-9]{1,2}(:[0-9]{0,2})?(:[0-9]{0,3})? ?(am|pm)?)?$/i,parse:(e,t)=>{const n={year:t[1],month:parseInt(t[2],10)-1,date:parseInt(t[3],10)};return n.month>=12&&(n.date=parseInt(t[2],10),n.month=parseInt(t[3],10)-1),false===P(n)?(e.epoch=null,e):(N(e,n),e=Y(e,t[4]))}},{reg:/^([0-9]{4})[\-/. ]([a-z]+)[\-/. ]([0-9]{1,2})( [0-9]{1,2}(:[0-9]{0,2})?(:[0-9]{0,3})? ?(am|pm)?)?$/i,parse:(e,t)=>{const n={year:L(t[1],e._today),month:U(t[2]),date:b(t[3]||"")};return  false===P(n)?(e.epoch=null,e):(N(e,n),e=Y(e,t[4]))}}],B,[{reg:/^([0-9]{1,2})[-/]([a-z]+)[\-/]?([0-9]{4})?$/i,parse:(e,t)=>{const n={year:L(t[3],e._today),month:U(t[2]),date:b(t[1]||"")};return  false===P(n)?(e.epoch=null,e):(N(e,n),e=Y(e,t[4]))}},{reg:/^([0-9]{1,2})( [a-z]+)( [0-9]{4}| '[0-9]{2})? ?([0-9]{1,2}:[0-9]{2}:?[0-9]{0,2} ?(am|pm|gmt))?$/i,parse:(e,t)=>{const n={year:L(t[3],e._today),month:U(t[2]),date:b(t[1])};return n.month&&false!==P(n)?(N(e,n),e=Y(e,t[4])):(e.epoch=null,e)}},{reg:/^([0-9]{1,2})[. \-/]([a-z]+)[. \-/]([0-9]{4})?( [0-9]{1,2}(:[0-9]{0,2})?(:[0-9]{0,3})? ?(am|pm)?)?$/i,parse:(e,t)=>{const n={date:Number(t[1]),month:U(t[2]),year:Number(t[3])};return  false===P(n)?(e.epoch=null,e):(N(e,n),e=e.startOf("day"),e=Y(e,t[4]))}}],H);const{parseArray:Q,parseObject:G,parseNumber:V}=j,W={year:(new Date).getFullYear(),month:0,date:1},J=(e,t)=>{const n=e._today||W;if("number"==typeof t)return V(e,t);if(e.epoch=Date.now(),e._today&&p(e._today)&&Object.keys(e._today).length>0){const t=G(e,n);t.isValid()&&(e.epoch=t.epoch);}if(null==t||""===t)return e;if(true===f(t))return e.epoch=t.getTime(),e;if(true===function(e){return "[object Array]"===Object.prototype.toString.call(e)}(t))return e=Q(e,t,n);if(true===p(t)){if(t.epoch)return e.epoch=t.epoch,e.tz=t.tz,e;const r=Object.assign({},n,t);return e=G(e,r)}return "string"!=typeof t?e:(t=t.replace(/\b(mon|tues?|wed|wednes|thur?s?|fri|sat|satur|sun)(day)?\b/i,"").replace(/([0-9])(th|rd|st|nd)/,"$1").replace(/,/g,"").replace(/ +/g," ").trim(),true===D.hasOwnProperty(t)?e=D[t](e):function(e,t,n){for(let r=0;r<Z.length;r++){const a=t.match(Z[r].reg);if(a){const t=Z[r].parse(e,a,n);if(null!==t&&t.isValid())return t}}return  false===e.silent&&console.warn("Warning: couldn't parse date-string: '"+t+"'"),e.epoch=null,e}(e,t))};let K=["sun","mon","tue","wed","thu","fri","sat"],R=["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];function X(){return K}function ee(){return R}const te={mo:1,tu:2,we:3,th:4,fr:5,sa:6,su:7,tues:2,weds:3,wedn:3,thur:4,thurs:4};let ne=true;const re=e=>{const t=e.timezone().current.offset;return t?z(t,":"):"Z"},ae=e=>ne?function(e){return e?e[0].toUpperCase()+e.substr(1):""}(e):e,oe={day:e=>ae(e.dayName()),"day-short":e=>ae(X()[e.day()]),"day-number":e=>e.day(),"day-ordinal":e=>g(e.day()),"day-pad":e=>y(e.day()),date:e=>e.date(),"date-ordinal":e=>g(e.date()),"date-pad":e=>y(e.date()),month:e=>ae(e.monthName()),"month-short":e=>ae(E()[e.month()]),"month-number":e=>e.month(),"month-ordinal":e=>g(e.month()),"month-pad":e=>y(e.month()),"iso-month":e=>y(e.month()+1),year:e=>{let t=e.year();return t>0?t:(t=Math.abs(t),t+" BC")},"year-short":e=>{let t=e.year();return t>0?`'${String(e.year()).substr(2,4)}`:(t=Math.abs(t),t+" BC")},"iso-year":e=>{const t=e.year(),n=t<0;let r=y(Math.abs(t),4);return n&&(r=y(r,6),r="-"+r),r},time:e=>e.time(),"time-24":e=>`${e.hour24()}:${y(e.minute())}`,hour:e=>e.hour12(),"hour-pad":e=>y(e.hour12()),"hour-24":e=>e.hour24(),"hour-24-pad":e=>y(e.hour24()),minute:e=>e.minute(),"minute-pad":e=>y(e.minute()),second:e=>e.second(),"second-pad":e=>y(e.second()),millisecond:e=>e.millisecond(),"millisecond-pad":e=>y(e.millisecond(),3),ampm:e=>e.ampm(),AMPM:e=>e.ampm().toUpperCase(),quarter:e=>"Q"+e.quarter(),season:e=>e.season(),era:e=>e.era(),json:e=>e.json(),timezone:e=>e.timezone().name,offset:e=>re(e),numeric:e=>`${e.year()}/${y(e.month()+1)}/${y(e.date())}`,"numeric-us":e=>`${y(e.month()+1)}/${y(e.date())}/${e.year()}`,"numeric-uk":e=>`${y(e.date())}/${y(e.month()+1)}/${e.year()}`,"mm/dd":e=>`${y(e.month()+1)}/${y(e.date())}`,iso:e=>`${e.format("iso-year")}-${y(e.month()+1)}-${y(e.date())}T${y(e.h24())}:${y(e.minute())}:${y(e.second())}.${y(e.millisecond(),3)}${re(e)}`,"iso-short":e=>{const t=y(e.month()+1),n=y(e.date());var r;return `${(r=e.year())>=0?y(r,4):"-"+y(r=Math.abs(r),4)}-${t}-${n}`},"iso-utc":e=>new Date(e.epoch).toISOString(),"iso-full":e=>{let t=e.format("iso");const n=e.timezone().name;return n&&(t+=`[${n}]`),t},sql:e=>`${e.format("iso-year")}-${y(e.month()+1)}-${y(e.date())} ${y(e.h24())}:${y(e.minute())}:${y(e.second())}`,nice:e=>`${E()[e.month()]} ${g(e.date())}, ${e.time()}`,"nice-24":e=>`${E()[e.month()]} ${g(e.date())}, ${e.hour24()}:${y(e.minute())}`,"nice-year":e=>`${E()[e.month()]} ${g(e.date())}, ${e.year()}`,"nice-day":e=>`${X()[e.day()]} ${ae(E()[e.month()])} ${g(e.date())}`,"nice-full":e=>`${e.dayName()} ${ae(e.monthName())} ${g(e.date())}, ${e.time()}`,"nice-full-24":e=>`${e.dayName()} ${ae(e.monthName())} ${g(e.date())}, ${e.hour24()}:${y(e.minute())}`},se={"day-name":"day","month-name":"month","iso 8601":"iso","iso 9075":"sql","time-h24":"time-24","time-12":"time","time-h12":"time",tz:"timezone",iana:"timezone","day-num":"day-number","month-num":"month-number","month-iso":"iso-month","year-iso":"iso-year","nice-short":"nice","nice-short-24":"nice-24",mdy:"numeric-us",dmy:"numeric-uk",ymd:"numeric","yyyy/mm/dd":"numeric","mm/dd/yyyy":"numeric-us","dd/mm/yyyy":"numeric-us","little-endian":"numeric-uk","big-endian":"numeric","day-nice":"nice-day"};Object.keys(se).forEach(e=>oe[e]=oe[se[e]]);const ie=(e,t="")=>{if(true!==e.isValid())return "";if(oe.hasOwnProperty(t)){let n=oe[t](e)||"";return "json"!==t&&(n=String(n),"ampm"!==t.toLowerCase()&&(n=ae(n))),n}if(-1!==t.indexOf("{")){const n=/\{(.+?)\}/g;return t=t.replace(n,(t,n)=>{if("AMPM"!==(n=n.trim())&&(n=n.toLowerCase()),oe.hasOwnProperty(n)){const t=String(oe[n](e));return "ampm"!==n.toLowerCase()?ae(t):t}return ""}),t}return e.format("iso-short")},ue={G:e=>e.era(),GG:e=>e.era(),GGG:e=>e.era(),GGGG:e=>"AD"===e.era()?"Anno Domini":"Before Christ",y:e=>e.year(),yy:e=>y(Number(String(e.year()).substr(2,4))),yyy:e=>e.year(),yyyy:e=>e.year(),yyyyy:e=>"0"+e.year(),Q:e=>e.quarter(),QQ:e=>e.quarter(),QQQ:e=>e.quarter(),QQQQ:e=>e.quarter(),M:e=>e.month()+1,MM:e=>y(e.month()+1),MMM:e=>e.format("month-short"),MMMM:e=>e.format("month"),w:e=>e.week(),ww:e=>y(e.week()),d:e=>e.date(),dd:e=>y(e.date()),D:e=>e.dayOfYear(),DD:e=>y(e.dayOfYear()),DDD:e=>y(e.dayOfYear(),3),E:e=>e.format("day-short"),EE:e=>e.format("day-short"),EEE:e=>e.format("day-short"),EEEE:e=>e.format("day"),EEEEE:e=>e.format("day")[0],e:e=>e.day(),ee:e=>e.day(),eee:e=>e.format("day-short"),eeee:e=>e.format("day"),eeeee:e=>e.format("day")[0],a:e=>e.ampm().toUpperCase(),aa:e=>e.ampm().toUpperCase(),aaa:e=>e.ampm().toUpperCase(),aaaa:e=>e.ampm().toUpperCase(),h:e=>e.h12(),hh:e=>y(e.h12()),H:e=>e.hour(),HH:e=>y(e.hour()),m:e=>e.minute(),mm:e=>y(e.minute()),s:e=>e.second(),ss:e=>y(e.second()),SSS:e=>y(e.millisecond(),3),A:e=>e.epoch-e.startOf("day").epoch,z:e=>e.timezone().name,zz:e=>e.timezone().name,zzz:e=>e.timezone().name,zzzz:e=>e.timezone().name,Z:e=>z(e.timezone().current.offset),ZZ:e=>z(e.timezone().current.offset),ZZZ:e=>z(e.timezone().current.offset),ZZZZ:e=>z(e.timezone().current.offset,":")},ce=(e,t,n)=>{let r=e,a=t;for(let o=0;o<n;o+=1)ue[r]=ue[a],r+=e,a+=t;};ce("q","Q",4),ce("L","M",4),ce("Y","y",4),ce("c","e",4),ce("k","H",2),ce("K","h",2),ce("S","s",2),ce("v","z",4),ce("V","Z",4);const he=["year","season","quarter","month","week","day","quarterHour","hour","minute"],le=function(e,t){const n=e.clone().startOf(t),r=e.clone().endOf(t).epoch-n.epoch,a=(e.epoch-n.epoch)/r;return parseFloat(a.toFixed(2))},me=(e,t,n)=>{let r=0;for(e=e.clone();e.isBefore(t);)e=e.add(1,n),r+=1;return e.isAfter(t,n)&&(r-=1),r},de=(e,t,n)=>e.isBefore(t)?me(e,t,n):-1*me(t,e,n),fe=function(e,t,n){t=v(t,e);let r=false;if(e.isAfter(t)){const n=e;e=t,t=n,r=true;}let a=function(e,t){const n=t.epoch-e.epoch,r={milliseconds:n,seconds:parseInt(n/1e3,10)};r.minutes=parseInt(r.seconds/60,10),r.hours=parseInt(r.minutes/60,10);let a=e.clone();return r.years=((e,t)=>{let n=t.year()-e.year();return (e=e.year(t.year())).isAfter(t)&&(n-=1),n})(a,t),a=e.add(r.years,"year"),r.months=12*r.years,a=e.add(r.months,"month"),r.months+=de(a,t,"month"),r.quarters=4*r.years,r.quarters+=parseInt(r.months%12/3,10),r.weeks=52*r.years,a=e.add(r.weeks,"week"),r.weeks+=de(a,t,"week"),r.days=7*r.weeks,a=e.add(r.days,"day"),r.days+=de(a,t,"day"),r}(e,t);return r&&(a=function(e){return Object.keys(e).forEach(t=>{e[t]*=-1;}),e}(a)),n?(n=k(n),true!==/s$/.test(n)&&(n+="s"),"dates"===n&&(n="days"),a[n]):a},pe=e=>Math.abs(e)||0;let ye={second:"second",seconds:"seconds",minute:"minute",minutes:"minutes",hour:"hour",hours:"hours",day:"day",days:"days",month:"month",months:"months",year:"year",years:"years"};function ge(e){return ye[e]||""}let be="past",ke="future",we="present",ve="now",ze="almost",_e="over",$e=e=>`${e} ago`,je=e=>`in ${e}`;function Oe(e){return $e(e)}function De(e){return je(e)}function Me(){return ve}const Se={months:{almost:10,over:4},days:{almost:25,over:10},hours:{almost:20,over:8},minutes:{almost:50,over:20},seconds:{almost:50,over:20}};function qe(e,t){return 1===e?e+" "+ge(t.slice(0,-1)):e+" "+ge(t)}const Ne=function(e){let t=null,n=null;const r=[],a=[];return Object.keys(e).forEach((o,s,i)=>{const u=Math.abs(e[o]);if(0===u)return;r.push(u+o[0]);const c=qe(u,o);if(a.push(c),!t){if(t=c,n=c,s>4)return;const r=i[s+1],a=Math.abs(e[r]);a>Se[r].almost?(t=qe(u+1,o),n=ze+" "+t):a>Se[r].over&&(n=_e+" "+c);}}),{qualified:n,rounded:t,abbreviated:r,englishValues:a}},Ie=(e,t)=>{const n=function(e,t){const n=e.isBefore(t),r=n?t:e;let a=n?e:t;a=a.clone();const o={years:0,months:0,days:0,hours:0,minutes:0,seconds:0};return Object.keys(o).forEach(e=>{if(a.isSame(r,e))return;const t=a.diff(r,e);a=a.add(t,e),o[e]=t;}),n&&Object.keys(o).forEach(e=>{0!==o[e]&&(o[e]*=-1);}),o}(e,t=v(t,e));if(true===Object.keys(n).every(e=>!n[e]))return {diff:n,rounded:Me(),qualified:Me(),precise:Me(),abbreviated:[],iso:"P0Y0M0DT0H0M0S",direction:we};let r,a=ke,{rounded:o,qualified:s}=Ne(n);const{englishValues:i,abbreviated:u}=Ne(n);r=i.splice(0,2).join(", "),true===e.isAfter(t)?(o=Oe(o),s=Oe(s),r=Oe(r),a=be):(o=De(o),s=De(s),r=De(r));const c=function(e){let t="P";return t+=pe(e.years)+"Y",t+=pe(e.months)+"M",t+=pe(e.days)+"DT",t+=pe(e.hours)+"H",t+=pe(e.minutes)+"M",t+=pe(e.seconds)+"S",t}(n);return {diff:n,rounded:o,qualified:s,precise:r,abbreviated:u,iso:c,direction:a}};var Te={north:[["spring",2,1],["summer",5,1],["fall",8,1],["autumn",8,1],["winter",11,1]],south:[["fall",2,1],["autumn",2,1],["winter",5,1],["spring",8,1],["summer",11,1]]},Ce=[null,[0,1],[3,1],[6,1],[9,1]];const Ee={second:e=>(N(e,{millisecond:0}),e),minute:e=>(N(e,{second:0,millisecond:0}),e),quarterhour:e=>{const t=e.minutes();return e=t>=45?e.minutes(45):t>=30?e.minutes(30):t>=15?e.minutes(15):e.minutes(0),N(e,{second:0,millisecond:0}),e},hour:e=>(N(e,{minute:0,second:0,millisecond:0}),e),day:e=>(N(e,{hour:0,minute:0,second:0,millisecond:0}),e),week:e=>{const t=e.clone();return (e=e.day(e._weekStart)).isAfter(t)&&(e=e.subtract(1,"week")),N(e,{hour:0,minute:0,second:0,millisecond:0}),e},month:e=>(N(e,{date:1,hour:0,minute:0,second:0,millisecond:0}),e),quarter:e=>{const t=e.quarter();return Ce[t]&&N(e,{month:Ce[t][0],date:Ce[t][1],hour:0,minute:0,second:0,millisecond:0}),e},season:e=>{const t=e.season();let n="north";"South"===e.hemisphere()&&(n="south");for(let r=0;r<Te[n].length;r++)if(Te[n][r][0]===t){let a=e.year();return "winter"===t&&e.month()<3&&(a-=1),N(e,{year:a,month:Te[n][r][1],date:Te[n][r][2],hour:0,minute:0,second:0,millisecond:0}),e}return e},year:e=>(N(e,{month:0,date:1,hour:0,minute:0,second:0,millisecond:0}),e),decade:e=>{const t=(e=e.startOf("year")).year(),n=10*parseInt(t/10,10);return e=e.year(n)},century:e=>{const t=(e=e.startOf("year")).year(),n=100*parseInt(t/100,10);return e=e.year(n)}};Ee.date=Ee.day;const Ae=function(e,t,n,r=1){if(!t||!n)return [];if(t=k(t),n=e.clone().set(n),e.isAfter(n)){const t=e;e=n,n=t;}if(e.diff(n,t)<r)return [];let a=e.clone();if(function(e){return !!X().find(t=>t===e)||!!ee().find(t=>t===e)}(t))a=a.next(t),t="week";else {a.startOf(t).isBefore(e)&&(a=a.next(t));}const o=[];for(;a.isBefore(n);)o.push(a),a=a.add(r,t);return o},xe=e=>{const n=e.timezones;let r=e.tz;if(false===n.hasOwnProperty(r)&&(r=m(e.tz,n)),null===r)return  false===e.silent&&console.warn("Warn: could not find given or local timezone - '"+e.tz+"'"),{current:{epochShift:0}};const a=n[r],o={name:(s=r,"Utc"===(s=(s=(s=(s=(s=(s=(s=(s=s[0].toUpperCase()+s.substr(1)).replace(/[/_-]([a-z])/gi,e=>e.toUpperCase())).replace(/_(of|es)_/i,e=>e.toLowerCase())).replace(/\/gmt/i,"/GMT")).replace(/\/utc/i,"/UTC")).replace(/\/Dumontdurville$/i,"/DumontDUrville")).replace(/\/Mcmurdo$/i,"/McMurdo")).replace(/\/Port-au-prince$/i,"/Port-au-Prince"))&&(s="UTC"),s),hasDst:Boolean(a.dst),default_offset:a.offset,hemisphere:"s"===a.hem?"South":"North",current:{}};var s,i;if(o.hasDst){const e=(i=a.dst)?i.split("->"):[];o.change={start:e[0],back:e[1]};}const u=a.offset;let c=u;return  true===o.hasDst&&(c="North"===o.hemisphere?u-1:a.offset+1),false===o.hasDst?(o.current.offset=u,o.current.isDST=false):true===t(e.epoch,o.change.start,o.change.back,u,c)?(o.current.offset=u,o.current.isDST="North"===o.hemisphere):(o.current.offset=c,o.current.isDST="South"===o.hemisphere),o},Ye=["century","decade","year","month","date","day","hour","minute","second","millisecond"],Fe={set:function(e,t){let n=this.clone();return n=J(n,e),t&&(n.tz=m(t,n.timezones)),n},timezone:function(e){if(void 0!==e){const t=this.json();return t.timezone=e,this.set(t,e)}return xe(this)},isDST:function(){return xe(this).current.isDST},hasDST:function(){return xe(this).hasDst},offset:function(){return 60*xe(this).current.offset},hemisphere:function(){return xe(this).hemisphere},format:function(e){return ie(this,e)},unixFmt:function(e){return ((e,t)=>{let n=t.split("");return n=function(e){for(let t=0;t<e.length;t+=1)if("'"===e[t])for(let n=t+1;n<e.length;n+=1){if(e[n]&&(e[t]+=e[n]),"'"===e[n]){e[n]=null;break}e[n]=null;}return e.filter(e=>e)}(n),n=function(e){for(let t=0;t<e.length;t+=1){const n=e[t];for(let r=t+1;r<e.length&&e[r]===n;r+=1)e[t]+=e[r],e[r]=null;}return (e=e.filter(e=>e)).map(e=>("''"===e&&(e="'"),e))}(n),n.reduce((t,n)=>(void 0!==ue[n]?t+=ue[n](e)||"":(/^'.+'$/.test(n)&&(n=n.replace(/'/g,"")),t+=n),t),"")})(this,e)},startOf:function(e){return ((e,t)=>{let n=e.clone();return t=k(t),Ee[t]?Ee[t](n):"summer"===t||"winter"===t?(n=n.season(t),Ee.season(n)):n})(this,e)},endOf:function(e){return ((e,t)=>{let n=e.clone();return t=k(t),Ee[t]?(n=Ee[t](n),n=n.add(1,t),n=n.subtract(1,"millisecond"),n):n})(this,e)},leapYear:function(){return d(this.year())},progress:function(e){return ((e,t)=>{if(t)return t=k(t),le(e,t);const n={};return he.forEach(t=>{n[t]=le(e,t);}),n})(this,e)},nearest:function(e){return ((e,t)=>{const n=e.progress();return "quarterhour"===(t=k(t))&&(t="quarterHour"),void 0!==n[t]?(n[t]>.5&&(e=e.add(1,t)),e=e.startOf(t)):false===e.silent&&console.warn("no known unit '"+t+"'"),e})(this,e)},diff:function(e,t){return fe(this,e,t)},since:function(e){return e||(e=this.clone().set()),Ie(this,e)},next:function(e){return this.add(1,e).startOf(e)},last:function(e){return this.subtract(1,e).startOf(e)},isValid:function(){return !(!this.epoch&&0!==this.epoch)&&!isNaN(this.d.getTime())},goto:function(e){const t=this.clone();return t.tz=m(e,t.timezones),t},every:function(e,t,n){if("object"==typeof e&&"string"==typeof t){const n=t;t=e,e=n;}return Ae(this,e,t,n)},isAwake:function(){const e=this.hour();return !(e<8||e>22)},isAsleep:function(){return !this.isAwake()},daysInMonth:function(){switch(this.month()){case 0:case 2:case 4:case 6:case 7:case 9:case 11:return 31;case 1:return this.leapYear()?29:28;case 3:case 5:case 8:case 10:return 30;default:throw new Error("Invalid Month state.")}},log:function(){return console.log(""),console.log(ie(this,"nice-short")),this},logYear:function(){return console.log(""),console.log(ie(this,"full-short")),this},json:function(e){if(void 0!==e){let t=this.clone();e.timezone&&(t.tz=e.timezone);for(let n=0;n<Ye.length;n++){const r=Ye[n];void 0!==e[r]&&(t=t[r](e[r]));}return t}const t=Ye.reduce((e,t)=>(e[t]=this[t](),e),{});return t.offset=this.timezone().current.offset,t.timezone=this.tz,t},debug:function(){const e=this.timezone();let t=this.format("MM")+" "+this.format("date-ordinal")+" "+this.year();return t+="\n     - "+this.format("time"),console.log("\n\n",t+"\n     - "+e.name+" ("+e.current.offset+")"),this},from:function(e){return (e=this.clone().set(e)).since(this)},fromNow:function(){return this.clone().set(Date.now()).since(this)},weekStart:function(e){if("number"==typeof e)return this._weekStart=e,this;if("string"==typeof e){e=e.toLowerCase().trim();let t=X().indexOf(e);-1===t&&(t=ee().indexOf(e)),-1===t&&(t=1),this._weekStart=t;}else console.warn("Spacetime Error: Cannot understand .weekStart() input:",e);return this}};Fe.inDST=Fe.isDST,Fe.round=Fe.nearest,Fe.each=Fe.every;const Pe=e=>("string"==typeof e&&(e=parseInt(e,10)),e),Le=["year","month","date","hour","minute","second","millisecond"],Ue=(e,t,n)=>{const r=Le.indexOf(n),a=Le.slice(r,Le.length);for(let n=0;n<a.length;n++){const r=t[a[n]]();e[a[n]](r);}return e},Be=function(e,t,n,r){return  true===n&&e.isBefore(t)?e=e.add(1,r):false===n&&e.isAfter(t)&&(e=e.minus(1,r)),e},He=function(e,t,n){t=Pe(t);const r=e.clone(),a=(e.minute()-t)*M.minute;return e.epoch-=a,Ue(e,r,"second"),(e=Be(e,r,n,"hour")).epoch},Ze=function(e,t,n){(t=Pe(t))>=24?t=24:t<0&&(t=0);const r=e.clone();let a=e.hour()-t,o=a*M.hour;return e.epoch-=o,e.date()!==r.date()&&(e=r.clone(),a>1&&(a-=1),a<1&&(a+=1),o=a*M.hour,e.epoch-=o),N(e,{hour:t}),Ue(e,r,"minute"),(e=Be(e,r,n,"day")).epoch},Qe=function(e,t){return "string"==typeof t&&/^'[0-9]{2}$/.test(t)&&(t=t.replace(/'/,"").trim(),t=(t=Number(t))>30?1900+t:2e3+t),t=Pe(t),N(e,{year:t}),e.epoch},Ge=function(e,t,n){const r=e.clone();return 1===(t=Pe(t))&&"december"===e.monthName()&&e.date()>=29&&1===e.week()?e:("december"===(e=(e=(e=e.month(0)).date(1)).day("monday",false)).monthName()&&e.date()<29&&(e=e.add(1,"week")),t-=1,e=e.add(t,"weeks"),e=Be(e,r,n,"year"))};let Ve="am",We="pm";const Je={millisecond:function(e){if(void 0!==e){const t=this.clone();return t.epoch=function(e,t){t=Pe(t);const n=e.millisecond()-t;return e.epoch-n}(t,e),t}return this.d.getMilliseconds()},second:function(e,t){if(void 0!==e){const n=this.clone();return n.epoch=function(e,t,n){t=Pe(t);const r=e.clone(),a=(e.second()-t)*M.second;return e.epoch=e.epoch-a,(e=Be(e,r,n,"minute")).epoch}(n,e,t),n}return this.d.getSeconds()},minute:function(e,t){if(void 0!==e){const n=this.clone();return n.epoch=He(n,e,t),n}return this.d.getMinutes()},hour:function(e,t){const n=this.d;if(void 0!==e){const n=this.clone();return n.epoch=Ze(n,e,t),n}return n.getHours()},hourFloat:function(e,t){if(void 0!==e){const n=this.clone();let r=e%1;r*=60;const a=parseInt(e,10);return n.epoch=Ze(n,a,t),n.epoch=He(n,r,t),n}const n=this.d,r=n.getHours();let a=n.getMinutes();return a/=60,r+a},hour12:function(e,t){const n=this.d;if(void 0!==e){const n=this.clone(),r=(e=""+e).match(/^([0-9]+)(am|pm)$/);if(r){let e=parseInt(r[1],10);"pm"===r[2]&&(e+=12),n.epoch=Ze(n,e,t);}return n}let r=n.getHours();return r>12&&(r-=12),0===r&&(r=12),r},time:function(e,t){if(void 0!==e){const n=this.clone();return e=e.toLowerCase().trim(),n.epoch=function(e,t,n){let r=t.match(/([0-9]{1,2})[:h]([0-9]{1,2})(:[0-9]{1,2})? ?(am|pm)?/);if(!r){if(r=t.match(/([0-9]{1,2}) ?(am|pm)/),!r)return null;r.splice(2,0,"0"),r.splice(3,0,"");}let a=false,o=parseInt(r[1],10),s=parseInt(r[2],10);s>=60&&(s=59),o>12&&(a=true),false===a&&("am"===r[4]&&12===o&&(o=0),"pm"===r[4]&&o<12&&(o+=12)),r[3]=r[3]||"",r[3]=r[3].replace(/:/,"");const i=parseInt(r[3],10)||0,u=e.clone();return e=(e=(e=(e=e.hour(o)).minute(s)).second(i)).millisecond(0),(e=Be(e,u,n,"day")).epoch}(n,e,t),n}return `${this.h12()}:${y(this.minute())}${this.ampm()}`},ampm:function(e,t){let n=Ve,r=this.hour();if(r>=12&&(n=We),"string"!=typeof e)return n;const a=this.clone();return e=e.toLowerCase().trim(),r>=12&&"am"===e?(r-=12,a.hour(r,t)):r<12&&"pm"===e?(r+=12,a.hour(r,t)):a},dayTime:function(e,t){if(void 0!==e){const n={morning:"7:00",breakfast:"7:00",noon:"12:00",lunch:"12:00",afternoon:"14:00",evening:"18:00",dinner:"18:00",night:"23:00",midnight:"00:00"};let r=this.clone();return e=(e=e||"").toLowerCase(),true===n.hasOwnProperty(e)&&(r=r.time(n[e],t)),r}const n=this.hour();return n<6?"night":n<12?"morning":n<17?"afternoon":n<22?"evening":"night"},iso:function(e){return void 0!==e?this.set(e):this.format("iso")},isoFull:function(e){return void 0!==e?this.set(e):this.format("iso-full")},epochSeconds:function(e){return void 0!==e?(this.epoch=1e3*e,this):Math.floor(this.epoch/1e3)}},Ke={date:function(e,t){if(void 0!==e){const n=this.clone();return (e=parseInt(e,10))&&(n.epoch=function(e,t,n){if((t=Pe(t))>28){const n=e.month();let r=I[n];1===n&&29===t&&d(e.year())&&(r=29),t>r&&(t=r);}t<=0&&(t=1);const r=e.clone();return N(e,{date:t}),(e=Be(e,r,n,"month")).epoch}(n,e,t)),n}return this.d.getDate()},day:function(e,t){if(void 0===e)return this.d.getDay();const n=this.clone();let r=e;"string"==typeof e&&(e=e.toLowerCase(),te.hasOwnProperty(e)?r=te[e]:(r=X().indexOf(e),-1===r&&(r=ee().indexOf(e))));let a=this.d.getDay()-r;true===t&&a>0&&(a-=7),false===t&&a<0&&(a+=7);const o=this.subtract(a,"days");return N(o,{hour:n.hour(),minute:n.minute(),second:n.second()}),o},dayName:function(e,t){if(void 0===e)return ee()[this.day()];let n=this.clone();return n=n.day(e,t),n}},Re=e=>e=(e=(e=e.minute(0)).second(0)).millisecond(1),Xe=function(e){if(void 0!==e){if("string"==typeof e&&(e=e.replace(/([0-9])(th|rd|st|nd)/,"$1"),e=Number(e),isNaN(e)))return console.warn("Spacetime: Invalid millennium input"),this;e>0&&(e-=1);let t=1e3*e;return 0===t&&(t=1),this.year(t)}let t=Math.floor(this.year()/1e3);return t>=0&&(t+=1),t},et={dayOfYear:function(e,t){if(void 0!==e){const n=this.clone();return n.epoch=function(e,t,n){t=Pe(t);const r=e.clone();return (t-=1)<=0?t=0:t>=365&&(t=d(e.year())?365:364),e=(e=e.startOf("year")).add(t,"day"),Ue(e,r,"hour"),(e=Be(e,r,n,"year")).epoch}(n,e,t),n}let n=0;const r=this.d.getMonth();let a;for(let e=1;e<=r;e++)a=new Date,a.setDate(1),a.setFullYear(this.d.getFullYear()),a.setHours(1),a.setMinutes(1),a.setMonth(e),a.setHours(-2),n+=a.getDate();return n+this.d.getDate()},week:function(e,t){if(void 0!==e){let n=this.clone();return n=Ge(n,e,t),n=Re(n),n}const n=this.epoch;let r=this.clone();if("december"===r.monthName()&&r.date()>=29){if(Ge(r.add(15,"days"),1,false).epoch<=r.epoch)return 1}if(r=r.month(0),r=r.date(1),r=Re(r),r=r.day("monday",false),"december"===r.monthName()&&r.date()<29&&(r=r.add(1,"week")),r=r.minus(2,"hours"),r.epoch>n)return 1;let a=0;const o=4*this.month();for(r.epoch+=M.week*o,a+=o;a<=52;a++){if(r.epoch>n)return a;r=r.add(1,"week");}return 52},month:function(e,t){if(void 0!==e){const n=this.clone();return n.epoch=function(e,t,n){"string"==typeof t&&("sept"===t&&(t="sep"),t=A()[t.toLowerCase()]),(t=Pe(t))>=12&&(t=11),t<=0&&(t=0);let r=e.date();r>I[t]&&(r=I[t]);const a=e.clone();return N(e,{month:t,d:r}),(e=Be(e,a,n,"year")).epoch}(n,e,t),n}return this.d.getMonth()},monthName:function(e,t){if(void 0!==e){let n=this.clone();return n=n.month(e,t),n}return C[this.month()]},quarter:function(e,t){if(void 0!==e&&("string"==typeof e&&(e=e.replace(/^q/i,""),e=parseInt(e,10)),Ce[e])){let n=this.clone();const r=Ce[e][0];return n=n.month(r,t),n=n.date(1,t),n=n.startOf("day"),n}const n=this.d.getMonth();for(let e=1;e<Ce.length;e++)if(n<Ce[e][0])return e-1;return 4},season:function(e,t){let n="north";if("South"===this.hemisphere()&&(n="south"),void 0!==e){let r=this.clone();for(let a=0;a<Te[n].length;a++)e===Te[n][a][0]&&(r=r.month(Te[n][a][1],t),r=r.date(1),r=r.startOf("day"));return r}const r=this.d.getMonth();for(let e=0;e<Te[n].length-1;e++)if(r>=Te[n][e][1]&&r<Te[n][e+1][1])return Te[n][e][0];return "north"===n?"winter":"summer"},year:function(e){if(void 0!==e){const t=this.clone();return t.epoch=Qe(t,e),t}return this.d.getFullYear()},era:function(e){if(void 0!==e){const t=this.clone();e=e.toLowerCase();const n=t.d.getFullYear();return "bc"===e&&n>0&&(t.epoch=Qe(t,-1*n)),"ad"===e&&n<0&&(t.epoch=Qe(t,-1*n)),t}return this.d.getFullYear()<0?"BC":"AD"},decade:function(e){if(void 0!==e){if(!(e=(e=(e=String(e)).replace(/([0-9])'?s$/,"$1")).replace(/([0-9])(th|rd|st|nd)/,"$1")))return console.warn("Spacetime: Invalid decade input"),this;2===e.length&&/[0-9][0-9]/.test(e)&&(e="19"+e);let t=Number(e);return isNaN(t)?this:(t=10*Math.floor(t/10),this.year(t))}return this.startOf("decade").year()},century:function(e){if(void 0!==e){"string"==typeof e&&(e=(e=(e=e.replace(/([0-9])(th|rd|st|nd)/,"$1")).replace(/([0-9]+) ?(b\.?c\.?|a\.?d\.?)/i,(e,t,n)=>(n.match(/b\.?c\.?/i)&&(t="-"+t),t))).replace(/c$/,""));let t=Number(e);return isNaN(e)?(console.warn("Spacetime: Invalid century input"),this):(0===t&&(t=1),t=t>=0?100*(t-1):100*(t+1),this.year(t))}let t=this.startOf("century").year();return t=Math.floor(t/100),t<0?t-1:t+1},millenium:Xe,millennium:Xe},tt=Object.assign({},Je,Ke,et);tt.milliseconds=tt.millisecond,tt.seconds=tt.second,tt.minutes=tt.minute,tt.hours=tt.hour,tt.hour24=tt.hour,tt.h12=tt.hour12,tt.h24=tt.hour24,tt.days=tt.day;const nt=function(e,t){return 1===e&&d(t)?29:I[e]},rt=(e,t)=>{if(e.month>0){const n=parseInt(e.month/12,10);e.year=t.year()+n,e.month=e.month%12;}else if(e.month<0){const n=Math.abs(e.month);let r=parseInt(n/12,10);n%12!=0&&(r+=1),e.year=t.year()-r,e.month=e.month%12,e.month=e.month+12,12===e.month&&(e.month=0);}return e},at=(e,t,n)=>{let r=t.year(),a=t.month(),o=nt(a,r);for(;n>o;)n-=o,a+=1,a>=12&&(a-=12,r+=1),o=nt(a,r);return e.month=a,e.date=n,e},ot=(e,t,n)=>{e.year=t.year(),e.month=t.month();const r=t.date();for(e.date=r-Math.abs(n);e.date<1;){e.month-=1,e.month<0&&(e.month=11,e.year-=1);const t=nt(e.month,e.year);e.date+=t;}return e},st=["millisecond","second","minute","hour","date","month"],it={second:st.slice(0,1),minute:st.slice(0,2),quarterhour:st.slice(0,2),hour:st.slice(0,3),date:st.slice(0,4),month:st.slice(0,4),quarter:st.slice(0,4),season:st.slice(0,4),year:st,decade:st,century:st};it.week=it.hour,it.season=it.date,it.quarter=it.date;const ut={year:true,quarter:true,season:true,month:true,week:true,date:true},ct={month:true,quarter:true,season:true,year:true},ht={millisecond:e=>e.epoch,second:e=>[e.year(),e.month(),e.date(),e.hour(),e.minute(),e.second()].join("-"),minute:e=>[e.year(),e.month(),e.date(),e.hour(),e.minute()].join("-"),hour:e=>[e.year(),e.month(),e.date(),e.hour()].join("-"),day:e=>[e.year(),e.month(),e.date()].join("-"),week:e=>[e.year(),e.week()].join("-"),month:e=>[e.year(),e.month()].join("-"),quarter:e=>[e.year(),e.quarter()].join("-"),year:e=>e.year()};ht.date=ht.day;let lt=a;const mt=function(e,n,r={}){this.epoch=null,this.tz=m(n,lt),this.silent=void 0===r.silent||r.silent,this.british=r.dmy||r.british,this._weekStart=1,void 0!==r.weekStart&&(this._weekStart=r.weekStart),this._today={},void 0!==r.today&&(this._today=r.today),Object.defineProperty(this,"d",{get:function(){const e=(e=>{const n=e.timezones[e.tz];if(void 0===n)return console.warn("Warning: couldn't find timezone "+e.tz),0;if(void 0===n.dst)return n.offset;const r=n.offset;let a=n.offset+1;"n"===n.hem&&(a=r-1);const o=n.dst.split("->");return  true===t(e.epoch,o[0],o[1],r,a)?r:a})(this);let n=(new Date(this.epoch).getTimezoneOffset()||0)+60*e;n=60*n*1e3;const r=this.epoch+n;return new Date(r)}}),Object.defineProperty(this,"timezones",{get:()=>lt,set:e=>(lt=e,e)});const a=J(this,e);this.epoch=a.epoch,a.tz&&(this.tz=a.tz);};var dt;Object.keys(Fe).forEach(e=>{mt.prototype[e]=Fe[e];}),mt.prototype.clone=function(){return new mt(this.epoch,this.tz,{silent:this.silent,weekStart:this._weekStart,today:this._today,parsers:this.parsers})},mt.prototype.toLocalDate=function(){return this.toNativeDate()},mt.prototype.toNativeDate=function(){return new Date(this.epoch)},dt=mt,Object.keys(tt).forEach(e=>{dt.prototype[e]=tt[e];}),(e=>{e.prototype.add=function(e,t){let n=this.clone();if(!t||0===e)return n;const r=this.clone();if("millisecond"===(t=k(t)))return n.epoch+=e,n;"fortnight"===t&&(e*=2,t="week"),M[t]?n.epoch+=M[t]*e:"week"===t||"weekend"===t?n.epoch+=M.day*(7*e):"quarter"===t||"season"===t?n.epoch+=M.month*(3*e):"quarterhour"===t&&(n.epoch+=15*M.minute*e);let a={};if(it[t]&&it[t].forEach(e=>{a[e]=r[e]();}),ut[t]){const e=r.timezone().current.offset-n.timezone().current.offset;n.epoch+=3600*e*1e3;}if("month"===t&&(a.month=r.month()+e,a=rt(a,r)),"week"===t){const t=r.date()+7*e;t<=28&&t>1&&(a.date=t);}if("weekend"===t&&"saturday"!==n.dayName())n=n.day("saturday",true);else if("date"===t){if(e<0)a=ot(a,r,e);else {const t=r.date()+e;a=at(a,r,t);}0!==e&&r.isSame(n,"day")&&(a.date=r.date()+e);}else if("quarter"===t){if(a.month=r.month()+3*e,a.year=r.year(),a.month<0){const e=Math.floor(a.month/12),t=a.month+12*Math.abs(e);a.month=t,a.year+=e;}else if(a.month>=12){const e=Math.floor(a.month/12);a.month=a.month%12,a.year+=e;}a.date=r.date();}else if("year"===t){const t=r.year()+e,a=n.year();if(a<t){const t=Math.floor(e/4)||1;n.epoch+=Math.abs(M.day*t);}else if(a>t){const t=Math.floor(e/4)||1;n.epoch+=M.day*t;}}else "decade"===t?a.year=n.year()+10:"century"===t&&(a.year=n.year()+100);if(ct[t]){const e=I[a.month];a.date=r.date(),a.date>e&&(a.date=e);}return Object.keys(a).length>1&&N(n,a),n},e.prototype.subtract=function(e,t){return this.clone().add(-1*e,t)},e.prototype.minus=e.prototype.subtract,e.prototype.plus=e.prototype.add;})(mt),(e=>{e.prototype.isSame=function(t,n,r=true){const a=this;if(!n)return null;if("string"==typeof t&&"object"==typeof n){const e=t;t=n,n=e;}return "string"!=typeof t&&"number"!=typeof t||(t=new e(t,this.timezone.name)),n=n.replace(/s$/,""),true===r&&a.tz!==t.tz&&((t=t.clone()).tz=a.tz),ht[n]?ht[n](a)===ht[n](t):null};})(mt),(e=>{const t={isAfter:function(e){const t=w(e=v(e,this));return null===t?null:this.epoch>t},isBefore:function(e){const t=w(e=v(e,this));return null===t?null:this.epoch<t},isEqual:function(e){const t=w(e=v(e,this));return null===t?null:this.epoch===t},isBetween:function(e,t,n=false){e=v(e,this),t=v(t,this);const r=w(e);if(null===r)return null;const a=w(t);return null===a?null:n?this.isBetween(e,t)||this.isEqual(e)||this.isEqual(t):r<this.epoch&&this.epoch<a}};Object.keys(t).forEach(n=>{e.prototype[n]=t[n];});})(mt),(e=>{const t={i18n:function(e){var t,n,r;return p(e.days)&&(t=e.days,K=t.short||K,R=t.long||R),p(e.months)&&function(e){T=e.short||T,C=e.long||C;}(e.months),r=e.useTitleCase,"[object Boolean]"===Object.prototype.toString.call(r)&&(n=e.useTitleCase,ne=n),p(e.ampm)&&function(e){Ve=e.am||Ve,We=e.pm||We;}(e.ampm),p(e.distance)&&function(e){$e=e.pastDistance||$e,je=e.futureDistance||je,be=e.past||be,ke=e.future||ke,we=e.present||we,ve=e.now||ve,ze=e.almost||ze,_e=e.over||_e;}(e.distance),p(e.units)&&function(e={}){ye={second:e.second||ye.second,seconds:e.seconds||ye.seconds,minute:e.minute||ye.minute,minutes:e.minutes||ye.minutes,hour:e.hour||ye.hour,hours:e.hours||ye.hours,day:e.day||ye.day,days:e.days||ye.days,month:e.month||ye.month,months:e.months||ye.months,year:e.year||ye.year,years:e.years||ye.years};}(e.units),this}};Object.keys(t).forEach(n=>{e.prototype[n]=t[n];});})(mt);const ft=(e,t,n)=>new mt(e,t,n),pt=function(e){const t=e._today||{};return Object.keys(t).forEach(n=>{e=e[n](t[n]);}),e};ft.now=(e,t)=>{let n=new mt((new Date).getTime(),e,t);return n=pt(n),n},ft.today=(e,t)=>{let n=new mt((new Date).getTime(),e,t);return n=pt(n),n.startOf("day")},ft.tomorrow=(e,t)=>{let n=new mt((new Date).getTime(),e,t);return n=pt(n),n.add(1,"day").startOf("day")},ft.yesterday=(e,t)=>{let n=new mt((new Date).getTime(),e,t);return n=pt(n),n.subtract(1,"day").startOf("day")},ft.fromUnixSeconds=(e,t,n)=>new mt(1e3*e,t,n),ft.extend=function(e={}){return Object.keys(e).forEach(t=>{mt.prototype[t]=e[t];}),this},ft.timezones=function(){return (new mt).timezones},ft.max=function(e,t){const n=new mt(null,e,t);return n.epoch=864e13,n},ft.min=function(e,t){const n=new mt(null,e,t);return n.epoch=-864e13,n},ft.whereIts=(e,t)=>{let n=new mt(null),r=new mt(null);n=n.time(e),r=t?r.time(t):n.add(59,"minutes");const a=n.hour(),o=r.hour();return Object.keys(n.timezones).filter(e=>{if(-1===e.indexOf("/"))return  false;const t=new mt(null,e),s=t.hour();return s>=a&&s<=o&&(!(s===a&&t.minute()<n.minute())&&!(s===o&&t.minute()>r.minute()))})},ft.version="7.12.1",ft.plugin=ft.extend;

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
    const early = s.time('6:00am');
    if (s.isBefore(early)) {
      return s.ampm('pm')
    }
    return s
  };

  // parse 'twenty past 2'
  const halfPast = function (m, s) {
    let hour = m.match('#Cardinal$');
    const punt = m.not(hour).match('(half|quarter|25|20|15|10|5)');
    // get the mins, and the hour
    hour = hour.text('reduced');
    let mins = punt.text('reduced');
    // support 'quarter'
    if (minMap.hasOwnProperty(mins)) {
      mins = minMap[mins];
    }
    const behind = m.has('to');
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

    let s = ft.now(context.timezone);
    const now = s.clone();
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
        const ampm = m.match('(am|pm)');
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
      let d = ft(context.today);
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
      let d = ft(context.today);
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
      const str = m.groups('time').text('normal');
      if (/^[0-9]{1,2}$/.test(str)) {
        s = s.hour(str); //3 in the morning
        s = s.startOf('hour');
      } else {
        s = s.time(str); // 3:30 in the morning
      }
      if (s.isValid() && !s.isEqual(now)) {
        const desc = m.groups('desc').text('reduced');
        if (desc === 'evening' || desc === 'night') {
          s = s.ampm('pm');
        }
        return { result: s.time(), m }
      }
    }

    // 'this morning at 4'
    m = time.match('this? [<desc>(morning|evening|tonight)] at [<time>(#Cardinal|#Time)]');
    if (m.found) {
      const g = m.groups();
      const str = g.time.text('reduced');
      if (/^[0-9]{1,2}$/.test(str)) {
        s = s.hour(str); //3
        s = s.startOf('hour');
      } else {
        s = s.time(str); // 3:30
      }
      if (s.isValid() && !s.isEqual(now)) {
        const desc = g.desc.text('reduced');
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
      const str = m.text('reduced');
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
    // support seperated number times like '10 30 pm'
    m = time.match('#Time+ (am|pm)?').match('[<hour>#Cardinal] [<minute>#Cardinal] [<ampm>(am|pm)]?');
    if (m.found) {
      const hour = m.groups('hour');
      const minute = m.groups('minute');
      let hourNum = hour.numbers().get()[0];
      let minuteNum = minute.numbers().get()[0];
      if (hourNum < 24 && minuteNum < 60) {
        s = s.hour(hour.text('reduced'));
        s = s.minute(minute.text('reduced'));
        if (m.groups('ampm').found) {
          s = s.ampm(m.groups('ampm').text('reduced'));
        } else {
          s = ampmChooser(s);
        }
        return { result: s.time(), m }
      }
      return { result: null, m: doc.none() }
    }

    // parse random a time like '4:54pm'
    const str = time.text('reduced');
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
  const iana$1 = ft().timezones;
  const formal$1 = Object.keys(iana$1).reduce((h, k) => {
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
      const num = Number(m[1]) * -1;
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
    const str = m.text('reduced');

    // check our list of informal tz names
    if (informal$2.hasOwnProperty(str)) {
      return { result: informal$2[str], m }
    }
    const tz = parseOffset(str);
    if (tz) {
      return { result: tz, m }
    }

    return { result: null, m: doc.none() }
  };

  // pull-out 'thurs' from 'thurs next week'
  const parseWeekday = function (doc) {
    const day = doc.match('#WeekDay');
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
    const shift = res.result;
    doc = doc.not(res.m);

    // parse 'nth week of june'
    res = getCounter(doc);
    const counter = res.result;
    doc = doc.not(res.m);

    // parse 'eastern time'
    res = parseTimezone(doc);
    const tz = res.result;
    doc = doc.not(res.m);

    // parse '2pm'
    res = parseTime(doc, context);
    const time = res.result;
    doc = doc.not(res.m);

    // parse 'tuesday'
    res = parseWeekday(doc);
    const weekDay = res.result;
    doc = doc.not(res.m);

    // parse 'start of x'
    res = parseSection(doc);
    const section = res.result;
    doc = doc.not(res.m);

    // parse 'next x'
    res = parseRelative(doc);
    const rel = res.result;
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
      const d = ft(input, context.timezone, { today: today, dmy: context.dmy });
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
      const d = new Unit(this.d, this.unit, this.context);
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
        const justHour = /^[0-9]{1,2}$/;
        if (justHour.test(str)) {
          this.d = this.d.hour(str);
        } else {
          this.d = this.d.time(str);
        }
        // wiggle the best am/pm
        const amPM = /[ap]m/.test(str);
        if (!amPM) {
          const tooEarly = this.d.time('6:00am');
          if (this.d.isBefore(tooEarly)) {
            this.d = this.d.ampm('pm');
          }
          const tooLate = this.d.time('10:00pm');
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
        const epoch = this.d.epoch;
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
        const dayEnd = this.d.time(this.context.dayEnd);
        if (dayEnd.isAfter(this.d)) {
          this.d = dayEnd;
          return this
        }
      }
      return this
    }
    middle() {
      const diff = this.d.diff(this.d.endOf(this.unit));
      const minutes = Math.round(diff.minutes / 2);
      this.d = this.d.add(minutes, 'minutes');
      return this
    }
    // move it to 3/4s through
    beforeEnd() {
      const diff = this.d.startOf(this.unit).diff(this.d.endOf(this.unit));
      const mins = Math.round(diff.minutes / 4);
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
        this.d = ft(context.today, context.timezone);
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
        const tooFar = this.context.today.endOf('week').add(1, 'week');
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
        const start = this.context.today.startOf('week');
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
    const str = doc.text('reduced');
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
      let s = ft.now(tz);
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
      let s = ft.now(tz);
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
      let e = ft(date, tz);
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
      let s = ft(seasons[season], tz);
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
      let s = ft(date + ' 2018', tz);
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

  const nowYear = ft.now().year();

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
    const m = doc.match('[<holiday>#Holiday+] [<year>#Year?]');
    let year = context.today.year();
    if (m.groups('year').found) {
      year = Number(m.groups('year').text('reduced')) || year;
    }
    const str = m.groups('holiday').text('reduced');
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

  const matchStr = `^(${Object.keys(mapping$1).join('|')})$`;

  // when a unit of time is spoken of as 'this month' - instead of 'february'
  const nextLast = function (doc, context) {
    //this month, last quarter, next year
    let m = doc.match(matchStr);
    if (m.found === true) {
      const str = m.text('reduced');
      if (mapping$1.hasOwnProperty(str)) {
        const Model = mapping$1[str];
        if (!Model) {
          return null
        }
        const unit = new Model(null, str, context);
        return unit
      }
    }
    //'next friday, last thursday'
    m = doc.match('^#WeekDay$');
    if (m.found === true) {
      const str = m.text('reduced');
      const unit = new WeekDay(str, null, context);
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
      const str = doc.text('reduced');
      const s = ft(str, context.timezone, { today: fmtToday(context) });
      const unit = new Season(s, null, context);
      if (unit.d.isValid() === true) {
        return unit
      }
    }

    // support 'q4 2020'
    m = doc.match('[<q>#FinancialQuarter] [<year>#Year?]');
    if (m.found) {
      const str = m.groups('q').text('reduced');
      let s = ft(str, context.timezone, { today: fmtToday(context) });
      if (m.groups('year')) {
        const year = Number(m.groups('year').text()) || context.today.year();
        s = s.year(year);
      }
      const unit = new Quarter(s, null, context);
      if (unit.d.isValid() === true) {
        return unit
      }
    }
    // support '4th quarter 2020'
    m = doc.match('[<q>#Value] quarter (of|in)? [<year>#Year?]');
    if (m.found) {
      const q = m.groups('q').text('reduced');
      let s = ft(`q${q}`, context.timezone, { today: fmtToday(context) });
      if (m.groups('year')) {
        const year = Number(m.groups('year').text()) || context.today.year();
        s = s.year(year);
      }
      const unit = new Quarter(s, null, context);
      if (unit.d.isValid() === true) {
        return unit
      }
    }
    // support '2020'
    m = doc.match('^#Year$');
    if (m.found) {
      const str = doc.text('reduced');
      let s = ft(null, context.timezone, { today: fmtToday(context) });
      s = s.year(str);
      const unit = new Year(s, null, context);
      if (unit.d.isValid() === true) {
        return unit
      }
    }

    return null
  };

  // parse things like 'june 5th 2019'
  // most of this is done in spacetime
  const parseExplicit = function (doc, context) {
    const impliedYear = context.today.year();
    // 'fifth of june 1992'
    // 'june the fifth 1992'
    let m = doc.match('[<date>#Value] of? [<month>#Month] [<year>#Year]');
    if (!m.found) {
      m = doc.match('[<month>#Month] the? [<date>#Value] [<year>#Year]');
    }
    if (m.found) {
      const obj = {
        month: m.groups('month').text('reduced'),
        date: m.groups('date').text('reduced'),
        year: m.groups('year').text() || impliedYear,
      };
      const unit = new CalendarDate(obj, null, context);
      if (unit.d.isValid() === true) {
        return unit
      }
    }

    // 'march 1992'
    m = doc.match('[<month>#Month] of? [<year>#Year]');
    if (m.found) {
      const obj = {
        month: m.groups('month').text('reduced'),
        year: m.groups('year').text('reduced') || impliedYear,
      };
      const unit = new Month(obj, null, context);
      if (unit.d.isValid() === true) {
        return unit
      }
    }

    // 'march 5th next year'
    m = doc.match('[<month>#Month] [<date>#Value+]? of? the? [<rel>(this|next|last|current)] year');
    if (m.found) {
      const rel = m.groups('rel').text('reduced');
      let year = impliedYear;
      if (rel === 'next') {
        year += 1;
      } else if (rel === 'last') {
        year -= 1;
      }
      const obj = {
        month: m.groups('month').text('reduced'),
        date: m.groups('date').numbers(0).get()[0],
        year,
      };
      if (obj.date === undefined) {
        obj.date = 1;
        const unit = new Month(obj, null, context);
        if (unit.d.isValid() === true) {
          return unit
        }
      }
      const unit = new CalendarDate(obj, null, context);
      if (unit.d.isValid() === true) {
        return unit
      }
    }

    // '5th of next month'
    m = doc.match('^the? [<date>#Value+]? of? [<rel>(this|next|last|current)] month');
    if (m.found) {
      let month = context.today.month();
      const rel = m.groups('rel').text('reduced');
      if (rel === 'next') {
        month += 1;
      } else if (rel === 'last') {
        month -= 1;
      }
      const obj = {
        month,
        date: m.groups('date').numbers(0).get()[0],
      };
      const unit = new CalendarDate(obj, null, context);
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
      const obj = {
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
      const obj = {
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
      const obj = {
        month: context.today.month(),
        date: m.groups('date').text('reduced'),
        year: context.today.year(),
      };
      const unit = new CalendarDate(obj, null, context);
      if (unit.d.isValid() === true) {
        return unit
      }
    }
    // support date-only 'the 21st'
    m = doc.match('the [<date>#Value]');
    if (m.found) {
      const obj = {
        month: context.today.month(),
        date: m.groups('date').text('reduced'),
        year: context.today.year(),
      };
      const unit = new CalendarDate(obj, null, context);
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
      const str = doc.text('reduced');
      const unit = new Moment(str, null, context);
      if (unit.d.isValid() === true) {
        return unit
      }
    }
    const str = doc.text('reduced');
    if (!str) {
      return new Moment(context.today, null, context)
    }
    // punt it to spacetime, for the heavy-lifting
    const unit = new Day(str, null, context);
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
    const Unit = units[counter.unit];
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
    const u = new Unit(d, null, unit.context);
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
      const shift = parts.shift;
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
    const parts = tokenize(doc, context);
    doc = parts.doc;
    // logger
    log$1(parts);

    //apply our given timezone
    if (parts.tz) {
      context = Object.assign({}, context, { timezone: parts.tz });
      // set timezone on any 'today' value, too
      const iso = context.today.format('iso-short');
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
      const repeat = { interval: {} };
      const unit = m.groups('unit').text('reduced');
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
      const repeat = { interval: {} };
      const units = m.groups('unit');
      units.nouns().toSingular();
      const unit = units.text('reduced');
      repeat.interval[unit] = m.groups('num').numbers().get()[0];
      repeat.choose = parseLogic(m);
      doc = doc.remove(m);
      return { repeat: repeat }
    }

    // 'every friday'
    m = doc.match('[<logic>(every|any|each|a)] [<skip>other?] [<day>#WeekDay+] (starting|beginning|commencing)?');
    if (m.found) {
      const repeat = { interval: { day: 1 }, filter: { weekDays: {} } };
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
      const repeat = { interval: { day: 1 }, filter: { weekDays: {} } };
      const day = m.groups('day');
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
      const repeat = { interval: { day: 1 }, filter: { weekDays: {} } };
      let str = m.groups('day').text('reduced');
      str = str.replace(/s$/, '');
      str = dayNames[str]; //normalize it
      if (str) {
        repeat.filter.weekDays[str] = true;
        repeat.choose = 'OR';
        doc = doc.remove(m);
        const time = m.groups('time');
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
    const start = obj.start;
    const end = obj.end;
    if (start.d.isAfter(end.d)) {
      // wednesday to sunday -> move end up a week
      if (start.isWeekDay && end.isWeekDay) {
        obj.end.next();
        return obj
      }
      // else, reverse them
      const tmp = start;
      obj.start = end;
      obj.end = tmp;
    }
    return obj
  };

  const moveToPM = function (obj) {
    const start = obj.start;
    const end = obj.end;
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
        const from = m.groups('from');
        const to = m.groups('to');
        const end = parseDate(to, context);
        if (end) {
          const start = end.clone();
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
        const a = m.groups('a');
        const b = m.groups('b');
        main = parseDate(main, context);
        if (main) {
          main.applyTime(a.text('implicit'));
          const end = main.clone();
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
        const to = m.groups('to');
        from = parseDate(from, context);
        if (from) {
          const end = from.clone();
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
        const before = m.match('^during? [#Month]', 0);
        m = m.not('(or|and)');
        const start = parseDate(before, context);
        if (start) {
          const result = [
            {
              start: start,
              end: start.clone().end(),
              unit: start.unit,
            },
          ];
          // add more run-on numbers?
          const more = m.not(before);
          if (more.found) {
            more.match('#Month').forEach((month) => {
              const s = parseDate(month, context);
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
        const before = m.match('^#Month #Value');
        const start = parseDate(before, context);
        if (start) {
          const result = [
            {
              start: start,
              end: start.clone().end(),
              unit: start.unit,
            },
          ];
          // add more run-on numbers?
          const more = m.not(before);
          if (more.found) {
            let month = m.match('#Month').text('reduced');
            more.match('#Value').forEach((v) => {
              let thisD = v.prepend(month);
              let startDate = parseDate(thisD, context);
              if (startDate) {
                result.push({
                  start: startDate,
                  end: startDate.clone().end(),
                  unit: startDate.unit,
                });
              }
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
        const month = m.match('#Month');
        const year = m.match('#Year');
        m = m.not('#Year');
        const results = [];
        m.match('#Value').forEach((val) => {
          val = val.clone();
          const d = val.prepend(month.text());
          if (year.found) {
            d.append(year);
          }
          const start = parseDate(d, context);
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
        const month = m.match('#Month');
        const year = m.match('#Year');
        m = m.not('#Year');
        const results = [];
        m.match('#Value').forEach((val) => {
          const d = val.append(month);
          if (year.found) {
            d.append(year);
          }
          const start = parseDate(d, context);
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
        const fromDoc = m.groups('from');
        const toDoc = m.groups('to');
        const from = parseDate(fromDoc, context);
        const to = parseDate(toDoc, context);
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
        const { start, end, year } = m.groups();
        const y = year && year.found ? Number(year.text('reduced')) : context.today.year();
        let obj = { month: start.text('reduced'), year: y };
        const left = new Month(obj, null, context).start();
        obj = { month: end.text('reduced'), year: y };
        const right = new Month(obj, null, context).start();
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
        const res = m.groups();
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
            const obj = {
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
      // two day-of-month dates - '28th of September to 5th of October 2008'
      match:
        '[<from>#Value] of? [<fromMonth>#Month] (to|through|thru) [<to>#Value] of? [<toMonth>#Month] [<year>#Year?]',
      desc: '28th of September to 5th of October 2008',
      parse: (m, context) => {
        const { from, fromMonth, to, toMonth, year } = m.groups();
        let start = from.clone().append(fromMonth);
        let end = to.clone().append(toMonth);
        if (year && year.found) {
          start = start.append(year);
          end = end.append(year);
        }
        start = parseDate(start, context);
        end = parseDate(end, context);
        if (start && end) {
          if (start.d.isAfter(end.d)) {
            end.d = end.d.add(1, 'year');
          }
          return {
            start: start,
            end: end.end(),
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
        const { month, from, to, year } = m.groups();
        const year2 = year.clone();
        let start = from.clone().prepend(month).append(year);
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
          const fromDate = m.groups('from');
          const from = to.clone();
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
          const toDate = m.groups('to');
          const to = from.clone();
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
        const year = m.groups('year').numbers().get()[0];
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
          const start = new CalendarDate(context.today, null, context);
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
        const obj = {
          month: month.text('reduced'),
          date: 1, //assume 1st
          year: year && year.found ? year.text('reduced') : context.today.year()
        };
        const unit = new Month(obj, null, context);
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
        const unit = parseDate(m, context);
        if (unit) {
          let start = new Unit(context.today, null, context);
          if (start.d.isAfter(unit.d)) {
            start = unit.clone().applyShift({ weeks: -2 });
          }
          // end the night before
          const end = unit.clone().applyShift({ day: -1 });
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
        const unit = parseDate(m, context);
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
        const unit = parseDate(m, context);
        const start = unit.clone().middle();
        const end = unit.beforeEnd();
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
        const unit = parseDate(m, context);
        if (unit) {
          const start = unit.clone();
          const end = unit.end();
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
        const unit = parseDate(m, context);
        if (unit) {
          const end = unit.clone();
          const start = unit.start();
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
    const unit = parseDate(doc, context);
    if (unit) {
      const end = unit.clone().end();
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
      const fmt = ranges[i];
      const m = doc.match(fmt.match);
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
    const repeats = parseIntervals(m, context) || {};
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
    context.today = context.today || ft.now(context.timezone);
    context.today = ft(context.today, context.timezone);

    doc = normalize$1(doc);

    const res = parseRanges(doc, context);
    return res
  };

  const getDuration = function (range) {
    const end = range.end.d.add(1, 'millisecond');
    const diff = end.since(range.start.d).diff;
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
    const diff = range.end ? getDuration(range) : {};
    return {
      start: range.start.format('iso'),
      end: range.end ? range.end.format('iso') : null,
      timezone: range.start.d.format('timezone'),
      duration: diff,
      // range: getRange(diff)
    }
  };

  const quickDate = function (view, str) {
    const tmp = view.fromText(str);
    const found = parse$2(tmp, view.opts)[0];
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
        const all = [];
        this.forEach(m => {
          parse$2(m, this.opts).forEach(res => {
            const json = toJSON(res);
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
          const json = m.toView().json(opts)[0] || {};
          if (opts && opts.dates !== false) {
            const parsed = parse$2(m, this.opts);
            if (parsed.length > 0) {
              json.dates = toJSON(parsed[0]);
            }
          }
          return json
        }, [])
      }

      /** replace date terms with a formatted date */
      format(fmt) {
        const found = this;
        const res = found.map(m => {
          const obj = parse$2(m, this.opts)[0] || {};
          if (obj.start) {
            const start = obj.start.d;
            let str = start.format(fmt);
            if (obj.end) {
              const end = obj.end.d;
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
        const pivot = quickDate(this, iso);
        return this.filter(m => {
          const obj = parse$2(m, this.opts)[0] || {};
          return obj.start && obj.start.d && obj.start.d.isBefore(pivot)
        })
      }
      /** return only dates occuring after a given date  */
      isAfter(iso) {
        const pivot = quickDate(this, iso);
        return this.filter(m => {
          const obj = parse$2(m, this.opts)[0] || {};
          return obj.start && obj.start.d && obj.start.d.isAfter(pivot)
        })
      }
      /** return only dates occuring after a given date  */
      isSame(unit, iso) {
        const pivot = quickDate(this, iso);
        return this.filter(m => {
          const obj = parse$2(m, this.opts)[0] || {};
          return obj.start && obj.start.d && obj.start.d.isSame(pivot, unit)
        })
      }
    }

    View.prototype.dates = function (opts) {
      const m = findDate(this);
      return new Dates(this.document, m.pointer, null, opts)
    };
  };

  const normalize = function (doc) {
    doc = doc.clone();
    // 'four thirty' -> 4:30
    const m = doc.match('#Time+').match('[<hour>#Cardinal] [<min>(thirty|fifteen)]');
    if (m.found) {
      const hour = m.groups('hour');
      const min = m.groups('min');
      const num = hour.values().get()[0];
      if (num > 0 && num <= 12) {
        const mins = min.values().get()[0];
        const str = `${num}:${mins}`;
        m.replaceWith(str);
      }
    }

    if (!doc.numbers) {
      console.warn(`Warning: compromise .numbers() not loaded.\n   This plugin requires >= v14`); //eslint-disable-line
    } else {
      // doc.numbers().normalize()
      // convert 'two' to 2
      const num = doc.numbers();
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
    const res = parseTime(m, context);
    if (!res.result) {
      return { time: null, '24h': null }
    }
    const s = ft.now().time(res.result);
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
        const found = this;
        const res = found.map(m => {
          const obj = parse$1(m) || {};
          if (obj.time) {
            const s = ft.now().time(obj.time);
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
          const json = m.toView().json(opts)[0] || {};
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

  const mapping = {
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
    const duration = {};
    //parse '8 minutes'
    const twoWord = doc.match('#Value+ #Duration');
    if (twoWord.found) {
      twoWord.forEach((m) => {
        const num = m.numbers().get()[0];
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
      const oneWord = doc.match('(#Duration && /[0-9][a-z]+$/)');
      if (oneWord.found) {
        const str = doc.text();
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
          const json = m.toView().json(opts)[0] || {};
          if (opts && opts.duration !== false) {
            json.duration = parse(m);
          }
          return json
        }, [])
      }
      /** easy getter for the time */
      get(options) {
        const arr = [];
        this.forEach(doc => {
          const res = parse(doc);
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
      const str = p.text('reduced');
      const num = parseInt(str, 10);
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
      const str = p.text('reduced');
      const num = parseInt(str, 10);
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
    const cardinal = doc.if('#Cardinal');
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
      const m = cardinal.match('between [#Cardinal] and [#Cardinal]');
      tagYear(m.groups('0'), 'between-year-and-year-1');
      tagYear(m.groups('1'), 'between-year-and-year-2');
    }

    //'2020' bare input
    const m = doc.match('^/^20[012][0-9]$/$');
    tagYearSafe(m, '2020-ish');

    return doc
  };

  // 3-4 can be a time-range, sometimes
  const tagTimeRange = function (m, reason) {
    if (m.found) {
      m.tag('Date', reason);
      const nums = m.numbers().lessThan(31).ifNo('#Year');
      nums.tag('#Time', reason);
    }
  };

  //
  const timeTagger = function (doc) {

    const date = doc.if('#Date');
    if (date.found) {
      // ==time-ranges=
      //   --number-ranges--
      const range = date.if('#NumberRange');
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
    const m = doc.match('#Time [#Acronym]', 0);
    if (m.found) {
      const str = m.text('reduced');
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
      const oops = doc.match('#Date+ by #Date+');
      if (oops.found && !oops.has('^due')) {
        oops.match('^#Date+').unTag('Date', 'by-monday');
      }

      const d = doc.match('#Date+');

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
  const matches = [
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
    const { world } = view;
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
  const iana = ft().timezones;
  const formal = Object.keys(iana).reduce((h, k) => {
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

  const lex = {
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

  var version = '3.8.0';

  /* eslint-disable no-console */

  const fmt = iso => (iso ? ft(iso).format('{nice-day} {year}') : '-');

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
      const res = m.dates().get()[0];

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

'use strict';
const fns = require('../fns');
//turns holiday-names into text-versions of their dates
//https://en.wikipedia.org/wiki/federal_holidays_in_the_united_states

//some major, and unambiguous holidays with the same date each year
//yep,
let january = 0;
let february = 1;
let march = 2;
let april = 3;
let may = 4;
let june = 5;
let july = 6;
let august = 7;
let september = 8;
let october = 9;
let november = 10;
let december = 11;

let annual = {
  'new years': [january, 1],
  'new years day': [january, 1],
  'inauguration day': [january, 20],
  'australia day': [january, 26],
  'national freedom day': [february, 1],
  'groundhog day': [february, 2],
  'rosa parks day': [february, 4],
  'valentines day': [february, 14],
  'saint valentines day': [february, 14],
  'st valentines day ': [february, 14],
  'saint patricks day': [march, 17],
  'st patricks day': [march, 17],
  'april fools': [april, 1],
  'april fools day': [april, 1],
  'emancipation day': [april, 16],
  'labour day': [may, 1],
  'cinco de mayo': [may, 5],
  'national nurses day': [may, 6],
  'harvey milk day': [may, 22],
  'victoria day': [may, 24],
  'juneteenth': [june, 19],
  'canada day': [july, 1],
  'independence day': [july, 4],
  'independents day': [july, 4],
  'bastille day': [july, 14],
  'purple heart day': [august, 7],
  'womens equality day': [august, 26],
  'halloween': [october, 31],
  'all hallows eve': [october, 31],
  'veterans day': [november, 11],
  'st andrews day': [november, 30],
  'saint andrews day': [november, 30],
  'all saints day': [november, 1],
  'all sts day': [november, 1],
  'armistice day': [november, 11],
  'rememberance day': [november, 11],
  'christmas eve': [december, 24],
  'christmas': [december, 25],
  'xmas': [december, 25],
  'boxing day': [december, 26],
  'st stephens day': [december, 26],
  'saint stephens day': [december, 26],
  'new years eve': [december, 31]
};

// hardcoded dates for astronomical holidays
//   ----please change, every few years(!)---
const astronomical = {
  2016: {
    'chinese new year': [february, 8],
    'easter': [march, 27],
    'easter sunday': [march, 27],
    'easter monday': [march, 28],
    'good friday': [march, 25],
    'ascension day': [may, 5],
    'eid': [july, 6],
    'eid al-fitr': [july, 6],
    'eid al-adha': [september, 11],
    'ramadan': [may, 27], // Ranged holiday
    'diwali': [october, 30],

    'martin luther king': [january, 18], //[third Monday in January],
    'mlk': [january, 18], //[third Monday in January],
    // 'washingtons birthday': [february, 15], //[third monday in february],
    'presidents day': [february, 15], // [third monday in february],
    'mardi gras': [february, 9], // [47 days before easter],
    'tax day': [april, 18],
    'commonwealth day': [march, 14], //[second monday in march],
    'mothers day': [may, 8], //[second Sunday in May],
    'memorial day': [may, 30], //[last monday in may],
    'fathers day': [june, 19], //[third Sunday in June],
    'columbus day': [october, 10], //[second monday in october],
    'indigenous peoples day': [october, 10], //[second monday in October],
    'canadian thanksgiving': [october, 10], //[second monday in october],
    'election day': [november, 8], // [Tuesday following the first Monday in November],
    'thanksgiving': [november, 24], //[fourth Thursday in November],
    'tday': [november, 24], //[fourth Thursday in November],
    'turkey day': [november, 24], //[fourth Thursday in November],
    'black friday': [november, 25], //[fourth tuesday in november],
    'cyber monday': [november, 28], //,

  },
  2017: {
    'chinese new year': [january, 28],
    'easter': [april, 16],
    'easter sunday': [april, 16],
    'easter monday': [april, 17],
    'good friday': [april, 14],
    'ascension day': [may, 25],
    'eid': [july, 25],
    'eid al-fitr': [july, 25],
    'ramadan': [may, 27], // Ranged holiday
    'diwali': [october, 21],

    'martin luther king day': [january, 16], //[third monday in january],
    'mlk day': [january, 16], //[third Monday in January],
    // 'washingtons birthday': [february, 20], //[third monday in february],
    'presidents day': [february, 20], //[third monday in february],
    'mardi gras': [february, 28], //[47 days before easter],
    'commonwealth day': [march, 13], //[second monday in march],
    'tax day': [april, 18],
    'memorial day': [may, 29], //[last monday in may],
    'mothers day': [may, 14], //[second Sunday in May],
    'fathers day': [june, 18], //[third Sunday in June],
    'labor day': [september, 4], //[first monday in september],
    'columbus day': [october, 9], //[second monday in october],
    'indigenous peoples day': [october, 9], //[second monday in October],
    'canadian thanksgiving': [october, 9], //[second monday in october],
    'election day': [november, 7], // [Tuesday following the first Monday in November],
    'thanksgiving': [november, 23], //[fourth Thursday in November],
    'tday': [november, 23], //[fourth Thursday in November],
    'turkey day': [november, 23], //[fourth Thursday in November],
    'black friday': [november, 24], //[fourth tuesday in november],
    'cyber monday': [november, 27], //
  },
  2018: {
    // 'chinese new year': [, ],
    // 'easter': [april, ],
    // 'easter sunday': [april, ],
    // 'easter monday': [april, ],
    // 'good friday': [april, ],
    // 'ascension day': [may, ],
    // 'eid': [july, ],
    // 'eid al-fitr': [july, ],
    // 'ramadan': [may, ], // Ranged holiday
    // 'diwali': [october, ],

    'martin luther king day': [january, 15], //[third monday in january],
    'mlk day': [january, 15], //[third Monday in January],
    // 'washingtons birthday': [february, 19], //[third monday in february],
    'presidents day': [february, 19], //[third monday in february],
    'mardi gras': [february, 13], //[47 days before easter],
    'commonwealth day': [march, 12], //[second monday in march],
    'tax day': [april, 17],
    'mothers day': [may, 13], //[second Sunday in May],
    'memorial day': [may, 28], //[last monday in may],
    'fathers day': [june, 17], //[third Sunday in June],
    'labor day': [september, 3], //[first monday in september],
    'columbus day': [october, 8], //[second monday in october],
    'indigenous peoples day': [october, 8], //[second monday in October],
    'canadian thanksgiving': [october, 8], //[second monday in october],
    'election day': [november, 6], // [Tuesday following the first Monday in November],
    'thanksgiving': [november, 22], // [fourth Thursday in November],
    'tday': [november, 22], // [fourth Thursday in November],
    'turkey day': [november, 22], //[fourth Thursday in November],
    'black friday': [november, 23], //[fourth tuesday in november],
    'cyber monday': [november, 26], //
  }
};
//select current year
let thisYear = new Date().getFullYear();
let holidays = fns.extendObj(annual, astronomical[thisYear] || {});

module.exports = holidays;

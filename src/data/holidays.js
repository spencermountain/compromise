'use strict';
const fns = require('../fns');
//turns holiday-names into text-versions of their dates
//https://en.wikipedia.org/wiki/federal_holidays_in_the_united_states

//some major, and unambiguous holidays with the same date each year
let annual = {
  //general
  'new years eve': 'december 31',
  'new years': 'january 1',
  'new years day': 'january 1',
  'thanksgiving': 'fourth thursday in november',
  'christmas eve': 'december 24',
  'christmas': 'december 25',
  'christmas day': 'december 25',
  'saint patricks day': 'march 17',
  'st patricks day': 'march 17',
  'april fools': 'april 1',
  'halloween': 'october 31',
  'valentines': 'february 14',
  'valentines day': 'february 14',

  //american
  'martin luther king': 'third monday in january',
  'inauguration day': 'january 20',
  'washingtons birthday': 'third monday in february',
  'presidents day': 'third monday in february',
  'memorial day': 'last monday in may',
  // 'independence': 'july 4',
  'labor day': 'first monday in september',
  'columbus day': 'second monday in october',
  'veterans day': 'november 11',

  //british
  'labour day': 'first monday in september',
  'commonwealth day': 'second monday in march',
  'st andrews day': 'november 30',
  'saint andrews day': 'november 30',
  'may day': 'may 1',

  //russian
  'russia day': 'june 12',

  //australian
  'australia day': 'january 26',
  'boxing day': 'december 26',
  'queens birthday': '2nd monday in june',

  //canadian
  'canada day': 'july 1',
  'victoria day': 'may 24',
  'canadian thanksgiving': 'second monday in october',
  'rememberance day': 'november 11',
  'august civic holiday': 'first monday in august',
  'natal day': 'first monday in august',

  //european
  'all saints day': 'november 1',
  'armistice day': 'november 11',
  'bastille day': 'july 14',
  'st stephens day': 'december 26',
  'saint stephens day': 'december 26'
};


// hardcoded dates for non-regular holidays
//   ----change every few years(!)---   TODO :do more years
const astronomical = {
  2015: {
    'chinese new year': 'february 19',
    'easter': 'april 5',
    'easter sunday': 'april 5',
    'easter monday': 'april 6',
    'good friday': 'april 3',
    'ascension day': 'may 14',
    'eid': 'july 17',
    'eid al-fitr': 'july 17',
    'eid al-adha': 'september 24',
    'ramadan': 'june 6', //range
    'ashura': '23 october',
    'diwali': '11 november'
  },
  2016: {
    'chinese new year': 'february 8',
    'easter': 'march 27',
    'easter sunday': 'march 27',
    'easter monday': 'march 28',
    'good friday': 'march 25',
    'ascension day': 'may 5',
    'eid': 'july 6',
    'eid al-fitr': 'july 6',
    'eid al-adha': 'september 11',
    'ramadan': 'may 27',
    'diwali': 'october 30'
  },
  2017: {
    'chinese new year': '28 january',
    'easter': 'april 16',
    'easter sunday': 'april 16',
    'easter monday': 'april 17',
    'good friday': 'april 14',
    'ascension day': 'may 25',
    'eid': 'july 25',
    'eid al-fitr': 'july 25',
    'diwali': 'october 21',
    'ramadan': 'may 27'
  }
};
//select current year
let thisYear = new Date().getFullYear();
let holidays = fns.extend(annual, astronomical[thisYear] || {});

module.exports = holidays;

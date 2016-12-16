'use strict';
const parseTime = require('./parseTime');
//
const isDate = (num) => {
  if (num && num < 31 && num > 0) {
    return true;
  }
  return false;
};

//please change in one thousand years
const isYear = (num) => {
  if (num && num > 1000 && num < 3000) {
    return true;
  }
  return false;
};

//
const parseDate = (r) => {
  let result = {
    month: null,
    date: null,
    weekday: null,
    year: null,
    knownDate: null,
    timeOfDay: null,
  };
  let m = r.match('(#Holiday|today|tomorrow|yesterday)');
  if (m.found) {
    result.knownDate = m.normal();
  }
  m = r.match('#Month');
  if (m.found) {
    result.month = m.list[0].terms[0].month.index();
  }
  m = r.match('#WeekDay');
  if (m.found) {
    result.weekday = m.list[0].terms[0].weekday.index();
  }
  m = r.match('#Time');
  if (m.found) {
    result.timeOfDay = parseTime(r);
    r.not('#Time'); //unsure
  }

  //january fifth 1992
  m = r.match('#Month #Value #Year');
  if (m.found) {
    let numbers = m.values().numbers();
    if (isDate(numbers[0])) {
      result.date = numbers[0];
    }
    let year = parseInt(r.match('#Year').normal(), 10);
    if (isYear(year)) {
      result.year = year;
    }
  }
  if (!m.found) {
    //january fifth,  january 1992
    m = r.match('#Month #Value');
    if (m.found) {
      let numbers = m.values().numbers();
      let num = numbers[0];
      if (isDate(num)) {
        result.date = num;
      }
    }
    //january 1992
    m = r.match('#Month #Year');
    if (m.found) {
      let num = parseInt(r.match('#Year').normal(), 10);
      if (isYear(num)) {
        result.year = num;
      }
    }
  }

  //fifth of january
  m = r.match('#Value of #Month');
  if (m.found) {
    let num = m.values().numbers()[0];
    if (isDate(num)) {
      result.date = num;
    }
  }
  return result;
};
module.exports = parseDate;

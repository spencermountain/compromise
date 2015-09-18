import to_date from "../src/term/value/to_date";

exports.testCreateDate = function(date_string) {
  return new to_date(date_string);
};

exports.getAbsoluteDate = function(year, month, day, hours, minutes, seconds, milliseconds) {
  var d = new Date();

  d.setFullYear(year || d.getFullYear());
  d.setMonth(month || d.getMonth());
  d.setDate(day || d.getDate());
  
  d.setHours(hours || 0);
  d.setMinutes(minutes || 0);
  d.setSeconds(seconds || 0);
  d.setMilliseconds(milliseconds || 0);
  
  return d;
};
exports.getRelativeDate = function(year, month, day, hours, minutes, seconds, milliseconds) {
  var d = new Date();
  var setYear  = d.getFullYear() + (year || 0);
  var setMonth = d.getMonth() + (month || 0);
  var setDate  = d.getDate() + (day || 0);
  // Relative dates that have no more specificity than months only walk
  // the bounds of months, they can't traverse into a new month if the
  // target month doesn't have the same number of days.
  if(day === undefined && month !== undefined) {
    setDate = Math.min(setDate, testGetDaysInMonth(setYear, setMonth));
    d.setDate(setDate);
  }
  d.setFullYear(setYear);
  d.setMonth(setMonth);
  d.setDate(setDate);
  
  if (hours === undefined) {
    d.setHours(0);
  } else {
    d.setHours(d.getHours() + (hours || 0));
  }
  
  if (minutes === undefined) {
    d.setMinutes(0);
  } else {
    d.setMinutes(d.getMinutes() + (minutes || 0));
  }
    
  if (seconds === undefined) {
    d.setSeconds(0);
  } else {
    d.setSeconds(d.getSeconds() + (seconds || 0));
  }
  
  if (milliseconds === undefined) {
    d.setMilliseconds(0);
  } else {
    d.setMilliseconds(d.getMilliseconds() + (milliseconds || 0));
  }

  return d;
};

exports.getDateWithWeekdayAndOffset = function(weekday, offset, hours, minutes, seconds, milliseconds) {
  var d = new Date();
  if(offset) d.setDate(d.getDate() + offset);
  d.setDate(d.getDate() + (weekday - d.getDay()));
  d.setHours(hours || 0);
  d.setMinutes(minutes || 0);
  d.setSeconds(seconds || 0);
  d.setMilliseconds(milliseconds || 0);
  return d;
};

let testGetDaysInMonth = function(year, month) {
  return 32 - new Date(year, month, 32).getDate();
};

exports.testGetDaysInMonth = testGetDaysInMonth;

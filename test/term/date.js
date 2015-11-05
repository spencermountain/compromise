'use strict';
let mocha = require('mocha');
let should = require('should');
let Term = require('../../src/term/term.js');
let tests = require('./british_terms.js');

let to_date = require('../../src/term/noun/value/to_date');
let helpers = require('../dateHelpers');

let dateEqual = function (a, b, message, debug) {

  const buffer = 50;

  it(message, function (done) {
    if (a && a.length === 1 && a[0] && a[0].Date) {
      let date0 = a[0].Date.getTime();
      let date1 = b[0].date.getTime();
      let offset = Math.abs(date0 - date1);

      if (debug) {
        console.log('--- DEBUG ---\n', a, '\n', b);
      }

      (offset < buffer).should.be.true();

      // For ranges we have a second date
      if (b[0].to) {
        let date0To = a[0].to.Date.getTime();
        let date1To = b[0].to.getTime();
        let offset1 = Math.abs(date0To - date1To);
        (offset1 < buffer).should.be.true();
      }
    } else if (a && a.length > 1 && a.length == b.length) {

      // TODO - Sort out arrays of multi matches.
      for (let i = 0; i < a.length; i++) {

        let date0 = a[i].Date.getTime();
        let date1 = b[i].date.getTime();

        let offset = Math.abs(date0 - date1);
        (offset < buffer).should.be.true();
      }
    } else {
      a.should.eql(b);
    }
    done();
  });
};

let dateAssert = function (assert, result, debug) {
  dateEqual(helpers.testCreateDate(assert), result, assert, debug);
};

let now = new Date();

describe('Date Parser', function () {

  describe('Not a Date at all.', function () {
    dateAssert('Hello world', []);
    dateAssert('I like music', []);
    dateAssert('I went to the show last night', []);
  });

  describe('Simple Single Dates', function () {

    dateAssert('08/25/1978 12:04', [{
      date: new Date(1978, 7, 25, 12, 4)
    }]);
    dateAssert('08-25-1978 12:04', [{
      date: new Date(1978, 7, 25, 12, 4)
    }]);
    dateAssert('1978/08/25 12:04', [{
      date: new Date(1978, 7, 25, 12, 4)
    }]);
    dateAssert('June 1st, 2008 12:04', [{
      date: new Date(2008, 5, 1, 12, 4)
    }]);

    dateAssert('08-25-1978 12pm', [{
      date: new Date(1978, 7, 25, 12)
    }]);
    dateAssert('08-25-1978 12:42pm', [{
      date: new Date(1978, 7, 25, 12, 42)
    }]);
    dateAssert('08-25-1978 12:42:32pm', [{
      date: new Date(1978, 7, 25, 12, 42, 32)
    }]);

    dateAssert('08-25-1978 00:00am', [{
      date: new Date(1978, 7, 25)
    }]);
    dateAssert('08-25-1978 00:00:00am', [{
      date: new Date(1978, 7, 25)
    }]);
    dateAssert('08-25-1978 00:00:00.000am', [{
      date: new Date(1978, 7, 25)
    }]);

    dateAssert('08-25-1978 1pm', [{
      date: new Date(1978, 7, 25, 13)
    }]);
    dateAssert('08-25-1978 1:42pm', [{
      date: new Date(1978, 7, 25, 13, 42)
    }]);
    dateAssert('08-25-1978 1:42:32pm', [{
      date: new Date(1978, 7, 25, 13, 42, 32)
    }]);

    dateAssert('08-25-1978 1am', [{
      date: new Date(1978, 7, 25, 1)
    }]);
    dateAssert('08-25-1978 1:42am', [{
      date: new Date(1978, 7, 25, 1, 42)
    }]);
    dateAssert('08-25-1978 1:42:32am', [{
      date: new Date(1978, 7, 25, 1, 42, 32)
    }]);

    dateAssert('08-25-1978 11pm', [{
      date: new Date(1978, 7, 25, 23)
    }]);
    dateAssert('08-25-1978 11:42pm', [{
      date: new Date(1978, 7, 25, 23, 42)
    }]);
    dateAssert('08-25-1978 11:42:32pm', [{
      date: new Date(1978, 7, 25, 23, 42, 32)
    }]);

    dateAssert('08-25-1978 11am', [{
      date: new Date(1978, 7, 25, 11)
    }]);
    dateAssert('08-25-1978 11:42am', [{
      date: new Date(1978, 7, 25, 11, 42)
    }]);
    dateAssert('08-25-1978 11:42:32am', [{
      date: new Date(1978, 7, 25, 11, 42, 32)
    }]);

  });

  describe('Fuzzy Single Dates', function () {

    dateAssert('now', [{
      date: new Date()
    }]);
    dateAssert('Now', [{
      date: new Date()
    }]);
    dateAssert('Just now', [{
      date: new Date()
    }]);
    // dateAssert('4pm', [{
    //   date: helpers.getAbsoluteDate(null, null, now.getDate() + 1, 16)
    // }]);
    dateAssert('today at 4pm', [{
      date: helpers.getAbsoluteDate(null, null, null, 16)
    }]);
    dateAssert('today at 4 pm', [{
      date: helpers.getAbsoluteDate(null, null, null, 16)
    }]);
    dateAssert('4pm today', [{
      date: helpers.getAbsoluteDate(null, null, null, 16)
    }]);

    // TODO - Give these a range value
    dateAssert('today', [{
      date: helpers.getRelativeDate()
    }]);
    dateAssert('Today', [{
      date: helpers.getRelativeDate()
    }]);
    dateAssert('yesterday', [{
      date: helpers.getRelativeDate(null, null, -1)
    }]);
    dateAssert('Yesterday', [{
      date: helpers.getRelativeDate(null, null, -1)
    }]);
    dateAssert('tomorrow', [{
      date: helpers.getRelativeDate(null, null, 1)
    }]);
    dateAssert('Tomorrow', [{
      date: helpers.getRelativeDate(null, null, 1)
    }]);

    dateAssert('The day after tomorrow', [{
      date: helpers.getRelativeDate(null, null, 2)
    }]);
    dateAssert('The day before yesterday', [{
      date: helpers.getRelativeDate(null, null, -2)
    }]);
    dateAssert('One day after tomorrow', [{
      date: helpers.getRelativeDate(null, null, 2)
    }]);
    dateAssert('One day before yesterday', [{
      date: helpers.getRelativeDate(null, null, -2)
    }]);
    dateAssert('Two days after tomorrow', [{
      date: helpers.getRelativeDate(null, null, 3)
    }]);
    dateAssert('Two days before yesterday', [{
      date: helpers.getRelativeDate(null, null, -3)
    }]);
    dateAssert('Two days after today', [{
      date: helpers.getRelativeDate(null, null, 2)
    }]);
    dateAssert('Two days before today', [{
      date: helpers.getRelativeDate(null, null, -2)
    }]);
    dateAssert('Two days from today', [{
      date: helpers.getRelativeDate(null, null, 2)
    }]);

    dateAssert('tWo dAyS after toMoRRoW', [{
      date: helpers.getRelativeDate(null, null, 3)
    }]);
    dateAssert('2 days after tomorrow', [{
      date: helpers.getRelativeDate(null, null, 3)
    }]);
    dateAssert('2 day after tomorrow', [{
      date: helpers.getRelativeDate(null, null, 3)
    }]);
    dateAssert('18 days after tomorrow', [{
      date: helpers.getRelativeDate(null, null, 19)
    }]);
    dateAssert('18 day after tomorrow', [{
      date: helpers.getRelativeDate(null, null, 19)
    }]);

    dateAssert('2 years ago', [{
      date: helpers.getRelativeDate(-2, null, null, 0, 0, 0, 0)
    }]);
    dateAssert('2 months ago', [{
      date: helpers.getRelativeDate(null, -2, null, 0, 0, 0, 0)
    }]);
    dateAssert('2 weeks ago', [{
      date: helpers.getRelativeDate(null, null, -14, 0, 0, 0, 0)
    }]);
    dateAssert('2 days ago', [{
      date: helpers.getRelativeDate(null, null, -2, 0, 0, 0, 0)
    }]);
    dateAssert('2 hours ago', [{
      date: helpers.getRelativeDate(null, null, null, -2, 0, 0, 0)
    }]);
    dateAssert('2 minutes ago', [{
      date: helpers.getRelativeDate(null, null, null, null, -2, 0, 0)
    }]);
    dateAssert('2 seconds ago', [{
      date: helpers.getRelativeDate(null, null, null, null, null, -2, 0)
    }]);
    dateAssert('2 milliseconds ago', [{
      date: helpers.getRelativeDate(null, null, null, null, null, null, -2, 0)
    }]);
    dateAssert('a second ago', [{
      date: helpers.getRelativeDate(null, null, null, null, null, -1, 0)
    }]);

    dateAssert('2 years from now', [{
      date: helpers.getRelativeDate(2, null, null, null, 0, 0, 0, 0)
    }]);
    dateAssert('2 months from now', [{
      date: helpers.getRelativeDate(null, 2, null, null, 0, 0, 0, 0)
    }]);
    dateAssert('2 weeks from now', [{
      date: helpers.getRelativeDate(null, null, 14, 0, 0, 0, 0)
    }]);
    dateAssert('2 days from now', [{
      date: helpers.getRelativeDate(null, null, 2, 0, 0, 0, 0)
    }]);
    dateAssert('2 hours from now', [{
      date: helpers.getRelativeDate(null, null, null, 2, 0, 0, 0)
    }]);
    dateAssert('2 minutes from now', [{
      date: helpers.getRelativeDate(null, null, null, null, 2, 0, 0)
    }]);
    dateAssert('2 seconds from now', [{
      date: helpers.getRelativeDate(null, null, null, null, null, 2, 0)
    }]);
    dateAssert('2 milliseconds from now', [{
      date: helpers.getRelativeDate(null, null, null, null, null, null, 2)
    }]);

    dateAssert('2 years later', [{
      date: helpers.getRelativeDate(2, null, null, 0, 0, 0, 0)
    }]);
    dateAssert('2 months later', [{
      date: helpers.getRelativeDate(null, 2, null, 0, 0, 0, 0)
    }]);
    dateAssert('2 weeks later', [{
      date: helpers.getRelativeDate(null, null, 14, 0, 0, 0, 0)
    }]);
    dateAssert('2 days later', [{
      date: helpers.getRelativeDate(null, null, 2, 0, 0, 0, 0)
    }]);
    dateAssert('2 hours later', [{
      date: helpers.getRelativeDate(null, null, null, 2, 0, 0, 0)
    }]);
    dateAssert('2 minutes later', [{
      date: helpers.getRelativeDate(null, null, null, null, 2, 0, 0)
    }]);
    dateAssert('2 seconds later', [{
      date: helpers.getRelativeDate(null, null, null, null, null, 2, 0)
    }]);
    dateAssert('2 milliseconds later', [{
      date: helpers.getRelativeDate(null, null, null, null, null, null, 2)
    }]);

    // Article trouble
    dateAssert('an hour ago', [{
      date: helpers.getRelativeDate(null, null, null, -1, 0, 0, 0)
    }]);
    dateAssert('an hour from now', [{
      date: helpers.getRelativeDate(null, null, null, 1, 0, 0, 0)
    }]);

    dateAssert('Saturday', [{
      date: helpers.getDateWithWeekdayAndOffset(6)
    }]);
    dateAssert('Monday', [{
      date: helpers.getDateWithWeekdayAndOffset(1)
    }]);

    // These are one week behind and should be the NEXT week since we are using future.
    // dateAssert('The day after Monday', [{date: helpers.getDateWithWeekdayAndOffset(2)}]);
    // dateAssert('The day before Monday', [{date: helpers.getDateWithWeekdayAndOffset(0)}]);
    // dateAssert('2 days after monday', [{date: helpers.getDateWithWeekdayAndOffset(3)}]);
    // dateAssert('2 days before monday', [{date: helpers.getDateWithWeekdayAndOffset(6, -7)}]);
    // dateAssert('2 weeks after monday', [{date: helpers.getDateWithWeekdayAndOffset(1, 14)}]);
    //
    // dateAssert('Next Monday', [{date: helpers.getDateWithWeekdayAndOffset(1, 7)}]);
    // dateAssert('next week monday', [{date: helpers.getDateWithWeekdayAndOffset(1, 7)}]);
    // dateAssert('Next friDay', [{date: helpers.getDateWithWeekdayAndOffset(5, 7)}]);
    // dateAssert('next week thursday', [{date: helpers.getDateWithWeekdayAndOffset(4, 7)}]);
    //
    // dateAssert('last Monday', [{date: helpers.getDateWithWeekdayAndOffset(1, -7)}]);
    // dateAssert('last week monday', [{date: helpers.getDateWithWeekdayAndOffset(1, -7)}]);
    // dateAssert('last friDay', [{date: helpers.getDateWithWeekdayAndOffset(5, -7)}]);
    // dateAssert('last week thursday', [{date: helpers.getDateWithWeekdayAndOffset(4, -7)}]);
    // dateAssert('last Monday at 4pm', [{date: helpers.getDateWithWeekdayAndOffset(1, -7, 16)}]);
    //
    // dateAssert('this Monday', [{date: helpers.getDateWithWeekdayAndOffset(1, 0)}]);
    // dateAssert('this week monday', [{date: helpers.getDateWithWeekdayAndOffset(1, 0)}]);
    // dateAssert('this friDay', [{date: helpers.getDateWithWeekdayAndOffset(5, 0)}]);
    // dateAssert('this week thursday', [{date: helpers.getDateWithWeekdayAndOffset(4, 0)}]);
    //
    // dateAssert('Monday of last week', [{date: helpers.getDateWithWeekdayAndOffset(1, -7)}]);
    // dateAssert('saturday of next week', [{date: helpers.getDateWithWeekdayAndOffset(6, 7)}]);
    // dateAssert('Monday last week', [{date: helpers.getDateWithWeekdayAndOffset(1, -7)}]);
    // dateAssert('saturday next week', [{date: helpers.getDateWithWeekdayAndOffset(6, 7)}]);
    //
    // dateAssert('Monday of this week', [{date: helpers.getDateWithWeekdayAndOffset(1, 0)}]);
    // dateAssert('saturday of this week', [{date: helpers.getDateWithWeekdayAndOffset(6, 0)}]);
    // dateAssert('Monday this week', [{date: helpers.getDateWithWeekdayAndOffset(1, 0)}]);
    // dateAssert('saturday this week', [{date: helpers.getDateWithWeekdayAndOffset(6, 0)}]);
    //
    // dateAssert('Tue of last week', [{date: helpers.getDateWithWeekdayAndOffset(2, -14)}]);
    // dateAssert('Tue. of last week', [{date: helpers.getDateWithWeekdayAndOffset(2, -14)}]);
    //
    // dateAssert('Next week', [{
    //   date: helpers.getRelativeDate(null, null, 7)
    // }]);
    // dateAssert('Last week', [{
    //   date: helpers.getRelativeDate(null, null, -7)
    // }]);
    // dateAssert('Next month', [{
    //   date: helpers.getRelativeDate(null, 1)
    // }]);
    // dateAssert('Next year', [{
    //   date: helpers.getRelativeDate(1)
    // }]);
    // dateAssert('this year', [{
    //   date: helpers.getRelativeDate(0)
    // }]);

    // dateEqual(testCreateDate('beginning of the week'), getDateWithWeekdayAndOffset(0), 'beginning of the week');
    // dateEqual(testCreateDate('beginning of this week'), getDateWithWeekdayAndOffset(0), 'beginning of this week');
    // dateEqual(testCreateDate('end of this week'), getDateWithWeekdayAndOffset(6, 0, 23, 59, 59, 999), 'end of this week');
    // dateEqual(testCreateDate('beginning of next week'), getDateWithWeekdayAndOffset(0, 7), 'beginning of next week');
    // dateEqual(testCreateDate('the beginning of next week'), getDateWithWeekdayAndOffset(0, 7), 'the beginning of next week');

    // dateEqual(testCreateDate('beginning of the month'), new Date(now.getFullYear(), now.getMonth()), 'beginning of the month');
    // dateEqual(testCreateDate('beginning of this month'), new Date(now.getFullYear(), now.getMonth()), 'beginning of this month');
    // dateEqual(testCreateDate('beginning of next month'), new Date(now.getFullYear(), now.getMonth() + 1), 'beginning of next month');
    // dateEqual(testCreateDate('the beginning of next month'), new Date(now.getFullYear(), now.getMonth() + 1), 'the beginning of next month');
    // dateEqual(testCreateDate('the end of next month'), new Date(now.getFullYear(), now.getMonth() + 1, testGetDaysInMonth(now.getFullYear(), now.getMonth() + 1), 23, 59, 59, 999), 'the end of next month');
    // dateEqual(testCreateDate('the end of the month'), new Date(now.getFullYear(), now.getMonth(), testGetDaysInMonth(now.getFullYear(), now.getMonth()), 23, 59, 59, 999), 'the end of the month');

    // dateEqual(testCreateDate('the beginning of the year'), new Date(now.getFullYear(), 0), 'the beginning of the year');
    // dateEqual(testCreateDate('the beginning of this year'), new Date(now.getFullYear(), 0), 'the beginning of this year');
    // dateEqual(testCreateDate('the beginning of next year'), new Date(now.getFullYear() + 1, 0), 'the beginning of next year');
    // dateEqual(testCreateDate('the beginning of last year'), new Date(now.getFullYear() - 1, 0), 'the beginning of last year');
    // dateEqual(testCreateDate('the end of next year'), new Date(now.getFullYear() + 1, 11, 31, 23, 59, 59, 999), 'the end of next year');
    // dateEqual(testCreateDate('the end of last year'), new Date(now.getFullYear() - 1, 11, 31, 23, 59, 59, 999), 'the end of last year');

    // dateEqual(testCreateDate('the beginning of the day'), new Date(now.getFullYear(), now.getMonth(), now.getDate()), 'the beginning of the day');

    // dateEqual(testCreateDate('beginning of March'), new Date(now.getFullYear(), 2), 'beginning of March');
    // dateEqual(testCreateDate('end of March'), new Date(now.getFullYear(), 2, 31, 23, 59, 59, 999), 'end of March');
    // dateEqual(testCreateDate('the first day of March'), new Date(now.getFullYear(), 2), 'the first day of March');
    // dateEqual(testCreateDate('the last day of March'), new Date(now.getFullYear(), 2, 31), 'the last day of March');
    // dateEqual(testCreateDate('the last day of March 2010'), new Date(2010, 2, 31), 'the last day of March 2010');
    // dateEqual(testCreateDate('the last day of March, 2012'), new Date(2012, 2, 31), 'the last day of March, 2012');

    // dateEqual(testCreateDate('beginning of 1998'), new Date(1998, 0), 'beginning of 1998');
    // dateEqual(testCreateDate('end of 1998'), new Date(1998, 11, 31, 23, 59, 59, 999), 'end of 1998');
    // dateEqual(testCreateDate('the first day of 1998'), new Date(1998, 0), 'the first day of 1998');
    // dateEqual(testCreateDate('the last day of 1998'), new Date(1998, 11, 31), 'the last day of 1998');

    // dateEqual(testCreateDate('The 15th of last month.'), new Date(now.getFullYear(), now.getMonth() - 1, 15), 'The 15th of last month');
    // dateEqual(testCreateDate('January 30th of last year.'), new Date(now.getFullYear() - 1, 0, 30), 'January 30th of last year');
    // dateEqual(testCreateDate('January of last year.'), new Date(now.getFullYear() - 1, 0), 'January of last year');

    // dateEqual(testCreateDate('First day of may'), new Date(now.getFullYear(), 4, 1), 'First day of may');
    // dateEqual(testCreateDate('Last day of may'), new Date(now.getFullYear(), 4, 31), 'Last day of may');
    // dateEqual(testCreateDate('Last day of next month'), new Date(now.getFullYear(), now.getMonth() + 1, testGetDaysInMonth(now.getFullYear(), now.getMonth() + 1)), 'Last day of next month');
    // dateEqual(testCreateDate('Last day of november'), new Date(now.getFullYear(), 10, 30), 'Last day of november');

    // dateEqual(testCreateDate('the first day of next January'), new Date(now.getFullYear() + 1, 0, 1), 'the first day of next january');
    // dateEqual(testCreateDate('Next week'), getRelativeDate(null, null, 7), 'Next week');
    // dateEqual(testCreateDate('Thursday of next week, 3:30pm'), getDateWithWeekdayAndOffset(4, 7, 15, 30), 'thursday of next week, 3:30pm');
    // dateEqual(testCreateDate('the 2nd Tuesday of June, 2012'), new Date(2012, 5, 12), 'the 2nd tuesday of June, 2012');

    // dateEqual(testCreateDate('the 1st Tuesday of November, 2012'), new Date(2012, 10, 6), 'the 1st tuesday of November');
    // dateEqual(testCreateDate('the 2nd Tuesday of November, 2012'), new Date(2012, 10, 13), 'the 2nd tuesday of November');
    // dateEqual(testCreateDate('the 3rd Tuesday of November, 2012'), new Date(2012, 10, 20), 'the 3rd tuesday of November');
    // dateEqual(testCreateDate('the 4th Tuesday of November, 2012'), new Date(2012, 10, 27), 'the 4th tuesday of November');
    // dateEqual(testCreateDate('the 5th Tuesday of November, 2012'), new Date(2012, 11, 4), 'the 5th tuesday of November');
    // dateEqual(testCreateDate('the 6th Tuesday of November, 2012'), new Date(2012, 11, 11), 'the 6th tuesday of November');

    // dateEqual(testCreateDate('the 1st Friday of February, 2012'), new Date(2012, 1, 3), 'the 1st Friday of February');
    // dateEqual(testCreateDate('the 2nd Friday of February, 2012'), new Date(2012, 1, 10), 'the 2nd Friday of February');
    // dateEqual(testCreateDate('the 3rd Friday of February, 2012'), new Date(2012, 1, 17), 'the 3rd Friday of February');
    // dateEqual(testCreateDate('the 4th Friday of February, 2012'), new Date(2012, 1, 24), 'the 4th Friday of February');
    // dateEqual(testCreateDate('the 5th Friday of February, 2012'), new Date(2012, 2, 2), 'the 5th Friday of February');
    // dateEqual(testCreateDate('the 6th Friday of February, 2012'), new Date(2012, 2, 9), 'the 6th Friday of February');

  });

  describe('Range Dates', function () {

    // TODO - Add more Ranges
    dateAssert('from june 3rd to july 4th', [{
      date: new Date(2015, 5, 3),
      to: new Date(2015, 6, 4)
    }]);
    dateAssert('from jan to dec', [{
      date: new Date(2015, 0, 1),
      to: new Date(2015, 11, 1)
    }]);

  });

  describe('Parse dates in english', function () {
    // dateAssert('my birthday is on oct 14th', [{
    //   date: new Date(2015, 9, 14)
    // }]);
    // dateAssert('lets meet in the lobby at 3pm', [{
    //   date: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 15)
    // }]);
    // This assertion is hard coded :(
    // dateAssert('lets meet on sunday at 3pm', [{
    //   date: new Date(now.getFullYear(), now.getMonth(), 20, 15)
    // }]);

    dateAssert('I\'m free Saturday at 3pm or sunday at 12:00', [{
      date: helpers.getDateWithWeekdayAndOffset(6, null, 15)
    }, {
      date: helpers.getDateWithWeekdayAndOffset(7, null, 12)
    }]);

  // NOTE: Sugar bug
  // Saturday at 3
  });


  describe('Multiple Dates', function () {
    // TODO -  Multiple dates
    // dateEqual(testCreateDate('January, February, March and April 15'), [{date: new Date(2015, 0, 1)}, {date: new Date(2015, 2, 1)}, {date: new Date(2015, 3, 1)}, {date: new Date(2015, 4, 15)}, {date: new Date(2015, 0, 1)}], "January, February, March and April 15");
    // dateEqual(testCreateDate('jan 1 2015 or jan 1 2016'), [{date: new Date(2015, 0, 1)}, {date: new Date(2016, 0, 1)}], "jan 1 2015 or jan 1 2016");
  });
});

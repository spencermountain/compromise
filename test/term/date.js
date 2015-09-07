"use strict";
import {mocha} from "mocha";
import {should} from "should";
import to_date from "../../src/term/value/to_date";

let baseDateObj =  {
  dates: [
    {
      month: 1,
      day: 1,
      year: 1
    }
  ]
};

let dateEqual = function(a, b, message) {
  for (var x in baseDateObj) {
    for (var i = 0; i < baseDateObj[x].length; i++) {
      if (typeof baseDateObj[x][i] == "object") {
        for (var dateInner in baseDateObj[x][i]) {
          for (var outter in b[i]) {
            if (outter === dateInner) {
              baseDateObj[x][i][dateInner] = b[i][outter];
            }
          }
        }
      }
    }
  }
  console.log("--", a, baseDateObj);
  a.should.containDeep(baseDateObj);
};

let testCreateDate = function(date_string) {
  return new to_date(date_string);
};

describe("Date Parser", function() {

  it.only('Create | Date and Time', function(done) {
    dateEqual(testCreateDate('08/25/1978 12:04'), [{month: 8, day: 25, year: 1978}]);
    dateEqual(testCreateDate('08-25-1978 12:04'), [{month: 8, day: 25, year: 1978}]);
    dateEqual(testCreateDate('1978/08/25 12:04'), [{month: 8, day: 25, year: 1978}]);
    dateEqual(testCreateDate('June 1st, 2008 12:04'), [{month: 6, day: 1, year: 2008}]);

    // dateEqual(testCreateDate('08-25-1978 12pm'), new Date(1978, 7, 25, 12));
    // dateEqual(testCreateDate('08-25-1978 12:42pm'), new Date(1978, 7, 25, 12, 42), 'with minutes and am/pm');
    // dateEqual(testCreateDate('08-25-1978 12:42:32pm'), new Date(1978, 7, 25, 12, 42, 32), 'with seconds and am/pm');
    // dateEqual(testCreateDate('08-25-1978 12:42:32.488pm'), new Date(1978, 7, 25, 12, 42, 32, 488), 'with seconds and am/pm');

    // dateEqual(testCreateDate('08-25-1978 00:00am'), new Date(1978, 7, 25, 0, 0, 0, 0), 'with zero am');
    // dateEqual(testCreateDate('08-25-1978 00:00:00am'), new Date(1978, 7, 25, 0, 0, 0, 0), 'with seconds and zero am');
    // dateEqual(testCreateDate('08-25-1978 00:00:00.000am'), new Date(1978, 7, 25, 0, 0, 0, 0), 'with milliseconds and zero am');

    // dateEqual(testCreateDate('08-25-1978 1pm'), new Date(1978, 7, 25, 13), '1pm am/pm');
    // dateEqual(testCreateDate('08-25-1978 1:42pm'), new Date(1978, 7, 25, 13, 42), '1pm minutes and am/pm');
    // dateEqual(testCreateDate('08-25-1978 1:42:32pm'), new Date(1978, 7, 25, 13, 42, 32), '1pm seconds and am/pm');
    // dateEqual(testCreateDate('08-25-1978 1:42:32.488pm'), new Date(1978, 7, 25, 13, 42, 32, 488), '1pm seconds and am/pm');

    // dateEqual(testCreateDate('08-25-1978 1am'), new Date(1978, 7, 25, 1), '1am am/pm');
    // dateEqual(testCreateDate('08-25-1978 1:42am'), new Date(1978, 7, 25, 1, 42), '1am minutes and am/pm');
    // dateEqual(testCreateDate('08-25-1978 1:42:32am'), new Date(1978, 7, 25, 1, 42, 32), '1am seconds and am/pm');
    // dateEqual(testCreateDate('08-25-1978 1:42:32.488am'), new Date(1978, 7, 25, 1, 42, 32, 488), '1am seconds and am/pm');

    // dateEqual(testCreateDate('08-25-1978 11pm'), new Date(1978, 7, 25, 23), '11pm am/pm');
    // dateEqual(testCreateDate('08-25-1978 11:42pm'), new Date(1978, 7, 25, 23, 42), '11pm minutes and am/pm');
    // dateEqual(testCreateDate('08-25-1978 11:42:32pm'), new Date(1978, 7, 25, 23, 42, 32), '11pm seconds and am/pm');
    // dateEqual(testCreateDate('08-25-1978 11:42:32.488pm'), new Date(1978, 7, 25, 23, 42, 32, 488), '11pm seconds and am/pm');

    // dateEqual(testCreateDate('08-25-1978 11am'), new Date(1978, 7, 25, 11), '11am am/pm');
    // dateEqual(testCreateDate('08-25-1978 11:42am'), new Date(1978, 7, 25, 11, 42), '11am minutes and am/pm');
    // dateEqual(testCreateDate('08-25-1978 11:42:32am'), new Date(1978, 7, 25, 11, 42, 32), '11am seconds and am/pm');
    // dateEqual(testCreateDate('08-25-1978 11:42:32.488am'), new Date(1978, 7, 25, 11, 42, 32, 488), '11am seconds and am/pm');

    // Fuzzy Dates
    // dateEqual(testCreateDate('now'), new Date(), 'now');
    // dateEqual(testCreateDate('Now'), new Date(), 'Now');
    // dateEqual(testCreateDate('Just now'), new Date(), 'Just Now');
    // dateEqual(testCreateDate('today'), new Date(now.getFullYear(), now.getMonth(), now.getDate()), 'today');
    // dateEqual(testCreateDate('Today'), new Date(now.getFullYear(), now.getMonth(), now.getDate()), 'Today');
    // dateEqual(testCreateDate('yesterday'), new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1), 'yesterday');
    // dateEqual(testCreateDate('Yesterday'), new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1), 'Yesterday');
    // dateEqual(testCreateDate('tomorrow'), new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1), 'tomorrow');
    // dateEqual(testCreateDate('Tomorrow'), new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1), 'Tomorrow');
    // dateEqual(testCreateDate('4pm'), new Date(now.getFullYear(), now.getMonth(), now.getDate(), 16), '4pm');
    // dateEqual(testCreateDate('today at 4pm'), new Date(now.getFullYear(), now.getMonth(), now.getDate(), 16), 'Today at 4pm');
    // dateEqual(testCreateDate('today at 4 pm'), new Date(now.getFullYear(), now.getMonth(), now.getDate(), 16), 'Today at 4 pm');
    // dateEqual(testCreateDate('4pm today'), new Date(now.getFullYear(), now.getMonth(), now.getDate(), 16), '4pm today');

    // dateEqual(testCreateDate('The day after tomorrow'), new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2), 'The day after tomorrow');
    // dateEqual(testCreateDate('The day before yesterday'), new Date(now.getFullYear(), now.getMonth(), now.getDate() - 2), 'The day before yesterday');
    // dateEqual(testCreateDate('One day after tomorrow'), new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2), 'One day after tomorrow');
    // dateEqual(testCreateDate('One day before yesterday'), new Date(now.getFullYear(), now.getMonth(), now.getDate() - 2), 'One day before yesterday');
    // dateEqual(testCreateDate('Two days after tomorrow'), new Date(now.getFullYear(), now.getMonth(), now.getDate() + 3), 'Two days after tomorrow');
    // dateEqual(testCreateDate('Two days before yesterday'), new Date(now.getFullYear(), now.getMonth(), now.getDate() - 3), 'Two days before yesterday');
    // dateEqual(testCreateDate('Two days after today'), new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2), 'Two days after today');
    // dateEqual(testCreateDate('Two days before today'), new Date(now.getFullYear(), now.getMonth(), now.getDate() - 2), 'Two days before today');
    // dateEqual(testCreateDate('Two days from today'), new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2), 'Two days from today');

    // dateEqual(testCreateDate('tWo dAyS after toMoRRoW'), new Date(now.getFullYear(), now.getMonth(), now.getDate() + 3), 'tWo dAyS after toMoRRoW');
    // dateEqual(testCreateDate('2 days after tomorrow'), new Date(now.getFullYear(), now.getMonth(), now.getDate() + 3), '2 days after tomorrow');
    // dateEqual(testCreateDate('2 day after tomorrow'), new Date(now.getFullYear(), now.getMonth(), now.getDate() + 3), '2 day after tomorrow');
    // dateEqual(testCreateDate('18 days after tomorrow'), new Date(now.getFullYear(), now.getMonth(), now.getDate() + 19), '18 days after tomorrow');
    // dateEqual(testCreateDate('18 day after tomorrow'), new Date(now.getFullYear(), now.getMonth(), now.getDate() + 19), '18 day after tomorrow');

    // dateEqual(testCreateDate('2 years ago'), getRelativeDate(-2), '2 years ago');
    // dateEqual(testCreateDate('2 months ago'), getRelativeDate(null, -2), '2 months ago');
    // dateEqual(testCreateDate('2 weeks ago'), getRelativeDate(null, null, -14), '2 weeks ago');
    // dateEqual(testCreateDate('2 days ago'), getRelativeDate(null, null, -2), '2 days ago');
    // dateEqual(testCreateDate('2 hours ago'), getRelativeDate(null, null, null, -2), '2 hours ago');
    // dateEqual(testCreateDate('2 minutes ago'), getRelativeDate(null, null, null, null, -2), '2 minutes ago');
    // dateEqual(testCreateDate('2 seconds ago'), getRelativeDate(null, null, null, null, null, -2), '2 seconds ago');
    // dateEqual(testCreateDate('2 milliseconds ago'), getRelativeDate(null, null, null, null, null, null, -2), '2 milliseconds ago');
    // dateEqual(testCreateDate('a second ago'), getRelativeDate(null, null, null, null, null, -1), 'a second ago');

    // dateEqual(testCreateDate('2 years from now'), getRelativeDate(2), '2 years from now');
    // dateEqual(testCreateDate('2 months from now'), getRelativeDate(null, 2), '2 months from now');
    // dateEqual(testCreateDate('2 weeks from now'), getRelativeDate(null, null, 14), '2 weeks from now');
    // dateEqual(testCreateDate('2 days from now'), getRelativeDate(null, null, 2), '2 days from now');
    // dateEqual(testCreateDate('2 hours from now'), getRelativeDate(null, null, null, 2), '2 hours from now');
    // dateEqual(testCreateDate('2 minutes from now'), getRelativeDate(null, null, null, null, 2), '2 minutes from now');
    // dateEqual(testCreateDate('2 seconds from now'), getRelativeDate(null, null, null, null, null, 2), '2 seconds from now');
    // dateEqual(testCreateDate('2 milliseconds from now'), getRelativeDate(null, null, null, null, null, null, 2), '2 milliseconds from now');

    // dateEqual(testCreateDate('2 years later'), getRelativeDate(2), '2 years later');
    // dateEqual(testCreateDate('2 months later'), getRelativeDate(null, 2), '2 months later');
    // dateEqual(testCreateDate('2 weeks later'), getRelativeDate(null, null, 14), '2 weeks later');
    // dateEqual(testCreateDate('2 days later'), getRelativeDate(null, null, 2), '2 days later');
    // dateEqual(testCreateDate('2 hours later'), getRelativeDate(null, null, null, 2), '2 hours later');
    // dateEqual(testCreateDate('2 minutes later'), getRelativeDate(null, null, null, null, 2), '2 minutes later');
    // dateEqual(testCreateDate('2 seconds later'), getRelativeDate(null, null, null, null, null, 2), '2 seconds later');
    // dateEqual(testCreateDate('2 milliseconds later'), getRelativeDate(null, null, null, null, null, null, 2), '2 milliseconds later');

    // // Article trouble
    // dateEqual(testCreateDate('an hour ago'), getRelativeDate(null, null, null, -1), 'an hours ago');
    // dateEqual(testCreateDate('an hour from now'), getRelativeDate(null, null, null, 1), 'an hour from now');

    // dateEqual(testCreateDate('Monday'), getDateWithWeekdayAndOffset(1), 'Monday');
    // dateEqual(testCreateDate('The day after Monday'), getDateWithWeekdayAndOffset(2), 'The day after Monday');
    // dateEqual(testCreateDate('The day before Monday'), getDateWithWeekdayAndOffset(0), 'The day before Monday');
    // dateEqual(testCreateDate('2 days after monday'), getDateWithWeekdayAndOffset(3), '2 days after monday');
    // dateEqual(testCreateDate('2 days before monday'), getDateWithWeekdayAndOffset(6, -7), '2 days before monday');
    // dateEqual(testCreateDate('2 weeks after monday'), getDateWithWeekdayAndOffset(1, 14), '2 weeks after monday');

    // dateEqual(testCreateDate('Next Monday'), getDateWithWeekdayAndOffset(1, 7), 'Next Monday');
    // dateEqual(testCreateDate('next week monday'), getDateWithWeekdayAndOffset(1, 7), 'next week monday');
    // dateEqual(testCreateDate('Next friDay'), getDateWithWeekdayAndOffset(5, 7), 'Next friDay');
    // dateEqual(testCreateDate('next week thursday'), getDateWithWeekdayAndOffset(4, 7), 'next week thursday');

    // dateEqual(testCreateDate('last Monday'), getDateWithWeekdayAndOffset(1, -7), 'last Monday');
    // dateEqual(testCreateDate('last week monday'), getDateWithWeekdayAndOffset(1, -7), 'last week monday');
    // dateEqual(testCreateDate('last friDay'), getDateWithWeekdayAndOffset(5, -7), 'last friDay');
    // dateEqual(testCreateDate('last week thursday'), getDateWithWeekdayAndOffset(4, -7), 'last week thursday');
    // dateEqual(testCreateDate('last Monday at 4pm'), getDateWithWeekdayAndOffset(1, -7, 16), 'last Monday at 4pm');

    // dateEqual(testCreateDate('this Monday'), getDateWithWeekdayAndOffset(1, 0), 'this Monday');
    // dateEqual(testCreateDate('this week monday'), getDateWithWeekdayAndOffset(1, 0), 'this week monday');
    // dateEqual(testCreateDate('this friDay'), getDateWithWeekdayAndOffset(5, 0), 'this friDay');
    // dateEqual(testCreateDate('this week thursday'), getDateWithWeekdayAndOffset(4, 0), 'this week thursday');

    // dateEqual(testCreateDate('Monday of last week'), getDateWithWeekdayAndOffset(1, -7), 'Monday of last week');
    // dateEqual(testCreateDate('saturday of next week'), getDateWithWeekdayAndOffset(6, 7), 'saturday of next week');
    // dateEqual(testCreateDate('Monday last week'), getDateWithWeekdayAndOffset(1, -7), 'Monday last week');
    // dateEqual(testCreateDate('saturday next week'), getDateWithWeekdayAndOffset(6, 7), 'saturday next week');

    // dateEqual(testCreateDate('Monday of this week'), getDateWithWeekdayAndOffset(1, 0), 'Monday of this week');
    // dateEqual(testCreateDate('saturday of this week'), getDateWithWeekdayAndOffset(6, 0), 'saturday of this week');
    // dateEqual(testCreateDate('Monday this week'), getDateWithWeekdayAndOffset(1, 0), 'Monday this week');
    // dateEqual(testCreateDate('saturday this week'), getDateWithWeekdayAndOffset(6, 0), 'saturday this week');

    // dateEqual(testCreateDate('Tue of last week'), getDateWithWeekdayAndOffset(2, -7), 'Tue of last week');
    // dateEqual(testCreateDate('Tue. of last week'), getDateWithWeekdayAndOffset(2, -7), 'Tue. of last week');

    // dateEqual(testCreateDate('Next week'), getRelativeDate(null, null, 7), 'Next week');
    // dateEqual(testCreateDate('Last week'), getRelativeDate(null, null, -7), 'Last week');
    // dateEqual(testCreateDate('Next month'), getRelativeDate(null, 1), 'Next month');
    // dateEqual(testCreateDate('Next year'), getRelativeDate(1), 'Next year');
    // dateEqual(testCreateDate('this year'), getRelativeDate(0), 'this year');

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
    

    done();
  });

});

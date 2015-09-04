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

  it('Create | Date and Time', function(done) {
    dateEqual(testCreateDate('08/25/1978 12:04'), [{month: 8, day: 25, year: 1978}]);
    dateEqual(testCreateDate('08-25-1978 12:04'), [{month: 8, day: 25, year: 1978}]);
    // dateEqual(testCreateDate('1978/08/25 12:04'), [{month: 8, day: 25, year: 1978}]);
    // dateEqual(testCreateDate('June 1st, 2008 12:04'), [{month: 6, day: 1, year: 2008}]);

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

    done();
  });

});

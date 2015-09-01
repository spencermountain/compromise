"use strict";
import {mocha} from "mocha";
import {should} from "should";
import to_date from "../../src/term/value/to_date";

let baseDateObj = { 
  day: undefined, 
  month: undefined, 
  year: undefined, 
  to: { 
    day: undefined, 
    month: undefined, 
    year: undefined
  }
};

let dateEqual = function(a, b, message) {
  var buffer = 50; // Number of milliseconds of "play" to make sure these tests pass.
  if(typeof b == 'number') {
    var d = new Date();
    d.setTime(d.getTime() + b);
    b = d;
  }
  // var offset = Math.abs(a.getTime() - b.getTime());
  a.should.eql(baseDateObj);
}

let testCreateDate = function(date_string) {
  return date_extractor(date_string);
}

describe("Date Parser", function() {
  
  it.only("Simple Year test", function(done) {
    console.log(to_date("1998"));
    // baseDateObj.year = 1998;
    // to_date("1998").should.eql(baseDateObj);
    done();
  });

  // it("Simple Month Day test", function(done) {
  //     baseDateObj.month = 2;
  //     baseDateObj.day = 12;
  //     date_extractor("March 12").should.eql(baseDateObj);
  //   done();
  // });


  it('Create | Date and Time', function(done) {
    dateEqual(testCreateDate('08/25/1978 12:04'), new Date(1978, 7, 25, 12, 4), 'Slash format');
    dateEqual(testCreateDate('08-25-1978 12:04'), new Date(1978, 7, 25, 12, 4), 'Dash format');
    dateEqual(testCreateDate('1978/08/25 12:04'), new Date(1978, 7, 25, 12, 4), 'Reverse slash format');
    dateEqual(testCreateDate('June 1st, 2008 12:04'), new Date(2008, 5, 1, 12, 4), 'Full text format');

    dateEqual(testCreateDate('08-25-1978 12:04:57'), new Date(1978, 7, 25, 12, 4, 57), 'with seconds');
    dateEqual(testCreateDate('08-25-1978 12:04:57.322'), new Date(1978, 7, 25, 12, 4, 57, 322), 'with milliseconds');

    dateEqual(testCreateDate('08-25-1978 12pm'), new Date(1978, 7, 25, 12), 'with am/pm');
    dateEqual(testCreateDate('08-25-1978 12:42pm'), new Date(1978, 7, 25, 12, 42), 'with minutes and am/pm');
    dateEqual(testCreateDate('08-25-1978 12:42:32pm'), new Date(1978, 7, 25, 12, 42, 32), 'with seconds and am/pm');
    dateEqual(testCreateDate('08-25-1978 12:42:32.488pm'), new Date(1978, 7, 25, 12, 42, 32, 488), 'with seconds and am/pm');

    dateEqual(testCreateDate('08-25-1978 00:00am'), new Date(1978, 7, 25, 0, 0, 0, 0), 'with zero am');
    dateEqual(testCreateDate('08-25-1978 00:00:00am'), new Date(1978, 7, 25, 0, 0, 0, 0), 'with seconds and zero am');
    dateEqual(testCreateDate('08-25-1978 00:00:00.000am'), new Date(1978, 7, 25, 0, 0, 0, 0), 'with milliseconds and zero am');

    dateEqual(testCreateDate('08-25-1978 1pm'), new Date(1978, 7, 25, 13), '1pm am/pm');
    dateEqual(testCreateDate('08-25-1978 1:42pm'), new Date(1978, 7, 25, 13, 42), '1pm minutes and am/pm');
    dateEqual(testCreateDate('08-25-1978 1:42:32pm'), new Date(1978, 7, 25, 13, 42, 32), '1pm seconds and am/pm');
    dateEqual(testCreateDate('08-25-1978 1:42:32.488pm'), new Date(1978, 7, 25, 13, 42, 32, 488), '1pm seconds and am/pm');

    dateEqual(testCreateDate('08-25-1978 1am'), new Date(1978, 7, 25, 1), '1am am/pm');
    dateEqual(testCreateDate('08-25-1978 1:42am'), new Date(1978, 7, 25, 1, 42), '1am minutes and am/pm');
    dateEqual(testCreateDate('08-25-1978 1:42:32am'), new Date(1978, 7, 25, 1, 42, 32), '1am seconds and am/pm');
    dateEqual(testCreateDate('08-25-1978 1:42:32.488am'), new Date(1978, 7, 25, 1, 42, 32, 488), '1am seconds and am/pm');

    dateEqual(testCreateDate('08-25-1978 11pm'), new Date(1978, 7, 25, 23), '11pm am/pm');
    dateEqual(testCreateDate('08-25-1978 11:42pm'), new Date(1978, 7, 25, 23, 42), '11pm minutes and am/pm');
    dateEqual(testCreateDate('08-25-1978 11:42:32pm'), new Date(1978, 7, 25, 23, 42, 32), '11pm seconds and am/pm');
    dateEqual(testCreateDate('08-25-1978 11:42:32.488pm'), new Date(1978, 7, 25, 23, 42, 32, 488), '11pm seconds and am/pm');

    dateEqual(testCreateDate('08-25-1978 11am'), new Date(1978, 7, 25, 11), '11am am/pm');
    dateEqual(testCreateDate('08-25-1978 11:42am'), new Date(1978, 7, 25, 11, 42), '11am minutes and am/pm');
    dateEqual(testCreateDate('08-25-1978 11:42:32am'), new Date(1978, 7, 25, 11, 42, 32), '11am seconds and am/pm');
    dateEqual(testCreateDate('08-25-1978 11:42:32.488am'), new Date(1978, 7, 25, 11, 42, 32, 488), '11am seconds and am/pm');

    done();
  });

});

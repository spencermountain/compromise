"use strict";
const mocha = require("mocha");
const should = require("should");
const date_extractor = require("../../src/term/value/date_extractor");

describe("Date Parser", function() {
  
  it("Simple Year test", function(done) {
    let d = { day: undefined,
      month: undefined,
      year: 1998,
      to: { day: undefined, month: undefined, year: undefined } };

      date_extractor("1998").should.eql(d);

    done();
  });
});
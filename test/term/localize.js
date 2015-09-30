"use strict";
let mocha = require("mocha");
let should = require("should");
let Term = require("../../src/term/term.js");
let tests = require("./british_terms.js");

describe("localize", function() {

  tests.forEach(function(a) {
    //britishize it
    let t = new Term(a[0]);
    it(a[0], function(done) {
      t.americanize().should.equal(a[1]);
      done();
    });
    //americanize it
    let t2 = new Term(a[1]);
    it(a[0], function(done) {
      t2.britishize().should.equal(a[0]);
      done();
    });
  });

});
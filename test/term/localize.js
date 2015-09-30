"use strict";
let mocha = require("mocha");
let should = require("should");
let Term = require("../../src/term/term.js");

describe("localize", function() {
  let tests = [
    ["accessorising", "accessorizing"],
  ];

  it("americanize", function(done) {
    tests.forEach(function(a) {
      let t = new Term(a[0]);
      t.americanize().should.equal(a[1]);
    });
    done();
  });

  it("britishize", function(done) {
    tests.forEach(function(a) {
      let t = new Term(a[1]);
      t.britishize().should.equal(a[0]);
    });
    done();
  });



});
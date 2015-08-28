"use strict";
let mocha = require("mocha");
let should = require("should");
let Noun = require("../../src/term/noun/noun.js");

describe("noun inflection", function() {
  it("isplural", function(done) {
    let tests = [
      ["octopus", false],
      ["tree", false],
      ["trees", true],
      ["i", false],
      // ["we", true],
      ["mayor of chicago", false],
      ["mayors of chicago", true],
      ["octopus", false],
      ["octopi", true],
      ["eyebrow", false],
      ["eyebrows", true],
      ["child", false],
      ["children", true],
    ];
    tests.forEach(function(a) {
      let n = new Noun(a[0]);
      n.is_plural().should.equal(a[1]);
    });
    done();
  });
});

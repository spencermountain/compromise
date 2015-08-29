"use strict";
let mocha = require("mocha");
let should = require("should");
let sentencesClass = require("../../src/sentence/sentence");

describe("Sentence Class Methods", function() {
  
  it("Basic", function(done) {
    let sen = new sentencesClass("Hello World");
    let methods = [
      'terminator',
      'tag',
      'sentence_type',
      'normalized',
      'text',
      'parents'
    ];

    methods.forEach(function(m) {
      sen.__proto__.hasOwnProperty(m).should.be.true;
    });

    done();
  });

  it("Termination", function(done) {

    let tests = [
      ["Tony is nice.", "."],
      ["Tony is nice!", "!"],
      ["Is Tony is nice?", "?"],
      ["Tony is okay", "."]
    ];

    tests.forEach(function(a) {
      let s = new sentencesClass(a[0]);
      s.terminator().should.eql(a[1]);
    });
    done();
  });
});

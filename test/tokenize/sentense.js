var mocha = require("mocha");
var should = require("should");

var Sentences = require("../../build/tokenize/sentences");

describe("tokenize sentense tests", function () {
  it("tokenize basic sentence", function (done) {
    Sentences("I like that Color").should.have.length(1);
    Sentences("She was dead. He was ill.").should.have.length(2);
    Sentences("i think it is good... or else.").should.have.length(1);
    Sentences("Dr. Tony is nice. He lives in at Elm St. Vancouver BC. Canada.").should.have.length(2);
    done();
  });
});

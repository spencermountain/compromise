import mocha from "mocha";
import should from "should";
import Sentences from "../../src";

describe("tokenize sentence tests", () => {
  it("tokenize basic sentence", (done) => {
    Sentences("I like that Color").sentences.should.have.length(1);
    Sentences("She was dead. He was ill.").sentences.should.have.length(2);
    Sentences("i think it is good... or else.").sentences.should.have.length(1);
    Sentences("Dr. Tony is nice. He lives on Elm St. in Vancouver BC. Canada.").sentences.should.have.length(2);
    done();
  });
});

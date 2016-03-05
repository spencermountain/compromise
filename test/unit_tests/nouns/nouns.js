'use strict';
let mocha = require('mocha');
let should = require('should');
let Noun = require('../../../src/term/noun/noun.js');

describe('nouns', function() {

  it('is_date', function(done) {
    let tests = [
      ['five hundred feet', false],
      ['50 square feet', false],
      ['90 hertz', false],
      ['two books', false],
      ['two hundred', false],
      ['4 hundred and ten', false],
      ['4 and a half million', false],
      ['499 thousand', false],
      ['499', false],
      ['4,899', false],
      ['John Smith', false],
      ['dr. John Smith', false],
      ['John Smith jr.', false],
      ['John Jacob Smith', false],
      ['Jani K. Smith', false],
      ['asdfefs', false],
      ['octopus', false],
      ['tree', false],
      ['i', false],
      ['FBI', false],
      ['F.B.I.', false],
      ['Fun ltd.', false],
      ['Fun co', false],
      ['Smith & Rogers', false],
      ['Google', false],
      ['tuesday', true],
      ['february', true],
      ['february fifth', true],
      ['tuesday march 5th', true],
      ['tuesday march 5th, 2015', true],
    ];
    tests.forEach(function(a) {
      let n = new Noun(a[0]);
      (a[1]).should.equal(n.is_date());
    });
    done();
  });

  it('is_organization', function(done) {
    let tests = [
      ['five hundred feet', false],
      ['50 square feet', false],
      ['90 hertz', false],
      ['two books', false],
      ['two hundred', false],
      ['4 hundred and ten', false],
      ['4 and a half million', false],
      ['499 thousand', false],
      ['499', false],
      ['4,899', false],
      ['John Smith', false],
      ['dr. John Smith', false],
      ['John Smith jr.', false],
      ['John Jacob Smith', false],
      ['Jani K. Smith', false],
      ['asdfefs', false],
      ['octopus', false],
      ['tree', false],
      ['i', false],
      ['FBI', true],
      ['F.B.I.', true],
      ['Fun ltd', true],
      ['Fun co', true],
      ['Smith & Rogers', true],
      ['google', true],
      ['tuesday', false],
      ['february', false],
      ['february fifth', false],
      ['tuesday march 5th', false],
      ['tuesday march 5th, 2015', false],
    ];
    tests.forEach(function(a) {
      let n = new Noun(a[0]);
      (a[1]).should.equal(n.is_organization());
    });
    done();
  });


  it('is_person', function(done) {
    let tests = [
      ['five hundred feet', false],
      ['50 square feet', false],
      ['90 hertz', false],
      ['two books', false],
      ['two hundred', false],
      ['4 hundred and ten', false],
      ['4 and a half million', false],
      ['499 thousand', false],
      ['499', false],
      ['4,899', false],
      ['John Smith', true],
      ['dr. John Smith', true],
      ['John Smith jr.', true],
      ['John Jacob Smith', true],
      ['i', true],
      // ['Jani K. Smith', true],
      ['asdfefs', false],
      ['octopus', false],
      ['tree', false],
      ['FBI', false],
      ['F.B.I.', false],
      ['Fun ltd', false],
      ['Fun co', false],
      ['Smith & Rogers', false],
      ['google', false],
      ['tuesday', false],
      ['february', false],
      ['february fifth', false],
      ['tuesday march 5th', false],
      ['tuesday march 5th, 2015', false],
    ];
    tests.forEach(function(a) {
      let n = new Noun(a[0]);
      (a[1]).should.equal(n.is_person());
    });
    done();
  });

  it('is_value', function(done) {
    let tests = [
      ['five hundred feet', true],
      ['50 square feet', true],
      ['90 hertz', true],
      ['two books', true],
      ['two hundred', true],
      ['4 hundred and ten', true],
      ['4 and a half million', true],
      ['499 thousand', true],
      ['499', true],
      ['4,899', true],
      ['John Smith', false],
      ['dr. John Smith', false],
      ['John Smith jr.', false],
      ['John Jacob Smith', false],
      ['Jani K. Smith', false],
      ['asdfefs', false],
      ['octopus', false],
      ['tree', false],
      ['i', false],
      ['FBI', false],
      ['F.B.I.', false],
      ['Fun ltd', false],
      ['Fun co', false],
      ['Smith & Rogers', false],
      ['google', false],
      ['tuesday', false],
      ['february', false],
      ['february fifth', false],
      ['tuesday march 5th', false],
      ['tuesday march 5th, 2015', false],
    ];
    tests.forEach(function(a) {
      let n = new Noun(a[0]);
      (a[1]).should.equal(n.is_value());
    });
    done();
  });


  it('is_place', function(done) {
    let tests = [
      ['five hundred feet', false],
      ['50 square feet', false],
      ['90 hertz', false],
      ['two books', false],
      ['two hundred', false],
      ['4 hundred and ten', false],
      ['4 and a half million', false],
      ['499 thousand', false],
      ['499', false],
      ['4,899', false],
      ['John Smith', false],
      ['dr. John Smith', false],
      ['John Smith jr.', false],
      ['John Jacob Smith', false],
      ['Jani K. Smith', false],
      ['asdfefs', false],
      ['octopus', false],
      ['tree', false],
      ['i', false],
      ['FBI', false],
      ['F.B.I.', false],
      ['Fun ltd', false],
      ['Fun co', false],
      ['Smith & Rogers', false],
      ['google', false],
      ['tuesday', false],
      ['february', false],
      ['february fifth', false],
      ['tuesday march 5th', false],
      ['tuesday march 5th, 2015', false],
    ];
    tests.forEach(function(a) {
      let n = new Noun(a[0]);
      (a[1]).should.equal(n.is_place());
    });
    done();
  });



});

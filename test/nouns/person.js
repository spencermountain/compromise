'use strict';
let mocha = require('mocha');
let should = require('should');
let Person = require('../../src/term/noun/person/person.js');

describe('parse name', function() {
  it('gets honourific', function(done) {
    let tests = [
      ['John Smith', null],
      ['dr. John Smith', 'dr'],
      ['John Smith jr.', 'jr'],
      ['John Jacob Smith', null],
      ['asdfefs', null]
    ];
    tests.forEach(function(a) {
      let n = new Person(a[0]);
      (a[1] === n.honourific).should.equal(true);
    });
    done();
  });

  it('gets firstname', function(done) {
    let tests = [
      ['John Smith', 'john'],
      ['dr. John Smith', 'john'],
      ['John Smith jr.', 'john'],
      ['John Jacob Smith', 'john'],
      ['asdfefs', null]
    ];
    tests.forEach(function(a) {
      let n = new Person(a[0]);
      (a[1] === n.firstName).should.equal(true);
    });
    done();
  });

  it('gets lastname', function(done) {
    let tests = [
      ['John Smith', 'smith'],
      ['dr. John Smith', 'smith'],
      ['John Smith jr.', 'smith'],
      ['John Jacob Smith', 'smith'],
    ];
    tests.forEach(function(a) {
      let n = new Person(a[0]);
      (a[1] === n.lastName).should.equal(true);
    });
    done();
  });

});

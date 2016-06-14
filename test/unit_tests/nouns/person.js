'use strict';
let Person = require('../../../src/term/noun/person/person.js');

describe('parse name', function() {
  it('gets honourific', function(done) {
    let tests = [
      ['John Smith', null],
      ['dr. John Smith', 'dr'],
      ['John Smith jr.', 'jr'],
      ['John Jacob Smith', null],
      ['Jani K. Smith', null],
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
      ['John Smith', 'John'],
      ['dr. John Smith', 'John'],
      ['Ann-Marie Smith-O\'Brien jr.', 'Ann-Marie'],
      ['John Jacob Smith-o\'brien', 'John'],
      ['Jani K. Smith', 'Jani'],
      ['Ann-Marie', 'Ann-Marie'],
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
      ['John Smith', 'Smith'],
      ['dr. John Smith', 'Smith'],
      ['John Smith jr.', 'Smith'],
      ['John Jacob mcdonald-williams', 'McDonald-Williams'],
      ['Jani-Lee K. o\'brien-macneil', 'O\'Brien-MacNeil'],
    ];
    tests.forEach(function(a) {
      let n = new Person(a[0]);
      (a[1] === n.lastName).should.equal(true);
    });
    done();
  });

});

describe('person gender', function() {
  it('gets gender', function(done) {
    let tests = [
      ['John Smith', 'Male'],
      ['dr. John Smith', 'Male'],
      ['Jane Doe', 'Female'],
      ['Jane', 'Female'],
      // ambiguous gender
      ['Jan Smith', null],
      ['Jan', null],
      //unknown name
      ['Jani K. Smith', 'Female'],
      ['Jani', null],
      ['asdfefs', null]
    ];
    tests.forEach(function(a) {
      let n = new Person(a[0]);
      (a[1] === n.gender()).should.equal(true);
    });
    done();
  });
});

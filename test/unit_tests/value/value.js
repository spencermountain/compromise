'use strict';
let Value = require('../../../src/term/noun/value/value.js');

describe('parse value', function() {

  it('gets number', function(done) {
    let tests = [
      ['five hundred feet', 500],
      ['fifty square feet', 50],
      ['90 hertz', 90],
    ];
    tests.forEach(function(a) {
      let n = new Value(a[0]);
      (a[1] === n.number).should.equal(true);
    });
    done();
  });


  it('gets unit', function(done) {
    let tests = [
      ['five hundred feet', 'feet'],
      ['fifty hertz', 'hertz'],
    ];
    tests.forEach(function(a) {
      let n = new Value(a[0]);
      (a[1] === n.unit).should.equal(true);
    });
    done();
  });

  it('gets measurement', function(done) {
    let tests = [
      ['five hundred feet', 'Distance'],
      ['fifty hertz', 'Frequency'],
    // ['7Gb', 'Data'],
    ];
    tests.forEach(function(a) {
      let n = new Value(a[0]);
      (n.measurement || '').should.equal(a[1]);
    });
    done();
  });



});

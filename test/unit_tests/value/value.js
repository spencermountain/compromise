'use strict';
let Value = require('../../../src/term/noun/value/value.js');

describe('parse value', function() {

  it('to_ordinal', function(done) {
    [
      [11, '11th'],
      [5, '5th'],
      [22, '22nd'],
    ].forEach(function(a) {
      let n = new Value(a[0]);
      (n.to_ordinal()).should.equal(a[1]);
    });
    done();
  });

  it('gets number', function(done) {
    [
      ['five hundred feet', 500],
      ['fifty square feet', 50],
      ['90 hertz', 90],
    ].forEach(function(a) {
      let n = new Value(a[0]);
      (a[1] === n.number).should.equal(true);
    });
    done();
  });


  [
    ['five hundred feet', 'feet'],
    ['fifty hertz', 'hertz'],
    ['100 dollars', 'dollar'],
    ['$100', 'dollar'],
    ['¥2.5', 'yen'],
    ['€3,000,100', 'euro'],
    ['EUR 9.99', 'eur'],
    // ['nine south sudanese pounds', 'south sudanese pound'],
    ['5 g', 'g'],
    ['3 grams', 'gram'],
    ['2 inches', 'inch'],
    ['2 in', 'in'],
  ].forEach(function(a) {
    it(a[0], function(done) {
      let n = new Value(a[0]);
      (a[1] || '').should.equal(n.unit);
      done();
    });
  });

  [
    ['five hundred feet', 'Distance'],
    ['100 kilometers', 'Distance'],
    ['fifty hertz', 'Frequency'],
    // ['fifty saudi riyals', 'Money'],
    ['59 thousand $', 'Money'],
    ['100 mb', 'Data'],
    ['50 руб', 'Money'],
    ['EUR 9.99', 'Money'],
    ['100 dollars', 'Money'],
    ['256 bitcoins', 'Money'],
  ].forEach(function(a) {
    it(a[0], function(done) {
      let n = new Value(a[0]);
      (n.measurement || '').should.equal(a[1]);
      done();
    });
  });

  it('gets ofWhat', function(done) {
    [
      ['nine kg', 'kilogram'],
      ['5 kg of copper', 'copper'],
      ['many of these stories', 'these stories'],
      ['room full of beautiful creatures', 'beautiful creatures'],
      ['boxes of bags of food', 'bags of food'],
      ['just nothing', '']
    ].forEach(function(a) {
      let n = new Value(a[0]);
      (n.of_what).should.equal(a[1]);
    });
    done();
  });

});

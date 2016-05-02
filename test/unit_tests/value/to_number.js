'use strict';
let nlp = require('../../../src/index.js');

// ['half a million', 500000],
// ['half-million', 500000],
// ['quarter-million', 250000],
// ['a quarter million', 250000],
// ['a quarter-grand', 250],
let tests = [
  ['twenty two thousand five hundred', 22500],
  ['two thousand five hundred and sixty', 2560],
  ['a hundred and two', 102],
  ['a hundred', 100],
  ['seven', 7],
  ['seven grand', 7000],
  ['104', 104],
  ['13 thousand', 13000],
  ['17,983', 17983],
  ['nine hundred', 900],
  ['twenty one hundred', 2100],
  ['twenty one', 21],
  ['seventy two', 72],
  ['two hundred two', 202],
  ['one thousand one', 1001],
  ['minus five hundred', -500],
  ['minus fifteen', -15],
  ['five hundred million', 500000000],
  ['$12.03', 12.03],
  ['$12', 12],
  ['5 hundred', 500],
  ['5.2 thousand', 5200],
  ['million', 1000000],
  ['hundred one', 101],
  ['minus fifty', -50],
  ['twenty thousand', 20000],
  ['four point six', 4.6],
  ['nine hundred point five', 900.5],
  ['sixteen hundred sixteen point eight', 1616.8],
  ['four point seven nine', 4.79],
  ['four point sixteen', 4.16],
  ['twenty first', 21],
  ['fifty ninth', 59],
  ['nine hundred fiftieth', 950],
  ['five thousand nine hundred fiftieth', 5950],
  ['six hundred and fifty nine', 659],
  ['six hundred and fifty nine thousand', 659000],
  [950, 950],
  [999999950, 999999950],
  [8080999999950, 8080999999950],
  ['fifteen million and two', 15000002],
  ['six hundred and eighteen', 618],
  ['two hundred thousand', 200000],
  ['six million ninety', 6000090],
  ['twenty-two hundred', 2200],
  ['minus 70', -70],
  ['minus eight', -8],
  ['minus 8 hundred', -800],
  ['twenty-seven hundred', 2700],
  ['minus eight thousand two hundred', -8200],
  ['twenty-five', 25],
  ['half a million', 500000],
  ['five hundred eighteen', 518],
  ['eighty eight point nine nine', 88.99],
  ['minus eighty eight point nine nine', -88.99],
];
describe('to number', function() {
  tests.forEach(function(a) {
    it(a, function(done) {
      let v = nlp.value(a[0]);
      (v.number || '').should.equal(a[1] || '');
      done();
    });
  });
});



describe('invalid numbers', function() {
  [
    ['12:32', null],
    ['123-1231', null],
    ['seven eleven', null],
    ['ten-four', null],
    ['one seven', null],
    ['one ten', null],
    ['one twelve', null],
    ['one thirty', null],
    ['nine fifty', null],
    ['five six', null],
    ['nine seventy', null],
    ['nine two hundred', null],
    ['ten one', null],
    ['twelve one', null],
    ['seventy five two', null],
    ['two hundred three hundred', null],
    ['sixty fifteen hundred', null],
    ['one twenty', null],
    ['twenty five twenty', null],
    ['', null],
    [null, null],
  ].forEach(function(a) {
    it(a[0], function(done) {
      let v = nlp.value(a[0]);
      (v.number || '').should.equal(a[1] || '');
      done();
    });
  });
});

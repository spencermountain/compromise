'use strict';
let nlp = require('../../../src/index.js');

let months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];


//   durations //

// ['March 7th-11th 1987', [2, 7, 1987]],
// ['June 1st-11th 1999', [5, 1, 1999]],
// ['28th of September to 5th of October 2008', [8, 28, 2008]],
// ['2nd of January to 5th of October 2008', [9, 5, 2008]],
// ['March 7th to june 11th 1987', [2, 7, 1987]],
// ['April 17th to september 11th 1981', [3, 17, 1981]],
// ['June 1st to June 11th 2014', [5, 1, 2014]],
// ['between 13 February and 15 February 1945', [1, 13, 1945]],
// ['between March 7th and june 11th 1987', [2, 7, 1987]],
// ['3rd - 5th of March 1969', [2, 3, 1969]],
// ["September 1939 to April 1945",  ["month":null,"day":null,"year":1939]],
// ["June 1969 to April 1975",  ["month":null,"day":null,"year":1969]],
// ["2014-1998",  ["month":null,"day":null,"year":null]],


describe('date', function () {

  it('full dates', function (done) {
    let tests = [
      ['june 5th 1999', [5, 5, 1999]],
      ['january 1st 1644', [0, 1, 1644]],
      ['June 4th 1993', [5, 4, 1993]],
      ['March 1st 1987', [2, 1, 1987]],
      ['June 22nd 2014', [5, 22, 2014]],
      ['June 22nd 1997', [5, 22, 1997]],
    // ['200bc', [5, 22, 1997]],
    ];
    tests.forEach(function (a) {
      let n = nlp.date(a[0]);
      let w = a[1];
      let d = n.date();
      d.getMonth().should.equal(w[0]);
      d.getDate().should.equal(w[1]);
      d.getFullYear().should.equal(w[2]);
    });
    done();
  });

  it('partial dates', function (done) {
    let tests = [
      ['3rd of March 1969', [2, 3, 1969]],
      ['2nd of April 1929', [3, 2, 1929]],
      ['March 1969', [2, null, 1969]],
      ['March 18th', [2, 18, null]],
      ['August 28th', [7, 28, null]],
      ['18th of March', [2, 18, null]],
      ['27th of March', [2, 27, null]],
      ['2012-2014', [null, null, 2012]],
      ['1997-1998', [null, null, 1997]],
      ['1998', [null, null, 1998]],
      ['1672', [null, null, 1672]],
      ['2015', [null, null, 2015]],
      ['january 5th 1998', [0, 5, 1998]],
      ['february 10th', [1, 10, null]],
      ['february 30th', [1, 30, null]],
      ['jan 1921', [0, null, 1921]],
    ];
    tests.forEach(function (a) {
      let n = nlp.date(a[0]);
      let w = a[1];
      let o = n.data;
      (o.month || '').should.equal(w[0] || '');
      (o.day || '').should.equal(w[1] || '');
      (o.year || '').should.equal(w[2] || '');
    });
    done();
  });

  it('not dates', function (done) {
    let tests = [
      ['303rd of March 1969', [2, null, 1969]],
      ['4103', [null, null, null]],
      ['January 5th 4032', [0, 5, null]],
    ];
    tests.forEach(function (a) {
      let n = nlp.date(a[0]);
      let w = a[1];
      let o = n.data;
      (o.month || '').should.equal(w[0] || '');
      (o.day || '').should.equal(w[1] || '');
      (o.year || '').should.equal(w[2] || '');
    });
    done();
  });

});

'use strict';
let nlp = require('../../../src/index.js');

describe('Sentence Class Methods', function() {

  it('Basic', function(done) {
    let sen = nlp.text('Hello World').sentences[0];
    let methods = [
      'terminator',
      'text',
    ];

    methods.forEach(function(m) {
      sen.__proto__.hasOwnProperty(m).should.equal(true);
    });

    done();
  });

  it('Termination', function(done) {
    let tests = [
      ['Tony is nice.', '.'],
      ['Tony is nice!', '!'],
      ['Is Tony is nice?', '?'],
      ['Tony is okay', '.']
    ];
    tests.forEach(function(a) {
      let s = nlp.text(a[0]).sentences[0];
      s.terminator().should.eql(a[1]);
    });
    done();
  });

  it('People', function(done) {
    let tests = [
      ['Sally Daniels went to the park with Don Douglas', ['Sally Daniels', 'Don Douglas']],
      ['Then Sally went to the park with all her friends.', ['Sally']],
      ['Oh say can you see? By the dawn\'s early rise.', ['you']],
      ['All the base are belong to us.', []]
    ];

    tests.forEach(function(a) {
      let people = nlp.text(a[0]).people();
      people = people.map(function(t) {
        return t.text;
      });
      people.should.eql(a[1]);
    });
    done();
  });

  it('Places', function(done) {
    let tests = [
      ['Toronto is the biggest city in Canada', ['Toronto', 'Canada']],
      ['Beijing China grows each year. It is usually sunny.', ['Beijing China']],
      ['Oh say can you see? By the dawn\'s early rise.', []],
    ];

    tests.forEach(function(a) {
      let arr = nlp.text(a[0]).places();
      arr = arr.map(function(t) {
        return t.text;
      });
      arr.should.eql(a[1]);
    });
    done();
  });

  it('Dates', function(done) {
    let tests = [
      ['Toronto is best in January', ['January']],
      ['My birthday is June 5th', ['June 5th']],
      ['Oh say can you see? By the dawn\'s early rise.', []],
    ];

    tests.forEach(function(a) {
      let arr = nlp.text(a[0]).dates();
      arr = arr.map(function(t) {
        return t.text;
      });
      arr.should.eql(a[1]);
    });
    done();
  });

  it('Values', function(done) {
    let tests = [
      // ['The 5 books in Toronto is best in January', ['5 books']],
      // ['My harddrive is 5 Gb', ['5 Gb']],
      ['My birthday is June 5th', []],
      ['Oh say can you see? By the dawn\'s early rise.', []],
    ];

    tests.forEach(function(a) {
      let arr = nlp.text(a[0]).values();
      arr = arr.map(function(t) {
        return t.text;
      });
      arr.should.eql(a[1]);
    });
    done();
  });

  it('Organizations', function(done) {
    let tests = [
      ['The 5 books in Toronto is best in January', []],
      ['My birthday is June 5th', []],
      ['Oh say can you see? By the dawn\'s early rise.', []],
      ['Google may purchase Cannabis Inc', ['Google', 'Cannabis Inc']],
    ];
    tests.forEach(function(a) {
      let arr = nlp.text(a[0]).organizations();
      arr = arr.map(function(t) {
        return t.text;
      });
      arr.should.eql(a[1]);
    });
    done();
  });

  it('Passive voice', function(done) {
    let tests = [
      ['the drink was drank by me', true],
      ['My birthday was approaching by June 5th', false],
      ['Oh say can you see? By the dawn\'s early rise.', false],
    ];

    tests.forEach(function(a) {
      let bool = nlp.sentence(a[0]).is_passive();
      (bool).should.eql(a[1]);
    });
    done();
  });


});

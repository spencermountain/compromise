
'use strict';
let nlp = require('../../../src/index.js');


describe('sentence wordcount ', function() {
  [
    ['he is good', 3],
    ['jack and jill went up the hill.', 7],
    ['Mr. Clinton did so.', 3],
    ['Bill Clinton ate cheese.', 3],
    ['5kb of data.', 3],
    ['it was five hundred and seventy two.', 3],
  ].forEach((a) => {
    it(a[0], function(done) {
      nlp.sentence(a[0]).word_count().should.equal(a[1]);
      done();
    });
  });
});


describe('text wordcount ', function() {
  [
    ['he is good', 3],
    ['jack and jill went up the hill. They got water.', 10],
    ['Mr. Clinton did so.', 3],
    ['Bill Clinton ate cheese.', 3],
    ['Bill Clinton went walking', 3],
    ['Bill Clinton will go walking', 3],
  ].forEach((a) => {
    it(a[0], function(done) {
      nlp.text(a[0]).word_count().should.equal(a[1]);
      done();
    });
  });
});

describe('sentence.normal() ', function() {
  [
    ['he is good', 'he is good'],
    ['Jack and Jill went up the hill.', 'jack and jill went up the hill.'],
    ['Mr. Clinton did so.', 'mr clinton did so.'],
  ].forEach((a) => {
    it(a[0], function(done) {
      nlp.text(a[0]).normal().should.equal(a[1]);
      done();
    });
  });
});

describe('text.normal() ', function() {
  [
    ['he is good', 'he is good'],
    ['Jack and Jill went up the hill. They got water.', 'jack and jill went up the hill. they got water.'],
    ['Mr. Clinton did so.', 'mr clinton did so.'],
  ].forEach((a) => {
    it(a[0], function(done) {
      nlp.text(a[0]).normal().should.equal(a[1]);
      done();
    });
  });
});

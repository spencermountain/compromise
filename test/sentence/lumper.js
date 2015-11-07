'use strict';
let mocha = require('mocha');
let should = require('should');
let nlp = require('../../src/index.js');

describe('lumper test', function() {

  it('fancy lumps', function(done) {
    let tests = [
      ['John Baseball', ['Person']],
      ['John sr.', ['Person']],
      ['Dr. John', ['Person']],
    ];
    tests.forEach(function(a) {
      let n = nlp.Text(a[0]);
      let tags = n.tags()[0];
      (a[1]).should.deepEqual(tags);
    });

    done();
  });


  it('contractions', function(done) {

    nlp.Text('he\'s fun').terms()[1].normal.should.equal('is');
    nlp.Text('she\'s walking').terms()[1].normal.should.equal('is');
    nlp.Text('where\'s waldo').terms()[1].normal.should.equal('is');
    nlp.Text('where\'s he going?').terms()[1].normal.should.equal('is');
    nlp.Text('where\'s the pencil?').terms()[1].normal.should.equal('is');
    nlp.Text('he\'s walked').terms()[1].normal.should.equal('has');
    nlp.Text('it\'s got the best features').terms()[1].normal.should.equal('has');
    nlp.Text('it\'s achieved each goal').terms()[1].normal.should.equal('has');
    nlp.Text('where\'s he disappeared to?').terms()[1].normal.should.equal('has');
    nlp.Text('where\'s the pencil disappeared to?').terms()[1].normal.should.equal('has');
    done();
  });



});

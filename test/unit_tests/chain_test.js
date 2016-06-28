
'use strict';
let nlp = require('../../../src/index.js');

describe('text sanity-test', function() {

  it('methods should return this', function(done) {

    let t = nlp.text('he isn\'t going. She\'s a dog-lover.');
    t.sentences.length.should.equal(2);
    t.contractions.expand();
    t.sentences.length.should.equal(2);
    t.contractions.contract();
    t.sentences.length.should.equal(2);

    let str = 'this is one sentence. This makes two now.';
    t = nlp.text(str);
    t.to_past().text().should.equal('this was one sentence. This made two now.');
    t.to_present().text().should.equal(str);
    t.to_future().text().should.equal('this will be one sentence. This will make two now.');
    t.to_present().text().should.equal(str);
    t.negate().text().should.equal('this isn\'t one sentence. This doesn\'t make two now.');
    done();
  });


});

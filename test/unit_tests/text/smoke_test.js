
'use strict';
let nlp = require('../../../src/index.js');

describe('text sanity-test', function() {

  it('text handles funny stuff', function(done) {

    nlp.text('').sentences.length.should.equal(0);
    nlp.text(' ').sentences.length.should.equal(0);
    nlp.text('         ').sentences.length.should.equal(0);
    nlp.text('\n   \t   \n\n   ').sentences.length.should.equal(0);
    nlp.text(null).sentences.length.should.equal(0);
    nlp.text([]).sentences.length.should.equal(0);
    nlp.text({}).sentences.length.should.equal(0);

    nlp.text(55).sentences.length.should.equal(1);
    nlp.text('hi world').sentences.length.should.equal(1);

    done();
  });

  it('sentence handles funny stuff', function(done) {

    nlp.sentence('').terms.length.should.equal(0);
    nlp.sentence(' ').terms.length.should.equal(0);
    nlp.sentence('         ').terms.length.should.equal(0);
    nlp.sentence('\n   \t   \n\n   ').terms.length.should.equal(0);
    nlp.sentence(null).terms.length.should.equal(0);
    nlp.sentence([]).terms.length.should.equal(0);
    nlp.sentence({}).terms.length.should.equal(0);

    nlp.sentence(55).terms.length.should.equal(1);
    nlp.sentence('hi').terms.length.should.equal(1);

    done();
  });

});

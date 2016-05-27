
'use strict';
let nlp = require('../../../src/index.js');

describe('text sanity-test', function() {

  it('handles funny inputs', function(done) {

    nlp.text('').sentences.length.should.equal(0);
    nlp.text(' ').sentences.length.should.equal(0);
    nlp.text('         ').sentences.length.should.equal(0);
    nlp.text('\n   \t   \n\n   ').sentences.length.should.equal(0);
    nlp.text(null).sentences.length.should.equal(0);
    nlp.text([]).sentences.length.should.equal(0);
    nlp.text({}).sentences.length.should.equal(0);

    done();
  });

});


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

  it('term methods handle funny stuff', function(done) {
    const funny = [
      '',
      '  ',
      null,
      '\n\n',
      [],
      {}
    ];
    funny.forEach((str) => {
      nlp.term(str).normal.should.equal('');
      nlp.verb(str).normal.should.equal('');
      nlp.noun(str).normal.should.equal('');
      nlp.adjective(str).normal.should.equal('');
      nlp.adverb(str).normal.should.equal('');
      nlp.value(str).normal.should.equal('');
      nlp.person(str).normal.should.equal('');
      nlp.date(str).normal.should.equal('');
      nlp.organization(str).normal.should.equal('');
    });

    done();
  });


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

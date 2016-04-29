
'use strict';
let nlp = require('../../../src/index.js');

describe('term root()', function() {

  it('root is overridden', function(done) {
    //on term
    nlp.term('Joe').root().should.equal('joe');
    nlp.term('just-right').root().should.equal('just right');
    //on noun
    nlp.noun('camel').root().should.equal('camel');
    nlp.noun('camels').root().should.equal('camel');
    nlp.noun('4').root().should.equal('4');
    nlp.noun('shadows').root().should.equal('shadow');
    //on verb
    nlp.verb('shadow').root().should.equal('shadow');
    nlp.verb('shadowed').root().should.equal('shadow');
    nlp.verb('shadowing').root().should.equal('shadow');
    nlp.verb('shadows').root().should.equal('shadow');
    //on person
    nlp.person('john smith').root().should.equal('john smith');
    nlp.person('john g. smith').root().should.equal('john g smith');
    nlp.person('mr. john g. smith').root().should.equal('john g smith');
    nlp.person('john g. m. smith').root().should.equal('john g m smith');
    nlp.person('Dr. John Smith').root().should.equal('john smith');
    //on place
    nlp.place('Toronto').root().should.equal('toronto');
    nlp.place('Toronto, Canada').root().should.equal('toronto');
    nlp.place('Toronto Canada').root().should.equal('toronto');
    nlp.place('Toronto, Ontario, Canada').root().should.equal('toronto');

    done();
  });

});


describe('text root()', function() {

  it('roots all terms', function(done) {
    //on term
    nlp.text('Joe is 5.5 feet tall.').root().should.equal('joe is 5.5 feet tall');
    nlp.text('Joe is five feet tall.').root().should.equal('joe is 5 feet tall');
    nlp.text('Dr. Joe is cool.').root().should.equal('joe is cool');
    nlp.text('it is just-right').root().should.equal('it is just right');
    done();
  });

});

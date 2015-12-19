'use strict';
let nlp = require('../../../src/index.js');

let verbs = [{
  'infinitive': 'convolute',
  'present': 'convolutes',
  'gerund': 'convoluting',
  'past': 'convoluted'
}, {
  'present': 'presents',
  'gerund': 'presenting',
  'past': 'presented',
  'infinitive': 'present'
}, {
  'present': 'angulates',
  'gerund': 'angulating',
  'past': 'angulated',
  'infinitive': 'angulate'
}, {
  'present': 'conjures',
  'gerund': 'conjuring',
  'past': 'conjured',
  'infinitive': 'conjure'
}, {
  'present': 'denounces',
  'gerund': 'denouncing',
  'past': 'denounced',
  'infinitive': 'denounce'
}, {
  'present': 'watches',
  'gerund': 'watching',
  'past': 'watched',
  'infinitive': 'watch'
}, {
  'present': 'tingles',
  'gerund': 'tingling',
  'past': 'tingled',
  'infinitive': 'tingle'
}, {
  'present': 'mortises',
  'gerund': 'mortising',
  'past': 'mortised',
  'infinitive': 'mortise'
}, {
  'present': 'disguises',
  'gerund': 'disguising',
  'past': 'disguised',
  'infinitive': 'disguise'
}, {
  'infinitive': 'effect',
  'gerund': 'effecting',
  'past': 'effected',
  'present': 'effects'
}, {
  'infinitive': 'want',
  'gerund': 'wanting',
  'past': 'wanted',
  'present': 'wants'
}, {
  'infinitive': 'power',
  'gerund': 'powering',
  'past': 'powered',
  'present': 'powers'
}, {
  'infinitive': 'overcompensate',
  'present': 'overcompensates',
  'past': 'overcompensated',
  'gerund': 'overcompensating'
}, {
  'infinitive': 'ice',
  'present': 'ices',
  'past': 'iced',
  'gerund': 'icing'
}, {
  'infinitive': 'buy',
  'present': 'buys',
  'past': 'bought',
  'gerund': 'buying'
}, {
  'infinitive': 'flower',
  'present': 'flowers',
  'past': 'flowered',
  'gerund': 'flowering'
}, {
  'infinitive': 'rage',
  'present': 'rages',
  'past': 'raged',
  'gerund': 'raging'
}, {
  'infinitive': 'drive',
  'present': 'drives',
  'past': 'drove',
  'gerund': 'driving'
}, {
  'infinitive': 'foul',
  'present': 'fouls',
  'past': 'fouled',
  'gerund': 'fouling'
}, {
  'infinitive': 'overthrow',
  'present': 'overthrows',
  'gerund': 'overthrowing',
  'past': 'overthrew'
}, {
  'infinitive': 'aim',
  'present': 'aims',
  'past': 'aimed',
  'gerund': 'aiming'
}, {
  'present': 'unifies',
  'gerund': 'unifying',
  'past': 'unified',
  'infinitive': 'unify'
}, {
  'present': 'addresses',
  'gerund': 'addressing',
  'past': 'addressed',
  'infinitive': 'address'
}, {
  'infinitive': 'bumble',
  'present': 'bumbles',
  'past': 'bumbled',
  'gerund': 'bumbling'
}, {
  'infinitive': 'snipe',
  'present': 'snipes',
  'past': 'sniped',
  'gerund': 'sniping'
}, {
  'present': 'relishes',
  'gerund': 'relishing',
  'past': 'relished',
  'infinitive': 'relish'
}, {
  'infinitive': 'lengthen',
  'gerund': 'lengthening',
  'past': 'lengthened',
  'present': 'lengthens'
}, {
  'infinitive': 'farm',
  'present': 'farms',
  'past': 'farmed',
  'gerund': 'farming'
}];


describe('verb conjugate', function() {
  it('infinitive stays infinitive', function(done) {
    verbs.forEach(function(o) {
      let c = nlp.verb(o.infinitive).conjugate();
      (c.infinitive).should.equal(o.infinitive);
    });
    done();
  });

  it('infinitive becomes past', function(done) {
    verbs.forEach(function(o) {
      let c = nlp.verb(o.infinitive).conjugate();
      (c.past).should.equal(o.past);
    });
    done();
  });

  it('infinitive becomes present', function(done) {
    verbs.forEach(function(o) {
      let c = nlp.verb(o.infinitive).conjugate();
      (c.present).should.equal(o.present);
    });
    done();
  });

  it('infinitive becomes gerund', function(done) {
    verbs.forEach(function(o) {
      let c = nlp.verb(o.infinitive).conjugate();
      (c.gerund).should.equal(o.gerund);
    });
    done();
  });

  it('past stays past', function(done) {
    verbs.forEach(function(o) {
      let c = nlp.verb(o.past).conjugate();
      (c.past).should.equal(o.past);
    });
    done();
  });

  it('past becomes present', function(done) {
    verbs.forEach(function(o) {
      let c = nlp.verb(o.past).conjugate();
      (c.present).should.equal(o.present);
    });
    done();
  });

  it('past becomes gerund', function(done) {
    verbs.forEach(function(o) {
      let c = nlp.verb(o.past).conjugate();
      (c.gerund).should.equal(o.gerund);
    });
    done();
  });

  it('present stays present', function(done) {
    verbs.forEach(function(o) {
      let c = nlp.verb(o.present).conjugate();
      (c.present).should.equal(o.present);
    });
    done();
  });

  it('present becomes past', function(done) {
    verbs.forEach(function(o) {
      let c = nlp.verb(o.present).conjugate();
      (c.past).should.equal(o.past);
    });
    done();
  });

  it('present becomes gerund', function(done) {
    verbs.forEach(function(o) {
      let c = nlp.verb(o.present).conjugate();
      (c.gerund).should.equal(o.gerund);
    });
    done();
  });

});

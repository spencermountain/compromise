var test = require('tape');
var nlp = require('./lib/nlp');

test('conjugation:', function(t) {

  var test_conjugation = function(inf, o, form, original) {
    var msg = 'from ' + original + ' to ' + form + ':  [' + o[form] + '] -> [' + inf[form] + ']';
    t.equal(inf[form], o[form], msg);
  };

  [
    {
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
    }, {
      'infinitive': 'develop',
      'present': 'develops',
      'past': 'developed',
      'gerund': 'developing'
    }, {
      'infinitive': 'study',
      'present': 'studies',
      'past': 'studied',
      'gerund': 'studying'
    },
    {
      'infinitive': 'criticise',
      'present': 'criticises',
      'past': 'criticised',
      'gerund': 'criticising'
    }, {
      'infinitive': 'speak',
      'present': 'speaks',
      'past': 'spoke',
      'gerund': 'speaking',
      'perfect': 'have spoken',
      'pluperfect': 'had spoken',
      'future_perfect': 'will have spoken'
    }
  ].forEach(function(o) {
    var forms = ['infinitive', 'past', 'present', 'gerund'];
    for(var i = 0; i < forms.length; i++) {
      var original_form = forms[i];
      var inf = nlp.verb(o[original_form]).conjugate();
      test_conjugation(inf, o, 'infinitive', original_form);
      test_conjugation(inf, o, 'past', original_form);
      test_conjugation(inf, o, 'present', original_form);
      test_conjugation(inf, o, 'gerund', original_form);
    }
  });
  t.end();
});

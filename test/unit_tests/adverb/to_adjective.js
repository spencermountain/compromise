
'use strict';
let nlp = require('../../../src/index.js');

describe('to_adjective', function() {

  //americanize it
  it('to_adjective', function(done) {
    let tests = [
      ['quickly', 'quick'],
      ['garishly', 'garish'],
      ['tediously', 'tedious'],
      ['frightfully', 'frightful'],
      ['tortuously', 'tortuous'],
      ['privately', 'private'],
      ['unambiguously', 'unambiguous'],
      ['cortically', 'cortic'],
      ['biradially', 'biradial'],
      ['meanly', 'mean'],
      ['raspingly', 'rasping'],
      ['comprehensively', 'comprehensive'],
      ['fervently', 'fervent'],
      ['nationally', 'national'],
      ['maternally', 'maternal'],
      ['flashily', 'flashy'],
      ['only', 'only'],
      ['narrowly', 'narrow'],
      ['blasphemously', 'blasphemous'],
      ['abortively', 'abortive'],
      ['inoffensively', 'inoffensive'],
      ['truly', 'true'],
      ['gently', 'gent'],
      ['tolerantly', 'tolerant'],
      ['enchantingly', 'enchanting'],
      ['unswervingly', 'unswerving'],
      ['grubbily', 'grubby'],
      ['longitudinally', 'longitudinal'],
      ['thermodynamically', 'thermodynamic'],
      ['mirthfully', 'mirthful'],
      ['salaciously', 'salacious'],
      ['dourly', 'dour'],
      ['credulously', 'credulous'],
      ['carefully', 'careful'],
      ['knowingly', 'knowing'],
      ['geometrically', 'geometrical'],
      ['unassailably', 'unassailable'],
      ['antecedently', 'antecedent'],
      ['adjectively', 'adjective'],
      ['hebdomadally', 'hebdomadal'],
      ['dizzily', 'dizzy'],
      ['obnoxiously', 'obnoxious'],
      ['thirstily', 'thirsty'],
      ['biennially', 'biennial'],
      ['roguishly', 'roguish'],
      ['mentally', 'mental'],
      ['incessantly', 'incessant'],
      ['intelligently', 'intelligent'],
      ['perseveringly', 'persevering'],
      ['namely', 'name'],
      ['formidably', 'formidable'],
      ['vertically', 'vertical']
    ];
    tests.forEach(function(a) {
      let adv = nlp.adverb(a[0]);
      adv.to_adjective().should.equal(a[1]);
    });
    done();
  });

});

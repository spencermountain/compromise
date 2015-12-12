'use strict';
let Noun = require('../../../src/term/noun/noun.js');

describe('noun inflection', function() {
  it('isplural', function(done) {
    let tests = [
      ['octopus', false],
      ['tree', false],
      ['trees', true],
      ['i', false],
      // ["we", true],
      ['mayor of chicago', false],
      ['mayors of chicago', true],
      ['octopus', false],
      ['octopi', true],
      ['eyebrow', false],
      ['eyebrows', true],
      ['child', false],
      ['children', true],
    ];
    tests.forEach(function(a) {
      let n = new Noun(a[0]);
      n.is_plural().should.equal(a[1]);
    });
    done();
  });

  it('pluralizes', function(done) {
    let tests = [
      ['snake', 'snakes'],
      ['ski', 'skis'],
      // ["Barrymore", "Barrymores"],
      ['witch', 'witches'],
      ['box', 'boxes'],
      ['gas', 'gases'],
      ['kiss', 'kisses'],
      ['index', 'indices'],
      ['appendix', 'appendices'],
      ['criterion', 'criteria'],
      ['berry', 'berries'],
      ['activity', 'activities'],
      ['daisy', 'daisies'],
      ['church', 'churches'],
      ['fox', 'foxes'],
      ['stomach', 'stomachs'],
      ['epoch', 'epochs'],
      ['knife', 'knives'],
      ['half', 'halves'],
      ['scarf', 'scarves'],
      ['chief', 'chiefs'],
      ['spoof', 'spoofs'],
      ['solo', 'solos'],
      ['zero', 'zeros'],
      ['avocado', 'avocados'],
      ['studio', 'studios'],
      ['zoo', 'zoos'],
      ['embryo', 'embryos'],
      ['hero', 'heroes'],
      ['banjo', 'banjos'],
      ['cargo', 'cargos'],
      ['flamingo', 'flamingos'],
      ['fresco', 'frescos'],
      ['ghetto', 'ghettos'],
      ['halo', 'halos'],
      ['mango', 'mangos'],
      ['memento', 'mementos'],
      ['motto', 'mottos'],
      ['tornado', 'tornados'],
      ['tuxedo', 'tuxedos'],
      ['volcano', 'volcanos'],
      ['bus', 'buses'],
      ['crisis', 'crises'],
      ['analysis', 'analyses'],
      ['neurosis', 'neuroses'],
      ['aircraft', 'aircraft'],
      ['halibut', 'halibut'],
      ['moose', 'moose'],
      ['salmon', 'salmon'],
      ['sheep', 'sheep'],
      ['spacecraft', 'spacecraft'],
      ['tuna', 'tuna'],
      ['trout', 'trout'],
      ['armadillo', 'armadillos'],
      ['auto', 'autos'],
      ['bravo', 'bravos'],
      ['bronco', 'broncos'],
      ['casino', 'casinos'],
      ['combo', 'combos'],
      ['gazebo', 'gazebos'],
      //test that plural.pluralize()==plural..
      ['snakes', 'snakes'],
      ['skis', 'skis'],
      ['mayor of chicago', 'mayors of chicago'],
      // ["Barrymores", "Barrymores"],
      ['witches', 'witches'],
      ['boxes', 'boxes'],
      ['gases', 'gases'],
      ['spoofs', 'spoofs'],
      ['solos', 'solos'],
      ['avocados', 'avocados'],
      ['studios', 'studios'],
      ['zoos', 'zoos'],
    ];
    tests.forEach(function(a) {
      let n = new Noun(a[0]);
      n.pluralize().should.equal(a[1]);
    });
    done();
  });

  it('singularizes', function(done) {
    let tests = [
      // ["Joneses", "Jones"],
      ['children', 'child'],
      ['women', 'woman'],
      ['men', 'man'],
      ['people', 'person'],
      ['geese', 'goose'],
      ['mice', 'mouse'],
      ['barracks', 'barracks'],
      ['deer', 'deer'],
      ['nuclei', 'nucleus'],
      ['syllabi', 'syllabus'],
      ['fungi', 'fungus'],
      ['cacti', 'cactus'],
      ['theses', 'thesis'],
      ['crises', 'crisis'],
      ['phenomena', 'phenomenon'],
      ['embryos', 'embryo'],
      ['frescos', 'fresco'],
      ['ghettos', 'ghetto'],
      ['halos', 'halo'],
      ['mangos', 'mango'],
      ['mementos', 'memento'],
      ['mottos', 'motto'],
      ['tornados', 'tornado'],
      ['tuxedos', 'tuxedo'],
      ['volcanos', 'volcano'],
      ['crises', 'crisis'],
      ['analyses', 'analysis'],
      ['aircraft', 'aircraft'],
      ['bass', 'bass'],
      ['bison', 'bison'],
      ['fish', 'fish'],
      ['fowl', 'fowl'],
      ['kilos', 'kilo'],
      ['kimonos', 'kimono'],
      ['logos', 'logo'],
      ['memos', 'memo'],
      ['ponchos', 'poncho'],
      ['photos', 'photo'],
      ['pimentos', 'pimento'],
      ['pros', 'pro'],
      ['sombreros', 'sombrero'],
      ['tacos', 'taco'],
      ['memos', 'memo'],
      ['torsos', 'torso'],
      ['xylophones', 'xylophone'],
      ['quintuplets', 'quintuplet'],
      ['worrywarts', 'worrywart'],
      ['nerds', 'nerd'],
      ['lollipops', 'lollipop'],
      ['eyebrows', 'eyebrow'],
      ['mayors of chicago', 'mayor of chicago'],
      //test that sungular.singularize()==singular..
      ['mango', 'mango'],
      ['memento', 'memento'],
      ['motto', 'motto'],
      ['tornado', 'tornado'],
      ['person', 'person'],
      ['goose', 'goose'],
      ['mouse', 'mouse']
    ];
    tests.forEach(function(a) {
      let n = new Noun(a[0]);
      n.singularize().should.equal(a[1]);
    });
    done();
  });

});
